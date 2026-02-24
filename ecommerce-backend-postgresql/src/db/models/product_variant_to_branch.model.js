const { baseFields, baseScopes, baseAssociation } = require('./base_model');

module.exports = (sequelize, DataTypes) => {
	const product_variant_to_branch = sequelize.define(
		'product_variant_to_branch',
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			product_variant_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'product_variant',
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
				defaultValue: 100,
			},
			low_stock: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 10,
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
				field: 'discount_percentage',
			},
			...baseFields,
		},
		{
			tableName: 'product_variant_to_branch',
			timestamps: true,
			...baseScopes(),
		}
	);
	product_variant_to_branch.associate = (models) => {
		product_variant_to_branch.belongsTo(models.product_variant, {
			foreignKey: 'product_variant_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
		product_variant_to_branch.belongsTo(models.branch, {
			foreignKey: 'branch_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
		baseAssociation(product_variant_to_branch, models);
	};

	return product_variant_to_branch;
};
