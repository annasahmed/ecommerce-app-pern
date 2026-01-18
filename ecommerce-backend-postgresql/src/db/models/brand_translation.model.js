module.exports = (sequelize, DataTypes) => {
	const brand_translation = sequelize.define(
		'brand_translation',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			brand_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'brand',
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
			tableName: 'brand_translation',
			timestamps: true,
			indexes: [
				{
					unique: true,
					fields: ['brand_id', 'language_id'],
					name: 'uniq_brand_language_id',
				},
				{
					unique: true,
					fields: ['slug', 'language_id'], // unique per lang
					name: 'uniq_brand_slug_language',
				},
			],
		}
	);

	brand_translation.associate = (models) => {
		brand_translation.belongsTo(models.brand, {
			foreignKey: 'brand_id',
			as: 'parentbrand',
			onDelete: 'CASCADE',
		});
		brand_translation.belongsTo(models.language, {
			foreignKey: 'language_id',
			as: 'language',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
	};

	return brand_translation;
};
