(function(graph){//形参,实参是code
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
      require('./src/index.js');//从入口模块开始./src/index.js

    })({"./src/index.js":{"dependencies":{"./a.js":"./src/a.js","./b.js":"./src/b.js"},"code":"\"use strict\";\n\nvar _a = require(\"./a.js\");\n\nvar _b = require(\"./b.js\");\n\nconsole.log(\"hello \".concat(_a.a, \" \").concat(_b.b)); // console.log(`hello ${str2}`);"},"./src/a.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.a = void 0;\nvar a = \"mywebpack\";\nexports.a = a;"},"./src/b.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.b = void 0;\nvar b = \"!!!\";\nexports.b = b;"}})