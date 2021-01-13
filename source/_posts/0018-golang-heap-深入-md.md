---
title: 0018.golang-heap-深入.md
date: 2021-01-13 14:48:49
tags:
    - golang
    - 数据结构
---

> 对golang标准库堆的深入分析与实践 ^.^  
> 阅读须知：本文假设读者了解堆的数据结构，并明白堆排序的原理。  

## 堆排序（heapsort）

堆排序是指利用堆这种数据结构所设计的一种排序算法。堆是一个近似完全二叉树的结构，并同时满足堆的性质：即子节点的键值或索引总是小于（或者大于）它的父节点。  
堆一般分为最小堆和最大堆

## heap in golang

在golang的 `container/heap` 标准库中提供了堆的实现，但是关于它的介绍却比较少。  
不少介绍只是简单的搬运的官方的例子。因此这里仔细的介绍了一下具体代码实现的细节。

```golang
// https://golang.org/pkg/container/heap/

// 这个代码示例展示了如何使用内建heap接口实现一个整数堆
package main

import (
	"container/heap"
	"fmt"
)

// 一个int类型构成的最小堆
type IntHeap []int

func (h IntHeap) Len() int           { return len(h) }
func (h IntHeap) Less(i, j int) bool { return h[i] < h[j] }
func (h IntHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }

func (h *IntHeap) Push(x interface{}) {
    // Push 和 Pop 使用指针接收器，因为它们修改了切片的长度而不仅仅是切片指向的内容
    // golang 使用值拷贝的方式传输参数，append返回的可能是一个全新的切片，如果不用指针会导致本次赋值失效。
	*h = append(*h, x.(int))
}

func (h *IntHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[0 : n-1]
	return x
}

// 这个例子插入了多个 int 到 IntHeap 中，
// 检查最小值然后按权值进行移除。（弹出堆顶）
func main() {
	h := &IntHeap{2, 1, 5}
	heap.Init(h)
	heap.Push(h, 3)
	fmt.Printf("minimum: %d\n", (*h)[0])
	for h.Len() > 0 {
		fmt.Printf("%d ", heap.Pop(h))
	}
}
```

参考上述官方代码示例，可以知道要使用这个heap接口，必须自己实现这些方法:   
``` golang
Len() int
Less(i, j int) bool
Swap(i, j)
Push(x interface{})
Pop() interface{}
```

`Len` 和 `Swap` 方法比较直观，分别是返回元素个数和交换元素位置。

`Less` 方法比较重要，它比较了第 `i` 和 `j` 个元素，返回比较结果。这关系着 `heap` 生成的是最小堆还是最大堆。   
**当 `i < j` 且 `Less(i, j) == true` 时，获得最小堆。反之则是最大堆。**

`Push` 方法把元素添加到尾部， `Pop` 方法把堆顶元素移出。

这里需要注意的是，如果自己另外实现堆方法，记住堆的内部存储是一个二叉树，第一个元素是堆顶，最后一个元素是堆尾。

```
内部存储：[1,2,3,4,5]
堆：
         1
       /   \
      2     3
     / \
    4   5
```

golang的堆接口会在实现好这些基本方法帮你自动维护堆的有序性。

`func Init(h interface)`  
将一个乱序的堆进行排序，使之成为一个有效的堆

`func Fix(h Interface, i int)`   
在修改第i个元素后，调用本函数修复堆，比删除第i个元素后插入新元素更有效率。

`func Pop(h Interface) interface{}`   
向堆添加一个新元素

`func Push(h Interface, x interface{})`   
弹出并返回堆顶元素

`func Remove(h Interface, i int) interface{}`   
删除堆中的第i个元素

* 注意这里的Push&Pop方法并不是我们自己实现的Push&Pop，它会在我们实现的Push&Pop基础上进行封装，确保可以仍然维护堆的性质。
