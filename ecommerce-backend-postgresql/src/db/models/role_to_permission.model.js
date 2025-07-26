module.exports = (sequelize, DataTypes) => {
	const role_to_permission = sequelize.define(
		'role_to_permission',
		{
			role_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'role',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			permission_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'permission',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
		},
		{
			/**
			 * By default, sequelize will automatically transform all passed model names into plural
			 * References: https://sequelize.org/master/manual/model-basics.html#table-name-inference
			 */
			tableName: 'role_to_permission',
			timestamps: true,
		}
	);
	// role_to_permission.associate = (models) => {
	// 	role_to_permission.belongsTo(models.role, {
	// 		foreignKey: 'role_id',
	// 		onDelete: 'CASCADE',
	// 		onUpdate: 'CASCADE',
	// 	});
	// 	role_to_permission.belongsTo(models.permission, {
	// 		foreignKey: 'permission_id',
	// 		onDelete: 'CASCADE',
	// 		onUpdate: 'CASCADE',
	// 	});
	// };

	return role_to_permission;
};
