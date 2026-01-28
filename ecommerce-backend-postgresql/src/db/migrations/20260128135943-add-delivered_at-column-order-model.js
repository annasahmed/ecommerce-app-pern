'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const tableDescription = await queryInterface.describeTable('order');
		if (!tableDescription['delivered_at']) {
			await queryInterface.addColumn('order', 'delivered_at', {
				type: Sequelize.DATE,
				allowNull: true,
			});
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
