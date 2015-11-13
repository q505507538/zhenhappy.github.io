---
layout: post
title: Java遍历对象所有属性
category: Java,Reflect,getGenericType,getMethod,invoke
tags: Java
keywords: Java,Reflect,getGenericType,getMethod,invoke
description: Java遍历对象所有属性
---

要获取对象的所有属性可以使用`getDeclaredFields()`
方法会返回一个`Field`数组
遍历这个数组几个遍历所有属性
注意使用这个方法会抛出4个异常
然后根据属性的类型选择执行对应的内容

    public static void eachProperties(Object model) throws NoSuchMethodException, IllegalAccessException, IllegalArgumentException, InvocationTargetException{
        Field[] field = model.getClass().getDeclaredFields(); //获取实体类的所有属性，返回Field数组
        for(int j=0 ; j<field.length ; j++){ //遍历所有属性
            String name = field[j].getName(); //获取属性的名字

            System.out.println("attribute name:"+name);
            name = name.substring(0,1).toUpperCase()+name.substring(1); //将属性的首字符大写，方便构造get，set方法
            String type = field[j].getGenericType().toString(); //获取属性的类型
            if(type.equals("class java.lang.String")){ //如果type是类类型，则前面包含"class "，后面跟类名
              ...
            }
            if(type.equals("class java.lang.Integer")){
              ...
            }
            if(type.equals("class java.lang.Short")){
              ...
            }
            if(type.equals("class java.lang.Double")){
              ...
            }
            if(type.equals("class java.lang.Boolean")){
              ...
            }
            if(type.equals("class java.util.Date")){
              ...
            }
        }
    }

具体执行的内容就是重点了
我们知道模型的属性都会有对应的getter和setter方法
只需要得到对应的getter和setter方法即可获取和设置属性
这里就需要用到`getMethod`方法

## 获得getter方法
方法有分带参数和不带参数,我们知道getter方法是不带参数的
获得getter方法如下

    Method m = model.getClass().getMethod("get"+name);

## 获得setter方法
如果是带参数的setter方法,就应该把参数的类型做封装成一个Class<?>泛型数组传入`getMethod`方法的第二个参数
例如参数是String类型的setter方法如下

    Method m = model.getClass().getMethod("set"+name, new Class[] {String.class});

## 执行getter方法

    String value = (String) m.invoke(model);

## 执行setter方法

    m.invoke(model,new Object[] {new String("new value")});

