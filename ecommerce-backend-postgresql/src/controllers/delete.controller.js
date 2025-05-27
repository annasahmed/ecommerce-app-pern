const httpStatus = require('http-status');
const { getUserByEmail } = require('../services/Admin/userService');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');

const getEmail = catchAsync(async (req, res) => {
	const users = await getUserByEmail(req.body.email, [
		'defaultScope',
		'onlyId',
	]);
	if (!users) {
		throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
	}
	res.send(users);
});

module.exports = {
	getEmail,
};
