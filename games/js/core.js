// (function() {

var host = "http://net.rayjump.com/site_request.php?";
var cookieHost = 'cookie.min.html';
var mediationHost = 'http://net.rayjump.com/site/profile';
var defaultMedia = window.basePath?basePath+'js/profile.json':'js/profile.json';
var isViewport = false;
var currentScreen = {
	width: 0,
	height: 0
};

var Mediation = {
	userConfig: {
		sign: null,
		appId: null,
		did: null,
		platform: 'site',
		osVersion: null,
		sdkVersion: '1.0.0',
		imei: null,
		mac: null,
		devId: null,
		deviceModel: null,
		orientation: 1,
		language: 'en',
		googlePlayServiceVersion: null,
		adType: null,
		excludeIds: ''
	},
	currentMedia:null,
	mediaWeightArray: [],
	init: function(param) {
		var me = this;
		me.userConfig.sign = Util.getQueryString(window.location.href, 's');
		me.userConfig.appId = Util.getQueryString(window.location.href, 'appId')||Util.getQueryString(window.location.href, 'appid');
		me.userConfig.sign = me.userConfig.sign||'668d571bff3dc16a26ad81642c64504d';
		me.userConfig.appId = me.userConfig.appId ||'17019';
		me.userConfig.did = Util.getQueryString(window.location.href, 'did');

		if(me.mediaWeightArray.length==0){
			var timescape = Date.parse(new Date()).toString();
			var callbackKey = timescape + Math.random().toString().split('.')[1];
			Util.mobvistaJSONPAjax.load({
				url: mediationHost+'?',
				type: 'get',
				timeout: '1000',
				contentType: 'JSON',
				timestamp: true,
				dataType: 'jsonp',
				data:{
					app_id:me.userConfig.appId,
					sign:me.userConfig.sign,
					jsonp: "jsonp" + callbackKey
				},
				success: function(result) {
					// console.log(result)
					if(result.msg=='success'){
						me.initMedia(result,param);
						var mediaName = result.data[0]['name'];
						if (ga) ga('send', 'event', 'load', 'profile_success', 'load mediation success:'+mediaName+'-'+me.userConfig.appId);
					}else if(result.status==-1){
						// me.defaultMedia(param,'mobvista');
						me.defaultMedia(param);
						if (ga) ga('send', 'event', 'load', 'profile_no_mediation', 'checked no mediation:'+me.userConfig.appId);
					}else if(result.status==-4){
						me.defaultMedia(param);
						if (ga) ga('send', 'event', 'load', 'profile_checked_faile', 'checked faile:'+me.userConfig.appId);
					}else{
						me.defaultMedia(param);
						if (ga) ga('send', 'event', 'load', 'profile_checked_faile_others', 'checked faile others:'+me.userConfig.appId);
					}

					if(param.callback) param.callback();
					
				},
				error:function(){
					me.defaultMedia(param);
					if(param.callback) param.callback();
					if (ga) ga('send', 'event', 'load', 'profile_connect_faile', 'connect faile:'+me.userConfig.appId);
				}
			});
		}else{
			me.getParams();
			var sortWeight = me.sortMediaWeightByAdnType(me.mediaWeightArray,param);
			var weightArray = me.getWeight(sortWeight);
			me.initByMediation(weightArray, param);
			if(param.callback) param.callback();
		}
		

	},
	defaultMedia: function(param,mediaType){
		var me = this;
		Util.mobvistaAjax({
			url: defaultMedia+'?app_id='+me.userConfig.appId+'&sign='+me.userConfig.sign,
			type: 'get',
			timeout: '1000',
			contentType: 'JSON',
			timestamp: true,
			dataType: 'json',
			success: function(result) {
				if(mediaType=='mobvista'){
					for(var i=0;i<result.data.length;i++){
						if(result.data[i].name=='mobvista'){
							result.data[i]['weight']['banner']['weight']=7;
							result.data[i]['weight']['overlay']['weight']=7;
						}
					}
					me.initMedia(result,param);
				}else{
					me.userConfig.appId = result.data[1].appID;
					me.userConfig.sign = result.data[1].pubID;
					me.initMedia(result,param);
				}
				
			}
		});
	},
	initMedia: function(result,param){
		var me = this;
		me.getParams();
		me.mediaWeightArray = Media.weightAdapter(result.data);
		var sortWeight = me.sortMediaWeightByAdnType(me.mediaWeightArray,param);
		var weightArray = me.getWeight(sortWeight);
		me.initByMediation(weightArray, param);

	},
	sortMediaWeightByAdnType:function(weightArray, param){
		if(!param.adnType) return weightArray;
		var sortAdnType = param.adnType;
		function sortBy(obj1,obj2){
			if(obj1.weight&&obj2.weight){
				if(obj1.weight[sortAdnType]&&obj2.weight[sortAdnType]){
					return obj2.weight[sortAdnType].weight - obj1.weight[sortAdnType].weight;
				}else if(obj1.weight[sortAdnType]){
					return -1;
				}else{
					return 1;
				}
			}else if(obj1.weight){
				return -1;
			}else{
				return 1;
			}
		}
		return weightArray.sort(sortBy);
	},
	getWeight: function(weightArray) {
		var weightString = Util.getQueryString(window.location.href, 'weight');
		if (weightString && weightString.indexOf('[') > -1 && weightString.indexOf(']') > -1) weightString = weightString.substr(1, weightString.length - 2);
		var userWeightArray = [];
		var newWeightArray = [];
		try {
			userWeightArray = weightString.split(',');
		} catch (e) {
			userWeightArray = [];
		}
		if(window.isdebug) console.log(userWeightArray)
		for (var i = 0; i < userWeightArray.length; i++) {
			for (var j = 0; j < weightArray.length; j++) {
				if (weightArray[j]['type'] == userWeightArray[i]) {
					var tempWeight = weightArray.splice(j, 1);
					newWeightArray = newWeightArray.concat(tempWeight);
				}
			}
		}
		return newWeightArray.concat(weightArray);
	},
	initByMediation: function(mediaWeightArray, param) {
		if (mediaWeightArray.length <= 0) return;
		var me = this;
		var weight = mediaWeightArray.shift();
		weight.mediaId = param ? param.mediaId : 'mdeiaId_' + (new Date()).toString();
		weight.isAutoShow = (param && param.isAutoShow == false) ? false : true;
		weight.adnType = (param && param.adnType) ? param.adnType : 'all';
		if (param&&param.initByTag!=true) {weight.initConfig = param;}else{weight.initConfig = null;}
		weight.callback = function() {
			console.log(weight.type + ' Init');
		};
		weight.error = function() {
			me.initByMediation(mediaWeightArray, param);
		};

		me.currentMedia = Media.init(weight);
	},
	getParams: function() {
		var me = this;
		var url = window.location.href;
		me.userConfig.osVersion = Util.getQueryString(url, 'osVersion') || '';
		me.userConfig.imei = Util.getQueryString(url, 'imei') || '';
		me.userConfig.mac = Util.getQueryString(url, 'mac') || '';
		me.userConfig.devId = Util.getQueryString(url, 'devId') || '';
		me.userConfig.deviceModel = Util.getQueryString(url, 'deviceModel') || '';
		me.userConfig.orientation = window.screen.height > window.screen.width ? 1 : 2;
		me.userConfig.language = navigator.language;
		me.userConfig.googlePlayServiceVersion = Util.getQueryString(url, 'googlePlayServiceVersion') || '';



		return me.userConfig;
	},
	getAds: function() {},
	setImpression: function(url) {
		var imp = Util.domHelper('iframe')
			.attr('style', 'position:absolute;left:-1;top:-1;width:1px;height:1px;')
			.attr('src', url).insertTo(document.body);

	},
	campaignArray: {
		arrayId: [],
		arrayObj: [],
		toIdString: function() {
			var idString = '';
			for (var index in this.arrayId) {
				idString += (this.arrayId[index] + ',');
			}
			idString = this.arrayId.length > 0 ? idString.substr(0, idString.length - 1) : '';

			return idString;
		},
		getData: function() {
			this.arrayId = [];
			this.arrayObj = [];
			var campaignObj = Util.getLocalStorage('campaign_ids');
			for (var index in campaignObj) {
				if (!campaignObj[index]['campaign_ids']) continue;
				this.arrayId.push(campaignObj[index]['campaign_ids']);
				this.arrayObj.push(campaignObj[index]);
			}
			return this;
		},
		filterByFCA: function() {
			var newArrayId = [];
			var newArrayObj = [];
			for (var i in this.arrayObj) {
				var campaignObj = this.arrayObj[i];

				if (campaignObj['fca'] && (campaignObj['fca']['count'] > campaignObj['fca']['limit'])) {
					newArrayId.push(this.arrayId[i]);
					newArrayObj.push(this.arrayObj[i]);
				}
				if(window.isdebug) console.log('id = ' + campaignObj['campaign_ids'] + ', count = ' + campaignObj['fca']['count']);
			}
			this.arrayId = newArrayId;
			this.arrayObj = newArrayObj;
			return this;
		},
		filterByTime: function(dayCount, diffType) {

			var newArrayId = [];
			var newArrayObj = [];
			for (var i in this.arrayObj) {
				var campaignObj = this.arrayObj[i];

				if (Util.dateDiff(new Date(), new Date(campaignObj['impressionLastData']), diffType) <= dayCount) {
					newArrayId.push(this.arrayId[i]);
					newArrayObj.push(this.arrayObj[i]);
				}
			}
			this.arrayId = newArrayId;
			this.arrayObj = newArrayObj;
			return this;
		},
		filterByCount: function(impressionCount) {
			var newArrayId = [];
			var newArrayObj = [];
			for (var i in this.arrayObj) {
				var campaignObj = this.arrayObj[i];
				if (campaignObj['impressionCount'] <= impressionCount) {
					newArrayId.push(this.arrayId[i]);
					newArrayObj.push(this.arrayObj[i]);
				}
			}
			this.arrayId = newArrayId;
			this.arrayObj = newArrayObj;
			return this;
		},
		filterByAdnType: function(adnType) {
			var newArrayId = [];
			var newArrayObj = [];
			for (var i in this.arrayObj) {
				var campaignObj = this.arrayObj[i];
				if (campaignObj['adnType'] == adnType) {
					newArrayId.push(this.arrayId[i]);
					newArrayObj.push(this.arrayObj[i]);
				}
			}
			this.arrayId = newArrayId;
			this.arrayObj = newArrayObj;
			return this;
		}
	},
	onAdding: false,
	objectActionArray: [],
	addCampainToLocalStorage: function(campaign_ids, value) {
		var me = this;
		var key = 'campaign_ids';
		var date = new Date();
		value['campaign_ids'] = campaign_ids;
		value['impressionCount'] = 1;
		value['impressionLastData'] = date.toString();
		var fcaLimit = value['fcaLimit'] ? value['fcaLimit'] : -1;
		delete value['fcaLimit'];
		value['fca'] = {
			"limit": fcaLimit,
			"firstTime": date.toString(),
			"count": 1
		}
		me.objectActionArray.push({
			'key': key,
			'index': campaign_ids + value.adnType,
			'value': value
		});
		if (me.onAdding == false) {
			me.doObjectAction();
		}
	},
	doObjectAction: function() {
		var me = this;
		me.onAdding = true;
		var action = me.objectActionArray.pop();
		if (action) {
			var tempObj = Util.getLocalStorage(action.key);
			if (!tempObj) tempObj = {};
			if (tempObj[action.index]) {
				action['value']['impressionCount'] = tempObj[action.index]['impressionCount'] + 1;
				if (tempObj[action.index]['fca']) {
					var currentDate = new Date(action['value']['fca']['firstTime']);
					var firstDate = new Date(tempObj[action.index]['fca']['firstTime']);
					if (Util.dateDiff(currentDate, firstDate, 'day') < 1) {
						action['value']['fca']['count'] += tempObj[action.index]['fca']['count'];
						action['value']['fca']['firstTime'] = tempObj[action.index]['fca']['firstTime'];
					}
				}

			}
			tempObj[action.index] = action.value;
			Util.setLocalStorage(action.key, tempObj);
			setTimeout(function() {
				me.doObjectAction();
			}, 100);
		} else {
			me.onAdding = false;
		}

	},
	addToLocalStorage: function(key, value) {
		var me = this;
		me.objectActionArray.push({
			'key': key,
			'index': index,
			'value': value
		});
		if (me.onAdding == false) {
			me.doObjectAction();
		}
	}
};


// })();


var Media = {
	_mediaObjSet: {},
	type: null,
	_mediaBaseSet: {},
	weightAdapterSet:{},
	init: function(param) {
		var me = this;
		if (!me._mediaBaseSet[param.type]) {
			param.error();
			return this;
		}
		me.type = param.type;

		Util.initCookie();
		isViewport = Util.hasViewport();
		currentScreen = Util.getScreenSize();

		var mediaId = param.mediaId || 'mediaId_' + (new Date().toString());
		param.mediaId = mediaId;
		me._mediaObjSet[mediaId] = me._mediaBaseSet[param.type]();
		me._mediaObjSet[mediaId].mediaId = mediaId;
		me._mediaObjSet[mediaId].ready = false;
		me._mediaObjSet[mediaId].init(param);
		return me._mediaObjSet[mediaId];
	},
	getMedia: function(mediaId) {
		return this._mediaObjSet[mediaId];
	},
	install: function(type, media) {
		this._mediaBaseSet[type] = media;
		return this;
	},
	weightAdapter:function(orgWeightArray){
		var me = this;
		var newWeightArray = [];
		for(var i=0;i<orgWeightArray.length;i++){
			var mediaType = orgWeightArray[i].name;
			if(me.weightAdapterSet[mediaType]){
				newWeightArray.push(
					me.weightAdapterSet[mediaType](orgWeightArray[i])
				);
			}
		}
		return newWeightArray;
	}

};


(function() {
	var mediaType = 'mobfox';
	Media.install(mediaType, function() {

		var media = {
			type: mediaType,
			host: null,
			jsUrl: null,
			ready: false,
			"data-ad-client": null,
			"data-ad-slot": null,
			error: null,
			init: function(param) {
				var me = this;
				me.error = param.error;
				me.jsUrl = param.jsUrl;
				var scriptDom = Util.domHelper('script').attr({
					'async': 'true',
					'src': me.jsUrl
				}).insertTo(document.body);

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
				me['data-ad-slot'] = param['data-ad-slot'];

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
					containerConfig: containerConfig,
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
					adPlaceHolder: adnObj,
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
						me.initOverlay(containerConfig, adPlaceHolder);
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
						me.initCornerFloat(containerConfig, size, position, adPlaceHolder);
						break;
				}
			},
			initCornerFloat: function(containerConfig, size, position, adPlaceHolder) {
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

				}
				if (containerConfig.closeAble == true) warpTagEl.insertEl(closeButtonEl);
				Util.domHelper(Util.getDomById(containerID)).insertEl(warpTagEl.el);


				warpTagEl.bind('DOMNodeInserted', function() {
					var adsenseFrame = warpTagEl.el.querySelector('iframe');
					if(window.isdebug) console.log(warpTagEl.el)
					if(window.isdebug) console.log(adsenseFrame);
					Util.addListener(adsenseFrame, 'load', function() {
						if (me.checkAdIsload(warpTagEl.el)) {
							console.log('adload success');
						} else {
							console.log('adload faile');
							Util.replaceEach(adPlaceHolder, warpTagEl.el.parentElement);
							warpTagEl.remove();
							me.error();
						}
					});
				});

				var iframe = Util.domHelper('iframe').attr('src', 'template/mobfox_banner.html??jsUrl=' + me.jsUrl).insertTo(warpTagEl.el);

			},
			initOverlay: function(containerConfig, adPlaceHolder) {
				var me = this;
				var fullScreen = containerConfig.isFullScreen;
				var isHorizontal = window.screen.availHeight > window.screen.availWidth;
				var bodyWidth = currentScreen.width;
				var bodyHeight = currentScreen.height;

				var containerWidth;
				if (fullScreen) {
					containerWidth = bodyWidth - 20;
				} else {
					containerWidth = (bodyWidth * 4 / 5);
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
						'width': '100%',
						'height': '100%'
					}).attr('src', 'template/mobfox_interstitial.html??jsUrl=' + me.jsUrl).insertTo(innerDownloadEl)
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

						if(window.isdebug) console.log(innerDownloadEl)
						if (me.checkAdIsload(innerDownloadEl)) {
							//load success
							var adTagLink = iframe.el.contentWindow.document.querySelector('a');
							textNode.parentElement.setAttribute('href', adTagLink.href);

						} else {
							console.log('adload faile');
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
				if(window.isdebug) console.log(adDom)
				if (adLink || adDom) {
					console.log(adLink)
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

	Media.weightAdapterSet['mobfox'] = function(profile){
		var weight = {};
		var adSet = profile['weight'];
		weight['name'] = profile['name'];
		weight['type'] = profile['name'];
		weight['ver'] = profile['ver'];
		weight['jsUrl'] = profile['url'];
		weight['state'] = profile['state'];
		weight['data-ad-client'] = profile['pubID'];
		weight['data-ad-slot'] = adSet['banner']['unitID'];
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


(function() {
	var mediaType = 'adcash';
	Media.install(mediaType, function() {

		var media = {
			type: mediaType,
			host: null,
			jsUrlBanner: null,
			jsUrlInterstitial: null,
			ready: false,
			error: null,
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
					containerConfig: containerConfig,
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
					adPlaceHolder: adnObj,
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
						me.initOverlay(containerConfig, adPlaceHolder);
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
						me.initCornerFloat(containerConfig, size, position, adPlaceHolder);
						break;
				}
			},
			initCornerFloat: function(containerConfig, size, position, adPlaceHolder) {
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

				var centerLeft = '50%;margin-left:-' + Math.floor(containerWidth / 2);
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


					if(window.isdebug) console.log(warperStyleString)

				}
				if (containerConfig.closeAble == true) warpTagEl.insertEl(closeButtonEl);
				Util.domHelper(Util.getDomById(containerID)).insertEl(warpTagEl.el);



				warpTagEl.bind('DOMNodeInserted', function() {
					var adcashFrame = warpTagEl.el.querySelector('iframe');
					Util.addListener(adcashFrame, 'load', function() {
						if (me.checkAdIsload(warpTagEl.el)) {
							console.log('adload success');
						} else {
							console.log('adload faile');
							Util.replaceEach(adPlaceHolder, warpTagEl.el.parentElement);
							warpTagEl.remove();
							me.error();
						}
					});
				});

				var iframe = Util.domHelper('iframe').attr('src', 'template/adcash_banner.html??jsUrl=' + me.jsUrlBanner).insertTo(warpTagEl.el);

			},
			initOverlay: function(containerConfig, adPlaceHolder) {
				var me = this;
				var fullScreen = containerConfig.isFullScreen;
				var isHorizontal = window.screen.availHeight > window.screen.availWidth;
				var bodyWidth = currentScreen.width;
				var bodyHeight = currentScreen.height;

				var containerWidth;
				if (fullScreen) {
					containerWidth = bodyWidth - 20;
				} else {
					containerWidth = (bodyWidth * 4 / 5);
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
						'width': '100%',
						'height': '100%'
					}).attr('src', 'template/adcash_interstitial.html??jsUrl=' + me.jsUrlInterstitial).insertTo(innerDownloadEl)
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

						if (me.checkAdIsload(innerDownloadEl)) {
							//load success
							var adTagLink = iframe.el.contentWindow.document.querySelector('a');
							textNode.parentElement.setAttribute('href', adTagLink.href);

						} else {

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
				if (adLink || adDom) {
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


(function() {
	Media.install('mobvista', function() {

		var media = {
			type: 'mobvista',
			host: null,
			sign: null,
			site_id: null,
			ready: false,
			error:null,
			excludeCampain: null,
			init: function(param) {
				var me = this;
				me.host = param.host;
				if(param.error) me.error = param.error;
				if (param.excludeCampain) me.excludeCampain = param.excludeCampain;
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

			getIEString: function(ieString) {
				var me = this;
				var excludeCampain = me.excludeCampain ? me.excludeCampain.toString() : '';
				if (ieString && ieString.length > 0) excludeCampain = (excludeCampain.length > 0) ? excludeCampain + ',' + ieString : ieString;
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
						ext: 'H5Link',
						sn: Mediation.userConfig.sign,
						ei: '[' + me.getIEString(Mediation.campaignArray.getData().filterByFCA().toIdString()) + ']',
						jsonp: "jsonp" + callbackKey
					},
					dataType: 'jsonp',
					success: function(data) {
						if(window.isdebug) console.log(data);

						data.rows = me.randomCampaignArray(data.rows);
						/* for replacing the mobvista tag with new adn container */
						mobvistaADNContainer.insertTo(document.body);
						// Util.replaceEach(mobvistaADNContainer.el, config);
						var containerConfig = (adnType == 'popunder' || adnType == 'popup') ? false : {
							containerWidth: document.getElementById(containerID).clientWidth,
							containerHeight: document.getElementById(containerID).clientHeight,
							containerID: containerID,
							adnRequest: adnRequest,
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
						ext: 'H5Link',
						sn: Mediation.userConfig.sign,
						ei: '[' + me.getIEString(Mediation.campaignArray.getData().filterByFCA().toIdString()) + ']',
						jsonp: "jsonp" + callbackKey
					},
					dataType: 'jsonp',
					success: function(data) {
						if(window.isdebug) console.log(data)
						data.rows = me.randomCampaignArray(data.rows);
						/* for replacing the mobvista tag with new adn container */

						Util.replaceEach(mobvistaADNContainer.el, adnObj);
						var containerConfig = (adnType == 'popunder' || adnType == 'popup') ? false : {
							containerWidth: document.getElementById(containerID).clientWidth,
							containerHeight: document.getElementById(containerID).clientHeight,
							containerID: containerID,
							adnRequest: adnRequest,
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
			randomCampaignArray: function(campaignArray) {
				if (!campaignArray || !campaignArray.length || campaignArray.length == 0) return [];
				var newArray = [];
				var campaignArrayLength = campaignArray.length;
				var checkedObj = {};
				var randomIndex = Math.floor(Math.random() * campaignArrayLength);
				while (newArray.length < campaignArrayLength) {
					if (!checkedObj[randomIndex]) {
						newArray.push(campaignArray[randomIndex]);
						checkedObj[randomIndex] = true;
					}
					randomIndex = Math.floor(Math.random() * campaignArrayLength);
				}
				return newArray;
			},
			refreshCampaign: function(adnRequest, mobvistaADNContainer) {
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
			initSlideCornerFloat: function(result, containerConfig, size, position,isAnimate) {

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
				var maskEl = Util.domHelper('a').attr({
					'id':'bannerMask',
					'href':innerDownloadEl.attr('href'),
					'style':innerDownloadEl.attr('style')
				}).css({
					'position':'absolute',
					'display':'block',
					'top':'0px',
					'left':'50%',
					'margin-left':(-0.5*contentWidth)+'px',
					'z-index':'999',
					'transition-property':'all',
					'transition-duration':'0.5s'
				}).bind('transitionend',function(){
					maskEl.css({
						'display':'none'
					}).el.className='';
					if(window.isdebug) console.log('swith')
				});

				var animateCssString = Util.cssHelper('#bannerMask.up').css({
					'transform':'translate(0,-'+contentHeight+'px)'
				}).getCssString();
				var animateCss = Util.domHelper('style').html(animateCssString);
				document.body.appendChild(animateCss.el);

				warpTagEl.insertEl(maskEl.el).css('overflow','hidden');
				function switchCampaign(campaignIndex){
					var currentUrl = innerDownloadEl.el.style['backgroundImage'];
					
					maskEl.attr({
						'href':innerDownloadEl.attr('href'),
						'style':innerDownloadEl.attr('style')
					}).css({
						'display':'block'
					});
					
					var campaign = result.rows[campaignIndex];
					var newImg = Util.domHelper('img').attr("src", campaign.imageUrl).bind('load', function() {
						setTimeout(function(){
							maskEl.el.className = 'up';
						},10);
						
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

var Util = {
	domHelper: function(domPath) {
		var me = this;
		var innerCss = me.cssHelper();
		var dom;
		if ((typeof domPath) == 'string') {
			dom = document.createElement(domPath);
		} else if (domPath.el) {
			dom = domPath.el;
		} else if (Util.isDom(domPath)) {
			dom = domPath;
		}

		var domObj = {
			el: dom,
			innerCss: innerCss,
			bind: function(e, fn) {
				var element = this.el;
				me.addListener(element, e, fn);
				return this;
			},
			unbind: function(e, fn) {
				var element = this.el;
				me.removeListener(element, e, fn);
				return this;
			},
			trigger: function(e, data) {
				var element = this.el;
				me.triggerEvent(element, e, data);
				return this;
			},
			attr: function(attrsOrKey, value) {
				if (arguments.length == 1 && (typeof attrsOrKey === 'object')) {
					for (var key in attrsOrKey) {
						this.el.setAttribute(key, attrsOrKey[key]);
					}
					return this;
				} else if (arguments.length == 1) {
					return this.el.getAttribute(attrsOrKey);
				} else {
					this.el.setAttribute(attrsOrKey, value);
					return this;
				}
			},
			css: function() {
				this.innerCss.css.apply(this.innerCss, arguments);
				this.innerCss.addStyleToDom(this.el);
				return this;
			},
			startAnimate: function(isAll) {
				this.innerCss.addStyleToDom(this.el, !isAll);
				return this;
			},
			insertTo: function(container) {
				var warpEl = (container.el && container.el.appendChild) ? container.el : container;
				warpEl.appendChild(this.el);
				return this;
			},
			insertEl: function(innerDom) {
				var innerEl = (innerDom.el) ? innerDom.el : innerDom;
				this.el.appendChild(innerEl);
				return this;
			},
			size: function() {
				var width = this.el.clientWidth;
				var height = this.el.clientHeight;
				return {
					width: width,
					height: height
				};
			},
			html: function(insertHTML) {
				if (insertHTML) {
					this.el.innerHTML = insertHTML;
					return this;
				} else {
					return this.el.innerHTML;
				}
			},
			text: function(insertText) {
				if (insertText) {
					this.el.innerText = insertText;
					return this;
				} else {
					return this.el.innerText;
				}
			},
			appendText: function(text) {
				var warp = document.createElement('span');
				warp.innerText = text;
				this.el.appendChild(warp);
				return this;
			},
			remove: function() {
				if(this.el.parentElement){
					this.el.parentElement.removeChild(this.el);
				}else{
					this.el.remove();
				}
				return this;
			}
		};
		return domObj;
	},
	cssHelper: function(cssPath) {
		var animateKey = 'animate' + new Date().getTime();
		var cssObj = {
			path: cssPath,
			animateName: animateKey,
			mode: {
				'animation-duration': '1s',
				'animation-timing-function': 'ease',
				'animation-delay': '0s',
				'animation-iteration-count': '1',
				'animation-direction': 'normal',
				'animation-play-state': 'running',
				'animation-fill-mode': 'forwards'
			},
			css3Warper: ['-webkit-', '-moz-', '-ms-', '-o-', ''],
			styleMap: {},
			animateMap: {},
			animateMode: function(modeConfig) {
				if (!modeConfig) return this.mode;
				this.mode = modeConfig;
				return this;
			},
			css: function(actionsOrKey, value) {
				if (arguments.length == 1 && (typeof actionsOrKey === 'object')) {
					for (var key in actionsOrKey) {
						this.styleMap[key] = actionsOrKey[key];
					}
					return this;
				} else if (arguments.length == 1) {
					return this.styleMap[actionsOrKey];
				} else {
					this.styleMap[actionsOrKey] = value;
					return this;
				}
			},
			transformCssKey:function(key){
				var newKey = '';
				var keyWordArray = key.split('-');
				for(var i=0,iMax=keyWordArray.length;i<iMax;i++){
					if(i==0){
						newKey+=keyWordArray[i];
					}else{
						newKey+=keyWordArray[i].charAt(0).toUpperCase() + keyWordArray[i].slice(1); 
					}
				}
				console.log(newKey);
				return newKey;
			},
			animate: function(step, actionsOrKey, value) {
				if (arguments.length == 2 && (typeof actionsOrKey === 'string')) { //get value
					if (this.animateMap[step]) return this.animateMap[step][actionsOrKey];
					return null;
				} else if (arguments.length == 2 && (typeof actionsOrKey === 'object')) {
					if (!this.animateMap[step]) this.animateMap[step] = {};
					for (var key in actionsOrKey) {
						this.animateMap[step][key] = actionsOrKey[key];
					}
					return this;
				} else if (arguments.length > 2) {
					if (!this.animateMap[step]) this.animateMap[step] = {};
					this.animateMap[step][actionsOrKey] = value;
					return this;
				} else if (arguments.length == 1) {
					return this.animateMap[step];
				} else {
					return null;
				}
			},
			getCssString: function(config) {
				var stringHeader = '<style type="text/css">';
				var stringFooter = '</style>';
				var hasStyle = false;
				var hasAnimate = false;

				var styleString = this.path + '{';
				for (var key in this.styleMap) {
					hasStyle = true;
					styleString += (key + ':' + this.styleMap[key] + ';');
				}

				var animateString = this.animateName + '{';
				for (var step in this.animateMap) {
					hasAnimate = true;
					animateString += (step + ' {');
					var action = this.animateMap[step];
					for (var aniKey in action) {
						animateString += aniKey + ':' + action[aniKey] + ';'
					}
					animateString += '} ';
				}
				animateString += '} ';
				var animateFinalString = '';
				for (var i = 0; i < this.css3Warper.length; i++) {
					animateFinalString += ' @' + this.css3Warper[i] + 'keyframes ' + animateString;
				}


				var finalStyleString = '';
				if (hasStyle == true) finalStyleString += styleString;
				if (hasAnimate == true) {
					var modeString = '';
					if (typeof this.mode == 'string') {
						modeString = this.mode;
					} else {
						for (var mi in this.mode) {
							modeString += (' ' + this.mode[mi]);
						}
					}
					for (var is = 0; is < this.css3Warper.length; is++) {
						finalStyleString += (this.css3Warper[is] + 'animation:' + this.animateName + ' ' + modeString + ';');
					}
					finalStyleString += '} ';
					finalStyleString += animateFinalString;
				} else {
					finalStyleString += '} ';
				}

				if (config && (config['withStyleTag'] == true)) return stringHeader + finalStyleString + stringFooter;
				return finalStyleString;
			},
			addStyleToDom: function(dom, isOnlyAnimate) {
				var stringHeader = '<style type="text/css">';
				var stringFooter = '</style>';
				var styleString = '';
				var hasStyle = false;
				var hasAnimate = false;
				for (var key in this.styleMap) {
					hasStyle = true;
					// styleString+=(key+':'+this.styleMap[key]+';');
					if (!isOnlyAnimate) dom.style[this.transformCssKey(key)] = this.styleMap[key];
				}

				var animateString = '';
				for (var i = 0; i < this.css3Warper.length; i++) {
					animateString += ' @' + this.css3Warper[i] + 'keyframes ' + this.animateName + '{';
					for (var step in this.animateMap) {
						hasAnimate = true;
						animateString += (step + ' {');
						var action = this.animateMap[step];
						for (var aniKey in action) {
							animateString += this.css3Warper[i] + aniKey + ':' + action[aniKey] + ';';
						}
						animateString += '} ';
					}
					animateString += '} ';
				}

				var animateFinalString = animateString;

				var finalStyleString = '';


				if (hasAnimate == true) {
					var modeString = '';
					if (typeof this.mode == 'string') {
						modeString = this.mode;
						for (var is = 0; is < this.css3Warper.length; is++) {

							dom.style[this.transformCssKey(this.css3Warper[is] + 'animation')] = this.animateName + ' ' + modeString;
						}
					} else {
						for (var is = 0; is < this.css3Warper.length; is++) {
							for (var mi in this.mode) {
								dom.style[this.transformCssKey(this.css3Warper[is] + mi)] = this.mode[mi];
							}
							dom.style[this.transformCssKey(this.css3Warper[is] + 'animation-name')] = this.animateName;
						}
					}
					finalStyleString = stringHeader + animateFinalString + stringFooter;
					var cssDom = document.createElement('div');
					cssDom.className = 'cssContainer';
					cssDom.style.display = 'none';
					cssDom.innerHTML = finalStyleString;
					document.head.appendChild(cssDom);
				}

			}
		};
		return cssObj;
	},

	mobvistaCookie: {
		init: function() {
			var user;
			var isNew = this.getCookie('mobvistaUUID');
			if (isNew != null && isNew.length > 0) {
				user = isNew
			} else {

				this.setCookie('mobvistaUUID', this.createUUID(), this.getHowManyYear(2));
				user = this.getCookie('mobvistaUUID');
				if(window.isdebug) console.log("it's new");
			};
			if(window.isdebug) console.log(user);
			return user;
		},
		getCookie: function(c_name) {
			if (document.cookie.length > 0) { //先查询cookie是否为空，为空就return ""
				c_start = document.cookie.indexOf(c_name + "=") //通过String对象的indexOf()来检查这个cookie是否存在，不存在就为 -1
				if (c_start != -1) {
					c_start = c_start + c_name.length + 1 //最后这个+1其实就是表示"="号啦，这样就获取到了cookie值的开始位置
					c_end = document.cookie.indexOf(";", c_start) //其实我刚看见indexOf()第二个参数的时候猛然有点晕，后来想起来表示指定的开始索引的位置...这句是为了得到值的结束位置。因为需要考虑是否是最后一项，所以通过";"号是否存在来判断
					if (c_end == -1) c_end = document.cookie.length;
					return unescape(document.cookie.substring(c_start, c_end)) //通过substring()得到了值。想了解unescape()得先知道escape()是做什么的，都是很重要的基础，想了解的可以搜索下，在文章结尾处也会进行讲解cookie编码细节	　　　　　　
				}
			}
			return "";
		},
		setCookie: function(c_name, value, expiredays, domain, path) {
			//使用方法：setCookie('username','Darren',30)　
			var cookieString = '';
			var exdate = new Date();
			exdate.setDate(exdate.getDate() + expiredays);
			cookieString = c_name + "=" + escape(value);
			cookieString += (expiredays == null) ? "" : ";expires=" + expiredays.toGMTString();
			cookieString += (domain == null) ? "" : ";domain=" + domain;
			cookieString += (path == null) ? "" : ";path=" + path;
			document.cookie = cookieString;
			if(window.isdebug) console.log(document.cookie);
		},
		getHowManyYear: function(count) {
			var _date = new Date();
			if(window.isdebug) console.log(_date.getDate() + (365 * count))
			_date.setDate(_date.getDate() + (365 * count));
			if(window.isdebug) console.log(_date.toGMTString())
			return _date;
		},
		createUUID: (function(uuidRegEx, uuidReplacer) {
			return function() {
				return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(uuidRegEx, uuidReplacer).toUpperCase();
			};
		})(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0,
				v = c == "x" ? r : (r & 3 | 8);
			return v.toString(16);
		})

	},
	replaceEach: function(newNode, oldNode, isExchange) {

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

	},
	getDomTags: function(tagName) {
		return document.getElementsByTagName(tagName);
	},
	getDomById: function(id) {
		return document.getElementById(id);
	},
	isDom: (typeof HTMLElement === 'object') ?
		function(obj) {
			return obj instanceof HTMLElement;
		} : function(obj) {
			return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
		},
	addListener: function(element, e, fn) {
		if (element.addEventListener) {
			element.addEventListener(e, fn, false);
		} else {
			element.attachEvent("on" + e, fn);
		}
	},
	removeListener: function(element, e, fn) {
		if (element.removeEventListener) {
			element.removeEventListener(e, fn, false);
		} else {
			element.detachEvent("on" + e, fn);
		}
	},
	triggerEvent: function(element, e, data) {
		if (document.fireEvent) {
			var event = document.createEventObject();
			event.eventType = 'message';
			event.data = data;
			//触发document上绑定的自定义事件ondataavailable  
			document.fireEvent('on' + e, event);
		} else if (document.createEvent) {
			//调用document对象的 createEvent 方法得到一个event的对象实例。
			var event = document.createEvent('HTMLEvents');
			// initEvent接受3个参数：  
			// 事件类型，是否冒泡，是否阻止浏览器的默认行为  
			event.initEvent(e, false, true);
			event.eventType = 'message';
			event.data = data;
			element.dispatchEvent(event);
		}

	},
	cancelBubble: function(evt){
		var e=(evt)?evt:window.event;  
		if (window.event) {  
			e.cancelBubble=true;  
		} else {  
			//e.preventDefault();  
			e.stopPropagation();  
		}  
	},
	getScreenSize: function() {
		var testWidthEl = this.domHelper('div')
			.attr('style', 'display:block;position:fixed;left:0px;right:0px;top:0px;bottom:0px;visibility:hidden;z-index:99999;')
			.insertTo(window.document.body);
		var screenWidth = testWidthEl.el.clientWidth;
		var screenHeight = testWidthEl.el.clientHeight;
		testWidthEl.remove();
		return {
			width: screenWidth,
			height: screenHeight
		};
	},
	hasViewport: function() {
		var viewports = document.getElementsByName('viewport');
		for (var i = 0, iMax = viewports.length; i < iMax; i++) {
			if (viewports[i].tagName.toUpperCase() == 'META') {
				return true;
			}
		}
		return false;
	},
	initCookie: function() {
		var user = this.mobvistaCookie.init();
		if(window.isdebug) console.log('user is ' + user);
		if ((!Mediation.userConfig.did) || (Mediation.userConfig.did.length == 0)) Mediation.userConfig.did = user;
	},
	setLocalStorage: function(key, value) {
		if (!localStorage) return;
		try {
			var objString = JSON.stringify(value);
			localStorage[key] = objString;
		} catch (e) {};
	},
	getLocalStorage: function(key) {
		if (!localStorage) return null;
		var obj = localStorage[key];
		if (obj != null) {
			return JSON.parse(obj);
		} else {
			return null;
		}
	},
	dateDiff: function(dateOne, dateTwo, diffType) {
		var diff = 0;
		switch (diffType) {
			case 'second':
				diff = parseInt((dateOne - dateTwo) / 1000);
				break;
			case 'minute':
				diff = parseInt((dateOne - dateTwo) / 60000);
				break;
			case 'hour':
				diff = parseInt((dateOne - dateTwo) / 3600000);
				break;
			case 'day':
				diff = parseInt((dateOne - dateTwo) / 86400000);
				break;
			case 'week':
				diff = parseInt((dateOne - dateTwo) / 86400000 * 7);
				break;
			case 'month':
				diff = (dateOne.getMonth() + 1) + ((dateOne.getFullYear() - dateTwo.getFullYear()) * 12) - (dateTwo.getMonth() + 1);
				break;
			case 'year':
				diff = dateOne.getFullYear() - dateTwo.getFullYear();
				break;
		}
		return Math.abs(diff);
	},
	getQueryString: function(url, name) {
		var spliter = '?';
		if (url.indexOf(spliter) < 0) return null;
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = url.split(spliter)[1].match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	},
	mobvistaJSONPAjax: function(win) {
		var me = this;
		var isIE = !1,
			doc = win.document,
			head = doc.getElementsByTagName('head')[0];

		function request(param) {

			var url = param.url + Util.parseToUrl(param.data) + '&campaignids=' + Mediation.campaignArray.getData().filterByFCA().toIdString(); //.filterByTime(0,'minute').toIdString();
			var success = param.success;
			var error = param.error;
			var timestamp = param.timestamp;
			var script = doc.createElement('script');

			function callback() {
				eval("if(!window." + param.data.jsonp + "){jsonp = undefined;}else{ jsonp = " + param.data.jsonp + "}");
				if (typeof jsonp != 'undefined') {
					success(jsonp);
				} else {
					console.log('warning: jsonp did not return.');
					if(param.error) param.error();
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
				script.onerror = function(){
					if(error) error();
				};
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
	}(window),
	mobvistaAjax: function(ajaxParam) {
		var me = this;
		var url = ajaxParam.url;


		if (ajaxParam.type == "get" || ajaxParam.type == "GET") {
			url += Util.parseToUrl(ajaxParam.data);
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
				if (xmlHttpRequest.status == 200 || xmlHttpRequest.status == 0) {
					var responseText = xmlHttpRequest.responseText;
					//alert(responseText);
					if (ajaxParam.success) {
						if (ajaxParam.contentType == 'json' || ajaxParam.contentType == 'JSON') {
							try{
									ajaxParam.success(JSON.parse(responseText));
								}catch(e){
									ajaxParam.success(responseText);
								}

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
	},
	checkIP:function(callbackParam){
		this.mobvistaAjax({
		    url:'http://ip-api.com/json',
		    type:'get',
		    dataType:'json',
		    contentType:'json',
		    success:function(data){
		    	console.log(data);
		    	if(callbackParam&&callbackParam.success) callbackParam.success();
		    },
		    error:function(data){
		    	console.log(data);
		    	if(callbackParam&&callbackParam.error) callbackParam.error();
		    }
		});
	},
	parseToUrl: function(data) {
		var result = '';
		for (var key in data) {
			result += key + '=' + data[key] + '&';
		}
		if (result.length > 0) {
			result = result.substring(0, result.length - 1);
		}
		return result;
	}
};

window.Util = Util;

Util.addListener(window, "DOMContentLoaded", function() {
	Mediation.init({
            'adnType':'banner',
            'isAutoShow':true,
            'initByTag':true
          });
});