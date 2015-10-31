---
layout: post
title: React系列入门教程一之HelloWorld
category: React
tags: React
keywords: React
description: React系列入门教程一之HelloWorld
---

# 安装

    bower install --save react

当然不一定非要把react装到本地才能用
导入CDN链接也是可以的,前提是用户需要能蕃蔷

    <script src="https://fb.me/react-0.14.1.js"></script>
    <script src="https://fb.me/react-dom-0.14.1.js"></script>

React 1.4开始将不在使用JSXTransform改用Babel来解析了
改用Babel分为在线和离线
在线

    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js"></script>

然后脚本的类型需要写成type="text/babel"

    <script type="text/babel">
      ReactDOM.render(
        <h1>Hello, world!</h1>,
        document.getElementById('example')
      );
    </script>

离线的话需要安装babel这个npm包

    npm install --global babel

然后执行这个命令编译

    babel src --watch --out-dir build

这个命令可以将src目录编译

# HelloWorld
我们来写个HelloWorld,在线的方式需要蕃蔷

    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Hello React!</title>
        <script src="https://fb.me/react-0.14.1.js"></script>
        <script src="https://fb.me/react-dom-0.14.1.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js"></script>
      </head>
      <body>
        <div id="example"></div>
        <script type="text/babel">
          ReactDOM.render(
            <h1>Hello, world!</h1>,
            document.getElementById('example')
          );
        </script>
      </body>
    </html>

如果是离线编译方式,首先是用bower安装react
`bower install --save react`
安装好后会生成`bower_components`文件夹
在程序中引用即可
然后将脚本写到src/helloworld.js文件中

    ReactDOM.render(
      React.createElement('h1', null, 'Hello, world!'),
      document.getElementById('example')
    );

然后用
`babel src --watch --out-dir build`
编译src目录下的js文件到build中,这条命令加了--watch参数会一直监控文件变化,一有更改会立刻编译,不需要我们从新在去执行命令了

    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Hello React!</title>
        <script src="bower_components/react/react.js"></script>
        <script src="bower_components/react/react-dom.js"></script>
        <!-- No need for Babel! -->
      </head>
      <body>
        <div id="example"></div>
        <script src="build/helloworld.js"></script>
      </body>
    </html>

代码可以查看这里:[https://github.com/zhenhappy/react-tutorial/tree/master/01](https://github.com/zhenhappy/react-tutorial/tree/master/01)
