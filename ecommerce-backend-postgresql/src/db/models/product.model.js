const { baseFields, baseScopes, baseAssociation } = require('./base_model');
const modelValidators = require('./model_validators');

module.exports = (sequelize, DataTypes) => {
	const product = sequelize.define(
		'product',
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
			slug: {
				type: DataTypes.STRING,
				allowNull: false,
				uninque: true,
				validate: {
					isValidOption(value) {
						modelValidators.validateSlug(value);
					},
				},
			},
			cost_price: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			stock: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			sale_price: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			discount_percentage: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			thumbnail: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			images: {
				type: DataTypes.ARRAY(DataTypes.STRING),
				allowNull: true,
				defaultValue: [],
			},
			is_featured: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			meta_title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			meta_description: {
				type: DataTypes.TEXT,
				allowNull: false,
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
			tableName: 'product',
			timestamps: true,
			...baseScopes(),
		}
	);

	product.associate = (models) => {
		product.belongsTo(models.user, {
			foreignKey: 'user_id',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
		product.belongsToMany(models.category, {
			through: 'product_to_category',
		});
		product.hasMany(models.product_translation);
		baseAssociation(product, models);
	};

	return product;
};
