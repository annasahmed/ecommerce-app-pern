module.exports = (sequelize, DataTypes) => {
	const setting = sequelize.define(
		'setting',
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			setting: {
				type: DataTypes.JSONB,
				allowNull: false,
			},
		},
		{
			tableName: 'setting',
			timestamps: true,
		}
	);

	return setting;
};
