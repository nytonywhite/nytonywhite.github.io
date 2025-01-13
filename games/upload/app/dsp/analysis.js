/*
1.用户浏览广告页面时//5000058
2.用户点击广告页面时//5000059
3.商品页面打开时//5000060
4.商品页面加载完成时//5000061
5.用户下滑到区域(descript,detail,orders)//5000062
6.属性页面打开//5000063
7.属性页面加载完成//5000064
8.订单页面打开//5000065
9.订单页面加载完成//5000066
10.自定义动作事件(next/back/shopping cart)//5000067
5000058,5000059,5000060,5000061,5000062,5000063,5000064,5000065,5000066,5000067
*/

window.mv_analysis = window.mv_analysis ? window.mv_analysis : {
	hasInit:false,
	channel:'mv',
	host:"http://analytics.rayjump.com/?",
	uuid:'',
	data:{
		title:'',
		url:'',
	},
	init:function() {
		this.data.title = document.title;
		this.data.url = encodeURIComponent(window.location.href);
		this.getOSInfo();
		this.uuid = this.getUser();
		var script = document.getElementsByClassName('mv_analysis')[0];
		this.channel = script.getAttribute('channel') || this.channel;
	},
	getUser:function(){
		var uuid = this.cache.getLocalStorage('uuid');
		if(uuid) return uuid;

		function S4() {
	        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	    };
	    function guid() {
	        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
	    };
	    uuid = guid();
	    this.cache.setLocalStorage('uuid',uuid);
	    return uuid;
	},
	getQueryString(url, name) {
		var spliter = '?';
		if (url.indexOf(spliter) < 0) return null;
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = url.split(spliter)[1].match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	},

	addListener: function (element, e, fn) {
	    if (element.addEventListener) {
	      element.addEventListener(e, fn, false);
	    } else {
	      element.attachEvent("on" + e, fn);
	    }
	},
	removeListener: function (element, e, fn) {
	    if (element.removeEventListener) {
	      element.removeEventListener(e, fn, false);
	    } else {
	      element.detachEvent("on" + e, fn);
	    }
	  },
	triggerEvent: function (element, e, data) {
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
	cancelBubble: function (evt) {
	    var e = (evt) ? evt : window.event;
	    if (window.event) {
	      e.cancelBubble = true;
	    } else {
	      //e.preventDefault();
	      e.stopPropagation();
	    }
	},
	checkpageview:function(param){
		this.doPost({
			'eventType':'pageview',
			'pagename':param['pagename']
		});
	},
	checkpageloaded:function(param){
		var me = this;
		this.addListener(window,'load',function(){
			me.doPost({
				'eventType':'pageloaded',
				'pagename':param['pagename']
			});
		});
	},
	scrollobj:{
		'1-3':false,
		'2-3':false,
		'3-3':false
	},
	checkpagescroll:function(param){
		var me = this;
		var eleid = param['id'];
		me.addListener(window,'load',function(){
			var pageHeight = document.body.scrollHeight;
			var windowHeight = window.innerHeight;
			var targetTop = 0;
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			if(!eleid) return;
			var dom = document.getElementById(eleid);
			if(eleid=='1-3'){
				targetTop = Math.floor(1*(pageHeight-windowHeight)/3);
			}else if(eleid=='2-3'){
				targetTop = Math.floor(2*(pageHeight-windowHeight)/3);
			}else if(eleid=='3-3'){
				targetTop = Math.floor(3*(pageHeight-windowHeight)/3);
			}else{
				targetTop = scrollTop+dom.getBoundingClientRect().top - windowHeight;
				me.scrollobj[eleid] = false;
			};

			if(targetTop<=0) return;

			var scrollTimmer = null;
			me.addListener(window,'scroll',function(){
				if(scrollTimmer) clearTimeout(scrollTimmer);
				scrollTimmer = setTimeout(function(){
					if(me.scrollobj[eleid]==true) return;
					var currentTop = document.documentElement.scrollTop || document.body.scrollTop;
					if(currentTop<targetTop) return;

					me.doPost({
						'eventType':'pagescroll',
						'pagename':param['pagename'],
						'area':eleid,
					});
					me.scrollobj[eleid]=true;
				},300);
				
			});
		});
		

	},
	checkpageaction:function(param){
		var me = this;
		this.doPost({
			'eventType':'pageaction',
			'pagename':param['pagename'],
			'action':param['action']
		});

		if(param['callback']){
			setTimeout(function(){
				param['callback']();
			},800);
		}
	},
	checkpageactionbyatag:function(param,atag){
		var me = this;
		var event = param['event'] || 'click';
		if(atag&&(typeof atag == 'object')&&(atag.tagName.toUpperCase()=='A')){
			var targetAction = atag.getAttribute('target');
			var targetUrl = atag.getAttribute('href');
			atag.removeAttribute('href');

			me.addListener(atag,event,function(){
				var orgCallback = param['callback'];
				var newAction = null;
				if(orgCallback) newAction = orgCallback(atag);
				if(newAction) param['action'] = newAction;
				param['callback'] = function(){
					if(targetAction=='_blank'){
						window.open(targetUrl); 
					}else{
						window.location.href = targetUrl;
					}
				}
				me.checkpageaction(param);
			});

			

		}else{
			me.addListener(atag,event,function(){
				var orgCallback = param['callback'];
				var newAction = null;
				if(orgCallback) newAction = orgCallback(atag);
				if(newAction) param['action'] = newAction;

				me.checkpageaction(param);
			});
		}

	},
	doPost:function(param){
		var me = this;
		var eventType = param['eventType'];
		switch(eventType){
			case 'pageview':
				me._pageview(param);
				break;
			case 'pageloaded':
				me._pageloaded(param);
				break;
			case 'pagescroll':
				me._pagescroll(param);
				break;
			case 'pageaction':
				me._pageaction(param);
				break;
			default:
				if(param['url']) me._postToUrl(param);
		}
	},
	_pageview:function(param){
		//商品页面打开时
		var postData = {
			'key':'5000060',
			'posttype':'pageview',
			'pagename':param['pagename']
		};
		this._postToServer(postData);
	},
	_pageloaded:function(param){
		//商品页面加载完成时
		var postData = {
			'key':'5000061',
			'posttype':'pageloaded',
			'pagename':param['pagename']
		};
		this._postToServer(postData);
	},
	_pagescroll:function(param){
		//用户下滑到区域(descript,detail,orders)
		var postData = {
			'key':'5000062',
			'posttype':'pagescroll',
			'area':param['area'],
			'pagename':param['pagename']
		};
		this._postToServer(postData);
	},
	_pageaction:function(param){
		//自定义动作事件(next/back/shopping cart)
		var postData = {
			'key':'5000067',
			'posttype':'pageaction',
			'action':param['action'],
			'pagename':param['pagename']
		};
		this._postToServer(postData);
	},
	_postToServer:function(postData){
		if(this.hasInit==false) this.init();
		var me = this;
		var logserverurl = this.host+'ts='+(new Date()).getTime()+'&uuid='+this.uuid+'&channel='+this.channel;
		for(var key in postData){
			logserverurl += ('&' + key + '=' + postData[key]);
		}

		for(var osKey in this.os){
			logserverurl += ('&' + osKey + '=' + this.os[osKey]);
		}

		for(var dataKey in this.data){
			logserverurl += ('&' + dataKey + '=' + this.data[dataKey]);
		}

		if(window.document&&window.document.body){
			var poster = document.createElement('img');
			poster.style = 'position:absolute;z-index:0;top:-1px;left:-1px;width:1px;height:1px;opacity:0.001;display:block';
			poster.src = logserverurl;
			document.body.appendChild(poster);
			setTimeout(function(){ poster.parentElement.removeChild(poster); },1000);

		}else{
			this.addListener(window,'DOMContentLoaded',function(){
				var poster = document.createElement('img');
				poster.style = 'position:absolute;z-index:0;top:-1px;left:-1px;width:1px;height:1px;opacity:0.001;display:block';
				poster.src = logserverurl;
				document.body.appendChild(poster);
				setTimeout(function(){ poster.parentElement.removeChild(poster); },1000);
			});
		}

		// var poster = document.createElement('img');
		// poster.style = 'position:absolute;z-index:0;top:-1px;left:-1px;width:1px;height:1px;opacity:0.001;display:block';
		// poster.src = logserverurl;
		// document.body.appendChild(poster);
		// setTimeout(function(){ poster.parentElement.removeChild(poster); },1000);


		// var poster = new XMLHttpRequest();
		// poster.onreadystatechange = function () {
		//     if (poster.readyState === 4) {
		//         if (poster.status === 200) {
		//             // Success
		//         } else {
		//             // Error(Timeout)
		//         }
		//     }
		// };
		// poster.open("GET",logserverurl);
		// poster.send(null);
		
	},
	_postToUrl:function(postData){
		var logserverurl = postData['url'];
		logserverurl+=(logserverurl.indexOf('?')>=0?'&':'?');
		logserverurl+=('ts='+(new Date()).getTime());
		for(var key in postData){
			if(key=='url') continue;
			logserverurl += ('&' + key + '=' + postData[key]);
		}

		var poster = new Image();
		poster.src = logserverurl;
		
	},
	cache:{
		storageKey:'mv_analysis_',
		setLocalStorage: function(key, value) {
			var me = this;
			if(!localStorage) return;
			try{
				var objString = JSON.stringify(value);
				localStorage[me['storageKey']+key] = objString;
			}catch(e){}
		},
		getLocalStorage: function(key) {
			var me = this;
			if(!localStorage) return null;
			var obj = localStorage[me['storageKey']+key];
			if (obj != null) {
				return JSON.parse(obj);
			} else {
				return null;
			}
		}
	},
	os:{},
	getOSInfo: function () {
	    this['os']['platform'] = (navigator.userAgent.indexOf('Android') >= 0 || navigator.userAgent.indexOf('android') >= 0)? 1 : 2;
	    this['os']['model'] = this.getModel();
	    this['os']['os_version'] = this.getOSVersion() || '4.2.1';
	    this['os']['screen_size'] = window.innerWidth+'x'+window.innerHeight;
	    this['os']['network_type'] = this.getNetworkStatus();
	    var broserInfo = this.getBrowser()[0].split('/');
	    this['os']['browser'] = broserInfo[0];
	    this['os']['browser_version'] = broserInfo[1];
	    this['os']['ratio'] = window.screen.width+'x'+window.screen.height;
	    this['os']['language'] = navigator.language||navigator.userLanguage;
	},

  getNetworkStatus: function(){
    var connection = navigator.connection||navigator.mozConnection||navigator.webkitConnection||{tyep:'unknown'};
    var type_text = ['unknown','ethernet','wifi','2g','3g','4g','none'];
    connection['type_text'] = (typeof(connection['type']) == "number") ? type_text[connection.type]:connection['type'];
    
    if(connection['type_text']=='wifi') return 9;
    if(connection['type_text']=='2g') return 2;
    if(connection['type_text']=='3g') return 3;
    if(connection['type_text']=='4g') return 4;

    if(typeof(connection.bandwidth) == "number"){
      if(connection.bandwidth > 10){
        return 9;//'wifi'
      }else if(connection.bandwidth > 2){
        return 3;//'3g'
      }else if(connection.bandwidth > 0){
        return 2;//'2g'
      }else if(connection.bandwidth == 0){
        return 9;//'wifi'
      }else{
        return 9;//'wifi'
      }
    }else{
      return 9;
    }
  },
  getModel:function(){
    var model = this['os']['platform']==1 ? 'android phone' : 'iphone';
    var u = navigator.userAgent, app = navigator.appVersion;
    if(u.indexOf('Trident') > -1){
      model = 'windows pc';
      
    }else if(this['os']['platform']==1){
      if(!!u.match(/AppleWebKit.*Mobile.*/)) model = 'android phone';
      if(u.indexOf('Mobile')<0) model = 'android tablet'
    }else if(this['os']['platform']==2){
      if(!!u.match(/AppleWebKit.*Mobile.*/)) model = 'iphone';
      if(u.indexOf('iPhone')>-1) model = 'iphone';
      if(u.indexOf('iPad') > -1) model = 'ipad';
    }
    return model;
  },
  getBrowser:function(){
      var agent = navigator.userAgent.toLowerCase();
      var regStr_ie = /msie [\d.]+;/gi ;
      var regStr_ff = /firefox\/[\d.]+/gi
      var regStr_chrome = /chrome\/[\d.]+/gi ;
      var regStr_saf = /safari\/[\d.]+/gi ;
      //IE
      if(agent.indexOf("msie") > 0){
        return agent.match(regStr_ie) ;
      }

      //firefox
      if(agent.indexOf("firefox") > 0){
        return agent.match(regStr_ff) ;
      }

      //Chrome
      if(agent.indexOf("chrome") > 0){
        return agent.match(regStr_chrome) ;
      }

      //Safari
      if(agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0){
        return agent.match(regStr_saf) ;
      }

      return ['unknown/unknown'];
  },
  getOSVersion: function (usStr) {
    var ua = usStr || navigator.userAgent;
    ua = ua.toLowerCase();
    var oSIndex = 0;
    if (ua.indexOf('android') > -1) {
      oSIndex = ua.indexOf('android');
      ua = ua.substr(oSIndex, ua.length - 1);
      ua = ua.split(';')[0];
      ua = ua.split(' ')[1];
    } else if (ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1) {
      if (ua.indexOf("like mac os x") > 0) {
        var regStr_saf = /os [\d._]*/gi;
        var verinfo = ua.match(regStr_saf);
        ua = (verinfo + "").replace(/[^0-9|_.]/ig, "").replace(/_/ig, ".");
      } else {
        oSIndex = ua.indexOf('version');
        ua = ua.substr(oSIndex, ua.length - 1);
        ua = ua.split(' ')[0];
        ua = ua.split('/')[1];
      }
    } else {
      this['os']['browserType'] = 'pc';
      return null;
    }
    return ua;
  }
}
