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
        $.extend(true, this.options, this._getCreateOptions(), opts);
        this._create(this.options);
        return this;
    };

    plugin.prototype = {
        options: {
//            index: 0

        },
        length: null,
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
            var _this = this;
            this.container = $("." + pluginName + "-container", this.element);
            this.content = $("." + pluginName, this.container);
            this.length = this.content.length;
//            this.index = opts.index;
            this.index = this.content.index(".cur");
            this.last = this.current = this.getItemByIndex(this.index);

            //引入_createXXX的插件
            for (var name in this) {
                name.replace(/^(?:_create)(\w+)/g, function (match, str) {
                    var fn = _this[match];
                    if ($.isFunction(fn)) {
                        var ret = fn.call(_this, opts);
                        if (ret !== undefined) {
                            _this[str.toLowerCase()] = ret;
                        }
                    }
                })
            }

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
                direct: direct,
                lastIndex: lastIndex,
                index: this.index
            });
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


//    if (typeof define === "function") {
//        define("slide", function () {
//            return plugin;
//        });
//    }

})(jQuery);
