const { Client } = require('pg');
const config = require('./config');
const logger = require('./logger');

let client;

(async function name() {
	try {
		if (process.env.DATABASE_URL) {
			//only for render deployment
			// Render or any hosted PostgreSQL service
			client = new Client({
				connectionString: process.env.DATABASE_URL,
				ssl: {
					require: true,
					rejectUnauthorized: false,
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
