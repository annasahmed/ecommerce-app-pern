'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const tableDescription = await queryInterface.describeTable('address');
		if (!tableDescription['address']) {
			await queryInterface.addColumn('address', 'address', {
				type: Sequelize.TEXT,
				allowNull: false,
			});
		}
		if (!tableDescription['apartment']) {
			await queryInterface.addColumn('address', 'apartment', {
				type: Sequelize.TEXT,
				allowNull: true,
			});
		}
		if (tableDescription['street']) {
			await queryInterface.removeColumn('address', 'street');
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
