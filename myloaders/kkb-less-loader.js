//使用less模块处理less语法
//less-loader需要借助less模块
const less = require("less");

module.exports = function (source) {
  less.render(source, (e, output) => {
    let { css } = output;
    this.callback(e, css);
  });
};
