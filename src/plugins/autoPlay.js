/**
 *
 * Author: songyaru | songyaru9@gmail.com
 * Date: 14-2-12  上午11:11
 *
 */
(function ($, undefined) {
    var pluginName = "slide";
    var plugin = $[pluginName];
    var pluginImpl = {
        options: {
            play: {
                reverse: false, //反向播放,默认播放顺序是从左到右
                auto: true, //是否自动播放
                pause: true, //鼠标移动到slide可以暂停自动播放
                delay: 3000 //自动播放延迟
            }
        },
        play: function (reverse) {
            var _this = this;
            var opts = this.options.play;
            clearInterval(this.autoPlayTimer);
            this.autoPlayTimer = setInterval(function () {
                reverse ? _this.prev() : _this.next();
            }, opts.delay);
        },
        pause: function () {
            var _this = this;
            this.container.hover(function () {
                _this.stop();
            }, function () {
                _this.play(_this.options.play.reverse);
            });
        },
        stop: function () {
            clearInterval(this.autoPlayTimer);
        },
        _createAutoPlay: function (options) {
            var opts = options.play;
            if (opts.auto) {
                this.play(opts.reverse);
                opts.pause && this.pause();
            }
        }
    };
    plugin._extend(pluginImpl);
})(jQuery);
