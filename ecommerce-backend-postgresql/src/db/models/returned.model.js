module.exports = (sequelize, DataTypes) => {
	const returned = sequelize.define(
		'returned',
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},

			// courier tracking id for returned tracking
			courier_tracking_id: {
				type: DataTypes.STRING,
				allowNull: true,
				// unique: true,
			},
			type: {
				type: DataTypes.ENUM('refund', 'exchange'),
				allowNull: false,
			},
			status: {
				type: DataTypes.ENUM(
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
				type: DataTypes.ENUM('pending', 'passed', 'failed'),
				allowNull: false,
				defaultValue: 'pending',
			},
			order_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'order',
					key: 'id',
					onDelete: 'CASCADE',
					onUpdate: 'CASCADE',
				},
			},
			quantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			order_item_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'order_item',
					key: 'id',
					onDelete: 'CASCADE',
					onUpdate: 'CASCADE',
				},
			},
			product_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'product',
					key: 'id',
				},
			},
			app_user_id: {
				type: DataTypes.INTEGER,
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
				type: DataTypes.STRING,
				allowNull: true,
			},
			images: {
				type: DataTypes.ARRAY(DataTypes.STRING),
				allowNull: true,
				defaultValue: [],
			},
			reason: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			customer_note: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			admin_note: {
				type: DataTypes.TEXT,
				allowNull: true,
			},

			// Exchange support
			exchange_product_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'product',
					key: 'id',
				},
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE',
			},

			exchange_order_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'order',
					key: 'id',
				},
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE',
			},

			requested_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW,
			},
			approved_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			received_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			/**
			 * By default, sequelize will automatically transform all passed model names into plural
			 * References: https://sequelize.org/master/manual/model-basics.html#table-name-inference
			 */
			tableName: 'returned',
			timestamps: true,
		}
	);
	returned.associate = (models) => {
		returned.belongsTo(models.app_user, {
			foreignKey: 'app_user_id',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
			as: 'user',
		});
		returned.belongsTo(models.order_item, {
			foreignKey: 'order_item_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
		returned.belongsTo(models.order, {
			foreignKey: 'order_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
		returned.belongsTo(models.product, {
			foreignKey: 'product_id',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
		returned.belongsTo(models.order, {
			foreignKey: 'exchange_order_id',
			as: 'exchangeOrder',
		});
		returned.belongsTo(models.product, {
			foreignKey: 'exchange_product_id',
			as: 'exchangeProduct',
		});
		returned.hasOne(models.refund, {
			foreignKey: 'returned_id',
		});
	};

	return returned;
};
