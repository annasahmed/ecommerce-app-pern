const {
	baseAssociation,
	baseFields,
	baseScopes,
	mediaField,
	mediaAssociation,
} = require('./base_model');

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
			code: {
				type: DataTypes.STRING, // en, ur
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING, //English, Urdu
				allowNull: false,
			},
			flag: { ...mediaField, field: 'flag' },
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
		mediaAssociation(language, models, 'flag');
	};

	return language;
};
