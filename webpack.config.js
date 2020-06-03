const path = require("path");
const glob = require("glob");

module.exports = {
  mode: 'development',//'production' || 'development'
  entry: glob.sync("./src/**/*.ts"),
  output: {
    publicPath: __dirname + "/dist/", // 打包后资源文件的引用会基于此路径
    path: path.resolve(__dirname, "dist"), // 打包后的输出目录
    filename: "psd2ugui.js"
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: {
          loader: 'ts-loader'
        },
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
}