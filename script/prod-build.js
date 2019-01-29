const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const browserConfig = require('../webpack.prod');

if (process.env.NODE_ENV === 'visu') {
  browserConfig.plugins.push(new BundleAnalyzerPlugin());
}

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

const clientCompiler = compile(browserConfig);

clientCompiler.run((err) => {
  if (err) {
    console.error(err);
  }
});
