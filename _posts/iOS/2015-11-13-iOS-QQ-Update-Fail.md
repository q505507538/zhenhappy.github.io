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
根据[官方说明](http://www.charlesproxy.com/documentation/using-charles/ssl-certificates/)在iOS设备上用Safari打开这个地址[http://www.charlesproxy.com/getssl/](http://www.charlesproxy.com/getssl/)就会自动跳出安装证书提示,输入密码安装即可.
但是据网友反应打开这个这个网址后没有弹出证书安装界面,这里说明下原因,这个证书是通过我们电脑上的Charles来安装的,所以在安装证书之前要先打开`设置`->`Wi-Fi`设置代理为电脑的IP,这样才能正常的弹出证书安装界面
3.装好证书到QQ的`设置`->`关于QQ与帮助`->`版本更新`重新获取更新,在Charles这边点允许`Allow`同意远程设备抓包
![][5]
然后就可以看到抓包结果了,在右侧的URL那里的[`https://qd.myapp.com/myapp/qqteam/iPhoneQQ/iPhoneQQ_6.0.0.121.ipa`](https://qd.myapp.com/myapp/qqteam/iPhoneQQ/iPhoneQQ_6.0.0.121.ipa)就是iPhoneQQ6.0的ipa包下载地址了
4.下载到电脑后用PP助手安装就搞定了

后续:
同理发现QQ音乐也有不能升级的问题,比QQ更坑爹,QQ还能出现正在下载什么的最后经过N次尝试失败,QQ音乐就什么都没有提示,点下去若无其事一样,一点反应都没有。
不过知道方法就不怕,解决方法类似,不过有一点点不同,就是刚说了,QQ音乐点下去一点反应都没有,也就是说QQ音乐它根本还没到请求ipa包下载那步,那该如何抓它的下载地址呢?
说到这边我们先简单的了解下iOS大企业证书的安装过程。苹果大企业证书是可以不通过AppStore安装到iOS系统上的。理论上我们正常点升级是可以安装成功的,为什么QQ和QQ音乐安装不成功。这边原因可能出在他们证书上,具体是什么问题,我不是开发人员不太清楚。但是今天我们要解决的问题是如何抓到下载地址。首先iOS在请求下载安装包的时候其实是先请求一个plist文件,这是一个xml文件,里面包含安装包的一些信息,其中就包括我们想知道的下载地址。那知道这个原理后我们就开始抓这个plist文件,经过我抓包尝试得知`https://d3g.qq.com`开头是就是plist文件的地址了,右键这个地址选择`Enable SSL Proxying`启用SSL抓包,前提是和抓QQ的步骤一样,要有安装伪证书,才能抓https的地址。
![][6]
抓包结果如上图,将是plist文件下载后用记事本打开,正常人瞄一眼就可以看到下载地址了

    <dict>
        <key>kind</key>
        <string>software-package</string>
        <key>url</key>
		<string>http://d3g.qq.com/musicapp/kge/508/QQMusic5.8build18_002.ipa</string>
    </dict>

包含ipa的那个url就是下载地址了,剩下的步骤不多说,和QQ一样。

  [1]: /assets/images/iOS-QQ-Update-Fail/1447401617667.jpg "1447401617667.jpg"
  [2]: /assets/images/iOS-QQ-Update-Fail/1447401643931.jpg "1447401643931.jpg"
  [3]: /assets/images/iOS-QQ-Update-Fail/1447401842574.jpg "1447401842574.jpg"
  [4]: /assets/images/iOS-QQ-Update-Fail/1447401732774.jpg "1447401732774.jpg"
  [5]: /assets/images/iOS-QQ-Update-Fail/1447468619121.jpg "1447468619121.jpg"
  [6]: /assets/images/iOS-QQ-Update-Fail/1449131436090.jpg "1449131436090.jpg"