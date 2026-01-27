'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const tableDescription = await queryInterface.describeTable('order');
		if (!tableDescription['courier_tracking_id']) {
			await queryInterface.addColumn('order', 'courier_tracking_id', {
				type: Sequelize.STRING,
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
