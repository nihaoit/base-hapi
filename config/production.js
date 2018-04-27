// Base configuration
const config = require('./development');

// Override configurations for Production environment
config.mongodb.url =
  'mongodb://xpyh:Haoyes888@dds-uf686740666d4ef433270.mongodb.rds.aliyuncs.com:3717/xpyhdb';
config.app = {
  port: 8000,
  routePrefix: '/api'
};
config.logs.folder = '/var/log';
config.logs.streams = [
  {
    level: 'info',
    path: config.logs.folder + '/app.log'
  }
];
config.uploads.folder = '/uploads';
config.uploads.baseUrl = 'nicistore.com/files';
config.storefront.baseUrl = 'https://nicistore.com';
config.switchPayments.baseUrl = 'https://api.switchpayments.com/v2';

// Export
module.exports = config;
