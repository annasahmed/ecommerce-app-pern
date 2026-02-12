module.exports = (sequelize, DataTypes) => {
	const similar_product = sequelize.define(
		'similar_product',
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
			similar_product_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'product',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
		},
		{
			tableName: 'similar_product',
			timestamps: false,
			indexes: [
				{
					fields: ['product_id'],
				},
				{
					fields: ['similar_product_id'],
				},
				{
					unique: true,
					fields: ['product_id', 'similar_product_id'],
				},
			],
		}
	);

	similar_product.associate = (models) => {
		similar_product.belongsTo(models.product, {
			as: 'product',
			foreignKey: 'product_id',
		});

		similar_product.belongsTo(models.product, {
			as: 'similar_product',
			foreignKey: 'similar_product_id',
		});
	};

	return similar_product;
};
