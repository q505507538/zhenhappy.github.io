---
layout: post
title: AndroidAnnotations框架入门教程一之介绍
category: Android
tags: Android,Annotations
keywords: Android,Annotations
description: AndroidAnnotations框架系列教程
---

# 资源
官网:[http://androidannotations.org/][1]
Github:[https://github.com/excilys/androidannotations][2]
Github Wiki:[https://github.com/excilys/androidannotations/wiki][3]

# AndroidAnnotations框架是什么?

一款开源的Android框架,基于Java annotations

# 为什么用它?

不解释,看代码

使用前:

    Button btn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        btn = (Button) findViewById(R.id.btn);
        btn.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.i("MainActivity", "按钮被点击了");
            }
        });
    }

使用后:

    @ViewById
    Button btn;

    @Click(R.id.btn)
    void btnClicked() {
        Log.i("MainActivity", "按钮被点击了");
    }

好不好用,不用多说

    [1]: http://androidannotations.org/
    [2]: https://github.com/excilys/androidannotations
    [3]: https://github.com/excilys/androidannotations/wiki
