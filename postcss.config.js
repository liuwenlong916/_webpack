//使用postcss-loader时，检测配置环境，找到就会使用

module.exports = {
  plugins: [
    require("autoprefixer")({
      overrideBrowserslist: ["last 2 versions", "> 1%"],
      //其他配置方法
      //package.json配置
      //browserslist:[]
      //.browserslistrc
    }),
    // require("cssnano"), //压缩生产使用
  ], //自动补齐浏览器前缀
};
