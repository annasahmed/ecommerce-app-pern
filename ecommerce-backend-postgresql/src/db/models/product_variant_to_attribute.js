module.exports = (sequelize, DataTypes) => {
	const product_variant_to_attribute = sequelize.define(
		'product_variant_to_attribute',
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			product_variant_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'product_variant',
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
			tableName: 'product_variant_to_attribute',
			timestamps: true,
		}
	);
	product_variant_to_attribute.associate = (models) => {
		product_variant_to_attribute.belongsTo(models.product_variant, {
			foreignKey: 'product_variant_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
		product_variant_to_attribute.belongsTo(models.attribute, {
			foreignKey: 'attribute_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
	};

	return product_variant_to_attribute;
};
