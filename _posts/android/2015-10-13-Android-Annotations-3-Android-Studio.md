---
layout: post
title: AndroidAnnotations框架入门教程三之Android Studio环境配置
category: Android
tags: Android
keywords: Android,Annotations,Android Studio
description: AndroidAnnotations框架入门教程三之Android Studio环境配置
---

# 配置步骤

 1. 创建项目
 2. 了解项目目录结构及各配置文件作用
 3. 修改工作空间配置文件
 4. 修改项目配置文件
 5. 修改AndroidManifest.xml配置文件
 6. 在程序中使用Annotation
 7. 运行程序测试

## 1. 创建项目
![][1]
![][2]
基本遵照默认即可

## 2. 了解项目目录结构及各配置文件作用

![][3]

## 3. 修改工作空间配置文件
打开工作空间配置文件
在`classpath 'com.android.tools.build:gradle:1.3.0'`下面添加一条`classpath 'com.neenbedankt.gradle.plugins:android-apt:1.4'`

    // Top-level build file where you can add configuration options common to all sub-projects/modules.

    buildscript {
        repositories {
            jcenter()
        }
        dependencies {
            classpath 'com.android.tools.build:gradle:1.3.0'
            classpath 'com.neenbedankt.gradle.plugins:android-apt:1.4'
            // NOTE: Do not place your application dependencies here; they belong
            // in the individual module build.gradle files
        }
    }

    allprojects {
        repositories {
            jcenter()
        }
    }

    task clean(type: Delete) {
        delete rootProject.buildDir
    }

![][4]

点右上方的Sync Now会更新配置

## 4. 修改项目配置文件
打开项目配置文件
在`apply plugin: 'com.android.application'`下方添加

    apply plugin: 'android-apt'
    def AAVersion = '3.3.2'

在dependencies中追加如下

    apt "org.androidannotations:androidannotations:$AAVersion"
    compile "org.androidannotations:androidannotations-api:$AAVersion"

最后增加一个apt插件

    apt {
        arguments {
            androidManifestFile variant.outputs[0].processResources.manifestFile
            resourcePackageName 'com.example.androidannotation'
        }
    }

修改结果如图
![][5]
点右上方的Sync Now更新配置

## 5. 修改AndroidManifest.xml配置文件
打开AndroidManifest.xml
和Eclipse环境下的配置是一样
在MainActivity后面加一个下划线"_"
原来是

    <activity
            android:name=".MainActivity"
            android:label="@string/app_name" >

改成

    <activity
            android:name=".MainActivity_"
            android:label="@string/app_name" >

修改完后点工具栏的Make按钮从新编译下即可消除报错
![][6]

## 6. 在程序中使用Annotation
这部分也和Eclipse下一样
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

添加`@EActivity(R.layout.activity_main)`
注释`setContentView(R.layout.activity_main);`

## 7. 运行程序测试
打开程序正常运行
![][7]

# 项目Demo
[https://github.com/zhenhappy/AndroidAnnotation_Demo][8]

  [1]: /assets/images/Android-Annotatios-3-Android-Studio/1444700941169.jpg "1444700941169.jpg"
  [2]: /assets/images/Android-Annotatios-3-Android-Studio/1444700586154.jpg "1444700586154.jpg"
  [3]: /assets/images/Android-Annotatios-3-Android-Studio/1444703033739.jpg "1444703033739.jpg"
  [4]: /assets/images/Android-Annotatios-3-Android-Studio/1444701933215.jpg "1444701933215.jpg"
  [5]: /assets/images/Android-Annotatios-3-Android-Studio/1444702415682.jpg "1444702415682.jpg"
  [6]: /assets/images/Android-Annotatios-3-Android-Studio/1444703407250.jpg "1444703407250.jpg"
  [7]: /assets/images/Android-Annotatios-3-Android-Studio/1444703707349.jpg "1444703707349.jpg"
  [8]: https://github.com/zhenhappy/AndroidAnnotation_Demo
