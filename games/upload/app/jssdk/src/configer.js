var Mvjssdk = Mvjssdk || {};
Mvjssdk.Configer = {
	'publisher':{
		'appid': '24542',
		'apikey': 'c07db1491754a062e7c8eaedbb968d81',
		'sign': '927362ca475c2561ddcfd6016b3d1638',
	},
	'isUrlDebug':false,
	'url':{
		'settingUrl': 'http://test-setting.rayjump.com/jssetting',
		'offerUrl': 'http://test-net.rayjump.com/openapi/ad/v3'
	},
	'debugUrl':{
		'settingUrl': 'data/jssetting.json',
		'offerUrl': 'data/v3_offer.json'
	},
	'isLogShow':false,
	'isDevTemplate':true,
	'currentScreen':{
		'width':1080,
		'height':1920
	},
	getUrl:function(key){
		if(this['isUrlDebug']===true){
			return this['debugUrl'][key];
		}else{
			return this['url'][key];
		}
	},
	init: function() {
		var me = this;
		me['isUrlDebug'] = (Mvjssdk.Util.getQueryString(window.location.href,'mvUrlDebug')=='true')?true:(me['isUrlDebug']||false);
		me['isDevTemplate'] = (Mvjssdk.Util.getQueryString(window.location.href,'mvDevTemplate')=='true')?true:(me['isDevTemplate']||false);
		var mobvistajssdk = Mvjssdk.Util.getDomById('mobvistajssdk');
		if(!mobvistajssdk) return false;
		var script = Mvjssdk.Util.domHelper(mobvistajssdk);
		me['publisher']['appid'] = script.attr('appid');
		me['publisher']['apikey'] = script.attr('apikey');
		me['publisher']['sign'] = script.attr('sign')||(Mvjssdk.Util.md5.hex_md5(me['publisher']['appid'] + me['publisher']['apikey']));
		me['currentScreen'] = Mvjssdk.Util.getScreenSize();
		// me.getSetting();
		me.getOSInfo();
		return true;
	},
	getSetting: function() {
		var me = this;
		Mvjssdk.Util.mobvistaAjax({
			url: me.getUrl('settingUrl'),
			type: "GET",
			dataType: "json",
			contentType: 'json',
			timeout: 100000,
			data: {
				app_id: me['publisher']['appid'],
				sign: me['publisher']['sign']
			},
			success: function(result) {
				console.log(result);
			}
		});
	},
	getOSInfo:function(){
		this['os']['platform'] = 3;//(navigator.userAgent.indexOf('Android') >= 0 || navigator.userAgent.indexOf('android') >= 0)? 1 : 2;
		this['os']['os_version'] = this.getOSVersion()||'4.2.1';
	},
	getOSVersion:function(){
		var ua = navigator.userAgent;
		var oSIndex = 0;
		if(ua.indexOf('Android')>-1){
			oSIndex = ua.indexOf('Android');
			ua = ua.substr(oSIndex,ua.length-1);
			ua = ua.split(';')[0];
			ua = ua.split(' ')[1];
		}else if(ua.indexOf('iPhone')>-1||ua.indexOf('iPad')>-1){
			oSIndex = ua.indexOf('Version');
			ua = ua.substr(oSIndex,ua.length-1);
			ua = ua.split(' ')[0];
			ua = ua.split('/')[1];
		}else{
			return null;
		}
		return ua;
	},
	os:{
		'platform':null,
		'os_version':null
	}
};