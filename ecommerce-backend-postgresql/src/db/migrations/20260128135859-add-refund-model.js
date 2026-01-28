'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('refund', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			status: {
				type: Sequelize.ENUM('pending', 'processed', 'failed'),
				allowNull: false,
				defaultValue: 'pending',
			},
			returned_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'returned',
					key: 'id',
					onDelete: 'CASCADE',
					onUpdate: 'CASCADE',
				},
			},
			refund_method: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			total_amount: {
				type: Sequelize.DECIMAL(10, 2),
				allowNull: false,
			},
			processed_at: {
				type: Sequelize.DATE,
				allowNull: true,
			},
			completed_at: {
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
		await queryInterface.dropTable('refund');
	},
};
