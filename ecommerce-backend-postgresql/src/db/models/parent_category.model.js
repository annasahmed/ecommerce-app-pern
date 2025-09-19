const {
	baseFields,
	baseScopes,
	baseAssociation,
	mediaField,
	mediaAssociation,
} = require('./base_model');
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
			icon: { ...mediaField, field: 'icon' },
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
		parent_category.hasMany(models.category);
		// parent_category.hasMany(models.parent_category_translation);
		parent_category.hasMany(models.parent_category_translation, {
			foreignKey: 'parent_category_id',
			as: 'translations',
			onDelete: 'CASCADE',
		});

		baseAssociation(parent_category, models);
		mediaAssociation(parent_category, models, 'icon');
	};

	return parent_category;
};
