const httpStatus = require('http-status');
const ApiError = require('./ApiError');

const getUserId = (req) => {
	const userId = req?.user?.id;
	if (!userId) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'User Id is required');
	}
};

const commonUtils = {
	getUserId,
};

module.exports = commonUtils;
