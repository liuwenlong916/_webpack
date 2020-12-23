//读取配置
const options = require("./webpack.config");
//引入webpack
const webpack = require("./lib/webpakc");
//webpack接受配置，启动入口函数run，执行打包
new webpack(options).run();
