const db = require('../../db/models/index.js');
const createAppBaseService = require('../../utils/AppBaseService.js');

const languageService = createAppBaseService(db.language, {
	name: 'language',
});

module.exports = {
	getLanguages: (req) =>
		languageService.list(req, [], [], [['created_at', 'ASC']]),
};
