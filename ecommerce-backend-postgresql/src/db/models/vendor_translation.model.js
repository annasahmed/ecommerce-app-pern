module.exports = (sequelize, DataTypes) => {
	const vendor_translation = sequelize.define(
		'vendor_translation',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			vendor_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'vendor',
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
			slug: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			address: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			country: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{
			tableName: 'vendor_translation',
			timestamps: true,
			indexes: [
				{
					unique: true,
					fields: ['vendor_id', 'language_id'],
					name: 'uniq_vendor_language_id',
				},
				{
					unique: true,
					fields: ['slug', 'language_id'], // unique per lang
					name: 'uniq_vendor_slug_language',
				},
			],
		}
	);

	vendor_translation.associate = (models) => {
		vendor_translation.belongsTo(models.vendor, {
			foreignKey: 'vendor_id',
			as: 'parentvendor',
			onDelete: 'CASCADE',
		});
		vendor_translation.belongsTo(models.language, {
			foreignKey: 'language_id',
			as: 'language',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
	};

	return vendor_translation;
};
