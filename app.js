'use strict';

const Hapi = require('hapi');
const HapiAuthJwt2 = require('hapi-auth-jwt2');
const Blipp = require('blipp');
const JWT = require('jsonwebtoken');
const HapiSwagger = require('hapi-swagger');
const Inert = require('inert');
const Vision = require('vision');

const config = require('./config');
const Db = require('./mongodb.js');
const log = require('./log');
// route
// const adminCourseRoute = require('./routes/admin/course');

const server = Hapi.server({
  port: config.app.port,
  host: config.app.host
});

const db = {
  '123': { allowed: true, name: 'Charlie' },
  '321': { allowed: false, name: 'Old Gregg' }
};

const scopesDb = {
  '123': ['Admin', 'Authenticated'],
  '321': ['Authenticated']
};

const token = JWT.sign({ id: 123, name: 'Charlie' }, config.app.jwtKey);
console.log(token);
// defining our own validate function lets us do something
// useful/custom with the decodedToken before reply(ing)
const validate = function(decoded, request) {
  if (db[decoded.id].allowed) {
    const credentials = db[decoded.id];
    credentials.scope = scopesDb[decoded.id];
    return { isValid: true, credentials };
  } else {
    return { isValid: false };
  }
};

const init = async () => {
  const swaggerOptions = {
    info: { title: '魔法助理接口说明文档' },
    tags: [{ name: 'admin', description: '后台管理' }]
  };

  [
    await server.register(HapiAuthJwt2),
    await server.register(Blipp),
    await server.register([
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: swaggerOptions
      }
    ])
  ];
  server.auth.strategy('token', 'jwt', {
    key: config.app.jwtKey,
    validate,
    verifyOptions: { algorithms: ['HS256'] }
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      const env = process.env;
      log.debug({ env }, 'process.env');
      return 'Hello, world!';
    },
    config: { auth: false }
  });

  server.route({
    method: 'GET',
    path: '/{name}',
    handler: (request, h) => {
      return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
    },
    config: {
      auth: { strategy: 'token', scope: ['Admin'] },
      description: '首页接口',
      notes: '返回首页的信息，用于健康状态检查',
      tags: ['api']
    }
  });

  // server.route(adminCourseRoute);

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
