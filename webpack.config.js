const webpack = require("webpack");

module.exports = {
  entry: {
    "jquery-simple-menu": "./src/jquery-simple-menu.js"
  },

  output: {
    path: __dirname + "/dist",
    filename: "[name].js",
    publicPath: "/dist"
  },

  externals: {
    jquery: "jQuery"
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }, {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ],
      }
    ]
  },

  watchOptions: {
    poll: 1000
  },

  devServer: {
    host: "0.0.0.0",
    port: 3000,
    disableHostCheck: true
  }
};
