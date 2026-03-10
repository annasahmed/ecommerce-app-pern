const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {
	authService,
	userService,
	emailService,
	tokenService,
} = require('../services');
const { verifyToken } = require('../utils/auth');
const { tokenTypes } = require('../config/tokens');
const db = require('../db/models');

const register = catchAsync(async (req, res) => {
	const user = await userService.createUser(req);
	const tokens = await tokenService.generateAuthTokens({
		userId: user.id,
		roleId: user.role_id,
	}, false);
	delete user.password;
	res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
	const user = await authService.loginUserWithEmailAndPassword(req);
	const tokens = await tokenService.generateAuthTokens({
		userId: user.id,
		roleId: user.role_id,
	});
	res.send({ user, tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
	const resetPasswordToken = await tokenService.generateResetPasswordToken(
		req.body.email,
		true
	);
	await emailService.sendResetPasswordEmail(
		req.body.email,
		resetPasswordToken
	);
	res.send({ success: true });
});

const resetPassword = catchAsync(async (req, res) => {
	const { userId } = await verifyToken(
		req.query.token,
		tokenTypes.RESET_PASSWORD
	);
	req.body.id = userId;
	await userService.updateUser(req);
	await db.token.destroy({
		where: { user_id: userId, type: tokenTypes.RESET_PASSWORD },
	});
	res.send({ success: true });
});

module.exports = {
	register,
	login,
	forgotPassword,
	resetPassword,
};
