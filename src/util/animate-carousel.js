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
                max: 5,//一行同时显示的slide数 必须为奇数
                info: {
                    size: [
                        {w: 180, h: 80},//小中大三种slide的尺寸 从左到右
                        {w: 260, h: 120},
                        {w: 340, h: 160}
                    ],
                    len: [ 60, 100], //表示slide隐藏的长度 从左到右
                    top: [60, 30, 10]//表示slide距离父容器顶部的距离
                }
            }
        },
        carousel: function (direct, options) {
            var _this = this, opts = this.options.carousel, speed = options.speed;
            var step = options.step; //步长
            var flag = opts.max + step;//dom元素动画

            var mid = opts.mid;

            this._changCurrentClass();

            var lastIndex = this.lastIndex;
            var loop = step;
            var resetCss = opts.resetCss, rLeft = Math.abs(parseInt(resetCss.left));
            while (loop--) {
                //todo 最后一个右边的slde有可能是第一个（slide个数不够），动画是可能出现从最左边飞到最右边。
                //todo 因此要求step=1时 至少要有6张slide，step=2时 至少要有7张slide
                resetCss.left = rLeft * direct + "px";
                this.getItemByIndex(lastIndex + (mid + 1 + loop) * direct).css(resetCss); //正向(direct=1,从右向左的时候)，最后一个右边的slide

                resetCss.left = -rLeft * direct + "px";
                this.getItemByIndex(lastIndex - (mid - loop) * direct).css("zIndex", 0).animate(resetCss, speed, function () {//第一个slide
                    this.style.cssText = "";
                    _this._carouselDone(--flag);
                });
            }

            for (var i = step * direct; i < opts.max + step * direct; i++) {
                this.getItemByIndex(lastIndex - mid + i).css("zIndex", opts.css[i - step * direct].zIndex).animate(opts.css[i - step * direct], speed, function () {
                    _this._carouselDone(--flag);
                });
            }
//            this.current.css({zIndex: (opts.max / 2 + 3) | 0});
        },
        _carouselDone: function (flag) {
            if (flag == 0) {
                this._isAnimate = false;
                this.element.trigger("ui_carousel_done");
            }

        },

        _createCarousel: function (options) {
            var _this = this, opts = options.carousel, slideOpts = options.slide;

            //生成slide的样式信息
            opts.css = [];
            var mid = (opts.max / 2) | 0;

            var midHalfWidth = opts.info.size[mid].w / 2;
            for (var i = 0; i < opts.max; i++) {
                var j = mid - Math.abs(i - mid);
                opts.css[i] = {};
                opts.css[i].zIndex = j + 1;
                opts.css[i].width = opts.info.size[j].w + "px";
                opts.css[i].height = opts.info.size[j].h + "px";
                opts.css[i].top = opts.info.top[j] + "px";

                var left = midHalfWidth;
                if (i > mid) {
                    left -= opts.info.len[mid - 1];
                    for (var k = 0; mid - j - k > 1; k++) {
                        left += opts.info.size[mid - k - 1].w - opts.info.len[mid - k - 2];
                    }
                } else { //i<=mid
                    for (; j < mid; j++) {
                        left += opts.info.size[j].w - opts.info.len[j];
                    }
                    left = -left;
                }
                opts.css[i].left = left + "px";

                this.getItemByIndex(i - mid + this.index).css(opts.css[i]);
            }

            var restLeft = midHalfWidth;
            for (i = 0; i < mid; i++) {
                restLeft += opts.info.size[i].w - opts.info.len[i];
            }
            opts.resetCss = {
                width: 0,
                height: 0,
                top: (opts.info.top[0] + opts.info.size[0].h) + "px",
                left: restLeft + "px",
                zIndex: 0
            };
            opts.mid = mid;
            var contents = this.content;
            this.container.on("click", slideOpts.content, function () {
                var index = contents.index(this);
                var step = index - _this.index;
                if (step == 0) {
                    return;
                }

                var isLeft = parseInt(this.style.left) < 0 ? -1 : 1;//点击位置在左侧  todo 此处和css耦合了
                if (step * isLeft < 0) { //说明点击左边slide的index大于中间的index      或者右边的index小于中间的index
                    step += isLeft * _this.length;
                }

                step > 0 ? _this.next(step) : _this.prev(-step);
            })
        }
    };

    plugin._extend(pluginImpl);


})(jQuery);