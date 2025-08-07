const { baseFields, baseScopes, baseAssociation } = require('./base_model');

module.exports = (sequelize, DataTypes) => {
	const product_to_vendor = sequelize.define(
		'product_to_vendor',
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
			vendor_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'vendor',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
		},
		{
			tableName: 'product_to_vendor',
			timestamps: true,
		}
	);
	product_to_vendor.associate = (models) => {
		product_to_vendor.belongsTo(models.product, {
			foreignKey: 'product_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
		product_to_vendor.belongsTo(models.vendor, {
			foreignKey: 'vendor_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
	};

	return product_to_vendor;
};
