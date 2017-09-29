var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, '../web/assets');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
  entry: [APP_DIR + '/index.jsx'],
  module: {
      rules: [
          {
              test: /\.css$/,
              use: [
                  { loader: "style-loader/url",
                    options:{
                        convertToAbsoluteUrls:true
                    }
                  },
                  { loader: "file-loader" }
              ]
          },
          {
              test : /\.jsx?/,
              include: APP_DIR,
              loader: 'babel-loader'
          }
      ]
},
  output: {
    path: BUILD_DIR,
    publicPath: 'web/assets/',
    filename: 'bundle.js'
  }
};

module.exports = config;
