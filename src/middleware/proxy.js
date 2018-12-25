const proxyMiddleware = require('http-proxy-middleware');

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
      options = { target: options };
    }
    app.use(proxyMiddleware(options.filter || context, options));
  });
};
