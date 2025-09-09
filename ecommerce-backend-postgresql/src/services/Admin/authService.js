const httpStatus = require('http-status');
const userService = require('./userService');
const ApiError = require('../../utils/ApiError');
const { decryptData } = require('../../utils/auth');

async function loginUserWithEmailAndPassword(req) {
	const { email, password } = req.body;

	const user = await userService.getUserByEmail(email, [
		'withPassword',
		'activeEntity',
	]);

	if (!user) {
		throw new ApiError(
			httpStatus.UNAUTHORIZED,
			'Invalid email or password'
		);
	}
	console.log(user);

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
