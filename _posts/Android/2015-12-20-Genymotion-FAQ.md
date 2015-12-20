---
layout: post
title: Genymotion 常见问题
tags: Android
keywords: Genymotion plugin for Eclipse找不到的问题
description: Genymotion 常见问题
---

## Genymotion plugin for Eclipse找不到的问题

根据官方说明安装Genymotion plugin for Eclipse的方法是:
1. 在Eclipse中点Help -> Install new software
2. 输入网址[http://plugins.genymotion.com/eclipse](http://plugins.genymotion.com/eclipse)回车

但是问题就在这里,提示`There are no categorized items`
![][1]
经过网络上一翻搜索没有结果,我以前安装也是直接就有的,可是不明白最近为何会没找到,后来经过查阅官方FAQ找到问题答案
[https://www.genymotion.com/#!/support?chapter=plugin-invisible-eclipse](https://www.genymotion.com/#!/support?chapter=plugin-invisible-eclipse)
>- Why can't I see the Genymotion plugin in the Eclipse plugin list?
The new version of Eclipse (Mars) automatically checks option **Group item by category**. When this option is enabled, the Genymotion plugin does not appear in the list of available plugins. In the **Install new software** window, uncheck this option to fix the problem.

原来只要去掉`Group item by category`选项即可

  [1]: /assets/images/Genymotion-FAQ/1450607370128.jpg "1450607370128.jpg"