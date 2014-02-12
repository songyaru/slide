/**
 *
 * Author: songyaru | songyaru9@gmail.com
 * Date: 14-1-22  下午5:22
 *
 */

(function ($) {
    var pluginName = "slide";
    var plugin = $[pluginName];
    var pluginImpl = {
        options: {
            control: {
                left: ".control-left",
                right: ".control-right",
                type: "click"
            }
        },
        _createControl: function (options) {
            var _this = this;
            var opts = options.control;
            var ret = {};
            ret.left = $(opts.left).on(opts.type, function () {
                _this.prev();
            });
            ret.right = $(opts.right).on(opts.type, function () {
                _this.next();
            });
            return ret;
        }
    };
    plugin._extend(pluginImpl);
})(jQuery);
