'use strict';

const registerPermissions = require('../../utils/registerPermissions');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const modules = [
			'parent_category',
			'category',
			'info',
			'language',
			'setting',
			'usp',
			'product',
		];
		for (const module of modules) {
			await registerPermissions(module);
		}
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
