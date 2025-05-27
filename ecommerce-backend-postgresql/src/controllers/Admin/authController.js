const catchAsync = require('../../utils/catchAsync');
const { tokenService } = require('../../services');
const { adminAuthService } = require('../../services/Admin');

const login = catchAsync(async (req, res) => {
	const user = await adminAuthService.loginUserWithEmailAndPassword(req);
	const tokens = await tokenService.generateAuthTokens(
		{
			userId: user.id,
			roleId: user.role_id,
		},
		true
	);
	res.send({ user, tokens });
});

module.exports = {
	login,
};
