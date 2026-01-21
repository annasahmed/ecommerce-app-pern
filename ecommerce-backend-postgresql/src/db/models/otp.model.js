const { baseScopes } = require('./base_model');

module.exports = (sequelize, DataTypes) => {
	const otp = sequelize.define(
		'otp',
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},

			email: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			otp: {
				type: DataTypes.STRING,
				allowNull: false,
			},

			type: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			expires_at: {
				type: DataTypes.DATE,
				allowNull: false,
			},
		},
		{
			/**
			 * By default, sequelize will automatically transform all passed model names into plural
			 * References: https://sequelize.org/master/manual/model-basics.html#table-name-inference
			 */
			tableName: 'otp',
			timestamps: true,
		}
	);

	return otp;
};
