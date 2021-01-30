var path = require("path");

module.exports = {
  mode: "production",
  entry: "./index.js",
  output: {
    path: path.resolve("build"),
    filename: "index.js",
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
          test: /\.svg$/,
          exclude: /node_modules/,
          loader: "svg-inline-loader"
      }
    ]
  },
  externals: {
    react: "react"
  }
};