'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.removeColumn('app_user', 'image');
		await queryInterface.addColumn('app_user', 'image', {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'media',
				key: 'id',
			},
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
		await queryInterface.removeColumn('category', 'icon');
		await queryInterface.addColumn('category', 'icon', {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'media',
				key: 'id',
			},
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
		await queryInterface.removeColumn('language', 'flag');
		await queryInterface.addColumn('language', 'flag', {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'media',
				key: 'id',
			},
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
		await queryInterface.removeColumn('parent_category', 'icon');
		await queryInterface.addColumn('parent_category', 'icon', {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'media',
				key: 'id',
			},
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
		await queryInterface.removeColumn('product_variant', 'image');
		await queryInterface.addColumn('product_variant', 'image', {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'media',
				key: 'id',
			},
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
		await queryInterface.removeColumn('product', 'thumbnail');
		await queryInterface.addColumn('product', 'thumbnail', {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'media',
				key: 'id',
			},
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
		await queryInterface.removeColumn('product', 'images');
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
