/*     ------------     function for Mobvista ADN (initial from mobvista tag) start      ---------     */
 
(function() {
    var host = "http://net.rayjump.com/site_request.php?";
    function addListener(element,e,fn){  
      if(element.addEventListener){  
           element.addEventListener(e,fn,false);  
      } else {  
           element.attachEvent("on" + e,fn);  
      }  
    };

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
    addListener(window,"load",function(){
        if ((!document.getElementById("mobvistaadnsdk").attributes.s) || (!document.getElementById("mobvistaadnsdk").attributes.site_id)) {
            console.error('you have fill the s and the site_id on the mobvistaadnsdk scrpit tag! \nExample: <script id="mobvistaadnsdk" s="123456789" site_id="0"  type="text/javascript" src="mobvistaADN2.js"></script>');
            return;
        }
        var sign = document.getElementById("mobvistaadnsdk").attributes.s.value;
        var site_id = document.getElementById("mobvistaadnsdk").attributes.site_id.value;

        window.mobvistaADN = {
            ads: {},
            getAds: function(id) {
                console.log(this.ads[id]);
                return this.ads[id];
            },
            initAll: function(adnObj) {
                var adnArray = document.getElementsByTagName("mobvistaADN");
                for (var i = 0, iLang = adnArray.length; i < iLang; i++) {
                    mobvistaADNTag(adnArray[i]);
                }
            },
            initById: function(id) {
                var adnObject = document.getElementById(id);
                mobvistaADNTag(adnObj);
            },
            callback: []
        };


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
                    adtype: adn.adnType.value,
                    /*ADN Type: overlay, text, banner*/
                    jsonp: "jsonp" + callbackKey,
                    s: sign,
                    version: '2.0'
                },
                dataType: 'jsonp',
                success: function(data) {
                    /* for replacing the mobvista tag with new adn container */
                    replaceEach(mobvistaADNContainer, adnObj)

                    var containerConfig = {
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
                        case 'overlay':
                            initOverlay(data, containerConfig);
                            break;
                        case 'innerFrame':
                            initInnerFrame(data, containerConfig);
                            break;
                        case 'banner':
                            mobvistaADNContainer.setAttribute("style","");
                            var size = adn.size ? adn.size.value : 'medium';
                            var position = adn.position ? adn.position.value : 'centertop';
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
                    }

                    addTomobvistaADN(mobvistaADNContainer,adnType);
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

                var url = param.url + parseToUrl(param.data);
                var success = param.success;
                var timestamp = param.timestamp;
                var script = doc.createElement('script');

                function callback() {
                    eval("jsonp = " + param.data.jsonp);
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
            var containerWidth = containerConfig.containerWidth;
            var containerHeight = containerConfig.containerHeight;
            var containerID = containerConfig.containerID;




            var imageUrl = result.data[0].content;
            var actionUrl = result.data[0].clickUrl;
            var timescape = Date.parse(new Date()).toString();
            var contentID = 'idcontent' + timescape + Math.random().toString().split('.')[1];
            var windowWidth = window.screen.width;
            var windowHeight = window.screen.height;


            var sizeMap = {
                large: 0.3,
                medium: 0.2,
                small: 0.1
            }

            var contentWidth = 0;
            var contentHeight = 0;
            var cancelWidth = 0;
            if (containerConfig.forceSize) {
                contentWidth = containerWidth;
                contentHeight = containerHeight;
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
            if (position.indexOf('left') > -1) containerStyleString += 'left:0px;'
            if (position.indexOf('right') > -1) containerStyleString += 'right:0px;'
            if (position.indexOf('top') > -1) containerStyleString += 'top:0px;'
            if (position.indexOf('bottom') > -1) containerStyleString += 'bottom:0px;'

            var centerLeft = (windowWidth - contentWidth) / 2;
            if (position.indexOf('center') > -1) containerStyleString += 'left:' + centerLeft + 'px;'

            var middleTop = (windowHeight - contentHeight) / 2;
            if (position.indexOf('middle') > -1) containerStyleString += 'top:' + middleTop + 'px;'

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
                warpTagEl.setAttribute('style','background-image:url(\'' + imageUrl + '\');width:' + contentWidth + 'px;height:' + contentHeight + 'px;position: fixed;' + containerStyleString + 'background-size: contain;background-position: center;background-repeat: no-repeat;background-color:rgba(0,0,0,0.5);');
            }else{
                warpTagEl = document.createElement('div');
                warpTagEl.setAttribute('id',contentID);
                warpTagEl.setAttribute('style','width:' + contentWidth + 'px;height:' + contentHeight + 'px;position: fixed;'+containerStyleString);
                innerDownloadEl = document.createElement('a');
                innerDownloadEl.setAttribute('href',actionUrl);
                innerDownloadEl.setAttribute('style','display:block;background-image:url(\'' + imageUrl + '\');width:' + contentWidth + 'px;height:' + contentHeight + 'px;' + containerStyleString + 'background-size: contain;background-position: center;background-repeat: no-repeat;background-color:rgba(0,0,0,0.5);');
                //innerDownload = '<a href="' + actionUrl + '" style="display:block;background-image:url(\'' + imageUrl + '\');width:' + contentWidth + 'px;height:' + contentHeight + 'px;' + containerStyleString + 'background-size: contain;background-position: center;background-repeat: no-repeat;background-color:rgba(0,0,0,0.5);"> </a>';
                warpTagEl.appendChild(innerDownloadEl);
            }
            if(containerConfig.closeAble==true) warpTagEl.appendChild(closeButtonEl);

            var htmlString =
                '<style type="text/css">' + '#' + contentID + ' .close{position: absolute;top:0px;right: 0px;font-size: ' + (cancelWidth * 2 / 3) + 'px;border-radius: 50%;background-color: red;width: ' + cancelWidth + 'px;height: ' + cancelWidth + 'px;text-align: center;line-height: ' + cancelWidth + 'px;color: white;}'
                + '</style>';
            var img = document.createElement('img');
            img.setAttribute("src",imageUrl);
            addListener(img,"load",function(){
                document.getElementById(containerID).innerHTML = htmlString + getAdCalIframe(result.data[0].impressionAnalysisUrl);
                document.getElementById(containerID).appendChild(warpTagEl);
                triggerEvent(window,'adload',{"adsID":containerID,"adnType":"banner"});
            });

            
        }

        function initOverlay(result, containerConfig) {
            var containerWidth = containerConfig.containerWidth>400? 400 : (containerConfig.containerWidth-20);
            var containerHeight = (Math.floor(containerWidth) / 4) * 3;//containerConfig.containerHeight;
            var containerID = containerConfig.containerID;

            var imageUrl = result.data[0].content;
            var actionUrl = result.data[0].clickUrl;
            var timescape = Date.parse(new Date()).toString();
            var contentID = 'idcontent' + timescape + Math.random().toString().split('.')[1];
            var windowWidth = window.screen.width;
            var windowHeight = window.screen.height;
            var left = (windowWidth - containerWidth)/2;
            var top = (windowHeight - containerHeight)/2;

            var contentWidth = containerWidth;
            var contentHeight = containerHeight;

            var warpTagStart = '';
            var warpTagEnd = '';
            var innerDownload = '';

            var warpTagEl;
            var innerDownloadEl;
            var closeButtonEl = document.createElement('div');
            closeButtonEl.innerText="X";
            closeButtonEl.setAttribute('class','close');
            addListener(closeButtonEl,'click',function(){
                document.getElementById(containerID).style.display='none';
            });
            if(containerConfig.forceDownload==true){
                warpTagEl = document.createElement('a');
                warpTagEl.setAttribute('id',contentID);
                warpTagEl.setAttribute('href',actionUrl);
                warpTagEl.setAttribute('style','background-image:url(\'' + imageUrl + '\');width:' + contentWidth + 'px;height:' + contentHeight + 'px;position: fixed;left:' + left + 'px;top:' + top + 'px;background-size: contain;background-position: center;background-repeat: no-repeat;background-color:rgba(0,0,0,0.5);');
                warpTagEl.appendChild(closeButtonEl);
            }else{
                warpTagEl = document.createElement('div');
                warpTagEl.setAttribute('id',contentID);
                warpTagEl.setAttribute('style','width:' + contentWidth + 'px;height:' + contentHeight + 'px;position: fixed;left:' + left + 'px;top:' + top + 'px;');
                innerDownloadEl = document.createElement('a');
                innerDownloadEl.setAttribute('href',actionUrl);
                innerDownloadEl.setAttribute('style','display:block;background-image:url(\'' + imageUrl + '\');width:' + contentWidth + 'px;height:' + contentHeight + 'px;background-size: contain;background-position: center;background-repeat: no-repeat;background-color:rgba(0,0,0,0.5);');
                warpTagEl.appendChild(innerDownloadEl);
                warpTagEl.appendChild(closeButtonEl);
            }

            var htmlString = 
                '<style type="text/css">' + '#' + contentID + ' .close{position: absolute;top:0px;right: 0px;font-size: 20px;border-radius: 50%;background-color: red;width: 30px;height: 30px;text-align: center;line-height: 30px;color: white;}'


            + '</style>';
            var img = document.createElement('img');
            img.setAttribute("src",imageUrl);
            addListener(img,"load",function(){
                document.getElementById(containerID).innerHTML = htmlString + getAdCalIframe(result.data[0].impressionAnalysisUrl);
                document.getElementById(containerID).appendChild(warpTagEl);
                triggerEvent(window,'adload',{"adsID":containerID,"adnType":"overlay"});
            });

            
        }

        function initText(result, containerConfig) {
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

            document.getElementById(containerID).innerHTML = htmlString + getAdCalIframe(result.data[0].impressionAnalysisUrl);
            triggerEvent(window,'adload',{"adsID":containerID,"adnType":"text"});

        }

        function initInnerFrame(result, containerConfig) {
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


            document.getElementById(containerID).innerHTML = htmlString + getAdCalIframe(result.data[0].impressionAnalysisUrl);
            triggerEvent(window,'adload',{"adsID":containerID,"adnType":"innerFrame"});

        }



        function initMarquee(textArray, containerConfig) {
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

            document.getElementById(containerID).innerHTML = htmlString + getAdCalIframe(textArray.data[0].impressionAnalysisUrl);

            function $_id(id) {
                return typeof id === "string" ? document.getElementById(id) : id;
            }


            var aLi = $_id(contentID).getElementsByTagName('li');

            triggerEvent(window,'adload',{"adsID":containerID,"adnType":"marquee"});
            setInterval(function() {
                var firstLi = aLi[aLi.length - 1];
                $_id(contentID).insertBefore(firstLi, aLi[0]);
                firstLi.className = contentID + '_chang';
            }, 2000);

        }

        function getAdCalIframe(url) {
            return " <iframe src='" + url + "' style='position:absolute;left:-1;top:-1;width:1px;height:1px;' ></iframe>";
        }



        mobvistaADN.initAll();
    });
})();

/*     ------------     function for Mobvista ADN (initial from mobvista tag) end      ---------     */