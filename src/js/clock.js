//clock.js

define(['util', 'canvasclock', 'polyfill'], function (util, cs, pf) {
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
    function initCanvasClocks() {
        var daysEn = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            daysCn = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            dayTimeEn = ["AM", "PM"],
            dayTimeCn = ["零晨", "早上", "中午", "下午", "晚上"],
            getDayTimeCn = function (date) {
                var d = date.getHours();
                if (d >= 0 && d < 5) {
                    return dayTimeCn[0];
                } else if (d >= 5 && d < 11) {
                    return dayTimeCn[1];
                } else if (d >= 11 && d < 13) {
                    return dayTimeCn[2];
                } else if (d >= 13 && d < 18) {
                    return dayTimeCn[3];
                } else if (d >= 18 && d <= 23) {
                    return dayTimeCn[4];
                }
            };

        var citiesCN = {
            beijing: '中国 北京',
            newyork: '美国 纽约',
            vancouver: '加拿大 温哥华',
            tokyo: '日本 东京',
            moscow: '俄罗斯 莫斯科',
            sydney: '澳大利亚 悉尼',
            paris: '法国 巴黎',
            london: '英国 伦敦',
            sanfrancisco: '美国 旧金山',
            dubai: '阿联酋 迪拜',
            berlin: '德国 柏林',
            toronto: '加拿大 多伦多',
            seoul: '韩国 首尔',
            brazil: '巴西 巴西',
            bangkok: '泰国 曼谷',
            newdelhi: '印度 新德里',
            cairo: '埃及 开罗'
        };

        var bjCs = new cs({
            city: 'beijing',
            canvas: document.getElementById("beijing_clock")
        });
        genDesc(bjCs.options.canvas.parentNode.nextElementSibling, bjCs.options.city, cs.getDateByCity(bjCs.options.city));

        var nyCs = new cs({
            city: 'newyork',
            canvas: document.getElementById("newyork_clock")
        });
        genDesc(nyCs.options.canvas.parentNode.nextElementSibling, nyCs.options.city, cs.getDateByCity(nyCs.options.city));

        var vcCs = new cs({
            city: 'vancouver',
            canvas: document.getElementById("vancouver_clock")
        });
        genDesc(vcCs.options.canvas.parentNode.nextElementSibling, vcCs.options.city, cs.getDateByCity(vcCs.options.city));

        var tkCs = new cs({
            city: 'tokyo',
            canvas: document.getElementById("tokyo_clock")
        });
        genDesc(tkCs.options.canvas.parentNode.nextElementSibling, tkCs.options.city, cs.getDateByCity(tkCs.options.city));

        var mcCs = new cs({
            city: 'moscow',
            canvas: document.getElementById("moscow_clock")
        });
        genDesc(mcCs.options.canvas.parentNode.nextElementSibling, mcCs.options.city, cs.getDateByCity(mcCs.options.city));

        var ldCs = new cs({
            city: 'london',
            canvas: document.getElementById("london_clock")
        });
        genDesc(ldCs.options.canvas.parentNode.nextElementSibling, ldCs.options.city, cs.getDateByCity(ldCs.options.city));

        var prCs = new cs({
            city: 'paris',
            canvas: document.getElementById("paris_clock")
        });
        genDesc(prCs.options.canvas.parentNode.nextElementSibling, prCs.options.city, cs.getDateByCity(prCs.options.city));

        var snCs = new cs({
            city: 'sydney',
            canvas: document.getElementById("sydney_clock")
        });
        genDesc(snCs.options.canvas.parentNode.nextElementSibling, snCs.options.city, cs.getDateByCity(snCs.options.city));

        var sfCs = new cs({
            city: 'sanfrancisco',
            canvas: document.getElementById("sanfrancisco_clock")
        });
        genDesc(sfCs.options.canvas.parentNode.nextElementSibling, sfCs.options.city, cs.getDateByCity(sfCs.options.city));

        var dbCs = new cs({
            city: 'dubai',
            canvas: document.getElementById("dubai_clock")
        });
        genDesc(dbCs.options.canvas.parentNode.nextElementSibling, dbCs.options.city, cs.getDateByCity(dbCs.options.city));

        var blCs = new cs({
            city: 'berlin',
            canvas: document.getElementById("berlin_clock")
        });
        genDesc(blCs.options.canvas.parentNode.nextElementSibling, blCs.options.city, cs.getDateByCity(blCs.options.city));

        var dldCs = new cs({
            city: 'toronto',
            canvas: document.getElementById("toronto_clock")
        });
        genDesc(dldCs.options.canvas.parentNode.nextElementSibling, dldCs.options.city, cs.getDateByCity(dldCs.options.city));

        var srCs = new cs({
            city: 'seoul',
            canvas: document.getElementById("seoul_clock")
        });
        genDesc(srCs.options.canvas.parentNode.nextElementSibling, srCs.options.city, cs.getDateByCity(srCs.options.city));

        var bzCs = new cs({
            city: 'brazil',
            canvas: document.getElementById("brazil_clock")
        });
        genDesc(bzCs.options.canvas.parentNode.nextElementSibling, bzCs.options.city, cs.getDateByCity(bzCs.options.city));

        var crCs = new cs({
            city: 'cairo',
            canvas: document.getElementById("cairo_clock")
        });
        genDesc(crCs.options.canvas.parentNode.nextElementSibling, crCs.options.city, cs.getDateByCity(crCs.options.city));

        var ndlCs = new cs({
            city: 'newdelhi',
            canvas: document.getElementById("newdelhi_clock")
        });
        genDesc(ndlCs.options.canvas.parentNode.nextElementSibling, ndlCs.options.city, cs.getDateByCity(ndlCs.options.city));

        var bkCs = new cs({
            city: 'bangkok',
            canvas: document.getElementById("bangkok_clock")
        });
        genDesc(bkCs.options.canvas.parentNode.nextElementSibling, bkCs.options.city, cs.getDateByCity(bkCs.options.city));

        function genDesc(el, city, date) {
            var html = '<strong class="city_cn">'
            + citiesCN[city]
            + '</strong> : <span class="date_cn">'
            + date.getFullYear().toString() + "年"
            + (date.getMonth() + 1).toString() + "月"
            + date.getDate().toString() + "日 "
            + daysCn[date.getDay()] + " "
            + getDayTimeCn(date)
            + '</span><br />'
            + '<strong class="city_en">'
            + city.toUpperCase()
            + '</strong> : <span class="date_en">'
            + date.getFullYear().toString() + '/'
            + (date.getMonth() + 1).toString() + '/'
            + date.getDate().toString() + ' '
            + (date.getHours() >= 12 ? dayTimeEn[1] : dayTimeEn[0]) + ' '
            + daysEn[date.getDay()]
            + '</span>'
            el.innerHTML = html;
        }
    }
    function removeLoading() {
        var el = document.getElementById('loading');
        el.parentNode.removeChild(el);
    }
    return {
        init: function () {
            util.initClock(clockEl);
            bindEvents();
            pf.init();
            initCanvasClocks();
            removeLoading();
        }
    }
});