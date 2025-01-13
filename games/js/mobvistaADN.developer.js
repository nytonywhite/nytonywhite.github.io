///*------------     function for Mobvista ADN (initial from mobvista tag) start      ---------     */
 
(function() {
    var host = "http://net.rayjump.com/site_request.php?";
    var cookieHost = 'http://net.rayjump.com/js/cookie.html';
    var isViewport = false;
    var currentScreen = {
        width:0,
        height:0
    };

    //var host = "http://net.rayjump.com/site_request.php?";
    addListener(window,"DOMContentLoaded",function(){
        //for clear the FC
        // localStorage['campaign_ids'] = null;
        initCookie();
        isViewport = hasViewport();
        currentScreen = getScreenSize();
        if ((!document.getElementById("mobvistaadnsdk").attributes.s) || (!document.getElementById("mobvistaadnsdk").attributes.site_id)) {
            console.error('you have fill the s and the site_id on the mobvistaadnsdk scrpit tag! \nExample: <script id="mobvistaadnsdk" s="123456789" site_id="0"  type="text/javascript" src="mobvistaADN2.js"></script>');
            return;
        }

        var sign = document.getElementById("mobvistaadnsdk").attributes.s.value;
        var site_id = document.getElementById("mobvistaadnsdk").attributes.site_id.value;
        //var forcejump = document.getElementById("mobvistaadnsdk").attributes.forcejump?document.getElementById("mobvistaadnsdk").attributes.forcejump.value:false;
        //var forcejump = true;
        

        window.mobvistaADN = {
            ads: {},
            getAds: function(id) {
                return this.ads[id];
            },
            initAll: function(adnObj) {
                var adnArray = document.getElementsByTagName("mobvistaADN");
                for (var i = 0, iLang = adnArray.length; i < iLang; i++) {
                    mobvistaADNTag(adnArray[i]);
                }
                
                //var popType = 'popUnder'; //['popUnder','popUp']
                // if(forcejump){
                //     if(popType=='popUnder'){
                //         var popunderObject = document.createElement('div');
                //         popunderObject.setAttribute('id','popunderEle');
                //         popunderObject.setAttribute('adnType','popunder');
                //         mobvistaADNTag(popunderObject);
                //     }else if(popType=='popUp'){
                //         var popupObject = document.createElement('div');
                //         popupObject.setAttribute('id','popupEle');
                //         popupObject.setAttribute('adnType','popup');
                //         mobvistaADNTag(popupObject);
                //     }
                    
                //     //initPopunder(forcejump);
                // }
            },
            initById: function(id) {
                var adnObject = document.getElementById(id);
                mobvistaADNTag(adnObject);
            },
            callback: []
        };



        //for force open new page for popunder
        var initPopunder = function(urls,impressions,isPopUp,campaign_ids,fcaLimit){
            var jumpEls = [];
            for(var i=0,iMax=urls.length;i<iMax;i++){
                var url = urls[i];
                var impression = impressions[i];
                var jumpEl = document.createElement('a');
                jumpEl.setAttribute('href',url);
                jumpEl.setAttribute('target','_blank');
                jumpEl.setAttribute('style','position:absolute;left:0px;top:0px;width:1px;height:1px;visibility:hidden;');
                document.body.appendChild(jumpEl);
                jumpEls.push(jumpEl);
                setImpression(impression);
            }
            addListener(document.body,'click',jump);
            function jump(e){
                var sender = e;
                if(isPopUp||(e.target.nodeName.toLocaleLowerCase()=='a'
                    && ( e.target.parentNode.getAttribute('id') == null ||
                         e.target.parentNode.getAttribute('id').indexOf('idcontent')!=0)
                    )){

                    var defaultUrl = sender.target.getAttribute('href');
                    sender.target.removeAttribute('href');

                    doJump();
                    function doJump(){
                        var currentJumpEl = jumpEls.pop();
                        var campaign_id = campaign_ids.pop();
                        addCampainToLocalStorage(campaign_id,{'adnType':'banner','fcaLimit':fcaLimit});
                        
                        if(currentJumpEl&&jumpEls.length>0){
                            triggerEvent(currentJumpEl,'click');
                            document.body.removeChild(currentJumpEl);
                            setTimeout(doJump,50);
                        }else if(currentJumpEl&&jumpEls.length==0&&(!isPopUp)){
                            sender.target.setAttribute('href',url);
                            currentJumpEl.setAttribute('href',defaultUrl);
                            triggerEvent(currentJumpEl,'click');
                            removeListener(document.body,'click',jump);
                            document.body.removeChild(currentJumpEl);
                            triggerEvent(sender.target,'click');
                        }else if(isPopUp&&currentJumpEl&&jumpEls.length==0){
                            triggerEvent(currentJumpEl,'click');
                            document.body.removeChild(currentJumpEl);
                            sender.target.setAttribute('href',defaultUrl);
                            triggerEvent(sender.target,'click');
                            setTimeout(doJump,50);
                        }
                    }
                    removeListener(document.body,'click',jump);
                }


                

                
            }



            // var jumpEl = document.createElement('a');
            // jumpEl.setAttribute('href',url);
            // jumpEl.setAttribute('target','_blank');
            // jumpEl.setAttribute('style','position:absolute;left:0px;top:0px;width:1px;height:1px;visibility:hidden;');
            // document.body.appendChild(jumpEl);
            // addListener(document.body,'click',jump);
            // setImpression(impression);
            // function jump(e){
            //     if(e.target.nodeName.toLocaleLowerCase()=='a'
            //         && ( e.target.parentNode.getAttribute('id') == null ||
            //              e.target.parentNode.getAttribute('id').indexOf('idcontent')!=0)
            //         ){

            //         var defaultUrl = e.target.getAttribute('href');
            //         e.target.setAttribute('href',url);
            //         jumpEl.setAttribute('href',defaultUrl);
            //         triggerEvent(jumpEl,'click');
            //         removeListener(document.body,'click',jump);
            //         document.body.removeChild(jumpEl);

            //         return false;
            //     }

                
            // }
        };

        var initPopup = function(urls,impressions){
            var jumpEls = [];
            for(var i=0,iMax=urls.length;i<iMax;i++){
                var url = urls[i];
                var impression = impressions[i];
                var jumpEl = document.createElement('a');
                jumpEl.setAttribute('href',url);
                jumpEl.setAttribute('target','_blank');
                jumpEl.setAttribute('style','position:absolute;left:0px;top:0px;width:1px;height:1px;visibility:hidden;');
                document.body.appendChild(jumpEl);
                jumpEls.push(jumpEl);
                setImpression(impression);
            }
            addListener(document.body,'click',jump);
            document.body.setAttribute('popup','true');
            function jump(){              
                document.body.removeAttribute('popup');
                var currentJumpEl = jumpEls.pop();
                if(currentJumpEl){
                    triggerEvent(currentJumpEl,'click');
                    document.body.removeChild(currentJumpEl);
                    setTimeout(jump,50);
                }
                removeListener(document.body,'click',jump);
            }

            
        }


        function mobvistaADNTag(adnObj) {
            var adn = adnObj.attributes;
            var timescape = Date.parse(new Date()).toString();
            var containerID = adn.id ? adn.id.value : 'mobvistaADNContainer' + timescape + Math.random().toString().split('.')[1];
            /* 
                we use specify id for our adn container, 
                so that we won't confuse with the page dom 
            */
            var mobvistaADNContainer = document.createElement("div");
            mobvistaADNContainer.setAttribute("id", containerID);
            /* the new container extend the orginal's style as user set */
            if (adn.style) mobvistaADNContainer.setAttribute("style", adn.style.value);


            var adnType = adn.adnType.value;
            var adType = adnType;
            var adFromType = adnType;
            switch(adnType){
                case 'popunder':
                    adType = 'banner';
                    adFromType = 'wap_pop_under';
                    break;
                case 'popup':
                    adType = 'banner';
                    adFromType = 'wap_pop_up';
                    break;
                case 'banner':
                    adType = 'banner';
                    adFromType = 'wap_banner';
                    break;
                case 'innerFrame':
                    adType = 'banner';
                    adFromType = '';
                    break;
                case 'cornerFloat':
                    adType = 'overlay';
                    adFromType = 'wap_overlay';
                    break;
                case 'overlay':
                    adType = 'overlay';
                    adFromType = 'wap_overlay';
                    break;
                case 'text':
                    adType = 'text';
                    adFromType = 'wap_text';
                    break;
                case 'interstitial':
                    adType = 'full_screen';
                    adFromType = 'wap_interstitial';
                    break;
            }

            var callbackKey = timescape + Math.random().toString().split('.')[1];
            var adnRequest = {
                url: host,
                type: 'get',
                timeout: '1000',
                contentType: 'JSON',
                timestamp: true,
                callbackKey: callbackKey,
                data: {
                    site_id: site_id,
                    from: adFromType,
                    adtype: adType,
                    /*ADN Type: overlay, text, banner*/
                    jsonp: "jsonp" + callbackKey,
                    s: sign,
                    version: '2.0'
                },
                dataType: 'jsonp',
                success: function(data) {
                    /* for replacing the mobvista tag with new adn container */

                    replaceEach(mobvistaADNContainer, adnObj);
                    var containerConfig = (adnType=='popunder'||adnType=='popup')? false : {
                        containerWidth: document.getElementById(containerID).clientWidth,
                        containerHeight: document.getElementById(containerID).clientHeight,
                        containerID: containerID,
                        closeAble:true
                    };
                    switch (adnType) {
                        case 'mutiliText':
                            //todo
                            initMarquee(data, containerConfig);
                            break;
                        case 'text':
                            //todo
                            initText(data, containerConfig);
                            break;
                        case 'interstitial':
                            containerConfig.isFullScreen = true;
                            initInterstitial(data, containerConfig);
                            break;
                        case 'overlay':
                            containerConfig.isFullScreen = false;
                            initOverlay(data,containerConfig);
                            // initInterstitial(data, containerConfig);
                            break;
                        case 'innerFrame':
                            initInnerFrame(data, containerConfig);
                            break;
                        case 'banner':
                            mobvistaADNContainer.setAttribute("style","");
                            var size = adn.size ? adn.size.value : 'medium';
                            var position = (adn.position&&adn.position.value&&adn.position.value.length>0) ? adn.position.value : 'centerbottom';
                            containerConfig.containerWidth = "320";
                            containerConfig.containerHeight = "50";
                            containerConfig.closeAble = false;
                            containerConfig.forceSize = true;
                            initCornerFloat(data, containerConfig, size, position);
                            break;
                        case 'cornerFloat':
                            var size = adn.size ? adn.size.value : 'medium';
                            var position = adn.position ? adn.position.value : 'lefttop';
                            initCornerFloat(data, containerConfig, size, position);
                            break;
                        case 'popunder':
                            var actionUrls = [];
                            var impressionAnalysisUrls = [];
                            var campaign_ids =[];
                            for(var i in data.data){
                                actionUrls.push(data.data[i].clickUrl);
                                campaign_ids.push(data.data[i].campaignid);
                                impressionAnalysisUrls.push(data.data[i].impressionAnalysisUrl);
                            }
                            var fcaLimit = data.data[0]['fca'];
                            initPopunder(actionUrls,impressionAnalysisUrls,false,campaign_ids,fcaLimit);
                            break;
                        case 'popup':
                            var actionUrls = [];
                            var impressionAnalysisUrls = [];
                            var campaign_ids =[];
                            for(var i in data.data){
                                actionUrls.push(data.data[i].clickUrl);
                                campaign_ids.push(data.data[i].campaignid);
                                impressionAnalysisUrls.push(data.data[i].impressionAnalysisUrl);
                            }
                            var fcaLimit = data.data[0]['fca'];
                            initPopunder(actionUrls,impressionAnalysisUrls,true,campaign_ids,fcaLimit);
                            //initPopup(actionUrls,impressionAnalysisUrls);
                            break;
                    }

                    if(adnType!='popunder'&& adnType!='popup') addTomobvistaADN(mobvistaADNContainer,adnType);
                }

            };

            if (adnRequest.dataType == "jsonp" || adnRequest.dataType == "JSONP") {
                mobvistaJSONPAjax.load(adnRequest);
            } else {
                mobvistaAjax(adnRequest);
            }
        };

        function addTomobvistaADN(adnObj,adnType) {
            var adnObject = {
                adnType:adnType,
                showState: adnObj.style.display,
                hide: function() {
                    adnObj.style.display = "none";
                    triggerEvent(window,'adhide',{"adsID":adnObj.id,"adnType":adnType});
                },
                show: function() {
                    adnObj.style.display = this.showState;
                    triggerEvent(window,'adshow',{"adsID":adnObj.id,"adnType":adnType});
                }
            }

            mobvistaADN.ads[adnObj.attributes.id.value] = adnObject;

        }

        //for handling the data from crossing domain
        var mobvistaJSONPAjax = function(win) {
            var isIE = !1,
                doc = win.document,
                head = doc.getElementsByTagName('head')[0];

            function request(param) {

                var url = param.url + parseToUrl(param.data) + '&campaignids='+campaignArray.getData().filterByFCA().toIdString();//.filterByTime(0,'minute').toIdString();
                var success = param.success;
                var timestamp = param.timestamp;
                var script = doc.createElement('script');

                function callback() {
                    eval("if(!window."+param.data.jsonp+"){jsonp = undefined;}else{ jsonp = " + param.data.jsonp+"}");
                    if (typeof jsonp != 'undefined') {
                        success(jsonp);
                    } else {
                        console.log('warning: jsonp did not return.');
                    }
                    // Handle memory leak in IE
                    script.onload = script.onreadystatechange = null;
                    if (head && script.parentNode) {
                        head.removeChild(script);
                    }
                }
                if (isIE) {
                    script.onreadystatechange = function() {
                        var readyState = this.readyState;
                        if (readyState == 'loaded' || readyState == 'complete') {
                            callback();
                        }
                    }
                } else {
                    script.onload = function() {
                        callback();
                    }
                }
                if (timestamp) {
                    url += '&ts=' + (new Date).getTime();
                }
                script.src = url;
                head.insertBefore(script, head.firstChild);
            }

            return {
                load: request
            };
        }(window);


        //for the comment ajax request
        function mobvistaAjax(ajaxParam) {
            var url = ajaxParam.url;


            if (ajaxParam.type == "get" || ajaxParam.type == "GET") {
                url += parseToUrl(ajaxParam.data);
            }

            var xmlHttpRequest = null;
            if (window.ActiveXObject) {
                //wether is IE
                xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            } else if (window.XMLHttpRequest) {
                //not IE
                xmlHttpRequest = new XMLHttpRequest();
            }
            if (null != xmlHttpRequest) {
                //open, ready to send the request
                //param01:the method for the request
                //param02: the request's url
                //param02: whether is sync [true,false]
                xmlHttpRequest.open(ajaxParam.type, url, true);
                //when the state changes, the callback method will call
                xmlHttpRequest.onreadystatechange = ajaxCallback;
                //if use post method,parameter will set as key/value；
                //if use get method, then send the null param, and set the data as "url?name=value"
                if (ajaxParam.type == "get" || ajaxParam.type == "GET") {
                    xmlHttpRequest.send(null);
                } else {
                    xmlHttpRequest.send(ajaxParam.data);
                }
            }

            function ajaxCallback() {
                //when the readyState == 4, it mean the requst is finish.
                if (xmlHttpRequest.readyState == 4) {
                    //console.log(xmlHttpRequest.status); //if the respone has send back succefull，status will be 200；
                    //////////////////////////////////////
                    if (xmlHttpRequest.status == 200) {
                        var responseText = xmlHttpRequest.responseText;
                        //alert(responseText);
                        if (ajaxParam.success) {
                            if (ajaxParam.contentType == 'json' || ajaxParam.contentType == 'JSON') {
                                
                                ajaxParam.success(JSON.parse(responseText));
                                
                            } else {
                                ajaxParam.success(responseText);
                            }

                        }
                    } else {
                        if (ajaxParam.error) {
                            ajaxParam.error(xmlHttpRequest);
                        }
                    }
                }

                if (ajaxParam.complete) {
                    ajaxParam.complete(xmlHttpRequest);
                }
            }
        }

        /* parse the request json data attach on the url string */
        function parseToUrl(data) {
            var result = '';
            for (var key in data) {
                result += key + '=' + data[key] + '&';
            }
            if (result.length > 0) {
                result = result.substring(0, result.length - 1);
            }
            return result;
        }

        /**
         * Exchange Nodes for newNode & oldNode
         * @param {Object} newNode
         * @param {Object} oldNode
         */
        function replaceEach(newNode, oldNode, isExchange) {

            if (oldNode == newNode) {
                return;
            }

            var aParentNode = oldNode.parentNode;
            //if oldNode has parent
            if (aParentNode) {
                var bParentNode = newNode.parentNode;
                //if newNode has parent 
                if (isExchange && bParentNode) {
                    var tempNode = oldNode.cloneNode(true);
                    bParentNode.replaceChild(tempNode, newNode);
                    aParentNode.replaceChild(newNode, oldNode);
                } else {
                    aParentNode.replaceChild(newNode, oldNode);
                }
            }

        }

        /*
            position:[lefttop,topcenter,righttop,rightmiddle,rightbottom,bottomcenter,leftbottom,leftmiddle];
            size:[large,medium,small]
        */
        function initCornerFloat(result, containerConfig, size, position) {
            var campaign_ids = result.data[0].campaignid;//getQueryString(result.data[0].impressionAnalysisUrl,'campaign_ids');
            var containerWidth = currentScreen.width;
            var containerHeight = containerConfig.containerHeight;
            var containerID = containerConfig.containerID;
            var isHorizontal = window.screen.availHeight > window.screen.availWidth;


            var imageUrl = result.data[0].content;
            var actionUrl = result.data[0].clickUrl;
            var timescape = Date.parse(new Date()).toString();
            var contentID = 'idcontent' + timescape + Math.random().toString().split('.')[1];
            var windowWidth = currentScreen.width;
            var windowHeight = currentScreen.height;


            var sizeMap = {
                large: 0.3,
                medium: 0.2,
                small: 0.1
            };

            var contentWidth = 0;
            var contentHeight = 0;
            var cancelWidth = 0;
            if (containerConfig.forceSize) {
                // width should be 8/9 of the screen width
                contentWidth = currentScreen.width*8/9;
                contentHeight = !isHorizontal? (currentScreen.width/20):contentWidth*5/32;
                cancelWidth = contentWidth / 16;

            } else {
                contentWidth = windowWidth * sizeMap[size];
                contentHeight = contentWidth * (2 / 3);
                cancelWidth = contentWidth / 8;
            }

            if(contentWidth>windowWidth){
                contentWidth = windowWidth;
                contentHeight = contentWidth * (5 / 32);
                cancelWidth = contentWidth / 8;
            }


            var containerStyleString = '';
            var bannerBackgroundOpacity = !isHorizontal? '0':'0.5';
            var warperStyleString = 'background-color:rgba(0,0,0,'+bannerBackgroundOpacity+');';
            if (position.indexOf('left') > -1) containerStyleString += 'left:0px;', warperStyleString += 'left:0px;';
            if (position.indexOf('right') > -1) containerStyleString += 'right:0px;', warperStyleString += 'right:0px;';
            if (position.indexOf('top') > -1) containerStyleString += 'top:0px;', warperStyleString += 'top:0px;left:0px;';
            if (position.indexOf('bottom') > -1) containerStyleString += 'bottom:0px;', warperStyleString += 'bottom:0px;left:0px';

            if(!isViewport){
                windowWidth = window.screen.width * window.devicePixelRatio;
                windowHeight = window.screen.height * window.devicePixelRatio;
            }

            var centerLeft = isViewport? (windowWidth - contentWidth) / 2 : '50%;margin-left:-' + (contentWidth/2);
            if (position.indexOf('center') > -1) containerStyleString += 'left:' + centerLeft + 'px;'

            var middleTop = isViewport? (windowHeight - contentHeight) / 2: '50%;margin-top:-' + (contentHeight/2);
            if (position.indexOf('middle') > -1) containerStyleString += 'top:' + middleTop + 'px;',warperStyleString = containerStyleString;

            var warpTagStart = '';
            var warpTagEnd = '';
            var innerDownload = '';

            var warpTagEl;
            var innerDownloadEl;
            var closeButtonEl = document.createElement('div');
            closeButtonEl.innerText="X";
            closeButtonEl.setAttribute('class','close');
            if(containerConfig.forceDownload==true){
                warpTagEl = document.createElement('a');
                warpTagEl.setAttribute('id',contentID);
                warpTagEl.setAttribute('href',actionUrl);
                warpTagEl.setAttribute('style','background-image:url(\'' + imageUrl + '\');width:' + contentWidth + 'px;height:' + contentHeight + 'px;position: fixed;z-index:999999;' + containerStyleString + 'background-size: contain;background-position: center;background-repeat: no-repeat;background-color:rgba(0,0,0,0.5);');
            }else{
                warpTagEl = document.createElement('div');
                warpTagEl.setAttribute('id',contentID);
                warpTagEl.setAttribute('style','width:' + containerWidth + 'px;height:' + contentHeight + 'px;position: fixed;z-index:999999;'+warperStyleString);
                innerDownloadEl = document.createElement('a');
                innerDownloadEl.setAttribute('href',actionUrl);
                innerDownloadEl.setAttribute('style','display:block;background-image:url(\'' + imageUrl + '\');width:' + contentWidth + 'px;height:' + contentHeight + 'px;margin:auto;' + 'background-size: contain;background-position: center;background-repeat: no-repeat;background-color:rgba(0,0,0,0);');
                //innerDownload = '<a href="' + actionUrl + '" style="display:block;background-image:url(\'' + imageUrl + '\');width:' + contentWidth + 'px;height:' + contentHeight + 'px;' left:0px;right:0px;background-color:rgba(0,0,0,0.3);+ + 'background-size: contain;background-position: center;background-repeat: no-repeat;background-color:rgba(0,0,0,0.5);"> </a>';
                warpTagEl.appendChild(innerDownloadEl);
            }
            if(containerConfig.closeAble==true) warpTagEl.appendChild(closeButtonEl);

            var htmlString =
                '<style type="text/css">' + '#' + contentID + ' .close{position: absolute;top:0px;right: 0px;font-size: ' + (cancelWidth * 2 / 3) + 'px;border-radius: 50%;background-color: red;width: ' + cancelWidth + 'px;height: ' + cancelWidth + 'px;text-align: center;line-height: ' + cancelWidth + 'px;color: white;}'
                + '</style>';
            var img = document.createElement('img');
            img.setAttribute("src",imageUrl);
            addListener(img,"load",function(){
                document.getElementById(containerID).innerHTML = htmlString;
                document.getElementById(containerID).appendChild(warpTagEl);
                setImpression(result.data[0].impressionAnalysisUrl);
                triggerEvent(window,'adload',{"adsID":containerID,"adnType":"banner"});
                var fcaLimit = result.data[0]['fca'];
                addCampainToLocalStorage(campaign_ids,{'adnType':'banner','fcaLimit':fcaLimit});
            });

            
        }

        function initInterstitial(result, containerConfig) {
            var fullScreen = containerConfig.isFullScreen;
            var isHorizontal = window.screen.availHeight > window.screen.availWidth;
            var bodyWidth = currentScreen.width;
            var bodyHeight = currentScreen.height;
            var campaign_ids = result.data[0].campaignid;// getQueryString(result.data[0].impressionAnalysisUrl,'campaign_ids');
            //var containerWidth = fullScreen? ():();
            //if(!isViewport) containerWidth = window.screen.width * window.devicePixelRatio * 3/5;
            var containerWidth;
            if(fullScreen){
                containerWidth = isViewport? containerConfig.containerWidth-20 : bodyWidth-20;
            }else{
                containerWidth = isViewport? containerConfig.containerWidth*4/5: (bodyWidth*4/5);
            }

            var containerHeight = fullScreen? (containerWidth*3/2):(Math.floor(containerWidth) / 6) * 5;//containerConfig.containerHeight;
            if(!isHorizontal){
                if(fullScreen){
                    containerHeight = (window.screen.availHeight - 20);
                    containerWidth = containerHeight*2/3;
                }else{
                    containerHeight = window.screen.availHeight>300? 300 : (window.screen.availHeight-20);
                    if(!isViewport) containerWidth = window.screen.width * window.devicePixelRatio * 2/5;
                    containerWidth = containerHeight*6/5;
                }
            } 
            var containerID = containerConfig.containerID;

            var imageUrl = result.data[0].content;
            var actionUrl = result.data[0].clickUrl;
            var timescape = Date.parse(new Date()).toString();
            var contentID = 'idcontent' + timescape + Math.random().toString().split('.')[1];
            var windowWidth ;
            var windowHeight ;
            var left;
            var top;

            if(!isViewport){
                windowWidth = window.screen.width * window.devicePixelRatio;
                windowHeight = window.screen.height * window.devicePixelRatio;
                left = '50%;margin-left:-' + (containerWidth/2);
                top = '50%;margin-top:-' + (containerHeight/2);
            }else{
                windowWidth = bodyWidth;
                windowHeight = bodyHeight;
                left = (windowWidth - containerWidth)/2;
                top = (windowHeight - containerHeight)/2;
            }

            var contentWidth = containerWidth;
            var contentHeight = containerHeight;
            var changeContainerHeight = fullScreen? contentHeight/8 : contentHeight/5;
            var changeArrowWidth = changeContainerHeight*5/12;
            var warpTagStart = '';
            var warpTagEnd = '';
            var innerDownload = '';

            var warpTagEl;
            var innerDownloadEl;
            var closeBtnWidth = 30;
            if(!isViewport){
                closeBtnWidth = contentWidth/12;
            }
            var closeBtnFontSize = closeBtnWidth*2/3;
            var closeButtonEl = document.createElement('div');
            closeButtonEl.innerText="X";
            closeButtonEl.setAttribute('class','close');
            addListener(closeButtonEl,'click',function(){
                if(document.body.getAttribute('popup') == 'true') return;
                document.getElementById(containerID).style.display='none';
            });
            if(containerConfig.forceDownload==true){
                warpTagEl = document.createElement('a');
                warpTagEl.setAttribute('id',contentID);
                warpTagEl.setAttribute('href',actionUrl);
                warpTagEl.setAttribute('style','background-image:url(\'' + imageUrl + '\');width:' + contentWidth + 'px;height:' + contentHeight + 'px;position: fixed;z-index:999999;left:' + left + 'px;top:' + top + 'px;background-size: contain;background-position: center;background-repeat: no-repeat;background-color:rgba(0,0,0,0.5);');
                warpTagEl.appendChild(closeButtonEl);
            }else{
                warpTagEl = document.createElement('div');
                warpTagEl.setAttribute('id',contentID);
                warpTagEl.setAttribute('style','width:' + contentWidth + 'px;height:' + contentHeight + 'px;position: fixed;z-index:999999;left:' + left + 'px;top:' + top + 'px;');
                innerDownloadEl = document.createElement('a');
                innerDownloadEl.setAttribute('href',actionUrl);
                innerDownloadEl.setAttribute('style','display:block;background-image:url(\'' + imageUrl + '\');width:' + contentWidth + 'px;height:' + contentHeight + 'px;background-size: contain;background-position: center;background-repeat: no-repeat;background-color:rgba(0,0,0,0.5);');
                
                warpTagEl.appendChild(innerDownloadEl);                
                warpTagEl.appendChild(closeButtonEl);

                if(result.data.length>1){
                    var innerChangeEl;
                    var innerChangePreContainerEl;
                    var innerChangePreEl;
                    var innerChangeNextContainerEl;
                    var innerChangeNextEl;
                    innerChangeEl = document.createElement('div');
                    innerChangeEl.setAttribute('imgindex',0);
                    innerChangeEl.setAttribute('imglength',result.data.length);
                    innerChangeEl.setAttribute('style','width:100%;height:' + changeContainerHeight + 'px;background-color:rgba(0,0,0,0.5);position:relative;top:-' + changeContainerHeight + 'px;');
                    innerChangePreContainerEl = document.createElement('div');
                    innerChangePreContainerEl.setAttribute('style','width:50%;height:' + changeContainerHeight + 'px;position:absolute;top:0px;left:0px;');
                    innerChangePreContainerEl.setAttribute('class','interstitialSwitchBtnL');
                    innerChangePreEl = document.createElement('div');
                    innerChangePreEl.setAttribute('style','width:0px;height:0px;border:' + changeArrowWidth + 'px solid transparent;border-right:' + changeArrowWidth + 'px solid white;position:absolute;top:' + changeContainerHeight/10 + 'px;left:' + changeContainerHeight/10 + 'px;-webkit-transform:scale(1,0.6);');
                    innerChangeNextContainerEl = document.createElement('div');
                    innerChangeNextContainerEl.setAttribute('style','width:50%;height:' + changeContainerHeight + 'px;position:absolute;top:0px;right:0px;');
                    innerChangeNextContainerEl.setAttribute('class','interstitialSwitchBtnR');
                    innerChangeNextEl = document.createElement('div');
                    innerChangeNextEl.setAttribute('style','width:0px;height:0px;border:' + changeArrowWidth + 'px solid transparent;border-left:' + changeArrowWidth + 'px solid white;position:absolute;top:' + changeContainerHeight/10 + 'px;right:' + changeContainerHeight/10 + 'px;-webkit-transform:scale(1,0.6);');
                    

                    warpTagEl.appendChild(innerChangeEl);
                    innerChangeEl.appendChild(innerChangePreContainerEl);
                    innerChangePreContainerEl.appendChild(innerChangePreEl);
                    innerChangeEl.appendChild(innerChangeNextContainerEl);
                    innerChangeNextContainerEl.appendChild(innerChangeNextEl);

                    addListener(innerChangePreContainerEl,'click',function(){
                        switchImg(-1,this);

                    });
                    addListener(innerChangeNextContainerEl,'click',function(){
                        switchImg(1,this);
                    });
                }
                

                function switchImg(step,me){
                    if(document.body.getAttribute('popup') == 'true') return;
                    var parent = me.parentNode;
                    var imgIndex = parseInt(parent.getAttribute('imgindex'));
                    var imgLength = parseInt(parent.getAttribute('imglength'));
                    imgIndex = step<0?(imgIndex>0?imgIndex:imgLength):imgIndex;
                    var newIndex = step<0?(imgIndex-1)%imgLength:(imgIndex+1)%imgLength;
                    var newImg = document.createElement('img');
                    var newContent = result.data[newIndex]['content'];
                    newImg.setAttribute("src",newContent);
                    innerDownloadEl.style.backgroundImage = 'url('+ newContent +')';
                    addListener(newImg,'load',function(){
                        parent.setAttribute('imgindex',newIndex);
                        if(result.data[newIndex]['impressionAnalysisUrl']){
                            setImpression(result.data[newIndex]['impressionAnalysisUrl']);
                            result.data[newIndex]['impressionAnalysisUrl'] = null;
                            var campaign_ids = result.data[newIndex]['campaignid'];
                            var fcaLimit = result.data[newIndex]['fca'];
                            addCampainToLocalStorage(campaign_ids,{'adnType':'interstitial','fcaLimit':fcaLimit});
                        };
                    });
                }

            }

            var htmlString = 
                '<style type="text/css">' + '#' + contentID + ' .close{position: absolute;top:0px;right: 0px;font-size: '+closeBtnFontSize+'px;border-radius: 50%;background-color: red;width: '+closeBtnWidth+'px;height: '+closeBtnWidth+'px;text-align: center;line-height: '+closeBtnWidth+'px;color: rgba(0,0,0,0);}'
                + '#' + contentID + ' .close:before{content:" ";display:block;position:absolute;width: '+(closeBtnWidth*0.6)+'px;height:2px;background-color:rgb(255,255,255);left:0px;top:'+(closeBtnWidth/2)+'px;left:'+(closeBtnWidth*0.2)+'px;-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-ms-transform: rotate(45deg);-o-transform: rotate(45deg);transform: rotate(45deg);}'
                + '#' + contentID + ' .close:after{content:" ";display:block;position:absolute;width: '+(closeBtnWidth*0.6)+'px;height:2px;background-color:rgb(255,255,255);left:0px;top:'+(closeBtnWidth/2)+'px;left:'+(closeBtnWidth*0.2)+'px;-webkit-transform: rotate(-45deg);-moz-transform: rotate(-45deg);-ms-transform: rotate(-45deg);-o-transform: rotate(-45deg);transform: rotate(-45deg);}'
                +' .interstitialSwitchBtnL:active,.interstitialSwitchBtnR:active{ background-color:rgba(20, 20, 20, 0.7); }'
                + '</style>';
            var img = document.createElement('img');
            img.setAttribute("src",imageUrl);
            addListener(img,"load",function(){
                document.getElementById(containerID).innerHTML = htmlString;
                document.getElementById(containerID).appendChild(warpTagEl);
                setImpression(result.data[0].impressionAnalysisUrl);
                result.data[0].impressionAnalysisUrl = null;
                triggerEvent(window,'adload',{"adsID":containerID,"adnType":"overlay"});
                var fcaLimit = result.data[0]['fca'];
                addCampainToLocalStorage(campaign_ids,{'adnType':'interstitial','fcaLimit':fcaLimit});
            });

            
        }


        function initOverlay(result, containerConfig) {
            var fullScreen = containerConfig.isFullScreen;
            var isHorizontal = window.screen.availHeight > window.screen.availWidth;
            var bodyWidth = currentScreen.width;
            var bodyHeight = currentScreen.height;
            var campaign_ids = result.data[0].campaignid;// getQueryString(result.data[0].impressionAnalysisUrl,'campaign_ids');
            
            var containerWidth;
            if(fullScreen){
                containerWidth = isViewport? containerConfig.containerWidth-20 : bodyWidth-20;
            }else{
                containerWidth = isViewport? containerConfig.containerWidth*4/5: (bodyWidth*4/5);
            }

            var containerHeight = fullScreen? (containerWidth*3/2):(Math.floor(containerWidth) / 6) * 5;//containerConfig.containerHeight;
            
            if(!isHorizontal){
                if(fullScreen){
                    containerHeight = (window.screen.availHeight - 20);
                    containerWidth = containerHeight*2/3;
                }else{
                    containerHeight = window.screen.availHeight>300? 300 : (window.screen.availHeight-20);
                    if(!isViewport) containerWidth = window.screen.width * window.devicePixelRatio * 2/5;
                    containerWidth = containerHeight*6/5;
                }
            } 
            var containerID = containerConfig.containerID;

            var imageUrl = result.data[0].content;
            var actionUrl = result.data[0].clickUrl;
            var timescape = Date.parse(new Date()).toString();
            var contentID = 'idcontent' + timescape + Math.random().toString().split('.')[1];
            var windowWidth ;
            var windowHeight ;
            var left;
            var top;

            

            var contentWidth = containerWidth;
            var contentHeight = containerHeight;
            var changeContainerHeight = fullScreen? contentHeight/8 : contentHeight/5;
            var changeArrowWidth = changeContainerHeight*5/12;
            var warpTagStart = '';
            var warpTagEnd = '';
            var innerDownload = '';

            var warpTagEl;
            var innerDownloadEl;
            var closeBtnWidth = 30;
            if(!isViewport){
                closeBtnWidth = contentWidth/12;
            }
            var closeBtnFontSize = closeBtnWidth*2/3;


            var tipTextHeight = contentWidth/8;
            var tipTextSize = tipTextHeight*3/5;

            left = '50%;margin-left:-' + (containerWidth/2);
            top = '50%;margin-top:-' + ((containerHeight+changeContainerHeight+changeContainerHeight)/2);
            



            var tiptext= document.createElement('div');
            tiptext.setAttribute('style','height:'+tipTextHeight+'px;line-height:'+tipTextHeight+'px;text-align:left;font-size:'+tipTextSize+'px;padding:0 10px;background:#FFFFFF;border-radius:5px 5px 0 0');
            var textNode = document.createTextNode('People nearby are using');
            tiptext.appendChild(textNode);
            if(containerConfig.forceDownload==true){
                warpTagEl = document.createElement('a');
                warpTagEl.setAttribute('id',contentID);
                warpTagEl.setAttribute('href',actionUrl);
                warpTagEl.setAttribute('style','background-image:url(\'' + imageUrl + '\');width:' + contentWidth + 'px;height:' + contentHeight + 'px;position: fixed;z-index:999999;left:' + left + 'px;top:' + top + 'px;background-size: contain;background-position: center;background-repeat: no-repeat;background-color:rgba(0,0,0,0.5);');
                //warpTagEl.appendChild(closeButtonEl);
            }else{
                warpTagEl = document.createElement('div');
                warpTagEl.setAttribute('id',contentID);
                warpTagEl.setAttribute('style','width:' + contentWidth + 'px;position: fixed;z-index:999999;left:' + left + 'px;top:' + top + 'px;top:50%;box-shadow:0 0 10px rgba(0,0,0,.3)');
//                var h = fnCollection.getStyle(warpTagEl,"height");
//                alert(h);
                innerDownloadEl = document.createElement('a');
                innerDownloadEl.setAttribute('href',actionUrl);
                innerDownloadEl.setAttribute('style','display:block;background-image:url(\'' + imageUrl + '\');width:' + contentWidth + 'px;height:' + contentHeight + 'px;background-size: contain;background-position: center;background-repeat: no-repeat;background-color:rgba(0,0,0,0.5);');
                
                warpTagEl.appendChild(innerDownloadEl);                
                //warpTagEl.appendChild(closeButtonEl);

                if(result.data.length>1){
                    var innerChangeEl;
                    var innerChangePreContainerEl;
                    var innerChangePreEl;
                    var innerChangeNextContainerEl;
                    var innerChangeNextEl;
                    var newHeight = changeContainerHeight - 10;
                    innerChangeEl = document.createElement('div');
                    innerChangeEl.setAttribute('imgindex',0);
                    innerChangeEl.setAttribute('imglength',result.data.length);
                    innerChangeEl.setAttribute('style','width:100%;height:' + (changeContainerHeight+10) + 'px;padding:10px;background-color:#FFFFFF;position:relative;border-radius:0 0 5px 5px;display:-webkit-box;box-sizing:border-box;-webkit-box-sizing:border-box;');
                    innerChangePreContainerEl = document.createElement('div');
                    innerChangePreContainerEl.setAttribute('style','width:50%;height:' + newHeight + 'px;-webkit-box-flex:1');
                    innerChangePreContainerEl.setAttribute('class','interstitialSwitchBtnL');
                    innerChangePreEl = document.createElement('a');
                    // innerChangePreEl.setAttribute('href',actionUrl);  //active this will force download
                    innerChangePreEl.setAttribute('target','_blank');
                    innerChangePreEl.setAttribute('style','background:#b4b6b7;color:#FFFFFF;height:100%;width:100%;display:block;font-size:'+tipTextSize+'px;text-align:center;text-decoration:none;border-radius:3px;margin-right:5px;line-height:'+ newHeight +'px');
                    var textNode = document.createTextNode('No thanks');
                    innerChangePreEl.appendChild(textNode);
                    
                    
                    //innerChangePreEl.setAttribute('style','width:0px;height:0px;border:' + changeArrowWidth + 'px solid transparent;border-right:' + changeArrowWidth + 'px solid white;position:absolute;top:' + changeContainerHeight/10 + 'px;left:' + changeContainerHeight/10 + 'px;-webkit-transform:scale(1,0.6);');
                    innerChangeNextContainerEl = document.createElement('div');
                   
                    innerChangeNextContainerEl.setAttribute('style','width:50%;height:' + newHeight + 'px;-webkit-box-flex:1');
                    innerChangeNextContainerEl.setAttribute('class','interstitialSwitchBtnR');
                    innerChangeNextEl = document.createElement('a');
                    innerChangeNextEl.setAttribute('href',actionUrl);
                    innerChangeNextEl.setAttribute('target','_blank');
                    innerChangeNextEl.setAttribute('style','background:#41bfee;color:#FFFFFF;height:100%;width:100%;display:block;font-size:'+tipTextSize+'px;text-align:center;text-decoration:none;border-radius:3px;margin-left:5px;line-height:'+ newHeight +'px');
                     var textNode = document.createTextNode('Try it now');
                    innerChangeNextEl.appendChild(textNode);
                    
                    warpTagEl.appendChild(innerChangeEl);
                    warpTagEl.insertBefore(tiptext,warpTagEl.childNodes[0]);
                    
                    innerChangeEl.appendChild(innerChangePreContainerEl);
                    innerChangePreContainerEl.appendChild(innerChangePreEl);
                    innerChangeEl.appendChild(innerChangeNextContainerEl);
                    innerChangeNextContainerEl.appendChild(innerChangeNextEl);
                    
                    addListener(warpTagEl,"click",function(e){
                        var event = e || window.event;
                        var node = event.target.tagName || event.srcElement.tagName;
                        if(node.toLowerCase() ==="a"){
                            this.style.display ="none";
                        }
                    });
                }
                

                function switchImg(step,me){
                    if(document.body.getAttribute('popup') == 'true') return;
                    var parent = me.parentNode;
                    var imgIndex = parseInt(parent.getAttribute('imgindefx'));
                    var imgLength = parseInt(parent.getAttribute('imglength'));
                    imgIndex = step<0?(imgIndex>0?imgIndex:imgLength):imgIndex;
                    var newIndex = step<0?(imgIndex-1)%imgLength:(imgIndex+1)%imgLength;
                    var newImg = document.createElement('img');
                    var newContent = result.data[newIndex]['content'];
                    newImg.setAttribute("src",newContent);
                    innerDownloadEl.style.backgroundImage = 'url('+ newContent +')';
                    addListener(newImg,'load',function(){
                        parent.setAttribute('imgindex',newIndex);
                        if(result.data[newIndex]['impressionAnalysisUrl']){
                            setImpression(result.data[newIndex]['impressionAnalysisUrl']);
                            result.data[newIndex]['impressionAnalysisUrl'] = null;
                            var campaign_ids = result.data[newIndex]['campaignid'];
                            var fcaLimit = result.data[newIndex]['fca'];
                            addCampainToLocalStorage(campaign_ids,{'adnType':'interstitial','fcaLimit':fcaLimit});
                        };
                    });
                }

            }

            var htmlString = 
                '<style type="text/css">' + '#' + contentID + ' .close{position: absolute;top:40px;right: 0px;font-size: '+closeBtnFontSize+'px;border-radius: 50%;background-color: red;width: '+closeBtnWidth+'px;height: '+closeBtnWidth+'px;text-align: center;line-height: '+closeBtnWidth+'px;color: rgba(0,0,0,0);}'
                + '#' + contentID + ' .close:before{content:" ";display:block;position:absolute;width: '+(closeBtnWidth*0.6)+'px;height:2px;background-color:rgb(255,255,255);left:0px;top:'+(closeBtnWidth/2)+'px;left:'+(closeBtnWidth*0.2)+'px;-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-ms-transform: rotate(45deg);-o-transform: rotate(45deg);transform: rotate(45deg);}'
                + '#' + contentID + ' .close:after{content:" ";display:block;position:absolute;width: '+(closeBtnWidth*0.6)+'px;height:2px;background-color:rgb(255,255,255);left:0px;top:'+(closeBtnWidth/2)+'px;left:'+(closeBtnWidth*0.2)+'px;-webkit-transform: rotate(-45deg);-moz-transform: rotate(-45deg);-ms-transform: rotate(-45deg);-o-transform: rotate(-45deg);transform: rotate(-45deg);}'
                +' .interstitialSwitchBtnL:active,.interstitialSwitchBtnR:active{ background-color:rgba(20, 20, 20, 0.7); }'
                + '</style>';
            var img = document.createElement('img');
            img.setAttribute("src",imageUrl);
            addListener(img,"load",function(){
                document.getElementById(containerID).innerHTML = htmlString;
                document.getElementById(containerID).appendChild(warpTagEl);
                //is overlay
                // if(!fullScreen){
                //     var h = parseInt(fnCollection.getStyle(warpTagEl,"height"));
                //     warpTagEl.style.marginTop = - h/2 +"px";
                // }
                setImpression(result.data[0].impressionAnalysisUrl);
                result.data[0].impressionAnalysisUrl = null;
                triggerEvent(window,'adload',{"adsID":containerID,"adnType":"overlay"});
                var fcaLimit = result.data[0]['fca'];
                addCampainToLocalStorage(campaign_ids,{'adnType':'interstitial','fcaLimit':fcaLimit});
            });

            
        }

        function initText(result, containerConfig) {
            var campaign_ids = result.data[0].campaignid;
            var containerWidth = containerConfig.containerWidth;
            var containerHeight = containerConfig.containerHeight;
            var containerID = containerConfig.containerID;

            var timescape = Date.parse(new Date()).toString();
            var contentID = 'idcontent' + timescape + Math.random().toString().split('.')[1];
            // console.log("timescape="+contentID);
            var htmlString = '<a id="' + contentID + '" href="' + result.data[0].clickUrl + '" style="display:block;width:100%;height:100%;">';
            htmlString += '<span>' + result.data[0].content + '</span>';
            htmlString += '</a>';
            htmlString +=
                '<style type="text/css">' + '#' + containerID + '{overflow:hidden;}' + '#' + containerID + ' span{padding:0px;margin:0px;font-size:' + containerHeight + 'px;height:' + containerHeight + 'px;line-height:' + containerHeight + 'px;}'


            + '</style>';

            document.getElementById(containerID).innerHTML = htmlString;
            setImpression(result.data[0].impressionAnalysisUrl);
            triggerEvent(window,'adload',{"adsID":containerID,"adnType":"text"});
            var fcaLimit = result.data[0]['fca'];
            addCampainToLocalStorage(campaign_ids,{'adnType':'text','fcaLimit':fcaLimit});

        }

        function initInnerFrame(result, containerConfig) {
            var campaign_ids = result.data[0].campaignid;
            var containerWidth = containerConfig.containerWidth;
            var containerHeight = containerConfig.containerHeight;
            var containerID = containerConfig.containerID;

            var timescape = Date.parse(new Date()).toString();
            var contentID = 'idcontent' + timescape + Math.random().toString().split('.')[1];
            var htmlString = '<a id="' + contentID + '" href="' + result.data[0].clickUrl + '" style="display:block;background-image:url(\'' + result.data[0].content + '\');width:100%;height:100%;background-size: contain;background-position: center;background-repeat: no-repeat;background-color:rgba(0,0,0,0.5);">';
            // htmlString += '<span>' + result.data[0].content + '</span>';
            htmlString += '</a>';
            htmlString +=
                '<style type="text/css">' + '#' + containerID + '{overflow:hidden;}' + '#' + containerID + ' span{padding:0px;margin:0px;font-size:' + containerHeight + 'px;height:' + containerHeight + 'px;line-height:' + containerHeight + 'px;}'
                + '</style>';


            document.getElementById(containerID).innerHTML = htmlString;
            setImpression(result.data[0].impressionAnalysisUrl);
            triggerEvent(window,'adload',{"adsID":containerID,"adnType":"innerFrame"});
            var fcaLimit = result.data[0]['fca'];
            addCampainToLocalStorage(campaign_ids,{'adnType':'innerframe','fcaLimit':fcaLimit});
        }



        function initMarquee(textArray, containerConfig) {
            var campaign_ids = result.data[0].campaignid;
            var containerWidth = containerConfig.containerWidth;
            var containerHeight = containerConfig.containerHeight;
            var containerID = containerConfig.containerID;

            var timescape = Date.parse(new Date()).toString();
            var contentID = 'idcontent' + timescape + Math.random().toString().split('.')[1];
            // console.log("timescape="+contentID);
            var htmlString = '<ul id="' + contentID + '">';
            for (var i = 0; i < textArray.length; i++) {
                htmlString += '<li>' + textArray[i] + '</li>';
            }
            htmlString += '</ul>';
            htmlString +=
                '<style type="text/css">' + '#' + containerID + '{overflow:hidden;}' + '#' + containerID + ' li{padding:0px;margin:0px;font-size:' + containerHeight + 'px;height:' + containerHeight + 'px;line-height:' + containerHeight + 'px;}' + '.' + contentID + '_chang{-webkit-animation:' + contentID + '_height .7s linear,' + contentID + '_opacity .5s linear .7s;} ' + '@-webkit-keyframes ' + contentID + '_height{' + '0%{height:0px;opacity:0;}' + '100%{height:' + containerHeight + 'px;opacity:0;}' + '} ' + '@-webkit-keyframes ' + contentID + '_opacity{' + '0%{opacity:0;}' + '100%{opacity:1;' + '}' + '}'

            + '</style>';

            document.getElementById(containerID).innerHTML = htmlString;
            setImpression(textArray.data[0].impressionAnalysisUrl);
            function $_id(id) {
                return typeof id === "string" ? document.getElementById(id) : id;
            }


            var aLi = $_id(contentID).getElementsByTagName('li');

            triggerEvent(window,'adload',{"adsID":containerID,"adnType":"marquee"});
            var fcaLimit = result.data[0]['fca'];
            addCampainToLocalStorage(campaign_ids,{'adnType':'marquee','fcaLimit':fcaLimit});
            setInterval(function() {
                var firstLi = aLi[aLi.length - 1];
                $_id(contentID).insertBefore(firstLi, aLi[0]);
                firstLi.className = contentID + '_chang';
            }, 2000);

        }

        function setImpression(url){
            var imp = document.createElement('iframe');
            imp.setAttribute('style','position:absolute;left:-1;top:-1;width:1px;height:1px;');
            imp.setAttribute('src',url);
            document.body.appendChild(imp);

        }

        function getQueryString(url,name){
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = url.split('?')[1].match(reg);
            if (r!=null) return unescape(r[2]); return null;
        }

        var campaignArray  = {
            arrayId:[],
            arrayObj:[],
            toIdString:function(){
                var idString = '';
                for(var index in this.arrayId){
                    idString+=(this.arrayId[index]+',');
                }
                idString = this.arrayId.length>0? idString.substr(0,idString.length-1):'';
                
                return idString;
            },
            getData:function(){
                this.arrayId=[];
                this.arrayObj=[];
                var campaignObj = getLocalStorage('campaign_ids');
                for(var index in campaignObj){
                    if(!campaignObj[index]['campaign_ids']) continue;
                    this.arrayId.push(campaignObj[index]['campaign_ids']);
                    this.arrayObj.push(campaignObj[index]);
                }
                return this;
            },
            filterByFCA:function(){
                var newArrayId = [];
                var newArrayObj = [];
                for(var i in this.arrayObj){
                    var campaignObj = this.arrayObj[i];

                    if(campaignObj['fca'] && (campaignObj['fca']['count']>campaignObj['fca']['limit'])){
                        newArrayId.push(this.arrayId[i]);
                        newArrayObj.push(this.arrayObj[i]);
                    }
                    console.log('id = '+campaignObj['campaign_ids']+', count = '+campaignObj['fca']['count']);
                }
                this.arrayId = newArrayId;
                this.arrayObj = newArrayObj;
                return this;
            },
            filterByTime:function(dayCount,diffType){
                
                var newArrayId = [];
                var newArrayObj = [];
                for(var i in this.arrayObj){
                    var campaignObj = this.arrayObj[i];
                    
                    if(dateDiff(new Date(),new Date(campaignObj['impressionLastData']),diffType)<=dayCount){
                        newArrayId.push(this.arrayId[i]);
                        newArrayObj.push(this.arrayObj[i]);
                    }
                }
                this.arrayId = newArrayId;
                this.arrayObj = newArrayObj;
                return this;
            },
            filterByCount:function(impressionCount){
                var newArrayId = [];
                var newArrayObj = [];
                for(var i in this.arrayObj){
                    var campaignObj = this.arrayObj[i];
                    if(campaignObj['impressionCount']<=impressionCount){
                        newArrayId.push(this.arrayId[i]);
                        newArrayObj.push(this.arrayObj[i]);
                    }
                }
                this.arrayId = newArrayId;
                this.arrayObj = newArrayObj;
                return this;
            },
            filterByAdnType:function(adnType){
                var newArrayId = [];
                var newArrayObj = [];
                for(var i in this.arrayObj){
                    var campaignObj = this.arrayObj[i];
                    if(campaignObj['adnType']==adnType){
                        newArrayId.push(this.arrayId[i]);
                        newArrayObj.push(this.arrayObj[i]);
                    }
                }
                this.arrayId = newArrayId;
                this.arrayObj = newArrayObj;
                return this;
            }
        };


        var onAdding = false;
        var objectActionArray = [];
        function addCampainToLocalStorage(campaign_ids,value){
            var key = 'campaign_ids';
            var date = new Date();
            value['campaign_ids'] = campaign_ids;
            value['impressionCount'] = 1;
            value['impressionLastData'] = date.toString();
            var fcaLimit = value['fcaLimit']?value['fcaLimit']:-1;
            delete value['fcaLimit'];
            value['fca'] = {
                "limit":fcaLimit,
                "firstTime":date.toString(),
                "count":1
            }
            objectActionArray.push({
                'key':key,
                'index':campaign_ids+value.adnType,
                'value':value
            });
            if(onAdding==false){
                doObjectAction();
            }
        }

        function addToLocalStorage(key,value){
            objectActionArray.push({
                'key':key,
                'index':index,
                'value':value
            });
            if(onAdding==false){
                doObjectAction();
            }
        }

        function doObjectAction(){
            onAdding = true;
            var action = objectActionArray.pop();
            if(action){
                var tempObj = getLocalStorage(action.key);
                if(!tempObj) tempObj = {};
                if(tempObj[action.index]) {
                    action['value']['impressionCount'] = tempObj[action.index]['impressionCount'] +1 ;
                    if(tempObj[action.index]['fca']){
                        var currentDate = new Date(action['value']['fca']['firstTime']);
                        var firstDate = new Date(tempObj[action.index]['fca']['firstTime']);
                        if(dateDiff(currentDate,firstDate,'day')<1){
                            action['value']['fca']['count'] += tempObj[action.index]['fca']['count'];
                            action['value']['fca']['firstTime'] = tempObj[action.index]['fca']['firstTime'];
                        }
                    }

                }
                    tempObj[action.index] = action.value;
                   setLocalStorage(action.key,tempObj);
                   setTimeout(function(){
                        doObjectAction();
                   },100); 
            }else{
               onAdding = false; 
            }

        }

        

        function dateDiff(dateOne,dateTwo,diffType){
            var diff = 0;
            switch (diffType){
                case 'second': diff = parseInt((dateOne - dateTwo) / 1000); break;
                case 'minute': diff = parseInt((dateOne - dateTwo) / 60000); break;
                case 'hour': diff = parseInt((dateOne - dateTwo) / 3600000); break;
                case 'day': diff = parseInt((dateOne - dateTwo) / 86400000); break;
                case 'week': diff = parseInt((dateOne - dateTwo) / 86400000*7); break;
                case 'month': diff = (dateOne.getMonth()+1)+((dateOne.getFullYear()-dateTwo.getFullYear())*12) - (dateTwo.getMonth()+1); break;
                case 'year': diff = dateOne.getFullYear() - dateTwo.getFullYear(); break;
            }
            return Math.abs(diff);  
        }

        function getLocalStorage(key){
            var obj = localStorage[key];
            if(obj!=null){
                return JSON.parse(obj);
            }else{
                return null;
            }
        }

        function setLocalStorage(key,value){
            var objString = JSON.stringify(value);
            localStorage[key] = objString;
        }

        mobvistaADN.initAll();
    });

    function initCookie(){
        var iframe = document.createElement('iframe');
        iframe.src = cookieHost;
        iframe.setAttribute('style','width:1px;height:1px;position:absolute;left:0px;top:0px;border:none;visibility: hidden;')
        iframe.setAttribute('id','mobvistaADNCookie');
        document.body.appendChild(iframe);

        addListener(iframe,'load',function(){
            var user = iframe.contentWindow.MobvistaCookie.getCookie('mobvistaUUID');
            console.log('user is '+user);
        });
    }

    function hasViewport(){
        var viewports = document.getElementsByName('viewport');
        for(var i = 0,iMax=viewports.length;i<iMax;i++){
            console.log(i);
            console.log(viewports[i]);
            if(viewports[i].tagName.toUpperCase()=='META'){
                return true;
            }
        }
        return false;
    }

    function getScreenSize(){
        var testWidthEl = document.createElement('div');
        testWidthEl.setAttribute('style','display:block;position:fixed;left:0px;right:0px;top:0px;bottom:0px;visibility:hidden;z-index:99999;');
        window.document.body.appendChild(testWidthEl);
        var screenWidth = testWidthEl.clientWidth;
        var screenHeight = testWidthEl.clientHeight;
        window.document.body.removeChild(testWidthEl);
        return {
            width : screenWidth,
            height: screenHeight
        };
    }

    function domHelper(domPath){
        var innerCss = cssHelper();
        var dom = document.createElement(domPath);
        var domObj = {
            el:dom,
            innerCss:innerCss,
            attr:function(attrsOrKey,value){
                if(arguments.length==1&&(typeof attrsOrKey === 'object')){
                    for(var key in attrsOrKey){
                        this.el.setAttribute(key,attrsOrKey[key]);
                    }
                    return this;
                }else if(arguments.length==1){
                    return this.el.getAttribute(attrsOrKey);
                }else{
                    this.el.setAttribute(attrsOrKey,value);
                    return this;
                }
            },
            css:function(){
                this.innerCss.css.apply(this.innerCss,arguments);
                this.innerCss.addStyleToDom(this.el);
                return this;
            },
            startAnimate:function(isAll){
                this.innerCss.addStyleToDom(this.el,!isAll);
                return this;
            },
            insertTo:function(container){
                var warpEl = (container.el&&container.el.appendChild)? container.el:container;
                warpEl.appendChild(this.el);
                return this;
            },
            insertEl:function(innerDom){
                var innerEl = (innerDom.el)?innerDom.el:innerDom;
                this.el.appendChild(innerEl);
                return this;
            },
            size:function(){
                var width = this.el.clientWidth;
                var height = this.el.clientHeight;
                return {
                    width:width,
                    height:height
                };
            },
            html:function(insertHTML){
                if(insertHTML){
                    this.el.innerHTML = insertHTML;
                    return this;
                }else{
                    return this.el.innerHTML;
                }
            },
            text:function(insertText){
                if(insertText){
                    this.el.innerText = insertText;
                    return this;
                }else{
                    return this.el.innerText;
                }
            },
            appendText:function(text){
                var warp = document.createElement('span');
                warp.innerText = text;
                this.el.appendChild(warp);
                return this;
            }
        };
        return domObj;
    }

    function cssHelper(cssPath){
        var animateKey = 'animate'+new Date().getTime();
        var cssObj = {
            path:cssPath,
            animateName:animateKey,
            mode:{
                'animation-duration':'1s',
                'animation-timing-function':'ease',
                'animation-delay':'0s',
                'animation-iteration-count':'1',
                'animation-direction':'normal',
                'animation-play-state':'running',
                'animation-fill-mode':'forwards'
            },
            css3Warper:['-webkit-','-moz-','-ms-','-o-',''],
            styleMap:{},
            animateMap:{},
            animateMode:function(modeConfig){
                if(!modeConfig) return this.mode;
                this.mode = modeConfig;
                return this;
            },
            css:function(actionsOrKey,value){
                if(arguments.length==1&&(typeof actionsOrKey === 'object')){
                    for(var key in actionsOrKey){
                        this.styleMap[key] = actionsOrKey[key];
                    }
                    return this;
                }else if(arguments.length==1){
                    return this.styleMap[actionsOrKey];
                }else{
                    this.styleMap[actionsOrKey]=value;
                    return this;
                }
            },
            animate:function(step,actionsOrKey,value){
                if(arguments.length==2&& (typeof actionsOrKey === 'string')){//get value
                    if(this.animateMap[step]) return this.animateMap[step][actionsOrKey];
                    return null;
                }else if(arguments.length==2&&(typeof actionsOrKey === 'object')){
                    if(!this.animateMap[step]) this.animateMap[step] = {};
                    for(var key in actionsOrKey){
                        this.animateMap[step][key] = actionsOrKey[key];
                    }
                    return this;
                }else if(arguments.length>2){
                    if(!this.animateMap[step]) this.animateMap[step] = {};
                    this.animateMap[step][actionsOrKey] = value;
                    return this;
                }else if(arguments.length==1){
                    return this.animateMap[step];
                }else{
                    return null;
                }
            },
            getCssString:function(config){
                var stringHeader = '<style type="text/css">';
                var stringFooter = '</style>';
                var hasStyle = false;
                var hasAnimate = false;

                var styleString = this.path+'{';
                for(var key in this.styleMap){
                    hasStyle = true;
                    styleString+=(key+':'+this.styleMap[key]+';');
                }

                var animateString = this.animateName+'{';
                for(var step in this.animateMap){
                    hasAnimate = true;
                    animateString += (step+' {');
                    var action = this.animateMap[step];
                    for(var aniKey in action){
                        animateString += aniKey+':'+action[aniKey]+';'
                    }
                    animateString+='} ';
                }
                animateString+='} ';
                var animateFinalString = '';
                for(var i=0;i<this.css3Warper.length;i++){
                    animateFinalString+=' @'+this.css3Warper[i]+'keyframes '+ animateString;
                }

                
                var finalStyleString = '';
                if(hasStyle==true) finalStyleString+=styleString;
                if(hasAnimate==true) {
                    var modeString = '';
                    if(typeof this.mode=='string'){
                        modeString = this.mode;
                    }else{
                        for(var mi in this.mode){
                           modeString += (' '+ this.mode[mi]);
                        }
                    }
                    for(var is=0;is<this.css3Warper.length;is++){
                        finalStyleString+= (this.css3Warper[is]+'animation:'+this.animateName+' '+modeString+';');
                    }
                    finalStyleString+='} ';
                    finalStyleString+=animateFinalString;
                }else{
                    finalStyleString+='} ';
                }

                if(config && (config['withStyleTag']==true)) return stringHeader+finalStyleString+stringFooter;
                return finalStyleString;
            },
            addStyleToDom:function(dom,isOnlyAnimate){
                var stringHeader = '<style type="text/css">';
                var stringFooter = '</style>';
                var styleString = '';
                var hasStyle = false;
                var hasAnimate = false;
                for(var key in this.styleMap){
                    hasStyle = true;
                    // styleString+=(key+':'+this.styleMap[key]+';');
                    if(!isOnlyAnimate) dom.style[key] = this.styleMap[key];
                }

                var animateString = '';
                for(var i=0;i<this.css3Warper.length;i++){
                    animateString += ' @'+this.css3Warper[i]+'keyframes '+ this.animateName+'{';
                    for(var step in this.animateMap){
                        hasAnimate = true;
                        animateString += (step+' {');
                        var action = this.animateMap[step];
                        for(var aniKey in action){
                            animateString += this.css3Warper[i]+aniKey+':'+action[aniKey]+';';
                        }
                        animateString+='} ';
                    }
                    animateString+='} ';
                }

                var animateFinalString = animateString;

                var finalStyleString = '';


                if(hasAnimate==true) {
                    var modeString = '';
                    if(typeof this.mode=='string'){
                        modeString = this.mode;
                        for(var is=0;is<this.css3Warper.length;is++){
                            dom.style[this.css3Warper[is]+'animation'] = this.animateName+' '+modeString;
                        }
                    }else{

                        for(var is=0;is<this.css3Warper.length;is++){
                            for(var mi in this.mode){
                                dom.style[this.css3Warper[is]+mi] = this.mode[mi];
                            }  
                            dom.style[this.css3Warper[is]+'animation-name'] = this.animateName;
                        }
                    }
                    finalStyleString =  stringHeader+animateFinalString+stringFooter;
                    var cssDom = document.createElement('div');
                    cssDom.className = 'cssContainer';
                    cssDom.style.display='none';
                    cssDom.innerHTML = finalStyleString;
                    document.head.appendChild(cssDom);
                }

            }
        }
        return cssObj;
    }

    function addListener(element,e,fn){  
      if(element.addEventListener){  
           element.addEventListener(e,fn,false);  
      } else {  
           element.attachEvent("on" + e,fn);  
      }  
    };

    function removeListener(element,e,fn){  
      if(element.removeEventListener){  
           element.removeEventListener(e,fn,false);  
      } else {  
           element.detachEvent("on" + e,fn);  
      }  
    }

    function triggerEvent(element,e,data){
        if(document.fireEvent){
            var event = document.createEventObject();  
            event.eventType = 'message'; 
            event.data = data; 
            //触发document上绑定的自定义事件ondataavailable  
            document.fireEvent('on'+e, event);
        }else if (document.createEvent) { 
            //调用document对象的 createEvent 方法得到一个event的对象实例。
            var event = document.createEvent('HTMLEvents'); 
            // initEvent接受3个参数：  
            // 事件类型，是否冒泡，是否阻止浏览器的默认行为  
            event.initEvent(e, false, true); 
            event.eventType = 'message';  
            event.data = data;
            element.dispatchEvent(event); 
        } 

    };
})();

/*     ------------     function for Mobvista ADN (initial from mobvista tag) end      ---------     */