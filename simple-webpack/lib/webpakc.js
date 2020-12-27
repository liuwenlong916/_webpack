const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser"); //生成AST
const travers = require("@babel/traverse").default; //.default看最后性能优化课
const { transformFromAst } = require("@babel/core");

module.exports = class webpack {
  constructor(options) {
    const { entry, output } = options;
    this.entry = entry;
    this.output = output;
    this.modules = [];
  }
  //开始编译，执行打包
  run() {
    const info = this.parse(this.entry);
    this.modules.push(info);
    // console.log(info);

    //双层for循环实现递归
    for (let i = 0; i < this.modules.length; i++) {
      const item = this.modules[i];
      const dependencies = item.dependencies;
      if (dependencies) {
        for (let j in dependencies) {
          //modules在动态添加数据,所以for会继续执行,实现递归
          this.modules.push(this.parse(dependencies[j]));
        }
      }
    }
    //TODO 相互依赖如何处理
    // console.log(this.modules);

    // 数组转对象
    const obj = {};
    this.modules.forEach(item => {
      obj[item.entryFile] = {
        dependencies: item.dependencies,
        code: item.code,
      };
    });
    this.file(obj);
  }
  //根据路径解析,依赖,内容
  parse(entryFile) {
    //分析入口模块内容
    const content = fs.readFileSync(entryFile, "utf-8");

    //通过babel转为抽象语法树
    const ast = parser.parse(content, {
      sourceType: "module",
    });
    // console.log(ast.program.body[0].source);

    //处理依赖，
    const dependencies = {}; //依赖图谱
    travers(ast, {
      ImportDeclaration({ node }) {
        //node.source.value;
        //引用路径./a.js->./src/a.js

        const dir = path.dirname(entryFile); //返回路径目录 ./src
        //window 路径斜杠不对
        const pathname =
          "./" + path.join(dir, node.source.value).replace("\\", "/");
        dependencies[node.source.value] = pathname;
      },
    });
    //{ './a.js': './src/a.js', './b.js': './src/b.js' }
    // console.log(dependencies);

    //处理内容
    const { code } = transformFromAst(ast, null, {
      presets: ["@babel/preset-env"],
    });

    // console.log(code);
    /**
     * "use strict";

        var _a = require("./a.js");

        var _b = require("./b.js");

        function f1() {
          return 1;
        }
     */

    //手动实现require

    return {
      entryFile,
      dependencies,
      code,
    };
  }

  file(obj) {
    //生成代码内容, 生成webpack启动函数
    //生成main.js位置./dist目录
    const filePath = path.join(this.output.path, this.output.filename);
    // console.log(filePath, obj);

    const code = JSON.stringify(obj);

    const bundle = `(function(graph){//形参,实参是code
      function require(module){//形参,实参为this.entry
        //代码路径./src/a.js 转为./a.js
        function PathRequire(relativePath){
          return require(graph[module].dependencies[relativePath])
        }

        const exports = {};//引用类型,code执行后如果赋值就会更新
        //自执行函数,保护code,
        (function(require, exports, code){//这里是形参
          eval(code);
        })(PathRequire, exports, graph[module].code);//这里export是实参
        return exports;//返回导出内容
      }
      require('${this.entry}');//从入口模块开始./src/index.js

    })(${code})`;
    fs.writeFileSync(filePath, bundle, "utf-8");
  }
};
