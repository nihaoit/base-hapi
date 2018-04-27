const bunyan = require('bunyan');

const config = require('./config');
const log = bunyan.createLogger(config.logs);

module.exports = log;
