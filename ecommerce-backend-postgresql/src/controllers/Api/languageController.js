const catchAsync = require('../../utils/catchAsync');
const { apiLanguageService } = require('../../services/Api');

const getLanguages = catchAsync(async (req, res) => {
	const languages = await apiLanguageService.getLanguages(req);
	res.send(languages);
});

module.exports = {
	getLanguages,
};
