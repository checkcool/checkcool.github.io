//canvasclock.js

; (function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['canvasclock'], function (canvasclock) {
            // Also create a global in case some scripts
            // that are loaded still are looking for
            // a global even when an AMD loader is in use.
            return (root.canvasclock = factory(canvasclock));
        });
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory(require('canvasclock'));
    } else {
        // Browser globals (root is window)
        root.canvasclock = factory(root.canvasclock);
    }
}(this, function (canvasclock) {

    var root = this || global;
    var previouscanvasclock = root.canvasclock;

    /**
     *
     * @param {Object} options
     * @constructor
     */
    var canvasclock = function (options) {
        this.name = "canvasclock";
        this.version = "${version}";
        this.default = {
            city: 'beijing',
            canvas: null
        };
        this.options = this.extend(this.default, options);
        var city = this.options.city,
            canvas = this.options.canvas,
            drawClock = this.drawClock;
        //init
        drawClock(city, canvas);
        window.requestAnimationFrame(function () {
            drawClock(city, canvas);
        });
    };

    /**
     * Get date by city
     * @param {String} city 
     */
    canvasclock.getDateByCity = function(city) {
        var wd = new canvasclock.prototype.WorldDates();
        return wd[city]();
    }

    /**
     * Get nth Weekday Of Month
     * @param {Number} weekday 
     * @param {Number} n 
     * @param {Date} d 
     */
    canvasclock.nthWeekdayOfMonth = function(weekday, n, d) {
        var date = new Date(d.getFullYear(), d.getMonth(), 1),
            add = (weekday - date.getDay() + 7) % 7 + (n - 1) * 7;
        date.setDate(1 + add);
        return date;
    }

    /**
     * Get last Sunday Of Month
     * @param {Date} d 
     */
    canvasclock.lastSundayOfMonth = function (d) {
        var lastDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            year = d.getFullYear();
        if (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) {
            lastDay[1] = 29;
        }
        var date = new Date(d.getFullYear(), d.getMonth(), lastDay[d.getMonth()]);
        date.setDate(date.getDate() - date.getDay());
        return date;
    }

    canvasclock.prototype = {
        getVersion: function () {
            return this.version;
        },
        /**
         * draw Clock
         * Reference from: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations
         * @param {String} city, 'beijing' by default 
         * @param {object HTMLCanvasElement} canvas
         */
        drawClock: function (city, canvas) {
            var now = canvasclock.getDateByCity(city);
            var ctx = canvas.getContext('2d');
            ctx.save();
            ctx.clearRect(0, 0, 150, 150);
            ctx.translate(75, 75);
            ctx.scale(0.4, 0.4);
            ctx.rotate(-Math.PI / 2);
            ctx.strokeStyle = "black";
            ctx.fillStyle = "white";
            ctx.lineWidth = 8;
            ctx.lineCap = "round";

            // Hour marks
            ctx.save();
            for (var i = 0; i < 12; i++) {
                ctx.beginPath();
                ctx.rotate(Math.PI / 6);
                ctx.moveTo(100, 0);
                ctx.lineTo(120, 0);
                ctx.stroke();
            }
            ctx.restore();

            // Minute marks
            ctx.save();
            ctx.lineWidth = 5;
            for (i = 0; i < 60; i++) {
                if (i % 5 != 0) {
                    ctx.beginPath();
                    ctx.moveTo(117, 0);
                    ctx.lineTo(120, 0);
                    ctx.stroke();
                }
                ctx.rotate(Math.PI / 30);
            }
            ctx.restore();

            var sec = now.getSeconds();
            var min = now.getMinutes();
            var hr = now.getHours();
            hr = hr >= 12 ? hr - 12 : hr;

            ctx.fillStyle = "black";

            // write Hours
            ctx.save();
            ctx.rotate(hr * (Math.PI / 6) + (Math.PI / 360) * min + (Math.PI / 21600) * sec)
            ctx.lineWidth = 14;
            ctx.beginPath();
            ctx.moveTo(-20, 0);
            ctx.lineTo(80, 0);
            ctx.stroke();
            ctx.restore();

            // write Minutes
            ctx.save();
            ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec)
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.moveTo(-28, 0);
            ctx.lineTo(112, 0);
            ctx.stroke();
            ctx.restore();

            // Write seconds
            ctx.save();
            ctx.rotate(sec * Math.PI / 30);
            ctx.strokeStyle = "#D40000";
            ctx.fillStyle = "#D40000";
            ctx.lineWidth = 6;
            ctx.beginPath();
            ctx.moveTo(-30, 0);
            ctx.lineTo(83, 0);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(95, 0, 10, 0, Math.PI * 2, true);
            ctx.stroke();
            ctx.fillStyle = "rgba(0,0,0,0)";
            ctx.arc(0, 0, 3, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.restore();

            ctx.beginPath();
            ctx.lineWidth = 14;
            ctx.strokeStyle = '#325FA2';
            ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
            ctx.stroke();

            ctx.restore();

            window.requestAnimationFrame(function () {
                canvasclock.prototype.drawClock(city, canvas);
            });
        },
        /**
         * getWorldDates
         */
        WorldDates: function () {
            return {
                utc: function () {
                    var date = new Date();
                    date.setTime(date.getTime() + date.getTimezoneOffset() * 60000);
                    return date;
                },
                beijing: function () {
                    var date = new Date(),
                        offset = 8,
                        utc = this.utc();
                    date.setTime(utc.getTime() + (3600000 * offset));
                    return date;
                },
                seoul: function () {
                    var date = new Date(),
                        offset = 9,
                        utc = this.utc();
                    date.setTime(utc.getTime() + (3600000 * offset));
                    return date;
                },
                newyork: function () {
                    var utc = this.utc(),
                        offset = -5,
                        date = new Date(),
                        summerDateStart = canvasclock.nthWeekdayOfMonth(0,2,new Date(date.getFullYear(),3,1)),
                        summerDateEnd = canvasclock.nthWeekdayOfMonth(11, 2, new Date(date.getFullYear(), 10, 1)),
                        nonSummerTime = utc.getTime() + (3600000 * offset);
                    date.setTime((nonSummerTime >= summerDateStart.getTime() && nonSummerTime <= summerDateEnd.getTime()) ? (nonSummerTime + 3600000) : nonSummerTime);
                    return date;
                },
                vancouver: function () {
                    var utc = this.utc(),
                        offset = -8,
                        date = new Date(),
                        summerDateStart = canvasclock.nthWeekdayOfMonth(0, 2, new Date(date.getFullYear(), 3, 1)),
                        summerDateEnd = canvasclock.nthWeekdayOfMonth(11, 2, new Date(date.getFullYear(), 10, 1)),
                        nonSummerTime = utc.getTime() + (3600000 * offset);
                    date.setTime((nonSummerTime >= summerDateStart.getTime() && nonSummerTime <= summerDateEnd.getTime()) ? (nonSummerTime + 3600000) : nonSummerTime);
                    return date;
                },
                tokyo: function () {
                    var date = new Date(),
                        offset = 9,
                        utc = this.utc();
                    date.setTime(utc.getTime() + (3600000 * offset));
                    return date;
                },
                moscow: function () {
                    var date = new Date(),
                        offset = 3,
                        utc = this.utc();
                    date.setTime(utc.getTime() + (3600000 * offset));
                    return date;
                },
                london: function () {
                    var utc = this.utc(),
                        offset = 0,
                        date = new Date(),
                        summerDateStart = canvasclock.lastSundayOfMonth(new Date(date.getFullYear(), 2, 1)),
                        summerDateEnd = canvasclock.lastSundayOfMonth(new Date(date.getFullYear(), 9, 1)),
                        nonSummerTime = utc.getTime() + (3600000 * offset);
                    date.setTime((nonSummerTime >= summerDateStart.getTime() && nonSummerTime <= summerDateEnd.getTime()) ? (nonSummerTime + 3600000) : nonSummerTime);
                    return date;
                },
                paris: function () {
                    var utc = this.utc(),
                        offset = 1,
                        date = new Date(),
                        summerDateStart = canvasclock.lastSundayOfMonth(new Date(date.getFullYear(), 2, 1)),
                        summerDateEnd = canvasclock.lastSundayOfMonth(new Date(date.getFullYear(), 9, 1)),
                        nonSummerTime = utc.getTime() + (3600000 * offset);
                    date.setTime((nonSummerTime >= summerDateStart.getTime() && nonSummerTime <= summerDateEnd.getTime()) ? (nonSummerTime + 3600000) : nonSummerTime);
                    return date;
                },
                sydney: function () {
                    var date = new Date(),
                        offset = 10,
                        utc = this.utc();
                    date.setTime(utc.getTime() + (3600000 * offset));
                    return date;
                },
                sanfrancisco: function () {
                    var utc = this.utc(),
                        offset = -8,
                        date = new Date(),
                        summerDateStart = canvasclock.nthWeekdayOfMonth(0, 2, new Date(date.getFullYear(), 3, 1)),
                        summerDateEnd = canvasclock.nthWeekdayOfMonth(11, 2, new Date(date.getFullYear(), 10, 1)),
                        nonSummerTime = utc.getTime() + (3600000 * offset);
                    date.setTime((nonSummerTime >= summerDateStart.getTime() && nonSummerTime <= summerDateEnd.getTime()) ? (nonSummerTime + 3600000) : nonSummerTime);
                    return date;
                },
                dubai: function () {
                    var date = new Date(),
                        offset = 4,
                        utc = this.utc();
                    date.setTime(utc.getTime() + (3600000 * offset));
                    return date;
                },
                berlin: function () {
                    var utc = this.utc(),
                        offset = 1,
                        date = new Date(),
                        summerDateStart = canvasclock.lastSundayOfMonth(new Date(date.getFullYear(), 2, 1)),
                        summerDateEnd = canvasclock.lastSundayOfMonth(new Date(date.getFullYear(), 9, 1)),
                        nonSummerTime = utc.getTime() + (3600000 * offset);
                    date.setTime((nonSummerTime >= summerDateStart.getTime() && nonSummerTime <= summerDateEnd.getTime()) ? (nonSummerTime + 3600000) : nonSummerTime);
                    return date;
                },
                toronto: function () {
                    var utc = this.utc(),
                        offset = -5,
                        date = new Date(),
                        summerDateStart = canvasclock.nthWeekdayOfMonth(0, 2, new Date(date.getFullYear(), 3, 1)),
                        summerDateEnd = canvasclock.nthWeekdayOfMonth(11, 2, new Date(date.getFullYear(), 10, 1)),
                        nonSummerTime = utc.getTime() + (3600000 * offset);
                    date.setTime((nonSummerTime >= summerDateStart.getTime() && nonSummerTime <= summerDateEnd.getTime()) ? (nonSummerTime + 3600000) : nonSummerTime);
                    return date;
                },
                brazil: function () {
                    var date = new Date(),
                        offset = -3,
                        utc = this.utc();
                    date.setTime(utc.getTime() + (3600000 * offset));
                    return date;
                },
                cairo: function () {
                    var date = new Date(),
                        offset = 2,
                        utc = this.utc();
                    date.setTime(utc.getTime() + (3600000 * offset));
                    return date;
                },
                newdelhi: function () {
                    var date = new Date(),
                        offset = 5,
                        utc = this.utc();
                    date.setTime(utc.getTime() + (3600000 * offset));
                    return date;
                },
                bangkok: function () {
                    var date = new Date(),
                        offset = 7,
                        utc = this.utc();
                    date.setTime(utc.getTime() + (3600000 * offset));
                    return date;
                }
            }
        },
        /**
         * clone objs
         * @param {Object} target 
         * @param {Object} source 
         */
        extend: function (target, source) {
            for (var p in source) {
                if (source.hasOwnProperty(p)) {
                    target[p] = source[p];
                }
            }
            return target;
        }

    };
    return canvasclock;
}))

