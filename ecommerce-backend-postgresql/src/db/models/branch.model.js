const { baseFields, baseScopes, baseAssociation } = require('./base_model');
const modelValidators = require('./model_validators');

module.exports = (sequelize, DataTypes) => {
	const branch = sequelize.define(
		'branch',
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.JSONB,
				allowNull: false,
				validate: {
					isValidOption(value) {
						modelValidators.stringWithTranslation(value, 'name');
					},
				},
			},
			code: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			address: {
				type: DataTypes.JSONB,
				allowNull: false,
				validate: {
					isValidOption(value) {
						modelValidators.stringWithTranslation(value, 'address');
					},
				},
			},
			country: {
				type: DataTypes.JSONB,
				allowNull: true,
				validate: {
					isValidOption(value) {
						modelValidators.stringWithTranslation(value, 'country');
					},
				},
			},
			phone: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					isValidOption(value) {
						modelValidators.validatePhoneNumber(value);
					},
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isEmail: true,
				},
			},
			latitude: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			longitude: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			is_main_branch: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
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
			tableName: 'branch',
			timestamps: true,
			...baseScopes(),
		}
	);

	branch.associate = (models) => {
		branch.belongsTo(models.user, {
			foreignKey: 'user_id',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
		branch.belongsToMany(models.product_variant, {
			through: 'product_variant_to_branch',
			foreignKey: 'branch_id',
			otherKey: 'product_variant_id',
		});
		baseAssociation(branch, models);
	};

	return branch;
};
