// model/attribute.js
const { baseAssociation, baseFields, baseScopes } = require('./base_model');
const modelValidators = require('./model_validators');

module.exports = (sequelize, DataTypes) => {
	const attribute = sequelize.define(
		'attribute',
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			title: {
				type: DataTypes.JSONB,
				allowNull: false,
				validate: {
					isValidOption(value) {
						modelValidators.stringWithTranslation(value, 'title');
					},
				},
				/**
				 * Example structure:
				 * {
				 * en: "Size",
				 * ur: "سائز"
				 * ...
				 * },
				 */
			},
			link: {
				type: DataTypes.TEXT,
				allowNull: true,
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
			tableName: 'attribute',
			timestamps: true,
			...baseScopes(),
		}
	);

	attribute.associate = (models) => {
		attribute.belongsTo(models.user, {
			foreignKey: 'user_id',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
		baseAssociation(attribute, models);
	};

	return attribute;
};
