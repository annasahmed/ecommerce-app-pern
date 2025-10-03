'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('attribute_value', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			attribute_id: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'attribute',
					key: 'id',
				},
				onDelete: 'RESTRICT',
				onUpdate: 'CASCADE',
			},

			values: {
				type: Sequelize.JSONB, // {"en":"Red","ur":"سرخ"}
				allowNull: false,
			},
		});

		/**
		 * Add altering commands here.
		 *
		 * Example:
		 */
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('attribute_value');

		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 */
	},
};
