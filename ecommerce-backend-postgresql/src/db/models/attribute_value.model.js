const { baseFields, baseScopes, baseAssociation } = require('./base_model');
const modelValidators = require('./model_validators');

module.exports = (sequelize, DataTypes) => {
	const attribute_value = sequelize.define(
		'attribute_value',
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			attribute_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'attribute',
					key: 'id',
				},
				onDelete: 'RESTRICT',
				onUpdate: 'CASCADE',
			},

			values: {
				type: DataTypes.JSONB, // {"en":"Red","ur":"سرخ"}
				allowNull: false,
			},
		},
		{
			tableName: 'attribute_value',
			timestamps: false,
		}
	);

	attribute_value.associate = (models) => {
		attribute_value.belongsTo(models.attribute, {
			foreignKey: 'attribute_id',
			as: 'attribute',
			onDelete: 'RESTRICT',
			onUpdate: 'CASCADE',
		});
		attribute_value.belongsToMany(models.product_variant, {
			through: 'product_variant_to_attribute_value',
			foreignKey: 'attribute_value_id',
			otherKey: 'product_variant_id',
		});
	};

	return attribute_value;
};
