/**
 *
 * Author: songyaru | songyaru9@gmail.com
 * Date: 14-1-20  下午2:06
 *
 */

(function ($, undefined) {
    var pluginName = "slide";
    var currentClassName = "cur";
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
        _getCreateOptions: function () {
            this.options.animate = {
                styles: "scroll",
                easing: "linear",
                speed: 800
            };
        },

        scroll: function (direct, speed, easing) {
            var _this = this;
            var value = [ "-100%" , "0", "100%"];
            var classNames="small median cur";
            var lastIndex = this.lastIndex;

            if (vendorPrefix) {


            } else {

            }
        },


        animate: function (direct) {
            this._isAnimate = true;
            var animateOpts = this.options.animate;
            var animStyle = animateOpts.styles;
            this[animStyle](direct, animateOpts.speed, animateOpts.easing);
        },
        animateDone: function (direct) {
            this.container[0].style.cssText = "";//todo 默认style
            this.last.removeClass(currentClassName).hide();
            this.current.addClass(currentClassName).css("left", 0).show();
            this._isAnimate = false;
        }
    };

    $.extend($[pluginName].prototype, pluginImpl);


})(jQuery);