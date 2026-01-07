'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const tableDescription = await queryInterface.describeTable('category');
		if (!tableDescription['parent_id']) {
			await queryInterface.addColumn('category', 'parent_id', {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'category',
					key: 'id',
				},
				onDelete: 'RESTRICT',
				onUpdate: 'CASCADE',
			});
		}
		if (!tableDescription['level']) {
			await queryInterface.addColumn('category', 'level', {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 1,
			});
		}
	},

	async down(queryInterface, Sequelize) {
		const tableDescription = await queryInterface.describeTable('category');
		if (tableDescription['parent_id']) {
			await queryInterface.removeColumn('category', 'parent_id');
		}
		if (tableDescription['level']) {
			await queryInterface.removeColumn('category', 'level');
		}
	},
};
