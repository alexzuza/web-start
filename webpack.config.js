var path = require('path');

module.exports = {
  devtool: 'sourcemap',
  output: {
    publicPath: '/build/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        include: [
           path.resolve(__dirname, "www/js/index.js"),
           path.resolve(__dirname, "www/js/plugins"),
        ], 
        loader: 'babel'
      }
    ]
  }
};
