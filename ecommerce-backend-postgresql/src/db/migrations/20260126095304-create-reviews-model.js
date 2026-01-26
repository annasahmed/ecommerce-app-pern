'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('review', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			guest_name: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			product_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			order_item_id: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},
			app_user_id: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},
			rating: {
				type: Sequelize.INTEGER,
				allowNull: true,
				validate: {
					min: 1,
					max: 5,
				},
			},

			title: {
				type: Sequelize.STRING,
				allowNull: true,
			},

			comment: {
				type: Sequelize.TEXT,
				allowNull: true,
			},

			is_verified: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},

			status: {
				type: Sequelize.ENUM('PENDING', 'APPROVED', 'REJECTED'),
				defaultValue: 'PENDING',
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
		await queryInterface.dropTable('review');
	},
};
