---
layout: post
title: git修改已经提交的注释
category: git,commit,amend,rebase
tags: git
keywords: git,commit,amend,rebase
description: git修改已经提交的注释
---
# 最后一次提交的注释,对于已经push的永远没办法改了

    git commit --amend

# 更早之前的历史修改

假设要修改当前版本的倒数第三次状态

    git rebase -i HEAD~3

假设要修改第一个版本

    git rebase -i --root

然后会看到

    pick:*******

    pick:*******

    pick:*******

要修改哪个,就把那行的pick改成edit,保存退出
通过tig查看历史发现最后一次提交已经变成刚才选的那个了
然后就和修改最后一次提交一样了

    git commit -amend

修改完了之后,这样返回

    git rebase --continue

这时候就又回到正常状态了
