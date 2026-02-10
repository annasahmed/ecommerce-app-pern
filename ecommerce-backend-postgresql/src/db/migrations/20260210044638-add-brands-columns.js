'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const tableDescription = await queryInterface.describeTable('brand');
		if (!tableDescription['show_on_homepage']) {
			await queryInterface.addColumn('brand', 'show_on_homepage', {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
				allowNull: false,
			});
		}
		if (!tableDescription['icon']) {
			await queryInterface.addColumn('brand', 'icon', {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'media',
					key: 'id',
				},
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE',
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
