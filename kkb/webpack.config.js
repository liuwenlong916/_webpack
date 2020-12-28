const TerserPlugin = require("terser-webpack-plugin"); //压缩文件插件//区别其他插件，使用在optimizations里

module.exports = {
  entry: {
    //生成一个压缩一个未压缩
    "add-number": "./src/index.js",
    "add-number.min": "./src/index.js",
  },
  output: {
    filename: "[name].js",
    library: "addNumber",
    libraryTarget: "umd",
    libraryExport: "default", //必要，不加这个就要后缀.default
  },
  // mode: "production",//压缩
  mode: "none", //未压缩
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        //正则匹配需要压缩文件
        test: /\.min\.js$/,
      }),
    ],
  },
};
