//util.js

define(function () {
    var u = {};
    //收藏
    u.addFavorite = function (url, name) {
        var ctrl = (navigator.userAgent.toLowerCase()).indexOf('mac') !== -1 ? 'Command/Cmd' : 'CTRL';
        if (document.all) {
            window.external.addFavorite(url, name);
        }
        else if (window.sidebar) {
            window.sidebar.addPanel(name, url, '');
        }
        else {
            alert('您可以尝试通过快捷键' + ctrl + ' + D 加入到收藏夹!');
        }
    };
    //设为主页
    u.setHome = function (obj, url) {
        try {
            obj.style.behavior = 'url(#default#homepage)';
            obj.setHomePage(url);
        } catch (e) {
            if (window.netscape) {
                try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                } catch (e) {
                    alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
                }
            } else {
                alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【" + url + "】设置为首页。");
            }
        }
    };
    //初始化时钟
    u.initClock = function (obj) {
        var daysCn = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        setInterval(function () {
            var date = new Date();
            obj.innerText = date.getFullYear().toString()
            + "年"
            + (date.getMonth() + 1).toString()
            + "月"
            + date.getDate().toString()
            + "日 "
            + daysCn[date.getDay()] + " "
            + (date.getHours() < 10 ? ("0" + date.getHours()) : date.getHours())
            + ":"
            + (date.getMinutes() < 10 ? ("0" + date.getMinutes()) : date.getMinutes())
            + ":"
            + (date.getSeconds() < 10 ? ("0" + date.getSeconds()) : date.getSeconds());
        }, 1000);
    };

    //css选择器
    u.hasClass = function (obj, cls) {
        return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    }

    u.addClass = function (obj, cls) {
        if (!u.hasClass(obj, cls)) {
            obj.className = obj.className.replace(/(^\s*)|(\s*$)/g, "");
            obj.className += " " + cls;
        }
    }

    u.removeClass = function (obj, cls) {
        if (u.hasClass(obj, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            obj.className = obj.className.replace(reg, ' ');
        }
    }

    return u;
});

