'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const tableDescription = await queryInterface.describeTable('vendor');
		if (tableDescription['address']) {
			await queryInterface.changeColumn('vendor', 'address', {
				type: Sequelize.JSONB,
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
