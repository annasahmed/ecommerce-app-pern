const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');
const { decryptData } = require('../../utils/auth');

async function loginUserWithEmailAndPassword(req) {
	const { apiAppUserService } = require('.');
	const { email, password } = req.body;

	const user = await apiAppUserService.getAppUserByEmail(email);

	if (!user) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid email or password');
	}


	// const isPasswordMatch = password === user.password;
	const isPasswordMatch = await decryptData(password, user.password);

	if (!isPasswordMatch) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid email or password');
	}

	delete user.password;

	return user;
}

module.exports = {
	loginUserWithEmailAndPassword,
};
