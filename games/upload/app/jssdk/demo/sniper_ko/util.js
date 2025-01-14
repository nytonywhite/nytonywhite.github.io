/**
 * Created by showzyl on 2016/11/2.
 */

;(function (win) {
	'use strict'

	win.utils = {};

	utils.test = function () {
		console.log('test');
	}

	utils.getUrlParams = function (url) {
		var i;
		url = url || window.location;
		url = url.indexOf ? url : url.toString();
		url = decodeURIComponent(url);

		var paramStringStart = url.indexOf("?") + 1,
			paramStringEnd = (url.indexOf("#") === -1) ?
				url.length :
				url.indexOf("#"),
			paramString = url.slice(paramStringStart, paramStringEnd),
			keysAndValues = paramString.split('&'),
			paramsObject = {};

		for (i = 0; i < keysAndValues.length; i++) {
			var keyValue = keysAndValues[i].split('=');

			if (keyValue[0].slice(-2) === "[]") {
				var key = keyValue[0].slice(0, -2);
				paramsObject[key] = paramsObject[key] || [];
				paramsObject[key].push(keyValue[1]);
			} else {
				paramsObject[keyValue[0]] = keyValue[1];
			}
		}

		return paramsObject;
	}
	
	utils.http2https = function (adUnits) {
		var httpsMap = {
			'http://cdn-adn.rayjump.com': 'https://cdn-adn-https.rayjump.com',
			'http://res.rayjump.com': 'https://res-https.rayjump.com',
			'http://d11kdtiohse1a9.cloudfront.net': 'https://res-https.rayjump.com'
		};
		for(var i=0;i<adUnits.length;i++){
			for(var k in adUnits[i]){
				for(var key in httpsMap){
					var reg = new RegExp(''+key+'');
					if(reg.test(adUnits[i][k])){
						adUnits[i][k] = adUnits[i][k].replace(reg, httpsMap[key])
					}
				}
			}
		}
	}

	utils.hybirdEvent = function (opt) {
		var sClass = opt.sClass || 'OfferWall';
		window.WindVane.call(sClass, opt.hybirdFn, opt.params, function (res) {
			opt.succ && opt.succ(res);
		}, function (e) {
			opt.err && opt.err(e);
		})
	}

	utils.getEl = function (el, tagName) {
		el = el.replace(/^\s|\s$/g, '');
		// # id . class tag
		var first = el.substr(0, 1);
		//console.log(first);

		if (first === '#') {
			return document.getElementById(el.substr(1, el.length))
		}

		if (first === '.') {
			return document.getElementsByClassName(el.substr(1, el.length))
		}

	}

	utils.rmEl = function (el) {
		var oParent = el.parentNode;
		if (oParent) {
			oParent.removeChild(el);
		}
	}

	utils.addClass = function (el, className) {
		var reg = new RegExp('' + className + '');
		if (!reg.test(el.className)) {
			// if dosent exsist
			el.className += (' ' + className);
		}
	}

	utils.rmClass = function (el, className) {
		var reg = new RegExp('' + className + '');
		if (reg.test(el.className)) {
			el.className = el.className.replace(reg, '');
		}
	}

	utils.language = function (cb) {
		var type = navigator.appName
		if (type == "Netscape") {
			var lang = navigator.language
		} else {
			var lang = navigator.userLanguage
		}
		var lang = lang.substr(0, 2);
		switch (lang){
			case 'en':
				return 'en';
			break;
			case 'zh':
				return 'zh';
				break;
			default:
				return 'other';
		}
	}

	utils.tips = function (msg, cb) {
		var tips_center = document.getElementById('tips_center');
		tips_center.innerHTML = msg;
		tips_center.style.display = 'block';
		cb && cb()
		clearTimeout(this.timmer)
		this.timmer = setTimeout(function () {
			tips_center.innerHTML = '';
			tips_center.style.display = 'none';
		}, 2000)
	}

	utils.ajax = function (type, url, data, success, failed) {
		// 创建ajax对象
		var xhr = null;
		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else {
			xhr = new ActiveXObject('Microsoft.XMLHTTP')
		}

		var type = type.toUpperCase();
		// 用于清除缓存
		var random = Math.random();

		if (typeof data == 'object') {
			var str = '';
			for (var key in data) {
				str += key + '=' + data[key] + '&';
			}
			data = str.replace(/&$/, '');
		}
		type = type.toUpperCase();
		if (type == 'GET') {
			if (data) {
				xhr.open('GET', url + '?' + data, true);
			} else {
				xhr.open('GET', url + '?t=' + random, true);
			}
			xhr.send();

		} else if (type == 'POST') {
			xhr.open('POST', url, true);
			// 如果需要像 html 表单那样 POST 数据，请使用 setRequestHeader() 来添加 http 头。
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.send(data);
		}

		// 处理返回数据
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					if (typeof xhr.responseText === 'string') {
						success(system.deserialize(xhr.responseText));
					} else {
						success(xhr.responseText);
					}
				} else {
					if (failed) {
						failed(xhr.status);
					}
				}
			}
		}

	}

	utils.statistics = function (url, silentTag) {
		var reg = /(http\:|https\:)/;
		var silentTag = silentTag || 'script';
		url = url.replace(reg, '');
		var silentDataUrlString = url
		var oTag = document.createElement(silentTag)
		oTag.setAttribute('src', silentDataUrlString)
		document.body.appendChild(oTag)
	}

	// 判断页面滚动方向
	utils.scrollFunc = function () {
		var scrollAction = {x: 0, y: 0}, scrollDirection;
		var diffX = scrollAction.x - window.pageXOffset;
		var diffY = scrollAction.y - window.pageYOffset;
		//console.log(diffX, diffY)
		if (diffX < 0) {
			// Scroll right
			scrollDirection = 'right';
		} else if (diffX > 0) {
			// Scroll left
			scrollDirection = 'left';
		} else if (diffY < 0) {
			// Scroll down
			scrollDirection = 'down';
		} else if (diffY > 0) {
			// Scroll up
			scrollDirection = 'up';
		} else {
			// First scroll event
			//console.log(11111)
			scrollDirection = '';
		}
		scrollAction.x = window.pageXOffset;
		scrollAction.y = window.pageYOffset;
		//console.log(scrollAction, scrollDirection)
		return scrollDirection;
	}

	// 文档高度
	utils.getDocumentTop = function () {
		var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
		if (document.body) {
			bodyScrollTop = document.body.scrollTop;
		}
		if (document.documentElement) {
			documentScrollTop = document.documentElement.scrollTop;
		}
		scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
		return scrollTop;
	}

	// 可视窗口高度
	utils.getWindowHeight = function () {
		var windowHeight = 0;
		if (document.compatMode == "CSS1Compat") {
			windowHeight = document.documentElement.clientHeight;
		} else {
			windowHeight = document.body.clientHeight;
		}
		return windowHeight;
	}

	// 可视窗口宽度
	utils.getWindowWidth = function () {
		var windowWidth = 0;
		if (document.compatMode == "CSS1Compat") {
			windowWidth = document.documentElement.clientWidth;
		} else {
			windowWidth = document.body.clientWidth;
		}
		return windowWidth;
	}

	// 滚动条滚动高度
	utils.getScrollHeight = function () {
		var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
		if (document.body) {
			bodyScrollHeight = document.body.scrollHeight;
		}
		if (document.documentElement) {
			documentScrollHeight = document.documentElement.scrollHeight;
		}
		scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
		return scrollHeight;
	}

	utils.device = function () {
		var u = navigator.userAgent;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		return {
			isAndroid: isAndroid,
			isiOS: isiOS
		}
	}

	utils.toggleLogo = function(){
		var i;
		var parm = utils.getUrlParams();
		var rVersion = /(mal|mi)/ig;
		if(parm && parm.sdk_version){
			if(rVersion.test(parm.sdk_version)){
				for(i=0;i<utils.getEl('.logo').length;i++){
					utils.rmClass(utils.getEl('.logo')[i], 'none');
				}
			}
		}
	}

	utils.gpStats = function (cb, ua, time) {
		if(typeof ga === 'undefined'){
			(function (i, s, o, g, r, a, m) {
				i['GoogleAnalyticsObject'] = r;
				i[r] = i[r] || function () {
						(i[r].q = i[r].q || []).push(arguments)
					}, i[r].l = 1 * new Date();
				a = s.createElement(o),
					m = s.getElementsByTagName(o)[0];
				a.async = 1;
				a.src = g;
				m.parentNode.insertBefore(a, m)
			})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
			ga('create', ua || 'UA-96401722-1', 'auto');
			ga('set', 'checkProtocolTask', null); // Disable file protocol checking.
			ga('set', 'checkStorageTask', null); // Disable cookie storage checking.
			ga('set', 'historyImportTask', null); // Disable history checking (requires reading from cookies).
			ga('send', 'pageview'); // stat `pv`
		}
		// 异步上报
		if(cb){
			setTimeout(function () {
				cb();
			}, time || 300);
		}
	}

	/*
	 * Interfaces:
	 * utf8 = utf16to8(utf16);
	 * utf16 = utf8to16(utf8);
	 */
	utils.utf16to8 = function(str) {
		var out, i, len, c;
		out = "";
		len = str.length;
		for(i = 0; i < len; i++) {
			c = str.charCodeAt(i);
			if ((c >= 0x0001) && (c <= 0x007F)) {
				out += str.charAt(i);
			} else if (c > 0x07FF) {
				out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
				out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
				out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
			} else {
				out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
				out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
			}
		}
		return out;
	}

	utils.utf8to16 = function(str) {
		var out, i, len, c;
		var char2, char3;
		out = "";
		len = str.length;
		i = 0;
		while(i < len) {
			c = str.charCodeAt(i++);
			switch(c >> 4)
			{
				case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
// 0xxxxxxx
				out += str.charAt(i-1);
				break;
				case 12: case 13:
// 110x xxxx 10xx xxxx
				char2 = str.charCodeAt(i++);
				out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
				break;
				case 14:
// 1110 xxxx 10xx xxxx 10xx xxxx
					char2 = str.charCodeAt(i++);
					char3 = str.charCodeAt(i++);
					out += String.fromCharCode(((c & 0x0F) << 12) |
						((char2 & 0x3F) << 6) |
						((char3 & 0x3F) << 0));
					break;
			}
		}
		return out;
	}

	utils.clearConsole = function () {
		var method;
		var noop = function () {};
		var methods = [
			'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
			'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
			'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
			'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
		];
		var length = methods.length;
		var console = (window.console = window.console || {});

		while (length--) {
			method = methods[length];
			// Only stub undefined methods.
			if (console[method]) {
				console[method] = noop;
			}
		}
		if(typeof document.write === "function"){
			document.write = noop;
		}
		if(typeof win.alert === "function"){
			win.alert = noop;
		}
	}

	// polyfill
	if (!Array.prototype.map) {
		Array.prototype.map = function(callback, thisArg) {
			var T, A, k;
			if (this == null) {
				throw new TypeError(" this is null or not defined");
			}
			// 1. 将O赋值为调用map方法的数组.
			var O = Object(this);
			// 2.将len赋值为数组O的长度.
			var len = O.length >>> 0;
			// 3.如果callback不是函数,则抛出TypeError异常.
			if (Object.prototype.toString.call(callback) != "[object Function]") {
				throw new TypeError(callback + " is not a function");
			}
			// 4. 如果参数thisArg有值,则将T赋值为thisArg;否则T为undefined.
			if (thisArg) {
				T = thisArg;
			}
			// 5. 创建新数组A,长度为原数组O长度len
			A = new Array(len);
			// 6. 将k赋值为0
			k = 0;
			// 7. 当 k < len 时,执行循环.
			while(k < len) {
				var kValue, mappedValue;
				//遍历O,k为原数组索引
				if (k in O) {
					//kValue为索引k对应的值.
					kValue = O[ k ];
					// 执行callback,this指向T,参数有三个.分别是kValue:值,k:索引,O:原数组.
					mappedValue = callback.call(T, kValue, k, O);
					// 返回值添加到新数组A中.
					A[ k ] = mappedValue;
				}
				// k自增1
				k++;
			}
			// 8. 返回新数组A
			return A;
		};
	}
	
})(window);









