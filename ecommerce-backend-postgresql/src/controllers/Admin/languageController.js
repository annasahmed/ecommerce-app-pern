const catchAsync = require('../../utils/catchAsync');
const { adminLanguageService } = require('../../services/Admin');

const getLanguageById = catchAsync(async (req, res) => {
	const language = await adminLanguageService.getLanguageById(
		req.params.languageId
	);
	res.send(language);
});
const getLanguages = catchAsync(async (req, res) => {
	const languages = await adminLanguageService.getLanguages(req);
	res.send(languages);
});
const createLanguage = catchAsync(async (req, res) => {
	const languages = await adminLanguageService.createLanguage(req);
	res.send(languages);
});

const softDeleteLanguage = catchAsync(async (req, res) => {
	await adminLanguageService.softDeleteLanguageById(req.params.languageId);
	res.send({ success: true });
});
const permanentDeleteLanguage = catchAsync(async (req, res) => {
	await adminLanguageService.permanentDeleteLanguageById(
		req.params.languageId
	);
	res.send({ success: true });
});

const updateLanguage = catchAsync(async (req, res) => {
	const language = await adminLanguageService.updateLanguage(req);

	res.send(language);
});

module.exports = {
	getLanguageById,
	getLanguages,
	createLanguage,
	softDeleteLanguage,
	permanentDeleteLanguage,
	updateLanguage,
};
