const path = require('path');
const { createLogger, transports, format } = require('winston');
require('express-async-errors');

const logger = createLogger({
	transports: [
		new transports.Console({ format: format.simple() }), // REMOVE when deploying to production
		// new transports.File({ filename: path.join(__dirname, '../logs/logfile.log'), level: 'info' }), // ADD when deploying to production
		new transports.File({ filename: path.join(__dirname, '../logs/logfile.json'), level: 'info' }), // REMOVE when deploying to production
	]
});

logger.exceptions.handle(
	new transports.Console(), // REMOVE when deploying to production
	// new transports.File({ filename: path.join(__dirname, '../logs/uncaughtExceptions.log') }), // ADD when deploying to production
	new transports.File({ filename: path.join(__dirname, '../logs/uncaughtExceptions.json') }) // REMOVE when deploying to production
);

process.on('unhandledRejection', (e) => {
	throw e;
});

module.exports = logger;