// 中间件列表添加在这里
const bodyParse = require('koa-bodyparser');
const logger = require('snb-lib-log');
// 接口代理
const proxy = require('./proxy');
// 接口mock
const mock = require('./mock');

module.exports = (app) => {
  proxy(app);

  // bodyParse放在代理之后
  app.use(bodyParse({
    formLimit: '50mb',
  }));

  logger(app);
  mock(app);
};
