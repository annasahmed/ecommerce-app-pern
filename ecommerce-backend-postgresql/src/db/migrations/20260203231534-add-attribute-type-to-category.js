'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const tableDescription = await queryInterface.describeTable('category');
		if (!tableDescription['attribute_type']) {
			await queryInterface.addColumn('category', 'attribute_type', {
				type: Sequelize.STRING,
				allowNull: true,
				defaultValue: 'baby',
			});
			await queryInterface.sequelize.query(`
		UPDATE category
		SET attribute_type = 'baby'
		WHERE attribute_type IS NULL;
	  `);
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
