const httpStatus = require('http-status');
const db = require('../../db/models/index.js');
const ApiError = require('../../utils/ApiError.js');
const createAppBaseService = require('../../utils/appBaseService.js');

const validations = async (data) => {
	if (data.email) {
		const exist = await db.app_user.scope(['onlyId']).findOne({
			where: { email: data.email },
		});
		if (exist)
			throw new ApiError(httpStatus.NOT_FOUND, `Email already exists`);
	}
};

const appUserService = createAppBaseService(db.app_user, {
	name: 'User',
	formatCreateData: (data) => ({
		name: data.name,
		email: data.email,
		password: data.password,
		phone: data.phone,
		user_type: data.user_type,
	}),
	formatUpdateData: (data) => {
		const toUpdate = {};
		if (data.name) toUpdate.name = data.name;
		if (data.email) toUpdate.email = data.email;
		if (data.password) toUpdate.password = data.password;
		if (data.phone) toUpdate.phone = data.phone;
		if (data.image) toUpdate.image = data.image;
		if (data.user_type) toUpdate.user_type = data.user_type;
		if (data.status !== undefined) toUpdate.status = data.status;
		return toUpdate;
	},
	validations,
});

module.exports = {
	getAppUserByEmail: (email) =>
		appUserService.getByAttribute('email', email, [
			'activeEntity',
			'withPassword',
		]),
	createAppUser: (req) => appUserService.create(req),
	updateAppUser: (req) => appUserService.update(req),
};
