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

- 自由组合 , 合并打包 grunt 输出 *

- destroy方法 *

- 优化 *


### 问题 ###
 - mouseover 到 pagination 动画处理
 - 连续动画的处理
 - 暂停的动作和动画会有冲突 timer方式需要优化 fixed

***
# 文档
##demo
1. [基础轮播](http://songyaru.github.io/slide/ "基础轮播")
2. [轮播到边界停止](http://songyaru.github.io/slide/stop-at-edge.html "轮播到边界停止")
3. [TAB组件](http://songyaru.github.io/slide/tab.html "TAB组件")
4. [旋转木马轮播-5张](http://songyaru.github.io/slide/carousel.html "旋转木马轮播-5张")
5. [旋转木马轮播-7张](http://songyaru.github.io/slide/carousel-7.html "旋转木马轮播-7张")
6. [TAB+多轮播实例](http://songyaru.github.io/slide/multi-slide.html "TAB+多轮播实例")

##基本用法
<pre>
用法1：$(elem).slide(options);
用法2：var obj=$.slide(options,elem);
其中 elem 必选，表示组件的容器，是一个jQuery选择器或dom元素。
options 见参数说明，参数都有默认值，可以不写
*注意，如果打包合并文件引入了插件，但又不需要这个插件的功能，可以通过设置参数为null关闭插件
如不需要自动轮播，可以设置参数 play: null

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

##插件说明
###stop-at-edge.js 轮播到最后一张时不能继续向后
<pre>
options: {
    stopAtEdge: false //是否在边缘停止 （如：轮播到最后一张时不能继续点击向后）
}
</pre>
###animate-carousel.js  旋转木马的轮播效果
<pre>
options: {
    animate: {
        styles: "carousel"//定义动画类型
    },
     carousel: {
        max: 5,//一行同时显示的slide数
        info: {
            size: [
                {w: 180, h: 80},//小中大三种slide的尺寸 从左到右
                {w: 260, h: 120},
                {w: 340, h: 160}
            ],
            len: [60, 100], //表示slide隐藏的长度 从左到右
            top: [60, 30, 10]//表示slide距离父容器顶部的距离
        }
    }
}
</pre>

##消息事件
###ui_create
####事件中的参数
<pre>
this.element.trigger("ui_create", options);//整个组件的参数
</pre>
###ui_jump
####事件中的参数
<pre>
this.element.trigger("ui_jump", {
    direct: direct,//number (1/-1) slide轮播的方向（1代表正向,从右到左，-1相反）
    step: step,//number (轮播的步长)
    lastIndex: lastIndex,//number(轮播前的显示slide)
    index:this.index //number (当前显示的slide)
});
</pre>
###ui_control
####事件中的参数
<pre>
this.element.trigger("ui_control", {
    type: name,//"left","right"
    elem: ret[name] // 按钮的dom元素
});
</pre>
###ui\_carousel\_done | ui\_slide\_done | ui\_fade\_done
####无参数
<pre>
this.element.trigger("ui_carousel_done",{ //ui_carousel_done | ui_slide_done | ui_fade_done
    current: this.current, //当前slide
    last: this.last, //上次轮播的slide
    lastIndex: this.lastIndex, //上次轮播的slide序号
    index: this.index//当前slide序号
});
</pre>



