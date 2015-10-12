---
layout: post
title: TL-WR840N救砖手记
category: 硬件
tags: 路由器,OpenWRT,刷机,救砖
keywords: 路由器,OpenWRT,刷机,救砖
description: TL-WR840N救砖手记
---

首先TTL救砖要先找到TTL的三条引线,分别为TXD, RXD和GND,那么对应路由器上面的TP1和TP2,至于GND嘛,学过电子的都知道为了保证设备的电器性能良好,在设计印刷电路板的时候都会尽可能的多的覆盖GND的线路,这里可能不好理解,简单的说就是翻过背面,看导线面积最大的一般就是GND了,所以随便找一块锡焊上去就是了.
下图是TXD和RXD的位置,TP1是TXD,TP2是RXD
![][1]
用漆包线将TTL引出后是这样的
![][2]
![][3]
![][4]
![][5]
打开电脑的SecureCRT或者超级终端都可以,这里我用SecureCRT
新建连接,协议用Serial,端口选择你的电脑响应的串口,波特率选115200,有些人会出现乱码什么的情况就是波特率选不对,下面的三项数据位,奇偶校验,和停止位默认,这里需要特别注意的是右边有个流控记得把三个勾都去掉,有些人会出现能显示串口的输出信息,但就是不能输入,最明显的表现就是输入TPL抢夺不了控制权
![][6]
设好串口后点连接,接下来给路由器上电
![][7]
当你看到Autobooting in 1 seconds的时候要在1秒内输入小写的tpl回车,有时候没抢夺到控制权就要重新上电,再来一次,这里有个技巧是你提前想输好小写的tpl一看到Autobooting in 1 seconds这句话立马按下回车,可以提高成功率
这时候观察下串口的输出信息

    1. #### TAP VALUE 1 = 0xf, 2 = 0x10 [0x0: 0x1f]
    2. 32 MB
    3. id read 0x100000ff
    4. sector count = 64
    5. Flash:  4 MB
    6. Using default environment
    7.
    8. In:    serial
    9. Out:   serial
    10.Err:   serial
    11.Net:   ag7240_enet_initialize...
    12.No valid address in Flash. Using fixed address
    13.No valid address in Flash. Using fixed address
    14.Virian MDC CFG Value ==> 4
    15.: cfg1 0xf cfg2 0x7014
    16.eth0: 00:03:7f:09:0b:ad
    17.eth0 up
    18.Virian MDC CFG Value ==> 4
    19.: cfg1 0xf cfg2 0x7214
    20.eth1: 00:03:7f:09:0b:ad
    21.ATHRS26: resetting s26
    22.ATHRS26: s26 reset done
    23.eth1 up
    24.eth0, eth1
    25.Autobooting in 1 seconds
    26.## Booting image at 9f020000 ...
    27.   Uncompressing Kernel Image ... Error: Bad gzipped data
    28.GUNZIP ERROR - must RESET board to recover
    29.
    30.Resetting...
    31.
    32.U-Boot 1.1.4 (Mar 10 2011 - 19:09:34)
    33.
    34.AP99 (ar7241 - Virian) U-boot
    35.DRAM:
    36.sri
    37.ar7240_ddr_initial_config(133): virian ddr1 init
    38.#### TAP VALUE 1 = 0xf, 2 = 0x10 [0x0: 0x1f]
    39.32 MB
    40.id read 0x100000ff
    41.sector count = 64
    42.Flash:  4 MB
    43.Using default environment
    44.
    45.In:    serial
    46.Out:   serial
    47.Err:   serial
    48.Net:   ag7240_enet_initialize...
    49.No valid address in Flash. Using fixed address
    50.No valid address in Flash. Using fixed address
    51.Virian MDC CFG Value ==> 4
    52.: cfg1 0xf cfg2 0x7014
    53.eth0: 00:03:7f:09:0b:ad
    54.eth0 up
    55.Virian MDC CFG Value ==> 4
    56.: cfg1 0xf cfg2 0x7214
    57.eth1: 00:03:7f:09:0b:ad
    58.ATHRS26: resetting s26
    59.ATHRS26: s26 reset done
    60.eth1 up
    61.eth0, eth1
    62.Autobooting in 1 seconds
    63.ar7240>

这里可以看出路由器执行到ar7240_ddr_initial_config(133): virian ddr1 init这句话后就重启了,可见这路由是一开机就重启,难怪连网线插电脑都提示未连接
好,这时候抢到路由的控制权
这时候串口输出信息是

    62.Autobooting in 1 seconds
    63.ar7240>

看到ar7240>表示你已经抢到路由的控制权了
如果你没看到这句话直接跳过的话,请检查之前提到的流控是否有去掉
接下来把网线接到路由器的WAN口,蓝色的那口
设置你电脑的IP为192.168.1.x  255.255.255.0  192.168.1.1
然后打开Tftpd32,将固件(openwrt-ar71xx-generic-tl-wr841nd-v7-squashfs-factory.bin)放到Tftpd32的目录下, Tftpd32默认的Current Directory就是程序当前目录,将固件改名为840.bin, 关闭计算机的防火墙
![][8]
接下来回到SecureCRT界面
依次输入

    setenv ipaddr 192.168.1.1      //此地址为路由器地址
    setenv serverip 192.168.1.100  //此地址为TFTP服务器即电脑的地址
    printenv                       //查看当前的环境，核对两个地址是否正确

    setenv ipaddr 192.168.1.1      //此地址为路由器地址
    setenv serverip 192.168.1.100  //此地址为TFTP服务器即电脑的地址
    printenv                       //查看当前的环境，核对两个地址是否正确

输出如下

    63.ar7240> setenv ipaddr 192.168.1.1
    64.ar7240> setenv serverip 192.168.1.100
    65.ar7240> printenv
    66.bootargs=console=ttyS0,115200 root=31:02 rootfstype=jffs2 init=/sbin/init mtdparts=ar7240-nor0:256k(u-boot),64k(u-boot-env),2752k(rootfs),896k(uImage),64k(NVRAM),64k(ART) REVISIONID
    67.bootcmd=bootm 0x9f020000
    68.bootdelay=1
    69.baudrate=115200
    70.ethaddr=0x00:0xaa:0xbb:0xcc:0xdd:0xee
    71.stdin=serial
    72.stdout=serial
    73.stderr=serial
    74.ethact=eth0
    75.ipaddr=192.168.1.1
    76.serverip=192.168.1.100
    77.
    78.Environment size: 367/65532 bytes
    79.ar7240>

看到

    75.ipaddr=192.168.1.1
    76.serverip=192.168.1.100

就表示正确了
接下来是将固件拷到路由器内存里
执行 `tftpboot 0x80000000 openwrt-ar71xx-generic-tl-wr841nd-v7-squashfs-factory.bin`

    79.ar7240> tftpboot 0x80000000 openwrt-ar71xx-generic-tl-wr841nd-v7-squashfs-factory.bin
    80.eth1 link down
    81.dup 1 speed 100
    82.Using eth0 device
    83.TFTP from server 192.168.1.100; our IP address is 192.168.1.1
    84.Filename 'openwrt-ar71xx-generic-tl-wr841nd-v7-squashfs-factory.bin'.
    85.Load address: 0x80000000
    86.Loading: #################################################################
    87.         #################################################################
    88.         #################################################################
    89.         #################################################################
    90.         #################################################################
    91.         #################################################################
    92.         #################################################################
    93.         #################################################################
    94.         #################################################################
    95.         #################################################################
    96.         #################################################################
    97.         ######################################################
    98. done
    99. Bytes transferred = 3932160 (3c0000 hex)
    100.ar7240>

这时候已经将固件上传到路由器了
下一步擦除FLASH
执行

    erase 0x9f020000 +0x3c0000

注:这里0x9f020000为内核的启动地址，在开机的引导信息中可以看到，见840N的U-boot32行“## Booting image at 9f020000 ...”，0x3c0000为固件大小，这个输错了路由器会变砖，上一步返回信息的最后一句会给出

    100.ar7240> erase 0x9f020000 +0x3c0000
    101.
    102.First 0x2 last 0x3d sector size 0x10000
    103.  61
    104.Erased 60 sectors
    105.ar7240>

再执行,将固件写入FLASH,然后重新启动

    cp.b 0x80000000 0x9f020000 0x3c0000
    bootm 0x9f020000

系统就开始重新启动了

    105.ar7240> cp.b 0x80000000 0x9f020000 0x3c0000
    106.Copy to Flash... write addr: 9f020000
    107.done
    108.ar7240> bootm 0x9f020000
    109.## Booting image at 9f020000 ...
    110.   Uncompressing Kernel Image ... OK
    111.
    112.Starting kernel ...

这时候看到Starting kernel ...路由器就已经救活了,开始启动系统了
这时候将网线插到LAN口, 打开网址192.168.1.1,用户名root,没有密码,login以后再设
![][9]
至此TL-WR840N救砖成功
相关工具在这里下载
链接：[http://pan.baidu.com/s/1ntOqdMp][10] 密码：aczz

  [1]: /assets/images/TL-WR840N-Router-Fix/1444660348537.jpg "1444660348537.jpg"
  [2]: /assets/images/TL-WR840N-Router-Fix/1444660374852.jpg "1444660374852.jpg"
  [3]: /assets/images/TL-WR840N-Router-Fix/1444660389010.jpg "1444660389010.jpg"
  [4]: /assets/images/TL-WR840N-Router-Fix/1444660406090.jpg "1444660406090.jpg"
  [5]: /assets/images/TL-WR840N-Router-Fix/1444660422873.jpg "1444660422873.jpg"
  [6]: /assets/images/TL-WR840N-Router-Fix/1444660471559.jpg "1444660471559.jpg"
  [7]: /assets/images/TL-WR840N-Router-Fix/1444660491731.jpg "1444660491731.jpg"
  [8]: /assets/images/TL-WR840N-Router-Fix/1444660629013.jpg "1444660629013.jpg"
  [9]: /assets/images/TL-WR840N-Router-Fix/1444661160991.jpg "1444661160991.jpg"
  [10]: http://pan.baidu.com/s/1ntOqdMp
