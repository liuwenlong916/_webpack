//入口文件
//根据环境导出不同文件
if (process.env.NODE_ENV == "procduction") {
  module.exports = require("./dist/add-number.min.js");
} else {
  module.exports = require("./dist/add-number.js");
}
