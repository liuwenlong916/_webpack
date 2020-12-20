const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin"); //src目录下html自动生成到dist并引入js、css等文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
//零配置
module.exports = {
  // entry: "./src/index.js",
  entry: {
    index: "./src/index/index.js",
    // list: "./src/list.js",
    // detail: "./src/detail.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"), //绝对路径
    // filename: "index.js",
    filename: "[name].js", //多入口，文件名使用占位符。
  },
  resolveLoader: {
    modules: ["node_modules", "./myloaders"], //默认去node_modules找loader，添加自定义loader路径
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        //css-loader识别css代码，
        //style-loader css代码抽离出来，动态生成sstyle标签，插入到head， 再把css放进去，渲染页面样式
        //多个loader自右向左
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        //style-loader 写入html,postcss-loader->自动补齐浏览器前缀，配合borwserslist使用
        // use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
        //1.抽离css文件
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
        //2.自定义loader
        // use: ["kkb-style-loader", "kkb-css-loader", "kkb-less-loader"],
      },
      // {
      //   test: /\.js$/,
      //   //1.
      //   // use: {
      //   //   loader: path.resolve(__dirname, "./myloaders/replace-loader.js"),
      //   //   options: {
      //   //     name: "tom",
      //   //   },
      //   // },
      //   //2.
      //   // use: [
      //   //   {
      //   //     loader: path.resolve(__dirname, "./myloaders/replace-loader.js"),
      //   //     options: {
      //   //       name: "tom",
      //   //     },
      //   //   },
      //   //   path.resolve(__dirname, "./myloaders/replace-loader-async.js"),
      //   // ],
      //   //3.定义resolveLoader简写。
      //   use: [
      //     {
      //       loader: "replace-loader",
      //       options: {
      //         name: "tom",
      //       },
      //     },
      //     "replace-loader-async",
      //   ],
      // },
      {
        test: /\.(jpg|png|jpe?g)$/,
        // use: ["file-loader"],
        use: [
          {
            // loader: "file-loader", //作用，复制src图片到dist目录
            loader: "url-loader",
            options: {
              // name: "image/[name].[ext]",
              name: "[name].[ext]",
              outputPath: "image", //存放目录
              publicPath: "../image", //css独立文件引用路径
              //超过阈值的图片生成文件，没有超过处理成base64文件
              //base64减少小图的浏览器请求
              limit: 1024 * 3, //3kb//url-loader特有
            },
          },
        ],
      },
      {
        test: /\.(eot|woff|woff2|ttf)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "font",
            publicPath: "../font",
          },
        },
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./src/index/index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new CleanWebpackPlugin(),
  ],
  mode: "development", //dev production none
  devtool: "", //sourcemap开发环境默认开启//提升调试功能
  //source-map inline-source-map ...
  //source-map 生成.map 打包前后文件映射关系
  //inline-source-map 映射关系放入打包文件最后一行

  devServer: {
    contentBase: path.join(__dirname, "dist"),
    open: true,
    port: "8081",
    //跨域
    proxy: {
      "/api": {
        target: "http://localhost:3000",
      },
    },
  },
};
