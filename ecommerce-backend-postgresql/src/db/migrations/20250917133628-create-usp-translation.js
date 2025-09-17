'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('usp_translation', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			usp_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'usp',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			language_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'language',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			description: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			slug: {
				type: Sequelize.STRING,
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
		await queryInterface.addIndex(
			'usp_translation',
			['usp_id', 'language_id'],
			{
				unique: true,
				name: 'uniq_usp_language_id',
			}
		);
		await queryInterface.addIndex(
			'usp_translation',
			['slug', 'language_id'],
			{
				unique: true,
				name: 'uniq_usp_slug_language',
			}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('usp_translation');
	},
};
