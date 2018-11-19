const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./server/index.js",
  target: "node",
  externals: [nodeExternals()],

  output: {
    path: path.resolve("./build"),
    filename: "index.js",
    publicPath: "/"
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader"
      },
      {
        test: /\.(woff|woff2)$/i,
        exclude: /node_modules/,
        use: ["file-loader"]
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        loader: require.resolve("url-loader"),
        options: {
          limit: 10000,
          name: "[name].[hash:8].[ext]"
        }
      }
    ]
  }
};
