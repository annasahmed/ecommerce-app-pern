'use strict';

const db = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const vendorProducts = await db.product_to_vendor.findAll({
			raw: true,
			attributes: ['product_id', 'vendor_id'],
		});
		for (const vp of vendorProducts) {
			await db.product.update(
				{
					brand_id: vp.vendor_id,
				},
				{
					where: {
						id: vp.product_id,
					},
				}
			);
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
