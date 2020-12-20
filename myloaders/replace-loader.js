//自定义函数，不可以是箭头函数
//loader 必须返回值
//loader 的api都挂载this

//this.query接受参数
//如何处理异步

//多个自定义loader
//如何处理自定义loader路径问题
module.exports = function (source) {
  return source.replace("webpack", this.query.name);
};
