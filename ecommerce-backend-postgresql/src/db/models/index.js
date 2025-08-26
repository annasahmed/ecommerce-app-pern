/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const config = require(`${__dirname}/../../config/config`);

const basename = path.basename(module.filename);

const db = {};

// const sequelize = new Sequelize(
// 	config.sqlDB.database,
// 	config.sqlDB.user,
// 	config.sqlDB.password,
// 	{
// 		...config.sqlDB,
// 		logging: false,
// 	}
// );

let sequelize;

if (process.env.DATABASE_URL) {
	// Render / production environment
	sequelize = new Sequelize(process.env.DATABASE_URL, {
		dialect: 'postgres',
		protocol: 'postgres',
		logging: false,
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
	});
} else {
	// Local development
	sequelize = new Sequelize(
		config.sqlDB.database,
		config.sqlDB.user,
		config.sqlDB.password,
		{
			...config.sqlDB,
			host: config.sqlDB.host,
			dialect: 'postgres',
			logging: false,
		}
	);
}

fs.readdirSync(__dirname)
	.filter(
		(file) =>
			file.indexOf('.') !== 0 &&
			file !== basename &&
			file.slice(-9) === '.model.js'
	)
	.forEach((file) => {
		const model = require(path.join(__dirname, file))(
			sequelize,
			Sequelize.DataTypes
		);
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
