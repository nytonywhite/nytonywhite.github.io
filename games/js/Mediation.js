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
		did:null,
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
					console.log(result)
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
		var weightString = Util.getQueryString(window.location.href,'weight');
		if(weightString&&weightString.indexOf('[')>-1&&weightString.indexOf(']')>-1) weightString = weightString.substr(1,weightString.length-2);
		var userWeightArray = [];
		var newWeightArray = [];
		try {
			userWeightArray = weightString.split(',');
		} catch (e) {
			userWeightArray = [];
		}
		// console.log(userWeightArray)
		for (var i = 0;i<userWeightArray.length;i++) {
			for (var j = 0;j<weightArray.length;j++) {
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
		console.log(weight.initConfig!=undefined );
		me.currentMedia = Media.init(weight);
	},
	getParams: function() {
		var me = this;
		var url = window.location.href;
		me.userConfig.osVersion = Util.getQueryString(url, 'osVersion')||'';
		me.userConfig.imei = Util.getQueryString(url, 'imei')||'';
		me.userConfig.mac = Util.getQueryString(url, 'mac')||'';
		me.userConfig.devId = Util.getQueryString(url, 'devId')||'';
		me.userConfig.deviceModel = Util.getQueryString(url, 'deviceModel')||'';
		me.userConfig.orientation = window.screen.height > window.screen.width ? 1 : 2;
		me.userConfig.language = navigator.language;
		me.userConfig.googlePlayServiceVersion = Util.getQueryString(url, 'googlePlayServiceVersion')||'';



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
				console.log('id = ' + campaignObj['campaign_ids'] + ', count = ' + campaignObj['fca']['count']);
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