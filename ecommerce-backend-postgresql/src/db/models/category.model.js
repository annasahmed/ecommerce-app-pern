const {
	baseFields,
	baseScopes,
	baseAssociation,
	mediaField,
	mediaAssociation,
} = require('./base_model');
const modelValidators = require('./model_validators');

module.exports = (sequelize, DataTypes) => {
	const category = sequelize.define(
		'category',
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			icon: { ...mediaField, field: 'icon' },
			parent_category_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'parent_category',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
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
			tableName: 'category',
			timestamps: true,
			...baseScopes(),
		}
	);

	category.associate = (models) => {
		category.belongsTo(models.parent_category, {
			foreignKey: 'parent_category_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
		category.belongsTo(models.user, {
			foreignKey: 'user_id',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
		category.belongsToMany(models.product, {
			through: 'product_to_category',
			foreignKey: 'category_id',
			otherKey: 'product_id',
		});
		baseAssociation(category, models);
		mediaAssociation(category, models, 'icon');
	};

	return category;
};
