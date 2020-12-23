const fs = require("fs");
const parser = require("@babel/parser");

module.exports = class webpack {
  constructor(options) {
    const { entry, output } = options;
    this.entry = entry;
    this.output = output;
  }
  //开始编译，执行打包
  run() {
    this.parse(this.entry);
  }
  //解析
  parse(entryFile) {
    //分析入口模块内容
    const content = fs.readFileSync(entryFile, "utf-8");

    //通过babel转为抽象语法树
    const ast = parser.parse(content, {
      sourceType: "module",
    });
    //处理依赖，
    //处理内容
  }
};
