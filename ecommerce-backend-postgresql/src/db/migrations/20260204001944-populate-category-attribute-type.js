'use strict';

module.exports = {
	async up(queryInterface) {
		/* 1️⃣ FEEDER */
		await queryInterface.sequelize.query(`
      UPDATE category c
      SET attribute_type = 'feeder'
      FROM category_translation ct
      WHERE ct.category_id = c.id
        AND LOWER(ct.title) IN (
          'sipper',
          'sippers & cups',
          'feeder',
          'feeders',
          'feeding',
          'feeding bottles & teats',
          'feeding syringe',
          'bottle nipples',
          'nipple',
          'nipples',
          'breast pump',
          'breast feeding',
          'feeding accessories',
          'dishes & utensils',
          'food processors & containers',
          'sterilizers & warmers',
          'teethers & pacifiers',
          'highchair & booster seats',
          'kids food & supplements',
          'baby food & infant formula'
        );
    `);

		/* 2️⃣ CLOTHING */
		await queryInterface.sequelize.query(`
      UPDATE category c
      SET attribute_type = 'clothing'
      FROM category_translation ct
      WHERE ct.category_id = c.id
        AND LOWER(ct.title) IN (
          'bottoms',
          'tops',
          'dresses',
          'sleepwear',
          'bodysuits & rompers',
          'innerwear',
          'outerwear',
          'casual wear',
          'fashion',
          'costumes',
          'accessories',
          'socks',
          'booties',
          'socks & booties',
          'mittens & gloves',
          'caps & hats',
          'footwear',
          'sandals',
          'casual shoes'
        );
    `);

		/* 3️⃣ DEFAULT → BABY */
		await queryInterface.sequelize.query(`
      UPDATE category
      SET attribute_type = 'baby'
      WHERE attribute_type IS NULL;
    `);
	},

	async down(queryInterface) {
		await queryInterface.sequelize.query(`
      UPDATE category
      SET attribute_type = NULL;
    `);
	},
};
