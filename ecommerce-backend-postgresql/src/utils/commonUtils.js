const httpStatus = require('http-status');
const ApiError = require('./ApiError');

const getUserId = (req) => {
	return 2;
	const userId = req?.user?.id;
	if (!userId) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'User Id is required');
	}
};
const softDelete = async (model, id, deletedByUserId) => {
	return await model.update(
		{ deleted_at: new Date(), deleted_by: deletedByUserId },
		{ where: { id } }
	);
};

const commonUtils = {
	getUserId,
	softDelete,
};

module.exports = commonUtils;
