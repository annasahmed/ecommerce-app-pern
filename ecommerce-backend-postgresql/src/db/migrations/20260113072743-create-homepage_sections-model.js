'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('homepage_sections', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			/** slider | banner | categories | products */
			type: {
				type: Sequelize.ENUM(
					'slider',
					'banner',
					'categories',
					'products',
					'tab'
				),
				allowNull: false,
			},

			/** Optional section heading */
			title: {
				type: Sequelize.JSONB,
				allowNull: true,
				validate: {
					isValidOption(value) {
						modelValidators.stringWithTranslation(value, 'title');
					},
				},
			},

			/** Drag & drop ordering */
			position: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},

			/**
			 * All section-specific config goes here
			 * Different for each type
			 */
			config: {
				type: Sequelize.JSONB,
				allowNull: false,
				defaultValue: {},
			},

			user_id: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'user',
					key: 'id',
				},
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE',
			},
			status: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true,
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
		await queryInterface.dropTable('homepage_sections');
	},
};
