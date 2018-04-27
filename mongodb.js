const mongoose = require('mongoose');

/* const env = process.env.NODE_ENV;
const config = require(`./config/${env}`); */
const config = require('./config');
const log = require('./log');
const url = config.mongodb.url;
const options = {
  // useMongoClient: true,
  socketTimeoutMS: 0,
  keepAlive: true,
  reconnectTries: 30,
  autoReconnect: true
};

mongoose.connect(url, options);
log.debug({ url }, 'mongodb url');
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.once('open', () => {
  console.log('连接数据库成功');
});

db.on('error', error => {
  console.error(`Error in MongoDb connection: ${error}`);
  mongoose.disconnect();
});

db.on('close', () => {
  console.log('数据库断开，重新连接数据库');
  mongoose.connect(config.mongodb.url, {
    server: {
      auto_reconnect: true
    }
  });
});

module.exports = db;
