---
layout: post
title: 解决iOS版QQ更新'无法下载应用'问题
category: qd.myapp.com,无法下载应用,此时无法下载'QQ'
tags: iOS
keywords: qd.myapp.com,无法下载应用,此时无法下载'QQ'
description: 解决iOS版QQ更新'无法下载应用'问题
---

问题:
今天QQ自动弹出测试版邀请试用通知
![][1]
点`马上体验`,跳出`"qd.myapp.com"要安装"QQ"`
![][2]
点`安装`,在看到桌面有QQ的图标在转
![][3]
转了一会就提示`无法下载应用`
![][4]
重试以上步骤N次无效后放弃,说是要越狱手机才能安装,我的设备是iPhone6,9.02已经越狱,这问题已经不是今天才有了,所以今天要怒发此文解决这个问题

解决思路:
手机要安装QQ肯定要先下载它,那么也就是说如果我们有QQ的下载地址,用电脑下载下来,通过PP助手之类的去安装就可以解决,前提是要设备要越狱

开始行动:
1.安装Charles(众所周知这是Mac上很流行的抓包工具),当然了他也有Windows版本,如果是Windows用户还有一个选择就是用Fiddler2,这里用Windows版的Charles来做演示,原理都一样,下载地址在这[http://www.charlesproxy.com/download/](http://www.charlesproxy.com/download/),无需正版的,免费的就多等10秒就可以了
2.首先我们要了解苹果自从iOS8以上更新ipa包就强制要求采用https协议
所以我们要能对https进行抓包,https是加密链接理论上是不能抓包的,但是我们通过伪证书进行抓包是可以的.
根据[官方说明](http://www.charlesproxy.com/documentation/using-charles/ssl-certificates/)在iOS设备上用Safari打开这个地址[http://www.charlesproxy.com/getssl/](http://www.charlesproxy.com/getssl/)就会自动跳出安装证书提示,输入密码安装即可
但是据网友反应打开这个这个网址后没有弹出证书安装界面,这里说明下原因,这个证书是通过我们电脑上的Charles来安装的,所以在安装证书之前要先打开`设置`->`Wi-Fi`设置代理为电脑的IP,这样才能正常的弹出证书安装界面
3.装好证书到QQ的`设置`->`关于QQ与帮助`->`版本更新`重新获取更新,在Charles这边点允许`Allow`同意远程设备抓包
![][5]
然后就可以看到抓包结果了,在右侧的URL那里的[`https://qd.myapp.com/myapp/qqteam/iPhoneQQ/iPhoneQQ_6.0.0.121.ipa`](https://qd.myapp.com/myapp/qqteam/iPhoneQQ/iPhoneQQ_6.0.0.121.ipa)就是iPhoneQQ6.0的ipa包下载地址了
4.下载到电脑后用PP助手安装就搞定了

  [1]: /assets/images/iOS-QQ-Update-Fail/1447401617667.jpg "1447401617667.jpg"
  [2]: /assets/images/iOS-QQ-Update-Fail/1447401643931.jpg "1447401643931.jpg"
  [3]: /assets/images/iOS-QQ-Update-Fail/1447401842574.jpg "1447401842574.jpg"
  [4]: /assets/images/iOS-QQ-Update-Fail/1447401732774.jpg "1447401732774.jpg"
  [5]: /assets/images/iOS-QQ-Update-Fail/1447468619121.jpg "1447468619121.jpg"
