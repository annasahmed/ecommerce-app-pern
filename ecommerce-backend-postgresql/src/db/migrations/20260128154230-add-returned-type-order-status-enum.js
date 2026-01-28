'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.sequelize.query(`
		  ALTER TYPE "enum_order_status" ADD VALUE IF NOT EXISTS 'return_requested';
		`);
		await queryInterface.sequelize.query(`
		  ALTER TYPE "enum_order_status" ADD VALUE IF NOT EXISTS 'returned';
		`);
		await queryInterface.sequelize.query(`
		  ALTER TYPE "enum_order_status" ADD VALUE IF NOT EXISTS 'refunded';
		`);
		await queryInterface.sequelize.query(`
		  ALTER TYPE "enum_order_status" ADD VALUE IF NOT EXISTS 'exchanged';
		`);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
	},
};
