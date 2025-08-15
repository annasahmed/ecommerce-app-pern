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
	};
} else {
	// Local development
	dbConfig = mainConfig.sqlDB;
}

module.exports = dbConfig;
