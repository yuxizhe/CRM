const Koa = require('koa');
const router = require('koa-router')();
const path = require('path');
const fs = require('fs');
const koaBody = require('koa-body');
const json = require('koa-json');
const convert = require('koa-convert');
const staticCache = require('koa-static-cache');

const middleware = require('./middlewares');

const app = new Koa();

app.use(staticCache('public'), {
  maxAge: 365 * 24 * 60 * 60,
  dynamic: false,
  gzip: true,
});

app.use(koaBody({
  jsonLimit: '10mb',
  formLimit: '10mb',
  textLimit: '10mb'
}));
app.use(convert(json()));


middleware(app);

// react 路由
const reactHtml = fs.readFileSync(path.resolve(__dirname, './public', 'index.html'));
router.get('*', (ctx) => {
  ctx.type = 'html';
  ctx.body = reactHtml;
});

// add router middleware:
app.use(router.routes());

app.listen(process.env.PORT || 7878, () => {
  console.log(
    'Koa server listening on %d',
    process.env.PORT || 7878,
  );
});
