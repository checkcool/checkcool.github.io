//stock.js

define(['util', 'canvasclock', 'jquery', 'highcharts'], function (util, cs, $, Highcharts) {
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
        $("#search_stock").click(function () {
            var val = $("#stock_code").val();
            if (val == "" || !val.match(/\d{6}/)) {
                alert("请正确输出6位数字的股票代码!");
            } else {
                initStockChartsByCode(val);
            }
        });
        $("#stock_code").keydown(function (e) {
            var curKey = e.which;
            if (curKey == 13) {
                $("#search_stock").click();
            }
        });
    }

    function initStockChartsByCode(code) {
        var now = new Date(),
            thisYear = now.getFullYear();
        createStockChart({
            el: '#stock_chart_1',
            startdate: thisYear + '-1-1',
            enddate: thisYear + '-12-31',
            code: code
        });
        createStockChart({
            el: '#stock_chart_2',
            startdate: (thisYear - 1) + '-1-1',
            enddate: (thisYear - 1) + '-12-31',
            code: code
        });
        createStockChart({
            el: '#stock_chart_3',
            startdate: (thisYear - 2) + '-1-1',
            enddate: (thisYear - 2) + '-12-31',
            code: code
        });
        createStockChart({
            el: '#stock_chart_4',
            startdate: (thisYear - 3) + '-1-1',
            enddate: (thisYear - 3) + '-12-31',
            code: code
        });
        createStockChart({
            el: '#stock_chart_5',
            startdate: (thisYear - 4) + '-1-1',
            enddate: (thisYear - 4) + '-12-31',
            code: code
        });
        createStockChart({
            el: '#stock_chart_6',
            startdate: (thisYear - 5) + '-1-1',
            enddate: (thisYear - 5) + '-12-31',
            code: code
        });
        createStockChart({
            el: '#stock_chart_7',
            startdate: (thisYear - 6) + '-1-1',
            enddate: (thisYear - 6) + '-12-31',
            code: code
        });
        createStockChart({
            el: '#stock_chart_8',
            startdate: (thisYear - 7) + '-1-1',
            enddate: (thisYear - 7) + '-12-31',
            code: code
        });
        createStockChart({
            el: '#stock_chart_9',
            startdate: (thisYear - 8) + '-1-1',
            enddate: (thisYear - 8) + '-12-31',
            code: code
        });
        createStockChart({
            el: '#stock_chart_10',
            startdate: (thisYear - 9) + '-1-1',
            enddate: (thisYear - 9) + '-12-31',
            code: code
        });
    }

    function createStockChart(options) {
        var defaultOptions = {
            el: '#stock_chart_1',
            categories: [],
            data: [],
            code: '000001',
            startdate: '2016-1-1',
            enddate: '2016-12-31'
        };
        options = $.extend({}, defaultOptions, options);
        var realCode = options.code;
        if (options.code != '000001'){
            options.code = options.code.substr(0, 3) == '600' ? options.code + '.ss' : options.code + '.sz';
        } else {
            options.code = options.code + '.ss';
        }
        try{
        $.ajax({
            url: 'http://zenfa.cn/stock.php?stockname=' + options.code + '&startdate=' + options.startdate + '&enddate=' + options.enddate,
            type: 'GET',
            dataType: 'json',
            error: function (data) {
                var strTemp = "",
                    rObj = {};
                if (data.responseText) {
                    strTemp = data.responseText.replace('<!-- Hosting24 Analytics Code -->', '')
                    .replace('<script type="text/javascript" src="http://stats.hosting24.com/count.php"></script>', '')
                    .replace('<!-- End Of Analytics Code -->', '')
                    .replace('\n', '');
                }
                strTemp = $.trim(strTemp);
                rObj = JSON.parse(strTemp);
                for (var i in rObj) {
                    options.categories.unshift(rObj[i].Date);
                    options.data.unshift(parseFloat(rObj[i].Close));
                }
                $(options.el).highcharts({
                    chart: {
                        type: 'spline'
                    },
                    title: {
                        text: options.startdate.split("-")[0] + "年 股票代码:" + realCode
                    },
                    xAxis: {
                        categories: options.categories,
                        gridLineWidth: 1,
                        endOnTick: true
                    },
                    legend: {
                        align: "center",
                        verticalAlign: "top",
                        x: 0,
                        y: 20
                    },
                    yAxis: [{
                        title: {
                            text: '当前值',
                            align: 'high',
                            margin: 5
                        },
                        gridLineWidth: 1,
                        minRange: 1
                    }],
                    tooltip: {
                        crosshairs: true,
                        shared: true
                    },
                    series: [{
                        name: '当前值',
                        yAxis: 0,
                        data: options.data,
                        lineColor: '#ef6865',
                        color: '#ef6865',
                        lineWidth: 1.5

                    }],
                    credits: {
                        enabled: false
                    }
                });
            }
        });
        } catch (e) {
            console.log(e.message);
        }
    }

    return {
        init: function () {
            util.initClock(clockEl);
            bindEvents();
            initStockChartsByCode("000001");
        }
    }
});