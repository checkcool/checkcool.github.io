//util.js

define(function () {
    var util = {};
    //收藏
    util.addFavorite = function (url, name) {
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
    util.setHome = function (obj, url) {
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
    util.initClock = function (obj) {
        setInterval(function () {
            var date = new Date();
            obj.innerText = date.getFullYear().toString()
            + "年"
            + (date.getMonth() + 1).toString()
            + "月"
            + date.getDate().toString()
            + "日 "
            + date.getHours().toString()
            + "时 "
            + date.getMinutes().toString()
            + "分 "
            + date.getSeconds().toString()
            + "秒";
        }, 1000);
    };
    return util;
});

