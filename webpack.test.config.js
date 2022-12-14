const path = require('path');
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: [
    'babel-polyfill',
    './test/main.js'
  ],
  output: {
    path: path.resolve(__dirname, 'test/dist'),
    publicPath: 'test/dist/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: 
        [
          {
            loader: 'babel-loader',
            options: {
              plugins: ["istanbul"]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [ 'style-loader', 'css-loader', 'less-loader' ]
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader', 'less-loader' ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      FroalaEditor: path.resolve(__dirname, './src/js/index.js'),
    },
    modules: [
      path.join(__dirname, "src"),
      "node_modules"
    ]
  },
  devServer: {
    contentBase: path.join(__dirname),
    compress: false,
    port: 8001,
    publicPath: "/build/",
    open: true,
    openPage: "/test"
  }
};