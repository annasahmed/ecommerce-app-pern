'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('similar_product', {
			product_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'product',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			similar_product_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'product',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
		});

		// Index for fast lookup
		await queryInterface.addIndex('similar_product', ['product_id']);
		await queryInterface.addIndex('similar_product', [
			'similar_product_id',
		]);

		// Prevent duplicate entries
		await queryInterface.addConstraint('similar_product', {
			fields: ['product_id', 'similar_product_id'],
			type: 'unique',
			name: 'unique_similar_product_pair',
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('similar_product');
	},
};
