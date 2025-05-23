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
			title: {
				type: DataTypes.JSONB,
				allowNull: false,
				validate: {
					isValidOption(value) {
						modelValidators.stringWithTranslation(value, 'title');
					},
				},
			},
			description: {
				type: DataTypes.JSONB,
				allowNull: true,
				validate: {
					isValidOption(value) {
						modelValidators.stringWithTranslation(
							value,
							'description'
						);
					},
				},
			},
			slug: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isValidOption(value) {
						modelValidators.validateSlug(value);
					},
				},
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
		});
		baseAssociation(usp, models);
	};

	return usp;
};
