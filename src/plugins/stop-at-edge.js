/**
 *
 * Author: songyaru | songyaru9@gmail.com
 * Date: 14-2-12  下午4:16
 *
 */

(function ($, undefined) {
    var pluginName = "slide";
    var plugin = $[pluginName];
    var pluginImpl = {
        options: {
            stopAtEdge: false //是否在边缘停止 （如：轮播到最后一张时不能继续点击向后）
        },
        _setControlUsable: function (index, lastIndex, maxIndex) {
            if (index == 0) {
                this.disableControl("left");
            } else if (index == maxIndex) {
                this.disableControl("right");
            }

            if (lastIndex == 0) {
                this.enableControl("left");
            } else if (lastIndex == maxIndex) {
                this.enableControl("right");
            }
        },
        _createStopAtEdge: function (opts) {
            if (opts.stopAtEdge) {
                var _this = this;
                var maxIndex = _this.length - 1;
                this._setControlUsable(this.index, this.lastIndex, maxIndex);
                this.element.on("ui_jump", function (e, data) {
                    _this._setControlUsable(data.index, data.lastIndex, maxIndex);
                });
            }
        }
    };
    plugin._extend(pluginImpl);
})(jQuery);
