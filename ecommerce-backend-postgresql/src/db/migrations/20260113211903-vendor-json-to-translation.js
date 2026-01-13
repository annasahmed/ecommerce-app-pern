'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const vendors = await queryInterface.sequelize.query(
			`SELECT id, name, address, country FROM vendor`,
			{ type: Sequelize.QueryTypes.SELECT }
		);

		const languages = await queryInterface.sequelize.query(
			`SELECT id, code FROM language`,
			{ type: Sequelize.QueryTypes.SELECT }
		);

		const langMap = {};
		languages.forEach((l) => {
			langMap[l.code] = l.id;
		});

		const rows = [];

		for (const vendor of vendors) {
			if (!vendor.name) continue;

			for (const langCode of Object.keys(vendor.name)) {
				const languageId = langMap[langCode];
				if (!languageId) continue;

				rows.push({
					vendor_id: vendor.id,
					language_id: languageId,
					title: vendor.name[langCode],
					slug: vendor.name[langCode],
					address: vendor.address?.[langCode] || null,
					country: vendor.country?.[langCode] || null,
					created_at: new Date(),
					updated_at: new Date(),
				});
			}
		}

		if (rows.length) {
			await queryInterface.bulkInsert('vendor_translation', rows);
		}
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete('vendor_translation', null, {});
	},
};
