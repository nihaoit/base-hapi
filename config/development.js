const path = require('path');

process.env.JWT_KEY = 'haoyescom';

module.exports = {
  app: {
    host: '0.0.0.0',
    port: 8000,
    jwtKey: process.env.JWT_KEY,
    defaultCurrency: 'EUR'
  },
  api: {
    routePrefix: '/api/v1',
    adminRoutePrefix: '/api/admin/v1'
  },
  wechat: {
    appId: 'your appId',
    appSecret: 'your appSecret'
  },
  aliyun: {
    accessKeyId: 'your accesskeyId',
    secret: 'your secret'
  },
  mongodb: {
    url: 'mongodb://127.0.0.1/app'
  },
  logs: {
    name: 'app',
    folder: path.join(__dirname, '../logs/'),
    streams: [
      {
        level: 'debug',
        stream: process.stdout // log INFO and above to stdout
      }
    ]
  },
  uploads: {
    provider: 'atlas',
    folder: path.join(process.cwd(), 'uploads'),
    baseUrl: 'localhost:8000/uploads'
  },
  emails: {
    from: {
      name: 'Nicistore.com',
      email: 'vendas@nicistore.com'
    }
  },
  storefront: {
    label: 'nicistore.com',
    baseUrl: 'http://localhost:3000',
    defaultLocale: 'pt'
  },
  switchPayments: {
    enabled: true,
    baseUrl: 'https://api-test.switchpayments.com/v2',
    accountId: process.env.SWITCH_ACCOUNT_ID || 0,
    privateKey: process.env.SWITCH_PRIVATE_KEY
  },
  mailgun: {
    domain: process.env.MAILGUN_DOMAIN,
    apiKey: process.env.MAILGUN_API_KEY
  }
};
