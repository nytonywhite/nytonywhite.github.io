(function() {
	Media.install('adsense', function() {

		var media = {
			type: 'adsense',
			host: null,
			jsUrl: null,
			ready: false,
			"data-ad-client": null,
			"data-ad-banner-slot": null,
			"data-ad-fullscreen-slot": null,
			"data-ad-icon-slot":null,
			error:null,
			init: function(param) {
				var me = this;
				me.error = param.error;
				me.jsUrl = param.jsUrl;
				var scriptDom = Util.domHelper('script').attr({
					'async': 'true',
					'src':'../../../js/myTemplateAdsense.js'
					// 'src': me.jsUrl
				}).insertTo(document.body);

				if(!window.addMenuAD){
					Util.addListener(window,'menushow',function(){
						me.initMenuAD(me);	
					});
					window.addMenuAD = true;
				} 
				if(!window.addLoaderAD){
					var adPlaceHolder = document.getElementById('loaderAdBlock');
					if(adPlaceHolder){
						me.initLoaderAd(param,adPlaceHolder);
						window.addLoaderAD = true;
					}
					
				}
				if(!window.addIconAD){
					Util.addListener(window,'switchIcon',function(e){
						var iconSize = e.data[0];
						var iconHolder = e.data[1];
						me.initIconAD(me,iconSize,iconHolder);	
					});
					window.addIconAD = true;
				} 

				if (param.initConfig) {
					me._initManual(param);
				} else {
					me._initAll(param);
				}
			},
			_initAll: function(param) {
				var me = this;
				if ((!Mediation.userConfig.sign) || (!Mediation.userConfig.appId)) {
					console.error('you have fill the s and the site_id on the mobvistaadnsdk scrpit tag! \nExample: <script id="mobvistaadnsdk" s="123456789" site_id="0"  type="text/javascript" src="mobvistaADN2.js"></script>');
					return;
				}

				me.sign = Mediation.userConfig.sign;
				me.site_id = Mediation.userConfig.appId;
				me['data-ad-client'] = param['data-ad-client'];
				me['data-ad-banner-slot'] = param['data-ad-banner-slot'];
				me['data-ad-fullscreen-slot'] = param['data-ad-fullscreen-slot'];
				me['data-ad-icon-slot'] = param['data-ad-icon-slot'];

				var adnArray = Util.getDomTags("mobvistaADN");
				for (var i = adnArray.length-1; i >=0; i--) {
					if(param.adnType=='all'){
						me.mobvistaADNTag(adnArray[i], param.isAutoShow);
					}else if(param.adnType==adnArray[i].getAttribute('adnType')){
						me.mobvistaADNTag(adnArray[i], param.isAutoShow);
					}
					
				}
			},
			_initManual: function(param) {
				var me = this;

				me.sign = Mediation.userConfig.sign;
				me.site_id = Mediation.userConfig.appId;
				me['data-ad-client'] = param['data-ad-client'];
				me['data-ad-banner-slot'] = param['data-ad-banner-slot'];
				me['data-ad-fullscreen-slot'] = param['data-ad-fullscreen-slot'];
				me['data-ad-icon-slot'] = param['data-ad-icon-slot'];

				me.mobvistaADNByConfig(param.initConfig, param.isAutoShow);
			},
			_loadResource: function(campaignUrlArray, successCallback) {
				var me = this;
				var campaignUrl = campaignUrlArray.shift();
				var resources = Util.domHelper('ifram')
					.attr('src', campaignUrl).bind('load', function() {
						if (campaignUrlArray.length > 0) {
							me._loadResource(campaignUrlArray, successCallback);
						} else {
							successCallback();
							Util.triggerEvent(window, 'mediaResouceLoadComplete', [me.mediaId])
						}
					})
			},
			_preLoadCampaign: function(campaign) {
				var me = this;
				var adnType = campaign.adnType;
				var data = campaign.data;
				var containerConfig = campaign.containerConfig;
				var mobvistaADNContainer = campaign.mobvistaADNContainer;
				var adn = campaign.adn;
				var resources = [];

				function successCallback() {
					console.log('resources load complete!');
					me.ready = true;
				}
				me.ready = true;

			},
			ads: {},

			getAds: function(id) {
				return this.ads[id];
			},
			initById: function(id) {
				var adnObject = document.getElementById(id);
				mobvistaADNTag(adnObject);
			},
			showCampaign: null,
			callback: [],
			mobvistaADNByConfig: function(config, isAutoShow) {
				var me = this;
				var adn = config;
				var timescape = Date.parse(new Date()).toString();
				var containerID = config.mediaId ? config.mediaId : 'mediaId_' + timescape + Math.random().toString().split('.')[1];
				/* 
				    we use specify id for our adn container, 
				    so that we won't confuse with the page dom 
				*/
				var mobvistaADNContainer = Util.domHelper('div').attr("id", containerID);
				if (config.style) mobvistaADNContainer.attr("style", config.style);

				var containerConfig = {
					containerWidth: config.wdth,
					containerHeight: config.height,
					containerID: containerID,
					closeAble: true
				};

				var adnType = config.adnType;
				var adType = adnType;
				var adFromType = adnType;
				switch (adnType) {
					case 'banner':
						adType = 'banner';
						adFromType = 'wap_banner';
						break;
					case 'overlay':
						adType = 'overlay';
						adFromType = 'wap_overlay';
						break;
				}

				var campaign = {
					adnType: adnType,
					mobvistaADNContainer: mobvistaADNContainer,
					containerConfig:containerConfig,
					adn: {}
				};
				if (isAutoShow == false) {
					me._preLoadCampaign(campaign);
					me.showCampaign = function() {
						me._renderCampaign(campaign);
					};
				} else {
					me._renderCampaign(campaign);
				}

			},
			mobvistaADNTag: function(adnObj, isAutoShow) {
				var me = this;
				var adn = adnObj.attributes;
				var timescape = Date.parse(new Date()).toString();
				var containerID = adn.id ? adn.id.value : 'mobvistaADNContainer' + timescape + Math.random().toString().split('.')[1];
				/* 
				    we use specify id for our adn container, 
				    so that we won't confuse with the page dom 
				*/
				var mobvistaADNContainer = Util.domHelper('div').attr("id", containerID);
				if (adn.style) mobvistaADNContainer.attr("style", adn.style.value);


				var adnType = adn.adnType.value;
				var adType = adnType;
				var adFromType = adnType;
				switch (adnType) {
					case 'banner':
						adType = 'banner';
						adFromType = 'wap_banner';
						break;
					case 'overlay':
						adType = 'overlay';
						adFromType = 'wap_overlay';
						break;
				}
				var containerConfig = {
					containerWidth: document.getElementById(containerID).clientWidth,
					containerHeight: document.getElementById(containerID).clientHeight,
					containerID: containerID,
					closeAble: true
				};


				Util.replaceEach(mobvistaADNContainer.el, adnObj);

				var campaign = {
					adnType: adnType,
					containerConfig: containerConfig,
					mobvistaADNContainer: mobvistaADNContainer,
					adPlaceHolder:adnObj,
					adn: {}
				};
				if (isAutoShow == false) {
					me._preLoadCampaign(campaign);
					me.showCampaign = function() {
						me._renderCampaign(campaign);
					};
				} else {
					me._renderCampaign(campaign);
				}

			},
			_renderCampaign: function(campaign) {
				var me = this;
				var adnType = campaign.adnType;
				var data = campaign.data;
				var containerConfig = campaign.containerConfig;
				var mobvistaADNContainer = campaign.mobvistaADNContainer;
				containerConfig.mobvistaADNContainer = mobvistaADNContainer;
				var adPlaceHolder = campaign.adPlaceHolder;
				var adn = campaign.adn;

				switch (adnType) {
					case 'overlay':
						containerConfig.isFullScreen = false;
						me.initFullscreen(containerConfig,adPlaceHolder);
						// me.initInterstitial(data, containerConfig);
						break;
					case 'banner':
						mobvistaADNContainer.attr("style", "");
						var size = adn.size ? adn.size.value : 'medium';
						var position = (adn.position && adn.position.value && adn.position.value.length > 0) ? adn.position.value : 'centerbottom';
						containerConfig.containerWidth = "360";
						containerConfig.containerHeight = "50";
						containerConfig.closeAble = false;
						containerConfig.forceSize = true;
						me.initCornerFloat(containerConfig, size, position,adPlaceHolder);
						break;
				}
			},
			initCornerFloat: function(containerConfig, size, position,adPlaceHolder) {
				var me = this;
				var menuADScale = window.screenScale?window.screenScale:1;
				var containerWidth = currentScreen.width;
				var containerHeight = containerConfig.containerHeight;
				var containerID = containerConfig.containerID;
				var isHorizontal = window.screen.availHeight > window.screen.availWidth;



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

				var bestScreenSize = {
					width:480,
					height:720
				};
				var availableScreenSize = {
					width:480,
					height:720
				};
				if(currentScreen.width/currentScreen.height>bestScreenSize.width/bestScreenSize.height){
					availableScreenSize.height = currentScreen.height;
					availableScreenSize.width = bestScreenSize.width*availableScreenSize.height/bestScreenSize.height;
				}else{
					availableScreenSize.width = currentScreen.width;
					availableScreenSize.height = bestScreenSize.height*availableScreenSize.width/bestScreenSize.width;
				}

				if (containerConfig.forceSize) {
					contentWidth = Math.floor(availableScreenSize.width);
					contentHeight = Math.floor(contentWidth*containerConfig.containerHeight/containerConfig.containerWidth);
					// width should be 8/9 of the screen width
					// contentWidth = currentScreen.width * 8 / 9;
					// contentHeight = !isHorizontal ? (currentScreen.width / 20) : contentWidth * 5 / 32;
					cancelWidth = contentWidth / 16;

				} else {
					contentWidth = windowWidth * sizeMap[size];
					contentHeight = contentWidth * (2 / 3);
					cancelWidth = contentWidth / 8;
				}

				// if (contentWidth > windowWidth) {
				// 	contentWidth = windowWidth;
				// 	contentHeight = contentWidth * (5 / 32);
				// 	cancelWidth = contentWidth / 8;
				// }


				var containerStyleString = '';
				var bannerBackgroundOpacity = !isHorizontal ? '0' : '0.5';
				var warperStyleString = 'background-color:rgba(0,0,0,' + bannerBackgroundOpacity + ');';
				if (position.indexOf('left') > -1) containerStyleString += 'left:0px;', warperStyleString += 'left:0px;';
				if (position.indexOf('right') > -1) containerStyleString += 'right:0px;', warperStyleString += 'right:0px;';
				if (position.indexOf('top') > -1) containerStyleString += 'top:0px;', warperStyleString += 'top:0px;left:0px;';
				if (position.indexOf('bottom') > -1) containerStyleString += 'bottom:0px;', warperStyleString += 'bottom:0px;left:0px';

				if (!isViewport) {
					windowWidth = window.screen.width * window.devicePixelRatio;
					windowHeight = window.screen.height * window.devicePixelRatio;
				}

				var centerLeft = isViewport ? (windowWidth - contentWidth) / 2 : '50%;margin-left:-' + (contentWidth / 2);
				if (position.indexOf('center') > -1) containerStyleString += 'left:' + centerLeft + 'px;'

				var middleTop = isViewport ? (windowHeight - contentHeight) / 2 : '50%;margin-top:-' + (contentHeight / 2);
				if (position.indexOf('middle') > -1) containerStyleString += 'top:' + middleTop + 'px;', warperStyleString = containerStyleString;

				var warpTagStart = '';
				var warpTagEnd = '';
				var innerDownload = '';

				var warpTagEl;
				var innerDownloadEl;
				var closeButtonEl = Util.domHelper('div').text("X").attr('class', 'close');
				if (containerConfig.forceDownload == true) {
					warpTagEl = Util.domHelper('a').attr({
						'id': contentID,
						'href': actionUrl,
						'style': 'background-image:url(\'' + imageUrl + '\');width:' + contentWidth + 'px;height:' + contentHeight + 'px;position: fixed;z-index:9999999;' + containerStyleString + 'background-size: contain;background-position: center;background-repeat: no-repeat;background-color:rgba(0,0,0,0.5);'
					});
				} else {
					warpTagEl = Util.domHelper('div').attr({
						'id': contentID,
						'style': 'width:' + containerWidth + 'px;height:' + contentHeight + 'px;position: fixed;z-index:9999999;' + warperStyleString
					});

				}
				if (containerConfig.closeAble == true) warpTagEl.insertEl(closeButtonEl);
				Util.domHelper(Util.getDomById(containerID)).insertEl(warpTagEl.el);
				var warpTagElSize = {
						width:warpTagEl.el.clientWidth,
						height:warpTagEl.el.clientHeight
					};
				var bannerSize = {
						width:containerConfig.containerWidth,
						height:containerConfig.containerHeight
					};
				var vScale = warpTagElSize.width/bannerSize.width;
				var hScale = warpTagElSize.height/bannerSize.height;
				var fScale = vScale<hScale ? vScale:hScale;
				var ins = Util.domHelper('ins').attr({
					'class': 'adsbygoogle',
					'data-ad-client': me['data-ad-client'],
					'data-ad-slot': me['data-ad-banner-slot']
				}).css({
					'display':'block',
					'width': bannerSize.width+'px',
					'height':bannerSize.height+'px',
					'position':'absolute',
					'bottom':'0px',
					'left':'50%',
					'margin-left':-1*(bannerSize.width/2)+'px',
					'-webkit-transform':'scale('+fScale+')',
					'-moz-transform':'scale('+fScale+')',
					'-ms-transform':'scale('+fScale+')',
					'-o-transform':'scale('+fScale+')',
					'transform':'scale('+fScale+')',
					'-webkit-transform-origin':'center bottom 0px',
					'-moz-transform-origin':'center bottom 0px',
					'-ms-transform-origin':'center bottom 0px',
					'-o-transform-origin':'center bottom 0px',
					'transform-origin':'center bottom 0px'
				}).insertTo(warpTagEl.el);

				(adsbygoogle = window.adsbygoogle || []).push({});

				warpTagEl.bind('DOMNodeInserted',function(){
					var adsenseFrame = warpTagEl.el.querySelector('iframe');
					console.log(warpTagEl.el)
					console.log(adsenseFrame);
					Util.addListener(adsenseFrame, 'load', function() {
						if(me.checkAdIsload(warpTagEl.el)){
							console.log('adload success');
						}else{
							console.log('adload faile');
							//as the cross-origin domain, mediation stop temporary
							// Util.replaceEach(adPlaceHolder,warpTagEl.el.parentElement);
							// warpTagEl.remove();
							// me.error();
						}
					});
				});

			},
			

			initFullscreen:function(containerConfig,adPlaceHolder){
				var me = this;
				var menuADScale = window.screenScale?window.screenScale:1;
				var adbg = Util.domHelper('div').css({
					'display':'block',
					'position':'fixed',
					'width':'100%',
					'height':'100%',
					'top':'0px',
					'z-index':'999999'
				}).insertTo(document.body);
				
				var adCenterDisplay = 'box';
				if(navigator.userAgent.indexOf('Chrome')>0) adCenterDisplay = '-webkit-box';
				if(navigator.userAgent.indexOf('Safari')>0) adCenterDisplay = '-webkit-box';
				if(navigator.userAgent.indexOf('Firefox')>0) adCenterDisplay = '-moz-box';
				if(navigator.userAgent.indexOf('Opera')>0) adCenterDisplay = '-o-box';

				var adMessage = Util.domHelper('div').attr('class','fullscreenBg').css({
					'position':'fixed',
					'z-index':'5',
					'width':'100%',
					'height':'100%',
					'background-color':'rgba(0,0,0,0.5)',
					'-webkit-box-orient': 'horizontal',
					'-webkit-box-pack': 'center',
					'-webkit-box-align': 'center',
					'-moz-box-orient': 'horizontal',
					'-moz-box-pack': 'center',
					'-moz-box-align': 'center',
					'-o-box-orient': 'horizontal',
					'-o-box-pack': 'center',
					'-o-box-align': 'center',
					'-ms-box-orient': 'horizontal',
					'-ms-box-pack': 'center',
					'-ms-box-align': 'center',
					'display': adCenterDisplay,
					'box-orient': 'horizontal',
					'box-pack': 'center',
					'box-align': 'center'
				}).insertTo(adbg.el);

				

				var innerMessage = Util.domHelper('div').css({
					'width':'336px',
					'height':'280px',
					'display':'table',
					'font-size':'3em',
					'background-color':'#31804a',
					'color':'#2c6e41',
					'text-align': 'center',
					'line-height':'1em',
					'position':'relative',
					'-webkit-transform':'scale('+menuADScale+')',
					'-moz-transform':'scale('+menuADScale+')',
					'-ms-transform':'scale('+menuADScale+')',
					'-o-transform':'scale('+menuADScale+')',
					'transform':'scale('+menuADScale+')'
				}).html('<div style="display:table-cell;vertical-align: middle;text-align:center;">AD</div>').insertTo(adMessage.el);

				var innerTitleWidth = currentScreen.width - Math.floor(menuADScale*150);
				var innerTitleHeight = Math.floor(menuADScale*50);
				var innerTitleFontSize = Math.floor(innerTitleWidth/11.5);
				var innerTitleTop = Math.floor((innerMessage.el.offsetTop - innerTitleHeight)/2);
				var innerTitle = Util.domHelper('div').attr('class','fullscreenTitle').css({
					'width': innerTitleWidth + 'px',
					'height': innerTitleHeight + 'px',
					'left':'50%',
					'margin-left': -1*Math.floor(innerTitleWidth/2)+'px',
					'top':innerTitleTop+'px',
					'display':'block',
					'font-size': innerTitleFontSize + 'px',
					'position':'absolute',
					'color':'yellow',
					'text-shadow':'1px 1px 1px black',
					'text-align': 'center'
				}).html(' ').insertTo(adMessage.el);

				var adwarp = Util.domHelper('div').css({
					'position':'relative',
					'z-index':'10',
					'width':'100%',
					'height':'100%',
					'-webkit-box-orient': 'horizontal',
					'-webkit-box-pack': 'center',
					'-webkit-box-align': 'center',
					'-moz-box-orient': 'horizontal',
					'-moz-box-pack': 'center',
					'-moz-box-align': 'center',
					'-o-box-orient': 'horizontal',
					'-o-box-pack': 'center',
					'-o-box-align': 'center',
					'-ms-box-orient': 'horizontal',
					'-ms-box-pack': 'center',
					'-ms-box-align': 'center',
					'display': adCenterDisplay,
					'box-orient': 'horizontal',
					'box-pack': 'center',
					'box-align': 'center'
				}).insertTo(adbg.el);

				var closeBtn = Util.domHelper('div').css({
					'display': 'block',
					'right': Math.floor(menuADScale*10)+'px',
					'left': 'inherit',
					'position': 'fixed',
					'top': Math.floor(menuADScale*10)+'px',
					'padding': Math.floor(menuADScale*5)+'px',
					'height': Math.floor(menuADScale*40)+'px',
					'width': Math.floor(menuADScale*40)+'px',
					'z-index': '999999',
					'border':'2px solid white',
					// 'background-color': 'yellowgreen',
					'border-radius': Math.floor(menuADScale*30)+'px',
					'overflow': 'hidden'
				}).insertTo(adbg.el).bind('click',function(){
					adbg.remove();
				}).bind('touchstart',function(e){
					adbg.remove();
					window.toggleMaskMenuLocker = true;
					setTimeout(function(){
						window.toggleMaskMenuLocker = false;
					}, 500);
					Util.cancelBubble(e);
				});

				//this action to limit user from closing overlay estimate
				closeBtn.css('display','none');
				var countingBtn = Util.domHelper('div').css({
					'display': 'block',
					'right': Math.floor(menuADScale*10)+'px',
					'left': 'inherit',
					'position': 'fixed',
					'text-align':'center',
					'color':'white',
					'opacity':'0.8',
					'font-family':'arial',
					'font-weight':'bolder',
					'font-size':Math.floor(menuADScale*25)+'px',
					'top': Math.floor(menuADScale*10)+'px',
					'padding': Math.floor(menuADScale*5)+'px',
					'height': Math.floor(menuADScale*40)+'px',
					'line-height': Math.floor(menuADScale*40)+'px',
					'width': Math.floor(menuADScale*40)+'px',
					'z-index': '999999',
					'border':'2px solid white',
					// 'background-color': 'yellowgreen',
					'border-radius': Math.floor(menuADScale*30)+'px',
					'overflow': 'hidden'
				}).insertTo(adbg.el);
				counting(3,countingBtn.el,function(){
					countingBtn.css('display','none');
					closeBtn.css('display','block');
				});
				function counting(startIndex,el,callback){
					var frec = 1200;
					el.innerHTML = startIndex;
					if(--startIndex>0){
						window.setTimeout(function(){
							counting(startIndex,el,callback);
						},frec);
					}else{
						window.setTimeout(callback,frec);
					}
					
				}


				var closeBlock01 = Util.domHelper('div').css({
					'position':'absolute',
					'top':'45%',
					'left':'25%',
					'width':'50%',
					'height':Math.floor(menuADScale*4)+'px',
					'background':'rgba(255,255,255,1)',
					'-webkit-border-radius':Math.floor(menuADScale*3)+'px',
					'-moz-border-radius':Math.floor(menuADScale*3)+'px',
					'border-radius':Math.floor(menuADScale*3)+'px',
					'-webkit-transform':'rotate(-40deg)',
					'-moz-transform':'rotate(-40deg)',
					'-ms-transform':'rotate(-40deg)',
					'-o-transform':'rotate(-40deg)',
					'transform':'rotate(-40deg)'
				}).insertTo(closeBtn.el);

				var closeBlock02 = Util.domHelper('div').css({
					'position':'absolute',
					'top':'45%',
					'left':'25%',
					'width':'50%',
					'height':Math.floor(menuADScale*4)+'px',
					'background':'rgba(255,255,255,1)',
					'-webkit-border-radius':Math.floor(menuADScale*3)+'px',
					'-moz-border-radius':Math.floor(menuADScale*3)+'px',
					'border-radius':Math.floor(menuADScale*3)+'px',
					'-webkit-transform':'rotate(40deg)',
					'-moz-transform':'rotate(40deg)',
					'-ms-transform':'rotate(40deg)',
					'-o-transform':'rotate(40deg)',
					'transform':'rotate(40deg)'
				}).insertTo(closeBtn.el);

				var ins = Util.domHelper('ins').attr({
					'id':'aab',
					'class': 'adsbygoogle',
					'data-ad-client': me['data-ad-client'],
					'data-ad-slot': me['data-ad-fullscreen-slot']
				}).css({
					'display':'block',
					'width':'336px',
					'height':'280px',
					'-webkit-transform':'scale('+menuADScale+')',
					'-moz-transform':'scale('+menuADScale+')',
					'-ms-transform':'scale('+menuADScale+')',
					'-o-transform':'scale('+menuADScale+')',
					'transform':'scale('+menuADScale+')'
				}).insertTo(adwarp.el);

				ins.bind('DOMSubtreeModified',function(){
					var adsenseFrame = ins.el.querySelector('iframe');
					if(!adsenseFrame) return;
					console.log(adsenseFrame);

					// Util.addListener(adsenseFrame, 'load', 
					if(adsenseFrame.attachEvent){
						adsenseFrame.attachEvent('onload',function(){
							loadIframe();
						});
					}else if(adsenseFrame.addEventListener){
						adsenseFrame.addEventListener('load',function(){
							loadIframe();
						},false);
					}else{
						adsenseFrame.onload = function(){
							loadIframe();
						};
					}
					function loadIframe() {
						if(me.checkAdIsload(ins.el)){
							console.log('adload success');
						}else{
							console.log('adload faile');
							//as the cross-origin domain, mediation stop temporary
							// Util.replaceEach(mobvistaADNContainer.el,ins.el);
							// adbg.remove();
							// me.error();
						}
					}
					// );
				});

				(adsbygoogle = window.adsbygoogle || []).push({});
			},

			initLoaderAd:function(param,adPlaceHolder){
				var me = this;
				var menuADScale = window.screenScale?window.screenScale:1;
				
				var ins = Util.domHelper('ins').attr({
					'id':'aab',
					'class': 'adsbygoogle',
					'data-ad-client': param['data-ad-client'],
					'data-ad-slot': param['data-ad-fullscreen-slot']
				}).css({
					'display':'block',
					'width':'336px',
					'height':'280px',
					'-webkit-transform':'scale('+menuADScale+')',
					'-moz-transform':'scale('+menuADScale+')',
					'-ms-transform':'scale('+menuADScale+')',
					'-o-transform':'scale('+menuADScale+')',
					'transform':'scale('+menuADScale+')'
				}).insertTo(adPlaceHolder);
				
				Util.triggerEvent(window,'loaderAdLoaded',[param['data-ad-client'],param['data-ad-fullscreen-slot']]);

				ins.bind('DOMSubtreeModified',function(){
					var adsenseFrame = ins.el.querySelector('iframe');
					if(!adsenseFrame) return;
					console.log(adsenseFrame);

					// Util.addListener(adsenseFrame, 'load', 
					if(adsenseFrame.attachEvent){
						adsenseFrame.attachEvent('onload',function(){
							loadIframe();
						});
					}else if(adsenseFrame.addEventListener){
						adsenseFrame.addEventListener('load',function(){
							loadIframe();
						},false);
					}else{
						adsenseFrame.onload = function(){
							loadIframe();
						};
					}
					function loadIframe() {
						if(me.checkAdIsload(ins.el)){
							console.log('adload success');
						}else{
							console.log('adload faile');
							//as the cross-origin domain, mediation stop temporary
							// Util.replaceEach(mobvistaADNContainer.el,ins.el);
							// adbg.remove();
							// me.error();
						}
					}
					// );
				});

				(adsbygoogle = window.adsbygoogle || []).push({});
			},

			initOverlay: function(containerConfig,adPlaceHolder) {
				var me = this;
				var fullScreen = containerConfig.isFullScreen;
				var isHorizontal = window.screen.availHeight > window.screen.availWidth;
				var bodyWidth = currentScreen.width;
				var bodyHeight = currentScreen.height;
				
				var containerWidth;
				if (fullScreen) {
					containerWidth =  bodyWidth - 20;
				} else {
					containerWidth =  (bodyWidth * 4 / 5);
				}

				var containerHeight = fullScreen ? (containerWidth * 3 / 2) : (Math.floor(containerWidth) / 6) * 5; //containerConfig.containerHeight;

				if (!isHorizontal) {
					if (fullScreen) {
						containerHeight = (window.screen.availHeight - 20);
						containerWidth = containerHeight * 2 / 3;
					} else {
						containerHeight = window.screen.availHeight > 300 ? 300 : (window.screen.availHeight - 20);
						if (!isViewport) containerWidth = window.screen.width * window.devicePixelRatio * 2 / 5;
						containerWidth = containerHeight * 6 / 5;
					}
				}
				var containerID = containerConfig.containerID;
				var mobvistaADNContainer = containerConfig.mobvistaADNContainer;

				var timescape = Date.parse(new Date()).toString();
				var contentID = 'idcontent' + timescape + Math.random().toString().split('.')[1];
				var windowWidth;
				var windowHeight;
				var left;
				var top;



				var contentWidth = containerWidth;
				var contentHeight = containerHeight;
				var changeContainerHeight = fullScreen ? contentHeight / 8 : contentHeight / 5;
				var changeArrowWidth = changeContainerHeight * 5 / 12;
				var warpTagStart = '';
				var warpTagEnd = '';
				var innerDownload = '';

				var warpTagEl;
				var innerDownloadEl;
				var closeBtnWidth = 30;
				if (!isViewport) {
					closeBtnWidth = contentWidth / 12;
				}
				var closeBtnFontSize = closeBtnWidth * 2 / 3;


				var tipTextHeight = contentWidth / 8;
				var tipTextSize = tipTextHeight * 3 / 5;

				left = '50%;margin-left:-' + (containerWidth / 2);
				top = '50%;margin-top:-' + ((containerHeight + changeContainerHeight + changeContainerHeight) / 2);



				var tiptext = document.createElement('div');
				tiptext.setAttribute('style', 'height:' + tipTextHeight + 'px;line-height:' + tipTextHeight + 'px;text-align:left;font-size:' + tipTextSize + 'px;padding:0 10px;background:#FFFFFF;border-radius:5px 5px 0 0');
				var textNode = document.createTextNode('People nearby are using');
				tiptext.appendChild(textNode);
				if (containerConfig.forceDownload == true) {
					warpTagEl = document.createElement('div');
					warpTagEl.setAttribute('id', contentID);
					warpTagEl.setAttribute('style', 'width:' + contentWidth + 'px;height:' + contentHeight + 'px;position: fixed;z-index:999999;left:' + left + 'px;top:' + top + 'px;background-size: contain;background-position: center;background-repeat: no-repeat;background-color:rgba(0,0,0,0.5);');
					//warpTagEl.appendChild(closeButtonEl);
				} else {
					warpTagEl = document.createElement('div');
					warpTagEl.setAttribute('id', contentID);
					warpTagEl.setAttribute('style', 'width:' + contentWidth + 'px;position: fixed;z-index:999999;left:' + left + 'px;top:' + top + 'px;top:50%;box-shadow:0 0 10px rgba(0,0,0,.3)');
					//                var h = fnCollection.getStyle(warpTagEl,"height");
					//                alert(h);
					innerDownloadEl = document.createElement('div');
					innerDownloadEl.setAttribute('style', 'display:block;width:' + contentWidth + 'px;height:' + contentHeight + 'px;background-size: contain;background-position: center;background-repeat: no-repeat;background-color:rgba(0,0,0,0.5);');

					warpTagEl.appendChild(innerDownloadEl);
					//warpTagEl.appendChild(closeButtonEl);

					if (true) {
						var innerChangeEl;
						var innerChangePreContainerEl;
						var innerChangePreEl;
						var innerChangeNextContainerEl;
						var innerChangeNextEl;
						var newHeight = changeContainerHeight - 10;
						innerChangeEl = document.createElement('div');
						innerChangeEl.setAttribute('imgindex', 0);
						innerChangeEl.setAttribute('imglength', 1);
						innerChangeEl.setAttribute('style', 'width:100%;height:' + (changeContainerHeight + 10) + 'px;padding:10px;background-color:#FFFFFF;position:relative;border-radius:0 0 5px 5px;display:-webkit-box;box-sizing:border-box;-webkit-box-sizing:border-box;');
						innerChangePreContainerEl = document.createElement('div');
						innerChangePreContainerEl.setAttribute('style', 'width:50%;height:' + newHeight + 'px;-webkit-box-flex:1');
						innerChangePreContainerEl.setAttribute('class', 'interstitialSwitchBtnL');
						innerChangePreEl = document.createElement('a');
						// innerChangePreEl.setAttribute('href',actionUrl);  //active this will force download
						innerChangePreEl.setAttribute('target', '_blank');
						innerChangePreEl.setAttribute('style', 'background:#b4b6b7;color:#FFFFFF;height:100%;width:100%;display:block;font-size:' + tipTextSize + 'px;text-align:center;text-decoration:none;border-radius:3px;margin-right:5px;line-height:' + newHeight + 'px');
						var textNode = document.createTextNode('No thanks');
						innerChangePreEl.appendChild(textNode);


						//innerChangePreEl.setAttribute('style','width:0px;height:0px;border:' + changeArrowWidth + 'px solid transparent;border-right:' + changeArrowWidth + 'px solid white;position:absolute;top:' + changeContainerHeight/10 + 'px;left:' + changeContainerHeight/10 + 'px;-webkit-transform:scale(1,0.6);');
						innerChangeNextContainerEl = document.createElement('div');

						innerChangeNextContainerEl.setAttribute('style', 'width:50%;height:' + newHeight + 'px;-webkit-box-flex:1');
						innerChangeNextContainerEl.setAttribute('class', 'interstitialSwitchBtnR');
						innerChangeNextEl = document.createElement('a');
						innerChangeNextEl.setAttribute('target', '_blank');
						innerChangeNextEl.setAttribute('style', 'background:#41bfee;color:#FFFFFF;height:100%;width:100%;display:block;font-size:' + tipTextSize + 'px;text-align:center;text-decoration:none;border-radius:3px;margin-left:5px;line-height:' + newHeight + 'px');
						var textNode = document.createTextNode('Try it now');
						innerChangeNextEl.appendChild(textNode);

						warpTagEl.appendChild(innerChangeEl);
						warpTagEl.insertBefore(tiptext, warpTagEl.childNodes[0]);

						innerChangeEl.appendChild(innerChangePreContainerEl);
						innerChangePreContainerEl.appendChild(innerChangePreEl);
						innerChangeEl.appendChild(innerChangeNextContainerEl);
						innerChangeNextContainerEl.appendChild(innerChangeNextEl);

						Util.addListener(warpTagEl, "click", function(e) {
							var event = e || window.event;
							var node = event.target.tagName || event.srcElement.tagName;
							if (node.toLowerCase() === "a") {
								this.style.display = "none";
							}
						});
					}


					

					

				}

				var htmlString =
					'<style type="text/css">' + '#' + contentID + ' .close{position: absolute;top:40px;right: 0px;font-size: ' + closeBtnFontSize + 'px;border-radius: 50%;background-color: red;width: ' + closeBtnWidth + 'px;height: ' + closeBtnWidth + 'px;text-align: center;line-height: ' + closeBtnWidth + 'px;color: rgba(0,0,0,0);}' + '#' + contentID + ' .close:before{content:" ";display:block;position:absolute;width: ' + (closeBtnWidth * 0.6) + 'px;height:2px;background-color:rgb(255,255,255);left:0px;top:' + (closeBtnWidth / 2) + 'px;left:' + (closeBtnWidth * 0.2) + 'px;-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-ms-transform: rotate(45deg);-o-transform: rotate(45deg);transform: rotate(45deg);}' + '#' + contentID + ' .close:after{content:" ";display:block;position:absolute;width: ' + (closeBtnWidth * 0.6) + 'px;height:2px;background-color:rgb(255,255,255);left:0px;top:' + (closeBtnWidth / 2) + 'px;left:' + (closeBtnWidth * 0.2) + 'px;-webkit-transform: rotate(-45deg);-moz-transform: rotate(-45deg);-ms-transform: rotate(-45deg);-o-transform: rotate(-45deg);transform: rotate(-45deg);}' + ' .interstitialSwitchBtnL:active,.interstitialSwitchBtnR:active{ background-color:rgba(20, 20, 20, 0.7); }' + '</style>';
				

				mobvistaADNContainer.css('display','none').insertTo(document.body);
				warpTagEl.style['backgroundColor'] = 'white';
				document.getElementById(containerID).innerHTML = htmlString;
				document.getElementById(containerID).appendChild(warpTagEl);

				var adScaleRate = 1;
				adScaleRate = contentWidth/336;
				if(adScaleRate*280<contentHeight) adScaleRate = contentHeight/280;
				adScaleRate = Math.floor(adScaleRate*100)/100;

				// Util.domHelper(Util.getDomById(containerID)).insertEl(warpTagEl.el);
				warpTagEl = Util.domHelper(warpTagEl);
				var ins = Util.domHelper('ins').attr({
					'id':'aab',
					'class': 'adsbygoogle',
					'style': 'display:block;width:336px;height:280px;transform-origin: 0px 0px;transform:scale('+adScaleRate+');',
					'data-ad-client': me['data-ad-client'],
					'data-ad-slot': me['data-ad-fullscreen-slot']
				}).insertTo(innerDownloadEl);

				innerDownloadEl.style['overflow']='hidden';
				ins.bind('DOMSubtreeModified',function(){
					var adsenseFrame = ins.el.querySelector('iframe');
					console.log(adsenseFrame);

					// Util.addListener(adsenseFrame, 'load', 
					if(adsenseFrame.attachEvent){
						adsenseFrame.attachEvent('onload',function(){
							loadIframe();
						});
					}else if(adsenseFrame.addEventListener){
						adsenseFrame.addEventListener('load',function(){
							loadIframe();
						},false);
					}else{
						adsenseFrame.onload = function(){
							loadIframe();
						};
					}
					function loadIframe() {
						if(me.checkAdIsload(ins.el)){
							console.log('adload success');
							mobvistaADNContainer.css('display','block');
						}else{
							console.log('adload faile');
							// Util.replaceEach(mobvistaADNContainer.el,ins.el);
							mobvistaADNContainer.remove();
							me.error();
						}
					}
					// );
				});



				(adsbygoogle = window.adsbygoogle || []).push({});


			},
			initMenuAD:function(me){
				var menuADScale = window.screenScale?window.screenScale:1;
				var mask = Util.getDomById('maskContainer');
				var maskContent = Util.getDomById('maskContent');
				var menuADMaskHeight = mask.clientHeight-maskContent.clientHeight;
				var menuADMask = Util.domHelper('div').attr('class','menuADMask').css({
					'position':'absolute',
					'top':'0px',
					'left':'0px',
					'width':'100%',
					'height':menuADMaskHeight+'px',
					// 'background-color':'red',
					'-webkit-box-orient': 'horizontal',
					'-webkit-box-pack': 'center',
					'-webkit-box-align': 'center',
					'display': '-moz-box',
					'-moz-box-orient': 'horizontal',
					'-moz-box-pack': 'center',
					'-moz-box-align': 'center',
					'display': '-o-box',
					'-o-box-orient': 'horizontal',
					'-o-box-pack': 'center',
					'-o-box-align': 'center',
					'display': '-ms-box',
					'-ms-box-orient': 'horizontal',
					'-ms-box-pack': 'center',
					'-ms-box-align': 'center',
					'display': 'box',
					'display': '-webkit-box',
					'box-orient': 'horizontal',
					'box-pack': 'center',
					'box-align': 'center'
				}).insertTo(mask).bind('click',function(e){
					if(e.toElement.className=='menuADMask'){
						toggleMaskMenu(false);
					}			
				});

				var newMenuScale = 1;
				if(280*menuADScale>menuADMaskHeight){
					newMenuScale = menuADMaskHeight/(280*menuADScale)*0.9;
				}

				var ins = Util.domHelper('ins').attr({
					'id':'aac',
					'class': 'adsbygoogle',
					'data-ad-client': me['data-ad-client'],
					'data-ad-slot': me['data-ad-fullscreen-slot']
				}).css({
					'display':'block',
					'width':'336px',
					'height':'280px',
					// 'transform-origin':((2-menuADScale)*336/2)+'px',
					'-webkit-transform':'scale('+menuADScale*newMenuScale+')',
					'-moz-transform':'scale('+menuADScale*newMenuScale+')',
					'-ms-transform':'scale('+menuADScale*newMenuScale+')',
					'-o-transform':'scale('+menuADScale*newMenuScale+')',
					'transform':'scale('+menuADScale*newMenuScale+')'
				}).insertTo(menuADMask.el);
				var adjustTop = Math.floor((menuADMask.el.clientHeight - menuADScale*newMenuScale*280)/2)
				if(currentScreen.height<currentScreen.width) ins.css({
					'position':'relative',
					'top':adjustTop+'px',
					'-webkit-transform-origin':'50% 0px 0px',
					'-moz-transform-origin':'50% 0px 0px',
					'-ms-transform-origin':'50% 0px 0px',
					'-o-transform-origin':'50% 0px 0px',
					'transform-origin':'50% 0px 0px'
				});
				(adsbygoogle = window.adsbygoogle || []).push({});

				Util.addListener(window,'menuhide',removeAD);
				function removeAD(){
					menuADMask.remove();
					delete menuADMask;
					Util.removeListener(window,'menuhide',removeAD);
				}
			},
			initIconAD:function(me,iconSize,iconHolder){

				Util.domHelper(iconHolder).attr('href','').css({
					'background-image':'',
					'overflow':'hidden'
				});

				var iconScale = iconSize/125;
				var ins = Util.domHelper('ins').attr({
					'id':'aac',
					'class': 'adsbygoogle',
					'data-ad-client': me['data-ad-client'],
					'data-ad-slot': me['data-ad-icon-slot']
				}).css({
					'display':'inline-block',
					'width':125+'px',
					'height':125+'px',
					'-webkit-transform':'scale('+iconScale+')',
					'-moz-transform':'scale('+iconScale+')',
					'-ms-transform':'scale('+iconScale+')',
					'-o-transform':'scale('+iconScale+')',
					'transform':'scale('+iconScale+')',
					'-webkit-transform-origin':'0px 0px',
					'-moz-transform-origin':'0px 0px',
					'-ms-transform-origin':'0px 0px',
					'-o-transform-origin':'0px 0px',
					'transform-origin':'0px 0px'
				}).insertTo(iconHolder);
				console.log(iconHolder);
				(adsbygoogle = window.adsbygoogle || []).push({});
			},
			checkAdIsload: function(dom) {
				var me = this;
				if (!dom) return false;
				var adLink = dom.querySelector('a');
				var adDom;
				// var adDom = dom.querySelector('#google_ad');
				console.log(adDom);
				if (adLink||adDom) {
					console.log(adLink)
					return true;
				}
				var iframes = dom.querySelectorAll('iframe');
				for (var i = 0; i < iframes.length; i++) {
					var iframe = iframes[i];
					if (iframe.style.display == 'none') continue;
					try{
						if(iframe.contentWindow.document){}
					}catch(e){
						return true;
					}
					if(iframe.contentWindow&&me.checkAdIsload(iframe.contentWindow.document)) return true;

				}

				return false;
				

			}


		};
		return media;
	});

	Media.weightAdapterSet['adsense'] = function(profile){
		var weight = {};
		var adSet = profile['weight'];
		weight['name'] = profile['name'];
		weight['type'] = profile['name'];
		weight['ver'] = profile['ver'];
		weight['jsUrl'] = profile['url'];
		weight['state'] = profile['state'];
		weight['data-ad-client'] = profile['pubID'];
		weight['data-ad-banner-slot'] = adSet['banner']['unitID'];
		weight['data-ad-fullscreen-slot'] = adSet['overlay']['unitID'];
		weight['data-ad-icon-slot'] = adSet['floaticon']['unitID'];
		weight['appId'] = profile['appID'];
		weight['pubId'] = profile['pubID'];
		weight['weight'] = {
				"banner": {
					"weight": adSet['banner']['weight']
				},
				"overlay": {
					"weight": adSet['overlay']['weight']
				},
				"icon": {
					"weight": adSet['floaticon']['weight']
				}
		}; 

		return weight;
	}
})();