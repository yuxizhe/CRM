const proxyMiddleware = require('http-proxy-middleware');
const k2c = require('koa2-connect');

const proxyTable = {
  '/xq': {
    target: 'https://api.xueqiu.com/',
    changeOrigin: true,
    pathRewrite: path => path.replace('/xq', ''),
  },
  '/getData': {
    target: 'http://10.10.51.13:8080',
    changeOrigin: true,
    pathRewrite: path => path.replace('/getData', ''),
  },
  '/kafka': {
    target: 'http://10.10.212.14:8080',
    changeOrigin: true,
    pathRewrite: path => path.replace('/kafka', ''),
  },

};

module.exports = (app) => {
  app.use(async (ctx,next)=>{
    console.log(ctx.request);
    await next();
  })
  // proxy api requests
  Object.keys(proxyTable).forEach((context) => {
    let options = proxyTable[context];
    if (typeof options === 'string') {
      options = { target: options };
    }
    app.use(k2c(proxyMiddleware(options.filter || context, options)));
  });
};
