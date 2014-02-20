/**
 *
 * Author: songyaru | songyaru9@gmail.com
 * Date: 14-1-20  下午2:06
 *
 */
(function ($, undefined) {
    var pluginName = "slide";
    var vendorPrefix = (function () { //todo jquery自动加上了vendorPrefix，简化为判断是否支持css3的transition
        var body = document.body || document.documentElement,
            style = body.style;
        var transition = "Transition";
        var vendor = [ "O", "ms" , "Moz", "Webkit"], len = vendor.length;
        while (len--) {
            if (vendor[len] + transition in style) {
                return vendor[len];
            }
        }
        return false;
    })();

    var pluginImpl = {
        options: {
            animate: {
                styles: "slide", //["fade"|"slide"]轮播动画类型
                easing: "ease-in-out", //css3支持的animation-timing-function. (由于jQuery默认只提供"linear" 和 "swing",在不支持css3的浏览器，easing的参数不为linear时全部变为swing)
                speed: 800 //动画持续时间
            }
        },

        slide: function (direct, speed, easing) {
            var _this = this;
            var value = [ "-100%" , "0", "100%"];

            this.current.css("left", value[1 + direct]).show();
            if (vendorPrefix) {
                this.container.css({
                    "transform": "translateX(" + value[1 - direct] + ")", //todo translateY
                    "transitionTimingFunction": easing,
                    "transitionDuration": speed + "ms"
                }).one("transitionend", function () {
                    _this.animateDone(direct);
                });
            } else {
                easing = easing == "linear" ? "linear" : "swing";
                this.container.animate({"left": value[1 - direct]}, speed, easing, function () {
                    _this.animateDone(direct);
                });
            }
        },

        fade: function (direct, speed) {
            var _this = this;
            var flag = 2;
            var currentClassName = this.options.slide.currentClass;
            this.last.fadeOut(speed, function () {
                _this.last.removeClass(currentClassName);
                _this._isAnimate = --flag;
            });
            this.current.fadeIn(speed, function () {
                _this.current.addClass(currentClassName);
                _this._isAnimate = --flag;
            });
        },
        animate: function (direct) {
            this._isAnimate = true;
            var animateOpts = this.options.animate;
            var animStyle = animateOpts.styles;
//            if (animStyle == "slide" || animStyle == "fade") {
            this[animStyle](direct, animateOpts.speed, animateOpts.easing);
//            }
        },
        animateDone: function (direct) {
            var currentClassName = this.options.slide.currentClass;
            this.container[0].style.cssText = "";//todo 默认style
            this.last.removeClass(currentClassName).hide();
            this.current.addClass(currentClassName).css("left", 0).show();
            this._isAnimate = false;
            this.element.trigger("ui_animate_done");
        },
        _createAnimate: function (options) {
            var _this = this;
            this._changCurrentClass= $.noop;//默认更改样式要改下
            this.element.on("ui_jump", function (e, data) {
                _this.animate(data.direct)
            })
        }
    };

    var plugin = $[pluginName];
    plugin._extend(pluginImpl);

//    require.async("slide", function (plugin) {
//        $.extend(plugin.prototype, pluginImpl);
//    });

})(jQuery);