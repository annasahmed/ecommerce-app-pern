'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('returned', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			// courier tracking id for returned tracking
			courier_tracking_id: {
				type: Sequelize.STRING,
				allowNull: true,
				// unique: true,
			},
			type: {
				type: Sequelize.ENUM('refund', 'exchange'),
				allowNull: false,
			},
			status: {
				type: Sequelize.ENUM(
					'requested',
					'approved',
					'rejected',
					'received',
					'refunded'
				),
				allowNull: false,
				defaultValue: 'requested',
			},
			inspection_status: {
				type: Sequelize.ENUM('pending', 'passed', 'failed'),
				allowNull: false,
				defaultValue: 'pending',
			},
			order_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'order',
					key: 'id',
					onDelete: 'CASCADE',
					onUpdate: 'CASCADE',
				},
			},
			quantity: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			order_item_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'order_item',
					key: 'id',
					onDelete: 'CASCADE',
					onUpdate: 'CASCADE',
				},
			},
			product_id: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'product',
					key: 'id',
				},
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE',
			},
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
			video: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			images: {
				type: Sequelize.ARRAY(Sequelize.STRING),
				allowNull: true,
				defaultValue: [],
			},
			reason: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			customer_note: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			admin_note: {
				type: Sequelize.TEXT,
				allowNull: true,
			},

			// Exchange support
			exchange_product_id: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'product',
					key: 'id',
				},
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE',
			},

			exchange_order_id: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'order',
					key: 'id',
				},
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE',
			},

			requested_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.NOW,
			},
			approved_at: {
				type: Sequelize.DATE,
				allowNull: true,
			},
			received_at: {
				type: Sequelize.DATE,
				allowNull: true,
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
		await queryInterface.dropTable('returned');
	},
};
