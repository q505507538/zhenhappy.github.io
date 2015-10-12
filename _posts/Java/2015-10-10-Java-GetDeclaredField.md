---
layout: post
title: Java中通过属性字符串名取属性内容
category: Java
tags: Java,Android,getDeclaredField,Field
keywords: Java,Android,getDeclaredField,Field
description: Java中通过属性名获取对象属性内容
---
在Android开发当中资源的获取其实是间接通过R文件进行的,这个R文件就相当于是一个地址列表,存放着每个资源的地址
那么如何快速高效的获取就是这篇文章要分析的问题
假设我们有一个图片资源叫btn_bg
那么将一个按钮背景设置为这个图片的方式就是

    btn.setBackgroundResource(R.drawable.btn_bg);

这里的R.drawable.btn_bg就是获取图片
但问题来了,这个获取图片的方式是通过对象名获取的,获取一两个可以这么处理
那么如果是多个图片要设置到多个按钮的话
例如按钮的id分别是btn_0,btn_1,btn_2,btn_3,btn_4
图片是btn_bg_0,btn_bg_1,btn_bg_2,btn_bg_4,btn_bg_4
很容易可以想到就是把按钮和图片都弄成List,然后循环
但是问题又来了,这个按钮要弄成List,就得每一个都findViewById
首先要声明两个List

    List<Button> btns = new ArrayList<Button>(){ {
        add((Button) findViewById(R.id.btn_0));
        add((Button) findViewById(R.id.btn_1));
        add((Button) findViewById(R.id.btn_2));
        add((Button) findViewById(R.id.btn_3));
        add((Button) findViewById(R.id.btn_4));
    }};
    List<Integer> btn_bgs = new ArrayList<Integer>(){ {
        add(R.drawable.btn_bg_0);
        add(R.drawable.btn_bg_1);
        add(R.drawable.btn_bg_2);
        add(R.drawable.btn_bg_3);
        add(R.drawable.btn_bg_4);
    }};

然后用的时候这样用

    for (int i = 0; i < 5; i ++) btns.get(i).setBackgroundResource(btn_bgs.get(i));

看似已经很方便了,可是这里只有5个而且还是固定的内容,如果是数量一多的话,再内容如果是变化的,不是事先确定好的那该如何实现
看到这里可能有人会想了,这里的R.id.和R.drawable.是固定的,如果能否用字符串的`"R.id.btn_0"`去获取静态对象的`R.id.btn_0`,那可玩性就高多了
所以本文章的重点就在于如何用String去获取Object
看我写法

    List<Button> btns = new ArrayList<Button>(){ {
        try {
            for (int i = 0; i < 5; i ++)
                add((Button) findViewById((int) R.id.class.getDeclaredField("btn_" + i).get(R.id.class)));
        } catch (Exception e) {
            // TODO: handle exception
            Log.i("MainActivity", e.toString());
        }
    }};
    List<Integer> btn_bgs = new ArrayList<Integer>(){ {
        try {
            for (int i = 0; i < 5; i ++)
                add((int) R.drawable.class.getDeclaredField("btn_bg_" + i).get(R.drawable.class));
        } catch (Exception e) {
            // TODO: handle exception
            Log.i("MainActivity", e.toString());
        }
    }};

使用上还是一样,就是声明的时候变化了,注意这里用了一句关键代码

    (int) R.id.class.getDeclaredField("btn_" + i).get(R.id.class))

在使用这句话的时候需要加入异常, 因为用String变量去找对象的属性有可能会出现找不到的情况,只要发现报错信息是`java.lang.NoSuchFieldException: xxx`一看就知道是找不到名为xxx的属性
那这句关键代码该如何灵活变换呢,其实很简单,这里出现两次的`R.id.class`,根据你要获取的对象换成对应的类即可
再一个就是getDeclaredField方法里面的内容,这里面的内容位String类型,上面的例子是有规律的01234,所以很容易循环出来
有人会问了,如果是不规律的情况怎么办,如果不规律的话那就直接用一个String[]数组把变量放进去,然后循环,以后如果有变化只要改变数组即可,一劳永逸
也可以把这里面的内容通过参数传进来,传什么进来他就可以获取什么,只要能获取得到的话,这里可发挥的空间就很大了,对应的最前面要加上强制类型转换
整个思路大概就这样,主要一个思想就是只要是通过字符串去获取属性的情况都可以采用这个方法获取.
