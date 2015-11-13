---
layout: post
title: AndroidAnnotations框架入门教程六之@Click
category: Android,Annotations,@Click
tags: Android
keywords: Android,Annotations,@Click
description: AndroidAnnotations框架入门教程六之@Click
---

@Click看这名字就知道跟按钮点击有关,没错,这就是按钮点击事件setOnClickListener的Annotation写法
我们来看下正常情况下的Button监听写法

    public class MainActivity extends Activity {

        Button btn;

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_main);
            btn = (Button)findViewById(R.id.btn);
            btn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Toast.makeText(MainActivity.this, "Hello", Toast.LENGTH_SHORT).show();
                }
            });
        }
    }


当然了,这里`setContentView(R.layout.activity_main);`可以用之前学过的@EActivity代替,`btn = (Button)findViewById(R.id.btn);`可以用@ViewById代替,这里就不多说,但是这个setOnClickListener也不是省油的灯,有多少个按钮也要有多少个setOnClickListener,还要覆盖对应的onClick方法
那么这个@Click就派上用场了,首先对于这个只有一个按钮的情况我们全部采用AA写法可以这样写

    @EActivity(R.layout.activity_main)
    public class MainActivity extends Activity {

        @Click(R.id.btn)
        void btn() {
            Toast.makeText(MainActivity.this, "Hello", Toast.LENGTH_SHORT).show();
        }
    }


有没有顿时感觉清爽很多,这什么情况,连声明`Button btn;`都不要了,只要把`Button`的id作为参数传给@Click,当我们按下id为btn的按钮就会执行这个`btn()`方法

那么如果不传这个id参数会是什么情况?你们可以自己尝试一下
发现也是可以用的,这是为什么呢?
如果我们把这里的`void btn()`改成`void btn1()`那就不能用了
原因就在于,如果不传id参数的话默认用方法名作为id

假如说我们有个需求是两个按钮btn1和 btn2任意一个按下都是执行同一个方法的话我们可以这样实现

    @Click({R.id.btn1, R.id.btn2})
    void btn() {
        Toast.makeText(MainActivity.this, "Hello", Toast.LENGTH_SHORT).show();
    }

再来,如果我们要知道按下的是两个按钮中的哪一个,那么可以这么实现

    @Click({R.id.btn1, R.id.btn2})
    void btn(View view) {
        Toast.makeText(MainActivity.this, "Hello, I'm " + ((Button) view).getText(), Toast.LENGTH_SHORT).show();
    }

这里给`void btn()`方法中设定一个参数`View view`,将`view`强转为`Button`对象即可获取当前所按下按钮的一些相关信息,这里和正常在用`setOnClickListener`中的`onClick(View v)`里的`View v`是一致的

这边再介绍两个Annotation用法和@Click一样
一个是@LongClick表示长按的意思,很好理解
另一个是@Touch表示触摸,区别于@Click,触摸的话事件分为down和up,所以如果没有区分的话,那么事件会被执行两次
