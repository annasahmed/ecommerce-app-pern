// use this model only for filters
// this model is when there are no variants

module.exports = (sequelize, DataTypes) => {
	const product_to_attribute = sequelize.define(
		'product_to_attribute',
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
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
			attribute_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'attribute',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			value: {
				type: DataTypes.JSONB, // attributes values like {"en":"Red","ur":"سرخ"} {"en":"S","ur":"چھوٹا"}
				allowNull: false,
			},
		},
		{
			tableName: 'product_to_attribute',
			timestamps: true,
		}
	);
	product_to_attribute.associate = (models) => {
		product_to_attribute.belongsTo(models.product, {
			foreignKey: 'product_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
		product_to_attribute.belongsTo(models.attribute, {
			foreignKey: 'attribute_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
	};

	return product_to_attribute;
};
