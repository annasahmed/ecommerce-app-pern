const { Client } = require('pg');
const config = require('./config');
const logger = require('./logger');

let client;

(async function name() {
	try {
		if (process.env.DATABASE_URL) { //only for render deployment
			// Render or any hosted PostgreSQL service
			client = new Client({
				connectionString: process.env.DATABASE_URL,
				ssl: {
					require: true,
					rejectUnauthorized: false,
				},
			});
		} else {
			client = new Client(config.sqlDB);
		}
		await client.connect();
		logger.info('Connect to postgress sucessfully');
		return client;
	} catch (error) {
		logger.error('Connect to postgress error', error);
		process.exit(1);
	}
})();

module.exports = {
	postgres: client,
};
