---
layout: post
title: WimBoot方式安装Windows8/8.1/10 (支持BIOS/UEFI引导方式,MBR/GTP分区格式)
category: 系统
tags: 系统
keywords: WimBoot,UEFI,GTP,Windows10,Win10
description: WimBoot方式安装Windows8/8.1/10 (支持BIOS/UEFI引导方式,MBR/GTP分区格式)
---

# 准备工作:

 - 准备一台可以安装Win8.1的电脑（部分老电脑可能不支持x64位版）
 - 准备一个Windows8.1 update原版安装镜像
 - 准备一个WinPE5.1的PE镜像
 - U盘一枚，容量1G以上都行，用于安装写入PE
 - UltraISO用于将WinPE5.1写入U盘

# 安装步骤:

## 1.首先下载WinPE_5.1_x32&x64.iso文件和UltraISO

WinPE5.1链接：[http://pan.baidu.com/s/1kTolZKj][1] 密码：rf6b
UltraISO链接：[http://pan.baidu.com/s/1dDAskhz][2] 密码：4hp2

接下来打开UltraISO，左下角本地目录里面找到WinPE_5.1_x32&x64.iso打开
选择“启动”->“写入硬盘映像”
![][3]
硬盘驱动器选择你的U盘，先格式化，再写入
![][4]
写入完成后第一步就结束了

## 2.制作WimBoot镜像，需要有原版的Win8.1update的ISO镜像用于制作WimBoot镜像

Win8.1update专业版x64下载地址：
[ed2k://|file|cn_windows_8.1_professional_vl_with_update_x64_dvd_4050293.iso|4136626176|4D2363F9E06BFD50A78B1E6464702959|/][5]

Win8.1update专业版x86下载地址：
[ed2k://|file|cn_windows_8.1_professional_vl_with_update_x64_dvd_4050293.iso|4136626176|4D2363F9E06BFD50A78B1E6464702959|/][6]

或者可以下载我制作好的wim镜像文件直接可以跳过这步进入下一步

链接：[http://pan.baidu.com/s/1bnpipGj][7] 密码：kh95

接下来制作的方法如下

1）虚拟光驱载入原版安装镜像，比如载入到G盘，执行如下命令将原版安装镜像中的source目录下的install.wim映射到一个空闲分区，比如X盘。

    DISM /Apply-Image /ImageFile:"G:\sources\install.wim" /Index:1 /ApplyDir:X:\

如果磁盘已经存在有用数据,可以新建虚拟盘用于制作WimBoot镜像,可以直接在Windows下操作,不必进入PE,右键这台计算机->管理->磁盘管理,点一下右边的任意一个盘符,在点击上面菜单"操作"->创建VHD,如下图这样,然后再对这个虚拟磁盘初始化,新建简单卷即可,这个虚拟盘仅仅用于制作WimBoot镜像,制作完成就可以删除

![][8]

2）Capture刚才映射到的分区为WimBoot.wim（其它名称也行，比如D:\WIMBoot.wim）到其它分区。记得加上 /WIMBoot，还有别忘记 /Name 否则没办法正常引导。

    DISM /Capture-Image /ImageFile:"D:\WimBoot.wim" /CaptureDir:X:\ /Name:"Windows 8.1 Pro with Update" /WIMBoot

这里的D:\Wimboot.wim就是可以引导WimBoot的镜像了
可以使用如下命令知道wim镜像是否制作成功

    DISM /get-wiminfo /wimfile:"D:\WimBoot.wim" /index:1

看到WIM可引导：是就表示WimBoot镜像制作成功

![][9]

## 3.现在我们已经有可用于引导WimBoot的镜像文件了

只需要使用U盘进入WinPE5.1，格式化C盘，使用管理员启动命令提示符
将WimBoot.wim应用到C盘即可

    DISM /Apply-Image /ImageFile:"D:\WIMBOOT.wim" /Index:1 /ApplyDir:X:\ /WIMBoot

接下来就可以创建引导了，这里分两中情况：一种是MBR分区的BIOS引导

    bcdboot C:\windows /l zh-cn

另一种是GTP分区UEFI引导，需要使用DiskGenius将ESP分区分配一个盘符假设为H盘

    bcdboot C:\windows /s H: /f uefi /l zh-cn

重启电脑即可，WimBoot安装到此就全部安装完了
安装完后C盘初始大小32位的应该占用4G左右，64位的占用6G左右

  [1]: http://pan.baidu.com/s/1kTolZKj
  [2]: http://pan.baidu.com/s/1dDAskhz
  [3]: /assets/images/Wimboot-Install/1443507052534.jpg "1443507052534.jpg"
  [4]: /assets/images/Wimboot-Install/1443507085599.jpg "1443507085599.jpg"
  [5]: ed2k://%7Cfile%7Ccn_windows_8.1_professional_vl_with_update_x64_dvd_4050293.iso%7C4136626176%7C4D2363F9E06BFD50A78B1E6464702959%7C/
  [6]: ed2k://%7Cfile%7Ccn_windows_8.1_professional_vl_with_update_x64_dvd_4050293.iso%7C4136626176%7C4D2363F9E06BFD50A78B1E6464702959%7C/
  [7]: http://pan.baidu.com/s/1bnpipGj
  [8]: /assets/images/Wimboot-Install/1443507513798.jpg "1443507513798.jpg"
  [9]: /assets/images/Wimboot-Install/1443507797437.jpg "1443507797437.jpg"
