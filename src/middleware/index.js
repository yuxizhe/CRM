// 中间件列表添加在这里

// 接口代理
const proxy = require('./proxy');
// 接口mock
const mock = require('./mock');

module.exports = function module(app) {
  mock(app);
  proxy(app);
};
