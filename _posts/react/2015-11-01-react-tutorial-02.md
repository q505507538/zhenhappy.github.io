---
layout: post
title: React快速入门教程二之组件嵌套
category: React
tags: React
keywords: React
description: React快速入门教程二之组件嵌套
---

沿用上一讲的代码,在添加两个子组件嵌套,这里要注意的是render的return只能返回单个标签,如果有多个的话要在最外层用一个div包裹

    <div>
      <h1>你好,世界!</h1>
      <Submessage/>
    </div>

三个组件层层嵌套

    var MessageBox = React.createClass({
        render:function(){
          return (
            <div>
              <h1>你好,世界!</h1>
              <Submessage/>
            </div>
          )
        }
    });

    var Submessage = React.createClass({
        render:function(){
          return (
            <div>
              <h3>写代码很有意思</h3>
              <Footer/>
          </div>
          )
        }
    });

    var Footer = React.createClass({
        render:function(){
          return ( <small>因为我们在用代码创造</small> )
        }
    });

也可以采用一个循环来渲染

    var MessageBox = React.createClass({
        render:function(){
          var submessages = [];
          for(var i=0;i<10;i++){
            submessages.push(
              <Submessage/>
            )
          }

            return (
                <div>
                  <h1>你好,世界!</h1>
                  {submessages}
                </div>
            )
        }
    });

这时候控制台会传一个Warning,意思是我们在用数组的时候要给每个元素指定一个key

    for(var i=0;i<10;i++){
    submessages.push(
      <Submessage key={i}/>
    )
  }

就不会有Warning了
