const {
	baseFields,
	baseScopes,
	baseAssociation,
	mediaField,
	mediaAssociation,
} = require('./base_model');

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
			first_name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			last_name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			image: mediaField,
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
			is_logged: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			role_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'role',
					key: 'id',
				},
				onDelete: 'RESTRICT',
				onUpdate: 'CASCADE',
			},
			...baseFields,
		},
		{
			tableName: 'user',
			timestamps: true,
			...baseScopes(true),
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
		baseAssociation(user, models);
		mediaAssociation(user, models, 'image');
	};

	return user;
};
