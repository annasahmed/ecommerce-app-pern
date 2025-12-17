module.exports = (sequelize, DataTypes) => {
	const favourite = sequelize.define(
		'favourite',
		{
			product_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'product',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			app_user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'app_user',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
		},
		{
			/**
			 * By default, sequelize will automatically transform all passed model names into plural
			 * References: https://sequelize.org/master/manual/model-basics.html#table-name-inference
			 */
			tableName: 'favourite',
			timestamps: true,
			uniqueKeys: {
				unique_cart_item: {
					fields: ['app_user_id', 'product_id'],
				},
			},
		}
	);
	favourite.associate = (models) => {
		favourite.belongsTo(models.product, {
			foreignKey: 'product_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
		favourite.belongsTo(models.app_user, {
			foreignKey: 'app_user_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
	};

	return favourite;
};
