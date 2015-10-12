---
layout: post
title: AndroidAnnotations框架入门教程二之Eclipse环境配置
category: Android
tags: Android,Annotations
keywords: Android,Annotations
description: AndroidAnnotations框架入门教程二之Eclipse环境配置
---

# 配置步骤

 1. 创建项目
 2. 添加所需jar包
 3. 修改配置文件
 4. 在程序中使用Annotation
 5. 运行程序测试

## 1. 创建项目
![][1]
仅供参考,不必完全一样

## 2. 添加所需jar包
首先去[这里][2]下载最新的jar包
下载完解压后会有两个jar包
androidannotations-api-3.3.2.jar和androidannotations-3.3.2.jar
简单解释下这两个作用
androidannotations-api-3.3.2.jar这个是主要的jar包,将这个包放到项目目录下的libs目录下
androidannotations-3.3.2.jar这个是给编译器用的,因此在项目目录下新建一个compile-libs目录,放到这里
android-support-v4.jar是创建项目自带的
项目的目录结构是这样的
![][3]
接下来打开项目属性,找到Java Compiler->Annotation Processing,将右边的打勾启用
![][4]
再到Factory Path中启用,并添加compile-libs中的jar包
![][5]
这样添加jar包就完成了

## 3. 修改配置文件

打开项目目录下的AndroidManifest.xml文件
在主函数那边后面加一个下划线
原来是

    <activity
            android:name=".MainActivity"
            android:label="@string/app_name" >

改成

    <activity
            android:name=".MainActivity_"
            android:label="@string/app_name" >

![][6]
改完之后要重新编译,选择菜单的Project->Clean
至此环境配置部分就完成了,接下来我们添加Annotation测试

## 4. 在程序中使用Annotation

打开MainActivity.java改成如下

    package com.example.androidannotation;

    import org.androidannotations.annotations.EActivity;
    import android.app.Activity;
    import android.os.Bundle;

    @EActivity(R.layout.activity_main)
    public class MainActivity extends Activity {

    	@Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
    //        setContentView(R.layout.activity_main);
        }
    }

主要修改两个地方
一个是`setContentView(R.layout.activity_main);`这句话注释掉
另一个就是在MainActivity类上方加`@EActivity(R.layout.activity_main)`,这句话就代替了`setContentView(R.layout.activity_main);`的作用

## 5. 运行程序测试

测试结果应该是和没用annotation的效果一样的

  [1]: /assets/images/1444637579305.jpg "1444637579305.jpg"
  [2]: https://github.com/excilys/androidannotations/wiki/Download
  [3]: /assets/images/1444638059269.jpg "1444638059269.jpg"
  [4]: /assets/images/1444638223297.jpg "1444638223297.jpg"
  [5]: /assets/images/1444638325506.jpg "1444638325506.jpg"
  [6]: /assets/images/1444639362326.jpg "1444639362326.jpg"
