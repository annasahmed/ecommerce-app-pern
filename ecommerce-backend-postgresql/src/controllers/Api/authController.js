const catchAsync = require('../../utils/catchAsync');
const { apiAuthService, apiAppUserService } = require('../../services/Api');
const { tokenService } = require('../../services');

const login = catchAsync(async (req, res) => {
	const user = await apiAuthService.loginUserWithEmailAndPassword(req);
	const tokens = await tokenService.generateAuthTokens({
		userId: user.id,
	});
	res.send({ user, tokens });
});

const register = catchAsync(async (req, res) => {
	const user = await apiAppUserService.createAppUser(req);
	const tokens = await tokenService.generateAuthTokens({
		userId: user.id,
	});
	delete user.password;
	res.status(httpStatus.CREATED).send({ user, tokens });
});

module.exports = {
	login,
	register,
};
