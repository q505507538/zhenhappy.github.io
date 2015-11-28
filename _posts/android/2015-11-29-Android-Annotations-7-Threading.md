---
layout: post
title: AndroidAnnotations框架入门教程七之Threading系列
category: Android,Annotations,Threading
tags: Android
keywords: Android,Annotations,Threading
description: AndroidAnnotations框架入门教程七之Threading系列
---

线程操作分为两类,后台线程`@Background`和UI线程`@UiThread`
后台线程不用多说,当程序需要用到比较耗时的操作,例如下载的时候就会用到
那何为UI线程,假设我们在非主线程中,例如service或者adapter,如果要操作前台页面的UI的时候,是没办法直接操作的,这时候只要用UI线程即可在任意的类中操作UI界面元素
两种线程注解用法类似,只要在方法前加上注解,这个方法就会用多线程方式执行

```
@Background
void someBackgroundWork(String aParam, long anotherParam) {
    [...]
}

@UiThread
void doInUiThread(String aParam, long anotherParam) {
    [...]
}
```
    
以上是最基本的用法
接下来说下延时执行,这个用法非常给力,可以延时执行线程,只要给`@Background`传入参数`delay=2000`就可以延时2秒后执行

    @Background(delay=2000)
    void doInBackgroundAfterTwoSeconds() {
        [...]
    }

那么如果我们有个需求就是在这个延时的期间,我们要后悔了,不想要它执行了,或者它已经执行了,我们要它立即终止的话怎么办?
那就要用到这个Id参数,如下给`@Background`传入一个id参数,这个id是用来中断线程时候用的,所有相同id的会被一起kill掉
同时可以结合延时功能,传入多个参数用逗号分开

    @Background(id="id", delay=2000)
    void someCancellableBackground(String aParam, long anotherParam) {
        [...]
    }

如果要终止线程执行`BackgroundExecutor.cancelAll("id", true);`
Ui线程的话理论上和后台线程用法是一样的,,设置Id,然后结束用`UiThreadExecutor.cancelAll("id", true);`
但是官方说要到Annotation 4.0才会支持,所以暂时不能用
还有这里`cancelAll()`方法第一个参数是需要中断的线程id,这个很好理解,没问题
但是第二个参数为一个Boolean型,看源码上面说明的意思是
为真表示如果线程正在执行允许被中断
为假表示线程如果正在执行则不会中断
但是经过我代码实验,正在执行的线程是没办法通过`BackgroundExecutor.cancelAll("id", true);`方法结束掉的,这点希望有大神能够解释这个原因
接下来这个延时功能有些朋友可能会发现`@UiThread`不支持,提示`Cannot resolve method 'delay'`,其实这个问题是因为导错包了
正确的包应该是`org.androidannotations.annotations.UiThread`
错误的包是`android.support.annotation.UiThread`所以会提示没有`delay`这个方法
![][1]
当然了,这个延时只是在线程开始之前延时
如果我们要在线程执行过程中,或者程序任何位置延时,在Android中可以使用`SystemClock.sleep(2000);`来代替`Thread.sleep(2000)`
以上这些线程用法不论有多少个都是并行执行的,如果要顺序执行就用接下来Serial参数

    @Background(serial = "test")
    void someSequentialBackgroundMethod(int i) {
        Log.d("AA", "value : " + i);
    }

调用的时候假设我们按顺序传入参数

    for (int i = 0; i < 10; i++) {
        someSequentialBackgroundMethod(i);
    }
    
那结果就是所有serial为test的线程会按先后顺序执行,省去我们加锁同步的过程

接下来是优化Ui处理线程,直接看代码了,传入参数`propagation = Propagation.REUSE`即可

    @UiThread(propagation = Propagation.REUSE)
    void runInSameThreadIfOnUiThread() {
    }

再来就是两个注解`@SupposeBackground`和`@SupposeUiThread`,目的就是为了确保线程是在后台线程中执行或者是在Ui线程中执行,配合`@Background`和`@UiThread`使用即可,没什么好说的

  [1]: /assets/images/Android-Annotations-7-Threading/1448703554946.jpg "1448703554946.jpg"