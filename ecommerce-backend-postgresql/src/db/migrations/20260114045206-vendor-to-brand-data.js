'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			const tableDescription = await queryInterface.describeTable(
				'product'
			);
			if (!tableDescription.brand_id) {
				await queryInterface.addColumn(
					'product',
					'brand_id',
					{
						type: Sequelize.INTEGER,
						allowNull: true,
						references: {
							model: 'brand',
							key: 'id',
						},
						onDelete: 'SET NULL',
						onUpdate: 'CASCADE',
					},
					{ transaction }
				);
			}

			const vendors = await queryInterface.sequelize.query(
				`SELECT * FROM vendor`,
				{ type: Sequelize.QueryTypes.SELECT, transaction }
			);

			const vendorToBrandMap = {};

			for (const vendor of vendors) {
				const [brand] = await queryInterface.sequelize.query(
					`
          INSERT INTO brand (user_id, status, created_at, updated_at)
          VALUES (:user_id, :status, NOW(), NOW())
          RETURNING id
          `,
					{
						replacements: {
							user_id: vendor.user_id,
							status: vendor.status,
							vendorId: vendor.id,
						},
						transaction,
					}
				);

				vendorToBrandMap[vendor.id] = brand.id;
			}

			const vendorTranslations = await queryInterface.sequelize.query(
				`SELECT * FROM vendor_translation`,
				{ type: Sequelize.QueryTypes.SELECT, transaction }
			);

			for (const vt of vendorTranslations) {
				const brandId = vendorToBrandMap[vt.vendor_id];
				if (!brandId) continue;

				await queryInterface.sequelize.query(
					`
          INSERT INTO brand_translation
          (brand_id, language_id, title, description, slug, created_at, updated_at)
          VALUES (:brandId, :language_id, :name, :description, :slug, NOW(), NOW())
          ON CONFLICT DO NOTHING
          `,
					{
						replacements: {
							brandId,
							language_id: vt.language_id,
							name: vt.name,
							description: vt.description,
							slug: vt.slug,
						},
						transaction,
					}
				);
			}

			const productVendors = await queryInterface.sequelize.query(
				`SELECT * FROM product_to_vendor`,
				{ type: Sequelize.QueryTypes.SELECT, transaction }
			);

			for (const pv of productVendors) {
				const brandId = vendorToBrandMap[pv.vendor_id];
				if (!brandId) continue;

				await queryInterface.sequelize.query(
					`
          UPDATE product
          SET brand_id = :brandId
          WHERE id = :productId
          `,
					{
						replacements: {
							brandId,
							productId: pv.product_id,
						},
						transaction,
					}
				);
			}

			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},

	async down() {
		// intentionally left empty (data migration)
	},
};
