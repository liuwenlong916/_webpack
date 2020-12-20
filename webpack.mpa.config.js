//多页面通用解决方案

//生成entry htmlWebpackPlugin 放入webpack.config.js
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin"); //src目录下html自动生成到dist并引入js、css等文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const setMpa = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(__dirname, "./src/*/index.js"));
  entryFiles.map((item, index) => {
    const entryFile = entryFiles[index];
    const match = entryFile.match(/src\/(.*)\/index\.js$/);
    const name = match[1]; //RegExp.$1
    entry[name] = entryFiles;
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: `./src/${name}/index.html`,
        filename: `${name}.html`,
        chunks: [name],
      }),
    );
  });

  return { entry, htmlWebpackPlugins };
};

const { entry, htmlWebpackPlugins } = setMpa();

module.exports = {
  entry,
  output: {
    path: path.resolve(__dirname, "dist"), //绝对路径
    // filename: "index.js",
    filename: "[name].js", //多入口，文件名使用占位符。
  },
  plugins: [...htmlWebpackPlugins],
  mode: "development", //dev production none
};
