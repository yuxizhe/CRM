const proxyMiddleware = require("http-proxy-middleware");

const proxyTable = {
  "/xq": {
    target: "https://api.xueqiu.com/",
    changeOrigin: true,
    pathRewrite: (path, req) => path.replace("/xq", "")
  },
  "/getData": {
    target: "http://10.10.51.13:8080",
    changeOrigin: true,
    pathRewrite: (path, req) => path.replace("/getData", "")
  },
  "/kafka": {
    target: "http://10.10.212.14:8080",
    changeOrigin: true,
    pathRewrite: (path, req) => path.replace("/kafka", "")
  }

};

module.exports = function(app) {
  // proxy api requests
  Object.keys(proxyTable).forEach(function(context) {
    var options = proxyTable[context];
    if (typeof options === "string") {
      options = { target: options };
    }
    app.use(proxyMiddleware(options.filter || context, options));
  });
};
