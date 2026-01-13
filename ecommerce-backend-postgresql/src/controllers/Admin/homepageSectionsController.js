const catchAsync = require('../../utils/catchAsync');
const { adminHomepageSectionsService } = require('../../services/Admin');

const getHomepage = catchAsync(async (req, res) => {
	const sections = await adminHomepageSectionsService.getHomepageSections(
		req
	);
	res.send(sections);
});
const createHomepageSection = catchAsync(async (req, res) => {
	const sections = await adminHomepageSectionsService.createSection(req);
	res.send(sections);
});

const deleteHomepageSection = catchAsync(async (req, res) => {
	await adminHomepageSectionsService.deleteSection(req);
	res.send({ success: true });
});

const updateHomepageSection = catchAsync(async (req, res) => {
	const section = await adminHomepageSectionsService.updateSection(req);
	res.send(section);
});

const reorderHomepageSections = catchAsync(async (req, res) => {
	await adminHomepageSectionsService.reorderSections(req.body);
	res.send({ success: true });
});

module.exports = {
	getHomepage,
	createHomepageSection,
	deleteHomepageSection,
	updateHomepageSection,
	reorderHomepageSections,
};
