'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.removeColumn('product_variant', 'user_id');
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.addColumn('product_variant', 'user_id', {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'user',
				key: 'id',
			},
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
	},
};
