const { baseFields, baseScopes, baseAssociation } = require('./base_model');
const modelValidators = require('./model_validators');

module.exports = (sequelize, DataTypes) => {
	const parent_category = sequelize.define(
		'parent_category',
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
				uninque: true,
				validate: {
					isValidOption(value) {
						modelValidators.validateSlug(value);
					},
				},
			},
			icon: {
				type: DataTypes.STRING,
				allowNull: true,
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
			tableName: 'parent_category',
			timestamps: true,
			...baseScopes(),
		}
	);

	parent_category.associate = (models) => {
		parent_category.belongsTo(models.user, {
			foreignKey: 'user_id',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
		baseAssociation(parent_category, models);
	};

	return parent_category;
};
