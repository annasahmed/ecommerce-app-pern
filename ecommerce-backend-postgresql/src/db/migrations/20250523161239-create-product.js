'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('product', {
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
			slug: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
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
			thumbnail: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			images: {
				type: Sequelize.ARRAY(Sequelize.STRING),
				allowNull: true,
				defaultValue: [],
			},
			is_featured: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			meta_title: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			meta_description: {
				type: Sequelize.TEXT,
				allowNull: false,
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
		await queryInterface.dropTable('product');
	},
};
