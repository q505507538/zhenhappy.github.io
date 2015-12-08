---
layout: post
title: 多账户GitHub配置
category: Git
tags: Git
keywords: GitHub,Multi-profile
description: 多账户GitHub配置
---

多个GitHub账户的配置网络上教程也不少,原理都是用SSH的方法,我也不重复制造车轮,仅仅为了做个记录,下次要用可以快速配置

### 1、新建SSH Key

    # Mac切换到/Users/username/.ssh
    # Windows切换到C:\Users\username\.ssh
    $ cd ~/.ssh
    # 新建名为user1_rsa和user2_rsa的SSH Key,一路回车即可
    $ ssh-keygen -t rsa -C "user1@email.com" -f user1_rsa 
    $ ssh-keygen -t rsa -C "user2@email.com" -f user2_rsa
    $ ls # 此时目录下有如下文件
    user1_rsa     user1_rsa.pub
    user2_rsa     user2_rsa.pub

### 2、修改config文件

在`.ssh`目录下创建`config`文件

    $ touch config

内容如下

```
# 该文件用于配置私钥对应的服务器
# Default github user(user1@email.com)
# 这里建议默认的github帐号Host写github.com,最常用的省得以后每次clone还要改地址,麻烦
# HostName和User不要改,IdentityFile根据是什么系统用什么路径
Host github.com
HostName github.com
User git
IdentityFile ~/.ssh/user1_rsa

# second user(user2@email.com)
# 建一个github别名
Host github2
HostName github.com
User git
IdentityFile ~/.ssh/user2_rsa
```
规则是从上至下读取config的内容，在每个Host下寻找对应的私钥。将原地址git@github.com:test/test.git替换成github2:test/test.git

### 3、添加公钥到GitHub后台

复制公钥到剪贴板

    clip < ~/.ssh/user1_rsa.pub
    
登入对应的GitHub帐号,打开[https://github.com/settings/ssh](https://github.com/settings/ssh),点`Add SSH key`,粘贴即可
同理user2也这么配置

### 5、测试

第一次打开会警告,输入yes即可

    $ ssh -T git@github.com
    $ ssh -T github2
