const webpack = require('webpack')
const path = require('path')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const express = require('express')
const cors = require('cors')
const devConfig = require('../webpack.config')[0]
// const path = require('path')
// const devServer = require('webpack-dev-server-speedy')

const isClientDev = process.env.NODE_ENV === 'client-dev'

const app = express()

// 解决HMR 3000端口请求 3001 端口 跨域问题
app.use(cors())
app.use(express.static(__dirname + '../public'))

// 代理
require('../middleware/proxy')(app)

// Webpack compile in a try-catch
function compile(config) {
  let compiler
  try {
    compiler = webpack(config)
  } catch (e) {
    console.log('error')
    process.exit(1)
  }
  return compiler
}

const devCompiled = compile(devConfig)

app.use(
  webpackDevMiddleware(devCompiled, { logLevel: 'error', writeToDisk: true })
)

app.use(webpackHotMiddleware(devCompiled))

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../public', 'index.html'))
})

app.listen(3001, () => console.log('client listening on port 3001!'))
