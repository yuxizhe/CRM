const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const Koa = require('koa');
const router = require('koa-router')();
const bodyParse = require('koa-bodyparser');
const staticCache = require('koa-static-cache');
const k2c = require('koa2-connect');
// const morgan = require('morgan')
const devConfig = require('../webpack.config');
const middleware = require('../middlewares');

const app = new Koa();

app.use(staticCache('public'), {
  maxAge: 365 * 24 * 60 * 60,
  dynamic: true,
  gzip: false,
});

app.use(bodyParse({
  formLimit: '50mb',
}));

middleware(app);

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
const reactHtml = fs.readFileSync(path.resolve(__dirname, '../public', 'index.html'));
router.get('*', (ctx) => {
  ctx.type = 'html';
  ctx.body = reactHtml;
});

// add router middleware:
app.use(router.routes());

app.listen(3001, () => console.log('server listening on port 3001!'));
