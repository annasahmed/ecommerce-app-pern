'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		try {
			await queryInterface.removeConstraint(
				'order_item', // table that has the foreign key
				'order_item_product_variant_id_fkey' // existing constraint name
			);

			// Add new foreign key with ON DELETE SET NULL
			await queryInterface.addConstraint('order_item', {
				fields: ['product_variant_id'],
				type: 'foreign key',
				name: 'order_item_product_variant_id_fkey',
				references: {
					table: 'product_variant',
					field: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			});
		} catch (error) {}
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
