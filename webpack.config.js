const path = require("path");
//根据模板文件(html)自动生成html页面到dist并引入js、css等打包的文件
const htmlWebpackPlugin = require("html-webpack-plugin");
//抽离css，替换style-loader(放入head)
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//每次打包清空dist目录,可以设置不清空文件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
//自定义plugin
const TxtWebpackPlugin = require("./myPlugins/text-webpack-plugin");
const webpack = require("webpack");
//零配置
module.exports = {
  //入口文件类型：string list obj
  // entry: "./src/index.js",
  entry: {
    index: "./src/index.js",
    // list: "./src/list.js",
    // detail: "./src/detail.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"), //绝对路径
    // filename: "index.js",
    filename: "[name].js", //多入口，文件名使用占位符。
  },
  //默认去node_modules找loader，添加自定义loader路径
  //为了require自定义plugin
  resolveLoader: {
    modules: ["node_modules", "./myloaders"],
  },

  //module等价于文件,根据文件类型，引用不同loader
  module: {
    //多个loader自右向左调用
    rules: [
      {
        test: /\.css$/,
        //css-loader识别css代码，
        //style-loader css代码抽离出来，动态生成sstyle标签，插入到head， 再把css放进去，渲染页面样式

        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        //style-loader 写入html,
        // use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
        //postcss-loader-> 进入postcss.config配置页-> (autoprefixer)自动补齐浏览器前缀，配合borwserslist使用
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
      //引用自定义loader，定义resolveLoader简写
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
            loader: "url-loader", //url内部会调用file-loader。
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
        //字体
        test: /\.(eot|woff|woff2|ttf)$/,
        use: {
          loader: "file-loader", //url-loader
          options: {
            name: "[name].[ext]",
            outputPath: "font",
            publicPath: "../font",
          },
        },
      },
      {
        test: /\.js$/,
        loader: {
          loader: "babel-loader",
          //写入.babelrc里
          // options: {
          //   // presets: ["@babel/preset-env"],
          //   presets: [
          //     [
          //       "@babel/preset-env",
          //       {
          //         targets: {
          //           //browserslist写法
          //           chrome: "66",
          //           edge: "16",
          //         },
          //         corejs: 2, //推荐2默认引用2
          //         // corejs: 3, //3需要手动安装，3版本体积会变大
          //         useBuiltIns: "entry", // entry:需要引用@babel/polyfill, usage:不需要import,根据代码按需导入垫片,false:不会按需引入,
          //       },
          //     ],
          //   ],
          // },
        },
      },
    ],
  },
  //插件扩展webpack打包功能,抽离css、生成html页面......
  plugins: [
    new htmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(), //保留之前操作
    new TxtWebpackPlugin({
      name: "Tom",
    }),
  ],
  mode: "development", //dev production none
  devtool: "", //sourcemap开发环境默认开启//提升调试功能
  //source-map inline-source-map ...
  //source-map 生成.map 打包前后文件映射关系
  //inline-source-map 映射关系放入打包文件最后一行

  //webpack-dev-server
  //开发阶段，方便调试，更改后页面立即更新，不需要每次打包
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    open: true,
    hot: true, //开启HMR，css默认支持，js需要额外操作
    hotOnly: true, //开启浏览器不刷新功能
    port: "8081",
    //跨域
    proxy: {
      "/api": {
        target: "http://localhost:3000",
      },
    },
  },
};
