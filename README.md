slide
=====

## 开发中... ##


### 设计 ###
- 基础slide

- pagination 控制跳转到具体slide

- control 控制左右或者上下的按钮

- 自由组合，如slide+pagination 就是一个tab组件，slide+control 简单的轮播切换

- 支持css3

- 支持touch *

- 动态创建实例 *

- 不依赖JQ？adapter？消息？ *

- 自由组合 , 合并打包 grunt 实现 *

- destroy方法 *

- 优化 *


### 问题 ###
 - mouseover 到 pagination 动画处理
 - 连续动画的处理
 - 暂停的动作和动画会有冲突 timer方式需要优化

***
# 文档  
##基本用法
<pre>
用法1：$(elem).slide(options);
用法2：var obj=$.slide(options,elem);
其中elem必选，表示组件的容器，是一个jQuery选择器或dom元素。
options见参数说明，参数都有默认值，可以不写

//example:
var mySlide= $.slide({
    slide: {
    },
    control: {
    },
    pagination:{
    },
    play: {
    },
    pagination: {
    },
    stopAtEdge: true
}, $("#slide"));
</pre>
##参数说明
###slide
<pre>
slide: {
    index: 0, //显示第0个slide
    currentClass: "cur", //当前显示的slide添加的className
    container: ".slide-container", //包含所有slide的父节点  jQuery选择器或者dom元素 $(opts.container, this.element)
    content: ".slide" //所有slide节点  jQuery选择器或者dom元素 $(opts.content, this.container)
}
</pre>

###pagination
<pre>
pagination: {
    elem: ".pagination", //包含pagination的父节点 jQuery选择器或者dom元素 $(opts.elem)
    child: "li", //所有pagination节点  jQuery选择器或者dom元素  $(opts.child, 父节点)
    currentClass: "cur", //当前显示的pagination添加的className
    type: "click"//["click"|"mousemove"] pagination父节点上冒泡监听的事件类型
}
</pre>

###control
<pre>
control: {
     left: ".control-left",  //左边的控制按钮的节点 jQuery选择器或者dom元素  $(opts.left)
     right: ".control-right", //同上，右边的控制按钮
     disableClass: "control-disable", //按钮失效时添加的className （非循环轮播的情况下可以使用）
     type: "click" //控制按钮监听的事件
 }
</pre>

###animate
<pre>
animate: {
     styles: "slide", //["fade"|"slide"]轮播动画类型
     easing: "ease-in-out", //css3支持的animation-timing-function. (由于jQuery默认只提供"linear" 和 "swing",在不支持css3的浏览器，easing的参数不为linear时全部变为swing)
     speed: 800 //动画持续时间
 }
</pre>

###play
<pre>
play: {
     reverse: false, //反向播放,默认播放顺序是从左到右
     auto: true, //是否自动播放
     pause: true, //鼠标移动到slide可以暂停自动播放
     delay: 3000 //自动播放延迟
 }
</pre>

###其他参数
<pre>
stopAtEdge: false //是否在边缘停止 （如：轮播到最后一张时不能继续点击向后）
</pre>









