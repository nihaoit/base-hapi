const redis = require('promise-redis')();

let client;
if (process.env.NODE_ENV === 'development') {
  client = redis.createClient();
} else {
  client = redis.createClient({
    port: 6379,
    host: 'r-uf611752df538da8.redis.rds.aliyuncs.com'
  });
  client.auth('AAABBBCCC', redis.print);
}

module.exports = client;
