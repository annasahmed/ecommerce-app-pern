module.exports = (sequelize, DataTypes) => {
	const refund = sequelize.define(
		'refund',
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			status: {
				type: DataTypes.ENUM('pending', 'processed', 'failed'),
				allowNull: false,
				defaultValue: 'pending',
			},
			returned_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'returned',
					key: 'id',
					onDelete: 'CASCADE',
					onUpdate: 'CASCADE',
				},
			},
			refund_method: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			total_amount: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
			},
			processed_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			completed_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			/**
			 * By default, sequelize will automatically transform all passed model names into plural
			 * References: https://sequelize.org/master/manual/model-basics.html#table-name-inference
			 */
			tableName: 'refund',
			timestamps: true,
		}
	);
	refund.associate = (models) => {
		refund.belongsTo(models.returned, {
			foreignKey: 'returned_id',
		});
	};

	return refund;
};
