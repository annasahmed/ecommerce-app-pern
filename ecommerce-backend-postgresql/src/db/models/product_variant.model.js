const { baseFields, baseScopes, baseAssociation } = require('./base_model');
const modelValidators = require('./model_validators');

module.exports = (sequelize, DataTypes) => {
	const product_variant = sequelize.define(
		'product_variant',
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			sku: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			attributes: {
				type: DataTypes.JSONB, // e.g., { "size": "M", "color": "Red" }
				allowNull: false,
				validate: {
					isValidOption(value) {
						modelValidators.stringWithTranslation(
							value,
							'attributes'
						);
					},
				},
			},
			image: {
				type: DataTypes.STRING,
				allowNull: false,
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
			status: baseFields.status,
		},
		{
			tableName: 'product_variant',
			timestamps: true,
			...baseScopes(),
		}
	);

	product_variant.associate = (models) => {
		product_variant.belongsTo(models.product, {
			foreignKey: 'product_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
		product_variant.belongsToMany(models.branch, {
			through: 'product_variant_to_branch',
			foreignKey: 'product_variant_id',
			otherKey: 'branch_id',
		});
	};

	return product_variant;
};
