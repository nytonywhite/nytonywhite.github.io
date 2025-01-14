(function() {
	Media.install('mobvista', function() {

		var media = {
			type: 'mobvista',
			host: null,
			sign: null,
			site_id: null,
			ready: false,
			excludeCampain:null,
			error:null,
			init: function(param) {
				var me = this;
				me.host = param.host;
				if(param.error) me.error = param.error;
				if(param.excludeCampain) me.excludeCampain = param.excludeCampain;
				if (param.initConfig) {
					me._initManual(param);
				} else {
					me._initAll(param);
				}
				
				if(!window.addLoaderAD){
					var adPlaceHolder = document.getElementById('loaderAdBlock');
					if(adPlaceHolder){
						me.initLoaderAd(param,adPlaceHolder);
						window.addLoaderAD = true;
					}
					
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
				var resources = Util.domHelper('img')
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
					case 'mutiliText':
						me.ready = true;
						break;
					case 'text':
						me.ready = true;
						break;
					case 'interstitial':
						for (var i = 0; i < data.rows.length; i++) {
							resources.push(data.rows[i]['imageUrl'])
						};
						me._loadResource(resources, successCallback);
						break;
					case 'overlay':
						for (var i = 0; i < data.rows.length; i++) {
							resources.push(data.rows[i]['imageUrl'])
						};
						me._loadResource(resources, successCallback);
						break;
					case 'innerFrame':
						resources.push(data.rows[0]['imageUrl']);
						me._loadResource(resources, successCallback);
						break;
					case 'banner':
						resources.push(data.rows[0]['imageUrl']);
						me._loadResource(resources, successCallback);
						break;
					case 'cornerFloat':
						resources.push(data.rows[0]['imageUrl']);
						me._loadResource(resources, successCallback);
						break;
					case 'popunder':
						me.ready = true;
						break;
					case 'popup':
						me.ready = true;
						//initPopup(actionUrls,impressionAnalysisUrls);
						break;
				}
			},
			ads: {},

			getIEString:function(ieString){
				var me = this;
				var excludeCampain = me.excludeCampain? me.excludeCampain.toString():'';
				if(ieString&&ieString.length>0) excludeCampain = (excludeCampain.length>0)? excludeCampain+','+ieString : ieString;
				return excludeCampain;
			},

			getAds: function(id) {
				return this.ads[id];
			},
			initById: function(id) {
				var adnObject = document.getElementById(id);
				mobvistaADNTag(adnObject);
			},
			showCampaign: null,
			callback: [],
			initPopunder: function(urls, impressions, isPopUp, campaign_ids, fcaLimit) {
				var jumpEls = [];
				for (var i = 0, iMax = urls.length; i < iMax; i++) {
					var url = urls[i];
					var impression = impressions[i];
					var jumpEl = Util.domHelper('a').attr({
						'href': url,
						'target': '_blank',
						'style': 'position:absolute;left:0px;top:0px;width:1px;height:1px;visibility:hidden;'
					}).insertTo(document.body);
					jumpEls.push(jumpEl.el);
					setImpression(impression);
				}
				Util.addListener(document.body, 'click', jump);

				function jump(e) {
					var sender = e;
					if (isPopUp || (e.target.nodeName.toLocaleLowerCase() == 'a' && (e.target.parentNode.getAttribute('id') == null ||
							e.target.parentNode.getAttribute('id').indexOf('idcontent') != 0))) {

						var defaultUrl = sender.target.getAttribute('href');
						sender.target.removeAttribute('href');

						doJump();

						function doJump() {
							var currentJumpEl = jumpEls.pop();
							var campaign_id = campaign_ids.pop();
							Mediation.addCampainToLocalStorage(campaign_id, {
								'adnType': 'banner',
								'fcaLimit': fcaLimit
							});

							if (currentJumpEl && jumpEls.length > 0) {
								Util.triggerEvent(currentJumpEl, 'click');
								document.body.removeChild(currentJumpEl);
								setTimeout(doJump, 50);
							} else if (currentJumpEl && jumpEls.length == 0 && (!isPopUp)) {
								sender.target.setAttribute('href', url);
								currentJumpEl.setAttribute('href', defaultUrl);
								Util.triggerEvent(currentJumpEl, 'click');
								Util.removeListener(document.body, 'click', jump);
								document.body.removeChild(currentJumpEl);
								Util.triggerEvent(sender.target, 'click');
							} else if (isPopUp && currentJumpEl && jumpEls.length == 0) {
								Util.triggerEvent(currentJumpEl, 'click');
								document.body.removeChild(currentJumpEl);
								sender.target.setAttribute('href', defaultUrl);
								Util.triggerEvent(sender.target, 'click');
								setTimeout(doJump, 50);
							}
						}
						Util.removeListener(document.body, 'click', jump);
					}

				}
			},
			initPopup: function(urls, impressions) {
				var jumpEls = [];
				for (var i = 0, iMax = urls.length; i < iMax; i++) {
					var url = urls[i];
					var impression = impressions[i];
					var jumpEl = Util.domHelper('a').attr({
						'href': url,
						'target': '_blank',
						'style': 'position:absolute;left:0px;top:0px;width:1px;height:1px;visibility:hidden;'
					}).insertTo(document.body);
					jumpEls.push(jumpEl.el);
					setImpression(impression);
				}
				Util.addListener(document.body, 'click', jump);
				document.body.setAttribute('popup', 'true');

				function jump() {
					document.body.removeAttribute('popup');
					var currentJumpEl = jumpEls.pop();
					if (currentJumpEl) {
						Util.triggerEvent(currentJumpEl, 'click');
						document.body.removeChild(currentJumpEl);
						setTimeout(jump, 50);
					}
					Util.removeListener(document.body, 'click', jump);
				}


			},
			mobvistaADNByConfig: function(config, isAutoShow){
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


				var adnType = config.adnType;
				var adType = adnType;
				var adFromType = adnType;
				switch (adnType) {
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
					url: me.host,
					type: 'get',
					timeout: '1000',
					contentType: 'JSON',
					timestamp: true,
					callbackKey: callbackKey,
					data: {
						pf: Mediation.userConfig.platform,
						ov: Mediation.userConfig.osVersion,
						sv: Mediation.userConfig.sdkVersion,
						im: Mediation.userConfig.imei,
						mac: Mediation.userConfig.mac,
						did: Mediation.userConfig.devId||Mediation.userConfig.did,
						dm: Mediation.userConfig.deviceModel,
						ot: Mediation.userConfig.orientation,
						l: Mediation.userConfig.language,
						gpsv: Mediation.userConfig.googlePlayServiceVersion,
						aid: Mediation.userConfig.appId,
						at: adType,
						ext:'H5Link',
						sn: Mediation.userConfig.sign,
						ei: '[' + me.getIEString(Mediation.campaignArray.getData().filterByFCA().toIdString()) + ']',
						jsonp: "jsonp" + callbackKey
					},
					dataType: 'jsonp',
					success: function(data) {
						console.log(data);
						
						data.rows = me.randomCampaignArray(data.rows);
							/* for replacing the mobvista tag with new adn container */
						mobvistaADNContainer.insertTo(document.body);
						// Util.replaceEach(mobvistaADNContainer.el, config);
						var containerConfig = (adnType == 'popunder' || adnType == 'popup') ? false : {
							containerWidth: document.getElementById(containerID).clientWidth,
							containerHeight: document.getElementById(containerID).clientHeight,
							containerID: containerID,
							adnRequest:adnRequest,
							closeAble: true
						};
						var campaign = {
							adnType: adnType,
							data: data,
							containerConfig: containerConfig,
							mobvistaADNContainer: mobvistaADNContainer,
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


						if (adnType != 'popunder' && adnType != 'popup') me.addTomobvistaADN(mobvistaADNContainer.el, adnType);
					},
					error:function(){
						if(me.error) me.error();
					}

				};

				if (adnRequest.dataType == "jsonp" || adnRequest.dataType == "JSONP") {
					Util.mobvistaJSONPAjax.load(adnRequest);
				} else {
					Util.mobvistaAjax(adnRequest);
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
					case 'slidebanner':
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
					url: me.host,
					type: 'get',
					timeout: '1000',
					contentType: 'JSON',
					timestamp: true,
					callbackKey: callbackKey,
					// data: {
					// 	site_id: me.site_id,
					// 	from: adFromType,
					// 	adtype: adType,
					// 	jsonp: "jsonp" + callbackKey,
					// 	s: me.sign,
					// 	version: '2.0'
					// },
					data: {
						pf: Mediation.userConfig.platform,
						ov: Mediation.userConfig.osVersion,
						sv: Mediation.userConfig.sdkVersion,
						im: Mediation.userConfig.imei,
						mac: Mediation.userConfig.mac,
						did: Mediation.userConfig.devId||Mediation.userConfig.did,
						dm: Mediation.userConfig.deviceModel,
						ot: Mediation.userConfig.orientation,
						l: Mediation.userConfig.language,
						gpsv: Mediation.userConfig.googlePlayServiceVersion,
						aid: Mediation.userConfig.appId,
						at: adType,
						ext:'H5Link',
						sn: Mediation.userConfig.sign,
						ei: '[' + me.getIEString(Mediation.campaignArray.getData().filterByFCA().toIdString()) + ']',
						jsonp: "jsonp" + callbackKey
					},
					dataType: 'jsonp',
					success: function(data) {
						console.log(data)
						data.rows = me.randomCampaignArray(data.rows);
							/* for replacing the mobvista tag with new adn container */

						Util.replaceEach(mobvistaADNContainer.el, adnObj);
						var containerConfig = (adnType == 'popunder' || adnType == 'popup') ? false : {
							containerWidth: document.getElementById(containerID).clientWidth,
							containerHeight: document.getElementById(containerID).clientHeight,
							containerID: containerID,
							adnRequest:adnRequest,
							closeAble: true
						};
						var campaign = {
							adnType: adnType,
							data: data,
							containerConfig: containerConfig,
							mobvistaADNContainer: mobvistaADNContainer,
							adn: adn
						};
						if (isAutoShow == false) {
							me._preLoadCampaign(campaign);
							me.showCampaign = function() {
								me._renderCampaign(campaign);
							};
						} else {
							me._renderCampaign(campaign);
						}


						if (adnType != 'popunder' && adnType != 'popup') me.addTomobvistaADN(mobvistaADNContainer.el, adnType);
					},
					error:function(){
						if(me.error) me.error();
					}

				};

				if (adnRequest.dataType == "jsonp" || adnRequest.dataType == "JSONP") {
					Util.mobvistaJSONPAjax.load(adnRequest);
				} else {
					Util.mobvistaAjax(adnRequest);
				}
			},
			randomCampaignArray:function(campaignArray){
				if(!campaignArray||!campaignArray.length||campaignArray.length==0) return [];
				var newArray = [];
				var campaignArrayLength = campaignArray.length;
				var checkedObj = {};
				var randomIndex = Math.floor(Math.random()*campaignArrayLength);
				while(newArray.length<campaignArrayLength){
					if(!checkedObj[randomIndex]){
						newArray.push(campaignArray[randomIndex]);
						checkedObj[randomIndex] = true;
					}
					randomIndex = Math.floor(Math.random()*campaignArrayLength);
				}
				return newArray;
			},
			refreshCampaign:function(adnRequest,mobvistaADNContainer){
				mobvistaADNContainer.innerHTML = '';
				if (adnRequest.dataType == "jsonp" || adnRequest.dataType == "JSONP") {
					Util.mobvistaJSONPAjax.load(adnRequest);
				} else {
					Util.mobvistaAjax(adnRequest);
				}
			},
			_renderCampaign: function(campaign) {
				var me = this;
				var adnType = campaign.adnType;
				var data = campaign.data;
				var containerConfig = campaign.containerConfig;
				var mobvistaADNContainer = campaign.mobvistaADNContainer;
				var adn = campaign.adn;

				switch (adnType) {
					case 'mutiliText':
						//todo
						me.initMarquee(data, containerConfig);
						break;
					case 'text':
						//todo
						me.initText(data, containerConfig);
						break;
					case 'interstitial':
						containerConfig.isFullScreen = true;
						me.initInterstitial(data, containerConfig);
						break;
					case 'overlay':
						containerConfig.isFullScreen = false;
						me.initOverlay(data, containerConfig);
						// me.initInterstitial(data, containerConfig);
						break;
					case 'innerFrame':
						me.initInnerFrame(data, containerConfig);
						break;
					case 'banner':
						mobvistaADNContainer.attr("style", "");
						var size = adn.size ? adn.size.value : 'medium';
						var position = (adn.position && adn.position.value && adn.position.value.length > 0) ? adn.position.value : 'centerbottom';
						containerConfig.containerWidth = "320";
						containerConfig.containerHeight = "50";
						containerConfig.closeAble = false;
						containerConfig.forceSize = true;
						me.initCornerFloat(data, containerConfig, size, position);
						break;
					case 'slidebanner':
						mobvistaADNContainer.attr("style", "");
						var size = adn.size ? adn.size.value : 'medium';
						var position = (adn.position && adn.position.value && adn.position.value.length > 0) ? adn.position.value : 'centerbottom';
						containerConfig.containerWidth = "320";
						containerConfig.containerHeight = "50";
						containerConfig.closeAble = false;
						containerConfig.forceSize = true;
						me.initSlideCornerFloat(data, containerConfig, size, position);
						break;
					case 'cornerFloat':
						var size = adn.size ? adn.size.value : 'medium';
						var position = adn.position ? adn.position.value : 'lefttop';
						me.initCornerFloat(data, containerConfig, size, position);
						break;
					case 'popunder':
						var actionUrls = [];
						var impressionAnalysisUrls = [];
						var campaign_ids = [];
						for (var i in data.data) {
							actionUrls.push(data.rows[i].clickUrl);
							campaign_ids.push(data.rows[i].campaignid);
							impressionAnalysisUrls.push(data.rows[i].impressionAnalysisUrl);
						}
						var fcaLimit = data.rows[0]['fca'];
						me.initPopunder(actionUrls, impressionAnalysisUrls, false, campaign_ids, fcaLimit);
						break;
					case 'popup':
						var actionUrls = [];
						var impressionAnalysisUrls = [];
						var campaign_ids = [];
						for (var i in data.rows) {
							actionUrls.push(data.rows[i].clickUrl);
							campaign_ids.push(data.rows[i].campaignid);
							impressionAnalysisUrls.push(data.rows[i].impressionAnalysisUrl);
						}
						var fcaLimit = data.rows[0]['fca'];
						me.initPopunder(actionUrls, impressionAnalysisUrls, true, campaign_ids, fcaLimit);
						//initPopup(actionUrls,impressionAnalysisUrls);
						break;
				}
			},
			addTomobvistaADN: function(adnObj, adnType) {
				var adnObject = {
					adnType: adnType,
					showState: adnObj.style.display,
					hide: function() {
						adnObj.style.display = "none";
						Util.triggerEvent(window, 'adhide', {
							"adsID": adnObj.id,
							"adnType": adnType
						});
					},
					show: function() {
						adnObj.style.display = this.showState;
						Util.triggerEvent(window, 'adshow', {
							"adsID": adnObj.id,
							"adnType": adnType
						});
					}
				}

				this.ads[adnObj.attributes.id.value] = adnObject;

			},
			initCornerFloat: function(result, containerConfig, size, position) {

				var campaign_ids = result.rows[0].campaignId; //getQueryString(result.rows[0].impressionAnalysisUrl,'campaign_ids');
				var containerWidth = currentScreen.width;
				var containerHeight = containerConfig.containerHeight;
				var containerID = containerConfig.containerID;
				var isHorizontal = window.screen.availHeight > window.screen.availWidth;


				var imageUrl = result.rows[0].imageUrl;
				var actionUrl = result.rows[0].clickUrl;
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
						'style': 'background-image:url(\'' + imageUrl + '\');width:' + contentWidth + 'px;height:' + contentHeight + 'px;position: fixed;z-index:999999;' + containerStyleString + 'background-size: contain;background-position: center;background-repeat: no-repeat;background-color:rgba(0,0,0,0.5);'
					});
				} else {
					warpTagEl = Util.domHelper('div').attr({
						'id': contentID,
						'style': 'width:' + containerWidth + 'px;height:' + contentHeight + 'px;position: fixed;z-index:999999;' + warperStyleString
					});
					innerDownloadEl = Util.domHelper('a').attr({
						'href': actionUrl,
						'style': 'display:block;background-image:url(\'' + imageUrl + '\');width:' + contentWidth + 'px;height:' + contentHeight + 'px;margin:auto;' + 'background-size: contain;background-position: center;background-repeat: no-repeat;background-color:rgba(0,0,0,0);'
					});
					warpTagEl.insertEl(innerDownloadEl.el);
				}
				if (containerConfig.closeAble == true) warpTagEl.insertEl(closeButtonEl);

				var htmlString =
					'<style type="text/css">' + '#' + contentID + ' .close{position: absolute;top:0px;right: 0px;font-size: ' + (cancelWidth * 2 / 3) + 'px;border-radius: 50%;background-color: red;width: ' + cancelWidth + 'px;height: ' + cancelWidth + 'px;text-align: center;line-height: ' + cancelWidth + 'px;color: white;}' + '</style>';
				var img = Util.domHelper('img').attr("src", imageUrl).bind('load', function() {
					Util.domHelper(Util.getDomById(containerID)).html(htmlString).insertEl(warpTagEl.el);
					Mediation.setImpression(result.rows[0].impressionUrl);
					Util.triggerEvent(window, 'adload', {
						"adsID": containerID,
						"adnType": "banner"
					});
					var fcaLimit = result.rows[0]['fca'];
					Mediation.addCampainToLocalStorage(campaign_ids, {
						'adnType': 'banner',
						'fcaLimit': fcaLimit
					});
				});

			},
			initSlideCornerFloat: function(result, containerConfig, size, position) {

				var campaign_ids = result.rows[0].campaignId; //getQueryString(result.rows[0].impressionAnalysisUrl,'campaign_ids');
				var containerWidth = currentScreen.width;
				var containerHeight = containerConfig.containerHeight;
				var containerID = containerConfig.containerID;
				var isHorizontal = window.screen.availHeight > window.screen.availWidth;


				var imageUrl = result.rows[0].imageUrl;
				var actionUrl = result.rows[0].clickUrl;
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
						'style': 'background-image:url(\'' + imageUrl + '\');width:' + contentWidth + 'px;height:' + contentHeight + 'px;position: fixed;z-index:999999;' + containerStyleString + 'background-size: contain;background-position: center;background-repeat: no-repeat;background-color:rgba(0,0,0,0.5);'
					});
				} else {
					warpTagEl = Util.domHelper('div').attr({
						'id': contentID,
						'style': 'width:' + containerWidth + 'px;height:' + contentHeight + 'px;position: fixed;z-index:999999;' + warperStyleString
					});
					innerDownloadEl = Util.domHelper('a').attr({
						'href': actionUrl,
						'style': 'display:block;background-image:url(\'' + imageUrl + '\');width:' + contentWidth + 'px;height:' + contentHeight + 'px;margin:auto;' + 'background-size: contain;background-position: center;background-repeat: no-repeat;background-color:rgba(0,0,0,0);'
					});
					warpTagEl.insertEl(innerDownloadEl.el);
				}
				if (containerConfig.closeAble == true) warpTagEl.insertEl(closeButtonEl);

				var htmlString =
					'<style type="text/css">' + '#' + contentID + ' .close{position: absolute;top:0px;right: 0px;font-size: ' + (cancelWidth * 2 / 3) + 'px;border-radius: 50%;background-color: red;width: ' + cancelWidth + 'px;height: ' + cancelWidth + 'px;text-align: center;line-height: ' + cancelWidth + 'px;color: white;}' + '</style>';
				var img = Util.domHelper('img').attr("src", imageUrl).bind('load', function() {
					Util.domHelper(Util.getDomById(containerID)).html(htmlString).insertEl(warpTagEl.el);
					Mediation.setImpression(result.rows[0].impressionUrl);
					Util.triggerEvent(window, 'adload', {
						"adsID": containerID,
						"adnType": "banner"
					});
					var fcaLimit = result.rows[0]['fca'];
					Mediation.addCampainToLocalStorage(campaign_ids, {
						'adnType': 'banner',
						'fcaLimit': fcaLimit
					});
				});
				var campaignChecker = {
					'0':true
				};
				var slideTime = 5000;
				function switchCampaign(campaignIndex){
					var campaign = result.rows[campaignIndex];
					var newImg = Util.domHelper('img').attr("src", campaign.imageUrl).bind('load', function() {
						
						innerDownloadEl.attr('href',campaign.clickUrl)
						.css('background-image','url("'+campaign.imageUrl+'")');

						// To Stop this impression action to rise the ECPM
						// if(!campaignChecker[campaignIndex.toString()]){
						// 	Mediation.setImpression(campaign.impressionUrl);
						// 	Mediation.addCampainToLocalStorage(campaign_ids, {
						// 		'adnType': 'banner',
						// 		'fcaLimit': campaign['fac']
						// 	});
						// }
						newImg.el.remove();

						campaignChecker[campaignIndex.toString()] = true;
						setTimeout(function(){
							var newIndex = (campaignIndex+1)%result.rows.length;
							switchCampaign(newIndex);
						},slideTime);
					});
				}
				setTimeout(function(){
					var showIndex = 1%result.rows.length;
					switchCampaign(showIndex);
				},slideTime)
				

			},
			initInterstitial: function() {},
			initOverlay: function(result, containerConfig) {
				var me = this;
				var fullScreen = containerConfig.isFullScreen;
				var isHorizontal = window.screen.availHeight > window.screen.availWidth;
				var bodyWidth = currentScreen.width;
				var bodyHeight = currentScreen.height;
				var campaign_ids = result.rows[0].campaignId; // getQueryString(result.rows[0].impressionAnalysisUrl,'campaign_ids');

				var containerWidth;
				if (fullScreen) {
					containerWidth = isViewport ? containerConfig.containerWidth - 20 : bodyWidth - 20;
				} else {
					containerWidth = isViewport ? containerConfig.containerWidth * 4 / 5 : (bodyWidth * 4 / 5);
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

				var imageUrl = result.rows[0].imageUrl;
				var actionUrl = result.rows[0].clickUrl;
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
					warpTagEl = document.createElement('a');
					warpTagEl.setAttribute('id', contentID);
					warpTagEl.setAttribute('href', actionUrl);
					warpTagEl.setAttribute('style', 'background-image:url(\'' + imageUrl + '\');width:' + contentWidth + 'px;height:' + contentHeight + 'px;position: fixed;z-index:999999;left:' + left + 'px;top:' + top + 'px;background-size: contain;background-position: center;background-repeat: no-repeat;background-color:rgba(0,0,0,0.5);');
					//warpTagEl.appendChild(closeButtonEl);
				} else {
					warpTagEl = document.createElement('div');
					warpTagEl.setAttribute('id', contentID);
					warpTagEl.setAttribute('style', 'width:' + contentWidth + 'px;position: fixed;z-index:999999;left:' + left + 'px;top:' + top + 'px;top:50%;box-shadow:0 0 10px rgba(0,0,0,.3)');
					//                var h = fnCollection.getStyle(warpTagEl,"height");
					//                alert(h);
					innerDownloadEl = document.createElement('a');
					innerDownloadEl.setAttribute('href', actionUrl);
					innerDownloadEl.setAttribute('style', 'display:block;background-image:url(\'' + imageUrl + '\');width:' + contentWidth + 'px;height:' + contentHeight + 'px;background-size: contain;background-position: center;background-repeat: no-repeat;background-color:rgba(0,0,0,0.5);');

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
						innerChangeEl.setAttribute('imglength', result.rows.length);
						innerChangeEl.setAttribute('style', 'width:100%;height:' + (changeContainerHeight + 10) + 'px;padding:10px;background-color:#FFFFFF;position:relative;border-radius:0 0 5px 5px;display:-webkit-box;box-sizing:border-box;-webkit-box-sizing:border-box;');
						innerChangePreContainerEl = document.createElement('div');
						innerChangePreContainerEl.setAttribute('style', 'width:50%;height:' + newHeight + 'px;-webkit-box-flex:1');
						innerChangePreContainerEl.setAttribute('class', 'interstitialSwitchBtnL');
						innerChangePreEl = document.createElement('a');
						// innerChangePreEl.setAttribute('href',actionUrl);  //active this will force download
						innerChangePreEl.setAttribute('target', '_self');
						innerChangePreEl.setAttribute('style', 'background:#b4b6b7;color:#FFFFFF;height:100%;width:100%;display:block;font-size:' + tipTextSize + 'px;text-align:center;text-decoration:none;border-radius:3px;margin-right:5px;line-height:' + newHeight + 'px');
						var textNode = document.createTextNode('No thanks');
						innerChangePreEl.appendChild(textNode);


						//innerChangePreEl.setAttribute('style','width:0px;height:0px;border:' + changeArrowWidth + 'px solid transparent;border-right:' + changeArrowWidth + 'px solid white;position:absolute;top:' + changeContainerHeight/10 + 'px;left:' + changeContainerHeight/10 + 'px;-webkit-transform:scale(1,0.6);');
						innerChangeNextContainerEl = document.createElement('div');

						innerChangeNextContainerEl.setAttribute('style', 'width:50%;height:' + newHeight + 'px;-webkit-box-flex:1');
						innerChangeNextContainerEl.setAttribute('class', 'interstitialSwitchBtnR');
						innerChangeNextEl = document.createElement('a');
						innerChangeNextEl.setAttribute('href', actionUrl);
						innerChangeNextEl.setAttribute('target', '_self');
						innerChangeNextEl.setAttribute('style', 'background:#41bfee;color:#FFFFFF;height:100%;width:100%;display:block;font-size:' + tipTextSize + 'px;text-align:center;text-decoration:none;border-radius:3px;margin-left:5px;line-height:' + newHeight + 'px');
						var textNode = document.createTextNode('Try it now');
						innerChangeNextEl.appendChild(textNode);

						warpTagEl.appendChild(innerChangeEl);
						warpTagEl.insertBefore(tiptext, warpTagEl.childNodes[0]);

						innerChangeEl.appendChild(innerChangePreContainerEl);
						innerChangePreContainerEl.appendChild(innerChangePreEl);
						innerChangeEl.appendChild(innerChangeNextContainerEl);
						innerChangeNextContainerEl.appendChild(innerChangeNextEl);

						function adclick(e) {
							var event = e || window.event;
							var node = event.target.tagName || event.srcElement.tagName;
							if (node.toLowerCase() === "a") {
								if(event.target.href){
									Util.triggerEvent(event.target,'click');
								}
								this.style.display = "none";
								console.log(containerConfig)
								var adContainer = document.getElementById(containerConfig.containerID);
								me.refreshCampaign(containerConfig.adnRequest,adContainer);
							}
						}

						Util.addListener(warpTagEl, "click",adclick );
						Util.addListener(warpTagEl, "touchstart",adclick );
					}


					function switchImg(step, me) {
						if (document.body.getAttribute('popup') == 'true') return;
						var parent = me.parentNode;
						var imgIndex = parseInt(parent.getAttribute('imgindefx'));
						var imgLength = parseInt(parent.getAttribute('imglength'));
						imgIndex = step < 0 ? (imgIndex > 0 ? imgIndex : imgLength) : imgIndex;
						var newIndex = step < 0 ? (imgIndex - 1) % imgLength : (imgIndex + 1) % imgLength;
						var newImg = document.createElement('img');
						var newContent = result.rows[newIndex]['content'];
						newImg.setAttribute("src", newContent);
						innerDownloadEl.style.backgroundImage = 'url(' + newContent + ')';
						Util.addListener(newImg, 'load', function() {
							parent.setAttribute('imgindex', newIndex);
							if (result.rows[newIndex]['impressionAnalysisUrl']) {
								Mediation.setImpression(result.rows[newIndex]['impressionAnalysisUrl']);
								result.rows[newIndex]['impressionAnalysisUrl'] = null;
								var campaign_ids = result.rows[newIndex]['campaignid'];
								var fcaLimit = result.rows[newIndex]['fca'];
								Mediation.addCampainToLocalStorage(campaign_ids, {
									'adnType': 'interstitial',
									'fcaLimit': fcaLimit
								});
							};
						});
					}

				}

				var htmlString =
					'<style type="text/css">' + '#' + contentID + ' .close{position: absolute;top:40px;right: 0px;font-size: ' + closeBtnFontSize + 'px;border-radius: 50%;background-color: red;width: ' + closeBtnWidth + 'px;height: ' + closeBtnWidth + 'px;text-align: center;line-height: ' + closeBtnWidth + 'px;color: rgba(0,0,0,0);}' + '#' + contentID + ' .close:before{content:" ";display:block;position:absolute;width: ' + (closeBtnWidth * 0.6) + 'px;height:2px;background-color:rgb(255,255,255);left:0px;top:' + (closeBtnWidth / 2) + 'px;left:' + (closeBtnWidth * 0.2) + 'px;-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-ms-transform: rotate(45deg);-o-transform: rotate(45deg);transform: rotate(45deg);}' + '#' + contentID + ' .close:after{content:" ";display:block;position:absolute;width: ' + (closeBtnWidth * 0.6) + 'px;height:2px;background-color:rgb(255,255,255);left:0px;top:' + (closeBtnWidth / 2) + 'px;left:' + (closeBtnWidth * 0.2) + 'px;-webkit-transform: rotate(-45deg);-moz-transform: rotate(-45deg);-ms-transform: rotate(-45deg);-o-transform: rotate(-45deg);transform: rotate(-45deg);}' + ' .interstitialSwitchBtnL:active,.interstitialSwitchBtnR:active{ background-color:rgba(20, 20, 20, 0.7); }' + '</style>';
				var img = document.createElement('img');
				img.setAttribute("src", imageUrl);
				Util.addListener(img, "load", function() {
					document.getElementById(containerID).innerHTML = htmlString;
					document.getElementById(containerID).appendChild(warpTagEl);
					//is overlay
					// if(!fullScreen){
					//     var h = parseInt(fnCollection.getStyle(warpTagEl,"height"));
					//     warpTagEl.style.marginTop = - h/2 +"px";
					// }
					Mediation.setImpression(result.rows[0].impressionUrl);
					result.rows[0].impressionUrl = null;
					Util.triggerEvent(window, 'adload', {
						"adsID": containerID,
						"adnType": "overlay"
					});
					var fcaLimit = result.rows[0]['fca'];
					Mediation.addCampainToLocalStorage(campaign_ids, {
						'adnType': 'interstitial',
						'fcaLimit': fcaLimit
					});
				});


			},
			initLoaderAd:function(param,adPlaceHolder){
				var me = this;
				var menuADScale = window.screenScale?window.screenScale:1;
				var containerID = 'aab';

				var ins = Util.domHelper('a').attr({
					'id':containerID,
					'target':'_blank'
				}).css({
					'display':'block',
					'width':'336px',
					'height':'280px',
					'position':'absolute',
					'left':'50%',
					'margin-left':'-168px',
					'top':'50%',
					'margin-top':'-140px',
					'-webkit-transform':'scale('+menuADScale+')',
					'-moz-transform':'scale('+menuADScale+')',
					'-ms-transform':'scale('+menuADScale+')',
					'-o-transform':'scale('+menuADScale+')',
					'transform':'scale('+menuADScale+')'
				}).insertTo(adPlaceHolder);

				var timescape = Date.parse(new Date()).toString();

				var adnType = 'overlay';
				var adType = 'overlay';
				var adFromType = 'wap_overlay';
				

				var callbackKey = timescape + Math.random().toString().split('.')[1];
				var adnRequest = {
					url: me.host,
					type: 'get',
					timeout: '1000',
					contentType: 'JSON',
					timestamp: true,
					callbackKey: callbackKey,
					data: {
						pf: Mediation.userConfig.platform,
						ov: Mediation.userConfig.osVersion,
						sv: Mediation.userConfig.sdkVersion,
						im: Mediation.userConfig.imei,
						mac: Mediation.userConfig.mac,
						did: Mediation.userConfig.devId||Mediation.userConfig.did,
						dm: Mediation.userConfig.deviceModel,
						ot: Mediation.userConfig.orientation,
						l: Mediation.userConfig.language,
						gpsv: Mediation.userConfig.googlePlayServiceVersion,
						aid: Mediation.userConfig.appId,
						at: adType,
						ext:'H5Link',
						sn: Mediation.userConfig.sign,
						ei: '[' + me.getIEString(Mediation.campaignArray.getData().filterByFCA().toIdString()) + ']',
						jsonp: "jsonp" + callbackKey
					},
					dataType: 'jsonp',
					success: function(data) {

						ins.css({
							'background-size':'contain',
							'background-image':'url("'+data.rows[0]['imageUrl']+'")'
						}).attr({
							'href':data.rows[0]['clickUrl']
						})
						
					},
					error:function(){
						if(me.error) me.error();
					}

				};

				if (adnRequest.dataType == "jsonp" || adnRequest.dataType == "JSONP") {
					Util.mobvistaJSONPAjax.load(adnRequest);
				} else {
					Util.mobvistaAjax(adnRequest);
				}

			},
			initText: function() {},
			initInnerFrame: function() {},
			initMarquee: function() {},

		};
		return media;
	});

	Media.weightAdapterSet['mobvista'] = function(profile){
		console.log(profile)
		var weight = {};
		var adSet = profile['weight'];
		weight['name'] = profile['name'];
		weight['type'] = profile['name'];
		weight['ver'] = profile['ver'];
		weight['host'] = profile['url'];
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