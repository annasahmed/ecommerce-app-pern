const { baseAssociation, baseFields, baseScopes } = require('./base_model');

module.exports = (sequelize, DataTypes) => {
	const language = sequelize.define(
		'language',
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			country: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			flag: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			...baseFields,
		},
		{
			tableName: 'language',
			timestamps: true,
			...baseScopes(),
		}
	);

	language.associate = (models) => {
		baseAssociation(language, models);
	};

	return language;
};
