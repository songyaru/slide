/**
 *
 * Author: songyaru | songyaru9@gmail.com
 * Date: 14-1-22  下午5:22
 *
 */

(function ($, undefined) {
    var pluginName = "slide";
    var plugin = $[pluginName];
    var pluginImpl = {
        options: {
            control: {
                left: ".control-left",  //jQuery选择器或者dom元素，表示左边的控制按钮的节点  $(opts.left)
                right: ".control-right", //同上，右边的控制按钮
                disableClass: "control-disable", //按钮失效时添加的className （非循环轮播的情况下可以使用）
                type: "click" //控制按钮注册的事件
            }
        },
        disableControl: function (type) {
            this.control[type].addClass(this.options.control.disableClass);
        },
        enableControl: function (type) {
            this.control[type].removeClass(this.options.control.disableClass);
        },
        _createControl: function (options) {
            var _this = this;
            var opts = options.control;
            var ret = {};
            $.each(["left", "right"], function (i, name) {
                ret[name] = $(opts[name]).on(opts.type, function () {
                    if (ret[name].hasClass(opts.disableClass)) {
                        return;
                    }
                    i ? _this.next() : _this.prev();
                    _this.element.trigger("ui_control", {
                        type: name,
                        elem: ret[name]
                    });
                });
            });
            return ret;
        }
    };
    plugin._extend(pluginImpl);
})(jQuery);