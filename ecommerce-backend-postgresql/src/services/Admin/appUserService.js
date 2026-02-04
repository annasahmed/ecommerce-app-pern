const db = require('../../db/models');
const createBaseService = require('../../utils/baseService');

const appUserService = createBaseService(db.app_user, {
	name: 'App User',
	formatCreateData: (data) => {},
	formatUpdateData: (data) => {
		const toUpdate = {};
		if (data.status !== undefined) toUpdate.status = data.status;
		return toUpdate;
	},
});

async function updateAppUser(req) {
	return appUserService.update(req.params.id, req.body);
}

module.exports = {
	getAppUsers: (req) => appUserService.list(req, [], [], [['id', 'DESC']]),
	updateAppUser,
};
