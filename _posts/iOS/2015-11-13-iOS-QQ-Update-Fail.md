---
layout: post
title: 解决iOS版QQ更新'无法下载应用'问题
category: iOS
tags: qd.myapp.com,无法下载应用,此时无法下载'QQ'
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
1.安装Charles(众所周知这是Mac上很流行的抓包工具),当然了他也有Windows版本,如果是Windows用户还有一个选择就是用Fiddler2,这里我们用Windows版的Charles来做演示,原理都一样
2.首先我们要了解苹果自从iOS8以上更新ipa包就强制要求采用https协议
所以我们要能对https进行抓包,https是加密链接理论上是不能抓包的,但是我们通过伪证书进行抓包是可以的,接下来我们先[下载Charles的伪证书](http://www.charlesproxy.com/assets/legacy-ssl/charles.crt)
3.给自己的icloud邮箱发邮件,把证书作为附件发给自己邮箱,在手机上的`邮件`应用就可以打开证书并安装,具体怎么安装不演示了,这都不会不用玩手机了
4.装好证书后给自己的WiFi设置代理为电脑的ip,然后到QQ的`关于QQ与帮助`页面重新获取更新,在Charles这边点允许`Allow`同意远程设备抓包
![][5]
然后就可以看到抓包结果了,在右侧的URL那里的[`https://qd.myapp.com/myapp/qqteam/iPhoneQQ/iPhoneQQ_6.0.0.100.ipa`](https://qd.myapp.com/myapp/qqteam/iPhoneQQ/iPhoneQQ_6.0.0.100.ipa)就是iPhoneQQ6.0的ipa包下载地址了
5.下载到电脑后用PP助手安装就搞定了

  [1]: /assets/images/iOS-QQ-Update-Fail/1447401617667.jpg "1447401617667.jpg"
  [2]: /assets/images/iOS-QQ-Update-Fail/1447401643931.jpg "1447401643931.jpg"
  [3]: /assets/images/iOS-QQ-Update-Fail/1447401842574.jpg "1447401842574.jpg"
  [4]: /assets/images/iOS-QQ-Update-Fail/1447401732774.jpg "1447401732774.jpg"
  [5]: /assets/images/iOS-QQ-Update-Fail/1447401194121.jpg "1447401194121.jpg"
