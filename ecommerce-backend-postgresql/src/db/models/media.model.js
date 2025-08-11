const { baseFields, baseScopes, baseAssociation } = require('./base_model');
const modelValidators = require('./model_validators');

module.exports = (sequelize, DataTypes) => {
	const media = sequelize.define(
		'media',
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			url: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			title: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			size: {
				type: DataTypes.FLOAT,
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
			deleted_by: baseFields.deleted_by,
			deleted_at: baseFields.deleted_at,
		},
		{
			tableName: 'media',
			timestamps: true,
			...baseScopes(),
		}
	);

	media.associate = (models) => {
		media.belongsTo(models.user, {
			foreignKey: 'user_id',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
		media.belongsToMany(models.product, {
			through: 'product_to_media',
			foreignKey: 'media_id',
			otherKey: 'product_id',
		});
		baseAssociation(media, models);
	};

	return media;
};
