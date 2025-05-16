const { baseFields } = require('./base_model');

module.exports = (sequelize, DataTypes) => {
	const user = sequelize.define(
		'user',
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			...baseFields,
		},
		{
			tableName: 'user',
			timestamps: true,
			defaultScope: {
				attributes: { exclude: ['password'] },
			},
			// if want to get password then use user.scope('withPassword').findOne()
			scopes: {
				withPassword: {
					attributes: {},
				},
			},
			// indexes: [
			// 	{
			// 		fields: ['email'],
			// 		unique: true,
			// 	},
			// 	{
			// 		fields: ['status'],
			// 	},
			// ],
		}
	);

	user.associate = (models) => {
		user.belongsTo(models.role, {
			foreignKey: 'role_id',
			onDelete: 'RESTRICT',
			onUpdate: 'CASCADE',
		});

		user.hasOne(models.token);
	};

	return user;
};
