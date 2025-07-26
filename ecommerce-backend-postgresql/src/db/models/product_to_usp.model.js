module.exports = (sequelize, DataTypes) => {
	const product_to_usp = sequelize.define(
		'product_to_usp',
		{
			product_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'product',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
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
		},
		{
			/**
			 * By default, sequelize will automatically transform all passed model names into plural
			 * References: https://sequelize.org/master/manual/model-basics.html#table-name-inference
			 */
			tableName: 'product_to_usp',
			timestamps: true,
		}
	);
	product_to_usp.associate = (models) => {
		product_to_usp.belongsTo(models.product, {
			foreignKey: 'product_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
		product_to_usp.belongsTo(models.usp, {
			foreignKey: 'usp_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
	};

	return product_to_usp;
};
