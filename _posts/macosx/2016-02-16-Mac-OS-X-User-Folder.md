---
layout: post
title: Mac OS X用户文件夹国际化显示
category: MacOSX
tags: MacOSX
keywords: Mac OS X用户文件夹国际化显示
description: Mac OS X用户文件夹国际化显示
---

不知道打开有没有发现在Mac OS X的用户目录下有几个特殊的文件夹

![][1]

如果使用命令行查看

![][2]

它实际的文件名是英文的,但为什么我们看到的是中文呢
我们随便进一个空目录看下,比如Movies

![][3]

查看隐藏文件就可以看到有个`.localized`,如果你进的不是空目录,你根本不会知道它是干什么用的
我们查看下这个文件有什么内容

![][4]

其实这个文件什么内容都没有,如果删除这个文件呢

![][5]

会发现这个Movies文件夹显示了原本的文件名了
那如果要恢复中文名怎么办?既然我们知道那个`.localized`是空文件,那手动新建一个即可

![][6]

又恢复国际化了,这个文件其实是标记是否要国际化显示文件名的,它会根据系统语言显示对应国家的文件名

  [1]: /assets/images/Mac-OS-X-User-Folder/1455586650117.jpg "1455586650117.jpg"
  [2]: /assets/images/Mac-OS-X-User-Folder/1455586728689.jpg "1455586728689.jpg"
  [3]: /assets/images/Mac-OS-X-User-Folder/1455586854258.jpg "1455586854258.jpg"
  [4]: /assets/images/Mac-OS-X-User-Folder/1455586958874.jpg "1455586958874.jpg"
  [5]: /assets/images/Mac-OS-X-User-Folder/1455587015191.jpg "1455587015191.jpg"
  [6]: /assets/images/Mac-OS-X-User-Folder/1455587138430.jpg "1455587138430.jpg"
