'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('otp', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},

			email: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			otp: {
				type: Sequelize.STRING,
				allowNull: false,
			},

			type: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			expires_at: {
				type: Sequelize.DATE,
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
		await queryInterface.dropTable('otp');
	},
};
