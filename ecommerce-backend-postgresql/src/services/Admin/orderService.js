const httpStatus = require('http-status');
const config = require('../../config/config');
const db = require('../../db/models');
const ApiError = require('../../utils/ApiError');
const { getOffset } = require('../../utils/query');
const { Op } = require('sequelize');

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
	const updatedOrder = await db.order.update(
		{
			status: req.body.status,
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

module.exports = {
	getOrderById,
	getAllOrders,
	updateOrderStatus,
	updateOrderId,
};
