const userController = require('../controllers/user');
const config = require('../config');

let routes = [
  {
    method: 'POST',
    path: '/courses',
    handler: userController.create,
    options: {
      auth: false,
      tags: ['api'],
      description: 'create user',
      notes: '创建一个新用户'
    }
  }
];

let newRoutes = routes.map(item => {
  item.path = config.api.routePrefix + item.path;
  return item;
});

module.exports = newRoutes;
