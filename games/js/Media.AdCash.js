(function() {
	var mediaType = 'adcash';
	Media.install(mediaType, function() {

		var media = {
			type: mediaType,
			host: null,
			jsUrlBanner: null,
			jsUrlInterstitial:null,
			ready: false,
			error:null,
			init: function(param) {
				var me = this;
				me.error = param.error;
				me.jsUrlBanner = param.jsUrlBanner;
				me.jsUrlInterstitial = param.jsUrlInterstitial;

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

				var adnArray = Util.getDomTags("mobvistaADN");
				for (var i = 0, iLang = adnArray.length; i < iLang; i++) {
					me.mobvistaADNTag(adnArray[i], param.isAutoShow);
				}
			},
			_initManual: function(param) {
				var me = this;
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

				switch (adnType) {
					case 'interstitial':
						resources.push(me.jsUrlInterstitial);
						me._loadResource(resources, successCallback);
						break;
					case 'overlay':
						resources.push(me.jsUrlInterstitial);
						me._loadResource(resources, successCallback);
						break;
					case 'banner':
						resources.push(me.jsUrlBanner);
						me._loadResource(resources, successCallback);
						break;
				}

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
					containerWidth: mobvistaADNContainer.el.clientWidth,
					containerHeight: mobvistaADNContainer.el.clientHeight,
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
						me.initOverlay(containerConfig,adPlaceHolder);
						// me.initInterstitial(data, containerConfig);
						break;
					case 'banner':
						mobvistaADNContainer.attr("style", "");
						var size = adn.size ? adn.size.value : 'medium';
						var position = (adn.position && adn.position.value && adn.position.value.length > 0) ? adn.position.value : 'centerbottom';
						containerConfig.containerWidth = "320";
						containerConfig.containerHeight = "50";
						containerConfig.closeAble = false;
						containerConfig.forceSize = true;
						me.initCornerFloat(containerConfig, size, position,adPlaceHolder);
						break;
				}
			},
			initCornerFloat: function(containerConfig, size, position,adPlaceHolder) {
				var me = this;
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
				if (containerConfig.forceSize) {
					// width should be 8/9 of the screen width
					contentWidth = currentScreen.width * 8 / 9;
					contentHeight = !isHorizontal ? (currentScreen.width / 20) : contentWidth * 5 / 32;
					cancelWidth = contentWidth / 16;

				} else {
					contentWidth = windowWidth * sizeMap[size];
					contentHeight = contentWidth * (2 / 3);
					cancelWidth = contentWidth / 8;
				}

				if (contentWidth > windowWidth) {
					contentWidth = windowWidth;
					contentHeight = contentWidth * (5 / 32);
					cancelWidth = contentWidth / 8;
				}


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

				var centerLeft =  '50%;margin-left:-' + Math.floor(containerWidth / 2);
				if (position.indexOf('center') > -1) containerStyleString += 'left:' + centerLeft + 'px;', warperStyleString = containerStyleString;

				var middleTop = isViewport ? (windowHeight - contentHeight) / 2 : '50%;margin-top:-' + (contentHeight / 2);
				if (position.indexOf('middle') > -1) containerStyleString += 'text-align:center;top:' + middleTop + 'px;', warperStyleString = containerStyleString;

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
						'style': 'background-image:url(\'' + imageUrl + '\');width:' + contentWidth + 'px;height:' + contentHeight + 'px;position: fixed;z-index:999999;' + containerStyleString + 'background-size: contain;background-position: center;background-repeat: no-repeat;background-color:rgba(0,0,0,0.5);'
					});
				} else {
					warpTagEl = Util.domHelper('div').attr({
						'id': contentID,
						'style': 'width:' + containerWidth + 'px;height:' + contentHeight + 'px;position: fixed;z-index:999999;' + warperStyleString
					});


				console.log(warperStyleString)

				}
				if (containerConfig.closeAble == true) warpTagEl.insertEl(closeButtonEl);
				Util.domHelper(Util.getDomById(containerID)).insertEl(warpTagEl.el);
				


				warpTagEl.bind('DOMNodeInserted',function(){
					var adcashFrame = warpTagEl.el.querySelector('iframe');
					Util.addListener(adcashFrame, 'load', function() {
						if(me.checkAdIsload(warpTagEl.el)){
							console.log('adload success');
						}else{
							console.log('adload faile');
							Util.replaceEach(adPlaceHolder,warpTagEl.el.parentElement);
							warpTagEl.remove();
							me.error();
						}
					});
				});

				var iframe = Util.domHelper('iframe').attr('src','template/adcash_banner.html??jsUrl='+me.jsUrlBanner).insertTo(warpTagEl.el);

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
				

				mobvistaADNContainer.insertTo(document.body);
				warpTagEl.style['backgroundColor'] = 'white';
				document.getElementById(containerID).innerHTML = htmlString;
				document.getElementById(containerID).appendChild(warpTagEl);


				var iframe = Util.domHelper('iframe').css({
					'width':'100%',
					'height':'100%'
				}).attr('src','template/adcash_interstitial.html??jsUrl='+me.jsUrlInterstitial).insertTo(innerDownloadEl)
				.bind('load', function() {
					//is overlay
					// if(!fullScreen){
					//     var h = parseInt(fnCollection.getStyle(warpTagEl,"height"));
					//     warpTagEl.style.marginTop = - h/2 +"px";
					// }
					Util.triggerEvent(window, 'adload', {
						"adsID": containerID,
						"adnType": "overlay"
					});

					if(me.checkAdIsload(innerDownloadEl)){
						//load success
						var adTagLink = iframe.el.contentWindow.document.querySelector('a');
						textNode.parentElement.setAttribute('href',adTagLink.href);
						
					}else{
						
						warpTagEl.remove();
						me.error();
					}
				});







			},
			checkAdIsload: function(dom) {
				var me = this;
				if (!dom) return false;
				var adLink = dom.querySelector('a');
				var adDom;
				// var adDom = dom.querySelector('#google_ad');
				//console.log(adDom)
				if (adLink||adDom) {
					// console.log(adLink)
					return true;
				}
				var iframes = dom.querySelectorAll('iframe');
				for (var i = 0; i < iframes.length; i++) {
					var iframe = iframes[i];
					if (iframe.style.display == 'none') continue;
					return me.checkAdIsload(iframe.contentWindow.document);

				}

				
				return false;
				

			}


		};
		return media;
	});

	Media.weightAdapterSet['adcash'] = function(profile){
		var weight = {};
		var adSet = profile['weight'];
		weight['name'] = profile['name'];
		weight['type'] = profile['name'];
		weight['ver'] = profile['ver'];
		weight['jsUrlBanner'] = adSet['banner']['unitID'];
		weight['jsUrlInterstitial'] = adSet['overlay']['unitID'];
		weight['state'] = profile['state'];
		weight['sign'] = profile['pubID'];
		weight['appId'] = profile['appID'];
		weight['pubId'] = profile['pubID'];
		weight['weight'] = {
			"banner": {
					"weight": adSet['banner']['weight']
				},
				"overlay": {
					"weight": adSet['overlay']['weight']
				}
		};
		
		return weight;
	};
})();