const express = require('express')
const path = require('path')
const middleware = require('./src/middleware')
const app = express()

// compression-webpack-plugin  代码压缩
// app.get('*.js', function(req, res, next) {
//   req.url = req.url + '.gz'
//   res.set('Content-Encoding', 'gzip')
//   next()
// })
// app.get('*.css', function(req, res, next) {
//   req.url = req.url + '.gz'
//   res.set('Content-Encoding', 'gzip')
//   res.set('Content-Type', 'text/css')
//   next()
// })

app.use(express.static('public'))

// 中间件
middleware(app)

// react 路由
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, './public', 'index.html'))
})

app.listen(process.env.PORT || 7878, function() {
  console.log(
    'Express server listening on %d, in %s mode',
    process.env.PORT || 7878,
    app.get('env')
  )
})
