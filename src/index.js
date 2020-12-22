// import str from "./a.js";
// const str = require("./a.js");
// import css from "./index.css";

// const btn = document.createElement("button");
// btn.innerHTML = "新增";
// document.body.appendChild(btn);
// btn.onclick = function () {
//   const div = document.createElement("div");
//   div.innerHTML = "item";
//   document.body.appendChild(div);
// };

// import counter from "./counter";
// import number from "./number";
// //页面操作更新counter数量自增，修改number代码，保留counter操作后结果
// counter();
// number();

// if (module.hot) {
//   //监听模块是否修改
//   module.hot.accept("./number.js", () => {
//     // console.log("change number 模块");
//     document.body.removeChild(document.getElementById("number"));
//     number();
//   });
// }

// import "@babel/polyfill"; //useBuildIns:'usage'不需要引入
// const arr = [new Promise(() => {}), new Promise(() => {})];
// arr.map(item => {
//   console.log(item);
// });

// import css from "./index.less";
// console.log("hello webpack");
//npx webpack会去node_modules/.bin下找，webpack是全局查找

//jpg jpeg png gif svg webx
//file-loader 包含与 url-loader
// import img from "./log.jpg";
// const log = new Image();
// log.src = img;
// const tag = document.getElementById("app");
// tag.append(log);

//webpack-dev-server
//创建本地服务器，打包成功启动浏览器窗口
//热更新
//mock数据
// import axios from "axios";
// axios.get("/api/info").then(res => {
//   console.log(res); //res.data.name
// });

// //react
// import React, { Component } from "react";
// import ReactDom from "react-dom";
// class App extends Component {
//   render() {
//     return <h1>hello world </h1>;
//   }
// }

// ReactDom.render(<App />, document.getElementById("app"));

// //webpack编译过程
// const webpack = require("webpack");
// const webpackConfig = require("../webpack.config.js");
// const compiler = webpack(webpackConfig);

// Object.keys(compiler.hooks).forEach(hookName => {
//   compiler.hooks[hookName].tap("tom", () => {
//     console.log(`run - ${hookName}`); //打印所有hook
//   }); //触发钩子
// });

// compiler.run();
console.log("hello webpack");
