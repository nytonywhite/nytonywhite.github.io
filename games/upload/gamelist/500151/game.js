"use strict";
(function(e) {
    function t(e, t) { console.log("[CloudAPI " + r + "] " + e, t) }

    function n() {
        return s["ad-rotation"] ? d["ad-count"] == s["ad-rotation"] - 1 ? (t("The ad-count is equal to (ad-rotation - 1)"), d["ad-count"] = 0, !0) : (d["ad-count"] = d["ad-count"] + 1, !1) : (t("No ad-rotation config!"), !1)
    }

    function a() {
        for (var e = [], t = document.getElementsByTagName("link"), n = 0; t.length > n; n++) t[n].rel.indexOf("icon") > -1 && e.push({ sizes: t[n].sizes.value, href: t[n].href, rel: t[n].rel });
        return e
    }

    function i(t, n) {
        switch (t) {
            case "GAME_CONFIG":
                var n = JSON.parse(n);
                s["ad-rotation"] = n["ad-rotation"], s["ad-play"] = n["ad-play"], s.distribution = n.distribution, s["links-active"] = n["links-active"], e.mpConfig = { game: s.distribution.substring(0, s.distribution.indexOf("-en-s")), partner: "cloudgames" };
                var a = document.createElement("script");
                a.src = "http://ext.minijuegosgratis.com/external-host/main.js", document.body.appendChild(a);
                break;
            case "GAME_UNMUTE":
                f.unmute()
        }
    }

    function o(t, n) { e.parent && e.parent.postMessage("cloud://" + t + "/--/" + n, "*") }
    var r = "1.2.7",
        s = {},
        c = {},
        d = { "ad-count": 0 },
        u = "//cloudgames.com/api",
        l = e.addEventListener ? "addEventListener" : "attachEvent",
        m = e[l],
        p = "attachEvent" == l ? "onmessage" : "message";
    m(p, function(e) {
        var t = e.message ? "message" : "data",
            n = e[t];
        if (n.indexOf("cloud://") > -1) {
            var n = n.replace("cloud://", "").split("/--/");
            i(n[0], n[1])
        }
    }, !1);
    var g = {
            http: function(e, t, n, a) {
                var i = new XMLHttpRequest;
                i.onreadystatechange = function() { 4 == i.readyState && (200 == i.status ? a(i.responseText) : a()) }, i.open(e, t, !0), i.setRequestHeader("Content-Type", "application/json"), i.send(n)
            }
        },
        f = {
            mute: function() {
                return "function" == typeof cr_setSuspended ? (cr_setSuspended(!0), !0) : !1
            },
            unmute: function() {
                return "function" == typeof cr_setSuspended ? (cr_setSuspended(!1), !0) : !1
            },
            init: function(e) { t("Initializing :)", e), c = e, o("GAME_INIT", JSON.stringify({ icons: a() })) },
            showAd: function() { t("Function showAd called.") },
            hideAd: function() { t("Function hideAd called.") },
            showAD: function() {

                var newWindow = window.parent == window ? window : window.parent;
                var isShowed;
                while (newWindow.parent != newWindow) {
                    newWindow = newWindow.parent;
                }
                if (newWindow.Android && newWindow.Android.showShare) {
                    isShowed = newWindow.Android.showShare(JSON.stringify());
                } else {
                    isShowed = newWindow.P.showShare();
                }
            },
            gameOver: function() {
            	console.log("showAD!!!");
                this.showAD();
                t("Function gameOver called."), n() && f.mute() && o("AD_SHOW")
            },
            scores: {
                submit: function(e, t) { g.http("POST", u + "/games/" + c.id + "/scores", JSON.stringify({ name: e, score: t }), function(e) { console.log("POST result", e) }) },
                fetch: function(e) { g.http("GET", u + "/games/" + c.id + "/scores", null, function(t) { d.scores = t, e && e(JSON.parse(t)) }) },
                list: function() {
                    return d.scores ? d.scores : !1
                }
            },
            play: function() { t("Function play called.", s), s["ad-play"] && f.mute() && o("AD_SHOW") },
            links: {
                active: function() {
                    return s["links-active"]
                }
            }
        };
    e.CloudAPI = f
})(window);
