const { baseFields, mediaField, mediaAssociation } = require('./base_model');
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
			image: mediaField,
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
		product_variant.belongsToMany(models.attribute, {
			through: 'product_variant_to_attribute',
			foreignKey: 'product_variant_id',
			otherKey: 'attribute_id',
		});
		mediaAssociation(product_variant, models, 'image');
	};

	return product_variant;
};
