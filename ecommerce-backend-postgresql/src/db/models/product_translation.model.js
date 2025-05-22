const { baseFields, baseScopes, baseAssociation } = require('./base_model');
const modelValidators = require('./model_validators');

module.exports = (sequelize, DataTypes) => {
	const product_translation = sequelize.define(
		'product_translation',
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			excerpt: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: false,
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
			language_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'language',
					key: 'id',
				},
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE',
			},
		},
		{
			tableName: 'product_translation',
			timestamps: true,
		}
	);

	product_translation.associate = (models) => {
		product_translation.belongsTo(models.product, {
			foreignKey: 'product_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
		product_translation.belongsTo(models.language, {
			foreignKey: 'language_id',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
	};

	return product_translation;
};
