const { baseFields, baseScopes, baseAssociation } = require('./base_model');
const modelValidators = require('./model_validators');

module.exports = (sequelize, DataTypes) => {
	const usp = sequelize.define(
		'usp',
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
			tableName: 'usp',
			timestamps: true,
			...baseScopes(),
		}
	);

	usp.associate = (models) => {
		usp.belongsTo(models.user, {
			foreignKey: 'user_id',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
		usp.belongsToMany(models.product, {
			through: 'product_to_usp',
			foreignKey: 'usp_id',
			otherKey: 'product_id',
		});
		usp.hasMany(models.usp_translation, {
			foreignKey: 'usp_id',
			as: 'translations',
			onDelete: 'CASCADE',
		});
		baseAssociation(usp, models);
	};

	return usp;
};
