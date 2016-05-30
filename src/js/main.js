require.config({
    paths: {
        "jquery": "//cdn.bootcss.com/jquery/2.2.4/jquery.min.js",
        "util": "util.min"
    }
});
//定义好所有页面
var locations = {
    index: function () {
        return location.href.match(/\index/i);
    }
};

//页面入口
if (locations.index()) {
    indexHandler();
} else {
    indexHandler();
}
//handler
function indexHandler() {
    require([ 'util'], function (util) {
        var clockEl = document.getElementById("clock"),
            addfavEl = document.getElementById("addfav"),
            sethomeEl = document.getElementById("sethome");

        util.initClock(clockEl);
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
        }
    });

}
