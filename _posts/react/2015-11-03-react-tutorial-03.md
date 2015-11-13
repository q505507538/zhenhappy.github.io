---
layout: post
title: React快速入门教程三之组件状态State
category: React,State
tags: React
keywords: React,State
description: React快速入门教程三之组件状态State
---

在React中的组件有个State的状态对象
通过`this.state.keyName`获取状态变量`keyName`的值
通过`this.state.setState({keyName: '...'})`设置状态变量keyName的值,组件就会被重新渲染(render)
注意这里一定要用`setState()`方法,否则组件不会渲染
State有个`getInitialState`方法,该方法在组件被挂载前调用,仅调用一次

这边看个例子

    var ClickApp = React.createClass({
      getInitialState: function(){
        return {
          clickCount:0,
        }
      },
      onClick: function(){
        this.setState({
          clickCount: this.state.clickCount + 1,
        })
      },
      render: function(){
        return (
          <div>
            <h2>点击下面按钮</h2>
            <button onClick={this.onClick}>点击我</button>
            <p>你一共点击了:{this.state.clickCount}</p>
          </div>
        )
      }
    });

    var clickComponent = ReactDOM.render(
      <ClickApp/>,
      document.getElementById('app')
    )

`getInitialState`方法中初始化一个clickCount值
每次点击按钮`clickCount`+1
因为使用了`setState()`方法,所以前台显示会被刷新
