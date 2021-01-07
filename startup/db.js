const logger = require('../startup/logging');
const config = require('config');
// const dbConfig = require("../config/db.config");
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

// const db = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`;
const db = `mongodb://${config.get('db.HOST')}:${config.get('db.PORT')}/${config.get('db.DB')}`;

module.exports = function () {
	mongoose
		.connect((db), {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		.then(() => {
			logger.info(`Successfully connected to ${config.get('db.DB')}`);
		})
		.catch(err => {
			logger.error("Connection error", err);
			process.exit();
		});
}