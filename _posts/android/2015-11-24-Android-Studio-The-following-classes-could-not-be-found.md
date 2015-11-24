---
layout: post
title: 解决Android Studio默认AppTheme主题找不到的问题
category: android,support,v7,internal,app,WindowDecorActionBar
tags: Android
keywords: android,support,v7,internal,app,WindowDecorActionBar
description: 解决Android Studio默认AppTheme主题找不到的问题
---

## 问题:Android Studio默认AppTheme主题找不到

    The following classes could not be found:
        - android.support.v7.internal.app.WindowDecorActionBar (Fix Build Path, Create Class)
        
![][1]

## 解决方法1:

打开`build.gradle (Module:app)`
在`dependencies`中找到`compile 'com.android.support:appcompat-v7:23.1.1'`
改成`com.android.support:appcompat-v7:23.0.1'`
更新配置即可

## 解决方法2:

在`style.xml`中把`<style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">`
改成`<style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">`
也可以解决

  [1]: /assets/images/Android-Studio-The-following-classes-could-not-be-found/1448377602987.jpg "1448377602987.jpg"