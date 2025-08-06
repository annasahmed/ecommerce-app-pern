const { baseFields, baseScopes, baseAssociation } = require('./base_model');

module.exports = (sequelize, DataTypes) => {
	const product_to_branch = sequelize.define(
		'product_to_branch',
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
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
			branch_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'branch',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			//move to product_branch
			cost_price: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			//move to product_branch
			stock: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			low_stock: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			reorder_quantity: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			//move to product_branch
			sale_price: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			//move to product_branch
			discount_percentage: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			...baseFields,
		},
		{
			tableName: 'product_to_branch',
			timestamps: true,
			...baseScopes(),
		}
	);
	product_to_branch.associate = (models) => {
		product_to_branch.belongsTo(models.product, {
			foreignKey: 'product_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
		product_to_branch.belongsTo(models.branch, {
			foreignKey: 'branch_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
		baseAssociation(product_to_branch, models);
	};

	return product_to_branch;
};
