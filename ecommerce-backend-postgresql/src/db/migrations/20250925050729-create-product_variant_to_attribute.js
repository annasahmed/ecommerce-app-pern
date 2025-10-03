'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('product_variant_to_attribute', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			product_variant_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'product_variant',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			attribute_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'attribute',
					key: 'id',
				},
				onDelete: 'RESTRICT',
				onUpdate: 'CASCADE',
			},
			attribute_value_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'attribute_value',
					key: 'id',
				},
				onDelete: 'RESTRICT',
				onUpdate: 'CASCADE',
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('NOW()'),
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('NOW()'),
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('product_variant_to_attribute');
	},
};
