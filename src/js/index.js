//index.js

define(['util'], function (util) {
    var clockEl = document.getElementById("clock"),
        addfavEl = document.getElementById("addfav"),
        sethomeEl = document.getElementById("sethome");

    function bindEvents() {
        addfavEl.onclick = function () {
            util.addFavorite(window.location.href, "查酷导航");
        };
        sethomeEl.onclick = function () {
            util.setHome(this, window.location.href);
        };
        window.onscroll = function () {
            var headerEl = document.getElementsByTagName("header")[0],//header shadow
                rttEl = document.getElementById("rtt"),//return to top
                scrollTop = document.body.scrollTop;
            if (scrollTop > 0) {
                util.addClass(headerEl, "shadowed");
                util.removeClass(rttEl, "hide");
            } else {
                util.removeClass(headerEl, "shadowed");
                util.addClass(rttEl, "hide");
            }
        };
    }
    return {
        init: function () {
            util.initClock(clockEl);
            bindEvents();
        }
    }
});