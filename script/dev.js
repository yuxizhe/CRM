const webpack = require('webpack');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const morgan = require('morgan')
const devConfig = require('../webpack.config');
const middleware = require('../src/middleware');

const app = express();

// 解决HMR 3000端口请求 3001 端口 跨域问题
app.use(cors());
app.use(express.static(`${__dirname}../public`));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(morgan('tiny'))
// 中间件
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

app.use(
  webpackDevMiddleware(devCompiled, { logLevel: 'error', writeToDisk: true }),
);

app.use(webpackHotMiddleware(devCompiled));

// react 路由
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

app.listen(3001, () => console.log('client listening on port 3001!'));
