const { baseFields, baseScopes, baseAssociation } = require('./base_model');
const modelValidators = require('./model_validators');

module.exports = (sequelize, DataTypes) => {
	const brand = sequelize.define(
		'brand',
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
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
			tableName: 'brand',
			timestamps: true,
			...baseScopes(),
		}
	);

	brand.associate = (models) => {
		brand.belongsTo(models.user, {
			foreignKey: 'user_id',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
		brand.hasMany(models.product, {
			foreignKey: 'brand_id',
			onDelete: 'SET NULL',
		});
		brand.hasMany(models.brand_translation, {
			foreignKey: 'brand_id',
			as: 'translations',
			onDelete: 'CASCADE',
		});
		baseAssociation(brand, models);
	};

	return brand;
};
