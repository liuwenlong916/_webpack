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
