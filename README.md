# webpck 打包后文件：

## 整体结构:

```javascript
(function (modules) {})({});
```

## chunk

    指代码块，多个代码块打包后生成的代码块

## bundle

    bundle文件就是打包编译后的输出文件统称
    包含：1.wepbakc启动函数，2.chunks(可能是多个模块(module))
    单入口就是一个bundle文件，多入口就是多个bundle文件

## entry

字符串，数组，对象

## output

字符串，数组，对象

## loader

webpack 默认支持 js、json，不支持.css 等文件

```javascript
module: {
  rules: [
    {
      test: /\.css$/,
      //css-loader识别css代码，
      //style-loader css代码抽离出来，动态生成sstyle标签，插入到head， 再把css放进去，渲染页面样式
      //多个loader自右向左
      use: ["style-loader", "css-loader"],
    },
  ];
}
```

## plugin 插件

功能延申

## loader vs plugin

loader 文件类型扩展
plugin 功能拓展

## mode

1. development
2. production
3. none 插件都不启用

## postcss

1. 把 css 解析成 JS 可以操作的抽象语法树 AST，
2. 调⽤插件来处理 AST 并得到结果；
3. 所以 postcss ⼀般都是通过插件来处理 css，并不会直接处理
4. ⽐如：⾃动补⻬浏览器前缀: autoprefixer;css 压缩等 cssnano

### .browserslistrc

不需要数组，引号等

### postcss.config.js

## mini-css-extract-plugin

### MiniCssExtractPlugin.loader

css 样式默认放入 head 标签内，css 文件抽离

## 图片字体文件处理

1. url-loader,功能包含 file-loader,limit 限制，小于则是 base64，大于生成文件
2. file-loader
3. iconfont,需要在线生成字体库

## html-webpack-plugin

1. 提取 html 文件模板，生成 HTML 文件，并自动引入 js 文件

## clean-webpack-plugin

1. dev 每次清空 dist 目录

## sourceMap

1. 默认开启,设置 [devtool](https://webpack.js.org/configuration/devtool):"none"关闭,

## 自定义 loader

1. 实质：返回一个参数的方法。
2. 不可以用箭头函数，所有参数都从 this 获取

## webpack-dev-server

1. npm install webpack-dev-server@3.11.0 -D
2. dist 没有输出文件
3. dev 输出文件

```javascript
package.json
"scripts": {
"server": "webpack-dev-server"
},
```

## mock 数据

1. 使用 express 生成 node 服务器
2. axios 调用

# HRM 以模块为单位

## css 保留操作

1. webpack.config 引入 webpack
2. webpack.HotModuleReplacementPlugin 插件
3. devServer:{hot:true}//开启 HMR

## js 保留操作

//实际开发很少这么些

```javascript
// 1.hotOnly 禁止浏览器刷新
// 2.
if (module.hot) {
  //监听模块是否修改
  module.hot.accept("./number.js", () => {
    // console.log("change number 模块");
    document.body.removeChild(document.getElementById("number"));
    number();
  });
}
```

## 框架的 HMR

1. vue 使用 [vue-loader](https://vue-loader.vuejs.org/zh/guide/hot-reload.html) 开箱即用
2. React 使用 react-hot-loader

# [babel](https://www.babeljs.cn/) 处理 es6

跟 postcss 一样依赖 browserslist

## [预设 Presets](https://www.babeljs.cn/docs/presets)

1. @babel/preset-env:处理原生 js 语法
2. @babel/presset-flow:处理 flow 语法
3. @babel/preset-react:处理 jsx 语法
4. @babel/preset-typescript: 处理 ts 语法

npm i babel-loader @babel/core @babel/preset-env -D

## @babel/preset-env

1. 转换语法，特性不转换(如：Promise,async await)
   ?

## 垫片 [babel-polyfill](https://www.babeljs.cn/docs/babel-polyfill)

1. npm i @babel/polyfill -S 线上支持

2. import "@babel/polyfill";
3. 生成文件过大，按需垫片, .babelrc 配置
4. corejs 与 babel/polyfill 区别
5. polyfill 本质就是引用 corejs 和 regenerator-runtime
6. useBuiltIns：entry:需要引用@babel/polyfill, usage:不需要 import,根据代码按需导入垫片,false:不会按需引入,

## myPlugin

1. webpack 编译代码过程中，生命周期概念，对应不通过打包阶段
2. 不同打包阶段：modules,Assets

#### plugin 本质是一个类。

1. 如何注册到 webpack 对应阶段

#### webpack 打包流程

1. 读取配置，初始化工作 --- webpack.config.js
2. 实例化一个 compiler 类，注册插件(Plugin),对应生命周期绑定相应事件
3. 执行编译，compiler.run,
4. compiler(构建阶段)->compilation(打包阶段)
5. 递归处理所有依赖模块，生成 chunk
6. 把 chunk 输出到 output 指定位置
7. [hooks](https://webpack.docschina.org/api/compiler-hooks/#hooks)

# 手写 webpack

1. 读取配置:
   1. 入口
   2. 出口
2. 入口函数，run 开始编译->chunk
   1. 从入口文件开始
      1. 处理文件依赖
         1. 进入依赖模块
         2. 处理依赖模块的依赖
         3. 依赖模块内容
         4. 递归处理
      2. 处理文件内容
         1. 借助 babel 工具，内容编译成 ast 抽象语法树, 提取模块路径
         2. 借助 babel 语法转义，特性需要 polyfile
      3. chunk 包含依赖关系依赖图谱
3. 创建 bundle 文件
   1. 依赖图谱
   2. webpack 启动函数
      1. require 补齐
      2. exports 补齐，浏览器不报错

## parser

1. npm i -D @babel/parser
2. js 内容生成 AST

## traverse

1. npm i -D @babel/traverse
2. 获取 ast 抽象语法树类型(import/function/string)

## core

1. npm i -D @babel/core
2. transformFromAst 处理 ast 内容

## preset-env

1. npm i -D @babel/preset-env

## npm 发布包

## ssh

1. 本地添加 ssh： ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
2. 启动 ssh-agent：eval "$(ssh-agent -s)" eval `ssh-agent -s`
3. 添加到 ssh-agent: ssh-add ~/.ssh/id_ed25519
4. 检查现有 ssh:ls -al ~/.ssh
5. github:Settings->SSH and GPG keys->复制 key->Add SSH key
6. 关闭警告： C:\Windows\System32\drivers\etc\hosts 添加 13.229.188.59 github.com
