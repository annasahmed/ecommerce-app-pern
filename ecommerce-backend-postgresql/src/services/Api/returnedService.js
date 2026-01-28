const httpStatus = require('http-status');
const db = require('../../db/models');
const ApiError = require('../../utils/ApiError');
const { Op } = require('sequelize');

async function getReturnEligibleItems(req, userId) {
	const { orderId } = req.params;
	const order = await db.order.findOne({
		where: {
			id: orderId,
			app_user_id: userId,
			status: {
				[Op.in]: [
					'delivered',
					'return_requested',
					'returned',
					'refunded',
					'exchanged',
					'pending',
				],
			},
		},
		include: [{ model: db.order_item }],
	});

	if (!order)
		throw new ApiError(httpStatus.NOT_FOUND, 'Cannot return this order');

	const deliveredAt = order.delivered_at || new Date();
	if (!deliveredAt)
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			'Cannot return before delivery'
		);
	const daysPassed =
		(new Date() - new Date(deliveredAt)) / (1000 * 60 * 60 * 24);

	// return order;
	if (daysPassed > 15) return [];

	const returnedItems = await db.returned.findAll({
		where: { order_id: orderId },
		attributes: ['order_item_id'],
	});

	const returnedIds = returnedItems.map((r) => r.order_item_id);

	order.order_items = order.order_items.filter(
		(item) => !returnedIds.includes(item.id)
	);
	return order;
}

async function createReturnRequest(req, userId) {
	let {
		order_id,
		order_item_id,
		quantity,
		type,
		reason,
		customer_note,
		video,
		images,
	} = req.body;

	// return;

	return await db.sequelize.transaction(async (t) => {
		let orderItem = await db.order_item.findOne({
			where: { id: order_item_id },
			include: [{ model: db.order }],
			transaction: t,
		});

		orderItem.get({ plain: true });

		if (!orderItem)
			throw new ApiError(httpStatus.NOT_FOUND, 'Order item not found');

		// 🔐 Authorization check (MISSING in your code)
		if (orderItem.order.app_user_id !== userId)
			throw new ApiError(httpStatus.FORBIDDEN, 'Unauthorized');

		// 🛡 Ensure order_id matches order_item
		if (orderItem.order?.id != order_id)
			throw new ApiError(
				httpStatus.BAD_REQUEST,
				'Invalid order reference'
			);

		// 📅 15-day return window
		// const daysPassed = (new Date() - new Date()) / (1000 * 60 * 60 * 24);
		const daysPassed =
			(new Date() -
				(orderItem.order.delivered_at
					? new Date(orderItem.order.delivered_at)
					: new Date())) /
			(1000 * 60 * 60 * 24);

		if (daysPassed > 15)
			throw new ApiError(
				httpStatus.BAD_REQUEST,
				'Items can be returned within 15 days only'
			);

		// 🚫 Prevent duplicate returns
		const existingReturn = await db.returned.findOne({
			where: {
				order_item_id,
				status: {
					[db.Sequelize.Op.in]: ['requested', 'approved', 'received'],
				},
			},
			transaction: t,
		});

		if (existingReturn)
			throw new ApiError(
				httpStatus.CONFLICT,
				'Return already requested! Cannot request return for same item again'
			);

		// 📦 Quantity validation
		if (quantity <= 0 || quantity > orderItem.quantity)
			throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid quantity');

		await db.order.update(
			{
				status: 'return_requested',
			},
			{
				where: {
					id: order_id,
				},
				transaction: t,
			}
		);

		// 📝 Create return
		return await db.returned.create(
			{
				order_id,
				order_item_id,
				product_id: orderItem.product_id,
				app_user_id: userId,
				quantity,
				type,
				reason,
				customer_note,
				video,
				images: images ? images : [],
			},
			{ transaction: t }
		);
	});
}

async function getReturnRequestByUserId(req, userId) {
	return db.returned.findAll({
		where: { app_user_id: userId },
		include: [
			{ model: db.order },
			{ model: db.order_item },
			{ model: db.refund },
		],
		order: [['createdAt', 'DESC']],
	});
}
async function getReturnRequestById(req, userId) {
	const { returnId } = req.params;
	const returned = db.returned.findOne({
		where: { id: returnId, app_user_id: userId },
		include: [
			{ model: db.order },
			{ model: db.order_item },
			{ model: db.refund },
		],
	});
	if (!returned)
		throw new ApiError(httpStatus.NOT_FOUND, 'Return request not found');
	return returned;
}

async function cancelReturn(req, userId) {
	const { returnId } = req.params;
	const returned = await db.returned.findOne({
		where: { id: returnId, app_user_id: userId },
	});

	if (!returned) throw new ApiError(httpStatus.NOT_FOUND, 'Return not found');

	if (returned.status !== 'requested')
		throw new ApiError(httpStatus.BAD_REQUEST, 'Cannot cancel now');

	await db.order.update(
		{
			status: 'delivered',
		},
		{
			where: {
				id: returned.order_id,
			},
		}
	);

	await returned.destroy();
	return { success: true };
}

module.exports = {
	getReturnEligibleItems,
	createReturnRequest,
	getReturnRequestByUserId,
	getReturnRequestById,
	cancelReturn,
};
