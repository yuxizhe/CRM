// 中间件列表添加在这里
const logger = require('snb-lib-log');
// 接口代理
const proxy = require('./proxy');
// 接口mock
const mock = require('./mock');

module.exports = (app) => {
  logger(app);
  mock(app);
  proxy(app);
};
