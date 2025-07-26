'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('setting', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			setting: {
				type: Sequelize.JSONB,
				allowNull: false,
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('NOW()'),
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('NOW()'),
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('setting');
	},
};
