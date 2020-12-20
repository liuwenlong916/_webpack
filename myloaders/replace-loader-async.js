//自定义函数，不可以是箭头函数
//loader 必须返回值
//loader 的api都挂载this

//this.query接受参数
//如何处理异步

//多个自定义loader
module.exports = function (source) {
  console.log(source);
  console.log(this.query);
  // return source.replace("hello", "你好").replace("webpack", this.query.name);
  // const content = source
  //   .replace("hello", "你好")
  //   .replace("webpack", this.query.name);
  // this.callback(null, content);

  const callback = this.async();
  setTimeout(() => {
    const content = source.replace("hello", "你好");
    callback(null, content);
    //return content
  }, 3000);
};
