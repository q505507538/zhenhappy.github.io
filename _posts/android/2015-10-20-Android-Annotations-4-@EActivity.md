---
layout: post
title: AndroidAnnotations框架入门教程四之@EActivity
category: Android,Annotations,@EActivity
tags: Android
keywords: Android,Annotations,@EActivity
description: AndroidAnnotations框架入门教程四之@EActivity
---

## 增强组件
环境会搭了之后我们来看下如何使用框架
首先来了解一个名词叫[增强组件(Enhanced components)][1],增强组件如何工作的[官方文档][2]有说明
我就简单的说下重点,要使用AA注解我们就需要一个开关,开关打开才能用,这里的开关就是增强组件语法,对于Activity我们就要用`@EActivity`语法去注解,然后就可以在当前Activity中就使用其他的AA注解了,AA框架会帮我们生成一个增强子类继承于当前的Activity,其名称很有规律,就是我们的Activity类名加下划线`_`,它其实就是我们正常不使用注解时候的代码,AA只是把我们本来很繁琐编码过程变成自动化的才做而已

## @EActivity
@EActivity可谓用的最多也是我们最先会接触到的注解了
文档看[这里][3],内容很简单,带参数的和不带参数的
一般常用的都是直接带上Layout id的参数

    @EActivity(R.layout.main)
    public class MyActivity extends Activity {
        ...
    }

不带参数的话就相当于不指定布局, 运行不会报错, 但是程序打开一片空白
需要在onCreate中手动指定布局`setContentView(R.layout.main);`

    @EActivity
    public class MyActivity extends ListActivity {

        @Override
        public void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.main);
        }

    }

增强组件对应的其他组件的语法,用法都差不多,自己看[文档][1]

  [1]: https://github.com/excilys/androidannotations/wiki/AvailableAnnotations#enhanced-components
  [2]: https://github.com/excilys/androidannotations/wiki/HowItWorks#overview
  [3]: https://github.com/excilys/androidannotations/wiki/Enhance-activities#eactivity
