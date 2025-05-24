'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('address', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			street: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			city: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			country: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			postal_code: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			type: {
				type: Sequelize.ENUM('general', 'shipping', 'billing'), // use general for both/all
				allowNull: false,
			},
			app_user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'app_user',
					key: 'id',
				},
				onDelete: 'CASCADE',
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
		await queryInterface.dropTable('address');
	},
};
