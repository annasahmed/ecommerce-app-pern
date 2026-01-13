const { baseFields, baseScopes, baseAssociation } = require('./base_model');
const modelValidators = require('./model_validators');

module.exports = (sequelize, DataTypes) => {
	const vendor = sequelize.define(
		'vendor',
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			// name: {
			// 	type: DataTypes.JSONB,
			// 	allowNull: false,
			// 	validate: {
			// 		isValidOption(value) {
			// 			modelValidators.stringWithTranslation(value, 'name');
			// 		},
			// 	},
			// },
			// address: {
			// 	type: DataTypes.JSONB,
			// 	allowNull: true,
			// 	validate: {
			// 		isValidOption(value) {
			// 			modelValidators.stringWithTranslation(value, 'address');
			// 		},
			// 	},
			// },
			// country: {
			// 	type: DataTypes.JSONB,
			// 	allowNull: true,
			// 	validate: {
			// 		isValidOption(value) {
			// 			modelValidators.stringWithTranslation(value, 'country');
			// 		},
			// 	},
			// },
			phone: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					isValidOption(value) {
						modelValidators.validatePhoneNumber(value);
					},
				},
			},
			contact_person: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					isEmail: true,
				},
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'user',
					key: 'id',
				},
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE',
			},
			...baseFields,
		},
		{
			tableName: 'vendor',
			timestamps: true,
			...baseScopes(),
		}
	);

	vendor.associate = (models) => {
		vendor.belongsTo(models.user, {
			foreignKey: 'user_id',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
		vendor.belongsToMany(models.product, {
			through: 'product_to_vendor',
			foreignKey: 'vendor_id',
			otherKey: 'product_id',
		});
		vendor.hasMany(models.vendor_translation, {
			foreignKey: 'vendor_id',
			as: 'translations',
			onDelete: 'CASCADE',
		});
		baseAssociation(vendor, models);
	};

	return vendor;
};
