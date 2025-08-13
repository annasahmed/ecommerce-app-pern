'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn('user', 'image', {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'media',
				key: 'id',
			},
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
	},

	async down(queryInterface, Sequelize) {},
};
