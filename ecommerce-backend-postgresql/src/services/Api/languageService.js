const db = require('../../db/models/index.js');
const createAppBaseService = require('../../utils/appBaseService.js');

const languageService = createAppBaseService(db.language, {
	name: 'language',
});

module.exports = {
	getLanguages: (req) =>
		languageService.list(req, [], [], [['created_at', 'ASC']]),
};
