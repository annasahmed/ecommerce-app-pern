'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		// 1. Remove default temporarily
		await queryInterface.sequelize.query(`
			ALTER TABLE "order"
			ALTER COLUMN "status" DROP DEFAULT;
		`);

		// 2. Rename old enum
		await queryInterface.sequelize.query(`
			ALTER TYPE "enum_order_status" RENAME TO "enum_order_status_old_2";
		`);

		// 3. Create new enum
		await queryInterface.sequelize.query(`
			CREATE TYPE "enum_order_status" AS ENUM (
				'pending',
				'in_progress',
				'cancelled',
				'delivered',
				'return_requested',
				'returned',
				'refunded',
				'exchanged'
			);
		`);

		// 4. Update column type + data
		await queryInterface.sequelize.query(`
			ALTER TABLE "order"
			ALTER COLUMN "status"
			TYPE "enum_order_status"
			USING (
				CASE
					WHEN status = 'confirmed' THEN 'in_progress'
					ELSE status::text
				END
			)::"enum_order_status";
		`);

		// 5. Restore default
		await queryInterface.sequelize.query(`
			ALTER TABLE "order"
			ALTER COLUMN "status" SET DEFAULT 'pending';
		`);

		// 6. Drop old enum
		await queryInterface.sequelize.query(`
			DROP TYPE "enum_order_status_old_2";
		`);
	},

	async down(queryInterface, Sequelize) {
		// 1. Drop default
		await queryInterface.sequelize.query(`
			ALTER TABLE "order"
			ALTER COLUMN "status" DROP DEFAULT;
		`);

		// 2. Rename enum
		await queryInterface.sequelize.query(`
			ALTER TYPE "enum_order_status" RENAME TO "enum_order_status_new";
		`);

		// 3. Old enum
		await queryInterface.sequelize.query(`
			CREATE TYPE "enum_order_status" AS ENUM (
				'pending',
				'confirmed',
				'cancelled',
				'delivered',
				'return_requested',
				'returned',
				'refunded',
				'exchanged'
			);
		`);

		// 4. Revert data
		await queryInterface.sequelize.query(`
			ALTER TABLE "order"
			ALTER COLUMN "status"
			TYPE "enum_order_status"
			USING (
				CASE
					WHEN status = 'in_progress' THEN 'confirmed'
					ELSE status::text
				END
			)::"enum_order_status";
		`);

		// 5. Restore default
		await queryInterface.sequelize.query(`
			ALTER TABLE "order"
			ALTER COLUMN "status" SET DEFAULT 'pending';
		`);

		// 6. Drop temp enum
		await queryInterface.sequelize.query(`
			DROP TYPE "enum_order_status_new";
		`);
	},
};
