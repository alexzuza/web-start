var path = require('path');

module.exports = {
  devtool: 'sourcemap',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        include: [
           path.resolve(__dirname, "www/js/index.js"),
        ], 
        loader: 'babel'
      }
    ]
  }
};
