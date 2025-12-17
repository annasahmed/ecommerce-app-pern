const httpStatus = require('http-status');
const config = require('../config/config');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');
const { generateToken, generateExpires } = require('../utils/auth');
const db = require('../db/models');
const { tokenTypes } = require('../config/tokens');
const crypto = require('crypto');

async function generateResetPasswordToken(email) {
	const user = await userService.getUserByEmail(email);
	if (!user || !user.id) {
		throw new ApiError(
			httpStatus.NOT_FOUND,
			'User not found with this email'
		);
	}

	const expiresMs = generateExpires(
		config.jwt.resetPasswordExpirationMinutes / 60
	);
	const resetPasswordToken = generateToken({ id: user.id }, expiresMs);

	return resetPasswordToken;
}

async function generateAuthTokens({ userId, roleId }, isCmsUser) {
	const refreshJti = crypto.randomUUID();
	const refreshTokenExpires = generateExpires(
		config.jwt.refreshExpirationDays * 24 // multiply by 24 to convert days to hours
	);

	const refreshToken = generateToken(
		{ userId, type: tokenTypes.REFRESH, jti: refreshJti, isCmsUser },
		refreshTokenExpires
	);

	const accessTokenExpires = generateExpires(
		config.jwt.accessExpirationMinutes / 60 // divide by 60 to convert minutes to hours
	);
	const accessToken = generateToken(
		{ userId, roleId, type: tokenTypes.ACCESS, isCmsUser },
		accessTokenExpires
	);

	await db.token.create({
		jti: refreshJti, // save only refresh token Jti in db
		expires_at: refreshTokenExpires,
		type: tokenTypes.REFRESH,
		...(isCmsUser ? { user_id: userId } : { app_user_id: userId }),
	});

	return {
		refresh: {
			token: refreshToken,
			expires: refreshTokenExpires,
		},
		access: {
			token: accessToken,
			expires: accessTokenExpires,
		},
	};
}
async function generateAccessTokens({ userId, roleId }, isCmsUser) {
	const accessTokenExpires = generateExpires(
		config.jwt.accessExpirationMinutes / 60 // divide by 60 to convert minutes to hours
	);
	const accessToken = generateToken(
		{ userId, roleId, type: tokenTypes.ACCESS, isCmsUser },
		accessTokenExpires
	);

	return {
		access: {
			token: accessToken,
			expires: accessTokenExpires,
		},
	};
}

module.exports = {
	generateResetPasswordToken,
	generateAuthTokens,
	generateAccessTokens,
};
