var Mvjssdk = Mvjssdk || {};
Mvjssdk.Offer = {
	'adUnitArray':[],
	'adOffset':0,
	'fcaTime':86400,
	'defaultAdUnitSetting':{
		'state':1,
		'data':{
			'getpf': 86400,//配置信息缓存时间，单位是秒
			'aqn': 1,//广告请求条数
			'acn': 1,//广告缓存条数
			'plct': 3600,//广告缓存时间，单位是秒
			'ttct': 1//预点击触发时机。1表示展示时做预点击，2表示请求广告返回时做预点击。
		},
		'cache_time':0
	},
	init:function(){
		this.fetchAdUnit();
		this.getOffer();
	},
	fetchAdUnit:function(){
		var me = this;
		var adUnitEls = Mvjssdk.Util.getDomTags('mvins');
		for(var i=0,iMax=adUnitEls.length;i<iMax;i++){
			var unitEl = Mvjssdk.Util.domHelper(adUnitEls[i]);
			if(unitEl.attr('fetch')=='1') continue;
			console.log(adUnitEls[i]);
			var unitid = unitEl.attr('fetch','1').attr('unitid');
			var view = unitEl.attr('view')||4;
			view = Mvjssdk.Render['viewType'][view]? view:4;
			var unitSize = Mvjssdk.Render['viewType'][view]['size']['sizeType'];
			var adUnit = {
				'appid':Mvjssdk.Configer['publisher']['appid'],
				'apikey':Mvjssdk.Configer['publisher']['apikey'],
				'sign':Mvjssdk.Configer['publisher']['sign'],
				'unitid':unitid,
				'image_size':unitSize,
				'viewType':view,
				'unitofferkey':'mvadunitoffer'+Mvjssdk.Configer['publisher']['sign']+unitid+'elid'+i,
				'unitsettingkey':'mvadunitsetting'+Mvjssdk.Configer['publisher']['sign']+unitid+'elid'+i,
				'offerfcKey':'mvadunitfc'+Mvjssdk.Configer['publisher']['sign']+unitid+'elid'+i,
				'adCount':1,
				'el':unitEl
			};

			adUnit['setting'] = me.getAdUnitSetting(adUnit);
			adUnit['offerFcSet'] = me.getOfferFcSet(adUnit);
			me['adUnitArray'].push(adUnit);
		}

	},
	getOffer:function(adUnit){
		var me = this;
		var unitOfferArray = [];
		unitOfferArray = adUnit? [adUnit]:me['adUnitArray'];
		for(var i=0,iMax=unitOfferArray.length;i<iMax;i++){
			var unitObj = unitOfferArray[i];
			if(unitObj['hasInit']===true) continue;
			unitObj['hasInit'] = true;
			(function(adUnit){
				adUnit['platform'] = Mvjssdk.Configer['os']['platform'];
				adUnit['os_version'] = Mvjssdk.Configer['os']['os_version'];
				adUnit['offset'] = me['adOffset'];
				me['adOffset'] += adUnit['adCount'];
				var adUnitData = me.loadPreOffer(adUnit);
				if(adUnitData){
					console.log('cache offer loaded');
					Mvjssdk.Render.renderOffer(adUnitData,adUnit,function(){
						
						me.updateSetting(adUnit);
						me.cachePreOffer(adUnit);
						me.pushOfferFc(adUnitData,adUnit);
						me.setNoticeImpression(adUnitData);
						if(adUnit['setting']['data']['ttct']==1) me.preClickOffer(adUnitData);
					});
				}else{
					console.log('cache offer is empty');
					me.loadRTOffer(adUnit,function(result){
						Mvjssdk.Render.renderOffer(result,adUnit,function(){

							me.updateSetting(adUnit);
							me.cachePreOffer(adUnit);
							me.pushOfferFc(result,adUnit);
							me.setNoticeImpression(result);
							if(adUnit['setting']['data']['ttct']==1) me.preClickOffer(result);
						});

						if(adUnit['setting']['data']['ttct']==2) me.preClickOffer(result);
					})
				}
			})(unitObj);
			
		}
	},
	loadRTOffer:function(adUnit,callback){
		var me = this;
		var url = me.getUrl(adUnit);
		Mvjssdk.Util.mobvistaAjax({
			url: url,
			type: 'get',
			dataType: 'json',
			contentType: 'json',
			success: function(result){
				if(result['msg']=='success'){
					console.log('new offer load');
					if(callback){
						try{
							callback(result);
						}catch(ex){
							console.log(ex);
						}
					} 
				}
				console.log(result);
			},
			error: function(result) {
				console.log(result);
			}
		});
	},
	loadPreOffer:function(adUnit){
		var me = this;
		var adunitofferkey = adUnit['unitofferkey'];
		var result = Mvjssdk.Cache.getLocalStorage(adunitofferkey);
		if(!result) return null;
		var cacheDateDiff = Mvjssdk.Util.dateDiff(result['cache_time'],(new Date()),'second');
		return (cacheDateDiff<adUnit['setting']['data']['plct'])? result : null;
	},
	cachePreOffer:function(adUnit){
		var me = this;
		adUnit['offset'] = me['adOffset'];
		me['adOffset'] += adUnit['adCount'];
		var url = me.getUrl(adUnit);
		Mvjssdk.Util.mobvistaAjax({
			url: url,
			type: 'get',
			dataType: 'json',
			contentType: 'json',
			success: function(result){
				console.log('new offer cache');
				if(result['msg']=='success'){
					var adunitofferkey = adUnit['unitofferkey'];
					result['cache_time'] = (new Date()).getTime();
					var preClickTime = false;
					if(adUnit['setting']['data']['ttct']==2) preClickTime = me.preClickOffer(result);
					if(preClickTime!=false) result['pre_click_time'] = preClickTime;
					Mvjssdk.Cache.setLocalStorage(adunitofferkey,result);
				}
			},
			error: function(result) {
				console.log(result);
			}
		});
	},
	getAdUnitSetting:function(adUnit){
		var setting = this.loadPreSetting(adUnit);
		if(!setting) setting = this['defaultAdUnitSetting'],
			console.log('set adunit '+adUnit['unitid']+' in default setting');
		return setting;
	},
	loadPreSetting:function(adUnit){
		var me = this;
		var adunitsettingkey = adUnit['unitsettingkey'];
		var setting = Mvjssdk.Cache.getLocalStorage(adunitsettingkey);
		if(setting) console.log('adunit '+adUnit['unitid']+'\'s setting is loaded');
		return setting;
	},
	updateSetting:function(adUnit){
		var me = this;
		var setting = adUnit['setting'];
		var cacheDateDiff = Mvjssdk.Util.dateDiff(setting['cache_time'],(new Date()),'second');
		if(cacheDateDiff<setting['getpf']) return;
		console.log('setting is updated');
		Mvjssdk.Util.mobvistaAjax({
			url: Mvjssdk.Configer.getUrl('settingUrl'),
			type: "GET",
			dataType: "json",
			contentType: 'json',
			timeout: 100000,
			data: {
				app_id: Mvjssdk.Configer['publisher']['appid'],
				sign: Mvjssdk.Configer['publisher']['sign'],
				unit_id: adUnit['unitid']
			},
			success: function(result) {
				if(result.msg=='success'){
					var adunitsettingkey = adUnit['unitsettingkey'];
					result['cache_time'] = (new Date()).getTime();
					Mvjssdk.Cache.setLocalStorage(adunitsettingkey,result);
				}
			}
		});
	},
	getUrl: function(param) {
		console.log(param)
		var exclude_ids = this.getOfferFcIds(param);
		var url = Mvjssdk.Configer.getUrl('offerUrl') +'?only_impression=1&'
			+ 'app_id=' + param['appid'] 
			+ '&platform=' + param['platform'] 
			+ '&orientation=0&' 
			+ 'ad_num=' + param['adCount']
			+ '&offset='+param['offset']
			+ '&os_version=' + param['os_version'] 
			+ '&sign=' + param['sign']  
			+ '&unit_id=' + param['unitid'] + '&ping_mode=1'
			+ '&sdk_version=' + 'js_1.0.0'
			+ '&image_size=' + param['image_size']
			+ '&exclude_ids=' + exclude_ids;
		url += ('&ts=' + (new Date()).getTime());
		// url += '&client_ip=54.12.1.13';
		
		return url;
	},
	preClickOffer:function(offerResult){
		if(offerResult['data']['ads'][0]['ttc']==false) return false;
		var now = (new Date).getTime();
		if(offerResult['pre_click_time']&&Mvjssdk.Util.dateDiff(offerResult['pre_click_time'],now,'second')<offerResult['data']['ads'][0]['ttc_ct']) return false;
		var click_url = offerResult['data']['ads'][0]['click_url'];
		console.log('pre click click_url');
		this.loadLinkInSilent(click_url);
		return now;
	},
	setImpression:function(offerResult){
		var only_impression_url = offerResult['data']['ads'][0]['impression_url'];
		this.loadLinkInSilent(only_impression_url);
	},
	setNoticeImpression:function(offerResult){
		var only_impression_url = offerResult['data']['only_impression_url'];
		this.loadLinkInSilent(only_impression_url);
		this.setImpression(offerResult);
	},
	setNotice:function(offerResult){
		var notice_url = offerResult['data']['ads'][0]['notice_url'];
		this.loadLinkInSilent(notice_url);
	},
	loadLinkInSilent:function(url){
		var urlEl = Mvjssdk.Util.domHelper('img').css({
			'position':'absolute',
			'left':'-1px',
			'top':'-1px',
			'width':'1px',
			'height':'1px',
			'opacity':'0.001',
			'z-index':'-1'
		}).attr({
			'src':url
		});
		urlEl.insertTo(document.body);
	},
	pushOfferFc:function(offerResult,adUnit){
		var offerFcSet = adUnit['offerFcSet'] || {};
		var offerId = offerResult['data']['ads'][0]['id'];
		var now = (new Date()).getTime();
		var fca = offerResult['data']['ads'][0]['fca'];
		offerFcSet[offerId] = offerFcSet[offerId] || {
			'fcaArray':[]
		};
		offerFcSet[offerId]['fcaTime'] = this['fcaTime'];
		offerFcSet[offerId]['fca'] = fca;
		while(offerFcSet[offerId]['fcaArray'].length>(fca-1)&&offerFcSet[offerId]['fcaArray'].length>0){
			offerFcSet[offerId]['fcaArray'].shift();
		}
		offerFcSet[offerId]['fcaArray'].push(now);
		adUnit['offerFcSet'] = offerFcSet;
		var offerFcSetKey = adUnit['offerfcKey'];
		Mvjssdk.Cache.setLocalStorage(offerFcSetKey,offerFcSet);
		return offerFcSet;
	},
	getOfferFcSet:function(adUnit){
		var offerFcSetKey = adUnit['offerfcKey'];
		var offerFcSet = Mvjssdk.Cache.getLocalStorage(offerFcSetKey);
		console.log('unit fc set is loaded');
		console.log(offerFcSet);
		return offerFcSet;
	},
	getOfferFcIds:function(adUnit){
		var exclude_ids = [];
		var offerFcSet = adUnit['offerFcSet'];
		var now = (new Date()).getTime();
		for(var key in offerFcSet){
			var fca = offerFcSet[key]['fca'];
			var fcaTime = offerFcSet[key]['fcaTime'];
			var fcArray = offerFcSet[key]['fcaArray'];
			if(fcArray.length>=fca&&Mvjssdk.Util.dateDiff(fcArray[0],now,'second')<fcaTime){
				exclude_ids.push(parseInt(key));
			}
		}
		return JSON.stringify(exclude_ids);
	}
};