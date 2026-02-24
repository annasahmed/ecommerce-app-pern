'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const tableDescription = await queryInterface.describeTable(
			'product_variant_to_branch'
		);
		if (tableDescription['stock']) {
			await queryInterface.changeColumn(
				'product_variant_to_branch',
				'stock',
				{
					type: Sequelize.INTEGER,
					allowNull: false,
					defaultValue: 100,
				}
			);
		}
		if (tableDescription['low_stock']) {
			await queryInterface.changeColumn(
				'product_variant_to_branch',
				'low_stock',
				{
					type: Sequelize.INTEGER,
					allowNull: false,
					defaultValue: 10,
				}
			);
		}
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
