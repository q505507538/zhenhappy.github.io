---
layout: post
title: 越狱开发环境搭建一
category: iOS
tags: iOS
keywords: jailbreak,dev,development,environment
description: 越狱开发环境搭建一
---

## SSH配置
想要使用SSH连接上你的iPhone,首先要在iPhone的Cydia上安装`OpenSSH`这个插件,它回依赖安装一个`OpenSSL`上去,然后让iPhone和Mac处在同一局域网下,假设你的iPhone地址为192.168.1.2

    ssh root@192.168.1.2

默认密码为alpine，建议登入后修改

    passwd root

输入新密码

## Theos开发环境

首先要配置环境变量,在~/.zshrc或~/.bashrc中添加以下内容

    export THEOS=/opt/theos
    export PATH=$THEOS/bin:$PATH
    export THEOS_DEVICE_IP={手机设备的ip} THEOS_DEVICE_PORT=22

下载Theos

    git clone git://github.com/DHowett/theos.git $THEOS

下载ldid

    brew update
    brew install ldid

然后复制iPhone上的两个文件到本地

    sudo scp root@192.168.1.2:/Library/Frameworks/CydiaSubstrate.framework/Headers/CydiaSubstrate.h $THEOS/include/substrate.h
    sudo scp root@192.168.1.2:/Library/Frameworks/CydiaSubstrate.framework/CydiaSubstrate $THEOS/lib/libsubstrate.dylib

## 配置iOS SDK
下载对应sdk，当前最新版本为8.1，那就只能先下了
SDK地址：http://iphone.howett.net/sdks

    cd $THEOS
    sudo wget http://iphone.howett.net/sdks/dl/iPhoneOS8.1.sdk.tbz2
    sudo tar jxvf iPhoneOS8.1.sdk.tbz2
    sudo mv iPhoneOS8.1.sdk sdks
    sudo rm iPhoneOS8.1.sdk.tbz2

## 支持64位设备的操作

    sudo ln -s $THEOS/makefiles/platform/Darwin-arm.mk $THEOS/makefiles/platform/Darwin-arm64.mk
    sudo ln -s $THEOS/makefiles/targets/Darwin-arm     $THEOS/makefiles/targets/Darwin-arm64

## 修改dpkg打包压缩方式
修改这个文件`$THEOS/makefiles/package/deb.mk`
搜索`$(FAKEROOT)`
原来是

    $(FAKEROOT) -r dpkg-deb -b

改成

    $(FAKEROOT) -r dpkg-deb -Zlzma -b

## 创建应用
找一个目录执行

    $THEOS/bin/nic.pl

如果之前有配置环境变量的话也可以直接使用如下

    nic.pl

按照提示走
第一步是让你选择工程类型,选择1
第二步是项目名称
第三步是包名
第四步是作者名

![][1]

接下来编译项目

    cd jailbreak
    make package

编译成功如下

![][2]

会报一个警告`Deploying to iOS 3.0 while building for 6.0 will generate armv7-only binaries.`不影响编译结果

这里有几个常见错误需要注意:
错误1:

    Making stage for application jailbreak...
    /Applications/Xcode.app/Contents/Developer/usr/bin/make package requires you to have a layout/ directory in the project root, containing the basic package structure, or a control file in the project root describing the package.
    make: *** [internal-package] Error 1

如图所示
![][3]

解决方法:出现这个错误的原因是因为你的项目所在路径存在空格,只要放到没有空格的路径下即可解决

错误2

    /Applications/Xcode.app/Contents/Developer/usr/bin/make package requires dpkg-deb.
    make: *** [internal-package-check] Error 1

如图所示
![][4]

解决方法:到[https://github.com/DHowett/dm.pl/blob/master/dm.pl](https://github.com/DHowett/dm.pl/archive/master.zip)下载`dm.pl`文件,请勿直接复制网页上内容来保存,下载后并改名为`dpkg-deb`,放到到`/opt/theos/bin`目录,并修改权限`sudo chmod +x /opt/theos/bin/dpkg-deb`,即可解决

错误3:

    make: *** [internal-package] Error 255

如图所示
![][5]

解决方法:这个错误最诡异,没半点错误提示,这边告诉大家为什么会出现这个错误,原因就在于我们创建项目的时候在设置`Project Name`(包括工程名和包名)的时候使用了大写字母或者特殊字符(下划线等)就会出现这个错误,工程名和包名只能使用小写字母,这个问题即可解决

## 安装到设备
那deb既然编译出来了我们就安装到iPhone上试试,首先确保在环境变量中`$THEOS_DEVICE_IP`和`THEOS_DEVICE_PORT`有配置好(Theos开发环境这一步),然后就是iPhone上Cydia没有在在前台打开,以及SSH能够连接上设备,接下来输入命令来安装

    make install

![][6]

输入iPhone的root密码即可安装成功,打开`iPhone上的Cydia -> 已安装 -> 最近`来查看安装结果,如图

![][7]


  [1]: /assets/images/iOS-jailbreak-development-environment-1/1454494321547.jpg "1454494321547.jpg"
  [2]: /assets/images/iOS-jailbreak-development-environment-1/1454578651005.jpg "1454578651005.jpg"
  [3]: /assets/images/iOS-jailbreak-development-environment-1/1454579092711.jpg "1454579092711.jpg"
  [4]: /assets/images/iOS-jailbreak-development-environment-1/1454579240625.jpg "1454579240625.jpg"
  [5]: /assets/images/iOS-jailbreak-development-environment-1/1454579985438.jpg "1454579985438.jpg"
  [6]: /assets/images/iOS-jailbreak-development-environment-1/1454580724047.jpg "1454580724047.jpg"
  [7]: /assets/images/iOS-jailbreak-development-environment-1/1454580879589.jpg "1454580879589.jpg"
