---
layout: post
title: git克隆出所有分支
category: git,clone,url,all,branches
tags: Git
keywords: git,clone,url,all,branches
description: git克隆出所有分支
---

## 问题

执行git clone URL后,默认只会克隆master分支,并将本地master分支和远程创库的msater分支建立关系,那么如何克隆出所有分支呢?

## 解决

步骤1执行

    for branch in `git branch -a | grep remotes | grep -v HEAD | grep -v master`; do
    	git branch --track ${branch##*/} $branch
    done
    
这个原理其实就是把所有的远程分支列出来然后在本地创建并建立关系

    git branch -a | grep remotes | grep -v HEAD | grep -v master

这条命令就是取所有远程分支,并排除HEAD和master
然后遍历所有远程分支

    git branch --track ${branch##*/} $branch

这句是创建本地分支并和远程分支建立关系,
`${branch##*/}`是本地分支名
`$branch`是远程分支

步骤2执行

    git fetch --all
    git pull --all

这两句的意思就是更新所有分支上的代码到最新的状态

这两步执行后就可以克隆出所有分支了