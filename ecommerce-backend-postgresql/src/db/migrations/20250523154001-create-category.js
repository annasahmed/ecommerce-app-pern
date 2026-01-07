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
			// 🔹 Self-referencing parent
			parent_id: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'category',
					key: 'id',
				},
				onDelete: 'RESTRICT',
				onUpdate: 'CASCADE',
			},

			// 🔹 Optional but VERY useful
			level: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 1,
			},
			icon: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'media',
					key: 'id',
				},
				onDelete: 'SET NULL',
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
