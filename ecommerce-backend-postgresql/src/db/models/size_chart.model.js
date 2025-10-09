const { baseFields, baseScopes, baseAssociation } = require('./base_model');
const modelValidators = require('./model_validators');

module.exports = (sequelize, DataTypes) => {
	const size_chart = sequelize.define(
		'size_chart',
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
			description: {
				type: DataTypes.JSONB,
				allowNull: false,
				validate: {
					isValidOption(value) {
						modelValidators.stringWithTranslation(
							value,
							'description'
						);
					},
				},
			},
			chart_data: {
				type: DataTypes.JSONB,
				allowNull: false,
				defaultValue: {},
			},
			// {
			//   "columns": [
			// 	   "Size",
			// 	   "Chest (in)",
			//     "Length (in)",
			//   ],
			//   "rows": [
			//     ["S", "36", "30", "25"],
			//     ["M", "38", "32", "26"],
			//     ["L", "40", "34", "27"]
			//   ]
			// }
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
			tableName: 'size_chart',
			timestamps: true,
			...baseScopes(),
		}
	);

	size_chart.associate = (models) => {
		size_chart.belongsTo(models.user, {
			foreignKey: 'user_id',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
		size_chart.hasMany(models.product);
		baseAssociation(size_chart, models);
	};

	return size_chart;
};
