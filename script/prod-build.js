const webpack = require("webpack");
const browserConfig = require("../webpack.prod")[0];
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

if (process.env.NODE_ENV === "visu") {
  browserConfig.plugins.push(new BundleAnalyzerPlugin());
}

const clientCompiler = compile(browserConfig);

clientCompiler.run((err, stats) => {
  if (err) {
    console.error(err);
    return;
  }
});

// Webpack compile in a try-catch
function compile(config) {
  let compiler;
  try {
    compiler = webpack(config);
  } catch (e) {
    console.log("error");
    process.exit(1);
  }
  return compiler;
}
