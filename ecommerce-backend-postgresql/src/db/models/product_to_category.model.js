module.exports = (sequelize, DataTypes) => {
	const product_to_category = sequelize.define(
		'product_to_category',
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
			category_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'category',
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
			tableName: 'product_to_category',
			timestamps: true,
		}
	);
	product_to_category.associate = (models) => {
		product_to_category.belongsTo(models.product, {
			foreignKey: 'product_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
		product_to_category.belongsTo(models.category, {
			foreignKey: 'category_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
	};

	return product_to_category;
};
