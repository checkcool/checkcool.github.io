require.config({
    paths: {
        "jquery": "//cdn.bootcss.com/jquery/2.2.4/jquery.min.js",
        "util": "util.min",
        "index": "index.min",
        "clock": "clock.min",
        "polyfill": "polyfill.min",
        "canvasclock": "canvasclock.min"
    }
});
//定义好所有页面
var locations = {
    index: function () {
        return location.href.match(/\/index/i);
    },
    clock: function () {
        return location.href.match(/\/clock/i);
    }
};

//页面入口
if (locations.index()) {
    indexHandler();
} else if (locations.clock) {
    clockHandler();
}
else {
    indexHandler();
}
//Request handler
//index
function indexHandler() {
    require(['index'], function (index) {
        index.init();
    });
}
//clock
function clockHandler() {
    require(['clock'], function (clock) {
        clock.init();
    });
}