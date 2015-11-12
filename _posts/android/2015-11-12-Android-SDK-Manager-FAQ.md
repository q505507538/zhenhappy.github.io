---
layout: post
title: Android SDK Manager常见问题
category: Android
tags: Android,peer,not,authenticated
keywords: Android,peer,not,authenticated
description: Android SDK Manager 出现peer not authenticated错误
---

### 问题1:peer not authenticated错误
![][1]

解决方法:
`Tools -> Options`勾选`Force https://...sources to be fetched using http://...`即可
![][2]

### 问题2:Download finished with wrong size. Expected 77890715 bytes, got 81920 bytes错误

![][3]

解决方法:
第一:启动SDK manager.exe时会自动获取sdk列表,点击右下角Log按钮
第二:一般在最开头的位置如下图有类似于`Parse XML:    http://dl.google.com/android/repository/repository-xx.xml`这样的就是sdk的下载列表,在浏览器中输入这个地址
![][4]
第三:打开后Ctrl+F搜索文件名,这里有个技巧是搜索版本号一般就能得到三个结果,分别是windows,linux,mac,如下图。
![][5]
那么他的下载地址就是https://dl-ssl.google.com/android/repository/加上文件名,就是`https://dl-ssl.google.com/android/repository/platform-tools_r23.1_rc1-windows.zip` 这个地址直接复制到浏览器或是迅雷下载,之后就把下载下来的包放到SDK下Temp文件夹内,重新启动SDK manager.exe安装即可。

  [1]: /assets/images/Android-SDK-Manager-FAQ/1447341978385.jpg "1447341978385.jpg"
  [2]: /assets/images/Android-SDK-Manager-FAQ/1447320493450.jpg "1447320493450.jpg"
  [3]: /assets/images/Android-SDK-Manager-FAQ/1447342360762.jpg "1447342360762.jpg"
  [4]: /assets/images/Android-SDK-Manager-FAQ/1447342468562.jpg "1447342468562.jpg"
  [5]: /assets/images/Android-SDK-Manager-FAQ/1447343141937.jpg "1447343141937.jpg"