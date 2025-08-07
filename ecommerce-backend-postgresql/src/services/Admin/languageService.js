const db = require('../../db/models/index.js');
const commonUtils = require('../../utils/commonUtils.js');
const createBaseService = require('../../utils/baseService.js');

const languageService = createBaseService(db.language, {
	name: 'Language',
	checkDuplicateSlug: true,
	formatCreateData: (data) => ({
		name: data.name,
		country: data.country,
		flag: data.flag,
		status: data.status,
	}),
	formatUpdateData: (data) => {
		const toUpdate = {};
		if (data.name) toUpdate.name = data.name;
		if (data.country) toUpdate.country = data.country;
		if (data.flag) toUpdate.flag = data.flag;
		if (data.status !== undefined) toUpdate.status = data.status;
		return toUpdate;
	},
	isPagination: false,
});

// Using userId logic from request
async function createLanguage(req) {
	const userId = commonUtils.getUserId(req);
	return languageService.create(req.body, userId);
}

async function updateLanguage(req) {
	const userId = commonUtils.getUserId(req);
	return languageService.update(req.params.languageId, req.body, userId);
}

async function softDeleteLanguageById(req) {
	const userId = commonUtils.getUserId(req);
	return languageService.softDelete(req.params.languageId, userId);
}

module.exports = {
	getLanguageById: languageService.getById,
	createLanguage,
	updateLanguage,
	getLanguages: (req) =>
		languageService.list(req, [], [], [['created_at', 'ASC']]),
	permanentDeleteLanguageById: languageService.permanentDelete,
	softDeleteLanguageById,
};
