'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('product_translation', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			excerpt: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			description: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			slug: {
				type: Sequelize.STRING,
				allowNull: false,
			},
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
			language_id: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'language',
					key: 'id',
				},
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE',
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
			'product_translation',
			['product_id', 'language_id'],
			{
				unique: true,
				name: 'uniq_product_language_id',
			}
		);
		await queryInterface.addIndex(
			'product_translation',
			['slug', 'language_id'],
			{
				unique: true,
				name: 'uniq_product_slug_language',
			}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('product_translation');
	},
};
