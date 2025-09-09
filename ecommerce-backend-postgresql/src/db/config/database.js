require('dotenv').config();
const mainConfig = require('../../config/config');

let dbConfig;

if (process.env.DATABASE_URL) {
	// Production / Render
	dbConfig = {
		use_env_variable: 'DATABASE_URL',
		dialect: 'postgres',
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
		define: {
			/**
			 * All tables won't have "createdAt" and "updatedAt" Auto fields.
			 * References: https://sequelize.org/master/manual/model-basics.html#timestamps
			 */
			timestamps: false,
			// Table names won't be pluralized.
			freezeTableName: true,
			// Column names will be underscored.
			underscored: true,
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	};
} else {
	// Local development
	dbConfig = mainConfig.sqlDB;
}

module.exports = dbConfig;
