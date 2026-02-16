const httpStatus = require('http-status');
const config = require('../../config/config');
const db = require('../../db/models');
const ApiError = require('../../utils/ApiError');
const { getOffset } = require('../../utils/query');
const { Op, where } = require('sequelize');

async function getOrderById(req) {
	const { orderId } = req.params;
	const order = db.order.findByPk(orderId, {
		include: [
			{
				model: db.order_item,
				include: [
					{
						model: db.product,
						required: false,
						include: [
							{
								model: db.media,
								required: false,
								as: 'thumbnailImage',
								attributes: ['url', 'title', 'size'],
							},
						],
					},
					{
						model: db.product_variant,
						required: false,
						include: [
							{
								model: db.attribute,
								required: false,
								through: {
									as: 'pva',
								},
								attributes: ['id', 'name'],
							},
						],
					},
				],
			},
			{ model: db.app_user, as: 'user', required: false },
		],
	});

	if (!order) throw new ApiError(httpStatus.NOT_FOUND, `Order not found`);
	return order;
}

async function getAllOrders(req) {
	const { page: defaultPage, limit: defaultLimit } = config.pagination;
	const {
		page = defaultPage,
		limit = 1000,
		status,
		trackingId,
		paymentMethod,
		startDate,
		endDate,
	} = req.query;
	const offset = getOffset(page, limit);

	const whereCondition = {};
	if (status) {
		whereCondition.status = status;
	}
	if (paymentMethod) {
		whereCondition.payment_method = paymentMethod;
	}
	if (trackingId) {
		whereCondition.tracking_id = trackingId;
	}

	if (startDate && endDate) {
		whereCondition.created_at = {
			[Op.between]: [new Date(startDate), new Date(endDate)],
		};
	} else if (startDate) {
		whereCondition.created_at = {
			[Op.gte]: new Date(startDate),
		};
	} else if (endDate) {
		whereCondition.created_at = {
			[Op.lte]: new Date(endDate),
		};
	}

	const orders = await db.order.findAndCountAll({
		offset,
		limit,
		where: whereCondition,
		include: [
			{
				model: db.app_user,
				as: 'user',
				required: false,
			},
		],
		order: [['id', 'DESC']],
		unique: true,
		distinct: true, // to fix count
		col: 'id', // to fix count
	});

	return {
		total: orders.count,
		records: orders.rows,
		limit: limit,
		page: page,
	};
}

async function updateOrderId(req) {
	const { orderId } = req.params;
	const updatedOrder = await db.order.update(
		{
			...req.body,
		},
		{
			where: {
				id: orderId,
			},
		}
	);
	if (!updatedOrder[0])
		throw new ApiError(httpStatus.NOT_FOUND, `Order not found`);
	return { success: true };
}
async function updateOrderStatus(req) {
	const { orderId } = req.params;
	const { status: newStatus } = req.body;

	const transaction = await db.sequelize.transaction();

	try {
		// 1️⃣ Get current order with lock
		const order = await db.order.findByPk(orderId, {
			transaction,
			lock: transaction.LOCK.UPDATE,
		});

		if (!order) {
			throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
		}

		const oldStatus = order.status;

		// 2️⃣ Deduct stock ONLY when pending → in_progress
		if (oldStatus === 'pending' && newStatus === 'in_progress') {
			const orderItems = await db.order_item.findAll({
				where: { order_id: orderId },
				transaction,
				lock: transaction.LOCK.UPDATE,
			});

			// group quantities by variant
			const variantQtyMap = {};

			for (const item of orderItems) {
				if (!item.product_variant_id) {
					throw new ApiError(
						httpStatus.BAD_REQUEST,
						`Variant missing for order item ${item.id}`
					);
				}

				variantQtyMap[item.product_variant_id] =
					(variantQtyMap[item.product_variant_id] || 0) +
					item.quantity;
			}

			const variantIds = Object.keys(variantQtyMap);

			// get stock rows with lock
			const stockRows = await db.product_variant_to_branch.findAll({
				where: {
					product_variant_id: {
						[Op.in]: variantIds,
					},
				},
				transaction,
				lock: transaction.LOCK.UPDATE,
			});

			for (const stockRow of stockRows) {
				const requiredQty = variantQtyMap[stockRow.product_variant_id];

				// check stock availability
				if (stockRow.stock < requiredQty) {
					throw new ApiError(
						httpStatus.BAD_REQUEST,
						`Insufficient stock for variant ${stockRow.product_variant_id}`
					);
				}

				// deduct stock
				stockRow.stock -= requiredQty;

				await stockRow.save({ transaction });
			}
		}

		// 3️⃣ Update order status
		order.status = newStatus;
		await order.save({ transaction });

		await transaction.commit();

		return {
			success: true,
			message: `Order status updated from ${oldStatus} → ${newStatus}`,
		};
	} catch (error) {
		await transaction.rollback();
		throw new ApiError(
			httpStatus.INTERNAL_SERVER_ERROR,
			error.message || 'Failed to update order status'
		);
	}
}

module.exports = {
	getOrderById,
	getAllOrders,
	updateOrderStatus,
	updateOrderId,
};
