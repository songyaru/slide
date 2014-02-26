/**
 *
 * Author: songyaru | songyaru9@gmail.com
 * Date: 14-1-16  上午11:13
 *
 */

(function (factory) {
    //http://stackoverflow.com/questions/14119988/return-this-0-evalthis/14120023
    var window = this || (0, eval)('this');
    if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        //Node.js
        var target = module['exports'] || exports;
        factory(target);
    } else if (typeof define === 'function' && define['amd']) {
        define(['exports'], factory);
    } else {
        factory(window['define'] = {});
    }

})(factory);    //todo exports function???
