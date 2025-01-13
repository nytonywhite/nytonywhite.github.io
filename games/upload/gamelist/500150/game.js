var _SETTINGS = {
    MarketJSGameCenter: { Activator: { Enabled: !1, Position: { Top: "12%", Left: "0" } }, API: { Enabled: !1, Log: { Events: { InitializeGame: !1, EndGame: !1, Level: { Begin: !1, End: !1, Win: !1, Lose: !1, Draw: !1 } } } } },
    API: { Enabled: !0, Log: { Events: { InitializeGame: !0, EndGame: !0, Level: { Begin: !1, End: !1, Win: !1, Lose: !1, Draw: !1 } } } },
    Ad: {
        Mobile: {
            Preroll: { Enabled: !1, Duration: 5, Width: 300, Height: 250, Rotation: { Enabled: !1, Weight: { MobileAdInGamePreroll: 40, MobileAdInGamePreroll2: 40, MobileAdInGamePreroll3: 20 } } },
            Header: {
                Enabled: !1,
                Duration: 5,
                Width: 320,
                Height: 50,
                Rotation: { Enabled: !1, Weight: { MobileAdInGameHeader: 40, MobileAdInGameHeader2: 40, MobileAdInGameHeader3: 20 } }
            },
            Footer: { Enabled: !1, Duration: 5, Width: 320, Height: 50, Rotation: { Enabled: !1, Weight: { MobileAdInGameFooter: 40, MobileAdInGameFooter2: 40, MobileAdInGameFooter3: 20 } } },
            End: { Enabled: !1, Duration: 1, Width: 300, Height: 250, Rotation: { Enabled: !1, Weight: { MobileAdInGameEnd: 40, MobileAdInGameEnd2: 40, MobileAdInGameEnd3: 20 } } }
        }
    },
    Language: { Default: "en" },
    DeveloperBranding: {
        Splash: { Enabled: !1 },
        Logo: {
            Enabled: !1,
            Link: "http://www.marketjs.com",
            LinkEnabled: !0,
            NewWindow: !0,
            Width: 166,
            Height: 61
        }
    },
    Branding: { Splash: { Enabled: !0 }, Logo: { Enabled: !0, Link: "javascript:void(0)", Link2: "javascript:void(0)", LinkEnabled: !0, NewWindow: !0, Width: 84, Height: 65 } },
    MoreGames: {
        Enabled: !0,
        Link: "www.rayjump.com",
        NewWindow: !0
    },
    Gamecenter: { Enabled: !1 }
};
var _STRINGS = {
    Ad: { Mobile: { Preroll: { ReadyIn: "The game is ready in ", Loading: "Your game is loading...", Close: "Close" }, Header: { ReadyIn: "The game is ready in ", Loading: "Your game is loading...", Close: "Close" }, End: { ReadyIn: "Advertisement ends in ", Loading: "Please wait ...", Close: "Close" } } },
    Splash: { Loading: "Loading ...", LogoLine1: "Some text here", LogoLine2: "powered by MarketJS", LogoLine3: "none" },
    Game: { SelectPlayer: "Select Player", Win: "You win!", Lose: "You lose!", Score: "Score", Time: "Time" },
    Results: { Title: "High score" },
    UnitStatistics: { Tank: { M1: { HP: 3E3, Armor: 50, Cost: 0, Upgrades: { Cost: { Base: 1E3, Increment: 1E3 }, HP: { Base: 100, Increment: 10 }, Armor: { Base: 5, Increment: 2 } }, Seats: { One: [43, 143], Two: [60, 17], Three: [141, 81] } }, M2: { HP: 2E3, Armor: 25, Cost: 1E4, Upgrades: { Cost: { Base: 1E3, Increment: 1E3 }, HP: { Base: 25, Increment: 5 }, Armor: { Base: 1, Increment: 2 } } }, M3: { HP: 2800, Armor: 10, Cost: 3E4, Upgrades: { Cost: { Base: 1E3, Increment: 1E3 }, HP: { Base: 100, Increment: 10 }, Armor: { Base: 2, Increment: 2 } } } } }
};
var MobileAdInGamePreroll = {
    ad_duration: _SETTINGS.Ad.Mobile.Preroll.Duration,
    ad_width: _SETTINGS.Ad.Mobile.Preroll.Width,
    ad_height: _SETTINGS.Ad.Mobile.Preroll.Height,
    ready_in: _STRINGS.Ad.Mobile.Preroll.ReadyIn,
    loading: _STRINGS.Ad.Mobile.Preroll.Loading,
    close: _STRINGS.Ad.Mobile.Preroll.Close + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
    Initialize: function() {
        if (_SETTINGS.Ad.Mobile.Preroll.Rotation.Enabled) {
            var b = _SETTINGS.Ad.Mobile.Preroll.Rotation.Weight,
                c = b.MobileAdInGamePreroll,
                d =
                c + b.MobileAdInGamePreroll2,
                b = d + b.MobileAdInGamePreroll3,
                e = Math.floor(100 * Math.random());
            console.log("seed: ", e);
            e <= c ? this.selectedOverlayName = "MobileAdInGamePreroll" : e <= d ? this.selectedOverlayName = "MobileAdInGamePreroll2" : e <= b && (this.selectedOverlayName = "MobileAdInGamePreroll3");
            console.log("Ad rotating preroll enabled")
        } else this.selectedOverlayName = "MobileAdInGamePreroll", console.log("Ad rotating preroll disabled");
        console.log("selected:", this.selectedOverlayName);
        this.overlay = $("#" + this.selectedOverlayName);
        this.box = $("#" + this.selectedOverlayName + "-Box");
        this.game = $("#game");
        this.boxContents = { footer: $("#" + this.selectedOverlayName + "-Box-Footer"), header: $("#" + this.selectedOverlayName + "-Box-Header"), close: $("#" + this.selectedOverlayName + "-Box-Close"), body: $("#" + this.selectedOverlayName + "-Box-Body") };
        this.box.width(this.ad_width);
        this.box.height(this.ad_height);
        this.box.css("left", (this.overlay.width() - this.box.width()) / 2);
        this.box.css("top", (this.overlay.height() - this.box.height() - this.boxContents.header.height() -
            this.boxContents.footer.height()) / 2);
        this.overlay.show(this.Timer(this.ad_duration))
    },
    Timer: function(b) {
        var c = b,
            d = setInterval(function() {
                MobileAdInGamePreroll.boxContents.header.text(MobileAdInGamePreroll.ready_in + c + "...");
                MobileAdInGamePreroll.boxContents.footer.text(MobileAdInGamePreroll.loading);
                c--;
                0 > c && (clearInterval(d), MobileAdInGamePreroll.boxContents.close.css("left", MobileAdInGamePreroll.boxContents.body.width() - 23), MobileAdInGamePreroll.boxContents.close.show(), MobileAdInGamePreroll.boxContents.header.html(MobileAdInGamePreroll.close),
                    MobileAdInGamePreroll.boxContents.footer.text(""))
            }, 1E3)
    },
    Close: function() { this.boxContents.close.hide();
        this.overlay.hide() }
};
var MobileAdInGameHeader = {
    ad_duration: _SETTINGS.Ad.Mobile.Header.Duration,
    ad_width: _SETTINGS.Ad.Mobile.Header.Width,
    ad_height: _SETTINGS.Ad.Mobile.Header.Height,
    Initialize: function() {
        if (_SETTINGS.Ad.Mobile.Header.Rotation.Enabled) {
            var b = _SETTINGS.Ad.Mobile.Header.Rotation.Weight,
                c = b.MobileAdInGameHeader,
                d = c + b.MobileAdInGameHeader2,
                b = d + b.MobileAdInGameHeader3,
                e = Math.floor(100 * Math.random());
            console.log("seed: ", e);
            e <= c ? this.selectedOverlayName = "MobileAdInGameHeader" : e <= d ? this.selectedOverlayName = "MobileAdInGameHeader2" :
                e <= b && (this.selectedOverlayName = "MobileAdInGameHeader3");
            console.log("Ad rotating header enabled")
        } else this.selectedOverlayName = "MobileAdInGameHeader", console.log("Ad rotating header disabled");
        this.div = $("#" + this.selectedOverlayName);
        this.game = $("#game");
        this.div.width(this.ad_width);
        this.div.height(this.ad_height);
        this.div.css("left", this.game.position().left + (this.game.width() - this.div.width()) / 2);
        this.div.css("top", 0);
        this.div.show(this.Timer(this.ad_duration))
    },
    Timer: function(b) {
        var c = setInterval(function() {
            b--;
            0 > b && (MobileAdInGameHeader.div.hide(), clearInterval(c))
        }, 1E3)
    }
};
var MobileAdInGameFooter = {
    ad_duration: _SETTINGS.Ad.Mobile.Footer.Duration,
    ad_width: _SETTINGS.Ad.Mobile.Footer.Width,
    ad_height: _SETTINGS.Ad.Mobile.Footer.Height,
    Initialize: function() {
        if (_SETTINGS.Ad.Mobile.Footer.Rotation.Enabled) {
            var b = _SETTINGS.Ad.Mobile.Footer.Rotation.Weight,
                c = b.MobileAdInGameFooter,
                d = c + b.MobileAdInGameFooter2,
                b = d + b.MobileAdInGameFooter3,
                e = Math.floor(100 * Math.random());
            console.log("seed: ", e);
            e <= c ? this.selectedOverlayName = "MobileAdInGameFooter" : e <= d ? this.selectedOverlayName = "MobileAdInGameFooter2" :
                e <= b && (this.selectedOverlayName = "MobileAdInGameFooter3");
            console.log("Ad rotating footer enabled")
        } else this.selectedOverlayName = "MobileAdInGameFooter", console.log("Ad rotating footer disabled");
        this.div = $("#" + this.selectedOverlayName);
        this.game = $("#game");
        this.div.width(this.ad_width);
        this.div.height(this.ad_height);
        this.div.css("left", this.game.position().left + (this.game.width() - this.div.width()) / 2);
        this.div.css("top", this.game.height() - this.div.height() - 5);
        this.div.show(this.Timer(this.ad_duration))
    },
    Timer: function(b) {
        var c = setInterval(function() { b--;
            0 > b && (MobileAdInGameFooter.div.hide(), clearInterval(c)) }, 1E3) }
};
var MobileAdInGameEnd = {
    ad_duration: _SETTINGS.Ad.Mobile.End.Duration,
    ad_width: _SETTINGS.Ad.Mobile.End.Width,
    ad_height: _SETTINGS.Ad.Mobile.End.Height,
    ready_in: _STRINGS.Ad.Mobile.End.ReadyIn,
    loading: _STRINGS.Ad.Mobile.End.Loading,
    close: _STRINGS.Ad.Mobile.End.Close + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
    Initialize: function() {
        if (_SETTINGS.Ad.Mobile.End.Rotation.Enabled) {
            var b = _SETTINGS.Ad.Mobile.End.Rotation.Weight,
                c = b.MobileAdInGameEnd,
                d = c + b.MobileAdInGameEnd2,
                b = d + b.MobileAdInGameEnd3,
                e = Math.floor(100 * Math.random());
            console.log("seed: ", e);
            e <= c ? this.selectedOverlayName = "MobileAdInGameEnd" : e <= d ? this.selectedOverlayName = "MobileAdInGameEnd2" : e <= b && (this.selectedOverlayName = "MobileAdInGameEnd3");
            console.log("Ad rotating end enabled")
        } else this.selectedOverlayName = "MobileAdInGameEnd", console.log("Ad rotating end disabled");
        console.log("selected:", this.selectedOverlayName);
        this.overlay = $("#" + this.selectedOverlayName);
        this.box = $("#" + this.selectedOverlayName + "-Box");
        this.game = $("#game");
        this.boxContents = { footer: $("#" + this.selectedOverlayName + "-Box-Footer"), header: $("#" + this.selectedOverlayName + "-Box-Header"), close: $("#" + this.selectedOverlayName + "-Box-Close"), body: $("#" + this.selectedOverlayName + "-Box-Body") };
        this.box.width(this.ad_width);
        this.box.height(this.ad_height);
        this.box.css("left", (this.overlay.width() - this.box.width()) / 2);
        this.box.css("top", (this.overlay.height() - this.box.height() - this.boxContents.header.height() - this.boxContents.footer.height()) / 2);
        this.overlay.show(this.Timer(this.ad_duration))
    },
    Timer: function(b) {
        var c = b,
            d = setInterval(function() { MobileAdInGameEnd.boxContents.header.text(MobileAdInGameEnd.ready_in + c + "...");
                MobileAdInGameEnd.boxContents.footer.text(MobileAdInGameEnd.loading);
                c--;
                0 > c && (clearInterval(d), MobileAdInGameEnd.boxContents.close.css("left", MobileAdInGameEnd.boxContents.body.width() - 23), MobileAdInGameEnd.boxContents.close.show(), MobileAdInGameEnd.boxContents.header.html(MobileAdInGameEnd.close), MobileAdInGameEnd.boxContents.footer.text("")) }, 1E3) },
    Close: function() {
        this.boxContents.close.hide();
        this.overlay.hide()
    }
};
(function(b, c) {
    function d(b, t, p) {
        if (p === c && 1 === b.nodeType)
            if (p = "data-" + t.replace(tc, "-$1").toLowerCase(), p = b.getAttribute(p), "string" == typeof p) {
                try { p = "true" === p ? !0 : "false" === p ? !1 : "null" === p ? null : +p + "" === p ? +p : uc.test(p) ? f.parseJSON(p) : p } catch (d) {}
                f.data(b, t, p) } else p = c;
        return p }

    function e(b) {
        for (var c in b)
            if (!("data" === c && f.isEmptyObject(b[c])) && "toJSON" !== c) return !1;
        return !0 }

    function g() {
        return !1 }

    function j() {
        return !0 }

    function q(b) {
        return !b || !b.parentNode || 11 === b.parentNode.nodeType }

    function n(b,
        c) { do b = b[c]; while (b && 1 !== b.nodeType);
        return b }

    function r(b, c, p) { c = c || 0;
        if (f.isFunction(c)) return f.grep(b, function(b, u) {
            return !!c.call(b, u, b) === p });
        if (c.nodeType) return f.grep(b, function(b) {
            return b === c === p });
        if ("string" == typeof c) {
            var d = f.grep(b, function(b) {
                return 1 === b.nodeType });
            if (vc.test(c)) return f.filter(c, d, !p);
            c = f.filter(c, d) }
        return f.grep(b, function(b) {
            return 0 <= f.inArray(b, c) === p }) }

    function v(b) {
        var c = xb.split("|");
        b = b.createDocumentFragment();
        if (b.createElement)
            for (; c.length;) b.createElement(c.pop());
        return b
    }

    function z(b, c) {
        if (1 === c.nodeType && f.hasData(b)) {
            var p, d, y;
            d = f._data(b);
            var e = f._data(c, d),
                s = d.events;
            if (s)
                for (p in delete e.handle, e.events = {}, s) { d = 0;
                    for (y = s[p].length; d < y; d++) f.event.add(c, p, s[p][d]) }
            e.data && (e.data = f.extend({}, e.data)) } }

    function l(b, c) {
        var p;
        1 === c.nodeType && (c.clearAttributes && c.clearAttributes(), c.mergeAttributes && c.mergeAttributes(b), p = c.nodeName.toLowerCase(), "object" === p ? (c.parentNode && (c.outerHTML = b.outerHTML), f.support.html5Clone && b.innerHTML && !f.trim(c.innerHTML) &&
            (c.innerHTML = b.innerHTML)) : "input" === p && yb.test(b.type) ? (c.defaultChecked = c.checked = b.checked, c.value !== b.value && (c.value = b.value)) : "option" === p ? c.selected = b.defaultSelected : "input" === p || "textarea" === p ? c.defaultValue = b.defaultValue : "script" === p && c.text !== b.text && (c.text = b.text), c.removeAttribute(f.expando))
    }

    function m(b) {
        return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName("*") : "undefined" != typeof b.querySelectorAll ? b.querySelectorAll("*") : [] }

    function x(b) {
        yb.test(b.type) && (b.defaultChecked =
            b.checked)
    }

    function I(b, c) {
        if (c in b) return c;
        for (var p = c.charAt(0).toUpperCase() + c.slice(1), d = c, f = zb.length; f--;)
            if (c = zb[f] + p, c in b) return c;
        return d }

    function M(b, c) {
        return b = c || b, "none" === f.css(b, "display") || !f.contains(b.ownerDocument, b) }

    function E(b, c) {
        for (var p, d, y = [], e = 0, s = b.length; e < s; e++) p = b[e], p.style && (y[e] = f._data(p, "olddisplay"), c ? (!y[e] && "none" === p.style.display && (p.style.display = ""), "" === p.style.display && M(p) && (y[e] = f._data(p, "olddisplay", P(p.nodeName)))) : (d = Q(p, "display"), !y[e] && "none" !==
            d && f._data(p, "olddisplay", d)));
        for (e = 0; e < s; e++)
            if (p = b[e], p.style && (!c || "none" === p.style.display || "" === p.style.display)) p.style.display = c ? y[e] || "" : "none";
        return b
    }

    function L(b, c, p) {
        return (b = wc.exec(c)) ? Math.max(0, b[1] - (p || 0)) + (b[2] || "px") : c }

    function Ya(b, c, p, d) {
        c = p === (d ? "border" : "content") ? 4 : "width" === c ? 1 : 0;
        for (var y = 0; 4 > c; c += 2) "margin" === p && (y += f.css(b, p + ea[c], !0)), d ? ("content" === p && (y -= parseFloat(Q(b, "padding" + ea[c])) || 0), "margin" !== p && (y -= parseFloat(Q(b, "border" + ea[c] + "Width")) || 0)) : (y += parseFloat(Q(b,
            "padding" + ea[c])) || 0, "padding" !== p && (y += parseFloat(Q(b, "border" + ea[c] + "Width")) || 0));
        return y
    }

    function F(b, c, p) {
        var d = "width" === c ? b.offsetWidth : b.offsetHeight,
            y = !0,
            e = f.support.boxSizing && "border-box" === f.css(b, "boxSizing");
        if (0 >= d || null == d) { d = Q(b, c);
            if (0 > d || null == d) d = b.style[c];
            if (za.test(d)) return d;
            y = e && (f.support.boxSizingReliable || d === b.style[c]);
            d = parseFloat(d) || 0 }
        return d + Ya(b, c, p || (e ? "border" : "content"), y) + "px" }

    function P(b) {
        if (Za[b]) return Za[b];
        var c = f("<" + b + ">").appendTo(A.body),
            p = c.css("display");
        c.remove();
        if ("none" === p || "" === p) { ma = A.body.appendChild(ma || f.extend(A.createElement("iframe"), { frameBorder: 0, width: 0, height: 0 }));
            if (!na || !ma.createElement) na = (ma.contentWindow || ma.contentDocument).document, na.write("<!doctype html><html><body>"), na.close();
            c = na.body.appendChild(na.createElement(b));
            p = Q(c, "display");
            A.body.removeChild(ma) }
        return Za[b] = p, p
    }

    function N(b, c, p, d) {
        var y;
        if (f.isArray(c)) f.each(c, function(c, t) { p || xc.test(b) ? d(b, t) : N(b + "[" + ("object" == typeof t ? c : "") + "]", t, p, d) });
        else if (!p &&
            "object" === f.type(c))
            for (y in c) N(b + "[" + y + "]", c[y], p, d);
        else d(b, c)
    }

    function Aa(b) {
        return function(c, p) { "string" != typeof c && (p = c, c = "*");
            var d, y, e = c.toLowerCase().split(fa),
                s = 0,
                l = e.length;
            if (f.isFunction(p))
                for (; s < l; s++) d = e[s], (y = /^\+/.test(d)) && (d = d.substr(1) || "*"), d = b[d] = b[d] || [], d[y ? "unshift" : "push"](p) } }

    function oa(b, t, p, d, f, e) {
        f = f || t.dataTypes[0];
        e = e || {};
        e[f] = !0;
        var s;
        f = b[f];
        for (var l = 0, g = f ? f.length : 0, m = b === $a; l < g && (m || !s); l++) s = f[l](t, p, d), "string" == typeof s && (!m || e[s] ? s = c : (t.dataTypes.unshift(s),
            s = oa(b, t, p, d, s, e)));
        return (m || !s) && !e["*"] && (s = oa(b, t, p, d, "*", e)), s
    }

    function ta(b, t) {
        var p, d, y = f.ajaxSettings.flatOptions || {};
        for (p in t) t[p] !== c && ((y[p] ? b : d || (d = {}))[p] = t[p]);
        d && f.extend(!0, b, d) }

    function Ab() {
        try {
            return new b.XMLHttpRequest } catch (u) {} }

    function Bb() {
        return setTimeout(function() { Ba = c }, 0), Ba = f.now() }

    function Cb(b, c, p) {
        var d, y = 0,
            e = Ca.length,
            s = f.Deferred().always(function() { delete l.elem }),
            l = function() {
                for (var c = Ba || Bb(), c = Math.max(0, g.startTime + g.duration - c), t = 1 - (c / g.duration || 0), p =
                        0, d = g.tweens.length; p < d; p++) g.tweens[p].run(t);
                return s.notifyWith(b, [g, t, c]), 1 > t && d ? c : (s.resolveWith(b, [g]), !1)
            },
            g = s.promise({
                elem: b,
                props: f.extend({}, c),
                opts: f.extend(!0, { specialEasing: {} }, p),
                originalProperties: c,
                originalOptions: p,
                startTime: Ba || Bb(),
                duration: p.duration,
                tweens: [],
                createTween: function(c, t) {
                    var p = f.Tween(b, g.opts, c, t, g.opts.specialEasing[c] || g.opts.easing);
                    return g.tweens.push(p), p },
                stop: function(c) {
                    for (var t = 0, p = c ? g.tweens.length : 0; t < p; t++) g.tweens[t].run(1);
                    return c ? s.resolveWith(b, [g, c]) : s.rejectWith(b, [g, c]), this
                }
            });
        c = g.props;
        p = g.opts.specialEasing;
        var m, n, j, x;
        for (d in c)
            if (m = f.camelCase(d), n = p[m], j = c[d], f.isArray(j) && (n = j[1], j = c[d] = j[0]), d !== m && (c[m] = j, delete c[d]), (x = f.cssHooks[m]) && "expand" in x)
                for (d in j = x.expand(j), delete c[m], j) d in c || (c[d] = j[d], p[d] = n);
            else p[m] = n;
        for (; y < e; y++)
            if (d = Ca[y].call(g, b, c, g.opts)) return d;
        var r = g;
        f.each(c, function(b, u) {
            for (var c = (ua[b] || []).concat(ua["*"]), t = 0, p = c.length; t < p && !c[t].call(r, b, u); t++); });
        return f.isFunction(g.opts.start) && g.opts.start.call(b,
            g), f.fx.timer(f.extend(l, { anim: g, queue: g.opts.queue, elem: b })), g.progress(g.opts.progress).done(g.opts.done, g.opts.complete).fail(g.opts.fail).always(g.opts.always)
    }

    function S(b, c, p, d, f) {
        return new S.prototype.init(b, c, p, d, f) }

    function Da(b, c) {
        var p, d = { height: b },
            f = 0;
        for (c = c ? 1 : 0; 4 > f; f += 2 - c) p = ea[f], d["margin" + p] = d["padding" + p] = b;
        return c && (d.opacity = d.width = b), d }

    function Db(b) {
        return f.isWindow(b) ? b : 9 === b.nodeType ? b.defaultView || b.parentWindow : !1 }
    var Eb, Ea, A = b.document,
        zc = b.location,
        Ac = b.navigator,
        Bc =
        b.jQuery,
        Cc = b.$,
        Fb = Array.prototype.push,
        aa = Array.prototype.slice,
        Gb = Array.prototype.indexOf,
        Dc = Object.prototype.toString,
        ab = Object.prototype.hasOwnProperty,
        bb = String.prototype.trim,
        f = function(b, c) {
            return new f.fn.init(b, c, Eb) },
        Fa = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
        Ec = /\S/,
        fa = /\s+/,
        Fc = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        Gc = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
        Hb = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        Hc = /^[\],:{}\s]*$/,
        Ic = /(?:^|:|,)(?:\s*\[)+/g,
        Jc = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        Kc = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
        Lc = /^-ms-/,
        Mc = /-([\da-z])/gi,
        Nc = function(b, c) {
            return (c + "").toUpperCase() },
        Ga = function() { A.addEventListener ? (A.removeEventListener("DOMContentLoaded", Ga, !1), f.ready()) : "complete" === A.readyState && (A.detachEvent("onreadystatechange", Ga), f.ready()) },
        Ib = {};
    f.fn = f.prototype = {
        constructor: f,
        init: function(b, t, p) {
            var d, y;
            if (!b) return this;
            if (b.nodeType) return this.context = this[0] = b, this.length = 1, this;
            if ("string" == typeof b) {
                "<" === b.charAt(0) && ">" === b.charAt(b.length - 1) && 3 <= b.length ? d = [null, b, null] : d = Gc.exec(b);
                if (d && (d[1] || !t)) {
                    if (d[1]) return t = t instanceof f ? t[0] : t, y = t && t.nodeType ? t.ownerDocument || t : A, b = f.parseHTML(d[1], y, !0), Hb.test(d[1]) && f.isPlainObject(t) && this.attr.call(b, t, !0), f.merge(this, b);
                    if ((t = A.getElementById(d[2])) && t.parentNode) {
                        if (t.id !== d[2]) return p.find(b);
                        this.length = 1;
                        this[0] = t }
                    return this.context = A, this.selector = b, this }
                return !t || t.jquery ? (t || p).find(b) : this.constructor(t).find(b)
            }
            return f.isFunction(b) ? p.ready(b) : (b.selector !== c && (this.selector = b.selector, this.context = b.context), f.makeArray(b,
                this))
        },
        selector: "",
        jquery: "1.8.2",
        length: 0,
        size: function() {
            return this.length },
        toArray: function() {
            return aa.call(this) },
        get: function(b) {
            return null == b ? this.toArray() : 0 > b ? this[this.length + b] : this[b] },
        pushStack: function(b, c, p) { b = f.merge(this.constructor(), b);
            return b.prevObject = this, b.context = this.context, "find" === c ? b.selector = this.selector + (this.selector ? " " : "") + p : c && (b.selector = this.selector + "." + c + "(" + p + ")"), b },
        each: function(b, c) {
            return f.each(this, b, c) },
        ready: function(b) {
            return f.ready.promise().done(b),
                this
        },
        eq: function(b) {
            return b = +b, -1 === b ? this.slice(b) : this.slice(b, b + 1) },
        first: function() {
            return this.eq(0) },
        last: function() {
            return this.eq(-1) },
        slice: function() {
            return this.pushStack(aa.apply(this, arguments), "slice", aa.call(arguments).join(",")) },
        map: function(b) {
            return this.pushStack(f.map(this, function(c, p) {
                return b.call(c, p, c) })) },
        end: function() {
            return this.prevObject || this.constructor(null) },
        push: Fb,
        sort: [].sort,
        splice: [].splice
    };
    f.fn.init.prototype = f.fn;
    f.extend = f.fn.extend = function() {
        var b,
            t, p, d, y, e, s = arguments[0] || {},
            g = 1,
            l = arguments.length,
            m = !1;
        "boolean" == typeof s && (m = s, s = arguments[1] || {}, g = 2);
        "object" != typeof s && !f.isFunction(s) && (s = {});
        for (l === g && (s = this, --g); g < l; g++)
            if (null != (b = arguments[g]))
                for (t in b) p = s[t], d = b[t], s !== d && (m && d && (f.isPlainObject(d) || (y = f.isArray(d))) ? (y ? (y = !1, e = p && f.isArray(p) ? p : []) : e = p && f.isPlainObject(p) ? p : {}, s[t] = f.extend(m, e, d)) : d !== c && (s[t] = d));
        return s
    };
    f.extend({
        noConflict: function(u) {
            return b.$ === f && (b.$ = Cc), u && b.jQuery === f && (b.jQuery = Bc), f },
        isReady: !1,
        readyWait: 1,
        holdReady: function(b) { b ? f.readyWait++ : f.ready(!0) },
        ready: function(b) {
            if (!(!0 === b ? --f.readyWait : f.isReady)) {
                if (!A.body) return setTimeout(f.ready, 1);
                f.isReady = !0;!0 !== b && 0 < --f.readyWait || (Ea.resolveWith(A, [f]), f.fn.trigger && f(A).trigger("ready").off("ready")) } },
        isFunction: function(b) {
            return "function" === f.type(b) },
        isArray: Array.isArray || function(b) {
            return "array" === f.type(b) },
        isWindow: function(b) {
            return null != b && b == b.window },
        isNumeric: function(b) {
            return !isNaN(parseFloat(b)) && isFinite(b) },
        type: function(b) {
            return null == b ? String(b) : Ib[Dc.call(b)] || "object" },
        isPlainObject: function(b) {
            if (!b || "object" !== f.type(b) || b.nodeType || f.isWindow(b)) return !1;
            try {
                if (b.constructor && !ab.call(b, "constructor") && !ab.call(b.constructor.prototype, "isPrototypeOf")) return !1 } catch (t) {
                return !1 }
            for (var p in b);
            return p === c || ab.call(b, p) },
        isEmptyObject: function(b) {
            for (var c in b) return !1;
            return !0 },
        error: function(b) {
            throw Error(b); },
        parseHTML: function(b, c, p) {
            var d;
            return !b || "string" != typeof b ? null : ("boolean" ==
                typeof c && (p = c, c = 0), c = c || A, (d = Hb.exec(b)) ? [c.createElement(d[1])] : (d = f.buildFragment([b], c, p ? null : []), f.merge([], (d.cacheable ? f.clone(d.fragment) : d.fragment).childNodes)))
        },
        parseJSON: function(u) {
            if (!u || "string" != typeof u) return null;
            u = f.trim(u);
            if (b.JSON && b.JSON.parse) return b.JSON.parse(u);
            if (Hc.test(u.replace(Jc, "@").replace(Kc, "]").replace(Ic, ""))) return (new Function("return " + u))();
            f.error("Invalid JSON: " + u) },
        parseXML: function(u) {
            var t, p;
            if (!u || "string" != typeof u) return null;
            try {
                b.DOMParser ?
                    (p = new DOMParser, t = p.parseFromString(u, "text/xml")) : (t = new ActiveXObject("Microsoft.XMLDOM"), t.async = "false", t.loadXML(u))
            } catch (d) { t = c }
            return (!t || !t.documentElement || t.getElementsByTagName("parsererror").length) && f.error("Invalid XML: " + u), t
        },
        noop: function() {},
        globalEval: function(u) { u && Ec.test(u) && (b.execScript || function(u) { b.eval.call(b, u) })(u) },
        camelCase: function(b) {
            return b.replace(Lc, "ms-").replace(Mc, Nc) },
        nodeName: function(b, c) {
            return b.nodeName && b.nodeName.toLowerCase() === c.toLowerCase() },
        each: function(b, t, p) {
            var d, y = 0,
                e = b.length,
                s = e === c || f.isFunction(b);
            if (p)
                if (s)
                    for (d in b) {
                        if (!1 === t.apply(b[d], p)) break } else
                        for (; y < e && !1 !== t.apply(b[y++], p););
                else if (s)
                for (d in b) {
                    if (!1 === t.call(b[d], d, b[d])) break } else
                    for (; y < e && !1 !== t.call(b[y], y, b[y++]););
            return b },
        trim: bb && !bb.call("\ufeff\u00a0") ? function(b) {
            return null == b ? "" : bb.call(b) } : function(b) {
            return null == b ? "" : (b + "").replace(Fc, "") },
        makeArray: function(b, c) {
            var p, d = c || [];
            return null != b && (p = f.type(b), null == b.length || "string" === p || "function" ===
                p || "regexp" === p || f.isWindow(b) ? Fb.call(d, b) : f.merge(d, b)), d
        },
        inArray: function(b, c, p) {
            var d;
            if (c) {
                if (Gb) return Gb.call(c, b, p);
                d = c.length;
                for (p = p ? 0 > p ? Math.max(0, d + p) : p : 0; p < d; p++)
                    if (p in c && c[p] === b) return p }
            return -1 },
        merge: function(b, t) {
            var p = t.length,
                d = b.length,
                f = 0;
            if ("number" == typeof p)
                for (; f < p; f++) b[d++] = t[f];
            else
                for (; t[f] !== c;) b[d++] = t[f++];
            return b.length = d, b },
        grep: function(b, c, d) {
            var f, y = [],
                e = 0,
                s = b.length;
            for (d = !!d; e < s; e++) f = !!c(b[e], e), d !== f && y.push(b[e]);
            return y },
        map: function(b, t, d) {
            var B,
                e, D = [],
                s = 0,
                g = b.length;
            if (b instanceof f || g !== c && "number" == typeof g && (0 < g && b[0] && b[g - 1] || 0 === g || f.isArray(b)))
                for (; s < g; s++) B = t(b[s], s, d), null != B && (D[D.length] = B);
            else
                for (e in b) B = t(b[e], e, d), null != B && (D[D.length] = B);
            return D.concat.apply([], D)
        },
        guid: 1,
        proxy: function(b, t) {
            var d, B, e;
            return "string" == typeof t && (d = b[t], t = b, b = d), f.isFunction(b) ? (B = aa.call(arguments, 2), e = function() {
                return b.apply(t, B.concat(aa.call(arguments))) }, e.guid = b.guid = b.guid || f.guid++, e) : c },
        access: function(b, t, d, B, e, D, s) {
            var g, l =
                null == d,
                m = 0,
                n = b.length;
            if (d && "object" == typeof d) {
                for (m in d) f.access(b, t, m, d[m], 1, D, B);
                e = 1 } else if (B !== c) { g = s === c && f.isFunction(B);
                l && (g ? (g = t, t = function(b, c, u) {
                    return g.call(f(b), u) }) : (t.call(b, B), t = null));
                if (t)
                    for (; m < n; m++) t(b[m], d, g ? B.call(b[m], m, t(b[m], d)) : B, s);
                e = 1 }
            return e ? b : l ? t.call(b) : n ? t(b[0], d) : D
        },
        now: function() {
            return (new Date).getTime() }
    });
    f.ready.promise = function(c) {
        if (!Ea)
            if (Ea = f.Deferred(), "complete" === A.readyState) setTimeout(f.ready, 1);
            else if (A.addEventListener) A.addEventListener("DOMContentLoaded",
            Ga, !1), b.addEventListener("load", f.ready, !1);
        else { A.attachEvent("onreadystatechange", Ga);
            b.attachEvent("onload", f.ready);
            var t = !1;
            try { t = null == b.frameElement && A.documentElement } catch (d) {}
            t && t.doScroll && function y() {
                if (!f.isReady) {
                    try { t.doScroll("left") } catch (b) {
                        return setTimeout(y, 50) }
                    f.ready() } }() }
        return Ea.promise(c)
    };
    f.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(b, c) { Ib["[object " + c + "]"] = c.toLowerCase() });
    Eb = f(A);
    var Jb = {};
    f.Callbacks = function(b) {
        var t;
        if ("string" ==
            typeof b) {
            if (!(t = Jb[b])) { t = b;
                var d = Jb[t] = {};
                t = (f.each(t.split(fa), function(b, c) { d[c] = !0 }), d) } } else t = f.extend({}, b);
        b = t;
        var B, e, D, s, g, l, m = [],
            n = !b.once && [],
            j = function(c) { B = b.memory && c;
                e = !0;
                l = s || 0;
                s = 0;
                g = m.length;
                for (D = !0; m && l < g; l++)
                    if (!1 === m[l].apply(c[0], c[1]) && b.stopOnFalse) { B = !1;
                        break }
                D = !1;
                m && (n ? n.length && j(n.shift()) : B ? m = [] : x.disable()) },
            x = {
                add: function() {
                    if (m) {
                        var c = m.length;
                        (function yc(c) {
                            f.each(c, function(c, t) {
                                var d = f.type(t);
                                "function" === d && (!b.unique || !x.has(t)) ? m.push(t) : t && t.length && "string" !==
                                    d && yc(t)
                            })
                        })(arguments);
                        D ? g = m.length : B && (s = c, j(B))
                    }
                    return this
                },
                remove: function() {
                    return m && f.each(arguments, function(b, c) {
                        for (var u; - 1 < (u = f.inArray(c, m, u));) m.splice(u, 1), D && (u <= g && g--, u <= l && l--) }), this },
                has: function(b) {
                    return -1 < f.inArray(b, m) },
                empty: function() {
                    return m = [], this },
                disable: function() {
                    return m = n = B = c, this },
                disabled: function() {
                    return !m },
                lock: function() {
                    return n = c, B || x.disable(), this },
                locked: function() {
                    return !n },
                fireWith: function(b, c) {
                    return c = c || [], c = [b, c.slice ? c.slice() : c], m && (!e || n) &&
                        (D ? n.push(c) : j(c)), this
                },
                fire: function() {
                    return x.fireWith(this, arguments), this },
                fired: function() {
                    return !!e }
            };
        return x
    };
    f.extend({
        Deferred: function(b) {
            var c = [
                    ["resolve", "done", f.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", f.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", f.Callbacks("memory")]
                ],
                d = "pending",
                B = {
                    state: function() {
                        return d },
                    always: function() {
                        return e.done(arguments).fail(arguments), this },
                    then: function() {
                        var b = arguments;
                        return f.Deferred(function(u) {
                            f.each(c, function(c,
                                t) {
                                var d = t[0],
                                    p = b[c];
                                e[t[1]](f.isFunction(p) ? function() {
                                    var b = p.apply(this, arguments);
                                    b && f.isFunction(b.promise) ? b.promise().done(u.resolve).fail(u.reject).progress(u.notify) : u[d + "With"](this === e ? u : this, [b]) } : u[d]) });
                            b = null
                        }).promise()
                    },
                    promise: function(b) {
                        return null != b ? f.extend(b, B) : B }
                },
                e = {};
            return B.pipe = B.then, f.each(c, function(b, u) {
                var f = u[2],
                    g = u[3];
                B[u[1]] = f.add;
                g && f.add(function() { d = g }, c[b ^ 1][2].disable, c[2][2].lock);
                e[u[0]] = f.fire;
                e[u[0] + "With"] = f.fireWith }), B.promise(e), b && b.call(e, e), e
        },
        when: function(b) {
            var c = 0,
                d = aa.call(arguments),
                B = d.length,
                e = 1 !== B || b && f.isFunction(b.promise) ? B : 0,
                g = 1 === e ? b : f.Deferred(),
                s = function(b, c, u) {
                    return function(t) { c[b] = this;
                        u[b] = 1 < arguments.length ? aa.call(arguments) : t;
                        u === l ? g.notifyWith(c, u) : --e || g.resolveWith(c, u) } },
                l, m, n;
            if (1 < B) { l = Array(B);
                m = Array(B);
                for (n = Array(B); c < B; c++) d[c] && f.isFunction(d[c].promise) ? d[c].promise().done(s(c, n, d)).fail(g.reject).progress(s(c, m, l)) : --e }
            return e || g.resolveWith(n, d), g.promise() }
    });
    var Oc = f,
        cb;
    var O, Ha, ha, Ia, Ja, T, ia,
        Ka, db, va, Kb, J = A.createElement("div");
    J.setAttribute("className", "t");
    J.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
    Ha = J.getElementsByTagName("*");
    ha = J.getElementsByTagName("a")[0];
    ha.style.cssText = "top:1px;float:left;opacity:.5";
    if (!Ha || !Ha.length) cb = {};
    else {
        Ia = A.createElement("select");
        Ja = Ia.appendChild(A.createElement("option"));
        T = J.getElementsByTagName("input")[0];
        O = {
            leadingWhitespace: 3 === J.firstChild.nodeType,
            tbody: !J.getElementsByTagName("tbody").length,
            htmlSerialize: !!J.getElementsByTagName("link").length,
            style: /top/.test(ha.getAttribute("style")),
            hrefNormalized: "/a" === ha.getAttribute("href"),
            opacity: /^0.5/.test(ha.style.opacity),
            cssFloat: !!ha.style.cssFloat,
            checkOn: "on" === T.value,
            optSelected: Ja.selected,
            getSetAttribute: "t" !== J.className,
            enctype: !!A.createElement("form").enctype,
            html5Clone: "<:nav></:nav>" !== A.createElement("nav").cloneNode(!0).outerHTML,
            boxModel: "CSS1Compat" === A.compatMode,
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            boxSizingReliable: !0,
            pixelPosition: !1
        };
        T.checked = !0;
        O.noCloneChecked = T.cloneNode(!0).checked;
        Ia.disabled = !0;
        O.optDisabled = !Ja.disabled;
        try { delete J.test } catch (Qd) { O.deleteExpando = !1 }!J.addEventListener && J.attachEvent && J.fireEvent && (J.attachEvent("onclick", Kb = function() { O.noCloneEvent = !1 }), J.cloneNode(!0).fireEvent("onclick"), J.detachEvent("onclick", Kb));
        T = A.createElement("input");
        T.value = "t";
        T.setAttribute("type", "radio");
        O.radioValue = "t" === T.value;
        T.setAttribute("checked",
            "checked");
        T.setAttribute("name", "t");
        J.appendChild(T);
        ia = A.createDocumentFragment();
        ia.appendChild(J.lastChild);
        O.checkClone = ia.cloneNode(!0).cloneNode(!0).lastChild.checked;
        O.appendChecked = T.checked;
        ia.removeChild(T);
        ia.appendChild(J);
        if (J.attachEvent)
            for (db in { submit: !0, change: !0, focusin: !0 }) Ka = "on" + db, (va = Ka in J) || (J.setAttribute(Ka, "return;"), va = "function" == typeof J[Ka]), O[db + "Bubbles"] = va;
        cb = (f(function() {
            var c, t, d, f, e = A.getElementsByTagName("body")[0];
            e && (c = A.createElement("div"), c.style.cssText =
                "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", e.insertBefore(c, e.firstChild), t = A.createElement("div"), c.appendChild(t), t.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", d = t.getElementsByTagName("td"), d[0].style.cssText = "padding:0;margin:0;border:0;display:none", va = 0 === d[0].offsetHeight, d[0].style.display = "", d[1].style.display = "none", O.reliableHiddenOffsets = va && 0 === d[0].offsetHeight, t.innerHTML = "", t.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",
                O.boxSizing = 4 === t.offsetWidth, O.doesNotIncludeMarginInBodyOffset = 1 !== e.offsetTop, b.getComputedStyle && (O.pixelPosition = "1%" !== (b.getComputedStyle(t, null) || {}).top, O.boxSizingReliable = "4px" === (b.getComputedStyle(t, null) || { width: "4px" }).width, f = A.createElement("div"), f.style.cssText = t.style.cssText = "padding:0;margin:0;border:0;display:block;overflow:hidden;", f.style.marginRight = f.style.width = "0", t.style.width = "1px", t.appendChild(f), O.reliableMarginRight = !parseFloat((b.getComputedStyle(f, null) || {}).marginRight)),
                "undefined" != typeof t.style.zoom && (t.innerHTML = "", t.style.cssText = "padding:0;margin:0;border:0;display:block;overflow:hidden;width:1px;padding:1px;display:inline;zoom:1", O.inlineBlockNeedsLayout = 3 === t.offsetWidth, t.style.display = "block", t.style.overflow = "visible", t.innerHTML = "<div></div>", t.firstChild.style.width = "5px", O.shrinkWrapBlocks = 3 !== t.offsetWidth, c.style.zoom = 1), e.removeChild(c))
        }), ia.removeChild(J), Ha = ha = Ia = Ja = T = ia = J = null, O)
    }
    Oc.support = cb;
    var uc = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        tc = /([A-Z])/g;
    f.extend({
        cache: {},
        deletedIds: [],
        uuid: 0,
        expando: "jQuery" + (f.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: { embed: !0, object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000", applet: !0 },
        hasData: function(b) {
            return b = b.nodeType ? f.cache[b[f.expando]] : b[f.expando], !!b && !e(b) },
        data: function(b, t, d, B) {
            if (f.acceptData(b)) {
                var e, g, s = f.expando,
                    l = "string" == typeof t,
                    m = b.nodeType,
                    n = m ? f.cache : b,
                    j = m ? b[s] : b[s] && s;
                if (j && n[j] && (B || n[j].data) || !(l && d === c)) {
                    j || (m ? b[s] = j = f.deletedIds.pop() || f.guid++ : j = s);
                    n[j] || (n[j] = {},
                        m || (n[j].toJSON = f.noop));
                    if ("object" == typeof t || "function" == typeof t) B ? n[j] = f.extend(n[j], t) : n[j].data = f.extend(n[j].data, t);
                    return e = n[j], B || (e.data || (e.data = {}), e = e.data), d !== c && (e[f.camelCase(t)] = d), l ? (g = e[t], null == g && (g = e[f.camelCase(t)])) : g = e, g
                }
            }
        },
        removeData: function(b, c, d) {
            if (f.acceptData(b)) {
                var B, y, g, s = b.nodeType,
                    l = s ? f.cache : b,
                    m = s ? b[f.expando] : f.expando;
                if (l[m]) {
                    if (c && (B = d ? l[m] : l[m].data)) {
                        f.isArray(c) || (c in B ? c = [c] : (c = f.camelCase(c), c in B ? c = [c] : c = c.split(" ")));
                        y = 0;
                        for (g = c.length; y < g; y++) delete B[c[y]];
                        if (!(d ? e : f.isEmptyObject)(B)) return
                    }
                    if (!d && (delete l[m].data, !e(l[m]))) return;
                    s ? f.cleanData([b], !0) : f.support.deleteExpando || l != l.window ? delete l[m] : l[m] = null
                }
            }
        },
        _data: function(b, c, d) {
            return f.data(b, c, d, !0) },
        acceptData: function(b) {
            var c = b.nodeName && f.noData[b.nodeName.toLowerCase()];
            return !c || !0 !== c && b.getAttribute("classid") === c }
    });
    f.fn.extend({
        data: function(b, t) {
            var p, e, y, g, s, l = this[0],
                m = 0,
                n = null;
            if (b === c) {
                if (this.length && (n = f.data(l), 1 === l.nodeType && !f._data(l, "parsedAttrs"))) {
                    y = l.attributes;
                    for (s = y.length; m < s; m++) g = y[m].name, g.indexOf("data-") || (g = f.camelCase(g.substring(5)), d(l, g, n[g]));
                    f._data(l, "parsedAttrs", !0)
                }
                return n
            }
            return "object" == typeof b ? this.each(function() { f.data(this, b) }) : (p = b.split(".", 2), p[1] = p[1] ? "." + p[1] : "", e = p[1] + "!", f.access(this, function(t) {
                if (t === c) return n = this.triggerHandler("getData" + e, [p[0]]), n === c && l && (n = f.data(l, b), n = d(l, b, n)), n === c && p[1] ? this.data(p[0]) : n;
                p[1] = t;
                this.each(function() {
                    var c = f(this);
                    c.triggerHandler("setData" + e, p);
                    f.data(this, b, t);
                    c.triggerHandler("changeData" +
                        e, p)
                })
            }, null, t, 1 < arguments.length, null, !1))
        },
        removeData: function(b) {
            return this.each(function() { f.removeData(this, b) }) }
    });
    f.extend({
        queue: function(b, c, d) {
            var e;
            if (b) return c = (c || "fx") + "queue", e = f._data(b, c), d && (!e || f.isArray(d) ? e = f._data(b, c, f.makeArray(d)) : e.push(d)), e || [] },
        dequeue: function(b, c) {
            c = c || "fx";
            var d = f.queue(b, c),
                e = d.length,
                y = d.shift(),
                g = f._queueHooks(b, c),
                s = function() { f.dequeue(b, c) };
            "inprogress" === y && (y = d.shift(), e--);
            y && ("fx" === c && d.unshift("inprogress"), delete g.stop, y.call(b, s, g));
            !e && g && g.empty.fire()
        },
        _queueHooks: function(b, c) {
            var d = c + "queueHooks";
            return f._data(b, d) || f._data(b, d, { empty: f.Callbacks("once memory").add(function() { f.removeData(b, c + "queue", !0);
                    f.removeData(b, d, !0) }) }) }
    });
    f.fn.extend({
        queue: function(b, t) {
            var d = 2;
            return "string" != typeof b && (t = b, b = "fx", d--), arguments.length < d ? f.queue(this[0], b) : t === c ? this : this.each(function() {
                var c = f.queue(this, b, t);
                f._queueHooks(this, b); "fx" === b && "inprogress" !== c[0] && f.dequeue(this, b) }) },
        dequeue: function(b) {
            return this.each(function() {
                f.dequeue(this,
                    b)
            })
        },
        delay: function(b, c) {
            return b = f.fx ? f.fx.speeds[b] || b : b, c = c || "fx", this.queue(c, function(c, t) {
                var d = setTimeout(c, b);
                t.stop = function() { clearTimeout(d) } }) },
        clearQueue: function(b) {
            return this.queue(b || "fx", []) },
        promise: function(b, t) {
            var d, e = 1,
                y = f.Deferred(),
                g = this,
                s = this.length,
                l = function() {--e || y.resolveWith(g, [g]) }; "string" != typeof b && (t = b, b = c);
            for (b = b || "fx"; s--;)(d = f._data(g[s], b + "queueHooks")) && d.empty && (e++, d.empty.add(l));
            return l(), y.promise(t) }
    });
    var ba, Lb, Mb, Nb = /[\t\r\n]/g,
        Pc = /\r/g,
        Qc = /^(?:button|input)$/i,
        Rc = /^(?:button|input|object|select|textarea)$/i,
        Sc = /^a(?:rea|)$/i,
        Ob = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        Pb = f.support.getSetAttribute;
    f.fn.extend({
        attr: function(b, c) {
            return f.access(this, f.attr, b, c, 1 < arguments.length) },
        removeAttr: function(b) {
            return this.each(function() { f.removeAttr(this, b) }) },
        prop: function(b, c) {
            return f.access(this, f.prop, b, c, 1 < arguments.length) },
        removeProp: function(b) {
            return b = f.propFix[b] ||
                b, this.each(function() {
                    try { this[b] = c, delete this[b] } catch (t) {} })
        },
        addClass: function(b) {
            var c, d, e, y, g, s, l;
            if (f.isFunction(b)) return this.each(function(c) { f(this).addClass(b.call(this, c, this.className)) });
            if (b && "string" == typeof b) { c = b.split(fa);
                d = 0;
                for (e = this.length; d < e; d++)
                    if (y = this[d], 1 === y.nodeType)
                        if (!y.className && 1 === c.length) y.className = b;
                        else { g = " " + y.className + " ";
                            s = 0;
                            for (l = c.length; s < l; s++) 0 > g.indexOf(" " + c[s] + " ") && (g += c[s] + " ");
                            y.className = f.trim(g) } }
            return this },
        removeClass: function(b) {
            var d,
                p, e, y, g, s, l;
            if (f.isFunction(b)) return this.each(function(c) { f(this).removeClass(b.call(this, c, this.className)) });
            if (b && "string" == typeof b || b === c) { d = (b || "").split(fa);
                s = 0;
                for (l = this.length; s < l; s++)
                    if (e = this[s], 1 === e.nodeType && e.className) { p = (" " + e.className + " ").replace(Nb, " ");
                        y = 0;
                        for (g = d.length; y < g; y++)
                            for (; 0 <= p.indexOf(" " + d[y] + " ");) p = p.replace(" " + d[y] + " ", " ");
                        e.className = b ? f.trim(p) : "" } }
            return this
        },
        toggleClass: function(b, c) {
            var d = typeof b,
                e = "boolean" == typeof c;
            return f.isFunction(b) ? this.each(function(d) {
                f(this).toggleClass(b.call(this,
                    d, this.className, c), c)
            }) : this.each(function() {
                if ("string" === d)
                    for (var y, g = 0, s = f(this), l = c, m = b.split(fa); y = m[g++];) l = e ? l : !s.hasClass(y), s[l ? "addClass" : "removeClass"](y);
                else if ("undefined" === d || "boolean" === d) this.className && f._data(this, "__className__", this.className), this.className = this.className || !1 === b ? "" : f._data(this, "__className__") || "" })
        },
        hasClass: function(b) {
            b = " " + b + " ";
            for (var c = 0, d = this.length; c < d; c++)
                if (1 === this[c].nodeType && 0 <= (" " + this[c].className + " ").replace(Nb, " ").indexOf(b)) return !0;
            return !1
        },
        val: function(b) {
            var d, p, e, y = this[0];
            if (arguments.length) return e = f.isFunction(b), this.each(function(p) {
                var s, y = f(this);
                if (1 === this.nodeType && (e ? s = b.call(this, p, y.val()) : s = b, null == s ? s = "" : "number" == typeof s ? s += "" : f.isArray(s) && (s = f.map(s, function(b) {
                        return null == b ? "" : b + "" })), d = f.valHooks[this.type] || f.valHooks[this.nodeName.toLowerCase()], !d || !("set" in d) || d.set(this, s, "value") === c)) this.value = s });
            if (y) return d = f.valHooks[y.type] || f.valHooks[y.nodeName.toLowerCase()], d && "get" in d && (p = d.get(y,
                "value")) !== c ? p : (p = y.value, "string" == typeof p ? p.replace(Pc, "") : null == p ? "" : p)
        }
    });
    f.extend({
        valHooks: {
            option: { get: function(b) {
                    var c = b.attributes.value;
                    return !c || c.specified ? b.value : b.text } },
            select: {
                get: function(b) {
                    var c, d, e = b.selectedIndex,
                        y = [],
                        g = b.options,
                        s = "select-one" === b.type;
                    if (0 > e) return null;
                    b = s ? e : 0;
                    for (d = s ? e + 1 : g.length; b < d; b++)
                        if (c = g[b], c.selected && (f.support.optDisabled ? !c.disabled : null === c.getAttribute("disabled")) && (!c.parentNode.disabled || !f.nodeName(c.parentNode, "optgroup"))) {
                            c = f(c).val();
                            if (s) return c;
                            y.push(c)
                        }
                    return s && !y.length && g.length ? f(g[e]).val() : y
                },
                set: function(b, c) {
                    var d = f.makeArray(c);
                    return f(b).find("option").each(function() { this.selected = 0 <= f.inArray(f(this).val(), d) }), d.length || (b.selectedIndex = -1), d }
            }
        },
        attrFn: {},
        attr: function(b, d, p, e) {
            var y, g, s = b.nodeType;
            if (b && !(3 === s || 8 === s || 2 === s)) {
                if (e && f.isFunction(f.fn[d])) return f(b)[d](p);
                if ("undefined" == typeof b.getAttribute) return f.prop(b, d, p);
                (e = 1 !== s || !f.isXMLDoc(b)) && (d = d.toLowerCase(), g = f.attrHooks[d] || (Ob.test(d) ? Lb :
                    ba));
                if (p !== c) {
                    if (null === p) { f.removeAttr(b, d);
                        return }
                    return g && "set" in g && e && (y = g.set(b, p, d)) !== c ? y : (b.setAttribute(d, p + ""), p) }
                return g && "get" in g && e && null !== (y = g.get(b, d)) ? y : (y = b.getAttribute(d), null === y ? c : y)
            }
        },
        removeAttr: function(b, c) {
            var d, e, y, g, s = 0;
            if (c && 1 === b.nodeType)
                for (e = c.split(fa); s < e.length; s++)(y = e[s]) && (d = f.propFix[y] || y, g = Ob.test(y), g || f.attr(b, y, ""), b.removeAttribute(Pb ? y : d), g && d in b && (b[d] = !1)) },
        attrHooks: {
            type: {
                set: function(b, c) {
                    if (Qc.test(b.nodeName) && b.parentNode) f.error("type property can't be changed");
                    else if (!f.support.radioValue && "radio" === c && f.nodeName(b, "input")) {
                        var d = b.value;
                        return b.setAttribute("type", c), d && (b.value = d), c }
                }
            },
            value: { get: function(b, c) {
                    return ba && f.nodeName(b, "button") ? ba.get(b, c) : c in b ? b.value : null }, set: function(b, c, d) {
                    if (ba && f.nodeName(b, "button")) return ba.set(b, c, d);
                    b.value = c } }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(b, d, p) {
            var e, y, g, s = b.nodeType;
            if (b && !(3 === s || 8 === s || 2 === s)) return g = 1 !== s || !f.isXMLDoc(b), g && (d = f.propFix[d] || d, y = f.propHooks[d]), p !== c ? y && "set" in y && (e = y.set(b, p, d)) !== c ? e : b[d] = p : y && "get" in y && null !== (e = y.get(b, d)) ? e : b[d] },
        propHooks: { tabIndex: { get: function(b) {
                    var d = b.getAttributeNode("tabindex");
                    return d && d.specified ? parseInt(d.value, 10) : Rc.test(b.nodeName) || Sc.test(b.nodeName) && b.href ? 0 : c } } }
    });
    Lb = {
        get: function(b,
            d) {
            var p, e = f.prop(b, d);
            return !0 === e || "boolean" != typeof e && (p = b.getAttributeNode(d)) && !1 !== p.nodeValue ? d.toLowerCase() : c },
        set: function(b, c, d) {
            var e;
            return !1 === c ? f.removeAttr(b, d) : (e = f.propFix[d] || d, e in b && (b[e] = !0), b.setAttribute(d, d.toLowerCase())), d }
    };
    Pb || (Mb = { name: !0, id: !0, coords: !0 }, ba = f.valHooks.button = {
        get: function(b, d) {
            var f;
            return f = b.getAttributeNode(d), f && (Mb[d] ? "" !== f.value : f.specified) ? f.value : c },
        set: function(b, c, d) {
            var f = b.getAttributeNode(d);
            return f || (f = A.createAttribute(d), b.setAttributeNode(f)),
                f.value = c + ""
        }
    }, f.each(["width", "height"], function(b, c) { f.attrHooks[c] = f.extend(f.attrHooks[c], { set: function(b, u) {
                if ("" === u) return b.setAttribute(c, "auto"), u } }) }), f.attrHooks.contenteditable = { get: ba.get, set: function(b, c, d) { "" === c && (c = "false");
            ba.set(b, c, d) } });
    f.support.hrefNormalized || f.each(["href", "src", "width", "height"], function(b, d) { f.attrHooks[d] = f.extend(f.attrHooks[d], { get: function(b) { b = b.getAttribute(d, 2);
                return null === b ? c : b } }) });
    f.support.style || (f.attrHooks.style = {
        get: function(b) {
            return b.style.cssText.toLowerCase() ||
                c
        },
        set: function(b, c) {
            return b.style.cssText = c + "" }
    });
    f.support.optSelected || (f.propHooks.selected = f.extend(f.propHooks.selected, { get: function(b) { b = b.parentNode;
            return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null } }));
    f.support.enctype || (f.propFix.enctype = "encoding");
    f.support.checkOn || f.each(["radio", "checkbox"], function() { f.valHooks[this] = { get: function(b) {
                return null === b.getAttribute("value") ? "on" : b.value } } });
    f.each(["radio", "checkbox"], function() {
        f.valHooks[this] = f.extend(f.valHooks[this], { set: function(b, c) {
                if (f.isArray(c)) return b.checked = 0 <= f.inArray(f(b).val(), c) } })
    });
    var eb = /^(?:textarea|input|select)$/i,
        Qb = /^([^\.]*|)(?:\.(.+)|)$/,
        Tc = /(?:^|\s)hover(\.\S+|)\b/,
        Uc = /^key/,
        Vc = /^(?:mouse|contextmenu)|click/,
        Rb = /^(?:focusinfocus|focusoutblur)$/,
        Sb = function(b) {
            return f.event.special.hover ? b : b.replace(Tc, "mouseenter$1 mouseleave$1") };
    f.event = {
        add: function(b, d, p, e, y) {
            var g, s, l, m, n, j, x, r, v;
            if (!(3 === b.nodeType || 8 === b.nodeType || !d || !p || !(g = f._data(b)))) {
                p.handler && (x = p, p = x.handler, y = x.selector);
                p.guid || (p.guid = f.guid++);
                (l = g.events) || (g.events = l = {});
                (s = g.handle) || (g.handle = s = function(b) {
                    return "undefined" != typeof f && (!b || f.event.triggered !== b.type) ? f.event.dispatch.apply(s.elem, arguments) : c }, s.elem = b);
                d = f.trim(Sb(d)).split(" ");
                for (g = 0; g < d.length; g++) {
                    m = Qb.exec(d[g]) || [];
                    n = m[1];
                    j = (m[2] || "").split(".").sort();
                    v = f.event.special[n] || {};
                    n = (y ? v.delegateType : v.bindType) || n;
                    v = f.event.special[n] || {};
                    m = f.extend({
                        type: n,
                        origType: m[1],
                        data: e,
                        handler: p,
                        guid: p.guid,
                        selector: y,
                        needsContext: y && f.expr.match.needsContext.test(y),
                        namespace: j.join(".")
                    }, x);
                    r = l[n];
                    if (!r && (r = l[n] = [], r.delegateCount = 0, !v.setup || !1 === v.setup.call(b, e, j, s))) b.addEventListener ? b.addEventListener(n, s, !1) : b.attachEvent && b.attachEvent("on" + n, s);
                    v.add && (v.add.call(b, m), m.handler.guid || (m.handler.guid = p.guid));
                    y ? r.splice(r.delegateCount++, 0, m) : r.push(m);
                    f.event.global[n] = !0
                }
                b = null
            }
        },
        global: {},
        remove: function(b, c, d, e, g) {
            var l, s, m, n, j, x, r, v, z, q, I = f.hasData(b) && f._data(b);
            if (I && (r = I.events)) {
                c = f.trim(Sb(c || "")).split(" ");
                for (l = 0; l < c.length; l++)
                    if (s = Qb.exec(c[l]) || [], m = n = s[1], s = s[2], m) {
                        v = f.event.special[m] || {};
                        m = (e ? v.delegateType : v.bindType) || m;
                        z = r[m] || [];
                        j = z.length;
                        s = s ? RegExp("(^|\\.)" + s.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
                        for (x = 0; x < z.length; x++) q = z[x], (g || n === q.origType) && (!d || d.guid === q.guid) && (!s || s.test(q.namespace)) && (!e || e === q.selector || "**" === e && q.selector) && (z.splice(x--, 1), q.selector && z.delegateCount--, v.remove && v.remove.call(b, q));
                        0 === z.length && j !== z.length && ((!v.teardown || !1 === v.teardown.call(b, s, I.handle)) && f.removeEvent(b,
                            m, I.handle), delete r[m])
                    } else
                        for (m in r) f.event.remove(b, m + c[l], d, e, !0);
                f.isEmptyObject(r) && (delete I.handle, f.removeData(b, "events", !0))
            }
        },
        customEvent: { getData: !0, setData: !0, changeData: !0 },
        trigger: function(u, d, p, e) {
            if (!p || 3 !== p.nodeType && 8 !== p.nodeType) {
                var g, l, s, m, n, j, x, r = u.type || u;
                m = [];
                if (!Rb.test(r + f.event.triggered) && (0 <= r.indexOf("!") && (r = r.slice(0, -1), g = !0), 0 <= r.indexOf(".") && (m = r.split("."), r = m.shift(), m.sort()), p && !f.event.customEvent[r] || f.event.global[r]))
                    if (u = "object" == typeof u ? u[f.expando] ?
                        u : new f.Event(r, u) : new f.Event(r), u.type = r, u.isTrigger = !0, u.exclusive = g, u.namespace = m.join("."), u.namespace_re = u.namespace ? RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, m = 0 > r.indexOf(":") ? "on" + r : "", p) {
                        if (u.result = c, u.target || (u.target = p), d = null != d ? f.makeArray(d) : [], d.unshift(u), n = f.event.special[r] || {}, !(n.trigger && !1 === n.trigger.apply(p, d))) {
                            x = [
                                [p, n.bindType || r]
                            ];
                            if (!e && !n.noBubble && !f.isWindow(p)) {
                                l = n.delegateType || r;
                                g = Rb.test(l + r) ? p : p.parentNode;
                                for (s = p; g; g = g.parentNode) x.push([g, l]),
                                    s = g;
                                s === (p.ownerDocument || A) && x.push([s.defaultView || s.parentWindow || b, l])
                            }
                            for (l = 0; l < x.length && !u.isPropagationStopped(); l++) g = x[l][0], u.type = x[l][1], (j = (f._data(g, "events") || {})[u.type] && f._data(g, "handle")) && j.apply(g, d), (j = m && g[m]) && f.acceptData(g) && j.apply && !1 === j.apply(g, d) && u.preventDefault();
                            return u.type = r, !e && !u.isDefaultPrevented() && (!n._default || !1 === n._default.apply(p.ownerDocument, d)) && ("click" !== r || !f.nodeName(p, "a")) && f.acceptData(p) && m && p[r] && ("focus" !== r && "blur" !== r || 0 !== u.target.offsetWidth) &&
                                !f.isWindow(p) && (s = p[m], s && (p[m] = null), f.event.triggered = r, p[r](), f.event.triggered = c, s && (p[m] = s)), u.result
                        }
                    } else
                        for (l in p = f.cache, p) p[l].events && p[l].events[r] && f.event.trigger(u, d, p[l].handle.elem, !0)
            }
        },
        dispatch: function(u) {
            u = f.event.fix(u || b.event);
            var d, p, e, g, l, s, m = (f._data(this, "events") || {})[u.type] || [],
                n = m.delegateCount,
                j = aa.call(arguments),
                x = !u.exclusive && !u.namespace,
                r = f.event.special[u.type] || {},
                v = [];
            j[0] = u;
            u.delegateTarget = this;
            if (!(r.preDispatch && !1 === r.preDispatch.call(this, u))) {
                if (n &&
                    (!u.button || "click" !== u.type))
                    for (p = u.target; p != this; p = p.parentNode || this)
                        if (!0 !== p.disabled || "click" !== u.type) { g = {};
                            l = [];
                            for (d = 0; d < n; d++) e = m[d], s = e.selector, g[s] === c && (g[s] = e.needsContext ? 0 <= f(s, this).index(p) : f.find(s, this, null, [p]).length), g[s] && l.push(e);
                            l.length && v.push({ elem: p, matches: l }) }
                m.length > n && v.push({ elem: this, matches: m.slice(n) });
                for (d = 0; d < v.length && !u.isPropagationStopped(); d++) {
                    g = v[d];
                    u.currentTarget = g.elem;
                    for (p = 0; p < g.matches.length && !u.isImmediatePropagationStopped(); p++)
                        if (e = g.matches[p],
                            x || !u.namespace && !e.namespace || u.namespace_re && u.namespace_re.test(e.namespace)) u.data = e.data, u.handleObj = e, e = ((f.event.special[e.origType] || {}).handle || e.handler).apply(g.elem, j), e !== c && (u.result = e, !1 === e && (u.preventDefault(), u.stopPropagation()))
                }
                return r.postDispatch && r.postDispatch.call(this, u), u.result
            }
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: { props: ["char", "charCode", "key", "keyCode"], filter: function(b, c) {
                return null == b.which && (b.which = null != c.charCode ? c.charCode : c.keyCode), b } },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(b, d) {
                var f, e, g, l = d.button,
                    s = d.fromElement;
                return null == b.pageX && null != d.clientX && (f = b.target.ownerDocument || A, e = f.documentElement, g = f.body, b.pageX = d.clientX + (e && e.scrollLeft || g && g.scrollLeft || 0) - (e && e.clientLeft ||
                    g && g.clientLeft || 0), b.pageY = d.clientY + (e && e.scrollTop || g && g.scrollTop || 0) - (e && e.clientTop || g && g.clientTop || 0)), !b.relatedTarget && s && (b.relatedTarget = s === b.target ? d.toElement : s), !b.which && l !== c && (b.which = l & 1 ? 1 : l & 2 ? 3 : l & 4 ? 2 : 0), b
            }
        },
        fix: function(b) {
            if (b[f.expando]) return b;
            var c, d, e = b,
                g = f.event.fixHooks[b.type] || {},
                l = g.props ? this.props.concat(g.props) : this.props;
            b = f.Event(e);
            for (c = l.length; c;) d = l[--c], b[d] = e[d];
            return b.target || (b.target = e.srcElement || A), 3 === b.target.nodeType && (b.target = b.target.parentNode),
                b.metaKey = !!b.metaKey, g.filter ? g.filter(b, e) : b
        },
        special: { load: { noBubble: !0 }, focus: { delegateType: "focusin" }, blur: { delegateType: "focusout" }, beforeunload: { setup: function(b, c, d) { f.isWindow(this) && (this.onbeforeunload = d) }, teardown: function(b, c) { this.onbeforeunload === c && (this.onbeforeunload = null) } } },
        simulate: function(b, c, d, e) { b = f.extend(new f.Event, d, { type: b, isSimulated: !0, originalEvent: {} });
            e ? f.event.trigger(b, null, c) : f.event.dispatch.call(c, b);
            b.isDefaultPrevented() && d.preventDefault() }
    };
    f.event.handle =
        f.event.dispatch;
    f.removeEvent = A.removeEventListener ? function(b, c, d) { b.removeEventListener && b.removeEventListener(c, d, !1) } : function(b, c, d) { c = "on" + c;
        b.detachEvent && ("undefined" == typeof b[c] && (b[c] = null), b.detachEvent(c, d)) };
    f.Event = function(b, c) {
        if (this instanceof f.Event) b && b.type ? (this.originalEvent = b, this.type = b.type, this.isDefaultPrevented = b.defaultPrevented || !1 === b.returnValue || b.getPreventDefault && b.getPreventDefault() ? j : g) : this.type = b, c && f.extend(this, c), this.timeStamp = b && b.timeStamp || f.now(),
            this[f.expando] = !0;
        else return new f.Event(b, c)
    };
    f.Event.prototype = { preventDefault: function() { this.isDefaultPrevented = j;
            var b = this.originalEvent;
            b && (b.preventDefault ? b.preventDefault() : b.returnValue = !1) }, stopPropagation: function() { this.isPropagationStopped = j;
            var b = this.originalEvent;
            b && (b.stopPropagation && b.stopPropagation(), b.cancelBubble = !0) }, stopImmediatePropagation: function() { this.isImmediatePropagationStopped = j;
            this.stopPropagation() }, isDefaultPrevented: g, isPropagationStopped: g, isImmediatePropagationStopped: g };
    f.each({ mouseenter: "mouseover", mouseleave: "mouseout" }, function(b, c) { f.event.special[b] = { delegateType: c, bindType: c, handle: function(b) {
                var d, u = b.relatedTarget,
                    e = b.handleObj;
                if (!u || u !== this && !f.contains(this, u)) b.type = e.origType, d = e.handler.apply(this, arguments), b.type = c;
                return d } } });
    f.support.submitBubbles || (f.event.special.submit = {
        setup: function() {
            if (f.nodeName(this, "form")) return !1;
            f.event.add(this, "click._submit keypress._submit", function(b) {
                b = b.target;
                (b = f.nodeName(b, "input") || f.nodeName(b, "button") ?
                    b.form : c) && !f._data(b, "_submit_attached") && (f.event.add(b, "submit._submit", function(b) { b._submit_bubble = !0 }), f._data(b, "_submit_attached", !0))
            })
        },
        postDispatch: function(b) { b._submit_bubble && (delete b._submit_bubble, this.parentNode && !b.isTrigger && f.event.simulate("submit", this.parentNode, b, !0)) },
        teardown: function() {
            if (f.nodeName(this, "form")) return !1;
            f.event.remove(this, "._submit") }
    });
    f.support.changeBubbles || (f.event.special.change = {
        setup: function() {
            if (eb.test(this.nodeName)) {
                if ("checkbox" === this.type ||
                    "radio" === this.type) f.event.add(this, "propertychange._change", function(b) { "checked" === b.originalEvent.propertyName && (this._just_changed = !0) }), f.event.add(this, "click._change", function(b) { this._just_changed && !b.isTrigger && (this._just_changed = !1);
                    f.event.simulate("change", this, b, !0) });
                return !1
            }
            f.event.add(this, "beforeactivate._change", function(b) {
                b = b.target;
                eb.test(b.nodeName) && !f._data(b, "_change_attached") && (f.event.add(b, "change._change", function(b) {
                    this.parentNode && !b.isSimulated && !b.isTrigger &&
                        f.event.simulate("change", this.parentNode, b, !0)
                }), f._data(b, "_change_attached", !0))
            })
        },
        handle: function(b) {
            var c = b.target;
            if (this !== c || b.isSimulated || b.isTrigger || "radio" !== c.type && "checkbox" !== c.type) return b.handleObj.handler.apply(this, arguments) },
        teardown: function() {
            return f.event.remove(this, "._change"), !eb.test(this.nodeName) }
    });
    f.support.focusinBubbles || f.each({ focus: "focusin", blur: "focusout" }, function(b, c) {
        var d = 0,
            e = function(b) { f.event.simulate(c, b.target, f.event.fix(b), !0) };
        f.event.special[c] = { setup: function() { 0 === d++ && A.addEventListener(b, e, !0) }, teardown: function() { 0 === --d && A.removeEventListener(b, e, !0) } }
    });
    f.fn.extend({
        on: function(b, d, p, e, l) {
            var m, s;
            if ("object" == typeof b) { "string" != typeof d && (p = p || d, d = c);
                for (s in b) this.on(s, d, p, b[s], l);
                return this }
            null == p && null == e ? (e = d, p = d = c) : null == e && ("string" == typeof d ? (e = p, p = c) : (e = p, p = d, d = c));
            if (!1 === e) e = g;
            else if (!e) return this;
            return 1 === l && (m = e, e = function(b) {
                return f().off(b), m.apply(this, arguments) }, e.guid = m.guid || (m.guid = f.guid++)), this.each(function() {
                f.event.add(this,
                    b, e, p, d)
            })
        },
        one: function(b, c, d, f) {
            return this.on(b, c, d, f, 1) },
        off: function(b, d, p) {
            var e, l;
            if (b && b.preventDefault && b.handleObj) return e = b.handleObj, f(b.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler), this;
            if ("object" == typeof b) {
                for (l in b) this.off(l, d, b[l]);
                return this }
            if (!1 === d || "function" == typeof d) p = d, d = c;
            return !1 === p && (p = g), this.each(function() { f.event.remove(this, b, p, d) }) },
        bind: function(b, c, d) {
            return this.on(b, null, c, d) },
        unbind: function(b, c) {
            return this.off(b,
                null, c)
        },
        live: function(b, c, d) {
            return f(this.context).on(b, this.selector, c, d), this },
        die: function(b, c) {
            return f(this.context).off(b, this.selector || "**", c), this },
        delegate: function(b, c, d, f) {
            return this.on(c, b, d, f) },
        undelegate: function(b, c, d) {
            return 1 === arguments.length ? this.off(b, "**") : this.off(c, b || "**", d) },
        trigger: function(b, c) {
            return this.each(function() { f.event.trigger(b, c, this) }) },
        triggerHandler: function(b, c) {
            if (this[0]) return f.event.trigger(b, c, this[0], !0) },
        toggle: function(b) {
            var c = arguments,
                d =
                b.guid || f.guid++,
                e = 0,
                g = function(d) {
                    var p = (f._data(this, "lastToggle" + b.guid) || 0) % e;
                    return f._data(this, "lastToggle" + b.guid, p + 1), d.preventDefault(), c[p].apply(this, arguments) || !1 };
            for (g.guid = d; e < c.length;) c[e++].guid = d;
            return this.click(g)
        },
        hover: function(b, c) {
            return this.mouseenter(b).mouseleave(c || b) }
    });
    f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),
        function(b, c) { f.fn[c] = function(b, d) {
                return null == d && (d = b, b = null), 0 < arguments.length ? this.on(c, null, b, d) : this.trigger(c) };
            Uc.test(c) && (f.event.fixHooks[c] = f.event.keyHooks);
            Vc.test(c) && (f.event.fixHooks[c] = f.event.mouseHooks) });
    var Wc = b,
        C = function(b, c, d, f) {
            d = d || [];
            c = c || X;
            var e, g, s, l, m = c.nodeType;
            if (!b || "string" != typeof b) return d;
            if (1 !== m && 9 !== m) return [];
            s = La(c);
            if (!s && !f && (e = Xc.exec(b)))
                if (l = e[1])
                    if (9 === m) { g = c.getElementById(l);
                        if (!g || !g.parentNode) return d;
                        if (g.id === l) return d.push(g), d } else {
                        if (c.ownerDocument &&
                            (g = c.ownerDocument.getElementById(l)) && Tb(c, g) && g.id === l) return d.push(g), d
                    }
            else {
                if (e[2]) return pa.apply(d, qa.call(c.getElementsByTagName(b), 0)), d;
                if ((l = e[3]) && Ub && c.getElementsByClassName) return pa.apply(d, qa.call(c.getElementsByClassName(l), 0)), d }
            return fb(b.replace(Ma, "$1"), c, d, f, s)
        },
        wa = function(b) {
            return function(c) {
                return "input" === c.nodeName.toLowerCase() && c.type === b } },
        Vb = function(b) {
            return function(c) {
                var d = c.nodeName.toLowerCase();
                return ("input" === d || "button" === d) && c.type === b } },
        ja = function(b) {
            return Y(function(c) {
                return c = +c, Y(function(d, f) {
                    for (var e, g = b([], d.length, c), s = g.length; s--;) d[e = g[s]] && (d[e] = !(f[e] = d[e])) })
            })
        },
        Na = function(b, c, d) {
            if (b === c) return d;
            for (b = b.nextSibling; b;) {
                if (b === c) return -1;
                b = b.nextSibling }
            return 1 },
        Pa = function(b, c) {
            var d, f, e, g, s, l, m;
            if (s = Wb[G][b]) return c ? 0 : s.slice(0);
            s = b;
            l = [];
            for (m = K.preFilter; s;) {
                if (!d || (f = Yc.exec(s))) f && (s = s.slice(f[0].length)), l.push(e = []);
                d = !1;
                if (f = Zc.exec(s)) e.push(d = new Xb(f.shift())), s = s.slice(d.length), d.type = f[0].replace(Ma, " ");
                for (g in K.filter)(f = Oa[g].exec(s)) &&
                    (!m[g] || (f = m[g](f, X, !0))) && (e.push(d = new Xb(f.shift())), s = s.slice(d.length), d.type = g, d.matches = f);
                if (!d) break
            }
            return c ? s.length : s ? C.error(b) : Wb(b, l).slice(0)
        },
        hb = function(b, c, d) {
            var f = c.dir,
                e = d && "parentNode" === c.dir,
                g = $c++;
            return c.first ? function(c, d, t) {
                for (; c = c[f];)
                    if (e || 1 === c.nodeType) return b(c, d, t) } : function(c, d, t) {
                if (t)
                    for (; c = c[f];) {
                        if ((e || 1 === c.nodeType) && b(c, d, t)) return c } else
                        for (var p, l = xa + " " + g + " ", m = l + gb; c = c[f];)
                            if (e || 1 === c.nodeType) {
                                if ((p = c[G]) === m) return c.sizset;
                                if ("string" == typeof p &&
                                    0 === p.indexOf(l)) {
                                    if (c.sizset) return c } else { c[G] = m;
                                    if (b(c, d, t)) return c.sizset = !0, c;
                                    c.sizset = !1 }
                            }
            }
        },
        ib = function(b) {
            return 1 < b.length ? function(c, d, f) {
                for (var e = b.length; e--;)
                    if (!b[e](c, d, f)) return !1;
                return !0 } : b[0] },
        Qa = function(b, c, d, f, e) {
            for (var g, l = [], m = 0, n = b.length, j = null != c; m < n; m++)
                if (g = b[m])
                    if (!d || d(g, f, e)) l.push(g), j && c.push(m);
            return l },
        jb = function(b, c, d, f, e, g) {
            return f && !f[G] && (f = jb(f)), e && !e[G] && (e = jb(e, g)), Y(function(g, l, m, n) {
                if (!g || !e) {
                    var j, x, D = [],
                        r = [],
                        v = l.length;
                    if (!(x = g)) {
                        x = c || "*";
                        var z =
                            m.nodeType ? [m] : m,
                            q = [];
                        j = 0;
                        for (var I = z.length; j < I; j++) C(x, z[j], q, g);
                        x = q
                    }
                    z = b && (g || !c) ? Qa(x, D, b, m, n) : x;
                    q = d ? e || (g ? b : v || f) ? [] : l : z;
                    d && d(z, q, m, n);
                    if (f) { x = Qa(q, r);
                        f(x, [], m, n);
                        for (m = x.length; m--;)
                            if (j = x[m]) q[r[m]] = !(z[r[m]] = j) }
                    if (g)
                        for (m = b && q.length; m--;) {
                            if (j = q[m]) g[D[m]] = !(l[D[m]] = j) } else q = Qa(q === l ? q.splice(v, q.length) : q), e ? e(null, l, q, n) : pa.apply(l, q)
                }
            })
        },
        kb = function(b) {
            var c, d, f, e = b.length,
                g = K.relative[b[0].type];
            d = g || K.relative[" "];
            for (var l = g ? 1 : 0, m = hb(function(b) {
                    return b === c }, d, !0), n = hb(function(b) {
                    return -1 <
                        Yb.call(c, b)
                }, d, !0), j = [function(b, d, u) {
                    return !g && (u || d !== Ra) || ((c = d).nodeType ? m(b, d, u) : n(b, d, u)) }]; l < e; l++)
                if (d = K.relative[b[l].type]) j = [hb(ib(j), d)];
                else { d = K.filter[b[l].type].apply(null, b[l].matches);
                    if (d[G]) {
                        for (f = ++l; f < e && !K.relative[b[f].type]; f++);
                        return jb(1 < l && ib(j), 1 < l && b.slice(0, l - 1).join("").replace(Ma, "$1"), d, l < f && kb(b.slice(l, f)), f < e && kb(b = b.slice(f)), f < e && b.join("")) }
                    j.push(d) }
            return ib(j)
        },
        fb = function(b, c, d, f, e) {
            var g, l, m, n, j = Pa(b);
            if (!f && 1 === j.length) {
                l = j[0] = j[0].slice(0);
                if (2 < l.length &&
                    "ID" === (m = l[0]).type && 9 === c.nodeType && !e && K.relative[l[1].type]) { c = K.find.ID(m.matches[0].replace(ka, ""), c, e)[0];
                    if (!c) return d;
                    b = b.slice(l.shift().length) }
                for (g = Oa.POS.test(b) ? -1 : l.length - 1; 0 <= g; g--) { m = l[g];
                    if (K.relative[n = m.type]) break;
                    if (n = K.find[n])
                        if (f = n(m.matches[0].replace(ka, ""), lb.test(l[0].type) && c.parentNode || c, e)) { l.splice(g, 1);
                            b = f.length && l.join("");
                            if (!b) return pa.apply(d, qa.call(f, 0)), d;
                            break } }
            }
            return mb(b, j)(f, c, e, d, lb.test(b)), d
        },
        Zb = function() {},
        gb, nb, K, Sa, La, Tb, mb, ob, ya, Ra, $b = !0,
        G = ("sizcache" + Math.random()).replace(".", ""),
        Xb = String,
        X = Wc.document,
        W = X.documentElement,
        xa = 0,
        $c = 0,
        ad = [].pop,
        pa = [].push,
        qa = [].slice,
        Yb = [].indexOf || function(b) {
            for (var c = 0, d = this.length; c < d; c++)
                if (this[c] === b) return c;
            return -1 },
        Y = function(b, c) {
            return b[G] = null == c || c, b },
        pb = function() {
            var b = {},
                c = [];
            return Y(function(d, f) {
                return c.push(d) > K.cacheLength && delete b[c.shift()], b[d] = f }, b) },
        ac = pb(),
        Wb = pb(),
        bc = pb(),
        cc = "\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[-\\w]|[^\\x00-\\xa0])+)[\\x20\\t\\r\\n\\f]*(?:([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" +
        "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+".replace("w", "w#") + ")|)|)[\\x20\\t\\r\\n\\f]*\\]",
        qb = ":((?:\\\\.|[-\\w]|[^\\x00-\\xa0])+)(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + cc + ")|[^:]|\\\\.)*|.*))\\)|)",
        Ma = /^[\x20\t\r\n\f]+|((?:^|[^\\])(?:\\.)*)[\x20\t\r\n\f]+$/g,
        Yc = /^[\x20\t\r\n\f]*,[\x20\t\r\n\f]*/,
        Zc = /^[\x20\t\r\n\f]*([\x20\t\r\n\f>+~])[\x20\t\r\n\f]*/,
        bd = RegExp(qb),
        Xc = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,
        lb = /[\x20\t\r\n\f]*[+~]/,
        cd = /h\d/i,
        dd = /input|select|textarea|button/i,
        ka = /\\(?!\\)/g,
        Oa = {
            ID: /^#((?:\\.|[-\w]|[^\x00-\xa0])+)/,
            CLASS: /^\.((?:\\.|[-\w]|[^\x00-\xa0])+)/,
            NAME: /^\[name=['"]?((?:\\.|[-\w]|[^\x00-\xa0])+)['"]?\]/,
            TAG: RegExp("^(" + "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+".replace("w", "w*") + ")"),
            ATTR: RegExp("^" + cc),
            PSEUDO: RegExp("^" + qb),
            POS: /:(even|odd|eq|gt|lt|nth|first|last)(?:\([\x20\t\r\n\f]*((?:-\d)?\d*)[\x20\t\r\n\f]*\)|)(?=[^-]|$)/i,
            CHILD: RegExp("^:(only|nth|first|last)-child(?:\\([\\x20\\t\\r\\n\\f]*(even|odd|(([+-]|)(\\d*)n|)[\\x20\\t\\r\\n\\f]*(?:([+-]|)[\\x20\\t\\r\\n\\f]*(\\d+)|))[\\x20\\t\\r\\n\\f]*\\)|)",
                "i"),
            needsContext: RegExp("^[\\x20\\t\\r\\n\\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\([\\x20\\t\\r\\n\\f]*((?:-\\d)?\\d*)[\\x20\\t\\r\\n\\f]*\\)|)(?=[^-]|$)", "i")
        },
        ca = function(b) {
            var c = X.createElement("div");
            try {
                return b(c) } catch (d) {
                return !1 } finally {} },
        ed = ca(function(b) {
            return b.appendChild(X.createComment("")), !b.getElementsByTagName("*").length }),
        fd = ca(function(b) {
            return b.innerHTML = "<a href='#'></a>", b.firstChild && "undefined" !== typeof b.firstChild.getAttribute && "#" === b.firstChild.getAttribute("href") }),
        gd = ca(function(b) { b.innerHTML = "<select></select>";
            b = typeof b.lastChild.getAttribute("multiple");
            return "boolean" !== b && "string" !== b }),
        Ub = ca(function(b) {
            return b.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", !b.getElementsByClassName || !b.getElementsByClassName("e").length ? !1 : (b.lastChild.className = "e", 2 === b.getElementsByClassName("e").length) }),
        hd = ca(function(b) {
            b.id = G + 0;
            b.innerHTML = "<a name='" + G + "'></a><div name='" + G + "'></div>";
            W.insertBefore(b, W.firstChild);
            var c = X.getElementsByName &&
                X.getElementsByName(G).length === 2 + X.getElementsByName(G + 0).length;
            return nb = !X.getElementById(G), W.removeChild(b), c
        });
    try { qa.call(W.childNodes, 0)[0].nodeType } catch (Rd) { qa = function(b) {
            for (var c, d = []; c = this[b]; b++) d.push(c);
            return d } }
    C.matches = function(b, c) {
        return C(b, null, null, c) };
    C.matchesSelector = function(b, c) {
        return 0 < C(c, null, null, [b]).length };
    Sa = C.getText = function(b) {
        var c, d = "",
            f = 0;
        if (c = b.nodeType)
            if (1 === c || 9 === c || 11 === c) {
                if ("string" == typeof b.textContent) return b.textContent;
                for (b = b.firstChild; b; b =
                    b.nextSibling) d += Sa(b)
            } else {
                if (3 === c || 4 === c) return b.nodeValue }
        else
            for (; c = b[f]; f++) d += Sa(c);
        return d
    };
    La = C.isXML = function(b) {
        return (b = b && (b.ownerDocument || b).documentElement) ? "HTML" !== b.nodeName : !1 };
    Tb = C.contains = W.contains ? function(b, c) {
        var d = 9 === b.nodeType ? b.documentElement : b,
            f = c && c.parentNode;
        return b === f || !(!f || !(1 === f.nodeType && d.contains && d.contains(f))) } : W.compareDocumentPosition ? function(b, c) {
        return c && !!(b.compareDocumentPosition(c) & 16) } : function(b, c) {
        for (; c = c.parentNode;)
            if (c === b) return !0;
        return !1
    };
    C.attr = function(b, c) {
        var d, f = La(b);
        return f || (c = c.toLowerCase()), (d = K.attrHandle[c]) ? d(b) : f || gd ? b.getAttribute(c) : (d = b.getAttributeNode(c), d ? "boolean" == typeof b[c] ? b[c] ? c : null : d.specified ? d.value : null : null) };
    K = C.selectors = {
        cacheLength: 50,
        createPseudo: Y,
        match: Oa,
        attrHandle: fd ? {} : { href: function(b) {
                return b.getAttribute("href", 2) }, type: function(b) {
                return b.getAttribute("type") } },
        find: {
            ID: nb ? function(b, c, d) {
                if ("undefined" !== typeof c.getElementById && !d) return (b = c.getElementById(b)) && b.parentNode ? [b] : []
            } : function(b, c, d) {
                if ("undefined" !== typeof c.getElementById && !d) return (c = c.getElementById(b)) ? c.id === b || "undefined" !== typeof c.getAttributeNode && c.getAttributeNode("id").value === b ? [c] : void 0 : [] },
            TAG: ed ? function(b, c) {
                if ("undefined" !== typeof c.getElementsByTagName) return c.getElementsByTagName(b) } : function(b, c) {
                var d = c.getElementsByTagName(b);
                if ("*" === b) {
                    for (var f, e = [], g = 0; f = d[g]; g++) 1 === f.nodeType && e.push(f);
                    return e }
                return d },
            NAME: hd && function(b, c) {
                if ("undefined" !== typeof c.getElementsByName) return c.getElementsByName(name) },
            CLASS: Ub && function(b, c, d) {
                if ("undefined" !== typeof c.getElementsByClassName && !d) return c.getElementsByClassName(b) }
        },
        relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } },
        preFilter: {
            ATTR: function(b) {
                return b[1] = b[1].replace(ka, ""), b[3] = (b[4] || b[5] || "").replace(ka, ""), "~=" === b[2] && (b[3] = " " + b[3] + " "), b.slice(0, 4) },
            CHILD: function(b) {
                return b[1] = b[1].toLowerCase(), "nth" === b[1] ? (b[2] || C.error(b[0]), b[3] = +(b[3] ? b[4] + (b[5] || 1) :
                    2 * ("even" === b[2] || "odd" === b[2])), b[4] = +(b[6] + b[7] || "odd" === b[2])) : b[2] && C.error(b[0]), b
            },
            PSEUDO: function(b) {
                var c, d;
                if (Oa.CHILD.test(b[0])) return null;
                if (b[3]) b[2] = b[3];
                else if (c = b[4]) bd.test(c) && (d = Pa(c, !0)) && (d = c.indexOf(")", c.length - d) - c.length) && (c = c.slice(0, d), b[0] = b[0].slice(0, d)), b[2] = c;
                return b.slice(0, 3) }
        },
        filter: {
            ID: nb ? function(b) {
                return b = b.replace(ka, ""),
                    function(c) {
                        return c.getAttribute("id") === b } } : function(b) {
                return b = b.replace(ka, ""),
                    function(c) {
                        return (c = "undefined" !== typeof c.getAttributeNode &&
                            c.getAttributeNode("id")) && c.value === b
                    }
            },
            TAG: function(b) {
                return "*" === b ? function() {
                    return !0 } : (b = b.replace(ka, "").toLowerCase(), function(c) {
                    return c.nodeName && c.nodeName.toLowerCase() === b }) },
            CLASS: function(b) {
                var c = ac[G][b];
                return c || (c = ac(b, RegExp("(^|[\\x20\\t\\r\\n\\f])" + b + "([\\x20\\t\\r\\n\\f]|$)"))),
                    function(b) {
                        return c.test(b.className || "undefined" !== typeof b.getAttribute && b.getAttribute("class") || "") } },
            ATTR: function(b, c, d) {
                return function(f) {
                    f = C.attr(f, b);
                    return null == f ? "!=" === c : c ? (f += "", "=" ===
                        c ? f === d : "!=" === c ? f !== d : "^=" === c ? d && 0 === f.indexOf(d) : "*=" === c ? d && -1 < f.indexOf(d) : "$=" === c ? d && f.substr(f.length - d.length) === d : "~=" === c ? -1 < (" " + f + " ").indexOf(d) : "|=" === c ? f === d || f.substr(0, d.length + 1) === d + "-" : !1) : !0
                }
            },
            CHILD: function(b, c, d, f) {
                return "nth" === b ? function(b) {
                    var c, u;
                    c = b.parentNode;
                    if (1 === d && 0 === f) return !0;
                    if (c) { u = 0;
                        for (c = c.firstChild; c && !(1 === c.nodeType && (u++, b === c)); c = c.nextSibling); }
                    return u -= f, u === d || 0 === u % d && 0 <= u / d } : function(c) {
                    var d = c;
                    switch (b) {
                        case "only":
                        case "first":
                            for (; d = d.previousSibling;)
                                if (1 ===
                                    d.nodeType) return !1;
                            if ("first" === b) return !0;
                            d = c;
                        case "last":
                            for (; d = d.nextSibling;)
                                if (1 === d.nodeType) return !1;
                            return !0
                    }
                }
            },
            PSEUDO: function(b, c) {
                var d, f = K.pseudos[b] || K.setFilters[b.toLowerCase()] || C.error("unsupported pseudo: " + b);
                return f[G] ? f(c) : 1 < f.length ? (d = [b, b, "", c], K.setFilters.hasOwnProperty(b.toLowerCase()) ? Y(function(b, d) {
                    for (var u, e = f(b, c), p = e.length; p--;) u = Yb.call(b, e[p]), b[u] = !(d[u] = e[p]) }) : function(b) {
                    return f(b, 0, d) }) : f }
        },
        pseudos: {
            not: Y(function(b) {
                var c = [],
                    d = [],
                    f = mb(b.replace(Ma, "$1"));
                return f[G] ? Y(function(b, c, d, u) { u = f(b, null, u, []);
                    for (var e = b.length; e--;)
                        if (d = u[e]) b[e] = !(c[e] = d) }) : function(b, u, e) {
                    return c[0] = b, f(c, null, e, d), !d.pop() }
            }),
            has: Y(function(b) {
                return function(c) {
                    return 0 < C(b, c).length } }),
            contains: Y(function(b) {
                return function(c) {
                    return -1 < (c.textContent || c.innerText || Sa(c)).indexOf(b) } }),
            enabled: function(b) {
                return !1 === b.disabled },
            disabled: function(b) {
                return !0 === b.disabled },
            checked: function(b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && !!b.checked || "option" ===
                    c && !!b.selected
            },
            selected: function(b) {
                return b.parentNode && b.parentNode.selectedIndex, !0 === b.selected },
            parent: function(b) {
                return !K.pseudos.empty(b) },
            empty: function(b) {
                var c;
                for (b = b.firstChild; b;) {
                    if ("@" < b.nodeName || 3 === (c = b.nodeType) || 4 === c) return !1;
                    b = b.nextSibling }
                return !0 },
            header: function(b) {
                return cd.test(b.nodeName) },
            text: function(b) {
                var c, d;
                return "input" === b.nodeName.toLowerCase() && "text" === (c = b.type) && (null == (d = b.getAttribute("type")) || d.toLowerCase() === c) },
            radio: wa("radio"),
            checkbox: wa("checkbox"),
            file: wa("file"),
            password: wa("password"),
            image: wa("image"),
            submit: Vb("submit"),
            reset: Vb("reset"),
            button: function(b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && "button" === b.type || "button" === c },
            input: function(b) {
                return dd.test(b.nodeName) },
            focus: function(b) {
                var c = b.ownerDocument;
                return b === c.activeElement && (!c.hasFocus || c.hasFocus()) && (!!b.type || !!b.href) },
            active: function(b) {
                return b === b.ownerDocument.activeElement },
            first: ja(function() {
                return [0] }),
            last: ja(function(b, c) {
                return [c - 1] }),
            eq: ja(function(b,
                c, d) {
                return [0 > d ? d + c : d] }),
            even: ja(function(b, c) {
                for (var d = 0; d < c; d += 2) b.push(d);
                return b }),
            odd: ja(function(b, c) {
                for (var d = 1; d < c; d += 2) b.push(d);
                return b }),
            lt: ja(function(b, c, d) {
                for (c = 0 > d ? d + c : d; 0 <= --c;) b.push(c);
                return b }),
            gt: ja(function(b, c, d) {
                for (d = 0 > d ? d + c : d; ++d < c;) b.push(d);
                return b })
        }
    };
    ob = W.compareDocumentPosition ? function(b, c) {
        return b === c ? (ya = !0, 0) : (!b.compareDocumentPosition || !c.compareDocumentPosition ? b.compareDocumentPosition : b.compareDocumentPosition(c) & 4) ? -1 : 1 } : function(b, c) {
        if (b === c) return ya = !0, 0;
        if (b.sourceIndex && c.sourceIndex) return b.sourceIndex - c.sourceIndex;
        var d, f, e = [],
            g = [];
        d = b.parentNode;
        f = c.parentNode;
        var l = d;
        if (d === f) return Na(b, c);
        if (!d) return -1;
        if (!f) return 1;
        for (; l;) e.unshift(l), l = l.parentNode;
        for (l = f; l;) g.unshift(l), l = l.parentNode;
        d = e.length;
        f = g.length;
        for (l = 0; l < d && l < f; l++)
            if (e[l] !== g[l]) return Na(e[l], g[l]);
        return l === d ? Na(b, g[l], -1) : Na(e[l], c, 1)
    };
    [0, 0].sort(ob);
    $b = !ya;
    C.uniqueSort = function(b) {
        var c, d = 1;
        ya = $b;
        b.sort(ob);
        if (ya)
            for (; c = b[d]; d++) c === b[d - 1] && b.splice(d--, 1);
        return b
    };
    C.error = function(b) {
        throw Error("Syntax error, unrecognized expression: " + b); };
    mb = C.compile = function(b, c) {
        var d, f = [],
            e = [],
            g = bc[G][b];
        if (!g) {
            c || (c = Pa(b));
            for (d = c.length; d--;) g = kb(c[d]), g[G] ? f.push(g) : e.push(g);
            var l = 0 < f.length,
                m = 0 < e.length,
                n = function(b, c, d, u, p) {
                    var g, t, j = [],
                        x = 0,
                        r = "0",
                        D = b && [],
                        v = null != p,
                        q = Ra,
                        z = b || m && K.find.TAG("*", p && c.parentNode || c),
                        I = xa += null == q ? 1 : Math.E;
                    for (v && (Ra = c !== X && c, gb = n.el); null != (p = z[r]); r++) {
                        if (m && p) {
                            for (g = 0; t = e[g]; g++)
                                if (t(p, c, d)) { u.push(p);
                                    break }
                            v && (xa = I, gb =
                                ++n.el)
                        }
                        l && ((p = !t && p) && x--, b && D.push(p))
                    }
                    x += r;
                    if (l && r !== x) {
                        for (g = 0; t = f[g]; g++) t(D, j, c, d);
                        if (b) {
                            if (0 < x)
                                for (; r--;) !D[r] && !j[r] && (j[r] = ad.call(u));
                            j = Qa(j) }
                        pa.apply(u, j);
                        v && !b && 0 < j.length && 1 < x + f.length && C.uniqueSort(u) }
                    return v && (xa = I, Ra = q), D
                };
            d = (n.el = 0, l ? Y(n) : n);
            g = bc(b, d)
        }
        return g
    };
    if (X.querySelectorAll) {
        var dc, id = fb,
            jd = /'|\\/g,
            kd = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
            Z = [":focus"],
            Ta = [":active", ":focus"],
            Ua = W.matchesSelector || W.mozMatchesSelector || W.webkitMatchesSelector || W.oMatchesSelector ||
            W.msMatchesSelector;
        ca(function(b) { b.innerHTML = "<select><option selected=''></option></select>";
            b.querySelectorAll("[selected]").length || Z.push("\\[[\\x20\\t\\r\\n\\f]*(?:checked|disabled|ismap|multiple|readonly|selected|value)");
            b.querySelectorAll(":checked").length || Z.push(":checked") });
        ca(function(b) {
            b.innerHTML = "<p test=''></p>";
            b.querySelectorAll("[test^='']").length && Z.push("[*^$]=[\\x20\\t\\r\\n\\f]*(?:\"\"|'')");
            b.innerHTML = "<input type='hidden'/>";
            b.querySelectorAll(":enabled").length || Z.push(":enabled",
                ":disabled")
        });
        Z = RegExp(Z.join("|"));
        fb = function(b, c, d, f, e) {
            if (!f && !e && (!Z || !Z.test(b))) {
                var g, l, m = !0,
                    n = G;
                l = c;
                g = 9 === c.nodeType && b;
                if (1 === c.nodeType && "object" !== c.nodeName.toLowerCase()) { g = Pa(b);
                    (m = c.getAttribute("id")) ? n = m.replace(jd, "\\$&"): c.setAttribute("id", n);
                    n = "[id='" + n + "'] ";
                    for (l = g.length; l--;) g[l] = n + g[l].join("");
                    l = lb.test(b) && c.parentNode || c;
                    g = g.join(",") }
                if (g) try {
                    return pa.apply(d, qa.call(l.querySelectorAll(g), 0)), d } catch (j) {} finally { m || c.removeAttribute("id") } }
            return id(b, c, d, f, e) };
        Ua &&
            (ca(function(b) { dc = Ua.call(b, "div");
                try { Ua.call(b, "[test!='']:sizzle"), Ta.push("!=", qb) } catch (c) {} }), Ta = RegExp(Ta.join("|")), C.matchesSelector = function(b, c) { c = c.replace(kd, "='$1']");
                if (!La(b) && !Ta.test(c) && (!Z || !Z.test(c))) try {
                    var d = Ua.call(b, c);
                    if (d || dc || b.document && 11 !== b.document.nodeType) return d } catch (f) {}
                return 0 < C(c, null, null, [b]).length })
    }
    K.pseudos.nth = K.pseudos.eq;
    K.filters = Zb.prototype = K.pseudos;
    K.setFilters = new Zb;
    C.attr = f.attr;
    f.find = C;
    f.expr = C.selectors;
    f.expr[":"] = f.expr.pseudos;
    f.unique =
        C.uniqueSort;
    f.text = C.getText;
    f.isXMLDoc = C.isXML;
    f.contains = C.contains;
    var ld = /Until$/,
        md = /^(?:parents|prev(?:Until|All))/,
        vc = /^.[^:#\[\.,]*$/,
        ec = f.expr.match.needsContext,
        nd = { children: !0, contents: !0, next: !0, prev: !0 };
    f.fn.extend({
        find: function(b) {
            var c, d, e, g, l, m, n = this;
            if ("string" != typeof b) return f(b).filter(function() { c = 0;
                for (d = n.length; c < d; c++)
                    if (f.contains(n[c], this)) return !0 });
            m = this.pushStack("", "find", b);
            c = 0;
            for (d = this.length; c < d; c++)
                if (e = m.length, f.find(b, this[c], m), 0 < c)
                    for (g = e; g < m.length; g++)
                        for (l =
                            0; l < e; l++)
                            if (m[l] === m[g]) { m.splice(g--, 1);
                                break }
            return m
        },
        has: function(b) {
            var c, d = f(b, this),
                e = d.length;
            return this.filter(function() {
                for (c = 0; c < e; c++)
                    if (f.contains(this, d[c])) return !0 }) },
        not: function(b) {
            return this.pushStack(r(this, b, !1), "not", b) },
        filter: function(b) {
            return this.pushStack(r(this, b, !0), "filter", b) },
        is: function(b) {
            return !!b && ("string" == typeof b ? ec.test(b) ? 0 <= f(b, this.context).index(this[0]) : 0 < f.filter(b, this).length : 0 < this.filter(b).length) },
        closest: function(b, c) {
            for (var d, e = 0, g = this.length,
                    l = [], m = ec.test(b) || "string" != typeof b ? f(b, c || this.context) : 0; e < g; e++)
                for (d = this[e]; d && d.ownerDocument && d !== c && 11 !== d.nodeType;) {
                    if (m ? -1 < m.index(d) : f.find.matchesSelector(d, b)) { l.push(d);
                        break }
                    d = d.parentNode }
            return l = 1 < l.length ? f.unique(l) : l, this.pushStack(l, "closest", b)
        },
        index: function(b) {
            return b ? "string" == typeof b ? f.inArray(this[0], f(b)) : f.inArray(b.jquery ? b[0] : b, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1 },
        add: function(b, c) {
            var d = "string" == typeof b ? f(b, c) : f.makeArray(b && b.nodeType ? [b] : b),
                e = f.merge(this.get(), d);
            return this.pushStack(q(d[0]) || q(e[0]) ? e : f.unique(e))
        },
        addBack: function(b) {
            return this.add(null == b ? this.prevObject : this.prevObject.filter(b)) }
    });
    f.fn.andSelf = f.fn.addBack;
    f.each({
        parent: function(b) {
            return (b = b.parentNode) && 11 !== b.nodeType ? b : null },
        parents: function(b) {
            return f.dir(b, "parentNode") },
        parentsUntil: function(b, c, d) {
            return f.dir(b, "parentNode", d) },
        next: function(b) {
            return n(b, "nextSibling") },
        prev: function(b) {
            return n(b, "previousSibling") },
        nextAll: function(b) {
            return f.dir(b,
                "nextSibling")
        },
        prevAll: function(b) {
            return f.dir(b, "previousSibling") },
        nextUntil: function(b, c, d) {
            return f.dir(b, "nextSibling", d) },
        prevUntil: function(b, c, d) {
            return f.dir(b, "previousSibling", d) },
        siblings: function(b) {
            return f.sibling((b.parentNode || {}).firstChild, b) },
        children: function(b) {
            return f.sibling(b.firstChild) },
        contents: function(b) {
            return f.nodeName(b, "iframe") ? b.contentDocument || b.contentWindow.document : f.merge([], b.childNodes) }
    }, function(b, c) {
        f.fn[b] = function(d, e) {
            var g = f.map(this, c, d);
            return ld.test(b) ||
                (e = d), e && "string" == typeof e && (g = f.filter(e, g)), g = 1 < this.length && !nd[b] ? f.unique(g) : g, 1 < this.length && md.test(b) && (g = g.reverse()), this.pushStack(g, b, aa.call(arguments).join(","))
        }
    });
    f.extend({
        filter: function(b, c, d) {
            return d && (b = ":not(" + b + ")"), 1 === c.length ? f.find.matchesSelector(c[0], b) ? [c[0]] : [] : f.find.matches(b, c) },
        dir: function(b, d, e) {
            var g = [];
            for (b = b[d]; b && 9 !== b.nodeType && (e === c || 1 !== b.nodeType || !f(b).is(e));) 1 === b.nodeType && g.push(b), b = b[d];
            return g },
        sibling: function(b, c) {
            for (var d = []; b; b = b.nextSibling) 1 ===
                b.nodeType && b !== c && d.push(b);
            return d
        }
    });
    var xb = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        od = / jQuery\d+="(?:null|\d+)"/g,
        rb = /^\s+/,
        fc = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        gc = /<([\w:]+)/,
        pd = /<tbody/i,
        qd = /<|&#?\w+;/,
        rd = /<(?:script|style|link)/i,
        sd = /<(?:script|object|embed|option|style)/i,
        sb = RegExp("<(?:" + xb + ")[\\s/>]", "i"),
        yb = /^(?:checkbox|radio)$/,
        hc = /checked\s*(?:[^=]|=\s*.checked.)/i,
        td = /\/(java|ecma)script/i,
        ud = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
        V = { option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], area: [1, "<map>", "</map>"], _default: [0, "", ""] },
        ic = v(A),
        tb = ic.appendChild(A.createElement("div"));
    V.optgroup =
        V.option;
    V.tbody = V.tfoot = V.colgroup = V.caption = V.thead;
    V.th = V.td;
    f.support.htmlSerialize || (V._default = [1, "X<div>", "</div>"]);
    f.fn.extend({
        text: function(b) {
            return f.access(this, function(b) {
                return b === c ? f.text(this) : this.empty().append((this[0] && this[0].ownerDocument || A).createTextNode(b)) }, null, b, arguments.length) },
        wrapAll: function(b) {
            if (f.isFunction(b)) return this.each(function(c) { f(this).wrapAll(b.call(this, c)) });
            if (this[0]) {
                var c = f(b, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && c.insertBefore(this[0]);
                c.map(function() {
                    for (var b = this; b.firstChild && 1 === b.firstChild.nodeType;) b = b.firstChild;
                    return b }).append(this)
            }
            return this
        },
        wrapInner: function(b) {
            return f.isFunction(b) ? this.each(function(c) { f(this).wrapInner(b.call(this, c)) }) : this.each(function() {
                var c = f(this),
                    d = c.contents();
                d.length ? d.wrapAll(b) : c.append(b) }) },
        wrap: function(b) {
            var c = f.isFunction(b);
            return this.each(function(d) { f(this).wrapAll(c ? b.call(this, d) : b) }) },
        unwrap: function() {
            return this.parent().each(function() {
                f.nodeName(this, "body") ||
                    f(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function() {
            return this.domManip(arguments, !0, function(b) {
                (1 === this.nodeType || 11 === this.nodeType) && this.appendChild(b) }) },
        prepend: function() {
            return this.domManip(arguments, !0, function(b) {
                (1 === this.nodeType || 11 === this.nodeType) && this.insertBefore(b, this.firstChild) }) },
        before: function() {
            if (!q(this[0])) return this.domManip(arguments, !1, function(b) { this.parentNode.insertBefore(b, this) });
            if (arguments.length) {
                var b = f.clean(arguments);
                return this.pushStack(f.merge(b,
                    this), "before", this.selector)
            }
        },
        after: function() {
            if (!q(this[0])) return this.domManip(arguments, !1, function(b) { this.parentNode.insertBefore(b, this.nextSibling) });
            if (arguments.length) {
                var b = f.clean(arguments);
                return this.pushStack(f.merge(this, b), "after", this.selector) } },
        remove: function(b, c) {
            for (var d, e = 0; null != (d = this[e]); e++)
                if (!b || f.filter(b, [d]).length) !c && 1 === d.nodeType && (f.cleanData(d.getElementsByTagName("*")), f.cleanData([d])), d.parentNode && d.parentNode.removeChild(d);
            return this },
        empty: function() {
            for (var b,
                    c = 0; null != (b = this[c]); c++)
                for (1 === b.nodeType && f.cleanData(b.getElementsByTagName("*")); b.firstChild;) b.removeChild(b.firstChild);
            return this
        },
        clone: function(b, c) {
            return b = null == b ? !1 : b, c = null == c ? b : c, this.map(function() {
                return f.clone(this, b, c) }) },
        html: function(b) {
            return f.access(this, function(b) {
                var d = this[0] || {},
                    e = 0,
                    g = this.length;
                if (b === c) return 1 === d.nodeType ? d.innerHTML.replace(od, "") : c;
                if ("string" == typeof b && !rd.test(b) && (f.support.htmlSerialize || !sb.test(b)) && (f.support.leadingWhitespace || !rb.test(b)) &&
                    !V[(gc.exec(b) || ["", ""])[1].toLowerCase()]) { b = b.replace(fc, "<$1></$2>");
                    try {
                        for (; e < g; e++) d = this[e] || {}, 1 === d.nodeType && (f.cleanData(d.getElementsByTagName("*")), d.innerHTML = b);
                        d = 0 } catch (l) {} }
                d && this.empty().append(b)
            }, null, b, arguments.length)
        },
        replaceWith: function(b) {
            return q(this[0]) ? this.length ? this.pushStack(f(f.isFunction(b) ? b() : b), "replaceWith", b) : this : f.isFunction(b) ? this.each(function(c) {
                var d = f(this),
                    e = d.html();
                d.replaceWith(b.call(this, c, e)) }) : ("string" != typeof b && (b = f(b).detach()), this.each(function() {
                var c =
                    this.nextSibling,
                    d = this.parentNode;
                f(this).remove();
                c ? f(c).before(b) : f(d).append(b)
            }))
        },
        detach: function(b) {
            return this.remove(b, !0) },
        domManip: function(b, d, e) {
            b = [].concat.apply([], b);
            var g, l, m, s = 0,
                n = b[0],
                j = [],
                x = this.length;
            if (!f.support.checkClone && 1 < x && "string" == typeof n && hc.test(n)) return this.each(function() { f(this).domManip(b, d, e) });
            if (f.isFunction(n)) return this.each(function(g) {
                var l = f(this);
                b[0] = n.call(this, g, d ? l.html() : c);
                l.domManip(b, d, e) });
            if (this[0]) {
                g = f.buildFragment(b, this, j);
                m = g.fragment;
                l = m.firstChild;
                1 === m.childNodes.length && (m = l);
                if (l) { d = d && f.nodeName(l, "tr");
                    for (g = g.cacheable || x - 1; s < x; s++) e.call(d && f.nodeName(this[s], "table") ? this[s].getElementsByTagName("tbody")[0] || this[s].appendChild(this[s].ownerDocument.createElement("tbody")) : this[s], s === g ? m : f.clone(m, !0, !0)) }
                m = l = null;
                j.length && f.each(j, function(b, c) {
                    c.src ? f.ajax ? f.ajax({ url: c.src, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0 }) : f.error("no ajax") : f.globalEval((c.text || c.textContent || c.innerHTML || "").replace(ud,
                        ""));
                    c.parentNode && c.parentNode.removeChild(c)
                })
            }
            return this
        }
    });
    f.buildFragment = function(b, d, e) {
        var g, l, m, s = b[0];
        return d = d || A, d = !d.nodeType && d[0] || d, d = d.ownerDocument || d, 1 === b.length && "string" == typeof s && 512 > s.length && d === A && "<" === s.charAt(0) && !sd.test(s) && (f.support.checkClone || !hc.test(s)) && (f.support.html5Clone || !sb.test(s)) && (l = !0, g = f.fragments[s], m = g !== c), g || (g = d.createDocumentFragment(), f.clean(b, d, g, e), l && (f.fragments[s] = m && g)), { fragment: g, cacheable: l } };
    f.fragments = {};
    f.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(b, c) { f.fn[b] = function(d) {
            var e, g = 0,
                l = [];
            d = f(d);
            var m = d.length;
            e = 1 === this.length && this[0].parentNode;
            if ((null == e || e && 11 === e.nodeType && 1 === e.childNodes.length) && 1 === m) return d[c](this[0]), this;
            for (; g < m; g++) e = (0 < g ? this.clone(!0) : this).get(), f(d[g])[c](e), l = l.concat(e);
            return this.pushStack(l, b, d.selector) } });
    f.extend({
        clone: function(b, c, d) {
            var e, g, n, s;
            f.support.html5Clone || f.isXMLDoc(b) || !sb.test("<" + b.nodeName +
                ">") ? s = b.cloneNode(!0) : (tb.innerHTML = b.outerHTML, tb.removeChild(s = tb.firstChild));
            if ((!f.support.noCloneEvent || !f.support.noCloneChecked) && (1 === b.nodeType || 11 === b.nodeType) && !f.isXMLDoc(b)) { l(b, s);
                e = m(b);
                g = m(s);
                for (n = 0; e[n]; ++n) g[n] && l(e[n], g[n]) }
            if (c && (z(b, s), d)) { e = m(b);
                g = m(s);
                for (n = 0; e[n]; ++n) z(e[n], g[n]) }
            return s
        },
        clean: function(b, c, d, e) {
            var g, l, m, n, j, r, q, z = c === A && ic,
                I = [];
            if (!c || "undefined" == typeof c.createDocumentFragment) c = A;
            for (g = 0; null != (m = b[g]); g++)
                if ("number" == typeof m && (m += ""), m) {
                    if ("string" ==
                        typeof m)
                        if (qd.test(m)) {
                            z = z || v(c);
                            r = c.createElement("div");
                            z.appendChild(r);
                            m = m.replace(fc, "<$1></$2>");
                            l = (gc.exec(m) || ["", ""])[1].toLowerCase();
                            n = V[l] || V._default;
                            j = n[0];
                            for (r.innerHTML = n[1] + m + n[2]; j--;) r = r.lastChild;
                            if (!f.support.tbody) { j = pd.test(m);
                                n = "table" === l && !j ? r.firstChild && r.firstChild.childNodes : "<table>" === n[1] && !j ? r.childNodes : [];
                                for (l = n.length - 1; 0 <= l; --l) f.nodeName(n[l], "tbody") && !n[l].childNodes.length && n[l].parentNode.removeChild(n[l]) }!f.support.leadingWhitespace && rb.test(m) && r.insertBefore(c.createTextNode(rb.exec(m)[0]),
                                r.firstChild);
                            m = r.childNodes;
                            r.parentNode.removeChild(r)
                        } else m = c.createTextNode(m);
                    m.nodeType ? I.push(m) : f.merge(I, m)
                }
            r && (m = r = z = null);
            if (!f.support.appendChecked)
                for (g = 0; null != (m = I[g]); g++) f.nodeName(m, "input") ? x(m) : "undefined" != typeof m.getElementsByTagName && f.grep(m.getElementsByTagName("input"), x);
            if (d) {
                b = function(b) {
                    if (!b.type || td.test(b.type)) return e ? e.push(b.parentNode ? b.parentNode.removeChild(b) : b) : d.appendChild(b) };
                for (g = 0; null != (m = I[g]); g++)
                    if (!f.nodeName(m, "script") || !b(m)) d.appendChild(m),
                        "undefined" != typeof m.getElementsByTagName && (q = f.grep(f.merge([], m.getElementsByTagName("script")), b), I.splice.apply(I, [g + 1, 0].concat(q)), g += q.length)
            }
            return I
        },
        cleanData: function(b, c) {
            for (var d, e, g, l, m = 0, n = f.expando, j = f.cache, x = f.support.deleteExpando, r = f.event.special; null != (g = b[m]); m++)
                if (c || f.acceptData(g))
                    if (d = (e = g[n]) && j[e]) {
                        if (d.events)
                            for (l in d.events) r[l] ? f.event.remove(g, l) : f.removeEvent(g, l, d.handle);
                        j[e] && (delete j[e], x ? delete g[n] : g.removeAttribute ? g.removeAttribute(n) : g[n] = null, f.deletedIds.push(e)) } }
    });
    var Va, da;
    f.uaMatch = function(b) { b = b.toLowerCase();
        b = /(chrome)[ \/]([\w.]+)/.exec(b) || /(webkit)[ \/]([\w.]+)/.exec(b) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(b) || /(msie) ([\w.]+)/.exec(b) || 0 > b.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(b) || [];
        return { browser: b[1] || "", version: b[2] || "0" } };
    Va = f.uaMatch(Ac.userAgent);
    da = {};
    Va.browser && (da[Va.browser] = !0, da.version = Va.version);
    da.chrome ? da.webkit = !0 : da.webkit && (da.safari = !0);
    f.browser = da;
    f.sub = function() {
        function b(c, d) {
            return new b.fn.init(c,
                d)
        }
        f.extend(!0, b, this);
        b.superclass = this;
        b.fn = b.prototype = this();
        b.fn.constructor = b;
        b.sub = this.sub;
        b.fn.init = function(d, e) {
            return e && e instanceof f && !(e instanceof b) && (e = b(e)), f.fn.init.call(this, d, e, c) };
        b.fn.init.prototype = b.fn;
        var c = b(A);
        return b
    };
    var Q, ma, na, ub = /alpha\([^)]*\)/i,
        vd = /opacity=([^)]*)/,
        wd = /^(top|right|bottom|left)$/,
        xd = /^(none|table(?!-c[ea]).+)/,
        jc = /^margin/,
        wc = RegExp("^(" + Fa + ")(.*)$", "i"),
        za = RegExp("^(" + Fa + ")(?!px)[a-z%]+$", "i"),
        yd = RegExp("^([-+])=(" + Fa + ")", "i"),
        Za = {},
        zd = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        kc = { letterSpacing: 0, fontWeight: 400 },
        ea = ["Top", "Right", "Bottom", "Left"],
        zb = ["Webkit", "O", "Moz", "ms"],
        Ad = f.fn.toggle;
    f.fn.extend({
        css: function(b, d) {
            return f.access(this, function(b, d, e) {
                return e !== c ? f.style(b, d, e) : f.css(b, d) }, b, d, 1 < arguments.length) },
        show: function() {
            return E(this, !0) },
        hide: function() {
            return E(this) },
        toggle: function(b, c) {
            var d = "boolean" == typeof b;
            return f.isFunction(b) && f.isFunction(c) ? Ad.apply(this, arguments) : this.each(function() {
                (d ? b : M(this)) ? f(this).show():
                    f(this).hide()
            })
        }
    });
    f.extend({
        cssHooks: { opacity: { get: function(b, c) {
                    if (c) {
                        var d = Q(b, "opacity");
                        return "" === d ? "1" : d } } } },
        cssNumber: { fillOpacity: !0, fontWeight: !0, lineHeight: !0, opacity: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 },
        cssProps: { "float": f.support.cssFloat ? "cssFloat" : "styleFloat" },
        style: function(b, d, e, g) {
            if (b && !(3 === b.nodeType || 8 === b.nodeType || !b.style)) {
                var l, m, n, j = f.camelCase(d),
                    x = b.style;
                d = f.cssProps[j] || (f.cssProps[j] = I(x, j));
                n = f.cssHooks[d] || f.cssHooks[j];
                if (e === c) return n && "get" in n && (l = n.get(b, !1, g)) !== c ? l : x[d];
                m = typeof e;
                "string" === m && (l = yd.exec(e)) && (e = (l[1] + 1) * l[2] + parseFloat(f.css(b, d)), m = "number");
                if (!(null == e || "number" === m && isNaN(e)))
                    if ("number" === m && !f.cssNumber[j] && (e += "px"), !n || !("set" in n) || (e = n.set(b, e, g)) !== c) try { x[d] = e } catch (r) {}
            }
        },
        css: function(b, d, e, g) {
            var l, m, n, j = f.camelCase(d);
            return d = f.cssProps[j] || (f.cssProps[j] = I(b.style, j)), n = f.cssHooks[d] || f.cssHooks[j], n && "get" in n && (l = n.get(b, !0, g)), l === c && (l = Q(b, d)), "normal" === l && d in kc && (l = kc[d]), e || g !== c ? (m = parseFloat(l), e ||
                f.isNumeric(m) ? m || 0 : l) : l
        },
        swap: function(b, c, d) {
            var f, e = {};
            for (f in c) e[f] = b.style[f], b.style[f] = c[f];
            d = d.call(b);
            for (f in c) b.style[f] = e[f];
            return d }
    });
    b.getComputedStyle ? Q = function(c, d) {
        var e, g, l, m, n = b.getComputedStyle(c, null),
            j = c.style;
        return n && (e = n[d], "" === e && !f.contains(c.ownerDocument, c) && (e = f.style(c, d)), za.test(e) && jc.test(d) && (g = j.width, l = j.minWidth, m = j.maxWidth, j.minWidth = j.maxWidth = j.width = e, e = n.width, j.width = g, j.minWidth = l, j.maxWidth = m)), e } : A.documentElement.currentStyle && (Q = function(b,
        c) {
        var d, f, e = b.currentStyle && b.currentStyle[c],
            g = b.style;
        return null == e && g && g[c] && (e = g[c]), za.test(e) && !wd.test(c) && (d = g.left, f = b.runtimeStyle && b.runtimeStyle.left, f && (b.runtimeStyle.left = b.currentStyle.left), g.left = "fontSize" === c ? "1em" : e, e = g.pixelLeft + "px", g.left = d, f && (b.runtimeStyle.left = f)), "" === e ? "auto" : e });
    f.each(["height", "width"], function(b, c) {
        f.cssHooks[c] = {
            get: function(b, d, e) {
                if (d) return 0 === b.offsetWidth && xd.test(Q(b, "display")) ? f.swap(b, zd, function() {
                    return F(b, c, e) }) : F(b, c, e) },
            set: function(b,
                d, e) {
                return L(b, d, e ? Ya(b, c, e, f.support.boxSizing && "border-box" === f.css(b, "boxSizing")) : 0) }
        }
    });
    f.support.opacity || (f.cssHooks.opacity = {
        get: function(b, c) {
            return vd.test((c && b.currentStyle ? b.currentStyle.filter : b.style.filter) || "") ? 0.01 * parseFloat(RegExp.$1) + "" : c ? "1" : "" },
        set: function(b, c) {
            var d = b.style,
                e = b.currentStyle,
                g = f.isNumeric(c) ? "alpha(opacity=" + 100 * c + ")" : "",
                l = e && e.filter || d.filter || "";
            d.zoom = 1;
            if (1 <= c && ("" === f.trim(l.replace(ub, "")) && d.removeAttribute) && (d.removeAttribute("filter"), e && !e.filter)) return;
            d.filter = ub.test(l) ? l.replace(ub, g) : l + " " + g
        }
    });
    f(function() { f.support.reliableMarginRight || (f.cssHooks.marginRight = { get: function(b, c) {
                return f.swap(b, { display: "inline-block" }, function() {
                    if (c) return Q(b, "marginRight") }) } });!f.support.pixelPosition && f.fn.position && f.each(["top", "left"], function(b, c) { f.cssHooks[c] = { get: function(b, d) {
                    if (d) {
                        var e = Q(b, c);
                        return za.test(e) ? f(b).position()[c] + "px" : e } } } }) });
    f.expr && f.expr.filters && (f.expr.filters.hidden = function(b) {
        return 0 === b.offsetWidth && 0 === b.offsetHeight ||
            !f.support.reliableHiddenOffsets && "none" === (b.style && b.style.display || Q(b, "display"))
    }, f.expr.filters.visible = function(b) {
        return !f.expr.filters.hidden(b) });
    f.each({ margin: "", padding: "", border: "Width" }, function(b, c) { f.cssHooks[b + c] = { expand: function(d) {
                var f = "string" == typeof d ? d.split(" ") : [d],
                    e = {};
                for (d = 0; 4 > d; d++) e[b + ea[d] + c] = f[d] || f[d - 2] || f[0];
                return e } };
        jc.test(b) || (f.cssHooks[b + c].set = L) });
    var Bd = /%20/g,
        xc = /\[\]$/,
        lc = /\r?\n/g,
        Cd = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        Dd = /^(?:select|textarea)/i;
    f.fn.extend({ serialize: function() {
            return f.param(this.serializeArray()) }, serializeArray: function() {
            return this.map(function() {
                return this.elements ? f.makeArray(this.elements) : this }).filter(function() {
                return this.name && !this.disabled && (this.checked || Dd.test(this.nodeName) || Cd.test(this.type)) }).map(function(b, c) {
                var d = f(this).val();
                return null == d ? null : f.isArray(d) ? f.map(d, function(b) {
                    return { name: c.name, value: b.replace(lc, "\r\n") } }) : { name: c.name, value: d.replace(lc, "\r\n") } }).get() } });
    f.param = function(b, d) {
        var e, g = [],
            l = function(b, c) { c = f.isFunction(c) ? c() : null == c ? "" : c;
                g[g.length] = encodeURIComponent(b) + "=" + encodeURIComponent(c) };
        d === c && (d = f.ajaxSettings && f.ajaxSettings.traditional);
        if (f.isArray(b) || b.jquery && !f.isPlainObject(b)) f.each(b, function() { l(this.name, this.value) });
        else
            for (e in b) N(e, b[e], d, l);
        return g.join("&").replace(Bd, "+") };
    var ra, la, Ed = /#.*$/,
        Fd = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        Gd = /^(?:GET|HEAD)$/,
        Hd = /^\/\//,
        mc = /\?/,
        Id = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        Jd = /([?&])_=[^&]*/,
        nc = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        oc = f.fn.load,
        $a = {},
        pc = {},
        qc = ["*/"] + ["*"];
    try { la = zc.href } catch (Sd) { la = A.createElement("a"), la.href = "", la = la.href }
    ra = nc.exec(la.toLowerCase()) || [];
    f.fn.load = function(b, d, e) {
        if ("string" != typeof b && oc) return oc.apply(this, arguments);
        if (!this.length) return this;
        var g, l, m, n = this,
            j = b.indexOf(" ");
        return 0 <= j && (g = b.slice(j, b.length), b = b.slice(0, j)), f.isFunction(d) ? (e = d, d = c) : d && "object" == typeof d && (l = "POST"), f.ajax({
            url: b,
            type: l,
            dataType: "html",
            data: d,
            complete: function(b, c) { e && n.each(e, m || [b.responseText, c, b]) }
        }).done(function(b) { m = arguments;
            n.html(g ? f("<div>").append(b.replace(Id, "")).find(g) : b) }), this
    };
    f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(b, c) { f.fn[c] = function(b) {
            return this.on(c, b) } });
    f.each(["get", "post"], function(b, d) { f[d] = function(b, e, g, l) {
            return f.isFunction(e) && (l = l || g, g = e, e = c), f.ajax({ type: d, url: b, data: e, success: g, dataType: l }) } });
    f.extend({
        getScript: function(b, d) {
            return f.get(b,
                c, d, "script")
        },
        getJSON: function(b, c, d) {
            return f.get(b, c, d, "json") },
        ajaxSetup: function(b, c) {
            return c ? ta(b, f.ajaxSettings) : (c = b, b = f.ajaxSettings), ta(b, c), b },
        ajaxSettings: {
            url: la,
            isLocal: /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/.test(ra[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: !0,
            async: !0,
            accepts: { xml: "application/xml, text/xml", html: "text/html", text: "text/plain", json: "application/json, text/javascript", "*": qc },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: { xml: "responseXML", text: "responseText" },
            converters: { "* text": b.String, "text html": !0, "text json": f.parseJSON, "text xml": f.parseXML },
            flatOptions: { context: !0, url: !0 }
        },
        ajaxPrefilter: Aa($a),
        ajaxTransport: Aa(pc),
        ajax: function(b, d) {
            function e(b, d, m, p) {
                var u, t, x, v, D, E = d;
                if (2 !== F) {
                    F = 2;
                    j && clearTimeout(j);
                    n = c;
                    l = p || "";
                    H.readyState = 0 < b ? 4 : 0;
                    if (m) {
                        v = q;
                        p = H;
                        var U, R, C, J, K = v.contents,
                            N = v.dataTypes,
                            P = v.responseFields;
                        for (R in P) R in m && (p[P[R]] = m[R]);
                        for (;
                            "*" === N[0];) N.shift(),
                            U === c && (U = v.mimeType || p.getResponseHeader("content-type"));
                        if (U)
                            for (R in K)
                                if (K[R] && K[R].test(U)) { N.unshift(R);
                                    break }
                        if (N[0] in m) C = N[0];
                        else {
                            for (R in m) {
                                if (!N[0] || v.converters[R + " " + N[0]]) { C = R;
                                    break }
                                J || (J = R) }
                            C = C || J }
                        m = C ? (C !== N[0] && N.unshift(C), m[C]) : void 0;
                        v = m
                    }
                    if (200 <= b && 300 > b || 304 === b)
                        if (q.ifModified && (D = H.getResponseHeader("Last-Modified"), D && (f.lastModified[g] = D), D = H.getResponseHeader("Etag"), D && (f.etag[g] = D)), 304 === b) E = "notmodified", u = !0;
                        else {
                            var G;
                            a: {
                                u = q;t = v;
                                var O, E = u.dataTypes.slice();m = E[0];
                                U = {};R = 0;u.dataFilter && (t = u.dataFilter(t, u.dataType));
                                if (E[1])
                                    for (G in u.converters) U[G.toLowerCase()] = u.converters[G];
                                for (; x = E[++R];)
                                    if ("*" !== x) {
                                        if ("*" !== m && m !== x) { G = U[m + " " + x] || U["* " + x];
                                            if (!G)
                                                for (O in U)
                                                    if (D = O.split(" "), D[1] === x && (G = U[m + " " + D[0]] || U["* " + D[0]])) {!0 === G ? G = U[O] : !0 !== U[O] && (x = D[0], E.splice(R--, 0, x));
                                                        break }
                                            if (!0 !== G)
                                                if (G && u["throws"]) t = G(t);
                                                else try { t = G(t) } catch (Q) { G = { state: "parsererror", error: G ? Q : "No conversion from " + m + " to " + x };
                                                    break a } }
                                        m = x }
                                G = { state: "success", data: t }
                            }
                            u = G;
                            E = u.state;
                            t = u.data;
                            x = u.error;
                            u = !x
                        }
                    else if (x = E, !E || b) E = "error", 0 > b && (b = 0);
                    H.status = b;
                    H.statusText = (d || E) + "";
                    u ? M.resolveWith(z, [t, E, H]) : M.rejectWith(z, [H, E, x]);
                    H.statusCode(L);
                    L = c;
                    r && I.trigger("ajax" + (u ? "Success" : "Error"), [H, q, u ? t : x]);
                    A.fireWith(z, [H, E]);
                    r && (I.trigger("ajaxComplete", [H, q]), --f.active || f.event.trigger("ajaxStop"))
                }
            }
            "object" == typeof b && (d = b, b = c);
            d = d || {};
            var g, l, m, n, j, x, r, v, q = f.ajaxSetup({}, d),
                z = q.context || q,
                I = z !== q && (z.nodeType || z instanceof f) ? f(z) : f.event,
                M = f.Deferred(),
                A = f.Callbacks("once memory"),
                L = q.statusCode || {},
                E = {},
                C = {},
                F = 0,
                J = "canceled",
                H = { readyState: 0, setRequestHeader: function(b, c) {
                        if (!F) {
                            var d = b.toLowerCase();
                            b = C[d] = C[d] || b;
                            E[b] = c }
                        return this }, getAllResponseHeaders: function() {
                        return 2 === F ? l : null }, getResponseHeader: function(b) {
                        var d;
                        if (2 === F) {
                            if (!m)
                                for (m = {}; d = Fd.exec(l);) m[d[1].toLowerCase()] = d[2];
                            d = m[b.toLowerCase()] }
                        return d === c ? null : d }, overrideMimeType: function(b) {
                        return F || (q.mimeType = b), this }, abort: function(b) {
                        return b = b || J, n && n.abort(b), e(0, b), this } };
            M.promise(H);
            H.success = H.done;
            H.error = H.fail;
            H.complete = A.add;
            H.statusCode = function(b) {
                if (b) {
                    var c;
                    if (2 > F)
                        for (c in b) L[c] = [L[c], b[c]];
                    else c = b[H.status], H.always(c) }
                return this };
            q.url = ((b || q.url) + "").replace(Ed, "").replace(Hd, ra[1] + "//");
            q.dataTypes = f.trim(q.dataType || "*").toLowerCase().split(fa);
            null == q.crossDomain && (x = nc.exec(q.url.toLowerCase()) || !1, q.crossDomain = x && x.join(":") + (x[3] ? "" : "http:" === x[1] ? 80 : 443) !== ra.join(":") + (ra[3] ? "" : "http:" === ra[1] ? 80 : 443));
            q.data && q.processData && "string" != typeof q.data && (q.data = f.param(q.data,
                q.traditional));
            oa($a, q, d, H);
            if (2 === F) return H;
            r = q.global;
            q.type = q.type.toUpperCase();
            q.hasContent = !Gd.test(q.type);
            r && 0 === f.active++ && f.event.trigger("ajaxStart");
            if (!q.hasContent && (q.data && (q.url += (mc.test(q.url) ? "&" : "?") + q.data, delete q.data), g = q.url, !1 === q.cache)) { x = f.now();
                var K = q.url.replace(Jd, "$1_=" + x);
                q.url = K + (K === q.url ? (mc.test(q.url) ? "&" : "?") + "_=" + x : "") }(q.data && q.hasContent && !1 !== q.contentType || d.contentType) && H.setRequestHeader("Content-Type", q.contentType);
            q.ifModified && (g = g || q.url,
                f.lastModified[g] && H.setRequestHeader("If-Modified-Since", f.lastModified[g]), f.etag[g] && H.setRequestHeader("If-None-Match", f.etag[g]));
            H.setRequestHeader("Accept", q.dataTypes[0] && q.accepts[q.dataTypes[0]] ? q.accepts[q.dataTypes[0]] + ("*" !== q.dataTypes[0] ? ", " + qc + "; q=0.01" : "") : q.accepts["*"]);
            for (v in q.headers) H.setRequestHeader(v, q.headers[v]);
            if (!q.beforeSend || !1 !== q.beforeSend.call(z, H, q) && 2 !== F) {
                J = "abort";
                for (v in { success: 1, error: 1, complete: 1 }) H[v](q[v]);
                if (n = oa(pc, q, d, H)) {
                    H.readyState = 1;
                    r && I.trigger("ajaxSend", [H, q]);
                    q.async && 0 < q.timeout && (j = setTimeout(function() { H.abort("timeout") }, q.timeout));
                    try { F = 1, n.send(E, e) } catch (N) {
                        if (2 > F) e(-1, N);
                        else throw N; }
                } else e(-1, "No Transport");
                return H
            }
            return H.abort()
        },
        active: 0,
        lastModified: {},
        etag: {}
    });
    var rc = [],
        Kd = /\?/,
        Wa = /(=)\?(?=&|$)|\?\?/,
        Ld = f.now();
    f.ajaxSetup({ jsonp: "callback", jsonpCallback: function() {
            var b = rc.pop() || f.expando + "_" + Ld++;
            return this[b] = !0, b } });
    f.ajaxPrefilter("json jsonp", function(d, e, g) {
        var l, m, n, j = d.data,
            x = d.url,
            r = !1 !== d.jsonp,
            q = r && Wa.test(x),
            v = r && !q && "string" == typeof j && !(d.contentType || "").indexOf("application/x-www-form-urlencoded") && Wa.test(j);
        if ("jsonp" === d.dataTypes[0] || q || v) return l = d.jsonpCallback = f.isFunction(d.jsonpCallback) ? d.jsonpCallback() : d.jsonpCallback, m = b[l], q ? d.url = x.replace(Wa, "$1" + l) : v ? d.data = j.replace(Wa, "$1" + l) : r && (d.url += (Kd.test(x) ? "&" : "?") + d.jsonp + "=" + l), d.converters["script json"] = function() {
            return n || f.error(l + " was not called"), n[0] }, d.dataTypes[0] = "json", b[l] = function() { n = arguments }, g.always(function() {
            b[l] =
                m;
            d[l] && (d.jsonpCallback = e.jsonpCallback, rc.push(l));
            n && f.isFunction(m) && m(n[0]);
            n = m = c
        }), "script"
    });
    f.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /javascript|ecmascript/ }, converters: { "text script": function(b) {
                return f.globalEval(b), b } } });
    f.ajaxPrefilter("script", function(b) { b.cache === c && (b.cache = !1);
        b.crossDomain && (b.type = "GET", b.global = !1) });
    f.ajaxTransport("script", function(b) {
        if (b.crossDomain) {
            var d, f =
                A.head || A.getElementsByTagName("head")[0] || A.documentElement;
            return { send: function(e, g) { d = A.createElement("script");
                    d.async = "async";
                    b.scriptCharset && (d.charset = b.scriptCharset);
                    d.src = b.url;
                    d.onload = d.onreadystatechange = function(b, e) {
                        if (e || !d.readyState || /loaded|complete/.test(d.readyState)) d.onload = d.onreadystatechange = null, f && d.parentNode && f.removeChild(d), d = c, e || g(200, "success") };
                    f.insertBefore(d, f.firstChild) }, abort: function() { d && d.onload(0, 1) } }
        }
    });
    var sa, vb = b.ActiveXObject ? function() {
            for (var b in sa) sa[b](0,
                1)
        } : !1,
        Md = 0;
    f.ajaxSettings.xhr = b.ActiveXObject ? function() {
        var c;
        if (!(c = !this.isLocal && Ab())) a: {
            try { c = new b.ActiveXObject("Microsoft.XMLHTTP");
                break a } catch (d) {}
            c = void 0 }
        return c } : Ab;
    var wb = f.ajaxSettings.xhr();
    f.extend(f.support, { ajax: !!wb, cors: !!wb && "withCredentials" in wb });
    f.support.ajax && f.ajaxTransport(function(d) {
        if (!d.crossDomain || f.support.cors) {
            var e;
            return {
                send: function(g, l) {
                    var m, n, j = d.xhr();
                    d.username ? j.open(d.type, d.url, d.async, d.username, d.password) : j.open(d.type, d.url, d.async);
                    if (d.xhrFields)
                        for (n in d.xhrFields) j[n] =
                            d.xhrFields[n];
                    d.mimeType && j.overrideMimeType && j.overrideMimeType(d.mimeType);
                    !d.crossDomain && !g["X-Requested-With"] && (g["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (n in g) j.setRequestHeader(n, g[n]) } catch (x) {}
                    j.send(d.hasContent && d.data || null);
                    e = function(b, g) {
                        var n, p, x, r, q;
                        try {
                            if (e && (g || 4 === j.readyState))
                                if (e = c, m && (j.onreadystatechange = f.noop, vb && delete sa[m]), g) 4 !== j.readyState && j.abort();
                                else {
                                    n = j.status;
                                    x = j.getAllResponseHeaders();
                                    r = {};
                                    (q = j.responseXML) && q.documentElement && (r.xml = q);
                                    try {
                                        r.text =
                                            j.responseText
                                    } catch (v) {}
                                    try { p = j.statusText } catch (z) { p = "" }!n && d.isLocal && !d.crossDomain ? n = r.text ? 200 : 404 : 1223 === n && (n = 204)
                                }
                        } catch (I) { g || l(-1, I) }
                        r && l(n, p, r, x)
                    };
                    d.async ? 4 === j.readyState ? setTimeout(e, 0) : (m = ++Md, vb && (sa || (sa = {}, f(b).unload(vb)), sa[m] = e), j.onreadystatechange = e) : e()
                },
                abort: function() { e && e(0, 1) }
            }
        }
    });
    var Ba, Xa, Nd = /^(?:toggle|show|hide)$/,
        Od = RegExp("^(?:([-+])=|)(" + Fa + ")([a-z%]*)$", "i"),
        Pd = /queueHooks$/,
        Ca = [function(b, c, d) {
            var e, g, l, m, n, j, x = this,
                r = b.style,
                q = {},
                v = [],
                z = b.nodeType && M(b);
            d.queue ||
                (n = f._queueHooks(b, "fx"), null == n.unqueued && (n.unqueued = 0, j = n.empty.fire, n.empty.fire = function() { n.unqueued || j() }), n.unqueued++, x.always(function() { x.always(function() { n.unqueued--;
                        f.queue(b, "fx").length || n.empty.fire() }) }));
            1 === b.nodeType && ("height" in c || "width" in c) && (d.overflow = [r.overflow, r.overflowX, r.overflowY], "inline" === f.css(b, "display") && "none" === f.css(b, "float") && (!f.support.inlineBlockNeedsLayout || "inline" === P(b.nodeName) ? r.display = "inline-block" : r.zoom = 1));
            d.overflow && (r.overflow = "hidden",
                f.support.shrinkWrapBlocks || x.done(function() { r.overflow = d.overflow[0];
                    r.overflowX = d.overflow[1];
                    r.overflowY = d.overflow[2] }));
            for (e in c) g = c[e], Nd.exec(g) && (delete c[e], g !== (z ? "hide" : "show") && v.push(e));
            if (g = v.length) {
                l = f._data(b, "fxshow") || f._data(b, "fxshow", {});
                z ? f(b).show() : x.done(function() { f(b).hide() });
                x.done(function() {
                    var c;
                    f.removeData(b, "fxshow", !0);
                    for (c in q) f.style(b, c, q[c]) });
                for (e = 0; e < g; e++) c = v[e], m = x.createTween(c, z ? l[c] : 0), q[c] = l[c] || f.style(b, c), c in l || (l[c] = m.start, z && (m.end = m.start,
                    m.start = "width" === c || "height" === c ? 1 : 0))
            }
        }],
        ua = { "*": [function(b, c) {
                var d, e, g = this.createTween(b, c),
                    l = Od.exec(c),
                    m = g.cur(),
                    n = +m || 0,
                    j = 1,
                    x = 20;
                if (l) { d = +l[2];
                    e = l[3] || (f.cssNumber[b] ? "" : "px");
                    if ("px" !== e && n) { n = f.css(g.elem, b, !0) || d || 1;
                        do j = j || ".5", n /= j, f.style(g.elem, b, n + e); while (j !== (j = g.cur() / m) && 1 !== j && --x) }
                    g.unit = e;
                    g.start = n;
                    g.end = l[1] ? n + (l[1] + 1) * d : d }
                return g }] };
    f.Animation = f.extend(Cb, {
        tweener: function(b, c) {
            f.isFunction(b) ? (c = b, b = ["*"]) : b = b.split(" ");
            for (var d, e = 0, g = b.length; e < g; e++) d = b[e], ua[d] = ua[d] || [], ua[d].unshift(c)
        },
        prefilter: function(b, c) { c ? Ca.unshift(b) : Ca.push(b) }
    });
    f.Tween = S;
    S.prototype = {
        constructor: S,
        init: function(b, c, d, e, g, l) { this.elem = b;
            this.prop = d;
            this.easing = g || "swing";
            this.options = c;
            this.start = this.now = this.cur();
            this.end = e;
            this.unit = l || (f.cssNumber[d] ? "" : "px") },
        cur: function() {
            var b = S.propHooks[this.prop];
            return b && b.get ? b.get(this) : S.propHooks._default.get(this) },
        run: function(b) {
            var c, d = S.propHooks[this.prop];
            return this.options.duration ? this.pos = c = f.easing[this.easing](b, this.options.duration *
                b, 0, 1, this.options.duration) : this.pos = c = b, this.now = (this.end - this.start) * c + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), d && d.set ? d.set(this) : S.propHooks._default.set(this), this
        }
    };
    S.prototype.init.prototype = S.prototype;
    S.propHooks = {
        _default: {
            get: function(b) {
                var c;
                return null == b.elem[b.prop] || b.elem.style && null != b.elem.style[b.prop] ? (c = f.css(b.elem, b.prop, !1, ""), !c || "auto" === c ? 0 : c) : b.elem[b.prop] },
            set: function(b) {
                f.fx.step[b.prop] ? f.fx.step[b.prop](b) : b.elem.style &&
                    (null != b.elem.style[f.cssProps[b.prop]] || f.cssHooks[b.prop]) ? f.style(b.elem, b.prop, b.now + b.unit) : b.elem[b.prop] = b.now
            }
        }
    };
    S.propHooks.scrollTop = S.propHooks.scrollLeft = { set: function(b) { b.elem.nodeType && b.elem.parentNode && (b.elem[b.prop] = b.now) } };
    f.each(["toggle", "show", "hide"], function(b, c) {
        var d = f.fn[c];
        f.fn[c] = function(e, g, l) {
            return null == e || "boolean" == typeof e || !b && f.isFunction(e) && f.isFunction(g) ? d.apply(this, arguments) : this.animate(Da(c, !0), e, g, l) } });
    f.fn.extend({
        fadeTo: function(b, c, d, f) {
            return this.filter(M).css("opacity",
                0).show().end().animate({ opacity: c }, b, d, f)
        },
        animate: function(b, c, d, e) {
            var g = f.isEmptyObject(b),
                l = f.speed(c, d, e);
            c = function() {
                var c = Cb(this, f.extend({}, b), l);
                g && c.stop(!0) };
            return g || !1 === l.queue ? this.each(c) : this.queue(l.queue, c) },
        stop: function(b, d, e) {
            var g = function(b) {
                var c = b.stop;
                delete b.stop;
                c(e) };
            return "string" != typeof b && (e = d, d = b, b = c), d && !1 !== b && this.queue(b || "fx", []), this.each(function() {
                var c = !0,
                    d = null != b && b + "queueHooks",
                    l = f.timers,
                    m = f._data(this);
                if (d) m[d] && m[d].stop && g(m[d]);
                else
                    for (d in m) m[d] &&
                        m[d].stop && Pd.test(d) && g(m[d]);
                for (d = l.length; d--;) l[d].elem === this && (null == b || l[d].queue === b) && (l[d].anim.stop(e), c = !1, l.splice(d, 1));
                (c || !e) && f.dequeue(this, b)
            })
        }
    });
    f.each({ slideDown: Da("show"), slideUp: Da("hide"), slideToggle: Da("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function(b, c) { f.fn[b] = function(b, d, f) {
            return this.animate(c, b, d, f) } });
    f.speed = function(b, c, d) {
        var e = b && "object" == typeof b ? f.extend({}, b) : {
            complete: d || !d && c || f.isFunction(b) && b,
            duration: b,
            easing: d && c || c && !f.isFunction(c) && c
        };
        e.duration = f.fx.off ? 0 : "number" == typeof e.duration ? e.duration : e.duration in f.fx.speeds ? f.fx.speeds[e.duration] : f.fx.speeds._default;
        if (null == e.queue || !0 === e.queue) e.queue = "fx";
        return e.old = e.complete, e.complete = function() { f.isFunction(e.old) && e.old.call(this);
            e.queue && f.dequeue(this, e.queue) }, e
    };
    f.easing = { linear: function(b) {
            return b }, swing: function(b) {
            return 0.5 - Math.cos(b * Math.PI) / 2 } };
    f.timers = [];
    f.fx = S.prototype.init;
    f.fx.tick = function() {
        for (var b, c = f.timers,
                d = 0; d < c.length; d++) b = c[d], !b() && c[d] === b && c.splice(d--, 1);
        c.length || f.fx.stop()
    };
    f.fx.timer = function(b) { b() && f.timers.push(b) && !Xa && (Xa = setInterval(f.fx.tick, f.fx.interval)) };
    f.fx.interval = 13;
    f.fx.stop = function() { clearInterval(Xa);
        Xa = null };
    f.fx.speeds = { slow: 600, fast: 200, _default: 400 };
    f.fx.step = {};
    f.expr && f.expr.filters && (f.expr.filters.animated = function(b) {
        return f.grep(f.timers, function(c) {
            return b === c.elem }).length });
    var sc = /^(?:body|html)$/i;
    f.fn.offset = function(b) {
        if (arguments.length) return b ===
            c ? this : this.each(function(c) { f.offset.setOffset(this, b, c) });
        var d, e, g, l, m, n, j, x = { top: 0, left: 0 },
            r = this[0],
            q = r && r.ownerDocument;
        if (q) return (e = q.body) === r ? f.offset.bodyOffset(r) : (d = q.documentElement, f.contains(d, r) ? ("undefined" != typeof r.getBoundingClientRect && (x = r.getBoundingClientRect()), g = Db(q), l = d.clientTop || e.clientTop || 0, m = d.clientLeft || e.clientLeft || 0, n = g.pageYOffset || d.scrollTop, j = g.pageXOffset || d.scrollLeft, { top: x.top + n - l, left: x.left + j - m }) : x)
    };
    f.offset = {
        bodyOffset: function(b) {
            var c = b.offsetTop,
                d = b.offsetLeft;
            return f.support.doesNotIncludeMarginInBodyOffset && (c += parseFloat(f.css(b, "marginTop")) || 0, d += parseFloat(f.css(b, "marginLeft")) || 0), { top: c, left: d }
        },
        setOffset: function(b, c, d) {
            var e = f.css(b, "position");
            "static" === e && (b.style.position = "relative");
            var g = f(b),
                l = g.offset(),
                m = f.css(b, "top"),
                n = f.css(b, "left"),
                j = {},
                x = {},
                r, q;
            ("absolute" === e || "fixed" === e) && -1 < f.inArray("auto", [m, n]) ? (x = g.position(), r = x.top, q = x.left) : (r = parseFloat(m) || 0, q = parseFloat(n) || 0);
            f.isFunction(c) && (c = c.call(b, d, l));
            null !=
                c.top && (j.top = c.top - l.top + r);
            null != c.left && (j.left = c.left - l.left + q);
            "using" in c ? c.using.call(b, j) : g.css(j)
        }
    };
    f.fn.extend({
        position: function() {
            if (this[0]) {
                var b = this[0],
                    c = this.offsetParent(),
                    d = this.offset(),
                    e = sc.test(c[0].nodeName) ? { top: 0, left: 0 } : c.offset();
                return d.top -= parseFloat(f.css(b, "marginTop")) || 0, d.left -= parseFloat(f.css(b, "marginLeft")) || 0, e.top += parseFloat(f.css(c[0], "borderTopWidth")) || 0, e.left += parseFloat(f.css(c[0], "borderLeftWidth")) || 0, { top: d.top - e.top, left: d.left - e.left } } },
        offsetParent: function() {
            return this.map(function() {
                for (var b =
                        this.offsetParent || A.body; b && !sc.test(b.nodeName) && "static" === f.css(b, "position");) b = b.offsetParent;
                return b || A.body
            })
        }
    });
    f.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function(b, d) {
        var e = /Y/.test(d);
        f.fn[b] = function(g) {
            return f.access(this, function(b, g, l) {
                var m = Db(b);
                if (l === c) return m ? d in m ? m[d] : m.document.documentElement[g] : b[g];
                m ? m.scrollTo(e ? f(m).scrollLeft() : l, e ? l : f(m).scrollTop()) : b[g] = l }, b, g, arguments.length, null) } });
    f.each({ Height: "height", Width: "width" }, function(b, d) {
        f.each({
            padding: "inner" +
                b,
            content: d,
            "": "outer" + b
        }, function(e, g) { f.fn[g] = function(g, l) {
                var m = arguments.length && (e || "boolean" != typeof g),
                    n = e || (!0 === g || !0 === l ? "margin" : "border");
                return f.access(this, function(d, e, g) {
                    var l;
                    return f.isWindow(d) ? d.document.documentElement["client" + b] : 9 === d.nodeType ? (l = d.documentElement, Math.max(d.body["scroll" + b], l["scroll" + b], d.body["offset" + b], l["offset" + b], l["client" + b])) : g === c ? f.css(d, e, g, n) : f.style(d, e, g, n) }, d, m ? g : c, m, null) } })
    });
    b.jQuery = b.$ = f;
    "function" == typeof define && define.amd && define.amd.jQuery &&
        define("jquery", [], function() {
            return f })
})(window);
var portraitMode = !0,
    mobilePortraitWidth = 480,
    mobilePortraitHeight = 640,
    mobileLandscapeWidth = 640,
    mobileLandscapeHeight = 480,
    mobileWidth = portraitMode ? mobilePortraitWidth : mobileLandscapeWidth,
    mobileHeight = portraitMode ? mobilePortraitHeight : mobileLandscapeHeight,
    desktopWidth = portraitMode ? 480 : 640,
    desktopHeight = portraitMode ? 640 : 480,
    w, h, multiplier, destW, destH, dynamicClickableEntityDivs = {},
    coreDivsToResize = ["game", "play", "orientate"],
    advancedDivsToResize = {
        MobileAdInGamePreroll: {
            "box-width": _SETTINGS.Ad.Mobile.Preroll.Width +
                2,
            "box-height": _SETTINGS.Ad.Mobile.Preroll.Height + 20
        },
        MobileAdInGameEnd: { "box-width": _SETTINGS.Ad.Mobile.End.Width + 2, "box-height": _SETTINGS.Ad.Mobile.End.Height + 20 },
        MobileAdInGamePreroll2: { "box-width": _SETTINGS.Ad.Mobile.Preroll.Width + 2, "box-height": _SETTINGS.Ad.Mobile.Preroll.Height + 20 },
        MobileAdInGameEnd2: { "box-width": _SETTINGS.Ad.Mobile.End.Width + 2, "box-height": _SETTINGS.Ad.Mobile.End.Height + 20 },
        MobileAdInGamePreroll3: {
            "box-width": _SETTINGS.Ad.Mobile.Preroll.Width + 2,
            "box-height": _SETTINGS.Ad.Mobile.Preroll.Height +
                20
        },
        MobileAdInGameEnd3: { "box-width": _SETTINGS.Ad.Mobile.End.Width + 2, "box-height": _SETTINGS.Ad.Mobile.End.Height + 20 }
    };

function adjustLayers(b) {
    for (i = 0; i < coreDivsToResize.length; i++) ig.ua.mobile ? ($("#" + coreDivsToResize[i]).width(w), $("#" + coreDivsToResize[i]).height(h)) : ($("#" + coreDivsToResize[i]).width(destW), $("#" + coreDivsToResize[i]).height(destH), $("#" + coreDivsToResize[i]).css("left", b ? 0 : w / 2 - destW / 2));
    for (key in advancedDivsToResize) try {
        $("#" + key).width(w), $("#" + key).height(h), $("#" + key + "-Box").css("left", (w - advancedDivsToResize[key]["box-width"]) / 2), $("#" + key + "-Box").css("top", (h - advancedDivsToResize[key]["box-height"]) /
            2)
    } catch (c) { console.log(c) }
    $("#ajaxbar").width(w);
    $("#ajaxbar").height(h)
}

function sizeHandler() { $("#game") && (w = window.innerWidth, h = window.innerHeight, ig.ua.mobile ? (multiplier = Math.min(h / mobileHeight, w / mobileWidth), destW = mobileWidth * multiplier, destH = mobileHeight * multiplier) : (multiplier = Math.min(h / desktopHeight, w / desktopWidth), destW = desktopWidth * multiplier, destH = desktopHeight * multiplier), widthRatio = window.innerWidth / mobileWidth, heightRatio = window.innerHeight / mobileHeight, adjustLayers(), window.scrollTo(0, 1)) }

function orientationHandler() { console.log("changing orientation ...");
    ig.ua.mobile && ((portraitMode ? window.innerHeight < window.innerWidth : window.innerHeight > window.innerWidth) ? ($("#orientate").show(), $("#game").hide()) : ($("#orientate").hide(), $("#game").show()));
    sizeHandler() }

function fixSamsungHandler() {
    ig.ua.android && (!(4.2 > parseFloat(navigator.userAgent.slice(navigator.userAgent.indexOf("Android") + 8, navigator.userAgent.indexOf("Android") + 11))) && !(0 > navigator.userAgent.indexOf("GT")) && !(0 < navigator.userAgent.indexOf("Chrome")) && !(0 < navigator.userAgent.indexOf("Firefox"))) && (document.addEventListener("touchstart", function(b) { b.preventDefault();
        return !1 }, !1), document.addEventListener("touchmove", function(b) { b.preventDefault();
        return !1 }, !1), document.addEventListener("touchend",
        function(b) { b.preventDefault();
            return !1 }, !1))
}
window.addEventListener("resize", function() { orientationHandler() }, !1);
window.addEventListener("orientationchange", function() { orientationHandler() }, !1);
"true" === getQueryVariable("webview") ? ($(window).focus(function() { ig.ua.mobile && ig.game.resumeGame();
    ig.game && ig.game.unmute(!0) }), $(window).blur(function() { ig.game && ig.game.mute(!0) })) : (window.onfocus = function() { ig.ua.mobile && ig.game.resumeGame();
    ig.game && ig.game.unmute(!0) }, window.onblur = function() { ig.game && ig.game.mute(!0) });

function onVisibilityChange(b) { b.target.webkitHidden ? ig.game && ig.game.mute(!0) : (ig.ua.mobile && ig.game.resumeGame(), ig.game && ig.game.unmute(!0)) }
document.addEventListener("webkitvisibilitychange", onVisibilityChange, !1);
document.ontouchmove = function() { window.scrollTo(0, 1) };

function getInternetExplorerVersion() {
    var b = -1; "Microsoft Internet Explorer" == navigator.appName && null != /MSIE ([0-9]{1,}[.0-9]{0,})/.exec(navigator.userAgent) && (b = parseFloat(RegExp.$1));
    return b }
var ie = getInternetExplorerVersion();

function getQueryVariable(b) {
    for (var c = window.location.search.substring(1).split("&"), d = 0; d < c.length; d++) {
        var e = c[d].split("=");
        if (decodeURIComponent(e[0]) == b) return decodeURIComponent(e[1]) } };
this.jukebox = {};
jukebox.Player = function(b, c) {
    this.id = ++jukebox.__jukeboxId;
    this.origin = c || null;
    this.settings = {};
    for (var d in this.defaults) this.settings[d] = this.defaults[d];
    if ("[object Object]" === Object.prototype.toString.call(b))
        for (var e in b) this.settings[e] = b[e];
    "[object Function]" === Object.prototype.toString.call(jukebox.Manager) && (jukebox.Manager = new jukebox.Manager);
    this.resource = this.isPlaying = null;
    this.resource = "[object Object]" === Object.prototype.toString.call(jukebox.Manager) ? jukebox.Manager.getPlayableResource(this.settings.resources) : this.settings.resources[0] ||
        null;
    if (null === this.resource) throw "Your browser can't playback the given resources - or you have missed to include jukebox.Manager";
    this.__init();
    return this
};
jukebox.__jukeboxId = 0;
jukebox.Player.prototype = {
    defaults: { resources: [], autoplay: !1, spritemap: {}, flashMediaElement: "./swf/FlashMediaElement.swf", timeout: 1E3 },
    __addToManager: function() {!0 !== this.__wasAddedToManager && (jukebox.Manager.add(this), this.__wasAddedToManager = !0) },
    __init: function() {
        var b = this,
            c = this.settings,
            d = {},
            e;
        jukebox.Manager && void 0 !== jukebox.Manager.features && (d = jukebox.Manager.features);
        if (!0 === d.html5audio) {
            this.context = new Audio;
            this.context.src = this.resource;
            if (null === this.origin) {
                var g = function(c) { b.__addToManager(c) };
                this.context.addEventListener("canplaythrough", g, !0);
                window.setTimeout(function() { b.context.removeEventListener("canplaythrough", g, !0);
                    g("timeout") }, c.timeout)
            }
            this.context.autobuffer = !0;
            this.context.preload = !0;
            for (e in this.HTML5API) this[e] = this.HTML5API[e];
            1 < d.channels ? !0 === c.autoplay ? this.context.autoplay = !0 : void 0 !== c.spritemap[c.autoplay] && this.play(c.autoplay) : 1 === d.channels && void 0 !== c.spritemap[c.autoplay] && (this.backgroundMusic = c.spritemap[c.autoplay], this.backgroundMusic.started = Date.now ?
                Date.now() : +new Date, this.play(c.autoplay));
            1 == d.channels && !0 !== c.canPlayBackground && (window.addEventListener("pagehide", function() { null !== b.isPlaying && (b.pause(), b.__wasAutoPaused = !0) }), window.addEventListener("pageshow", function() { b.__wasAutoPaused && (b.resume(), delete b._wasAutoPaused) }))
        } else if (!0 === d.flashaudio) {
            for (e in this.FLASHAPI) this[e] = this.FLASHAPI[e];
            d = ["id=jukebox-flashstream-" + this.id, "autoplay=" + c.autoplay, "file=" + window.encodeURIComponent(this.resource)];
            this.__initFlashContext(d);
            !0 === c.autoplay ? this.play(0) : c.spritemap[c.autoplay] && this.play(c.autoplay)
        } else throw "Your Browser does not support Flash Audio or HTML5 Audio.";
    },
    __initFlashContext: function(b) {
        var c, d = this.settings.flashMediaElement,
            e, g = { flashvars: b.join("&"), quality: "high", bgcolor: "#000000", wmode: "transparent", allowscriptaccess: "always", allowfullscreen: "true" };
        if (navigator.userAgent.match(/MSIE/)) {
            c = document.createElement("div");
            document.getElementsByTagName("body")[0].appendChild(c);
            var j = document.createElement("object");
            j.id = "jukebox-flashstream-" + this.id;
            j.setAttribute("type", "application/x-shockwave-flash");
            j.setAttribute("classid", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000");
            j.setAttribute("width", "0");
            j.setAttribute("height", "0");
            g.movie = d + "?x=" + (Date.now ? Date.now() : +new Date);
            g.flashvars = b.join("&amp;");
            for (e in g) b = document.createElement("param"), b.setAttribute("name", e), b.setAttribute("value", g[e]), j.appendChild(b);
            c.outerHTML = j.outerHTML;
            this.context = document.getElementById("jukebox-flashstream-" + this.id)
        } else {
            c =
                document.createElement("embed");
            c.id = "jukebox-flashstream-" + this.id;
            c.setAttribute("type", "application/x-shockwave-flash");
            c.setAttribute("width", "100");
            c.setAttribute("height", "100");
            g.play = !1;
            g.loop = !1;
            g.src = d + "?x=" + (Date.now ? Date.now() : +new Date);
            for (e in g) c.setAttribute(e, g[e]);
            document.getElementsByTagName("body")[0].appendChild(c);
            this.context = c
        }
    },
    backgroundHackForiOS: function() {
        if (void 0 !== this.backgroundMusic) {
            var b = Date.now ? Date.now() : +new Date;
            void 0 === this.backgroundMusic.started ? (this.backgroundMusic.started =
                b, this.setCurrentTime(this.backgroundMusic.start)) : (this.backgroundMusic.lastPointer = (b - this.backgroundMusic.started) / 1E3 % (this.backgroundMusic.end - this.backgroundMusic.start) + this.backgroundMusic.start, this.play(this.backgroundMusic.lastPointer))
        }
    },
    play: function(b, c) {
        if (null !== this.isPlaying && !0 !== c) void 0 !== jukebox.Manager && jukebox.Manager.addToQueue(b, this.id);
        else {
            var d = this.settings.spritemap,
                e;
            if (void 0 !== d[b]) e = d[b].start;
            else if ("number" === typeof b) {
                e = b;
                for (var g in d)
                    if (e >= d[g].start && e <=
                        d[g].end) { b = g;
                        break }
            }
            void 0 !== e && "[object Object]" === Object.prototype.toString.call(d[b]) && (this.isPlaying = this.settings.spritemap[b], this.context.play && this.context.play(), this.wasReady = this.setCurrentTime(e))
        }
    },
    stop: function() { this.__lastPosition = 0;
        this.isPlaying = null;
        this.backgroundMusic ? this.backgroundHackForiOS() : this.context.pause();
        return !0 },
    pause: function() { this.isPlaying = null;
        this.__lastPosition = this.getCurrentTime();
        this.context.pause();
        return this.__lastPosition },
    resume: function(b) {
        b = "number" ===
            typeof b ? b : this.__lastPosition;
        if (null !== b) return this.play(b), this.__lastPosition = null, !0;
        this.context.play();
        return !1
    },
    HTML5API: { getVolume: function() {
            return this.context.volume || 1 }, setVolume: function(b) { this.context.volume = b;
            return 1E-4 > Math.abs(this.context.volume - b) ? !0 : !1 }, getCurrentTime: function() {
            return this.context.currentTime || 0 }, setCurrentTime: function(b) {
            try {
                return this.context.currentTime = b, !0 } catch (c) {
                return !1 } } },
    FLASHAPI: {
        getVolume: function() {
            return this.context && "function" === typeof this.context.getVolume ?
                this.context.getVolume() : 1
        },
        setVolume: function(b) {
            return this.context && "function" === typeof this.context.setVolume ? (this.context.setVolume(b), !0) : !1 },
        getCurrentTime: function() {
            return this.context && "function" === typeof this.context.getCurrentTime ? this.context.getCurrentTime() : 0 },
        setCurrentTime: function(b) {
            return this.context && "function" === typeof this.context.setCurrentTime ? this.context.setCurrentTime(b) : !1 }
    }
};
if (void 0 === this.jukebox) throw "jukebox.Manager requires jukebox.Player (Player.js) to run properly.";
jukebox.Manager = function(b) { this.features = {};
    this.codecs = {};
    this.__players = {};
    this.__playersLength = 0;
    this.__clones = {};
    this.__queue = [];
    this.settings = {};
    for (var c in this.defaults) this.settings[c] = this.defaults[c];
    if ("[object Object]" === Object.prototype.toString.call(b))
        for (var d in b) this.settings[d] = b[d];
    this.__detectFeatures();
    jukebox.Manager.__initialized = !1 === this.settings.useGameLoop ? window.setInterval(function() { jukebox.Manager.loop() }, 20) : !0 };
jukebox.Manager.prototype = {
    defaults: { useFlash: !1, useGameLoop: !1 },
    __detectFeatures: function() {
        var b = window.Audio && new Audio;
        if (b && b.canPlayType && !1 === this.settings.useFlash) {
            for (var c = [{ e: "3gp", m: ["audio/3gpp", "audio/amr"] }, { e: "aac", m: ["audio/aac", "audio/aacp"] }, { e: "amr", m: ["audio/amr", "audio/3gpp"] }, { e: "caf", m: ["audio/IMA-ADPCM", "audio/x-adpcm", 'audio/x-aiff; codecs="IMA-ADPCM, ADPCM"'] }, { e: "m4a", m: 'audio/mp4{audio/mp4; codecs="mp4a.40.2,avc1.42E01E"{audio/mpeg4{audio/mpeg4-generic{audio/mp4a-latm{audio/MP4A-LATM{audio/x-m4a'.split("{") },
                        { e: "mp3", m: ["audio/mp3", "audio/mpeg", 'audio/mpeg; codecs="mp3"', "audio/MPA", "audio/mpa-robust"] }, { e: "mpga", m: ["audio/MPA", "audio/mpa-robust", "audio/mpeg", "video/mpeg"] }, { e: "mp4", m: ["audio/mp4", "video/mp4"] }, { e: "ogg", m: ["application/ogg", "audio/ogg", 'audio/ogg; codecs="theora, vorbis"', "video/ogg", 'video/ogg; codecs="theora, vorbis"'] }, { e: "wav", m: ["audio/wave", "audio/wav", 'audio/wav; codecs="1"', "audio/x-wav", "audio/x-pn-wav"] }, { e: "webm", m: ["audio/webm", 'audio/webm; codecs="vorbis"', "video/webm"] }
                    ],
                    d, e, g = 0, j = c.length; g < j; g++)
                if (e = c[g].e, c[g].m.length && "object" === typeof c[g].m)
                    for (var q = 0, n = c[g].m.length; q < n; q++)
                        if (d = c[g].m[q], "" !== b.canPlayType(d)) { this.codecs[e] = d;
                            break } else this.codecs[e] || (this.codecs[e] = !1);
            this.features.html5audio = !(!this.codecs.mp3 && !this.codecs.ogg && !this.codecs.webm && !this.codecs.wav);
            this.features.channels = 8;
            b.volume = 0.1337;
            this.features.volume = !!(1E-4 > Math.abs(b.volume - 0.1337));
            navigator.userAgent.match(/iPhone|iPod|iPad/i) && (this.features.channels = 1)
        }
        this.features.flashaudio = !!navigator.mimeTypes["application/x-shockwave-flash"] || !!navigator.plugins["Shockwave Flash"] || !1;
        if (window.ActiveXObject) try { new ActiveXObject("ShockwaveFlash.ShockwaveFlash.10"), this.features.flashaudio = !0 } catch (r) {}!0 === this.settings.useFlash && (this.features.flashaudio = !0);
        !0 === this.features.flashaudio && !this.features.html5audio && (this.codecs.mp3 = "audio/mp3", this.codecs.mpga = "audio/mpeg", this.codecs.mp4 = "audio/mp4", this.codecs.m4a = "audio/mp4", this.codecs["3gp"] = "audio/3gpp", this.codecs.amr = "audio/amr",
            this.features.volume = !0, this.features.channels = 1)
    },
    __getPlayerById: function(b) {
        return this.__players && void 0 !== this.__players[b] ? this.__players[b] : null },
    __getClone: function(b, c) {
        for (var d in this.__clones) {
            var e = this.__clones[d];
            if (null === e.isPlaying && e.origin === b) return e }
        if ("[object Object]" === Object.prototype.toString.call(c)) { d = {};
            for (var g in c) d[g] = c[g];
            d.autoplay = !1;
            g = new jukebox.Player(d, b);
            g.isClone = !0;
            g.wasReady = !1;
            return this.__clones[g.id] = g }
        return null },
    loop: function() {
        if (0 !== this.__playersLength)
            if (this.__queue.length &&
                this.__playersLength < this.features.channels) {
                var b = this.__queue[0],
                    c = this.__getPlayerById(b.origin);
                if (null !== c) {
                    var d = this.__getClone(b.origin, c.settings);
                    null !== d && (!0 === this.features.volume && (c = this.__players[b.origin]) && d.setVolume(c.getVolume()), this.add(d), d.play(b.pointer, !0)) }
                this.__queue.splice(0, 1) } else
                for (d in this.__queue.length && 1 === this.features.channels && (b = this.__queue[0], c = this.__getPlayerById(b.origin), null !== c && c.play(b.pointer, !0), this.__queue.splice(0, 1)), this.__players) b = this.__players[d],
                    c = b.getCurrentTime() || 0, b.isPlaying && !1 === b.wasReady ? b.wasReady = b.setCurrentTime(b.isPlaying.start) : b.isPlaying && !0 === b.wasReady ? c > b.isPlaying.end && (!0 === b.isPlaying.loop ? b.play(b.isPlaying.start, !0) : b.stop()) : b.isClone && null === b.isPlaying ? this.remove(b) : void 0 !== b.backgroundMusic && null === b.isPlaying && c > b.backgroundMusic.end && b.backgroundHackForiOS()
    },
    getPlayableResource: function(b) {
        "[object Array]" !== Object.prototype.toString.call(b) && (b = [b]);
        for (var c = 0, d = b.length; c < d; c++) {
            var e = b[c],
                g = e.match(/\.([^\.]*)$/)[1];
            if (g && this.codecs[g]) return e
        }
        return null
    },
    add: function(b) {
        return b instanceof jukebox.Player && void 0 === this.__players[b.id] ? (this.__playersLength++, this.__players[b.id] = b, !0) : !1 },
    remove: function(b) {
        return b instanceof jukebox.Player && void 0 !== this.__players[b.id] ? (this.__playersLength--, delete this.__players[b.id], !0) : !1 },
    addToQueue: function(b, c) {
        return ("string" === typeof b || "number" === typeof b) && void 0 !== this.__players[c] ? (this.__queue.push({ pointer: b, origin: c }), !0) : !1 }
};
(function() {
    var b = {},
        c = null,
        d = !0,
        e = !1;
    if ("undefined" !== typeof AudioContext) c = new AudioContext;
    else if ("undefined" !== typeof webkitAudioContext) c = new webkitAudioContext;
    else if ("undefined" !== typeof Audio) { d = !1;
        try { new Audio } catch (g) { e = !0 } } else d = !1, e = !0;
    if (d) {
        var j = "undefined" === typeof c.createGain ? c.createGainNode() : c.createGain();
        j.gain.value = 1;
        j.connect(c.destination) }
    var q = function() { this._volume = 1;
        this._muted = !1;
        this.usingWebAudio = d;
        this.noAudio = e;
        this._howls = [] };
    q.prototype = {
        volume: function(b) {
            b =
                parseFloat(b);
            if (0 <= b && 1 >= b) { this._volume = b;
                d && (j.gain.value = b);
                for (var c in this._howls)
                    if (this._howls.hasOwnProperty(c) && !1 === this._howls[c]._webAudio)
                        for (b = 0; b < this._howls[c]._audioNode.length; b++) this._howls[c]._audioNode[b].volume = this._howls[c]._volume * this._volume;
                return this }
            return d ? j.gain.value : this._volume
        },
        mute: function() { this._setMuted(!0);
            return this },
        unmute: function() { this._setMuted(!1);
            return this },
        _setMuted: function(b) {
            this._muted = b;
            d && (j.gain.value = b ? 0 : this._volume);
            for (var c in this._howls)
                if (this._howls.hasOwnProperty(c) &&
                    !1 === this._howls[c]._webAudio)
                    for (var e = 0; e < this._howls[c]._audioNode.length; e++) this._howls[c]._audioNode[e].muted = b
        }
    };
    var n = new q,
        q = null;
    if (!e) var q = new Audio,
        r = {
            mp3: !!q.canPlayType("audio/mpeg;").replace(/^no$/, ""),
            opus: !!q.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
            ogg: !!q.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
            wav: !!q.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""),
            m4a: !!(q.canPlayType("audio/x-m4a;") || q.canPlayType("audio/aac;")).replace(/^no$/,
                ""),
            mp4: !!(q.canPlayType("audio/x-mp4;") || q.canPlayType("audio/aac;")).replace(/^no$/, ""),
            weba: !!q.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")
        };
    var v = function(b) {
        this._autoplay = b.autoplay || !1;
        this._buffer = b.buffer || !1;
        this._duration = b.duration || 0;
        this._format = b.format || null;
        this._loop = b.loop || !1;
        this._loaded = !1;
        this._sprite = b.sprite || {};
        this._src = b.src || "";
        this._pos3d = b.pos3d || [0, 0, -0.5];
        this._volume = void 0 !== b.volume ? b.volume : 1;
        this._urls = b.urls || [];
        this._rate = b.rate || 1;
        this._onload = [b.onload || function() {}];
        this._onloaderror = [b.onloaderror || function() {}];
        this._onend = [b.onend || function() {}];
        this._onpause = [b.onpause || function() {}];
        this._onplay = [b.onplay || function() {}];
        this._onendTimer = [];
        this._webAudio = d && !this._buffer;
        this._audioNode = [];
        this._webAudio && this._setupAudioNode();
        n._howls.push(this);
        this.load()
    };
    v.prototype = {
        load: function() {
            var d = this,
                g = null;
            if (!e) {
                for (var j = 0; j < d._urls.length; j++) {
                    var q, v;
                    if (d._format) q = d._format;
                    else if (v = d._urls[j].toLowerCase().split("?")[0], q =
                        (q = v.match(/.+\.([^?]+)(\?|$)/)) && 2 <= q.length ? q : v.match(/data\:audio\/([^?]+);/)) q = q[1];
                    else { d.on("loaderror");
                        return }
                    if (r[q]) { g = d._urls[j];
                        break }
                }
                if (g) {
                    d._src = g;
                    if (d._webAudio) {
                        var E = g;
                        if (E in b) d._duration = b[E].duration, z(d);
                        else {
                            var L = new XMLHttpRequest;
                            L.open("GET", E, !0);
                            L.responseType = "arraybuffer";
                            L.onload = function() { c.decodeAudioData(L.response, function(c) { c && (b[E] = c, z(d, c)) }, function() { d.on("loaderror") }) };
                            L.onerror = function() {
                                d._webAudio && (d._buffer = !0, d._webAudio = !1, d._audioNode = [], delete d._gainNode,
                                    d.load())
                            };
                            try { L.send() } catch (Ya) { L.onerror() }
                        }
                    } else {
                        var F = new Audio;
                        d._audioNode.push(F);
                        F.src = g;
                        F._pos = 0;
                        F.preload = "auto";
                        F.volume = n._muted ? 0 : d._volume * n.volume();
                        b[g] = d;
                        var P = function() { d._duration = Math.ceil(10 * F.duration) / 10;
                            0 === Object.getOwnPropertyNames(d._sprite).length && (d._sprite = { _default: [0, 1E3 * d._duration] });
                            d._loaded || (d._loaded = !0, d.on("load"));
                            d._autoplay && d.play();
                            F.removeEventListener("canplaythrough", P, !1) };
                        F.addEventListener("canplaythrough", P, !1);
                        F.load() }
                    return d
                }
            }
            d.on("loaderror")
        },
        urls: function(b) {
            return b ? (this.stop(), this._urls = "string" === typeof b ? [b] : b, this._loaded = !1, this.load(), this) : this._urls },
        play: function(d, e) {
            var g = this;
            "function" === typeof d && (e = d);
            if (!d || "function" === typeof d) d = "_default";
            if (!g._loaded) return g.on("load", function() { g.play(d, e) }), g;
            if (!g._sprite[d]) return "function" === typeof e && e(), g;
            g._inactiveNode(function(j) {
                j._sprite = d;
                var r = 0 < j._pos ? j._pos : g._sprite[d][0] / 1E3,
                    q = g._sprite[d][1] / 1E3 - j._pos,
                    v = !(!g._loop && !g._sprite[d][2]),
                    z = "string" === typeof e ? e :
                    Math.round(Date.now() * Math.random()) + "",
                    F, P = { id: z, sprite: d, loop: v };
                F = setTimeout(function() {!g._webAudio && v && g.stop(P.id, P.timer).play(d, P.id);
                    g._webAudio && !v && (g._nodeById(P.id).paused = !0, g._nodeById(P.id)._pos = 0);!g._webAudio && !v && g.stop(P.id, P.timer);
                    g.on("end", z) }, 1E3 * q);
                g._onendTimer.push(F);
                P.timer = g._onendTimer[g._onendTimer.length - 1];
                if (g._webAudio) {
                    F = g._sprite[d][0] / 1E3;
                    var N = g._sprite[d][1] / 1E3;
                    j.id = z;
                    j.paused = !1;
                    F = [v, F, N];
                    N = g._nodeById(z);
                    N.bufferSource = c.createBufferSource();
                    N.bufferSource.buffer =
                        b[g._src];
                    N.bufferSource.connect(N.panner);
                    N.bufferSource.loop = F[0];
                    F[0] && (N.bufferSource.loopStart = F[1], N.bufferSource.loopEnd = F[1] + F[2]);
                    N.bufferSource.playbackRate.value = g._rate;
                    g._playStart = c.currentTime;
                    j.gain.value = g._volume;
                    "undefined" === typeof j.bufferSource.start ? j.bufferSource.noteGrainOn(0, r, q) : j.bufferSource.start(0, r, q)
                } else if (4 === j.readyState) j.id = z, j.currentTime = r, j.muted = n._muted, j.volume = g._volume * n.volume(), setTimeout(function() { j.play() }, 0);
                else {
                    g._clearEndTimer(F);
                    var Aa = d,
                        oa =
                        e,
                        ta = function() { g.play(Aa, oa);
                            j.removeEventListener("canplaythrough", ta, !1) };
                    j.addEventListener("canplaythrough", ta, !1);
                    return g
                }
                g.on("play");
                "function" === typeof e && e(z);
                return g
            });
            return g
        },
        pause: function(b, c) {
            var d = this;
            if (!d._loaded) return d.on("play", function() { d.pause(b) }), d;
            d._clearEndTimer(c || 0);
            var e = b ? d._nodeById(b) : d._activeNode();
            if (e)
                if (e._pos = d.pos(null, b), d._webAudio) {
                    if (!e.bufferSource || e.paused) return d;
                    e.paused = !0;
                    "undefined" === typeof e.bufferSource.stop ? e.bufferSource.noteOff(0) :
                        e.bufferSource.stop(0)
                } else e.pause();
            d.on("pause");
            return d
        },
        stop: function(b, c) {
            var d = this;
            if (!d._loaded) return d.on("play", function() { d.stop(b) }), d;
            d._clearEndTimer(c || 0);
            var e = b ? d._nodeById(b) : d._activeNode();
            if (e)
                if (e._pos = 0, d._webAudio) {
                    if (!e.bufferSource || e.paused) return d;
                    e.paused = !0; "undefined" === typeof e.bufferSource.stop ? e.bufferSource.noteOff(0) : e.bufferSource.stop(0) } else e.pause(), e.currentTime = 0;
            return d },
        mute: function(b) {
            var c = this;
            if (!c._loaded) return c.on("play", function() { c.mute(b) }),
                c;
            var d = b ? c._nodeById(b) : c._activeNode();
            d && (c._webAudio ? d.gain.value = 0 : d.volume = 0);
            return c
        },
        unmute: function(b) {
            var c = this;
            if (!c._loaded) return c.on("play", function() { c.unmute(b) }), c;
            var d = b ? c._nodeById(b) : c._activeNode();
            d && (c._webAudio ? d.gain.value = c._volume : d.volume = c._volume);
            return c },
        volume: function(b, c) {
            var d = this;
            b = parseFloat(b);
            if (0 <= b && 1 >= b) {
                d._volume = b;
                if (!d._loaded) return d.on("play", function() { d.volume(b, c) }), d;
                var e = c ? d._nodeById(c) : d._activeNode();
                e && (d._webAudio ? e.gain.value = b : e.volume =
                    b * n.volume());
                return d
            }
            return d._volume
        },
        loop: function(b) {
            return "boolean" === typeof b ? (this._loop = b, this) : this._loop },
        sprite: function(b) {
            return "object" === typeof b ? (this._sprite = b, this) : this._sprite },
        pos: function(b, d) {
            var e = this;
            if (!e._loaded) return e.on("load", function() { e.pos(b) }), "number" === typeof b ? e : e._pos || 0;
            b = parseFloat(b);
            var g = d ? e._nodeById(d) : e._activeNode();
            if (g) return 0 <= b ? (e.pause(d), g._pos = b, e.play(g._sprite, d), e) : e._webAudio ? g._pos + (c.currentTime - e._playStart) : g.currentTime;
            if (0 <= b) return e;
            for (g = 0; g < e._audioNode.length; g++)
                if (e._audioNode[g].paused && 4 === e._audioNode[g].readyState) return e._webAudio ? e._audioNode[g]._pos : e._audioNode[g].currentTime
        },
        pos3d: function(b, c, d, e) {
            var g = this;
            c = "undefined" === typeof c || !c ? 0 : c;
            d = "undefined" === typeof d || !d ? -0.5 : d;
            if (!g._loaded) return g.on("play", function() { g.pos3d(b, c, d, e) }), g;
            if (0 <= b || 0 > b) {
                if (g._webAudio) {
                    var n = e ? g._nodeById(e) : g._activeNode();
                    n && (g._pos3d = [b, c, d], n.panner.setPosition(b, c, d)) } } else return g._pos3d;
            return g },
        fade: function(b, c, d,
            e, g) {
            var n = this,
                j = Math.abs(b - c),
                r = b > c ? "down" : "up",
                j = j / 0.01,
                q = d / j;
            if (!n._loaded) return n.on("load", function() { n.fade(b, c, d, e, g) }), n;
            n.volume(b, g);
            for (var v = 1; v <= j; v++)(function() {
                var b = Math.round(1E3 * (n._volume + ("up" === r ? 0.01 : -0.01) * v)) / 1E3;
                setTimeout(function() { n.volume(b, g);
                    b === c && e && e() }, q * v) })() },
        fadeIn: function(b, c, d) {
            return this.volume(0).play().fade(0, b, c, d) },
        fadeOut: function(b, c, d, e) {
            var g = this;
            return g.fade(g._volume, b, c, function() { d && d();
                g.pause(e);
                g.on("end") }, e) },
        _nodeById: function(b) {
            for (var c =
                    this._audioNode[0], d = 0; d < this._audioNode.length; d++)
                if (this._audioNode[d].id === b) { c = this._audioNode[d];
                    break }
            return c
        },
        _activeNode: function() {
            for (var b = null, c = 0; c < this._audioNode.length; c++)
                if (!this._audioNode[c].paused) { b = this._audioNode[c];
                    break }
            this._drainPool();
            return b },
        _inactiveNode: function(b) {
            for (var c = null, d = 0; d < this._audioNode.length; d++)
                if (this._audioNode[d].paused && 4 === this._audioNode[d].readyState) { b(this._audioNode[d]);
                    c = !0;
                    break }
            this._drainPool();
            if (!c) {
                var e;
                this._webAudio ? (e = this._setupAudioNode(),
                    b(e)) : (this.load(), e = this._audioNode[this._audioNode.length - 1], e.addEventListener("loadedmetadata", function() { b(e) }))
            }
        },
        _drainPool: function() {
            var b = 0,
                c;
            for (c = 0; c < this._audioNode.length; c++) this._audioNode[c].paused && b++;
            for (c = this._audioNode.length - 1; 0 <= c && !(5 >= b); c--) this._audioNode[c].paused && (this._webAudio && this._audioNode[c].disconnect(0), b--, this._audioNode.splice(c, 1)) },
        _clearEndTimer: function(b) {
            b = this._onendTimer.indexOf(b);
            b = 0 <= b ? b : 0;
            this._onendTimer[b] && (clearTimeout(this._onendTimer[b]),
                this._onendTimer.splice(b, 1))
        },
        _setupAudioNode: function() {
            var b = this._audioNode,
                d = this._audioNode.length;
            b[d] = "undefined" === typeof c.createGain ? c.createGainNode() : c.createGain();
            b[d].gain.value = this._volume;
            b[d].paused = !0;
            b[d]._pos = 0;
            b[d].readyState = 4;
            b[d].connect(j);
            b[d].panner = c.createPanner();
            b[d].panner.setPosition(this._pos3d[0], this._pos3d[1], this._pos3d[2]);
            b[d].panner.connect(b[d]);
            return b[d] },
        on: function(b, c) {
            var d = this["_on" + b];
            if ("function" === typeof c) d.push(c);
            else
                for (var e = 0; e < d.length; e++) c ?
                    d[e].call(this, c) : d[e].call(this);
            return this
        },
        off: function(b, c) {
            for (var d = this["_on" + b], e = c.toString(), g = 0; g < d.length; g++)
                if (e === d[g].toString()) { d.splice(g, 1);
                    break }
            return this },
        unload: function() {
            for (var c = this._audioNode, d = 0; d < this._audioNode.length; d++) c[d].paused || this.stop(c[d].id), this._webAudio ? c[d].disconnect(0) : c[d].src = "";
            c = n._howls.indexOf(this);
            null !== c && 0 <= c && n._howls.splice(c, 1);
            delete b[this._src] }
    };
    if (d) var z = function(b, c) {
        b._duration = c ? c.duration : b._duration;
        0 === Object.getOwnPropertyNames(b._sprite).length &&
            (b._sprite = { _default: [0, 1E3 * b._duration] });
        b._loaded || (b._loaded = !0, b.on("load"));
        b._autoplay && b.play()
    };
    "function" === typeof define && define.amd && define(function() {
        return { Howler: n, Howl: v } });
    "undefined" !== typeof exports && (exports.Howler = n, exports.Howl = v);
    window.Howler = n;
    window.Howl = v
})();
(function(b, c, d, e, g, j, q) { b.GoogleAnalyticsObject = g;
    b[g] = b[g] || function() {
        (b[g].q = b[g].q || []).push(arguments) };
    b[g].l = 1 * new Date;
    j = c.createElement(d);
    q = c.getElementsByTagName(d)[0];
    j.async = 1;
    j.src = e;
    q.parentNode.insertBefore(j, q) })(window, document, "script", "analytics.js", "ga");
ga("create", "UA-64737171-1", { name: "marketjs" });
ga("marketjs.send", "pageview");
(function(b) {
    Number.prototype.map = function(b, c, d, e) {
        return d + (e - d) * ((this - b) / (c - b)) };
    Number.prototype.limit = function(b, c) {
        return Math.min(c, Math.max(b, this)) };
    Number.prototype.round = function(b) { b = Math.pow(10, b || 0);
        return Math.round(this * b) / b };
    Number.prototype.floor = function() {
        return Math.floor(this) };
    Number.prototype.ceil = function() {
        return Math.ceil(this) };
    Number.prototype.toInt = function() {
        return this | 0 };
    Number.prototype.toRad = function() {
        return this / 180 * Math.PI };
    Number.prototype.toDeg = function() {
        return 180 *
            this / Math.PI
    };
    Array.prototype.erase = function(b) {
        for (var c = this.length; c--;) this[c] === b && this.splice(c, 1);
        return this };
    Array.prototype.random = function() {
        return this[Math.floor(Math.random() * this.length)] };
    Function.prototype.bind = Function.prototype.bind || function(b) {
        if ("function" !== typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        var c = Array.prototype.slice.call(arguments, 1),
            d = this,
            e = function() {},
            g = function() {
                return d.apply(this instanceof e && b ?
                    this : b, c.concat(Array.prototype.slice.call(arguments)))
            };
        e.prototype = this.prototype;
        g.prototype = new e;
        return g
    };
    b.ig = {
        game: null,
        debug: null,
        version: "1.23",
        global: b,
        modules: {},
        resources: [],
        ready: !1,
        baked: !1,
        nocache: "",
        ua: {},
        prefix: b.ImpactPrefix || "",
        lib: "lib/",
        _current: null,
        _loadQueue: [],
        _waitForOnload: 0,
        $: function(b) {
            return "#" == b.charAt(0) ? document.getElementById(b.substr(1)) : document.getElementsByTagName(b) },
        $new: function(b) {
            return document.createElement(b) },
        copy: function(b) {
            if (!b || "object" != typeof b ||
                b instanceof HTMLElement || b instanceof ig.Class) return b;
            if (b instanceof Array)
                for (var c = [], d = 0, e = b.length; d < e; d++) c[d] = ig.copy(b[d]);
            else
                for (d in c = {}, b) c[d] = ig.copy(b[d]);
            return c
        },
        merge: function(b, c) {
            for (var d in c) {
                var e = c[d];
                if ("object" != typeof e || e instanceof HTMLElement || e instanceof ig.Class || null === e) b[d] = e;
                else {
                    if (!b[d] || "object" != typeof b[d]) b[d] = e instanceof Array ? [] : {};
                    ig.merge(b[d], e) } }
            return b },
        ksort: function(b) {
            if (!b || "object" != typeof b) return [];
            var c = [],
                d = [],
                e;
            for (e in b) c.push(e);
            c.sort();
            for (e = 0; e < c.length; e++) d.push(b[c[e]]);
            return d
        },
        setVendorAttribute: function(b, c, d) {
            var e = c.charAt(0).toUpperCase() + c.substr(1);
            b[c] = b["ms" + e] = b["moz" + e] = b["webkit" + e] = b["o" + e] = d },
        getVendorAttribute: function(b, c) {
            var d = c.charAt(0).toUpperCase() + c.substr(1);
            return b[c] || b["ms" + d] || b["moz" + d] || b["webkit" + d] || b["o" + d] },
        normalizeVendorAttribute: function(b, c) {
            var d = ig.getVendorAttribute(b, c);!b[c] && d && (b[c] = d) },
        getImagePixels: function(b, c, d, e, g) {
            var m = ig.$new("canvas");
            m.width = b.width;
            m.height =
                b.height;
            var j = m.getContext("2d");
            ig.System.SCALE.CRISP(m, j);
            var q = ig.getVendorAttribute(j, "backingStorePixelRatio") || 1;
            ig.normalizeVendorAttribute(j, "getImageDataHD");
            var M = b.width / q,
                E = b.height / q;
            m.width = Math.ceil(M);
            m.height = Math.ceil(E);
            j.drawImage(b, 0, 0, M, E);
            return 1 === q ? j.getImageData(c, d, e, g) : j.getImageDataHD(c, d, e, g)
        },
        module: function(b) {
            if (ig._current) throw "Module '" + ig._current.name + "' defines nothing";
            if (ig.modules[b] && ig.modules[b].body) throw "Module '" + b + "' is already defined";
            ig._current = { name: b, requires: [], loaded: !1, body: null };
            ig.modules[b] = ig._current;
            ig._loadQueue.push(ig._current);
            return ig
        },
        requires: function() { ig._current.requires = Array.prototype.slice.call(arguments);
            return ig },
        defines: function(b) { ig._current.body = b;
            ig._current = null;
            ig._initDOMReady() },
        addResource: function(b) { ig.resources.push(b) },
        setNocache: function(b) { ig.nocache = b ? "?" + Date.now() : "" },
        log: function() {},
        assert: function() {},
        show: function() {},
        mark: function() {},
        _loadScript: function(b, c) {
            ig.modules[b] = {
                name: b,
                requires: [],
                loaded: !1,
                body: null
            };
            ig._waitForOnload++;
            var d = ig.prefix + ig.lib + b.replace(/\./g, "/") + ".js" + ig.nocache,
                e = ig.$new("script");
            e.type = "text/javascript";
            e.src = d;
            e.onload = function() { ig._waitForOnload--;
                ig._execModules() };
            e.onerror = function() {
                throw "Failed to load module " + b + " at " + d + " required from " + c; };
            ig.$("head")[0].appendChild(e)
        },
        _execModules: function() {
            for (var b = !1, c = 0; c < ig._loadQueue.length; c++) {
                for (var d = ig._loadQueue[c], e = !0, g = 0; g < d.requires.length; g++) {
                    var m = d.requires[g];
                    ig.modules[m] ? ig.modules[m].loaded ||
                        (e = !1) : (e = !1, ig._loadScript(m, d.name))
                }
                e && d.body && (ig._loadQueue.splice(c, 1), d.loaded = !0, d.body(), b = !0, c--)
            }
            if (b) ig._execModules();
            else if (!ig.baked && 0 == ig._waitForOnload && 0 != ig._loadQueue.length) {
                b = [];
                for (c = 0; c < ig._loadQueue.length; c++) { e = [];
                    m = ig._loadQueue[c].requires;
                    for (g = 0; g < m.length; g++) d = ig.modules[m[g]], (!d || !d.loaded) && e.push(m[g]);
                    b.push(ig._loadQueue[c].name + " (requires: " + e.join(", ") + ")") }
                throw "Unresolved (or circular?) dependencies. Most likely there's a name/path mismatch for one of the listed modules or a previous syntax error prevents a module from loading:\n" +
                    b.join("\n");
            }
        },
        _DOMReady: function() {
            if (!ig.modules["dom.ready"].loaded) {
                if (!document.body) return setTimeout(ig._DOMReady, 13);
                ig.modules["dom.ready"].loaded = !0;
                ig._waitForOnload--;
                ig._execModules() }
            return 0 },
        _boot: function() {
            document.location.href.match(/\?nocache/) && ig.setNocache(!0);
            ig.ua.pixelRatio = b.devicePixelRatio || 1;
            ig.ua.viewport = { width: b.innerWidth, height: b.innerHeight };
            ig.ua.screen = { width: b.screen.availWidth * ig.ua.pixelRatio, height: b.screen.availHeight * ig.ua.pixelRatio };
            ig.ua.iPhone = /iPhone/i.test(navigator.userAgent);
            ig.ua.iPhone4 = ig.ua.iPhone && 2 == ig.ua.pixelRatio;
            ig.ua.iPad = /iPad/i.test(navigator.userAgent);
            ig.ua.android = /android/i.test(navigator.userAgent);
            ig.ua.winPhone = /Windows Phone/i.test(navigator.userAgent);
            ig.ua.iOS = ig.ua.iPhone || ig.ua.iPad;
            ig.ua.mobile = ig.ua.iOS || ig.ua.android || ig.ua.winPhone || /mobile/i.test(navigator.userAgent);
            ig.ua.touchDevice = "ontouchstart" in b || b.navigator.msMaxTouchPoints;
            ig.ua.is_uiwebview = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);
            ig.ua.is_safari_or_uiwebview =
                /(iPhone|iPod|iPad).*AppleWebKit/i.test(navigator.userAgent);
            ig.ua.iOS = ig.ua.iPhone || ig.ua.iPad;
            ig.ua.iOS6_tag = /OS 6_/i.test(navigator.userAgent);
            ig.ua.iOS6 = (ig.ua.iPhone || ig.ua.iPad) && ig.ua.iOS6_tag;
            ig.ua.winPhone = /Windows Phone/i.test(navigator.userAgent);
            ig.ua.touchDevice = "ontouchstart" in b || b.navigator.msMaxTouchPoints;
            ig.ua.mobile = ig.ua.iOS || ig.ua.android || ig.ua.iOS6 || ig.ua.winPhone || /mobile/i.test(navigator.userAgent)
        },
        _initDOMReady: function() {
            ig.modules["dom.ready"] ? ig._execModules() : (ig._boot(),
                ig.modules["dom.ready"] = { requires: [], loaded: !1, body: null }, ig._waitForOnload++, "complete" === document.readyState ? ig._DOMReady() : (document.addEventListener("DOMContentLoaded", ig._DOMReady, !1), b.addEventListener("load", ig._DOMReady, !1)))
        }
    };
    ig.normalizeVendorAttribute(b, "requestAnimationFrame");
    if (b.requestAnimationFrame) {
        var c = 1,
            d = {};
        b.ig.setAnimation = function(e, g) {
            var j = c++;
            d[j] = !0;
            var q = function() { d[j] && (b.requestAnimationFrame(q, g), e()) };
            b.requestAnimationFrame(q, g);
            return j };
        b.ig.clearAnimation = function(b) { delete d[b] } } else b.ig.setAnimation =
        function(c) {
            return b.setInterval(c, 1E3 / 60) }, b.ig.clearAnimation = function(c) { b.clearInterval(c) };
    var e = !1,
        g = /xyz/.test(function() { xyz }) ? /\bparent\b/ : /.*/,
        j = 0;
    b.ig.Class = function() {};
    var q = function(b) {
        var c = this.prototype,
            d = {},
            e;
        for (e in b) "function" == typeof b[e] && "function" == typeof c[e] && g.test(b[e]) ? (d[e] = c[e], c[e] = function(b, c) {
            return function() {
                var e = this.parent;
                this.parent = d[b];
                var g = c.apply(this, arguments);
                this.parent = e;
                return g } }(e, b[e])) : c[e] = b[e] };
    b.ig.Class.extend = function(c) {
        function d() {
            if (!e) {
                if (this.staticInstantiate) {
                    var b =
                        this.staticInstantiate.apply(this, arguments);
                    if (b) return b
                }
                for (var c in this) "object" == typeof this[c] && (this[c] = ig.copy(this[c]));
                this.init && this.init.apply(this, arguments)
            }
            return this
        }
        var v = this.prototype;
        e = !0;
        var z = new this;
        e = !1;
        for (var l in c) z[l] = "function" == typeof c[l] && "function" == typeof v[l] && g.test(c[l]) ? function(b, c) {
            return function() {
                var d = this.parent;
                this.parent = v[b];
                var e = c.apply(this, arguments);
                this.parent = d;
                return e } }(l, c[l]) : c[l];
        d.prototype = z;
        d.prototype.constructor = d;
        d.extend = b.ig.Class.extend;
        d.inject = q;
        d.classId = z.classId = ++j;
        return d
    };
    b.ImpactMixin && ig.merge(ig, b.ImpactMixin)
})(window);
ig.baked = !0;
ig.module("impact.image").defines(function() {
    ig.Image = ig.Class.extend({
        data: null,
        width: 0,
        height: 0,
        loaded: !1,
        failed: !1,
        loadCallback: null,
        path: "",
        staticInstantiate: function(b) {
            return ig.Image.cache[b] || null },
        init: function(b) { this.path = b;
            this.load() },
        load: function(b) {
            this.loaded ? b && b(this.path, !0) : (!this.loaded && ig.ready ? (this.loadCallback = b || null, this.data = new Image, this.data.onload = this.onload.bind(this), this.data.onerror = this.onerror.bind(this), this.data.src = ig.prefix + this.path + ig.nocache) : ig.addResource(this),
                ig.Image.cache[this.path] = this)
        },
        reload: function() { this.loaded = !1;
            this.data = new Image;
            this.data.onload = this.onload.bind(this);
            this.data.src = this.path + "?" + Date.now() },
        onload: function() { this.width = this.data.width;
            this.height = this.data.height;
            this.loaded = !0;
            1 != ig.system.scale && this.resize(ig.system.scale);
            this.loadCallback && this.loadCallback(this.path, !0) },
        onerror: function() { this.failed = !0;
            this.loadCallback && this.loadCallback(this.path, !1) },
        resize: function(b) {
            var c = this.width * b,
                d = this.height * b,
                e = ig.$new("canvas");
            e.width = this.width;
            e.height = this.height;
            e = e.getContext("2d");
            e.drawImage(this.data, 0, 0, this.width, this.height, 0, 0, this.width, this.height);
            var e = e.getImageData(0, 0, this.width, this.height),
                g = ig.$new("canvas");
            g.width = c;
            g.height = d;
            for (var j = g.getContext("2d"), q = j.getImageData(0, 0, c, d), n = 0; n < d; n++)
                for (var r = 0; r < c; r++) {
                    var v = 4 * (Math.floor(n / b) * this.width + Math.floor(r / b)),
                        z = 4 * (n * c + r);
                    q.data[z] = e.data[v];
                    q.data[z + 1] = e.data[v + 1];
                    q.data[z + 2] = e.data[v + 2];
                    q.data[z + 3] = e.data[v + 3] }
            j.putImageData(q, 0, 0);
            this.data =
                g
        },
        draw: function(b, c, d, e, g, j) {
            if (this.loaded) {
                var q = ig.system.scale;
                g = (g ? g : this.width) * q;
                j = (j ? j : this.height) * q;
                ig.system.context.drawImage(this.data, d ? d * q : 0, e ? e * q : 0, g, j, ig.system.getDrawPos(b), ig.system.getDrawPos(c), g, j);
                ig.Image.drawCount++ } },
        drawTile: function(b, c, d, e, g, j, q) {
            g = g ? g : e;
            if (this.loaded && !(e > this.width || g > this.height)) {
                var n = ig.system.scale,
                    r = Math.floor(e * n),
                    v = Math.floor(g * n),
                    z = j ? -1 : 1,
                    l = q ? -1 : 1;
                if (j || q) ig.system.context.save(), ig.system.context.scale(z, l);
                ig.system.context.drawImage(this.data,
                    Math.floor(d * e) % this.width * n, Math.floor(d * e / this.width) * g * n, r, v, ig.system.getDrawPos(b) * z - (j ? r : 0), ig.system.getDrawPos(c) * l - (q ? v : 0), r, v);
                (j || q) && ig.system.context.restore();
                ig.Image.drawCount++
            }
        }
    });
    ig.Image.drawCount = 0;
    ig.Image.cache = {};
    ig.Image.reloadCache = function() {
        for (var b in ig.Image.cache) ig.Image.cache[b].reload() }
});
ig.baked = !0;
ig.module("impact.font").requires("impact.image").defines(function() {
    ig.Font = ig.Image.extend({
        widthMap: [],
        indices: [],
        firstChar: 32,
        alpha: 1,
        letterSpacing: 1,
        lineSpacing: 0,
        onload: function(b) { this._loadMetrics(this.data);
            this.parent(b) },
        widthForString: function(b) {
            if (-1 !== b.indexOf("\n")) { b = b.split("\n");
                for (var c = 0, d = 0; d < b.length; d++) c = Math.max(c, this._widthForLine(b[d]));
                return c }
            return this._widthForLine(b) },
        _widthForLine: function(b) {
            for (var c = 0, d = 0; d < b.length; d++) c += this.widthMap[b.charCodeAt(d) - this.firstChar] +
                this.letterSpacing;
            return c
        },
        heightForString: function(b) {
            return b.split("\n").length * (this.height + this.lineSpacing) },
        draw: function(b, c, d, e) {
            "string" != typeof b && (b = b.toString());
            if (-1 !== b.indexOf("\n")) { b = b.split("\n");
                for (var g = this.height + this.lineSpacing, j = 0; j < b.length; j++) this.draw(b[j], c, d + j * g, e) } else {
                if (e == ig.Font.ALIGN.RIGHT || e == ig.Font.ALIGN.CENTER) j = this._widthForLine(b), c -= e == ig.Font.ALIGN.CENTER ? j / 2 : j;
                1 !== this.alpha && (ig.system.context.globalAlpha = this.alpha);
                for (j = 0; j < b.length; j++) e = b.charCodeAt(j),
                    c += this._drawChar(e - this.firstChar, c, d);
                1 !== this.alpha && (ig.system.context.globalAlpha = 1);
                ig.Image.drawCount += b.length
            }
        },
        _drawChar: function(b, c, d) {
            if (!this.loaded || 0 > b || b >= this.indices.length) return 0;
            var e = ig.system.scale,
                g = this.widthMap[b] * e,
                j = (this.height - 2) * e;
            ig.system.context.drawImage(this.data, this.indices[b] * e, 0, g, j, ig.system.getDrawPos(c), ig.system.getDrawPos(d), g, j);
            return this.widthMap[b] + this.letterSpacing },
        _loadMetrics: function(b) {
            this.height = b.height - 1;
            this.widthMap = [];
            this.indices = [];
            var c = ig.$new("canvas");
            c.width = b.width;
            c.height = b.height;
            c = c.getContext("2d");
            c.drawImage(b, 0, 0);
            for (var c = c.getImageData(0, b.height - 1, b.width, 1), d = 0, e = 0, g = 0; g < b.width; g++) {
                var j = 4 * g + 3;
                0 != c.data[j] ? e++ : 0 == c.data[j] && e && (this.widthMap.push(e), this.indices.push(g - e), d++, e = 0) }
            this.widthMap.push(e);
            this.indices.push(g - e)
        }
    });
    ig.Font.ALIGN = { LEFT: 0, RIGHT: 1, CENTER: 2 }
});
ig.baked = !0;
ig.module("impact.sound").defines(function() {
    ig.SoundManager = ig.Class.extend({
        clips: {},
        volume: 1,
        format: null,
        init: function() {
            for (var b = new Audio, c = 0; c < ig.Sound.use.length; c++) {
                var d = ig.Sound.use[c];
                if (b.canPlayType(d.mime)) { this.format = d;
                    break } }
            this.format || (ig.Sound.enabled = !1) },
        load: function(b, c, d) {
            var e = ig.prefix + b.replace(/[^\.]+$/, this.format.ext) + ig.nocache;
            if (this.clips[b]) {
                if (c && this.clips[b].length < ig.Sound.channels)
                    for (c = this.clips[b].length; c < ig.Sound.channels; c++) {
                        var g = new Audio(e);
                        g.load();
                        this.clips[b].push(g)
                    }
                return this.clips[b][0]
            }
            var j = new Audio(e);
            d && (j.addEventListener("canplaythrough", function n(c) { j.removeEventListener("canplaythrough", n, !1);
                d(b, !0, c) }, !1), j.addEventListener("error", function(c) { d(b, !0, c) }, !1));
            j.preload = "auto";
            j.load();
            this.clips[b] = [j];
            if (c)
                for (c = 1; c < ig.Sound.channels; c++) g = new Audio(e), g.load(), this.clips[b].push(g);
            return j
        },
        get: function(b) {
            b = this.clips[b];
            for (var c = 0, d; d = b[c++];)
                if (d.paused || d.ended) return d.ended && (d.currentTime = 0), d;
            b[0].pause();
            b[0].currentTime =
                0;
            return b[0]
        }
    });
    ig.Music = ig.Class.extend({
        tracks: [],
        namedTracks: {},
        currentTrack: null,
        currentIndex: 0,
        random: !1,
        _volume: 1,
        _loop: !1,
        _fadeInterval: 0,
        _fadeTimer: null,
        _endedCallbackBound: null,
        init: function() {
            this._endedCallbackBound = this._endedCallback.bind(this);
            Object.defineProperty ? (Object.defineProperty(this, "volume", { get: this.getVolume.bind(this), set: this.setVolume.bind(this) }), Object.defineProperty(this, "loop", { get: this.getLooping.bind(this), set: this.setLooping.bind(this) })) : this.__defineGetter__ &&
                (this.__defineGetter__("volume", this.getVolume.bind(this)), this.__defineSetter__("volume", this.setVolume.bind(this)), this.__defineGetter__("loop", this.getLooping.bind(this)), this.__defineSetter__("loop", this.setLooping.bind(this)))
        },
        add: function(b, c) {
            if (ig.Sound.enabled) {
                var d = ig.soundManager.load(b instanceof ig.Sound ? b.path : b, !1);
                d.loop = this._loop;
                d.volume = this._volume;
                d.addEventListener("ended", this._endedCallbackBound, !1);
                this.tracks.push(d);
                c && (this.namedTracks[c] = d);
                this.currentTrack || (this.currentTrack =
                    d)
            }
        },
        next: function() { this.tracks.length && (this.stop(), this.currentIndex = this.random ? Math.floor(Math.random() * this.tracks.length) : (this.currentIndex + 1) % this.tracks.length, this.currentTrack = this.tracks[this.currentIndex], this.play()) },
        pause: function() { this.currentTrack && this.currentTrack.pause() },
        stop: function() {
            if (this.currentTrack) { this.currentTrack.pause();
                try { this.currentTrack.currentTime = 0 } catch (b) { console.log(b) } } },
        play: function(b) {
            if (b && this.namedTracks[b]) b = this.namedTracks[b], b != this.currentTrack &&
                (this.stop(), this.currentTrack = b);
            else if (!this.currentTrack) return;
            this.currentTrack.play()
        },
        getLooping: function() {
            return this._loop },
        setLooping: function(b) { this._loop = b;
            for (var c in this.tracks) this.tracks[c].loop = b },
        getVolume: function() {
            return this._volume },
        setVolume: function(b) { this._volume = b.limit(0, 1);
            for (var c in this.tracks) this.tracks[c].volume = this._volume },
        fadeOut: function(b) {
            this.currentTrack && (clearInterval(this._fadeInterval), this.fadeTimer = new ig.Timer(b), this._fadeInterval = setInterval(this._fadeStep.bind(this),
                50))
        },
        _fadeStep: function() {
            var b = this.fadeTimer.delta().map(-this.fadeTimer.target, 0, 1, 0).limit(0, 1) * this._volume;
            0.01 >= b ? (this.stop(), this.currentTrack.volume = this._volume, clearInterval(this._fadeInterval)) : this.currentTrack.volume = b },
        _endedCallback: function() { this._loop ? this.play() : this.next() }
    });
    ig.Sound = ig.Class.extend({
        path: "",
        volume: 1,
        currentClip: null,
        multiChannel: !0,
        init: function(b, c) { this.path = b;
            this.multiChannel = !1 !== c;
            this.load() },
        load: function(b) {
            ig.Sound.enabled ? ig.ready ? ig.soundManager.load(this.path,
                this.multiChannel, b) : ig.addResource(this) : b && b(this.path, !0)
        },
        play: function() { ig.Sound.enabled && (this.currentClip = ig.soundManager.get(this.path), this.currentClip.volume = ig.soundManager.volume * this.volume, this.currentClip.play()) },
        stop: function() { this.currentClip && (this.currentClip.pause(), this.currentClip.currentTime = 0) }
    });
    ig.Sound.FORMAT = {
        MP3: { ext: "mp3", mime: "audio/mpeg" },
        M4A: { ext: "m4a", mime: "audio/mp4; codecs=mp4a" },
        OGG: { ext: "ogg", mime: "audio/ogg; codecs=vorbis" },
        WEBM: { ext: "webm", mime: "audio/webm; codecs=vorbis" },
        CAF: { ext: "caf", mime: "audio/x-caf" }
    };
    ig.Sound.use = [ig.Sound.FORMAT.MP3, ig.Sound.FORMAT.OGG];
    ig.Sound.channels = 4;
    ig.Sound.enabled = !0
});
ig.baked = !0;
ig.module("impact.loader").requires("impact.image", "impact.font", "impact.sound").defines(function() {
    ig.Loader = ig.Class.extend({
        resources: [],
        gameClass: null,
        status: 0,
        done: !1,
        _unloaded: [],
        _drawStatus: 0,
        _intervalId: 0,
        _loadCallbackBound: null,
        init: function(b, c) { this.gameClass = b;
            this.resources = c;
            this._loadCallbackBound = this._loadCallback.bind(this);
            for (var d = 0; d < this.resources.length; d++) this._unloaded.push(this.resources[d].path) },
        load: function() {
            ig.system.clear("#000");
            if (this.resources.length) {
                for (var b =
                        0; b < this.resources.length; b++) this.loadResource(this.resources[b]);
                this._intervalId = setInterval(this.draw.bind(this), 16)
            } else this.end()
        },
        loadResource: function(b) { b.load(this._loadCallbackBound) },
        end: function() { this.done || (this.done = !0, clearInterval(this._intervalId)) },
        draw: function() {},
        _loadCallback: function(b, c) {
            if (c) this._unloaded.erase(b);
            else throw "Failed to load resource: " + b;
            this.status = 1 - this._unloaded.length / this.resources.length;
            0 == this._unloaded.length && setTimeout(this.end.bind(this), 250) }
    })
});
ig.baked = !0;
ig.module("impact.timer").defines(function() {
    ig.Timer = ig.Class.extend({
        target: 0,
        base: 0,
        last: 0,
        pausedAt: 0,
        init: function(b) { this.last = this.base = ig.Timer.time;
            this.target = b || 0 },
        set: function(b) { this.target = b || 0;
            this.base = ig.Timer.time;
            this.pausedAt = 0 },
        reset: function() { this.base = ig.Timer.time;
            this.pausedAt = 0 },
        tick: function() {
            var b = ig.Timer.time - this.last;
            this.last = ig.Timer.time;
            return this.pausedAt ? 0 : b },
        delta: function() {
            return (this.pausedAt || ig.Timer.time) - this.base - this.target },
        pause: function() {
            this.pausedAt || (this.pausedAt =
                ig.Timer.time)
        },
        unpause: function() { this.pausedAt && (this.base += ig.Timer.time - this.pausedAt, this.pausedAt = 0) }
    });
    ig.Timer._last = 0;
    ig.Timer.time = Number.MIN_VALUE;
    ig.Timer.timeScale = 1;
    ig.Timer.maxStep = 0.05;
    ig.Timer.step = function() {
        var b = Date.now();
        ig.Timer.time += Math.min((b - ig.Timer._last) / 1E3, ig.Timer.maxStep) * ig.Timer.timeScale;
        ig.Timer._last = b }
});
ig.baked = !0;
ig.module("impact.system").requires("impact.timer", "impact.image").defines(function() {
    ig.System = ig.Class.extend({
        fps: 30,
        width: 320,
        height: 240,
        realWidth: 320,
        realHeight: 240,
        scale: 1,
        tick: 0,
        animationId: 0,
        newGameClass: null,
        running: !1,
        delegate: null,
        clock: null,
        canvas: null,
        context: null,
        init: function(b, c, d, e, g) { this.fps = c;
            this.clock = new ig.Timer;
            this.canvas = ig.$(b);
            this.resize(d, e, g);
            this.context = this.canvas.getContext("2d");
            this.getDrawPos = ig.System.drawMode },
        resize: function(b, c, d) {
            this.width = b;
            this.height =
                c;
            this.scale = d || this.scale;
            this.realWidth = this.width * this.scale;
            this.realHeight = this.height * this.scale;
            this.canvas.width = this.realWidth;
            this.canvas.height = this.realHeight
        },
        setGame: function(b) { this.running ? this.newGameClass = b : this.setGameNow(b) },
        setGameNow: function(b) { ig.game = new b;
            ig.system.setDelegate(ig.game) },
        setDelegate: function(b) {
            if ("function" == typeof b.run) this.delegate = b, this.startRunLoop();
            else throw "System.setDelegate: No run() function in object"; },
        stopRunLoop: function() {
            ig.clearAnimation(this.animationId);
            this.running = !1
        },
        startRunLoop: function() { this.stopRunLoop();
            this.animationId = ig.setAnimation(this.run.bind(this), this.canvas);
            this.running = !0 },
        clear: function(b) { this.context.fillStyle = b;
            this.context.fillRect(0, 0, this.realWidth, this.realHeight) },
        run: function() { ig.Timer.step();
            this.tick = this.clock.tick();
            this.delegate.run();
            ig.input.clearPressed();
            this.newGameClass && (this.setGameNow(this.newGameClass), this.newGameClass = null) },
        getDrawPos: null
    });
    ig.System.DRAW = {
        AUTHENTIC: function(b) {
            return Math.round(b) *
                this.scale
        },
        SMOOTH: function(b) {
            return Math.round(b * this.scale) },
        SUBPIXEL: function(b) {
            return b * this.scale }
    };
    ig.System.drawMode = ig.System.DRAW.SMOOTH
});
ig.baked = !0;
ig.module("impact.input").defines(function() {
    ig.KEY = {
        MOUSE1: -1,
        MOUSE2: -3,
        MWHEEL_UP: -4,
        MWHEEL_DOWN: -5,
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        PAUSE: 19,
        CAPS: 20,
        ESC: 27,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT_ARROW: 37,
        UP_ARROW: 38,
        RIGHT_ARROW: 39,
        DOWN_ARROW: 40,
        INSERT: 45,
        DELETE: 46,
        _0: 48,
        _1: 49,
        _2: 50,
        _3: 51,
        _4: 52,
        _5: 53,
        _6: 54,
        _7: 55,
        _8: 56,
        _9: 57,
        A: 65,
        B: 66,
        C: 67,
        D: 68,
        E: 69,
        F: 70,
        G: 71,
        H: 72,
        I: 73,
        J: 74,
        K: 75,
        L: 76,
        M: 77,
        N: 78,
        O: 79,
        P: 80,
        Q: 81,
        R: 82,
        S: 83,
        T: 84,
        U: 85,
        V: 86,
        W: 87,
        X: 88,
        Y: 89,
        Z: 90,
        NUMPAD_0: 96,
        NUMPAD_1: 97,
        NUMPAD_2: 98,
        NUMPAD_3: 99,
        NUMPAD_4: 100,
        NUMPAD_5: 101,
        NUMPAD_6: 102,
        NUMPAD_7: 103,
        NUMPAD_8: 104,
        NUMPAD_9: 105,
        MULTIPLY: 106,
        ADD: 107,
        SUBSTRACT: 109,
        DECIMAL: 110,
        DIVIDE: 111,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        PLUS: 187,
        COMMA: 188,
        MINUS: 189,
        PERIOD: 190
    };
    ig.Input = ig.Class.extend({
        bindings: {},
        actions: {},
        presses: {},
        locks: {},
        delayedKeyup: {},
        isUsingMouse: !1,
        isUsingKeyboard: !1,
        isUsingAccelerometer: !1,
        mouse: { x: 0, y: 0 },
        accel: { x: 0, y: 0, z: 0 },
        initMouse: function() {
            if (!this.isUsingMouse) {
                this.isUsingMouse = !0;
                var b = this.mousewheel.bind(this);
                ig.system.canvas.addEventListener("mousewheel", b, !1);
                ig.system.canvas.addEventListener("DOMMouseScroll", b, !1);
                ig.system.canvas.addEventListener("contextmenu", this.contextmenu.bind(this), !1);
                ig.system.canvas.addEventListener("mousedown", this.keydown.bind(this), !1);
                ig.system.canvas.addEventListener("mouseup", this.keyup.bind(this), !1);
                ig.system.canvas.addEventListener("mousemove", this.mousemove.bind(this), !1);
                ig.ua.touchDevice && (ig.system.canvas.addEventListener("touchstart",
                    this.keydown.bind(this), !1), ig.system.canvas.addEventListener("touchend", this.keyup.bind(this), !1), ig.system.canvas.addEventListener("touchmove", this.mousemove.bind(this), !1), ig.system.canvas.addEventListener("MSPointerDown", this.keydown.bind(this), !1), ig.system.canvas.addEventListener("MSPointerUp", this.keyup.bind(this), !1), ig.system.canvas.addEventListener("MSPointerMove", this.mousemove.bind(this), !1), ig.system.canvas.style.msTouchAction = "none")
            }
        },
        initKeyboard: function() {
            this.isUsingKeyboard || (this.isUsingKeyboard = !0, window.addEventListener("keydown", this.keydown.bind(this), !1), window.addEventListener("keyup", this.keyup.bind(this), !1))
        },
        initAccelerometer: function() { this.isUsingAccelerometer || window.addEventListener("devicemotion", this.devicemotion.bind(this), !1) },
        mousewheel: function(b) {
            var c = this.bindings[0 < (b.wheelDelta ? b.wheelDelta : -1 * b.detail) ? ig.KEY.MWHEEL_UP : ig.KEY.MWHEEL_DOWN];
            c && (this.actions[c] = !0, this.presses[c] = !0, this.delayedKeyup[c] = !0, b.stopPropagation(), b.preventDefault()) },
        mousemove: function(b) {
            var c =
                parseInt(ig.system.canvas.offsetWidth) || ig.system.realWidth,
                c = ig.system.scale * (c / ig.system.realWidth),
                d = { left: 0, top: 0 };
            ig.system.canvas.getBoundingClientRect && (d = ig.system.canvas.getBoundingClientRect());
            b = b.touches ? b.touches[0] : b;
            this.mouse.x = (b.clientX - d.left) / c;
            this.mouse.y = (b.clientY - d.top) / c
        },
        contextmenu: function(b) { this.bindings[ig.KEY.MOUSE2] && (b.stopPropagation(), b.preventDefault()) },
        keydown: function(b) {
            var c = b.target.tagName;
            if (!("INPUT" == c || "TEXTAREA" == c))
                if (c = "keydown" == b.type ? b.keyCode :
                    2 == b.button ? ig.KEY.MOUSE2 : ig.KEY.MOUSE1, ("touchstart" == b.type || "mousedown" == b.type) && this.mousemove(b), c = this.bindings[c]) this.actions[c] = !0, this.locks[c] || (this.presses[c] = !0, this.locks[c] = !0), b.stopPropagation(), b.preventDefault()
        },
        keyup: function(b) {
            var c = b.target.tagName;
            if (!("INPUT" == c || "TEXTAREA" == c))
                if (c = this.bindings["keyup" == b.type ? b.keyCode : 2 == b.button ? ig.KEY.MOUSE2 : ig.KEY.MOUSE1]) this.delayedKeyup[c] = !0, b.stopPropagation(), b.preventDefault() },
        devicemotion: function(b) { this.accel = b.accelerationIncludingGravity },
        bind: function(b, c) { 0 > b ? this.initMouse() : 0 < b && this.initKeyboard();
            this.bindings[b] = c },
        bindTouch: function(b, c) {
            var d = ig.$(b),
                e = this;
            d.addEventListener("touchstart", function(b) { e.touchStart(b, c) }, !1);
            d.addEventListener("touchend", function(b) { e.touchEnd(b, c) }, !1);
            d.addEventListener("MSPointerDown", function(b) { e.touchStart(b, c) }, !1);
            d.addEventListener("MSPointerUp", function(b) { e.touchEnd(b, c) }, !1) },
        unbind: function(b) { this.delayedKeyup[this.bindings[b]] = !0;
            this.bindings[b] = null },
        unbindAll: function() {
            this.bindings = {};
            this.actions = {};
            this.presses = {};
            this.locks = {};
            this.delayedKeyup = {}
        },
        state: function(b) {
            return this.actions[b] },
        pressed: function(b) {
            return this.presses[b] },
        released: function(b) {
            return !!this.delayedKeyup[b] },
        clearPressed: function() {
            for (var b in this.delayedKeyup) this.actions[b] = !1, this.locks[b] = !1;
            this.delayedKeyup = {};
            this.presses = {} },
        touchStart: function(b, c) { this.actions[c] = !0;
            this.presses[c] = !0;
            b.stopPropagation();
            b.preventDefault();
            return !1 },
        touchEnd: function(b, c) {
            this.delayedKeyup[c] = !0;
            b.stopPropagation();
            b.preventDefault();
            return !1
        }
    })
});
ig.baked = !0;
ig.module("impact.impact").requires("dom.ready", "impact.loader", "impact.system", "impact.input", "impact.sound").defines(function() { ig.main = function(b, c, d, e, g, j, q) { ig.system = new ig.System(b, d, e, g, j || 1);
        ig.input = new ig.Input;
        ig.soundManager = new ig.SoundManager;
        ig.music = new ig.Music;
        ig.ready = !0;
        (new(q || ig.Loader)(c, ig.resources)).load() } });
ig.baked = !0;
ig.module("impact.animation").requires("impact.timer", "impact.image").defines(function() {
    ig.AnimationSheet = ig.Class.extend({ width: 8, height: 8, image: null, init: function(b, c, d) { this.width = c;
            this.height = d;
            this.image = new ig.Image(b) } });
    ig.Animation = ig.Class.extend({
        sheet: null,
        timer: null,
        sequence: [],
        flip: { x: !1, y: !1 },
        pivot: { x: 0, y: 0 },
        frame: 0,
        tile: 0,
        loopCount: 0,
        alpha: 1,
        angle: 0,
        init: function(b, c, d, e) {
            this.sheet = b;
            this.pivot = { x: b.width / 2, y: b.height / 2 };
            this.timer = new ig.Timer;
            this.frameTime = c;
            this.sequence = d;
            this.stop = !!e;
            this.tile = this.sequence[0]
        },
        rewind: function() { this.timer.set();
            this.frame = this.loopCount = 0;
            this.tile = this.sequence[0];
            return this },
        gotoFrame: function(b) { this.timer.set(this.frameTime * -b - 1E-4);
            this.update() },
        gotoRandomFrame: function() { this.gotoFrame(Math.floor(Math.random() * this.sequence.length)) },
        update: function() {
            var b = Math.floor(this.timer.delta() / this.frameTime);
            this.loopCount = Math.floor(b / this.sequence.length);
            this.frame = this.stop && 0 < this.loopCount ? this.sequence.length - 1 : b % this.sequence.length;
            if (this.frame == this.sequence.length - 1 && "function" == typeof this.onEnd) this.onEnd();
            this.tile = this.sequence[this.frame]
        },
        draw: function(b, c) {
            var d = Math.max(this.sheet.width, this.sheet.height);
            b > ig.system.width || (c > ig.system.height || 0 > b + d || 0 > c + d) || (1 != this.alpha && (ig.system.context.globalAlpha = this.alpha), 0 == this.angle ? this.sheet.image.drawTile(b, c, this.tile, this.sheet.width, this.sheet.height, this.flip.x, this.flip.y) : (ig.system.context.save(), ig.system.context.translate(ig.system.getDrawPos(b + this.pivot.x),
                ig.system.getDrawPos(c + this.pivot.y)), ig.system.context.rotate(this.angle), this.sheet.image.drawTile(-this.pivot.x, -this.pivot.y, this.tile, this.sheet.width, this.sheet.height, this.flip.x, this.flip.y), ig.system.context.restore()), 1 != this.alpha && (ig.system.context.globalAlpha = 1))
        }
    })
});
ig.baked = !0;
ig.module("impact.entity").requires("impact.animation", "impact.impact").defines(function() {
    ig.Entity = ig.Class.extend({
        id: 0,
        settings: {},
        size: { x: 16, y: 16 },
        offset: { x: 0, y: 0 },
        pos: { x: 0, y: 0 },
        last: { x: 0, y: 0 },
        vel: { x: 0, y: 0 },
        accel: { x: 0, y: 0 },
        friction: { x: 0, y: 0 },
        maxVel: { x: 100, y: 100 },
        zIndex: 0,
        gravityFactor: 1,
        standing: !1,
        bounciness: 0,
        minBounceVelocity: 40,
        anims: {},
        animSheet: null,
        currentAnim: null,
        health: 10,
        type: 0,
        checkAgainst: 0,
        collides: 0,
        _killed: !1,
        slopeStanding: { min: (44).toRad(), max: (136).toRad() },
        init: function(b,
            c, d) { this.id = ++ig.Entity._lastId;
            this.pos.x = this.last.x = b;
            this.pos.y = this.last.y = c;
            ig.merge(this, d) },
        reset: function(b, c, d) {
            var e = this.constructor.prototype;
            this.pos.x = b;
            this.pos.y = c;
            this.last.x = b;
            this.last.y = c;
            this.vel.x = e.vel.x;
            this.vel.y = e.vel.y;
            this.accel.x = e.accel.x;
            this.accel.y = e.accel.y;
            this.health = e.health;
            this._killed = e._killed;
            this.standing = e.standing;
            this.type = e.type;
            this.checkAgainst = e.checkAgainst;
            this.collides = e.collides;
            ig.merge(this, d) },
        addAnim: function(b, c, d, e) {
            if (!this.animSheet) throw "No animSheet to add the animation " +
                b + " to.";
            c = new ig.Animation(this.animSheet, c, d, e);
            this.anims[b] = c;
            this.currentAnim || (this.currentAnim = c);
            return c
        },
        update: function() {
            this.last.x = this.pos.x;
            this.last.y = this.pos.y;
            this.vel.y += ig.game.gravity * ig.system.tick * this.gravityFactor;
            this.vel.x = this.getNewVelocity(this.vel.x, this.accel.x, this.friction.x, this.maxVel.x);
            this.vel.y = this.getNewVelocity(this.vel.y, this.accel.y, this.friction.y, this.maxVel.y);
            var b = ig.game.collisionMap.trace(this.pos.x, this.pos.y, this.vel.x * ig.system.tick, this.vel.y *
                ig.system.tick, this.size.x, this.size.y);
            this.handleMovementTrace(b);
            this.currentAnim && this.currentAnim.update()
        },
        getNewVelocity: function(b, c, d, e) {
            return c ? (b + c * ig.system.tick).limit(-e, e) : d ? (c = d * ig.system.tick, 0 < b - c ? b - c : 0 > b + c ? b + c : 0) : b.limit(-e, e) },
        handleMovementTrace: function(b) {
            this.standing = !1;
            b.collision.y && (0 < this.bounciness && Math.abs(this.vel.y) > this.minBounceVelocity ? this.vel.y *= -this.bounciness : (0 < this.vel.y && (this.standing = !0), this.vel.y = 0));
            b.collision.x && (this.vel.x = 0 < this.bounciness && Math.abs(this.vel.x) >
                this.minBounceVelocity ? this.vel.x * -this.bounciness : 0);
            if (b.collision.slope) {
                var c = b.collision.slope;
                if (0 < this.bounciness) {
                    var d = this.vel.x * c.nx + this.vel.y * c.ny;
                    this.vel.x = (this.vel.x - 2 * c.nx * d) * this.bounciness;
                    this.vel.y = (this.vel.y - 2 * c.ny * d) * this.bounciness } else d = (this.vel.x * c.x + this.vel.y * c.y) / (c.x * c.x + c.y * c.y), this.vel.x = c.x * d, this.vel.y = c.y * d, c = Math.atan2(c.x, c.y), c > this.slopeStanding.min && c < this.slopeStanding.max && (this.standing = !0) }
            this.pos = b.pos
        },
        draw: function() {
            this.currentAnim && this.currentAnim.draw(this.pos.x -
                this.offset.x - ig.game._rscreen.x, this.pos.y - this.offset.y - ig.game._rscreen.y)
        },
        kill: function() { ig.game.removeEntity(this) },
        receiveDamage: function(b) { this.health -= b;
            0 >= this.health && this.kill() },
        touches: function(b) {
            return !(this.pos.x >= b.pos.x + b.size.x || this.pos.x + this.size.x <= b.pos.x || this.pos.y >= b.pos.y + b.size.y || this.pos.y + this.size.y <= b.pos.y) },
        distanceTo: function(b) {
            var c = this.pos.x + this.size.x / 2 - (b.pos.x + b.size.x / 2);
            b = this.pos.y + this.size.y / 2 - (b.pos.y + b.size.y / 2);
            return Math.sqrt(c * c + b * b) },
        angleTo: function(b) {
            return Math.atan2(b.pos.y +
                b.size.y / 2 - (this.pos.y + this.size.y / 2), b.pos.x + b.size.x / 2 - (this.pos.x + this.size.x / 2))
        },
        check: function() {},
        collideWith: function() {},
        ready: function() {},
        erase: function() {}
    });
    ig.Entity._lastId = 0;
    ig.Entity.COLLIDES = { NEVER: 0, LITE: 1, PASSIVE: 2, ACTIVE: 4, FIXED: 8 };
    ig.Entity.TYPE = { NONE: 0, A: 1, B: 2, BOTH: 3 };
    ig.Entity.checkPair = function(b, c) { b.checkAgainst & c.type && b.check(c);
        c.checkAgainst & b.type && c.check(b);
        b.collides && (c.collides && b.collides + c.collides > ig.Entity.COLLIDES.ACTIVE) && ig.Entity.solveCollision(b, c) };
    ig.Entity.solveCollision =
        function(b, c) {
            var d = null;
            if (b.collides == ig.Entity.COLLIDES.LITE || c.collides == ig.Entity.COLLIDES.FIXED) d = b;
            else if (c.collides == ig.Entity.COLLIDES.LITE || b.collides == ig.Entity.COLLIDES.FIXED) d = c;
            b.last.x + b.size.x > c.last.x && b.last.x < c.last.x + c.size.x ? (b.last.y < c.last.y ? ig.Entity.seperateOnYAxis(b, c, d) : ig.Entity.seperateOnYAxis(c, b, d), b.collideWith(c, "y"), c.collideWith(b, "y")) : b.last.y + b.size.y > c.last.y && b.last.y < c.last.y + c.size.y && (b.last.x < c.last.x ? ig.Entity.seperateOnXAxis(b, c, d) : ig.Entity.seperateOnXAxis(c,
                b, d), b.collideWith(c, "x"), c.collideWith(b, "x"))
        };
    ig.Entity.seperateOnXAxis = function(b, c, d) {
        var e = b.pos.x + b.size.x - c.pos.x;
        d ? (d.vel.x = -d.vel.x * d.bounciness + (b === d ? c : b).vel.x, c = ig.game.collisionMap.trace(d.pos.x, d.pos.y, d == b ? -e : e, 0, d.size.x, d.size.y), d.pos.x = c.pos.x) : (d = (b.vel.x - c.vel.x) / 2, b.vel.x = -d, c.vel.x = d, d = ig.game.collisionMap.trace(b.pos.x, b.pos.y, -e / 2, 0, b.size.x, b.size.y), b.pos.x = Math.floor(d.pos.x), b = ig.game.collisionMap.trace(c.pos.x, c.pos.y, e / 2, 0, c.size.x, c.size.y), c.pos.x = Math.ceil(b.pos.x)) };
    ig.Entity.seperateOnYAxis = function(b, c, d) {
        var e = b.pos.y + b.size.y - c.pos.y;
        if (d) { c = b === d ? c : b;
            d.vel.y = -d.vel.y * d.bounciness + c.vel.y;
            var g = 0;
            d == b && Math.abs(d.vel.y - c.vel.y) < d.minBounceVelocity && (d.standing = !0, g = c.vel.x * ig.system.tick);
            b = ig.game.collisionMap.trace(d.pos.x, d.pos.y, g, d == b ? -e : e, d.size.x, d.size.y);
            d.pos.y = b.pos.y;
            d.pos.x = b.pos.x } else ig.game.gravity && (c.standing || 0 < b.vel.y) ? (d = ig.game.collisionMap.trace(b.pos.x, b.pos.y, 0, -(b.pos.y + b.size.y - c.pos.y), b.size.x, b.size.y), b.pos.y = d.pos.y, 0 < b.bounciness &&
            b.vel.y > b.minBounceVelocity ? b.vel.y *= -b.bounciness : (b.standing = !0, b.vel.y = 0)) : (d = (b.vel.y - c.vel.y) / 2, b.vel.y = -d, c.vel.y = d, g = c.vel.x * ig.system.tick, d = ig.game.collisionMap.trace(b.pos.x, b.pos.y, g, -e / 2, b.size.x, b.size.y), b.pos.y = d.pos.y, b = ig.game.collisionMap.trace(c.pos.x, c.pos.y, 0, e / 2, c.size.x, c.size.y), c.pos.y = b.pos.y)
    }
});
ig.baked = !0;
ig.module("impact.map").defines(function() {
    ig.Map = ig.Class.extend({
        tilesize: 8,
        width: 1,
        height: 1,
        data: [
            []
        ],
        name: null,
        init: function(b, c) { this.tilesize = b;
            this.data = c;
            this.height = c.length;
            this.width = c[0].length },
        getTile: function(b, c) {
            var d = Math.floor(b / this.tilesize),
                e = Math.floor(c / this.tilesize);
            return 0 <= d && d < this.width && 0 <= e && e < this.height ? this.data[e][d] : 0 },
        setTile: function(b, c, d) {
            b = Math.floor(b / this.tilesize);
            c = Math.floor(c / this.tilesize);
            0 <= b && b < this.width && (0 <= c && c < this.height) && (this.data[c][b] =
                d)
        }
    })
});
ig.baked = !0;
ig.module("impact.collision-map").requires("impact.map").defines(function() {
    ig.CollisionMap = ig.Map.extend({
        lastSlope: 1,
        tiledef: null,
        init: function(b, c, g) { this.parent(b, c);
            this.tiledef = g || ig.CollisionMap.defaultTileDef;
            for (var j in this.tiledef) j | 0 > this.lastSlope && (this.lastSlope = j | 0) },
        trace: function(b, c, g, j, q, n) {
            var r = { collision: { x: !1, y: !1, slope: !1 }, pos: { x: b, y: c }, tile: { x: 0, y: 0 } },
                v = Math.ceil(Math.max(Math.abs(g), Math.abs(j)) / this.tilesize);
            if (1 < v)
                for (var z = g / v, l = j / v, m = 0; m < v && (z || l) && !(this._traceStep(r,
                        b, c, z, l, q, n, g, j, m), b = r.pos.x, c = r.pos.y, r.collision.x && (g = z = 0), r.collision.y && (j = l = 0), r.collision.slope); m++);
            else this._traceStep(r, b, c, g, j, q, n, g, j, 0);
            return r
        },
        _traceStep: function(b, c, g, j, q, n, r, v, z, l) {
            b.pos.x += j;
            b.pos.y += q;
            var m = 0;
            if (j) {
                var x = 0 < j ? n : 0,
                    I = 0 > j ? this.tilesize : 0,
                    m = Math.max(Math.floor(g / this.tilesize), 0),
                    M = Math.min(Math.ceil((g + r) / this.tilesize), this.height);
                j = Math.floor((b.pos.x + x) / this.tilesize);
                var E = Math.floor((c + x) / this.tilesize);
                if (0 < l || j == E || 0 > E || E >= this.width) E = -1;
                if (0 <= j && j < this.width)
                    for (var L =
                            m; L < M && !(-1 != E && (m = this.data[L][E], 1 < m && m <= this.lastSlope && this._checkTileDef(b, m, c, g, v, z, n, r, E, L))); L++)
                        if (m = this.data[L][j], 1 == m || m > this.lastSlope || 1 < m && this._checkTileDef(b, m, c, g, v, z, n, r, j, L)) {
                            if (1 < m && m <= this.lastSlope && b.collision.slope) break;
                            b.collision.x = !0;
                            b.tile.x = m;
                            c = b.pos.x = j * this.tilesize - x + I;
                            v = 0;
                            break }
            }
            if (q) {
                x = 0 < q ? r : 0;
                q = 0 > q ? this.tilesize : 0;
                m = Math.max(Math.floor(b.pos.x / this.tilesize), 0);
                I = Math.min(Math.ceil((b.pos.x + n) / this.tilesize), this.width);
                L = Math.floor((b.pos.y + x) / this.tilesize);
                M = Math.floor((g + x) / this.tilesize);
                if (0 < l || L == M || 0 > M || M >= this.height) M = -1;
                if (0 <= L && L < this.height)
                    for (j = m; j < I && !(-1 != M && (m = this.data[M][j], 1 < m && m <= this.lastSlope && this._checkTileDef(b, m, c, g, v, z, n, r, j, M))); j++)
                        if (m = this.data[L][j], 1 == m || m > this.lastSlope || 1 < m && this._checkTileDef(b, m, c, g, v, z, n, r, j, L)) {
                            if (1 < m && m <= this.lastSlope && b.collision.slope) break;
                            b.collision.y = !0;
                            b.tile.y = m;
                            b.pos.y = L * this.tilesize - x + q;
                            break }
            }
        },
        _checkTileDef: function(b, c, g, j, q, n, r, v, z, l) {
            var m = this.tiledef[c];
            if (!m) return !1;
            c = (m[2] -
                m[0]) * this.tilesize;
            var x = (m[3] - m[1]) * this.tilesize,
                I = m[4];
            r = g + q + (0 > x ? r : 0) - (z + m[0]) * this.tilesize;
            v = j + n + (0 < c ? v : 0) - (l + m[1]) * this.tilesize;
            if (0 < c * v - x * r) {
                if (0 > q * -x + n * c) return I;
                z = Math.sqrt(c * c + x * x);
                l = x / z;
                z = -c / z;
                var M = r * l + v * z,
                    m = l * M,
                    M = z * M;
                if (m * m + M * M >= q * q + n * n) return I || 0.5 > c * (v - n) - x * (r - q);
                b.pos.x = g + q - m;
                b.pos.y = j + n - M;
                b.collision.slope = { x: c, y: x, nx: l, ny: z };
                return !0 }
            return !1
        }
    });
    var b = 1 / 3,
        c = 2 / 3;
    ig.CollisionMap.defaultTileDef = {
        5: [0, 1, 1, c, !0],
        6: [0, c, 1, b, !0],
        7: [0, b, 1, 0, !0],
        3: [0, 1, 1, 0.5, !0],
        4: [0, 0.5, 1, 0, !0],
        2: [0,
            1, 1, 0, !0
        ],
        10: [0.5, 1, 1, 0, !0],
        21: [0, 1, 0.5, 0, !0],
        32: [c, 1, 1, 0, !0],
        43: [b, 1, c, 0, !0],
        54: [0, 1, b, 0, !0],
        27: [0, 0, 1, b, !0],
        28: [0, b, 1, c, !0],
        29: [0, c, 1, 1, !0],
        25: [0, 0, 1, 0.5, !0],
        26: [0, 0.5, 1, 1, !0],
        24: [0, 0, 1, 1, !0],
        11: [0, 0, 0.5, 1, !0],
        22: [0.5, 0, 1, 1, !0],
        33: [0, 0, b, 1, !0],
        44: [b, 0, c, 1, !0],
        55: [c, 0, 1, 1, !0],
        16: [1, b, 0, 0, !0],
        17: [1, c, 0, b, !0],
        18: [1, 1, 0, c, !0],
        14: [1, 0.5, 0, 0, !0],
        15: [1, 1, 0, 0.5, !0],
        13: [1, 1, 0, 0, !0],
        8: [0.5, 1, 0, 0, !0],
        19: [1, 1, 0.5, 0, !0],
        30: [b, 1, 0, 0, !0],
        41: [c, 1, b, 0, !0],
        52: [1, 1, c, 0, !0],
        38: [1, c, 0, 1, !0],
        39: [1, b, 0, c, !0],
        40: [1, 0,
            0, b, !0
        ],
        36: [1, 0.5, 0, 1, !0],
        37: [1, 0, 0, 0.5, !0],
        35: [1, 0, 0, 1, !0],
        9: [1, 0, 0.5, 1, !0],
        20: [0.5, 0, 0, 1, !0],
        31: [1, 0, c, 1, !0],
        42: [c, 0, b, 1, !0],
        53: [b, 0, 0, 1, !0],
        12: [0, 0, 1, 0, !1],
        23: [1, 1, 0, 1, !1],
        34: [1, 0, 1, 1, !1],
        45: [0, 1, 0, 0, !1]
    };
    ig.CollisionMap.staticNoCollision = { trace: function(b, c, g, j) {
            return { collision: { x: !1, y: !1, slope: !1 }, pos: { x: b + g, y: c + j }, tile: { x: 0, y: 0 } } } }
});
ig.baked = !0;
ig.module("impact.background-map").requires("impact.map", "impact.image").defines(function() {
    ig.BackgroundMap = ig.Map.extend({
        tiles: null,
        scroll: { x: 0, y: 0 },
        distance: 1,
        repeat: !1,
        tilesetName: "",
        foreground: !1,
        enabled: !0,
        preRender: !1,
        preRenderedChunks: null,
        chunkSize: 512,
        debugChunks: !1,
        anims: {},
        init: function(b, c, d) { this.parent(b, c);
            this.setTileset(d) },
        setTileset: function(b) { this.tilesetName = b instanceof ig.Image ? b.path : b;
            this.tiles = new ig.Image(this.tilesetName);
            this.preRenderedChunks = null },
        setScreenPos: function(b,
            c) { this.scroll.x = b / this.distance;
            this.scroll.y = c / this.distance },
        preRenderMapToChunks: function() {
            var b = this.width * this.tilesize * ig.system.scale,
                c = this.height * this.tilesize * ig.system.scale,
                d = Math.ceil(b / this.chunkSize),
                e = Math.ceil(c / this.chunkSize);
            this.preRenderedChunks = [];
            for (var g = 0; g < e; g++) { this.preRenderedChunks[g] = [];
                for (var j = 0; j < d; j++) this.preRenderedChunks[g][j] = this.preRenderChunk(j, g, j == d - 1 ? b - j * this.chunkSize : this.chunkSize, g == e - 1 ? c - g * this.chunkSize : this.chunkSize) } },
        preRenderChunk: function(b,
            c, d, e) {
            var g = d / this.tilesize / ig.system.scale + 1,
                j = e / this.tilesize / ig.system.scale + 1,
                q = b * this.chunkSize / ig.system.scale % this.tilesize,
                n = c * this.chunkSize / ig.system.scale % this.tilesize;
            b = Math.floor(b * this.chunkSize / this.tilesize / ig.system.scale);
            c = Math.floor(c * this.chunkSize / this.tilesize / ig.system.scale);
            var r = ig.$new("canvas");
            r.width = d;
            r.height = e;
            d = ig.system.context;
            ig.system.context = r.getContext("2d");
            for (e = 0; e < g; e++)
                for (var v = 0; v < j; v++)
                    if (e + b < this.width && v + c < this.height) {
                        var z = this.data[v + c][e + b];
                        z && this.tiles.drawTile(e * this.tilesize - q, v * this.tilesize - n, z - 1, this.tilesize)
                    }
            ig.system.context = d;
            return r
        },
        draw: function() { this.tiles.loaded && this.enabled && (this.preRender ? this.drawPreRendered() : this.drawTiled()) },
        drawPreRendered: function() {
            this.preRenderedChunks || this.preRenderMapToChunks();
            var b = ig.system.getDrawPos(this.scroll.x),
                c = ig.system.getDrawPos(this.scroll.y);
            this.repeat && (b %= this.width * this.tilesize * ig.system.scale, c %= this.height * this.tilesize * ig.system.scale);
            var d = Math.max(Math.floor(b /
                    this.chunkSize), 0),
                e = Math.max(Math.floor(c / this.chunkSize), 0),
                g = Math.ceil((b + ig.system.realWidth) / this.chunkSize),
                j = Math.ceil((c + ig.system.realHeight) / this.chunkSize),
                q = this.preRenderedChunks[0].length,
                n = this.preRenderedChunks.length;
            this.repeat || (g = Math.min(g, q), j = Math.min(j, n));
            for (var r = 0; e < j; e++) {
                for (var v = 0, z = d; z < g; z++) {
                    var l = this.preRenderedChunks[e % n][z % q],
                        m = -b + z * this.chunkSize - v,
                        x = -c + e * this.chunkSize - r;
                    ig.system.context.drawImage(l, m, x);
                    ig.Image.drawCount++;
                    this.debugChunks && (ig.system.context.strokeStyle =
                        "#f0f", ig.system.context.strokeRect(m, x, this.chunkSize, this.chunkSize));
                    this.repeat && (l.width < this.chunkSize && m + l.width < ig.system.realWidth) && (v = this.chunkSize - l.width, g++)
                }
                this.repeat && (l.height < this.chunkSize && x + l.height < ig.system.realHeight) && (r = this.chunkSize - l.height, j++)
            }
        },
        drawTiled: function() {
            for (var b = 0, c = null, d = (this.scroll.x / this.tilesize).toInt(), e = (this.scroll.y / this.tilesize).toInt(), g = this.scroll.x % this.tilesize, j = this.scroll.y % this.tilesize, q = -g - this.tilesize, g = ig.system.width + this.tilesize -
                    g, n = ig.system.height + this.tilesize - j, r = -1, j = -j - this.tilesize; j < n; r++, j += this.tilesize) {
                var v = r + e;
                if (v >= this.height || 0 > v) {
                    if (!this.repeat) continue;
                    v = 0 < v ? v % this.height : (v + 1) % this.height + this.height - 1 }
                for (var z = -1, l = q; l < g; z++, l += this.tilesize) { b = z + d;
                    if (b >= this.width || 0 > b) {
                        if (!this.repeat) continue;
                        b = 0 < b ? b % this.width : (b + 1) % this.width + this.width - 1 }
                    if (b = this.data[v][b])(c = this.anims[b - 1]) ? c.draw(l, j) : this.tiles.drawTile(l, j, b - 1, this.tilesize) } }
        }
    })
});
ig.baked = !0;
ig.module("impact.game").requires("impact.impact", "impact.entity", "impact.collision-map", "impact.background-map").defines(function() {
    ig.Game = ig.Class.extend({
        clearColor: "#000000",
        gravity: 0,
        screen: { x: 0, y: 0 },
        _rscreen: { x: 0, y: 0 },
        entities: [],
        namedEntities: {},
        collisionMap: ig.CollisionMap.staticNoCollision,
        backgroundMaps: [],
        backgroundAnims: {},
        autoSort: !0,
        sortBy: null,
        cellSize: 64,
        _deferredKill: [],
        _levelToLoad: null,
        _doSortEntities: !1,
        staticInstantiate: function() {
            this.sortBy = this.sortBy || ig.Game.SORT.Z_INDEX;
            ig.game = this;
            return null
        },
        loadLevel: function(b) {
            this.screen = { x: 0, y: 0 };
            this.entities = [];
            this.namedEntities = {};
            for (var c = 0; c < b.entities.length; c++) {
                var d = b.entities[c];
                this.spawnEntity(d.type, d.x, d.y, d.settings) }
            this.sortEntities();
            this.collisionMap = ig.CollisionMap.staticNoCollision;
            this.backgroundMaps = [];
            for (c = 0; c < b.layer.length; c++)
                if (d = b.layer[c], "collision" == d.name) this.collisionMap = new ig.CollisionMap(d.tilesize, d.data);
                else {
                    var e = new ig.BackgroundMap(d.tilesize, d.data, d.tilesetName);
                    e.anims = this.backgroundAnims[d.tilesetName] || {};
                    e.repeat = d.repeat;
                    e.distance = d.distance;
                    e.foreground = !!d.foreground;
                    e.preRender = !!d.preRender;
                    e.name = d.name;
                    this.backgroundMaps.push(e)
                }
            for (c = 0; c < this.entities.length; c++) this.entities[c].ready()
        },
        loadLevelDeferred: function(b) { this._levelToLoad = b },
        getMapByName: function(b) {
            if ("collision" == b) return this.collisionMap;
            for (var c = 0; c < this.backgroundMaps.length; c++)
                if (this.backgroundMaps[c].name == b) return this.backgroundMaps[c];
            return null },
        getEntityByName: function(b) {
            return this.namedEntities[b] },
        getEntitiesByType: function(b) {
            b =
                "string" === typeof b ? ig.global[b] : b;
            for (var c = [], d = 0; d < this.entities.length; d++) {
                var e = this.entities[d];
                e instanceof b && !e._killed && c.push(e) }
            return c
        },
        spawnEntity: function(b, c, d, e) {
            var g = "string" === typeof b ? ig.global[b] : b;
            if (!g) throw "Can't spawn entity of type " + b;
            b = new g(c, d, e || {});
            this.entities.push(b);
            b.name && (this.namedEntities[b.name] = b);
            return b },
        sortEntities: function() { this.entities.sort(this.sortBy) },
        sortEntitiesDeferred: function() { this._doSortEntities = !0 },
        removeEntity: function(b) {
            b.name &&
                delete this.namedEntities[b.name];
            b._killed = !0;
            b.type = ig.Entity.TYPE.NONE;
            b.checkAgainst = ig.Entity.TYPE.NONE;
            b.collides = ig.Entity.COLLIDES.NEVER;
            this._deferredKill.push(b)
        },
        run: function() { this.update();
            this.draw() },
        update: function() {
            this._levelToLoad && (this.loadLevel(this._levelToLoad), this._levelToLoad = null);
            this.updateEntities();
            this.checkEntities();
            for (var b = 0; b < this._deferredKill.length; b++) this._deferredKill[b].erase(), this.entities.erase(this._deferredKill[b]);
            this._deferredKill = [];
            if (this._doSortEntities ||
                this.autoSort) this.sortEntities(), this._doSortEntities = !1;
            for (var c in this.backgroundAnims) {
                var b = this.backgroundAnims[c],
                    d;
                for (d in b) b[d].update() }
        },
        updateEntities: function() {
            for (var b = 0; b < this.entities.length; b++) {
                var c = this.entities[b];
                c._killed || c.update() } },
        draw: function() {
            this.clearColor && ig.system.clear(this.clearColor);
            this._rscreen.x = ig.system.getDrawPos(this.screen.x) / ig.system.scale;
            this._rscreen.y = ig.system.getDrawPos(this.screen.y) / ig.system.scale;
            var b;
            for (b = 0; b < this.backgroundMaps.length; b++) {
                var c =
                    this.backgroundMaps[b];
                if (c.foreground) break;
                c.setScreenPos(this.screen.x, this.screen.y);
                c.draw()
            }
            this.drawEntities();
            for (b; b < this.backgroundMaps.length; b++) c = this.backgroundMaps[b], c.setScreenPos(this.screen.x, this.screen.y), c.draw()
        },
        drawEntities: function() {
            for (var b = 0; b < this.entities.length; b++) this.entities[b].draw() },
        checkEntities: function() {
            for (var b = {}, c = 0; c < this.entities.length; c++) {
                var d = this.entities[c];
                if (!(d.type == ig.Entity.TYPE.NONE && d.checkAgainst == ig.Entity.TYPE.NONE && d.collides == ig.Entity.COLLIDES.NEVER))
                    for (var e = {}, g = Math.floor(d.pos.y / this.cellSize), j = Math.floor((d.pos.x + d.size.x) / this.cellSize) + 1, q = Math.floor((d.pos.y + d.size.y) / this.cellSize) + 1, n = Math.floor(d.pos.x / this.cellSize); n < j; n++)
                        for (var r = g; r < q; r++)
                            if (b[n])
                                if (b[n][r]) {
                                    for (var v = b[n][r], z = 0; z < v.length; z++) d.touches(v[z]) && !e[v[z].id] && (e[v[z].id] = !0, ig.Entity.checkPair(d, v[z]));
                                    v.push(d) } else b[n][r] = [d];
                else b[n] = {}, b[n][r] = [d]
            }
        }
    });
    ig.Game.SORT = {
        Z_INDEX: function(b, c) {
            return b.zIndex - c.zIndex },
        POS_X: function(b, c) {
            return b.pos.x + b.size.x - (c.pos.x +
                c.size.x)
        },
        POS_Y: function(b, c) {
            return b.pos.y + b.size.y - (c.pos.y + c.size.y) }
    }
});
ig.baked = !0;
ig.module("impact.debug.menu").requires("dom.ready", "impact.system").defines(function() {
    ig.System.inject({ run: function() { ig.debug.beforeRun();
            this.parent();
            ig.debug.afterRun() }, setGameNow: function(b) { this.parent(b);
            ig.debug.ready() } });
    ig.Debug = ig.Class.extend({
        options: {},
        panels: {},
        numbers: {},
        container: null,
        panelMenu: null,
        activePanel: null,
        debugTime: 0,
        debugTickAvg: 0.016,
        debugRealTime: Date.now(),
        init: function() {
            this.container = ig.$new("div");
            this.container.className = "ig_debug";
            ig.$("body")[0].appendChild(this.container);
            this.panelMenu = ig.$new("div");
            this.panelMenu.innerHTML = '<div class="ig_debug_head">Impact.Debug:</div>';
            this.panelMenu.className = "ig_debug_panel_menu";
            this.container.appendChild(this.panelMenu);
            this.numberContainer = ig.$new("div");
            this.numberContainer.className = "ig_debug_stats";
            this.panelMenu.appendChild(this.numberContainer);
            window.console && (window.console.log && window.console.assert) && (ig.log = console.log.bind ? console.log.bind(console) : console.log, ig.assert = console.assert.bind ? console.assert.bind(console) :
                console.assert);
            ig.show = this.showNumber.bind(this)
        },
        addNumber: function(b) {
            var c = ig.$new("span");
            this.numberContainer.appendChild(c);
            this.numberContainer.appendChild(document.createTextNode(b));
            this.numbers[b] = c },
        showNumber: function(b, c, d) { this.numbers[b] || this.addNumber(b, d);
            this.numbers[b].textContent = c },
        addPanel: function(b) {
            var c = new b.type(b.name, b.label);
            if (b.options)
                for (var d = 0; d < b.options.length; d++) {
                    var e = b.options[d];
                    c.addOption(new ig.DebugOption(e.name, e.object, e.property)) }
            this.panels[c.name] =
                c;
            c.container.style.display = "none";
            this.container.appendChild(c.container);
            b = ig.$new("div");
            b.className = "ig_debug_menu_item";
            b.textContent = c.label;
            b.addEventListener("click", function() { this.togglePanel(c) }.bind(this), !1);
            c.menuItem = b;
            e = !1;
            for (d = 1; d < this.panelMenu.childNodes.length; d++) {
                var g = this.panelMenu.childNodes[d];
                if (g.textContent > c.label) { this.panelMenu.insertBefore(b, g);
                    e = !0;
                    break } }
            e || this.panelMenu.appendChild(b)
        },
        showPanel: function(b) { this.togglePanel(this.panels[b]) },
        togglePanel: function(b) {
            b !=
                this.activePanel && this.activePanel && (this.activePanel.toggle(!1), this.activePanel.menuItem.className = "ig_debug_menu_item", this.activePanel = null);
            var c = "block" != b.container.style.display;
            b.toggle(c);
            b.menuItem.className = "ig_debug_menu_item" + (c ? " active" : "");
            c && (this.activePanel = b)
        },
        ready: function() {
            for (var b in this.panels) this.panels[b].ready() },
        beforeRun: function() {
            var b = Date.now();
            this.debugTickAvg = 0.8 * this.debugTickAvg + 0.2 * (b - this.debugRealTime);
            this.debugRealTime = b;
            this.activePanel && this.activePanel.beforeRun() },
        afterRun: function() {
            var b = Date.now() - this.debugRealTime;
            this.debugTime = 0.8 * this.debugTime + 0.2 * b;
            this.activePanel && this.activePanel.afterRun();
            this.showNumber("ms", this.debugTime.toFixed(2));
            this.showNumber("fps", Math.round(1E3 / this.debugTickAvg));
            this.showNumber("draws", ig.Image.drawCount);
            ig.game && ig.game.entities && this.showNumber("entities", ig.game.entities.length);
            ig.Image.drawCount = 0 }
    });
    ig.DebugPanel = ig.Class.extend({
        active: !1,
        container: null,
        options: [],
        panels: [],
        label: "",
        name: "",
        init: function(b,
            c) { this.name = b;
            this.label = c;
            this.container = ig.$new("div");
            this.container.className = "ig_debug_panel " + this.name },
        toggle: function(b) { this.active = b;
            this.container.style.display = b ? "block" : "none" },
        addPanel: function(b) { this.panels.push(b);
            this.container.appendChild(b.container) },
        addOption: function(b) { this.options.push(b);
            this.container.appendChild(b.container) },
        ready: function() {},
        beforeRun: function() {},
        afterRun: function() {}
    });
    ig.DebugOption = ig.Class.extend({
        name: "",
        labelName: "",
        className: "ig_debug_option",
        label: null,
        mark: null,
        container: null,
        active: !1,
        colors: { enabled: "#fff", disabled: "#444" },
        init: function(b, c, d) {
            this.name = b;
            this.object = c;
            this.property = d;
            this.active = this.object[this.property];
            this.container = ig.$new("div");
            this.container.className = "ig_debug_option";
            this.label = ig.$new("span");
            this.label.className = "ig_debug_label";
            this.label.textContent = this.name;
            this.mark = ig.$new("span");
            this.mark.className = "ig_debug_label_mark";
            this.container.appendChild(this.mark);
            this.container.appendChild(this.label);
            this.container.addEventListener("click", this.click.bind(this), !1);
            this.setLabel()
        },
        setLabel: function() { this.mark.style.backgroundColor = this.active ? this.colors.enabled : this.colors.disabled },
        click: function(b) { this.active = !this.active;
            this.object[this.property] = this.active;
            this.setLabel();
            b.stopPropagation();
            b.preventDefault();
            return !1 }
    });
    ig.debug = new ig.Debug
});
ig.baked = !0;
ig.module("impact.debug.entities-panel").requires("impact.debug.menu", "impact.entity").defines(function() {
    ig.Entity.inject({
        colors: { names: "#fff", velocities: "#0f0", boxes: "#f00" },
        draw: function() {
            this.parent();
            ig.Entity._debugShowBoxes && (ig.system.context.strokeStyle = this.colors.boxes, ig.system.context.lineWidth = 1, ig.system.context.strokeRect(ig.system.getDrawPos(this.pos.x.round() - ig.game.screen.x) - 0.5, ig.system.getDrawPos(this.pos.y.round() - ig.game.screen.y) - 0.5, this.size.x * ig.system.scale, this.size.y *
                ig.system.scale));
            if (ig.Entity._debugShowVelocities) {
                var b = this.pos.x + this.size.x / 2,
                    c = this.pos.y + this.size.y / 2;
                this._debugDrawLine(this.colors.velocities, b, c, b + this.vel.x, c + this.vel.y) }
            if (ig.Entity._debugShowNames && (this.name && (ig.system.context.fillStyle = this.colors.names, ig.system.context.fillText(this.name, ig.system.getDrawPos(this.pos.x - ig.game.screen.x), ig.system.getDrawPos(this.pos.y - ig.game.screen.y))), "object" == typeof this.target))
                for (var d in this.target)(b = ig.game.getEntityByName(this.target[d])) &&
                    this._debugDrawLine(this.colors.names, this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2, b.pos.x + b.size.x / 2, b.pos.y + b.size.y / 2)
        },
        _debugDrawLine: function(b, c, d, e, g) { ig.system.context.strokeStyle = b;
            ig.system.context.lineWidth = 1;
            ig.system.context.beginPath();
            ig.system.context.moveTo(ig.system.getDrawPos(c - ig.game.screen.x), ig.system.getDrawPos(d - ig.game.screen.y));
            ig.system.context.lineTo(ig.system.getDrawPos(e - ig.game.screen.x), ig.system.getDrawPos(g - ig.game.screen.y));
            ig.system.context.stroke();
            ig.system.context.closePath() }
    });
    ig.Entity._debugEnableChecks = !0;
    ig.Entity._debugShowBoxes = !1;
    ig.Entity._debugShowVelocities = !1;
    ig.Entity._debugShowNames = !1;
    ig.Entity.oldCheckPair = ig.Entity.checkPair;
    ig.Entity.checkPair = function(b, c) { ig.Entity._debugEnableChecks && ig.Entity.oldCheckPair(b, c) };
    ig.debug.addPanel({
        type: ig.DebugPanel,
        name: "entities",
        label: "Entities",
        options: [{ name: "Checks & Collisions", object: ig.Entity, property: "_debugEnableChecks" }, { name: "Show Collision Boxes", object: ig.Entity, property: "_debugShowBoxes" }, {
            name: "Show Velocities",
            object: ig.Entity,
            property: "_debugShowVelocities"
        }, { name: "Show Names & Targets", object: ig.Entity, property: "_debugShowNames" }]
    })
});
ig.baked = !0;
ig.module("impact.debug.maps-panel").requires("impact.debug.menu", "impact.game", "impact.background-map").defines(function() {
    ig.Game.inject({ loadLevel: function(b) { this.parent(b);
            ig.debug.panels.maps.load(this) } });
    ig.DebugMapsPanel = ig.DebugPanel.extend({
        maps: [],
        mapScreens: [],
        init: function(b, c) { this.parent(b, c);
            this.load() },
        load: function(b) {
            this.options = [];
            this.panels = [];
            if (!b || !b.backgroundMaps.length) this.container.innerHTML = "<em>No Maps Loaded</em>";
            else {
                this.maps = b.backgroundMaps;
                this.mapScreens = [];
                this.container.innerHTML = "";
                for (b = 0; b < this.maps.length; b++) {
                    var c = this.maps[b],
                        d = new ig.DebugPanel(b, "Layer " + b),
                        e = new ig.$new("strong");
                    e.textContent = b + ": " + c.tiles.path;
                    d.container.appendChild(e);
                    d.addOption(new ig.DebugOption("Enabled", c, "enabled"));
                    d.addOption(new ig.DebugOption("Pre Rendered", c, "preRender"));
                    d.addOption(new ig.DebugOption("Show Chunks", c, "debugChunks"));
                    this.generateMiniMap(d, c, b);
                    this.addPanel(d) }
            }
        },
        generateMiniMap: function(b, c, d) {
            var e = ig.system.scale,
                g = ig.$new("canvas"),
                j = g.getContext("2d"),
                q = c.tiles.width * e,
                n = c.tiles.height * e,
                r = q / c.tilesize;
            j.drawImage(c.tiles.data, 0, 0, q, n, 0, 0, r, n / c.tilesize);
            j = ig.$new("canvas");
            j.width = c.width * e;
            j.height = c.height * e;
            var v = j.getContext("2d");
            ig.game.clearColor && (v.fillStyle = ig.game.clearColor, v.fillRect(0, 0, q, n));
            for (n = q = 0; n < c.width; n++)
                for (var z = 0; z < c.height; z++)(q = c.data[z][n]) && v.drawImage(g, Math.floor((q - 1) * e % r), Math.floor((q - 1) * e / r) * e, e, e, n * e, z * e, e, e);
            g = ig.$new("div");
            g.className = "ig_debug_map_container";
            g.style.width = c.width *
                e + "px";
            g.style.height = c.height * e + "px";
            r = ig.$new("div");
            r.className = "ig_debug_map_screen";
            r.style.width = ig.system.width / c.tilesize * e - 2 + "px";
            r.style.height = ig.system.height / c.tilesize * e - 2 + "px";
            this.mapScreens[d] = r;
            g.appendChild(j);
            g.appendChild(r);
            b.container.appendChild(g)
        },
        afterRun: function() {
            for (var b = ig.system.scale, c = 0; c < this.maps.length; c++) {
                var d = this.maps[c],
                    e = this.mapScreens[c];
                if (d && e) {
                    var g = d.scroll.x / d.tilesize,
                        j = d.scroll.y / d.tilesize;
                    d.repeat && (g %= d.width, j %= d.height);
                    e.style.left = g * b +
                        "px";
                    e.style.top = j * b + "px"
                }
            }
        }
    });
    ig.debug.addPanel({ type: ig.DebugMapsPanel, name: "maps", label: "Background Maps" })
});
ig.baked = !0;
ig.module("impact.debug.graph-panel").requires("impact.debug.menu", "impact.system", "impact.game", "impact.image").defines(function() {
    ig.Game.inject({ draw: function() { ig.graph.beginClock("draw");
            this.parent();
            ig.graph.endClock("draw") }, update: function() { ig.graph.beginClock("update");
            this.parent();
            ig.graph.endClock("update") }, checkEntities: function() { ig.graph.beginClock("checks");
            this.parent();
            ig.graph.endClock("checks") } });
    ig.DebugGraphPanel = ig.DebugPanel.extend({
        clocks: {},
        marks: [],
        textY: 0,
        height: 128,
        ms: 64,
        timeBeforeRun: 0,
        init: function(b, c) {
            this.parent(b, c);
            this.mark16ms = (this.height - 16 * (this.height / this.ms)).round();
            this.mark33ms = (this.height - 33 * (this.height / this.ms)).round();
            this.msHeight = this.height / this.ms;
            this.graph = ig.$new("canvas");
            this.graph.width = window.innerWidth;
            this.graph.height = this.height;
            this.container.appendChild(this.graph);
            this.ctx = this.graph.getContext("2d");
            this.ctx.fillStyle = "#444";
            this.ctx.fillRect(0, this.mark16ms, this.graph.width, 1);
            this.ctx.fillRect(0, this.mark33ms, this.graph.width,
                1);
            this.addGraphMark("16ms", this.mark16ms);
            this.addGraphMark("33ms", this.mark33ms);
            this.addClock("draw", "Draw", "#13baff");
            this.addClock("update", "Entity Update", "#bb0fff");
            this.addClock("checks", "Entity Checks & Collisions", "#a2e908");
            this.addClock("lag", "System Lag", "#f26900");
            ig.mark = this.mark.bind(this);
            ig.graph = this
        },
        addGraphMark: function(b, c) {
            var d = ig.$new("span");
            d.className = "ig_debug_graph_mark";
            d.textContent = b;
            d.style.top = c.round() + "px";
            this.container.appendChild(d) },
        addClock: function(b, c,
            d) {
            var e = ig.$new("span");
            e.className = "ig_debug_legend_color";
            e.style.backgroundColor = d;
            var g = ig.$new("span");
            g.className = "ig_debug_legend_number";
            g.appendChild(document.createTextNode("0"));
            var j = ig.$new("span");
            j.className = "ig_debug_legend";
            j.appendChild(e);
            j.appendChild(document.createTextNode(c + " ("));
            j.appendChild(g);
            j.appendChild(document.createTextNode("ms)"));
            this.container.appendChild(j);
            this.clocks[b] = { description: c, color: d, current: 0, start: Date.now(), avg: 0, html: g } },
        beginClock: function(b,
            c) { this.clocks[b].start = Date.now() + (c || 0) },
        endClock: function(b) { b = this.clocks[b];
            b.current = Math.round(Date.now() - b.start);
            b.avg = 0.8 * b.avg + 0.2 * b.current },
        mark: function(b, c) { this.active && this.marks.push({ msg: b, color: c || "#fff" }) },
        beforeRun: function() { this.endClock("lag");
            this.timeBeforeRun = Date.now() },
        afterRun: function() {
            var b = Date.now() - this.timeBeforeRun;
            this.beginClock("lag", Math.max(1E3 / ig.system.fps - b, 0));
            var b = this.graph.width - 1,
                c = this.height;
            this.ctx.drawImage(this.graph, -1, 0);
            this.ctx.fillStyle =
                "#000";
            this.ctx.fillRect(b, 0, 1, this.height);
            this.ctx.fillStyle = "#444";
            this.ctx.fillRect(b, this.mark16ms, 1, 1);
            this.ctx.fillStyle = "#444";
            this.ctx.fillRect(b, this.mark33ms, 1, 1);
            for (var d in this.clocks) {
                var e = this.clocks[d];
                e.html.textContent = e.avg.toFixed(2);
                if (e.color && 0 < e.current) { this.ctx.fillStyle = e.color;
                    var g = e.current * this.msHeight,
                        c = c - g;
                    this.ctx.fillRect(b, c, 1, g);
                    e.current = 0 } }
            this.ctx.textAlign = "right";
            this.ctx.textBaseline = "top";
            this.ctx.globalAlpha = 0.5;
            for (d = 0; d < this.marks.length; d++) c = this.marks[d],
                this.ctx.fillStyle = c.color, this.ctx.fillRect(b, 0, 1, this.height), c.msg && (this.ctx.fillText(c.msg, b - 1, this.textY), this.textY = (this.textY + 8) % 32);
            this.ctx.globalAlpha = 1;
            this.marks = []
        }
    });
    ig.debug.addPanel({ type: ig.DebugGraphPanel, name: "graph", label: "Performance" })
});
ig.baked = !0;
ig.module("impact.debug.debug").requires("impact.debug.entities-panel", "impact.debug.maps-panel", "impact.debug.graph-panel").defines(function() {});
ig.baked = !0;
ig.module("plugins.splash-loader").requires("impact.loader", "impact.animation").defines(function() {
    ig.SplashLoader = ig.Loader.extend({
        loadingImage: new ig.Image("media/graphics/splash/loading.png"),
        loadingBarImage: new ig.Image("media/graphics/splash/loading-bar.png"),
        loadingTextImage: new ig.Image("media/graphics/splash/loading-text.png"),
        splashPortrait: new ig.Image("media/graphics/splash/portrait.jpg"),
        init: function(b, c) { this.parent(b, c);
            ig.ua.mobile && _SETTINGS.Ad.Mobile.Preroll.Enabled && MobileAdInGamePreroll.Initialize() },
        end: function() { this.parent();
            var b = 0 <= document.URL.indexOf("localhost") ? 500 : 3E3;
            window.setTimeout("ig.system.setGame(MyGame)", b) },
        setupCustomAnimation: function() { this.customAnim = new ig.Animation(this.customAnim, 0.05, [0, 1, 2, 3, 4, 5]);
            this.customAnim.currentFrame = 0;
            ig.loadingScreen = this;
            ig.loadingScreen.animationTimer = window.setInterval("ig.loadingScreen.animate()", 100) },
        animate: function() {
            this.customAnim.currentFrame < this.customAnim.sequence.length ? this.customAnim.currentFrame++ : this.customAnim.currentFrame =
                0;
            this.customAnim.gotoFrame(this.customAnim.currentFrame)
        },
        draw: function() {
            if (this.splashPortrait.loaded && (this._drawStatus += (this.status - this._drawStatus) / 5, ig.system.context.fillStyle = "#000", ig.system.context.fillRect(0, 0, ig.system.width, ig.system.height), this.splashPortrait.draw(0, 0), this.loadingImage.loaded && this.loadingBarImage.loaded && this.loadingTextImage.loaded)) {
                var b;
                b = 0.5 * ig.system.width - 191.5;
                this.loadingImage.draw(b, 581);
                this.loadingBarImage.draw(b, 581, 0, 0, 383 * this._drawStatus, 56);
                this.loadingTextImage.draw(b,
                    581)
            }
        }
    })
});
ig.baked = !0;
ig.module("plugins.tween").requires("impact.entity").defines(function() {
    Array.prototype.indexOf || (Array.prototype.indexOf = function(b) {
        for (var c = 0; c < this.length; ++c)
            if (this[c] === b) return c;
        return -1 });
    ig.Entity.prototype.tweens = [];
    ig.Entity.prototype._preTweenUpdate = ig.Entity.prototype.update;
    ig.Entity.prototype.update = function() {
        this._preTweenUpdate();
        if (0 < this.tweens.length) {
            for (var b = [], c = 0; c < this.tweens.length; c++) this.tweens[c].update(), this.tweens[c].complete || b.push(this.tweens[c]);
            this.tweens =
                b
        }
    };
    ig.Entity.prototype.tween = function(b, c, d) { b = new ig.Tween(this, b, c, d);
        this.tweens.push(b);
        return b };
    ig.Entity.prototype.pauseTweens = function() {
        for (var b = 0; b < this.tweens.length; b++) this.tweens[b].pause() };
    ig.Entity.prototype.resumeTweens = function() {
        for (var b = 0; b < this.tweens.length; b++) this.tweens[b].resume() };
    ig.Entity.prototype.stopTweens = function(b) {
        for (var c = 0; c < this.tweens.length; c++) this.tweens[c].stop(b) };
    ig.Tween = function(b, c, d, e) {
        var g = {},
            j = {},
            q = {},
            n = 0,
            r = !1,
            v = !1,
            z = !1;
        this.duration = d;
        this.paused =
            this.complete = !1;
        this.easing = ig.Tween.Easing.Linear.EaseNone;
        this.onComplete = !1;
        this.loop = this.delay = 0;
        this.loopCount = -1;
        ig.merge(this, e);
        this.loopNum = this.loopCount;
        this.chain = function(b) { z = b };
        this.initEnd = function(b, c, d) {
            if ("object" !== typeof c[b]) d[b] = c[b];
            else
                for (subprop in c[b]) d[b] || (d[b] = {}), this.initEnd(subprop, c[b], d[b]) };
        this.initStart = function(b, c, d, e) {
            if ("object" !== typeof d[b]) "undefined" !== typeof c[b] && (e[b] = d[b]);
            else
                for (subprop in d[b]) e[b] || (e[b] = {}), "undefined" !== typeof c[b] && this.initStart(subprop,
                    c[b], d[b], e[b])
        };
        this.start = function() { this.paused = this.complete = !1;
            this.loopNum = this.loopCount;
            n = 0; - 1 == b.tweens.indexOf(this) && b.tweens.push(this);
            v = !0;
            r = new ig.Timer;
            for (var d in c) this.initEnd(d, c, j);
            for (d in j) this.initStart(d, j, b, g), this.initDelta(d, q, b, j) };
        this.initDelta = function(b, c, d, e) {
            if ("object" !== typeof e[b]) c[b] = e[b] - d[b];
            else
                for (subprop in e[b]) c[b] || (c[b] = {}), this.initDelta(subprop, c[b], d[b], e[b]) };
        this.propUpdate = function(b, c, d, e, g) {
            if ("object" !== typeof d[b]) c[b] = "undefined" != typeof d[b] ?
                d[b] + e[b] * g : c[b];
            else
                for (subprop in d[b]) this.propUpdate(subprop, c[b], d[b], e[b], g)
        };
        this.propSet = function(b, c, d) {
            if ("object" !== typeof c[b]) d[b] = c[b];
            else
                for (subprop in c[b]) d[b] || (d[b] = {}), this.propSet(subprop, c[b], d[b]) };
        this.update = function() {
            if (!v) return !1;
            if (this.delay) {
                if (r.delta() < this.delay) return;
                this.delay = 0;
                r.reset() }
            if (this.paused || this.complete) return !1;
            var c = (r.delta() + n) / this.duration,
                c = 1 < c ? 1 : c,
                d = this.easing(c);
            for (property in q) this.propUpdate(property, b, g, q, d);
            if (1 <= c) {
                if (0 == this.loopNum ||
                    !this.loop) { this.complete = !0;
                    if (this.onComplete) this.onComplete();
                    z && z.start();
                    return !1 }
                if (this.loop == ig.Tween.Loop.Revert) {
                    for (property in g) this.propSet(property, g, b);
                    n = 0;
                    r.reset(); - 1 != this.loopNum && this.loopNum-- } else if (this.loop == ig.Tween.Loop.Reverse) { c = {};
                    d = {};
                    ig.merge(c, j);
                    ig.merge(d, g);
                    ig.merge(g, c);
                    ig.merge(j, d);
                    for (property in j) this.initDelta(property, q, b, j);
                    n = 0;
                    r.reset(); - 1 != this.loopNum && this.loopNum-- }
            }
        };
        this.pause = function() { this.paused = !0;
            n += r.delta() };
        this.resume = function() {
            this.paused = !1;
            r.reset()
        };
        this.stop = function(b) { b && (this.loop = this.complete = this.paused = !1, n += d, this.update());
            this.complete = !0 }
    };
    ig.Tween.Loop = { Revert: 1, Reverse: 2 };
    ig.Tween.Easing = { Linear: {}, Quadratic: {}, Cubic: {}, Quartic: {}, Quintic: {}, Sinusoidal: {}, Exponential: {}, Circular: {}, Elastic: {}, Back: {}, Bounce: {} };
    ig.Tween.Easing.Linear.EaseNone = function(b) {
        return b };
    ig.Tween.Easing.Quadratic.EaseIn = function(b) {
        return b * b };
    ig.Tween.Easing.Quadratic.EaseOut = function(b) {
        return -b * (b - 2) };
    ig.Tween.Easing.Quadratic.EaseInOut =
        function(b) {
            return 1 > (b *= 2) ? 0.5 * b * b : -0.5 * (--b * (b - 2) - 1) };
    ig.Tween.Easing.Cubic.EaseIn = function(b) {
        return b * b * b };
    ig.Tween.Easing.Cubic.EaseOut = function(b) {
        return --b * b * b + 1 };
    ig.Tween.Easing.Cubic.EaseInOut = function(b) {
        return 1 > (b *= 2) ? 0.5 * b * b * b : 0.5 * ((b -= 2) * b * b + 2) };
    ig.Tween.Easing.Quartic.EaseIn = function(b) {
        return b * b * b * b };
    ig.Tween.Easing.Quartic.EaseOut = function(b) {
        return -(--b * b * b * b - 1) };
    ig.Tween.Easing.Quartic.EaseInOut = function(b) {
        return 1 > (b *= 2) ? 0.5 * b * b * b * b : -0.5 * ((b -= 2) * b * b * b - 2) };
    ig.Tween.Easing.Quintic.EaseIn =
        function(b) {
            return b * b * b * b * b };
    ig.Tween.Easing.Quintic.EaseOut = function(b) {
        return (b -= 1) * b * b * b * b + 1 };
    ig.Tween.Easing.Quintic.EaseInOut = function(b) {
        return 1 > (b *= 2) ? 0.5 * b * b * b * b * b : 0.5 * ((b -= 2) * b * b * b * b + 2) };
    ig.Tween.Easing.Sinusoidal.EaseIn = function(b) {
        return -Math.cos(b * Math.PI / 2) + 1 };
    ig.Tween.Easing.Sinusoidal.EaseOut = function(b) {
        return Math.sin(b * Math.PI / 2) };
    ig.Tween.Easing.Sinusoidal.EaseInOut = function(b) {
        return -0.5 * (Math.cos(Math.PI * b) - 1) };
    ig.Tween.Easing.Exponential.EaseIn = function(b) {
        return 0 == b ? 0 : Math.pow(2,
            10 * (b - 1))
    };
    ig.Tween.Easing.Exponential.EaseOut = function(b) {
        return 1 == b ? 1 : -Math.pow(2, -10 * b) + 1 };
    ig.Tween.Easing.Exponential.EaseInOut = function(b) {
        return 0 == b ? 0 : 1 == b ? 1 : 1 > (b *= 2) ? 0.5 * Math.pow(2, 10 * (b - 1)) : 0.5 * (-Math.pow(2, -10 * (b - 1)) + 2) };
    ig.Tween.Easing.Circular.EaseIn = function(b) {
        return -(Math.sqrt(1 - b * b) - 1) };
    ig.Tween.Easing.Circular.EaseOut = function(b) {
        return Math.sqrt(1 - --b * b) };
    ig.Tween.Easing.Circular.EaseInOut = function(b) {
        return 1 > (b /= 0.5) ? -0.5 * (Math.sqrt(1 - b * b) - 1) : 0.5 * (Math.sqrt(1 - (b -= 2) * b) + 1) };
    ig.Tween.Easing.Elastic.EaseIn =
        function(b) {
            var c, d = 0.1,
                e = 0.4;
            if (0 == b) return 0;
            if (1 == b) return 1;
            e || (e = 0.3);!d || 1 > d ? (d = 1, c = e / 4) : c = e / (2 * Math.PI) * Math.asin(1 / d);
            return -(d * Math.pow(2, 10 * (b -= 1)) * Math.sin((b - c) * 2 * Math.PI / e)) };
    ig.Tween.Easing.Elastic.EaseOut = function(b) {
        var c, d = 0.1,
            e = 0.4;
        if (0 == b) return 0;
        if (1 == b) return 1;
        e || (e = 0.3);!d || 1 > d ? (d = 1, c = e / 4) : c = e / (2 * Math.PI) * Math.asin(1 / d);
        return d * Math.pow(2, -10 * b) * Math.sin((b - c) * 2 * Math.PI / e) + 1 };
    ig.Tween.Easing.Elastic.EaseInOut = function(b) {
        var c, d = 0.1,
            e = 0.4;
        if (0 == b) return 0;
        if (1 == b) return 1;
        e || (e = 0.3);
        !d || 1 > d ? (d = 1, c = e / 4) : c = e / (2 * Math.PI) * Math.asin(1 / d);
        return 1 > (b *= 2) ? -0.5 * d * Math.pow(2, 10 * (b -= 1)) * Math.sin((b - c) * 2 * Math.PI / e) : 0.5 * d * Math.pow(2, -10 * (b -= 1)) * Math.sin((b - c) * 2 * Math.PI / e) + 1
    };
    ig.Tween.Easing.Back.EaseIn = function(b) {
        return b * b * (2.70158 * b - 1.70158) };
    ig.Tween.Easing.Back.EaseOut = function(b) {
        return (b -= 1) * b * (2.70158 * b + 1.70158) + 1 };
    ig.Tween.Easing.Back.EaseInOut = function(b) {
        return 1 > (b *= 2) ? 0.5 * b * b * (3.5949095 * b - 2.5949095) : 0.5 * ((b -= 2) * b * (3.5949095 * b + 2.5949095) + 2) };
    ig.Tween.Easing.Bounce.EaseIn =
        function(b) {
            return 1 - ig.Tween.Easing.Bounce.EaseOut(1 - b) };
    ig.Tween.Easing.Bounce.EaseOut = function(b) {
        return (b /= 1) < 1 / 2.75 ? 7.5625 * b * b : b < 2 / 2.75 ? 7.5625 * (b -= 1.5 / 2.75) * b + 0.75 : b < 2.5 / 2.75 ? 7.5625 * (b -= 2.25 / 2.75) * b + 0.9375 : 7.5625 * (b -= 2.625 / 2.75) * b + 0.984375 };
    ig.Tween.Easing.Bounce.EaseInOut = function(b) {
        return 0.5 > b ? 0.5 * ig.Tween.Easing.Bounce.EaseIn(2 * b) : 0.5 * ig.Tween.Easing.Bounce.EaseOut(2 * b - 1) + 0.5 }
});
ig.baked = !0;
ig.module("plugins.url-parameters").defines(function() { ig.UrlParameters = ig.Class.extend({ init: function() {
            switch (getQueryVariable("iphone")) {
                case "true":
                    ig.ua.iPhone = !0, console.log("iPhone mode") }
            var b = getQueryVariable("webview");
            if (b) switch (b) {
                case "true":
                    ig.ua.is_uiwebview = !0, console.log("webview mode") }
            if (b = getQueryVariable("debug")) switch (b) {
                case "true":
                    ig.game.debug = !0, ig.game.showDebugMenu(), console.log("debug mode") }
            switch (getQueryVariable("view")) {
                case "stats":
                    ig.game.resetPlayerStats(), ig.game.endGame() }
            getQueryVariable("ad") } }) });
ig.baked = !0;
ig.module("plugins.howlerJuke").requires("impact.impact").defines(function() {
    ig.HowlerJuke = ig.Class.extend({
        a: new ig.Sound("media/audio/bgm.*"),
        a: new ig.Sound("media/audio/opening/kittyopening.*"),
        a: new ig.Sound("media/audio/play/static.*"),
        a: new ig.Sound("media/audio/bosscannon.*"),
        a: new ig.Sound("media/audio/cannon.*"),
        a: new ig.Sound("media/audio/click.*"),
        a: new ig.Sound("media/audio/coins.*"),
        a: new ig.Sound("media/audio/death.*"),
        a: new ig.Sound("media/audio/hit.*"),
        a: new ig.Sound("media/audio/laser_beam.*"),
        a: new ig.Sound("media/audio/machinegun.*"),
        a: new ig.Sound("media/audio/projectileshoot.*"),
        a: new ig.Sound("media/audio/reload.*"),
        a: new ig.Sound("media/audio/repair.*"),
        a: new ig.Sound("media/audio/screenshake.*"),
        a: new ig.Sound("media/audio/shot.*"),
        a: new ig.Sound("media/audio/shotgun.*"),
        a: new ig.Sound("media/audio/softexplosion.*"),
        a: new ig.Sound("media/audio/tankshoot.*"),
        init: function() {
            this.a = null;
            this.list = {
                bgm: new Howl({ urls: ["media/audio/bgm.mp3", "media/audio/bgm.ogg"], loop: !0 }),
                kittyopeningSound: new Howl({
                    urls: ["media/audio/opening/kittyopening.ogg",
                        "media/audio/opening/kittyopening.mp3"
                    ]
                }),
                bosscannon: new Howl({ urls: ["media/audio/bosscannon.ogg", "media/audio/bosscannon.mp3"] }),
                cannon: new Howl({ urls: ["media/audio/cannon.ogg", "media/audio/cannon.mp3"] }),
                click: new Howl({ urls: ["media/audio/click.ogg", "media/audio/click.mp3"] }),
                coins: new Howl({ urls: ["media/audio/coins.ogg", "media/audio/coins.mp3"] }),
                death: new Howl({ urls: ["media/audio/death.ogg", "media/audio/death.mp3"] }),
                hit: new Howl({ urls: ["media/audio/hit.ogg", "media/audio/hit.mp3"] }),
                laser_beam: new Howl({
                    urls: ["media/audio/laser_beam.ogg",
                        "media/audio/laser_beam.mp3"
                    ]
                }),
                machinegun: new Howl({ urls: ["media/audio/machinegun.ogg", "media/audio/machinegun.mp3"] }),
                projectileshoot: new Howl({ urls: ["media/audio/projectileshoot.ogg", "media/audio/projectileshoot.mp3"] }),
                reload: new Howl({ urls: ["media/audio/reload.ogg", "media/audio/reload.mp3"] }),
                repair: new Howl({ urls: ["media/audio/repair.ogg", "media/audio/repair.mp3"] }),
                screenshake: new Howl({ urls: ["media/audio/screenshake.ogg", "media/audio/screenshake.mp3"] }),
                shot: new Howl({
                    urls: ["media/audio/shot.ogg",
                        "media/audio/shot.mp3"
                    ]
                }),
                shotgun: new Howl({ urls: ["media/audio/shotgun.ogg", "media/audio/shotgun.mp3"] }),
                softexplosion: new Howl({ urls: ["media/audio/softexplosion.ogg", "media/audio/softexplosion.mp3"] }),
                tankshoot: new Howl({ urls: ["media/audio/tankshoot.ogg", "media/audio/tankshoot.mp3"] })
            }
        },
        play: function(b, c, d) {
            try {
                if (this.list[b]) this.list[b].play();
                else throw "musicToPlay is not defined.";
                if ("boolean" == typeof c) {
                    if (c)
                        if (this.list[d]) this.list[d].stop();
                        else throw "musicToStop is not defined."; } else if (null !=
                    c) throw "stopLast must be boolean value";
            } catch (e) {
                return console.log(e), !1 }
            return !0
        },
        stop: function(b) { this.list[b] && this.list[b].stop() },
        pause: function() { this.list[musicToStop] && this.list[musicToStop].pause() },
        mute: function() { Howler.mute() },
        unmute: function() { Howler.unmute() }
    })
});
ig.baked = !0;
ig.module("plugins.jukebox").defines(function() { ig.Jukebox = ig.Class.extend({ init: function() { this.player = new jukebox.Player({ resources: ["media/audio/bgm.mp3", "media/sounds/bgm.ogg"], autoplay: "music", spritemap: { music: { start: 0, end: 18.108, loop: !0 } } }) } }) });
ig.baked = !0;
ig.module("plugins.director").requires("impact.impact").defines(function() {
    ig.Director = ig.Class.extend({
        init: function(b, c) { this.game = b;
            this.levels = [];
            this.currentLevel = 0;
            this.append(c) },
        loadLevel: function(b) {
            for (key in dynamicClickableEntityDivs) ig.game.hideOverlay([key]);
            this.currentLevel = b;
            this.game.loadLevel(this.levels[b]);
            return !0 },
        loadLevelWithoutEntities: function(b) { this.currentLevel = b;
            this.game.loadLevelWithoutEntities(this.levels[b]);
            return !0 },
        append: function(b) {
            newLevels = [];
            return "object" ===
                typeof b ? (b.constructor === [].constructor ? newLevels = b : newLevels[0] = b, this.levels = this.levels.concat(newLevels), !0) : !1
        },
        nextLevel: function() {
            return this.currentLevel + 1 < this.levels.length ? this.loadLevel(this.currentLevel + 1) : !1 },
        previousLevel: function() {
            return 0 <= this.currentLevel - 1 ? this.loadLevel(this.currentLevel - 1) : !1 },
        jumpTo: function(b) {
            var c = null;
            for (i = 0; i < this.levels.length; i++) this.levels[i] == b && (c = i);
            return 0 <= c ? this.loadLevel(c) : !1 },
        firstLevel: function() {
            return this.loadLevel(0) },
        lastLevel: function() {
            return this.loadLevel(this.levels.length -
                1)
        },
        reloadLevel: function() {
            return this.loadLevel(this.currentLevel) }
    })
});
ig.baked = !0;
ig.module("plugins.impact-storage").requires("impact.game").defines(function() {
    ig.Storage = ig.Class.extend({
        staticInstantiate: function() {
            return !ig.Storage.instance ? null : ig.Storage.instance },
        init: function() { ig.Storage.instance = this },
        isCapable: function() {
            return "undefined" !== typeof window.localStorage },
        isSet: function(b) {
            return null !== this.get(b) },
        initUnset: function(b, c) { null === this.get(b) && this.set(b, c) },
        get: function(b) {
            if (!this.isCapable()) return null;
            try {
                return JSON.parse(localStorage.getItem(b)) } catch (c) {
                return window.localStorage.getItem(b) } },
        getInt: function(b) {
            return ~~this.get(b) },
        getFloat: function(b) {
            return parseFloat(this.get(b)) },
        getBool: function(b) {
            return !!this.get(b) },
        key: function(b) {
            return this.isCapable() ? window.localStorage.key(b) : null },
        set: function(b, c) {
            if (!this.isCapable()) return null;
            try { window.localStorage.setItem(b, JSON.stringify(c)) } catch (d) { d == QUOTA_EXCEEDED_ERR && console.log("localStorage quota exceeded") } },
        setHighest: function(b, c) { c > this.getFloat(b) && this.set(b, c) },
        remove: function(b) {
            if (!this.isCapable()) return null;
            window.localStorage.removeItem(b) },
        clear: function() {
            if (!this.isCapable()) return null;
            window.localStorage.clear() }
    })
});
this.START_BRANDING_SPLASH;
ig.baked = !0;
ig.module("plugins.branding.splash").requires("impact.impact", "impact.entity").defines(function() {
    ig.BrandingSplash = ig.Class.extend({ init: function() { ig.game.spawnEntity(EntityBranding, 0, 0) } });
    EntityBranding = ig.Entity.extend({
        gravityFactor: 0,
        size: { x: 32, y: 32 },
        splash_320x480: new ig.AnimationSheet("branding/logo.png", 300, 226),
        splash_480x640: new ig.AnimationSheet("branding/logo.png", 300, 226),
        init: function(b, c, d) {
            this.parent(b, c, d);
            320 >= ig.system.width ? (this.size.x = 300, this.size.y = 316, this.anims.idle = new ig.Animation(this.splash_320x480,
                0, [0], !0)) : (this.size.x = 300, this.size.y = 316, this.anims.idle = new ig.Animation(this.splash_480x640, 0, [0], !0));
            this.pos.x = (ig.system.width - this.size.x) / 2;
            this.pos.y = -this.size.y - 80;
            this.endPosY = (ig.system.height - this.size.y) / 2 + 20;
            b = this.tween({ pos: { y: this.endPosY } }, 0, { easing: ig.Tween.Easing.Bounce.EaseIn });
            c = this.tween({}, 0, { onComplete: function() { ig.game.director.loadLevel(ig.game.director.currentLevel) } });
            b.chain(c);
            b.start();
            this.currentAnim = this.anims.idle;
            this.createClickableLayer()
        },
        createClickableLayer: function() {
            // console.log("Build clickable layer");
            // this.checkClickableLayer("splash", _SETTINGS.Branding.Logo.Link, !0)
        },
        doesClickableLayerExist: function(b) {
            for (k in dynamicClickableEntityDivs)
                if (k == b) return !0;
            return !1 },
        checkClickableLayer: function(b, c, d) { "undefined" == typeof wm && (this.doesClickableLayerExist(b) ? (ig.game.showOverlay([b]), $("#" + b).find("[href]").attr("href", c)) : this.createClickableOutboundLayer(b, c, "media/graphics/misc/invisible.png", d)) },
        createClickableOutboundLayer: function(b, c, d, e) {
            var g = ig.$new("div");
            g.id = b;
            document.body.appendChild(g);
            $("#" + g.id).css("float", "left");
            $("#" + g.id).css("position", "absolute");
            if (ig.ua.mobile) {
                var j = window.innerHeight / mobileHeight,
                    q = window.innerWidth / mobileWidth;
                $("#" + g.id).css("left", 0 * q);
                $("#" + g.id).css("top", 0 * j);
                $("#" + g.id).css("width", (ig.system.width - 5) * q);
                $("#" + g.id).css("height", (ig.system.height - 5) * j) } else j = w / 2 - destW / 2, q = h / 2 - destH / 2, console.log(j, q), $("#" + g.id).css("left", j + 0 * multiplier), $("#" + g.id).css("top", q + 0 * multiplier), $("#" + g.id).css("width", (ig.system.width - 5) * multiplier), $("#" + g.id).css("height",
                (ig.system.height - 5) * multiplier);
            e ? $("#" + g.id).html("<a target='_blank' href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>") : $("#" + g.id).html("<a href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>");
            dynamicClickableEntityDivs[b] = {};
            dynamicClickableEntityDivs[b].width = (ig.system.width - 5) * multiplier;
            dynamicClickableEntityDivs[b].height = (ig.system.height - 5) * multiplier;
            dynamicClickableEntityDivs[b].entity_pos_x = 0;
            dynamicClickableEntityDivs[b].entity_pos_y = 0
        },
        draw: function() {
            ig.system.context.fillStyle =
                "#000f1f";
            ig.system.context.fillRect(0, 0, ig.system.width, ig.system.height);
            this.parent()
        }
    })
});
this.END_BRANDING_SPLASH;
ig.baked = !0;
ig.module("game.entities.branding-logo-placeholder").requires("impact.entity").defines(function() {
    EntityBrandingLogoPlaceholder = ig.Entity.extend({
        gravityFactor: 0,
        size: { x: 32, y: 32 },
        _wmDrawBox: !0,
        _wmBoxColor: "rgba(0, 0, 255, 0.7)",
        init: function(b, c, d) {
            this.parent(b, c, d);
            if (d) switch (console.log("settings found ... using that div layer name"), b = d.div_layer_name, console.log("settings.centralize:", d.centralize), d.centralize) {
                case "true":
                    console.log("centralize true");
                    centralize = !0;
                    break;
                case "false":
                    console.log("centralize false");
                    centralize = !1;
                    break;
                default:
                    console.log("default ... centralize false"), centralize = !1
            } else b = "branding-logo", centralize = !1;
            if ("undefined" == typeof wm) {
                if (_SETTINGS.Branding.Logo.Enabled) try { ig.game.spawnEntity(EntityBrandingLogo, this.pos.x, this.pos.y, { div_layer_name: b, centralize: centralize }) } catch (e) { console.log(e) }
                this.kill() }
        }
    })
});
this.START_BRANDING_LOGO;
ig.baked = !0;
ig.module("game.entities.branding-logo").requires("impact.entity").defines(function() {
    EntityBrandingLogo = ig.Entity.extend({
        gravityFactor: 0,
        logo: new ig.AnimationSheet("branding/logo2.png", _SETTINGS.Branding.Logo.Width, _SETTINGS.Branding.Logo.Height),
        size: { x: _SETTINGS.Branding.Logo.Width, y: _SETTINGS.Branding.Logo.Height },
        zIndex: 1099,
        init: function(b, c, d) {
            b = ig.system.width - 90;
            this.parent(b, 5, d);
            "undefined" == typeof wm && (_SETTINGS.Branding.Logo.Enabled ? (this.size.x = _SETTINGS.Branding.Logo.Width, this.size.y =
                _SETTINGS.Branding.Logo.Height, d && d.centralize && (this.pos.x = ig.system.width / 2 - this.size.x / 2, console.log("centralize true ... centering branded logo ..."))) : this.kill());
            this.anims.idle = new ig.Animation(this.logo, 0, [0], !0);
            this.currentAnim = this.anims.idle;
            d && console.log("branding settings found ... using that div layer name");
            _SETTINGS.Branding.Logo.LinkEnabled && (console.log("logo link enabled"), this.checkClickableLayer("branding-logo", _SETTINGS.Branding.Logo.Link2, _SETTINGS.Branding.Logo.NewWindow));
            console.log("branding logo spawed ...")
        },
        doesClickableLayerExist: function(b) {
            for (k in dynamicClickableEntityDivs)
                if (k == b) return !0;
            return !1 },
        checkClickableLayer: function(b, c, d) { "undefined" == typeof wm && (this.doesClickableLayerExist(b) ? (ig.game.showOverlay([b]), $("#" + b).find("[href]").attr("href", c)) : this.createClickableOutboundLayer(b, c, "media/graphics/misc/invisible.png", d)) },
        createClickableOutboundLayer: function(b, c, d, e) {
            var g = ig.$new("div");
            g.id = b;
            document.body.appendChild(g);
            $("#" + g.id).css("float",
                "left");
            $("#" + g.id).css("position", "absolute");
            if (ig.ua.mobile) {
                var j = window.innerHeight / mobileHeight,
                    q = window.innerWidth / mobileWidth;
                $("#" + g.id).css("left", this.pos.x * q);
                $("#" + g.id).css("top", this.pos.y * j);
                $("#" + g.id).css("width", this.size.x * q);
                $("#" + g.id).css("height", this.size.y * j) } else j = w / 2 - destW / 2, q = h / 2 - destH / 2, console.log(j, q), $("#" + g.id).css("left", j + this.pos.x * multiplier), $("#" + g.id).css("top", q + this.pos.y * multiplier), $("#" + g.id).css("width", this.size.x * multiplier), $("#" + g.id).css("height",
                this.size.y * multiplier);
            e ? $("#" + g.id).html("<a target='_blank' href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>") : $("#" + g.id).html("<a href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>");
            dynamicClickableEntityDivs[b] = {};
            dynamicClickableEntityDivs[b].width = this.size.x * multiplier;
            dynamicClickableEntityDivs[b].height = this.size.y * multiplier;
            dynamicClickableEntityDivs[b].entity_pos_x = this.pos.x;
            dynamicClickableEntityDivs[b].entity_pos_y = this.pos.y
        }
    })
});
this.END_BRANDING_LOGO;
ig.baked = !0;
ig.module("game.entities.button-more-games").requires("impact.entity").defines(function() {
    EntityButtonMoreGames = ig.Entity.extend({
        size: { x: 220, y: 52 },
        zIndex: 1750,
        hidden: !1,
        image: new ig.Image("media/graphics/game/ui/mainmenu/moregames.png"),
        init: function(b, c, d) { this.parent(b, c, d);
            this.offset.y = -(ig.system.height - c + 54);
            this.tween({ offset: { y: 0 } }, 1, { easing: ig.Tween.Easing.Elastic.EaseOut }).start() },
        ready: function() { setTimeout(this.spawnDiv(), 5) },
        spawnDiv: function() {
            this.canSpawnDiv || (this.canSpawnDiv = !0,
                _SETTINGS.MoreGames.Enabled ? this.checkClickableLayer(this.divLayerName ? this.divLayerName : "more-games", _SETTINGS.MoreGames.Link, _SETTINGS.MoreGames.NewWindow) : this.kill())
        },
        doesClickableLayerExist: function(b) {
            for (k in dynamicClickableEntityDivs)
                if (k == b) return !0;
            return !1 },
        checkClickableLayer: function(b, c, d) {
            "undefined" == typeof wm && (this.doesClickableLayerExist(b) ? (ig.game.showOverlay([b]), $("#" + b).find("[href]").attr("href", c), ig.ua.mobile ? (c = window.innerHeight / mobileHeight, d = window.innerWidth / mobileWidth,
                $("#" + b).css("left", this.pos.x * d), $("#" + b).css("top", this.pos.y * c), $("#" + b).css("width", this.size.x * d), $("#" + b).css("height", this.size.y * c)) : (c = document.getElementById("game").offsetLeft, d = document.getElementById("game").offsetTop, $("#" + b).css("left", c + this.pos.x * multiplier), $("#" + b).css("top", d + this.pos.y * multiplier), $("#" + b).css("width", this.size.x * multiplier), $("#" + b).css("height", this.size.y * multiplier))) : this.createClickableOutboundLayer(b, c, "media/graphics/misc/invisible.png", d))
        },
        createClickableOutboundLayer: function(b,
            c, d, e) {
            var g = ig.$new("div");
            g.id = b;
            document.body.appendChild(g);
            $("#" + g.id).css("float", "left");
            $("#" + g.id).css("position", "absolute");
            if (ig.ua.mobile) {
                var j = window.innerHeight / mobileHeight,
                    q = window.innerWidth / mobileWidth;
                $("#" + g.id).css("left", this.pos.x * q);
                $("#" + g.id).css("top", this.pos.y * j);
                $("#" + g.id).css("width", this.size.x * q);
                $("#" + g.id).css("height", this.size.y * j) } else j = document.getElementById("game").offsetLeft, q = document.getElementById("game").offsetTop, $("#" + g.id).css("left", j + this.pos.x *
                multiplier), $("#" + g.id).css("top", q + this.pos.y * multiplier), $("#" + g.id).css("width", this.size.x * multiplier), $("#" + g.id).css("height", this.size.y * multiplier);
            e ? $("#" + g.id).html("<a target='_blank' href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>") : $("#" + g.id).html("<a href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>");
            dynamicClickableEntityDivs[b] = {};
            dynamicClickableEntityDivs[b].width = this.size.x * multiplier;
            dynamicClickableEntityDivs[b].height = this.size.y * multiplier;
            dynamicClickableEntityDivs[b].entity_pos_x = this.pos.x;
            dynamicClickableEntityDivs[b].entity_pos_y = this.pos.y
        },
        hide: function() {
            var b = "more-games";
            this.divLayerName && (b = this.divLayerName);
            var c = document.getElementById(b);
            c && (c.style.visibility = "hidden");
            $("#" + b) && $("#" + b).hide();
            this.hidden = !0 },
        show: function() {
            var b = "more-games";
            this.divLayerName && (b = this.divLayerName);
            var c = document.getElementById(b);
            c && (c.style.visibility = "visible");
            $("#" + b) && $("#" + b).show();
            this.hidden = !1 },
        draw: function() {},
        hideLink: function() {
            var b =
                "more-games";
            this.divLayerName && (b = this.divLayerName);
            var c = document.getElementById(b);
            c && (c.style.visibility = "hidden");
            $("#" + b) && $("#" + b).hide()
        },
        showLink: function() {
            var b = "more-games";
            this.divLayerName && (b = this.divLayerName);
            var c = document.getElementById(b);
            c && (c.style.visibility = "visible");
            $("#" + b) && $("#" + b).show() }
    })
});
ig.baked = !0;
ig.module("game.entities.opening-kitty").requires("impact.entity").defines(function() {
    EntityOpeningKitty = ig.Entity.extend({
        size: { x: 48, y: 48 },
        kittyAnim: -1,
        kittyImage: new ig.Image("media/graphics/opening/kitty.png"),
        kittyTitleImage: new ig.Image("media/graphics/opening/kittytitle.png"),
        init: function(b, c, d) { this.parent(b, c, d) },
        ready: function() {
            if (!ig.wm)
                if (_SETTINGS.DeveloperBranding.Splash.Enabled) { this.initTimer = new ig.Timer(0.1);
                    try { ig.game.playSFX("kittyopeningSound") } catch (b) { console.log(b) } } else ig.game.director.nextLevel(),
                    ig.system.context.globalAlpha = 1, this.kill()
        },
        update: function() { this.parent();
            this.updateKittyOpening() },
        draw: function() { this.parent();
            ig.global.wm || (this.nextLevelTimer && 0 > this.nextLevelTimer.delta() && (ig.system.context.globalAlpha = -this.nextLevelTimer.delta()), this.drawKittyOpening()) },
        updateKittyOpening: function() {
            this.initTimer && 0 < this.initTimer.delta() && (this.initTimer = null, this.kittyTimer = new ig.Timer(0.15));
            this.kittyTimer && 0 < this.kittyTimer.delta() && (7 > this.kittyAnim ? (this.kittyAnim++, this.kittyTimer.reset()) :
                (this.kittyTimer = null, this.nextLevelTimer = new ig.Timer(2)));
            this.nextLevelTimer && 0 < this.nextLevelTimer.delta() && (this.nextLevelTimer = null, ig.game.director.nextLevel(), ig.system.context.globalAlpha = 1)
        },
        drawKittyOpening: function() {
            var b = ig.system.context.createLinearGradient(0, 0, 0, ig.system.height);
            b.addColorStop(0, "#ffed94");
            b.addColorStop(1, "#ffcd85");
            ig.system.context.fillStyle = b;
            ig.system.context.fillRect(0, 0, ig.system.width, ig.system.height);
            this.kittyImage.drawTile(ig.system.width / 2 - this.kittyImage.width /
                8, ig.system.height / 2 - this.kittyImage.height / 4, this.kittyAnim, 218, 325);
            this.kittyTitleImage.drawTile(ig.system.width / 2 - this.kittyTitleImage.width / 2, ig.system.height / 2 + this.kittyImage.height / 4 + 10, this.kittyAnim, 380, 37);
            ig.system.context.globalAlpha = 1
        }
    })
});
ig.baked = !0;
ig.module("game.entities.pointer").requires("impact.entity").defines(function() {
    EntityPointer = ig.Entity.extend({
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.B,
        isClicking: !1,
        selectedItem: null,
        firstClick: !1,
        isReleased: !1,
        hoveringItem: null,
        objectArray: [],
        ignorePause: !0,
        zIndex: 2E4,
        firstClickObject: null,
        check: function(b) { this.objectArray.push(b) },
        clickObject: function(b) {
            this.firstClick && !this.isReleased && (b == this.firstClickObject ? "function" == typeof b.clicking && b.clicking(this) : this.touches(this.firstClickObject) ?
                "function" == typeof this.firstClickObject.clicking && this.firstClickObject.clicking(this) : ("function" == typeof this.firstClickObject.lostPointer && this.firstClickObject.lostPointer(this), this.firstClickObject = null, this.firstClick = !1));
            this.isClicking && !this.firstClick && ("function" == typeof b.clicked && b.clicked(this), this.firstClick = !0, this.firstClickObject = b);
            this.isReleased && ("function" == typeof b.released && b.released(this), this.firstClickObject = null, this.firstClick = !1)
        },
        reset: function() {
            this.firstClickObject =
                null;
            this.firstClick = !1
        },
        refreshPos: function() {
            if (ig.ua.mobile) {
                var b = window.innerHeight / mobileHeight,
                    c = window.innerWidth / mobileWidth;
                portraitMode ? (b /= c, c = 1) : (c /= b, b = 1);
                this.pos.x = ig.input.mouse.x / c - this.size.x / 2;
                this.pos.y = ig.input.mouse.y / b - this.size.y / 2 } else this.pos.x = ig.input.mouse.x - this.size.x / 2, this.pos.y = ig.input.mouse.y - this.size.y / 2 },
        update: function() {
            this.refreshPos();
            var b = null,
                c = -1;
            for (a = this.objectArray.length - 1; - 1 < a; a--) this.objectArray[a].zIndex > c && (c = this.objectArray[a].zIndex, b =
                this.objectArray[a]);
            null != b ? (null != this.hoveringItem && "function" == typeof this.hoveringItem.idle && this.hoveringItem != b && this.hoveringItem.idle(this), this.hoveringItem = b, this.clickObject(b), this.objectArray = []) : (null != this.hoveringItem && "function" == typeof this.hoveringItem.idle && (this.hoveringItem.idle(this), this.hoveringItem = null), this.firstClick && !this.isReleased && null != this.firstClickObject && ("function" == typeof this.firstClickObject.lostPointer && this.firstClickObject.lostPointer(this), this.firstClickObject =
                null, this.firstClick = !1));
            this.isClicking = ig.input.pressed("click");
            this.isReleased = ig.input.released("click")
        }
    })
});
ig.baked = !0;
ig.module("game.entities.pointer-selector").requires("game.entities.pointer").defines(function() {
    EntityPointerSelector = EntityPointer.extend({
        zIndex: 1E3,
        _wmDrawBox: !0,
        _wmBoxColor: "rgba(0, 0, 255, 0.7)",
        size: { x: 10, y: 10 },
        init: function(b, c, d) { this.parent(b, c, d) },
        draw: function() {
            this.parent();
            ig.game.debug && (ig.system.context.fillStyle = "black", ig.system.context.font = "18px Arial", ig.system.context.textAlign = "left", ig.system.context.fillText(Math.round(this.pos.x) + ", " + Math.round(this.pos.y), this.pos.x,
                this.pos.y))
        }
    })
});
ig.baked = !0;
ig.module("game.entities.select").requires("impact.entity").defines(function() {
    EntitySelect = ig.Entity.extend({
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NEVER,
        canSelect: !1,
        canSelectTimerDuration: 0.35,
        zIndex: 99999,
        isHovering: !1,
        isSelected: !1,
        init: function(b, c, d) { this.parent(b, c, d);
            this.canSelectTimer = new ig.Timer(this.canSelectTimerDuration) },
        doesClickableLayerExist: function(b) {
            for (k in dynamicClickableEntityDivs)
                if (k == b) return !0;
            return !1 },
        checkClickableLayer: function(b,
            c, d) { "undefined" == typeof wm && (this.doesClickableLayerExist(b) ? (ig.game.showOverlay([b]), $("#" + b).find("[href]").attr("href", c)) : this.createClickableOutboundLayer(b, c, "media/misc/invisible.png", d)) },
        createClickableOutboundLayer: function(b, c, d, e) {
            var g = ig.$new("div");
            g.id = b;
            document.body.appendChild(g);
            $("#" + g.id).css("float", "left");
            $("#" + g.id).css("width", this.size.x * multiplier);
            $("#" + g.id).css("height", this.size.y * multiplier);
            $("#" + g.id).css("position", "absolute");
            var j = w / 2 - destW / 2,
                q = h / 2 - destH / 2;
            w == mobileWidth ? ($("#" + g.id).css("left", this.pos.x), $("#" + g.id).css("top", this.pos.y)) : ($("#" + g.id).css("left", j + this.pos.x * multiplier), $("#" + g.id).css("top", q + this.pos.y * multiplier));
            e ? $("#" + g.id).html("<a target='_blank' href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>") : $("#" + g.id).html("<a href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>");
            dynamicClickableEntityDivs[b] = {};
            dynamicClickableEntityDivs[b].width = $("#" + g.id).width();
            dynamicClickableEntityDivs[b].height =
                $("#" + g.id).height();
            dynamicClickableEntityDivs[b].entity_pos_x = this.pos.x;
            dynamicClickableEntityDivs[b].entity_pos_y = this.pos.y
        },
        hovered: function() { this.isHovering = !0;
            this.dehoverOthers() },
        dehoverOthers: function() {
            var b = ig.game.getEntitiesByType(EntitySelect);
            for (i = 0; i < b.length; i++) b[i] != this && (b[i].isHovering = !1) },
        deselectOthers: function() {
            var b = ig.game.getEntitiesByType(EntitySelect);
            for (i = 0; i < b.length; i++) b[i] != this && (b[i].isSelected = !1) },
        update: function() {
            this.parent();
            this.canSelectTimer && 0 <
                this.canSelectTimer.delta() && (this.canSelect = !0, this.canSelectTimer = null)
        }
    })
});
ig.baked = !0;
ig.module("game.levels.opening").requires("impact.image", "game.entities.opening-kitty").defines(function() { LevelOpening = { entities: [{ type: "EntityOpeningKitty", x: 436, y: 204 }], layer: [] } });
ig.baked = !0;
ig.module("game.entities.howtoplay").requires("impact.entity").defines(function() {
    EntityHowtoplay = ig.Entity.extend({
        zIndex: 1100,
        type: ig.Entity.TYPE.B,
        size: { x: 0, y: 0 },
        control: null,
        pointer: null,
        bgImage: new ig.Image("media/graphics/game/ui/howtoplay.jpg"),
        closeBox: { x: 281, y: 4, w: 194, h: 70 },
        init: function(b, c, d) { this.parent(b, c, d);
            1 < ig.game.getEntitiesByType(EntityHowtoplay).length && this.kill();
            this.size.x = ig.system.width;
            this.size.y = ig.system.height },
        ready: function() {
            var b = ig.game.getEntitiesByType(EntityPointer);
            0 < b.length && (this.pointer = b[0])
        },
        draw: function() { this.parent();
            this.bgImage.draw(0, 0) },
        update: function() { this.parent() },
        released: function() { this.aabbCheck({ x1: this.pointer.pos.x, y1: this.pointer.pos.y, x2: this.pointer.pos.x + this.pointer.size.x, y2: this.pointer.pos.y + this.pointer.size.y }, { x1: this.closeBox.x, y1: this.closeBox.y, x2: this.closeBox.x + this.closeBox.w, y2: this.closeBox.y + this.closeBox.h }) && (this.kill(), this.control.moregames && this.control.moregames.show(), this.control.howtoplay = null, ig.game.playSFX("click")) },
        aabbCheck: function(b, c) {
            return b.x1 < c.x2 && b.x2 > c.x1 && b.y1 < c.y2 && b.y2 > c.y1 ? !0 : !1 }
    })
});
ig.baked = !0;
ig.module("game.entities.home-control").requires("impact.entity", "game.entities.button-more-games", "game.entities.howtoplay").defines(function() {
    EntityHomeControl = ig.Entity.extend({
        zIndex: 1E3,
        pointer: null,
        howtoplay: null,
        showEditTeam: !1,
        showUpgrade: !1,
        selectedUnitPos: 0,
        selectedTankType: 0,
        unitAnims: [new ig.Animation(new ig.AnimationSheet("media/graphics/game/unit/friend/cat/idle.png", 160, 160), 0.2, [0, 1, 2]), new ig.Animation(new ig.AnimationSheet("media/graphics/game/unit/friend/panda/idle.png", 160, 160),
            0.2, [0, 1, 2]), new ig.Animation(new ig.AnimationSheet("media/graphics/game/unit/friend/repair/idle.png", 160, 160), 0.2, [0, 1, 2]), new ig.Animation(new ig.AnimationSheet("media/graphics/game/unit/friend/wolf/idle.png", 160, 160), 0.2, [0, 1, 2])],
        tankAnims: [new ig.Animation(new ig.AnimationSheet("media/graphics/game/tank/tank1/idle.png", 438, 375), 0.2, [0]), new ig.Animation(new ig.AnimationSheet("media/graphics/game/tank/tank2/idle.png", 438, 375), 0.2, [0]), new ig.Animation(new ig.AnimationSheet("media/graphics/game/tank/tank3/idle.png",
            438, 375), 0.2, [0])],
        seatPos: [{ x: 127, y: 98 }, { x: 209, y: 163 }, { x: 117, y: 221 }],
        tankPrice: [0, 2500, 5E3],
        tankReqLevel: [0, 3, 6],
        seatImage: new ig.Image("media/graphics/game/tank/seat.png"),
        seatRedImage: new ig.Image("media/graphics/game/tank/seat-red.png"),
        tankStatsImage: new ig.Image("media/graphics/game/ui/mainmenu/tankstats.png"),
        lockImage: new ig.Image("media/graphics/game/ui/mainmenu/lock.png"),
        unitSelectImage: new ig.Image("media/graphics/game/ui/mainmenu/unitselect.png"),
        coinImage: new ig.Image("media/graphics/game/ui/mainmenu/coin.png"),
        bgImage: new ig.Image("media/graphics/game/ui/mainmenu/mainbg.jpg"),
        playImage: new ig.Image("media/graphics/game/ui/mainmenu/play.png"),
        howtoplayImage: new ig.Image("media/graphics/game/ui/mainmenu/howtoplay.png"),
        moregamesImage: new ig.Image("media/graphics/game/ui/mainmenu/moregames.png"),
        playBox: { x: 256, y: 574, w: 213, h: 51 },
        howtoplayBox: { x: 163, y: 524, w: 152, h: 36 },
        moregamesBox: { x: 14, y: 573, w: 220, h: 52 },
        medalImage: new ig.Image("media/graphics/game/ui/mainmenu/medal.png"),
        editTeamImage: new ig.Image("media/graphics/game/ui/mainmenu/editteam.png"),
        upgradeImage: new ig.Image("media/graphics/game/ui/mainmenu/upgrade.png"),
        editTeamBox: { x: 320, y: 524, w: 149, h: 36 },
        upgradeBox: { x: 11, y: 525, w: 149, h: 35 },
        editBgImage: new ig.Image("media/graphics/game/ui/mainmenu/editbg.png"),
        okImage: new ig.Image("media/graphics/game/ui/mainmenu/ok.png"),
        frameBigImage: new ig.Image("media/graphics/game/ui/mainmenu/frame-big.png"),
        frameSmallImage: new ig.Image("media/graphics/game/ui/mainmenu/frame-small.png"),
        unitSelectImage: new ig.Image("media/graphics/game/ui/mainmenu/unitselect.png"),
        okBox: { x: 140, y: 501, w: 195, h: 47 },
        unitSelectBox: [{ x: 68, y: 210, w: 103, h: 102 }, { x: 189, y: 210, w: 103, h: 102 }, { x: 313, y: 210, w: 103, h: 102 }],
        availableUnitSelectBox: [{ x: 33, y: 366, w: 91, h: 90 }, { x: 138, y: 366, w: 91, h: 90 }, { x: 246, y: 366, w: 91, h: 90 }, { x: 354, y: 366, w: 91, h: 90 }],
        tankBox: [{ x: -130, y: 170, w: 230, h: 190 }, { x: 370, y: 170, w: 230, h: 190 }, { x: 120, y: 170, w: 230, h: 190 }],
        tankScrollOffsetX: 0,
        init: function(b, c, d) { this.parent(b, c, d) },
        ready: function() {
            this.muteButton = ig.game.spawnEntity(EntityButtonMute, 448, 85);
            this.muteButton.zIndex = 1100;
            var b =
                ig.game.getEntitiesByType(EntityPointer);
            0 < b.length && (this.pointer = b[0]);
            b = this.playBox.y;
            this.playBox.y = ig.system.height + 54;
            this.tween({ playBox: { y: b } }, 1, { easing: ig.Tween.Easing.Elastic.EaseOut }).start();
            b = this.howtoplayBox.y;
            this.howtoplayBox.y = ig.system.height + 54;
            this.tween({ howtoplayBox: { y: b } }, 1, { easing: ig.Tween.Easing.Elastic.EaseOut }).start();
            b = this.editTeamBox.y;
            this.editTeamBox.y = ig.system.height + 54;
            this.tween({ editTeamBox: { y: b } }, 1, { easing: ig.Tween.Easing.Elastic.EaseOut }).start();
            b = this.upgradeBox.y;
            this.upgradeBox.y = ig.system.height + 54;
            this.tween({ upgradeBox: { y: b } }, 1, { easing: ig.Tween.Easing.Elastic.EaseOut }).start();
            _SETTINGS.MoreGames.Enabled && (this.moregames = ig.game.spawnEntity(EntityButtonMoreGames, this.moregamesBox.x, this.moregamesBox.y), this.moregames.ready());
            ig.game.sortEntitiesDeferred()
        },
        draw: function() {
            this.parent();
            this.bgImage.draw(0, 0);
            ig.system.context.globalAlpha = 0.4;
            ig.system.context.fillStyle = "#000000";
            ig.system.context.fillRect(0, 0, ig.system.width, 80);
            ig.system.context.globalAlpha =
                1;
            this.playImage.draw(this.playBox.x, this.playBox.y);
            this.howtoplayImage.draw(this.howtoplayBox.x, this.howtoplayBox.y);
            this.medalImage.draw(21, 0);
            this.coinImage.draw(130, 20);
            ig.system.context.fillStyle = "#FFFFFF";
            ig.system.context.font = "20px avenger";
            str = ig.game.totalCoins;
            var b = ig.system.context.measureText(str).width,
                c = ig.system.context.measureText("m").width;
            ig.system.context.fillText(str, 170, 27 + c);
            ig.global.wm || (ig.game.currentPlayerLevel < ig.game.requiredXP.length && (ig.system.context.fillStyle =
                    "#FFFFFF", ig.system.context.font = "12px ariel", str = "/", b = ig.system.context.measureText(str).width, c = ig.system.context.measureText("m").width, ig.system.context.fillText(str, 64 - b / 2, 6 + c), ig.system.context.fillStyle = "#FFFFFF", ig.system.context.font = "10px avenger", str = ig.game.currentXP, b = ig.system.context.measureText(str).width, c = ig.system.context.measureText("m").width, ig.system.context.fillText(str, 58 - b, 6 + c), str = ig.game.requiredXP[ig.game.currentPlayerLevel], ig.system.context.measureText(str), c = ig.system.context.measureText("m").width,
                    ig.system.context.fillText(str, 68, 6 + c)), ig.system.context.fillStyle = "#FFFFFF", ig.system.context.font = "20px avenger", str = "LV", b = ig.system.context.measureText(str).width, c = ig.system.context.measureText("m").width, ig.system.context.fillText(str, 63 - b / 2, 28 + c), ig.system.context.font = "40px avenger", str = ig.game.currentPlayerLevel, b = ig.system.context.measureText(str).width, c = ig.system.context.measureText("m").width, ig.system.context.fillText(str, 60 - b / 2, 55 + c), this.editTeamImage.draw(this.editTeamBox.x, this.editTeamBox.y),
                this.upgradeImage.draw(this.upgradeBox.x, this.upgradeBox.y), this.moregames && this.moregamesImage.draw(this.moregames.pos.x - this.moregames.offset.x, this.moregames.pos.y - this.moregames.offset.y), this.showUpgrade && this.drawUpgrade(), this.showEditTeam && this.drawEditTeam())
        },
        drawEditTeam: function() {
            ig.system.context.globalAlpha = 0.4;
            ig.system.context.fillStyle = "#000000";
            ig.system.context.fillRect(0, 0, ig.system.width, ig.system.height);
            ig.system.context.globalAlpha = 1;
            this.editBgImage.draw(0, 0);
            this.okImage.draw(this.okBox.x,
                this.okBox.y);
            ig.system.context.fillStyle = "#FFFFFF";
            ig.system.context.font = "24px avenger";
            str = "CHOOSE YOUR TEAM";
            var b = ig.system.context.measureText(str).width;
            ig.system.context.measureText("m");
            var c;
            ig.system.context.fillText(str, 240 - b / 2, 195);
            0 == this.selectedUnitPos ? this.unitSelectImage.draw(58, 210) : 1 == this.selectedUnitPos ? this.unitSelectImage.draw(179, 210) : 2 == this.selectedUnitPos && this.unitSelectImage.draw(301, 210);
            this.frameBigImage.draw(68, 220);
            this.frameBigImage.draw(189, 220);
            this.frameBigImage.draw(313,
                220);
            if (ig.game.currentTeam) {
                var d = this.unitAnims[ig.game.currentTeam[0]];
                d.sheet.image.draw(80, 232, 0 * d.sheet.width + 37, 37, 79, 78);
                d = this.unitAnims[ig.game.currentTeam[1]];
                d.sheet.image.draw(201, 232, 0 * d.sheet.width + 37, 37, 79, 78);
                d = this.unitAnims[ig.game.currentTeam[2]];
                d.sheet.image.draw(325, 232, 0 * d.sheet.width + 37, 37, 79, 78) }
            this.frameSmallImage.draw(33, 366);
            this.frameSmallImage.draw(138, 366);
            this.frameSmallImage.draw(246, 366);
            this.frameSmallImage.draw(354, 366);
            d = this.unitAnims[0];
            d.sheet.image.draw(45,
                378, 0 * d.sheet.width + 42, 42, 67, 66);
            d = this.unitAnims[1];
            d.sheet.image.draw(150, 378, 0 * d.sheet.width + 42, 42, 67, 66);
            d = this.unitAnims[2];
            d.sheet.image.draw(258, 378, 0 * d.sheet.width + 42, 42, 67, 66);
            d = this.unitAnims[3];
            d.sheet.image.draw(366, 378, 0 * d.sheet.width + 42, 42, 67, 66);
            ig.system.context.globalAlpha = 0.6;
            ig.system.context.fillStyle = "#000000";
            for (b = 0; b < ig.game.currentTeam.length; b++) 0 == ig.game.currentTeam[b] ? ig.system.context.fillRect(44, 377, 73, 72) : 1 == ig.game.currentTeam[b] ? ig.system.context.fillRect(149, 377,
                73, 72) : 2 == ig.game.currentTeam[b] ? ig.system.context.fillRect(257, 377, 73, 72) : 3 == ig.game.currentTeam[b] && ig.system.context.fillRect(365, 377, 73, 72);
            ig.system.context.globalAlpha = 1;
            ig.system.context.fillStyle = "#FFFFFF";
            ig.system.context.font = "16px avenger";
            for (d = 0; d < this.unitAnims.length; d++) {
                c = !1;
                for (b = 0; b < ig.game.currentTeam.length; b++)
                    if (ig.game.currentTeam[b] == d) { c = !0;
                        break }!1 == c && (0 == d ? (str = "Shotgun", b = ig.system.context.measureText(str).width, ig.system.context.measureText("m"), b = 81 - b / 2, c = 362, ig.system.context.fillText(str,
                    b, c)) : 1 == d ? (str = "Bazooka", b = ig.system.context.measureText(str).width, ig.system.context.measureText("m"), b = 186 - b / 2, c = 362, ig.system.context.fillText(str, b, c)) : 2 == d ? (str = "Repair", b = ig.system.context.measureText(str).width, ig.system.context.measureText("m"), b = 294 - b / 2, c = 362, ig.system.context.fillText(str, b, c)) : 3 == d && (str = "Machine Gun", b = ig.system.context.measureText(str).width, ig.system.context.measureText("m"), b = 402 - b / 2, c = 362, ig.system.context.fillText(str, b, c)))
            }
        },
        drawUpgrade: function() {
            ig.system.context.globalAlpha =
                0.4;
            ig.system.context.fillStyle = "#000000";
            ig.system.context.fillRect(0, 0, ig.system.width, ig.system.height);
            ig.system.context.globalAlpha = 1;
            this.editBgImage.draw(0, 0);
            this.okImage.draw(this.okBox.x, this.okBox.y);
            this.tankStatsImage.draw(118, 371);
            ig.system.context.fillStyle = "#FFFF00";
            0 == this.selectedTankType ? (ig.system.context.fillRect(215, 394, 43.2, 9), ig.system.context.fillRect(215, 417, 10.8, 9), ig.system.context.fillRect(215, 440, 32.4, 9)) : 1 == this.selectedTankType ? (ig.system.context.fillRect(215, 394, 64.8,
                9), ig.system.context.fillRect(215, 417, 43.2, 9), ig.system.context.fillRect(215, 440, 64.8, 9)) : 2 == this.selectedTankType && (ig.system.context.fillRect(215, 394, 108, 9), ig.system.context.fillRect(215, 417, 108, 9), ig.system.context.fillRect(215, 440, 108, 9));
            var b = this.selectedTankType,
                c = this.tankAnims[b];
            ig.system.context.save();
            var d = this.tankBox[2].x - 50,
                e = this.tankBox[2].y - 60;
            ig.system.context.translate(d, e);
            ig.system.context.scale(0.75, 0.75);
            c.draw(0, 0);
            d = this.seatImage;
            2 == b && (d = this.seatRedImage);
            for (c = 0; c <
                this.seatPos.length; c++) {
                var e = this.seatPos[c].x,
                    g = this.seatPos[c].y,
                    j = e + 19,
                    q = g + 7,
                    n = d.data.width - 36,
                    r = d.data.height - 14;
                ig.system.context.fillStyle = "#999999";
                ig.system.context.fillRect(j, q, n, r);
                d.draw(e, g) }
            ig.system.context.restore();
            d = !1;
            for (c = 0; c < ig.game.unlockedTanks.length; c++)
                if (ig.game.unlockedTanks[c] == b) { d = !0;
                    break }
            d || (c = this.tankBox[2].x + 49, d = this.tankBox[2].y + 7, this.lockImage.draw(c, d), this.coinImage.draw(c + 47, d + 97), ig.system.context.fillStyle = "#FFFFFF", ig.system.context.font = "16px avenger",
                str = "lv " + this.tankReqLevel[b], e = ig.system.context.measureText(str).width, g = ig.system.context.measureText("m").width, ig.system.context.fillText(str, c + 65 - e / 2, d + 75 + g), ig.system.context.font = "16px avenger", str = this.tankPrice[b], e = ig.system.context.measureText(str).width, g = ig.system.context.measureText("m").width, ig.system.context.fillText(str, c + 65 - e / 2, d + 125 + g), ig.system.context.font = "12px avenger", str = "to unlock", e = ig.system.context.measureText(str).width, g = ig.system.context.measureText("m").width, ig.system.context.fillText(str,
                    c + 65 - e / 2, d + 148 + g));
            b = this.selectedTankType + 1;
            b >= this.tankAnims.length && (b = 0);
            c = this.tankAnims[b];
            ig.system.context.save();
            d = this.tankBox[1].x - 50;
            e = this.tankBox[1].y - 60;
            ig.system.context.translate(d, e);
            ig.system.context.scale(0.75, 0.75);
            c.draw(0, 0);
            d = this.seatImage;
            2 == b && (d = this.seatRedImage);
            for (c = 0; c < this.seatPos.length; c++) e = this.seatPos[c].x, g = this.seatPos[c].y, j = e + 19, q = g + 7, n = d.data.width - 36, r = d.data.height - 14, ig.system.context.fillStyle = "#999999", ig.system.context.fillRect(j, q, n, r), d.draw(e, g);
            ig.system.context.restore();
            d = !1;
            for (c = 0; c < ig.game.unlockedTanks.length; c++)
                if (ig.game.unlockedTanks[c] == b) { d = !0;
                    break }
            d || (c = this.tankBox[1].x + 49, d = this.tankBox[1].y + 7, this.lockImage.draw(c, d), this.coinImage.draw(c + 47, d + 97), ig.system.context.fillStyle = "#FFFFFF", ig.system.context.font = "16px avenger", str = "lv " + this.tankReqLevel[b], e = ig.system.context.measureText(str).width, g = ig.system.context.measureText("m").width, ig.system.context.fillText(str, c + 65 - e / 2, d + 75 + g), ig.system.context.font = "16px avenger",
                str = this.tankPrice[b], e = ig.system.context.measureText(str).width, g = ig.system.context.measureText("m").width, ig.system.context.fillText(str, c + 65 - e / 2, d + 125 + g), ig.system.context.font = "12px avenger", str = "to unlock", e = ig.system.context.measureText(str).width, g = ig.system.context.measureText("m").width, ig.system.context.fillText(str, c + 65 - e / 2, d + 148 + g));
            b = this.selectedTankType - 1;
            0 > b && (b = this.tankAnims.length - 1);
            c = this.tankAnims[b];
            ig.system.context.save();
            d = this.tankBox[0].x - 50;
            e = this.tankBox[0].y - 60;
            ig.system.context.translate(d,
                e);
            ig.system.context.scale(0.75, 0.75);
            c.draw(0, 0);
            d = this.seatImage;
            2 == b && (d = this.seatRedImage);
            for (c = 0; c < this.seatPos.length; c++) e = this.seatPos[c].x, g = this.seatPos[c].y, j = e + 19, q = g + 7, n = d.data.width - 36, r = d.data.height - 14, ig.system.context.fillStyle = "#999999", ig.system.context.fillRect(j, q, n, r), d.draw(e, g);
            ig.system.context.restore();
            d = !1;
            for (c = 0; c < ig.game.unlockedTanks.length; c++)
                if (ig.game.unlockedTanks[c] == b) { d = !0;
                    break }
            d || (c = this.tankBox[0].x + 49, d = this.tankBox[0].y + 7, this.lockImage.draw(c, d), this.coinImage.draw(c +
                    47, d + 97), ig.system.context.fillStyle = "#FFFFFF", ig.system.context.font = "16px avenger", str = "lv " + this.tankReqLevel[b], e = ig.system.context.measureText(str).width, g = ig.system.context.measureText("m").width, ig.system.context.fillText(str, c + 65 - e / 2, d + 75 + g), ig.system.context.font = "16px avenger", str = this.tankPrice[b], e = ig.system.context.measureText(str).width, g = ig.system.context.measureText("m").width, ig.system.context.fillText(str, c + 65 - e / 2, d + 125 + g), ig.system.context.font = "12px avenger", str = "to unlock", e =
                ig.system.context.measureText(str).width, g = ig.system.context.measureText("m").width, ig.system.context.fillText(str, c + 65 - e / 2, d + 148 + g))
        },
        update: function() { this.parent();
            for (var b = 0; b < this.unitAnims.length; b++) this.unitAnims[b].update();
            for (b = 0; b < this.tankAnims.length; b++) this.tankAnims[b].update();!this.howtoplay && ig.input.released("click") && (this.showEditTeam ? this.editTeamReleased() : this.showUpgrade ? this.upgradeReleased() : this.released()) },
        released: function() {
            var b = {
                    x1: this.pointer.pos.x,
                    y1: this.pointer.pos.y,
                    x2: this.pointer.pos.x + this.pointer.size.x,
                    y2: this.pointer.pos.y + this.pointer.size.y
                },
                c = { x1: this.playBox.x, y1: this.playBox.y, x2: this.playBox.x + this.playBox.w, y2: this.playBox.y + this.playBox.h };
            this.aabbCheck(b, c) ? (ig.game.director.loadLevel(2), ig.game.playSFX("click")) : (c = { x1: this.howtoplayBox.x, y1: this.howtoplayBox.y, x2: this.howtoplayBox.x + this.howtoplayBox.w, y2: this.howtoplayBox.y + this.howtoplayBox.h }, this.aabbCheck(b, c) ? (this.howtoplay = ig.game.spawnEntity(EntityHowtoplay, 0, 0, { control: this }), this.howtoplay.ready(),
                ig.game.playSFX("click"), this.moregames && this.moregames.hide()) : (c = { x1: this.upgradeBox.x, y1: this.upgradeBox.y, x2: this.upgradeBox.x + this.upgradeBox.w, y2: this.upgradeBox.y + this.upgradeBox.h }, this.aabbCheck(b, c) ? (this.showUpgrade = !0, this.selectedTankType = ig.game.tankType, ig.game.playSFX("click"), this.moregames && this.moregames.hideLink()) : (c = { x1: this.editTeamBox.x, y1: this.editTeamBox.y, x2: this.editTeamBox.x + this.editTeamBox.w, y2: this.editTeamBox.y + this.editTeamBox.h }, this.aabbCheck(b, c) && (this.showEditTeam = !0, this.selectedUnitPos = 0, ig.game.playSFX("click"), this.moregames && this.moregames.hideLink()))))
        },
        editTeamReleased: function() {
            var b = { x1: this.pointer.pos.x, y1: this.pointer.pos.y, x2: this.pointer.pos.x + this.pointer.size.x, y2: this.pointer.pos.y + this.pointer.size.y },
                c = { x1: this.okBox.x, y1: this.okBox.y, x2: this.okBox.x + this.okBox.w, y2: this.okBox.y + this.okBox.h };
            if (this.aabbCheck(b, c)) this.showEditTeam = !1, ig.game.playSFX("click"), this.moregames && this.moregames.showLink();
            else {
                for (var d = 0; d < this.unitSelectBox.length; d++)
                    if (c =
                        this.unitSelectBox[d], c = { x1: c.x, y1: c.y, x2: c.x + c.w, y2: c.y + c.h }, this.aabbCheck(b, c)) { this.selectedUnitPos = d;
                        ig.game.playSFX("click");
                        return }
                for (d = 0; d < this.availableUnitSelectBox.length; d++)
                    if (c = this.availableUnitSelectBox[d], c = { x1: c.x, y1: c.y, x2: c.x + c.w, y2: c.y + c.h }, this.aabbCheck(b, c)) { b = !1;
                        for (c = 0; c < ig.game.currentTeam.length; c++)
                            if (ig.game.currentTeam[c] == d) { b = !0;
                                break }
                        if (b) break;
                        ig.game.currentTeam[this.selectedUnitPos] = d;
                        ig.game.setLocalStorage();
                        ig.game.playSFX("click");
                        break }
            }
        },
        upgradeReleased: function() {
            var b = { x1: this.pointer.pos.x, y1: this.pointer.pos.y, x2: this.pointer.pos.x + this.pointer.size.x, y2: this.pointer.pos.y + this.pointer.size.y },
                c = { x1: this.okBox.x, y1: this.okBox.y, x2: this.okBox.x + this.okBox.w, y2: this.okBox.y + this.okBox.h };
            if (this.aabbCheck(b, c)) this.showUpgrade = !1, ig.game.playSFX("click"), this.moregames && this.moregames.showLink();
            else
                for (var d = 0; d < this.tankBox.length; d++)
                    if (c = this.tankBox[d], c = { x1: c.x, y1: c.y, x2: c.x + c.w, y2: c.y + c.h }, this.aabbCheck(b, c)) {
                        if (2 == d) {
                            b = !1;
                            for (d = 0; d < ig.game.unlockedTanks.length; d++)
                                if (ig.game.unlockedTanks[d] ==
                                    this.selectedTankType) { b = !0;
                                    break }!b && (ig.game.currentPlayerLevel >= this.tankReqLevel[this.selectedTankType] && ig.game.totalCoins >= this.tankPrice[this.selectedTankType]) && (ig.game.unlockedTanks.push(this.selectedTankType), ig.game.totalCoins -= this.tankPrice[this.selectedTankType], ig.game.tankType = this.selectedTankType, ig.game.setLocalStorage(), ig.game.playSFX("click"), ig.game.playSFX("coins"))
                        } else {
                            0 == d ? (this.selectedTankType -= 1, 0 > this.selectedTankType && (this.selectedTankType = this.tankAnims.length - 1)) :
                                1 == d && (this.selectedTankType += 1, this.selectedTankType >= this.tankAnims.length && (this.selectedTankType = 0));
                            b = !1;
                            for (d = 0; d < ig.game.unlockedTanks.length; d++)
                                if (ig.game.unlockedTanks[d] == this.selectedTankType) { b = !0;
                                    break }
                            b && (ig.game.tankType = this.selectedTankType, ig.game.setLocalStorage(), ig.game.playSFX("click"))
                        }
                        break
                    }
        },
        aabbCheck: function(b, c) {
            return b.x1 < c.x2 && b.x2 > c.x1 && b.y1 < c.y2 && b.y2 > c.y1 ? !0 : !1 }
    })
});
ig.baked = !0;
ig.module("game.levels.mainmenu").requires("impact.image", "game.entities.home-control", "game.entities.pointer-selector", "game.entities.branding-logo").defines(function() { LevelMainmenu = { entities: [{ type: "EntityHomeControl", x: -4, y: -28 }, { type: "EntityPointerSelector", x: -4, y: -48 }, { type: "EntityBrandingLogo", x: 265, y: 15 }], layer: [] } });
ig.baked = !0;
ig.module("game.entities.results-control").requires("impact.entity").defines(function() {
    EntityResultsControl = ig.Entity.extend({
        zIndex: 1E3,
        pointer: null,
        bgImage: new ig.Image("media/graphics/game/ui/menubg.jpg"),
        bg2Image: new ig.Image("media/graphics/game/ui/menubg2.png"),
        titleImage: new ig.Image("media/graphics/game/ui/resultstitle.png"),
        coinImage: new ig.Image("media/graphics/game/ui/bigcoin.png"),
        flagImage: new ig.Image("media/graphics/game/ui/flag.png"),
        replayImage: new ig.Image("media/graphics/game/ui/replay.png"),
        homeImage: new ig.Image("media/graphics/game/ui/home.png"),
        replayBox: { x: 94, y: 396, w: 314, h: 75 },
        homeBox: { x: 94, y: 474, w: 314, h: 75 },
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
        init: function(b, c, d) {
            this.parent(b, c, d);
            _SETTINGS.API.Enabled && _SETTINGS.API.Log.Events.EndGame && (console.log("Log events end game enabled"), this.API_LOG_EVENTS_END_GAME);
            console.log("showAD!!");
            this.showAD();
            if (_SETTINGS.MarketJSGameCenter.API.Enabled && _SETTINGS.MarketJSGameCenter.API.Log.Events.EndGame) {
                console.log("MarketJSGameCenter: Log events end game enabled");
                this.MARKETJS_GAMECENTER_API_LOG_EVENTS_END_GAME;
                try {
                    var e = ig.game.lastGameCoins;
                    console.log("score", e);
                    MarketJSGameCenter.submitScore(e, GAME.key) } catch (g) { console.log(g) }
            }
        },
        ready: function() {
            var b = ig.game.getEntitiesByType(EntityPointer);
            0 < b.length && (this.pointer = b[0]);
            this.pos.x = 0;
            this.pos.y = 0;
            b = this.pos.x;
            this.pos.x = ig.system.width + b;
            this.tween({ pos: { x: b } }, 0.5, { easing: ig.Tween.Easing.Elastic.EaseOut }).start() },
        draw: function() {
            this.parent();
            this.bgImage.draw(0, 0);
            this.bg2Image.draw(this.pos.x + 0, this.pos.y + 0);
            this.titleImage.draw(this.pos.x + 143,
                this.pos.y + 60);
            this.coinImage.draw(this.pos.x + 98, this.pos.y + 169);
            this.flagImage.draw(this.pos.x + 103, this.pos.y + 269);
            ig.system.context.fillStyle = "#cd1515";
            ig.system.context.font = "46px avenger_bold";
            str = ig.game.lastGameCoins;
            var b = ig.system.context.measureText(str).width,
                c = ig.system.context.measureText("m").width,
                d = this.pos.x + 244 - b / 2,
                c = this.pos.y + 180 + c;
            ig.system.context.fillText(str, d, c);
            ig.system.context.fillStyle = "#cd1515";
            ig.system.context.font = "46px avenger_bold";
            str = ig.game.lastGameDistance;
            b =
                ig.system.context.measureText(str).width;
            c = ig.system.context.measureText("m").width;
            d = this.pos.x + 244 - b / 2;
            c = this.pos.y + 276 + c;
            ig.system.context.fillText(str, d, c);
            ig.system.context.fillText(" km", d + b, c);
            this.replayImage.draw(this.pos.x + this.replayBox.x, this.pos.y + this.replayBox.y);
            this.homeImage.draw(this.pos.x + this.homeBox.x, this.pos.y + this.homeBox.y)
        },
        update: function() { this.parent();
            ig.input.released("click") && this.released() },
        released: function() {
            var b = {
                    x1: this.pointer.pos.x,
                    y1: this.pointer.pos.y,
                    x2: this.pointer.pos.x + this.pointer.size.x,
                    y2: this.pointer.pos.y + this.pointer.size.y
                },
                c = { x1: this.replayBox.x, y1: this.replayBox.y, x2: this.replayBox.x + this.replayBox.w, y2: this.replayBox.y + this.replayBox.h };
            this.aabbCheck(b, c) ? (b = ig.system.width, this.tween({ pos: { x: b } }, 0.5, { easing: ig.Tween.Easing.Elastic.EaseIn, entity: this, onComplete: function() { ig.game.director.loadLevel(2) } }).start(), ig.game.playSFX("click")) : (c = { x1: this.homeBox.x, y1: this.homeBox.y, x2: this.homeBox.x + this.homeBox.w, y2: this.homeBox.y + this.homeBox.h },
                this.aabbCheck(b, c) && (b = ig.system.width, this.tween({ pos: { x: b } }, 0.5, { easing: ig.Tween.Easing.Elastic.EaseIn, entity: this, onComplete: function() { ig.game.director.loadLevel(1) } }).start(), ig.game.playSFX("click")))
        },
        aabbCheck: function(b, c) {
            return b.x1 < c.x2 && b.x2 > c.x1 && b.y1 < c.y2 && b.y2 > c.y1 ? !0 : !1 }
    })
});
ig.baked = !0;
ig.module("game.levels.results").requires("impact.image", "game.entities.results-control", "game.entities.pointer-selector").defines(function() { LevelResults = { entities: [{ type: "EntityResultsControl", x: -4, y: -28 }, { type: "EntityPointerSelector", x: -4, y: -48 }], layer: [] } });
ig.baked = !0;
ig.module("game.entities.game-bg").requires("impact.entity").defines(function() {
    EntityGameBg = ig.Entity.extend({
        zIndex: 0,
        skyImage: new ig.Image("media/graphics/game/bg/sky.jpg"),
        farBuildingImage: new ig.Image("media/graphics/game/bg/far_building.png"),
        buildingImage: new ig.Image("media/graphics/game/bg/building.png"),
        ground: null,
        farBuildingScrollSpeed: -5,
        buildingScrollSpeed: -10,
        curFarBuildingOffset: 0,
        curBuildingOffset: 0,
        farBuildingRepeats: 1,
        buildingRepeats: 1,
        farBuildingRepeatSpacing: 0,
        buildingRepeatSpacing: -18,
        farBuildingWidth: 0,
        buildingWidth: 0,
        control: null,
        init: function(b, c, d) {
            this.parent(b, c, d);
            ig.global.wm || (this.ground = ig.game.spawnEntity(EntityGameGround, 0, 438, { bg: this }), ig.game.sortEntitiesDeferred(), this.farBuildingWidth = this.farBuildingImage.data.width + this.farBuildingRepeatSpacing, this.buildingWidth = this.buildingImage.data.width + this.buildingRepeatSpacing, this.ground.repeatWidth = this.ground.groundImage.data.width + this.ground.repeatSpacing, this.farBuildingRepeats = 2 + Math.ceil(ig.system.width / this.farBuildingWidth),
                this.buildingRepeats = 2 + Math.ceil(ig.system.width / this.buildingWidth), this.ground.repeats = 2 + Math.ceil(ig.system.width / this.ground.repeatWidth))
        },
        update: function() {
            this.parent();
            this.control.isPaused || (this.curFarBuildingOffset += this.farBuildingScrollSpeed * ig.system.tick, this.curBuildingOffset += this.buildingScrollSpeed * ig.system.tick, this.ground.curOffset += this.ground.scrollSpeed * ig.system.tick, Math.abs(this.curFarBuildingOffset) > this.farBuildingWidth && (this.curFarBuildingOffset = 0 > this.curFarBuildingOffset ?
                this.curFarBuildingOffset + this.farBuildingWidth : this.curFarBuildingOffset - this.farBuildingWidth), Math.abs(this.curBuildingOffset) > this.buildingWidth && (this.curBuildingOffset = 0 > this.curBuildingOffset ? this.curBuildingOffset + this.buildingWidth : this.curBuildingOffset - this.buildingWidth), Math.abs(this.ground.curOffset) > this.ground.repeatWidth && (this.ground.curOffset = 0 > this.ground.curOffset ? this.ground.curOffset + this.ground.repeatWidth : this.ground.curOffset - this.ground.repeatWidth))
        },
        draw: function() {
            this.parent();
            this.skyImage.draw(0, 0);
            for (var b = 0; b < this.farBuildingRepeats; b++) {
                var c = (b - 1) * this.farBuildingWidth,
                    c = c + this.curFarBuildingOffset;
                this.farBuildingImage.draw(-ig.game.screen.x + c, -ig.game.screen.y + 347) }
            for (b = 0; b < this.buildingRepeats; b++) c = (b - 1) * this.buildingWidth, c += this.curBuildingOffset, this.buildingImage.draw(-ig.game.screen.x + c, -ig.game.screen.y + 341)
        }
    });
    EntityGameGround = ig.Entity.extend({
        zIndex: 200,
        groundImage: new ig.Image("media/graphics/game/bg/ground.png"),
        bg: null,
        scrollSpeed: -15,
        curOffset: 0,
        repeats: 1,
        repeatSpacing: 0,
        repeatWidth: 0,
        init: function(b, c, d) { this.parent(b, c, d) },
        draw: function() { this.parent();
            this.size.y = this.groundImage.data.height;
            this.size.x = ig.system.width;
            for (var b = 0; b < this.repeats; b++) {
                var c = (b - 1) * this.repeatWidth,
                    c = c + this.curOffset;
                this.groundImage.draw(-ig.game.screen.x + c, -ig.game.screen.y + this.pos.y) } }
    })
});
ig.baked = !0;
ig.module("game.entities.button-mute").requires("impact.entity").defines(function() {
    EntityButtonMute = ig.Entity.extend({
        zIndex: 550,
        size: { x: 25, y: 25 },
        offset: { x: 0, y: 0 },
        type: ig.Entity.TYPE.B,
        animSheet: new ig.AnimationSheet("media/graphics/game/ui/muteoff.png", 25, 25),
        offSheet: new ig.AnimationSheet("media/graphics/game/ui/muteon.png", 25, 25),
        init: function(b, c, d) { this.parent(b, c, d);
            this.addAnim("idle", 1, [0]); "undefined" == typeof wm && Howler._muted && (this.currentAnim = new ig.Animation(this.offSheet, 1, [0])) },
        clicked: function() {
            ig.game.playerMuted ?
                (ig.game.playerMuted = !1, ig.game.unmute(), console.log("ig.game.unmute"), ig.Sound.enabled = !0, this.currentAnim = new ig.Animation(this.animSheet, 1, [0]), ig.game.playSFX("click")) : (ig.game.playerMuted = !0, ig.game.mute(), console.log("ig.game.mute"), ig.Sound.enabled = !1, this.currentAnim = new ig.Animation(this.offSheet, 1, [0]))
        }
    })
});
ig.baked = !0;
ig.module("game.entities.button-pause").requires("impact.entity").defines(function() { EntityButtonPause = ig.Entity.extend({ zIndex: 550, size: { x: 25, y: 25 }, offset: { x: 0, y: 0 }, type: ig.Entity.TYPE.B, animSheet: new ig.AnimationSheet("media/graphics/game/ui/pause.png", 25, 25), control: null, init: function(b, c, d) { this.parent(b, c, d);
            this.addAnim("idle", 1, [0]) }, clicked: function() { this.control && (ig.game.playSFX("click"), this.control.isPaused ? this.control.unpauseGame() : this.control.pauseGame()) } }) });
ig.baked = !0;
ig.module("game.entities.game-button-mainweapon").requires("impact.entity").defines(function() {
    EntityGameButtonMainweapon = ig.Entity.extend({
        zIndex: 550,
        size: { x: 80, y: 80 },
        type: ig.Entity.TYPE.B,
        drawRelPos: { x: 0, y: 0 },
        control: null,
        mainWeaponIconImages: [new ig.Image("media/graphics/game/ui/icons/rocket.png"), new ig.Image("media/graphics/game/ui/icons/fireball.png"), new ig.Image("media/graphics/game/ui/icons/laser.png")],
        mainWeaponType: 0,
        isWaiting: !1,
        timeWaited: 0,
        waitTime: [5, 5, 10],
        init: function(b, c, d) {
            this.parent(b,
                c, d);
            this.mainWeaponType = this.control.tank.tankType;
            this.refreshDrawRelPos()
        },
        update: function() { this.parent();!ig.game.gamePaused && this.isWaiting && (this.timeWaited += ig.system.tick, this.timeWaited >= this.waitTime[this.mainWeaponType] && this.stopWaiting()) },
        draw: function() {
            this.parent();
            if (this.isWaiting) {
                var b = this.timeWaited / this.waitTime[this.mainWeaponType],
                    c = this.size.x,
                    d = this.size.y * b,
                    e = -ig.game.screen.x + this.pos.x,
                    b = -ig.game.screen.y + this.pos.y + this.size.y * (1 - b);
                ig.system.context.globalAlpha = 0.5;
                ig.system.context.fillStyle = "#00FF00";
                ig.system.context.fillRect(e, b, c, d);
                ig.system.context.globalAlpha = 1
            } else this.mainWeaponIconImages[this.mainWeaponType].draw(-ig.game.screen.x + this.pos.x + this.drawRelPos.x, -ig.game.screen.y + this.pos.y + this.drawRelPos.y)
        },
        refreshDrawRelPos: function() {
            var b = this.mainWeaponIconImages[this.mainWeaponType];
            this.drawRelPos.x = 0.5 * this.size.x - 0.5 * b.data.width;
            this.drawRelPos.y = 0.5 * this.size.y - 0.5 * b.data.height },
        clicked: function() {
            this.isWaiting || (this.control.tank.fireMainWeapon(),
                this.startWaiting(), 0 == this.mainWeaponType ? ig.game.playSFX("tankshoot") : 1 == this.mainWeaponType ? ig.game.playSFX("tankshoot") : 2 == this.mainWeaponType && ig.game.playSFX("laser_beam"))
        },
        startWaiting: function() { this.isWaiting = !0;
            this.timeWaited = 0 },
        stopWaiting: function() { this.isWaiting = !1;
            ig.game.playSFX("reload") }
    })
});
ig.baked = !0;
ig.module("game.entities.game-unit-friendly").requires("impact.entity").defines(function() {
    EntityGameUnitFriendly = ig.Entity.extend({
        zIndex: 200,
        size: { x: 60, y: 60 },
        type: ig.Entity.TYPE.B,
        control: null,
        pointer: null,
        seat: null,
        unitAnimSheets: [new ig.AnimationSheet("media/graphics/game/unit/friend/cat/idle.png", 160, 160), new ig.AnimationSheet("media/graphics/game/unit/friend/panda/idle.png", 160, 160), new ig.AnimationSheet("media/graphics/game/unit/friend/repair/idle.png", 160, 160), new ig.AnimationSheet("media/graphics/game/unit/friend/wolf/idle.png",
            160, 160)],
        unitAnims: [],
        unitDragAnimSheets: [new ig.AnimationSheet("media/graphics/game/unit/friend/cat/drag.png", 160, 160), new ig.AnimationSheet("media/graphics/game/unit/friend/panda/drag.png", 160, 160), new ig.AnimationSheet("media/graphics/game/unit/friend/repair/drag.png", 160, 160), new ig.AnimationSheet("media/graphics/game/unit/friend/wolf/drag.png", 160, 160)],
        unitDragAnims: [],
        unitFireAnimSheets: [new ig.AnimationSheet("media/graphics/game/unit/friend/cat/fire.png", 160, 160), new ig.AnimationSheet("media/graphics/game/unit/friend/panda/fire.png",
            160, 160), new ig.AnimationSheet("media/graphics/game/unit/friend/repair/fire.png", 160, 160), new ig.AnimationSheet("media/graphics/game/unit/friend/wolf/fire.png", 160, 160)],
        unitFireAnims: [],
        unitFireLowAnimSheets: [new ig.AnimationSheet("media/graphics/game/unit/friend/cat/fire-low.png", 160, 160), new ig.AnimationSheet("media/graphics/game/unit/friend/panda/fire.png", 160, 160), new ig.AnimationSheet("media/graphics/game/unit/friend/repair/fire.png", 160, 160), new ig.AnimationSheet("media/graphics/game/unit/friend/wolf/fire.png",
            160, 160)],
        unitFireLowAnims: [],
        unitFireHighAnimSheets: [new ig.AnimationSheet("media/graphics/game/unit/friend/cat/fire-high.png", 160, 160), new ig.AnimationSheet("media/graphics/game/unit/friend/panda/fire.png", 160, 160), new ig.AnimationSheet("media/graphics/game/unit/friend/repair/fire.png", 160, 160), new ig.AnimationSheet("media/graphics/game/unit/friend/wolf/fire.png", 160, 160)],
        unitFireHighAnims: [],
        unitFireAnim: null,
        barrelPos: [{ x: 106, y: 89 }, { x: 111, y: 55 }, { x: 0, y: 0 }, { x: 109, y: 91 }],
        barrelLowPos: [{ x: 102, y: 96 },
            { x: 111, y: 55 }, { x: 0, y: 0 }, { x: 109, y: 91 }
        ],
        barrelHighPos: [{ x: 107, y: 79 }, { x: 111, y: 55 }, { x: 0, y: 0 }, { x: 109, y: 91 }],
        refireRate: [1, 0.5, 4, 6],
        refireDelay: [],
        fireDamage: [13, 60, 5, 5],
        fireRange: 0,
        superMode: !1,
        superRefireRate: [1.2, 0.6, 5, 6],
        superRefireDelay: [],
        superHpDrain: 100,
        superUnitFireAnims: [],
        superUnitFireLowAnims: [],
        superUnitFireHighAnims: [],
        moveVel: { x: 0, y: 0 },
        hp: 1E3,
        maxHp: 1E3,
        baseHpDrain: 50,
        unitType: 0,
        relDrawPos: { x: 0, y: 0 },
        pointerRelPos: { x: 0, y: 0 },
        preDragPos: { x: 0, y: 0 },
        isDragging: !1,
        isDying: !1,
        isFiring: !1,
        hasShot: !1,
        lastShotTime: -10,
        dieTime: 0,
        spawnTime: 0,
        alpha: 1,
        init: function(b, c, d) {
            this.parent(b, c, d);
            for (b = 0; b < this.unitAnimSheets.length; b++) this.unitAnims.push(new ig.Animation(this.unitAnimSheets[b], 0.2, [0, 1, 2]));
            for (b = 0; b < this.unitDragAnimSheets.length; b++) this.unitDragAnims.push(new ig.Animation(this.unitDragAnimSheets[b], 1, [0]));
            for (b = 0; b < this.unitFireAnimSheets.length; b++) this.unitFireAnims.push(new ig.Animation(this.unitFireAnimSheets[b], 0.1, [0, 1, 2]));
            this.unitFireAnims[3].frameTime = 0.05;
            for (b = 0; b < this.unitFireLowAnimSheets.length; b++) this.unitFireLowAnims.push(new ig.Animation(this.unitFireLowAnimSheets[b],
                0.1, [0, 1, 2]));
            this.unitFireLowAnims[3].frameTime = 0.05;
            for (b = 0; b < this.unitFireHighAnimSheets.length; b++) this.unitFireHighAnims.push(new ig.Animation(this.unitFireHighAnimSheets[b], 0.1, [0, 1, 2]));
            this.unitFireHighAnims[3].frameTime = 0.05;
            for (b = 0; b < this.refireRate.length; b++) this.refireDelay.push(1 / this.refireRate[b]);
            this.superUnitFireAnims.push(new ig.Animation(this.unitFireAnimSheets[0], 0.1, [0, 1, 2]));
            this.superUnitFireAnims.push(new ig.Animation(this.unitFireAnimSheets[1], 0.1, [0, 1, 2]));
            this.superUnitFireAnims.push(new ig.Animation(this.unitFireAnimSheets[2],
                0.05, [0, 1, 2]));
            this.superUnitFireAnims.push(new ig.Animation(this.unitFireAnimSheets[3], 0.0375, [0, 1, 2]));
            this.superUnitFireLowAnims.push(new ig.Animation(this.unitFireLowAnimSheets[0], 0.1, [0, 1, 2]));
            this.superUnitFireLowAnims.push(new ig.Animation(this.unitFireLowAnimSheets[1], 0.1, [0, 1, 2]));
            this.superUnitFireLowAnims.push(new ig.Animation(this.unitFireLowAnimSheets[2], 0.05, [0, 1, 2]));
            this.superUnitFireLowAnims.push(new ig.Animation(this.unitFireLowAnimSheets[3], 0.0375, [0, 1, 2]));
            this.superUnitFireHighAnims.push(new ig.Animation(this.unitFireHighAnimSheets[0],
                0.1, [0, 1, 2]));
            this.superUnitFireHighAnims.push(new ig.Animation(this.unitFireHighAnimSheets[1], 0.1, [0, 1, 2]));
            this.superUnitFireHighAnims.push(new ig.Animation(this.unitFireHighAnimSheets[2], 0.05, [0, 1, 2]));
            this.superUnitFireHighAnims.push(new ig.Animation(this.unitFireHighAnimSheets[3], 0.0375, [0, 1, 2]));
            for (b = 0; b < this.superRefireRate.length; b++) this.superRefireDelay.push(1 / this.superRefireRate[b]);
            this.pos.x -= 0.5 * this.size.x;
            this.pos.y -= 0.5 * this.size.y;
            this.relDrawPos.x = 0.5 * -(this.unitAnims[this.unitType].sheet.width -
                this.size.x);
            this.relDrawPos.y = 0.5 * -(this.unitAnims[this.unitType].sheet.height - this.size.y)
        },
        update: function() {
            this.parent();
            if (!ig.game.gamePaused) {
                if (this.isDying) this.alpha -= 0.5 * ig.system.tick, 0 > this.alpha && (this.alpha = 0), this.pos.x += this.moveVel.x * ig.system.tick, this.pos.y += this.moveVel.y * ig.system.tick, 2 < this.control.gameTime - this.dieTime && this.kill();
                else if (this.isDragging) this.unitDragAnims[this.unitType].update();
                else if (this.isFiring) {
                    this.unitFireAnim && this.unitFireAnim.update();
                    this.hp -=
                        this.baseHpDrain * ig.system.tick;
                    if (0 >= this.hp) { this.hp = 0;
                        this.seat.unit = null;
                        this.seat.drawTarget = !0;
                        this.die();
                        return }
                    if (1 <= this.unitFireAnim.loopCount) {
                        var b = this.refireDelay[this.unitType];
                        this.superMode && (b = this.superRefireDelay[this.unitType]);
                        this.control.gameTime - this.lastShotTime > b ? this.shoot() : (this.isFiring = !1, this.unitAnims[this.unitType].rewind()) }
                } else {
                    this.unitAnims[this.unitType].update();
                    this.hp = this.superMode ? this.hp - this.superHpDrain * ig.system.tick : this.hp - this.baseHpDrain * ig.system.tick;
                    if (0 >= this.hp) { this.hp = 0;
                        this.seat.unit = null;
                        this.seat.drawTarget = !0;
                        this.die();
                        return }
                    b = this.refireDelay[this.unitType];
                    this.superMode && (b = this.superRefireDelay[this.unitType]);
                    this.control.gameTime - this.lastShotTime > b && this.shoot()
                }
                this.isDragging && (this.pos.x = this.pointer.pos.x + this.pointerRelPos.x, this.pos.y = this.pointer.pos.y + this.pointerRelPos.y)
            }
        },
        draw: function() {
            this.parent();
            var b = -ig.game.screen.x + this.pos.x + this.relDrawPos.x,
                c = -ig.game.screen.y + this.pos.y + this.relDrawPos.y;
            this.isDragging ?
                this.unitDragAnims[this.unitType].draw(b, c) : this.isFiring ? this.unitFireAnim && this.unitFireAnim.draw(b, c) : (this.isDying && (ig.system.context.globalAlpha = this.alpha), this.unitAnims[this.unitType].draw(b, c), this.isDying && (ig.system.context.globalAlpha = 1))
        },
        clicked: function(b) {
            !ig.game.gamePaused && (!this.isDying && this.touches(b)) && (this.isDragging = !0, this.pointer = b, this.preDragPos.x = this.pos.x, this.preDragPos.y = this.pos.y, this.pointerRelPos.x = this.pos.x - this.pointer.pos.x, this.pointerRelPos.y = this.pos.y -
                this.pointer.pos.y, this.control.tank.showTargets(), this.zIndex += 1E3, ig.game.sortEntitiesDeferred())
        },
        released: function() {
            if (this.isDragging) {
                this.pos.x = this.pointer.pos.x + this.pointerRelPos.x;
                this.pos.y = this.pointer.pos.y + this.pointerRelPos.y;
                for (var b = !0, c = null, d = null, e = this.pos.x, g = this.pos.y, j = this.pos.x + this.size.x, q = this.pos.y + this.size.y, n = 0; n < this.control.tank.seats.length; n++) {
                    var r = this.control.tank.seats[n],
                        v = r.pos.x,
                        z = r.pos.y,
                        l = r.pos.x + r.size.x,
                        m = r.pos.y + r.size.y;
                    if (e < l && (j > v && g < m && q > z) &&
                        (b = l - e, j < l && (b = j - v), v = m - g, q < m && (v = q - z), z = b * v, b = !1, !c || z > c.area)) c = { seat: r, area: z }
                }
                if (b) {
                    if (this.pos.x >= this.preDragPos.x + this.size.x || this.pos.x + this.size.x <= this.preDragPos.x || this.pos.y >= this.preDragPos.y + this.size.y || this.pos.y + this.size.y <= this.preDragPos.y) { this.seat.unit = null;
                        this.die();
                        this.control.tank.hideTargets();
                        return } } else c && c.seat != this.seat && (d = c.seat);
                this.isDragging = !1;
                this.pos.x = this.preDragPos.x;
                this.pos.y = this.preDragPos.y;
                this.zIndex -= 1E3;
                ig.game.sortEntitiesDeferred();
                d && (c =
                    d.unit, this.seat.unit = c, null != c && (c.seat = this.seat, c.snapPosToSeat()), d.unit = this, this.seat = d, this.snapPosToSeat());
                this.control.tank.hideTargets()
            }
        },
        snapPosToSeat: function() { this.pos.x = this.seat.pos.x + this.seat.size.x / 2 - this.size.x / 2;
            this.pos.y = this.seat.pos.y + this.seat.size.y / 2 - this.size.y / 2 },
        die: function() {
            this.isDying || (this.isDying = !0, this.isDragging = this.isFiring = !1, this.alpha = 0.5, this.moveVel.x = -15, this.moveVel.y = -100, this.dieTime = this.control.gameTime, this.unitAnims[this.unitType].rewind(),
                this.seat && (this.seat = this.seat.unit = null), ig.game.playSFX("death"))
        },
        kill: function() { this.parent();
            this.seat && (this.seat.unit = null) },
        shoot: function() {
            if (2 == this.unitType) this.control.tank.hp >= this.control.tank.maxHp[this.control.tank.tankType] ? this.isFiring = !1 : (this.control.tank.deferredHealAmt += this.fireDamage[this.unitType], this.unitFireAnim = this.superMode ? this.superUnitFireAnims[this.unitType] : this.unitFireAnims[this.unitType], this.unitFireAnim.rewind(), this.isFiring = !0, this.lastShotTime = this.control.gameTime,
                ig.game.playSFX("repair"));
            else {
                var b = null,
                    c = this.control.enemies,
                    d = 9E5;
                0 < this.fireRange && (d = this.fireRange);
                for (var e = 0, g = 0, e = this.pos.x + this.size.x / 2, g = this.pos.y + this.size.y / 2, j = this.pos.x + this.relDrawPos.x + this.barrelPos[this.unitType].x, q = this.pos.y + this.relDrawPos.y + this.barrelPos[this.unitType].y, n = 0; n < c.length; n++) {
                    var r = c[n],
                        v = r.pos.x + r.size.x / 2,
                        z = r.pos.y + r.size.y / 2;
                    v <= j || (v = (e - v) * (e - v) + (g - z) * (g - z), v < d && (b = r, d = v)) }
                if (null == b) this.isFiring = !1;
                else {
                    e = b.pos.x + b.size.x / 2;
                    g = b.pos.y + b.size.y / 2;
                    b = 0;
                    1 == this.unitType && (b = 1);
                    c = ig.game.spawnEntity(EntityGameBullet, j, q, { control: this.control, bulletType: b });
                    c.sourceType = 1;
                    c.targetType = 2;
                    c.startVel = 500;
                    c.zIndex = this.zIndex - 1;
                    c.damage = this.fireDamage[this.unitType];
                    if (1 == this.unitType) {
                        if (!1 == c.setTargetArc(e, g)) { c.kill();
                            return } } else c.setTarget(e, g);
                    0 == this.unitType && (c = ig.game.spawnEntity(EntityGameBullet, j, q - 1, { control: this.control, bulletType: b }), c.sourceType = 1, c.targetType = 2, c.startVel = 500, c.zIndex = this.zIndex - 1, c.damage = this.fireDamage[this.unitType],
                        c.setTarget(e, g - 1), c.angle -= Math.PI / (45 - 25 * Math.random()), d = Math.cos(c.angle), n = Math.sin(c.angle), c.moveVel.x = d * c.startVel, c.moveVel.y = n * c.startVel, c = ig.game.spawnEntity(EntityGameBullet, j, q + 1, { control: this.control, bulletType: b }), c.sourceType = 1, c.targetType = 2, c.startVel = 500, c.zIndex = this.zIndex - 1, c.damage = this.fireDamage[this.unitType], c.setTarget(e, g + 1), c.angle += Math.PI / (45 - 25 * Math.random()), d = Math.cos(c.angle), n = Math.sin(c.angle), c.moveVel.x = d * c.startVel, c.moveVel.y = n * c.startVel);
                    j = c.angle;
                    this.unitFireAnim =
                        this.superMode ? this.superUnitFireAnims[this.unitType] : this.unitFireAnims[this.unitType];
                    j > Math.PI / 6 && j < Math.PI ? this.unitFireAnim = this.superMode ? this.superUnitFireLowAnims[this.unitType] : this.unitFireLowAnims[this.unitType] : j > Math.PI && j < Math.PI + 5 * Math.PI / 6 && (this.unitFireAnim = this.superMode ? this.superUnitFireHighAnims[this.unitType] : this.unitFireHighAnims[this.unitType]);
                    this.unitFireAnim.rewind();
                    this.isFiring = !0;
                    0 == this.unitType ? ig.game.playSFX("shotgun") : 1 == this.unitType ? ig.game.playSFX("cannon") :
                        2 == this.unitType ? ig.game.playSFX("repair") : 3 == this.unitType && ig.game.playSFX("machinegun");
                    this.lastShotTime = this.control.gameTime;
                    ig.game.sortEntitiesDeferred()
                }
            }
        }
    })
});
ig.baked = !0;
ig.module("game.entities.game-unit-queue").requires("impact.entity", "game.entities.game-unit-friendly").defines(function() {
    EntityGameUnitQueue = ig.Entity.extend({
        zIndex: 550,
        size: { x: 60, y: 60 },
        type: ig.Entity.TYPE.B,
        control: null,
        pointer: null,
        unitAnimSheets: [new ig.AnimationSheet("media/graphics/game/unit/friend/cat/idle.png", 160, 160), new ig.AnimationSheet("media/graphics/game/unit/friend/panda/idle.png", 160, 160), new ig.AnimationSheet("media/graphics/game/unit/friend/repair/idle.png", 160, 160), new ig.AnimationSheet("media/graphics/game/unit/friend/wolf/idle.png",
            160, 160)],
        unitAnims: [],
        unitDragAnimSheets: [new ig.AnimationSheet("media/graphics/game/unit/friend/cat/drag.png", 160, 160), new ig.AnimationSheet("media/graphics/game/unit/friend/panda/drag.png", 160, 160), new ig.AnimationSheet("media/graphics/game/unit/friend/repair/drag.png", 160, 160), new ig.AnimationSheet("media/graphics/game/unit/friend/wolf/drag.png", 160, 160)],
        unitDragAnims: [],
        unitType: 0,
        relDrawPos: { x: 0, y: 0 },
        pointerRelPos: { x: 0, y: 0 },
        preDragPos: { x: 0, y: 0 },
        isDragging: !1,
        isWaiting: !1,
        timeWaited: 0,
        waitTime: 3,
        init: function(b, c, d) {
            this.parent(b, c, d);
            for (b = 0; b < this.unitAnimSheets.length; b++) this.unitAnims.push(new ig.Animation(this.unitAnimSheets[b], 0.2, [0, 1, 2]));
            for (b = 0; b < this.unitDragAnimSheets.length; b++) this.unitDragAnims.push(new ig.Animation(this.unitDragAnimSheets[b], 1, [0]));
            this.relDrawPos.x = 3 - 0.5 * (this.unitAnims[this.unitType].sheet.width - this.size.x);
            this.relDrawPos.y = 8 - 0.5 * (this.unitAnims[this.unitType].sheet.height - this.size.y);
            if (b = ig.game.currentTeam) c = Math.floor(Math.random() * b.length), this.unitType =
                b[c];
            this.preDragPos.x = this.pos.x;
            this.preDragPos.y = this.pos.y
        },
        update: function() { this.parent();
            ig.game.gamePaused || (this.isDragging ? this.unitDragAnims[this.unitType].update() : this.isWaiting ? (this.timeWaited += ig.system.tick, this.timeWaited >= this.waitTime && this.stopWaiting()) : this.unitAnims[this.unitType].update());
            this.isDragging && (this.pos.x = this.pointer.pos.x + this.pointerRelPos.x, this.pos.y = this.pointer.pos.y + this.pointerRelPos.y) },
        draw: function() {
            this.parent();
            if (this.isDragging) this.unitDragAnims[this.unitType].draw(this.pos.x +
                this.relDrawPos.x, this.pos.y + this.relDrawPos.y);
            else if (this.isWaiting) {
                var b = this.timeWaited / this.waitTime,
                    c = this.size.x,
                    d = this.size.y * b,
                    e = -ig.game.screen.x + this.pos.x,
                    b = -ig.game.screen.y + this.pos.y + this.size.y * (1 - b);
                ig.system.context.globalAlpha = 0.5;
                ig.system.context.fillStyle = "#00FF00";
                ig.system.context.fillRect(e, b, c, d);
                ig.system.context.globalAlpha = 1 } else this.unitAnims[this.unitType].draw(-ig.game.screen.x + this.pos.x + this.relDrawPos.x, -ig.game.screen.y + this.pos.y + this.relDrawPos.y)
        },
        clicked: function(b) {
            !ig.game.gamePaused &&
                (!this.isWaiting && this.touches(b)) && (this.isDragging = !0, this.pointer = b, this.pointerRelPos.x = this.pos.x - this.pointer.pos.x, this.pointerRelPos.y = this.pos.y - this.pointer.pos.y, this.control.tank.showTargets(), this.zIndex = 1550, ig.game.sortEntitiesDeferred())
        },
        released: function() {
            if (this.isDragging) {
                this.pos.x = this.pointer.pos.x + this.pointerRelPos.x;
                this.pos.y = this.pointer.pos.y + this.pointerRelPos.y;
                for (var b = !0, c = null, d = this.pos.x, e = this.pos.y, g = this.pos.x + this.size.x, j = this.pos.y + this.size.y, q = 0; q < this.control.tank.seats.length; q++) {
                    var n =
                        this.control.tank.seats[q],
                        r = n.pos.x,
                        v = n.pos.y,
                        z = n.pos.x + n.size.x,
                        l = n.pos.y + n.size.y;
                    if (d < z && (g > r && e < l && j > v) && (b = z - d, g < z && (b = g - r), r = l - e, j < l && (r = j - v), v = b * r, b = !1, !c || v > c.area)) c = { seat: n, area: v }
                }
                if (b) {
                    if (this.pos.x >= this.preDragPos.x + this.size.x || this.pos.x + this.size.x <= this.preDragPos.x || this.pos.y >= this.preDragPos.y + this.size.y || this.pos.y + this.size.y <= this.preDragPos.y) c = ig.game.spawnEntity(EntityGameUnitFriendly, this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2, { control: this.control, unitType: this.unitType }),
                        c.zIndex = this.zIndex, c.die(), this.startWaiting()
                } else c && (n = c.seat, n.spawnUnit(this.unitType), this.startWaiting(), this.control.tank.checkUnitMatches(), this.control.hideGuide());
                this.isDragging = !1;
                this.pos.x = this.preDragPos.x;
                this.pos.y = this.preDragPos.y;
                this.control.tank.hideTargets();
                this.zIndex = 550;
                ig.game.sortEntitiesDeferred()
            }
        },
        startWaiting: function() { this.isWaiting = !0;
            this.timeWaited = 0 },
        stopWaiting: function() {
            this.isWaiting = !1;
            var b = ig.game.currentTeam;
            if (b) {
                var c = Math.floor(Math.random() * b.length);
                this.unitType = b[c]
            }
            ig.game.playSFX("reload")
        }
    })
});
ig.baked = !0;
ig.module("game.entities.game-ui").requires("impact.entity", "game.entities.button-mute", "game.entities.button-pause", "game.entities.game-button-mainweapon", "game.entities.game-unit-queue", "game.entities.howtoplay").defines(function() {
    EntityGameUi = ig.Entity.extend({
        zIndex: 500,
        control: null,
        front: null,
        topBarImage: new ig.Image("media/graphics/game/ui/topbar.png"),
        bottomBarBackImage: new ig.Image("media/graphics/game/ui/bottombarback.png"),
        muteButton: null,
        pauseButton: null,
        mainweaponButton: null,
        unitQueues: [],
        distanceText: "0",
        coinText: "0",
        init: function(b, c, d) {
            this.parent(b, c, d);
            ig.global.wm || (this.front = ig.game.spawnEntity(EntityGameUiFront, 0, 0, { back: this }), this.muteButton = ig.game.spawnEntity(EntityButtonMute, 420, 8), this.pauseButton = ig.game.spawnEntity(EntityButtonPause, 450, 8, { control: this.control }), this.mainweaponButton = ig.game.spawnEntity(EntityGameButtonMainweapon, 369, 531, { control: this.control }), this.unitQueues.push(ig.game.spawnEntity(EntityGameUnitQueue, 30, 550, { control: this.control })), this.unitQueues.push(ig.game.spawnEntity(EntityGameUnitQueue,
                132, 550, { control: this.control })), this.unitQueues.push(ig.game.spawnEntity(EntityGameUnitQueue, 230, 550, { control: this.control })), ig.game.sortEntitiesDeferred())
        },
        update: function() { this.parent();
            this.distanceText = Math.floor(this.control.distanceTravelled).toString();
            this.coinText = Math.floor(this.control.coinsCollected).toString() },
        draw: function() {
            this.parent();
            this.topBarImage.draw(-ig.game.screen.x + 0, -ig.game.screen.y + 0);
            ig.system.context.fillStyle = "#FFFFFF";
            ig.system.context.font = "10px avenger";
            str =
                "km";
            var b = ig.system.context.measureText(str).width,
                c = ig.system.context.measureText("m").width,
                b = -ig.game.screen.x + 378,
                c = -ig.game.screen.y + 18 + c;
            ig.system.context.fillText(str, b, c);
            ig.system.context.font = "16px avenger_bold";
            str = this.distanceText;
            b = ig.system.context.measureText(str).width;
            c = ig.system.context.measureText("m").width;
            b = -ig.game.screen.x + 377 - b;
            c = -ig.game.screen.y + 13 + c;
            ig.system.context.fillText(str, b, c);
            ig.system.context.font = "16px avenger_bold";
            str = this.coinText;
            b = ig.system.context.measureText(str).width;
            c = ig.system.context.measureText("m").width;
            b = -ig.game.screen.x + 292 - b;
            c = -ig.game.screen.y + 13 + c;
            ig.system.context.fillText(str, b, c);
            this.bottomBarBackImage.draw(-ig.game.screen.x + 0, -ig.game.screen.y + 515);
            var d = this.control.tank.hp / this.control.tank.maxHp[this.control.tank.tankType],
                b = -ig.game.screen.x + 40,
                c = -ig.game.screen.y + 16;
            ig.system.context.fillStyle = 0.25 > d ? "#FF0000" : 0.5 > d ? "#FFFF00" : "#00FF00";
            ig.system.context.fillRect(b, c, 158 * d, 10)
        }
    });
    EntityGameUiFront = ig.Entity.extend({
        zIndex: 600,
        back: null,
        control: null,
        bottomBarFrontImage: new ig.Image("media/graphics/game/ui/bottombarfront.png"),
        guideImage: new ig.Image("media/graphics/game/ui/guide1.png"),
        handImage: new ig.Image("media/graphics/game/ui/finger.png"),
        showGuide: !0,
        guideStartTime: 0,
        handOffsetY: 0,
        init: function(b, c, d) { this.parent(b, c, d);
            this.control = this.back.control },
        draw: function() {
            this.parent();
            this.bottomBarFrontImage.draw(-ig.game.screen.x + 0, -ig.game.screen.y + 515);
            var b = 200,
                c = ig.system.height,
                d = -ig.game.screen.x + ig.system.width,
                e = -ig.game.screen.y;
            ig.system.context.fillStyle = "#000000";
            ig.system.context.fillRect(d, e, b, c);
            d = -ig.game.screen.x - 200;
            ig.system.context.fillStyle = "#000000";
            ig.system.context.fillRect(d, e, b, c);
            b = ig.system.width + 400;
            c = 200;
            e = -ig.game.screen.y - 200;
            ig.system.context.fillStyle = "#000000";
            ig.system.context.fillRect(d, e, b, c);
            e = -ig.game.screen.y + ig.system.height + 200;
            ig.system.context.fillStyle = "#000000";
            ig.system.context.fillRect(d, e, b, c);
            this.showGuide && (this.guideImage.draw(-ig.game.screen.x + 118, -ig.game.screen.y + 282), d = -ig.game.screen.x +
                138, e = -ig.game.screen.y + 577 + this.handOffsetY, this.handImage.draw(-ig.game.screen.x + d, -ig.game.screen.y + e))
        },
        update: function() { this.parent();
            if (this.showGuide) {
                var b = this.control.gameTime - this.guideStartTime;
                1 >= b ? this.handOffsetY = -300 * b : 2 <= b && (this.guideStartTime = this.control.gameTime) } }
    });
    EntityGameUIPause = ig.Entity.extend({
        zIndex: 700,
        control: null,
        pointer: null,
        bgImage: new ig.Image("media/graphics/game/ui/menubg.jpg"),
        bg2Image: new ig.Image("media/graphics/game/ui/menubg2.png"),
        titleImage: new ig.Image("media/graphics/game/ui/pausetitle.png"),
        replayImage: new ig.Image("media/graphics/game/ui/replay.png"),
        homeImage: new ig.Image("media/graphics/game/ui/home.png"),
        howtoplayImage: new ig.Image("media/graphics/game/ui/howtoplay.png"),
        backImage: new ig.Image("media/graphics/game/ui/back.png"),
        bgPos: { x: 0, y: 0 },
        bg2Pos: { x: 0, y: 0 },
        titlePos: { x: 153, y: 60 },
        replayBox: { x: 94, y: 172, w: 314, h: 75 },
        homeBox: { x: 94, y: 250, w: 314, h: 75 },
        howtoplayBox: { x: 94, y: 329, w: 314, h: 75 },
        backBox: { x: 94, y: 407, w: 314, h: 75 },
        init: function(b, c, d) {
            this.parent(b, c, d);
            1 < ig.game.getEntitiesByType(EntityGameUIPause).length &&
                this.kill()
        },
        ready: function() {
            var b = ig.game.getEntitiesByType(EntityPointer);
            0 < b.length && (this.pointer = b[0]);
            b = this.pos.x;
            this.pos.x = ig.system.width + b;
            this.tween({ pos: { x: b } }, 0.5, { easing: ig.Tween.Easing.Elastic.EaseOut }).start() },
        draw: function() {
            this.parent();
            this.bgImage.draw(this.bgPos.x, this.bgPos.y);
            this.bg2Image.draw(this.pos.x + this.bg2Pos.x, this.pos.y + this.bg2Pos.y);
            this.titleImage.draw(this.pos.x + this.titlePos.x, this.pos.y + this.titlePos.y);
            this.replayImage.draw(this.pos.x + this.replayBox.x, this.pos.y +
                this.replayBox.y);
            this.homeImage.draw(this.pos.x + this.homeBox.x, this.pos.y + this.homeBox.y);
            this.howtoplayImage.draw(this.pos.x + this.howtoplayBox.x, this.pos.y + this.howtoplayBox.y);
            this.backImage.draw(this.pos.x + this.backBox.x, this.pos.y + this.backBox.y)
        },
        update: function() { this.parent();
            ig.input.released("click") && this.released() },
        released: function() {
            var b = { x1: this.pointer.pos.x, y1: this.pointer.pos.y, x2: this.pointer.pos.x + this.pointer.size.x, y2: this.pointer.pos.y + this.pointer.size.y },
                c = {
                    x1: this.backBox.x,
                    y1: this.backBox.y,
                    x2: this.backBox.x + this.backBox.w,
                    y2: this.backBox.y + this.backBox.h
                };
            this.aabbCheck(b, c) ? (this.tween({ pos: { x: ig.system.width } }, 0.5, { easing: ig.Tween.Easing.Elastic.EaseIn, entity: this, onComplete: function() { this.entity.control.unpauseGame() } }).start(), ig.game.playSFX("click")) : (c = { x1: this.replayBox.x, y1: this.replayBox.y, x2: this.replayBox.x + this.replayBox.w, y2: this.replayBox.y + this.replayBox.h }, this.aabbCheck(b, c) ? (this.control.unpauseGame(), ig.game.director.loadLevel(ig.game.director.currentLevel),
                ig.game.playSFX("click"), ig.game.playSFX("click")) : (c = { x1: this.homeBox.x, y1: this.homeBox.y, x2: this.homeBox.x + this.homeBox.w, y2: this.homeBox.y + this.homeBox.h }, this.aabbCheck(b, c) ? (this.control.unpauseGame(), ig.game.director.loadLevel(1), ig.game.playSFX("click")) : (c = { x1: this.howtoplayBox.x, y1: this.howtoplayBox.y, x2: this.howtoplayBox.x + this.howtoplayBox.w, y2: this.howtoplayBox.y + this.howtoplayBox.h }, this.aabbCheck(b, c) && (ig.game.spawnEntity(EntityHowtoplay, 0, 0, { control: this.control }).ready(), ig.game.playSFX("click")))))
        },
        aabbCheck: function(b, c) {
            return b.x1 < c.x2 && b.x2 > c.x1 && b.y1 < c.y2 && b.y2 > c.y1 ? !0 : !1 }
    })
});
ig.baked = !0;
ig.module("game.entities.game-tank-seat").requires("impact.entity").defines(function() {
    EntityGameTankSeat = ig.Entity.extend({
        zIndex: 150,
        size: { x: 60, y: 60 },
        type: ig.Entity.TYPE.B,
        control: null,
        seatImage: new ig.Image("media/graphics/game/tank/seat.png"),
        seatRedImage: new ig.Image("media/graphics/game/tank/seat-red.png"),
        targetImage: new ig.Image("media/graphics/game/ui/target.png"),
        unit: null,
        posOffsetX: 0,
        posOffsetY: 0,
        isBumped: !1,
        drawTarget: !0,
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.pos.x -= 0.5 * this.size.x;
            this.pos.y -= 0.5 * this.size.y
        },
        update: function() { this.parent() },
        draw: function() {
            this.parent();
            var b = -ig.game.screen.x + this.pos.x + 0.5 * (this.size.x - this.seatImage.data.width),
                c = -ig.game.screen.y + this.pos.y + this.size.y - 2;
            this.drawBar(b + 19, c + 7, this.seatImage.data.width - 36, this.seatImage.data.height - 14);
            2 != this.control.tank.tankType ? this.seatImage.draw(b, c) : this.seatRedImage.draw(b, c);
            this.drawTarget && (b = -ig.game.screen.x + this.pos.x + 0.5 * (this.size.x - this.targetImage.data.width), c = -ig.game.screen.y + this.pos.y +
                0.5 * (this.size.y - this.targetImage.data.height), this.targetImage.draw(b, c))
        },
        drawBar: function(b, c, d, e) { ig.system.context.fillStyle = "#999999";
            ig.system.context.fillRect(b, c, d, e);
            if (this.unit) {
                var g = this.unit.hp / this.unit.maxHp;
                0 < g && (ig.system.context.fillStyle = 0.5 < g ? "#00FF00" : 0.2 < g ? "#FFFF00" : "#FF0000", ig.system.context.fillRect(b, c, d * g, e)) } },
        bump: function(b, c) {
            this.isBumped || (this.isBumped = !0, this.posOffsetX = b, this.posOffsetY = c, this.pos.x += b, this.pos.y += c, this.unit && (this.unit.pos.x = this.pos.x + this.size.x /
                2 - this.unit.size.x / 2, this.unit.pos.y = this.pos.y + this.size.y / 2 - this.unit.size.y / 2))
        },
        unbump: function() { this.isBumped && (this.isBumped = !1, this.pos.y -= this.posOffsetY, this.pos.x -= this.posOffsetX, this.unit && (this.unit.pos.x = this.pos.x + this.size.x / 2 - this.unit.size.x / 2, this.unit.pos.y = this.pos.y + this.size.y / 2 - this.unit.size.y / 2)) },
        movePos: function(b, c) { this.pos.x += b;
            this.pos.y += c;
            this.unit && (this.unit.pos.x += b, this.unit.pos.y += c) },
        spawnUnit: function(b) {
            this.unit && this.unit.die();
            this.unit = ig.game.spawnEntity(EntityGameUnitFriendly,
                this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2, { control: this.control, seat: this, unitType: b });
            this.unit.spawnTime = this.control.gameTime;
            this.control.tank.rearrangeSeatUnitZIndex()
        }
    })
});
ig.baked = !0;
ig.module("game.entities.game-tank").requires("impact.entity", "game.entities.game-tank-seat").defines(function() {
    EntityGameTank = ig.Entity.extend({
        zIndex: 100,
        size: { x: 240, y: 120 },
        relDrawPos: { x: 0, y: 0 },
        control: null,
        tankIdleAnim: [new ig.Animation(new ig.AnimationSheet("media/graphics/game/tank/tank1/idle.png", 438, 375), 0.2, [0, 1]), new ig.Animation(new ig.AnimationSheet("media/graphics/game/tank/tank2/idle.png", 438, 375), 0.2, [0, 1]), new ig.Animation(new ig.AnimationSheet("media/graphics/game/tank/tank3/idle.png",
            438, 375), 0.2, [0, 1])],
        tankShootAnim: [new ig.Animation(new ig.AnimationSheet("media/graphics/game/tank/tank1/fire.png", 438, 375), 0.2, [0, 1, 2, 3]), new ig.Animation(new ig.AnimationSheet("media/graphics/game/tank/tank2/fire.png", 438, 375), 0.2, [0, 1, 2, 3]), new ig.Animation(new ig.AnimationSheet("media/graphics/game/tank/tank3/fire.png", 438, 375), 0.2, [0, 1, 2, 3])],
        barrelPos: [{ x: 349, y: 175 }, { x: 391, y: 105 }, { x: 294, y: 154 }],
        fireDamage: [500, 500, 600, 500],
        bulletType: [1, 5, 6],
        bulletStartVel: [250, 250, 0],
        tankType: 0,
        hp: 1E3,
        maxHp: [1E3,
            1200, 1500
        ],
        defence: [0, 1, 2],
        seats: [],
        seatPos: [{ x: 160, y: 70 }, { x: 242, y: 135 }, { x: 150, y: 193 }],
        isFiring: !1,
        hoverOffset: { x: 0, y: 0 },
        minHover: { x: -5, y: 0 },
        maxHover: { x: 5, y: 0 },
        hoverDirection: { x: 2, y: 0 },
        deferredHealAmt: 0,
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.relDrawPos.x = 0.5 * -(this.tankIdleAnim[this.tankType].sheet.width - this.size.x);
            this.relDrawPos.y = -75 - 0.5 * (this.tankIdleAnim[this.tankType].sheet.height - this.size.y);
            if (!ig.global.wm) {
                for (d = 0; d < this.seatPos.length; d++) b = this.pos.x + this.seatPos[d].x + this.relDrawPos.x,
                    c = this.pos.y + this.seatPos[d].y + this.relDrawPos.y, this.seats.push(ig.game.spawnEntity(EntityGameTankSeat, b, c, { control: this.control }));
                ig.game.sortEntitiesDeferred()
            }
            this.minHover.x = -5 * Math.random();
            this.maxHover.x = 5 * Math.random();
            0.5 <= Math.random() && (this.hoverDirection.x *= -1);
            this.hp = this.maxHp[this.tankType]
        },
        update: function() {
            this.parent();
            if (!this.control.isPaused) {
                if (this.isFiring)
                    if (this.tankShootAnim[this.tankType].update(), 1 <= this.tankShootAnim[this.tankType].loopCount) this.isFiring = !1;
                    else {
                        for (var b =
                                0; b < this.seats.length; b++) this.seats[b].unbump();
                        0 != this.tankShootAnim[this.tankType].frame && (1 == this.tankShootAnim[this.tankType].frame ? 0 == this.tankType ? (this.seats[0].bump(-24, 6), this.seats[1].bump(-24, 6), this.seats[2].bump(0, 6)) : 1 == this.tankType ? (this.seats[0].bump(-19, 6), this.seats[1].bump(-19, 6), this.seats[2].bump(0, 6)) : 2 == this.tankType && (this.seats[0].bump(-20, 0), this.seats[1].bump(-20, 0), this.seats[2].bump(0, 3)) : 2 == this.tankShootAnim[this.tankType].frame ? 0 == this.tankType ? (this.seats[0].bump(-11,
                            6), this.seats[1].bump(-11, 6)) : 1 == this.tankType ? (this.seats[0].bump(-10, 0), this.seats[1].bump(-10, 0)) : 2 == this.tankType && (this.seats[0].bump(-12, 0), this.seats[1].bump(-12, 0)) : 3 == this.tankShootAnim[this.tankType].frame && (0 == this.tankType ? this.seats[2].bump(0, 6) : 1 == this.tankType ? (this.seats[0].bump(-5, 5), this.seats[1].bump(-5, 5), this.seats[2].bump(0, 6)) : 2 == this.tankType && (this.seats[0].bump(-5, 0), this.seats[1].bump(-5, 0), this.seats[2].bump(0, 3))))
                    }
                if (!this.isFiring) {
                    this.tankIdleAnim[this.tankType].update();
                    for (b = 0; b < this.seats.length; b++) this.seats[b].unbump();
                    if (1 == this.tankIdleAnim[this.tankType].frame)
                        for (b = 0; b < this.seats.length; b++) 2 == b && 2 == this.tankType ? this.seats[b].bump(0, 3) : this.seats[b].bump(0, 6);
                    this.hoverOffset.x += this.hoverDirection.x * ig.system.tick;
                    for (b = 0; b < this.seats.length; b++) this.seats[b].movePos(this.hoverDirection.x * ig.system.tick, 0);
                    this.hoverOffset.x >= this.maxHover.x ? (this.hoverOffset.x = this.maxHover.x, this.hoverDirection.x *= -1, this.minHover.x = -5 * Math.random()) : this.hoverOffset.x <=
                        this.minHover.x && (this.hoverOffset.x = this.minHover.x, this.hoverDirection.x *= -1, this.maxHover.x = 5 * Math.random())
                }
            }
        },
        draw: function() { this.parent();
            var b = -ig.game.screen.x + this.pos.x + this.relDrawPos.x + this.hoverOffset.x,
                c = -ig.game.screen.y + this.pos.y + this.relDrawPos.y + this.hoverOffset.y;
            this.isFiring ? this.tankShootAnim[this.tankType].draw(b, c) : this.tankIdleAnim[this.tankType].draw(b, c) },
        showTargets: function() {
            for (var b = 0; b < this.seats.length; b++) this.seats[b].drawTarget = !0 },
        hideTargets: function() {
            for (var b =
                    0; b < this.seats.length; b++) null != this.seats[b].unit && (this.seats[b].drawTarget = !1)
        },
        rearrangeSeatUnitZIndex: function() {
            for (var b = 200, c = 0; c < this.seats.length; c++) null != this.seats[c].unit && (this.seats[c].unit.zIndex = b, b += 10);
            ig.game.sortEntitiesDeferred() },
        fireMainWeapon: function() {
            this.isFiring = !0;
            this.tankShootAnim[this.tankType].rewind();
            this.tankIdleAnim[this.tankType].rewind();
            for (var b = 0; b < this.seats.length; b++) this.seats[b].unbump();
            var b = this.bulletType[this.tankType],
                c = ig.game.spawnEntity(EntityGameBullet,
                    this.pos.x + this.relDrawPos.x + this.barrelPos[this.tankType].x, this.pos.y + this.relDrawPos.y + this.barrelPos[this.tankType].y, { control: this.control, bulletType: b });
            c.sourceType = 0;
            c.targetType = 2;
            c.startVel = this.bulletStartVel[this.tankType];
            c.zIndex = 99;
            c.damage = this.fireDamage[this.tankType];
            6 != b && !1 == c.setTargetArc(460, 450) ? c.kill() : ig.game.sortEntitiesDeferred()
        },
        takeDamage: function(b) { b -= this.defence[this.tankType];
            0 > b || (this.hp -= b, 0 > this.hp && (this.hp = 0, this.control.endGame())) },
        healDamage: function(b) {
            this.hp +=
                b;
            this.hp > this.maxHp[this.tankType] && (this.hp = this.maxHp[this.tankType])
        },
        checkUnitMatches: function() {
            for (var b = -1, c = 0; c < this.seats.length; c++) {
                var d = this.seats[c];
                if (null != d.unit)
                    if (d = d.unit.unitType, -1 == b) b = d;
                    else {
                        if (b != d) { b = -1;
                            break } }
                else { b = -1;
                    break } }
            if (-1 == b)
                for (c = 0; c < this.seats.length; c++) d = this.seats[c], null != d.unit && (d.unit.superMode = !1);
            else
                for (c = 0; c < this.seats.length; c++) d = this.seats[c], d.unit.hp = d.unit.maxHp, d.unit.superMode = !0 }
    })
});
ig.baked = !0;
ig.module("game.entities.game-effect").requires("impact.entity").defines(function() {
    EntityGameEffect = ig.Entity.extend({
        zIndex: 210,
        size: { x: 1, y: 1 },
        control: null,
        effectAnimSheets: [new ig.AnimationSheet("media/graphics/game/effects/bullethit.png", 150, 150), new ig.AnimationSheet("media/graphics/game/effects/fire.png", 120, 120), new ig.AnimationSheet("media/graphics/game/effects/smoke.png", 80, 80), new ig.AnimationSheet("media/graphics/game/effects/smokered.png", 80, 80), new ig.AnimationSheet("media/graphics/game/effects/smokewhite.png",
            80, 80)],
        effectAnims: [],
        effectType: 0,
        relDrawPos: { x: 0, y: 0 },
        moveVel: { x: 0, y: 0 },
        startVel: 0,
        angle: 0,
        alpha: 1,
        init: function(b, c, d) { this.parent(b, c, d);
            this.effectAnims.push(new ig.Animation(this.effectAnimSheets[0], 0.1, [0, 1, 2, 3]));
            this.effectAnims.push(new ig.Animation(this.effectAnimSheets[1], 0.1, [0, 1]));
            this.setPos(b, c);
            this.relDrawPos.x = 0.5 * -this.effectAnims[this.effectType].sheet.width;
            this.relDrawPos.y = 0.5 * -this.effectAnims[this.effectType].sheet.height;
            this.effectAnims[this.effectType].rewind() },
        update: function() {
            this.parent();
            if (!ig.game.gamePaused)
                if (this.pos.x += this.moveVel.x * ig.system.tick, this.pos.y += this.moveVel.y * ig.system.tick, this.effectAnims[this.effectType].update(), 1 <= this.effectAnims[this.effectType].loopCount) this.kill();
                else {
                    var b = Math.max(this.effectAnims[this.effectType].sheet.width, this.effectAnims[this.effectType].sheet.height);
                    (this.pos.x - b > ig.system.width + 100 || this.pos.y - b > ig.system.height + 100 || -100 > this.pos.x + b || -100 > this.pos.y + b) && this.kill() }
        },
        draw: function() {
            this.parent();
            var b = -ig.game.screen.x +
                this.pos.x + this.relDrawPos.x,
                c = -ig.game.screen.y + this.pos.y + this.relDrawPos.y;
            this.effectAnims[this.effectType].angle = this.angle;
            this.effectAnims[this.effectType].draw(b, c)
        },
        kill: function() { this.parent() },
        setPos: function(b, c) { this.pos.x = b - 0.5 * this.size.x;
            this.pos.y = c - 0.5 * this.size.y }
    })
});
ig.baked = !0;
ig.module("game.entities.game-bullet").requires("impact.entity", "game.entities.game-effect").defines(function() {
    EntityGameBullet = ig.Entity.extend({
        zIndex: 170,
        size: { x: 1, y: 1 },
        control: null,
        bulletAnims: [new ig.Animation(new ig.AnimationSheet("media/graphics/game/bullets/bullet.png", 20, 6), 0.2, [0]), new ig.Animation(new ig.AnimationSheet("media/graphics/game/bullets/rocket.png", 35, 21), 0.2, [0]), new ig.Animation(new ig.AnimationSheet("media/graphics/game/bullets/bulletpig.png", 22, 6), 0.2, [0]), new ig.Animation(new ig.AnimationSheet("media/graphics/game/bullets/bulletpighead.png",
            39, 40), 0.2, [0]), new ig.Animation(new ig.AnimationSheet("media/graphics/game/bullets/bomb.png", 119, 45), 0.2, [0]), new ig.Animation(new ig.AnimationSheet("media/graphics/game/bullets/fireball.png", 106, 72), 0.2, [0]), new ig.Animation(new ig.AnimationSheet("media/graphics/game/bullets/laser.png", 1, 53), 0.2, [0])],
        bulletSpread: [0.09, 0.09, 0.09, 0.09, 0.09, 0.09, 0],
        bulletLifetime: [0, 0, 0, 0, 0, 0, 1],
        shotTime: 0,
        bulletType: 0,
        relDrawPos: { x: 0, y: 0 },
        moveVel: { x: 0, y: 0 },
        startVel: 1E3,
        sourceType: 0,
        targetType: 1,
        targetPos: { x: 0, y: 0 },
        angle: 0,
        hit: !1,
        damage: 5,
        hasGravity: !1,
        gravity: 500,
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.setPos(b, c);
            this.relDrawPos.x = -this.bulletAnims[this.bulletType].sheet.width;
            this.relDrawPos.y = 0.5 * -this.bulletAnims[this.bulletType].sheet.height;
            for (b = 0; b < this.bulletAnims.length; b++) this.bulletAnims[b].pivot.x = this.bulletAnims[b].sheet.width;
            1 == this.bulletType ? (this.size.x = 20, this.size.y = 20, this.relDrawPos.x += 10, this.relDrawPos.y += 10, this.x -= 10, this.y -= 10) : 5 == this.bulletType && (this.size.x = 40, this.size.y =
                40, this.relDrawPos.x += 20, this.relDrawPos.y += 20, this.x -= 30, this.y -= 30);
            this.shotTime = this.control.gameTime
        },
        update: function() {
            this.parent();
            if (!ig.game.gamePaused && !this.hit) {
                this.hasGravity && (this.moveVel.y += this.gravity * ig.system.tick, this.bulletAnims[this.bulletType].flip.y = !1, this.angle = this.getAngleFromVector(), this.angle > 0.5 * Math.PI && this.angle < 1.5 * Math.PI && 3 != this.bulletType && (this.bulletAnims[this.bulletType].flip.y = !0));
                this.pos.x += this.moveVel.x * ig.system.tick;
                this.pos.y += this.moveVel.y *
                    ig.system.tick;
                this.bulletAnims[this.bulletType].update();
                var b = Math.max(this.bulletAnims[this.bulletType].sheet.width, this.bulletAnims[this.bulletType].sheet.height);
                this.pos.x - b > ig.system.width + 100 || this.pos.y - b > ig.system.height + 100 || -100 > this.pos.x + b || -100 > this.pos.y + b ? this.kill() : (this.checkCollisions(), 0 < this.bulletLifetime[this.bulletType] && this.control.gameTime - this.shotTime > this.bulletLifetime[this.bulletType] && this.kill())
            }
        },
        draw: function() {
            this.parent();
            if (6 != this.bulletType) {
                if (!this.hit) {
                    var b = -ig.game.screen.x + this.pos.x + this.relDrawPos.x,
                        c = -ig.game.screen.y + this.pos.y + this.relDrawPos.y;
                    this.bulletAnims[this.bulletType].angle = this.angle;
                    this.bulletAnims[this.bulletType].draw(b, c)
                }
            } else b = this.bulletAnims[this.bulletType].sheet.image.data, ig.system.context.drawImage(b, 0, 0, b.width, b.height, -ig.game.screen.x + this.pos.x, -ig.game.screen.y + this.pos.y - 30, ig.system.width - this.pos.x, 60)
        },
        kill: function() { this.parent() },
        setPos: function(b, c) { this.pos.x = b - 0.5 * this.size.x;
            this.pos.y = c - 0.5 * this.size.y },
        setTarget: function(b, c) {
            this.targetPos.x = b;
            this.targetPos.y = c;
            this.bulletAnims[this.bulletType].flip.y = !1;
            this.angle = this.getAngleToTarget();
            if (0 < this.bulletSpread[this.bulletType]) {
                var d = this.bulletSpread[this.bulletType];
                this.angle = this.angle - d + Math.random() * 2 * d }
            this.angle > 0.5 * Math.PI && this.angle < 1.5 * Math.PI && 3 != this.bulletType && (this.bulletAnims[this.bulletType].flip.y = !0);
            var d = this.targetPos.x - this.pos.x,
                e = this.targetPos.y - this.pos.y,
                g = Math.sqrt(d * d + e * e);
            this.moveVel.x = d / g * this.startVel;
            this.moveVel.y =
                e / g * this.startVel
        },
        setTargetArc: function(b, c, d) {
            this.targetPos.x = b;
            this.targetPos.y = c;
            this.bulletAnims[this.bulletType].flip.y = !1;
            c = this.targetPos.x - this.pos.x;
            var e = -this.gravity,
                g = this.startVel,
                j = Math.sqrt(g * g * g * g - e * (e * c * c + 2 * (this.targetPos.y - this.pos.y) * g * g));
            if (isNaN(j)) return !1;
            b = Math.atan((g * g + j) / (e * c));
            c = Math.atan((g * g - j) / (e * c));
            this.angle = b;
            c > b && (this.angle = c);
            d && b < c && (this.angle = b);
            0 < this.bulletSpread[this.bulletType] && (d = this.bulletSpread[this.bulletType], this.angle = this.angle - d + Math.random() *
                2 * d);
            this.angle > 0.5 * Math.PI && this.angle < 1.5 * Math.PI && 3 != this.bulletType && (this.bulletAnims[this.bulletType].flip.y = !0);
            this.hasGravity = !0;
            d = Math.cos(this.angle);
            b = Math.sin(this.angle);
            this.moveVel.x = d * this.startVel;
            this.moveVel.y = b * this.startVel;
            return !0
        },
        getAngleToTarget: function() {
            var b = this.targetPos.y - this.pos.y,
                c = this.targetPos.x - this.pos.x;
            if (0 == b) {
                if (0 == c || 0 < c) return 0;
                if (0 > c) return Math.PI }
            if (0 == c) {
                if (0 < b) return Math.PI / 2;
                if (0 > b) return 3 * (Math.PI / 2) }
            var d = Math.atan(Math.abs(b / c));
            0 > c && 0 < b &&
                (d = Math.PI - d);
            0 > c && 0 > b && (d = Math.PI + d);
            0 < c && 0 > b && (d = 2 * Math.PI - d);
            return d
        },
        getAngleFromVector: function() {
            var b = this.moveVel.y,
                c = this.moveVel.x;
            if (0 == b) {
                if (0 == c || 0 < c) return 0;
                if (0 > c) return Math.PI }
            if (0 == c) {
                if (0 < b) return Math.PI / 2;
                if (0 > b) return 3 * (Math.PI / 2) }
            var d = Math.atan(Math.abs(b / c));
            0 > c && 0 < b && (d = Math.PI - d);
            0 > c && 0 > b && (d = Math.PI + d);
            0 < c && 0 > b && (d = 2 * Math.PI - d);
            return d },
        checkCollisions: function() {
            if ((2 == this.sourceType || 3 == this.sourceType) && 0 == this.targetType) {
                var b = this.control.tank;
                if (1 == this.bulletType ||
                    3 == this.bulletType || 5 == this.bulletType) this.boxBoxCollision(this.pos.x, this.pos.y, this.size.x, this.size.y, b.pos.x, b.pos.y, b.size.x, b.size.y) && (this.hit = !0, b.takeDamage(this.damage), ig.game.spawnEntity(EntityGameEffect, this.pos.x, this.pos.y, { control: this.control, effectType: 1 }), this.kill(), ig.game.playSFX("softexplosion"));
                else if (this.pointBoxCollision(this.pos.x, this.pos.y, b.pos.x, b.pos.y, b.size.x, b.size.y)) {
                    this.hit = !0;
                    b.takeDamage(this.damage);
                    var c = 0;
                    ig.game.playSFX("hit");
                    ig.game.spawnEntity(EntityGameEffect,
                        this.pos.x, this.pos.y, { control: this.control, effectType: c });
                    this.kill()
                }
            } else if ((0 == this.sourceType || 1 == this.sourceType) && (2 == this.targetType || 3 == this.targetType)) {
                for (var b = this.control.enemies, d = 0; d < b.length; d++) {
                    var e = b[d];
                    if (!e.isDying) {
                        c = 0;
                        if (1 == this.bulletType || 3 == this.bulletType || 5 == this.bulletType) c = 1;
                        if (1 == this.bulletType || 5 == this.bulletType) {
                            if (this.boxBoxCollision(this.pos.x, this.pos.y, this.size.x, this.size.y, e.pos.x, e.pos.y, e.size.x, e.size.y)) {
                                this.hit = !0;
                                e.takeDamage(this.damage);
                                ig.game.spawnEntity(EntityGameEffect,
                                    this.pos.x, this.pos.y, { control: this.control, effectType: c });
                                ig.game.playSFX("softexplosion");
                                if (5 == this.bulletType) {
                                    for (c = 0; c < b.length; c++) e = b[c], c != d && this.boxBoxCollision(this.pos.x - 2 * this.size.x, this.pos.y, 5 * this.size.x, this.size.y, e.pos.x, e.pos.y, e.size.x, e.size.y) && e.takeDamage(this.damage);
                                    this.kill();
                                    return }
                                this.kill()
                            }
                        } else if (6 == this.bulletType) e.takeDamage(this.damage * ig.system.tick);
                        else if (this.pointBoxCollision(this.pos.x, this.pos.y, e.pos.x, e.pos.y, e.size.x, e.size.y)) {
                            this.hit = !0;
                            e.takeDamage(this.damage);
                            ig.game.playSFX("hit");
                            ig.game.spawnEntity(EntityGameEffect, this.pos.x, this.pos.y, { control: this.control, effectType: c });
                            this.kill();
                            return
                        }
                    }
                }
                d = this.control.background.ground;
                if (this.pos.y > d.pos.y + 10)
                    if (1 == this.bulletType || 3 == this.bulletType || 5 == this.bulletType) {
                        ig.game.spawnEntity(EntityGameEffect, this.pos.x, this.pos.y, { control: this.control, effectType: 1 }).zIndex = d.zIndex - 1;
                        if (5 == this.bulletType)
                            for (c = 0; c < b.length; c++) e = b[c], this.boxBoxCollision(this.pos.x - 2 * this.size.x, this.pos.y, 5 * this.size.x, this.size.y,
                                e.pos.x, e.pos.y, e.size.x, e.size.y) && e.takeDamage(this.damage);
                        this.kill();
                        ig.game.playSFX("softexplosion");
                        ig.game.sortEntitiesDeferred()
                    } else this.kill()
            }
        },
        pointBoxCollision: function(b, c, d, e, g, j) {
            return b > d && b < d + g && c > e && c < e + j ? !0 : !1 },
        boxBoxCollision: function(b, c, d, e, g, j, q, n) {
            return b + d > g && b < g + q && c + e > j && c < j + n ? !0 : !1 }
    })
});
ig.baked = !0;
ig.module("game.entities.game-screenshake").requires("impact.entity").defines(function() {
    EntityGameScreenshake = ig.Entity.extend({
        duration: 0.5,
        strength: 5,
        init: function(b, c, d) { this.parent(b, c, d);
            this.initShock();
            1 < ig.game.getEntitiesByType(EntityGameScreenshake).length && this.kill() },
        initShock: function() { this.shockTimer = new ig.Timer;
            this.shockTimer.set(this.duration) },
        resetShock: function() { this.shockTimer = null;
            ig.game.screen.x = 0;
            ig.game.screen.y = 0;
            this.kill() },
        shock: function() {
            var b = this.shockTimer.delta();
            if (-0.2 > b) {
                var c = this.strength * Math.pow(-b / this.duration, 2);
                0.5 < c && (ig.game.screen.x += Math.random().map(0, 1, -c, c), ig.game.screen.y += Math.random().map(0, 1, -c, c)) }
            0 < b && this.resetShock()
        },
        update: function() { this.parent();
            this.shock() },
        draw: function() { this.parent() }
    })
});
ig.baked = !0;
ig.module("game.entities.game-unit-enemy").requires("impact.entity", "game.entities.game-bullet", "game.entities.game-screenshake").defines(function() {
    EntityGameUnitEnemy = ig.Entity.extend({
        zIndex: 190,
        size: { x: 60, y: 60 },
        type: ig.Entity.TYPE.B,
        control: null,
        unitAnimSheets: [new ig.AnimationSheet("media/graphics/game/unit/foe/pig/fire-run.png", 160, 160), new ig.AnimationSheet("media/graphics/game/unit/foe/cow/fire-run.png", 160, 160), new ig.AnimationSheet("media/graphics/game/unit/foe/monkey/fire-run.png", 160,
            160), new ig.AnimationSheet("media/graphics/game/unit/foe/plane/idle.png", 190, 118), new ig.AnimationSheet("media/graphics/game/bullets/bomb.png", 119, 45)],
        unitAnims: [],
        barrelPos: [{ x: 45, y: 86 }, { x: 33, y: 14 }, { x: 27, y: 81 }, { x: 99, y: 89 }, { x: 0, y: 0 }],
        fireDamage: [5, 5, 5, 10, 0],
        ramDamage: [20, 20, 20, 20, 50],
        fireRange: 0,
        hp: 150,
        maxHp: 150,
        unitType: 0,
        relDrawPos: { x: 0, y: 0 },
        moveVel: { x: 0, y: 0 },
        hasShot: !1,
        isDead: !1,
        isDying: !1,
        dieTime: 0,
        hoverOffset: { x: 0, y: 0 },
        minHover: { x: 0, y: 0 },
        maxHover: { x: 0, y: 0 },
        hoverDirection: { x: 0, y: 0 },
        alpha: 1,
        spawnTime: 0,
        difficulty: 0,
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.unitAnims.push(new ig.Animation(this.unitAnimSheets[0], 0.2, [0, 1, 2, 3]));
            this.unitAnims.push(new ig.Animation(this.unitAnimSheets[1], 0.2, [0, 1, 2, 3]));
            this.unitAnims.push(new ig.Animation(this.unitAnimSheets[2], 0.2, [0, 1, 2, 3]));
            this.unitAnims.push(new ig.Animation(this.unitAnimSheets[3], 1, [0, 1]));
            this.unitAnims.push(new ig.Animation(this.unitAnimSheets[4], 1, [0]));
            this.setPos(b, c);
            this.relDrawPos.x = 0.5 * -(this.unitAnims[this.unitType].sheet.width -
                this.size.x);
            this.relDrawPos.y = 0.5 * -(this.unitAnims[this.unitType].sheet.height - this.size.y);
            3 == this.unitType && (this.maxHp = this.hp = 120);
            4 == this.unitType ? (this.maxHp = this.hp = 20, this.zIndex = 170) : 3 == this.unitType && (this.zIndex = 170)
        },
        update: function() {
            this.parent();
            if (!ig.game.gamePaused)
                if (this.isDying) this.alpha -= 0.5 * ig.system.tick, 0 > this.alpha && (this.alpha = 0), this.pos.x += this.moveVel.x * ig.system.tick, this.pos.y += this.moveVel.y * ig.system.tick, 2 < this.control.gameTime - this.dieTime && this.kill();
                else if (this.pos.x +=
                this.moveVel.x * ig.system.tick, this.pos.y += this.moveVel.y * ig.system.tick, 4 == this.unitType && (this.moveVel.y += 100 * ig.system.tick), 3 != this.unitType && this.unitAnims[this.unitType].update(), 0 >= this.hp) this.hp = 0, this.die();
            else if (0 > this.pos.x + this.relDrawPos.x + this.unitAnims[this.unitType].sheet.image.width) this.kill();
            else if (3 == this.unitType) {
                if (0 == this.unitAnims[this.unitType].frame && 300 >= this.pos.x) {
                    this.unitAnims[this.unitType].gotoFrame(1);
                    var b = this.pos.x + this.relDrawPos.x + this.barrelPos[this.unitType].x,
                        c = this.pos.y + this.relDrawPos.y + this.barrelPos[this.unitType].y,
                        d = ig.game.spawnEntity(EntityGameUnitEnemy, 0, 0, { control: this.control, unitType: 4 });
                    d.setPos(b, c);
                    d.unitAnims[4].flip.x = !0;
                    d.moveVel.x = -50;
                    d.moveVel.y = 0;
                    this.control.enemies.push(d)
                }
            } else this.touches(this.control.tank) ? (this.die(), b = this.ramDamage[this.unitType], 0 < this.difficulty && (b += 0.25 * this.difficulty * this.ramDamage[this.unitType]), this.control.tank.takeDamage(b), ig.game.spawnEntity(EntityGameEffect, this.pos.x + this.size.x / 2, this.pos.y +
                this.size.y / 2, { control: this.control, effectType: 1 }), ig.game.spawnEntity(EntityGameScreenshake, 0, 0), ig.game.playSFX("screenshake")) : this.hasShot ? 0 != this.unitAnims[this.unitType].frame && (this.hasShot = !1) : 0 == this.unitAnims[this.unitType].frame && (this.shoot(), this.hasShot = !0)
        },
        draw: function() {
            this.parent();
            var b = -ig.game.screen.x + this.pos.x + this.relDrawPos.x,
                c = -ig.game.screen.y + this.pos.y + this.relDrawPos.y;
            this.isDying && (ig.system.context.globalAlpha = this.alpha);
            this.unitAnims[this.unitType].draw(b, c);
            if (this.isDying) ig.system.context.globalAlpha = 1;
            else {
                var d = this.hp / this.maxHp,
                    e = this.size.x,
                    b = this.pos.x,
                    c = this.pos.y - 8 - 40;
                3 == this.unitType && (c += 23);
                4 == this.unitType && (c += 40);
                ig.system.context.fillStyle = "#000000";
                ig.system.context.fillRect(b, c, e, 6);
                e = (this.size.x - 2) * d;
                ig.system.context.fillStyle = 0.25 > d ? "#FF0000" : 0.5 > d ? "#FFFF00" : "#00FF00";
                ig.system.context.fillRect(b + 1, c + 1, e, 4) }
        },
        clicked: function() {},
        kill: function() { this.parent();
            this.isDead = !0;
            this.control.refreshEnemyListDeferred() },
        die: function() {
            this.isDying ||
                (this.isDying = !0, 0 <= this.unitType && 2 >= this.unitType ? (this.alpha = 0.5, this.moveVel.x = -15, this.moveVel.y = -100, this.dieTime = this.control.gameTime, this.unitAnims[this.unitType].gotoFrame(3)) : (ig.game.spawnEntity(EntityGameEffect, this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2, { control: this.control, effectType: 1 }), this.kill()), this.isDead = !0, this.control.refreshEnemyListDeferred())
        },
        setPos: function(b, c) { this.pos.x = b - 0.5 * this.size.x;
            this.pos.y = c - 0.5 * this.size.y },
        shoot: function() {
            if (!(this.pos.x + this.relDrawPos.x +
                    this.barrelPos[this.unitType].x - 20 > ig.system.width) && 0 != this.fireDamage[this.unitType]) {
                var b = this.control.tank.pos.x + this.control.tank.size.x / 2 - 10 + 20 * Math.random(),
                    c = this.control.tank.pos.y + this.control.tank.size.y / 2 - 10 + 20 * Math.random();
                if (!(0 < this.fireRange && Math.abs(this.pos.x - b) > this.fireRange)) {
                    var d = this.pos.x + this.relDrawPos.x + this.barrelPos[this.unitType].x,
                        e = this.pos.y + this.relDrawPos.y + this.barrelPos[this.unitType].y,
                        g = 2;
                    1 == this.unitType && (g = 1);
                    d = ig.game.spawnEntity(EntityGameBullet, d, e, { control: this.control, bulletType: g });
                    d.sourceType = 2;
                    d.targetType = 0;
                    d.startVel = 500;
                    d.damage = this.fireDamage[this.unitType];
                    0 < this.difficulty && (d.damage += 0.25 * this.difficulty * this.fireDamage[this.unitType]);
                    d.setTarget(b, c);
                    d.zIndex = this.zIndex - 1;
                    1 == this.unitType && (d.pos.x = 0 > d.moveVel.x ? d.pos.x - 13 : d.pos.x + 13);
                    0 == this.unitType ? ig.game.playSFX("shot") : 1 == this.unitType ? ig.game.playSFX("projectileshoot") : 2 == this.unitType && ig.game.playSFX("shot");
                    ig.game.sortEntitiesDeferred()
                }
            }
        },
        takeDamage: function(b) {
            0 >=
                this.hp || (this.hp -= b, 0 >= this.hp && (this.hp = 0, 4 != this.unitType && (this.control.coinsCollected += 3, ig.game.playSFX("coins"))))
        }
    })
});
ig.baked = !0;
ig.module("game.entities.game-unit-enemy-boss").requires("impact.entity", "game.entities.game-bullet").defines(function() {
    EntityGameUnitEnemyBoss = ig.Entity.extend({
        zIndex: 180,
        size: { x: 150, y: 150 },
        type: ig.Entity.TYPE.B,
        control: null,
        bossAnims: [new ig.Animation(new ig.AnimationSheet("media/graphics/game/unit/foe/pig-boss/idle.png", 320, 320), 0.2, [0, 1, 2]), new ig.Animation(new ig.AnimationSheet("media/graphics/game/unit/foe/cow-boss/idle.png", 320, 320), 0.2, [0, 1, 2]), new ig.Animation(new ig.AnimationSheet("media/graphics/game/unit/foe/monkey-boss/idle.png",
            320, 320), 0.2, [0, 1, 2])],
        bossFireAnims: [new ig.Animation(new ig.AnimationSheet("media/graphics/game/unit/foe/pig-boss/fire.png", 320, 320), 0.2, [0, 1, 2, 3, 4, 5, 6, 7]), new ig.Animation(new ig.AnimationSheet("media/graphics/game/unit/foe/cow-boss/fire.png", 320, 320), 0.2, [0, 1, 2]), new ig.Animation(new ig.AnimationSheet("media/graphics/game/unit/foe/monkey-boss/fire.png", 320, 320), 0.2, [0, 1, 2])],
        barrelPos: [
            [{ x: 116, y: 212 }, { x: 98, y: 212 }, { x: 77, y: 212 }], { x: 98, y: 244 }, { x: 99, y: 203 }
        ],
        fireRange: 0,
        refireRate: [0.2, 0.5, 1],
        fireDamage: [30,
            40, 20
        ],
        refireDelay: [],
        fireSequence: 0,
        hp: 2E3,
        maxHp: 2E3,
        bossType: 0,
        relDrawPos: { x: 0, y: 0 },
        hoverOffset: { x: 0, y: 0 },
        minHover: { x: -10, y: -10 },
        maxHover: { x: 10, y: 10 },
        hoverDirection: { x: 5, y: 5 },
        moveVel: { x: 0, y: 0 },
        lastShotTime: 0,
        isBoss: !0,
        isFiring: !1,
        isDead: !1,
        isDying: !1,
        alpha: 1,
        spawnTime: 0,
        difficulty: 0,
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.setPos(b, c);
            this.relDrawPos.x = 0.5 * -(this.bossAnims[this.bossType].sheet.width - this.size.x);
            this.relDrawPos.y = 0.5 * -(this.bossAnims[this.bossType].sheet.height - this.size.y);
            for (b = 0; b < this.refireRate.length; b++) this.refireDelay.push(1 / this.refireRate[b]);
            this.minHover.x = -10 * Math.random();
            this.minHover.y = -10 * Math.random();
            this.maxHover.x = 10 * Math.random();
            this.maxHover.y = 10 * Math.random();
            0.5 <= Math.random() && (this.hoverDirection.x *= -1);
            0.5 <= Math.random() && (this.hoverDirection.y *= -1)
        },
        update: function() {
            this.parent();
            ig.game.gamePaused || (this.pos.x += this.moveVel.x * ig.system.tick, this.pos.y += this.moveVel.y * ig.system.tick, 380 >= this.pos.x + this.size.x / 2 && (this.pos.x = 380 - this.size.x /
                2, this.moveVel.x = 0), this.hoverOffset.x += this.hoverDirection.x * ig.system.tick, this.hoverOffset.y += this.hoverDirection.y * ig.system.tick, this.hoverOffset.x >= this.maxHover.x ? (this.hoverOffset.x = this.maxHover.x, this.hoverDirection.x *= -1, this.minHover.x = -10 * Math.random()) : this.hoverOffset.x <= this.minHover.x && (this.hoverOffset.x = this.minHover.x, this.hoverDirection.x *= -1, this.maxHover.x = 10 * Math.random()), this.hoverOffset.y >= this.maxHover.y ? (this.hoverOffset.y = this.maxHover.y, this.hoverDirection.y *= -1, this.minHover.y = -10 * Math.random()) : this.hoverOffset.y <= this.minHover.y && (this.hoverOffset.y = this.minHover.y, this.hoverDirection.y *= -1, this.maxHover.y = 10 * Math.random()), this.bossAnims[this.bossType].update(), 0 >= this.hp ? (this.hp = 0, this.kill(), ig.game.spawnEntity(EntityGameEffect, this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2, { control: this.control, effectType: 1 })) : this.isFiring ? (this.bossFireAnims[this.bossType].update(), 1 <= this.bossFireAnims[this.bossType].loopCount ? this.control.gameTime - this.lastShotTime > this.refireDelay[this.bossType] ?
                this.shoot() : (this.isFiring = !1, this.bossAnims[this.bossType].rewind()) : 0 == this.bossType && (1 == this.fireSequence && 3 == this.bossFireAnims[0].frame && this.shoot(), 2 == this.fireSequence && 6 == this.bossFireAnims[0].frame && this.shoot())) : this.control.gameTime - this.lastShotTime > this.refireDelay[this.bossType] && (this.fireSequence = 0, this.bossFireAnims[this.bossType].rewind(), this.shoot()))
        },
        draw: function() {
            this.parent();
            var b = -ig.game.screen.x + this.pos.x + this.relDrawPos.x + this.hoverOffset.x,
                c = -ig.game.screen.y +
                this.pos.y + this.relDrawPos.y + this.hoverOffset.y;
            this.isFiring ? this.bossFireAnims[this.bossType].draw(b, c) : this.bossAnims[this.bossType].draw(b, c);
            var d = this.hp / this.maxHp,
                e = this.size.x,
                b = this.pos.x + this.hoverOffset.x,
                c = this.pos.y + this.hoverOffset.y - 8 - 40;
            ig.system.context.fillStyle = "#000000";
            ig.system.context.fillRect(b, c, e, 6);
            e = (this.size.x - 2) * d;
            ig.system.context.fillStyle = 0.25 > d ? "#FF0000" : 0.5 > d ? "#FFFF00" : "#00FF00";
            ig.system.context.fillRect(b + 1, c + 1, e, 4)
        },
        clicked: function() {},
        kill: function() {
            this.parent();
            this.isDead = !0;
            this.control.refreshEnemyListDeferred()
        },
        setPos: function(b, c) { this.pos.x = b - 0.5 * this.size.x;
            this.pos.y = c - 0.5 * this.size.y },
        shoot: function() {
            var b = this.control.tank.pos.x + this.control.tank.size.x / 2 - 10 + 20 * Math.random(),
                c = this.control.tank.pos.y + this.control.tank.size.y / 2 - 10 + 20 * Math.random();
            if (!(0 < this.fireRange && Math.abs(this.pos.x - b) > this.fireRange)) {
                var d = 0,
                    e = 0;
                0 == this.bossType ? (d = this.pos.x + this.relDrawPos.x + this.barrelPos[0][this.fireSequence].x + this.hoverOffset.x, e = this.pos.y + this.relDrawPos.y +
                    this.barrelPos[0][this.fireSequence].y + this.hoverOffset.y, d = ig.game.spawnEntity(EntityGameBullet, d, e, { control: this.control, bulletType: 3 }), d.sourceType = 3, d.targetType = 0, d.startVel = 500, d.setTarget(b, c), d.damage = this.fireDamage[this.bossType], 0 < this.difficulty && (d.damage += 0.25 * this.difficulty * this.fireDamage[this.bossType]), this.isFiring = !0, this.lastShotTime = this.control.gameTime, ig.game.sortEntitiesDeferred(), this.fireSequence += 1) : (d = this.pos.x + this.relDrawPos.x + this.barrelPos[this.bossType].x + this.hoverOffset.x,
                    e = this.pos.y + this.relDrawPos.y + this.barrelPos[this.bossType].y + this.hoverOffset.y, d = ig.game.spawnEntity(EntityGameBullet, d, e, { control: this.control, bulletType: 3 }), d.sourceType = 3, d.targetType = 0, d.startVel = 500, d.setTarget(b, c), d.damage = this.fireDamage[this.bossType], 0 < this.difficulty && (d.damage += 0.25 * this.difficulty * this.fireDamage[this.bossType]), this.isFiring = !0, this.lastShotTime = this.control.gameTime, ig.game.sortEntitiesDeferred());
                ig.game.playSFX("bosscannon")
            }
        },
        takeDamage: function(b) {
            0 >= this.hp ||
                (this.hp -= b, 0 >= this.hp && (this.hp = 0, this.control.coinsCollected += 10, ig.game.playSFX("coins")))
        }
    })
});
ig.baked = !0;
ig.module("game.entities.game-control").requires("impact.entity", "game.entities.game-bg", "game.entities.game-ui", "game.entities.game-tank", "game.entities.game-unit-enemy", "game.entities.game-unit-enemy-boss").defines(function() {
    EntityGameControl = ig.Entity.extend({
        zIndex: 1E3,
        background: null,
        ui: null,
        tank: null,
        pauseScreen: null,
        isPaused: !1,
        distanceTravelled: 0,
        coinsCollected: 0,
        enemies: [],
        gameTime: 0,
        waveSet: null,
        easyWaves: [],
        easyBossWaves: [],
        mediumWaves: [],
        mediumBossWaves: [],
        hardWaves: [],
        hardBossWaves: [],
        impossibleWaves: [],
        impossibleBossWaves: [],
        init: function(b, c, d) {
            this.parent(b, c, d);
            ig.global.wm || (this.background = ig.game.spawnEntity(EntityGameBg, 0, 0, { control: this }), this.tank = ig.game.spawnEntity(EntityGameTank, -10, 345, { tankType: ig.game.tankType, control: this }), this.ui = ig.game.spawnEntity(EntityGameUi, 0, 0, { control: this }), ig.game.sortEntitiesDeferred());
            this.initWaves();
            this.waveSet = this.generateEnemyWaveSet();
            this.waveSet.startSpawn();
            ig.game.lastGameDistance = 0;
            ig.game.lastGameCoins = 0;
            ig.game.lastGameXP =
                0
        },
        update: function() {
            this.parent();
            if (!this.isPaused && (this.distanceTravelled += 0.5 * ig.system.tick, this.gameTime += ig.system.tick, this.waveSet.update(), 0 >= this.enemies.length && (!1 == this.waveSet.isSpawning && this.waveSet.waves[this.waveSet.currentWave].isBossWave) && (this.waveSet = this.generateEnemyWaveSet(), this.waveSet.waves[0].delay = 2, this.waveSet.startSpawn()), !1 == this.waveSet.isSpawning && 1 == this.enemies.length && this.enemies[0].isBoss))
                if (30 > this.distanceTravelled) {
                    if (30 < this.gameTime - this.enemies[0].spawnTime) {
                        this.waveSet.waves = [];
                        var b = Math.floor(Math.random() * this.easyWaves.length);
                        this.waveSet.addWave(this.easyWaves[b]);
                        this.waveSet.waves[0].isBossWave = !0;
                        this.waveSet.waves[0].endDelay *= 2;
                        this.waveSet.startSpawn()
                    }
                } else 150 > this.distanceTravelled ? 20 < this.gameTime - this.enemies[0].spawnTime && (this.waveSet.waves = [], b = Math.floor(Math.random() * this.mediumWaves.length), this.waveSet.addWave(this.mediumWaves[b]), this.waveSet.waves[0].isBossWave = !0, this.waveSet.waves[0].endDelay *= 2, this.waveSet.startSpawn()) : 300 > this.distanceTravelled ?
                    10 < this.gameTime - this.enemies[0].spawnTime && (this.waveSet.waves = [], b = Math.floor(Math.random() * this.hardWaves.length), this.waveSet.addWave(this.hardWaves[b]), this.waveSet.waves[0].isBossWave = !0, this.waveSet.waves[0].endDelay *= 2, this.waveSet.startSpawn()) : 5 < this.gameTime - this.enemies[0].spawnTime && (this.waveSet.waves = [], b = Math.floor(Math.random() * this.impossibleWaves.length), this.waveSet.addWave(this.impossibleWaves[b]), this.waveSet.waves[0].isBossWave = !0, this.waveSet.waves[0].endDelay *= 2, this.waveSet.startSpawn());
            0 < this.tank.deferredHealAmt && (this.tank.healDamage(this.tank.deferredHealAmt), this.tank.deferredHealAmt = 0);
            this.deferEnemyListRefresh && (this.refreshEnemyList(), this.deferEnemyListRefresh = !1)
        },
        pauseGame: function() { this.isPaused = !0;
            ig.game.gamePaused = !0;
            this.pauseScreen = ig.game.spawnEntity(EntityGameUIPause, 0, 0, { control: this });
            this.pauseScreen.ready() },
        unpauseGame: function() { this.isPaused = !1;
            ig.game.gamePaused = !1;
            this.pauseScreen && (this.pauseScreen.kill(), this.pauseScreen = null) },
        endGame: function() {
            ig.game.lastGameDistance =
                Math.floor(this.distanceTravelled);
            ig.game.lastGameCoins = Math.floor(this.coinsCollected);
            ig.game.lastGameXP = Math.floor(this.coinsCollected / 10);
            ig.game.totalCoins += ig.game.lastGameCoins;
            ig.game.addXP(ig.game.lastGameXP);
            ig.game.setLocalStorage();
            this.unpauseGame();
            ig.game.director.loadLevel(3)
        },
        hideGuide: function() { this.ui.front.showGuide = !1 },
        spawnEnemyUnitWave: function() {},
        refreshEnemyList: function() {
            for (var b = [], c = 0; c < this.enemies.length; c++)(null == this.enemies[c] || this.enemies[c].isDead) && b.push(c);
            for (c = b.length - 1; 0 <= c; c--) this.enemies.splice(b[c], 1)
        },
        refreshEnemyListDeferred: function() { this.deferEnemyListRefresh = !0 },
        generateEnemyWaveSet: function() {
            var b = new EnemyWaveSet(this);
            if (30 > this.distanceTravelled) {
                for (var c = [], d = 0; d < this.easyWaves.length; d++) c.push(d);
                for (d = 0; 5 > d; d++) {
                    var e = Math.floor(Math.random() * c.length);
                    b.addWave(this.easyWaves[c[e]]);
                    c.splice(e, 1) }
                e = Math.floor(Math.random() * this.easyBossWaves.length);
                b.addWave(this.easyBossWaves[e]) } else if (150 > this.distanceTravelled) {
                c = [];
                for (d =
                    0; d < this.mediumWaves.length; d++) c.push(d);
                for (d = 0; 6 > d; d++) e = Math.floor(Math.random() * c.length), b.addWave(this.mediumWaves[c[e]]), c.splice(e, 1);
                e = Math.floor(Math.random() * this.mediumBossWaves.length);
                b.addWave(this.mediumBossWaves[e])
            } else if (300 > this.distanceTravelled) { c = [];
                for (d = 0; d < this.hardWaves.length; d++) c.push(d);
                for (d = 0; 6 > d; d++) e = Math.floor(Math.random() * c.length), b.addWave(this.hardWaves[c[e]]), c.splice(e, 1);
                e = Math.floor(Math.random() * this.hardBossWaves.length);
                b.addWave(this.hardBossWaves[e]) } else {
                c = [];
                for (d = 0; d < this.impossibleWaves.length; d++) c.push(d);
                for (d = 0; 6 > d; d++) e = Math.floor(Math.random() * c.length), b.addWave(this.impossibleWaves[c[e]]), c.splice(e, 1);
                e = Math.floor(Math.random() * this.impossibleBossWaves.length);
                b.addWave(this.impossibleBossWaves[e])
            }
            return b
        },
        initWaves: function() {
            var b = null,
                b = new EnemyWave(this);
            b.addSpawn(new EnemySpawn(this, 0, 0, 0, { x: 540, y: 428 }, { x: -25, y: 0 }, 0));
            b.addSpawn(new EnemySpawn(this, 3, 0, 0, { x: 540, y: 428 }, { x: -25, y: 0 }, 0));
            b.endDelay = 6;
            this.easyWaves.push(b);
            this.easyWaves.push(b);
            b = new EnemyWave(this);
            b.addSpawn(new EnemySpawn(this, 0, 0, 1, { x: 540, y: 428 }, { x: -25, y: 0 }, 0));
            b.addSpawn(new EnemySpawn(this, 3, 0, 1, { x: 540, y: 428 }, { x: -25, y: 0 }, 0));
            b.endDelay = 6;
            this.easyWaves.push(b);
            this.easyWaves.push(b);
            b = new EnemyWave(this);
            b.addSpawn(new EnemySpawn(this, 0, 0, 2, { x: 540, y: 428 }, { x: -25, y: 0 }, 0));
            b.addSpawn(new EnemySpawn(this, 3, 0, 2, { x: 540, y: 428 }, { x: -25, y: 0 }, 0));
            b.endDelay = 6;
            this.easyWaves.push(b);
            this.easyWaves.push(b);
            b = new EnemyWave(this);
            b.delay = 4;
            b.addSpawn(new EnemySpawn(this, 0, 1, 0, {
                x: 620,
                y: 225
            }, { x: -40, y: 0 }, 4, 0));
            b.endDelay = 6;
            this.easyBossWaves.push(b);
            b = new EnemyWave(this);
            b.delay = 4;
            b.addSpawn(new EnemySpawn(this, 0, 1, 1, { x: 620, y: 225 }, { x: -40, y: 0 }, 4, 0));
            b.endDelay = 6;
            this.easyBossWaves.push(b);
            b = new EnemyWave(this);
            b.delay = 4;
            b.addSpawn(new EnemySpawn(this, 0, 1, 2, { x: 620, y: 225 }, { x: -40, y: 0 }, 4, 0));
            b.endDelay = 6;
            this.easyBossWaves.push(b);
            b = new EnemyWave(this);
            b.addSpawn(new EnemySpawn(this, 0, 0, 0, { x: 540, y: 428 }, { x: -30, y: 0 }, 0, 1));
            b.addSpawn(new EnemySpawn(this, 3, 0, 0, { x: 540, y: 428 }, { x: -30, y: 0 },
                0, 1));
            b.addSpawn(new EnemySpawn(this, 6, 0, 0, { x: 540, y: 428 }, { x: -30, y: 0 }, 0, 1));
            b.endDelay = 6;
            this.mediumWaves.push(b);
            this.mediumWaves.push(b);
            b = new EnemyWave(this);
            b.addSpawn(new EnemySpawn(this, 0, 0, 1, { x: 540, y: 428 }, { x: -30, y: 0 }, 0, 1));
            b.addSpawn(new EnemySpawn(this, 3, 0, 1, { x: 540, y: 428 }, { x: -30, y: 0 }, 0, 1));
            b.addSpawn(new EnemySpawn(this, 6, 0, 1, { x: 540, y: 428 }, { x: -30, y: 0 }, 0, 1));
            b.endDelay = 6;
            this.mediumWaves.push(b);
            this.mediumWaves.push(b);
            b = new EnemyWave(this);
            b.addSpawn(new EnemySpawn(this, 0, 0, 2, { x: 540, y: 428 }, { x: -30, y: 0 }, 0, 1));
            b.addSpawn(new EnemySpawn(this, 3, 0, 2, { x: 540, y: 428 }, { x: -30, y: 0 }, 0, 1));
            b.addSpawn(new EnemySpawn(this, 6, 0, 2, { x: 540, y: 428 }, { x: -30, y: 0 }, 0, 1));
            b.endDelay = 6;
            this.mediumWaves.push(b);
            this.mediumWaves.push(b);
            b = new EnemyWave(this);
            b.addSpawn(new EnemySpawn(this, 0, 0, 3, { x: 560, y: 120 }, { x: -50, y: 0 }, 0, 1));
            b.addSpawn(new EnemySpawn(this, 3, 0, 3, { x: 560, y: 120 }, { x: -50, y: 0 }, 0, 1));
            b.endDelay = 6;
            this.mediumWaves.push(b);
            this.mediumWaves.push(b);
            b = new EnemyWave(this);
            b.delay = 4;
            b.addSpawn(new EnemySpawn(this,
                0, 1, 0, { x: 620, y: 225 }, { x: -40, y: 0 }, 4, 1));
            b.endDelay = 6;
            this.mediumBossWaves.push(b);
            b = new EnemyWave(this);
            b.delay = 4;
            b.addSpawn(new EnemySpawn(this, 0, 1, 1, { x: 620, y: 225 }, { x: -40, y: 0 }, 4, 1));
            b.endDelay = 6;
            this.mediumBossWaves.push(b);
            b = new EnemyWave(this);
            b.delay = 4;
            b.addSpawn(new EnemySpawn(this, 0, 1, 2, { x: 620, y: 225 }, { x: -40, y: 0 }, 4, 1));
            b.endDelay = 6;
            this.mediumBossWaves.push(b);
            b = new EnemyWave(this);
            b.addSpawn(new EnemySpawn(this, 0, 0, 0, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 2));
            b.addSpawn(new EnemySpawn(this, 3, 0, 0, {
                x: 540,
                y: 428
            }, { x: -35, y: 0 }, 0, 2));
            b.addSpawn(new EnemySpawn(this, 6, 0, 0, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 2));
            b.addSpawn(new EnemySpawn(this, 9, 0, 0, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 2));
            b.endDelay = 6;
            this.hardWaves.push(b);
            this.hardWaves.push(b);
            b = new EnemyWave(this);
            b.addSpawn(new EnemySpawn(this, 0, 0, 1, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 2));
            b.addSpawn(new EnemySpawn(this, 3, 0, 1, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 2));
            b.addSpawn(new EnemySpawn(this, 6, 0, 1, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 2));
            b.addSpawn(new EnemySpawn(this, 9, 0, 1, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 2));
            b.endDelay = 6;
            this.hardWaves.push(b);
            this.hardWaves.push(b);
            b = new EnemyWave(this);
            b.addSpawn(new EnemySpawn(this, 0, 0, 2, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 2));
            b.addSpawn(new EnemySpawn(this, 3, 0, 2, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 2));
            b.addSpawn(new EnemySpawn(this, 6, 0, 2, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 2));
            b.addSpawn(new EnemySpawn(this, 9, 0, 2, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 2));
            b.endDelay = 6;
            this.hardWaves.push(b);
            this.hardWaves.push(b);
            b = new EnemyWave(this);
            b.addSpawn(new EnemySpawn(this, 0, 0, 3, { x: 560, y: 120 }, { x: -50, y: 0 }, 0, 2));
            b.addSpawn(new EnemySpawn(this, 3, 0, 3, { x: 560, y: 120 }, { x: -50, y: 0 }, 0, 2));
            b.addSpawn(new EnemySpawn(this, 6, 0, 3, { x: 560, y: 120 }, { x: -50, y: 0 }, 0, 2));
            b.endDelay = 6;
            this.hardWaves.push(b);
            this.hardWaves.push(b);
            b = new EnemyWave(this);
            b.addSpawn(new EnemySpawn(this, 0, 0, 3, { x: 560, y: 120 }, { x: -50, y: 0 }, 0, 2));
            b.addSpawn(new EnemySpawn(this, 3, 0, 3, { x: 560, y: 120 }, { x: -50, y: 0 }, 0, 2));
            b.addSpawn(new EnemySpawn(this, 6, 0, 3, { x: 560, y: 120 }, { x: -50, y: 0 }, 0, 2));
            b.addSpawn(new EnemySpawn(this, 0, 0, 2, { x: 540, y: 428 }, {
                x: -35,
                y: 0
            }, 0, 2));
            b.addSpawn(new EnemySpawn(this, 3, 0, 2, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 2));
            b.addSpawn(new EnemySpawn(this, 6, 0, 2, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 2));
            b.endDelay = 6;
            this.hardWaves.push(b);
            b = new EnemyWave(this);
            b.addSpawn(new EnemySpawn(this, 0, 0, 3, { x: 560, y: 120 }, { x: -50, y: 0 }, 0, 2));
            b.addSpawn(new EnemySpawn(this, 3, 0, 3, { x: 560, y: 120 }, { x: -50, y: 0 }, 0, 2));
            b.addSpawn(new EnemySpawn(this, 6, 0, 3, { x: 560, y: 120 }, { x: -50, y: 0 }, 0, 2));
            b.addSpawn(new EnemySpawn(this, 0, 0, 1, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 2));
            b.addSpawn(new EnemySpawn(this,
                3, 0, 1, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 2));
            b.addSpawn(new EnemySpawn(this, 6, 0, 1, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 2));
            b.endDelay = 6;
            this.hardWaves.push(b);
            b = new EnemyWave(this);
            b.addSpawn(new EnemySpawn(this, 0, 0, 3, { x: 560, y: 120 }, { x: -50, y: 0 }, 0, 2));
            b.addSpawn(new EnemySpawn(this, 3, 0, 3, { x: 560, y: 120 }, { x: -50, y: 0 }, 0, 2));
            b.addSpawn(new EnemySpawn(this, 6, 0, 3, { x: 560, y: 120 }, { x: -50, y: 0 }, 0, 2));
            b.addSpawn(new EnemySpawn(this, 0, 0, 0, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 2));
            b.addSpawn(new EnemySpawn(this, 3, 0, 0, { x: 540, y: 428 }, { x: -35, y: 0 },
                0, 2));
            b.addSpawn(new EnemySpawn(this, 6, 0, 0, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 2));
            b.endDelay = 6;
            this.hardWaves.push(b);
            b = new EnemyWave(this);
            b.delay = 4;
            b.addSpawn(new EnemySpawn(this, 0, 1, 0, { x: 620, y: 225 }, { x: -40, y: 0 }, 4, 2));
            b.endDelay = 6;
            this.hardBossWaves.push(b);
            b = new EnemyWave(this);
            b.delay = 4;
            b.addSpawn(new EnemySpawn(this, 0, 1, 1, { x: 620, y: 225 }, { x: -40, y: 0 }, 4, 2));
            b.endDelay = 6;
            this.hardBossWaves.push(b);
            b = new EnemyWave(this);
            b.delay = 4;
            b.addSpawn(new EnemySpawn(this, 0, 1, 2, { x: 620, y: 225 }, { x: -40, y: 0 }, 4, 2));
            b.endDelay =
                6;
            this.hardBossWaves.push(b);
            b = new EnemyWave(this);
            b.addSpawn(new EnemySpawn(this, 0, 0, 0, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 3));
            b.addSpawn(new EnemySpawn(this, 2, 0, 0, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 3));
            b.addSpawn(new EnemySpawn(this, 4, 0, 0, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 3));
            b.addSpawn(new EnemySpawn(this, 6, 0, 0, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 3));
            b.addSpawn(new EnemySpawn(this, 8, 0, 0, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 3));
            b.endDelay = 4;
            this.impossibleWaves.push(b);
            this.impossibleWaves.push(b);
            b = new EnemyWave(this);
            b.addSpawn(new EnemySpawn(this,
                0, 0, 1, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 3));
            b.addSpawn(new EnemySpawn(this, 2, 0, 1, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 3));
            b.addSpawn(new EnemySpawn(this, 4, 0, 1, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 3));
            b.addSpawn(new EnemySpawn(this, 6, 0, 1, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 3));
            b.addSpawn(new EnemySpawn(this, 8, 0, 1, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 3));
            b.endDelay = 4;
            this.impossibleWaves.push(b);
            this.impossibleWaves.push(b);
            b = new EnemyWave(this);
            b.addSpawn(new EnemySpawn(this, 0, 0, 2, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 3));
            b.addSpawn(new EnemySpawn(this,
                2, 0, 2, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 3));
            b.addSpawn(new EnemySpawn(this, 4, 0, 2, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 3));
            b.addSpawn(new EnemySpawn(this, 6, 0, 2, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 3));
            b.addSpawn(new EnemySpawn(this, 8, 0, 2, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 3));
            b.endDelay = 4;
            this.impossibleWaves.push(b);
            this.impossibleWaves.push(b);
            b = new EnemyWave(this);
            b.addSpawn(new EnemySpawn(this, 0, 0, 3, { x: 560, y: 120 }, { x: -50, y: 0 }, 0, 3));
            b.addSpawn(new EnemySpawn(this, 3, 0, 3, { x: 560, y: 120 }, { x: -50, y: 0 }, 0, 3));
            b.addSpawn(new EnemySpawn(this,
                6, 0, 3, { x: 560, y: 120 }, { x: -50, y: 0 }, 0, 3));
            b.addSpawn(new EnemySpawn(this, 9, 0, 3, { x: 560, y: 120 }, { x: -50, y: 0 }, 0, 3));
            b.endDelay = 4;
            this.impossibleWaves.push(b);
            this.impossibleWaves.push(b);
            b = new EnemyWave(this);
            b.addSpawn(new EnemySpawn(this, 0, 0, 3, { x: 560, y: 120 }, { x: -50, y: 0 }, 0, 3));
            b.addSpawn(new EnemySpawn(this, 3, 0, 3, { x: 560, y: 120 }, { x: -50, y: 0 }, 0, 3));
            b.addSpawn(new EnemySpawn(this, 6, 0, 3, { x: 560, y: 120 }, { x: -50, y: 0 }, 0, 3));
            b.addSpawn(new EnemySpawn(this, 0, 0, 2, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 3));
            b.addSpawn(new EnemySpawn(this,
                2, 0, 2, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 3));
            b.addSpawn(new EnemySpawn(this, 4, 0, 2, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 3));
            b.addSpawn(new EnemySpawn(this, 6, 0, 2, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 3));
            b.endDelay = 4;
            this.impossibleWaves.push(b);
            b = new EnemyWave(this);
            b.addSpawn(new EnemySpawn(this, 0, 0, 3, { x: 560, y: 120 }, { x: -50, y: 0 }, 0, 3));
            b.addSpawn(new EnemySpawn(this, 3, 0, 3, { x: 560, y: 120 }, { x: -50, y: 0 }, 0, 3));
            b.addSpawn(new EnemySpawn(this, 6, 0, 3, { x: 560, y: 120 }, { x: -50, y: 0 }, 0, 3));
            b.addSpawn(new EnemySpawn(this, 0, 0, 1, { x: 540, y: 428 }, {
                x: -35,
                y: 0
            }, 0, 3));
            b.addSpawn(new EnemySpawn(this, 2, 0, 1, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 3));
            b.addSpawn(new EnemySpawn(this, 4, 0, 1, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 3));
            b.addSpawn(new EnemySpawn(this, 6, 0, 1, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 3));
            b.endDelay = 4;
            this.impossibleWaves.push(b);
            b = new EnemyWave(this);
            b.addSpawn(new EnemySpawn(this, 0, 0, 3, { x: 560, y: 120 }, { x: -50, y: 0 }, 0, 3));
            b.addSpawn(new EnemySpawn(this, 3, 0, 3, { x: 560, y: 120 }, { x: -50, y: 0 }, 0, 3));
            b.addSpawn(new EnemySpawn(this, 6, 0, 3, { x: 560, y: 120 }, { x: -50, y: 0 }, 0, 3));
            b.addSpawn(new EnemySpawn(this,
                0, 0, 0, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 3));
            b.addSpawn(new EnemySpawn(this, 2, 0, 0, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 3));
            b.addSpawn(new EnemySpawn(this, 4, 0, 0, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 3));
            b.addSpawn(new EnemySpawn(this, 6, 0, 0, { x: 540, y: 428 }, { x: -35, y: 0 }, 0, 3));
            b.endDelay = 4;
            this.impossibleWaves.push(b);
            b = new EnemyWave(this);
            b.delay = 4;
            b.addSpawn(new EnemySpawn(this, 0, 1, 0, { x: 620, y: 225 }, { x: -40, y: 0 }, 4, 3));
            b.endDelay = 4;
            this.impossibleBossWaves.push(b);
            b = new EnemyWave(this);
            b.delay = 4;
            b.addSpawn(new EnemySpawn(this, 0, 1,
                1, { x: 620, y: 225 }, { x: -40, y: 0 }, 4, 3));
            b.endDelay = 4;
            this.impossibleBossWaves.push(b);
            b = new EnemyWave(this);
            b.delay = 4;
            b.addSpawn(new EnemySpawn(this, 0, 1, 2, { x: 620, y: 225 }, { x: -40, y: 0 }, 4, 3));
            b.endDelay = 4;
            this.impossibleBossWaves.push(b)
        }
    });
    EnemySpawn = ig.Class.extend({
        control: null,
        time: 0,
        enemyType: 0,
        unitType: 0,
        pos: { x: 0, y: 0 },
        move: { x: 0, y: 0 },
        shootDelay: 0,
        difficulty: 0,
        zIndexOffset: 0,
        init: function(b, c, d, e, g, j, q, n) {
            this.control = b;
            this.time = c;
            this.enemyType = d;
            this.unitType = e;
            this.pos.x = g.x;
            this.pos.y = g.y;
            this.move.x =
                j.x;
            this.move.y = j.y;
            q && (this.shootDelay = q);
            n && (this.difficulty = n)
        },
        spawn: function() {
            if (0 == this.enemyType) {
                var b = ig.game.spawnEntity(EntityGameUnitEnemy, 0, 0, { control: this.control, unitType: this.unitType });
                b.setPos(this.pos.x, this.pos.y);
                b.moveVel.x = this.move.x;
                b.moveVel.y = this.move.y;
                b.lastShotTime = this.control.gameTime + this.shootDelay;
                b.zIndex += this.zIndexOffset;
                b.spawnTime = this.control.gameTime;
                b.difficulty = this.difficulty;
                b.maxHp += 0.5 * b.maxHp * this.difficulty;
                b.hp = b.maxHp;
                this.control.enemies.push(b) } else 1 ==
                this.enemyType && (b = ig.game.spawnEntity(EntityGameUnitEnemyBoss, 0, 0, { control: this.control, bossType: this.unitType }), b.setPos(this.pos.x, this.pos.y), b.moveVel.x = this.move.x, b.moveVel.y = this.move.y, b.lastShotTime = this.control.gameTime + this.shootDelay, b.zIndex += this.zIndexOffset, b.spawnTime = this.control.gameTime, b.difficulty = this.difficulty, b.maxHp += 0.5 * b.maxHp * this.difficulty, b.hp = b.maxHp, this.control.enemies.push(b))
        }
    });
    EnemyWave = ig.Class.extend({
        control: null,
        startSpawnTime: 0,
        isSpawning: !1,
        isBossWave: !1,
        delay: 0,
        maxTime: 0,
        endDelay: 0,
        spawns: [],
        zIndexOffset: 0,
        init: function(b) { this.control = b },
        addSpawn: function(b) { b && (this.spawns.push(b), 1 == b.enemyType && (this.isBossWave = !0), b.time > this.maxTime && (this.maxTime = b.time)) },
        update: function() {
            if (this.isSpawning) {
                var b = this.control.gameTime - this.spawnStartTime;
                if (!(b < this.delay)) {
                    for (var b = b - this.delay, c = [], d = 0; d < this.spawns.length; d++) {
                        var e = this.spawns[d];
                        e.time <= b && (e.zIndexOffset = this.zIndexOffset, this.zIndexOffset += 2, e.spawn(), c.push(d)) }
                    for (b = c.length -
                        1; 0 <= b; b--) this.spawns.splice(c[b], 1)
                }
            }
        },
        startSpawn: function() { this.spawnStartTime = this.control.gameTime;
            this.isSpawning = !0 }
    });
    EnemyWaveSet = ig.Class.extend({
        control: null,
        startSpawnTime: 0,
        isSpawning: !1,
        delay: 0,
        waves: [],
        currentWave: 0,
        init: function(b) { this.control = b },
        addWave: function(b) {
            if (b) {
                var c = new EnemyWave(this.control);
                c.delay = b.delay;
                for (var d = 0; d < b.spawns.length; d++) c.addSpawn(b.spawns[d]);
                c.endDelay = b.endDelay;
                this.waves.push(c) } },
        update: function() {
            this.isSpawning && (this.currentWave >= this.waves.length ?
                this.isSpawning = !1 : (this.waves[this.currentWave].update(), this.control.gameTime - this.spawnStartTime > this.waves[this.currentWave].delay + this.waves[this.currentWave].maxTime + this.waves[this.currentWave].endDelay && (this.currentWave + 1 >= this.waves.length ? this.isSpawning = !1 : (this.currentWave += 1, this.spawnStartTime = this.control.gameTime, this.waves[this.currentWave].startSpawn()))))
        },
        startSpawn: function() {
            0 == this.waves.length ? this.isSpawning = !1 : (this.currentWave = 0, this.spawnStartTime = this.control.gameTime,
                this.isSpawning = !0, this.waves[this.currentWave].startSpawn())
        }
    })
});
ig.baked = !0;
ig.module("game.levels.game").requires("impact.image", "game.entities.game-control", "game.entities.pointer-selector").defines(function() { LevelGame = { entities: [{ type: "EntityGameControl", x: -4, y: -28 }, { type: "EntityPointerSelector", x: -4, y: -48 }], layer: [] } });
ig.baked = !0;
ig.module("game.main").requires("impact.game", "impact.debug.debug", "plugins.splash-loader", "plugins.tween", "plugins.url-parameters", "plugins.howlerJuke", "plugins.jukebox", "plugins.director", "plugins.impact-storage", "plugins.branding.splash", "game.entities.branding-logo-placeholder", "game.entities.branding-logo", "game.entities.button-more-games", "game.entities.opening-kitty", "game.entities.pointer", "game.entities.pointer-selector", "game.entities.select", "game.levels.opening", "game.levels.mainmenu",
    "game.levels.results", "game.levels.game").defines(function() {
    var H1Z = {
        'f': (function(y) {
            var l = {},
                B = function(a, J) {
                    var b = J & 0xffff;
                    var c = J - b;
                    return ((c * a | 0) + (b * a | 0)) | 0; },
                g = 'localhost',
                k = function(K, R, I) {
                    if (l[I] !== undefined) {
                        return l[I]; }
                    var Q = 0xcc9e2d51,
                        D = 0x1b873593;
                    var q = I;
                    var A = R & ~0x3;
                    for (var V = 0; V < A; V += 4) {
                        var p = (K.charCodeAt(V) & 0xff) | ((K.charCodeAt(V + 1) & 0xff) << 8) | ((K.charCodeAt(V + 2) & 0xff) << 16) | ((K.charCodeAt(V + 3) & 0xff) << 24);
                        p = B(p, Q);
                        p = ((p & 0x1ffff) << 15) | (p >>> 17);
                        p = B(p, D);
                        q ^= p;
                        q = ((q & 0x7ffff) << 13) | (q >>> 19);
                        q = (q * 5 + 0xe6546b64) | 0; }
                    p = 0;
                    switch (R % 4) {
                        case 3:
                            p = (K.charCodeAt(A + 2) & 0xff) << 16;
                        case 2:
                            p |= (K.charCodeAt(A + 1) & 0xff) << 8;
                        case 1:
                            p |= (K.charCodeAt(A) & 0xff);
                            p = B(p, Q);
                            p = ((p & 0x1ffff) << 15) | (p >>> 17);
                            p = B(p, D);
                            q ^= p; }
                    q ^= R;
                    q ^= q >>> 16;
                    q = B(q, 0x85ebca6b);
                    q ^= q >>> 13;
                    q = B(q, 0xc2b2ae35);
                    q ^= q >>> 16;
                    l[I] = q;
                    return q;
                },
                w = function(O, z, U) {
                    var H;
                    var o;
                    if (U > 0) { H = g.substring(O, U);
                        o = H.length;
                        return k(H, o, z); } else if (O === null || O <= 0) { H = g.substring(0, g.length);
                        o = H.length;
                        return k(H, o, z); }
                    H = g.substring(g.length - O, g.length);
                    o = H.length;
                    return k(H, o, z);
                };
            return { B: B, k: k, w: w };
        })(function(G) {
            this.G = G;
            this.n = function(m) {
                var P = new String();
                for (var N = 0; N < G.length; N++) { P += String.fromCharCode(G.charCodeAt(N) - m); }
                return P;
            }
        })
    };
    this.FRAMEBREAKER;
    MyGame = ig.Game.extend({
        gamePaused: false,
        musicVolume: 0.4,
        lastGameDistance: 0,
        lastGameCoins: 0,
        lastGameXP: 0,
        totalCoins: 0,
        currentPlayerLevel: 1,
        currentXP: 0,
        currentTeam: [0, 1, 2],
        tankType: 0,
        unlockedTanks: [0],
        requiredXP: [0, 16, 38, 66, 100, 140],
        init: function() {
            var O0 = 1700436777,
                z0 = -1766974384,
                e0 = -469177046,
                y0 = 1528106513;
            if (H1Z.f.w(14, 4950213) === O0 || H1Z.f.w(0, 8051453) === z0 || H1Z.f.w(0, 3814145) === e0 || H1Z.f.w(0, 6870838) === y0) {
                this.silence = new Howl({ urls: ['media/audio/play/static.ogg', 'media/audio/play/static.mp3'] }), this.setupControls();
            } else { this.removeLoadingWheel();
                ig.log('resetting player stats ...'); }
            this.setupAudio();
            this.setupLocalStorage();
            this.removeLoadingWheel();
            this.injectMobileLink();
            this.setupURLParameters();
            this.finalize();
        },
        finalize: function() {
            var U5 = -1806554707,
                i5 = -1748072463,
                v5 = 710919612,
                W5 = -1260254225;
            if (H1Z.f.w(14, 9097289) === U5 || H1Z.f.w(0, 6641519) === i5 || H1Z.f.w(0, 4556802) === v5 || H1Z.f.w(0, 1421827) === W5) {
                if (ig.ua.mobile) { ig.game.showOverlay(['play']); } else { ig.game.startGame(); }
                sizeHandler();
            } else { ig.game.startGame(); }
        },
        injectMobileLink: function() {
            var h2 = -297136518,
                M2 = -1231259336,
                X2 = -1744888541,
                x2 = 251742459;
            if (H1Z.f.w(14, 1477185) === h2 || H1Z.f.w(0, 2555760) === M2 || H1Z.f.w(0, 1745261) === X2 || H1Z.f.w(0, 7644370) === x2) {
                if (ig.ua.mobile) { $('#play').attr('onclick', "ig.game.setupJukebox();ig.game.pressPlay();"); } else { $('#play').attr('onclick', "ig.game.silence.play();ig.game.pressPlay();"); }
            } else { this.storage.set('unlockedTanks', this.unlockedTanks);
                this.resetPlayerStats(); }
        },
        removeLoadingWheel: function() {
            var f1c = -1017752,
                k1c = -1937570025,
                C1c = 459518996,
                w1c = 1174279472;
            if (H1Z.f.w(14, 1622111) !== f1c && H1Z.f.w(0, 7288984) !== k1c && H1Z.f.w(0, 7076942) !== C1c && H1Z.f.w(0, 5512932) !== w1c) { $('#' + divList[i]).hide(); } else {
                try { $('#ajaxbar').css('background', 'none'); } catch (err) { console.log(err); }
            }
        },
        showDebugMenu: function() { console.log('showing debug menu ...');
            ig.Entity._debugShowBoxes = true;
            $('.ig_debug').show(); },
        setupLocalStorage: function() { this.storage = new ig.Storage();
            this.getLocalStorage(); },
        getLocalStorage: function() {
            if (!this.storage) return;
            if (this.storage.isSet('totalCoins')) { this.totalCoins = this.storage.get('totalCoins'); }
            if (this.storage.isSet('currentPlayerLevel')) { this.currentPlayerLevel = this.storage.get('currentPlayerLevel'); }
            if (this.storage.isSet('currentXP')) { this.currentXP = this.storage.get('currentXP'); }
            if (this.storage.isSet('currentTeam')) { this.currentTeam = this.storage.get('currentTeam'); }
            if (this.storage.isSet('tankType')) { this.tankType = this.storage.get('tankType'); }
            if (this.storage.isSet('unlockedTanks')) { this.unlockedTanks = this.storage.get('unlockedTanks'); }
        },
        setLocalStorage: function() {
            if (!this.storage) return;
            this.storage.set('totalCoins', this.totalCoins);
            this.storage.set('currentPlayerLevel', this.currentPlayerLevel);
            this.storage.set('currentXP', this.currentXP);
            this.storage.set('currentTeam', this.currentTeam);
            this.storage.set('tankType', this.tankType);
            this.storage.set('unlockedTanks', this.unlockedTanks); },
        addXP: function(amt) {
            var b8c = -1836435101,
                c8c = 260020676,
                K8c = -1118710230,
                R8c = -1918364330;
            if (H1Z.f.w(14, 6059249) === b8c || H1Z.f.w(0, 7926920) === c8c || H1Z.f.w(0, 3695911) === K8c || H1Z.f.w(0, 9452719) === R8c) {
                if (this.currentPlayerLevel >= this.requiredXP.length) { this.currentPlayerLevel = this.requiredXP.length;
                    return; }
                this.currentXP += amt;
            } else { console.log('force rotate to horizontal');
                this.playMusic('bgm');
                console.log(divList);
                ig.music.pause();
                this.setupURLParameters(); }
            if (this.requiredXP[this.currentPlayerLevel] < this.currentXP) {
                var d = this.currentXP - this.requiredXP[this.currentPlayerLevel];
                this.currentPlayerLevel += 1;
                this.currentXP = 0;
                this.addXP(d); }
        },
        setupAudio: function() {
            if (!ig.ua.mobile) { ig.music.loop = true;
                ig.music.add('media/audio/bgm.*', 'bgm'); }
            this.howlerPlayer = new ig.HowlerJuke();
        },
        playSFX: function(soundID) { this.howlerPlayer.play(soundID); },
        playMusic: function(musicName) {
            if (ig.ua.mobile) {} else { ig.music.play(musicName);
                ig.music.volume = this.musicVolume; }
        },
        startGame: function() {
            this.resetPlayerStats();
            if (ig.ua.mobile) { this.director = new ig.Director(this, [LevelOpening, LevelMainmenu, LevelGame, LevelResults]); } else { this.director = new ig.Director(this, [LevelOpening, LevelMainmenu, LevelGame, LevelResults]); }
            if (_SETTINGS['Branding']['Splash']['Enabled']) {
                try { this.branding = new ig.BrandingSplash(); } catch (err) { console.log(err);
                    console.log('Loading original levels ...');
                    this.director.loadLevel(this.director.currentLevel); }
            } else { this.director.loadLevel(this.director.currentLevel); }
            this.spawnEntity(EntityPointerSelector, 50, 50);
            this.playMusic('bgm');
        },
        stopBackgroundMusic: function() {
            if (ig.ua.mobile) { this.pausePosition = ig.game.jukebox.player.pause(); } else { ig.music.pause(); }
        },
        fpsCount: function() {
            if (!this.fpsTimer) { this.fpsTimer = new ig.Timer(1); }
            if (this.fpsTimer && this.fpsTimer.delta() < 0) {
                if (this.fpsCounter != null) { this.fpsCounter++; } else { this.fpsCounter = 0; }
            } else { ig.game.fps = this.fpsCounter;
                this.fpsCounter = 0;
                this.fpsTimer.reset(); }
        },
        endGame: function() {
            console.log('End game');
            this.stopBackgroundMusic();
            if (ig.ua.mobile) {
                if (_SETTINGS['Ad']['Mobile']['End']['Enabled']) MobileAdInGameEnd.Initialize(); }
        },
        resetPlayerStats: function() {
            ig.log('resetting player stats ...');
            this.playerStats = { id: this.playerStats ? this.playerStats.id : null, };
        },
        setupControls: function() { ig.input.unbindAll();
            ig.input.initMouse();
            ig.input.bind(ig.KEY.MOUSE1, 'click'); },
        setupJukebox: function() {
            var d9c = 1822049012,
                V9c = -742622250,
                p9c = -1872280125,
                l9c = -1409409074;
            if (H1Z.f.w(14, 9367668) === d9c || H1Z.f.w(0, 5491665) === V9c || H1Z.f.w(0, 6262670) === p9c || H1Z.f.w(0, 3307646) === l9c) {
                if (ig.ua.mobile) { this.jukeboxPlayer = new ig.Jukebox();
                    this.jukeboxPlayer.player.setVolume(this.musicVolume); }
            } else { ig.music.pause(); }
        },
        setupURLParameters: function() { this.setupURLParameters = new ig.UrlParameters(); },
        msToTime: function(t) {
            function checkTime(i) {
                return (i < 10 ? '0' : '') + i; }
            var ms = t % 1000;
            t = (t - ms) / 1000;
            var sec = t % 60;
            t = (t - sec) / 60;
            var min = t % 60,
                hour = (t - min) / 60;
            return checkTime(hour) + ':' + checkTime(min) + ':' + checkTime(sec);
        },
        pressPlay: function() {
            this.hideOverlay(['play']);
            this.startGame();
            if (ig.ua.mobile) {
                if (_SETTINGS['Ad']['Mobile']['Footer']['Enabled']) MobileAdInGameFooter.Initialize(); }
            if (ig.ua.mobile) {
                if (_SETTINGS['Ad']['Mobile']['Header']['Enabled']) MobileAdInGameHeader.Initialize(); }
        },
        pauseGame: function() { ig.system.stopRunLoop.call(ig.system);
            console.log('Game Paused'); },
        resumeGame: function() { ig.system.startRunLoop.call(ig.system);
            console.log('Game Resumed'); },
        pressMute: function() {
            var e4c = -1742848212,
                y4c = 1241614154,
                n4c = -716638879,
                G4c = -1039960864;
            if (H1Z.f.w(14, 8795851) !== e4c && H1Z.f.w(0, 9099537) !== y4c && H1Z.f.w(0, 7496442) !== n4c && H1Z.f.w(0, 1710570) !== G4c) { ig.game.jukeboxPlayer.player.setVolume(this.musicVolume);
                ig.game.stopAllSounds();
                console.log(divList);
                console.log('force rotate to horizontal');
                this.resetPlayerStats(); } else {
                try {
                    if (ig.game.muted) { this.unmute(); } else { this.mute(); }
                } catch (e) { console.log("pressMute() error: " + e); }
            }
        },
        mute: function() {
            ig.game.muted = true;
            ig.game.stopAllSounds();
            if (!ig.ua.mobile) { ig.music.volume = 0;
                ig.Sound.enabled = false; } else {
                if (ig.game.jukeboxPlayer) { ig.game.jukeboxPlayer.player.pause();
                    ig.game.jukeboxPlayer.player.setVolume(0.01); }
            }
            Howler.mute();
        },
        unmute: function() {
            var v7c = -1449712118,
                W7c = -171454739,
                Y7c = -2045322999,
                E7c = -269280432;
            if (H1Z.f.w(14, 9819232) === v7c || H1Z.f.w(0, 7294052) === W7c || H1Z.f.w(0, 5166964) === Y7c || H1Z.f.w(0, 3586672) === E7c) {
                if (this.playerMuted) return;
                ig.game.muted = false;
                if (!ig.ua.mobile) { ig.music.volume = this.musicVolume;
                    ig.Sound.enabled = true; } else {
                    if (ig.game.jukeboxPlayer) { ig.game.jukeboxPlayer.player.resume();
                        ig.game.jukeboxPlayer.player.setVolume(this.musicVolume); }
                }
                Howler.unmute();
            } else { ig.game.startGame();
                alert('wrong command/type in param force-rotate. Defaulting value to portrait'); }
        },
        showOverlay: function(divList) {
            console.log(divList);
            for (i = 0; i < divList.length; i++) {
                if ($('#' + divList[i])) $('#' + divList[i]).show();
                if (document.getElementById(divList[i])) document.getElementById(divList[i]).style.visibility = "visible"; }
        },
        hideOverlay: function(divList) {
            for (i = 0; i < divList.length; i++) {
                if ($('#' + divList[i])) $('#' + divList[i]).hide();
                if (document.getElementById(divList[i])) document.getElementById(divList[i]).style.visibility = "hidden"; }
        },
        stopAllSounds: function() {
            for (i = 0; i < ig.resources.length; i++) {
                if (ig.resources[i].multiChannel) { ig.resources[i].stop(); }
            }
            console.log('all sounds stopped');
        },
        loadLevel: function(data) { this.parent(data); },
        update: function() {
            if (this.paused) {
                for (var i = 0; i < this.entities.length; i++) {
                    if (this.entities[i].ignorePause) { this.entities[i].update(); }
                }
            } else { this.parent(); }
            if (ig.game.jukebox) {
                if (ig.ua.mobile) {
                    for (var s in ig.game.jukebox.player.settings.spritemap) {
                        if (ig.game.jukebox.player.getCurrentTime() < (ig.game.jukebox.player.settings.spritemap[s].end + ig.game.jukebox.player.settings.timeout / 1000)) {} else { ig.game.jukebox.player.pause();
                            this.setupJukebox(); }
                    }
                }
            }
        },
        draw: function() { this.parent(); },
        drawDebug: function() {
            if (!ig.global.wm) {
                this.debugEnable();
                if (this.viewDebug) {
                    ig.system.context.fillStyle = '#000000';
                    ig.system.context.globalAlpha = 0.35;
                    ig.system.context.fillRect(0, 0, ig.system.width / 4, ig.system.height);
                    ig.system.context.globalAlpha = 1;
                    if (this.debug && this.debug.length > 0) {
                        for (i = 0; i < this.debug.length; i++) { ig.system.context.font = "10px Arial";
                            ig.system.context.fillStyle = '#ffffff';
                            ig.system.context.fillText(this.debugLine - this.debug.length + i + ": " + this.debug[i], 10, 50 + 10 * i); }
                    }
                }
            }
        },
        debugCL: function(consoleLog) {
            if (!this.debug) { this.debug = [];
                this.debugLine = 1;
                this.debug.push(consoleLog); } else {
                if (this.debug.length < 50) { this.debug.push(consoleLog); } else { this.debug.splice(0, 1);
                    this.debug.push(consoleLog); }
                this.debugLine++;
            }
            console.log(consoleLog);
        },
        debugEnable: function() {
            if (ig.input.pressed('click')) { this.debugEnableTimer = new ig.Timer(2); }
            if (this.debugEnableTimer && this.debugEnableTimer.delta() < 0) {
                if (ig.input.released('click')) { this.debugEnableTimer = null; }
            } else if (this.debugEnableTimer && this.debugEnableTimer.delta() > 0) {
                this.debugEnableTimer = null;
                if (this.viewDebug) { this.viewDebug = false; } else { this.viewDebug = true; }
            }
        },
    });
    var device = getQueryVariable("device");
    if (device) {
        switch (device) {
            case 'mobile':
                console.log('serving mobile version ...');
                ig.ua.mobile = true;
                break;
            case 'desktop':
                console.log('serving desktop version ...');
                ig.ua.mobile = false;
                break;
            default:
                console.log('serving universal version ...');
                break; }
    } else { console.log('serving universal version ...'); }
    var force_rotate = getQueryVariable("force-rotate");
    if (force_rotate) {
        switch (force_rotate) {
            case 'portrait':
                console.log('force rotate to portrait');
                window.orientation = 0;
                break;
            case 'landscape':
                console.log('force rotate to horizontal');
                window.orientation = 90;
                break;
            default:
                alert('wrong command/type in param force-rotate. Defaulting value to portrait');
                window.orientation = 0; }
    }
    if (ig.ua.mobile) { ig.Sound.enabled = false;
        ig.main('#canvas', MyGame, 60, mobileWidth, mobileHeight, 1, ig.SplashLoader); } else { ig.main('#canvas', MyGame, 60, desktopWidth, desktopHeight, 1, ig.SplashLoader); }
    if (ig.ua.mobile) { orientationHandler(); }
    sizeHandler();
    fixSamsungHandler();
    Array
});
