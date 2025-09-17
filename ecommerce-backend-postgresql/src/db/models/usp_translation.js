module.exports = (sequelize, DataTypes) => {
	const usp_translation = sequelize.define(
		'usp_translation',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			usp_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'usp',
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
			tableName: 'usp_translation',
			timestamps: true,
			indexes: [
				{
					unique: true,
					fields: ['usp_id', 'language_id'],
					name: 'uniq_usp_language_id',
				},
				{
					unique: true,
					fields: ['slug', 'language_id'], // unique per lang
					name: 'uniq_usp_slug_language',
				},
			],
		}
	);

	usp_translation.associate = (models) => {
		usp_translation.belongsTo(models.usp, {
			foreignKey: 'usp_id',
			as: 'parentusp',
			onDelete: 'CASCADE',
		});
		usp_translation.belongsTo(models.language, {
			foreignKey: 'language_id',
			as: 'language',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
	};

	return usp_translation;
};
