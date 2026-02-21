'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		// 1️⃣ Add column
		const tableDescription = await queryInterface.describeTable('category');
		if (!tableDescription['is_leaf']) {
			await queryInterface.addColumn('category', 'is_leaf', {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true, // temporary default
			});
		}

		// 2️⃣ Populate existing data
		await queryInterface.sequelize.query(`
      UPDATE category c
      SET is_leaf = NOT EXISTS (
        SELECT 1 FROM category child
        WHERE child.parent_id = c.id
      );
    `);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn('category', 'is_leaf');
	},
};
