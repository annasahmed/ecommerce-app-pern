'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const tableDescription = await queryInterface.describeTable('token');
		if (tableDescription['token']) {
			await queryInterface.removeColumn('token', 'token');
		}
		if (!tableDescription['jti']) {
			await queryInterface.addColumn('token', 'jti', {
				type: Sequelize.STRING,
				allowNull: true,
			});
		}
	},

	async down(queryInterface, Sequelize) {
		const tableDescription = await queryInterface.describeTable('token');
		if (tableDescription['jti']) {
			await queryInterface.removeColumn('token', 'jti');
		}
		if (!tableDescription['token']) {
			await queryInterface.addColumn('token', 'token', {
				type: Sequelize.STRING,
				allowNull: true,
			});
		}
	},
};
