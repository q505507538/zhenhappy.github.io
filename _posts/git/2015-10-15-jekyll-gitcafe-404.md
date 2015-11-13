---
layout: post
title: jekyll在gitcafe-pages下404重定向循环问题的解决
category: jekyll,gitcafe,404,重定向循环
tags: git
keywords: jekyll,gitcafe,404,重定向循环
description: jekyll在gitcafe-pages下404重定向循环问题的解决
---
项目是从github上原封不动搬过来的,理论上不应该出错,经过两天的摸索排查,终于找到原因了,因为在github上面用了个CNAME的文件,而这个CNAME在gitcafe下有别的作用,所以有重定向循环的错误
解决方法就是删除CNAME文件即可解决
