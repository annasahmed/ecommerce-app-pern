const { baseFields, baseScopes, baseAssociation } = require('./base_model');
const modelValidators = require('./model_validators');

module.exports = (sequelize, DataTypes) => {
	const attribute = sequelize.define(
		'attribute',
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.JSONB,
				allowNull: false,
				validate: {
					isValidOption(value) {
						modelValidators.stringWithTranslation(value, 'name');
					},
				},
			},
			values: {
				type: DataTypes.ARRAY(DataTypes.JSONB), // [{"en":"Red","ur":"سرخ"},{"en":"Blue","ur":"نیلا"}]
				allowNull: false,
				defaultValue: [],
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'user',
					key: 'id',
				},
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE',
			},
			...baseFields,
		},
		{
			tableName: 'attribute',
			timestamps: true,
			...baseScopes(),
		}
	);

	attribute.associate = (models) => {
		attribute.belongsTo(models.user, {
			foreignKey: 'user_id',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
		attribute.belongsToMany(models.product_variant, {
			through: 'product_variant_to_attribute',
			foreignKey: 'attribute_id',
			otherKey: 'product_variant_id',
		});
		baseAssociation(attribute, models);
	};

	return attribute;
};
