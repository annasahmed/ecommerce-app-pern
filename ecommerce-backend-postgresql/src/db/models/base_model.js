const { Op, DataTypes } = require('sequelize');
const { localizeAttributes } = require('../../utils/commonUtils');

const baseFields = {
	status: {
		type: DataTypes.BOOLEAN,
		defaultValue: true,
		allowNull: false,
	},
	deleted_by: {
		type: DataTypes.INTEGER,
		allowNull: true,
		references: {
			model: 'user',
			key: 'id',
		},
		onDelete: 'SET NULL',
		onUpdate: 'CASCADE',
	},
	deleted_at: {
		type: DataTypes.DATE,
		allowNull: true,
	},
};

const mediaField = {
	type: DataTypes.INTEGER,
	allowNull: true,
	references: {
		model: 'media',
		key: 'id',
	},
	onDelete: 'SET NULL',
	onUpdate: 'CASCADE',
};

const mediaAssociation = (modelName, models, foreignKey) => {
	modelName.belongsTo(models.media, {
		foreignKey,
		onDelete: 'SET NULL',
		onUpdate: 'CASCADE',
	});
};

const baseScopes = (withPassword, withUserId = true, withStatus = true) => ({
	defaultScope: {
		...(!withPassword
			? {
					attributes: {
						exclude: ['deleted_at', 'deleted_by'],
					},
			  }
			: {
					attributes: {
						exclude: ['password', 'deleted_at', 'deleted_by'],
					},
			  }),
		where: {
			deleted_at: null,
			// status: true,
		},
	},
	scopes: {
		// defaultScope: {
		// 	...(!withPassword ? {} : { attributes: { exclude: ['password'] } }),
		// 	where: {
		// 		deleted_at: null,
		// 		status: true,
		// 	},
		// },
		withDeleted: {}, // returns everything

		onlyDeleted: {
			where: {
				deleted_at: {
					[Op.ne]: null,
				},
			},
		},
		notDeleted: {
			where: {
				deleted_at: null,
			},
		},
		inactive: {
			where: {
				status: false,
			},
		},
		activeEntity: {
			where: {
				deleted_at: null,
				status: true,
			},
		},
		active: (
			isPassword = withPassword,
			isUserId = withUserId,
			isStatus = withStatus
		) => {
			const exclude = ['updated_at', 'deleted_at', 'deleted_by'];

			if (isPassword) {
				exclude.push('password');
			}
			if (isUserId) {
				exclude.push('user_id');
			}
			if (isStatus) {
				exclude.push('status');
			}

			return {
				attributes: { exclude },
				where: {
					deleted_at: null,
					status: true,
				},
			};
		},
		withPassword: {
			attributes: {},
		},
		localized: (fields, lang, alias) => {
			return {
				attributes: {
					// exclude: fields, // remove raw JSON
					include: localizeAttributes(fields, lang, alias),
				},
			};
		},
		onlyId: {
			attributes: ['id'],
		},
	},
});

const baseAssociation = (modelName, models) => {
	modelName.belongsTo(models.user, {
		foreignKey: 'deleted_by',
		onDelete: 'SET NULL',
		onUpdate: 'CASCADE',
	});
};

module.exports = {
	baseAssociation,
	baseFields,
	baseScopes,

	mediaField,
	mediaAssociation,
};
