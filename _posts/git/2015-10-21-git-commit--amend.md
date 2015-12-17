---
layout: post
title: git修改已经提交的注释
category: git,commit,amend,rebase
tags: Git
keywords: git,commit,amend,rebase
description: git修改已经提交的注释
---
## 最后一次提交的注释,对于已经push的永远没办法改了

    git commit --amend

## 更早之前的历史修改

假设要修改当前版本往前三次版本的状态,四次就把`HEAD~3`改成`HEAD~4`

    git rebase -i HEAD~3

假设要从第一个版本开始修改

    git rebase -i --root

然后会看到

    pick sha1 X
    pick sha1 Y
    pick sha1 Z

要修改哪个,就把那行的pick改成edit

    pick sha1 X
    edit sha1 Y
    pick sha1 Z

保存退出
通过tig查看历史发现最后一次提交已经变成刚才选的那个了
然后就和修改最后一次提交一样了

    git commit -amend

修改完了之后,这样返回

    git rebase --continue

这时候就又回到正常状态了

## 压缩掉不需要的版本

和上面一个修改历史差不多，也是使用`git rebase`
同样会看到

    pick sha1 X
    pick sha1 Y
    pick sha1 Z

不同的是要压缩掉哪个版本,就把那个版本pick改成squash

    pick sha1 X
    squash sha1 Y
    pick sha1 Z

保存退出,会出现备注,再次保存退出
用tig查看那个备注为Y的版本已经没掉了
