// 中间件列表添加在这里
const proxy = require('./proxy')

module.exports = function(app) {
  proxy(app)
}
