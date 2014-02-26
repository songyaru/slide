/**
 *
 * Author: songyaru | songyaru9@gmail.com
 * Date: 14-1-16  上午11:05
 *
 */
var getVendorPrefix = (function () {
    var body, i, style, transition, vendor;
    body = document.body || document.documentElement;
    style = body.style;
    transition = "transition";
    vendor = ["Moz", "Webkit", "Khtml", "O", "ms"];
    transition = transition.charAt(0).toUpperCase() + transition.substr(1);
    i = 0;
    while (i < vendor.length) {
        if (typeof style[vendor[i] + transition] === "string") {
            return vendor[i];
        }
        i++;
    }
    return false;
})();

