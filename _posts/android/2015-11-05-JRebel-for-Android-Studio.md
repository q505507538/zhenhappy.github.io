---
layout: post
title: JRebel for Android实战用法
category: jrebel,android
tags: Android
keywords: jrebel,android
description: JRebel for Android实战用法
---

## 介绍
无意中发现zeroturnaround公司在前两个月又发布了一神器JRebel for Android,仅支持Android Studio,虽然这个JRebel for Android 目前来看功能还是比较有限的,主要作用就是类和UI的改动能够自动reload无需从新安装运行apk,已经算是大大的提高了工作效率,接下来简单介绍下安装和使用方法,以后如果这个插件有更新我会再做介绍

## 安装
打开Android Studio -> Preferences -> Plugins -> Browse repositories... -> Search "JRebel for Android" -> Install plugin
安装好后重启导入证书即可
![安装][1]

## 使用方法
用法很简单,就是原本的Run和Debug按钮替换成JRebel的Run和Debug按钮,看动画就可以理解
![使用方法][2]
有个地方需要注意的是就是每次修改完后要手动点Make按钮(或者快捷键是Command+F9)模拟器那边的程序才会重新渲染

  [1]: /assets/images/JRebel-for-Android-Studio/1446736044669.jpg "1446736044669.jpg"
  [2]: /assets/images/JRebel-for-Android-Studio/1446737778550.gif "1446737778550.gif"
