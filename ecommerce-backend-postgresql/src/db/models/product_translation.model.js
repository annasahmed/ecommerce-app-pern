module.exports = (sequelize, DataTypes) => {
	const product_translation = sequelize.define(
		'product_translation',
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			excerpt: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			slug: {
				type: DataTypes.STRING,
				allowNull: false,
			},
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
			language_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'language',
					key: 'id',
				},
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE',
			},
		},
		{
			tableName: 'product_translation',
			timestamps: true,
			indexes: [
				{
					unique: true,
					fields: ['product_id', 'language_id'],
					name: 'uniq_product_language_id',
				},
				{
					unique: true,
					fields: ['slug', 'language_id'], // unique per lang
					name: 'uniq_product_slug_language',
				},
			],
		}
	);

	product_translation.associate = (models) => {
		product_translation.belongsTo(models.product, {
			foreignKey: 'product_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
		product_translation.belongsTo(models.language, {
			foreignKey: 'language_id',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
	};

	return product_translation;
};
