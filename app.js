const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const middleware = require('./src/middleware')
const compression = require('compression')
const app = express()

// compress all responses
app.use(compression())

app.use(express.static('public'))
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
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
