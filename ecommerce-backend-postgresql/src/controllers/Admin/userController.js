const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const ApiError = require('../../utils/ApiError');
const { adminUserService } = require('../../services/Admin');

const getUsers = catchAsync(async (req, res) => {
	const users = await adminUserService.getUsers(req);
	res.send(users);
});

const getUser = catchAsync(async (req, res) => {
	const user = await adminUserService.getUserById(req.params.userId);

	if (!user) {
		throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
	}

	delete user.password;
	res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
	await adminUserService.deleteUserById(req.params.userId);
	res.send({ success: true });
});
const permanentDeleteUser = catchAsync(async (req, res) => {
	await adminUserService.permanentDeleteUserById(req.params.userId);
	res.send({ success: true });
});

const createUser = catchAsync(async (req, res) => {
	const user = await adminUserService.createUser(req);
	delete user.password;
	res.status(httpStatus.CREATED).send(user);
});

const updateUser = catchAsync(async (req, res) => {
	const user = await adminUserService.updateUser(req);

	if (!user) {
		throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
	}

	delete user.password;
	res.send(user);
});

module.exports = {
	getUsers,
	getUser,
	updateUser,
	deleteUser,
	createUser,
	permanentDeleteUser,
};
