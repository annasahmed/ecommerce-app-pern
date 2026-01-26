'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const tableDescription = await queryInterface.describeTable('product');
		if (!tableDescription['avg_rating']) {
			await queryInterface.addColumn('product', 'avg_rating', {
				type: Sequelize.FLOAT,
				defaultValue: 0,
			});
		}
		if (!tableDescription['total_reviews']) {
			await queryInterface.addColumn('product', 'total_reviews', {
				type: Sequelize.INTEGER,
				defaultValue: 0,
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
