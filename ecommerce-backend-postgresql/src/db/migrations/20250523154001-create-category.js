'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('category', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			title: {
				type: Sequelize.JSONB,
				allowNull: false,
			},
			description: {
				type: Sequelize.JSONB,
				allowNull: true,
			},
			slug: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			icon: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			parent_category_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'parent_category',
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
		await queryInterface.dropTable('category');
	},
};
