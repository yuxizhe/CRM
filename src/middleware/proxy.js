const proxyMiddleware = require('http-proxy-middleware')

const proxyTable = {
  '/xq': {
    target: 'https://api.xueqiu.com/',
    changeOrigin: true,
    pathRewrite: (path, req) => path.replace('/xq', '')
  }
}

module.exports = function(app) {
  // proxy api requests
  Object.keys(proxyTable).forEach(function(context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
      options = { target: options }
    }
    app.use(proxyMiddleware(options.filter || context, options))
  })
}
