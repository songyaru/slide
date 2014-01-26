slide
=====

## 开发中... ##


### 设计 ###
- 基础slide 只负责显示 由cur prev next 等className

- pagination 控制跳转到具体slide

- control 控制左右或者上下的按钮

- 自由组合，如slide+pagination 就是一个tab组件，slide+control 简单的轮播切换

- 支持css3

- 支持touch *

- 动态创建实例 *

- 不依赖JQ？adapter？消息？ *

- 合并打包 grunt 实现

- destroy

- 优化设计


### 问题 ###
 - mouseover 到 pagination 动画处理
 - 连续动画的处理
 - 暂停的动作和动画会有冲突 timer方式需要优化

### 参数说明 ###
