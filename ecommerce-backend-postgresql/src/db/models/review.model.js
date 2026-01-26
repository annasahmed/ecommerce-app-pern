const {
	baseFields,
	baseScopes,
	baseAssociation,
	mediaField,
	mediaAssociation,
} = require('./base_model');
const modelValidators = require('./model_validators');

module.exports = (sequelize, DataTypes) => {
	const review = sequelize.define(
		'review',
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			guest_name: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			product_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			order_item_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			app_user_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			rating: {
				type: DataTypes.INTEGER,
				allowNull: true,
				validate: {
					min: 1,
					max: 5,
				},
			},
			// for saving product title
			title: {
				type: DataTypes.STRING,
				allowNull: true,
			},

			comment: {
				type: DataTypes.TEXT,
				allowNull: true,
			},

			is_verified: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},

			status: {
				type: DataTypes.ENUM('PENDING', 'APPROVED', 'REJECTED'),
				defaultValue: 'PENDING',
			},
		},
		{
			tableName: 'review',
			timestamps: true,
		}
	);

	review.associate = (models) => {
		review.belongsTo(models.app_user, {
			foreignKey: 'app_user_id',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
			as: 'user',
		});
		review.belongsTo(models.product, {
			foreignKey: 'product_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
	};

	return review;
};
