/**
 *
 * Author: songyaru | songyaru9@gmail.com
 * Date: 14-1-15  下午4:43
 *
 */

(function ($, undefined) {
    var pluginName = "slide";
    var noop = function () {
    };

    var plugin = function (opts, elem) {
        if (!this._create) {
            return new plugin(opts, elem);
        }

        this.element = $(elem);
        this.options = $.extend(true, {}, this.options, this._getCreateOptions(), opts);
        this._create(this.options);
        return this;
    };

    plugin.prototype = {
        options: {
            index: 0,
            play: {
                auto: false,
                delay: 2000
            }
        },

        length: null,
        control: null,
        _createControl: noop,
        pagination: null,
        _createPagination: noop,
        _isAnimate: false,
        last: null,
        current: null,
        _setIndex: function (i) {
            this.lastIndex = this.index;
            this.index = i % this.length;
        },
        _getIndex: function () {
            return this.index;
        },
        _getCreateOptions: noop,
        init: noop,
        _create: function (opts) {
            this.container = $("." + pluginName + "-container", this.element);
            this.content = $("." + pluginName, this.container);
            this.length = this.content.size();
//            this.index = opts.index;
            this.index = this.content.index(".cur");
            this.last = this.current = this.getItemByIndex(this.index);


            this.control = this._createControl();
            this.pagination = this._createPagination();

            this.element.trigger("ui_create", opts);
            this.init(opts);
        },
        getItemByIndex: function (i) {
            return this.content.eq(i);
        },
        next: function () {
            this.jump(this.index + 1);
        },
        prev: function () {
            this.jump(this.index - 1);
        },
        jump: function (index) {
            var lastIndex = this.index;//上一次位置
            if (lastIndex == index || this._isAnimate) {//动画的时候不能再继续jump todo 是否要这个限制？？
                return;
            }
            var direct = lastIndex < index ? 1 : -1; //direct=1, 正向（显示右边的dom元素，自右向左滚动）
            this._setIndex(index);//重置this.index ,this.last ,this.current
            this.last = this.current;
            this.current = this.getItemByIndex(this.index);

            this.element.trigger("ui_jump", {
                lastIndex: lastIndex,
                index: this.index
            });

            this.animate(direct); //todo trigger 事件???
        },
        animate: noop,
        animateDone: noop,
        play: function (next) {
            var _this = this;
            var opts = this.options.play;
            clearTimeout(this.autoPlayTimer);
            this.autoPlayTimer = setTimeout(function () {
                next ? _this.next() : _this.prev();
            }, opts.delay);
        },
        stop: function () {
            clearTimeout(this.autoPlayTimer);
        }
    };

    plugin._extend = function (pluginImpl) {
        $.extend(true, plugin.prototype, pluginImpl);
    };


    //todo pluginName 可变
    $[pluginName] = plugin;
    $.fn[pluginName] = function (opts) {
        return this.each(function () {
            if (!$.data(this, "ui_" + pluginName)) {
                return $.data(this, "ui_" + pluginName, new plugin(opts, this));
            }
        });
    };


    if (typeof define === "function") {
        define("slide", function () {
            return plugin;
        });
    }

})(jQuery);
