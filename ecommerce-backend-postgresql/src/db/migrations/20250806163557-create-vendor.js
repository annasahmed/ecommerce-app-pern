'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('vendor', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: Sequelize.JSONB,
				allowNull: false,
			},
			address: {
				type: Sequelize.JSONB,
				allowNull: true,
			},
			country: {
				type: Sequelize.JSONB,
				allowNull: true,
			},
			phone: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			contact_person: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: true,
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
		await queryInterface.dropTable('vendor');
	},
};
