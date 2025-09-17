module.exports = (sequelize, DataTypes) => {
	const parent_category_translation = sequelize.define(
		'parent_category_translation',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
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
			language_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'language',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			slug: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			tableName: 'parent_category_translation',
			timestamps: true,
			indexes: [
				{
					unique: true,
					fields: ['parent_category_id', 'language_id'],
					name: 'uniq_parent_category_language_id',
				},
				{
					unique: true,
					fields: ['slug', 'language_id'], // unique per lang
					name: 'uniq_parent_category_slug_language',
				},
			],
		}
	);

	parent_category_translation.associate = (models) => {
		parent_category_translation.belongsTo(models.parent_category, {
			foreignKey: 'parent_category_id',
			as: 'parentCategory',
			onDelete: 'CASCADE',
		});
		parent_category_translation.belongsTo(models.language, {
			foreignKey: 'language_id',
			as: 'language',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
	};

	return parent_category_translation;
};
