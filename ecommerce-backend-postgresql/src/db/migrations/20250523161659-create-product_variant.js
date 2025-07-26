'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('product_variant', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			sku: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			attributes: {
				type: Sequelize.JSONB, // e.g., { "size": "M", "color": "Red" }
				allowNull: false,
			},
			cost_price: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
			stock: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			sale_price: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
			discount_percentage: {
				type: Sequelize.FLOAT,
				allowNull: true,
			},
			image: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			product_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'product',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'user',
					key: 'id',
				},
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE',
			},
			status: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true,
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
		await queryInterface.dropTable('product_variant');
	},
};
