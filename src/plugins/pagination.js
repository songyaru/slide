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
                elem: ".pagination", //包含pagination的父节点 jQuery选择器或者dom元素 $(opts.elem)
                child: "li", //所有pagination节点  jQuery选择器或者dom元素  $(opts.child, 父节点)
                currentClass: "cur", //当前显示的pagination添加的className
                type: "click"//["click"|"mousemove"] pagination父节点上冒泡监听的事件类型
            }
        },
        paginationChange: function (data) {
            this.currentPagination.removeClass(this.options.pagination.currentClass);
            this._setCurrentPagination(data.index);

        },
        _getPagination: function (index) {
            return this.paginations.eq(index);
        },
        _setCurrentPagination: function (i) {
            this.currentPagination = this._getPagination(i);
            this.currentPagination.addClass(this.options.pagination.currentClass);
        },

        _createPagination: function (options) {
            var _this = this;
            var opts = options.pagination;
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
