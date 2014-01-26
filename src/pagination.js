/**
 *
 * Author: songyaru | songyaru9@gmail.com
 * Date: 14-1-16  下午12:44
 *
 */

(function ($) {


    var pluginName = "slide";
    var plugin = $[pluginName];
    var pluginImpl = {
        options: {
            pagination: {
                elem: ".pagination",
                child: "li",
                type: "click"//"mouseover"
            }
        },
        paginationChange: function (data) {
            this.currentPagination.removeClass("cur");
            this._setCurrentPagination(data.index);

        },
        _getPagination: function (index) {
            return this.paginations.eq(index);
        },
        _setCurrentPagination: function (i) {
            this.currentPagination = this._getPagination(i);
            this.currentPagination.addClass("cur");
        },

        _createPagination: function () {
            var _this = this;

            var opts = this.options.pagination;
            var ret = $(opts.elem);
            var children = this.paginations = $(opts.child, ret);
            this._setCurrentPagination(this.index);

            ret.on(opts.type, opts.child, function (e) {
                var i = children.index(e.currentTarget);
                _this.jump(i);
            });

            this.element.on("ui_jump", function (e, data) {
                _this.paginationChange(data);
            });

            return ret;
        }
    };
    plugin._extend(pluginImpl);

})(jQuery);
