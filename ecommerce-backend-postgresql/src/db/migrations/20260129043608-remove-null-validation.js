'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const tableDescription = await queryInterface.describeTable(
			'subscriber'
		);
		if (tableDescription['name']) {
			await queryInterface.changeColumn('subscriber', 'name', {
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
