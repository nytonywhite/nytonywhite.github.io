! function(b) {
    function a(d) {
        if (c[d]) {
            return c[d].exports
        }
        var e = c[d] = {
            exports: {},
            id: d,
            loaded: !1
        };
        return b[d].call(e.exports, e, e.exports, a), e.loaded = !0, e.exports
    }
    var c = {};
    return a.m = b, a.c = c, a.p = "", a(0)
}([
    function(b, a, c) {
        _caf.zps || (_caf.zps = []), _caf.zp && _caf.zps.push(_caf.zp), Element.prototype.setAttributes = function(f) {
            var d, g;
            for (d in f) {
                if ("styles" === d || "style" === d) {
                    if ("object" == typeof f[d]) {
                        for (g in f[d]) {
                            this.style[g] = f[d][g]
                        }
                    }
                    "string" == typeof f[d] && (this.style.cssText = "" + f[d])
                } else {
                    "html" === d ? this.innerHTML = f[d] : this.setAttribute(d, f[d])
                }
            }
        }, _cjq = window._cjq || {}, window._cjq = _cjq, _cjq.AdUtils || (_cjq.AdUtils = c(3), _cjq._u = _cjq.AdUtils), _cjq.CrispSafeFrame || (_cjq.CrispSafeFrame = c(7)), _cjq.AdhesionCradle || (_cjq.AdhesionCradle = c(5)), _cjq.AdManager || (_cjq.AdManager = c(2)), _cjq.AdBridge || (_cjq.AdBridge = c(1)),
        function() {
            if (_cjq.AdUtils.deviceProps.isIOS9) {
                var d = document.querySelector("meta[name=viewport]");
                d && d.content && (d.content += ", shrink-to-fit=no")
            }
        }(), window.CrispAdObject || (window.CrispAdObject = c(4)),
        function() {
            var f = f || [],
                d = new CrispAdObject(document);
            f.push(d), setTimeout(function() {
                d.init()
            }, 10)
        }(), _cjq = c(6)()
    },
    function(d, b) {
        var f = {},
            a = _cjq.AdUtils,
            c = _cjq.AdManager;
        document, f.resize = function(h, g, j) {
            _cjq.AdEngine.resize(h, g, j)
        }, f.onScroll = function(h, g, j) {
            _cjq.AdEngine.onScroll(h, g, j)
        }, f.onOrientationChange = function(h, g) {
            _cjq.AdEngine.onOrientationChange(h, g)
        }, f.handleOrientationComplete = function(h, g) {
            if (g && g.adframeid) {
                var j = c.getCrispAd(g.adframeid);
                j.handleOrientationComplete(h, g)
            } else {
                _cjq.AdEngine.handleOrientationComplete(h, g)
            }
        }, f.handleAdResize = function(h, g) {
            _cjq.AdEngine.handleAdResize(h, g)
        }, f.getVisible = function(h, g) {
            _cjq.AdEngine.getVisible(h, g)
        }, f.showLightBox = function(g) {}, f.getAppProps = function() {
            return _cjq.AdEngine.getAppProps()
        }, f.debounce = function(h, g, j) {
            return a.debounce(h, g, j)
        }, f.getPanelBGDiv = function(g) {
            return _cjq.AdEngine.getPanelBGDiv(g)
        }, f.getTopDiv = function(g) {
            return _cjq.AdEngine.getTopDiv(g)
        }, f.getBannerIframe = function(g) {
            return _cjq.AdEngine.getBannerIframe(g)
        }, f.getWinProps = function(h, g) {
            return a.getWinProps(h, g)
        }, f.getPhaseToStageMap = function() {
            return _cjq.AdEngine.phaseToStageMap
        }, f.getCurrentStage = function(g) {
            return g ? c.getCrispAd(g).currentStage : _cjq.AdEngine.currentStage
        }, f.setDelegate = function(h, g) {
            a.setDelegate(h, g)
        }, f.getDelegate = function(g) {
            return a.getDelegate(g)
        }, f.getCornerAdhesion = function(h) {
            var g = "none";
            return g = h ? c.getCrispAd(h).isCornerAdhesion() : _cjq.AdEngine.isCornerAdhesion()
        }, f.isAdhesionStretched = function(h) {
            var g;
            return g = h ? c.getCrispAd(h).isAdhesionStretched() : _cjq.AdEngine.isAdhesionStretched(), g === !0 || "true" === g
        }, f.caf = function(g) {
            return f.getBannerIframe(g) ? f.getBannerIframe(g).contentWindow._cjq.crispAdFramework : null
        }, f.getTrackerkey = function(g) {
            return f.caf(g) ? f.caf(g).trackerkey : void 0
        }, f.getCrispkey = function() {
            return _cjq.AdEngine.getCrispkey()
        }, f.getCrispAdId = function(g) {
            return g ? c.getCrispAd(g).getCrispAdId() : _cjq.AdEngine.getCrispAdId()
        }, f.firstActionHolder = {
            firstAction: !0
        }, f.secondActionHolder = {
            secondAction: !0,
            globalTimer: null,
            limit: 3
        }, d.exports = f
    },
    function(g, d) {
        function h() {
            return document.getElementsByClassName("cmClientTag").length
        }

        function c(a) {
            b.push(a)
        }
        var f = {},
            b = [];
        f.crispAds = f.crispAds || {}, f.getAdCount = function() {
            return f.crispAds.length
        }, f.getTagCount = function() {
            return h()
        }, f.clearTimeout = function() {
            _cjq.AdManager.preExpTimeoutID && clearTimeout(_cjq.AdManager.preExpTimeoutID)
        }, f.addToManager = function(a) {
            c(a)
        }, f.addCrispAd = function(j, a) {
            f.clientTagId = j, f.crispAds[j] = a
        }, f.getCrispAd = function(j) {
            if (!j) {
                return f.crispAds[f.clientTagId]
            }
            j.indexOf("cmAdFrame__") > -1 && (j = j.substr("cmAdFrame__".length)), j.indexOf("cacPanelIframe__") > -1 && (j = j.substr("cacPanelIframe__".length));
            var a = f.crispAds[j];
            return a ? a : f.crispAds[f.clientTagId]
        }, f.getAllCrispAd = function() {
            return f.crispAds
        }, f.getAdIds = function() {
            return b.slice(0)
        }, f.allAdsLoaded = function(a) {
            return f.getTagCount() === f.getAdCount()
        }, g.exports = f
    },
    function(d, b) {
        function f(g) {
            return g.replace(/([A-Z])/g, function(h) {
                return "-" + h.toLowerCase()
            })
        }

        function a(j, h) {
            var k, g;
            if (c.events[j] && c.events[j].listeners) {
                for (k = c.events[j].listeners.length, g = k - 1; g >= 0; g -= 1) {
                    if (c.events[j].listeners[g] === h) {
                        return g
                    }
                }
            }
            return -1
        }
        var c = {};
        c.events = [], c.delegates = [], c.maxZ = null, c.getRandomInt = function(h) {
            var g = "number" == typeof h ? h : 100000;
            return Math.floor(Math.random() * g)
        }, c.isDesktopBrowser = function() {
            return !("ontouchstart" in window)
        }, c.isInCpnTag = function() {
            return !!(window && window.parent && window.parent.document && window.parent.document.getElementById("cpn_ad_frame"))
        }, c.includeJS = function(k) {
            if ("object" == typeof k) {
                var h = k.path,
                    l = k.targetDoc,
                    g = l.getElementsByTagName("head")[0],
                    j = l.createElement("script");
                return j.type = "text/javascript", j.defer = "defer", j.src = h, g.appendChild(j), j
            }
        }, c.getOpenFrame = function(l) {
            var j, m = l || _cjq.AdEngine.iframes,
                h = null,
                k = null,
                g = [];
            if (!m) {
                return !1
            }
            for (j = 0; j < m.length; j++) {
                m[j] && m[j].id && (h = m[j].id, k = h && document.querySelector("#" + h), k && k.style && "block" === k.style.display && g.push(h))
            }
            return g
        }, c.isElementInViewport = function(h) {
            if (!h || !h.getBoundingClientRect()) {
                return null
            }
            var g = h.getBoundingClientRect();
            return g.top >= 0 && g.left >= 0 && g.bottom <= (window.innerHeight || document.documentElement.clientHeight) && g.right <= (window.innerWidth || document.documentElement.clientWidth)
        }, c.getCss = function(j, h) {
            var g = "";
            return h = f(h), j.style && j.style[h] ? g = j.style[h] : window.getComputedStyle && (g = document.defaultView.getComputedStyle(j, null).getPropertyValue(h)), g
        }, c.outputCss = function(k, h) {
            var l, g, j = h.createElement("style");
            j.setAttribute("type", "text/css"), j.styleSheet ? j.styleSheet.cssText = k : (l = h.createTextNode(k), j.appendChild(l)), g = h.getElementsByTagName("head")[0], g.appendChild(j)
        }, c.prevDefStopProp = function(g) {
            return g.preventDefault(), g.stopPropagation(), !1
        }, c.bind = function(j, g, k, h) {
            k ? (k === document && (k = document.body ? document.body : document.documentElement), k.addEventListener ? k.addEventListener(j, g, !1) : k.attachEvent("on" + j, g)) : "function" == typeof g && (this.events[j] || (this.events[j] = []), this.events[j].listeners || (this.events[j].listeners = []), -1 === a(j, g) && (this.events[j].listeners.splice(0, 0, g), this.events[j].listeners[0].once = h))
        }, c.unbind = function(j, g, k) {
            if (k) {
                k === document && (k = document.body ? document.body : document.documentElement), k.removeEventListener ? k.removeEventListener(j, g, !1) : k.detachEvent("on" + j, g)
            } else {
                if ("function" == typeof g && this.events[j] && this.events[j].listeners) {
                    var h = a(j, g); - 1 !== h && this.events[j].listeners.splice(h, 1)
                }
            }
        }, c.setDelegate = function(h, g) {
            c.delegates[h] = g
        }, c.getDelegate = function(g) {
            return "function" == typeof c.delegates[g] ? c.delegates[g] : null
        }, c.trigger = function(k, h) {
            var l, g, j;
            if (h || (h = []), this.events[k] && this.events[k].listeners) {
                for (l = this.events[k].listeners.length, g = l - 1; g >= 0; g -= 1) {
                    j = {}, j.type = k, this.events[k].listeners[g].call(this, j, h), this.events[k].listeners[g].once && this.unbind(j, this.events[k].listeners[g])
                }
            }
        }, c.getHighestZindex = function() {
            function g() {
                var l, j, m = 0,
                    h = 0,
                    k = document.getElementsByTagName("*");
                for (l = 0; l < k.length; l++) {
                    k[l].style && (h = parseInt(k[l].style.zIndex, 10)), !isNaN(h) && k[l].style || !window.getComputedStyle || (j = document.defaultView.getComputedStyle(k[l], null).getPropertyValue("z-index"), h = Math.round(j)), !isNaN(h) && h > m && (m = h)
                }
                return m += 1, m || 0
            }
            return null === c.maxZ && (c.maxZ = g()), c.maxZ
        }, c.positionElements = function(j, h, k, g) {
            g || document.getElementById(j) && (document.getElementById(j).style[h] = k)
        }, c.addGlobalStyle = function(h) {
            var g = c.globalStyles;
            if (c.globalStyles || (g = document.createElement("style"), document.head.appendChild(g), c.globalStyles = g), g) {
                try {
                    g.sheet.insertRule(h, 0)
                } catch (j) {
                    console.log(j.message)
                }
            }
        }, c.getWinProps = function(k, j) {
            var p, h, g, m = k || window,
                l = null;
            if (h = m.innerWidth, g = m.document.documentElement.clientHeight || m.innerHeight, p = c.deviceProps.orientationmode(), l = {
                width: window.innerWidth,
                height: window.innerHeight,
                orientation: p
            }, "portrait" === p && h > g || "landscape" === p && g > h) {
                if (j !== !0) {
                    return l
                }
                l = {
                    width: window.innerHeight,
                    height: window.innerWidth,
                    orientation: p
                }
            } else {
                l = {
                    width: window.innerWidth,
                    height: window.innerHeight,
                    orientation: p
                }
            }
            return l
        }, c.appProps = function() {
            var g = {
                inapp: null,
                checkInApp: function(m, k) {
                    var s = m || "none",
                        j = k || window,
                        l = (j.location && j.location.href, k.navigator),
                        h = l && l.standalone,
                        q = l && /iphone|ipod|ipad/i.test(l.userAgent),
                        p = l && /safari/i.test(l.userAgent);
                    return !q || h || p || (s = "unknown"), s
                },
                checkMraid: function(k, j) {
                    var l = k || "none",
                        h = j || window;
                    return h.mraid && (l = "mraid"), l
                },
                checkAdMob: function(k, j) {
                    var l = k || "none",
                        h = j || window;
                    return (h.AFMA_AddEventListener || h.AFMA_ReceiveMessage || h.AFMA_RemoveEventListener || h.AFMA_SendMessage) && (l = "AdMob"), l
                },
                checkAdMarvel: function(k, j) {
                    var l = k || "none",
                        h = j || window;
                    return (h.adMarvelAdBlocking || h.adMarvelAdType || h.adMarvelClickCount || h.adMarvelHandleClick || h.adMarvelIsInitialLoad || h.adMarvelResetClickCount || /^content/i.test(h.location.href) && /admarvel/i.test(h.location.href)) && (l = "AdMarvel"), l
                },
                checkSDKs: function(k, j) {
                    var l = k || "none",
                        h = j || window;
                    return l = this.checkInApp(l, h), l = this.checkMraid(l, h), l = this.checkAdMob(l, h), l = this.checkAdMarvel(l, h)
                }
            };
            return g.inapp = g.checkSDKs(), g
        }(), c.css = {
            getTransform: function(k, h) {
                if (!k || !h) {
                    return !1
                }
                var l, g, j = null;
                return l = k.indexOf(h), g = l > -1 && k.indexOf(")", l), j = g && k.slice(l, g + 1)
            },
            updateTransform: function(l, j, p) {
                if (!l || !j || !p) {
                    return !1
                }
                var h, k, g, m = l;
                return h = l.indexOf(j), k = h > -1 && l.indexOf(")", h), g = k && l.slice(h, k + 1), g && (m = l.replace(g, [j, "(", p, ") "].join(""))), m
            },
            setWidth: function(j, h) {
                var k = "px";
                try {
                    if (!j || !j.style || !h) {
                        throw new Error("invalid parameter: ele or value")
                    }
                    return /%/.test(h) && (k = "%"), j.style.width = parseInt(h, 10) + k, j.style.width
                } catch (g) {}
            },
            setHeight: function(h, g) {
                try {
                    if (!h || !g || !h.style) {
                        throw new Error("invalid parameter: ele or value")
                    }
                    return h.style.height = parseInt(g, 10) + "px", h.style.height
                } catch (j) {}
            }
        }, c.deviceProps = function(h) {
            var h = h;
            try {
                h.innerWidth
            } catch (g) {
                h = window
            }
            return ret = {
                width: function() {
                    return h.innerWidth
                },
                height: function() {
                    return h.innerHeight
                },
                isAndroid: function() {
                    return /android/gi.test(h.navigator.userAgent)
                }(),
                isIOS: function() {
                    return /OS/i.test(navigator.userAgent)
                }(),
                doesChromeSupportSSL: function() {
                    function k() {
                        var m = navigator.userAgent,
                            l = /Chrome\/([\d.]+)/,
                            o = m.match(l);
                        return null === o ? null : parseFloat(o[1])
                    }
                    var j = k();
                    return !j || j > 40
                }(),
                isAndroidBrowser: function() {
                    function o(q) {
                        var r = l.match(q);
                        return null === r ? null : parseFloat(r[1])
                    }
                    var l = navigator.userAgent,
                        p = l.indexOf("Android") > -1 && l.indexOf("Mozilla/5.0") > -1 && l.indexOf("AppleWebKit") > -1,
                        k = o(/AppleWebKit\/([\d.]+)/),
                        m = o(/Chrome\/([\d.]+)/),
                        j = p && null !== k && 537 > k || null !== m && 37 > m;
                    return j
                }(),
                isIOS9: function() {
                    var k, j, l = navigator.userAgent.match(/[\w]+; CPU.*OS (\d_\d)/);
                    return !!(l && l.length > 1 && (j = l[l.length - 1], j = j.replace("_", "."), k = parseInt(1 * j, 10), k >= 9 && 10 > k))
                }(),
                isIOS8: function() {
                    var k, j, l = navigator.userAgent.match(/[\w]+; CPU.*OS (\d_\d)/);
                    return !!(l && l.length > 1 && (j = l[l.length - 1], j = j.replace("_", "."), k = parseInt(1 * j, 10), k >= 8))
                }(),
                isIphone6Plus: function() {
                    var k, j, l = navigator.userAgent.match(/; CPU.*OS (\d_\d)/);
                    return !!(l && l.length > 1 && (j = l[l.length - 1], j = j.replace("_", "."), k = parseInt(1 * j, 10), k >= 8 && 3 == window.devicePixelRatio))
                }(),
                isIphone6: function() {
                    var k, j, l = navigator.userAgent.match(/[\w]+; CPU.*OS (\d_\d)/);
                    return !!(l && l.length > 1 && (j = l[l.length - 1], j = j.replace("_", "."), k = parseInt(1 * j, 10), k >= 8 && 3 != window.devicePixelRatio && (375 == window.innerHeight || 375 == window.innerWidth)))
                }(),
                iosVersion: function() {
                    var l, k, m, j = navigator.userAgent.match(/; CPU.*OS (\d_\d)/);
                    return j && j.length > 1 ? (l = j[j.length - 1], m = j[0].indexOf("iPhone") > -1 ? "iPhone" : j[0].indexOf("iPad") > -1 ? "IPad" : j[0], l = l.replace("_", "."), k = parseInt(1 * l, 10), {
                        IOS: m,
                        version: k
                    }) : null
                },
                orientation: function() {
                    return void 0 !== window.orientation ? window.orientation : h.innerWidth < h.innerHeight ? 0 : 90
                }(),
                orientationmode: function() {
                    var j;
                    return j = window.orientation ? 90 === Math.abs(window.orientation) ? "landscape" : "portrait" : window.innerWidth > window.innerHeight ? "landscape" : "portrait"
                },
                ua: h.navigator.userAgent,
                viewport: function() {
                    var p, l, s = document.querySelector('[name="viewport"]'),
                        k = null,
                        m = null,
                        j = null,
                        q = 0;
                    if (s && s.content) {
                        for (j = {}, k = s.content.split(","), k && 1 !== k.length || (k = s.content.split(";")), q = k.length; q--;) {
                            m = k[q].split("="), m && m.length > 1 && (p = m[0], l = m[1], p && (j[p.trim()] = l))
                        }
                    }
                    return j
                }(),
                isMobileOptimized: function() {
                    return !(!c.deviceProps.viewport || "1" !== c.deviceProps.viewport["maximum-scale"] && "1.0" !== c.deviceProps.viewport["maximum-scale"] && "no" !== c.deviceProps.viewport["user-scalable"] && "0" !== c.deviceProps.viewport["user-scalable"])
                }
            }, ret
        }(window.top), c.debounce = function(l, u, j) {
            var k, g, q, h, m, v = Date.now || function() {
                    return (new Date).getTime()
                },
                p = function() {
                    var e = v() - h;
                    u > e ? k = setTimeout(p, u - e) : (k = null, j || (m = l.apply(q, g), q = g = null))
                };
            return function() {
                q = this, g = arguments, h = v();
                var e = j && !k;
                return k || (k = setTimeout(p, u)), e && (m = l.apply(q, g), q = g = null), m
            }
        }, c.getZoomFactor = function() {
            var k, j, m = window.orientation ? 90 === Math.abs(window.orientation) : window.innerWidth > window.innerHeight,
                h = window.innerHeight,
                g = c.deviceProps.isAndroid,
                l = c.deviceProps.isMobileOptimized();
            if (_cjq.AdEngine.isPreviewRequest() === !0 || l) {
                return 1
            }
            if (m && window.screen.width < window.screen.height ? (k = window.screen.height, h = window.innerWidth) : (k = window.screen[m ? "height" : "width"], h = window["inner" + (m ? "Height" : "Width")]), g) {
                switch (screen.width) {
                    case 1080:
                        k /= 3;
                        break;
                    case 720:
                        k /= 2;
                        break;
                    case 540:
                        k /= 1.5
                }
                m && (h = 1.09 * h)
            }
            return j = h / k, j = parseInt(Math.round(1000 * j), 10) / 1000
        }, c.getStretchZoomFactor = function(h) {
            var g = (window.innerHeight, deviceWidth / h),
                j = c.getZoomFactor();
            return j *= g
        }, c.inViewport = function(u) {
            var y, k, q, g, x, j = document.documentElement.clientHeight,
                v = window.innerWidth || document.documentElement.clientWidth,
                z = {},
                w = {};
            try {
                if (!u) {
                    throw new Error("inViewport: missing parameter")
                }
                if (y = u.getBoundingClientRect(), k = w.top = y.top >= 0 && y.top <= j, q = w.bottom = y.bottom >= 0 && y.bottom <= j, g = w.left = y.left >= 0 && y.left <= v, x = w.right = y.right >= 0 && y.right <= v, k && q && g && x) {
                    return !0
                }
                for (var m in w) {
                    w.hasOwnProperty(m) && (w[m] || (z[m] = y[m]))
                }
                return z
            } catch (h) {
                console.log(h.message)
            }
        }, d.exports = c
    },
    function(b, a) {
        function c(N, z) {
            function G(f, g) {
                var d = L.frameHideDelay;
                return f && g ? (null === d && (d = {}), d[f] !== z && null !== d[f] || (d[f] = g), L.frameHideDelay = d) : !1
            }

            function J(f, d) {
                return /body/i.test(f.nodeName) !== !0 && f ? f.style && f.style[d] || window.getComputedStyle(f).getPropertyValue(d) ? f.style[d] ? {
                    style: f.style[d],
                    explicit: !0
                } : {
                    style: window.getComputedStyle(f).getPropertyValue(d),
                    explicit: !1
                } : f.parentNode ? J(f.parentNode, d) : void 0 : !1
            }

            function C(l) {
                var g, m, f, h, d;
                if (!_caf.zps) {
                    return _caf.zp
                }
                if (l && l.indexOf("z") > -1 && (l.indexOf("crisp-a") > -1 && (l = l.substring(l.indexOf("crisp-a") + 7)), m = l.substring(l.indexOf("z") + 1, l.indexOf("-"))), m) {
                    if (d = _caf.zps, d && d.length > 0) {
                        for (g = d.length - 1; g >= 0; g--) {
                            if (h = d[g], f = h.trackerkey.split(";"), f && 3 === f.length && m === f[2]) {
                                return h
                            }
                        }
                    }
                    return !h && _caf.zp ? _caf.zp : h
                }
            }

            function R(f, d) {
                var g;
                if (!f || !d) {
                    return d
                }
                for (g in f) {
                    f.hasOwnProperty(g) && (d[g] = f[g])
                }
                return d
            }

            function F(m, v, h, l, f, u, g) {
                var p, w;
                switch (v) {
                    case "testtag":
                        p = m.split(/\D/g), p && 4 === p.length ? (h.agency = p[1], h.cmpid = p[2], h.bannerid = p[3]) : console.warn(" ID not valid");
                        break;
                    case "zonetag":
                        p = m.split(/\D/g), p && p.length >= 4 ? (h.agency = p[1], h.pubid = p[2], h.zid = p[3], p[4] && (h.bannerid = p[4])) : console.warn(" ID not valid");
                        break;
                    case "packaged":
                        p = m.split(/\D/g), !p || 4 !== p.length && 5 !== p.length ? console.warn(" ID not valid") : (h.agency = p[1], h.pubid = p[2], h.zid = p[3], h.idprefix = m), p && 5 === p.length && (h.bannerid = p[4]), "cdn" === l && (w = g.split("-")[2].split(/\D/g).slice(1, 3), (!h.cmpid || !h.advid) && w && w.length > 0 && (h.cmpid = w[0], h.advid = w[1]))
                }
            }

            function O(m) {
                var u = {},
                    g = null,
                    l = null,
                    f = null,
                    t = null,
                    p = null;
                try {
                    for (p in m) {
                        m.hasOwnProperty(p) && (g = m[p], l = g && g.params, f = l && l["#loadingPhase#"], t = l && l["#displayStage#"], f !== z && (_cjq.AdEngine.isStandardPanelAd(), u[t] = u[t] || [], -1 === u[t].indexOf(f) && u[t].push(f)))
                    }
                    return u
                } catch (h) {
                    console.log(h)
                }
            }

            function B(d) {
                return _cjq.AdEngine.isAdExpanded() && event && "scroll" === event.type ? (event.preventDefault ? event.preventDefault() : event.returnValue = !1, !1) : void 0
            }

            function P() {
                var f = window.innerHeight,
                    d = document.compatMode;
                return !d && supportBoxModel || (f = "CSS1Compat" === d ? document.documentElement.clientHeight : document.body.clientHeight), f
            }

            function I(f) {
                if (_cjq.AdEngine.isPreviewRequest()) {
                    var d = document.getElementsByTagName("body")[0];
                    "open" === f ? (d && (d.style.overflow = "hidden"), setTimeout(function() {
                        d.style.overflow = "hidden"
                    }, 500)) : (d && (d.style.overflow = "auto"), setTimeout(function() {
                        d.style.overflow = "auto"
                    }, 500))
                }
            }
            _cjq.AdEngine = this;
            var E = _cjq.AdEngine,
                x = _cjq.AdBridge,
                L = this;
            L._iframeWindow = null, L._iframeDocument = null, L._expandedIframeWindow = null, L._expandedIframeDocument = null, L.isAdhesion = !1, L.isLightBox = !1, L.panelType = "standard", L.closeBannerId = "crisp_close_banner", L.tagType = "zonetag", L.closePanelId = "crisp_close_panel", L.closePanelDivCss = null, L.closeBanner = null, L.closeBannerDivCss = null, L.iframes = [], L.phaseToStageMap = null, L.currentStage = null, L.frameHideDelay = null, L.useCssTransformation = !0, L.trackingData = {}, L.trackingData.hadFirstAction = !1, L.adId = null, L.adProps = {}, L.totalNumTrials = 3, L.countNumTrials = 0;
            var M = {
                    "class": "crispTopAdCradle",
                    style: "  z-index: auto;display: block;position: relative;clear: both;text-align: left;margin-left: auto;margin-right: auto;"
                },
                K = {
                    "class": "crispTopAdCradle",
                    style: "display:block;height:0px;position:absolute;top:0px;"
                },
                H = {
                    "class": "crisp_Css_Ad_Cradle",
                    style: "display:block;"
                },
                S = {
                    "class": "crisp_Ad_Cradle",
                    style: "display:block;margin:auto;width:300px;height:50px;text-align:center;border:none;position:absolute;top:0px;left:0px;clear:both;"
                },
                k = {
                    "class": "crisp_Ad_Cradle",
                    style: "display:block;width:300px;height:50px;text-align:center;border:none;position:fixed;left:0px;clear:both;"
                },
                j = {
                    "class": "cmAdFrame",
                    allowtransparency: !0,
                    allowfullscreen: !0,
                    src: "",
                    scrolling: "no",
                    style: "display:block;margin:auto;border:none;z-index:10000;"
                },
                q = "#crisp_adDiv img{display:inline;}\n#cac_adhere{width:300px;height:50px;text-align:center;border:none;position:absolute;left:0;clear:both;}\n#cac_adhere_spacer{position:relative;clear:both;display:block;width:1px;height:50px;}\n#cac_adhere_banner{position:relative;border:none;float:left;z-index:99999;}\n#crisp_adDiv{margin:0!important;left:0!important;}\n#cac_adhere_cradle * a:hover,#cac_adhere_cradle * a:active{background-color:transparent;}",
                D = function(d) {
                    d.onloadDone = !0
                };
            L.discover = function(t, h, p, f) {
                function w(s) {
                    function l(n) {
                        return n[Math.floor(Math.random() * d.length)]
                    }
                    var A, d = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
                        o = [];
                    for (A = 0; s > A; A++) {
                        o.push(l(d))
                    }
                    return o.join("")
                }
                var g, u = "undefined" != typeof _cpn && _cpn.params && _cpn.params.postalcode && t && t.pp && t.pp.xp && "%PRM%" !== t.pp.xp;
                if ("undefined" != typeof _crispPreviewRequest && _crispPreviewRequest === !0) {
                    Q(t, h, !0)
                } else {
                    if (u && (t.pp.xp = t.pp.xp.replace("{zip}", "zip:" + _cpn.params.postalcode + ";")), "undefined" != typeof _cpn && _cpn.params && _cpn.params.crispkey || t && t.pp.useCrispkey !== z && "false" === t.pp.useCrispkey) {
                        g = t && "false" === t.pp.useCrispkey ? w(31) + "GENERATED" : _cpn.params.crispkey, L.adDetectCb({
                            status: "ok",
                            error: "",
                            data: {
                                crispkey: g,
                                cookie: !0
                            }
                        }), Q(t, h, f)
                    } else {
                        var y = t.pp.fs,
                            v = t.pp.fp,
                            m = document.createElement("script");
                        m.setAttribute("type", "text/javascript"), m.onload = function() {
                            m.onloadDone || (D(m), L.detect(t, h, p, f))
                        }, m.onreadystatechange = function() {
                            "loaded" === m.readyState && (m.onloadDone || (D(m), L.detect(t, h, p, f)))
                        }, m.onerror = function() {
                            m.onloadDone || (D(m), Q(t, h, f))
                        }, m.setAttribute("src", "prefs.js"), document.head.appendChild(m)
                    }
                }
            }, L.detect = function(l, g, p, f) {
                var h = l.pp.api,
                    d = document.createElement("script"),
                    m = fortyone.collect();
                d.setAttribute("type", "text/javascript"), d.onload = function() {
                    d.onloadDone || (D(d), p.call())
                }, d.onreadystatechange = function() {
                    "loaded" === d.readyState && (d.onloadDone || (D(d), p.call()))
                }, d.onerror = function() {
                    d.onloadDone || (D(d), p.call())
                }, d.setAttribute("src", "pref.json?cb=_cjq.AdEngine.adDetectCb&partnerkey=" + l.pp.partnerkey + "&data=" + encodeURIComponent(m)), document.head.appendChild(d)
            };
            var Q = function(y, w, X) {
                try {
                    var U, v, Y, s = y.pp.imgTag,
                        h = N.createElement("div"),
                        m = N.createElement("iframe"),
                        f = null,
                        u = null,
                        W = (_cjq._u.getRandomInt(), y.pp.partnerkey, y.pp.ver, y.pp.cb, y.pp.bannerid, y.pp.api, 1),
                        V = "",
                        p = navigator.userAgent.toLowerCase(),
                        t = document.querySelector("meta[name=viewport]"),
                        r = !(t && t.content && t.content.toLowerCase().replace(/ /g, "").indexOf("user-scalable=no") > -1);
                    Y = C(y.adID), Y && (R(Y, y.pp), L.zp = Y), y.pp.bgclient.indexOf("://") > -1 ? U = y.pp.bgclient : ("testtag" === w && (U = y.pp.cs + y.pp.cp + y.pp.bgclient), X === !0 && (U = y.pp.bgclient), "zonetag" !== w && "packaged" !== w || (U = y.pp.fs + y.pp.fp + "/" + y.pp.bgclient)), (_cjq.AdhesionCradle && _cjq.AdhesionCradle.crispAd || "undefined" != typeof crispPgClient && crispPgClient.props && crispPgClient.props.forceCpnAdhesion || "undefined" != typeof $sf || _caf.zp && _caf.zp.mraid && "false" !== _caf.zp.mraid.mraid) && (y.pp.bannerType = "standard", L.isAdhesion = !1), L.adId = y.adID, L.containerDiv = s, L.inframeclient = U, S.id = S["class"] + "__" + y.adID, k.id = k["class"] + "__" + y.adID, K.id = K["class"] + "__" + y.adID, H.id = H["class"] + "__" + y.adID, M.id = M["class"] + "__" + y.adID, j.id = j["class"] + "__" + y.adID, m.setAttributes(j), L.isAdhesion = "adhesion" === y.pp.bannerType, "lightbox" === y.pp.bannerType && (y.pp.bannerType = "standard", y.pp.panelType = "lightbox"), ("pushdown" === y.pp.bannerType || "standard" === y.pp.bannerType && "pushdown" === y.pp.panelType) && ("pushdown" === y.pp.bannerType && (L.pushdownInterstitial = y.pp.pushdownInterstitial = !0, y.pp.pushdownDuration = 3000), y.pp.panelType = "standard", L.pushdown = !0, y.pp.pushdown = !0, y.pp.pushdownDuration && (L.pushdownDuration = y.pp.pushdownDuration)), "scroller" === y.pp.bannerType && (y.pp.bannerType = "standard", y.pp.panelType = "lightbox", L.adscroller = !0, y.pp.adscroller = !0, "true" === y.pp.adSizeOnly && (L.adSizeOnly = y.pp.adSizeOnly = !0)), L.bannerType = y.pp.bannerType, L.panelType = y.pp.panelType, "undefined" != typeof $sf && (_cjq.CrispSafeFrame ? _cjq.CrispSafeFrame.initSafeFrame() : console.log("Missing Safe frames module.")), L.containerDiv.onload, L.isAdhesion === !0 && document.body.childNodes.length >= 1 ? (ele = document.body.childNodes[0], f = N.createElement("div"), u = N.createElement("div"), f = document.body.insertBefore(f, ele), f.appendChild(u), u.appendChild(h), f.setAttributes(K), u.setAttributes(H), y.pp.adhesion ? ("true" === y.pp.adhesion.useFixedPosition ? (h.setAttributes(k), L.isFixedAdhesion = !0) : h.setAttributes(S), "false" === y.pp.adhesion.useCssTransformation && (L.useCssTransformation = !1), (p.indexOf("ipad") > -1 || p.indexOf("iphone") > -1) && (L.useCssTransformation = !0)) : h.setAttributes(S)) : (f = N.createElement("div"), h = s.parentNode.insertBefore(f, s), h.setAttributes(M), h.style.height = "0px"), _cjq._u.bind("crispbanneriframeloaded", function(n, l) {}), h.appendChild(m), _cjq._u.trigger("cac_iframe_added", [m]), L._iframeWindow = m.contentWindow, L._iframeDocument = m.contentDocument, L._iframeDocument.open(), X === !0 && (V = "<div id='highlight'></div>"), L.isAdhesion === !0 ? L._iframeDocument.write('<!DOCTYPE html><html class=""lang="en" style><body data-adframeid=\'' + m.id + "' style='margin:0;padding:0;'>" + V + "<div id='crisp_adDiv'> <div id='cac_adhere_cradle'><div id='cac_adhere' style='left: 0px;'></div></div></div></body></html>") : "lightbox" === y.pp.bannerType ? (L._iframeDocument.write('<!DOCTYPE html><html class="js no-flexbox canvas canvastext webgl geolocation postmessage websqldatabase no-indexeddb hashchange history draganddrop websockets rgba hsla multiplebgs backgroundsize borderimage borderradius boxshadow textshadow opacity cssanimations csscolumns cssgradients cssreflections csstransforms csstransforms3d csstransitions fontface generatedcontent video audio localstorage sessionstorage webworkers applicationcache svg inlinesvg smil svgclippaths"lang="en" style>'), bannerContainerStyle = ' <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"><style>#panelShade1{opacity:0.5;display:block; position:fixed; top:0;left:0; right:0;bottom:0; height:100%; width:100%; background-color: #000; -webkit-transition: opacity 750ms linear;transition: opacity 750ms linear;}#crisp_adDiv{ margin: auto;overflow:hidden;position: absolute;top: 0; left: 0; bottom: 0; right: 0;clear: both;text-align: left;margin-left: auto;margin-right: auto;}</style>', L._iframeDocument.write("<head>" + bannerContainerStyle + "</head><body data-adframeid='" + m.id + "' style='margin:0;padding:0;'><div id='panelShade'> </div>" + V + "<div id='crisp_adDiv'> </div></body></html>")) : L._iframeDocument.write('<!DOCTYPE html><html class="js no-flexbox canvas canvastext webgl geolocation postmessage websqldatabase no-indexeddb hashchange history draganddrop websockets rgba hsla multiplebgs backgroundsize borderimage borderradius boxshadow textshadow opacity cssanimations csscolumns cssgradients cssreflections csstransforms csstransforms3d csstransitions fontface generatedcontent video audio localstorage sessionstorage webworkers applicationcache svg inlinesvg smil svgclippaths"lang="en" style><body data-adframeid=\'' + m.id + "' style='margin:0;padding:0;'>" + V + "<div id='crisp_adDiv'> </div></body></html>"), L._iframeDocument.close(), L._iframeWindow.p = L._iframeWindow.adParams = y.pp, L._iframeWindow.adFrame = m, L._iframeWindow.phase = W, L.bannerIframe = m, L.adParams = y, L.closeBannerId = "crisp_close_banner__" + y.adID, L.closePanelId = "crisp_close_panel__" + y.adID, _cjq.AdManager.addCrispAd(y.adID, L), L.isAdhesion !== !0 || "undefined" != typeof crispPgClient && crispPgClient.props && crispPgClient.props.forceCpnAdhesion || _cjq.AdhesionCradle && _cjq.AdhesionCradle.initializeAdhesion(L);
                    var d = [{
                        path: U,
                        targetDoc: L._iframeDocument
                    }];
                    for (X === !0 && d.push({
                        path: _previewjslocation,
                        targetDoc: L._iframeDocument
                    }), v = 0; v < d.length; v++) {
                        _cjq._u.includeJS(d[v])
                    }
                    if (L.isAdhesion && _cjq._u.outputCss(q, L._iframeDocument), !_cjq.AdManager.addedEvents) {
                        if (_cjq.AdManager.addedEvents = !0, window.addEventListener("orientationchange", function(o) {
                            var l = _cjq.AdManager.getAllCrispAd();
                            if (l) {
                                for (var A in l) {
                                    l.hasOwnProperty(A) && l[A].handleOrientationChangeForCrispAd(o)
                                }
                            }
                        }), "lightbox" === y.pp.panelType && r && window.addEventListener("orientationchange", function(n) {
                            var l = E.getPanelIframe();
                            "block" === l.style.display && (l.style.display = "none", setTimeout(function() {
                                l.style.display = "block", E.resizeLightbox()
                            }, 700))
                        }), window.addEventListener("scroll", function(n) {
                            var l = _cjq.AdManager.getCrispAd();
                            l.adscroller || B(n)
                        }), _cjq._u.bind("cac_banner_iframe_resize", function(Z, A) {
                            var aa, o, T, l;
                            A && (aa = A.width, o = A.height, T = A.adframeid ? A.adframeid : L.adId, l = _cjq.AdManager.getCrispAd(T), l.setDimensionsToBannerFrame("resize", aa, o))
                        }), _cjq._u.bind("addCrispBannerCloseButton", function(al, ae) {
                            if (!_caf.zp || !_caf.zp.mraid) {
                                var ah, ab = _cjq.AdManager.getCrispAd(ae.adframeid),
                                    ao = ae[0],
                                    ac = ae[1],
                                    am = ae[2],
                                    aa = ae[3],
                                    an = ae[4],
                                    ag = ae[5],
                                    Z = ab.closeBannerId,
                                    aj = ["<a href=\"javascript:_cjq.AdEngine.removeCrispAd('", ao, "','", ag, "','", aa, "', 'close and hide');\"", ' ontouchstart="return false;" ontouchend="_cjq.AdEngine.removeCrispAd(\'', ao, "','", ag, "','", aa, "', 'close and hide');\"", ' target="_self" style="background:none !important;color: inherit;text-decoration: inherit;">', '<div style="width:100%; height:100%;">', '<img id="', Z, '_img" src="', ac, '" style="vertical-align:top;border:none;width:100%;height:100%;" alt="close ad" />', "</div>", "</a>"].join(""),
                                    ak = document.getElementById(ab.closeBannerId),
                                    ai = ab.getBannerIframe(),
                                    af = ai && ai.contentWindow && ai.contentWindow._cjq;
                                if (ab && ai) {
                                    try {
                                        if (!af) {
                                            return !1
                                        }
                                        var ap = af.crispAdFramework.getAdDefProperty(ao, an, "displayStage"),
                                            T = ab.phaseToStageMap[ap][0],
                                            A = ai && ai.contentWindow && ai.contentWindow.phase;
                                        return parseInt(T, 10) !== parseInt(A, 10) ? !1 : (ak ? (ak.style.cssText = am, ab.showHideCloseButton(ak, "banner", "hide")) : (ak = document.createElement("div"), ak.id = ab.closeBannerId, ak.innerHTML = aj, ak = ai.parentNode.appendChild(ak), ak.style.cssText = am, ab.closeBannerLeft = parseInt(ak.style.left, 10), ab.closeBannerRight = parseInt(ak.style.right, 10), ab.closeBannerTop = parseInt(ak.style.top, 10), ab.showHideCloseButton(ak, "banner", "hide"), _cjq._u.trigger("crispBannerCloseButtonAdded", {
                                            ele: ak,
                                            id: an,
                                            adframeid: ae.adframeid
                                        })), ah = ak && ak.querySelector("img"), ah && ah.style && (ah.style.webkitBackfaceVisibility !== z ? ah.style.webkitBackfaceVisibility = "hidden" : ah.style.backfaceVisibility !== z && (ah.style.backfaceVisibility = "hidden")), E.emptyCloseBannerDiv(an, "banner"), ak)
                                    } catch (al) {
                                        console.error(al)
                                    }
                                }
                            }
                        }), _cjq._u.bind("crispBannerCloseButtonAdded", function(A, o) {
                            var T = o && o.ele,
                                l = _cjq.AdManager.getCrispAd(o.adframeid);
                            if (!T) {
                                return !1
                            }
                            try {
                                return l._iframeWindow._cjq.crispAdFramework.trigger("crispBannerCloseButtonAdded", o), l.closeBanner = T, _cjq._u.bind("cac_panel_action", function(ac, aa) {
                                    var ae, Z, ab;
                                    aa && aa.params && aa.params.adId && (ae = _cjq.AdManager.getCrispAd(aa.params.adId)), ae && (Z = document.getElementById(ae.closeBannerId), Z && (aa && aa.action && "open" === aa.action ? ab = "hide" : (ab = "show", ae.handleOrientationChangeForClose(ac, aa), ae.resizeCloseBanner()), "hide" === ab ? ae.adProps.isInterstitial !== !0 && ae.showHideCloseButton(Z, "banner", ab) : ae.showHideCloseButton(Z, "banner", ab)))
                                }), l.isAdExpanded() || (l.showHideCloseButton(T, "banner", "show"), l.resizeCloseBanner()), T
                            } catch (A) {
                                console.log(A)
                            }
                        }), _cjq._u.bind("addCrispPanelCloseButton", function(af, Z) {
                            var ab, A = _cjq.AdManager.getCrispAd(Z.adframeid),
                                ai = (Z[0], Z[1]),
                                T = Z[2],
                                ag = (Z[3], Z[4]),
                                ak = Z[5],
                                ah = A.closePanelId,
                                aa = "<a href=\"javascript:_cjq.AdEngine.closeCrispPanel('" + ak + '\');" ontouchstart="return false;" ontouchend="_cjq.AdEngine.closeCrispPanel(\'' + ak + '\');" target="_self" style="background:none !important;color: inherit;text-decoration: inherit;"><div style="width:100%; height:100%;"><img id="' + ah + '_img" src="' + ai + '" style="border:none;width:100%;height:100%;" alt="close ad" /></div></a>',
                                aj = document.getElementById(A.closePanelId),
                                ac = A.getPanelIframe(),
                                ae = ac && ac.contentWindow && ac.contentWindow._cjq;
                            if (!(!A || A.adP && A.adP.pp && "adhesion" !== A.adP.pp.bannerType)) {
                                try {
                                    return ae ? (aj ? (aj.style.cssText = T, aj.style.zIndex = "inherit", aj.style.position = "absolute", E.showHideCloseButton(aj, "panel", "hide")) : (aj = document.createElement("div"), aj.id = A.closePanelId, aj.innerHTML = aa, aj = ac.parentNode.appendChild(aj), aj.style.cssText = T, aj.style.zIndex = "inherit", A.closePanelLeft = parseInt(aj.style.left, 10), A.closePanelTop = parseInt(aj.style.top, 10), A.showHideCloseButton(aj, "panel", "hide"), _cjq._u.trigger("crispPanelCloseButtonAdded", {
                                        ele: aj,
                                        id: ag,
                                        adframeid: ak
                                    })), ab = aj && aj.querySelector("img"), ab && ab.style && (ab.style.webkitBackfaceVisibility !== z ? ab.style.webkitBackfaceVisibility = "hidden" : ab.style.backfaceVisibility !== z && (ab.style.backfaceVisibility = "hidden")), aj) : !1
                                } catch (af) {
                                    console.error(af)
                                }
                            }
                        }), _cjq._u.bind("crispPanelCloseButtonAdded", function(A, o) {
                            var T = o && o.ele,
                                l = _cjq.AdManager.getCrispAd(o.adframeid);
                            if (!T) {
                                return !1
                            }
                            try {
                                return l._expandedIframeWindow && l._expandedIframeWindow._cjq.crispAdFramework.trigger("crispPanelCloseButtonAdded", o), l.closePanel = T, _cjq._u.bind("cac_panel_action", function(ac, aa) {
                                    var Z, ab, n;
                                    aa && aa.params && aa.params.adId && (Z = _cjq.AdManager.getCrispAd(aa.params.adId)), Z && (n = Z.closePanelId, n && document.getElementById(n) && (T = document.getElementById(n), aa && aa.action && "open" === aa.action ? (ab = "show", Z.handleOrientationChangeForClosePanel()) : (ab = "hide", Z.showHideCloseButton(T, "panel", ab))))
                                }), l.isAdExpanded() && l.showHideCloseButton(T, "panel", "show"), T
                            } catch (A) {
                                console.log(A)
                            }
                        }), _cjq._u.bind("cac_gotostage", L.handleGotoStage), _cjq._u.bind("cac_ad_rendered", function(A, n) {
                            if ("zonetag" === E.tagType && y && ("false" !== y.pp.useCrispkey || y.pp.useCrispkey === z)) {
                                var o = document.createElement("img"),
                                    l = x.getCrispkey();
                                o.src = "http://tags.bluekai.com/site/23284?id=" + l
                            }
                        }), _cjq._u.bind("cac_ad_rendered", function(aa, ae) {
                            try {
                                var T, Z, l = (ae[1], ae[2]);
                                if (_cjq.AdManager.getCrispAd(l) && (T = _cjq.AdManager.getCrispAd(l)), !T) {
                                    return
                                }
                                if ("undefined" != typeof $sf) {
                                    try {
                                        var ac = T.getBannerDims("height", T.adProps),
                                            A = T.getBannerDims("width", T.adProps);
                                        ac && A && (_cjq.CrispSafeFrame ? _cjq.CrispSafeFrame.registerAd(ac, A) : console.log("Missing Safe frames module."))
                                    } catch (ab) {
                                        console.log("-- Exception or no safeframes available: " + ab.message)
                                    }
                                } else {
                                    console.log(" No Safeframes ")
                                }
                                Z = T.getIFrame(l), Z && (ae.frame = Z), T.pushdownInterstitial && setTimeout(function() {
                                    T.handleInviewScroller(T)
                                }, 500);
                                var af = _cjq._u.debounce(function() {
                                    T.MRC.checkViewabilityFromEvent(aa, ae)
                                }, 750, !0);
                                if (af(), setTimeout(function() {
                                    T.MRC.checkViewabilityFromEvent(aa, ae)
                                }, 1000), l.indexOf("cacPanelIframe") > -1) {
                                    return
                                }
                                T.handleInViewCrispAd(aa, ae)
                            } catch (ab) {
                                console.log(ab)
                            }
                        }), _cjq._u.bind("cac_track_first_action", function(T, o) {
                            try {
                                var Z = _cjq.AdManager.getAllCrispAd();
                                if (Z) {
                                    for (var l in Z) {
                                        Z.hasOwnProperty(l) && Z[l] && (o || (o = {}), o.pixelsOnly = !0, Z[l].trackingData && (Z[l].trackingData.hadFirstAction = !0), Z[l].MRC && Z[l].MRC.checkViewabilityFromEvent(T, o))
                                    }
                                }
                            } catch (A) {
                                console.log(A)
                            }
                        }), _cjq._u.bind("cac_panel_action", function(n, l) {
                            l && "open" === l.action
                        }), _cjq._u.bind("cac_ad_removed", function(A, o) {
                            try {
                                var T = _cjq.AdManager.getAllCrispAd();
                                if (T) {
                                    for (var l in T) {
                                        T.hasOwnProperty(l) && T[l] && T[l].MRC && T[l].MRC.handleBannerClose(A, o)
                                    }
                                }
                            } catch (A) {
                                console.log(A)
                            }
                        }), _cjq._u.bind("cac_banner_close", function(A, o) {
                            try {
                                var T = _cjq.AdManager.getAllCrispAd();
                                if (T) {
                                    for (var l in T) {
                                        T.hasOwnProperty(l) && T[l] && T[l].MRC && T[l].MRC.handleBannerClose(A, o)
                                    }
                                }
                            } catch (A) {
                                console.log(A)
                            }
                        }), _cjq._u.bind("cac_mrc_viewable", function(A, o) {
                            try {
                                var T = _cjq.AdManager.getAllCrispAd();
                                if (T) {
                                    for (var l in T) {
                                        T.hasOwnProperty(l) && T[l] && T[l].MRC && T[l].MRC.handleViewable(A, o)
                                    }
                                }
                            } catch (A) {
                                console.log(A)
                            }
                        }), window.addEventListener("orientationchange", function(o) {
                            try {
                                var l = _cjq.AdManager.getAllCrispAd();
                                if (l) {
                                    for (var A in l) {
                                        l.hasOwnProperty(A) && l[A] && l[A].MRC && l[A].MRC.checkViewabilityFromEvent(o)
                                    }
                                }
                            } catch (o) {
                                console.log(o)
                            }
                        }), window.addEventListener("scroll", function(o) {
                            try {
                                var l = _cjq.AdManager.getAllCrispAd();
                                if (l) {
                                    for (var A in l) {
                                        l.hasOwnProperty(A) && l[A].rendered && (l[A].handleInViewCrispAd(o), l[A].MRC.checkViewabilityFromEvent(o))
                                    }
                                }
                            } catch (o) {
                                console.log(o)
                            }
                        }), window.addEventListener("scroll", function(T) {
                            try {
                                var o = _cjq.AdManager.getAllCrispAd();
                                if (o) {
                                    for (var Z in o) {
                                        if (o.hasOwnProperty(Z)) {
                                            var l = o[Z],
                                                A = (l.getBannerIframe(), l.MRC.checkPos(l.getBannerIframe().parentNode, 1));
                                            if (A && l.adscroller && 1 != l.adSizeOnly && !l.setHeightOnce) {
                                                l.setHeightToScrollContainer(window.innerHeight, window.orientation);
                                                continue
                                            }
                                            if (!l.pushdownInterstitial) {
                                                continue
                                            }
                                            A === !0 && (l.isAdExpanded() || (l.expandScroller(), l.scrollerExpand = !0, setTimeout(function() {
                                                l.scrollerExpand = !1
                                            }, 2000))), l.isInView = A
                                        }
                                    }
                                }
                            } catch (T) {
                                console.log(T)
                            }
                        }), window.addEventListener("touchend", function(o) {
                            try {
                                var l = _cjq.AdManager.getAllCrispAd();
                                if (l) {
                                    for (var A in l) {
                                        l.hasOwnProperty(A) && l[A].MRC.handleTouchEnd(o)
                                    }
                                }
                            } catch (o) {
                                console.log(o)
                            }
                        }), _cjq._u.bind("cac_panel_action", function(o, A) {
                            if (window.mraid !== z && (E.isLightBoxAd() || E.isStandardPanelAd()) && E.isAdExpanded()) {
                                var l = E.getPanelIframe();
                                l.style.opacity = 0, setTimeout(function() {
                                    E.resizeLightbox(), l.style.opacity = 1
                                }, 100)
                            }
                        }), _cjq._u.bind("cac_panel_close", function(o, l) {
                            var A = document.getElementById(E.closeBannerId);
                            if (A && (L.resizeCloseBanner(), E.showHideCloseButton(A, "banner", "show")), !E.isStandardPanelAd()) {
                                try {
                                    E._iframeWindow._cjq.crispAdFramework.trigger("cac_panel_action", [E._iframeWindow._cjq.crispAdFramework.trackerkey, "close", l])
                                } catch (o) {
                                    console.log(o)
                                }
                            }
                        }), _cjq._u.bind("cac_panel_expand", function(Z, A) {
                            var aa = document.getElementById(L.closeBannerId),
                                o = E._expandedIframeWindow,
                                T = o && o._cjq,
                                l = T && T.crispAdFramework;
                            if (aa && E.showHideCloseButton(aa, "banner", "hide"), !E.isStandardPanelAd()) {
                                try {
                                    l && l.trigger("cac_panel_action", [l.trackerkey, "open", A])
                                } catch (Z) {
                                    console.log(Z)
                                }
                            }
                        }), _cjq._u.bind("cac_banner_close", function(n, l) {
                            return E.handleRemoveCrispAd(n, l), !0
                        }), _cjq._u.bind("createPanelIframe", function(n, l) {
                            E.createPanelIframe(n, l)
                        }), L.containerDiv.onload && _cjq._u.bind("cac_ad_rendered", function(Z, A) {
                            function aa(ab) {
                                if (ab) {
                                    var n = ab.containerDiv;
                                    return n ? void(n && (n.style.visibility = "hidden")) : !1
                                }
                            }
                            try {
                                var o, T = (A[1], A[2]);
                                if (T.indexOf("cacPanelIframe") > -1) {
                                    return
                                }
                                _cjq.AdManager.getCrispAd(T) && (o = _cjq.AdManager.getCrispAd(T)), aa(o)
                            } catch (l) {
                                console.log(l)
                            }
                        }), !L.getBannerIframe()) {
                            return
                        }
                        "lightbox" === L.bannerType && (L.getBannerIframe().style.width = window.innerWidth + "px", L.getBannerIframe().style.height = window.innerHeight + "px", L.getBannerIframe().parentNode.style.width = window.innerWidth + "px"), _cjq._u.bind("crisp_exit_full_screen_video", function(A, o) {
                            var T = E,
                                l = "";
                            o.frameId && (l = o.frameId, T = _cjq.AdManager.getCrispAd(l)), o.adId = T.adId, (T.adProps.isInterstitial || (T.isLightBoxAd() || T.isStandardPanelAd()) && l.indexOf("cacPanelIframe") > -1) && (o.action = "expand", setTimeout(function() {
                                E.handleLightBox(A, o)
                            }, 1000))
                        }), _cjq._u.bind("cac_ad_rendered", function(ab, ag) {
                            try {
                                if (!ag || ag.length < 3) {
                                    return
                                }
                                var Z, A, ae, T, ah = ag[1],
                                    ac = ag[2],
                                    aa = L.isAdExpanded();
                                if (ac.indexOf("cacPanelIframe") > -1) {
                                    return
                                }
                                if (_cjq.AdManager.getCrispAd(ac) && (T = _cjq.AdManager.getCrispAd(ac)), !T) {
                                    return
                                }
                                T.adProps = ah;
                                var af = T._iframeWindow._cjq.crispAdFramework.getAdJson().definition;
                                T.phaseToStageMap = O(af), T.isAdhesion && !T.rendered && _cjq.AdhesionCradle ? (_cjq.AdhesionCradle.safeClick.initSafeClick(_caf, ah), _cjq.AdhesionCradle.resetPosition(ab), setTimeout(function() {
                                    _cjq.AdhesionCradle.resetPosition(ab);
                                    var l = _cjq._u.getHighestZindex();
                                    _cjq.AdhesionCradle.crispAd.getTopDiv(T.adId).style.zIndex = l
                                }, 1000)) : T.adscroller || T.pushdown || T.isAdhesion || (ae = T.getWrapperDiv(T.adId), A = T.getBannerDims("height", ah), Z = !!ae && J(ae.parentNode, "height"), ae && ae.style && !ae.style.height && A && (Z && parseInt(Z.style, 10) === parseInt(A, 10) && aa ? ae.style.height = "0px" : ae.style.height = A + "px"))
                            } catch (ab) {
                                console.log(" Err " + ab)
                            }
                            try {
                                T.initialize(ac, ah)
                            } catch (ab) {
                                console.log(" Init error " + ab)
                            }
                            T.rendered || (T.rendered = !0, !T.adProps || 1 != T.adProps.hideInLandscape && "true" !== T.adProps.hideInLandscape || (T.hideInLandscape(), setTimeout(function() {
                                T.hideInLandscape()
                            }, 1500)), setTimeout(function() {
                                T.handleOrientationChangeForBannerIframe();
                                var l = null;
                                E.isPreviewRequest() ? (l = "portrait", T.handleOrientationChangeForClose(ab, ag, l)) : (T.handleOrientationChangeForClose(ab, ag), T.resizeCloseBanner()), T.handleOrientationChangeForClosePanel()
                            }, 1200))
                        }), _cjq._u.bind("cac_create_panel_frame", function(aa, af) {
                            af || (af = {});
                            var T, Z = af.width,
                                l = af.height,
                                ae = af.adframeid,
                                A = af.panelType,
                                ab = af.isInterstitial,
                                ag = af.phase2Delivery,
                                ac = 300;
                            _cjq.AdManager.getCrispAd(ae) && (T = _cjq.AdManager.getCrispAd(ae)), Z && l || !T.adProps || (Z = T.adProps.expandedWidth, l = T.adProps.expandedHeight, A = T.panelType, ab = T.adProps.isInterstitial, ag = T.adProps.isThisPart2AdDelivery), ab === !0 && (ac = 100), T.createPanelIfameFlag(T.adId) && !ag && setTimeout(function() {
                                try {
                                    T.createExpandIframe(Z, l, A, T.adId)
                                } catch (n) {
                                    console.log(n)
                                }
                            }, ac)
                        }), _cjq._u.bind("expandcrispad", function(aa, T) {
                            var ac, A, Z, l, ab;
                            if (T && (ac = T.adId, _cjq.AdManager.getCrispAd(ac) && (A = _cjq.AdManager.getCrispAd(ac)), A.isLightBoxAd() || A.isStandardPanelAd())) {
                                if (Z = T && T.panelWin, l = T && T.bannerWin, ab = l._cjq && l._cjq.crispAdFramework && l._cjq.crispAdFramework.getHideDelay("banner"), Z && Z._cjq ? (Z._cjq.crispAdFramework.trigger("cac_call_showAndHide", T.params), Z._cjq.crispAdFramework.trigger("cac_on_banner_click", T.params)) : ! function() {
                                    var n = 0;
                                    _cjq._u.bind("handleFirsttimeLightbox", function(ah, af) {
                                        var ae, ag = T.params;
                                        if (af && af.length > 0 && (ae = _cjq.AdManager.getCrispAd(af[0])), Z = ae ? ae._expandedIframeWindow : E._expandedIframeWindow, af && af[1] && af[1].params && (ag = af[1].params), Z && Z._cjq) {
                                            Z._cjq.crispAdFramework.trigger("cac_on_first_banner_click", ag), Z._cjq.crispAdFramework.trigger("cac_call_showAndHide", ag), Z._cjq.crispAdFramework.trigger("cac_expand_banner", ag), Z._cjq.crispAdFramework.trigger("cac_on_banner_click", ag)
                                        } else {
                                            if (n >= 10) {
                                                return
                                            }
                                            n++, setTimeout(function() {
                                                _cjq._u.trigger("handleFirsttimeLightbox", [af[0], ag])
                                            }, 50)
                                        }
                                    })
                                }(), l && l._cjq && (l._cjq.crispAdFramework.trigger("cac_call_showAndHide", T.params), l._cjq.crispAdFramework.trigger("cac_on_banner_click", T.params)), A.isPreExpandable() || _cjq._u.deviceProps.isIOS) {
                                    if (A.pushdownInterstitial) {
                                        return
                                    }
                                    500 > ab && (ab = 500), !_cjq._u.deviceProps.isMobileOptimized() && 1000 > ab && (ab = 1000), A.pushdown === !0 ? setTimeout(function() {
                                        E.handleLightBox(aa, T)
                                    }, 10) : (setTimeout(function() {
                                        E.handleLightBox(aa, T)
                                    }, ab), setTimeout(function() {
                                        E.handleLightBox(aa, T, !0)
                                    }, ab + 1000))
                                } else {
                                    if (A.pushdownInterstitial) {
                                        return
                                    }
                                    E.handleLightBox(aa, T), setTimeout(function() {
                                        E.handleLightBox(aa, T)
                                    }, 500)
                                }
                                _cjq._u.isDesktopBrowser() && !A.pushdown && setTimeout(function() {
                                    document.body.style.overflow = "hidden"
                                }, 300)
                            }
                        }), _cjq._u.bind("collapsecrispad", function(T, o) {
                            var Z, l, A = T,
                                o = o;
                            o && (Z = o.adId, _cjq.AdManager.getCrispAd(Z) && (l = _cjq.AdManager.getCrispAd(Z)), _cjq._u.isDesktopBrowser() && !l.pushdown && setTimeout(function() {
                                document.body.style.overflow = "auto"
                            }, 300), (l.isLightBoxAd() || l.isStandardPanelAd()) && setTimeout(function(aa, ab) {
                                return function() {
                                    E.handleLightBox(T, ab)
                                }
                            }(A, o), 200))
                        }), _cjq._u.bind("cac_lightbox_collapsed", function(Z, A) {
                            var aa, o;
                            if (A && (aa = A.adId, _cjq.AdManager.getCrispAd(aa) && (o = _cjq.AdManager.getCrispAd(aa)), o.isLightBoxAd() || o.isStandardPanelAd())) {
                                var T = A && A.panelWin,
                                    l = A && A.bannerWin;
                                l && l._cjq && (l._cjq.crispAdFramework.trigger("cac_call_showAndHide", A.params), l._cjq.crispAdFramework.trigger("cac_run_showeffects"), l._cjq.crispAdFramework.trigger("cac_collapse_banner", A.params)), T && T._cjq && (T._cjq.crispAdFramework.trigger("cac_call_showAndHide", A.params), T._cjq.crispAdFramework.trigger("cac_collapse_banner", A.params))
                            }
                        }), L.isAdhesion || (_cjq._u.bind("cac_ad_rendered", function(T, o) {
                            try {
                                var Z = (o[1], o[2]),
                                    l = Z.substr("cmAdFrame__".length);
                                E.bringPanelIntoFocus(T, l)
                            } catch (A) {
                                console.log(A)
                            }
                        }), _cjq._u.bind("cac_panel_action", function(n, l) {
                            l && "open" === l.action && (l.params && l.params.adId ? setTimeout(function() {
                                E.bringPanelIntoFocus(n, l.params.adId)
                            }, 10) : setTimeout(function() {
                                E.bringPanelIntoFocus(n)
                            }, 10))
                        }), window.addEventListener("orientationchange", function(n) {
                            var l = 0;
                            /android/i.test(navigator.userAgent) && (l = 500), setTimeout(function() {
                                E.bringPanelIntoFocus(n)
                            }, l)
                        }))
                    }
                    if (_caf && _caf.tp) {
                        for (var e in _caf.tp) {
                            _caf.tp.hasOwnProperty(e) && (L._iframeWindow.adParams[e] = _caf.tp[e])
                        }
                    }
                    return !0
                } catch (g) {
                    console.error(g)
                }
                return !1
            };
            L.ifrmProps = {}, L.runBannerClickCount = 0, L.getWrapperDiv = function() {
                var f, d = L.containerDiv;
                return d && (f = d.parentNode), f ? f : !1
            }, L.expandScroller = function() {
                var d = {};
                d.adId = L.adId, d.action = "expand", L.firstExpand || (L.firstExpand || (L.firstExpand = !0), setTimeout(function() {
                    _cjq.AdEngine.handleLightBox(event, d), L.getPanelIframeContainer()
                }, 100))
            }, L.collapseScroller = function() {
                var d = {};
                d.adId = L.adId, d.action = "close", setTimeout(function() {
                    _cjq.AdEngine.handleLightBox(event, d)
                }, 1000)
            }, L.handleOrientationChangeForCrispAd = function(v) {
                if (L.adProps && L.getBannerIframe()) {
                    var U, h = (L.adProps, _cjq._u.getWinProps(window)),
                        p = L.getBannerIframe(),
                        f = 500,
                        A = _cjq._u.deviceProps.isMobileOptimized(),
                        g = L.isPreviewRequest(),
                        w = L.isAdhesionStretched(),
                        V = "portrait",
                        y = 10;
                    if (setTimeout(function() {
                        if (L.adProps, L.isAdhesion && _cjq.AdhesionCradle) {
                            _cjq._u.orientationhandling = !0, _cjq.AdhesionCradle.resetPosition(), _cjq.AdhesionCradle.watchDogShow(1, 100);
                            var d = _cjq._u.getHighestZindex();
                            L.getTopDiv().style.zIndex = d
                        }
                    }, y), (L.isLightBoxAd() || L.isStandardPanelAd()) && (L.getPanelIframe(), setTimeout(function() {
                        L.resizeLightbox(), V = _cjq._u.deviceProps.orientationmode(), U = _cjq._u.getZoomFactor(), w === !0 && "landscape" !== V && E.isPreviewRequest() !== !0 && (U = L.getStretchableScale()), (w === !0 || U && 1 !== U && !A && !g) && (_cjq.InApp || _cjq._u.isDesktopBrowser() || E.triggerIfr(L.adId, "panel", "cac_lightbox_zoomed", {
                            scale: U,
                            props: L.adProps
                        })), L.handleOrientationChangeForClosePanel(v)
                    }, f)), "lightbox" === L.bannerType && (null === h ? setTimeout(function() {
                        _cjq._u.getWinProps(window), p && _cjq._u.css.setWidth(p.parentNode, "100%")
                    }, 300) : L.getBannerIframe() && _cjq._u.css.setWidth(L.getBannerIframe().parentNode, h && h.width), L.getPanelIframe() && (null === h ? setTimeout(function() {
                        var d = _cjq._u.getWinProps(window);
                        _cjq._u.css.setWidth(L.getPanelIframe(), d && d.width)
                    }, 100) : _cjq._u.css.setWidth(L.getPanelIframe(), h && h.width))), L.adscroller) {
                        var m = _cjq.AdUtils.deviceProps.width(),
                            T = _cjq.AdUtils.deviceProps.height();
                        E.isPreviewRequest() && (m = window.innerWidth, T = window.innerHeight), L.adProps.expandedHeight > T && (T = L.adProps.expandedHeight), L.adProps.expandedWidth > m && (m = L.adProps.expandedWidth), L.adSizeOnly && (T = L.adProps.expandedHeight + 35), L.setadscrollerFrames(m, T, window.orientation)
                    }
                    window.location.origin, L._iframeWindow && L._iframeWindow.postMessage({
                        orientation: window.orientation,
                        message: "orientationchange"
                    }, "*"), L._expandedIframeWindow && L._expandedIframeWindow.postMessage({
                        orientation: window.orientation,
                        message: "orientationchange"
                    }, "*"), !L.adProps || 1 != L.adProps.hideInLandscape && "true" !== L.adProps.hideInLandscape || (L.hideInLandscape(), setTimeout(function() {
                        L.hideInLandscape()
                    }, 1000))
                }
            }, L.isCornerAdhesion = function() {
                var d = "none";
                return L.zp && L.zp.adhesion && L.zp.adhesion.cornerAdhesion && (d = L.zp.adhesion.cornerAdhesion), d
            }, L.isAdhesionStretched = function() {
                var d = !1;
                return L.zp && L.zp.adhesion && L.zp.adhesion.stretch && (d = L.zp.adhesion.stretch), d = "true" === d || d === !0
            }, L.setHeightToScrollContainer = function(h, f) {
                if (0 == Math.abs(f)) {
                    L.adProps.expandedHeight > h && (h = L.adProps.expandedHeight);
                    var l = document.getElementById("iframePanelContainerDiv__" + L.adId),
                        d = document.defaultView.getComputedStyle(l, null).getPropertyValue("height");
                    d = parseInt(d, 10);
                    var g = document.getElementById("cacPanelIframe__" + L.adId);
                    h > d && (l.style.height = h + "px", l.parentNode.style["min-height"] = h + "px", g.style.height = h + "px", L.setHeightOnce = !0)
                }
            }, L.setadscrollerFrames = function(h, f, l) {
                var d = document.getElementById("iframePanelContainerDiv__" + L.adId);
                h = h, d && (d.style.display = "none", d.style.width = h + "px", d.style.height = f + "px", 90 === Math.abs(l) ? setTimeout(function() {
                    d.style.display = "block"
                }, 500) : d.style.display = "block"), d && d.parentNode && (d.parentNode.style["min-height"] = f + "px");
                var g = document.getElementById("cacPanelIframe__" + L.adId);
                g && (g.style.width = h + "px", g.style.height = f + "px")
            }, L.setDimensionsToBannerFrame = function(l, g, m) {
                var f = L.getBannerIframe(),
                    h = g,
                    d = m;
                f && (L._iframeWindow._cjq.crispAdFramework.resizeBanner = !0, f.style.setProperty("width", h + "px"), f.style.setProperty("height", d + "px"), f.parentNode.style.width = h + "px", f.parentNode.style.height = d + "px", setTimeout(function() {
                    L._iframeWindow._cjq.crispAdFramework.resizeBanner = !1
                }, 1000))
            }, L.handleOrientationChangeForBannerIframe = function(l, g, p) {
                if (!L.isAdExpanded() && L.getBannerIframe() && L.getBannerIframe()) {
                    g || (g = E.isPreviewRequest() || "undefined" != typeof _crispPreviewRequest && _crispPreviewRequest === !0 ? "portrait" : _cjq._u.deviceProps.orientationmode());
                    var f = L.adProps;
                    if (f && f.collapsedHeight) {
                        var h = L.getBannerIframe(),
                            d = E.getBannerDims("width", f, g),
                            m = E.getBannerDims("height", f, g);
                        h.style.setProperty("width", d + "px"), h.style.setProperty("height", m + "px"), h.parentNode.style.width = d + "px", h.parentNode.style.height = m + "px", L.isAdhesion && _cjq.AdhesionCradle && _cjq.AdhesionCradle.resetPosition()
                    }
                }
            }, L.handleOrientationChangeForClosePanel = function(m, h) {
                var u, g, l = document.getElementById(L.closePanelId),
                    f = _cjq._u.getZoomFactor(),
                    s = _cjq._u.deviceProps.isMobileOptimized(),
                    p = L.isAdhesionStretched();
                g = _cjq._u.deviceProps.orientationmode(), "landscape" === g && (p = !1), l && (h && (g = h), u = L.getCloseDivCss("panelclose"), "landscape" === g ? l.style.cssText = l.style.cssText + ";" + u.landscape : l.style.cssText = u.portrait, L.isAdExpanded() ? (s || _cjq._u.isDesktopBrowser() ? p === !0 ? (f = L.getStretchableScale(), L._expandedIframeWindow._cjq.crispAdFramework.trigger("cac_position_panel_close", {
                    id: L.closePanelId,
                    scale: f
                })) : L._expandedIframeWindow._cjq.crispAdFramework.trigger("cac_position_panel_close", {
                    id: L.closePanelId
                }) : L._expandedIframeWindow._cjq.crispAdFramework.trigger("cac_position_panel_close", {
                    id: L.closePanelId,
                    scale: f
                }), l.style.zIndex = "inherit", l.style.position = "absolute") : E.showHideCloseButton(l, "panel", "hide"))
            }, L.getCssProps = function(g, f) {
                var h = new RegExp(f + ":\\s?(-?\\d+).*?"),
                    d = h.exec(g);
                return d && 2 === d.length ? d[1] : void 0
            }, L.handleOrientationChangeForClose = function(l, g, p) {
                var f, h, d = document.getElementById(L.closeBannerId);
                if (d) {
                    if (f = _cjq._u.deviceProps.orientationmode(), p && (f = p), h = L.getCloseDivCss("bannerclose"), "landscape" === f ? d.style.cssText = d.style.cssText + ";" + h.landscape : d.style.cssText = h.portrait, L.isAdExpanded()) {
                        L.showHideCloseButton(d, "banner", "hide")
                    } else {
                        var m = document.getElementById("cmAdFrame__" + L.adId);
                        !isNaN(m.offsetLeft), L.showHideCloseButton(d, "banner", "show")
                    }
                    E.isPreviewRequest() || L.resizeCloseBanner()
                }
            }, L.initialize = function(l, g) {
                var m = _cjq.AdManager.getCrispAd(l),
                    f = document.getElementById(l);
                if (!(l.indexOf("cacPanelIframe__") > -1)) {
                    L.adinstanceid = g.trackerkey, L.ifrmProps[g.trackerkey] = g;
                    var h = m.getBannerDims("width", g) || g.collapsedWidth,
                        d = m.getBannerDims("height", g) || g.collapsedHeight;
                    f.style.setProperty("width", h + "px"), f.style.setProperty("height", d + "px")
                }
            }, L.resize = function(g, f, h) {
                var d = _cjq.AdManager.getCrispAd(h);
                d && d.isLightBoxAd() && setTimeout(function() {
                    d.resizeLightbox(g)
                }, 500)
            }, L.createPanelIfameFlag = function(d) {
                return L.showPanelFirstime || (L.showPanelFirstime = {}), L.showPanelFirstime[d] ? !1 : (L.showPanelFirstime[d] = !0, !0)
            }, L.hideInLandscape = function(f) {
                var d = _cjq._u.deviceProps.orientationmode();
                "landscape" === d ? L.isAdExpanded() ? L.getPanelIframeContainer() ? L.getPanelIframeContainer().style.display = "none" : (L.getTopDiv() && (L.getTopDiv().style.display = "none"), E.getPanelBGDiv() && (E.getPanelBGDiv().style.display = "none")) : L.getTopDiv() && (L.getTopDiv().style.display = "none") : L.isAdExpanded() ? L.getPanelIframeContainer() ? L.getPanelIframeContainer().style.display = "block" : (L.getTopDiv() && (L.getTopDiv().style.display = "block"), E.getPanelBGDiv() && (E.getPanelBGDiv().style.display = "block")) : L.getTopDiv() && (L.getTopDiv().style.display = "block")
            }, L.triggerIfr = function(h, f, l, d) {
                try {
                    return "string" == typeof h && (h = L.getIFrame(h, f)), h.contentWindow && h.contentWindow._cjq ? (h.contentWindow._cjq.crispAdFramework.trigger(l, d), !0) : !1
                } catch (g) {
                    console.log(g)
                }
            }, L.onScroll = function(f, d) {}, L.getCloseDivCss = function(f) {
                try {
                    return "panelclose" === f ? (L.closePanelDivCss || (L.closePanelDivCss = L._expandedIframeWindow._cjq.crispAdFramework.getCloseDivCss(f)), L.closePanelDivCss) : (L.closeBannerDivCss || (L.closeBannerDivCss = L._iframeWindow._cjq.crispAdFramework.getCloseDivCss(f)), L.closeBannerDivCss)
                } catch (d) {
                    console.log(d)
                }
            }, L.getBannerDims = function(m, w, h) {
                var l, f, v, g, p = parseInt(w.collapsedWidth, 10),
                    y = parseInt(w.collapsedHeight, 10);
                l = _cjq._u.deviceProps.orientationmode(), h && (l = h);
                try {
                    "landscape" === l && (f = parseInt(w.landscapeWidth, 10), v = parseInt(w.landscapeHeight, 10), f > 1 && (p = f), v > 1 && (y = v))
                } catch (u) {
                    console.log(u)
                }
                return g = p, "height" === m && (g = y), g
            }, L.emptyCloseBannerDiv = function(f, d) {
                try {
                    return "panel" === d ? L._expandedIframeWindow._cjq.crispAdFramework.emptyCloseBannerDiv(f) : L._iframeWindow._cjq.crispAdFramework.emptyCloseBannerDiv(f)
                } catch (g) {}
            }, L.handleEffectsForCloseButton = function(g, f, h) {
                try {
                    if ("panel" === f && L._expandedIframeWindow && L._expandedIframeWindow._cjq.crispAdFramework && L._expandedIframeWindow._cjq.crispAdFramework.handleEffectsForCloseButton) {
                        return L._expandedIframeWindow._cjq.crispAdFramework.handleEffectsForCloseButton(g, "panel", h)
                    }
                    if (L._iframeWindow && L._iframeWindow._cjq.crispAdFramework && L._iframeWindow._cjq.crispAdFramework.handleEffectsForCloseButton) {
                        return L._iframeWindow._cjq.crispAdFramework.handleEffectsForCloseButton(g, "banner", h)
                    }
                } catch (d) {}
            }, L.showHideCloseButton = function(g, f, h) {
                if (!g || !g.style) {
                    return !1
                }
                try {
                    return L.handleEffectsForCloseButton(g, f, h), "show" === h && "block" !== g.style.display ? g.style.display = "block" : "hide" === h && "none" !== g.style.display && (g.style.display = "none"), g
                } catch (d) {}
            }, L.runBannerClickScript = function(f, d) {
                try {
                    L.runBannerClickCount++, d && d._cjq.crispAdFramework ? (d._cjq.crispAdFramework.runBannerClickScript(), L.runBannerClickCount = 0) : setTimeout(function() {
                        L.runBannerClickCount < 3 && L.runBannerClickScript(f, d)
                    }, 500)
                } catch (g) {}
            }, L.runClosePanelScript = function(f) {
                try {
                    f && f._cjq.crispAdFramework.runClosePanelScript()
                } catch (d) {
                    console.log(d)
                }
            }, L.getPanelBackgroudProp = function(f) {
                try {
                    return f._cjq.crispAdFramework.getPanelBackgroudProp()
                } catch (d) {}
            }, L.getScrollerProp = function(f) {
                try {
                    return null
                } catch (d) {}
            }, L.executeJsonFromPanelIframe = function(g, f) {
                try {
                    var h = g._cjq.crispAdFramework.getAdServiceJsonResponse();
                    return f._cjq.crispAdFramework.executeJsonFromPanelIframe(h)
                } catch (d) {
                    console.log(d)
                }
            }, L.cleanScriptForCopy = function(f) {
                try {
                    return f._cjq.crispAdFramework.cleanScriptForCopy()
                } catch (d) {}
            }, L.closeCrispPanel = function(m) {
                var h = _cjq.AdManager.getCrispAd(m),
                    u = h.getPanelClose(),
                    g = h.getPanelIframe(),
                    l = g && g.contentWindow,
                    f = l && u && l.document.querySelector("#" + u),
                    s = f.childNodes[1],
                    p = document.createEvent("MouseEvents");
                return p.initMouseEvent && (p.initMouseEvent("click", !0, !0, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), s.dispatchEvent(p)), !0
            }, L.getPanelClose = function() {
                try {
                    if (L._iframeWindow && L._iframeWindow._cjq && L._iframeWindow._cjq.crispAdFramework) {
                        return L._iframeWindow._cjq.crispAdFramework.getPanelClose()
                    }
                } catch (d) {
                    console.log(d)
                }
            }, L.getPanelIdInDom = function() {
                try {
                    if (L._iframeWindow && L._iframeWindow._cjq && L._iframeWindow._cjq.crispAdFramework) {
                        return L._iframeWindow._cjq.crispAdFramework.getPanelIdInDom()
                    }
                } catch (d) {
                    console.log(d)
                }
            }, L.getPanelContent = function() {
                try {
                    return L._iframeWindow._cjq.crispAdFramework.getPanelHtml()
                } catch (d) {
                    console.log(d)
                }
            }, L.isStandardPanelAd = function() {
                return "standard" === L.panelType
            }, L.handleInviewScroller = function(f) {
                var d = (f.getBannerIframe(), f.MRC.checkPos(f.getBannerIframe().parentNode, 1));
                d === !0 && (_cjq.AdEngine.expandScroller(), L.scrollerExpand = !0, setTimeout(function() {
                    f.scrollerExpand = !1
                }, 3000))
            }, L.isAdExpanded = function() {
                var f, d;
                try {
                    if (-1 === ["standard", "lightbox"].indexOf(L.panelType)) {
                        if (L._iframeWindow && L._iframeWindow._cjq && L._iframeWindow._cjq.crispAdFramework) {
                            return L._iframeWindow._cjq.crispAdFramework.isPanelOpen()
                        }
                    } else {
                        if (f = L.getPanelIframe(), !f) {
                            return !1
                        }
                        if (f.contentWindow && (d = f.contentWindow.document.getElementById("panelContainerDiv"), d && "none" === d.style.display)) {
                            return !1
                        }
                        if ("none" !== f.style.display) {
                            return !0
                        }
                    }
                    return !1
                } catch (g) {
                    return !1
                }
            }, L.isLightBoxAd = function() {
                return "lightbox" === L.panelType
            }, L.isPreExpandable = function() {
                return L.adProps ? L.adProps.isPreExpandable : void 0
            }, L.handleInViewCrispAd = function(l, s) {
                var g, h = null,
                    f = L._expandedIframeWindow,
                    p = L._iframeWindow,
                    m = "banner";
                h = L.getBannerIframe(), h && (p && p._cjq && (g = p._cjq.crispAdFramework), L.isAdExpanded() && (h = L.getPanelIframe(), f && f._cjq && (g = f._cjq.crispAdFramework, m = "panel")), h && g && (L.MRC.isInView(h) || L.isAdhesion ? g.crispBannerInview || (g.trigger("crisp_ad_inview", {
                    stage: m,
                    frameid: h.id
                }), g.crispBannerInview = !0) : (g.crispBannerInview || g.crispBannerInview == z) && (g.trigger("crisp_ad_outofview", {
                    stage: m,
                    frameid: h.id
                }), g.crispBannerInview = !1)))
            }, L.handleGotoStage = function(ac, Z) {
                var U, ag, W, ae, T, af, Y, t, ab = Z && Z.adframeid,
                    aa = Z && Z.stage,
                    X = Z && Z.params && Z.params[3],
                    ah = Z && Z.params && Z.params[6],
                    n = Z && Z.params && Z.params[5],
                    g = (E.iframes, _cjq._u.getOpenFrame(), null),
                    p = E.currentStage,
                    V = null;
                Y = _cjq.AdManager.getCrispAd(ab), p = Y.currentStage, Y.currentStage = aa, ab.indexOf("cmAdFrame__") > -1 && (t = ab.substr("cmAdFrame__".length), g = 1), ab.indexOf("cacPanelIframe__") > -1 && (t = ab.substr("cacPanelIframe__".length), g = 2), U = Y.phaseToStageMap, ag = aa && U && U[aa] && U[aa][0], Z.params.unshift(Z.trackerkey), ah && p && G(p, ah), X = X === z || "" === X ? !1 : parseInt(X, 10), ah = ah === z || "" === ah ? !1 : parseInt(ah, 10), X && ah ? X += ah : ah && !X && (X = ah), ag || "banner" !== aa || (ag = 1), Y.isPreExpandable() && 1 === parseInt(ag, 10) && (g = 2), g += "", ag += "", g !== ag ? (W = Y._expandedIframeWindow, ae = Y._iframeWindow, "2" === ag ? (_cjq._u.trigger("expandcrispad", {
                    trackerkey: Z.trackerkey,
                    action: "open",
                    stage: aa,
                    params: Z.params,
                    eventInfo: Z.eventInfo,
                    panelWin: W,
                    bannerWin: ae,
                    adId: t
                }), af = 10, W || (af = 1000), setTimeout(function() {
                    1 == n && "panel" === aa && Y.runBannerClickScript(Y._iframeWindow, Y._expandedIframeWindow)
                }, af)) : "1" === ag && (X ? (_cjq.AdManager.preExpTimeoutID = T = setTimeout(function() {
                    _cjq._u.trigger("collapsecrispad", {
                        trackerkey: Z.trackerkey,
                        action: "close",
                        stage: aa,
                        params: Z.params,
                        eventInfo: Z.eventInfo,
                        panelWin: W,
                        bannerWin: ae,
                        adId: t
                    })
                }, X + 300), _cjq._u.bind("cac_panel_rendered", function(f, d) {
                    var h = L.getIFrame(d.adframeid, "panel");
                    h && (h.contentWindow.addEventListener("click", function() {
                        L._iframeWindow._cjq.crispAdFramework.isPanelOpen() && clearTimeout(T)
                    }), h.contentWindow.addEventListener("touchstart", function() {
                        L._iframeWindow._cjq.crispAdFramework.isPanelOpen() && clearTimeout(T)
                    }))
                })) : _cjq._u.trigger("collapsecrispad", {
                    trackerkey: Z.trackerkey,
                    action: "close",
                    stage: aa,
                    params: Z.params,
                    eventInfo: Z.eventInfo,
                    panelWin: W,
                    bannerWin: ae,
                    adId: t
                }), "banner" === aa && Y.runClosePanelScript(Y._iframeWindow))) : ("1" === ag ? V = Y._iframeWindow : "2" === ag && (V = Y._expandedIframeWindow), V && (V._cjq.crispAdFramework.trigger("cac_call_showAndHide", Z.params), V._cjq.crispAdFramework.trigger("cac_run_showeffects"))), Y.currentStage = aa
            }, L.handleOrientationComplete = function(f, d) {
                E.isPreviewRequest() && d && d.length >= 2 ? (L.handleOrientationChangeForBannerIframe(f, d[1], "preview"), L.handleOrientationChangeForClose(f, d, d[1])) : (L.handleOrientationChangeForBannerIframe(), L.handleOrientationChangeForClose(f, d), L.handleOrientationChangeForClosePanel(f)), L.isAdhesion && _cjq.AdhesionCradle && _cjq.AdhesionCradle.resetPosition(), setTimeout(function() {
                    if (L.isAdExpanded() && d && !L.isStandardPanelAd() && !L.isLightBoxAd() && L.getBannerIframe()) {
                        try {
                            var h = (L.adProps, L.getBannerIframe()),
                                l = (d[1], d[2]);
                            d[3], l.width > 1 && l.height > 1 && (h.style.setProperty("width", l.width + "px"), h.style.setProperty("height", l.height + "px"), h.parentNode.style.width = l.width + "px", h.parentNode.style.height = l.height + "px")
                        } catch (g) {
                            console.log(g)
                        }
                    }
                }, 500)
            }, L.bringPanelIntoFocus = function(Y, af, A) {
                if (!L.pushdownInterstitial) {
                    var V, g, aa, y, Z, ag, U, v, ae, X, W = 0,
                        T = Number.MAX_VALUE,
                        ac = null,
                        ab = navigator.userAgent.toLowerCase(),
                        Z = (-1 !== ab.indexOf("ipad") || -1 !== ab.indexOf("iphone os 4"), _cjq.AdManager.getCrispAd(af));
                    if ("undefined" == typeof counter && (counter = 0), Z.isAdExpanded() && Z.isStandardPanelAd() && !Z.isAdhesion) {
                        if (Y && "scroll" === Y.type) {
                            return void window.scrollTo(0, L.scrollPos)
                        }
                        if (V = function() {
                            L.bringPanelIntoFocus(Y, af)
                        }, ag = Z.getTopDiv(af)) {
                            v = null, U = ag.offsetHeight + ag.offsetTop, U > W && (W = U), parseInt(ag.style.top, 10) < T && (T = parseInt(ag.style.top, 10)), counter = 0, ae = P(), W = Math.round(W), T = Math.round(T), g = ag, aa = 0;
                            do {
                                aa += g.offsetTop
                            } while (g = g.offsetParent);
                            X = aa, y = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop, W > 0 && (ac = W + X, ac > y + ae || A ? v = ae > W ? X + W - ae : X : y > X ? v = X : L.scrollPos = y), ac = T + X, y > ac || ac + W - T > y + ae ? v = W - T >= ae ? ac : X + W - ae : L.scrollPos = y, null !== v && (L.scrollPos = v, setTimeout(function() {
                                window.scrollTo(0, v)
                            }, 10), ae === P() || A || L.bringPanelIntoFocus(Y, af, !0))
                        }
                    }
                }
            }, L.getPanelIframeContainer = function(f) {
                var d = L.getPanelIframe(f);
                return d && d.parentNode ? d.parentNode : void 0
            }, L.getTopDiv = function(d) {
                return d ? document.getElementById("crispTopAdCradle__" + d) : document.getElementById("crispTopAdCradle__" + L.adId)
            }, L.getIFrame = function(f, d) {
                return f || (f = L.adId), "panel" === d && L.getPanelIframe(f) ? L.getPanelIframe(f) : L.getBannerIframe(f)
            }, L.getPanelIframe = function(d) {
                return d || (d = L.adId), d.indexOf("cacPanelIframe__") > -1 ? document.getElementById(d) : document.getElementById("cacPanelIframe__" + d)
            }, L.getBannerIframe = function(f) {
                if (f || (f = L.adId), !f) {
                    var d = document.getElementsByClassName("cmAdFrame"),
                        g = null;
                    if (!d || 0 === d.length) {
                        return
                    }
                    return g = d[0], L.adId = g.id, g
                }
                return f.indexOf("cmAdFrame__") > -1 ? document.getElementById(f) : document.getElementById("cmAdFrame__" + f)
            }, L.resizeLightbox = function(u) {
                if (!L.adscroller) {
                    var A, h = L.getPanelIframe(),
                        p = L.getBannerIframe(),
                        f = !!document.querySelector("body") && window.getComputedStyle(document.querySelector("body")),
                        y = f && parseInt(f.getPropertyValue("margin-left"), 10),
                        g = f && parseInt(f.getPropertyValue("padding-left"), 10),
                        v = 0,
                        T = _cjq._u.getZoomFactor(),
                        w = _cjq._u.getWinProps(window),
                        m = 250;
                    (y === !1 || isNaN(y)) && (y = 0), (g === !1 || isNaN(g)) && (g = 0), 1 !== T && (v = window.pageXOffset), h && "block" === h.style.display && (p && (p.style.display = "none", p.parentNode.style.display = "none", p.style.height = "0px"), h.style.display = "block", null === w ? setTimeout(function() {
                        var d = _cjq._u.getWinProps(window);
                        _cjq._u.css.setWidth(h, d && d.width), _cjq._u.css.setHeight(h, d && d.height)
                    }, m) : (_cjq._u.css.setWidth(h, w && w.width), _cjq._u.css.setHeight(h, w && w.height)), L.pushdown || L.adscroller || (h.style.top = window.pageYOffset + "px"), h.style.left = v - y - g + "px", A = _cjq._u.getHighestZindex(), h.style.zIndex = A)
                }
            }, L.animateClose = function() {
                var d = document.getElementById(L.closeBannerId);
                d && (L.showHideCloseButton(d, "banner", "hide"), setTimeout(function() {
                    L.showHideCloseButton(d, "banner", "show")
                }, 1000))
            }, L.handleCloseButton = function() {
                var g = L.getPanelIframe(),
                    f = document.getElementById(L.closeBannerId);
                if (L.adProps.isInterstitial === !0 && "lightbox" === L.panelType) {
                    if (!f || !g) {
                        return
                    }
                    f = g.parentNode.insertBefore(f, g);
                    var h = parseInt(document.defaultView.getComputedStyle(f, null).getPropertyValue("left"), 10),
                        d = parseInt(document.defaultView.getComputedStyle(f, null).getPropertyValue("top"), 10);
                    f.style.left = h + (window.innerWidth - L.adProps.expandedWidth) / 2 + "px", f.style.top = d + (window.innerHeight - L.adProps.expandedHeight) / 2 + "px", f.style.zIndex = parseInt(g.style.zIndex, 10) + 1, L.animateClose()
                }
            }, L.resizeCloseBanner = function(w) {
                function m(d) {
                    return "undefined" != typeof d && d === d
                }

                function v(d) {
                    return m(d) && (d = Math.round(d * y * 1000) / 1000), parseInt(d, 10)
                }

                function f(d) {
                    return d[0].toUpperCase() + d.slice(1, d.length)
                }

                function T(l, d) {
                    return l.indexOf(d) > -1
                }

                function h(l, d) {
                    var o = 0;
                    return (T(l, "left") || T(l, "right")) && (o = L.getBannerIframe()["offset" + d] || 0), T(l, "top") && _cjq.AdhesionCradle && _cjq.AdhesionCradle.safeClick && _cjq.AdhesionCradle.safeClick.touchArea > 0 && (o = _cjq.AdhesionCradle.safeClick.touchArea), o
                }
                if (L.getBannerIframe() && !L.adscroller) {
                    var y, V, A, t = document.getElementById(L.closeBannerId),
                        g = {},
                        U = ["left", "right", "top", "width", "height"];
                    if (L.isAdhesionStretched(), V = _cjq._u.deviceProps.orientationmode(), !t) {
                        return !1
                    }
                    y = w !== z ? w : _cjq._u.getZoomFactor(), cssProp = L.getCloseDivCss("bannerclose"), A = "landscape" === V ? cssProp.landscape + cssProp.portrait : cssProp.portrait, U.forEach(function(o) {
                        var l = f(o),
                            d = "closeBanner" + l,
                            n = 0;
                        g[o] = L.getCssProps(A, o), g[o] = v(g[o]), m(g[o]) && (!m(g[o]) && m(L[d]) && (g[o] = L[d] * y), n = h(o, l), t.style.setProperty(o, n + g[o] + "px"))
                    })
                }
            }, L.handleLightBox = function(av, ae, an, ar) {
                function ai() {
                    ax.style.height = Y + "px"
                }

                function ai() {
                    ax.style.height = [Y, "px"].join("")
                }
                try {
                    var az = _cjq.AdManager.getCrispAd(ae.adId),
                        am = az.panelIframe,
                        aw = am && _cjq._u.getOpenFrame().indexOf(am.id) > -1,
                        ag = this;
                    if ("undefined" == typeof ar && (ar = 50), an && !aw) {
                        return
                    }
                    var ax, ab, au, at, ao, aA, Y, V = az.adProps,
                        Z = (V && V.expandedWidth, V && V.expandedHeight),
                        al = az.getBannerDims("height", V),
                        ay = null,
                        ah = !!document.querySelector("body") && window.getComputedStyle(document.querySelector("body")),
                        X = ah && parseInt(ah.getPropertyValue("margin-left"), 10),
                        W = ah && parseInt(ah.getPropertyValue("padding-left"), 10),
                        p = _cjq._u.getZoomFactor(),
                        ak = E.isPreviewRequest(),
                        aq = ae && ae.action,
                        ap = _cjq._u.deviceProps.isMobileOptimized(),
                        ac = az.isAdhesionStretched(),
                        aj = az.pushdownDuration || 1000;
                    if ((X === !1 || isNaN(X)) && (X = 0), (W === !1 || isNaN(W)) && (W = 0), am = az.panelIframe, !am) {
                        if (ar > 0) {
                            return void setTimeout(function() {
                                ag.handleLightBox(av, ae, an, --ar)
                            }, 20)
                        }
                        return
                    }
                    if (ax = az.panelIframe.parentNode, _cjq.AdManager.initPanelEventsOnlyOnce || (_cjq.AdManager.initPanelEventsOnlyOnce = {}), _cjq.AdManager.initPanelEventsOnlyOnce[ae.adId] || (az.executeOnExpansion(ae), _cjq.AdManager.initPanelEventsOnlyOnce[ae.adId] = !0), at = am && am.contentWindow, ay = at && at.document && at.document.querySelector("#panelContainerDiv"), au = az.bannerIframe, ab = au && au.parentNode, !au) {
                        return
                    }
                    if (L.SavedProps || (L.SavedProps = []), az.pushdown && (ax.style.overflow = "hidden"), "close" === aq) {
                        az.pushdown ? (Y = p > 1 ? Math.round(al * p) : al, ax.style.WebkitTransition = "height " + aj + "ms", ax.style.transition = "height " + aj + "ms", setTimeout(ai, "10ms"), setTimeout(function() {
                            au.style.display = "block", am.style.display = "none", ab && (ab.style.display = "block", p > 1 ? (au.style.height = Math.round(al * p) + "px", ab.style.height = Math.round(al * p) + "px") : (au.style.height = al + "px", ab.style.height = al + "px")), ab && az.isStandardPanelAd() && !az.isAdhesion && _cjq._u.deviceProps.isAndroidBrowser && ab.scrollIntoView(!0), _cjq._u.trigger("cac_panel_action", {
                                action: "close",
                                params: ae
                            }), _cjq._u.trigger("cac_lightbox_collapsed", ae), I("close"), ax.style.display = "none", setTimeout(function() {
                                ax.style.height = "0px", am.style.height = "0px", am.style.width = "0px", ax.style.zIndex = am.style.zIndex = -1, ax.style.display = "block"
                            }, 50)
                        }, aj)) : (au.style.display = "block", am.style.display = "none", ax.style.display = "none", am.style.height = "0px", am.style.width = "0px", ab && (ab.style.display = "block", p > 1 ? (au.style.height = Math.round(al * p) + "px", ab.style.height = Math.round(al * p) + "px") : (au.style.height = al + "px", ab.style.height = al + "px")), ax.style.zIndex = am.style.zIndex = -1, "relative" === L.SavedProps[am.parentNode] && (am.parentNode.style.position = "relative"), ab && az.isStandardPanelAd() && !az.isAdhesion && _cjq._u.deviceProps.isAndroidBrowser && ab.scrollIntoView(!0), _cjq._u.trigger("cac_panel_action", {
                            action: "close",
                            params: ae
                        }), _cjq._u.trigger("cac_lightbox_collapsed", ae), I("close"))
                    } else {
                        if (!ab || !az.isStandardPanelAd() || az.isAdhesion || _cjq._u.deviceProps.isAndroidBrowser || az.pushdown || ab.scrollIntoView(!0), az.pushdown || (au.style.display = "none", au.parentNode.style.display = "none", au.style.height = "0px", am.style.display = "block"), E.isPreviewRequest()) {
                            am.style.width = window.innerWidth + "px", am.style.height = window.innerHeight + "px"
                        } else {
                            if (az.adscroller) {
                                var af = _cjq._u.deviceProps.width();
                                if (az.adSizeOnly) {
                                    am.style.height = parseInt(Z) + 35 + "px"
                                } else {
                                    var g = _cjq._u.deviceProps.height();
                                    L.adProps.expandedHeight > g && (g = L.adProps.expandedHeight), L.adProps.expandedWidth > af && (af = L.adProps.expandedWidth), am.style.height = g + "px"
                                }
                                am.style.width = af + "px"
                            } else {
                                am.style.height = _cjq._u.deviceProps.height() + "px", am.style.width = _cjq._u.deviceProps.width() + "px"
                            }
                        }
                        ao = p, aA = _cjq._u.deviceProps.orientationmode(), ac && "landscape" !== aA && E.isPreviewRequest() !== !0 && (ao = az.getStretchableScale()), V.scale = ao, (ac || 1 !== ao && !ap && !ak) && (_cjq.InApp || _cjq._u.isDesktopBrowser() || az.triggerIfr(az.adId, "panel", "cac_lightbox_zoomed", {
                            scale: ao,
                            props: V
                        })), az.pushdown || az.adscroller || (am.style.top = window.pageYOffset + "px"), am.style.left = window.pageXOffset - W - X + "px", "relative" === document.defaultView.getComputedStyle(am.parentNode, null).getPropertyValue("position") && (L.SavedProps[am.parentNode] = "relative", am.parentNode.style.position = "static");
                        var l = _cjq._u.getHighestZindex();
                        if (am.style.zIndex = l + 1, L.adscroller || (ax.style.zIndex = l + 1), setTimeout(function() {
                            am.parentNode.style.display = "block"
                        }, 10), (_cjq._u.deviceProps.isIphone6 || _cjq._u.deviceProps.isIphone6Plus) && an) {
                            var U = am.contentWindow.document.querySelector("#panelShade");
                            U && (_cjq.AdEngine.isPreExpandable() ? U && "block" !== U.style.display && (U.style.display = "none", setTimeout(function() {
                                U.style.display = "block"
                            }, 100)) : U.style.display = "block")
                        }
                        _cjq._u.trigger("cac_panel_action", {
                            action: "open",
                            frame: am,
                            params: ae
                        }), az.pushdown ? (ax.style.display = "none", ax.style.height = al + "px", am.style.display = "block", ax.style.display = "block", ax.style.position = "relative", Y = V.expandedHeight, ax.style.WebkitTransition = ["height ", aj, "ms"].join(""), ax.style.transition = ["height ", aj, "ms"].join(""), setTimeout(ai, 10), ax.addEventListener("webkitTransitionEnd", function aa() {
                            setTimeout(function() {
                                az.pushdown && !az.MRC.checkPos(ax, 1) && (L.pushdownInterstitial || ax.scrollIntoView(!0))
                            }, 10), ax.removeEventListener("webkitTransitionEnd", aa, !1)
                        }), L.pushdownInterstitial ? (au.parentNode.style.display = "block", au.parentNode.style.height = "1px") : (au.style.display = "none", au.parentNode.style.display = "none", au.style.height = "0px", au.parentNode.style.height = "0px")) : I("open")
                    }
                } catch (av) {
                    console.log(av)
                }
            }, L.getContainerSize = function() {
                var f = _cjq.AdUtils.deviceProps.width(),
                    d = _cjq.AdUtils.deviceProps.height();
                return E.isPreviewRequest() && (f = window.innerWidth, d = window.innerHeight), L.adProps.expandedHeight > d && (d = L.adProps.expandedHeight), L.adProps.expandedWidth > f && (f = L.adProps.expandedWidth), L.adSizeOnly && (d = parseInt(L.adProps.expandedHeight) + 35), {
                    width: f,
                    height: d
                }
            }, L.getStretchableScale = function() {
                var h, f = _cjq._u.getZoomFactor(),
                    l = f,
                    d = L.adProps,
                    g = d.collapsedWidth;
                return L.isAdExpanded() && (g = d.expandedWidth), f = Math.round(1000 * f) / 1000, h = 1 >= f ? window.innerWidth / (g * f) : window.innerWidth / g, 1 !== f && h > 1 ? l = 1 / (g / window.innerWidth) : 1 === f && h > 1 && (l = h), l > 5 && (l = 5), l
            }, this.offset = {}, L.handleRemoveCrispAd = function(f, d) {
                d && d.length >= 2 && L.removeCrispAd(d[0], d.adframeid, d[1], d[2])
            }, L.getPanelBGDiv = function() {
                return document.getElementById("__CrispPanelBg")
            }, L.removeCrispAd = function(V, aa, w, A) {
                function h() {
                    m && m.parentNode && setTimeout(function() {
                        m.parentNode.removeChild(m)
                    }, 1000), Z && (Z.style.display = "none", Z.style.width = "0px", Z.style.height = "0px", Z.parentNode.removeChild(Z)), y && y.parentNode && (y.style.display = "none", setTimeout(function() {
                        y.parentNode.removeChild(y)
                    }, 1000)), _cjq._u.isDesktopBrowser() && setTimeout(function() {
                        document.body.style.overflow = "auto"
                    }, 300)
                }
                var Y, v, W, ab, X = _cjq.AdManager.getCrispAd(aa),
                    y = X.getTopDiv(),
                    m = X.getPanelIframeContainer(),
                    Z = _cjq.AdEngine.getPanelBGDiv(),
                    T = "banner",
                    U = document.getElementById(X.closeBannerId);
                X.adProps.bannerAdRemoved || (X.adProps.bannerAdRemoved = !0, X.adProps.isInterstitial === !0 && (T = "panel"), "banner" === T ? v = X._iframeWindow : "panel" === T && (v = X._expandedIframeWindow), ab = v && v._cjq && v._cjq.crispAdFramework, ab && (Y = ab.getHideDelay("banner"), W = ab.showComponentsForStage(V, "banner"), ab.showAndHide(V, [], W.showList, "", "", "", "")), Y || (Y = 0), U && U.style && (U.style.display = "none"), setTimeout(h, Y), V && w && X.triggerIfr(X.adId, T, "cac_track_banner_close", [V, w, "close"]), _cjq._u.trigger("cac_panel_action", {
                    action: "close",
                    adframeid: aa
                }), _cjq._u.trigger("cac_ad_removed", []))
            }, L.isPortraitMode = function() {
                return !(window.innerHeight <= window.innerWidth)
            }, L.animate = function(w, U, m, v, f, T, h, y) {
                var V = U,
                    A = m,
                    u = null,
                    g = "none";
                v = v ? parseInt(v, 10) : 7, f = f ? parseInt(f, 10) : 20, "up" === h && (T / 2 >= A ? h = "close" : _cjq._u.trigger("cac_panel_expand", [])), u = setInterval(function() {
                    if ("close" === h) {
                        if (T / 2 >= V && (A = 0), 0 > V || A >= V || 0 > A) {
                            return setTimeout(function() {
                                w.style.width = V + "px"
                            }, 200), void clearInterval(u)
                        }
                        V -= f, w.style.width = V + "px", setTimeout(function() {
                            var d = L.getBannerIframe();
                            "block" !== d.style.display && (d.style.display = "block")
                        }, 400)
                    } else {
                        if (V > T / 2 && (A = T, g = "auto"), V >= T || V >= A || A > T) {
                            return clearInterval(u), void(A >= T && (w.style.right = "0px", setTimeout(function() {
                                L.getBannerIframe().style.display = "none"
                            }, 200)))
                        }
                        V += f, w.style.width = V + "px", w.style.pointerEvents !== g && (w.style.pointerEvents = g), L.getPanelIframe().style.width = V + "px"
                    }
                }, v)
            }, L.createPanelIframe = function(m, v) {
                if (_cjq._u.isDesktopBrowser()) {
                    var h, l, f = v[0],
                        u = this.ifrmProps[this.adinstanceid],
                        g = u.expandedWidth,
                        p = u.expandedHeight,
                        w = L.getBannerIframe();
                    w && (L.createExpandIframe(g, p, f), w.style.display = "block", h = L.getPanelIframeContainer(), l = L.getPanelIframe(), h.style.position = "absolute", h.style.overflow = "hidden", l.style.display = "none", h.style.display = "none")
                }
            }, L.executeOnExpansion = function(f) {
                var d = 500;
                (L.isLightBoxAd() || L.isStandardPanelAd()) && (_cjq._u.trigger("handleFirsttimeLightbox", [L.adId, f]), setTimeout(function() {
                    L.handleCloseButton(), _cjq._u.deviceProps.isAndroidBrowser && (_cjq.AdEngine.toggleElement(L.getPanelIframe().contentWindow.document.querySelector("#panelContainerDiv")), setTimeout(function() {
                        _cjq.AdEngine.toggleElement(L.getPanelIframe().contentWindow.document.querySelector("#panelContainerDiv"))
                    }, 50))
                }, d))
            }, L.createExpandIframe = function(aM, ay, aE, aJ) {
                var aA = 2,
                    aQ = _cjq.AdManager.getCrispAd(aJ);
                if (document.getElementById("cacPanelIframe__" + aJ)) {
                    return !1
                }
                if (L.getBannerIframe()) {
                    _cjq._u.bind("crisppaneliframeloaded", function(p, l) {
                        var v, h, m = l.adframeid,
                            f = m.substr("cacPanelIframe__".length),
                            u = _cjq.AdManager.getCrispAd(f),
                            s = "crisppaneliframeloaded" + m;
                        if (u.executeEvents || (u.executeEvents = {}), !u.executeEvents[s] && (u.executeEvents[s] = !0, v = u._expandedIframeWindow, h = u._iframeWindow, v && h)) {
                            v.adParams = h.adParams, v.trackerkey = h.trackerkey, v._cjq && v._cjq.crispAdFramework && (v._cjq.crispAdFramework.panelIFrame = !0), h._cjq && h._cjq.crispAdFramework && h._cjq.crispAdFramework.trigger("display_crisp_banner"), v.adFrame = u.getPanelIframe(f);
                            try {
                                u.executeJsonFromPanelIframe(h, v)
                            } catch (p) {
                                console.log(p)
                            }
                        }
                    }), L.cleanScriptForCopy(aQ._iframeWindow);
                    var aD = L.getPanelBackgroudProp(aQ._iframeWindow),
                        aN = "#000",
                        az = "0.5",
                        aO = "";
                    aD && (aN = aD.panel_bg_color, az = aD.panel_bg_opacity);
                    var aG, aC, ax = _cjq.AdUtils.deviceProps.width(),
                        aL = _cjq.AdUtils.deviceProps.height(),
                        aK = "";
                    if (L.adscroller) {
                        var aF = L.getScrollerProp(aQ._iframeWindow);
                        aG = document.createElement("div"), aC = document.createElement("iframe");
                        var aR = L.getContainerSize();
                        ax = aR.width, aL = aR.height;
                        var av = "",
                            at = "black",
                            aw = "white",
                            aq = null,
                            aP = "height:100%;";
                        L.adSizeOnly && (aL = parseInt(ay) + 35, aK = "top:0px;bottom:0px;margin:auto;"), aF && aF.params && aF.params["#bg_color#"] && (av = "background:" + aF.params["#bg_color#"] + ";"), aF && aF.params && aF.params["#msg_bg_color#"] && (at = aF.params["#msg_bg_color#"]), aF && aF.params && aF.params["#msg_txt_color#"] && (aw = aF.params["#msg_txt_color#"]), aF && aF.params && aF.params["#bksrc#"] && (aq = aF.params["#bksrc#"]);
                        var ao = document.body.childNodes[0],
                            ai = {
                                "class": "containerAttrClass",
                                style: "min-width:0px;min-height:" + aL + "px;left:0px;top:0px;position:relative;text-align:center;"
                            },
                            au = {
                                "class": "iframePanelContainerDiv",
                                style: "overflow:hidden;display:block;" + av + "width:" + ax + "px;height:" + aL + "px;position:absolute;left:0px;right:auto;top:0px;bottom:auto;"
                            },
                            ac = {
                                "class": "outerContainer",
                                style: "position:absolute;top:0px;left:0px;width:100%;" + aP + "margin:0px;padding:0px;overflow:hidden;clip:rect(0px auto auto 0px);"
                            },
                            aB = {
                                "class": "innerContainer",
                                style: "position:fixed;top:auto;left:0px;width:100%;" + aP + "margin:0px;padding:0px;transform:translateZ(0px);bottom:0px;"
                            },
                            aI = {
                                "class": "ad-message",
                                style: "background:" + at + ";color:" + aw + ";position:absolute;z-index:4;top:0px;left:0px;right:0px;margin:0px;padding:5px;text-align:center;text-transform:uppercase;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:10px;line-height:10px;font-family:Helvetica,Arial,sans-serif;box-shadow:" + at + " 0px 1px 10px;"
                            },
                            aH = {
                                "class": "ad-end-message",
                                style: "background:" + at + ";color:" + aw + ";position:absolute;z-index:3;bottom:0px;left:0px;right:0px;margin:0px;padding:5px;text-align:center;text-transform:uppercase;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:10px;line-height:10px;font-family:Helvetica,Arial,sans-serif;box-shadow:" + at + " 0px -1px 10px;"
                            };
                        aC.id = "cacPanelIframe__" + aJ, aG.id = "iframePanelContainerDiv__" + aJ, ao = _cjq.AdEngine.getBannerIframe().parentNode;
                        var am = document.createElement("div");
                        am.setAttributes(ai), ao.parentNode.appendChild(am), ao.parentNode;
                        var ap = document.createElement("div");
                        ap.setAttributes(aI), am.appendChild(ap), ap.innerHTML = "Advertisement", aG = am.appendChild(aG), aG.setAttributes(au), aq && (aG.style["background-image"] = "url(" + aq + ")");
                        var an = document.createElement("div");
                        an.setAttributes(ac), aG.appendChild(an);
                        var Z = document.createElement("div");
                        Z.setAttributes(aB), an.appendChild(Z), Z.appendChild(aC), _cjq.AdUtils.trigger("cac_iframe_added", [aC]);
                        var aa = document.createElement("div");
                        aa.setAttributes(aH), aG.appendChild(aa), aa.innerHTML = "Scroll to close the ad"
                    } else {
                        aC = document.createElement("iframe"), iframeContainerTopDiv = document.createElement("div");
                        var au = {
                            "class": "iframePanelContainerDiv",
                            style: "display:none;height:0px;position:absolute;top:0px;"
                        };
                        aC.id = "cacPanelIframe__" + aJ, ao = document.body.childNodes[0], aQ.pushdown ? (ao = document.getElementById("crispTopAdCradle__" + aJ), ao ? aG = ao.parentNode.appendChild(iframeContainerTopDiv) : (ao = document.body.childNodes[0], aG = document.body.insertBefore(iframeContainerTopDiv, ao))) : aG = document.body.insertBefore(iframeContainerTopDiv, ao), aG.setAttributes(au), aG.id = "iframePanelContainerDiv__" + aJ, aG.appendChild(aC), _cjq._u.trigger("cac_iframe_added", [aC])
                    }
                    var ag = {
                        style: "height: 0px; border: none; position: absolute;" + aK,
                        scrolling: "no",
                        src: "",
                        allowtransparency: !0,
                        allowfullscreen: !0
                    };
                    aC.setAttributes(ag);
                    var al = L.getBannerIframe(aJ).contentDocument.getElementsByTagName("head")[0].innerHTML,
                        g = aC.document;
                    aC.contentDocument ? g = aC.contentDocument : aC.contentWindow && (g = aC.contentWindow.document), aC.contentWindow.phase = aA, aQ._expandedIframeWindow = aC.contentWindow, aQ._expandedIframeDocument = g;
                    var ae, ab = "",
                        ar = aQ._iframeWindow._cjq.crispAdFramework.getLayoutScripts(aE),
                        ah = L.bannerType,
                        aj = "display:block;",
                        af = "height:100%;width:100%;",
                        X = "";
                    L.adscroller && (af = "height:0;width:0;"), "lightbox" === aE ? (aj = "", aO = "#panelContainerDiv{top:0px;bottom:0px;}") : "standard" === aE && (aO = "adhesion" === ah ? "#panelContainerDiv{bottom:0px;}" : "#panelContainerDiv{top:0px;}"), ae = [' <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">', "<style>#panelShade{", "opacity: ", az, ";", aj, "position:fixed;top:0;left:0;right:0;bottom:0;" + af, "background-color: ", aN, ";", "-webkit-transition: opacity 750ms linear;transition: opacity 750ms linear;}", "#panelContainerDiv{margin:auto;position:absolute;overflow:hidden;left:0;right:0;clear:both;", "height:", ay, "px;", "width:", aM, "px;", "text-align: left;margin-left: auto;margin-right: auto;}", aO, X, "</style>"].join("");
                    for (var Y in ar) {
                        ar.hasOwnProperty(Y) && (ab += ar[Y].toString() + ";\n")
                    }
                    if (ab = "<script>" + ab + "<\/script>", g.open(), g.write(['<!DOCTYPE html><html class="', "js no-flexbox canvas canvastext webgl geolocation postmessage ", "websqldatabase no-indexeddb rgba  backgroundsize borderimage ", "borderradius boxshadow textshadow opacity cssanimations csscolumns ", "cssgradients cssreflections csstransforms csstransforms3d csstransitions ", 'fontface generatedcontent video audio localstorage sessionstorage webworkers applicationcache "', 'lang="en" style>'].join("")), g.write(["<head>", al, ae, ab, "</head>"].join("")), aQ.pushdown || aQ.adscroller) {
                        var ak = "fixed";
                        aQ.adSizeOnly && (ak = "absolute"), g.write(['<body style="margin:0px;" onload="', ar.initIframe.name, "('", aE, "')", '" data-adframeid="', aC.id, '">', '<div id="ad-container" style="overflow:hidden;top:0px;bottom:0px;position:' + ak + ';width:100%;height:100%;">', '<div style="position: absolute;width:100%;height:100%;">', '<div id="panelContainerDiv"></div>', "</div>", "</div>", "</body>"].join(""))
                    } else {
                        g.write(['<body style="margin:0px;" onload="', ar.initIframe.name, "('", aE, "')", '" data-adframeid="', aC.id, '">', '<div id="panelShade"></div><div id="panelContainerDiv"></div></body>'].join(""))
                    }
                    return g.write("</html>"), g.close(), aC.contentWindow.adParams = aQ.adParams.pp, aC.contentWindow.adParams.loadAd = !1, aQ.panelIframe = aC, aC.style.display = "none", aQ.pushdown && (aG.style.display = "block"), aC
                }
            }, L.getVisible = function() {}, L.isPreviewRequest = function() {
                return L.previewRequest || /(?=.*\?prq=true)/.test(window.location.href)
            }, L.getAppProps = function() {
                return _cjq._u && _cjq._u.appProps && _cjq._u.appProps.inapp
            }, L.executeSafeClickAction = function() {
                try {
                    if (L.isAdExpanded()) {
                        return
                    }
                    L._iframeWindow && L._iframeWindow._cjq && L._iframeWindow._cjq.crispAdFramework && L._iframeWindow._cjq.crispAdFramework.executeScriptInAction()
                } catch (d) {
                    console.log(d)
                }
            }, L.requestAdWithBannercode = function(h, f, l, d) {
                try {
                    if (this._iframeWindow && this._iframeWindow._cjq && this._iframeWindow._cjq.crispAdFramework) {
                        return this._iframeWindow._cjq.crispAdFramework.setPreviewRequest(!0), this._iframeWindow._cjq.crispAdFramework.setLiveMode(!0), this._iframeWindow._cjq.crispAdFramework.requestAdWithBannercode(h, f, l, d, !0)
                    }
                    setTimeout(function() {
                        _cjq.AdEngine.requestAdWithBannercode(h, f, l, d)
                    }, 300)
                } catch (g) {
                    console.log(g)
                }
            }, L.toggleElement = function(h, f, l, d) {
                if (!h || !h.style) {
                    return !1
                }
                try {
                    return f ? "show" === f && "block" !== h.style.display ? h.style.display = "block" : "hide" === f && "none" !== h.style.display && (h.style.display = "none") : "block" === h.style.display ? h.style.display = "none" : h.style.display = "block", h
                } catch (g) {
                    console.log(g)
                }
            }, L.adDetectCb = function(f) {
                var d = f.status,
                    g = f.error;
                "ok" === d ? (L.zp = L.zp || {}, L.zp.crispkey = f.data.crispkey, L.zp.detectData = f.data) : console.log(g)
            }, L.getCrispkey = function() {
                return L.zp ? L.zp.crispkey : void 0
            }, L.getCrispAdId = function() {
                return L.crispAdId || (L.crispAdId = Math.floor(999999 * Math.random())), L.crispAdId
            }, L.init = function() {
                function v() {
                    for (var Y, ac, W, f, ab = o, V = window.parent, Z = V.document.getElementsByTagName("iframe"), ae = !1, aa = !1, X = 0; X < Z.length; X++) {
                        ac = Z[X], ac.contentWindow == self && (Y = ac)
                    }
                    if (Y && Y.parentNode) {
                        try {
                            for (f in Y.parentNode.childNodes) {
                                Y.parentNode.childNodes[f] && Y.parentNode.childNodes[f].tagName && "IMG" === Y.parentNode.childNodes[f].tagName.toUpperCase() && Y.parentNode.childNodes[f].id && Y.parentNode.childNodes[f].id.indexOf("crisp-a") > -1 && (aa = !0, ae = !0)
                            }
                        } catch (u) {}
                        aa || (W = ab.cloneNode(!1), W = Y.parentNode.insertBefore(W, Y), W.done = !1, ae = !0)
                    }
                    return ae
                }

                function T(l, f) {
                    var p = f && f[0],
                        d = {};
                    p && p.id && (d.id = p.id), _cjq.AdEngine.iframes.push(d)
                }
                var h, o, w, U, y, m;
                if (_cjq._u.bind("cac_iframe_added", T), "undefined" != typeof _crispPreviewRequest && _crispPreviewRequest === !0) {
                    ad = _caf[0], y = "testtag", L.adId = "0", ad.adID = "0", L.discover(ad, y, !0), L.previewRequest = !0
                } else {
                    if (L.previewRequest = !1, h = document.getElementsByTagName("img"), h && h.length) {
                        for (var g = h.length - 1; g >= 0; g--) {
                            if (h[g].id && h[g].id.indexOf("crisp-a") > -1 && 1 != h[g].done) {
                                h[g].done = !0, o = h[g];
                                break
                            }
                        }
                    }
                    if (!o) {
                        return
                    }
                    if (w = o && o.id, _caf.zp && (m = C(w), ("undefined" != typeof inDapIF && inDapIF === !0 || "undefined" != typeof m && "undefined" != typeof m.iFrameType && "Rich Media FiF" === m.iFrameType) && ("undefined" == typeof $sf || !$sf.ext || "SafeFrames" !== m.iFrameType) && window.top && v())) {
                        return void(o && o.parentNode && o.parentNode.removeChild(o))
                    }
                    if (_caf.zp) {
                        if (!_caf[w]) {
                            o.done = !1;
                            var A = this;
                            return void setTimeout(function() {
                                A.init()
                            }, 30)
                        }
                        _caf[w].zp = C(w), L.zp = C(w)
                    }
                    if (L.adId = w, U = w && _caf[w], L.adP = U, U.adID = w, w && _cjq.AdManager.addToManager(w), U && U.pp) {
                        U.pp.imgTag = o, U.bp ? (params = U.bp, y = "testtag") : (params = L.zp, y = params.packageType && "" !== params.packageType ? "packaged" : "zonetag"), F(w.split("-")[1], y, U.pp, params.packageType, params.publisherId, params.zoneId, w), R(params, U.pp);
                        var r = function() {
                            Q(U, y)
                        };
                        U.pp.isSecure = /https/.test(window.location.protocol), (U.pp.h && "http:" !== U.pp.h || U.pp.isSecure) && (U.pp.isSecure || _cjq.AdUtils.deviceProps.doesChromeSupportSSL) ? U.pp.isSecure = !0 : U.pp.isSecure = !1, U.pp.isSecure && L.zp && (L.zp.fs = L.zp.fs.replace(/http:/, "https:"), L.zp.api = L.zp.api.replace(/http:/, "https:"), U.pp.fs = U.pp.fs.replace(/http:/, "https:"), U.pp.api = U.pp.api.replace(/http:/, "https:")), L.discover(U, y, r)
                    }
                }
                L.tagType = y
            }, L.MRC = {
                PIXELPERCENT: 0.5,
                DURATION: 1,
                PERIOD: 1,
                tracked: {},
                timeFirstChecked: null,
                recordTime: function(d) {
                    return d ? (this.timeFirstChecked || (this.timeFirstChecked = {}), this.timeFirstChecked[d] || (this.timeFirstChecked[d] = Date.now()), this.timeFirstChecked[d]) : !1
                },
                getVisibleDimensions: function(m) {
                    var v, h, l = _cjq._u.inViewport(m),
                        f = m.getBoundingClientRect(),
                        u = parseInt(window.getComputedStyle(m).getPropertyValue("width"), 10),
                        g = parseInt(window.getComputedStyle(m).getPropertyValue("height"), 10),
                        p = _cjq._u.getWinProps().height,
                        w = _cjq._u.getWinProps().width;
                    return l === !0 ? [u, g] : (v = l.top ? f.bottom : l.bottom ? p - f.top - 1 : g, h = l.left ? f.right : l.right ? w - f.left - 1 : u, [Math.floor(h), Math.floor(v)])
                },
                checkProps: function(h) {
                    var f = h && h.style,
                        l = !1,
                        d = !1,
                        g = !1;
                    return f ? (l = "none" !== f.display, d = "hidden" !== f.visibility, g = 0 !== f.opacity, l && d && g) : !1
                },
                checkPos: function(y, W) {
                    var m = null,
                        w = null,
                        f = null,
                        U = null,
                        h = _cjq._u.inViewport(y),
                        A = parseInt(window.getComputedStyle(y).getPropertyValue("width"), 10),
                        X = parseInt(window.getComputedStyle(y).getPropertyValue("height"), 10),
                        T = _cjq._u.getWinProps() && _cjq._u.getWinProps().height || window.document.documentElement.clientHeight,
                        v = _cjq._u.getWinProps() && _cjq._u.getWinProps().width || window.innerWidth,
                        g = A * X,
                        V = null;
                    if (W || (W = this.PIXELPERCENT), h === !0) {
                        return !0
                    }
                    if (null === h) {
                        return !1
                    }
                    if (h.bottom && h.bottom < 0) {
                        return !1
                    }
                    if (h.top && h.top > T) {
                        return !1
                    }
                    if (h.right && h.right < 0) {
                        return !1
                    }
                    if (h.left && h.left > v) {
                        return !1
                    }
                    if (m = h.bottom && h.bottom - T, f = Math.abs(h.top), U = Math.abs(h.left), w = h.right && h.right - v, m && U) {
                        V = (X - m) * (A - U)
                    } else {
                        if (m && w) {
                            V = (X - m) * (A - w)
                        } else {
                            if (f && U) {
                                V = (X - f) * (A - U)
                            } else {
                                if (f && w) {
                                    V = (X - f) * (A - w)
                                } else {
                                    if (m) {
                                        V = (X - m) * A
                                    } else {
                                        if (f) {
                                            V = (X - f) * A
                                        } else {
                                            if (U) {
                                                V = (A - U) * X
                                            } else {
                                                if (!w) {
                                                    return !1
                                                }
                                                V = (A - w) * X
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return V >= g * W
                },
                checkStackingOrder: function(av, ab, al) {
                    function aq(h, f) {
                        for (var l = h.length, d = null, g = !0; l;) {
                            l -= 1, d = document.elementFromPoint(h[l][0], h[l][1]), d !== f && (g = !1)
                        }
                        return g
                    }
                    var af = _cjq._u.inViewport(av),
                        az = av.getBoundingClientRect(),
                        ak = parseInt(window.getComputedStyle(av).getPropertyValue("width"), 10),
                        aw = parseInt(window.getComputedStyle(av).getPropertyValue("height"), 10),
                        ab = ab || ak,
                        al = al || aw,
                        ac = null,
                        ax = null,
                        an = null,
                        aj = [az.left + 1, az.top + 1],
                        Z = [az.left + 1, az.top + al / 2],
                        at = [az.left + 1, az.bottom - 1],
                        au = [az.left + ab / 2 - 1, az.top + 1],
                        ar = [az.left + ab / 2 - 1, az.bottom - 1],
                        am = [az.right - 1, az.top + 1],
                        aA = [az.right - 1, az.top + al / 2 - 1],
                        X = [az.right - 1, az.bottom - 1],
                        U = [aj, am, Z, aA],
                        Y = [Z, aA, at, X],
                        ai = [aj, au, at, ar],
                        ay = [au, am, ar, X],
                        ae = ak * aw,
                        W = ae * this.PIXELPERCENT,
                        V = null,
                        T = null,
                        ah = null,
                        ap = null,
                        ao = null,
                        aa = null,
                        ag = !0;
                    return af !== !0 ? (ac = this.getVisibleDimensions(av), ax = ac[0], an = ac[1], V = Math.ceil(W / an), T = Math.ceil(W / ax), af.top && (aj[1] = am[1] = 1), af.bottom && (at[1] = X[1] = aj[1] + an - 1), af.left && (aj[0] = at[0] = 1), af.right && (am[0] = X[0] = aj[0] + ax - 1), ah = [aj, [aj[0] + V, aj[1]], at, [at[0] + V, at[1]]], ap = [
                        [am[0] - V, am[1]], am, [X[0] - V, X[1]], X
                    ], ao = [aj, am, [aj[0], aj[1] + T],
                        [am[0], am[1] + T]
                    ], aa = [
                        [aj[0], at[1] - T],
                        [am[0], X[1] - T], at, X
                    ], ag = aq(ao, av) || aq(aa, av) || aq(ah, av) || aq(ap, av)) : ag = aq(U, av) || aq(Y, av) || aq(ai, av) || aq(ay, av), ag
                },
                checkDuration: function(h, f, l) {
                    var d = l;
                    return f && "number" == typeof f && l && "number" == typeof l ? l > f ? !1 : (function g() {
                        setTimeout(function() {
                            return L.MRC.checkPixels(h) ? void(f > d ? (d += l, g()) : _cjq._u.trigger("cac_mrc_viewable", [h])) : null
                        }, l)
                    }(), "checking duration") : !1
                },
                isInView: function(g) {
                    var f = this.checkProps(g),
                        h = this.checkPos(g),
                        d = this.checkStackingOrder(g);
                    return f && d && h
                },
                checkPixels: function(g) {
                    var f = this.checkProps(g),
                        h = this.checkPos(g),
                        d = this.checkStackingOrder(g);
                    return L.MRC.recordTime(L.adId), f && d && h
                },
                checkPixelsOnly: function(d) {
                    return L.MRC.recordTime(L.adId), L.MRC.checkPixels(d) ? (_cjq._u.trigger("cac_mrc_viewable", [d]), !0) : !1
                },
                checkViewability: function(f) {
                    var d = L.adId;
                    return f ? L.MRC.tracked[d] === !0 ? !1 : (L.MRC.recordTime(d), L.MRC.checkPixels(f) ? L.MRC.checkDuration(f, L.MRC.DURATION, L.MRC.PERIOD) : !1) : !1
                },
                handleViewable: function(m, h) {
                    function l(n, d) {
                        return n.indexOf(d) > -1
                    }

                    function f(n) {
                        var d;
                        return l(n, "cmAdFrame__") && (d = n.substring("cmAdFrame__".length)), l(n, "cacPanelIframe__") && (d = n.substring("cacPanelIframe__".length)), d = d || L.adId
                    }
                    var u, g, p = h && h[0],
                        v = p.id,
                        t = f(v);
                    return u = x.getTrackerkey(t), L.MRC.tracked[t] ? !1 : (L.MRC.tracked[t] = !0, g = -1 !== v.indexOf("cacPanelIframe") ? "panel" : "banner", _cjq.AdEngine.triggerIfr(v, g, "cac_mrc_viewable", [u]), window.removeEventListener("scroll", L.MRC.checkViewabilityFromEvent), window.removeEventListener("orientationchange", L.MRC.checkViewabilityFromEvent), window.removeEventListener("touchend", L.MRC.handleTouchEnd), window.mraid !== z && window.mraid.removeEventListener("ready", L.MRC.handleViewable), !0)
                },
                handleTouchEnd: function(f) {
                    var d = _cjq._u.debounce(L.MRC.checkViewabilityFromEvent, 1000);
                    d(f)
                },
                handleBannerClose: function(l, g) {
                    if (g && g[0]) {
                        var m, f = Date.now(),
                            h = L.MRC.recordTime(L.adId),
                            d = _cjq.AdManager.getAllCrispAd();
                        for (ad in d) {
                            if (d.hasOwnProperty(ad) && d[ad] && d[ad].zp && d[ad].zp.trackerkey && d[ad].zp.trackerkey === g[0]) {
                                m = d[ad].isLightBoxAd ? d[ad].getPanelIframe("cacPanelIframe__" + d[ad].adId) : d[ad].getBannerIframe("cmAdFrame__" + d[ad].adId);
                                break
                            }
                        }
                        return f - h > 1000 ? void _cjq._u.trigger("cac_mrc_viewable", [m]) : !1
                    }
                },
                checkViewabilityFromEvent: function(h, l) {
                    function f() {
                        var e = null;
                        return (e = l && l.frame ? l.frame : L.getBannerIframe()) ? (window.mraid.isViewable() ? (L.MRC.recordTime(L.adId), L.MRC.handleViewable(h, [e])) : window.mraid.addEventListener("viewableChange", L.MRC.handleViewable), !0) : void 0
                    }
                    var g = null,
                        d = L.adId;
                    return L.MRC.tracked[d] === !0 ? !1 : window.mraid !== z ? "loading" === window.mraid.getState() ? (window.mraid.addEventListener("ready", f), !0) : f() : (g = l && l.frame ? l.frame : x.getBannerIframe()) ? l && l.pixelsOnly === !0 ? L.MRC.checkPixelsOnly(g) : L.MRC.checkViewability(g) : void 0
                }
            }
        }
        b.exports = c
    },
    function(E, j) {
        function x() {
            return I.body ? I.body : I.documentElement
        }

        function A(a) {
            a && a.style && (a.style.opacity = 1, a.style.display = "block")
        }

        function q(a) {
            a && a.style && (a.style.opacity = 0, a.style.display = "block")
        }

        function H(a) {
            a && a.style && (a.style.left = "0px", a.style.top = "0px", A(a))
        }

        function w() {
            var a = navigator.userAgent.toLowerCase();
            return !!/android\s+[1-3]/.test(a)
        }

        function F(c) {
            if (y.deviceProps.isAndroidBrowser && setTimeout(b, 500), _cjq.AdEngine.isFixedAdhesion !== !0) {
                var a = B.getAdCradle();
                if (a) {
                    if (!B.crispAd.isAdExpanded() && c && "touchmove" === c.type && !c.adhere && /iphone os/i.test(navigator.userAgent)) {
                        a.style.display = "none", e1 = I.createEvent("MouseEvent"), e1.initEvent("touchmove", !0, !0), e1.adhere = !0;
                        for (var d in c) {
                            e1[d] = c[d]
                        }
                        return void I.body.dispatchEvent(e1)
                    }
                    a.style.opacity = 0
                }
            }
        }

        function k() {
            var a = B.getAdCradle();
            a.style.display = "block", a.style.opacity = 1
        }

        function G(c, a) {
            var a = a || 500;
            return 0 > c ? void B.resetPosition() : (c -= 1, void setTimeout(function() {
                G(c)
            }, a))
        }

        function z(a) {
            B.onTouchStartFired = !0, F(a), setTimeout(function() {
                B.onTouchStartFired = !1
            }, 2000)
        }

        function v() {
            return I.body.clientWidth
        }

        function b(a) {
            _cjq.AdEngine.isFixedAdhesion !== !0 && (w() ? k() : G(1))
        }

        function C(c) {
            var a = I.createElement("div");
            a.id = B.spacerDiv, x().appendChild(a)
        }

        function D(a) {
            I.getElementById(a).style.position = "fixed", I.getElementById(a).style.bottom = "0px"
        }
        var B = {},
            y = _cjq.AdUtils,
            I = window.document;
        B.firstScroll = !0, B.lastScreenHeight = window.innerHeight, B.lastScreenWidth = window.innerWidth, B.spacerDiv = "cac_adhere_spacer", B.pageYOffset = window.pageYOffset, B.crispAd = null, B.adId = null, B.getAdCradle = function() {
            return I.getElementById("crisp_Ad_Cradle__" + B.adId)
        }, B.getCssAdCradle = function() {
            return I.getElementById("crisp_Css_Ad_Cradle__" + B.adId)
        }, B.setWebKitProps = function(c) {
            var a = I.getElementById(c);
            a && (a.style["-webkit-transition"] = "preserve-3d", a.style["-moz-transition"] = "-webkit-transform 0ms ease-out", a.style.transition = "-webkit-transform 0ms ease-out", a.style["-webkit-transform-origin"] = "0% 100%;", a.style["-moz-transform-origin"] = "0% 100%;", a.style["transform-origin"] = "0% 100%;")
        }, B.watchDogShow = function(c, a) {
            G(c, a)
        }, B.resetPosition = function(g, a) {
            function m() {
                var o, d, p = 0;
                try {
                    o = B.getAdCradle(), d = window.getComputedStyle(o), p = parseInt(d.getPropertyValue("padding-top"), 10)
                } catch (c) {
                    p = 0
                }
                return p
            }

            function h() {
                var d, c, o = y.browserScrollbarWidth;
                return void 0 !== o ? o : (d = I.body, c = I.createElement("div"), c.innerHTML = ['<div style="width: 50px; height: 50px;position: absolute;', 'left: -100px; top: -100px; overflow: auto;">', '<div style="width: 1px; height: 100px;"></div>', "</div>"].join(""), c = c.firstChild, d.appendChild(c), o = c.offsetWidth - c.clientWidth, y.browserScrollbarWidth = o, d.removeChild(c), o)
            }

            function f(aa) {
                function N() {
                    if (window.pageXOffset) {
                        if (!B.resetPosTO) {
                            return ac && (ac.style.display = "none"), B.resetPosTOStart = Date.now(), B.resetPosTO = setTimeout(function() {
                                f(aa)
                            }, r), !1
                        }
                        if (Date.now() - B.resetPosTOStart < r) {
                            return !1
                        }
                        clearTimeout(B.resetPosTO), B.resetPosTO = null
                    }
                    return B.resetPosTO && (clearTimeout(B.resetPosTO), B.resetPosTO = null), !0
                }

                function U() {
                    var c;
                    return c = _cjq.AdEngine.isPreviewRequest() && window.previewAd || "undefined" != typeof _crispPreviewRequest && _crispPreviewRequest === !0 && window.previewAd ? window.previewAd.viewOrientation : y.deviceProps.orientationmode()
                }

                function ab() {
                    return window.innerWidth / (W.collapsedWidth * (1 >= n ? n : 1))
                }

                function V(P, p, ae, o) {
                    var u = parseInt(B.crispAd.getBannerDims("width", ae, K), 10),
                        c = parseInt(B.crispAd.getBannerDims("height", ae, K), 10);
                    return p > 1 && o && (1 !== P ? c = window.innerWidth * c / u : c *= p, u = window.innerWidth), "expanded" === y.bannerState && (u = parseInt(ae.expandedWidth, 10), c = parseInt(ae.expandedHeight, 10)), o || (u *= P, c = (c + Math.max(0.5, P)) * P), {
                        width: u,
                        height: c
                    }
                }

                function T(ae, ah, u, P, c, ag) {
                    if (c) {
                        var p, af, ai = c.contentWindow.document.body.style;
                        1 / (W.collapsedWidth / window.innerWidth), p = 1 !== ae && d && ah > 1 ? 1 / (W.collapsedWidth / window.innerWidth) : 1 === ae && d && ah > 1 ? ah : ae, af = ["scale(", p, ", ", p, ")"].join(""), ai["-webkit-transform"] = af, ai.transform = af, ai["-webkit-transform-origin"] = "0 0", ai["transform-origin"] = "0 0", !u && P || (P.style.width = ag.width + "px", u.style.width = ag.width + "px", c.style.width = ag.width + "px", u.style.height = ag.height + "px", c.style.height = ag.height + "px")
                    }
                }

                function L(c) {
                    c && (c.style.height = M.height + "px")
                }

                function Y(ao, ag, al, ae, ap) {
                    var aj = {},
                        af = I.body,
                        e = I.defaultView.getComputedStyle(af, null),
                        an = parseInt(e.getPropertyValue("margin-left"), 10),
                        ah = parseInt(e.getPropertyValue("padding-left"), 10),
                        ai = (parseInt(e.getPropertyValue("height"), 10), m()),
                        am = "",
                        ak = B.crispAd.isCornerAdhesion(),
                        P = window.innerWidth - ap.width - h();
                    return y.deviceProps.isAndroidBrowser || y.orientationhandling !== !0 ? d && 1 !== R ? aj.x = window.pageXOffset : aj.x = window.pageXOffset + P / 2 : (aj.x = (window.innerWidth - ap.width) / 2, q(ag), y.orientationhandling = !1), "left" === ak ? aj.x = window.pageXOffset : "right" === ak && (aj.x = window.pageXOffset + P), aj.x = aj.x - an - ah, aj.y = window.pageYOffset + window.innerHeight - ap.height - ai, aj.x = Math.round(aj.x), aj.y = Math.round(aj.y), 0 === window.pageYOffset || y.deviceProps.isIphone6Plus || (aj.y = Math.min(aj.y, s)), y.deviceProps.isIphone6Plus && "landscape" === K ? (al.style.marginLeft = "0px", am += ["translate(", aj.x, "px,", aj.y, "px) "].join("")) : (al.style.marginLeft = aj.x + "px", am += ["translateY(", aj.y, "px) "].join(""), am += "rotate(720deg)"), (!aa || "slideIn" !== aa.type && "slideOut" !== aa.type) && "0s" !== al.style["-webkit-transition-duration"] && (al.style["-webkit-transition-duration"] = "0ms", al.style["transition-duration"] = "0ms"), al.style["-webkit-transform"] !== am && (al.style["-webkit-transform"] = am, al.style.transform = am, B.crispAd.triggerIfr(B.crispAd.adId, "banner", "cac_adhere_zoomed", {
                        scale: ao
                    }), 1 === ao && d && R > 1 && (ao = R), B.crispAd.closeBanner && B.crispAd.resizeCloseBanner(ao)), al.style.transform
                }

                function Z(o, c) {
                    var p = (c && c.style.webkitTransform, B.crispAd.getBannerDims("height", W) + "px");
                    return o && p ? void("block" === c.style.display ? (c.style.display = "inline-block", c.style.height = p) : (c.style.display = "block", c.style.height = p)) : !1
                }

                function J(c) {
                    B.crispAd && B.crispAd._iframeWindow && B.crispAd._iframeWindow._cjq && B.crispAd._iframeWindow._cjq.crispAdFramework && B.crispAd._iframeWindow._cjq.crispAdFramework.trigger(c)
                }
                var n, K, S = B.getCssAdCradle(),
                    ac = B.getAdCradle(),
                    O = B.crispAd.getBannerIframe(),
                    r = 200,
                    s = I.documentElement.scrollHeight,
                    d = (y.deviceProps.isMobileOptimized(), B.crispAd.isAdhesionStretched()),
                    R = 1,
                    X = "",
                    W = B.crispAd.adProps,
                    M = {},
                    Q = I.getElementById(B.spacerDiv);
                return O ? N() && B.crispAd.adProps ? (n = y.getZoomFactor(), K = U(), "landscape" !== K && _cjq.AdEngine.isPreviewRequest() !== !0 || (d = !1), R = ab(), M = V(n, R, W, d), T(n, R, ac, S, O, M), A(S), L(Q), X = Y(n, ac, S, O, M), aa && "slideIn" === aa.type ? setTimeout(H.bind(this, ac), 200) : H(ac), y.deviceProps.iosVersion() && y.deviceProps.iosVersion().version >= 6 && (Z(ac, S), setTimeout(Z.bind(this, ac, S), 700)), J("cac_adhere_moved"), X) : !1 : void 0
            }

            function l(M, R) {
                function K() {
                    var U, s, r, Z, t, T, o, X, W, Y, d, V = 0;
                    if (B.moveAdhereRaceConditionFlag = !0, s = I.body, r = I.getElementsByClassName("crispTopAdCradle")[0], Z = r.style.top || r.offsetTop, Z = parseInt(Z, 10) || 0, !Z && window.getComputedStyle && (d = I.defaultView.getComputedStyle(r, null), Z = d.getPropertyValue("top"), Z = parseInt(Z, 10) || 0), I.defaultView.getComputedStyle && (d = d || I.defaultView.getComputedStyle(r, null), null === d)) {
                        return clearInterval(P.timer), void(B.inIframe = !0)
                    }
                    U = window.innerHeight - (O - 1) + window.pageYOffset - N - Z, W = null, p > 1 && --p, N += U / p, t = r.style.left || r.offsetLeft, t = parseInt(t, 10) || 0, !t && window.getComputedStyle && I.defaultView && (t = d.getPropertyValue("left"), t = parseInt(t, 10) || 0), Math.abs(U) <= 1 && (N = Math.floor(N), clearInterval(P.timer)), R === !0 ? (n.style.position = "fixed", n.style.bottom = "0px", delete n.style.top, delete n.style.margin) : (V = m(), n.style.top = N - V + "px"), r.style.display = "block", n.style.opacity = 1, o = (v() - S) / 2, o -= (I.body.clientWidth - I.body.offsetWidth) / 2, spacer = I.getElementById(B.spacerDiv), spacer && (spacer.style.height = O + "px"), X = 1, X > 1 && (o -= (v() * X - v()) / 2), I.defaultView && I.defaultView.getComputedStyle && (Y = I.defaultView.getComputedStyle(s, null), rightMargin = Y.getPropertyValue("margin-right"), rightMargin = parseInt(rightMargin, 10) || 0, leftMargin = Y.getPropertyValue("margin-left"), leftMargin = parseInt(leftMargin, 10) || 0, T = leftMargin + rightMargin);
                    var c = o - t + T / 2;
                    0 > c && (c = 0), n.style.left = c + "px", B.moveAdhereRaceConditionFlag = !1
                }
                var n, P, p, N, S, O, J, Q = B.getCssAdCradle(),
                    L = B.crispAd.adProps;
                L && Q && (J = y.deviceProps.orientationmode(), S = parseInt(B.crispAd.getBannerDims("width", L), 10), O = parseInt(B.crispAd.getBannerDims("height", L), 10), "expanded" === y.bannerState && (S = L.expandedWidth, O = L.expandedHeight), n = B.getAdCradle(), null !== n && (P = arguments.callee, P.timer && clearInterval(P.timer), p = 2, N = parseInt(n.style.top, 10) || 0, window.innerHeight - (O - 1) + window.pageYOffset === N ? (n.style.top = window.pageYOffset, K()) : ("undefined" != typeof iScrollFrom && null !== iScrollFrom && "object" != typeof iScrollFrom || (iScrollFrom = window.innerHeight + window.pageYOffset + O), N = iScrollFrom, P.timer = setInterval(K, 10))))
            }
            B.crispAd.isAdhesion && (B.crispAd.useCssTransformation !== !0 || B.crispAd.isFixedAdhesion === !0 || w() ? l(g, B.crispAd.isFixedAdhesion) : f(g))
        }, B.safeClick = {}, B.safeClick.setClickableArea = function(c, a) {
            try {
                if (!c || !a || isNaN(a)) {
                    throw new Error("AdhesionCradle.safeClick.setClickableArea: invalid or missing parameter(s)")
                }
                if (a = parseInt(a, 10), !c.style) {
                    throw new Error("AdhesionCradle.safeClick.setClickableArea: invalid element or json")
                }
                c.style.paddingTop = a + "px", c.style.width = B.safeClick.bannerWidth + "px", c.style.height = B.safeClick.bannerHeight + "px"
            } catch (d) {
                return !1
            }
        }, B.safeClick.isValidTarget = function(c, a) {
            return c && a ? !!a.contains(c) || a === c : !1
        }, B.safeClick.executeSafeClickAction = function() {
            try {
                B.crispAd.executeSafeClickAction()
            } catch (a) {
                return !1
            }
        }, B.safeClick.clickHandler = function(c) {
            var a = (B.crispBannerId, B.getAdCradle());
            B.safeClick.areaDiv, "crisp_close_banner" !== c.srcElement.parentElement.id && "crisp_close_banner" !== c.srcElement.parentElement.parentElement.id && "crisp_close_banner" !== c.srcElement.parentElement.parentElement.parentElement.id && !B.crispAd.isAdExpanded() && a && B.safeClick.isValidTarget(c.target, a) && (c.stopPropagation(), B.safeClick.executeSafeClickAction())
        }, B.safeClick.touchDurationMinHandler = function(h) {
            function f(a) {
                var o = B.safeClick.areaDiv;
                B.safeClick.timer && (clearTimeout(B.safeClick.timer), B.safeClick.timer = null), o.removeEventListener("touchend", f, !1)
            }
            var m = B.safeClick.areaDiv,
                d = B.safeClick.timer,
                g = B.crispBannerId,
                c = I.getElementById(g),
                l = parseInt(B.safeClick.touchDurationMin, 10);
            d && (clearTimeout(d), B.safeClick.timer = d = null), m.addEventListener("touchend", f, !1), !_cjq.AdEngine.isAdExpanded() && c && B.safeClick.isValidTarget(h.target, c) && (d = B.safeClick.timer = setTimeout(function() {
                return function() {
                    B.safeClick.executeSafeClickAction()
                }
            }(), l))
        }, B.safeClick.swipeHandler = function(m, K) {
            function h(o) {
                function d(Q) {
                    var O, M, N, R, t = B.safeClick.areaDiv,
                        P = (Q.touches ? Q.touches[0] : Q, B.safeClick.touchDurationMax);
                    B.safeClick.emitted = !0, t.removeEventListener("touchmove", h, !1), t.removeEventListener("touchend", d, !1), B.safeClick.touched = !1, B.safeClick.moving = !1, R = l.time - p.time, O = Math.abs(p.scrollY - l.scrollY), M = Math.abs(p.coords[1] - l.coords[1]), N = Math.max(O, M), Math.abs(N) < g && P > R && B.safeClick.doAction()
                }
                var n = B.safeClick.areaDiv,
                    c = o.touches ? o.touches[0] : o;
                /android/i.test(navigator.userAgent) && o.preventDefault(), p && (l = {
                    time: (new Date).getTime(),
                    coords: [c.pageX, c.pageY],
                    origin: o.target,
                    scrollY: window.scrollY
                }, B.safeClick.moving || (n.addEventListener("touchend", d, !1), B.safeClick.moving = !0))
            }
            var l, f = B.safeClick.areaDiv,
                J = m.touches ? m.touches[0] : m,
                g = (B.safeClick.touchDurationMax, B.safeClick.touchDistance),
                p = {
                    time: (new Date).getTime(),
                    coords: [J.pageX, J.pageY],
                    origin: m.target,
                    scrollY: window.scrollY
                },
                L = (B.safeClick.emitted = !1, B.crispBannerId),
                u = I.getElementById(L);
            u && (B.safeClick.isValidTarget(m.target, u) || m.target === B.safeClick.areaDiv) && (B.safeClick.touched || _cjq.AdEngine.isAdExpanded() || (f.addEventListener("touchmove", h, !1), B.safeClick.touched = !0))
        }, B.safeClick.setHandlers = function(c) {
            try {
                if (!c) {
                    throw new Error("AdhesionCradle.safeClick.setHandlers: trigger not specified.")
                }
                switch ("touch" === c && (c = void 0 !== B.safeClick.touchDurationMin && null !== B.safeClick.touchDurationMin ? "touchstart" : "touchend"), c) {
                    case "touchend":
                        B.safeClick.areaDiv.addEventListener("touchstart", B.safeClick.swipeHandler, !1);
                        break;
                    case "touchstart":
                        B.safeClick.areaDiv.addEventListener("touchstart", B.safeClick.touchDurationMinHandler, !1), B.safeClick.areaDiv.addEventListener("touchstart", B.safeClick.swipeHandler, !1);
                        break;
                    case "click":
                        B.safeClick.areaDiv.addEventListener("click", B.safeClick.clickHandler, !1);
                        break;
                    default:
                        throw new Error("AdhesionCradle.safeClick.setHandlers: invalid trigger value")
                }
                return !0
            } catch (a) {
                return !1
            }
        }, B.safeClick.initSafeClick = function(d, c) {
            if (B.crispAd.zp && B.crispAd.zp.adhesion && !B.safeClick.initialize) {
                B.safeClick.initialize = !0, B.safeClick.touchTrigger = B.crispAd.zp.adhesion.clickType, B.safeClick.touchArea = B.crispAd.zp.adhesion.extendClickMarginUp, B.safeClick.touchDurationMin = B.crispAd.zp.adhesion.touchTime, B.safeClick.touchDurationMax = B.crispAd.zp.adhesion.maxTouchThreshold, B.safeClick.touchDistance = B.crispAd.zp.adhesion.maxDistanceThreshold, B.safeClick.bannerWidth = c.collapsedWidth, B.safeClick.bannerHeight = c.collapsedHeight, B.safeClick.touched = !1, B.safeClick.moving = !1, B.safeClick.timer = null;
                var f = I.getElementById(B.crispBannerId);
                try {
                    return void 0 === B.safeClick.touchArea && (B.safeClick.touchArea = "0"), "click" === B.safeClick.touchTrigger && "0" === B.safeClick.touchArea ? !1 : (B.safeClick.areaDiv = f, void 0 !== B.safeClick.touchArea && (B.safeClick.touchArea = parseInt(B.safeClick.touchArea, 10), B.safeClick.setClickableArea(f, B.safeClick.touchArea)), B.safeClick.setHandlers(B.safeClick.touchTrigger), !0)
                } catch (a) {
                    return !1
                }
            }
        }, B.hideCradle = function(a) {
            F(a)
        }, B.isAdhesionHidden = function() {
            var c = B.getAdCradle(),
                a = !1;
            return c ? (B.crispAd.isAdExpanded() || (a = "none" === c.style.display || 1 != c.style.opacity), a) : a
        }, B.initializeAdhesion = function(l) {
            B.crispAd = l, B.adId = l.adId, B.crispBannerId = "crisp_Ad_Cradle__" + l.adId, console.log(l), window.addEventListener("scroll", function(a) {
                return B.crispAd && B.crispAd.adProps && B.crispAd.adProps.isFixedAdhesion === !0 ? (D("crisp_Ad_Cradle__" + B.crispAd.adId), void B.resetPosition(a, !0)) : (B.scrollstart = !0, y.deviceProps.iosVersion() && "IPad" !== y.deviceProps.iosVersion().IOS && B.pageYOffset < window.pageYOffset && (B.scrollstart = !0, setTimeout(function() {
                    B.scrollstart = !1
                }, 400), y.isDesktopBrowser() || w() || B.onTouchStartFired || (B.hideCradle(a), B.scrollHiddenAdhesion = !0, setTimeout(function() {
                    B.scrollstart && (B.scrollProcessed ? setTimeout(function() {
                        B.scrollHiddenAdhesion && B.isAdhesionHidden() && B.resetPosition()
                    }, 1200) : (B.isAdhesionHidden() && B.watchDogShow(1), B.scrollProcessed = !0, B.scrollHiddenAdhesion = !1, setTimeout(function() {
                        B.scrollProcessed = !1
                    }, 2000)))
                }, 600))), B.pageYOffset = window.pageYOffset, void((y.isDesktopBrowser() || w()) && B.resetPosition(a)))
            }), window.addEventListener("resize", function(a) {
                y.deviceProps.isIOS && y.deviceProps.isMobileOptimized() || ("onorientationchange" in I.documentElement || B.lastScreenWidth === window.innerWidth ? B.lastScreenHeight !== window.innerHeight && (B.lastScreenHeight = window.innerHeight, B.resetPosition(a)) : B.lastScreenWidth = window.innerWidth)
            }), window.addEventListener("orientationchange", function() {
                function o(n) {
                    n.style.display = "block"
                }
                var m = B.crispAd,
                    p = m.getBannerIframe(),
                    a = m.getTopDiv(m.adId);
                a.style.display = "none", p && "none" !== p.style.display && (p.style.display = "none", setTimeout(o.bind(this, p), 700)), setTimeout(o.bind(this, a), 700)
            });
            var f = x();
            if (f.addEventListener("touchmove", F, !1), f.addEventListener("touchend", b, !1), f.addEventListener("touchstart", z, !1), B.crispAd.isAdhesionStretched() && y.bind("cac_panel_action", function(m, a) {
                B.resetPosition(m)
            }), !w() && B.firstScroll && (B.setWebKitProps("crisp_Css_Ad_Cradle__" + B.adId), B.firstScroll = !1), C(), l.adParams && l.zp && l.zp.adhesion && l.zp.adhesion.overrideBannerClose && "none" !== l.zp.adhesion.overrideBannerClose) {
                var d = l.zp.adhesion.overrideBannerClose,
                    h = ["overflow:hidden;height:23px;width:23px;", d, ":0px;top:-20px;position:absolute;"].join(""),
                    c = [l.zp.fs, "adFramework/", l.zp.ver, "/components/img/network_close_button2x.png"].join(""),
                    g = [l.zp.trackerkey, c, h, "panelobject", "close_banner_override", "cmAdFrame__" + l.adId];
                g.adframeid = g[5], y.bind("cac_ad_rendered", function() {
                    var e = l.getBannerIframe(),
                        m = e && e.contentWindow && e.contentWindow._cjq,
                        a = m.crispAdFramework.getAdJson(l.zp.trackerkey);
                    a.definition.close_banner_override || (a.definition.close_banner_override = {
                        componentname: "banner-close-button",
                        css: h,
                        id: "close_banner_override",
                        params: {
                            "#alt#": "close ad",
                            "#applyAdhesionClose#": "true",
                            "#closeButtonChooser#": "square",
                            "#displayOrientation#": "true",
                            "#displayStage#": "banner",
                            "#div_id#": "close_banner_override",
                            "#evtobjectid#": l.zp.overrideCloseId,
                            "#evtobjectname#": "close_banner_override",
                            "#evtplacement#": "panelobject",
                            "#hideTrigger#": "When this component hidden",
                            "#hiressrc#": c,
                            "#impressionable#": "false",
                            "#loadingPhase#": "1",
                            "#showEffectTrigger#": "When this component shown",
                            "#textPadding#": "0"
                        }
                    }, l.closeBannerDivCss = {
                        landscape: "",
                        portrait: h
                    }, setTimeout(function() {
                        y.trigger("addCrispBannerCloseButton", g)
                    }, 50))
                })
            }
        }, E.exports = B
    },
    function(b, a) {
        function c() {
            function e() {
                try {
                    var h = document.getElementsByTagName("head") && document.getElementsByTagName("head").item(0),
                        g = document.createElement("script"),
                        j = "mraid.js";
                    g.setAttribute("type", "text/javascript"), g.setAttribute("src", j), document.querySelector("[src='mraid.js']") || h.appendChild(g)
                } catch (f) {
                    "undefined" != typeof console && console.log("error loading mraid.js: " + f)
                }
            }
            if (!(_caf.zp && _caf.zp.mraid && "false" !== _caf.zp.mraid.mraid || "undefined" != typeof _crispWebTester)) {
                return _cjq
            }
            console.log("****** mraid *****");
            var d = _cjq && _cjq.InApp;
            return _cjq.crispMraidObj = {
                DEBUG: 4,
                INFO: 3,
                WARN: 2,
                ERR: 1,
                debugLevel: 4,
                trackerkey: "",
                preExpand: !1,
                hasExpanded: !1,
                lastState: "unknown",
                isMraid: !1,
                isInapp: !1,
                mraidReadyCalled: !1,
                init: function(j) {
                    function g() {
                        var m = j.document.querySelectorAll("meta"),
                            o = null;
                        for (i = 0; i < m.length; i++) {
                            "viewport" === m[i].name && (o = m[i])
                        }
                        return o
                    }

                    function l(m) {
                        var o = m || g();
                        o && (o.setAttribute("name", "viewport"), o.setAttribute("content", "initial-scale=1.0, maximum-scale=1.0, user-scalable=no"))
                    }

                    function h() {
                        var n = j.document.createElement("meta"),
                            m = j.document.getElementsByTagName("head")[0];
                        l(n), m && m.appendChild(n)
                    }
                    var f, k = _cjq.InApp,
                        j = j || window;
                    return f = g(), f ? l(f) : h(), _cjq.AdEngine.isPreExpandable() && (k.preExpand = !0), k.debug(k.DEBUG, "INAPP init"), mraid = j.mraid, void 0 === mraid ? void k.debug(k.DEBUG, "INAPP mraid container not found") : (k.isMraid = !0, k.inApp = k.isMraid, void(k.inApp ? (k.setDeviceProps(), k.mraidInit(), k.registerErrorHandler(), k.preExpand || k.bindPanelAction(), k.bindBannerResize(), k.bindTrackInteraction(), k.setClickDelegate(), k.setImpressionDelegate()) : (k.debug(k.WARN, "INAPP no in-app container found"), _cjq.AdUtils.bind("cac_gotostage", _cjq.InApp.deferedInit))))
                },
                deferedInit: function(g, f) {
                    var h = _cjq.InApp;
                    h.inApp ? h.debug(h.DEBUG, "INAPP defered init already called") : (h.debug(h.INFO, "INAPP defered init from cac_panel_action"), _cjq.AdUtils.unbind("cac_gotostage", _cjq.InApp.deferedInit, window), f && "open" === f[1] ? h.init() : setTimeout(h.init, 500))
                },
                registerErrorHandler: function() {
                    var g = _cjq.InApp;
                    try {
                        g.debug(g.DEBUG, "INAPP registerErrorHandler"), mraid.addEventListener("error", g.inappErrorHandler)
                    } catch (f) {
                        g.debug(g.ERR, "INAPP registerErrorHandler failed: " + f.message)
                    }
                },
                inappErrorHandler: function(g, f) {
                    var h = _cjq.InApp;
                    h.debug(h.ERR, "INAPP " + g + "(from action " + f + ")")
                },
                bindPanelAction: function() {
                    var f = _cjq.InApp;
                    f.debug(f.DEBUG, "INAPP bindPanelAction"), _cjq.AdUtils.bind("cac_panel_action", f.panelActionHandler)
                },
                bindBannerResize: function() {
                    var f = _cjq.InApp;
                    f.debug(f.DEBUG, "INAPP bindBannerResize"), _cjq.AdUtils.bind("cac_banner_resize", f.bannerResizeHandler)
                },
                bindTrackInteraction: function() {
                    var f = _cjq.InApp;
                    f.debug(f.DEBUG, "INAPP bindTrackInteraction"), _cjq.AdUtils.bind("cac_track_interaction", f.closeBannerActionHandler)
                },
                setClickDelegate: function() {
                    var f = _cjq.InApp;
                    f.debug(f.DEBUG, "INAPP setClickDelegate"), _cjq.AdUtils.setDelegate("click-to-url", f.clickActionHander)
                },
                setImpressionDelegate: function() {
                    var g = _cjq.InApp,
                        f = null;
                    _cjq.AdEngine.getBannerIframe() && (f = _cjq.AdEngine.getBannerIframe().contentWindow, g.debug(g.DEBUG, "INAPP setImpressionDelegate"), f && f._cjq.crispAdFramework.setDelegate("banner-impression", g.sendImpressionTracker))
                },
                closeConfirm: function() {
                    var f = _cjq.InApp;
                    f.debug(f.DEBUG, "INAPP closeConfirm"), mraid.removeEventListener("stateChange", f.closeConfirm), f.lastState = mraid.getState(), mraid.addEventListener("stateChange", f.mraidCheckForClose)
                },
                resizeConfirm: function() {
                    var f = _cjq.InApp;
                    f.debug(f.DEBUG, "INAPP resizeConfirm"), mraid.removeEventListener("stateChange", f.resizeConfirm), f.lastState = mraid.getState(), mraid.addEventListener("stateChange", f.mraidCheckForClose)
                },
                expandConfirm: function() {
                    var f = _cjq.InApp;
                    f.debug(f.DEBUG, "INAPP expandConfirm"), mraid.removeEventListener("stateChange", f.expandConfirm), f.lastState = mraid.getState(), mraid.addEventListener("stateChange", f.mraidCheckForClose)
                },
                open: function(k) {
                    var h, m, g = _cjq.InApp,
                        j = null,
                        f = null;
                    if (j = _cjq.AdEngine.getBannerIframe()) {
                        f = j.contentWindow, h = f && f._cjq && f._cjq.crispAdFramework, g.debug(g.DEBUG, "INAPP open");
                        try {
                            g.debug(g.DEBUG, "INAPP first a client-side tracker for " + k), m = h && h.getParamValue(k, "evturl"), m && "" !== m ? (g.debug(g.DEBUG, "INAPP calling inapp.open using setTimeout for " + m), setTimeout("_cjq.InApp.open('" + unescape(m) + "', 'all')", 500)) : (g.debug(g.INFO, "INAPP no siteurl found - calling inapp.open for " + k), mraid.open(k, "all"))
                        } catch (l) {
                            g.debug(g.ERR, "INAPP error on inapp.open: " + l)
                        }
                    }
                },
                consoleDebug: function(f) {
                    "undefined" != typeof console && console.log(f)
                },
                debug: function(j, g) {
                    var k = _cjq.InApp;
                    if (j <= k.debugLevel) {
                        var f = document.getElementById("inapp-debug"),
                            h = "";
                        switch (j) {
                            case k.ERR:
                                h = "ERR: ";
                                break;
                            case k.INFO:
                                h = "INFO: ";
                                break;
                            case k.WARN:
                                h = "WARN: ";
                                break;
                            case k.DEBUG:
                                h = "DEBUG: "
                        }
                        f && (f.innerHTML = [h, g, "<br/>", f.innerHTML].join("")), "" !== g && k.consoleDebug(h + g)
                    }
                },
                bannerResizeHandler: function(k, h) {
                    var m = _cjq.InApp,
                        g = h.width,
                        j = h.height,
                        f = {
                            width: g,
                            height: j,
                            offsetX: 0,
                            offsetY: 0,
                            allowOffscreen: !1
                        };
                    m.debug(m.DEBUG, "MRAID banner resize handle called");
                    try {
                        m.hasResized !== !0 ? (m.hasResized = !0, m.debug(m.DEBUG, "MRAID calling resize"), mraid.addEventListener("stateChange", m.resizeConfirm), mraid.setResizeProperties(f), mraid.resize()) : m.hasResized ? (m.debug(m.DEBUG, "MRAID calling close"), mraid.addEventListener("stateChange", m.closeConfirm), lastMraidState = "closing", m.hasResized = !1, mraid.close()) : m.debug(m.INFO, "MRAID supress close because never expanded")
                    } catch (l) {
                        m.debug(m.ERR, "MRAID Error in bannerResizeHandler: " + l)
                    }
                },
                panelActionHandler: function(j, g) {
                    var k = _cjq.InApp,
                        f = g.action;
                    k.debug(k.DEBUG, "MRAID attempt mraid.expand/close() " + f);
                    try {
                        "open" === f ? (k.hasExpanded = !0, k.debug(k.DEBUG, "MRAID calling expand"), mraid.addEventListener("stateChange", k.expandConfirm), mraid.setExpandProperties({
                            useCustomClose: _cjq.InApp.useCustomClose
                        }), mraid.expand()) : (_cjq.InApp.closeByEvent && (_cjq.InApp.closeByEvent = !1), k.hasExpanded ? (k.debug(k.DEBUG, "MRAID calling close"), mraid.addEventListener("stateChange", k.closeConfirm), lastMraidState = "closing", k.hasExpanded = !1, mraid.close()) : k.debug(k.INFO, "MRAID supress close because never expanded"))
                    } catch (h) {
                        k.debug(k.ERR, "MRAID Error in panelActionHandler: " + h)
                    }
                },
                closeBannerActionHandler: function(h, g) {
                    var j = _cjq.InApp;
                    j.debug(j.DEBUG, "MRAID close banner handler called");
                    var f = g[3];
                    "close" === f && mraid.close()
                },
                sendImpressionTracker: function(g) {
                    var f = _cjq.InApp;
                    f.crispImpressionUrl = g;
                    var h;
                    return mraid.isViewable ? (mraid.isViewable() ? (h = new Image(1, 1), h.src = g) : mraid.addEventListener("viewableChange", function(j) {
                        j && (h = new Image(1, 1), h.src = f.crispImpressionUrl)
                    }), !0) : !1
                },
                clickActionHander: function(g) {
                    function f(m) {
                        var k, o, j = m.indexOf("evturl="),
                            l = "";
                        return j > 0 ? (o = m.indexOf("&xurl", j), o > 0 ? (k = o - j - "evturl=".length, l = m.substr(j + "evturl=".length, k)) : l = m.substr(j + "evturl=".length), unescape(l)) : m
                    }
                    var h = _cjq.InApp;
                    return h.debug(h.DEBUG, "MRAID click action handler called " + g), g ? (h.open(f(g)), !0) : !1
                },
                setDeviceProps: function() {
                    var g = _cjq.InApp,
                        f = mraid && mraid.getExpandProperties(),
                        h = 1;
                    return g.debug(g.INFO, "INAPP setting deviceProps"), f ? (_cjq.AdUtils.deviceProps.width = function() {
                        return f.width / h || window.innerWidth
                    }, _cjq.AdUtils.deviceProps.height = function() {
                        return f.height / h || window.innerHeight
                    }, _cjq.AdUtils.deviceProps) : !1
                },
                mraidInit: function() {
                    var f = _cjq.InApp;
                    f.debug(f.DEBUG, "MRAID init called"), "loading" === mraid.getState() ? (f.debug(f.DEBUG, "MRAID still loading, registering for ready event"), mraid.addEventListener("ready", f.mraidReady)) : (f.debug(f.INFO, "MRAID already ready, calling init directly"), f.mraidReady(!0))
                },
                setCustomClose: function(g) {
                    var f = _cjq.InApp;
                    f.debug(f.DEBUG, "setting useCustomClose to " + g), f.useCustomClose = !!eval(g), void 0 !== window.mraid && mraid.setExpandProperties({
                        useCustomClose: f.useCustomClose
                    })
                },
                mraidCheckForClose: function(m) {
                    var v, h = _cjq.InApp,
                        k = h.lastState;
                    try {
                        if (h.debug(h.DEBUG, "MRAID check for close event called"), "string" != typeof m && (m = mraid.getState()), h.debug(h.DEBUG, ["MRAID mraidCheckForClose, current state:", m, ", last state:", k].join("")), "default" === k && "resized" === m && mraid.resize && (v = mraid.getResizeProperties(), v && _cjq.AdUtils.trigger("cac_banner_iframe_resize", {
                            width: v.width,
                            height: v.height
                        })), ("expanded" === k || "resized" === k) && "default" === m) {
                            h.debug(h.DEBUG, "MRAID close by event");
                            var f = _cjq.AdEngine.getPanelClose(),
                                u = _cjq.AdEngine.getPanelIframe(),
                                g = u && u.contentWindow,
                                p = g && f && g.document.querySelector("#" + f),
                                w = p.childNodes[1],
                                q = document.createEvent("MouseEvents");
                            q.initMouseEvent && (_cjq.InApp.closeByEvent = !0, q.initMouseEvent("click", !0, !0, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), w.dispatchEvent(q), h.hasExpanded = !1)
                        }
                        k = h.lastState = mraid.getState()
                    } catch (j) {
                        h.debug(h.ERR, "MRAID Error in custom close: " + j)
                    }
                },
                mraidReady: function(g) {
                    var f = _cjq.InApp;
                    if (f.mraidReadyCalled) {
                        f.debug(f.INFO, "MRAID mraidReady method already called")
                    } else {
                        try {
                            f.mraidReadyCalled = !0, f.debug(f.DEBUG, "MRAID ready event called"), g || (f.debug(f.DEBUG, 'INAPP removing "ready" handler'), mraid.removeEventListener("ready")), f.preExpand ? (f.bindPanelAction(), f.debug(f.DEBUG, "MRAID calling expand by preExpand flag"), mraid.addEventListener("stateChange", f.expandConfirm), mraid.useCustomClose(f.useCustomClose), mraid.expand()) : mraid.addEventListener("stateChange", f.mraidCheckForClose), lastMraidState = f.lastState = mraid.getState()
                        } catch (h) {
                            f.debug(f.ERR, "Error in mraidReady: " + h)
                        }
                    }
                }
            }, _cjq && !d ? (e(window), window._cjq.AdUtils.bind("cac_ad_rendered", function(g, f) {
                if (!_cjq.InApp.initDone) {
                    var h = !0;
                    _caf.zp && _caf.zp.mraid && (h = _caf.zp.mraid.useCustomClose), _cjq.InApp.setCustomClose(h), _cjq.InApp.init(), _cjq.InApp.initDone = !0
                }
            }), _cjq.InApp = _cjq.crispMraidObj) : d && console.log("inapp already initialized."), _cjq
        }
        b.exports = c
    },
    function(b, a) {
        var c = {};
        c.extern = null, c.initSafeFrame = function(j, g) {
            var f, h, d;
            c.extern = window.extern || $sf.ext, $sf.ext ? (f = c.getGeom(), h = c.getMeta(), d = c.getFeatures(), c.bindAction("cac_panel_action"), c.writeLog("AD PROPERTIES"), c.writeLog("-- Ad dimensions:"), c.writeLog("---- width: " + g), c.writeLog("---- height: " + j), c.writeLog("-- meta: " + h), c.writeLog("-- features: " + d), c.writeLog("-- %viewable: " + c.getInViewPercentage()), c.writeLog("GEOM.EXP (Initial Values):"), c.writeLog("-- t: " + f.exp.t), c.writeLog("-- r: " + f.exp.r), c.writeLog("-- b: " + f.exp.b), c.writeLog("-- l: " + f.exp.l), c.writeLog("-- xs: " + f.exp.xs), c.writeLog("-- ys: " + f.exp.ys)) : c.writeLog("-- NO SAFEFRAMES FOUND")
        }, c.registerAd = function(f, d) {
            c.extern ? c.extern.register(f, d, c.status_update) : console.log(" no extern ::: ")
        }, c.bindAction = function(d) {
            _cjq.AdUtils.bind(d, c.actionHandler)
        }, c.actionHandler = function(h, f) {
            var d = h && h.type,
                g = {
                    cac_panel_action: "panelActionHandler"
                };
            g[d] ? ns[g[d]](f) : c.writeLog('Panel Event "' + d + '" not recognized')
        }, c.panelActionHandler = function(h) {
            var f, d = h && h[1];
            if (d || (d = h.action), !d) {
                return void c.writeLog(" *** no action sent *** ")
            }
            try {
                "open" === d ? c.expand() : c.collapse(), f = c.getGeom(), c.writeLog("GEOM.EXP UPDATE (after panel event handler)"), c.writeLog("-- t: " + f.exp.t), c.writeLog("-- r: " + f.exp.r), c.writeLog("-- b: " + f.exp.b), c.writeLog("-- l: " + f.exp.l), c.writeLog("-- xs: " + f.exp.xs), c.writeLog("-- ys: " + f.exp.ys), c.writeLog("AD PROPERTIES UPDATE"), c.writeLog("-- %viewable: " + c.getInViewPercentage())
            } catch (g) {
                c.writeLog("-- ERR: " + g)
            }
        }, c.expand = function() {
            var j, g, f, h, d;
            if ($sf.ext) {
                try {
                    j = c.getGeom(), g = j && j.exp.r || 0, f = j && j.exp.b || 0, h = j && j.exp.t || 0, d = j && j.exp.l || 0, $sf.ext.expand({
                        t: h,
                        l: d,
                        r: g,
                        b: f
                    }), j = c.getGeom(), c.writeLog("GEOM.EXP UPDATE (after expand)"), c.writeLog("-- t: " + j.exp.t), c.writeLog("-- r: " + j.exp.r), c.writeLog("-- b: " + j.exp.b), c.writeLog("-- l: " + j.exp.l), c.writeLog("-- xs: " + j.exp.xs), c.writeLog("-- ys: " + j.exp.ys), c.writeLog("AD PROPERTIES UPDATE"), c.writeLog("-- %viewable: " + c.getInViewPercentage())
                } catch (k) {
                    c.writeLog("-- ERROR EXPANDING: " + k)
                }
            } else {
                c.writeLog("-- SAFEFRAMES EXPAND NOT SUPPORTED")
            }
        }, c.collapse = function() {
            $sf.ext.collapse()
        }, c.getGeom = function() {
            var d = $sf.ext.geom();
            return d
        }, c.getStatus = function() {
            var d = $sf.ext.status();
            return d
        }, c.getMeta = function(h, f) {
            var j, d = h || null,
                g = f || null;
            return j = $sf.ext.meta(d, g), "" === j && (j = "no meta available"), j
        }, c.getFeatures = function() {
            var d = $sf.ext.supports();
            return d
        }, c.getInViewPercentage = function() {
            var d = $sf.ext.inViewPercentage();
            return d
        }, c.status_update = function(f, d) {
            c.writeLog("-- STATUS UPDATE: " + f), d && c.writeLog("-- data: " + d)
        }, c.writeLog = function(d) {
            window.console && console.log(d)
        }, b.exports = c
    }
]);