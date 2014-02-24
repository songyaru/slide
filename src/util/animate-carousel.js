/**
 *
 * Author: songyaru | songyaru9@gmail.com
 * Date: 14-1-20  下午2:06
 *
 */

(function ($, undefined) {
    var pluginName = "slide";
    var plugin = $[pluginName];
    var pluginImpl = {
        options: {
            animate: {
                styles: "carousel", speed: 500 //动画持续时间
            },

            carousel: {
                info: {
                    size: [
                        {w: 170, h: 80},//小中大三种slide的尺寸
                        {w: 260, h: 120},
                        {w: 340, h: 160}
                    ],
                    max:5,//一行同时显示的slide数
                    len: [60, 100, 0], //表示slide隐藏的长度
                    top: [60, 30, 10]//表示slide距离父容器顶部的距离
                },

                css: [
                    {
                        width: 170,
                        height: 80,
                        top: 60,
                        left: -440,
                        zIndex: 1
                    },
                    {
                        width: 260,
                        height: 120,
                        top: 30,
                        left: -330,
                        zIndex: 2
                    },
                    {
                        width: 340,
                        height: 160,
                        top: 10,
                        left: -170,
                        zIndex: 3
                    },
                    {
                        width: 260,
                        height: 120,
                        top: 30,
                        left: 70,
                        zIndex: 2
                    },
                    {
                        width: 170,
                        height: 80,
                        top: 60,
                        left: 270,
                        zIndex: 1
                    }
                ]
            }
        },
        carousel: function (direct, speed) {
            var _this = this, opts = this.options.carousel;
            var step = (this.index - this.lastIndex) * direct; //步长

//            speed = speed / step;
//            console.log(speed, "  step -- ", step);
            var flag = 6;//6个dom元素动画
            var restCss = {
                width: 0,
                height: 0,
                top: opts.css[0].top + opts.css[0].height,
                zIndex: 0
            };

            var lastIndex = this.lastIndex;
            this.getItemByIndex(lastIndex + direct).css({zIndex: 4});
            this.getItemByIndex(lastIndex + 3 * direct).css($.extend({}, restCss, {left: 450 * direct})); //最后一个右边的slide
            this.getItemByIndex(lastIndex - 2 * direct).animate(restCss, speed, function () {//第一个slide
                this.style.cssText = "";
                _this._carouselDone(--flag);
            });
            for (var i = direct; i < 5 + direct; i++) {
                this.getItemByIndex(lastIndex - 2 + i).animate(opts.css[i - direct], speed, function () {
                    _this._carouselDone(--flag);
                });
            }

        },
        _carouselDone: function (flag) {
            if (flag == 0) {
                this._isAnimate = false;
                this.element.trigger("ui_carousel_done");//todo 统一动画完成事件
            }

        },

        _createCarousel: function (options) {
            var _this = this, opts = options.carousel, slideOpts = options.slide;
            for (var i = 0; i < 5; i++) {
                this.getItemByIndex(i - 2 + this.index).css(opts.css[i]);
            }

            var contents = this.content;
            this.container.on("click", slideOpts.content, function () {
                var index = contents.index(this);

                var step = index - _this.index;
                if (step == 0) {
                    return;
                }

                var isLeft = parseInt(this.style.left) < 0 ? -1 : 1;//点击位置在左侧  todo此处和css耦合了
                if (step * isLeft < 0) { //说明点击左边slide的index大于中间的index      或者右边的index小于中间的index
                    step += isLeft * _this.length;
                }


//                step > 0 ? _this.next(step) : _this.prev(-step);//todo 多个step
                step > 0 ? _this.next(1) : _this.prev(1);
            })
        }
    };

    plugin._extend(pluginImpl);


})(jQuery);