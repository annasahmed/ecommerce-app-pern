'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('order', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},

			// guest user fields
			guest_first_name: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			guest_last_name: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			guest_phone: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			guest_email: {
				type: Sequelize.STRING,
				allowNull: true,
			},

			// Shipping Address
			shipping_address: { type: Sequelize.TEXT, allowNull: false },
			shipping_apartment: { type: Sequelize.TEXT, allowNull: true },
			shipping_city: { type: Sequelize.STRING, allowNull: false },
			shipping_country: { type: Sequelize.STRING, allowNull: false },
			shipping_postal_code: { type: Sequelize.STRING, allowNull: true },

			// Billing Address
			billing_address: { type: Sequelize.TEXT, allowNull: false },
			billing_apartment: { type: Sequelize.TEXT, allowNull: true },
			billing_city: { type: Sequelize.STRING, allowNull: false },
			billing_country: { type: Sequelize.STRING, allowNull: false },
			billing_postal_code: { type: Sequelize.STRING, allowNull: true },

			payment_method: {
				type: Sequelize.STRING, // cod, ibft, payfast, easypaisa, etc
				allowNull: false,
			},

			// public unique tracking id for customer order tracking
			tracking_id: {
				type: Sequelize.STRING,
				allowNull: true,
				unique: true,
			},

			status: {
				type: Sequelize.ENUM(
					'pending',
					'confirmed',
					'cancelled',
					'delivered',
					'return_requested',
					'returned',
					'refunded',
					'exchanged'
				),
				allowNull: false,
				defaultValue: 'pending',
			},
			order_amount: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
			shipping: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
			total: { type: Sequelize.DECIMAL(10, 2), allowNull: false },

			app_user_id: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'app_user',
					key: 'id',
					as: 'user',
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
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('order');
	},
};
