const {
	baseFields,
	baseScopes,
	baseAssociation,
	mediaField,
	mediaAssociation,
} = require('./base_model');

module.exports = (sequelize, DataTypes) => {
	const app_user = sequelize.define(
		'app_user',
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
			image: mediaField, // will change this late no need of media table association here will change to simple string
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: true,
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			phone: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					isValidOption(value) {
						modelValidators.validatePhoneNumber(value);
					},
				},
			},
			user_type: {
				type: DataTypes.ENUM('website', 'mobile'),
				allowNull: false,
			},
			is_logged: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			status: baseFields.status,
		},
		{
			/**
			 * By default, sequelize will automatically transform all passed model names into plural
			 * References: https://sequelize.org/master/manual/model-basics.html#table-name-inference
			 */
			tableName: 'app_user',
			timestamps: true,
			...baseScopes(true),
		}
	);
	app_user.associate = (models) => {
		app_user.hasOne(models.token);
		mediaAssociation(app_user, models, 'image');
	};

	return app_user;
};
