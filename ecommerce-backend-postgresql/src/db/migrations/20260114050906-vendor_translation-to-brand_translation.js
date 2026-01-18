'use strict';

const db = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await db.vendor_translation.update(
			{
				language_id: 1,
			},
			{
				where: {
					language_id: 4,
				},
			}
		);
		const vendorTranslations = await db.vendor_translation.findAll({
			order: [['id', 'ASC']],
			raw: true,
		});
		for (const vt of vendorTranslations) {
			await db.brand_translation.create({
				brand_id: vt.vendor_id,
				language_id: vt.language_id,
				title: vt.title,
				slug: vt.slug,
				created_at: vt.created_at,
				updated_at: vt.updated_at,
			});
		}
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
	},
};
