const db = require('../../db/models');

async function createSection(req) {
	const data = req.body;
	const maxPosition = await db.homepage_sections.max('position');

	return db.homepage_sections.create({
		...data,
		position: maxPosition ? maxPosition + 1 : 1,
	});
}

async function updateSection(req) {
	const data = req.body;
	const { sectionId } = req.params;
	const section = await db.homepage_sections.findByPk(sectionId);
	if (!section) throw new Error('Section not found');

	return section.update(data);
}

async function getHomepageSections(req) {
	return db.homepage_sections.findAll({
		where: { status: true },
		order: [['position', 'ASC']],
	});
}

async function deleteSection(req) {
	const { sectionId } = req.params;
	return db.homepage_sections.destroy({ where: { id: sectionId } });
}

async function reorderSections(payload) {
	const transaction = await db.sequelize.transaction();
	try {
		for (const item of payload) {
			await db.homepage_sections.update(
				{ position: item.position },
				{ where: { id: item.id }, transaction }
			);
		}
		await transaction.commit();
		return true;
	} catch (err) {
		await transaction.rollback();
		throw err;
	}
}

module.exports = {
	createSection,
	updateSection,
	getHomepageSections,
	deleteSection,
	reorderSections,
};
