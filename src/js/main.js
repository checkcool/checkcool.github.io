require.config({
    paths: {
        "jquery": "//cdn.bootcss.com/jquery/2.2.4/jquery.min",
        "highcharts": "highcharts-custom.min",
        "util": "util.min",
        "index": "index.min",
        "clock": "clock.min",
        "polyfill": "polyfill.min",
        "canvasclock": "canvasclock.min",
        "stock": "/src/js/stock"
    },
    shim: {
        "highcharts": {
            exports: "Highcharts",
            deps: ["jquery"]
        }
    } // end Shim Configuration
});
//定义好所有页面
var locations = {
    index: function () {
        return location.href.match(/\/index/i);
    },
    clock: function () {
        return location.href.match(/\/clock/i);
    },
    stock: function () {
        return location.href.match(/\/stock/i);
    }
};

//页面入口
if (locations.index()) {
    indexHandler();
} else if (locations.clock()) {
    clockHandler();
} else if (locations.stock()) {
    stockHandler();
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
//stock
function stockHandler() {
    require(['stock'], function (stock) {
        stock.init();
    });
}