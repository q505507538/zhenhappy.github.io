---
layout: post
title: AndroidAnnotations框架入门教程五之@ViewById和@ViewsById
category: Android
tags: Android,Annotations,@ViewById,@ViewsById
keywords: Android,Annotations,@ViewById,@ViewsById
description: AndroidAnnotations框架入门教程五之@ViewById和@ViewsById
---

## 介绍
@ViewById和@ViewsById这两货应该是仅次于@EActivity用得最多的吧,你一个Android应用总要有View吧,不管是TextView还是EditView,要获取都要用findViewById这个方法吧,你别告诉我你不知道findViewById,连这个都不知道可以还学什么Android,那这个findViewById不知道各位有没有写的都烦了,反正我是非常烦,有多少个id就要多少个findViewById,有时候漏了哪个找错误找了半天,结果是没有findViewById,那么一会登场的这两货你们肯定会喜欢的,它们名字上就差了个s,很容易可以看出有s的是复数获取到的肯定是List,没有s的获取到的是单个对象,接下来看具体用法

## @ViewById
分为带参数和不带参数两种
带参数就是带上资源的id,也就是我们一般在findViewById中写的那个

    @ViewById(R.id.myTextView)
    TextView textView;

如果我们的对象名比较特殊,和id大小写完全一样,那么参数可以省略

    // Injects R.id.myEditText
    @ViewById
    EditText myEditText;

用法很简单,这里照抄[官方文档](https://github.com/excilys/androidannotations/wiki/Injecting-Views#viewbyid)的,没什么问题,应该都可以看懂,直接不需要findViewById,当前类中直接可以使用很方便

## @ViewsById
这里有个问题,如果有很多个资源要注入的话一样也要很多句@ViewById,虽然工作量比findViewById要省很多,但是还是麻烦,如果是表单或者按钮组的话,类似这样的情况,我们完全可以把这些资源封装到一个List中,然后循环去执行,这样效率更高,那么这时候@ViewsById就派上用场了

    @ViewsById({R.id.myTextView1, R.id.myOtherTextView})
    List<TextView> textViews;

把需要注入的id用`{}`包裹,逗号分开,作为参数传入即可,就能得到一个List,遍历这个List即可
