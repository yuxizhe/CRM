const proxyMiddleware = require('http-proxy-middleware');
const k2c = require('koa2-connect');

let getDateUrl;
let kafkaUrl;

if (process.env.ENV_TAG === 'master') {
  // 生产分支
  getDateUrl = 'http://10.10.51.13:8080';
  kafkaUrl = 'http://10.10.212.14:8080';
} else {
  // rc分支
  getDateUrl = 'http://10.10.51.13:8080';
  kafkaUrl = 'http://10.10.212.14:8080';
}
module.exports = (app) => {
  app.use(async (ctx, next) => {
    if (ctx.url.startsWith('/getData') || ctx.url.startsWith('/kafka') || ctx.url.startsWith('/xqapi')) {
      ctx.respond = false;
      console.log(ctx.request.body);
      await k2c(proxyMiddleware({
        // target: '/xq',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/xqapi': '',
          '^/getData': '',
          '^/kafka': '',
        },
        router: {
          '/xqapi': 'https://api.xueqiu.com',
          '/getData': getDateUrl,
          '/kafka': kafkaUrl,
        },
      }))(ctx, next);
    }
    await next();
  });
};
