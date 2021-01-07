const logger = require('./startup/logging');
const express = require("express");
const app = express();

require('./startup/db')();
require('./startup/routes')(app);
require('./startup/production')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}.`);
});

module.exports = server;