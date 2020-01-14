const path = require("path");

module.exports = {
  entry: {
    app: ["@babel/polyfill", "./src/app.js"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.bundle.js"
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/preset-env"],
          plugins: ["@babel/plugin-proposal-class-properties"]
        }
      }
    ]
  }
};
