const proxyMiddleware = require('http-proxy-middleware');
const k2c = require('koa2-connect');

const proxyTable = {
  '/xq': {
    target: 'https://api.xueqiu.com/',
    changeOrigin: true,
    pathRewrite: path => path.replace('/xq', ''),
  },
};

module.exports = function proxy(app) {
  // proxy api requests
  Object.keys(proxyTable).forEach((context) => {
    let options = proxyTable[context];
    if (typeof options === 'string') {
      options = {
        target: options,
      };
    }
    app.use(k2c(proxyMiddleware(options.filter || context, options)));
  });
};
