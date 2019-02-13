/**
 * 启动在3001 只处理 node 接口 nodemon重启，避免引发webpack重新打包
 */
const Koa = require('koa');

const proxyMiddleware = require('http-proxy-middleware');
const k2c = require('koa2-connect');

const middleware = require('../middlewares');

const app = new Koa();


middleware(app);

// nodemon 与 wepack-dev 结合。实现改动node只nodemon重启不重新打包，改动src能热更新
app.use(k2c(proxyMiddleware('/', {
  target: 'http://localhost:4001/',
  changeOrigin: true,
})));

app.listen(3001, () => console.log('server listening on port 3001!'));
