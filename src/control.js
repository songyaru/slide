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
                left: ".control-left",
                right: ".control-right",
                disableClass: "control-disable",
                type: "click"
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