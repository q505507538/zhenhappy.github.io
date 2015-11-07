---
layout: post
title: React快速入门教程一之HelloWorld
category: React
tags: React
keywords: React
description: React快速入门教程一之HelloWorld
---

## 安装
先使用npm安装Bower

    npm install -g bower

在使用bower安装react

    bower install --save react

当然不一定非要把react装到本地才能用
导入CDN链接也是可以的

    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.1/react.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.1/react-dom.js"></script>

React 1.4开始将不在使用JSXTransform改用Babel来解析了

    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js"></script>

引入browser.min.js可以支持Babel

## HelloWorld
首先呢我们可以把上面提到的三个CND文件下载到本地,直接引用比较省事
我们来写个HelloWorld,直接把script的type类型设置为text/babel,就可以HTML和JavaScript混合使用
`React.createClass`创建一个名叫MessageBox的组件,其实就是一个js变量
`ReactDOM.render`将MessageBox渲染到id="app"的div中,完成后返回一个callback

    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Hello React!</title>
        <script src="../build/react.js"></script>
        <script src="../build/react-dom.js"></script>
        <script src="../build/browser.min.js"></script>
      </head>
      <body>
        <div id="app"></div>
        <script type="text/babel">
          var MessageBox = React.createClass({
            alertMe:function(){
              alert("你刚才点了我");
            },
            render:function(){
              return ( <h1 onClick={this.alertMe}>你好,世界!</h1> )
            }
          });

          ReactDOM.render( <MessageBox/>,
            document.getElementById('app'),
            function(){
              console.log('渲染完成啦');
            }
          );
        </script>
      </body>
    </html>

代码可以查看这里:[https://github.com/zhenhappy/react-tutorial/tree/master/01](https://github.com/zhenhappy/react-tutorial/tree/master/01)
