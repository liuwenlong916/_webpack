//明确插件在哪个生命周期执行

//读取assets文件写入text
class TxtWebpackPlugin {
  constructor(options) {
    console.log(options);
  }
  //帮助插件注册，接受compiler类
  apply(compiler) {
    // console.log("myPlugin");

    //tap只能出发同步钩子，同步钩子不需要cb回调
    compiler.hooks.emit.tapAsync("TxtWebpackPlugin", (compilation, cb) => {
      //添加文件
      compilation.assets["list.txt"] = {
        //内容
        source: function () {
          return "tom";
        },
        //体积
        size: function () {
          return 1024;
        },
      };
      cb(); //最后记得调用回调/
    });
  }
}

// export default TxtWebpackPlugin;

module.exports = TxtWebpackPlugin;
