'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const tableDescription = await queryInterface.describeTable('category');
		if (tableDescription['parent_category_id']) {
			await queryInterface.removeConstraint(
				'category',
				'category_parent_category_id_fkey'
			);
			await queryInterface.removeColumn('category', 'parent_category_id');
		}
	},

	async down(queryInterface, Sequelize) {
		const tableDescription = await queryInterface.describeTable('category');
		if (!tableDescription['parent_category_id']) {
			await queryInterface.addColumn('category', 'parent_category_id', {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'parent_category',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			});
		}
	},
};
