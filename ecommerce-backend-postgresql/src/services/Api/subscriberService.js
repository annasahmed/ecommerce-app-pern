const httpStatus = require('http-status');
const db = require('../../db/models');
const createBaseService = require('../../utils/baseService');
const ApiError = require('../../utils/ApiError');

const validations = async (data) => {
	if (data.email) {
		const exist = await db.subscriber.findOne({
			where: { email: data.email },
		});
		if (exist)
			throw new ApiError(httpStatus.CONFLICT, `Email already exists`);
	}
};

async function createSubscriber(req) {
	const { email } = req.body;
	await validations(req.body);
	return await db.subscriber.create({
		email,
	});
}

module.exports = {
	createSubscriber,
};
