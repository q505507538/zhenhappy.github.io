---
layout: post
title: Sass入门常用资源
category: resource
tags: resource
keywords: Sass Starter
description: Sass入门常用资源
---

声明变量

    $color: red;

普通变量与默认变量

    $baseLineHeight: 2;
    $baseLineHeight: 1.5 !default;
    body{
        line-height: $baseLineHeight; // ==> line-height: 2;
    }

变量的调用

    $color: red;
    .test {
        color: $color; // ==> color: red;
    }

局部变量和全局变量

    $color:orange;
    .block {
      color: $color; // ==> color: orange;
    }
    em {
      $color: red;
      a {
        color: $color; // ==> color: red;
      }
    }

嵌套-选择器嵌套

    nav {
      a {            // ==> nav a {
        color: red;
        header & {   // ==> header nav a {
          color:green;
        }
      }  
    }

嵌套-属性嵌套

    .box {
      font: {
       size: 12px;   // ==> font-size: 12px;
       weight: bold; // ==> font-weight: bold;
      }  
    }

嵌套-伪类嵌套

    .box{
      &:before { // ==> .box:before {
        content:"伪元素嵌套";
      }
    }

混合宏-声明混合宏

    //不带参数
    @mixin border-radius{
        -webkit-border-radius: 5px;
        border-radius: 5px;
    }
    //带参数
    @mixin border-radius($radius:5px){
        -webkit-border-radius: $radius;
        border-radius: $radius;
    }
    //复杂的混合宏
    @mixin box-shadow($shadow...) {
      @if length($shadow) >= 1 {
        @include prefixer(box-shadow, $shadow);
      } @else{
        $shadow:0 0 4px rgba(0,0,0,.3);
        @include prefixer(box-shadow, $shadow);
      }
    }

混合宏-调用混合宏

    @mixin border-radius{
        -webkit-border-radius: 3px;
        border-radius: 3px;
    }
    button {
        @include border-radius; // 使用@include方式调用
    }

混合宏的参数--传一个不带值的参数

    @mixin border-radius($radius){
      -webkit-border-radius: $radius;
      border-radius: $radius;
    }

    .box {
      @include border-radius(3px);
    }

混合宏的参数--传一个带值的参数

    @mixin border-radius($radius:3px){
      -webkit-border-radius: $radius;
      border-radius: $radius;
    }
    .btn {
      @include border-radius;
    }

混合宏的参数--传多个参数

    @mixin size($width,$height){
      width: $width;
      height: $height;
    }
    .box-center {
      @include size(500px,300px);
    }

扩展/继承

    .btn {
      border: 1px solid #ccc;
      padding: 6px 10px;
      font-size: 14px;
    }
    .btn-primary {
      background-color: #f36;
      color: #fff;
      @extend .btn;
    }

占位符 %placeholder

    %mt5 {
      margin-top: 5px;
    }
    .btn {
      @extend %mt5;
    }

混合宏 VS 继承 VS 占位符

    //SCSS中混合宏使用
    @mixin mt($var){
      margin-top: $var;  
    }
    .block {
      @include mt(5px);
      span {
        display:block;
        @include mt(5px);
      }
    }
    .header {
      color: orange;
      @include mt(5px);
      span{
        display:block;
        @include mt(5px);
      }
    }
    //SCSS 继承的运用
    .mt{
      margin-top: 5px;  
    }
    .block {
      @extend .mt;
      span {
        display:block;
        @extend .mt;
      }
    }
    .header {
      color: orange;
      @extend .mt;
      span{
        display:block;
        @extend .mt;
      }
    }
    //SCSS中占位符的使用
    %mt{
      margin-top: 5px;  
    }
    .block {
      @extend %mt;
      span {
        display:block;
        @extend %mt;
      }
    }
    .header {
      color: orange;
      @extend %mt;
      span{
        display:block;
        @extend %mt;
      }
    }

![混合宏 VS 继承 VS 占位符](http://img.mukewang.com/55263aa30001913307940364.jpg)

插值#{}

    $properties: (margin, padding);
    @mixin set-value($side, $value) {
        @each $prop in $properties {
            #{$prop}-#{$side}: $value;
        }
    }
    .login-box {
        @include set-value(top, 14px);
    }

注释

    //注释
    /*注释*/

数据类型
- 数字: 如1、2、13、10px；
- 字符串: 有引号字符串或无引号字符串,如"foo"、'bar'、 baz;
- 颜色: 如blue、#04a3f9、rgba(255,0,0,0.5);
- 布尔型: 如true、false;
- 空值: 如null;
- 值列表: 用空格或者逗号分开,如1.5em 1em 0 2em、 Helvetica,Arial,sans-serif。

字符串

    @mixin firefox-message($selector) {
      body.firefox #{$selector}:before {
        content: "Hi, Firefox users!";
      }
    }
    @include firefox-message(".header");

值列表函数
1. nth函数（nth function） 可以直接访问值列表中的某一项；
2. join函数（join function） 可以将多个值列表连结在一起；
3. append函数（append function） 可以在值列表中添加值； 
4. @each规则（@each rule） 则能够给值列表中的每个项目添加样式。

加法

    $sidebar-width: 220px;
    $content-width: 720px;
    $gap-width: 20px;
    .container {
        width: $sidebar-width + $content-width + $gap-width;
        margin: 0 auto;
    }

减法

    $container: 960px;
    $sidebar-width: 220px;
    $gap-width: 20px;
    .content{
        width: $container - $sidebar-width - $gap-width;
        float: left;
    }

乘法

    $list: twitter,facebook,github,weibo;
    @for $i from 1 through length($list){
      .icon-#{nth($list,$i)}{
        background-postion: 0 -20px * $i;
      }
    }

除法

    $width: 960px;
    .col {
       width: $width / 10;
    }

变量计算

    $col-width: 60px;
    $col-gap: 20px;
    @for $i from 1 through 12 {
        .col-#{$i}{
            width: $col-width + $col-gap * ($i - 1);
        }
    }

数字运算

    .box {
      width: ((220px + 720px) - 11 * 20 ) / 12 ;  
    }

颜色运算

    p {
      color: #010203 + #040506 * 2;
    }

字符运算

    div {
      content: "Hello" + "" + "Sass!";
      cursor: e + -resize;
      font-family: sans- + "serif";
    }
