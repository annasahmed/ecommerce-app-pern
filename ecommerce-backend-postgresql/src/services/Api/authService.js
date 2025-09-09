const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');
const { decryptData } = require('../../utils/auth');
const { apiAppUserService } = require('.');

async function loginUserWithEmailAndPassword(req) {
	const { email, password } = req.body;

	const user = await apiAppUserService.getAppUserByEmail(email);

	if (!user) {
		throw new ApiError(
			httpStatus.UNAUTHORIZED,
			'Invalid email or password'
		);
	}
	const isPasswordMatch = await decryptData(password, user.password);

	if (!isPasswordMatch) {
		throw new ApiError(
			httpStatus.UNAUTHORIZED,
			'Invalid email or password'
		);
	}

	delete user.password;

	return user;
}

module.exports = {
	loginUserWithEmailAndPassword,
};
