---
title: 给pycharm设置虚拟环境virtualenv
date: 2018-11-04 18:30:00
tags: [pycharm, virtualenv, 教程]
description: 解决pycharm在给项目新建虚拟环境时报错"please sperify a different sdk name"
---

# 给pycharm设置虚拟环境virtualenv

## 问题

每次在给pycharm的项目新建一个虚拟环境时，总会在保存的时候报错"please sperify a different sdk name"。  

## 描述

关于pycharm报错"please sperify a diffrent sdk name"这个问题，实在是困扰我太久太久了。  
无数次我把虚拟环境删了建，建了删，甚至直接新建一个空项目都不行，这一度让我对pycharm极其愤怒~~。  

每次遇到去网上搜，都是千篇一律的答案。说是让我给新建的虚拟环境换个名字。可我差点没把系统重装了。  
真的不可能有重名了，于是一次次的，想可能绕弯子的方法，比如新建好带有虚拟环境的项目，再把代码文件复制到这个项目里。
但总有绕不过去的时候呀~~

不过这次我花了大把时间总算解决了，以此文纪念一下我那蛋疼的青春。

## bug

没错，这就是 **bug** 。

## 解决方案

删除文件 **jdk.table.xml** 。

linux下位于 **~/Library/Preferences/PyCharm2018.1/options/jdk.table.xml** 。

windows下位于 **C:\Users\Username\.PyCharm2018.2\config\options\jdk.table.xml** 。

删除后重启即可

## 怎么找到解决方案的

官网！！！

不要沉迷于CSDN，segmentfault这样的中文解决方案，很多bug可能很多人都遇到过。  
官网才是最好最直接的方式。  

努力学英语！

## the end

参考：
> [本文解决方案来源][1]  
> [bug issue][2]  

[1]: https://intellij-support.jetbrains.com/hc/en-us/community/posts/360000306410/comments/360000158010
[2]: https://youtrack.jetbrains.com/issue/PY-27251
