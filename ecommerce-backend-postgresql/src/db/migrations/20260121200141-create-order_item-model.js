'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('order_item', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			order_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'order',
					key: 'id',
					onDelete: 'CASCADE',
					onUpdate: 'CASCADE',
				},
			},
			product_id: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'product',
					key: 'id',
				},
			},
			product_variant_id: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'product_variant',
					key: 'id',
				},
			},
			product_title: { type: Sequelize.STRING, allowNull: false },
			price: {
				type: Sequelize.DECIMAL(10, 2),
				allowNull: false,
			},
			quantity: {
				type: Sequelize.INTEGER,
				allowNull: false,
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
		await queryInterface.dropTable('order');
	},
};
