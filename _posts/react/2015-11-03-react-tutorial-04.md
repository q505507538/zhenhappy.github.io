---
layout: post
title: React快速入门教程四之组件参数props
category: React,props
tags: React
keywords: React,props
description: React快速入门教程四之组件参数props
---

如果把组件看做是个函数,那props就是函数的参数

    var HelloMessage = React.createClass({
      render: function() {
        return <div>Hello {this.props.name}</div>;
      }
    });

通过this.props.name获得组件的参数name
那么在用这个组件的时候,就要把参数传过去

    React.render(
      <HelloMessage name="John" />,
      document.getElementById('hello')
    );

但是有些时候`<HelloMessage name="John" />`,这个地方`name="John"`没有传,写成这样了`<HelloMessage />`,那么就会报错,因此当参数为空的时候我们要给个默认值
那就要用到`getDefaultProps`方法,在`HelloMessage`组件的`render`之前加入

    getDefaultProps: function(){
      return {
        name: ['默认参数']
      }
    },

再有时候传递的参数类型和用到的不匹配,这时候需要用到propTypes
在`getDefaultProps`方法之前再加入

    propTypes: {
      name: React.PropTypes.string.isRequired
    },

这里的propTypes可用到的类型可以在[这里](http://reactjs.cn/react/docs/reusable-components.html)查阅
