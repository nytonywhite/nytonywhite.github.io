window._cjq = window._cjq || {};
(function() {
    var bm;
    if (window.adParams && typeof window.adParams.isSecure !== "undefined") {
        bm = window.adParams.isSecure ? "https:" : "http:"
    } else {
        bm = window.location.protocol
    }
    var bL = {
            API_REQUEST_COMMAND: "",
            API_TRACK_COMMAND: "",
            API_VERSION: "",
            REQUEST_TYPE_SINGLE: "",
            RETURN_TYPE_JSON: "ad.json",
            RETURN_TYPE_GIF: "img.gif",
            RETURN_TYPE_VIDEO: "video.3gp",
            RETURN_TYPE_JS: "script.js",
            BASE_CALLBACKNAME: "ccb",
            BASE_DIVNAME: "cAdD",
            API_URL: bm + "",
            API_CDN_URL: bm + "//cdn.cw.com/",
            PORTRAIT: "portrait",
            LANDSCAPE: "landscape",
            HIRES: "hi_res",
            LOWRES: "low_res",
            IMAGESRC: "src",
            HIRESSRC: "hiressrc",
            IMAGESRCPARAM: "#src#",
            HIRESSRCPARAM: "#hiressrc#",
            HIRESPREFIX: "hires",
            CRISP_WRAPPER_DIV: "crisp_adDiv"
        },
        aW = {
            globalTimer: null,
            numTracker: 0,
            lastdiv: "",
            consoleDisplay: null,
            showTimerDisplay: null,
            crispConsoleWindow: null,
            THRESHOLD_DB: 300
        },
        bP = null,
        aE = null,
        az = true,
        ay = "",
        X = "",
        bq = 25,
        am = 0,
        bh = 0,
        by = null,
        bt = [],
        I = false;
    previewRequest = false;
    __changeGallery = false;
    __crispkey = 0;
    __detectData = {};
    __twoFramePanelTypes = ["standard", "lightbox"];
    var bg = [];
    window._cjq.crispAdFramework = window._cjq.crispAdFramework || {
        adRequestVersion: "",
        jsonDataObj: [],
        runTransitionOnceShow: [],
        runTransitionOnceHide: [],
        adBridge: (window.parent && window.parent._cjq && window.parent._cjq.AdBridge),
        getBridge: function() {
            if (_cjq.crispAdFramework.adBridge) {
                return _cjq.crispAdFramework.adBridge
            } else {
                return (window.parent && window.parent._cjq && window.parent._cjq.AdBridge)
            }
        },
        getComponentAction: function(bU) {
            var bW, bX, bV;
            if (!bU || typeof bU.querySelector !== "function") {
                return false
            }
            bW = bU.querySelector("a").href;
            bW = bW && bW.replace("javascript:", "");
            bX = bW && bW.match(/\((.*?)\)/);
            bX = bX && bX[1];
            bX = !!bX.length && bX.split(",");
            if (bX && bX.length && bX.length >= 1) {
                bV = bX.length;
                while (bV--) {
                    bX[bV] = bX[bV].replace(/'/g, "").trim()
                }
            }
            return {
                action: bW,
                params: bX
            }
        },
        getConstant: function(bU) {
            if (bU) {
                return bL[bU]
            } else {
                return bL
            }
        },
        setDelegate: function(bV, bU) {
            if (_cjq.crispAdFramework.adBridge) {
                _cjq.crispAdFramework.adBridge.setDelegate(bV, bU)
            }
        },
        getDelegate: function(bU) {
            if (_cjq.crispAdFramework.adBridge) {
                _cjq.crispAdFramework.adBridge.getDelegate(bU)
            }
        },
        getTopDiv: function(bU) {
            try {
                return bt[bt.trackerkey].topDiv
            } catch (bV) {
                return bL.CRISP_WRAPPER_DIV
            }
        },
        getAdRequestVersion: function() {
            return _cjq.crispAdFramework.adRequestVersion
        },
        setAdRequestVersion: function(bU) {
            _cjq.crispAdFramework.adRequestVersion = bU
        },
        getPreviewRequest: function() {
            return previewRequest
        },
        setThirdPartyTrackers: function(bU) {
            if (bU) {
                if (bU.vu && bU.vu.length > 0) {
                    if (typeof __CrispExternalViewURL !== "string") {
                        __CrispExternalViewURL = bU.vu
                    }
                }
                if (bU.cu && bU.cu.length > 0) {
                    if (typeof __CrispExternalClickURL !== "string") {
                        __CrispExternalClickURL = bU.cu
                    }
                }
                if (bU.au && bU.au.length > 0) {
                    if (typeof __CrispActURL !== "string") {
                        __CrispActURL = bU.au
                    }
                }
                if (bU.eu && bU.eu.length > 0) {
                    if (typeof __CrispEngURL !== "string") {
                        __CrispEngURL = bU.eu
                    }
                }
            }
        },
        getPanelBackgroudProp: function() {
            var bX = bt.trackerkey,
                bW = bt[bX],
                bV, bZ = null;
            if (bW && bW.definition) {
                for (var bY in bW.definition) {
                    if (bW.definition.hasOwnProperty(bY)) {
                        var bU = bW.definition[bY];
                        if (!bU || !bU.params) {
                            continue
                        }
                        if (bU.params && bU.params["#evtplacement#"] === "panel") {
                            bV = bU
                        }
                    }
                }
            }
            if (bV) {
                bZ = {};
                bZ.panel_bg_color = bV.params["#panel_bg_color#"];
                bZ.panel_bg_opacity = bV.params["#panel_bg_opacity#"];
                bZ.enableScrollLock = bV.params["#enableScrollLock#"]
            }
            return bZ
        },
        executeJsonFromPanelIframe: function(bU, bW) {
            _cjq.crispAdFramework.requestFromPanelIframe = true;
            _cjq.crispAdFramework.setThirdPartyTrackers(window.adParams);
            if (typeof __CrispExternalClickURL !== "string") {
                __CrispExternalClickURL = ""
            }
            try {
                aL(bU, window.adParams)
            } catch (bV) {
                console.log(bV)
            }
        },
        runBannerClickScript: function(bV) {
            try {
                var bX = [],
                    bU = [];
                bX = aJ(bt.trackerkey, "expandable-banner");
                if (bX) {
                    aT(bX, null, bU, bt.trackerkey)
                }
            } catch (bW) {
                console.log(bW)
            }
        },
        runClosePanelScript: function(bV) {
            try {
                var bX = [],
                    bU = [];
                bX = aJ(bt.trackerkey, "panel-close-button");
                if (bX) {
                    aT(bX, null, bU, bt.trackerkey)
                }
            } catch (bW) {
                console.log(bW)
            }
        },
        getAdServiceJsonResponse: function() {
            return _cjq.crispAdFramework.adServiceJSONResponse
        },
        getCloseBannerDivCss: function(bZ) {
            var bY = _cjq.crispAdFramework.getComponentNameToIdMap(bt.trackerkey, "banner-close-button");
            if (!bY) {
                bY = _cjq.crispAdFramework.getComponentNameToIdMap(bt.trackerkey, "adhesion-close-button")
            }
            var bX = document.getElementById(bY),
                bW = g(bY, bt.trackerkey),
                bU = "",
                bV = "";
            if (bW) {
                if (bW.override && bW.override.landscape) {
                    bU = bW.override.landscape.css
                }
                bV = bW.css
            }
            return {
                portrait: bV,
                landscape: bU
            }
        },
        getCloseDivCss: function(bX) {
            var bZ = _cjq.crispAdFramework.getComponentNameToIdMap(bt.trackerkey, "banner-close-button");
            if (!bZ) {
                bZ = _cjq.crispAdFramework.getComponentNameToIdMap(bt.trackerkey, "adhesion-close-button")
            }
            if (bX === "panelclose") {
                bZ = _cjq.crispAdFramework.getComponentNameToIdMap(bt.trackerkey, "panel-close-button")
            }
            var bY = document.getElementById(bZ),
                bW = g(bZ, bt.trackerkey),
                bU = "",
                bV = "";
            if (bW) {
                if (bW.override && bW.override.landscape) {
                    bU = bW.override.landscape.css
                }
                bV = bW.css
            }
            return {
                portrait: bV,
                landscape: bU
            }
        },
        emptyCloseBannerDiv: function(bV) {
            if (window.adParams && window.adParams.previewtype === "editmodepreview") {
                return
            }
            if (aU()) {
                return
            }
            if (!bV) {
                bV = _cjq.crispAdFramework.getComponentNameToIdMap(bt.trackerkey, "banner-close-button")
            }
            var bU = document.getElementById(bV);
            if (bU) {
                bU.innerHTML = ""
            }
        },
        getBannerDiv: function(bU) {
            if (bt[bt.trackerkey].domBannerid) {
                return document.getElementById(bt[bt.trackerkey].domBannerid)
            }
            return null
        },
        getPanelCloseDiv: function(bU) {
            if (!bU) {
                bU = bt[bt.trackerkey]
            }
            var bW = _cjq.crispAdFramework.getComponentNameToIdMap(bt.trackerkey, "panel-close-button"),
                bV = document.getElementById(bW);
            if (bW && bV) {
                return bV
            }
            return null
        },
        isAdRendered: function() {
            return bt[bt.trackerkey].adRendered
        },
        cleanScriptForCopy: function() {
            var bV = document.getElementById("roundtripimpression"),
                bU = document.getElementById("adservicejson");
            if (bV) {
                bV.parentNode.removeChild(bV)
            }
            if (bU) {
                bU.parentNode.removeChild(bU)
            }
        },
        isPreviewLiveMode: function() {
            return I
        },
        setLiveMode: function(bU) {
            I = bU
        },
        setCurrentStageBeingEdited: function(bU) {
            __currentStageBeingEdited = bU
        },
        currentStageBeingEdited: function() {
            return __currentStageBeingEdited
        },
        getScrollerDef: function() {
            var bX = bt.trackerkey,
                bW = bt[bX],
                bV = null;
            if (bW && bW.definition) {
                for (var bY in bW.definition) {
                    if (bW.definition.hasOwnProperty(bY)) {
                        var bU = bW.definition[bY];
                        if (bU && bU.componentname === "interscroller-def") {
                            bV = bU
                        }
                    }
                }
            }
            return bV
        },
        getIOSVersion: function() {
            var bV = navigator.userAgent.match(/; CPU.*OS (\d+_\d)/),
                bW, bU, bX;
            if (bV && bV.length > 1) {
                bW = bV[bV.length - 1];
                bX = bV[0].indexOf("iPhone") > -1 ? "iPhone" : bV[0].indexOf("iPad") > -1 ? "IPad" : bV[0];
                bW = bW.replace("_", ".");
                bU = parseInt((bW * 1), 10);
                return {
                    IOS: bX,
                    version: bU
                }
            }
            return null
        },
        getPanelHtml: function() {
            if (!trackerkey) {
                trackerkey = _cjq.crispAdFramework.deriveTrackerkey()
            }
            if (bt[trackerkey].html && bt[trackerkey].html[1] && bt[trackerkey].html[1].fragment) {
                return bt[trackerkey].html[1].fragment
            }
            return null
        },
        isStageInDisplayStage: function(bW, bU) {
            var bY = null,
                bZ = null,
                b0;
            if (bW && bW.indexOf(",") > -1) {
                bY = bW.split(",")
            }
            if (bU && bU.indexOf(",") > -1) {
                bZ = bU.split(",")
            }
            if (!bY) {
                return (bU.indexOf(bW) > -1)
            }
            if (!bZ) {
                return (bW.indexOf(bU) > -1)
            }
            if (bZ && bY) {
                for (var bX = 0; bX < bZ.length; bX++) {
                    var bV = bZ[bX];
                    if (bY.indexOf(bV) > -1) {
                        return true
                    }
                }
            }
            return false
        },
        setPreviewRequest: function(bU) {
            previewRequest = bU
        },
        setCrispKey: function(bU) {
            __crispkey = bU
        },
        getCrispKey: function() {
            if (_cjq.crispAdFramework.adBridge && _cjq.crispAdFramework.adBridge.getCrispkey) {
                __crispkey = _cjq.crispAdFramework.adBridge.getCrispkey()
            }
            return __crispkey
        },
        getCrispAdId: function() {
            if (_cjq.crispAdFramework.adBridge && _cjq.crispAdFramework.adBridge.getCrispAdId) {
                __crispAdId = _cjq.crispAdFramework.adBridge.getCrispAdId()
            } else {
                __crispAdId = Math.floor(Math.random() * 999999)
            }
            return __crispAdId
        },
        setDetectData: function(bU) {
            __detectData = bU
        },
        getDetectData: function(bU) {
            return (__detectData)
        },
        addGlobalStyle: function(bW) {
            var bU;
            if (!_cjq.crispAdFramework.globalStyles) {
                bU = document.createElement("style");
                document.head.appendChild(bU);
                _cjq.crispAdFramework.globalStyles = bU
            } else {
                bU = _cjq.crispAdFramework.globalStyles
            } if (bU) {
                try {
                    bU.sheet.insertRule(bW, 0)
                } catch (bV) {
                    console.log(bV.message)
                }
            }
        },
        hiddenComponentsForStage: function(bX, bV) {
            var bW = ["#", bV, "#"].join("");
            var bY = [];
            var bU;
            if (bt[bX] && bt[bX].definition) {
                for (i in bt[bX].definition) {
                    if (bt[bX].definition[i].componentname === "initial-rendered-state") {
                        bU = bt[bX].definition[i]
                    }
                }
                if (bU && bU.params && bU.params[bW]) {
                    bY = bU.params[bW].replace(/'/ig, "").split(",")
                }
            }
            return bY
        },
        showComponentsForStage: function(bY, bV) {
            var b5 = [],
                b3 = null,
                bX = [],
                b2 = [],
                bW = bV.split(","),
                bZ, b1, b4, bU, b0;
            for (b0 = 0; b0 < bW.length; b0++) {
                b1 = bW[b0];
                b2 = this.hiddenComponentsForStage(bY, b1);
                if (bt[bY] && bt[bY].definition) {
                    for (i in bt[bY].definition) {
                        bU = bt[bY].definition[i].id;
                        if (bt[bY].definition[i].params && bt[bY].definition[i].params["#displayStage#"]) {
                            bZ = bt[bY].definition[i].params["#displayStage#"]
                        } else {
                            bZ = bt[bY].definition[i].displayStage
                        } if (bZ && (bZ.indexOf(b1) > -1) && b5.indexOf(bU) === -1 && b2.indexOf(bU) === -1) {
                            b5.push(bU)
                        } else {
                            if ((bX.indexOf(bU) === -1 && b5.indexOf(bU) === -1) || (bX.indexOf(bU) === -1 && b2.indexOf(bU) > -1)) {
                                bX.push(bU)
                            }
                        }
                    }
                }
            }
            return {
                showList: b5,
                hideList: bX
            }
        },
        trackInteractionAndImpression: function(bY, bU, bX, bZ, bW, bV) {
            _cjq.crispTrackers.trackInteractionAndImpression(bY, bU, bX, bZ, bW, bV)
        },
        trackInteractionAndEngagement: function(bX, bV, bW, bY, bU) {
            _cjq.crispTrackers.trackInteractionAndEngagement(bX, bV, bW, bY, bU)
        },
        getHideDelay: function(b0) {
            var b1 = b0,
                bU, bX, b2, b6, bZ, bV, bW, b5 = 0,
                b3 = 0,
                b4 = _cjq.crispAdFramework,
                bY = b4.adframeid || (document && document.body.getAttribute("data-adframeid"));
            if (!!b0) {
                b1 = b0
            } else {
                if (b4.getBridge() && b4.getBridge().getCurrentStage !== undefined) {
                    b1 = b4.getBridge() && b4.getBridge().getCurrentStage(bY)
                } else {
                    return false
                }
            } if (!b1) {
                return false
            }
            if (by === null) {
                by = {}
            }
            if (typeof by[b1] === "number") {
                return by[b1]
            } else {
                if (by[b1] === null || by[b1] === undefined) {
                    bU = b4.showComponentsForStage(trackerkey, b1);
                    bU = bU && bU.showList;
                    bX = bU && bU.length;
                    by[b1] = null;
                    while (bX--) {
                        b2 = b4.getAdDefProperty(trackerkey, bU[bX], "params");
                        b6 = b2 && b2["#hideEffect#"];
                        bV = b2 && b2["#hideDuration#"];
                        bZ = b2 && b2["#hideDelay#"];
                        b5 = 0;
                        if (b6 && b6 !== " ") {
                            if (bV) {
                                b5 += parseInt(bV, 10)
                            }
                            if (bZ) {
                                b5 += parseInt(bZ, 10)
                            }
                            b3 = Math.max(b3, b5)
                        }
                    }
                    by[b1] = b3;
                    return by[b1]
                } else {
                    return false
                }
            }
        },
        handleClose: function(b8, cc, b1, ci, bZ, ch, cg, b7, bY) {
            var b0 = _cjq.crispAdFramework,
                ce = b0.showComponentsForStage(b8, cc),
                cf = [b8, ce.showList, ce.hideList, b7, b1, ci, bZ],
                ca, b9, bW, b4, b5, bV, bX = 0,
                cb = 0,
                bU = window.adParams && window.adParams.panelType,
                b2, b6, b3;
            b2 = b0.getAdPropertyVars(b8, "loadingPhaseLimit");
            if (bU === "lightbox" && cc.indexOf("banner") === 0) {
                if (b7 === "retract") {
                    cb = b0.getHideDelay();
                    b0.gotoStage(b8, cc, b1, ci, bZ, ch, cg, b7, bY, cb);
                    b0.trackInteractionAndImpression(b8, ch, cg, b7, ce.showList, ce.hideList);
                    return
                }
            }
            try {
                if (b2 == 2) {
                    b3 = b0.getAdPropertyVars(b8, "openNewWindow");
                    b0.trackInteractionAndImpression(b8, ch, cg, b7, null, null);
                    if (!b3 || b3 === "false") {
                        window.history.back()
                    } else {
                        window.close()
                    }
                } else {
                    if (window.adParams.pushdown === true) {
                        b6 = 1000;
                        if (window.adParams.pushdownDuration) {
                            b6 = window.adParams.pushdownDuration
                        }
                        setTimeout(function() {
                            b0.trigger("cac_call_showAndHide", cf)
                        }, b6)
                    } else {
                        b0.trigger("cac_call_showAndHide", cf)
                    } if (window.parent.mraid !== undefined) {
                        b0.trigger("cac_panel_prep", [b8, "close"])
                    }
                    cb = b0.getHideDelay();
                    b0.gotoStage(b8, cc, b1, ci, bZ, ch, cg, b7, bY, cb);
                    b0.trackInteractionAndImpression(b8, ch, cg, b7, ce.showList, ce.hideList)
                }
            } catch (cd) {
                console.log(cd)
            }
        },
        gotoStage: function(bW, b2, bZ, bX, b3, b6, b4, b7, bU, bY) {
            var b5 = _cjq.crispAdFramework,
                b1 = b5.showComponentsForStage(bW, b2),
                bV = [b1.showList, b1.hideList, b7, bZ, bX, b3, bY],
                b0 = b5.adframeid || (document && document.body.getAttribute("data-adframeid"));
            if (!bW) {
                return
            }
            if ((!b2 || b5.trim(b2) === "") && !bZ) {
                return
            }
            if (bZ && bA() && !bt[bW].adRendered) {
                b5.trigger("pre-expandable_display", [b2, bZ])
            }
            if (!b2 || b5.trim(b2) === "") {
                if (bZ) {
                    bZ = parseInt(bZ) + 1000;
                    setTimeout(function() {
                        b5.trigger("cac_banner_close", [bW])
                    }, bZ)
                }
            }
            b5.trigger("cac_gotostage", {
                trackerkey: bW,
                stage: b2,
                params: bV,
                adframeid: b0
            });
            if (b5.getPreviewRequest() && !b5.isPreviewLiveMode()) {
                if (this.currentStageBeingEdited() == b2 && !bZ) {
                    b5.showAndHide(bW, b1.showList, b1.hideList, b7, bZ, bX, b3)
                }
            }
        },
        handleExpansion: function(bW, b1, bY, bX, b2, b6, b3, b7, bU) {
            try {
                var b5 = _cjq.crispAdFramework,
                    b0 = b5.showComponentsForStage(bW, b1),
                    bV;
                if (!!!b6) {
                    b6 = bt[bW].bannerName
                }
                if (_cjq.pWin && _cjq.pWin._cjq && _cjq.pWin._cjq.AdManager && _cjq.pWin._cjq.AdManager.clearTimeout) {
                    _cjq.pWin._cjq.AdManager.clearTimeout()
                }
                var b4 = b5.getSecondActionObject();
                if (b4 && b4.globalTimer && b4.secondAction) {
                    b5.setSecondAction("globalTimer", new Date())
                }
                if (window.adParams && (window.adParams.panelType === "slider" || window.adParams.panelType === "pull") && (b1.indexOf("panel") > -1) && (this.isPanelOpen(bW) !== true)) {
                    return
                }
                if (bU && bU !== "") {
                    b5.trackInteractionAndImpression(bW, b6, b3, b7, b0.showList, b0.hideList);
                    b5.handleClickto(bW, bU, b7, b3, b6);
                    return
                }
                b5.trackInteractionAndImpression(bW, b6, b3, b7, b0.showList, b0.hideList);
                if (window.mraid !== undefined) {
                    b5.trigger("cac_panel_prep", [bW, "open"]);
                    setTimeout(function() {
                        b5.gotoStage(bW, b1, bY, bX, b2, b6, b3, b7, bU)
                    }, 0);
                    return false
                }
                b5.gotoStage(bW, b1, bY, bX, b2, b6, b3, b7, bU)
            } catch (bZ) {
                console.log(bZ)
            }
        },
        handleClickto: function(bX, bW, bV, bY, bU) {
            if (bW && bW !== "") {
                _cjq.crispAdFramework.stopInteractionProgressTracker(bX);
                _cjq.crispAdFramework.stopTimeDisplayTracker(bX);
                d(bX, bW, bV, bY, bU);
                return false
            }
            return true
        },
        getSingleAdRequestUrl: function(b4, bU, bV, b2, b3, bZ, bY, b1, bW, b0) {
            if (!b3) {
                b3 = ""
            }
            var bX = "";
            return be(bL.REQUEST_TYPE_SINGLE, bL.RETURN_TYPE_JSON, b4, bX, bU, bV, b2, b3, bZ, bY, b1, bW, b0)
        },
        getAdJson: function(bU) {
            if (!bU) {
                bU = _cjq.crispAdFramework.deriveTrackerkey()
            }
            return bt[bU]
        },
        setAdJson: function(bU) {
            if (!trackerkey) {
                trackerkey = _cjq.crispAdFramework.deriveTrackerkey()
            }
            bt[trackerkey] = bU
        },
        isFixedAdhesionContainer: function(bU) {
            if (!bU) {
                bU = _cjq.crispAdFramework.deriveTrackerkey()
            }
            return bt[bU].fixedAdhesionContainer
        },
        getCssInDef: function(bY, b0, bU, bW) {
            var bX = g(b0, bY);
            if (!bX) {
                return
            }
            var bV, bZ;
            switch (bU) {
                case "top":
                    bV = new RegExp(/top:\s?(-?\d+).*?/);
                    break;
                case "left":
                    bV = new RegExp(/left:\s?(-?\d+).*?/);
                    break;
                case "width":
                    bV = new RegExp(/width:\s?(-?\d+).*?/);
                    break;
                case "height":
                    bV = new RegExp(/height:\s?(-?\d+).*?/);
                    break;
                default:
                    bV = new RegExp(bU + ":\\s?(-?\\d+).*?");
                    break
            }
            if (bW === bL.LANDSCAPE) {
                if (bX.override && bX.override.landscape && bX.override.landscape.css) {
                    bZ = bV.exec(bX.override.landscape.css)
                }
            } else {
                bZ = bV.exec(bX.css)
            } if (bZ && bZ.length === 2) {
                return bZ[1]
            }
        },
        isOrientationAware: function(bV) {
            var bU = _cjq.crispAdFramework.getAdPropertyVars(bV, "enableOrientationAware");
            return h(bU)
        },
        isHideInLandscape: function(bU) {
            var bV = _cjq.crispAdFramework.getAdPropertyVars(bU, "hideInLandscape");
            return h(bV)
        },
        isCollapseOnOrientationChange: function(bU) {
            var bV = _cjq.crispAdFramework.getAdPropertyVars(bU, "collapseOnOrientationChange");
            return h(bV)
        },
        isPanelOpen: function(bV) {
            if (!bV || !bt[bV]) {
                bV = bt.trackerkey
            }
            try {
                if (!_cjq.pWin || !_cjq.pWin.document.getElementById(_cjq.crispAdFramework.adframeid) || !_cjq.pWin.document.getElementById(_cjq.crispAdFramework.adframeid).contentDocument) {
                    return false
                }
                var bU = _cjq.pWin.document.getElementById(_cjq.crispAdFramework.adframeid),
                    bW = bU.parentNode;
                if (bU && bU.style.display === "block") {
                    if (parseInt(bU.style.height, 10) > 0 && parseInt(bU.style.width, 10) > 0) {
                        return true
                    }
                }
                return false
            } catch (bX) {
                return false
            }
            return (bt[bV].panelOpenVar && bt[bV].panelOpenVar !== "")
        },
        getOpenPanelName: function(bU) {
            if (!bU || !bt[bU]) {
                bU = bt.trackerkey
            }
            return bt[bU].openPanelObjName
        },
        getJsonObj: function() {
            return _cjq.crispAdFramework.jsonDataObj
        },
        setJsonObj: function(bU) {
            bt = bU
        },
        getProgressTimeInterval: function(bU) {
            return bt[bU].progressTimeInterval
        },
        setProgressTimeInterval: function(bV, bU) {
            bt[bV].progressTimeInterval = bU
        },
        getIdleTimeInterval: function(bU) {
            return bt[bU].idleTimeInterval
        },
        setIdleTimeInterval: function(bV, bU) {
            bt[bV].idleTimeInterval = bU
        },
        isObjectInDom: function(bV) {
            try {
                if (navigator && navigator.appName === "Microsoft Internet Explorer") {
                    if (bV instanceof object) {
                        return true
                    }
                    return false
                }
                if (bV instanceof HTMLElement) {
                    return true
                }
            } catch (bU) {
                return false
            }
            return false
        },
        getElementById: function(bV, bU) {
            return document.getElementById(bV)
        },
        getMaxZ: function() {
            return bP
        },
        setMaxZ: function(bU) {
            bP = bU
        },
        getDefObj: function(bV, bU) {
            return g(bV, bU)
        },
        getTrackerkey: function(bU) {
            return bt.trackerkeys[bU]
        },
        deriveTrackerkey: function() {
            if (bt.trackerkey) {
                return bt.trackerkey
            }
            var bU = _cjq.crispAdFramework.getBannerIds(),
                bV = _cjq.crispAdFramework.getTrackerkeyByBanner(bU[0]);
            _cjq.crispAdFramework.trackerkey = bV;
            return bV
        },
        setEnableDisplayTrackingFor: function(bW, bV, bU) {
            bt[bW].enableDisplayTrackingFor[bV] = bU
        },
        getEnableDisplayTrackingFor: function(bV, bU) {
            if (bt[bV].enableDisplayTrackingFor) {
                return bt[bV].enableDisplayTrackingFor[bU] ? true : false
            }
            return false
        },
        getPanelClose: function(bV) {
            if (!bV) {
                bV = _cjq.crispAdFramework.deriveTrackerkey()
            }
            var bU = _cjq.crispAdFramework.getPanelCloseDiv(bV);
            if (!bU) {
                return _cjq.crispAdFramework.getComponentNameToIdMap(bt.trackerkey, "panel-close-button")
            }
            return bU.id
        },
        handleEffectsForCloseButton: function(bX, bV, bW) {
            if (!trackerkey) {
                trackerkey = _cjq.crispAdFramework.deriveTrackerkey()
            }
            var bZ = _cjq.crispAdFramework.getComponentNameToIdMap(bt.trackerkey, "banner-close-button");
            if (!bZ) {
                bZ = _cjq.crispAdFramework.getComponentNameToIdMap(bt.trackerkey, "adhesion-close-button")
            }
            if (bV === "panel") {
                bZ = _cjq.crispAdFramework.getComponentNameToIdMap(bt.trackerkey, "panel-close-button");
                _cjq.crispAdFramework.closePanelId = bZ
            } else {
                _cjq.crispAdFramework.closeBannerId = bZ
            }
            var bU = document.getElementById(bZ);
            if (bU) {
                var bY = (function() {
                    var b0 = bU;
                    return _cjq.crispAdFramework.handleEffects(trackerkey, b0, bW)
                })();
                _cjq.crispAdFramework.bind("cac_run_showeffects", bY, null, true)
            }
        },
        throwCreatePanelEvent: function(bY) {
            if (document.body.getAttribute("data-adframeid") && document.body.getAttribute("data-adframeid").indexOf("cacPanelIframe") > -1) {
                return
            }
            var bX = _cjq.crispAdFramework.getPanelWidth(bY),
                bV = _cjq.crispAdFramework.getPanelHeight(bY),
                bU = document.body.getAttribute("data-adframeid"),
                bW = _cjq.crispAdFramework.getAdPropertyVars(bY, "phase2Url");
            _cjq.crispAdFramework.trigger("cac_create_panel_frame", {
                width: bX,
                height: bV,
                adframeid: bU,
                panelType: window.adParams.panelType,
                isInterstitial: aU(),
                phase2Delivery: bW
            })
        },
        getPanelIdInDom: function(bU) {
            if (!bU) {
                bU = _cjq.crispAdFramework.deriveTrackerkey()
            }
            return bt[bU].domPanelId
        },
        setPanelHeight: function(bV, bU) {
            bt[bV]["panelHeight"] = bU
        },
        setPanelWidth: function(bV, bU) {
            bt[bV]["panelWidth"] = bU
        },
        getPanelWidth: function(bU) {
            if (!bU) {
                bU = _cjq.crispAdFramework.deriveTrackerkey()
            }
            return bt[bU]["panelWidth"]
        },
        getPanelHeight: function(bU) {
            if (!bU) {
                bU = _cjq.crispAdFramework.deriveTrackerkey()
            }
            return bt[bU]["panelHeight"]
        },
        getAdWidth: function(bU) {
            if (!bU) {
                bU = _cjq.crispAdFramework.deriveTrackerkey()
            }
            return bt[bU]["width"]
        },
        getAdHeight: function(bU) {
            if (!bU) {
                bU = _cjq.crispAdFramework.deriveTrackerkey()
            }
            return bt[bU]["height"]
        },
        isLightBoxAd: function(bU) {
            if (!bU) {
                bU = _cjq.crispAdFramework.deriveTrackerkey()
            }
            return bt[bU].isLightBox
        },
        isFixedAdhesion: function(bU) {
            return bt[bU].isFixedAdhesion
        },
        setFixedAdhesion: function(bV, bU) {
            return bt[bV].isFixedAdhesion = bU
        },
        setLightBoxAd: function(bU, bV) {
            bt[bU].isLightBox = bV
        },
        setConsoleVars: function(bV, bU) {
            aW.consoleDisplay = bV;
            aW.showTimerDisplay = bU
        },
        setPartnerkey: function(bU, bV) {
            if (!bt[bU]) {
                bt[bU] = {}
            }
            bt[bU].partnerkey = bV
        },
        requestAdWithBannercode: function(bZ, bU, bY, bV, bW) {
            az = false;
            if (typeof bY.ADSERVICE_URL !== "undefined" && bY.ADSERVICE_URL.length > 0) {
                bL.API_URL = bY.ADSERVICE_URL
            }
            _cjq.crispAdFramework.setPreviewRequest(true);
            if (bW === true) {
                this.setLiveMode(bW)
            } else {
                bL.CRISP_WRAPPER_DIV = bZ
            }
            try {
                au(bZ, bU, bY, bV);
                setTimeout(function() {
                    _cjq.crispAdFramework.setConsoleVars("console", "true")
                }, 2000)
            } catch (bX) {
                console.log(bX)
            }
        },
        getShowList: function(bU) {
            return bt[bU].showList
        },
        getAllPanelComponents: function(bW, bV) {
            var bX = bk(bt[bW].showList),
                bU = null;
            if (bV && bt[bW] && bt[bW].definition) {
                for (bU in bt[bW].definition) {
                    if (aO(bt[bW].definition[bU].parentid, bV)) {
                        if (!r(bX, bU)) {
                            bX.push(bU)
                        }
                    }
                }
            }
            return bX
        },
        trim: function(bU) {
            if (!bU) {
                return ""
            }
            bU = bU + "";
            return bU.replace(/^\s*/, "").replace(/\s*$/, "")
        },
        setAdhesionCookie: function(bZ, bU, bW) {
            var bV = new Date(),
                bY;
            if (bW == 0) {
                var bX = new Date(bV.getFullYear(), bV.getMonth(), bV.getDate(), 23, 59, 59);
                bY = ((bX.getTime() - bV.getTime()) / 1000)
            } else {
                bY = bW * 60 * 60
            }
            a9(bZ, bU, bY)
        },
        getAdhesionCookie: function(bV) {
            var bU = bn(bV);
            return _cjq.crispAdFramework.trim(bU)
        },
        isAdPreExpandable: function(bU) {
            return bA()
        },
        isExpandableAd: function(bU) {
            return G(bU)
        },
        isAdInterstitial: function(bU) {
            return aU()
        },
        lightBoxHandler: function(bU) {
            try {} catch (bV) {
                console.log(bV)
            }
            return
        },
        regCenterListener: function(bW, bV, bU) {},
        deRegCenterListener: function(bU) {
            if (typeof ormma !== "undefined") {
                ormma.removeEventListener("orientationChange")
            }
        },
        getLayoutScripts: function(bV) {
            var bX = {
                standard: {
                    initIframe: function bW(bY) {
                        try {
                            if (!window.adParams.adscroller && !window.adParams.pushdown) {
                                bU()
                            }
                        } catch (bZ) {
                            console.log(bZ)
                        }
                    },
                    stopPropagation: function bU() {
                        var bZ = document.getElementById("panelShade");

                        function b1(b2) {
                            b2.preventDefault();
                            b2.stopPropagation();
                            return false
                        }
                        if (bZ) {
                            if (bZ.addEventListener) {
                                bZ.addEventListener("click", b1, false);
                                bZ.addEventListener("touchstart", b1, false)
                            }
                        }
                        var b0 = _cjq.crispAdFramework.getPanelIdInDom();
                        if (!b0) {
                            b0 = "panel_background"
                        }
                        var bY = document.getElementById(b0);

                        function b1(b2) {
                            b2.preventDefault();
                            b2.stopPropagation();
                            return false
                        }
                        if (bY) {
                            if (bY.addEventListener) {
                                bY.addEventListener("click", b1, false);
                                bY.addEventListener("touchstart", b1, false)
                            }
                        }
                    }
                },
            };
            bX.lightbox = bX.standard;
            return bX[bV]
        },
        executeScriptInAction: function() {
            try {
                var bV = _cjq.crispAdFramework.setAdhesionSafeClickInAction();
                if (bV && typeof bV === "string") {
                    eval(bV);
                    return true
                } else {
                    throw new Error(" invalid bannerAction")
                }
            } catch (bU) {
                console.log(bU.message);
                return false
            }
        },
        setAdhesionSafeClickInAction: function(bW) {
            var bV = _cjq && _cjq.crispAdFramework,
                b0, bU, bX;

            function bY(b1) {
                if (b1.href) {
                    return b1.href.replace("javascript:", "")
                }
                return null
            }
            try {
                if (!bW) {
                    bW = _cjq.crispAdFramework.deriveTrackerkey()
                }
                b0 = bV && bV.getDomBannerId(bW);
                bU = b0 && bV.getElementById(b0);
                bX = bU && bU.querySelector("a");
                if (bX) {
                    return bY(bX)
                }
                bX = document.getElementsByTagName("a")[0];
                if (bX) {
                    return bY(bX)
                }
                throw new Error(" setAdhesionSafeClickInAction: no link found")
            } catch (bZ) {
                console.log(bZ.message);
                return null
            }
        },
        setTopDivWidth: function(bW, bX, bY) {
            var bV = "ccb",
                b1 = _cjq.crispAdFramework.getAdDefProperty(bX, null, "callback"),
                bZ = b1.substring(bV.length),
                bU = document.getElementById(bZ);
            if (!bU) {
                return
            }
            if (bY === "close" && bU.style) {
                bU.style.width = _cjq.crispAdFramework.getAdDefProperty(bX, null, "width") + "px"
            }
            panelImgObj = _cjq.crispAdFramework.getImageObject(bW);
            if (!panelImgObj) {
                return
            }
            am++;
            if (panelImgObj.width == 0) {
                setTimeout(function() {
                    if (am < bq) {
                        if (bW) {
                            _cjq.crispAdFramework.setTopDivWidth(bW, bX, bY)
                        }
                    } else {
                        return
                    }
                }, 200);
                return
            }
            if (bY === "open") {
                var b0 = parseInt(bU.style.width, 10);
                if (b0 < panelImgObj.width) {
                    bU.style.width = panelImgObj.width
                }
            }
        },
        getResolution: function() {
            return (ax() === true) ? bL.HIRES : bL.LOWRES
        },
        getOrientation: function() {
            var bV;
            try {
                bV = window.top;
                bV.innerWidth
            } catch (bU) {
                bV = window.parent
            }
            if (bV) {
                if (bV.innerWidth > bV.innerHeight) {
                    return bL.LANDSCAPE
                }
                return bL.PORTRAIT
            }
            if (bV.innerWidth > bV.innerHeight) {
                return bL.LANDSCAPE
            }
            return bL.PORTRAIT
        },
        getTrackerkeyByBanner: function(bU) {
            return bt.trackerkeys[bU]
        },
        hasClass: function(bU, bW) {
            var bV = new RegExp("(^|\\s)" + bW + "($|\\s)");
            if (bU) {
                return bV.exec(bU.getAttribute("class")) != null
            }
            return false
        },
        addClass: function(bZ, bX, bV) {
            var bY = bt.trackerkeys[bZ],
                bU = bt[bY].topDiv,
                bW = document.getElementById(bX);
            bW.className += " " + bV;
            return true
        },
        setClass: function(bZ, bX, bV) {
            var bY = bt.trackerkeys[bZ],
                bU = bt[bY].topDiv,
                bW = document.getElementById(bX);
            bW.className = bV;
            return true
        },
        removeClass: function(b0, bX, bZ) {
            var bY = bt.trackerkeys[b0],
                bU = bt[bY].topDiv,
                bW = document.getElementById(bX);
            if (_cjq.crispAdFramework.hasClass(bW, bZ)) {
                var bV = new RegExp("(\\s|^)" + bZ + "(\\s|$)");
                bW.className = bW.className.replace(bV, " ")
            }
            return true
        },
        getBannerIds: function() {
            return bt.bannerIds
        },
        handleEffects: function(b8, bZ, b7) {
            if (window.adParams && window.adParams.previewtype === "editmodepreview") {
                return
            }
            _cjq.crispAdFramework.animationListeners = _cjq.crispAdFramework.animationListeners || {};
            _cjq.crispAdFramework.styleRnd = _cjq.crispAdFramework.styleRnd || Math.floor(Math.random() * 999999);
            _cjq.crispAdFramework.effectEndState = _cjq.crispAdFramework.effectEndState || function(cd, ce) {
                ce === "in" ? cd.style.opacity = 1 : cd.style.display = "none"
            };
            var bX = _cjq.crispAdFramework.getAdDefProperty(b8, bZ.id, "showEffect"),
                b3 = _cjq.crispAdFramework.getAdDefProperty(b8, bZ.id, "hideEffect"),
                b4 = !!b3 && _cjq.crispAdFramework.getAdDefProperty(b8, bZ.id, "hideTrigger"),
                bW = bt[b8].adRendered,
                bY = ["flash", "shake", "bounce", "bounceIn", "bounceInDown", "bounceInUp", "bounceInLeft", "bounceInRight", "tada", "swing", "wobble", "pulse", "flip"],
                bV = _cjq.crispAdFramework.getTopDiv(b8),
                b6, ca, b9;

            function bU(cd) {
                var cf = document;
                if (cd == true) {
                    cf = window.parent.document
                }
                try {
                    if (cf.getElementById("cmAnimCss" + _cjq.crispAdFramework.styleRnd)) {
                        b9 = cf.getElementById("cmAnimCss" + _cjq.crispAdFramework.styleRnd)
                    } else {
                        b9 = cf.createElement("style");
                        b9.id = "cmAnimCss" + _cjq.crispAdFramework.styleRnd;
                        cf.head.appendChild(b9)
                    }
                } catch (ce) {
                    console.log(ce)
                }
            }

            function b5(ck, cf) {
                var cg, ci, ce, ch, cj, cd;
                ci = ck.indexOf("." + cf);
                cg = ck.slice(ci);
                cd = ck.substr(0, ci).split(/(@)/);
                if ((cd.length === 7) && (cd[0] === "") && (cd[1] === "@") && (cd[2].indexOf("-webkit-keyframes") > -1)) {
                    ce = [cd[1], cd[2]].join("");
                    ch = [cd[3], cd[4]].join("");
                    cj = [cd[5], cd[6]].join("");
                    cd = [];
                    if (document.body.style.webkitAnimation !== undefined) {
                        cd.push(ce)
                    }
                    if (document.body.style.mozAnimation !== undefined) {
                        cd.push(ch)
                    }
                    if (document.body.style.animation !== undefined) {
                        cd.push(cj)
                    }
                    return {
                        effectKeyFrames: cd,
                        effectClass: cg
                    }
                }
            }

            function cb(cg, cf) {
                var cd = ["webkit", "moz"],
                    ch = [],
                    ce;
                for (ce = 0; ce < cd.length; ce++) {
                    if (cf.style[cd[ce] + cg] !== undefined) {
                        ch.push(cd[ce])
                    }
                }
                return ch
            }

            function cc(ch, ci, cl, ck, cd) {
                var cg, ce, cj, cf;
                for (cg = 0; cg < ch.cssRules.length; cg++) {
                    if (ch.cssRules[cg].selectorText === "#" + cd + "." + ci) {
                        cj = cl.charAt(0).toLowerCase() + cl.slice(1);
                        if (ch.cssRules[cg].style[cj] !== undefined) {
                            ch.cssRules[cg].style[cj] = ck
                        }
                        cf = cb(cl, ch.cssRules[cg]);
                        for (ce = 0; ce < cf.length; ce++) {
                            if (ch.cssRules[cg].style[cf[ce] + cl] !== undefined) {
                                ch.cssRules[cg].style[cf[ce] + cl] = ck
                            }
                        }
                    }
                }
            }

            function b2(cd, ce) {
                var cf = null;
                switch (ce) {
                    case "show":
                        cf = {
                            effectCSS: _cjq.crispAdFramework.getAdDefProperty(b8, cd.id, "showEffectCSS"),
                            duration: _cjq.crispAdFramework.getAdDefProperty(b8, cd.id, "showDuration"),
                            delay: _cjq.crispAdFramework.getAdDefProperty(b8, cd.id, "showDelay")
                        };
                        break;
                    case "hide":
                        cf = {
                            effectCSS: _cjq.crispAdFramework.getAdDefProperty(b8, cd.id, "hideEffectCSS"),
                            duration: _cjq.crispAdFramework.getAdDefProperty(b8, cd.id, "hideDuration"),
                            delay: _cjq.crispAdFramework.getAdDefProperty(b8, cd.id, "hideDelay")
                        };
                        break
                }
                return cf
            }

            function b1(ch) {
                var cf = ch.animationName,
                    cg, ci = new RegExp(cf, "g"),
                    ce, cd = 1000;
                for (ce = 0; ce < bY.length; ce++) {
                    if (cf === bY[ce]) {
                        cg = "in"
                    }
                }
                if (cf === "hinge") {
                    cg = "out"
                }
                if ((/In/).test(cf)) {
                    cg = "in"
                } else {
                    if ((/Out/).test(cf)) {
                        cg = "out"
                    }
                }
                _cjq.crispAdFramework.effectEndState(ch.target, cg);
                ch.target.className = ch.target.className.replace(ci, "");
                effectProperties = b2(bZ, b7);
                if (effectProperties) {
                    cd = 0;
                    if (effectProperties.delay) {
                        cd += parseInt(effectProperties.delay, 10)
                    }
                    if (effectProperties.duration) {
                        cd += parseInt(effectProperties.duration, 10)
                    }
                }
                setTimeout(function() {
                    _cjq.crispAdFramework.trigger("end_crisp_transition", [b8, bZ.id, b7])
                }, cd)
            }

            function b0(cl, cd, ci, ch) {
                var cn = ci.effectCSS,
                    ce = ci.duration,
                    cg = ci.delay,
                    cj, cm, ck = [],
                    cf;
                if (ch === "in") {
                    cd.style.opacity = 0
                }
                for (cf = 0; cf < bY.length; cf++) {
                    if (cl === bY[cf]) {
                        cd.style.opacity = 1
                    }
                }
                if ((!!ci.showDelay) && (!!ci.showDuration)) {
                    cg = parseInt(ci.showDelay, 10) + parseInt(ci.showDuration, 10) + parseInt(cg, 10)
                }
                if (cd.id === _cjq.crispAdFramework.closeBannerId && _cjq.pWin && _cjq.pWin._cjq.AdEngine) {
                    bU(true);
                    cd = window.parent.document.getElementById(_cjq.pWin._cjq.AdEngine.closeBannerId)
                } else {
                    bU()
                } if (!cd) {
                    return
                }
                cj = b5(cn, cl);
                if (cj) {
                    _cjq.crispAdFramework.setBannerCloseAnimationCss(cj)
                }
                if (!!cj) {
                    cm = "#" + cd.id + cj.effectClass;
                    ck = cj.effectKeyFrames
                }
                b9.sheet.insertRule(cm, 0);
                if (!!ce) {
                    cc(b9.sheet, cl, "AnimationDuration", ce + "ms", cd.id)
                }
                if (!!cg) {
                    cc(b9.sheet, cl, "AnimationDelay", cg + "ms", cd.id)
                }
                for (cf = 0; cf < ck.length; cf++) {
                    b9.sheet.insertRule(ck[cf], 0)
                }
                if (!_cjq.crispAdFramework.animationListeners.hasOwnProperty(cd.id)) {
                    cd.addEventListener("webkitAnimationEnd", b1);
                    cd.addEventListener("animationend", b1);
                    _cjq.crispAdFramework.animationListeners[cd.id] = true
                }
                cd.className += " " + cl
            }
            if (!b7 || !bZ || !b8) {
                console.log("ERR in handleEffects(): missing parameter")
            }
            _cjq.crispAdFramework.trigger("start_crisp_transition", [b8, bZ.id, b7]);
            if ((b7 === "hide") && !!b3 && (b3 !== " ") && bW && (bC(b4))) {
                b6 = b2(bZ, b7);
                b0(b3, bZ, b6, "out")
            }
            if (b7 === "show") {
                if (!!bX && (bX !== " ")) {
                    ca = b2(bZ, b7);
                    b0(bX, bZ, ca, "in")
                }
            }
        },
        isAnimationCompScriptToRun: function(bX, b0) {
            var bV = _cjq.crispAdFramework.getAdJson(bX),
                bU, bY, bZ, bW;
            if (bV) {
                bU = bV.definition;
                for (bW in bU) {
                    if (bU.hasOwnProperty(bW)) {
                        bZ = bU[bW];
                        if (bZ.id == b0) {
                            bY = bZ
                        }
                    }
                }
            }
            if (bY && (["sencha_animation", "swiffy_component", "monotype_bering_component"].indexOf(bY.componentname) > -1) && !document.getElementById(bY.id)) {
                return false
            }
            return true
        },
        getAnimationComp: function(bX, bU) {
            var bW = _cjq.crispAdFramework.getAdJson(bX),
                bV, bY;
            if (bW) {
                bV = bW.definition;
                for (bY in bV) {
                    if (bV.hasOwnProperty(bY)) {
                        o = bV[bY];
                        if ((["sencha_animation", "swiffy_component", "monotype_bering_component"].indexOf(o.componentname) > -1) || (o.componentname.indexOf("animation") > -1)) {
                            if (o.params && o.params["#displayStage#"] === bU) {
                                return (o)
                            }
                        }
                    }
                }
            }
            return null
        },
        handleAnimationComponents: function(bW, bZ, b1) {
            var b2 = function(b9, b7, cb, b6, b4) {
                if (b9) {
                    try {
                        _cjq.crispAdFramework.trigger("start_crisp_animation", [b7, cb.id, b6]);
                        if (!_cjq.crispAdFramework.animationRan) {
                            _cjq.crispAdFramework.animationRan = {}
                        }
                        if ((b4 === "true" || b4 == true) && _cjq.crispAdFramework.animationRan[cb.id]) {
                            return
                        }
                        _cjq.crispAdFramework.animationRan[cb.id] = true;
                        var b5 = bV.params["#evtobjectname#"],
                            b8 = bV.params["#evtplacement#"];
                        if (bo === true) {
                            _cjq.crispAdFramework.trackEngagement(b7, b5, b8, "animation")
                        }
                        b9 = b9.replace(/\(\);/, "");
                        bX[b9].call()
                    } catch (ca) {
                        console.log(ca)
                    }
                }
            };
            var bV = _cjq.crispAdFramework.getAnimationComp(bW, bZ),
                b0, b3 = document,
                bU, bX = window,
                bY;
            if (!bV || !bV.params || !bV.params["#animationStartScript#"]) {
                return
            }
            if (bV.params && (b1 === "autoplay" && bV.params["#autoplay#"] === "true") || (b1 === "inview" && (bV.params["#startInView#"] === "true" && _cjq.crispAdFramework.crispBannerInview == true))) {
                bU = b3.getElementById(bV.id);
                b0 = bV.params["#animationStartScript#"];
                if (!bU) {
                    if (_cjq && _cjq.pWin && _cjq.pWin.document && _cjq.pWin.document.getElementById(_cjq.crispAdFramework.adframeid) && _cjq.pWin.document.getElementById(_cjq.crispAdFramework.adframeid).contentDocument) {
                        b3 = _cjq.pWin.document.getElementById(_cjq.crispAdFramework.adframeid).contentDocument;
                        bX = _cjq.pWin.document.getElementById(_cjq.crispAdFramework.adframeid).contentWindow
                    }
                    bU = b3.getElementById(bV.id);
                    if (!bU) {
                        return
                    }
                }
                bY = bV.params["#runOnlyOnce#"];
                if (bU.style.display === "block" || bU.style.display === "") {
                    b2(b0, bW, bV, bZ, bY)
                } else {
                    bU.addEventListener("cac_component_show", function() {
                        b2(b0, bW, bV, bZ, bY)
                    })
                }
            }
        },
        showAndHide: function(cc, cf, cj, ct, cO, cm, cg) {
            var cK = true,
                b2 = document,
                cD, b5, cE, bU, cC, b4, cs, cF, cN, cI, cB, cf, b3, b6, bW;

            function cx(cQ) {
                var cP = "''";
                if (aA(cQ)) {
                    cP = ["new Array('", cQ.join("', '"), "')"].join("")
                }
                return cP
            }
            if (cO && cO > 0) {
                cC = cx(cf);
                b4 = cx(cj);
                if (_cjq.crispAdFramework) {
                    cs = setInterval(function() {
                        if (bt[cc].adRendered) {
                            clearInterval(cs);
                            timeoutTimer = setTimeout(function() {
                                eval(["_cjq.crispAdFramework.showAndHide('", cc, "', ", cC, ", ", b4, ", '", ct, "')"].join(""))
                            }, cO)
                        }
                    }, 500)
                }
            } else {
                b2 = _cjq.crispAdFramework.getFrameDocument();
                bp(cc, cf, cj);
                _cjq.crispAdFramework.trigger("cac_track_showandhide", [cc, cf, cj, ct]);
                if (ag(cf, cj, cc)) {
                    bt[cc].showList = cf;
                    bt[cc].hideList = cj
                }
                if (ct === "expand") {
                    bW = this.hiddenComponentsForStage(cc, "panel")
                }
                if (cm) {
                    window.scrollTo(window.pageXOffset, cm)
                }
                cF = bt[cc].topDiv;
                var bY;
                for (cD = 0; cD < cj.length; cD++) {
                    if (cj.hasOwnProperty(cD)) {
                        if (!b2.getElementById(cj[cD])) {
                            continue
                        }
                        bY = b2.getElementById(cj[cD]);
                        if (bY) {
                            var cz = _cjq.crispAdFramework.getAdDefProperty(cc, cj[cD], "hideEffect"),
                                bX = bt[cc].adRendered,
                                cb = _cjq.crispAdFramework.getAdDefProperty(cc, cj[cD], "#hideTrigger#"),
                                cn = _cjq.crispAdFramework.getAdDefProperty(cc, cj[cD], "#hideTriggerEvent#");
                            if (!!cz && (cz !== " ") && bX) {
                                if (bC(cb)) {
                                    if (ct === "expand") {
                                        if (bW.indexOf(cj[cD]) !== -1) {
                                            bY.style.display = "none"
                                        }
                                    }
                                    if (bY.style.display !== "none") {
                                        _cjq.crispAdFramework.handleEffects(cc, bY, "hide")
                                    }
                                } else {
                                    if (cb === "Custom event" && cn) {
                                        _cjq.crispAdFramework.bind(cn, function(cT, cS) {
                                            if (cS && cS.length > 0) {
                                                var cR = document.getElementById(cS[1]),
                                                    cQ = cS[0];
                                                var cP = (function(cV) {
                                                    var cU = cV;
                                                    return _cjq.crispAdFramework.handleEffects(cQ, cU, "hide")
                                                })(cR);
                                                _cjq.crispAdFramework.bind("cac_run_hideeffects", cP, null, true)
                                            }
                                        })
                                    } else {
                                        bY.style.display = "none"
                                    }
                                }
                            } else {
                                bY.style.display = "none"
                            }
                            evt = b2.createEvent("Event");
                            evt.initEvent("cac_component_hide", true, true);
                            bY.dispatchEvent(evt)
                        } else {
                            continue
                        }
                        b5 = {
                            id: cj[cD]
                        };
                        cE = aN(b5, cc);
                        if (cE) {
                            bU = cE.params;
                            if (bU) {
                                if (bU["#evtplacement#"] === "panel") {
                                    if (bt[cc].adRendered) {
                                        setTimeout(function() {
                                            _cjq.crispAdFramework.startTimeDisplayTracker(cc, "display", "banner", bt[cc].bannerName)
                                        }, 10);
                                        bt[cc].panelOpenVar = null
                                    }
                                    _cjq.crispAdFramework.setPanelWidth(cc, parseInt(bY.style.width, 10));
                                    _cjq.crispAdFramework.setPanelHeight(cc, parseInt(bY.style.height, 10))
                                } else {
                                    if (bU["#evtplacement#"] === "banner") {
                                        cK = false
                                    } else {
                                        if (bU["#clicktype#"] === "video") {
                                            _cjq.crispAdFramework.trigger("cac_video_action", [cc, cj[cD], "hide"])
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (!cK) {
                    bt[cc].openPanelObjName = null
                }
                for (cD = 0; cD < cf.length; cD++) {
                    if (cf.hasOwnProperty(cD)) {
                        if (!b2.getElementById(cf[cD])) {
                            continue
                        }
                        bY = b2.getElementById(cf[cD]);
                        evt = b2.createEvent("Event");
                        evt.initEvent("cac_component_show", true, true);
                        bY.dispatchEvent(evt);
                        b5 = {
                            id: cf[cD]
                        };
                        cE = aN(b5, cc);
                        var ci = _cjq.crispAdFramework.getOrientation();
                        if (al(cf[cD], cc)) {
                            b2.getElementById(cf[cD]).style.display = "none"
                        }
                        var b7 = _cjq.crispAdFramework.getAdDefProperty(cc, cf[cD], "-webkit-transition-property");
                        if (bY) {
                            if (b7 === "slide-in") {
                                bY.style.opacity = 0;
                                if (!al(cf[cD], cc)) {
                                    bY.style.display = "block"
                                }
                                var cM = _cjq.crispAdFramework.getAdDefProperty(cc, cf[cD], "slide-in-direction");
                                var cq = "",
                                    cp, bV, cr, b9, cG = 1;
                                switch (cM) {
                                    case "top to bottom":
                                        cq = "top";
                                        cp = -1;
                                        b9 = 1000;
                                        if (_cjq.crispAdFramework.isAdhere(cc)) {
                                            b9 = window.innerHeight
                                        }
                                        break;
                                    case "left to right":
                                        cq = "left";
                                        b9 = window.innerWidth;
                                        cp = -1;
                                        break;
                                    case "right to left":
                                        cq = "left";
                                        b9 = window.innerWidth;
                                        cp = 1;
                                        break;
                                    default:
                                        cq = "top";
                                        b9 = window.innerHeight;
                                        if (_cjq.crispAdFramework.isAdhere(cc)) {
                                            b9 = 0
                                        }
                                        cp = 1;
                                        break
                                }
                                if (cE.params["#evtplacement#"] === "banner") {
                                    cG = 500
                                }
                                bV = bY.style[cq], cr = b9 * cp + "px";
                                bY.style[cq] = cr;
                                b2.getElementById(cf[cD]).style.opacity = 1;
                                (function(cQ, cR, cP) {
                                    setTimeout(function() {
                                        b2.getElementById(cP).style["-webkit-transition-property"] = "all";
                                        b2.getElementById(cP).style["-webkit-transform"] = "translate3d(0px,0px,0px)";
                                        b2.getElementById(cP).style[cQ] = cR
                                    }, cG)
                                }(cq, bV, cf[cD]))
                            } else {
                                var cA = new RegExp("-webkit-transition(-)*(\\w)*:(\\s)*opacity");
                                if (cA.exec(bY.style.cssText)) {
                                    bY.style.opacity = 0;
                                    if (!al(cf[cD], cc)) {
                                        bY.style.display = "block"
                                    }(function() {
                                        var cP = cf[cD];
                                        setTimeout(function() {
                                            b2.getElementById(cP).style.opacity = 1
                                        }, 500)
                                    }())
                                } else {
                                    if (!al(cf[cD], cc)) {
                                        a0(bY, cE);
                                        var co = _cjq.crispAdFramework.getAdDefProperty(cc, bY.id, "showEffect"),
                                            cz = _cjq.crispAdFramework.getAdDefProperty(cc, bY.id, "hideEffect"),
                                            cb = !!cz && _cjq.crispAdFramework.getAdDefProperty(cc, bY.id, "hideTrigger"),
                                            bZ = _cjq.crispAdFramework.getAdDefProperty(cc, bY.id, "#loop#"),
                                            cl = _cjq.crispAdFramework.getAdDefProperty(cc, bY.id, "#runOnlyOnceTransition#"),
                                            ce = _cjq.crispAdFramework.getAdDefProperty(cc, bY.id, "#showDelay#"),
                                            b0 = _cjq.crispAdFramework.getAdDefProperty(cc, bY.id, "#showDuration#"),
                                            cu = (parseInt(ce, 10) || 0) + (parseInt(b0, 10) || 0) + 1000,
                                            ch = parseInt((_cjq.crispAdFramework.getAdDefProperty(cc, bY.id, "#hideDelay#")) || 0),
                                            cv = parseInt(_cjq.crispAdFramework.getAdDefProperty(cc, bY.id, "#hideDuration#") || 0),
                                            cH = _cjq.crispAdFramework.getAdDefProperty(cc, bY.id, "#showEffectTrigger#"),
                                            b1 = _cjq.crispAdFramework.getAdDefProperty(cc, bY.id, "#showTriggerEvent#");
                                        if (ch > 0 || cv > 0) {
                                            cu = cu + ch + cv + 2000
                                        }
                                        if ((!!co && (co !== " "))) {
                                            if (a6(cH)) {
                                                if (cl !== "true" || (cl === "true" && !_cjq.crispAdFramework.runTransitionOnceShow[bY.id])) {
                                                    var cy = (function() {
                                                        var cP = bY;
                                                        return _cjq.crispAdFramework.handleEffects(cc, cP, "show")
                                                    })();
                                                    _cjq.crispAdFramework.bind("cac_run_showeffects", cy, null, true)
                                                }
                                                if (bZ === "true" || bZ == true) {
                                                    if (cl !== "true" || cl === "true" && !_cjq.crispAdFramework.runTransitionOnceShow[bY.id]) {
                                                        (function(cQ, cP) {
                                                            setInterval(function() {
                                                                if (!(!!cz && (cz !== " ") && bC(cb))) {
                                                                    cQ.style.opacity = "0"
                                                                }
                                                                component = cQ;
                                                                _cjq.crispAdFramework.handleEffects(cc, component, "show")
                                                            }, cP)
                                                        }(bY, cu))
                                                    }
                                                }
                                                _cjq.crispAdFramework.runTransitionOnceShow[bY.id] = true
                                            } else {
                                                if (b1) {
                                                    _cjq.crispAdFramework.bind(b1, function(cY, cQ) {
                                                        if (cQ && cQ.length > 0) {
                                                            var cS = document.getElementById(cQ[1]),
                                                                cU = cQ[0],
                                                                cR = _cjq.crispAdFramework.getAdDefProperty(cU, cS.id, "#loop#"),
                                                                cP = _cjq.crispAdFramework.getAdDefProperty(cU, cS.id, "#showDelay#"),
                                                                cZ = _cjq.crispAdFramework.getAdDefProperty(cU, cS.id, "#showDuration#"),
                                                                cX = (parseInt(cP, 10) || 0) + (parseInt(cZ, 10) || 0) + 1000,
                                                                cV = parseInt((_cjq.crispAdFramework.getAdDefProperty(cU, cS.id, "#hideDelay#")) || 0),
                                                                cT = parseInt(_cjq.crispAdFramework.getAdDefProperty(cU, cS.id, "#hideDuration#") || 0);
                                                            if (cV > 0 || cT > 0) {
                                                                cX = cX + cV + cT + 2000
                                                            }
                                                            var cW = (function(c1) {
                                                                var c0 = c1;
                                                                return _cjq.crispAdFramework.handleEffects(cU, c0, "show")
                                                            })(cS);
                                                            _cjq.crispAdFramework.bind("cac_run_showeffects", cW, null, true);
                                                            if (cR === "true" || cR == true) {
                                                                (function(c1, c0) {
                                                                    setInterval(function() {
                                                                        if (!(!!cz && (cz !== " ") && bC(cb))) {
                                                                            c1.style.opacity = "0"
                                                                        }
                                                                        component = c1;
                                                                        _cjq.crispAdFramework.handleEffects(cU, component, "show")
                                                                    }, c0)
                                                                }(cS, cX))
                                                            }
                                                        }
                                                    })
                                                }
                                            }
                                        }
                                        if (window.adParams && window.adParams.previewtype === "editmodepreview") {
                                            bY.style.opacity = "1"
                                        }
                                        bY.style.display = "block"
                                    }
                                }
                            }
                        } else {
                            continue
                        } if (cE) {
                            bU = cE.params;
                            if (bU) {
                                if (bU["#impressionable#"] && !cg) {
                                    this.trackImpression(cc, bU["#evtobjectname#"], bU["#evtplacement#"], bU["#impressionable#"], bU["#externalurl#"])
                                }
                                var ck = _cjq.crispAdFramework.adframeid || (document && document.body.getAttribute("data-adframeid"));
                                if (bU["#evtplacement#"] === "panel") {
                                    bt[cc].panelOpenVar = bU["#evtobjectname#"];
                                    if (bt[cc].adRendered) {
                                        setTimeout(function() {
                                            _cjq.crispAdFramework.startTimeDisplayTracker(cc, "display", "panel", bU["#evtobjectname#"])
                                        }, 10)
                                    }
                                    bt[cc].openPanelObjName = bU["#evtobjectname#"];
                                    bt[cc].panelStatus = "open";
                                    if (typeof bt[cc].firstRun === "undefined") {
                                        if (cE.script && cE.script.indexOf("_cjq.crispAdFramework.lightBoxHandler") > -1) {
                                            var cw = cE.id;
                                            setTimeout(function() {
                                                _cjq.crispAdFramework.regCenterListener({
                                                    type: "cac_panel_action"
                                                }, cc, cw)
                                            }, 100)
                                        } else {
                                            var ca = bt[cc].script;
                                            if (ca) {
                                                for (var cL in ca) {
                                                    if (ca.hasOwnProperty(cL) && cL.indexOf(cf[cD] + ".") > -1) {
                                                        if (ca[cL].indexOf("_cjq.crispAdFramework.lightBoxHandler") > -1) {
                                                            var cw = cE.id;
                                                            setTimeout(function() {
                                                                _cjq.crispAdFramework.regCenterListener({
                                                                    type: "cac_panel_action"
                                                                }, cc, cw)
                                                            }, 100);
                                                            break
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if (bt[cc].adRendered && !bt[cc].firstRun) {
                                        try {
                                            _cjq.crispAdFramework.trigger("cac_first_showhide", [cc])
                                        } catch (cJ) {
                                            console.log(cJ)
                                        }
                                        bt[cc].firstRun = "false"
                                    }
                                    if (cE.script && cE.script.indexOf("_cjq.crispAdFramework.lightBoxHandler") > -1) {} else {
                                        var b8 = false;
                                        var ca = bt[cc].script;
                                        if (ca) {
                                            for (var cL in ca) {
                                                if (ca.hasOwnProperty(cL) && cL.indexOf(cf[cD] + ".") > -1) {
                                                    if (ca[cL].indexOf("_cjq.crispAdFramework.lightBoxHandler") > -1) {
                                                        b8 = (window.adParams.panelType === "lightbox");
                                                        break
                                                    }
                                                }
                                            }
                                        }
                                        var cd = (/ipad/i.test(navigator.userAgent));
                                        if (!cd && !b8) {
                                            _cjq.crispAdFramework.setTopDivWidth(bY, cc, "open")
                                        }
                                        _cjq.crispAdFramework.setPanelWidth(cc, parseInt(bY.style.width, 10));
                                        _cjq.crispAdFramework.setPanelHeight(cc, parseInt(bY.style.height, 10))
                                    }
                                    try {
                                        _cjq.crispAdFramework.trigger("cac_panel_action", [cc, "open", cf[cD], cf, cE.isLightBox, cF, ck])
                                    } catch (cJ) {
                                        console.log(cJ)
                                    }
                                } else {
                                    if (bU["#evtplacement#"] === "banner") {
                                        bt[cc].panelStatus = "close";
                                        _cjq.crispAdFramework.setTopDivWidth(bY, cc, "close");
                                        _cjq.crispAdFramework.trigger("cac_panel_action", [cc, "close", ck]);
                                        bt[cc].openBannerObjName = bU["#evtobjectname#"]
                                    } else {
                                        if (bU["#clicktype#"] === "video") {
                                            _cjq.crispAdFramework.trigger("cac_video_action", [cc, cf[cD], "show"])
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        reInitialiseIdle: function(bU) {
            bt.idleTimer = new Date()
        },
        reStartTimeDisplayTracker: function(bU) {
            _cjq.crispTrackers.reStartTimeDisplayTracker(bU)
        },
        updateResolution: function(bU, bV) {
            bi(bU, bV)
        },
        updateOrientation: function(bU, bV) {
            bi(bU, bV)
        },
        closePanel: function(bY) {
            try {
                if (!bY) {
                    var bV = _cjq.crispAdFramework.getBannerIds(),
                        bY = _cjq.crispAdFramework.getTrackerkeyByBanner(bV[0])
                }
                var b1 = _cjq.crispAdFramework.getComponentNameToIdMap(bY, "panel-close-button"),
                    bZ = document.getElementById(b1),
                    bX = bZ && bZ.childNodes[1],
                    bU = document.createEvent("MouseEvents"),
                    bW = document.getElementById("cac_panel_bg");
                if (bW) {
                    bW.style.display = "none"
                }
                if (bU.initMouseEvent && bX) {
                    _cjq.crispAdFramework.closeByEvent = true;
                    bU.crispCustom = true;
                    bU.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                    bX.dispatchEvent(bU);
                    return true
                }
            } catch (b0) {
                console.log(b0);
                return false
            }
        },
        startInteractionProgressTracker: function(bU, bV) {
            _cjq.crispTrackers.startInteractionProgressTracker(bU, bV)
        },
        stopInteractionProgressTracker: function(bU) {
            bf(false, bU)
        },
        startEngagementProgressTracker: function(bU, bW, bV) {
            _cjq.crispTrackers.startEngagementProgressTracker(bU, bW, bV)
        },
        stopEngagementProgressTracker: function(bU, bV) {
            x(false, bU, bV)
        },
        startTimeDisplayTracker: function(bV, bW, bU, bX) {
            _cjq.crispTrackers.startTimeDisplayTracker(bV, bW, bU, bX)
        },
        stopTimeDisplayTracker: function(bU) {
            aa(false, bU)
        },
        clickTo: function(bV, bX, bY, bW, bU) {
            _cjq.crispTrackers.trackClick(bV, bU, bW, bY, bX);
            _cjq.crispAdFramework.stopInteractionProgressTracker(bV);
            this.stopTimeDisplayTracker(bV)
        },
        trackClick: function(bY, bW, bX, bV, bZ, bU) {
            _cjq.crispTrackers.trackClick(bY, bW, bX, bV, bZ, bU)
        },
        crispIncludeDom: function(bU, bV) {
            if (bV) {
                setTimeout('_cjq.crispAdFramework.crispIncludeDom("' + bU + '")', 1000)
            } else {
                bF(bU)
            }
        },
        trackImpression: function(bX, bV, bW, bY, bU) {
            _cjq.crispTrackers.trackImpression(bX, bV, bW, bY, bU)
        },
        trackInteraction: function(bZ, bV, bY, bX, b0, b1, b2, bU, bW) {
            _cjq.crispTrackers.trackInteraction(bZ, bV, bY, bX, b0, b1, b2, bU, bW)
        },
        trackGalleryInteraction: function(bW, bU, bV, bX, bY) {
            _cjq.crispTrackers.trackGalleryInteraction(bW, bU, bV, bX, bY)
        },
        trackGalleryEngagement: function(bX, bU, bV, bY, bW) {
            _cjq.crispTrackers.trackGalleryEngagement(bX, bU, bV, bY, bW)
        },
        trackGalleryInteractionAndEngagement: function(bX, bV, bW, bY, bU, bZ) {
            _cjq.crispTrackers.trackGalleryInteractionAndEngagement(bX, bV, bW, bY, bU, bZ)
        },
        trackEngagement: function(bW, bU, bV, bX) {
            _cjq.crispTrackers.trackEngagement(bW, bU, bV, bX)
        },
        trackConversion: function(bW, bV, bU, bX) {
            _cjq.crispTrackers.trackConversion(bW, bV, bU, bX);
            _cjq.crispAdFramework.trigger("cac_track_conversion", [bW, bV, bU, bX])
        },
        getConversionTrackerURL: function(bW, bV, bU, bX) {
            return _cjq.crispTrackers.getConversionTrackerURL(bW, bV, bU, bX)
        },
        getCustomInterationUrl: function() {
            _cjq.crispTrackers.getConversionTrackerURL(trackerkey, objectname, crispkey, parametersArray)
        },
        getCustomEngagementUrl: function() {
            _cjq.crispTrackers.getCustomEngagementUrl()
        },
        trackInteractionProgress: function(bW, bU, bV) {
            _cjq.crispTrackers.trackInteractionProgress(bW, bU, bV)
        },
        trackEngagementProgress: function(bW, bU, bV) {
            _cjq.crispTrackers.trackEngagementProgress(bW, bU, bV)
        },
        handleInteractionProgressTimer: function(bV, bU) {
            _cjq.crispTrackers.handleInteractionProgressTimer(bV, bU)
        },
        handleEngagementProgressTimer: function(bV, bU) {
            _cjq.crispTrackers.handleEngagementProgressTimer(bV, bU)
        },
        trackProgress: function(bX, bV, bW, bY, bU) {
            _cjq.crispTrackers.trackProgress(bX, bV, bW, bY, bU)
        },
        trackFirstAction: function(bW, bU, bV, bX) {
            _cjq.crispTrackers.trackFirstAction(bW, bU, bV, bX)
        },
        handleBannerClose: function(bV, bU) {
            if (!bU || isNaN(bU)) {
                return
            }
            bU = parseInt(bU);
            setTimeout(function() {
                _cjq.crispAdFramework.trigger("cac_banner_close", [bV])
            }, bU)
        },
        getBannerCloseAnimationCss: function() {
            return _cjq.crispAdFramework.closeButtonAnimationCss
        },
        setBannerCloseAnimationCss: function(bU) {
            _cjq.crispAdFramework.closeButtonAnimationCss = bU
        },
        closeBanner: function(bX, bY, bW) {
            if (document.getElementById(bL.CRISP_WRAPPER_DIV) && _cjq.adhesion) {
                if (!bW || bW === "") {
                    bW = "close and hide"
                }
                _cjq.crispAdFramework.stopTimeDisplayTracker(bX);
                _cjq.crispAdFramework.trigger("cac_banner_close", [bX])
            } else {
                var bU = _cjq.crispAdFramework.getDomBannerId(bX);
                var bZ = _cjq.crispAdFramework.getAdDefProperty(bX, null, "topDiv");
                var bV = document.getElementById(bZ);
                if (bV) {
                    bV.parentNode.removeChild(bV);
                    bG()
                } else {
                    if (bU.parentNode && bU.parentNode.parentNode) {
                        bU.parentNode.parentNode.removeChild(bU.parentNode);
                        bG()
                    }
                }
                _cjq.crispAdFramework.stopTimeDisplayTracker(bX);
                _cjq.crispAdFramework.trigger("cac_banner_close", [bX])
            }
        },
        getDomBannerId: function(bU) {
            if (bt[bU]) {
                return bt[bU].domBannerid
            }
            return null
        },
        getComponentNameToIdMap: function(bW, bU) {
            if (bt[bW]) {
                if (bU) {
                    var bV = bt[bW].componentNameToIdMap[bU];
                    if (bV && bV.length > 0) {
                        return bV[0]
                    }
                } else {
                    return bt[bW].componentNameToIdMap
                }
            }
            return null
        },
        instantiateParams: function(bX, b1, bU) {
            try {
                if (bt[bX].adhesionid) {
                    b1 = bt[bX].adhesionid
                }
            } catch (bZ) {}
            var bW = g(b1, bX),
                bV, bY, b0 = bW.params;
            if (b0) {
                for (bV in b0) {
                    if (b0.hasOwnProperty(bV)) {
                        if (bV === "undefined") {
                            continue
                        }
                        bY = b0[bV];
                        if (bY === "undefined" || "" === bY) {
                            continue
                        }
                        if (typeof bU !== "undefined") {
                            bV = bV.replace(/#/g, "");
                            if (bY === "true" || bY === "false") {
                                eval("__adhereProp." + bV + "=" + bY)
                            } else {
                                eval("__adhereProp." + bV + "='" + bY + "'")
                            }
                        } else {
                            eval("_cjq.crispAdFramework." + bV + "='" + bY + "';")
                        }
                    }
                }
            }
        },
        invokeAds: function(bY, bW, b2) {
            var bU, b4 = bY.divid,
                b5, bV;
            aE = u();
            if (((typeof bY.zid === "undefined" && typeof bY.zoneid === "undefined") || bY.zid <= 0 || bY.zoneid <= 0) && bY.bannerId > 0) {
                if (window.location.hostname.indexOf("3rdtag.com") < 0 && window.location.hostname.indexOf("shortn.me") < 0) {
                    var b1 = document.getElementById("crispBanner" + bY.bannerid),
                        bZ = document.createElement("div");
                    bZ.id = "crisp-error";
                    bZ.style.display = "none";
                    bZ.innerHTML = "Test tag used outside of test page.";
                    b1.parentNode.appendChild(bZ);
                    return
                }
            }
            _cjq.crispAdFramework.setThirdPartyTrackers(window.adParams);
            bY.componentVersion = b2;
            bt.useCookieCapping = true;
            if (bY.api) {
                bL.API_URL = bY.api
            }
            var bX = "",
                b0;
            if (typeof bY.zoneid !== "undefined") {
                bX = bY.zoneid
            } else {
                if (typeof bY.zid !== "undefined") {
                    bX = bY.zid
                } else {
                    bX = bY.zonekey
                }
            } if (typeof bY.bid !== "undefined") {
                b0 = bY.bid
            } else {
                if (typeof bY.bannerid !== "undefined") {
                    b0 = bY.bannerid
                } else {
                    b0 = null
                }
            } if (!b4) {
                b4 = ["z", bX, "p", bY.pubid].join("")
            }
            if (typeof bY.ph !== "undefined") {
                b5 = bY.ph
            }
            if (bY.prq === "true" || this.getQueryStringValue("prq") === "true") {
                _cjq.crispAdFramework.setPreviewRequest(true)
            }
            _cjq.crispAdFramework.params = "";
            if (bY.xp && bY.xp !== "%PRM%") {
                _cjq.crispAdFramework.params = bY.xp;
                pubParams = bY.xp;
                bV = pubParams.split("&");
                bV = bV.map(function(b9) {
                    var b7 = b9.split("="),
                        b6, b8;
                    if (b7.length === 2) {
                        b6 = b7[0];
                        b8 = b7[1];
                        if (b6 !== "" && b8 !== "") {
                            if (b6 === "tparam" || b6 === "lparam" || b6 === "cparam") {
                                b8 = window.encodeURIComponent(b8)
                            }
                            return [b6, b8].join("=")
                        }
                    }
                });
                bV = bV.filter(function(b6) {
                    return b6
                });
                __CrispPubParam = "&" + bV.join("&")
            }
            if (bY.packageType && bY.packageType !== "") {
                if ("cdn" === bY.packageType) {
                    bL.API_CDN_URL = bY.cs;
                    bU = this.getCdnUrl(bY.sitekey, bY, b4)
                } else {
                    bL.API_CDN_URL = "";
                    bU = this.getLocalUrl(bX, b0, bY.idprefix + "-ad.json", b4)
                }
            } else {
                bU = this.getSingleAdRequestUrl(bY.sitekey, bX, bY.pubid, b0, bY.catkey, b4, bY.partnerkey, b5, b2)
            }
            debugConsole = (typeof console === "undefined") ? false : true;
            var b3 = this.getQueryStringValue("nocache");
            _cjq.crispAdFramework.adRequestVersion = b2;
            bN(b4, bU, bY, b3)
        },
        handleCloseInterstitial: function(bX, bY, bW, bV) {
            var bU = _cjq.crispAdFramework.adframeid || (document && document.body.getAttribute("data-adframeid"));
            setTimeout(function() {
                _cjq.crispAdFramework.trigger("cac_banner_close", [bX, bY, bW, bV, bU])
            }, 1)
        },
        isHiResoultion: function() {
            return (_cjq.crispAdFramework.getResolution() === bL.HIRES)
        },
        isPortrait: function() {
            return (_cjq.crispAdFramework.getOrientation() === bL.PORTRAIT)
        },
        getLocalUrl: function(bV, bY, bX, bZ) {
            var bU = Math.floor(Math.random() * 999999),
                bW = bX;
            if (!bt.adId) {
                bt.adId = []
            }
            if (typeof bZ !== "undefined") {
                bt.adId[bZ] = bU
            }
            return bW
        },
        updatePanelInViewport: function(ch, cg, cd, b8) {
            var b3, b4, b9, bY, b2, cb, b6, bX, ce, b5, ca = 0,
                b1 = Number.MAX_VALUE,
                bV = null,
                b0 = 30,
                ck = bt[cg].showList,
                cf = navigator.userAgent.toLowerCase(),
                bU = (cf.indexOf("ipad") !== -1 || cf.indexOf("iphone os 4") !== -1),
                cc, cj, b7, ci, bW;
            if (bt[cg].isLightBox) {
                return
            }
            if (typeof counter === "undefined") {
                counter = 0
            }
            if (!cg && ch.data) {
                cg = ch.data.trackerkey
            }
            ck = bt[cg].showList;
            if (bt[cg].panelStatus !== "open") {
                return
            }
            if (ch && ch.type === "scroll") {
                window.scrollTo(0, bt[cg].scrollPos);
                return
            }
            cc = function() {
                _cjq.crispAdFramework.updatePanelInViewport(ch, cg, cd)
            };
            b3 = bt[cg].topDiv;
            for (b4 in ck) {
                if (ck.hasOwnProperty(b4)) {
                    if (ck[b4].indexOf("_adhere_") !== -1) {
                        return
                    }
                    if (!document.getElementById(ck[b4])) {
                        continue
                    }
                    b9 = document.getElementById(ck[b4]).offsetHeight + document.getElementById(ck[b4]).offsetTop;
                    cj = aN({
                        id: ck[b4]
                    }, cg);
                    bY = document.getElementById(ck[b4]);
                    var bZ = _cjq.crispAdFramework.getImageObject(bY);
                    if (bZ && bZ.height === 0 && !b8 && counter < b0) {
                        counter = counter + 1;
                        setTimeout(cc, 100);
                        return
                    }
                    if (b9 > ca) {
                        ca = b9
                    }
                    if (parseInt(document.getElementById(ck[b4]).style.top, 10) < b1) {
                        b1 = parseInt(document.getElementById(ck[b4]).style.top, 10)
                    }
                    b2 = 0;
                    if (bY && bY.childNodes) {
                        for (cb in bY.childNodes) {
                            if (navigator && navigator.appName === "Microsoft Internet Explorer" || bY.childNodes.hasOwnProperty(cb)) {
                                if (!bY.childNodes[cb].tagName) {
                                    continue
                                }
                                b2 = b2 + 1;
                                if (bY.childNodes[cb].attributes) {
                                    if (ck[b4].match(/cac_panel$/) && bY.childNodes[cb].attributes.name && bY.childNodes[cb].attributes.name.value === "cac_panel_bg") {
                                        continue
                                    }
                                }
                                b6 = bY.childNodes[cb];
                                if (!b6.style || !b6.offsetHeight || !b6.id) {
                                    continue
                                }
                                b9 = b6.offsetHeight + b6.parentNode.offsetTop;
                                if (b9 > ca) {
                                    ca = b9
                                }
                                if (b6.offsetTop + b6.parentNode.offsetTop < b1) {
                                    b1 = b6.offsetTop + b6.parentNode.offsetTop
                                }
                            }
                        }
                    }
                }
            }
            counter = 0;
            bX = null;
            ce = bT();
            ca = Math.round(ca);
            b1 = Math.round(b1);
            b7 = document.getElementById(b3);
            ci = 0;
            do {
                ci += b7.offsetTop
            } while (b7 = b7.offsetParent);
            b5 = ci;
            bW = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
            if (ca > 0) {
                bV = ca + b5;
                if (bV > (bW + ce) || b8) {
                    if (ce > ca) {
                        bX = (b5 + ca - ce)
                    } else {
                        bX = b5
                    }
                } else {
                    if (b5 < bW) {
                        bX = b5
                    } else {
                        bt[cg].scrollPos = bW
                    }
                }
            }
            bV = b1 + b5;
            if (bV < bW || bV + ca - b1 > bW + ce) {
                if (ca - b1 >= ce) {
                    bX = bV
                } else {
                    bX = b5 + ca - ce
                }
            } else {
                bt[cg].scrollPos = bW
            } if (bX !== null) {
                bt[cg].scrollPos = bX;
                setTimeout(function() {
                    window.scrollTo(0, bX)
                }, 10);
                if (ce !== bT() && !b8) {
                    _cjq.crispAdFramework.updatePanelInViewport(ch, cg, cd, true)
                }
            }
        },
        getCdnUrl: function(b2, bW, b1) {
            var bX = Math.floor(Math.random() * 999999),
                bY = bL.API_CDN_URL,
                bU, b0, bZ = bW.pubid,
                bV = bW.zid,
                b3 = bW.bannerid;
            name = ["CrispAd-", b2 || "DEFAULT", "-p", bZ, "-z", bV, "-b", b3, "-h", bW.phases, ".json"].join("");
            if (bW.cdnUrl) {
                bY = bW.cdnUrl
            }
            if (!b(bY, "/")) {
                bY = bY + "/"
            }
            if (bW.cdnUrl) {
                b0 = ""
            } else {
                if (bW.agency && bW.advid && bW.cmpid) {
                    b0 = bW.agency + "/" + bW.advid + "/" + bW.cmpid + "/"
                } else {
                    b0 = bW.cp
                }
            }
            bU = bY + b0 + name;
            if (!bt.adId) {
                bt.adId = []
            }
            if (typeof b1 !== "undefined") {
                bt.adId[b1] = bX
            }
            return bU
        },
        hidePanelShowBanner: function(bW) {
            if (!bt[bW].openPanelObjName) {
                return
            }
            var bU = bz(bt[bW].panelObjList, bt[bW].openPanelObjName + ":", false, null),
                bV = bz(bt[bW].panelObjList, bt[bW].openBannerObjName + ":", true, bt[bW].bannerObjList);
            this.showAndHide(bW, bV, bU, "menu", "expand");
            _cjq.crispAdFramework.trigger("cac_adhere_show_menu")
        },
        setFirstAction: function(bU) {
            if (window.parent._cjq) {
                window.parent._cjq.AdBridge.firstActionHolder.firstAction = bU
            }
        },
        handleFirstAction: function(bW, bU, bV, bX) {
            this.trackFirstAction(bW, bU, bV, bX);
            this.setFirstAction(false)
        },
        getFirstAction: function() {
            if (window.parent._cjq) {
                return window.parent._cjq.AdBridge.firstActionHolder.firstAction
            }
        },
        getSecondActionObject: function() {
            if (window.parent._cjq && window.parent._cjq.AdBridge) {
                return window.parent._cjq.AdBridge.secondActionHolder
            } else {
                return {
                    secondAction: true,
                    globalTimer: null,
                    limit: 3
                }
            }
        },
        setSecondAction: function(bV, bU) {
            if (window.parent._cjq) {
                window.parent._cjq.AdBridge.secondActionHolder[bV] = bU
            }
        },
        getQueryStringValue: function(bZ) {
            var bU = location.search.substr(1, location.search.length),
                bY = bU.split("&"),
                bW, bV, bX;
            for (bW = 0; bW < bY.length; bW = bW + 1) {
                bV = bY[bW].split("=");
                bX = bV[0];
                if (bZ === bX) {
                    return bV[1]
                }
            }
            return null
        },
        getInAppValue: function() {
            var bU = _cjq.crispAdFramework.adBridge && _cjq.crispAdFramework.adBridge.getAppProps && _cjq.crispAdFramework.adBridge.getAppProps();
            return bU
        },
        getLocationValue: function() {
            var bV;
            if (window.location && window.location.href) {
                function bU(b1) {
                    var bX, b0 = "",
                        bY = "",
                        bW, bZ;
                    b0 = b1.split(":")[0];
                    if (b1.indexOf("//") > -1) {
                        bW = b1.indexOf("//");
                        bZ = b1.indexOf("/", bW + 2);
                        if (bZ > -1 && bZ < 255) {
                            bY = ":" + b1.slice(bW, bZ)
                        }
                    }
                    bX = b0 + bY;
                    return bX
                }
                bV = encodeURIComponent(bU(window.location.href))
            }
            return bV
        },
        registerImpressionCallback: function(bX, ca, cb, bW, ce) {
            var cj = false,
                b7 = _cjq.crispAdFramework.getParamValue(bX, "zoneid"),
                bV = _cjq.crispAdFramework.getAdDefProperty(ce, null, "capping"),
                cd, cf;
            function b5(ck) {
                var cq = {},
                    cn, co, cm, cl, cp;
                if (!ck) {
                    return cq
                }
                co = ck.split(/[;&]/);
                for (cn = 0; cn < co.length; cn = cn + 1) {
                    cm = co[cn].split("=");
                    if (cm && cm.length === 2) {
                        cl = cm[0];
                        cp = cm[1];
                        cq[cl] = cp
                    }
                }
                return cq
            }

            function b6(ck) {
                var cl = "";
                for (param in ck) {
                    if (ck.hasOwnProperty(param)) {
                        cl += ["&", param, "=", ck[param]].join("")
                    }
                }
                return cl
            }
            if (cb === true) {
                cb = bV
            }
            if (!az) {
                return
            }
            if (!bX) {
                return
            }
            cd = _cjq.crispAdFramework.getParamValue(bX, "partnerkey");
            if (!cd) {
                console.log("partnerkey not set!!!");
                return
            }
            var cc, bY = "",
                b2 = 'ccb166573Impr',//bL.BASE_CALLBACKNAME + Math.floor(Math.random() * 999999) + "Impr",
                b9 = _cjq.crispAdFramework.getCrispKey(),
                b1 = bX + "&callback=" + b2 + "&crispkey=" + b9,
                cg = false,
                bZ = false;
            if (b7.toString() === "0") {
                b1 = b1 + "&conn=0"
            }
            if (typeof adParams.cdn !== "undefined") {
                b1 = b1 + "&random=" + Math.floor(Math.random() * 999999)
            }
            var b8 = _cjq.crispAdFramework.getLocationValue();
            if (!!b8) {
                b1 = b1 + "&loc=" + b8
            }
            var ch = _cjq.crispAdFramework.getInAppValue();
            if (!!ch) {
                b1 = b1 + "&inapp=" + window.encodeURIComponent(ch)
            }
            window.parent._cjq.AdBridge.impressionsFiredAt = new Date();
            window[b2] = function(ck) {
                if (ck) {
                    cc = eval(ck);
                    ak(cc);
                    if (!bW || bW === "true") {
                        bs(cc)
                    }
                    ab(cc);
                    if (ce && bt[ce]) {
                        if (!bt[ce]["request_host"] || bt[ce]["request_host"] === "" || bt[ce]["request_host"] === "undefined") {
                            bt[ce]["request_host"] = cc.request_host
                        }
                        if (!bt[ce].displayTimeUrl || bt[ce].displayTimeUrl === "" || bt[ce].displayTimeUrl === "undefined") {
                            bt[ce].displayTimeUrl = cc.displayTimeUrl
                        }
                    }
                }
            };
            if (ce) {
                cj = _cjq.crispAdFramework.getAdPropertyVars(ce, "enableClientTracking")
            }

            function ci() {
                var cl = ["%VIEWURL%", "${VIEWURL}", "${REQUESTID}", "%VEW%", "%i", "%%VIEW_URL_ESC%%", "{logurl}"],
                    ck;
                for (ck = 0; ck < cl.length; ck++) {
                    if (__CrispExternalViewURL === cl[ck]) {
                        return false
                    }
                }
                return true
            }
            if (window.__CrispExternalViewURL !== undefined) {
                bZ = ci()
            } else {
                bZ = false
            } if (!cj || cj === "false") {
                if (bZ) {
                    bY = [bY, "&xurl=", escape(__CrispExternalViewURL)].join("")
                }
                if (ca) {
                    bY = [bY, "&xurl=", escape(ca)].join("")
                }
            }
            b1 = [b1, bY].join("");
            f = _cjq.crispAdFramework.getDelegate("banner-impression");
            if (typeof f === "function") {
                cg = f(b1)
            }
            if (!cg) {
                bF(b1, cb, "roundtripimpression")
            } else {
                var b3 = _cjq.crispAdFramework.getAdDefProperty(ce, null, "topDiv"),
                    b0 = Math.floor(Math.random() * bt.adId[b3] * bt.adId[b3]);
                bt.crispkey = b0
            }
            var b4 = a1(ce);
            var bU = _cjq.crispAdFramework.getAdPropertyVars(ce, "view");
            if (cj === "true") {
                if (bZ) {
                    if (b4) {
                        __CrispExternalViewURL = bu(__CrispExternalViewURL);
                        A(__CrispExternalViewURL)
                    } else {
                        bl(__CrispExternalViewURL)
                    }
                }
                if (ca && bU) {
                    bU = bu(bU);
                    A(bU)
                } else {
                    if (ca) {
                        if (b4) {
                            ca = bu(ca);
                            A(ca)
                        } else {
                            bl(ca)
                        }
                    }
                    if (bU) {
                        bU = bu(bU);
                        A(bU)
                    }
                }
            }
        },
        getAdPropertyVars: function(bV, bW) {
            if (!bt[bV]) {
                bV = bt[bV]
            }
            if (bt[bV].properties && bt[bV].properties.length > 0) {
                for (i = 0; i < bt[bV].properties.length; i++) {
                    var bU = bt[bV].properties[i].key;
                    if (bU === bW) {
                        return bt[bV].properties[i].value
                    }
                }
            }
            return null
        },
        getCradleProps: function(bU, bV) {
            var bW = bt[bU].adhesionid;
            _cjq.crispAdFramework.getAdDefProperty(bU, bW, bV)
        },
        getComponentFromId: function(bV, bW) {
            var bU = bt[bV];
            if (bU) {
                tmp = bU.definition;
                for (obj in tmp) {
                    if (tmp.hasOwnProperty(obj)) {
                        o = tmp[obj];
                        if (o.params && o.params["#evtobjectid#"] === bW) {
                            return (o)
                        }
                    }
                }
            }
            return null
        },
        getComponentId: function(bW, bU) {
            var bV = bt[bW];
            if (bV) {
                tmp = bV.definition;
                for (obj in tmp) {
                    if (tmp.hasOwnProperty(obj)) {
                        o = tmp[obj];
                        var bX = parseInt(o.params["#evtobjectid#"]);
                        if (o.params && o.params["#evtobjectname#"] === bU) {
                            if (o.params["#evtobjectid#"]) {
                                if (bX !== 0) {
                                    return (o.params["#evtobjectid#"])
                                } else {
                                    console.log("invalid id" + bX)
                                }
                            }
                        }
                    }
                }
            }
            return null
        },
        getAdDefProperty: function(bZ, bV, b2, bU) {
            var b3, bY = _cjq.crispAdFramework.getOrientation(),
                b0 = _cjq.crispAdFramework.getResolution(),
                bW, b4;
            if (!bV) {
                b3 = bt[bZ];
                if (b2 === "width" && bY === bL.LANDSCAPE) {
                    b4 = _cjq.crispAdFramework.getAdPropertyVars(bZ, "landscapeWidth");
                    if (!isNaN(b4) && !(b4 === 0 || b4 === "0")) {
                        return b4
                    }
                }
                if (b2 === "height" && bY === bL.LANDSCAPE) {
                    bW = _cjq.crispAdFramework.getAdPropertyVars(bZ, "landscapeHeight");
                    if (!isNaN(bW) && !(bW === 0 || bW === "0")) {
                        return bW
                    }
                }
                if (b3[b2] !== undefined) {
                    return b3[b2]
                } else {
                    return b3["#" + b2 + "#"]
                }
            }
            b3 = g(bV, bZ);
            if (!b3) {
                return null
            }
            if (b2 === bL.IMAGESRCPARAM || b2 === bL.HIRESSRCPARAM || b2 === bL.IMAGESRC || b2 === bL.HIRESSRC) {
                return _cjq.crispAdFramework.getAppropriateResSrc(b3, b2, b0, bY, true)
            }
            if (bU === true) {
                return _cjq.crispAdFramework.getAppropriateResSrc(b3, b2, b0, bY, false)
            }
            if (bY === bL.LANDSCAPE) {
                if (b3.override && b3.override.landscape) {
                    var bX = b3.override.landscape;
                    if (bX[b2]) {
                        return bX[b2]
                    } else {
                        if (bX.params) {
                            var b1 = bX.params[b2] || bX.params["#" + b2 + "#"];
                            if (b1) {
                                return b1
                            }
                        }
                    }
                }
            }
            if (b3[b2]) {
                return b3[b2]
            }
            if (b3.params) {
                return b3.params[b2] || b3.params["#" + b2 + "#"]
            }
        },
        isHiResParam: function(bV, bU) {
            if (_cjq.crispAdFramework.hiResComponentParamMap) {
                return _cjq.crispAdFramework.hiResComponentParamMap[bV + "__" + bU]
            }
            return false
        },
        setHiResMap: function(bV, bU) {
            if (!_cjq.crispAdFramework.hiResComponentParamMap) {
                _cjq.crispAdFramework.hiResComponentParamMap = {}
            }
            bU = bU.replace(/#/g, "");
            _cjq.crispAdFramework.hiResComponentParamMap[bV + "__" + bU] = true
        },
        getAppropriateResSrc: function(bY, b0, bX, bW, bZ) {
            var b1 = null,
                bU = null;
            if (bZ === true) {
                if (b0 === bL.IMAGESRCPARAM || b0 === bL.IMAGESRC || b0 === bL.HIRESSRCPARAM || b0 === bL.HIRESSRC) {
                    b1 = bL.HIRESSRCPARAM
                }
            } else {
                if (b0.indexOf(bL.HIRESPREFIX) === -1) {
                    b1 = a(b0, bL.HIRESPREFIX)
                }
            } if (bX === bL.HIRES) {
                if (bW === bL.LANDSCAPE) {
                    if (bY.override && bY.override.landscape) {
                        var bV = bY.override.landscape;
                        if (bV.params) {
                            if (b1) {
                                bU = bV.params[b1] || bV.params["#" + b1 + "#"];
                                if (bU) {
                                    b0 = b0.replace(/#/g, "");
                                    _cjq.crispAdFramework.setHiResMap(bY.id, b0);
                                    return bU
                                }
                            }
                            bU = bV.params[b0] || bV.params["#" + b0 + "#"];
                            if (bU) {
                                return bU
                            }
                        }
                    }
                }
                if (bY.params) {
                    if (b1) {
                        bU = bY.params[b1] || bY.params["#" + b1 + "#"];
                        if (bU) {
                            b0 = b0.replace(/#/g, "");
                            _cjq.crispAdFramework.setHiResMap(bY.id, b0);
                            return bU
                        }
                    }
                    bU = bY.params[b0] || bY.params["#" + b0 + "#"];
                    if (bU) {
                        return bU
                    }
                }
            } else {
                if (bW === bL.LANDSCAPE) {
                    if (bY.override && bY.override.landscape) {
                        var bV = bY.override.landscape;
                        if (bV.params) {
                            bU = bV.params[b0] || bV.params["#" + b0 + "#"];
                            if (bU) {
                                return bU
                            }
                            if (b1) {
                                bU = bV.params[b1] || bV.params["#" + b1 + "#"];
                                if (bU) {
                                    b0 = b0.replace(/#/g, "");
                                    _cjq.crispAdFramework.setHiResMap(bY.id, b0);
                                    return bU
                                }
                            }
                        }
                    }
                }
                if (bY.params) {
                    bU = bY.params[b0] || bY.params["#" + b0 + "#"];
                    if (bU) {
                        return bU
                    }
                    if (b1) {
                        bU = bY.params[b1] || bY.params["#" + b1 + "#"];
                        if (bU) {
                            b0 = b0.replace(/#/g, "");
                            _cjq.crispAdFramework.setHiResMap(bY.id, b0);
                            return bU
                        }
                    }
                }
            }
        },
        getFrameDocument: function() {
            var bV = document;
            try {
                if (!_cjq.pWin || !_cjq.pWin.document.getElementById(_cjq.crispAdFramework.adframeid)) {} else {
                    if (!!_cjq.pWin.document.getElementById(_cjq.crispAdFramework.adframeid).contentDocument && (_cjq.pWin.document.getElementById(_cjq.crispAdFramework.adframeid).style.display === "block") && _cjq.crispAdFramework.panelIFrame === true) {
                        bV = _cjq.pWin.document.getElementById(_cjq.crispAdFramework.adframeid).contentDocument
                    }
                }
                return bV
            } catch (bU) {
                return document
            }
        },
        setAdDefProperty: function(bU, bW, bV) {
            if (bt[bU]) {
                bt[bU][bW] = bV
            }
        },
        getSingleAdDefByEvtPlacement: function(bW, bV) {
            var bU = null;
            if (bt[bW] && bt[bW].definition) {
                for (bU in bt[bW].definition) {
                    if (bt[bW].definition[bU].params && bt[bW].definition[bU].params["#evtplacement#"] === bV) {
                        return bt[bW].definition[bU].params && bt[bW].definition[bU]
                    }
                }
            }
            return null
        },
        getImageObject: function(bY, bX) {
            var bU = null;
            if (!bY) {
                return bU
            }
            if (bY) {
                var b0 = bY.childNodes;
                if (!b0) {
                    return
                }
                for (var bW = 0; bW < b0.length; bW++) {
                    if (b0[bW].tagName && b0[bW].tagName.toLowerCase() == "img") {
                        bU = b0[bW];
                        return bU
                    }
                    if (b0[bW].tagName && b0[bW].tagName.toLowerCase() == "a") {
                        var bZ = b0[bW].childNodes;
                        if (!bZ) {
                            return bU
                        }
                        for (var bV = 0; bV < bZ.length; bV++) {
                            if (bZ[bV] && bZ[bV].tagName && bZ[bV].tagName.toLowerCase() == "img") {
                                bU = bZ[bV];
                                return bU
                            }
                        }
                    }
                }
            }
            return bU
        },
        getUpdatedObjectName: function(bX, bU, bY) {
            var bW, bV, bZ = bY ? X : ay;
            if (bU.indexOf(",") >= 0) {
                bW = bU.indexOf(bZ);
                bV = bU.indexOf(":");
                if (bW >= 0 && bW < bV) {
                    bU = bZ + bU.substring(bV)
                }
            }
            return bU
        },
        isAdhere: function(bU) {
            return bt[bU].adhere
        },
        events: [],
        bind: function(bV, bW, bX, bU) {
            if (bX) {
                if (bX === document) {
                    if (document.body) {
                        bX = document.body
                    } else {
                        bX = document.documentElement
                    }
                }
                if (bX.addEventListener) {
                    bX.addEventListener(bV, bW, false)
                } else {
                    bX.attachEvent("on" + bV, bW)
                }
            } else {
                if (typeof bW === "function") {
                    if (!this.events[bV]) {
                        this.events[bV] = []
                    }
                    if (!this.events[bV].listeners) {
                        this.events[bV].listeners = []
                    }
                    if (v(bV, bW) === -1) {
                        this.events[bV].listeners.splice(0, 0, bW);
                        this.events[bV].listeners[0].once = bU
                    }
                }
            }
        },
        unbind: function(bV, bW, bX) {
            if (bX) {
                if (bX === document) {
                    if (document.body) {
                        bX = document.body
                    } else {
                        bX = document.documentElement
                    }
                }
                if (bX.removeEventListener) {
                    bX.removeEventListener(bV, bW, false)
                } else {
                    bX.detachEvent("on" + bV, bW)
                }
            } else {
                if (typeof bW === "function" && this.events[bV] && this.events[bV].listeners) {
                    var bU = v(bV, bW);
                    if (bU !== -1) {
                        this.events[bV].listeners.splice(bU, 1)
                    }
                }
            }
        },
        trigger: function(bW, bZ) {
            var bU, bV, bX;
            if (!bZ) {
                bZ = []
            }
            if (_cjq.crispAdFramework.events[bW] && _cjq.crispAdFramework.events[bW].listeners) {
                bU = _cjq.crispAdFramework.events[bW].listeners.length;
                for (bV = bU - 1; bV >= 0; bV = bV - 1) {
                    bX = {};
                    bX.type = bW;
                    try {
                        (_cjq.crispAdFramework.events[bW].listeners[bV]).call(_cjq.crispAdFramework, bX, bZ)
                    } catch (bY) {
                        console.error(bY)
                    }
                    if (_cjq.crispAdFramework.events[bW].listeners[bV].once) {
                        this.unbind(bX, _cjq.crispAdFramework.events[bW].listeners[bV])
                    }
                }
            }
        },
        getDocumentBody: function() {
            if (document.body) {
                return document.body
            } else {
                return document.documentElement
            }
        },
        putScrollLock: function(bW) {
            var bU = document.getElementById(bW);
            if (!bU) {
                return
            }

            function bV(bX) {
                bX.preventDefault();
                bX.stopPropagation();
                if (bX.stopImmediatePropagation) {
                    bX.stopImmediatePropagation()
                }
                return false
            }
            if (bU) {
                if (bU.addEventListener) {
                    bU.addEventListener("click", bV, false);
                    bU.addEventListener("touchstart", bV, false);
                    return true
                }
            }
            return false
        },
        getSupportBoxModel: function() {
            if (!_cjq.supportBoxModel) {
                _cjq.supportBoxModel = u()
            }
            return _cjq.supportBoxModel
        },
        getCss: function(bU, bV) {
            bV = bw(bV);
            if (bU.style && bU.style[bV]) {
                return bU.style[bV]
            } else {
                if (window.getComputedStyle) {
                    return document.defaultView.getComputedStyle(bU, null).getPropertyValue(bV)
                }
            }
        },
        getCssProp: function(bV, bU) {
            var bW = new RegExp(bU + ":\\s?(-?\\d+).*?"),
                bX;
            bX = bW.exec(bV);
            if (bX && bX.length === 2) {
                return bX[1]
            }
            return null
        },
        getParamValue: function(bU, b1) {
            var bY, bV, bW, b0, bZ, b2 = [],
                bX;
            if (!bU || !b1) {
                return ""
            }
            b0 = new RegExp("[\\?&]" + b1 + "=([^&#]*)", "g");
            bZ = b0.exec(bU);
            while (bZ !== null) {
                b2.push(bZ[1]);
                bZ = b0.exec(bU)
            }
            if (b1 === "xurl") {
                return b2
            } else {
                if (b2.length > 0) {
                    return b2[0]
                } else {
                    return ""
                }
            }
        },
        touchStartHandler: function(bU, bW, bV) {
            ah(bU, bW, bV)
        },
        clickHandler: function(bU, bW, bV) {
            a5(bU, bW, bV)
        },
        sendErrBeacon: function(bX) {
            var bW = trackerkey && _cjq.crispAdFramework.getAdDefProperty(trackerkey, null, "partnerkey"),
                bV = bm + "//api.crispadvertising.com/adRequest/control/err.gif?partnerkey=" + bW + "&msg=" + bX,
                bU = document.createElement("img");
            if (!!bW && bX !== undefined) {
                bU.src = bV
            }
        }
    };
    var c = [],
        k = {},
        a8 = {},
        bo = true,
        aj = "img.gif",
        M = 300;
    window._cjq.crispTrackers = window._cjq.crispTrackers || {
        __lastProgressTrackerSent: new Date(),
        __adidToken: Math.floor(Math.random() * 999999),
        __THRESHOLD_TIME_FOR_TRACKER: 2 * 60 * 60 * 1000,
        __NUM_INTERATIONS: 150,
        trackClick: function(bZ, bW, bY, bV, b1, bU) {
            var bX = "",
                b0 = "";
            bW = _cjq.crispAdFramework.getUpdatedObjectName(bZ, bW, true);
            if (bU) {
                b0 = [b0, "&xurl=", escape(bU)].join("")
            } else {
                if ("banner" === bY || ["microsite", "video", "call"].indexOf(bV) != -1) {
                    if (typeof __CrispExternalClickURL !== "undefined" && ap(__CrispExternalClickURL)) {
                        b0 = [b0, "&xurl=", escape(__CrispExternalClickURL)].join("")
                    }
                    if (!c[bZ]) {
                        c[bZ] = {}
                    }
                    if (c[bZ] && c[bZ].trackClickURL) {
                        bU = c[bZ].trackClickURL;
                        if (bU) {
                            b0 = [b0, "&xurl=", escape(bU)].join("")
                        }
                    }
                }
            }
            bX = aH(bZ, b1, bV, bY, bW);
            if (b0 !== "") {
                bX = [bX, b0].join("")
            }
            if (_cjq.crispAdFramework.getFirstAction() === true && aY(bV)) {
                _cjq.crispAdFramework.handleFirstAction(bZ, bW, bY, bV)
            }
            _cjq.crispAdFramework.trigger("cac_track_click", [bZ, bW, bY, bV, b1, bU]);
            aV(bX)
        },
        trackImpression: function(bY, bV, bX, bZ, b3) {
            var b2 = "impression",
                b0 = b2 + "_" + bX,
                bW = aj,
                bU = "",
                b1 = "";
            if (bZ === "true") {
                bV = _cjq.crispAdFramework.getUpdatedObjectName(bY, bV, true);
                if (b3) {
                    b1 = [b1, "&xurl=", escape(b3)].join("")
                }
                if (typeof bX === "undefined") {
                    bX = "panel"
                }
                if (typeof bV === "undefined") {
                    bV = bX + "1"
                }
                if (!c[bY]) {
                    c[bY] = {}
                }
                if (!c[bY].evtprogress) {
                    c[bY].evtprogress = []
                }
                if (c[bY].evtprogress[b0]) {
                    c[bY].evtprogress[b0] = 1 + c[bY].evtprogress[b0]
                } else {
                    c[bY].evtprogress[b0] = 1
                }
                bU = aD(bY, bW, b2, bX, bV, "", "", "", c[bY].evtprogress[b0]);
                bU = [bU, b1].join("");
                _cjq.crispAdFramework.trigger("cac_track_impression", [bY, bV, bX, bZ, b3]);
                aV(bU);
                bE(bY, "impression", bX, bV, "", c[bY].evtprogress[b0])
            }
        },
        trackInteractionAndImpression: function(bY, bV, bX, bW, b5, b3) {
            var b0 = null,
                b4 = _cjq.crispAdFramework.isPanelOpen(bY),
                b1 = null,
                b2 = null,
                bZ, bU;
            if (b4 || bW === "expand") {
                b0 = _cjq.crispAdFramework.getComponentNameToIdMap(bY, "standard-expandable-panel");
                b2 = _cjq.crispAdFramework.getOpenPanelName(bY) || b0;
                b1 = _cjq.crispAdFramework.getAdDefProperty(bY, b2, "evtplacement")
            } else {
                b1 = _cjq.crispAdFramework.getAdDefProperty(bY, bt[bY].bannerName, "evtplacement")
            }
            bZ = "impression_" + b1;
            if (!c[bY].evtprogress) {
                c[bY].evtprogress = []
            }
            if (c[bY].evtprogress[bZ]) {
                c[bY].evtprogress[bZ] = 1 + c[bY].evtprogress[bZ]
            } else {
                c[bY].evtprogress[bZ] = 1
            }
            bU = c[bY].evtprogress[bZ];
            if ((bW === "expand") && (bU === 1)) {
                if (b4 && _cjq.crispAdFramework.getOpenPanelName(bY)) {
                    b0 = _cjq.crispAdFramework.getOpenPanelName(bY)
                } else {
                    b0 = _cjq.crispAdFramework.getComponentNameToIdMap(bY, "standard-expandable-panel")
                }
                this.trackInteraction(bY, bV, bX, bW, true, b0, b1, bU)
            } else {
                this.trackInteraction(bY, bV, bX, bW)
            }
        },
        trackInteractionAndEngagement: function(b0, bW, bZ, bY, bU) {
            var bX = {},
                b1 = null,
                b2 = null,
                b3 = null,
                bV = null;
            if (!!bU && typeof bU === "string") {
                bX.ga = "ga=" + bU
            }
            if (bo === true) {
                bX.g = "g=1";
                bo = false
            } else {
                bX.g = "g=2"
            }
            _cjq.crispAdFramework.trackInteraction(b0, bW, bZ, bY, b1, b2, b3, bV, bX)
        },
        trackInteraction: function(b0, bW, bZ, bY, b1, b2, b3, bV, bX) {
            if (typeof timeoutTimer != "undefined" && timeoutTimer) {
                clearTimeout(timeoutTimer);
                timeoutTimer = null
            }
            bW = _cjq.crispAdFramework.getUpdatedObjectName(b0, bW);
            _cjq.crispAdFramework.trigger("cac_track_interaction", [b0, bW, bZ, bY]);
            if (!c[b0]) {
                c[b0] = {}
            }
            var bU = "",
                b4 = _cjq.crispAdFramework.getSecondActionObject();
            bU = af(b0, bW, bY, bZ, _cjq.crispAdFramework.getFirstAction(), b4.secondAction, b1, b2, b3, bV);
            if (_cjq.crispAdFramework.getFirstAction() === true && aY(bY)) {
                _cjq.crispAdFramework.handleFirstAction(b0, bW, bZ, bY)
            }
            if (bX && (bX.g === "g=1" || bX.g === "g=2")) {
                bU = ar(bU, "random", bX.g);
                if (bX.ga) {
                    bU = ar(bU, "random", bX.ga)
                }
            }
            aV(bU)
        },
        trackGalleryInteraction: function(bW, bU, bV, bX, bY) {
            if (bY && !k[bU]) {
                _cjq.crispAdFramework.trackInteraction(bW, bU, bV, bX);
                a8[bU] = true
            } else {
                if (!bY) {
                    _cjq.crispAdFramework.trackInteraction(bW, bU, bV, bX)
                }
            }
        },
        trackGalleryEngagement: function(bX, bU, bV, bY, bW) {
            if (!(k[bU]) && !bW) {
                _cjq.crispAdFramework.trackEngagement(bX, bU, bV, bY);
                k[bU] = true
            } else {
                _cjq.crispAdFramework.stopEngagementProgressTracker(bX, bU);
                _cjq.crispAdFramework.startEngagementProgressTracker(bX, bU, bY)
            }
        },
        trackGalleryInteractionAndEngagement: function(b1, bW, b0, bZ, bU, bY) {
            var bX = null,
                b2 = null,
                b3 = null,
                b4 = null,
                bV = null;
            if (bY) {
                _cjq.crispAdFramework.trackGalleryEngagement(b1, bW, "panelobject", "gallery", false);
                if (!k[bW]) {
                    k[bW] = true
                }
            } else {
                if (!bY) {
                    bX = {};
                    if (!!bU && typeof bU === "string") {
                        bX.ga = "ga=" + bU
                    }
                    if (bo === true) {
                        bX.g = "g=1";
                        bo = false;
                        k[bW] = true
                    } else {
                        if (!k[bW]) {
                            bX.g = "g=2";
                            k[bW] = true
                        }
                    }
                    _cjq.crispAdFramework.trackInteraction(b1, bW, b0, bZ, b2, b3, b4, bV, bX);
                    if (!a8[bW]) {
                        a8[bW] = true
                    }
                    _cjq.crispAdFramework.trackGalleryEngagement(b1, bW, "panelobject", "gallery", true)
                }
            }
        },
        trackEngagement: function(bX, bU, bW, bZ) {
            var bY = "";
            if (typeof timeoutTimer != "undefined" && timeoutTimer) {
                clearTimeout(timeoutTimer);
                timeoutTimer = null
            }
            bU = _cjq.crispAdFramework.getUpdatedObjectName(bX, bU);
            if (!c[bX]) {
                c[bX] = {}
            }
            var bV = "";
            bV = a7(bX, bU, bZ, bW, bo);
            if (bo === true) {
                bo = false;
                if (typeof __CrispEngURL !== "undefined" && ap(__CrispEngURL)) {
                    bY = "&xurl=" + escape(__CrispEngURL)
                }
            }
            _cjq.crispAdFramework.trigger("cac_track_engagement", [bX, bU, bW, bZ]);
            aV(bV + bY)
        },
        trackConversion: function(bX, bV, bU, bY) {
            bV = _cjq.crispAdFramework.getUpdatedObjectName(bX, bV);
            returnType = aj;
            if (!c[bX]) {
                c[bX] = {}
            }
            var bW = av(bX, bU, bV, returnType, bY);
            _cjq.crispAdFramework.trigger("cac_track_conversion", [bX, bV, bU, bY]);
            aV(bW)
        },
        trackMRCViewable: function(b0, b1) {
            var bX = "adunit";
            var bY = "adunit";
            var bU = "impression";
            var bW = 1;
            var bV = "";
            var bZ = b1 && b1[0];
            if (!bZ) {
                bZ = window.trackerkey || _cjq.crispAdFramework.trackerkey
            }
            if (_cjq.crispTrackers.viewabilityTrackerSent) {
                return
            }
            bV = aD(bZ, aj, bU, bY, bX, "", "", "", bW);
            aV(bV);
            _cjq.crispTrackers.viewabilityTrackerSent = true;
            return bV
        },
        getConversionTrackerURL: function(bW, bV, bU, bX) {
            bV = _cjq.crispAdFramework.getUpdatedObjectName(bW, bV);
            returnType = aj;
            if (!c[bW]) {
                c[bW] = {}
            }
            return av(bW, bU, bV, returnType, bX)
        },
        getCustomInterationUrl: function() {
            var bV = "";
            if (typeof __CrispActURL !== "undefined" && ap(__CrispActURL)) {
                bV = "&xurl=" + escape(__CrispActURL)
            }
            var bU = null;
            if (c[trackerkey] && c[trackerkey].properties) {
                for (i = 0; i < c[trackerkey].properties.length; i += 1) {
                    if (c[trackerkey].properties[i].key === "act") {
                        if (c[trackerkey].properties[i].value && c[trackerkey].properties[i].value !== "") {
                            bV = "&xurl=" + escape(c[trackerkey].properties[i].value)
                        }
                    }
                }
            }
            return bV
        },
        getCustomEngagementUrl: function() {
            var bV = "";
            if (typeof __CrispEngURL !== "undefined" && ap(__CrispEngURL)) {
                bV = "&xurl=" + escape(__CrispEngURL)
            }
            var bU = null;
            if (c[trackerkey] && c[trackerkey].properties) {
                for (i = 0; i < c[trackerkey].properties.length; i += 1) {
                    if (c[trackerkey].properties[i].key === "act") {
                        if (c[trackerkey].properties[i].value && c[trackerkey].properties[i].value !== "") {
                            bV = "&xurl=" + escape(c[trackerkey].properties[i].value)
                        }
                    }
                }
            }
            return bV
        },
        trackInteractionProgress: function(bZ, bV, bW) {
            var b0 = "interaction",
                bY = "adunit",
                bX;
            if (!bW) {
                var bU = _cjq.crispAdFramework.getDomBannerId(bZ);
                bW = bU
            }
            if (!c[bZ]) {
                c[bZ] = {}
            }
            bX = aD(bZ, aj, "progress", bY, bW, b0, "", "", bV);
            _cjq.crispAdFramework.trigger("cac_track_interaction_progress", [bZ, bW, bV]);
            aV(bX);
            bE(bZ, "progress", bY, bW, b0, bV)
        },
        trackEngagementProgress: function(bZ, bV, bW) {
            var b0 = "engagement",
                bY = "panelobject",
                bX;
            if (!bW) {
                var bU = _cjq.crispAdFramework.getDomBannerId(bZ);
                bW = bU
            }
            if (!c[bZ]) {
                c[bZ] = {}
            }
            bX = aD(bZ, aj, "progress", bY, bW, b0, "", "", bV);
            _cjq.crispAdFramework.trigger("cac_track_engagement_progress", [bZ, bW, bV]);
            aV(bX);
            bE(bZ, "progress", bY, bW, b0, bV)
        },
        handleInteractionProgressTimer: function(b1, b0) {
            var bU, b3 = "",
                bZ = b0[0],
                bV = b0[1],
                bX = b0[2],
                bW = b0[3],
                bY;
            switch (bW) {
                case "closeBanner":
                case "closeandhide":
                case "hide":
                case "close":
                    if (_cjq.crispAdFramework.getFirstAction()) {
                        _cjq.crispAdFramework.stopInteractionProgressTracker(bZ)
                    }
                    break;
                case "retract":
                    _cjq.crispAdFramework.stopInteractionProgressTracker(bZ);
                    break;
                default:
                    var b2 = _cjq.crispAdFramework.getDomBannerId(bZ);
                    _cjq.crispTrackers.startInteractionProgressTracker(bZ, b2)
            }
        },
        invokeBannerClick: function() {
            try {
                if (!bV) {
                    var bU = _cjq.crispAdFramework.getBannerIds(),
                        bV = _cjq.crispAdFramework.getTrackerkeyByBanner(bU[0])
                }
                var bX = _cjq.crispAdFramework.getDomBannerId(bV);
                elParent = document.getElementById(bX), el = elParent.childNodes[1], evt = document.createEvent("MouseEvents");
                if (evt.initMouseEvent) {
                    _cjq.crispAdFramework.closeByEvent = true;
                    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                    el.dispatchEvent(evt);
                    return true
                }
            } catch (bW) {
                console.log(bW);
                return false
            }
        },
        invokeInitialDisplay: function() {},
        invokePanelClose: function() {
            _cjq.crispAdFramework.closePanel()
        },
        handleEngagementProgressTimer: function(b1, b0) {
            var bU, b2 = "",
                bZ = b0[0],
                bV = b0[1],
                bX = b0[2],
                bW = b0[3],
                bY;
            switch (bW) {
                case "closeBanner":
                case "retract":
                case "closeandhide":
                case "hide":
                case "close":
                    break;
                default:
                    _cjq.crispTrackers.startEngagementProgressTracker(bZ, bV, bW)
            }
        },
        maybeTrackProgress: function(bX, bV, bW, bY, bU) {
            if (!bX || !bW) {
                return false
            }
            if (a4(bX, bW)) {
                _cjq.crispAdFramework.trackProgress(bX, bV, bW, bY, bU)
            }
        },
        trackProgress: function(bX, bV, bW, bY, bU) {
            _cjq.crispAdFramework.trigger("cac_track_progress", [bX, bV, bW, bY, bU]);
            aV(bR(bX, bU, bY, bW, bV));
            bE(bX, "progress", bW, bV, bY, bU)
        },
        trackFirstAction: function(bY, bV, bX, bW) {
            if (typeof bX === "undefined" && typeof bY === "object") {
                try {
                    bY = bV[0];
                    bX = bV[2];
                    bW = bV[3];
                    bV = bV[1]
                } catch (b1) {
                    bY = {}
                }
            }
            var bU, b2 = "",
                bZ;
            if (!c[bY]) {
                c[bY] = {}
            }
            if (_cjq.crispAdFramework.getFirstAction()) {
                switch (bW) {
                    case "closeBanner":
                    case "retract":
                    case "closeandhide":
                    case "hide":
                    case "close":
                        break;
                    default:
                        if (typeof __CrispActURL !== "undefined" && ap(__CrispActURL)) {
                            b2 += "&xurl=" + escape(__CrispActURL)
                        }
                        var b0 = null;
                        if (c[bY] && c[bY].properties) {
                            for (bZ = 0; bZ < c[bY].properties.length; bZ += 1) {
                                if (c[bY].properties[bZ].key === "act") {
                                    if (c[bY].properties[bZ].value) {
                                        b2 += "&xurl=" + escape(c[bY].properties[bZ].value)
                                    }
                                }
                            }
                        }
                        bU = aD(bY, aj, "interaction", "adunit", bV, "click", "", "", 0);
                        _cjq.crispAdFramework.trigger("cac_track_first_action", [bY, bV, bX, bW]);
                        m(bU + b2)
                }
            }
        },
        startInteractionProgressTracker: function(bU, bW) {
            c[bU].adIdleList = false;
            _cjq.crispTrackers.__lastProgressTrackerSent = new Date();
            try {
                bf(true, bU, bW)
            } catch (bV) {
                console.log(bV)
            }
            c.idleTimer = new Date()
        },
        stopInteractionProgressTracker: function(bU) {
            bf(false, bU)
        },
        setJsonObjects: function(bV, bU) {
            c[bV] = bU
        },
        stopEngagementProgressTracker: function(bU, bV) {
            x(false, bU, bV)
        },
        reStartTimeDisplayTracker: function(bU) {
            var bV = c[bU].timerArray;
            if (!bV || bV.__timeSet) {
                return
            }
            if (c[bU].adIdleList && c[bU].adIdleList === true) {
                bV = c[bU].timerArray;
                if (bV) {
                    this.startTimeDisplayTracker(bU, bV.evtaction, bV.placement, bV.objname)
                }
            }
        },
        startTimeDisplayTracker: function(bV, bW, bU, bY) {
            if (!(bU == "banner" && _cjq.crispAdFramework.getFirstAction() === false)) {
                c[bV].adIdleList = false;
                var bX = c[bV].timerArray;
                if (!bX || F(bV)) {
                    bX = {};
                    c[bV].timerArray = bX
                }
                if (!bX.__displayTime) {
                    bX.__displayTime = new Date()
                }
                _cjq.crispTrackers.__lastProgressTrackerSent = new Date();
                aa(true, bV, bW, bU, bY);
                c.idleTimer = new Date()
            }
        },
        stopTimeDisplayTracker: function(bU) {
            aa(false, bU)
        },
        startInteractionProgressTracker: function(bU, bW) {
            c[bU].adIdleList = false;
            _cjq.crispTrackers.__lastProgressTrackerSent = new Date();
            try {
                bf(true, bU, bW)
            } catch (bV) {
                console.log(bV)
            }
            c.idleTimer = new Date()
        },
        stopInteractionProgressTracker: function(bU) {
            bf(false, bU)
        },
        startEngagementProgressTracker: function(bU, bX, bV) {
            c[bU].adIdleList = false;
            _cjq.crispTrackers.__lastProgressTrackerSent = new Date();
            try {
                x(true, bU, bX, bV)
            } catch (bW) {
                console.log(bW)
            }
            c.idleGalleryTimer = new Date()
        },
        viewabilityTrackerSent: false
    };

    function r(bV, bW) {
        var bU;
        for (bU = bV.length - 1; bU >= 0; bU -= 1) {
            if (bV[bU] === bW) {
                return true
            }
        }
        return false
    }

    function bk(bX) {
        var bV = [],
            bW, bU;
        if (!bX) {
            return bV
        }
        for (bW = 0; bW < bX.length; bW += 1) {
            bV.push(bX[bW])
        }
        return bV
    }

    function Z(bZ, bW, bX) {
        var bU = {
                id: bZ
            },
            bV, bY;
        bV = aN(bU, bX);
        if (bV) {
            bY = bV.params;
            if (bY) {
                if (bY["#evtplacement#"].indexOf(bW) === 0) {
                    return true
                }
            }
        }
        return false
    }

    function ag(bV, bU, bY) {
        var bX, b0, bZ = false,
            bW = false;
        if (!bV || !bU) {
            return false
        }
        for (bX = 0; bX < bV.length; bX++) {
            if (bV.hasOwnProperty(bX)) {
                b0 = bV[bX];
                if (Z(b0, "banner", bY)) {
                    bZ = true
                }
                if (Z(b0, "panel", bY)) {
                    bW = true
                }
            }
        }
        for (bX = 0; bX < bU.length; bX++) {
            if (bU.hasOwnProperty(bX)) {
                b0 = bU[bX];
                if (Z(b0, "banner", bY)) {
                    bZ = true
                }
                if (Z(b0, "panel", bY)) {
                    bW = true
                }
            }
        }
        if (bZ === true && bW === true) {
            return true
        }
        return false
    }

    function bp(bX, bU, bW) {
        var bY = bt[bX].topDiv,
            bV;
        if (r(bW, X)) {
            ay = X
        } else {
            for (bV = 0; bV < bW.length; bV++) {
                if (bW.hasOwnProperty(bV)) {
                    if (!document.getElementById(bW[bV])) {
                        continue
                    }
                    if (!document.getElementById(bW[bV])) {
                        continue
                    }
                    temp = {
                        id: bW[bV]
                    };
                    json = aN(temp, bX);
                    if (json) {
                        params = json.params;
                        if (params) {
                            if (params["#evtplacement#"] === "banner") {
                                ay = bt[bX].openBannerObjName;
                                break
                            } else {
                                if (params["#evtplacement#"] === "panel") {
                                    ay = bt[bX].openBannerObjName;
                                    break
                                }
                            }
                        }
                    }
                }
            }
        }
        for (bV = 0; bV < bU.length; bV++) {
            if (bU.hasOwnProperty(bV)) {
                if (!document.getElementById(bU[bV])) {
                    continue
                }
                temp = {
                    id: bU[bV]
                };
                json = aN(temp, bX);
                if (json) {
                    params = json.params;
                    if (params) {
                        if (params["#evtplacement#"] === "panel" || params["#evtplacement#"] === "banner") {
                            X = params["#evtobjectname#"];
                            break
                        }
                    }
                }
            }
        }
    }

    function v(bW, bX) {
        var bU, bV;
        if (_cjq.crispAdFramework.events[bW] && _cjq.crispAdFramework.events[bW].listeners) {
            bU = _cjq.crispAdFramework.events[bW].listeners.length;
            for (bV = bU - 1; bV >= 0; bV = bV - 1) {
                if (_cjq.crispAdFramework.events[bW].listeners[bV] === bX) {
                    return bV
                }
            }
        }
        return -1
    }

    function q(bU) {
        if (!bU || bU === "undefined" || bU.replace(/^\s*/, "").replace(/\s*$/, "") === "") {
            return true
        }
        return false
    }

    function bE(b0, b3, bY, bV, bX, bZ) {
        if (!aW.consoleDisplay) {
            return
        }
        if (b3 === "progress" && aW.showTimerDisplay !== "true") {
            return
        }
        if (!aW.globalTimer) {
            aW.globalTimer = new Date()
        }
        var bU = new Date().getTime(),
            bW = (bU - aW.globalTimer.getTime()) / 1000,
            b2, b1;
        aW.numTracker = aW.numTracker + 1;
        if (!bV || bV === "undefined") {
            bV = bY + "1"
        }
        b2 = aW.numTracker + ")  " + bW + "s   " + b3 + "-" + bY + "-" + bV;
        if (typeof bX !== "undefined") {
            b2 = b2 + "-" + bX
        }
        if (typeof bZ !== "undefined") {
            b2 = b2 + "-" + bZ
        }
        b1 = "tracking_div_" + aW.numTracker;
        if (q(b0)) {
            b2 = "Crisp trackerkey not found"
        }
        if (q(b3)) {
            b2 = "event type not found in the tracker"
        }
        if (q(bY)) {
            b2 = "event placement type not found in the tracker"
        }
        aW.lastdiv = b1
    }

    function Q() {
        aW.crispConsoleWindow = window.open("", "mywindow", "scrollbars=1,menubar=1,resizable=1,width=350,height=250");
        return aW.crispConsoleWindow
    }

    function bH(bU) {
        return typeof bU === "undefined" || bU === null
    }

    function b(bV, bU) {
        if (bH(bV) || bH(bU)) {
            return false
        }
        return ("" + bV).match(bU + "$") == bU
    }

    function aZ(bW) {
        var bX = document.createElement("a");
        bX.id = "fakeanchorid";
        bX.setAttribute("href", bW);
        bX.setAttribute("target", "_blank");
        document.body.appendChild(bX);
        var bV = document.getElementById("fakeanchorid");
        var bU;
        if (document.createEvent) {
            bU = document.createEvent("MouseEvents");
            if (bU.initMouseEvent) {
                bU.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                bU.crispCustom = true;
                bV.dispatchEvent(bU)
            }
        }
        bV.parentNode.removeChild(bV)
    }

    function U(b1, bV, b0, bZ, bY) {
        var bU = "",
            bX, bW, b2;
        for (bX = 0; bX < b0.length; bX = bX + 1) {
            bW = b0[bX].split("=");
            b2 = bW[1];
            if (!b2 || "undefined" === b2) {
                continue
            }
            bU = bU + "&" + b0[bX]
        }
        bU = bU.substr(1, bU.length);
        if (!bV) {
            bV = ""
        }
        if (bY && bY === true) {
            bU = b1 + "?" + bU
        } else {
            if (b1.substr(b1.length - 1, 1) === "/") {
                b1 = b1.substr(0, b1.length - 1)
            }
            if (typeof bZ === "undefined" || bZ === "") {
                bU =   bV + "?" + bU
            } else {
                bU =   bZ + "/" + bV + "?" + bU
            }
        }
        return bU
    }

    function bl(bV) {
        var bY = bV.split("?")[1],
            bX = "conn=0",
            bU = _cjq.crispAdFramework.getAdDefProperty(_cjq.crispAdFramework.trackerkey, null, "displayTimeUrl"),
            bW = window.adParams && window.adParams.api;
        bY = bY + "&" + bX;
        if (bW && bW.search("http") === -1) {
            bW = bm + bW
        }
        if (bU && bV.search(bU) > -1) {
            bV = [ "img.gif?", bY].join("")
        } else {
            bV = bV + "&" + bX
        } if (!_cjq.crispAdFramework.getPreviewRequest()) {
            A(bV)
        }
        if (typeof console !== "undefined") {
            console.log(bY + " : tracker sent to live report.")
        }
        return bV
    }

    function a1(bU) {
        var bV, bW;
        if (!bU || bU === "") {
            return false
        }
        bV = bU.split(/[;]/);
        if (bV.length != 3) {
            return false
        }
        bW = bV[2];
        if (!bW || bW == 0) {
            return false
        }
        return true
    }

    function ao(bV, bX) {
        var bU = document.getElementById(bV),
            bW = document.createElement("div");
        bW.innerHTML = "<div id='" + bX + "' style='z-index:10;'></div>";
        aC(bW.childNodes[0], bU);
        document.getElementById(bX).style.display = "none"
    }

    function aL(bY, bX) {
        var b2, bZ, b0, bV, bU, b1 = _cjq.crispAdFramework.getSecondActionObject();
        if (!bt.trackerkeys) {
            bt.trackerkeys = {}
        }
        if (bX && bX.api) {
            bL.API_URL = bX.api
        }
        if (bY) {
            try {
                jsonobj = eval(bY)
            } catch (bW) {
                return
            }
            if (!jsonobj.html) {
                oEl = document.getElementById(bL.BASE_DIVNAME);
                if (oEl) {
                    oEl.innerHTML = oEl.innerHTML + jsonobj.html
                }
                return
            } else {
                b0 = jsonobj.script;
                bV = jsonobj.definition;
                if (bV) {
                    for (b2 in bV) {
                        if (bV.hasOwnProperty(b2) && (bV[b2].componentname === "initial-rendered-state") && bV[b2].script) {
                            delete bV[b2].script;
                            bU = b2
                        }
                    }
                }
                if (b0 && bU) {
                    for (b2 in b0) {
                        if (b0.hasOwnProperty(b2) && b2.indexOf(bU) > -1) {
                            delete b0[b2]
                        }
                    }
                }
                bK(jsonobj, "2");
                jsonobj = Y(jsonobj);
                bL.CRISP_WRAPPER_DIV = "panelContainerDiv";
                oEl = document.getElementById(bL.CRISP_WRAPPER_DIV);
                if (!bY.trackerkey || bY.trackerkey.replace(/^\s*/, "").replace(/\s*$/, "") === "") {
                    if (oEl) {
                        V(oEl, bX, "No trackerkey enabled")
                    }
                    if (typeof console !== "undefined") {
                        console.log("Crisp trackerkey not found")
                    }
                    return
                }
                if (oEl) {
                    bt.trackerkeys[bL.CRISP_WRAPPER_DIV] = jsonobj.trackerkey;
                    jsonobj.topDiv = oEl.id;
                    bt.trackerkeys[jsonobj.bannerId] = jsonobj.trackerkey;
                    if (!bt.bannerIds) {
                        bt.bannerIds = []
                    }
                    bt.bannerIds.push(jsonobj.bannerId);
                    jsonobj.partnerkey = bX.partnerkey;
                    jsonobj.sitekey = bX.sitekey;
                    jsonobj.componentVersion = bX.componentVersion;
                    jsonobj.includeCookies = false;
                    bt.trackerkey = jsonobj.trackerkey;
                    bt[jsonobj.trackerkey] = jsonobj;
                    if (!!__adhereProp) {
                        __adhereProp.adtrackerkey = jsonobj.trackerkey
                    }
                    _cjq.crispAdFramework.trackerkey = jsonobj.trackerkey;
                    jsonobj.adhere = false;
                    aF(bL.CRISP_WRAPPER_DIV, jsonobj)
                }
                if (bA() || aU()) {
                    _cjq.crispAdFramework.setFirstAction(true)
                }
                if (!b1.globalTimer) {
                    _cjq.crispAdFramework.setSecondAction("globalTimer", new Date())
                }
            }
        }
    }

    function bN(b1, bX, bZ, bY) {
        if (bX) {
            var bV = bZ.zoneid || bZ.zid || bZ.zonekey || "",
                bW = bZ.pubid || "",
                b0 = bL.BASE_CALLBACKNAME + b1,
                bU = _cjq.crispAdFramework.getCrispKey();
            if (bZ.packageType && bZ.packageType === "cdn") {
                b0 = [bL.BASE_CALLBACKNAME, "z", bV, "p", bW].join("");
                bX = bX + "?callback=" + b0
            } else {
                if (bZ.packageType && bZ.packageType === "standard") {
                    b0 = bL.BASE_CALLBACKNAME;
                    bX = bX + "?callback=" + b0
                } else {
                    bX = bX + "&callback=" + b0
                }
            } if (bY === "true") {
                bX = bX + "&no-cache=true"
            }
            if (bU !== 0) {
                bX = bX + "&crispkey=" + bU
            }
            az = true;
            au(bX, b0, bZ)
        }
    }

    function au(bU, b4, bX, b2) {
        var b1 = (bX.bannerid) ? false : true,
            bZ = _cjq.crispAdFramework,
            b3 = _cjq.crispAdFramework.getSecondActionObject(),
            b5 = null,
            bY, bW, b0 = "",
            bV;
        if (bU.indexOf("http") == -1 && bX.packageType !== "standard") {
            bU = bm + bU
        }
        if (!bt.trackerkeys) {
            bt.trackerkeys = {}
        }
        window[b4] = function(cf) {
            var ce = [],
                cb, cg = [],
                ca, b7;
            if (!_cjq.crispAdFramework) {
                _cjq.crispAdFramework = bZ
            }
            if (!_cjq.crispAdFramework.adServiceJSONResponse) {
                _cjq.crispAdFramework.adServiceJSONResponse = JSON.parse(JSON.stringify(cf));
                _cjq.crispAdFramework.callbackName = b4
            }
            if (cf) {
                try {
                    b5 = eval(cf)
                } catch (b9) {
                    return
                }
                b7 = "false";
                if (!b5.html) {
                    bY = document.getElementById(bL.BASE_DIVNAME);
                    if (bY) {
                        bY.innerHTML = bY.innerHTML + b5.html
                    }
                    if (b5.passback && b5.passback.length > 1 && b5.bannerId < 0) {
                        var ch = '<html><head><title>Crisp Passback Ad iFrame</title><script>inDapIF=true;<\/script></head><body style="margin:0;padding:0;width:0px;height:0px;overflow:hidden;"><script src="',
                            cc = b5.passback + "?ord=" + Math.floor(Math.random() * 9999),
                            b8 = '"><\/script></body></html>',
                            b6 = "javascript: '" + ch + cc + b8 + "'";
                        location.href = b6
                    }
                    return
                } else {
                    try {
                        ak(b5);
                        if (b5.capping) {
                            b7 = "true"
                        }
                    } catch (cd) {
                        b5.capping = false;
                        b7 = "false"
                    }
                    bK(b5, "1");
                    b5 = Y(b5);
                    bV = b5.viewURL;
                    bW = cf.source;
                    b0 = bL.CRISP_WRAPPER_DIV;
                    bY = document.getElementById(b0);
                    if (!bY) {
                        bY = document.getElementById("_")
                    }
                    if (!cf.trackerkey || cf.trackerkey.replace(/^\s*/, "").replace(/\s*$/, "") === "") {
                        if (bY) {
                            V(bY, bX, "No trackerkey enabled")
                        }
                        if (typeof console !== "undefined") {
                            console.log("Crisp trackerkey not found")
                        }
                        return
                    }
                    if (bY) {
                        bt.trackerkeys[b0] = b5.trackerkey;
                        if (b5.adhere) {
                            b5.topDiv = bL.CRISP_WRAPPER_DIV
                        } else {
                            b5.topDiv = bY.id
                        }
                        trackerkey = b5.trackerkey;
                        bt.trackerkeys[b5.bannerId] = b5.trackerkey;
                        if (!bt.bannerIds) {
                            bt.bannerIds = []
                        }
                        bt.bannerIds.push(b5.bannerId);
                        b5.partnerkey = bX.partnerkey;
                        b5.sitekey = bX.sitekey;
                        b5.componentVersion = bX.componentVersion;
                        b5.includeCookies = b1;
                        bt.trackerkey = b5.trackerkey;
                        bt[b5.trackerkey] = b5;
                        if (!!__adhereProp) {
                            __adhereProp.adtrackerkey = b5.trackerkey
                        }
                        _cjq.crispAdFramework.trackerkey = b5.trackerkey;
                        if (window.adParams.bannerType === "adhesion") {
                            b5.adhere = true
                        } else {
                            b5.adhere = false
                        } if (!(b5.viewURL === null || b5.viewURL.search(/lg.php/) > 0) && !bI(b5.trackerkey)) {
                            _cjq.crispAdFramework.registerImpressionCallback(b5.viewURL, b5.trackViewURL, b5.includeCookies, (b5.adhere ? "false" : b7), b5.trackerkey)
                        }
                        aF(b0, b5);
                        if (b7) {
                            bs(b5)
                        }
                    }
                    if (bI(b5.trackerkey)) {
                        _cjq.crispAdFramework.setFirstAction(false);
                        if (!b3.globalTimer) {
                            _cjq.crispAdFramework.setSecondAction("globalTimer", new Date())
                        }
                        cb = j(trackerkey);
                        for (ca = 0; ca < cb.length; ca++) {
                            if (cb[ca].componentname === "expandable-banner") {
                                cg.push(cb[ca].externalScript)
                            }
                        }
                        if (cg) {
                            aT(cg, null, ce, trackerkey)
                        }
                    }
                    ab(b5)
                }
            }
        };
        if (b2 != "undefined" && b2) {
            eval(b2)
        } else {
            if (typeof adParams.cdn !== "undefined" && "" !== adParams.cdn) {
                b1 = false
            }
            bF(bU, b1, "adservicejson")
        }
    }

    function ax() {
        if (window.matchMedia) {
            var bU = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
            if (bU && bU.matches || (window.devicePixelRatio > 1)) {
                return true
            } else {
                return false
            }
        }
        return false
    }

    function ab(bV) {
        var bU = _cjq.crispAdFramework.getCrispKey();
        if (bU !== 0) {
            bt.crispkey = bU;
            c.crispkey = bU;
            return (bU)
        } else {
            var bX = bV.cookies,
                bW;
            if (bX) {
                for (bW = 0; bW < bX.length; bW = bW + 1) {
                    if ("X-C-Crisp-Id" === bX[bW].name) {
                        bt.crispkey = escape(bX[bW].value);
                        break
                    }
                    if ("CRISPSUBNO" === bX[bW].name) {
                        bt.crispkey = escape(bX[bW].value)
                    }
                }
            }
        }
    }

    function br(bU, bV) {
        window[bV] = function(bW) {
            if (bW) {
                var bX = eval(bW);
                if (typeof bX.setCookie !== "undefined" && bX.setCookie) {
                    bs(bX)
                }
                window.open(bX.html)
            }
        };
        bF(bU)
    }

    function bT() {
        var bU = window.innerHeight,
            bV = document.compatMode;
        if (bV || !aE) {
            bU = (bV === "CSS1Compat") ? document.documentElement.clientHeight : document.body.clientHeight
        }
        return bU
    }

    function T() {
        var bU = window.innerWidth,
            bV = document.compatMode;
        if (bV || !aE) {
            bU = (bV === "CSS1Compat") ? document.documentElement.clientWidth : document.body.clientWidth
        }
        return bU
    }

    function ad(bV) {
        try {
            var bX, bW = false;
            bX = bV;
            while (bX && bX.tagName && bX.tagName.toUpperCase() !== "BODY" && bX.tagName.toUpperCase() !== "HTML") {
                if (bX.tagName.toUpperCase() === "DIV") {
                    var bU = document.defaultView.getComputedStyle(bX, null).getPropertyValue("position");
                    if ("fixed" === bU) {
                        bW = true;
                        break
                    }
                }
                bX = bX.parentNode
            }
            if (bW && ((/OS (5|6)/i.test(navigator.userAgent)) || (/android 4/i.test(navigator.userAgent)))) {
                return true
            }
            return false
        } catch (bY) {
            console.log(bY)
        }
    }

    function a(bV, bU) {
        if (bV && bV.indexOf("#") > -1) {
            bV = bV.replace(/#/g, "");
            bV = "#" + bU + bV + "#"
        } else {
            bV = bU + bV
        }
        return bV
    }

    function aF(co, cl) {
        var cg = cl.trackerkey,
            ci = _cjq.crispAdFramework.getSecondActionObject(),
            cc, cb, ch, ca, bW, b2, cr, b6, cn, bV, bZ, bX, b8, b3, b9, bU, cj, cq, cd, cm, b1, b5, cf, bY;
        bY = _cjq.crispAdFramework.getAdPropertyVars(cg, "loadingPhaseLimit");
        if (bY == 2 && cl.adhere) {
            bt[cg].adhere = false;
            bt[cg].topDiv = co
        }
        if (bY == 2 && (__CrispExternalClickURL === "%CLK%")) {
            bU = location.search;
            if (!!bU) {
                __CrispExternalClickURL = unescape(_cjq.crispAdFramework.getParamValue(bU, "clickURL"))
            }
        }
        cj = _cjq.crispAdFramework.getAdPropertyVars(cg, "displayTimeTracking");
        cq = false;
        cd = Math.random();
        try {
            if (cj === true || cj === "true") {
                cj = 100
            }
            if (cj === false || cj === "false") {
                cj = 0
            }
            cj = cj / 100;
            if (cj > 1 || isNaN(cj)) {
                throw new Error("displayTimeTracking: invalid value")
            } else {
                if (cd <= cj) {
                    cq = true
                } else {}
            }
        } catch (ck) {
            console.log(ck)
        }
        bt[cg].enableDisplayTrackingFor = [];
        bt[cg].progressTimeInterval = 4000;
        bt[cg].idleTimeInterval = 14;
        bt[cg].adRendered = false;
        if (cq === true || cq === "true") {
            cm = ["banner", "panel", "tab", "panelobject"];
            for (ch in cm) {
                bt[cg].enableDisplayTrackingFor[cm[ch]] = true
            }
        } else {
            cc = _cjq.crispAdFramework.getSingleAdDefByEvtPlacement(cg, "timer");
            if (cc && cc.params && cc.params["#enableDisplayTrackingFor#"]) {
                cb = cc.params["#enableDisplayTrackingFor#"].split(",");
                for (ch in cb) {
                    if (cb.hasOwnProperty(ch)) {
                        bt[cg].enableDisplayTrackingFor[cb[ch]] = true
                    }
                }
                if (cc.params["#progressTimeInterval#"]) {
                    bt[cg].progressTimeInterval = cc.params["#progressTimeInterval#"]
                }
                if (cc.params["#idleTimeInterval#"]) {
                    bt[cg].idleTimeInterval = cc.params["#idleTimeInterval#"]
                }
            }
        }
        ca = document.getElementById(co);
        if (ca) {
            _cjq.crispAdFramework.hasAutoPlayVideo = s(cg);
            if (_cjq.crispAdFramework.hasAutoPlayVideo) {
                ca.style.display = "none"
            }
            try {
                bt[cg].fixedAdhesionContainer = false;
                if (cl.adhere) {
                    bt[cg].isAdhere = true;
                    b6 = document.body.childNodes[0];
                    cn = document.createElement("div");
                    cn.style.display = "block";
                    cn.style.position = "absolute";
                    cn.id = bL.CRISP_WRAPPER_DIV;
                    if (ad(ca)) {
                        bW = ca.parentNode.insertBefore(cn, ca);
                        bW.style.height = "0px";
                        ca = document.getElementById(bL.CRISP_WRAPPER_DIV);
                        bt[cg].fixedAdhesionContainer = true
                    } else {
                        bV = document.getElementById(bL.CRISP_WRAPPER_DIV);
                        bV.style.height = "0px";
                        ca = document.getElementById("cac_adhere");
                        ca.innerHTML = ""
                    }
                } else {
                    if (!(_cjq.crispAdFramework.requestFromPanelIframe === true)) {
                        ca.innerHTML = "";
                        b2 = bb(ca.id, "textAlign", "div");
                        ca.style.position = "relative";
                        ca.style.clear = "both";
                        ca.style.height = cl.height + "px";
                        ca.style.width = cl.width + "px";
                        ca.style.textAlign = "left";
                        if (typeof ormma === "undefined") {
                            if (b2 === "center") {
                                ca.style.marginLeft = "auto";
                                ca.style.marginRight = "auto"
                            } else {
                                if (b2 === "right") {
                                    ca.style.marginLeft = "auto"
                                }
                            }
                        }
                    }

                    function b4(cs) {
                        if (cs.style.left || cs.style.right) {
                            if ((!cs.style.top && !cs.style.bottom) || (cs.style.top === "auto" || cs.style.bottom === "auto")) {
                                return "vertical"
                            }
                        } else {
                            if (cs.style.top || cs.style.bottom) {
                                if ((!cs.style.left && !cs.style.right) || (cs.style.left === "auto" || cs.style.right === "auto")) {
                                    return "horizontal"
                                }
                            } else {
                                if ((!cs.style.left && !cs.style.right && !cs.style.top && !cs.style.bottom) || (cs.style.left === "auto" || cs.style.right === "auto" || cs.style.top === "auto" || cs.style.bottom === "auto")) {
                                    return "center center"
                                } else {
                                    return false
                                }
                            }
                        }
                    }

                    function ce() {
                        var cv = _cjq.crispAdFramework.getAdDefProperty(cg, null, "definition"),
                            cu, ct, cs;
                        _cjq.crispAdFramework.unbind("cac_ad_rendered", ce);
                        for (cu in cv) {
                            if (cv.hasOwnProperty(cu)) {
                                ct = _cjq.crispAdFramework.getElementById(cu);
                                cs = !!ct && b4(ct);
                                if (!!ct && !!cs) {
                                    switch (cs) {
                                        case "horizontal":
                                            ct.style.left = "50%";
                                            ct.style.marginLeft = "-" + parseInt(ct.style.width, 10) / 2 + "px";
                                            break;
                                        case "vertical":
                                            ct.style.top = "50%";
                                            ct.style.marginTop = "-" + parseInt(ct.style.height, 10) / 2 + "px";
                                            break;
                                        case "center center":
                                            ct.style.top = ct.style.left = "50%";
                                            ct.style.marginLeft = "-" + parseInt(ct.style.width, 10) / 2 + "px";
                                            ct.style.marginTop = "-" + parseInt(ct.style.height, 10) / 2 + "px";
                                            break;
                                        default:
                                            break
                                    }
                                }
                            }
                        }
                    }
                    bZ = document.getElementById(bL.CRISP_WRAPPER_DIV);
                    if (!aK()) {
                        if (window.adParams.layoutType === "flexible") {
                            bZ.style.height = "100%";
                            bZ.style.width = "100%";
                            _cjq.crispAdFramework.bind("cac_ad_rendered", ce)
                        } else {
                            if (!(_cjq.crispAdFramework.requestFromPanelIframe)) {
                                bZ.style.height = bZ.style.width = "0px"
                            } else {
                                bZ.style.display = "none"
                            }
                        }
                    } else {
                        if (window.parent.innerWidth < cl.width && window.parent.innerWidth !== 0) {
                            bZ.style.left = (window.parent.innerWidth - cl.width) / 2 + "px"
                        }
                        if (window.parent.innerHeight < cl.height && window.parent.innerHeight !== 0) {
                            bZ.style.top = (window.parent.innerHeight - cl.height) / 2 + "px"
                        }
                    }
                }
            } catch (ck) {
                console.log(ck)
            }
            b1 = "";
            b5 = "";
            if (!aU() && (__twoFramePanelTypes.indexOf(window.adParams.panelType) > -1)) {
                b5 = cl.html[0].fragment.replace(/<div\s *>\r*\n*/, "<div>")
            } else {
                b5 = cl.html[0].fragment.replace(/<div\s *>\r*\n*/, "<div>");
                if (cl.html && cl.html[1] && cl.html[1].fragment) {
                    b1 = cl.html[1].fragment.replace(/<div\s *>\r*\n*/, "<div>")
                }
                if (aU() && window.adParams.panelType === "lightbox") {
                    b1 = ""
                }
            } if (window.adParams && window.adParams.previewtype === "editmodepreview") {
                b5 = cl.html[0].fragment.replace(/<div\s *>\r*\n*/, "<div>");
                if (cl.html && cl.html[1] && cl.html[1].fragment) {
                    b1 = cl.html[1].fragment.replace(/<div\s *>\r*\n*/, "<div>")
                }
            }
            if (_cjq.crispAdFramework.requestFromPanelIframe === true) {
                b5 = "";
                if (cl.html && cl.html[1] && cl.html[1].fragment) {
                    b1 = cl.html[1].fragment.replace(/<div\s *>\r*\n*/, "<div>")
                }
                adframeid = _cjq.crispAdFramework.adframeid || (document && document.body.getAttribute("data-adframeid"))
            }
            if (window.adParams.ph == 2) {
                if (_cjq.crispAdFramework.requestFromPanelIframe === true) {
                    b1 = "";
                    b5 = cl.html[0].fragment.replace(/<div\s *>\r*\n*/, "<div>")
                } else {
                    b1 = b5 = ""
                }
            }
            cr = b5 + b1;
            b8 = document.createElement("div");
            b3 = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig;
            cr = cr.replace(b3, "<$1></$2>");
            if (_cjq.crispAdFramework.requestFromPanelIframe === true || bY == 2) {
                cf = j(cg);
                for (var ch = 0; ch < cf.length; ch++) {
                    if (cr.toString().indexOf(cf[ch]) > -1) {
                        cf[ch] = cf[ch].replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
                        cf[ch] = new RegExp(cf[ch]);
                        cr = cr.toString().replace(cf[ch], "")
                    }
                }
            }
            cr = _cjq.crispAdFramework.trim(cr);
            b8.innerHTML = cr;
            if (navigator && navigator.appName !== "Microsoft Internet Explorer") {
                for (ch = 0; ch < b8.childNodes.length; ch = ch + 1) {
                    ca.appendChild(b8.childNodes[ch])
                }
            } else {
                ca.innerHTML = cr
            }
            _cjq.crispTrackers.setJsonObjects(cg, bt[cg]);
            if (!cl.adhere) {
                _cjq.crispAdFramework.bind("cac_panel_action", function(cs) {
                    if (!window.adParams.adscroller && !window.adParams.pushdown) {
                        setTimeout(function() {
                            try {
                                _cjq.crispAdFramework.updatePanelInViewport(cs, cg)
                            } catch (ct) {
                                console.log(ct)
                            }
                        }, 10)
                    }
                })
            }
            _cjq.crispAdFramework.bind("display_crisp_banner", function(cs) {
                _cjq.crispAdFramework.displayAd = true
            });
            _cjq.crispAdFramework.bind("cac_panel_prep", function(cs) {});
            _cjq.crispAdFramework.bind("crisp_ad_outofview", function(cs, ct) {
                console.log("out of view ")
            });
            _cjq.crispAdFramework.bind("crisp_ad_inview", function(cs, cu) {
                console.log("in view ");
                try {
                    _cjq.crispAdFramework.handleAnimationComponents(cg, cu.stage, "inview")
                } catch (ct) {
                    console.log(ct)
                }
            });
            if (cl.adhere) {
                ca = document.getElementById(bL.CRISP_WRAPPER_DIV)
            }
            if (cl.componentNameToIdMap) {
                cl.adhesionid = _cjq.crispAdFramework.getComponentNameToIdMap(cg, "adhesion")
            }
            D(cl);
            if (_cjq.crispAdFramework.requestFromPanelIframe !== true) {
                var cp = _cjq.crispAdFramework.getPanelIdInDom(cg),
                    b7;
                if (cp) {
                    b7 = _cjq.crispAdFramework.getAdDefProperty(cg, cp, "loadingEvent");
                    if (b7 === "On load") {
                        _cjq.crispAdFramework.throwCreatePanelEvent(cg)
                    }
                }
            }
            _cjq.crispAdFramework.trigger("cac_json_delivered", [cg]);
            _cjq.crispAdFramework.callBridge(cg);
            _cjq.crispAdFramework.bind("cac_call_showAndHide", function(cs, cu) {
                try {
                    _cjq.crispAdFramework.showAndHide(cu[0], cu[1], cu[2], cu[3], "", cu[5], cu[6])
                } catch (ct) {
                    console.log(ct)
                }
            });
            _cjq.crispAdFramework.addGlobalStyle("#" + _cjq.crispAdFramework.getTopDiv(cg) + " div { -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; }\n");
            t(cl, co);
            aI(cl, co, cg);
            b9 = co;
            if (cl.adhere) {
                b9 = bL.CRISP_WRAPPER_DIV
            }
            E(cg);
            B(cl, b9);

            function b0() {
                var cu = _cjq.crispAdFramework.getComponentNameToIdMap(cg, "adhesion-close-button") || _cjq.crispAdFramework.getComponentNameToIdMap(cg, "banner-close-button"),
                    ct = !!cu && document.getElementById(cu),
                    cv = _cjq.crispAdFramework.getAdDefProperty(cg, null, "definition"),
                    cs = cv[cu];
                if (!!ct && !!cs) {
                    a0(ct, cs)
                }
            }
            b0();
            aW.globalTimer = new Date();
            if (cl.adhere) {
                document.getElementById(bL.CRISP_WRAPPER_DIV).style.display = "block"
            } else {
                if (bt[cg].panelOpenVar) {
                    _cjq.crispAdFramework.startTimeDisplayTracker(cg, "display", "panel", bt[cg].openPanelObjName)
                } else {
                    _cjq.crispAdFramework.startTimeDisplayTracker(cg, "display", "banner", bt[cg].bannerName)
                }
            }
            _cjq.crispAdFramework.bind("cac_panel_action", function(cs, ct) {
                at(cs, ct)
            });
            _cjq.crispAdFramework.bind("cac_ad_rendered", function(cw) {
                var ct = "banner";
                if (!_cjq.crispAdFramework.adframeid) {
                    _cjq.crispAdFramework.adframeid = document.body.getAttribute("data-adframeid")
                }
                if (bI(cg)) {
                    var cs = _cjq.crispAdFramework.getDomBannerId(cg);
                    _cjq.crispAdFramework.startInteractionProgressTracker(cg, cs)
                }
                if (bA() || aU()) {
                    if (!ci.globalTimer) {
                        _cjq.crispAdFramework.setSecondAction("globalTimer", new Date())
                    }
                    ct = "panel"
                }
                if (_cjq.crispAdFramework.getPreviewRequest()) {
                    ca = document.getElementById(bL.CRISP_WRAPPER_DIV);
                    ca.style.display = "block";
                    ca.style.width = cl.width + "px";
                    ca.style.height = cl.height + "px";
                    ca.parentNode.style.display = "block"
                }
                ct = p(cg);
                _cjq.crispAdFramework.emptyCloseBannerDiv();
                _cjq.crispAdFramework.jsonDataObj = bt;
                try {
                    if (!bA() || (ct !== "panel")) {
                        _cjq.crispAdFramework.handleAnimationComponents(cg, ct, "autoplay")
                    }
                } catch (cx) {
                    console.log(cx)
                }
                var cu = _cjq.crispAdFramework.getPanelIdInDom(cg),
                    cv;
                if (cu) {
                    cv = _cjq.crispAdFramework.getAdDefProperty(cg, cu, "loadingEvent");
                    if (!cv || cv === "After banner load") {
                        _cjq.crispAdFramework.throwCreatePanelEvent(cg)
                    }
                }
            }, null, true);
            _cjq.crispAdFramework.bind("all_crisp_images_rendered", function(cs) {
                setTimeout(function() {
                    aM(cg)
                }, 10)
            });
            _cjq.crispAdFramework.bind("cac_panel_rendered", function(cy, cx) {
                var cv = cx.adframeid.slice("cacPanelIframe__".length, cx.adframeid.length);
                var cw = 0;
                var cu = 50;
                var cs = 20;

                function ct() {
                    cw++;
                    if (cw > cu) {
                        return
                    }
                    if (_cjq.pWin._cjq.AdManager && _cjq.pWin._cjq.AdManager.initPanelEventsOnlyOnce && _cjq.pWin._cjq.AdManager.initPanelEventsOnlyOnce[cv]) {
                        _cjq.crispAdFramework.handleAnimationComponents(cx.trackerkey, "panel", "autoplay")
                    } else {
                        setTimeout(ct, cs)
                    }
                }
                setTimeout(function() {
                    if (bA() || aU()) {
                        ct()
                    }
                }, cs)
            });
            _cjq.crispAdFramework.bind("cac_on_first_banner_click", function(ct, cs) {
                try {
                    E(cg, "panel")
                } catch (ct) {
                    console.log(ct)
                }
            });
            _cjq.crispAdFramework.bind("cac_on_banner_click", function(cv, cu) {
                var cs = _cjq.crispAdFramework.getPanelIdInDom(cg),
                    ct;
                if (cs) {
                    ct = _cjq.crispAdFramework.getAdDefProperty(cg, cs, "loadingEvent");
                    if (ct === "On first action") {
                        _cjq.crispAdFramework.throwCreatePanelEvent(cg)
                    }
                }
                if (_cjq.crispAdFramework.adframeid.indexOf("cacPanelIframe") > -1) {
                    if (!bA()) {
                        try {
                            _cjq.crispAdFramework.handleAnimationComponents(cu[0], "panel", "autoplay")
                        } catch (cv) {
                            console.log(cv)
                        }
                    }
                }
            });
            _cjq.crispAdFramework.bind("cac_gotostage", function(ct, cs) {});
            _cjq.crispAdFramework.bind("cac_ad_rendered", function(cs) {
                var cD, cC, cx, cw, cz, cy, cB, cu, cv, ct;

                function cA(cH) {
                    var cE, cI, cG = ["ontouchend", "ontouchstart"],
                        cF = ["banner-close-button", "panel-close-button", "adhesion-closebanner"];
                    for (cv = 0; cv < cF.length; cv++) {
                        if (cH.componentname === cF[cv]) {
                            return
                        }
                    }
                    cE = !!cH.id && _cjq.crispAdFramework.getElementById(cH.id);
                    cI = !!cE && cE.getElementsByTagName("a");
                    if (!!cI && cI.length > 0) {
                        cI = cI[0];
                        for (ct = 0; ct < cG.length; ct++) {
                            if (cI.getAttribute(cG[ct])) {
                                cI.removeAttribute(cG[ct])
                            }
                        }
                    }
                }
                if (!cg) {
                    return
                }
                cD = _cjq.crispAdFramework.getDomBannerId(cg);
                cC = !!cD && _cjq.crispAdFramework.getComponentId(cg, cD);
                cx = !!cC && _cjq.crispAdFramework.getComponentFromId(cg, cC);
                cw = !!cx && cx.params;
                cz = !!cw && cw["#displayStage#"];
                cy = _cjq.crispAdFramework.getAdDefProperty(cg, null, "definition");
                if (!!cx && (cx.componentname === "image")) {
                    return
                }
                for (cB in cy) {
                    if (cy.hasOwnProperty(cB)) {
                        cu = !!cy[cB].params && cy[cB].params["#displayStage#"];
                        if (cu === cz) {
                            cA(cy[cB])
                        }
                    }
                }
            }, null, true);
            bt[cg].adRendered = true;
            _cjq.crispAdFramework.trigger("cac_ad_rendered", [cg]);
            if (_cjq.crispAdFramework.requestFromPanelIframe === true) {
                _cjq.crispAdFramework.trigger("cac_panel_rendered", {
                    trackerkey: cg
                })
            }
            if (window.phase !== undefined) {
                _cjq.crispAdFramework.trigger("cac_phase_rendered", [window.phase])
            }
            _cjq.crispAdFramework.bind("scroll", function(cs) {
                _cjq.crispAdFramework.reInitialiseIdle(cs);
                _cjq.crispAdFramework.reStartTimeDisplayTracker(cg)
            }, window);
            _cjq.crispAdFramework.bind("collapsecrispad", function(cu, cv) {
                var cs = cv[0],
                    ct = _cjq.crispAdFramework.getDomBannerId(cs);
                if (document.getElementById(ct)) {
                    document.getElementById(ct).style.display = "block"
                }
            });
            _cjq.crispAdFramework.bind("cac_lightbox_zoomed", function(ct, cu) {
                var cv = document.querySelector("#panelContainerDiv");
                try {
                    if (cv && cu && cu.scale) {
                        cv.style.webkitTransform = "scale(" + cu.scale + ", " + cu.scale + ")";
                        cv.style.transform = "scale(" + cu.scale + ", " + cu.scale + ")";
                        if (!_cjq.crispAdFramework.isLightBoxAd(cg)) {
                            if (cu.scale) {
                                cv.style.top = (window.pageYOffset + _cjq.pWin.innerHeight - (cu.props.expandedHeight * cu.scale)) + "px"
                            }
                        }
                        if (cu.scale < 1) {
                            cv.style.left = ((window.pageXOffset + _cjq.pWin.innerWidth - (cu.props.expandedWidth)) / 2) + "px"
                        } else {
                            cv.style.left = "0px"
                        }
                    }
                } catch (cs) {
                    console.log(cs)
                }
            });
            if (window.phase && window.phase > 1) {
                _cjq.crispAdFramework.bind("cac_standard_zoomed", function(cs, ct) {
                    var cu = document.querySelector("#panelContainerDiv");
                    if (cu && ct && ct.scale && ct.scale !== 1) {
                        cu.style.webkitTransform = "scale(" + ct.scale + ", " + ct.scale + ")";
                        if (ct.props && ct.props.expandedHeight && ct.props.expandedWidth) {
                            cu.style.maxWidth = parseInt(ct.props.expandedWidth, 10) + "px";
                            cu.style.maxHeight = parseInt(ct.props.expandedHeight, 10) + "px"
                        }
                    }
                })
            }
            _cjq.crispAdFramework.bind("expandcrispad", function(cw, cx) {
                try {
                    if (!_cjq.pWin || !_cjq.pWin.document.getElementById(_cjq.crispAdFramework.adframeid) || !_cjq.pWin.document.getElementById(_cjq.crispAdFramework.adframeid).contentDocument) {
                        return
                    }
                    var cu = _cjq.pWin.document.getElementById(_cjq.crispAdFramework.adframeid).contentDocument;
                    var cs = _cjq.pWin.document.getElementById(_cjq.crispAdFramework.adframeid).contentDocument.getElementById("panelContainerDiv"),
                        cy = _cjq.pWin._cjq.AdEngine.getZoomFactor(),
                        cv = (/android/i.test(navigator.userAgent)),
                        ct;
                    if (bt[cg].isLightBox && cy !== 1 && !cv && !!cs) {
                        ct = "scale(" + cy + "," + cy + ") ";
                        ct += "rotate(720deg)";
                        cs.style["-webkit-transform"] = ct
                    }
                } catch (cw) {
                    console.error(cw)
                }
            });
            _cjq.crispAdFramework.bind("resize", function(cs) {
                _cjq.crispAdFramework.reInitialiseIdle(cs);
                _cjq.crispAdFramework.reStartTimeDisplayTracker(cg)
            }, window);
            if (document.body && (document.body.addEventListener)) {
                document.body.addEventListener("touchmove", function(cs) {
                    _cjq.crispAdFramework.reInitialiseIdle(cs);
                    _cjq.crispAdFramework.reStartTimeDisplayTracker(cg)
                }, false)
            } else {
                if (document.documentElement.addEventListener) {
                    document.documentElement.addEventListener("touchmove", function(cs) {
                        _cjq.crispAdFramework.reInitialiseIdle(cs);
                        _cjq.crispAdFramework.reStartTimeDisplayTracker(cg)
                    }, false)
                } else {
                    document.documentElement.attachEvent("ontouchmove", function(cs) {
                        _cjq.crispAdFramework.reInitialiseIdle(cs);
                        _cjq.crispAdFramework.reStartTimeDisplayTracker(cg)
                    })
                }
            }
        }
    }

    function p(bW) {
        var bV = a2(bW),
            bU = "banner";
        if (bV && bV.params && bV.params["#initialstage#"]) {
            bU = bV.params["#initialstage#"]
        }
        return bU
    }

    function at(bX, bY) {
        try {
            var bU = bY[0],
                bW = bY[1];
            if (bW === "open") {
                var bV = document.getElementById("panelShade");
                if (bV) {
                    bV.style.display = "none";
                    setTimeout(function() {
                        bV.style.display = "block"
                    }, 700)
                }
            } else {
                if (window.adParams.bannerType === "standard" && window.adParams.panelType === "standard") {
                    document.getElementById(bL.CRISP_WRAPPER_DIV).style.position = "relative"
                }
            }
        } catch (bX) {
            console.log(bX)
        }
    }

    function ba(bV, b0) {
        var bZ, bY, bW, bU, bX;
        if (bV.indexOf("?") > -1) {
            bZ = bV.split("?");
            bX = bZ[0] + "?";
            bY = bZ[1].split("&");
            for (bW = 0, bU = bY.length; bW <= bU - 1; bW += 1) {
                if (bY[bW].split("=")[0] !== b0) {
                    bX = bX + bY[bW] + "&"
                }
            }
            if (b(bX, "&")) {
                bX = bX.substring(0, bX.length - 1)
            }
            return bX
        } else {
            return bV
        }
    }

    function bu(bV) {
        var bZ = "=?",
            bW = "(?:;|\\n|&)?",
            bU = ["\\$\\{timestamp\\}", "\\$\\{ADELPHIC_CACHE_BUSTER\\}", "\\[timestamp\\]", "\\[RANDOM_NUMBER\\]", "%n", "%%CACHEBUSTER%%", "%%Cache_buster%%", "\\{timestamp\\}"],
            b1, b2, b0, bY = null,
            bX;
        if (!bV) {
            return
        }
        for (bX = 0; bX < bU.length; bX++) {
            b1 = bZ + bU[bX] + bW;
            bY = bV.match(b1);
            if (bY) {
                b2 = new RegExp(bU[bX]);
                b0 = Math.floor(Math.random() * 1000000);
                bV = bV.replace(b2, b0);
                bY = null
            }
        }
        return bV
    }

    function ar(bU, bX, bV) {
        var bW = new RegExp("&" + bX + "=");
        if (!bU || !bX || !bV) {
            return false
        }
        if (bW.test(bU)) {
            bU = bU.replace(bW, "&" + bV + "&" + bX + "=")
        } else {
            console.log("Error inserting attribute into tracker url: key not found.")
        }
        return bU
    }

    function a0(bY, b5) {
        var b1 = b1 || {},
            bZ = bZ || {},
            b0 = b0 || {},
            bX = _cjq.crispAdFramework.getComponentNameToIdMap(trackerkey),
            bV = ["adhesion-close-button", "panel-close-button", "banner-close-button"];

        function b4(b6, b7) {
            var b8 = b6.getAttribute("style");
            if (b8.indexOf(b7) > -1) {
                b8 = b8.replace(b7, "");
                b6.setAttribute("style", b8)
            } else {
                return
            }
        }

        function bU(b6, b7) {
            var b8 = b6.getAttribute("style");
            b8 += b7;
            b6.setAttribute("style", b8)
        }

        function b3() {
            var b6 = bY.getElementsByTagName("img");
            if (b6) {
                for (i = b6.length; i >= 0; i--) {
                    if (b6[i] && (b6[i].src === b5.params["#src#"])) {
                        b1[bY.id] = b6[i];
                        bZ['"' + b6[i].src + '"'] = bY.id
                    }
                }
            }
        }

        function bW(b7, b8) {
            var b6;
            if (!!b8.style.height && (b8.style.height !== "100%")) {
                b6 = b8.style.height
            } else {
                if (b8.style.height === "100%") {
                    b4(b8, "height:100%;");
                    b6 = b8.height + "px";
                    bU(b8, "height:100%;")
                } else {
                    b6 = b8.height + "px"
                }
            }
            for (i = 0; i < bV.length; i++) {
                if (!!bX[bV[i]] && (bX[bV[i]][0] === bY.id) && ((b8.src.indexOf("adhesion_close_button2x.png") > -1) || (b8.src.indexOf("closebtn2x.png") > -1))) {
                    b6 = parseInt(b6) / 2 + "px"
                }
            }
            b7.style.height = b6
        }

        function b2(b6, b7) {
            var b9, b8;
            if (!!b7.style.width && (b7.style.width !== "100%")) {
                b9 = b7.style.width
            } else {
                if (b7.style.width === "100%") {
                    b4(b7, "width:100%;");
                    b9 = b7.width + "px";
                    bU(b7, "width:100%;")
                } else {
                    b9 = b7.width + "px"
                }
            }
            for (b8 = 0; b8 < bV.length; b8++) {
                if (!!bX[bV[b8]] && (bX[bV[b8]][0] === bY.id) && ((b7.src.indexOf("adhesion_close_button2x.png") > -1) || (b7.src.indexOf("closebtn2x.png") > -1))) {
                    b9 = parseInt(b9) / 2 + "px"
                }
            }
            b6.style.width = b9
        }
        if (bY.id && (b5.componentname !== "centered-lightbox-panel")) {
            b3();
            if (bY.id && b1[bY.id]) {
                if (b1[bY.id].width === 0 || b1[bY.id].height === 0) {
                    b0[bY.id] = new Image();
                    b0[bY.id].onload = function(b8) {
                        var b7 = b8.srcElement || b8.target;
                        var b6 = document.getElementById(bZ['"' + b7.src + '"']);
                        if (b6 && !b6.style.width && !!b0[b6.id].width) {
                            b2(b6, b0[b6.id])
                        }
                        if (b6 && !b6.style.height && !!b0[b6.id].height) {
                            bW(b6, b0[b6.id])
                        }
                    };
                    b0[bY.id].src = b1[bY.id].src
                } else {
                    if (!bY.style.height && !!b1[bY.id].height) {
                        bW(bY, b1[bY.id])
                    }
                    if (!bY.style.width && !!b1[bY.id].width) {
                        b2(bY, b1[bY.id])
                    }
                }
            }
        }
    }

    function bG() {
        _cjq.crispAdFramework.unbind("scroll", _cjq.crispAdFramework.reInitialiseIdle, window);
        _cjq.crispAdFramework.unbind("resize", _cjq.crispAdFramework.reInitialiseIdle, window);
        _cjq.crispAdFramework.unbind("orientationchange", _cjq.crispAdFramework.reInitialiseIdle, window)
    }

    function S(bZ) {
        var bU = [],
            bW, bV = [],
            bY = bZ.definition;
        for (var b1 in bY) {
            if (bY.hasOwnProperty(b1)) {
                var b0 = bY[b1];
                if (b0.componentname === "initial-display") {
                    if (b0.params && b0.params["#initialshowlist#"]) {
                        bW = b0.params["#initialshowlist#"];
                        bV = bW.split(",")
                    }
                }
            }
        }
        for (var b1 in bY) {
            if (bY.hasOwnProperty(b1)) {
                var b0 = bY[b1];
                for (var bX = 0; bX < bV.length; bX++) {
                    if (b0.id === bV[bX]) {
                        if (b0.params && b0.params[bL.IMAGESRCPARAM]) {
                            bU.push(b0.params[bL.IMAGESRCPARAM]);
                            if (b0.params[bL.HIRESSRCPARAM]) {
                                bU.push(b0.params[bL.HIRESSRCPARAM])
                            }
                            if (b0.override && b0.override.landscape && b0.override.landscape.params) {
                                bU.push(b0.override.landscape.params[bL.IMAGESRCPARAM]);
                                if (_cjq.crispAdFramework.getResolution() === bL.HIRES) {
                                    if (b0.override.landscape.params[bL.HIRESSRCPARAM]) {
                                        bU.push(b0.override.landscape.params[bL.HIRESSRCPARAM])
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return bU
    }

    function B(bW, b0) {
        var bU = [],
            bX = [],
            bY;
        if (bW.preLoadSrcList && bW.preLoadSrcList.length > 0) {
            bU = bW.preLoadSrcList
        }
        if (bW.assets && bU.length === 0) {
            if (bW.assets.length === "undefined") {
                for (bY in bW.assets) {
                    if (bW.assets.hasOwnProperty(bY)) {
                        if (bW.assets[bY].indexOf(".gif") > -1 || bW.assets[bY].indexOf(".jpg") > -1 || bW.assets[bY].indexOf(".png") > -1) {
                            bU.push(bW.assets[bY])
                        }
                    }
                }
            } else {
                for (var bV = 0; bV < bW.assets.length; bV++) {
                    var bZ = bW.assets[bV];
                    if (bZ.src.indexOf(".gif") > -1 || bZ.src.indexOf(".jpg") > -1 || bZ.src.indexOf(".png") > -1) {
                        if (!bZ.resolution || bZ.resolution === "undefined") {
                            bZ.resolution = bL.HIRES
                        }
                        bU.push(bZ.src)
                    }
                }
            }
        }
        if (bU.length > 0) {
            O(bU, true, function() {
                K(b0, trackerkey);
                O(bX, false)
            })
        } else {
            K(b0, trackerkey)
        }
    }

    function K(bW) {
        var bU = (/android/i.test(navigator.userAgent)),
            bV = 1500;
        if (_cjq.crispAdFramework.androidAutoPlayTimer) {
            bV = _cjq.crispAdFramework.androidAutoPlayTimer
        }
        if (_cjq.crispAdFramework.hasAutoPlayVideo == true && bU) {
            if (document.getElementById(bW)) {
                document.getElementById(bW).style.display = "none"
            }
            setTimeout(function() {
                if (document.getElementById(bW) && document.getElementById(bW).style.display !== "block") {
                    document.getElementById(bW).style.display = "block"
                }
            }, bV)
        } else {
            if (document.getElementById(bW)) {
                document.getElementById(bW).style.display = "block"
            }
        }
    }

    function d(b0, bV, bZ, b2, b4) {
        var bY = bV,
            b3 = 700,
            bX = "",
            bU = false;
        bV = aH(b0, bV, bZ, b2, b4);
        var bW = _cjq.crispAdFramework.getAdPropertyVars(b0, "phasedLoading");
        if ((_cjq.crispAdFramework.getParamValue(bV, "evtaction") === "microsite") || bW === "true") {
            try {
                targettype = _cjq.crispAdFramework.getAdPropertyVars(b0, "openNewWindow");
                if (__CrispExternalClickURL !== "%CLK%") {
                    bX = "?clickURL=" + encodeURIComponent(__CrispExternalClickURL)
                }
            } catch (b1) {
                targettype = "false"
            }
        }
        f = _cjq.crispAdFramework.getDelegate("click-to-url");
        if (window.parent.mraid !== undefined && targettype !== "true") {
            f = window.parent._cjq.AdUtils.getDelegate("click-to-url")
        }
        if (typeof f === "function") {
            bU = f(bV)
        }
        if (!bU) {
            if (targettype === "true") {
                aZ(unescape(bY) + bX)
            } else {
                setTimeout("window.parent.location='" + unescape(bY) + bX + "'", b3)
            }
        }
    }

    function D(bW) {
        var bV = bW.definition,
            b1, b0, bZ, bY;
        for (bZ in bV) {
            if (bV.hasOwnProperty(bZ)) {
                b1 = bV[bZ];
                b0 = b1.params;
                if (bZ.indexOf("__cac_config") > -1) {
                    bt[trackerkey].configParams = b0
                }
                if (b0) {
                    trackerkey = bW.trackerkey;
                    if (b0["#evtplacement#"] === "banner") {
                        bt[trackerkey].bannerName = b0["#evtobjectname#"];
                        bt[trackerkey].domBannerid = b1.id;
                        if (!bt[trackerkey].bannerName) {
                            bt[trackerkey].bannerName = "banner1"
                        }
                        if (b1.id.indexOf("adhere") === -1) {
                            bt[trackerkey].inViewBannerid = b1.id
                        }
                    }
                    if (b0["#evtplacement#"] === "panel") {
                        bt[trackerkey].domPanelId = b1.id;
                        bt[trackerkey].openPanelObjName = b1.id;
                        var bU = _cjq.crispAdFramework.getCssInDef(trackerkey, b1.id, "width", bL.PORTRAIT);
                        var bX = _cjq.crispAdFramework.getCssInDef(trackerkey, b1.id, "height", bL.PORTRAIT);
                        _cjq.crispAdFramework.setPanelWidth(trackerkey, bU);
                        _cjq.crispAdFramework.setPanelHeight(trackerkey, bX);
                        if (window.adParams.panelType === "lightbox") {
                            bt[trackerkey].isLightBox = true
                        } else {
                            bt[trackerkey].isLightBox = false
                        }
                    }
                    if (!bt[trackerkey].bannerObjList) {
                        bt[trackerkey].bannerObjList = []
                    }
                    if (!bt[trackerkey].panelObjList) {
                        bt[trackerkey].panelObjList = []
                    }
                    if (!b0["#evtplacement#"] || b0["#evtplacement#"] === "banner" || b0["#evtplacement#"].indexOf("banner:") > -1) {
                        bt[trackerkey].bannerObjList[bt[trackerkey].bannerObjList.length] = b1.id
                    } else {
                        if (b0["#evtplacement#"] === "panel") {
                            bt[trackerkey].panelObjList[bt[trackerkey].panelObjList.length] = b1.id
                        } else {
                            if (b0["#evtplacement#"].split(":")[0] === "panelobject") {
                                bY = b0["#evtplacement#"].split(":")[1];
                                if (!bY) {
                                    bY = ""
                                }
                                bt[trackerkey].panelObjList[bt[trackerkey].panelObjList.length] = bY + ":" + b1.id
                            }
                        }
                    }
                }
            }
        }
    }

    function t(bU, bW) {
        var bV = bU.css,
            bX;
        for (bX in bV) {
            if (bV.hasOwnProperty(bX)) {
                bS(bV[bX])
            }
        }
    }

    function aI(b2, bY, bV) {
        var b0 = b2.script,
            b1 = [],
            bW = 0,
            b3, bZ = [],
            bU;
        for (b3 in b0) {
            if (b0.hasOwnProperty(b3)) {
                bZ[b3] = b0[b3]
            }
        }
        for (b3 in b0) {
            if (b0.hasOwnProperty(b3)) {
                if (!_cjq.crispAdFramework.isAnimationCompScriptToRun(bV, b3)) {
                    continue
                }
                if (b3.search(/anonymous/) === -1) {
                    bZ[b3] = null;
                    eval(b0[b3])
                } else {
                    if (bI(bV) && b3.indexOf("initial-display") > -1) {
                        var bX = l(bV);
                        if (bX && bX !== "") {
                            b0[b3] = b0[b3].replace(/banner/, bX)
                        }
                    }
                    b1[bW++] = b0[b3]
                }
            }
        }
        aT(b1, bY, bZ, bV)
    }

    function j(bX) {
        var bY = _cjq.crispAdFramework.getAdDefProperty(bX, null, "definition"),
            bW = [],
            bU, bV, bZ;
        for (bZ in bY) {
            if (bY.hasOwnProperty(bZ) && bY[bZ].params && bY[bZ].params["#externalscript#"]) {
                bU = bY[bZ].params["#externalscript#"];
                bV = {};
                bV.externalScript = bU;
                bV.id = bZ;
                bV.componentname = bY[bZ].componentname;
                bW.push(bV)
            }
        }
        return bW
    }

    function aJ(bX, bU) {
        var bV = [],
            bW = j(bX);
        for (i = 0; i < bW.length; i++) {
            if (bW[i].componentname === bU) {
                bV.push(bW[i].externalScript)
            }
        }
        return bV
    }

    function bI(bU) {
        loadingPhaseLimit = window.adParams.ph;
        try {
            loadingPhaseLimit = parseInt(loadingPhaseLimit, 10);
            if (!isNaN(loadingPhaseLimit) && loadingPhaseLimit > 1) {
                return true
            }
        } catch (bV) {
            console.log(bV)
        }
        return false
    }

    function a2(bV) {
        var bU;
        if (bt[bV] && bt[bV].definition) {
            for (bU in bt[bV].definition) {
                if (bt[bV].definition[bU].componentname === "initial-rendered-state") {
                    return bt[bV].definition[bU]
                }
            }
        }
        return null
    }

    function l(bV) {
        var bU = null;
        banner = _cjq.crispAdFramework.getSingleAdDefByEvtPlacement(bV, "banner");
        if (banner && banner.params) {
            bU = banner.params["#stage#"]
        }
        return bU
    }

    function aT(bY, b0, bV, bX, bU) {
        var bW;
        for (bW in bY) {
            if (bY.hasOwnProperty(bW)) {
                bY[bW] = bY[bW].replace(/#trackerkey#/g, bX);
                bV[bW] = null;
                try {
                    if (bU) {
                        bU.eval(bY[bW])
                    } else {
                        eval(bY[bW])
                    }
                } catch (bZ) {
                    console.log()
                }
            }
        }
    }

    function O(bU, bV, b2) {
        var bY = [],
            bW, b0, bX = 0,
            b1 = function(b4) {
                var b3 = new Image();
                b3.onload = function() {
                    bX = bX + 1;
                    _cjq.crispAdFramework.trigger("cac_ad_delivered", [trackerkey, b4]);
                    if (bX === b0) {
                        if (bV) {
                            _cjq.crispAdFramework.trigger("all_crisp_images_rendered", [trackerkey])
                        }
                        if (typeof b2 === "function") {
                            b2.call()
                        }
                    }
                };
                b3.src = b4;
                b3.onerror = function() {
                    bX = bX + 1
                }
            };
        try {
            if (typeof bU !== "undefined") {
                b0 = bU.length;
                for (bW = 0; bW < b0; bW = bW + 1) {
                    b1(bU[bW])
                }
            }
        } catch (bZ) {
            if (typeof b2 === "function") {
                b2.call()
            }
        }
        bY = undefined
    }

    function aG(bV, bU) {
        return document.getElementById(bU || "cac_panel")
    }

    function J() {
        var bU, bV = Math.abs(window.orientation) == 90;
        if (window.screen.width == 320) {
            bU = bV ? 480 : 320
        } else {
            bU = window.screen[bV ? "height" : "width"]
        }
        return (window.innerWidth / bU)
    }

    function s(bX) {
        var bW = bt[bX],
            bV, bY, bU;
        if (bW) {
            bV = bW.definition;
            for (bY in bV) {
                if (bV.hasOwnProperty(bY)) {
                    bU = bV[bY];
                    if (bU && (bU.componentname === "inline-video") || (bU.componentname === "cac-video")) {
                        if (bU.params && bU.params["#properties#"]) {
                            if (bU.params["#properties#"].indexOf("autoplay") > -1) {
                                _cjq.crispAdFramework.autoPlayVideoId = bU.id;
                                return true
                            }
                        }
                    }
                }
            }
        }
        return false
    }

    function g(bZ, bW) {
        var bV = bt[bW],
            bU, bX, bY;
        if (bV) {
            bU = bV.definition;
            for (bX in bU) {
                if (bU.hasOwnProperty(bX)) {
                    bY = bU[bX];
                    if (bY.id === bZ) {
                        return (bY)
                    }
                }
            }
        }
        return (null)
    }

    function aN(bU, bV) {
        return g(bU.id, bV)
    }

    function bJ(bW, bZ) {
        if (!bt[bZ].inViewBannerid) {
            return false
        }
        var bV = bt[bZ].topDiv,
            b3 = document.getElementById(bt[bZ].inViewBannerid),
            b1 = "",
            b2, bY, bU, b0, bX;
        if (b3 && b3.offsetTop) {
            b1 = b3.offsetTop
        } else {
            return false
        }
        b2 = b3.offsetHeight;
        bU = document.compatMode === "CSS1Compat" ? document.documentElement.clientHeight : document.body.clientHeight;
        b0 = bU || bT();
        bX = self.pageYOffset || aE && document.documentElement.scrollTop || document.body.scrollTop;
        if (bX > (b1 + b2) || bX + b0 < b1) {
            return false
        } else {
            if (bX < (b1 + b2)) {
                return true
            }
        }
        return false
    }

    function bS(bW) {
        var bV = document.createElement("style"),
            bU, bX;
        bV.setAttribute("type", "text/css");
        if (bV.styleSheet) {
            bV.styleSheet.cssText = bW
        } else {
            bU = document.createTextNode(bW);
            bV.appendChild(bU)
        }
        bX = document.getElementsByTagName("head")[0];
        bX.appendChild(bV)
    }

    function H(bX) {
        try {
            var bW = document.cookie.split(";"),
                bV = "",
                bU;
            for (bU = 0; bU < bW.length; bU = bU + 1) {
                bV = bW[bU];
                if (bV.search(/CRISP/) >= 0 || bV.search(/X-C/) >= 0) {
                    bX += "&ck-" + bV.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
                }
            }
        } catch (bY) {}
        return (bX)
    }

    function ak(bX) {
        var bY = bX.cookies,
            bU = "",
            bW, bV;
        if (bY) {
            for (bW = 0; bW < bY.length; bW = bW + 1) {
                bV = bY[bW].name;
                if (bV.substr(0, 4) === "X-C-" || "CRISPSUBNO" === bV) {
                    bU += a9(bV, bY[bW].value, bY[bW].maxAge, "/")
                }
            }
        }
        return bU
    }

    function bs(bX) {
        var bY = bX.cookies,
            bU = "",
            bW, bV;
        if (bY) {
            for (bW = 0; bW < bY.length; bW = bW + 1) {
                bV = bY[bW].name;
                if (bV.search(/CRISP/) >= 0 || bV.search(/X-C/) >= 0) {
                    bU += a9(bV, bY[bW].value, bY[bW].maxAge, "/")
                }
            }
        }
        return bU
    }

    function bF(bU, b0, bZ) {
        var bY = document.getElementsByTagName("head").item(0),
            bX = document.createElement("script"),
            bW = "";
        bX.setAttribute("language", "javascript");
        bX.setAttribute("type", "text/javascript");
        if (typeof bZ !== "undefined") {
            bX.setAttribute("id", bZ)
        }
        try {
            if (bt.useCookieCapping && b0) {
                bU = H(bU)
            }
        } catch (bV) {}
        if ((bZ === "roundtripimpression" || bZ === "adservicejson") && typeof __CrispPubParam !== "undefined" && __CrispPubParam) {
            if (__CrispPubParam[0] !== "&") {
                bW = "&"
            }
            bU = [bU, __CrispPubParam].join(bW)
        }
        bX.setAttribute("src", bU);
        bY.appendChild(bX);
        return bX.src
    }

    function a9(b0, bZ, bV) {
        if (/nocookies/.test(_cjq.crispAdFramework.params)) {
            return ("")
        }
        var bU = new Date(),
            bY, bW;
        if (bV > 0) {
            bU.setTime(bU.getTime() + (bV * 1000));
            bY = bU.toGMTString();
            bW = b0 + "=" + escape(bZ) + ";expires=" + bY + ";path=/"
        } else {
            bW = b0 + "=" + escape(bZ) + ";path=/"
        }
        try {
            document.cookie = bW
        } catch (bX) {}
        return (bW)
    }

    function bn(bW) {
        var bV = document.cookie.split(";"),
            bU;
        for (bU = 0; bU < bV.length; bU = bU + 1) {
            if (bV[bU].indexOf(bW + "=") > -1) {
                return bV[bU].replace(bW + "=", "")
            }
        }
        return null
    }

    function be(bY, b5, b0, bU, b7, b4, b8, ca, bW, b6, bX, cc, ce) {
        var b1 = document.getElementById("oaHeader"),
            b2 = Math.floor(Math.random() * 999999),
            cb = _cjq.crispAdFramework.getInAppValue(),
            bZ = _cjq.crispAdFramework.getLocationValue(),
            bV = [],
            b9, cd;
        bV.push("site=" + b0);
        bV.push("rspid=" + bU);
        if (b7) {
            var b3 = parseInt(b7.substr(0, 1));
            if (!isNaN(parseInt(b3)) && isFinite(b3)) {
                bV.push("zid=" + b7)
            } else {
                bV.push("zonekey=" + b7)
            }
        }
        if (b8 && b8 !== "undefined") {
            bV.push("banner=" + b8);
            if (!b7) {
                bV.push("conn=0")
            }
        }
        bV.push("pub=" + b4);
        bV.push("sectionkey=" + ca);
        bV.push("version=" + cc);
        if (bX && bX !== "") {
            bV.push("phase=" + bX)
        }
        if (!!cb) {
            bV.push("inapp=" + cb)
        }
        if (!!bZ) {
            bV.push("loc=" + bZ)
        }
        if (((!b7 || b7 <= 0) && b8 > 0) || (typeof b1 === "object" && b1 !== null)) {
            bV.push("no-cache=" + true)
        }
        if (aA(ce)) {
            for (b9 = 0; b9 < ce.length; b9 = b9 + 1) {
                bV.push(ce[b9])
            }
        }
        if (!bt.adId) {
            bt.adId = []
        }
        if (typeof bW !== "undefined") {
            bt.adId[bW] = b2
        }
        bV.push("random=" + b2);
        bV.push("partnerkey=" + b6);
        return U(bL.API_URL, b5, bV, bY)
    }

    function m(bV, bZ) {
        var bU = [],
            bY;
        bY = _cjq.crispAdFramework.getParamValue(bV, "trackerkey");
        bU = _cjq.crispAdFramework.getParamValue(bV, "xurl");
        if (bY && bU.length > 0) {
            useClientSideTracker = _cjq.crispAdFramework.getAdPropertyVars(bY, "enableClientTracking")
        } else {
            return
        } if (!bZ || "" === bZ) {
            bZ = 500
        }
        var bX = bt[bY]["dfpMobile"];
        if (bX && bX === "false") {
            bX = false
        } else {
            if (bX && bX === "true") {
                bX = true
            }
        }
        var bW = a1(bY);
        if (!bX && useClientSideTracker === "true") {
            if (bW) {
                for (i = bU.length - 1; i >= 0; i -= 1) {
                    bU[i] = bu(unescape(bU[i]));
                    A(bU[i])
                }
            } else {
                for (i = bU.length - 1; i >= 0; i -= 1) {
                    bl(unescape(bU[i]))
                }
            }
        }
        return
    }

    function aA(bU) {
        if (!bU || bU.constructor.toString().indexOf("Array") === -1) {
            return false
        } else {
            return true
        }
    }

    function bz(bX, bW, bZ, bY) {
        var bV = null,
            bU;
        if (bY) {
            bV = bY
        } else {
            bV = []
        }
        for (bU = 0; bU < bX.length; bU = bU + 1) {
            if (bX[bU].match("^" + bW) === bW) {
                bV[bV.length] = bX[bU].substr(bW.length)
            } else {
                if (bX[bU].indexOf(":") === 0) {
                    if (!bZ) {
                        bV[bV.length] = bX[bU].substr(1)
                    }
                } else {
                    if (bX[bU].indexOf(":") === -1) {
                        if (!bZ) {
                            bV[bV.length] = bX[bU]
                        }
                    }
                }
            }
        }
        return bV
    }

    function bb(bX, bV, bU) {
        if (!document.getElementById(bX)) {
            return ""
        }
        var bW = document.getElementById(bX);
        while (bW.parentNode && bW.parentNode.tagName.toUpperCase() !== "BODY" && bW.parentNode.tagName.toUpperCase() !== "HTML") {
            if (bW.parentNode.tagName.toUpperCase() === bU.toUpperCase() && bW.parentNode.style[bV]) {
                return bW.parentNode.style[bV]
            } else {
                if (window.getComputedStyle) {
                    if (bw(bV) != bV) {
                        return document.defaultView.getComputedStyle(bW.parentNode, null).getPropertyValue(bw(bV))
                    } else {
                        return document.defaultView.getComputedStyle(bW.parentNode, null).getPropertyValue(bV)
                    }
                }
            }
            bW = bW.parentNode
        }
    }

    function ai(bU) {
        var bV = _cjq.crispAdFramework.getParamValue(bU, "event");
        if (bV === "progress") {
            return bU
        }
        bU = bU.replace(/event=/, "e=");
        bU = bU.replace(/evtobjectname=/, "o=");
        bU = bU.replace(/evtplacement=/, "p=");
        bU = bU.replace(/evturl=/, "u=");
        bU = bU.replace(/evtaction=/, "a=");
        bU = bU.replace(/evtexternal=/, "x=");
        bU = bU.replace(/evtprogress=/, "n=");
        bU = bU.replace(/crispkey=/, "c=");
        bU = bU.replace(/trackerkey=/, "t=");
        bU = bU.replace(/partnerkey=/, "k=");
        bU = bU.replace(/random=/, "r=");
        bU = bU.replace(/adid=/, "d=");
        bU = bU.replace(/=false/, "=0");
        bU = bU.replace(/=true/, "=1");
        bU = bU.replace(/=app/, "=ap");
        bU = bU.replace(/=banner/, "=br");
        bU = bU.replace(/=calendar/, "=cd");
        bU = bU.replace(/=call/, "=ca");
        bU = bU.replace(/=click/, "=ck");
        bU = bU.replace(/=close/, "=cl");
        bU = bU.replace(/=conversion/, "=cv");
        bU = bU.replace(/=custom/, "=cx");
        bU = bU.replace(/=display/, "=di");
        bU = bU.replace(/=download/, "=dl");
        bU = bU.replace(/=drag/, "=dr");
        bU = bU.replace(/=expand/, "=ex");
        bU = bU.replace(/=facebook/, "=fb");
        bU = bU.replace(/=gallery/g, "=ga");
        bU = bU.replace(/=gyro/, "=gy");
        bU = bU.replace(/=hide/, "=hi");
        bU = bU.replace(/=hover/, "=ho");
        bU = bU.replace(/=interaction/, "=ia");
        bU = bU.replace(/=impression/, "=im");
        bU = bU.replace(/=map/, "=ma");
        bU = bU.replace(/=menu/, "=mn");
        bU = bU.replace(/=microsite/, "=ms");
        bU = bU.replace(/=engagement/, "=ng");
        bU = bU.replace(/=object/, "=ob");
        bU = bU.replace(/=orientation/, "=or");
        bU = bU.replace(/=panelobject/, "=po");
        bU = bU.replace(/=adunit/, "=ad");
        bU = bU.replace(/=panel/, "=pl");
        bU = bU.replace(/=progress/, "=pr");
        bU = bU.replace(/=retract/, "=re");
        bU = bU.replace(/=rotate/, "=ro");
        bU = bU.replace(/=scroll/, "=sc");
        bU = bU.replace(/=shake/, "=sh");
        bU = bU.replace(/=show/, "=sw");
        bU = bU.replace(/=tab/, "=tb");
        bU = bU.replace(/=tilt/, "=tl");
        bU = bU.replace(/=timer/, "=ti");
        bU = bU.replace(/=video/g, "=vo");
        bU = bU.replace(/=twitter/, "=tw");
        return bU
    }

    function bw(bU) {
        return bU.replace(/([A-Z])/g, function(bV) {
            return "-" + bV.toLowerCase()
        })
    }

    function bO(bU) {
        return bU.charAt(0).toUpperCase() + bU.slice(1)
    }

    function V(b1, bV, bY) {
        var b0 = "";
        if (typeof bV.zoneid !== "undefined") {
            b0 = bV.zoneid
        } else {
            if (typeof bV.zid !== "undefined") {
                b0 = bV.zid
            } else {
                b0 = bV.zonekey || ""
            }
        }
        var bZ = bV.partnerkey || "",
            b2 = bV.sitekey || "",
            bX = bV.pubid || "",
            bU = document.createElement("div"),
            bW = document.createElement("img");
        bU.style.display = "none";
        bW.width = "5";
        bW.height = "5";
        bW.style.display = "none";
        bW.src = [bL.API_URL, "adRequest/control/err.gif?", "sitekey=", b2, "&partnerkey=", bZ, "&zonekey=", b0, "&publisherid=", bX, "&error=", bY].join("");
        bU.appendChild(bW);
        b1.appendChild(bU)
    }

    function aC(bV, bU) {
        bU.parentNode.insertBefore(bV, bU.nextSibling)
    }

    function u() {
        var bV = document.createElement("div"),
            bU;
        bV.style.width = bV.style.paddingLeft = "1px";
        document.body.appendChild(bV);
        bU = (bV.offsetWidth === 2);
        bV.innerHTML = "";
        document.body.removeChild(bV).style.display = "none";
        bV = null;
        return bU
    }

    function aO(bY, bW, bX) {
        var bU, bV;
        if (!bY || !bW) {
            return false
        }
        if (!bX) {
            bX = ","
        }
        bU = bY.split(bX);
        for (bV = bU.length - 1; bV >= 0; bV -= 1) {
            if (bU[bV] === bW) {
                return true
            }
        }
        return false
    }

    function R(bU) {
        var bV = document.getElementById(bU);
        bV.style["-webkit-transform-style"] = "-webkit-transform 0ms ease-out";
        bV.style["-webkit-transition"] = "preserve-3d";
        bV.style["-moz-transition"] = "-webkit-transform 0ms ease-out";
        bV.style.transition = "-webkit-transform 0ms ease-out";
        bV.style["-webkit-transform-origin"] = "0% 100%;";
        bV.style["-moz-transform-origin"] = "0% 100%;";
        bV.style["transform-origin"] = "0% 100%;"
    }

    function a5(bU, bY, bV) {
        var bX = false,
            b0 = bU.target,
            bW;
        try {
            bW = b0.parentNode;
            while (bW && bW.tagName && bW.tagName.toUpperCase() !== "BODY" && bW.tagName.toUpperCase() !== "HTML") {
                if (bW.tagName.toUpperCase() === "DIV" && bW.id && bW.id.indexOf(bV || "cac_") === 0) {
                    bX = true;
                    break
                }
                bW = bW.parentNode
            }
            if (bX || bU.target.id === "cac_panel_bg" || bj(true)) {
                if (bU.target.tagName && (bU.target.tagName.toUpperCase() === "INPUT" || bU.target.tagName.toUpperCase() === "SELECT" || bU.target.tagName.toUpperCase() === "BUTTON" || bU.target.tagName.toUpperCase() === "VIDEO")) {
                    return true
                }
                if (!bU.crispCustom) {
                    bU.preventDefault();
                    bU.stopPropagation();
                    if (bU.stopImmediatePropagation) {
                        bU.stopImmediatePropagation()
                    }
                    return false
                }
            }
        } catch (bZ) {}
    }

    function ac(bU, bW, bV) {
        _cjq.crispAdFramework.moveCounter = _cjq.crispAdFramework.moveCounter + 1;
        return
    }

    function bx(b5, bY, b3) {
        var bV, b6, b1, bU, bZ = false,
            b0 = b5.target,
            b2;
        try {
            b2 = b0.parentNode;
            while (b2 && b2.tagName && b2.tagName.toUpperCase() !== "BODY" && b2.tagName.toUpperCase() !== "HTML") {
                if (b2.tagName.toUpperCase() === "DIV" && b2.id && b2.id.indexOf(b3 || "cac_") === 0) {
                    bZ = true;
                    break
                }
                b2 = b2.parentNode
            }
            if (bZ || b5.target.id === "cac_panel_bg") {
                if (b5.target.tagName && b5.target.tagName.toUpperCase() === "INPUT" || b5.target.tagName.toUpperCase() === "SELECT" || b5.target.tagName.toUpperCase() === "BUTTON" || b5.target.tagName.toUpperCase() === "VIDEO") {
                    _cjq.crispAdFramework.moveCounter = 0;
                    return
                }
                b5.preventDefault();
                b5.stopPropagation();
                if (b5.stopImmediatePropagation) {
                    b5.stopImmediatePropagation()
                }
                if (b0.onclick || b0.href) {
                    var b5 = b0.ownerDocument.createEvent("MouseEvents");
                    b5.initMouseEvent("click", true, true, b0.ownerDocument.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
                    if (!(_cjq.crispAdFramework.moveCounter > 1)) {
                        b0.dispatchEvent(b5)
                    }
                } else {
                    bU = b0.parentNode;
                    while (bU && bU.tagName && bU.tagName.toUpperCase() !== "BODY" && bU.tagName.toUpperCase() !== "HTML" && bU.tagName.toUpperCase() !== "A") {
                        bU = bU.parentNode
                    }
                    var b4 = _cjq.crispAdFramework.getDomBannerId(bY);
                    var bX = null;
                    try {
                        var bX = _cjq.crispAdFramework.getComponentNameToIdMap(bY, "swipe-to-open");
                        if (bX === null) {
                            bX = _cjq.crispAdFramework.getComponentNameToIdMap(bY, "swipe-image")
                        }
                    } catch (b1) {
                        bX = null
                    }
                    if (bX) {
                        if (document.getElementById(b4).style.display === "block" || document.getElementById(b4).style.display === "") {
                            return
                        }
                    }
                    if (bU && bU.tagName.toUpperCase() === "A") {
                        var b5 = bU.ownerDocument.createEvent("MouseEvents");
                        b5.initMouseEvent("click", true, true, bU.ownerDocument.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
                        if (!(_cjq.crispAdFramework.moveCounter > 1)) {
                            bU.dispatchEvent(b5)
                        }
                    }
                    _cjq.crispAdFramework.moveCounter = 0;
                    return false
                }
            } else {
                if (_cjq.crispAdFramework.isPanelOpen(bY) && (typeof cacPanelObj !== "undefined") && cacPanelObj.isScrollLockEnabled(bY)) {
                    b5.preventDefault();
                    b5.stopPropagation();
                    if (b5.stopImmediatePropagation) {
                        b5.stopImmediatePropagation()
                    }
                    return false
                }
                _cjq.crispAdFramework.moveCounter = 0
            }
        } catch (bW) {}
    }

    function bM() {
        var bU = 2000;
        _cjq.crispAdFramework.lastClickHandler = new Date();
        setTimeout(function() {
            _cjq.crispAdFramework.lastClickHandler = null
        }, bU)
    }

    function bj(bU) {
        if (_cjq.crispAdFramework.lastClickHandler) {
            return true
        }
        return false
    }

    function ah(b4, bX, b2) {
        var b5, bZ, bU, bY = false,
            b0 = b4.target,
            b1;
        try {
            b1 = b0.parentNode;
            while (b1 && b1.tagName && b1.tagName.toUpperCase() !== "BODY" && b1.tagName.toUpperCase() !== "HTML") {
                if (b1.tagName.toUpperCase() === "DIV" && b1.id && b1.id.indexOf(b2 || "cac_") === 0) {
                    bY = true;
                    break
                }
                b1 = b1.parentNode
            }
            if (bY || b4.target.id === "cac_panel_bg" || bj(true)) {
                if (b4.target.tagName && (b4.target.tagName.toUpperCase() === "INPUT" || b4.target.tagName.toUpperCase() === "SELECT" || b4.target.tagName.toUpperCase() === "BUTTON" || b4.target.tagName.toUpperCase() === "VIDEO")) {
                    return true
                }
                b4.preventDefault();
                b4.stopPropagation();
                if (b4.stopImmediatePropagation) {
                    b4.stopImmediatePropagation()
                }
                if (b4.target.id === "cac_panel_bg") {
                    return false
                }
                if (b0.onclick || b0.href) {
                    var b4 = b0.ownerDocument.createEvent("MouseEvents");
                    b4.initMouseEvent("click", true, true, b0.ownerDocument.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
                    b4.crispCustom = true;
                    b0.dispatchEvent(b4);
                    bM()
                } else {
                    bU = b0.parentNode;
                    while (bU && bU.tagName && bU.tagName.toUpperCase() !== "BODY" && bU.tagName.toUpperCase() !== "HTML" && bU.tagName.toUpperCase() !== "A") {
                        bU = bU.parentNode
                    }
                    var bW = null;
                    var b3 = _cjq.crispAdFramework.getDomBannerId(bX);
                    try {
                        var bW = _cjq.crispAdFramework.getComponentNameToIdMap(bX, "swipe-to-open");
                        if (bW === null) {
                            bW = _cjq.crispAdFramework.getComponentNameToIdMap(bX, "swipe-image")
                        }
                    } catch (bZ) {
                        bW = null
                    }
                    if (bW) {
                        if (document.getElementById(b3).style.display === "block" || document.getElementById(b3).style.display === "") {
                            return false
                        }
                    }
                    if (bU && bU.tagName.toUpperCase() === "A") {
                        var b4 = bU.ownerDocument.createEvent("MouseEvents");
                        b4.initMouseEvent("click", true, true, bU.ownerDocument.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
                        b4.crispCustom = true;
                        bU.dispatchEvent(b4);
                        bM()
                    }
                    return false
                }
            } else {
                if (_cjq.crispAdFramework.isPanelOpen(bX) && (typeof cacPanelObj !== "undefined") && cacPanelObj.isScrollLockEnabled(bX)) {
                    try {
                        if (Math.abs(window.orientation) === 90 && !__adhereProp.showInLandscapeOrientation) {
                            return true
                        }
                    } catch (bZ) {}
                    b4.preventDefault();
                    b4.stopPropagation();
                    if (b4.stopImmediatePropagation) {
                        b4.stopImmediatePropagation()
                    }
                    return false
                }
                document.getElementById(__adhereId.cradleDiv).style.display = "none"
            }
        } catch (bV) {}
    }

    function bi(bW, b3) {
        var bU = _cjq.crispAdFramework.getBannerIds();
        var b0 = null;
        try {
            if (bU && bU.length > 0) {
                b0 = _cjq.crispAdFramework.getTrackerkeyByBanner(bU[0])
            } else {
                return
            } if (!b0) {
                return
            }
            var b6 = bt[b0];
            var b7 = _cjq.crispAdFramework.getAdPropertyVars(b0, "enableOrientationAware"),
                bZ = _cjq.crispAdFramework.getAdPropertyVars(b0, "hideInLandscape"),
                b4 = _cjq.crispAdFramework.getAdPropertyVars(b0, "collapseOnOrientationChange");
            if (h(bZ) && (bW === bL.LANDSCAPE)) {
                document.getElementById(_cjq.crispAdFramework.getTopDiv(b0)).style.display = "none";
                if (document.getElementById("cac_panel_bg")) {
                    document.getElementById("cac_panel_bg").style.display = "none"
                }
                setTimeout(function() {
                    if (document.getElementById("cac_panel_bg")) {
                        document.getElementById("cac_panel_bg").style.display = "none"
                    }
                }, 800);
                return
            } else {
                if (h(bZ)) {
                    document.getElementById(_cjq.crispAdFramework.getTopDiv(b0)).style.display = "block";
                    if (_cjq.crispAdFramework.isPanelOpen(b0)) {
                        if (document.getElementById("cac_panel_bg")) {
                            document.getElementById("cac_panel_bg").style.display = "block"
                        }
                    }
                    return
                }
            } if (!h(b7)) {
                return
            }
            var b5 = "";
            if (b6 && b6.definition) {
                for (var b2 in b6.definition) {
                    if (b6.definition.hasOwnProperty(b2)) {
                        var b1 = b6.definition[b2];
                        if (!b1) {
                            return
                        }
                        if (b1.params && b1.params["#evtplacement#"] === "panel") {
                            if (bW === bL.LANDSCAPE && b1.override && b1.override.landscape) {
                                b5 = b1.override.landscape.css
                            } else {
                                b5 = b1.css
                            }
                        }
                        bc(b0, b1, bW, b3);
                        N(b0, b1, bW);
                        bd(b1, bW);
                        var bV = bt[b0].showList;
                        for (var bY = 0; bV && bY < bV.length; bY++) {
                            if (bV[bY] === b1.id && document.getElementById(b1.id)) {
                                if (al(bV[bY], b0)) {
                                    document.getElementById(b1.id).style.display = "none"
                                } else {
                                    document.getElementById(b1.id).style.display = "block"
                                }
                            }
                        }
                    }
                }
            }
            bv(b0, bW);
            var bX = {};
            bX.width = _cjq.crispAdFramework.getCssProp(b5, "width");
            bX.height = _cjq.crispAdFramework.getCssProp(b5, "height");
            _cjq.crispAdFramework.trigger("orientationHandlingComplete", [b0, bW, bX, false]);
            if (window.adParams.previewtype === "livemodepreview") {
                return
            }
            if (h(b4)) {
                if (_cjq.crispAdFramework.isPanelOpen(b0)) {
                    if (_cjq.crispAdFramework.closePanel(b0)) {
                        return
                    }
                }
            }
        } catch (b2) {
            console.log(b2)
        }
    }

    function bv(bZ, bY) {
        if (window.phase && window.phase !== 1) {
            return false
        }
        if (_cjq.crispAdFramework.isAdhere(bZ)) {
            return
        }
        var bV = _cjq.crispAdFramework.getAdDefProperty(bZ, null, "topDiv"),
            bU = _cjq.crispAdFramework.getAdDefProperty(bZ, null, "width"),
            bX = _cjq.crispAdFramework.getAdDefProperty(bZ, null, "height"),
            bW = document.getElementById(bV);
        if (bY === bL.LANDSCAPE) {
            bU = _cjq.crispAdFramework.getAdPropertyVars(bZ, "landscapeWidth");
            bX = _cjq.crispAdFramework.getAdPropertyVars(bZ, "landscapeHeight")
        }
        if (window.adParams.layoutType === "flexible") {
            bW.style.width = "100%";
            bW.style.height = "100%"
        } else {
            if (bX && bX > 0) {
                bW.style.height = bX + "px"
            }
            if (bU && bU > 0) {
                bW.style.width = bU + "px"
            }
        }
    }

    function n(bW, bU) {
        if (aU() && _cjq.crispAdFramework.getPreviewRequest()) {
            var bV = function(bZ, bX) {
                var bY = document.getElementById(bL.CRISP_WRAPPER_DIV);
                bY.style.width = bZ + "px";
                bY.style.height = bX + "px"
            };
            setTimeout(function() {
                bV(bW, bU)
            }, 250);
            bV(bW, bU)
        }
    }

    function a6(bU) {
        if (bU === "Custom event") {
            return false
        }
        return true
    }

    function bC(bU) {
        if (bU === "When this component hidden" || bU === "show") {
            return true
        }
        return false
    }

    function al(bY, bX) {
        var bU = {
                id: bY
            },
            bW = aN(bU, bX);
        var bV = _cjq.crispAdFramework.getOrientation();
        if (bV === bL.LANDSCAPE) {
            if (bW.override && bW.override.landscape && bW.override.landscape.params && (bW.override.landscape.params["#displayOrientation#"] === "false" || bW.override.landscape.params["#displayOrientation#"] === false)) {
                return true
            }
        } else {
            if (bW.params && (bW.params["#displayOrientation#"] === false || bW.params["#displayOrientation#"] === "false")) {
                return true
            }
        }
        return false
    }

    function aM(bV) {
        var bW = _cjq.crispAdFramework.getAdPropertyVars(bV, "hideInLandscape"),
            bU = _cjq.crispAdFramework.getOrientation();
        if (h(bW) && (bU === bL.LANDSCAPE)) {
            document.getElementById(_cjq.crispAdFramework.getTopDiv(bV)).style.display = "none";
            return true
        }
        return false
    }

    function Y(b0) {
        var bY = window.adParams.isSecure,
            b1 = /http:+[/\w\.-:]+transparent.gif/g,
            bU = null,
            bX;
        if (!bY) {
            return b0
        }
        var bZ = b0.assetSrcList,
            bW;
        if (bY && bZ) {
            bX = JSON.stringify(b0);
            if (!bX) {
                return b0
            }
            for (bW = 0; bW < bZ.length; bW++) {
                if (bZ[bW]) {
                    var bV = new RegExp(bZ[bW], "g");
                    bX = bX.replace(bV, bZ[bW].replace(/http:/, "https:"))
                }
            }
            bU = bX.match(b1);
            if (bU) {
                bU.forEach(function(b3, b2) {
                    bX = bX.replace(bU[b2], bU[b2].replace("http:", "https:"))
                })
            }
            b0 = JSON.parse(bX);
            if (b0.viewURL) {
                b0.viewURL = b0.viewURL.replace(/^http:/, "https:")
            }
            if (b0.displayTimeUrl) {
                b0.displayTimeUrl = b0.displayTimeUrl.replace(/^http:/, "https:")
            }
        }
        return b0
    }

    function bK(b6, b4) {
        var bX = _cjq.crispAdFramework.getOrientation(),
            b0 = _cjq.crispAdFramework.getResolution(),
            bW = [],
            b2 = bL.HIRESSRCPARAM,
            b3 = bL.IMAGESRCPARAM,
            b1;
        b6.preLoadSrcList = [];
        b6.assetSrcList = [];
        if (b6 && b6.definition) {
            for (var bZ in b6.definition) {
                if (b6.definition.hasOwnProperty(bZ)) {
                    var bY = b6.definition[bZ];
                    if (!bY) {
                        continue
                    }
                    if (b0 !== bL.HIRES) {
                        b2 = bL.IMAGESRCPARAM, b3 = bL.HIRESSRCPARAM
                    }
                    if (bY.params) {
                        if (b4 && bY.params["#loadingPhase#"] && bY.params["#loadingPhase#"] !== b4) {
                            continue
                        }
                        if (bY.params[b2] && bY.params[b2].length > 1) {
                            bW.push(bY.params[b2])
                        } else {
                            if (bY.params[b3] && bY.params[b3].length > 1) {
                                bW.push(bY.params[b3])
                            }
                        } if (bY.override && bY.override.landscape && bY.override.landscape.params) {
                            if (bY.override.landscape.params[b2] && bY.override.landscape.params[b2].length > 1) {
                                bW.push(bY.override.landscape.params[b2])
                            } else {
                                if (bY.override.landscape.params[b3] && bY.override.landscape.params[b3].length > 1) {
                                    bW.push(bY.override.landscape.params[b3])
                                }
                            }
                        }
                        var bV = bY.params;
                        if (bV) {
                            for (var bU in bV) {
                                if (bV.hasOwnProperty(bU)) {
                                    var b5 = bV[bU];
                                    if (b5.indexOf(".gif") > -1 || b5.indexOf(".jpg") > -1 || b5.indexOf(".png") > -1) {
                                        if (b6.assetSrcList.indexOf(b5) === -1) {
                                            b6.assetSrcList.push(b5)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (bW && bW.length > 0) {
            b6.preLoadSrcList = bW
        }
    }

    function E(bY, b3) {
        var bV = _cjq.crispAdFramework.getOrientation(),
            b2 = _cjq.crispAdFramework.getResolution(),
            b5 = bt[bY],
            b4 = "",
            b1;
        if (_cjq.crispAdFramework.getPreviewRequest() || window.parent._crispPreviewRequest === true) {
            bV = "portrait"
        }
        if (b5 && b5.definition) {
            for (var b0 in b5.definition) {
                if (b5.definition.hasOwnProperty(b0)) {
                    var bZ = b5.definition[b0];
                    if (!bZ || !bZ.params) {
                        continue
                    }
                    b1 = bZ.params["#displayStage#"];
                    bc(bY, bZ, bV, b2);
                    N(bY, bZ, bV);
                    bd(bZ, bV);
                    if (bZ.params && bZ.params["#evtplacement#"] === "panel") {
                        if (bV === bL.LANDSCAPE && bZ.override && bZ.override.landscape) {
                            b4 = bZ.override.landscape.css
                        } else {
                            b4 = bZ.css
                        }
                    }
                    var bU = bt[bY].showList;
                    for (var bX = 0; bU && bX < bU.length; bX++) {
                        if (bU[bX] === bZ.id && document.getElementById(bZ.id)) {
                            if (al(bU[bX], bY)) {
                                document.getElementById(bZ.id).style.display = "none"
                            } else {
                                document.getElementById(bZ.id).style.display = "block"
                            }
                        }
                    }
                }
            }
        }
        var bW = {};
        bW.width = _cjq.crispAdFramework.getCssProp(b4, "width");
        bW.height = _cjq.crispAdFramework.getCssProp(b4, "height");
        n(bW.width, bW.height);
        try {
            _cjq.crispAdFramework.trigger("orientationHandlingComplete", [bY, bV, bW, true, _cjq.crispAdFramework.adframeid])
        } catch (b0) {
            console.log(b0)
        }
    }

    function W(bX, bW, bU) {
        try {
            var bZ = bW.split(";");
            for (var bV = 0; bV < bZ.length; bV += 1) {
                var b0 = bZ[bV].split(":");
                if (b0.length === 2 && b0[0] === bU) {
                    return b0[1]
                }
            }
            return null
        } catch (bY) {
            console.log(bW)
        }
    }

    function aP(bU, bV, bY, bW) {
        var bX = document.getElementById("panelContainerDiv");
        if (!bX) {
            return
        }
        bX.style[bY] = bW
    }

    function N(bY, b1, bX) {
        try {
            if (b1.override && b1.override.landscape && b1.override.landscape.css) {
                var b3 = _cjq.crispAdFramework.getTopDiv(bY);
                var bU = document.getElementById(b1.id);
                var b0;
                if (!bU) {
                    return
                }
                if (bX === bL.LANDSCAPE) {
                    b0 = b1.override.landscape.css
                } else {
                    b0 = b1.css
                }
                try {
                    var b4 = b0.split(";");
                    for (var bZ = 0; bZ < b4.length; bZ += 1) {
                        var bW = b4[bZ].split(":");
                        if (bW.length > 1) {
                            bU.style[bW[0]] = bW[1];
                            if (b1.params && b1.params["#evtplacement#"] === "panel") {
                                if (["height", "width"].indexOf(bW[0]) > -1) {
                                    aP(b1, bX, bW[0], bW[1])
                                }
                            }
                        }
                    }
                } catch (bV) {
                    console.log(b0)
                }
            }
        } catch (b2) {
            console.log(b2)
        }
    }

    function h(bU) {
        if (bU === true || bU === "true") {
            return true
        }
        return false
    }

    function bd(bU, bV) {
        if (bU && bU.componentname !== "text") {
            return
        }
        var bW = bU.params["#div_contents#"];
        if (bV === bL.LANDSCAPE) {
            if (bU.override && bU.override.landscape && bU.override.landscape.params && (bU.override.landscape.params["#div_contents#"])) {
                bW = bU.override.landscape.params["#div_contents#"]
            }
        }
        an(bU, bW)
    }

    function an(bU, bY) {
        var bZ = bU.id,
            bX = document.querySelector("#" + bZ),
            bW;
        try {
            if (bX && bX.childNodes[1].className === "listStyle_none" && bX.childNodes[1].childNodes[1].tagName === "DIV") {
                bW = bX.childNodes[1].childNodes[1];
                bW.innerHTML = bY
            }
        } catch (bV) {
            console.error(bV)
        }
    }

    function bc(bX, bZ, bW, b0) {
        var bY = document.getElementById(bZ.id + "_img"),
            b2 = document.getElementById(bZ.id),
            bU, bV, b1;
        if (!bY) {
            if (b2) {
                bY = b2.querySelector("img");
                if (!bY) {
                    return
                }
            } else {
                return
            }
        }
        if (bW === bL.LANDSCAPE) {
            if (bZ.override && bZ.override.landscape && bZ.override.landscape.params && (bZ.override.landscape.params[bL.IMAGESRCPARAM] || bZ.override.landscape.params[bL.HIRESSRCPARAM])) {
                bV = bZ.override.landscape.params[bL.HIRESSRCPARAM];
                b1 = bZ.override.landscape.params[bL.IMAGESRCPARAM];
                if (b0 === bL.HIRES) {
                    bU = bV || bZ.params[bL.HIRESSRCPARAM] || b1 || bZ.params[bL.IMAGESRCPARAM];
                    if (bV) {
                        _cjq.crispAdFramework.setHiResMap(bZ.id, bL.HIRESSRC)
                    }
                } else {
                    bU = b1 || bZ.params[bL.IMAGESRCPARAM] || bV || bZ.params[bL.HIRESSRCPARAM]
                }
            } else {
                if (b0 !== bL.HIRES) {
                    bU = bZ.params[bL.IMAGESRCPARAM] || bZ.params[bL.HIRESSRCPARAM]
                } else {
                    bU = bZ.params[bL.HIRESSRCPARAM] || bZ.params[bL.IMAGESRCPARAM];
                    if (bZ.params[bL.HIRESSRCPARAM]) {
                        _cjq.crispAdFramework.setHiResMap(bZ.id, bL.HIRESSRC)
                    }
                }
            }
        } else {
            if (b0 === bL.HIRES) {
                bU = bZ.params[bL.HIRESSRCPARAM] || bZ.params[bL.IMAGESRCPARAM];
                if (bZ.params[bL.HIRESSRCPARAM]) {
                    _cjq.crispAdFramework.setHiResMap(bZ.id, bL.HIRESSRC)
                }
            } else {
                bU = bZ.params[bL.IMAGESRCPARAM] || bZ.params[bL.HIRESSRCPARAM]
            }
        } if (bU && bU.length > 1) {
            bY.src = bU
        }
    }

    function aH(b1, bW, bZ, b0, bV) {
        if (!bW) {
            bW = ""
        }
        if (!b0) {
            b0 = "banner"
        }
        if (!bV) {
            bV = b0 + "1"
        }
        var bX = aj,
            b4 = "click",
            b5 = bW,
            bY = "true",
            b2 = b4 + "_" + bV + "_" + bZ,
            b3 = _cjq.crispAdFramework.getSecondActionObject();
        now = new Date().getTime(), start = b3 && b3.globalTimer && b3.globalTimer.getTime(), limit = b3.limit;
        if (bZ === "video" || bZ === "gallery") {
            bY = "false"
        }
        if (!c[b1].evtprogress) {
            c[b1].evtprogress = []
        }
        if (c[b1].evtprogress[b2]) {
            c[b1].evtprogress[b2] = 1 + c[b1].evtprogress[b2]
        } else {
            c[b1].evtprogress[b2] = 1
        }
        bE(b1, b4, b0, bV, bZ, c[b1].evtprogress[b2]);
        var bU = aD(b1, bX, b4, b0, bV, bZ, b5, bY, c[b1].evtprogress[b2]);
        if (_cjq.crispAdFramework.getFirstAction() === true) {
            if (aY(bZ)) {
                bU = bU.replace(/event=click/, "event=click&f=1");
                bU = L(bU, bV, b3.secondAction);
                if (!b3.globalTimer) {
                    _cjq.crispAdFramework.setSecondAction("globalTimer", new Date())
                }
            }
            _cjq.crispAdFramework.stopTimeDisplayTracker(b1)
        }
        if (_cjq.crispAdFramework.getFirstAction() === false && b3.secondAction === true) {
            if (aY(bZ)) {
                bU = bU.replace(/event=click/, "event=click&f=2")
            } else {
                if (aB(limit, start, now)) {
                    bU = bU.replace(/event=click/, "event=click&f=2")
                }
            }
            _cjq.crispAdFramework.setSecondAction("secondAction", false)
        }
        return bU
    }

    function aR(bX, bW) {
        var bV = new Date(),
            bU = 0;
        if (bX.startInteractionTime) {
            bU = bV.getTime() - bX.startInteractionTime.getTime()
        }
        if (aq(bW)) {
            bU = 0;
            bX.startInteractionTime = new Date()
        }
        bX.totalInteractionTime = bX.totalInteractionTime + bU;
        return bX
    }

    function y(bV, bY, bX) {
        var bU = new Date(),
            bW = 0;
        if (bY.startInteractionTime) {
            bW = bU.getTime() - bY.startInteractionTime.getTime()
        }
        if (aq(bV)) {
            bW = Math.round(_cjq.crispAdFramework.getProgressTimeInterval(bV))
        }
        if (bX) {
            bW = Math.round(_cjq.crispAdFramework.getProgressTimeInterval(bV) / 2)
        }
        bY.startInteractionTime = new Date();
        bY.totalInteractionTime = bY.totalInteractionTime + bW;
        return ((bY.totalInteractionTime) / 1000)
    }

    function aQ(bX, bW) {
        var bV = new Date(),
            bU = 0;
        if (bX.startEngagementTime) {
            bU = bV.getTime() - bX.startEngagementTime.getTime()
        }
        if (!bX[bX.objname]) {
            bX[bX.objname] = Math.round(_cjq.crispAdFramework.getProgressTimeInterval(bW) / 2)
        }
        if (aq(bW)) {
            bU = 0;
            bX.startEngagementTime = new Date()
        }
        bX.totalEngagementTime = bX.totalEngagementTime + bU;
        bX[bX.objname] = bX[bX.objname] + bU;
        return bX
    }

    function aX(bV, bZ, bY, bX) {
        var bU = new Date(),
            bW = 0;
        if (bZ.startEngagementTime) {
            bW = bU.getTime() - bZ.startEngagementTime.getTime()
        }
        if (!bZ.objname || (bZ.objname != bY)) {
            bZ.objname = bY
        }
        if (aq(bV)) {
            bW = Math.round(_cjq.crispAdFramework.getProgressTimeInterval(bV))
        }
        if (bX) {
            bW = Math.round(_cjq.crispAdFramework.getProgressTimeInterval(bV) / 2)
        }
        bZ.startEngagementTime = new Date();
        if (!bZ[bZ.objname]) {
            bZ[bZ.objname] = bW
        } else {
            bZ[bZ.objname] = bZ[bZ.objname] + bW
        }
        bZ.totalEngagementTime = bZ[bZ.objname];
        return ((bZ.totalEngagementTime) / 1000)
    }

    function bf(bZ, bW, bY) {
        var bX = c[bW].interactionTimerArray,
            bU;
        if (bZ && !bX || F(bW)) {
            bX = {};
            c[bW].interactionTimerArray = bX;
            bX.totalInteractionTime = 0;
            bX.startInteractionTime = new Date()
        }
        if (!bZ) {
            if (!bX) {
                return
            }
            _cjq.crispAdFramework.trackInteractionProgress(bW, y(bW, bX), bY);
            bX.startInteractionTime = null;
            lastProgressTrackerSent = new Date();
            clearInterval(bX.timerSet);
            bX.timerSet = null;
            return
        }
        if (bX.startInteractionTime) {
            var bV = y(bW, bX, true);
            lastProgressTrackerSent = new Date()
        } else {
            bX.startInteractionTime = new Date()
        }
        bX.timerSet = setInterval(function() {
            if (w(bW)) {
                clearInterval(bX.timerSet);
                if (bX.timerSet) {
                    bX = aR(bX, bW);
                    if (!_cjq.crispAdFramework.getFirstAction()) {
                        _cjq.crispAdFramework.trackInteractionProgress(bW, bX.totalInteractionTime / 1000, bY)
                    }
                }
                bX.startInteractionTime = null;
                bX.timerSet = null;
                c[bW].adIdleList = true;
                return
            }
            if (bX.startInteractionTime) {
                var b0 = y(bW, bX);
                lastProgressTrackerSent = new Date()
            }
            _cjq.crispAdFramework.trigger("displayAdBanner", "show")
        }, _cjq.crispAdFramework.getProgressTimeInterval(bW))
    }

    function x(b0, bV, bZ, bW) {
        var bY = c[bV].engagementTimerArray,
            bU;
        if (b0 && !bY || F(bV)) {
            bY = {};
            c[bV].engagementTimerArray = bY;
            bY.totalEngagementTime = 0;
            bY.startEngagementTime = new Date()
        }
        if (b0 && bY.timerSet && bY.objname === bZ) {
            return
        }
        if (b0 && bY.objname != bZ) {
            clearInterval(bY.timerSet);
            bY.timerSet = null;
            c[bV].adIdleList = true;
            bY.startEngagementTime = new Date()
        }
        if (!b0) {
            if (!bY) {
                return
            }
            _cjq.crispAdFramework.trackEngagementProgress(bV, aX(bV, bY, bZ), bY.objname);
            bY.startEngagementTime = null;
            lastProgressTrackerSent = new Date();
            clearInterval(bY.timerSet);
            bY.timerSet = null;
            return
        }
        if (bY.startEngagementTime && bW == "gallery") {
            _cjq.crispAdFramework.trackEngagementProgress(bV, aX(bV, bY, bZ, true), bY.objname);
            lastProgressTrackerSent = new Date()
        } else {
            bY.startEngagementTime = new Date()
        }
        var bX = bW;
        bY.timerSet = setInterval(function() {
            if (bX == "gallery" && P(bV)) {
                clearInterval(bY.timerSet);
                if (bY.timerSet) {
                    _cjq.crispAdFramework.trackEngagementProgress(bV, aX(bV, bY, bZ), bY.objname)
                }
                bY.startEngagementTime = null;
                bY.timerSet = null;
                c[bV].adIdleList = true;
                return
            }
            if (bY.startEngagementTime) {
                var b1 = aX(bV, bY, bZ);
                lastProgressTrackerSent = new Date()
            }
            _cjq.crispAdFramework.trigger("displayAdBanner", "show")
        }, _cjq.crispAdFramework.getProgressTimeInterval(bV));
        bY.evtaction = bW;
        bY.objname = bZ
    }

    function aa(b1, bY, bW, bX, b0, bV) {
        var bZ = c[bY].timerArray,
            bU;
        if (bX === "tab" || bX === "panel") {
            return
        }
        if (!bZ) {
            bZ = {};
            c[bY].timerArray = bZ
        }
        if (bZ.__timeSet && bZ.placement === bX) {
            return
        }
        if (bZ.__timeSet) {
            if (bZ.__displayTime) {
                bZ = aw(bZ, bY);
                bU = bZ[bZ.placement];
                if (bU) {
                    if (!b0) {
                        b0 = bZ.objname
                    }
                    _cjq.crispTrackers.maybeTrackProgress(bY, b0, bZ.placement, bZ.evtaction, (bU / 1000) - 2);
                    _cjq.crispTrackers.__lastProgressTrackerSent = new Date()
                }
            }
            clearInterval(bZ.__timeSet);
            bZ.__displayTime = null;
            bZ.__timeSet = null
        }
        if (!b1) {
            bZ.__displayTime = null;
            return
        }
        if (bZ.__displayTime) {
            _cjq.crispTrackers.maybeTrackProgress(bY, b0, bX, bZ.evtaction, aS(bZ, bX, true, bY));
            _cjq.crispTrackers.__lastProgressTrackerSent = new Date()
        } else {
            bZ.__displayTime = new Date()
        }
        bZ.__timeSet = setInterval(function() {
            if (w(bY)) {
                clearInterval(bZ.__timeSet);
                bZ = aw(bZ, bY);
                bZ.__displayTime = null;
                bZ.__timeSet = null;
                c[bY].adIdleList = true;
                return
            }
            if (bZ.__displayTime) {
                _cjq.crispTrackers.maybeTrackProgress(bY, b0, bZ.placement, bZ.evtaction, aS(bZ, bX, false, bY));
                _cjq.crispTrackers.__lastProgressTrackerSent = new Date()
            }
            _cjq.crispAdFramework.trigger("displayAdBanner", "show")
        }, _cjq.crispAdFramework.getProgressTimeInterval(bY));
        bZ.placement = bX;
        bZ.evtaction = bW;
        bZ.objname = b0
    }

    function w(bW) {
        var bU, bV = new Date();
        if (c.idleTimer) {
            bU = ((bV.getTime() - c.idleTimer.getTime()) / 1000)
        }
        if (bU && bU > _cjq.crispAdFramework.getIdleTimeInterval(bW)) {
            return true
        }
        return false
    }

    function aY(bU) {
        switch (bU) {
            case "closeBanner":
            case "retract":
            case "closeandhide":
            case "hide":
            case "close":
            case "show":
                break;
            default:
                return true
        }
        return false
    }

    function a3(bU) {
        if (!bU || bU === _cjq.crispAdFramework.getComponentNameToIdMap(trackerkey, "expandable-banner")) {
            return false
        } else {
            return true
        }
    }

    function ae(bU) {
        if (!bU) {
            return ""
        }
        if (/&f=1/.test(bU)) {
            bU = bU.replace(/&f=1/, "&f=1&f=2")
        } else {
            bU = ar(bU, "random", "f=2")
        }
        return bU
    }

    function L(bV, bU, bW) {
        if (!bU || !bW) {
            return bV
        }
        if (a3(bU)) {
            bV = ae(bV);
            bW = false;
            _cjq.crispAdFramework.setSecondAction("secondAction", bW)
        }
        return bV
    }

    function aB(bU, bX, bV) {
        var bW = (bV - bX) / 1000;
        if (bW > bU) {
            return true
        } else {
            return false
        }
    }

    function G(bW) {
        var bV = _cjq.crispAdFramework.getAdJson(bW),
            bX, bU;
        if (bV && bV.definition) {
            for (bX in bV.definition) {
                if (bV.definition.hasOwnProperty(bX)) {
                    bU = bV.definition[bX];
                    if (!bU) {
                        return false
                    }
                    if (bU.params && bU.params["#evtplacement#"] === "panel") {
                        return true
                    }
                }
            }
        }
        return false
    }

    function bA() {
        var bW = _cjq.crispAdFramework.getComponentNameToIdMap(trackerkey, "initial-rendered-state"),
            bV = _cjq.crispAdFramework.getAdJson(trackerkey),
            bU = bV.definition[bW];
        if (!!bU && bU.params && (bU.params["#initialstage#"] === "panel" || bU.params["#stageafterdelay#"] === "banner")) {
            return true
        } else {
            return false
        }
    }

    function aK() {
        var bW = bt.trackerkey,
            bU = _cjq.crispAdFramework.getAdWidth(bW),
            bV = _cjq.crispAdFramework.getAdHeight(bW);
        if (!window.adParams.adscroller && _cjq.crispAdFramework.isAdInterstitial(bW) && bU !== 1 && bV !== 1) {
            return true
        }
        return false
    }

    function aU() {
        trackerkey = bt.trackerkey;
        var b1 = _cjq.crispAdFramework.getComponentNameToIdMap(trackerkey),
            bV = _cjq.crispAdFramework.getComponentNameToIdMap(trackerkey, "expandable-banner"),
            bZ = (b1 && b1.image) || [],
            b0, bU, bY, bX = _cjq.crispAdFramework.getAdJson(trackerkey),
            bW = bZ.length;
        if (b1 && b1["interstitial-stub"]) {
            return true
        }
        if (bV) {
            return false
        }
        if (bX.height === 1) {
            return true
        }
        return false
    }

    function a4(bW, bV) {
        var bU, bX = false;
        if (!bW || !bV) {
            return false
        }
        bU = _cjq.crispAdFramework.getAdJson(bW);
        bX = bU && bU.enableDisplayTrackingFor[bV];
        return bX
    }

    function ap(bU) {
        var bV = /:\/\/.+$/;
        return bV.test(bU)
    }

    function P(bW) {
        var bU, bV = new Date();
        if (c.idleGalleryTimer) {
            bU = ((bV.getTime() - c.idleGalleryTimer.getTime()) / 1000)
        }
        if (bU && bU >= 4) {
            return true
        }
        return false
    }

    function bD() {
        var bU = Math.round(new Date().getTime() - _cjq.crispTrackers.__lastProgressTrackerSent.getTime());
        bU = bU / 1000;
        return bU
    }

    function aq(bW) {
        var bX = bD(),
            bV = bQ(bW),
            bU = (bX > bV);
        return bU
    }

    function F(bW) {
        var bX = bD(),
            bV = M,
            bU = (bX > bV);
        return bU
    }

    function bQ(bV) {
        var bU = Math.round(c[bV].idleTimeInterval);
        return bU
    }

    function aw(bX, bW) {
        var bV = new Date(),
            bU = ((bV.getTime() - bX.__displayTime.getTime()));
        if (!bX[bX.placement]) {
            bX[bX.placement] = Math.round(_cjq.crispAdFramework.getProgressTimeInterval(bW) / 2)
        }
        if (aq(bW)) {
            bU = 0;
            bX.__displayTime = new Date()
        }
        bX[bX.placement] = bX[bX.placement] + bU;
        return bX
    }

    function aS(bU, bX, bZ, bY) {
        var bV = new Date(),
            b2, b1 = 0,
            bW, b0 = bV.getTime() - bU.__displayTime.getTime();
        if (aq(bY)) {
            b0 = 0
        }
        bU.__displayTime = new Date();
        if (!bU.placement) {
            bU.placement = bX
        }
        if (!bU[bU.placement]) {
            bU[bU.placement] = b0
        }
        bW = bU[bU.placement];
        if (bZ) {
            b1 = Math.round(_cjq.crispAdFramework.getProgressTimeInterval(bY) / 2);
            b2 = b1
        } else {
            b2 = Math.round(_cjq.crispAdFramework.getProgressTimeInterval(bY))
        }
        bU[bU.placement] = bU[bU.placement] + b2;
        return ((bW + b2) / 1000)
    }

    function a7(b0, bV, bY, bZ, bW) {
        if (!bZ) {
            bZ = "panelobject"
        }
        if (!bV) {
            bV = bZ + "1"
        }
        var bX = aj,
            b3 = "engagement",
            b2 = _cjq.crispAdFramework.getSecondActionObject(),
            b1;
        b1 = b3 + "_" + bV + "_" + bY;
        if (!c[b0].evtprogress) {
            c[b0].evtprogress = []
        }
        if (c[b0].evtprogress[b1]) {
            c[b0].evtprogress[b1] = 1 + c[b0].evtprogress[b1]
        } else {
            c[b0].evtprogress[b1] = 1
        }
        bE(b0, b3, bZ, bV, bY, c[b0].evtprogress[b1]);
        var bU = aD(b0, bX, b3, bZ, bV, bY, "", "", c[b0].evtprogress[b1]);
        if (bW === true) {
            bU = ar(bU, "random", "g=1")
        }
        if (b2.secondAction === true) {
            bU = ar(bU, "random", "f=2");
            _cjq.crispAdFramework.setSecondAction("secondAction", false)
        }
        return bU
    }

    function af(b7, bV, b6, b1, b0, b5, b3, b9, cb, bZ) {
        if (!b1) {
            b1 = "panel"
        }
        if (!bV) {
            bV = b1 + "1"
        }
        var b4 = aj,
            b2 = "interaction",
            b8 = _cjq.crispAdFramework.getSecondActionObject(),
            bU = new Date().getTime(),
            bX = b8 && b8.globalTimer && b8.globalTimer.getTime(),
            ca = b8.limit,
            bY, bW;
        if (b6 === "true" || b6 === true) {
            b6 = "expand"
        } else {
            if (b6 === "false" || b6 === false) {
                b6 = "retract"
            }
        }
        bY = b2 + "_" + bV + "_" + b6;
        if (!c[b7].evtprogress) {
            c[b7].evtprogress = []
        }
        if (c[b7].evtprogress[bY]) {
            c[b7].evtprogress[bY] = 1 + c[b7].evtprogress[bY]
        } else {
            c[b7].evtprogress[bY] = 1
        }
        bE(b7, b2, b1, bV, b6, c[b7].evtprogress[bY]);
        bW = aD(b7, b4, b2, b1, bV, b6, "", "", c[b7].evtprogress[bY]);
        if (_cjq.crispAdFramework.getComponentId(b7, b9)) {
            b9 = _cjq.crispAdFramework.getComponentId(b7, b9)
        }
        if (b3 === true) {
            bW = bW + "&io=" + b9 + "&ip=" + cb + "&in=" + bZ
        }
        if (b0 === true) {
            if (aY(b6)) {
                bW = ar(bW, "random", "f=1");
                bW = L(bW, bV, b5);
                if (!b8.globalTimer) {
                    b8.globalTimer = new Date()
                }
                b0 = false;
                _cjq.crispAdFramework.setFirstAction(b0)
            }
            if ((b6 === "retract") || (b6 === "close" && aU() && bV !== _cjq.crispAdFramework.getComponentNameToIdMap(b7, "adhesion-close-button"))) {
                if (aB(ca, bX, bU)) {
                    bW = L(bW, bV, b5);
                    b0 = false;
                    _cjq.crispAdFramework.setFirstAction(b0)
                }
            }
            _cjq.crispAdFramework.stopTimeDisplayTracker(b7)
        }
        if (_cjq.crispAdFramework.getFirstAction() === false && b8.secondAction === true) {
            if (aY(b6) && a3(bV)) {
                bW = ar(bW, "random", "f=2");
                _cjq.crispAdFramework.setSecondAction("secondAction", false)
            } else {
                if (b6 === "retract") {
                    if (aB(ca, bX, bU)) {
                        bW = ar(bW, "random", "f=2");
                        _cjq.crispAdFramework.setSecondAction("secondAction", false)
                    }
                }
            }
        }
        return bW
    }

    function bR(b1, bU, bZ, b0, bW) {
        if (!b0) {
            b0 = "panel"
        }
        if (!bW) {
            bW = b0 + "1"
        }
        if (!bZ) {
            bZ = "display"
        }
        var bX = aj,
            b2 = "progress",
            bV = "",
            bY = "";
        return aD(b1, bX, b2, b0, bW, bZ, bV, bY, bU)
    }

    function aV(b0, b5) {
        var co = false,
            b4 = _cjq.crispAdFramework,
            cl = [],
            bW = "",
            b2 = "",
            cd, cj, b8, ci, bV, cf, ca, cm, bX, cc, b9, b6, cb, b3, ce, b7, ch, cn;
        if (b0.indexOf("?") > -1) {
            b2 = b0.substring(b0.indexOf("?") + 1)
        }
        b9 = b4.getParamValue(b0, "partnerkey");
        if (!b9) {
            return
        }
        var bZ = b4.getParamValue(b0, "event"),
            cg = b4.getParamValue(b0, "evtprogress");
        cc = b4.getParamValue(b0, "trackerkey");
        var bU = new Date();
        try {
            var bY = bU - window.parent._cjq.AdBridge.impressionsFiredAt.getTime();
            if (bY > _cjq.crispTrackers.__THRESHOLD_TIME_FOR_TRACKER) {
                return
            }
        } catch (ck) {}
        if (b4.getParamValue(b0, "event") == "click" && b4.getParamValue(b0, "evtaction") == "video") {
            b0 = b0.replace(/=click/, "=interaction")
        }
        cl = b4.getParamValue(b0, "xurl");
        bV = b0.indexOf("evturl=");
        if (cc && cl.length > 0) {
            co = b4.getAdPropertyVars(cc, "enableClientTracking")
        }
        if (co === "true") {
            for (cd = cl.length - 1; cd >= 0; cd -= 1) {
                b0 = ba(b0, "xurl")
            }
        }
        if (!b5 || "" === b5) {
            b5 = 500
        }
        cb = c[cc]["dfpMobile"];
        if (cb && cb === "false") {
            cb = false
        } else {
            if (cb && cb === "true") {
                cb = true
            }
        }
        b3 = a1(cc);
        if (!cb && co === "true") {
            if (b3) {
                for (cd = cl.length - 1; cd >= 0; cd -= 1) {
                    A(unescape(cl[cd]))
                }
            } else {
                for (cd = cl.length - 1; cd >= 0; cd -= 1) {
                    bl(unescape(cl[cd]))
                }
            }
        }
        ce = new RegExp("\\." + bL.RETURN_TYPE_JS.substring(bL.RETURN_TYPE_JS.indexOf(".") + 1) + "(?!p)");
        if (!cb && ce.test(b0)) {
            cm = false;
            cj = b4.getDelegate("click-to-js");
            if (typeof cj === "function") {
                cm = cj(b0)
            }
            if (!cm) {
                try {
                    ca = document.getElementsByTagName("head").item(0);
                    bX = document.createElement("script");
                    bX.setAttribute("type", "text/javascript");
                    bX.setAttribute("src", b0);
                    ca.appendChild(bX)
                } catch (b1) {
                    if (typeof console !== "undefined") {}
                }
            }
        } else {
            cm = false;
            cj = b4.getDelegate("tracker");
            if (typeof cj === "function") {
                cm = cj(b0)
            }
            if (_cjq.crispAdFramework.showLog) {
                console.log(" trackerUrl " + b0)
            }
            if (!cm) {
                if (b3) {
                    A(ai(b0))
                } else {
                    bl(ai(b0))
                }
            }
        } if (bV > 0) {
            ci = b0.indexOf("&xurl", bV);
            if (ci > 0) {
                b6 = ci - bV - "evturl=".length;
                bW = b0.substr(bV + "evturl=".length, b6)
            } else {
                bW = b0.substr(bV + "evturl=".length)
            }
        }
        if (cb && bW !== "") {
            if (cl !== "") {
                cf = unescape(cl);
                bW = cl + bW
            }
        }
        if (bW.length > 1 && bW !== "undefined") {
            cm = false;
            cj = b4.getDelegate("click-to-url");
            if (window.parent.mraid !== undefined) {
                cj = window.parent._cjq.AdUtils.getDelegate("click-to-url")
            }
            if (typeof cj === "function") {
                cm = cj(b0)
            }
            if (!cm) {
                cn = b4.getParamValue(b0, "evtobjectname");
                if (cn.indexOf(":") > -1) {
                    cn = cn.substring(cn.indexOf(":") + 1)
                } else {
                    if (!isNaN(cn) && b4.getComponentFromId(cc, cn)) {
                        cn = b4.getComponentFromId(cc, cn).id
                    }
                }
                b7 = "false";
                ch = b4.getAdPropertyVars(cc, "phasedLoading");
                if (b4.getParamValue(b0, "evtaction") === "microsite" || ch === "true") {
                    try {
                        b7 = b4.getAdDefProperty(cc, cn, "clicktargettype")
                    } catch (ck) {
                        b7 = "false"
                    }
                }
                if (b7 === "true") {
                    aZ(unescape(bW))
                } else {
                    setTimeout("window.parent.location='" + unescape(bW) + "'", b5)
                }
            }
        }
    }

    function aD(cd, ca, b6, b5, bX, cc, bZ, b9, b1, b8, cf) {
        var bW = [],
            b0 = _cjq.crispAdFramework.getCrispAdId(),
            b3 = _cjq.crispAdFramework.getLocationValue(),
            b7 = _cjq.crispAdFramework.getInAppValue(),
            ce, cb, bY, bV, b2, bU;
        bW.push("event=" + b6);
        if (b5 && b5.indexOf(":") > -1) {
            b5 = b5.split(":")[1]
        }
        bW.push("evtplacement=" + b5);
        bW.push("evtaction=" + cc);
        bW.push("evtprogress=" + b1);
        if (_cjq.crispAdFramework.getComponentId(cd, bX) && _cjq.crispAdFramework.getComponentId(cd, bX) !== "undefined") {
            bU = _cjq.crispAdFramework.getComponentId(cd, bX);
            bW.push("evtobjectname=" + bU)
        } else {
            bW.push("evtobjectname=" + bX)
        }
        bW.push("evtexternal=" + b9);
        bW.push("trackerkey=" + cd);
        if (b8 && b8 !== "undefined") {
            bW.push("crispkey=" + b8)
        } else {
            bW.push("crispkey=" + _cjq.crispAdFramework.getCrispKey())
        }
        bW.push("adSiteId=" + c[cd].sitekey);
        bW.push("sitekey=" + c[cd].sitekey);
        if (!!b7) {
            bW.push("inapp=" + b7)
        }
        if (!!b3) {
            bW.push("loc=" + b3)
        }
        if (aA(cf)) {
            for (b2 in cf) {
                if (cf.hasOwnProperty(b2)) {
                    bW.push(b2)
                }
            }
        }
        cb = "";
        for (ce in c.trackerkeys) {
            if (c.hasOwnProperty(ce)) {
                if (c.trackerkeys[ce] === cd && c.adId && c.adId[ce]) {
                    b0 = c.adId[ce];
                    cb = ce
                }
            }
        }
        if (!b0) {
            b0 = Math.floor(Math.random() * 999999)
        }
        bW.push("adid=" + cb + b0);
        bW.push("random=" + Math.floor(Math.random() * 999999));
        bW.push("partnerkey=" + c[cd].partnerkey);
        bZ = escape(bZ);
        bW.push("evturl=" + bZ);
        bY = bL.API_URL;
        var b4 = false;
        if (b6 === "display") {
            bY = C(c[cd])
        } else {
            if (b6 === "progress") {
                bY = bB(cd);
                if (!bY || bY === "" || bY === "undefined") {
                    bY = C(c[cd])
                } else {
                    b4 = true
                }
            }
        }
        return U(bY, ca, bW, "", b4)
    }

    function A(bV) {
        if (!az) {
            return
        }
        try {
            var bU = new Image(1, 1);
            bU.src = bV
        } catch (bW) {
            if (typeof console !== "undefined") {
                console.log("Error beacon. Src=" + bV)
            }
        }
    }

    function av(b1, b4, bW, b2, b3) {
        if (!bW) {
            bW = "site1"
        }
        var b5 = "conversion",
            b0 = "microsite",
            bZ = "",
            bV = "",
            bY = "",
            bU = "",
            bX = aj;
        return aD(b1, bX, b5, b0, bW, bZ, bV, bY, bU, b4, b3)
    }

    function C(bW) {
        var bV, bU = window.adParams.isSecure;
        if (bW.request_host && bW.request_host !== "" && bW.request_host !== "undefined") {
            bV = bm + "//" + bW.request_host + "." + bL.API_URL.substring((bm + "//").length)
        }
        return bV
    }

    function bB(bU) {
        return c[bU].displayTimeUrl
    }

    function z(bX, b0) {
        if (!bX) {
            if (!_cjq.pWin || !_cjq.pWin.document.getElementById(_cjq.crispAdFramework.adframeid) || !_cjq.pWin.document.getElementById(_cjq.crispAdFramework.adframeid).contentDocument) {
                return
            }
            bX = _cjq.pWin.document.getElementById(_cjq.crispAdFramework.adframeid).contentWindow
        }
        var bW = bX.document.getElementById("panelContainerDiv"),
            bV, bZ, bY = parseInt(bX.innerWidth, 10),
            b1 = _cjq.crispAdFramework.getBridge(),
            bU = b1 && b1.getWinProps(window.top);
        if (bU && bU.width) {
            bY = bU.width
        }
        bV = bZ = parseInt(_cjq.crispAdFramework.getPanelHeight(_cjq.crispAdFramework.trackerkey), 10);
        if (b0 && b0.length > 0 && b0[0] !== 0) {
            bY = parseInt(_cjq.pWin.document.getElementById(_cjq.crispAdFramework.adframeid).style.width, 10)
        }
        if (bY <= bV) {
            bW.style.left = (bY - bV) / 2 + "px"
        } else {
            bW.style.left = "0"
        }
    }
    _cjq.crispAdFramework.bind("cac_track_interaction", _cjq.crispAdFramework.trackFirstAction);
    _cjq.crispAdFramework.bind("cac_track_interaction", _cjq.crispAdFramework.handleInteractionProgressTimer);
    _cjq.crispAdFramework.bind("cac_track_engagement", _cjq.crispAdFramework.handleEngagementProgressTimer);
    _cjq.crispAdFramework.bind("cac_json_delivered", function() {
        function bU() {
            if (!(typeof adParams !== "undefined" && adParams.xp)) {
                return null
            }
            var bY = ["tparam", "lparam", "cparam"],
                b5, bX, bW;

            function b0(b8) {
                for (var b9 in b8) {
                    if (b8.hasOwnProperty(b9)) {
                        return false
                    }
                }
                return true
            }

            function b7(b8) {
                return !!b8
            }

            function b6(b8) {
                return function(b9) {
                    return b9.split(b8)
                }
            }

            function b1(b8) {
                return Object.prototype.toString.call(b8) === "[object Array]"
            }

            function b3(b8) {
                return b8 && b8.length === 2
            }

            function b2(b8) {
                return b3(b8) && b1(b8)
            }

            function b4(b9, b8) {
                b9[b8[0]] = b8[1];
                return b9
            }
            bX = adParams.xp.split("&").filter(b7).map(b6("=")).filter(b2).reduce(b4, {});
            if (b0(bX)) {
                return null
            }

            function bZ(b9) {
                var b8 = bX[b9];
                if (!b8) {
                    return null
                }
                return [b9, b8.split(";").map(b6(":")).filter(b2).reduce(b4, {})]
            }
            bW = bY.map(bZ).filter(b7).reduce(b4, {});
            for (var bV in bX) {
                if (bX.hasOwnProperty(bV) && !(bY.indexOf(bV) > -1)) {
                    bW[bV] = bX[bV]
                }
            }
            return b0(bW) ? null : bW
        }
        if (typeof adParams !== "undefined" && adParams.xp && adParams.xp !== "%PRM%") {
            adParams.pubParams = bU()
        }
    });
    _cjq.crispAdFramework.bind("cac_track_first_action", function(bU, bV) {
        if (window.parent._cjq && window.parent._cjq.AdUtils) {
            window.parent._cjq.AdUtils.trigger(bU.type, bV)
        }
    });
    _cjq.crispAdFramework.bind("cac_mrc_viewable", function(bU, bV) {
        _cjq.crispTrackers.trackMRCViewable(bU, bV)
    });
    _cjq.crispAdFramework.bind("orientationchange", function(bW, bX) {
        var bV = navigator.userAgent.toLowerCase(),
            bU = (bV.indexOf("iphone") !== -1);
        if (bU && window.adParams.bannerType === "lightbox" && window.adParams.panelType === "standard") {
            setTimeout(function() {
                var bZ = document.getElementById(bL.CRISP_WRAPPER_DIV),
                    bY = parseInt(_cjq.crispAdFramework.getAdDefProperty(_cjq.crispAdFramework.trackerkey, null, "width"), 10),
                    b0 = parseInt(_cjq.crispAdFramework.getAdDefProperty(_cjq.crispAdFramework.trackerkey, null, "height"), 10);
                bZ.style.left = (window.innerWidth - bY) / 2 + "px";
                bZ.style.top = (window.innerHeight - b0) / 2 + "px"
            }, 300)
        }
        if (aK()) {
            setTimeout(function() {
                z(null, bX)
            }, 200)
        }
    });
    _cjq.crispAdFramework.bind("orientationchange", function(bW, bX) {
        var bV = false;
        f = _cjq.crispAdFramework.getDelegate("on_orientation_change");
        if (typeof f === "function") {
            bV = f()
        }
        if (bV) {
            return
        }
        var bU = 10;
        if (/android/i.test(navigator.userAgent)) {
            bU = 1000
        }
        setTimeout(function() {
            var bY = _cjq.crispAdFramework.getOrientation(),
                bZ = _cjq.crispAdFramework.getResolution();
            if (bX) {
                if (Math.abs(bX[0]) === 90) {
                    bY = bL.LANDSCAPE
                } else {
                    bY = bL.PORTRAIT
                }
            }
            bi(bY, bZ)
        }, bU)
    });
    window.addEventListener("message", function(bU) {
        if (bU && bU.data && bU.data.message === "orientationchange") {
            _cjq.crispAdFramework.trigger("orientationchange", [bU.data.orientation])
        }
    }, false);
    _cjq.crispAdFramework.bind("resize", function() {
        var bV = ("ontouchstart" in window);
        if (bV) {
            return
        }
        if (_cjq.crispAdFramework.resizeBanner) {
            return
        }
        if (_cjq.crispAdFramework.isPreviewLiveMode()) {
            return
        }
        var bW = false;
        f = _cjq.crispAdFramework.getDelegate("on_orientation_change");
        if (typeof f === "function") {
            bW = f()
        }
        if (bW) {
            return
        }
        var bU = 10;
        if (/android/i.test(navigator.userAgent)) {
            bU = 500
        }
        setTimeout(function() {
            var bX = _cjq.crispAdFramework.getOrientation(),
                bY = _cjq.crispAdFramework.getResolution();
            bi(bX, bY)
        }, bU)
    }, window)
}());
(function() {
    window.crisploader = window.crisploader || {
        build: "$version.$buildnumber",
        loader: function(c, b) {
            var a = c.ver || 2.1;
            if (_cjq.crispAdFramework.adRequestVersion != undefined && _cjq.crispAdFramework.adRequestVersion !== "" && a != _cjq.crispAdFramework.adRequestVersion) {
                return
            }
            _cjq.crispAdFramework.invokeAds(c, b, a)
        }
    }
}());
window.onerror = window.onerror || function(a) {
    if (typeof console !== "undefined") {}
};
_cjq.crispAdFramework.Aspects = new function() {
    this.InvalidAspect = new Error("Missing a valid aspect. Aspect is not a function.");
    this.UnstableAspect = new Error("Aspect could not run.");
    this.InvalidObject = new Error("Missing valid object or an array of valid objects.");
    this.InvalidMethod = new Error("Missing valid method to apply aspect on.");

    function a(n, p) {
        return function() {
            if (typeof n === "string") {
                try {
                    eval(n)
                } catch (q) {
                    throw (_cjq.crispAdFramework.Aspects.UnstableAspect)
                }
            } else {
                n.apply(this, arguments)
            }
            return p.apply(this, arguments)
        }
    }

    function b(n, p) {
        return function() {
            var q;
            q = n.apply(this, arguments);
            if (typeof p === "string") {
                try {
                    eval(p)
                } catch (r) {
                    throw (_cjq.crispAdFramework.Aspects.UnstableAspect)
                }
            } else {
                p.apply(this, arguments)
            }
            return q
        }
    }

    function m(p, n) {
        return function() {
            return (n(p, arguments))
        }
    }

    function l(n, p) {
        return function() {
            var q, r = null;
            try {
                r = n.apply(this, arguments)
            } catch (s) {
                q = [].slice.call(arguments);
                q.push(s);
                if (typeof p === "string") {
                    try {
                        eval(p)
                    } catch (t) {
                        throw (_cjq.crispAdFramework.Aspects.UnstableAspect)
                    }
                } else {
                    p.apply(this, q)
                }
            }
            return r
        }
    }

    function d(n) {
        if (typeof n !== "function") {
            if (typeof n !== "string") {
                throw (this.InvalidAspect)
            }
        }
        return (n)
    }

    function j(n) {
        var p = typeof n;
        if (p !== "object") {
            n = new Array(n)
        }
        return (n)
    }

    function c(n) {
        if (n.length < 1 || typeof n.length === "undefined") {
            n = new Array(n)
        }
        return (n)
    }

    function g(r, q) {
        var p;
        try {
            if (typeof r.prototype === "undefined") {
                if (typeof r[q] === "undefined" || r[q] === null) {
                    r[q] = function() {}
                }
                p = r[q]
            } else {
                p = r.prototype[q]
            }
        } catch (n) {
            throw (_cjq.crispAdFramework.Aspects.InvalidObjecct)
        }
        if (!p) {
            throw (_cjq.crispAdFramework.Aspects.InvalidMethod)
        }
        return (p)
    }

    function k(q, p, n) {
        if (typeof q.prototype === "undefined") {
            q[p] = n
        } else {
            q.prototype[p] = n
        }
    }

    function h(p, u, q, x) {
        var t, r, s, w;
        p = d(p);
        q = j(q);
        u = c(u);
        w = (u === window) ? 1 : u.length;
        for (t = 0; t < w; t++) {
            s = (u === window) ? u : u[t];
            for (r = 0; r < q.length; r++) {
                var z, v = q[r],
                    y = g(s, v);
                switch (x) {
                    case "before":
                        z = a(p, y);
                        break;
                    case "after":
                        z = b(y, p);
                        break;
                    case "around":
                        z = m(y, p);
                        break;
                    case "afterException":
                        z = l(y, p);
                        break
                }
                z._original = y;
                z._aspectType = x;
                k(s, v, z)
            }
        }
    }
    this.addBefore = function(p, q, n) {
        h(p, q, n, "before")
    };
    this.addAfter = function(p, q, n) {
        h(p, q, n, "after")
    };
    this.addAround = function(p, q, n) {
        h(p, q, n, "around")
    };
    this.addAfterException = function(p, q, n) {
        h(p, q, n, "afterException")
    }
}();
var panelType = null;
try {
    panelType = window.adParams.panelType
} catch (e) {
    panelType = null
}(new function() {
    this.trackerkey = null;
    window.addEventListener("message", function(d) {
        var c = d.data.orientation
    }, false);
    var a = function() {
        if (window.parent._cjq && window.parent._cjq.AdBridge) {
            return window.parent._cjq.AdBridge
        }
        return null
    };
    _cjq.crispAdFramework.bind("orientationHandlingComplete", function(c, d) {
        if (!d) {
            d = {}
        }
        if (a()) {
            d.adframeid = _cjq.crispAdFramework.adframeid;
            a().handleOrientationComplete(c, d)
        }
    });
    _cjq.crispAdFramework.bind("resize", function(d) {
        if (a()) {
            var c = document && document.body.getAttribute("data-adframeid");
            a().resize(d, this.trackerkey, c)
        }
    }, window);
    _cjq.crispAdFramework.bind("scroll", function(d) {
        if (!_cjq.crispAdFramework.isAdRendered()) {
            return false
        }
        if (a()) {
            var c = document && document.body.getAttribute("data-adframeid");
            a().onScroll(d, this.trackerkey, c)
        }
    }, window);
    _cjq.crispAdFramework.callBridge = function(d) {
        if (!a()) {
            return
        }
        _cjq.pWin = window.parent;
        var c = document && document.body.getAttribute("data-adframeid");
        if (c.indexOf("cacPanelIframe__") > -1) {
            return
        }
        var g = {};
        this.trackerkey = d;
        g.trackerkey = d;
        g.collapsedWidth = _cjq.crispAdFramework.getAdWidth(d);
        g.collapsedHeight = _cjq.crispAdFramework.getAdHeight(d);
        if (_cjq.crispAdFramework.getPanelWidth(d)) {
            g.expandedWidth = _cjq.crispAdFramework.getPanelWidth(d);
            g.expandedHeight = _cjq.crispAdFramework.getPanelHeight(d)
        }
        g.isAdhesion = _cjq.crispAdFramework.isAdhere(d);
        g.isLightbox = _cjq.crispAdFramework.isLightBoxAd(d);
        g.isFixedAdhesion = _cjq.crispAdFramework.isFixedAdhesion(d);
        g.isPreExpandable = _cjq.crispAdFramework.isAdPreExpandable(d);
        g.isExpandableAd = _cjq.crispAdFramework.isExpandableAd(d);
        g.isInterstitial = _cjq.crispAdFramework.isAdInterstitial(d);
        g.hideInLandscape = _cjq.crispAdFramework.getAdPropertyVars(d, "hideInLandscape");
        if (_cjq.crispAdFramework.getAdPropertyVars(d, "phase2Url")) {
            g.isThisPart2AdDelivery = true
        }
        g.landscapeWidth = _cjq.crispAdFramework.getAdPropertyVars(d, "landscapeWidth");
        g.landscapeHeight = _cjq.crispAdFramework.getAdPropertyVars(d, "landscapeHeight");
        g.iFrameId = c;
        g.adframeid = c;
        if (window.parent._cjq && window.parent._cjq.AdBridge) {
            window.parent._cjq.AdUtils.trigger("cac_ad_rendered", [d, g, c]);
            if (window.parent._cjq.AdBridge.initialize) {
                window.parent._cjq.AdBridge.initialize(g)
            }
        }
    };
    _cjq.crispAdFramework.bind("cac_ad_rendered", function(d, g) {
        if (!a()) {
            return
        }
        var c = g[0];
        if (!_cjq.crispAdFramework.cac_ad_rendered) {
            _cjq.crispAdFramework.callBridge(c);
            _cjq.crispAdFramework.cac_ad_rendered = true
        }
    }, null, true);
    var b = function(d, g) {
        if (window.parent._cjq && window.parent._cjq.AdUtils) {
            var c = document && document.body.getAttribute("data-adframeid");
            if (g) {
                g.adframeid = c
            }
            window.parent._cjq.AdUtils.trigger(d.type, g)
        }
    };
    _cjq.crispAdFramework.bind("cac_banner_close", b);
    _cjq.crispAdFramework.bind("createPanelIframe", b);
    _cjq.crispAdFramework.bind("addCrispBannerCloseButton", function() {
        var c = Array.prototype.slice.call(arguments);
        if (adParams.overrideBannerClose !== "none" && typeof adParams.overrideBannerClose !== "undefined") {
            return
        }
        b.apply(this, c)
    });
    _cjq.crispAdFramework.bind("addCrispPanelCloseButton", b);
    _cjq.crispAdFramework.bind("cac_gotostage", b);
    _cjq.crispAdFramework.bind("cac_phase_rendered", b);
    _cjq.crispAdFramework.bind("cac_inapp_ready", b);
    _cjq.crispAdFramework.bind("cac_panel_prep", b);
    _cjq.crispAdFramework.bind("cac_panel_rendered", b);
    _cjq.crispAdFramework.bind("cac_create_panel_frame", b);
    _cjq.crispAdFramework.bind("crispbanneriframeloaded", function(d) {
        var c = document && document.body.getAttribute("data-adframeid");
        _cjq.crispAdFramework.adframeid = c;
        if (window.parent._cjq && window.parent._cjq.AdUtils) {
            window.parent._cjq.AdUtils.trigger("crispbanneriframeloaded", {
                adframeid: c
            })
        }
    });
    _cjq.crispAdFramework.bind("crisppaneliframeloaded", function(d) {
        var c = document && document.body.getAttribute("data-adframeid");
        _cjq.crispAdFramework.adframeid = c;
        if (window.parent._cjq && window.parent._cjq.AdUtils) {
            window.parent._cjq.AdUtils.trigger("crisppaneliframeloaded", {
                adframeid: c
            })
        }
    });
    _cjq.crispAdFramework.bind("crispBannerCloseButtonAdded", function(d, h) {
        var g = h && h.id,
            c = g && _cjq.crispAdFramework.getElementById(g);
        if (c) {
            c.style.display = "none";
            c.style.height = c.style.width = "0px"
        }
    });
    _cjq.crispAdFramework.bind("crispPanelCloseButtonAdded", function(h, j) {
        var g = j && j.id,
            d = g && _cjq.crispAdFramework.getElementById(g);
        if (d) {
            d.style.display = "none";
            var c = d.querySelector("img");
            if (c && c.parentNode && c.parentNode.parentNode) {
                c.parentNode.parentNode.removeChild(c.parentNode)
            }
        }
    });
    _cjq.crispAdFramework.bind("cac_position_panel_close", function(c, j) {
        var k = j && j.id,
            u = k && _cjq.pWin.document.getElementById(k),
            g = 1,
            q = _cjq.pWin.document.getElementById(_cjq.crispAdFramework.adframeid);
        if (u) {
            u.style.display = "none";
            var s = document.getElementById("panelContainerDiv"),
                t = _cjq.crispAdFramework.getPanelCloseDiv();
            var r, m, n, l = _cjq.pWin._cjq.AdUtils.deviceProps.isMobileOptimized();
            r = parseInt(t.style.width);
            m = parseInt(t.style.height);
            if (!j.scale) {
                j.scale = 1
            }
            if (isNaN(j.scale)) {
                g = parseInt(j.scale, 10)
            } else {
                g = j.scale
            } if (!g) {
                g = 1
            }
            u.style.height = (m * g) + "px";
            u.style.width = (r * g) + "px";
            if (g !== 1 || (_cjq.crispAdFramework.adBridge.isAdhesionStretched && _cjq.crispAdFramework.adBridge.isAdhesionStretched(_cjq.crispAdFramework.adframeid))) {
                var p = 0,
                    d = (r * g);
                if (g < 0.25) {
                    p = (m * g) / 2
                }
                if (!l) {
                    if (_cjq.crispAdFramework.adBridge.isAdhesionStretched && _cjq.crispAdFramework.adBridge.isAdhesionStretched(_cjq.crispAdFramework.adframeid)) {
                        p = (m * g);
                        if (g < 0.25) {
                            p = (m * g)
                        }
                        if (_cjq.pWin.innerHeight > _cjq.pWin.innerWidth) {
                            d = d / 2
                        }
                    }
                }
                u.style.top = q.offsetTop + (_cjq.pWin.innerHeight - (s.offsetHeight * g) - p) + "px";
                u.style.left = q.offsetLeft + (_cjq.pWin.innerWidth - ((_cjq.pWin.innerWidth - (s.offsetWidth * g)) / 2) - (d)) + "px"
            } else {
                g = 1;
                u.style.top = q.offsetTop + (t.offsetTop + s.offsetTop) * g + "px";
                u.style.left = q.offsetLeft + (t.offsetLeft + s.offsetLeft) * g + "px"
            }
            setTimeout(function() {
                if (!_cjq.pWin._cjq.AdEngine.MRC.checkPos(u) && !_cjq.crispAdFramework.overrideViewLogic) {
                    u.style.top = q.offsetTop + "px";
                    if (!_cjq.pWin._cjq.AdEngine.MRC.checkPos(u)) {
                        if (t.offsetLeft > s.offsetWidth / 2) {
                            u.style.left = q.offsetLeft + _cjq.pWin.innerWidth - (r * g) + "px"
                        } else {
                            u.style.left = q.offsetLeft + "px"
                        }
                    }
                }
            }, 250);
            setTimeout(function() {
                if (u.style.display === "none") {
                    u.style.display = "block"
                }
            }, 1000)
        }
    });
    _cjq.crispAdFramework.bind("cac_track_banner_close", function(d, h) {
        var j = h && h[0],
            l = h && h[1],
            k = h && h[2],
            c = null,
            m = null,
            g = null,
            n = null;
        if (j && l) {
            c = _cjq.crispAdFramework.getComponentNameToIdMap(j);
            g = c && c["banner-close-button"] && c["banner-close-button"][0];
            n = g && _cjq.crispAdFramework.getAdDefProperty(j, g, "params");
            m = n && n["#evtobjectid#"];
            _cjq.crispAdFramework.stopTimeDisplayTracker(j);
            _cjq.crispAdFramework.trackInteraction(j, m, l, "close")
        } else {
            console.log("cannot track closeBanner")
        }
    });
    _cjq.crispAdFramework.bind("cac_panel_action", function(d, g) {
        if (!a()) {
            return
        }
        var c = g[0];
        if (!_cjq.crispAdFramework.cac_ad_rendered) {
            _cjq.crispAdFramework.callBridge(c);
            _cjq.crispAdFramework.cac_ad_rendered = true
        }
    })
}());
(function(k) {
    var m = k._cjq,
        g = {},
        q = {},
        v = m.crispAdFramework.getConstant();

    function a() {
        g.lastScreenHeight = k.innerHeight;
        g.lastScreenWidth = k.innerWidth;
        g.initStaticTiming = 20;
        g.bannerWidth = 300;
        g.bannerHeight = 50;
        g.showInLandscapeOrientation = false;
        g.cradleDisplayed = false;
        g.displayTime = null;
        g.progressTimer = null;
        g.displayTimeInterval = 4000;
        g.isCssTransform = true;
        g.isFixedAdhesion = false;
        if (/iPad/i.test(navigator.userAgent)) {
            g.adhereWidth = 768
        }
        g.hidden = false;
        g.previousOrientation = Math.abs(k.orientation) === 90 ? "landscape" : "portrait";
        g.adBannerHidden = false;
        g.spacerpos = 0;
        g.watchDogTimer = 0;
        q.cradleDiv = v.CRISP_WRAPPER_DIV;
        q.cacAdhere = "cac_adhere_cradle";
        q.adhereDiv = "cac_adhere";
        q.bannerDiv = "cac_adhere_banner";
        q.bannerImg = "cac_banner_img";
        g.initialOrientation = m.crispAdFramework.getOrientation()
    }

    function s(A) {
        var B = document.getElementById(A);
        B.style["-webkit-transform-style"] = "-webkit-transform 0ms ease-out";
        B.style["-webkit-transition"] = "preserve-3d";
        B.style["-moz-transition"] = "-webkit-transform 0ms ease-out";
        B.style.transition = "-webkit-transform 0ms ease-out";
        B.style["-webkit-transform-origin"] = "0% 100%;";
        B.style["-moz-transform-origin"] = "0% 100%;";
        B.style["transform-origin"] = "0% 100%;"
    }

    function p(D) {
        var B, E, A, C;
        if (!D || D === undefined || D === "undefined") {
            return
        }
        B = D.childNodes;
        if (!B || B === undefined || B.length === 0) {
            return
        }
        E = B.length;
        for (C = 0; C < E; C += 1) {
            A = B[C];
            if (A && A.tagName) {
                if (A.tagName.toUpperCase() === "DIV") {
                    A.style["-webkit-transform-style"] = "preserve-3d";
                    A.style["-webkit-transform"] = "translate3d(0px, 0px, 0px)"
                }
                if (A.tagName.toUpperCase() === "IMG") {
                    A.style["-webkit-transform-style"] = "preserve-3d";
                    A.style["-webkit-transform"] = "translate3d(0px, 0px, 0px)"
                }
                p(A)
            }
        }
    }

    function r() {
        var B, D, F, A, C = q && document.getElementById(q.adhereDiv);
        if (!document.getElementById(q.adhereDiv)) {
            return
        }
        if (!g.displayTime) {
            g.displayTime = new Date()
        }
        g.bannerHeight = parseInt(m.crispAdFramework.getAdDefProperty(g.adtrackerkey, null, "height"));
        g.bannerWidth = parseInt(m.crispAdFramework.getAdDefProperty(g.adtrackerkey, null, "width"));
        g.isCssTransform = (!(/android/i.test(navigator.userAgent)));
        B = document.getElementById(q.cradleDiv);
        if (!g.isCssTransform) {
            if (B) {
                B.style.position = "absolute"
            }
        }
        D = arguments.callee;
        if (D.timer) {
            clearTimeout(D.timer)
        }
        if (null === B) {
            D.timer = setTimeout(r, g.initStaticTiming);
            return
        }
        var E = 99999;
        if (C) {
            C.style.height = g.bannerHeight + "px";
            C.style.width = g.bannerWidth + "px"
        }
        if (g.isCssTransform) {
            if ((/OS 5/i.test(navigator.userAgent))) {
                if (!(/iPad/i.test(navigator.userAgent))) {
                    B.style.left = 0
                }
            } else {
                B.style.left = 0
            } if (g.isFixedAdhesion === false) {
                B.style.top = 0;
                document.getElementById(v.CRISP_WRAPPER_DIV).style.top = 0;
                s(q.cacAdhere);
                p(document.getElementById(q.cacAdhere));
                B.style.opacity = "0"
            }
        }
        if (g.isFixedAdhesion === true) {
            setFixedCssProperty(q.cradleDiv);
            setFixedCssProperty(q.cradleDiv);
            B.style.height = g.bannerHeight + "px";
            B.style.width = g.bannerWidth + "px";
            delete B.style.top
        }
        B.style.opacity = "1";
        g.adhereWidth = g.bannerWidth;
        g.cradleDisplayed = true;
        h();
        document.getElementById(q.cradleDiv).style.display = "block";
        j()
    }

    function j(A) {}

    function h() {
        if (g.cradleDisplayed && m.crispAdFramework.isPanelOpen(g.adtrackerkey)) {
            m.crispAdFramework.startTimeDisplayTracker(g.adtrackerkey, "display", "panel", "panel1")
        } else {
            if (g.cradleDisplayed) {
                m.crispAdFramework.startTimeDisplayTracker(g.adtrackerkey, "display", "banner", "banner")
            }
        }
    }

    function b(B, A) {
        while (B && (B.nodeType != 1 || B.localName.toLowerCase() != A)) {
            B = B.parentNode
        }
        return B
    }

    function c(D, C) {
        var A = document.getElementById(D),
            B = new RegExp("(^|\\s)" + C + "($|\\s)");
        if (A) {
            return B.exec(A.getAttribute("class")) != null
        }
        return false
    }

    function y() {
        m.crispAdFramework.bind("cac_panel_action", function(D, I) {
            var K = I[0],
                J = I[1],
                F = m.crispAdFramework.getIOSVersion(),
                G = parseInt(m.crispAdFramework.getAdDefProperty(g.adtrackerkey, null, "height")),
                L = 0,
                H = 1,
                E = document.querySelector("#cac_adhere");
            H = l();
            if (!H) {
                H = 1
            }
            if (F && F.version === 7 && !!E) {
                if (J === "open") {
                    L = m.crispAdFramework.getPanelHeight() - G;
                    if (H && typeof H === "number" && H !== 1) {
                        L = k.pageYOffset / H
                    }
                    E.style.height = m.crispAdFramework.getPanelHeight() + "px";
                    E.style.top = L + "px"
                } else {
                    E.style.height = G + "px";
                    L = k.pageYOffset;
                    if (H && typeof H === "number" && H !== 1) {
                        L = k.pageYOffset / H
                    }
                    E.style.top = L + "px"
                }
            }
        });
        m.crispAdFramework.bind("cac_adhere_zoomed", function(F, G) {
            var E = m.crispAdFramework.getIOSVersion();
            if (E && E.version >= 7) {
                var D = l();
                if (G && D && G.scale === D) {
                    document.getElementById("cac_adhere").style.top = k.pageYOffset / D + "px"
                }
            }
        });

        function B(D) {
            if (true === g.isFixedAdhesion) {
                return
            }
            if (k.parent && k.parent._cjq && k.parent._cjq.AdhesionCradle && k.parent._cjq.AdhesionCradle.hideCradle) {
                k.parent._cjq.AdhesionCradle.hideCradle(D)
            }
        }

        function C() {
            if (k.parent && k.parent._cjq && k.parent._cjq.AdhesionCradle && k.parent._cjq.AdhesionCradle.watchDogShow) {
                k.parent._cjq.AdhesionCradle.watchDogShow(1)
            }
        }
        var A = m.crispAdFramework.getDocumentBody();
        A.addEventListener("touchmove", B, false);
        A.addEventListener("touchend", C, false)
    }

    function l() {
        var A = false;
        if (document.body.style["-webkit-transform"] && k.parent && k.parent._cjq && k.parent._cjq.AdUtils) {
            A = k.parent._cjq.AdUtils.css.getTransform(document.body.style["-webkit-transform"], "scale");
            if (A) {
                A = A.match(/\d(\.\d+)?/g);
                if (A && A.length > 0) {
                    A = parseFloat(A[0], 10)
                } else {
                    A = false;
                    console.log("failed to match numeric values")
                }
            } else {
                A = false;
                console.log("failed to get scale prop")
            }
        }
        return A
    }

    function d() {
        var A, B, C;
        if (m.crispAdFramework.getPreviewRequest()) {
            g.isCssTransform = false;
            return
        }
        if (typeof g.useCssTransform === "undefined" || false === g.useCssTransform) {
            g.isCssTransform = false
        }
        if (typeof g.turnOffCssTransform != "undefined") {
            g.isCssTransform = !(g.turnOffCssTransform)
        }
        if (/android/i.test(navigator.userAgent)) {
            g.isCssTransform = false
        }
        if (!(/WebKit/i.test(navigator.userAgent))) {
            g.isCssTransform = false
        }
    }

    function z() {
        var C = true;
        var A = document.querySelector("meta[name=viewport]");
        if (!A) {
            return true
        }
        var B = A.getAttribute("content");
        if (B && (B.indexOf("maximum-scale") > -1 || B.indexOf("initial-scale") > -1)) {
            C = false
        }
        return C
    }

    function x() {
        if (true === g.useFixedAdhesion && !z() && positionFixedSupported()) {
            g.isFixedAdhesion = true
        }
    }

    function u() {
        d();
        x();
        if (/silk/i.test(navigator.userAgent)) {
            g.isCssTransform = false
        }
        if (/android/i.test(navigator.userAgent) || z() || /silk/i.test(navigator.userAgent)) {}
        y();
        try {
            if (m.crispAdFramework.isFixedAdhesionContainer(g.adtrackerkey)) {
                g.isFixedAdhesion = true
            }
        } catch (A) {
            console.log(A)
        }
    }

    function t(A, B) {
        if (A <= 0) {
            return
        }
        if (B) {
            r()
        } else {
            if (document.getElementById(q.cradleDiv)) {
                if (g.lastScreenHeight != k.innerHeight) {
                    g.lastScreenHeight = k.innerHeight
                }
            }
        }
        A -= 1;
        setTimeout(function() {
            t(A, false)
        }, 100)
    }

    function n() {
        a();
        setTimeout(u, g.initStaticTiming);
        setTimeout(function() {
            t(25, true)
        }, 400)
    }
    m.adhesion = m.adhesion || {
        __adhereProp: g,
        __adhereId: q,
        unBindAllListeners: function() {
            unBindAllListeners()
        },
        startAdhesion: function() {
            n()
        },
    };
    if (typeof m.adhesion !== "undefined") {}
    k.__adhereProp = k.__adhereProp || m.adhesion.__adhereProp;
    k.__adhereId = k.__adhereId || m.adhesion.__adhereId;
    try {
        if (k.adParams && k.adParams.bannerType === "adhesion") {
            m.crispAdFramework.bind("cac_ad_rendered", function(A, B) {
                g.adtrackerkey = B[0];
                m.adhesion.startAdhesion()
            }, null, true)
        }
    } catch (w) {
        console.log(w)
    }
}(window));
window.crispCallback = function(a) {
    if (window.adParams && window.adParams.previewtype === "editmodepreview") {
        return
    }
    if (window.adParams && window.adParams.loadAd !== false && !window.adParams.previewtype) {
        a.loader.trigger("crispbanneriframeloaded", []);
        window.crisploader.loader(window.adParams)
    } else {
        a.loader.trigger("crisppaneliframeloaded", [])
    }
};
crispCallback({
    loader: _cjq.crispAdFramework
});