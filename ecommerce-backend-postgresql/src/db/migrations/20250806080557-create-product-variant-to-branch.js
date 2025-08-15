'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('product_variant_to_branch', {
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
			branch_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'branch',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			//move to product_branch
			cost_price: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
			//move to product_branch
			stock: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			low_stock: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			reorder_quantity: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},
			//move to product_branch
			sale_price: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
			//move to product_branch
			discount_percentage: {
				type: Sequelize.FLOAT,
				allowNull: true,
			},
			status: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			deleted_by: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'user',
					key: 'id',
				},
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE',
			},
			deleted_at: {
				type: Sequelize.DATE,
				allowNull: true,
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
		await queryInterface.dropTable('product_variant_to_branch');
	},
};
