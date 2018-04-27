/* if (process.env.NODE_ENV === 'development') {
  config = require('./development');
} else if (process.env.NODE_ENV === 'production') {
  config = require('./production');
} */

const env = process.env.NODE_ENV;
const config = require(`./${env}`);

module.exports = config;
