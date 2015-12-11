---
layout: post
title: Sass进阶常用资源
category: Sass Advanced
tags: 资源
keywords: Sass Advanced
description: Sass进阶常用资源
---

@if...@else...

    @if $boolean {
        @debug "$boolean is true";
    } @else {
        @debug "$boolean is false";
    }

@for
`@for $i from <start> through <end>`

    //through
    @for $i from 1 through 3 {
      @debug "$i";
    }

`@for $i from <start> to <end>`

    //to
    @for $i from 1 to 4 {
      @debug "$i";
    }

@while

    $types: 4;
    @while $types > 0 {
        @debug "$i";
        $types: $types - 1;
    }

@each
`@each $var in <list>`

    $list: adam john wynn mason kuroir;
    @each $author in $list {
        @debug "$author";
    }
    $map: (
        $key1: value1,
        $key2: value2,
        $key3: value3
    )
    @each $key, $value in $map {
        @debug "#{$key} = #{$value}";
    }

函数

- 字符串函数
- 数字函数
- 列表函数
- 颜色函数
- Introspection 函数
- 三元函数等


字符串函数
1. unquote($string): 删除字符串中的引号
unquote() 函数只能删除字符串最前和最后的引号(双引号或单引号),而无法删除字符串中间的引号。如果字符没有带引号,返回的将是字符串本身。


    .test1 {
        content:  unquote('Hello Sass!') ;
    }
    .test2 {
        content: unquote("'Hello Sass!");
    }
    .test3 {
        content: unquote("I'm Web Designer");
    }
    .test4 {
        content: unquote("'Hello Sass!'");
    }
    .test5 {
        content: unquote('"Hello Sass!"');
    }
    .test6 {
        content: unquote(Hello Sass);
    }

2. quote($string): 给字符串添加引号


    .test1 {
        content:  quote('Hello Sass!');
    }
    .test2 {
        content: quote("Hello Sass!");
    }
    .test3 {
        content: quote(ImWebDesigner);
    }
    .test4 {
        content: quote(' ');
    }

建议都用test2的方法,唯有字符串里面有用到双引号要用`\"`表示
否则单引号、空格、!、?、>等,除中折号` - `和 下划线` _ `意外的特殊字符都会报错

3. To-upper-case()、To-lower-case(): 大小写转换

数字函数
- percentage($value): 将一个不带单位的数转换成百分比值;
- round($value): 将数值四舍五入,转换成一个最接近的整数;
- ceil($value): 将大于自己的小数转换成下一位整数;
- floor($value): 将一个数去除他的小数部分;
- abs($value): 返回一个数的绝对值;
- min($numbers…): 找出几个数值之间的最小值;
- max($numbers…): 找出几个数值之间的最大值;
- random(): 获取随机数

列表函数
- length($list): 返回一个列表的长度值;
- nth($list, $n): 返回一个列表中指定的某个标签值
- join($list1, $list2, [$separator]): 将两个列给连接在一起,变成一个列表;
- append($list1, $val, [$separator]): 将某个值放在列表的最后;
- zip($lists…): 将几个列表结合成一个多维的列表;
- index($list, $value): 返回一个值在列表中的位置值。

Introspection函数
- type-of($value): 返回一个值的类型
- unit($number): 返回一个值的单位;
- unitless($number): 判断一个值是否带有带位
- comparable($number-1, $number-2): 判断两个值是否可以做加、减和合并

Map

    $map: (
        $key1: value1,
        $key2: value2,
        $key3: value3
    )

Map函数
- map-get($map,$key): 根据给定的 key 值,返回 map 中相关的值。
- map-merge($map1,$map2): 将两个 map 合并成一个新的 map。
- map-remove($map,$key): 从 map 中删除一个 key,返回一个新 map。
- map-keys($map): 返回 map 中所有的 key。
- map-values($map): 返回 map 中所有的 value。
- map-has-key($map,$key): 根据给定的 key 值判断 map 是否有对应的 value 值,如果有返回 true,否则返回 false。
- keywords($args): 返回一个函数的参数,这个参数可以动态的设置 key 和 value。

RGB颜色函数
- rgb($red,$green,$blue): 根据红、绿、蓝三个值创建一个颜色。
- rgba($red,$green,$blue,$alpha): 根据红、绿、蓝和透明度值创- 建一个颜色。
- red($color): 从一个颜色中获取其中红色值。
- green($color): 从一个颜色中获取其中绿色值。
- blue($color): 从一个颜色中获取其中蓝色值。
- mix($color-1,$color-2,[$weight]): 把两种颜色混合在一起。

HSL函数
- hsl($hue,$saturation,$lightness): 通过色相(hue)、饱和度(saturation)和亮度(lightness)的值创建一个颜色;
- hsla($hue,$saturation,$lightness,$alpha): 通过色相(hue)、饱和度(saturation)、亮度(lightness)和透明(alpha)的值创建一个颜色;
- hue($color): 从一个颜色中获取色相(hue)值;
- saturation($color): 从一个颜色中获取饱和度(saturation)值;
- lightness($color): 从一个颜色中获取亮度(lightness)值;
- adjust_hue($color,$degrees): 通过改变一个颜色的色相值,创建一个新的颜色;
- lighten($color,$amount): 通过改变颜色的亮度值,让颜色变亮,创建一个新的颜色;
- darken($color,$amount): 通过改变颜色的亮度值,让颜色变暗,创建一个新的颜色;
- saturate($color,$amount): 通过改变颜色的饱和度值,让颜色更饱和,从而创建一个新的颜色
- desaturate($color,$amount): 通过改变颜色的饱和度值,让颜色更少的饱和,从而创建出一个新的颜色;
- grayscale($color): 将一个颜色变成灰色,相当于desaturate($color,100%)。
- complement($color): 返回一个补充色,相当于adjust-hue($color,180deg)。
- invert($color): 反回一个反相色,红、绿、蓝色值倒过来,而透明度不变。

Opacity函数
- alpha($color) /opacity($color): 获取颜色透明度值。
- rgba($color, $alpha): 改变颜色的透明度值。
- opacify($color, $amount) / fade-in($color, $amount): 使颜色更不透明。
- transparentize($color, $amount) / fade-out($color, $amount): 使颜色更加透明。

颜色函数实战——七色卡


@import规则
- 如果文件的扩展名是 .css。
- 如果文件名以 http:// 开头。
- 如果文件名是 url()。
- 如果 @import 包含了任何媒体查询(media queries)。
- 在同一个目录不能同时存在带下划线和不带下划线的同名文件。 例如， _colors.scss 不能与 colors.scss 并存。

@media 指令
- 支持嵌套使用。

@extend 指令
- 用来扩展选择器或占位符。

@at-root 指令

    .a {
      color: red;
      .b {
        color: orange;
        .c {
          color: yellow;
          @at-root .d {
            color: green;
          }
        }
      }
    }

@warn、@debug、@error指令

    @warn "输出调试信息";
    @debug "输出调试信息";
    @error "输出调试信息";
