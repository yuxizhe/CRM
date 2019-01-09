/**
 * webpack-dev 启动在4001， 不包括node接口
 */
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const staticCache = require('koa-static-cache');
const Koa = require('koa');
const router = require('koa-router')();
const k2c = require('koa2-connect');
// const morgan = require('morgan')
const devConfig = require('../webpack.config');

const app = new Koa();

app.use(staticCache('public'), {
  maxAge: 0,
  dynamic: true,
  gzip: false,
});

// Webpack compile in a try-catch
function compile(config) {
  let compiler;
  try {
    compiler = webpack(config);
  } catch (e) {
    console.log('error');
    process.exit(1);
  }
  return compiler;
}

const devCompiled = compile(devConfig);

app.use(k2c(
  webpackDevMiddleware(devCompiled, {
    logLevel: 'error',
    writeToDisk: true,
  }),
));

app.use(k2c(webpackHotMiddleware(devCompiled)));

// react 路由
router.get('*', (ctx) => {
  const reactHtml = fs.readFileSync(path.resolve(__dirname, '../public',
    'index.html'));
  ctx.type = 'html';
  ctx.body = reactHtml;
});

// add router middleware:
app.use(router.routes());

app.listen(4001, () => console.log('webpack listening on port 4001!'));
