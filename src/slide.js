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
            slide: {
                index: 0, //显示第0个slide
                currentClass: "cur", //当前显示的slide添加的className
                container: ".slide-container", //包含所有slide的父节点  jQuery选择器或者dom元素 $(opts.container, this.element)
                content: ".slide" //所有slide节点  jQuery选择器或者dom元素 $(opts.content, this.container)
            }
        },
        length: null,
        _isAnimate: false,
        last: null,
        current: null,
        _setIndex: function (i) {
            this.lastIndex = this.index;
            this.index = (this.length + i) % this.length;
        },
//        _getIndex: function () {
//            return this.index;
//        },
        _getCreateOptions: noop,
        init: noop,
//        _setAttributeIndex: function (elems) {
//            for (var i = 0, len = elems.length; i < len; i++) {
//                elems[i].setAttribute("data-index", i);
//            }
//        },

        _create: function (options) {
            var _this = this, opts = options.slide;
            this.container = $(opts.container, this.element);
            this.content = $(opts.content, this.container);
//            this._setAttributeIndex(this.content);
            this.length = this.content.length;
            this.index = opts.index;
            this.last = this.current = this.getItemByIndex(this.index);
            this.current.addClass(opts.currentClass);

            //引入插件初始化
            for (var name in this) {
                name.replace(/^(?:_create)(\w+)/g, function (match, str) {
                    var fn = _this[match];
                    if ($.isFunction(fn)) {
                        var optionsName = str.replace(/^(\w)/, function (m, s) {
                            return s.toLowerCase();//首字母小写处理
                        });
                        //打包合并文件后引入了这个插件，但项目中又不需要，提供参数置空可以不初始化
                        //todo更好的方案？？？
                        if (options[optionsName] == undefined) {
                            return;
                        }
                        var ret = fn.call(_this, options);
                        if (ret !== undefined) {
                            _this[optionsName] = ret; //初始化的时候如果有返回值，将其挂载到组件.参数名下
                        }
                    }
                })
            }

            this.element.trigger("ui_create", options);
            this.init(options);
        },
        getItemByIndex: function (i) {
            return this.content.eq(i % this.length);
        },
        next: function (step) {
            if (step == undefined) {
                step = 1;
            }
            this.jump(this.index + step);
        },
        prev: function (step) {
            if (step == undefined) {
                step = 1;
            }
            this.jump(this.index - step);
        },
        _changCurrentClass: function (opts) {
            this.last.removeClass(opts.currentClass);
            this.current.addClass(opts.currentClass);
        },
        jump: function (index) {
            var opts = this.options.slide;
            var lastIndex = this.index;//上一次位置
            if (lastIndex == index || this._isAnimate) {//todo 是否要这个限制？？ 动画的时候不能再继续jump
                return;
            }
            var direct = lastIndex < index ? 1 : -1; //direct=1, 正向（显示右边的dom元素，自右向左滚动）
            this._setIndex(index);//重置this.index ,this.last ,this.current
            this.last = this.current;
            this.current = this.getItemByIndex(this.index);

            this._changCurrentClass(opts);

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
