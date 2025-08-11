'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('product_to_media', {
			product_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'product',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			media_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'media',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('product_to_media');
	},
};
