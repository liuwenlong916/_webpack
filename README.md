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

## 自定义 loader

1. 实质：返回一个参数的方法。
2. 不可以用箭头函数，所有参数都从 this 获取

## webpack-dev-server

dist 没有输出文件
dev 输出文件

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
   entry:需要引用@babel/polyfill, usage:不需要 import,根据代码按需导入垫片,false:不会按需引入,
