const Boom = require('boom');
const User = require('../models/user');

module.exports.create = async function(request, h) {
  try {
    const { name, age } = request.payload;
    const newData = {
      name,
      age
    };
    await User.create(newData);
    const result = {
      code: 0,
      msg: '用户创建成功'
    };
    return result;
  } catch (err) {
    return Boom.badRequest(err.message, err);
  }
};
