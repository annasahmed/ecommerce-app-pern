'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const tableDescription = await queryInterface.describeTable(
			'order_item'
		);
		if (!tableDescription['sku']) {
			await queryInterface.addColumn('order_item', 'sku', {
				type: Sequelize.STRING, // add this column migration
				allowNull: true,
			});
		}
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn('order_item', 'sku');
	},
};
