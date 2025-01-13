;(function (win, lib) {
	var doc = win.document;
	var ua = win.navigator.userAgent;
	var isIOS = (/iPhone|iPad|iPod/i).test(ua);
	var isAndroid = (/Android/i).test(ua);
	var osVersion = ua.match(/(?:OS|Android)[\/\s](\d+[._]\d+(?:[._]\d+)?)/i);
	var wvVersion = ua.match(/WindVane[\/\s](\d+[._]\d+[._]\d+)/);
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var WindVane = lib.windvane = win.WindVane || (win.WindVane = {});
	var WindVane_Native = win.WindVane_Native;
	var inc = 1, iframePool = [], iframeLimit = 3;

	var LOCAL_PROTOCOL = 'mv';
	var WV_PROTOCOL = 'wv_hybrid';
	var IFRAME_PREFIX = 'iframe_';
	var SUCCESS_PREFIX = 'suc_';
	var FAILURE_PREFIX = 'err_';
	var DEFERRED_PREFIX = 'defer_';
	var PARAM_PREFIX = 'param_';
	var CHUNK_PREFIX = 'chunk_';
	var CALL_GC_TIME = 60 * 1000 * 10;
	var CHUNK_GC_TIME = 60 * 1000 * 10;
	var PARAM_GC_TIME = 60 * 1000;

	function compareVersion(v1, v2) {
		v1 = v1.toString().split('.');
		v2 = v2.toString().split('.');

		for (var i = 0; i < v1.length || i < v2.length; i++) {
			var n1 = parseInt(v1[i], 10), n2 = parseInt(v2[i], 10);

			if (window.isNaN(n1)) {
				n1 = 0;
			}
			if (window.isNaN(n2)) {
				n2 = 0;
			}
			if (n1 < n2) {
				return -1;
			}
			else if (n1 > n2) {
				return 1;
			}
		}
		return 0;
	}

	if (osVersion) {
		osVersion = (osVersion[1] || '0.0.0').replace(/\_/g, '.');
	} else {
		osVersion = '0.0.0';
	}

	if (wvVersion) {
		wvVersion = (wvVersion[1] || '0.0.0').replace(/\_/g, '.');
	} else {
		wvVersion = '0.0.0';
	}

	var WV_Core = {

		isAvailable: compareVersion(wvVersion, '0') === 1,

		call: function (obj, method, params, success, failure, timeout) {
			var sid;
			var defer;

			if (typeof arguments[arguments.length - 1] === 'number') {
				timeout = arguments[arguments.length - 1];
			}

			if (typeof success !== 'function') {
				success = null;
			}

			if (typeof failure !== 'function') {
				failure = null;
			}

			if (lib.promise) {
				defer = lib.promise.defer();
			}

			if (timeout > 0) {
				sid = setTimeout(function () {
					WV_Core.onFailure(sid, {ret: 'HY_TIMEOUT'});
				}, timeout);
			} else {
				sid = WV_Private.getSid();
			}

			WV_Private.registerCall(sid, success, failure, defer);
			WV_Private.registerGC(sid, timeout);
			WV_Private.callMethod(obj, method, params, sid);

			if (defer) {
				return defer.promise;
			}
		},

		fireEvent: function (eventname, eventdata, sid) {
			// 当native需要通知js的时候（通信），用触发事件的方式进行
			var ev = doc.createEvent('HTMLEvents');
			ev.initEvent(eventname, false, true);
			ev.param = WV_Private.parseData(eventdata || WV_Private.getData(sid));
			doc.dispatchEvent(ev);
		},

		getParam: function (sid) {
			return WV_Private.getParam(sid);
		},

		setData: function (sid, chunk) {
			WV_Private.setData(sid, chunk);
		},

		onSuccess: function (sid, data) {
			// native代码处理成功后，调用该方法来通知js
			WV_Private.onComplete(sid, data, 'success');
		},

		onFailure: function (sid, data) {
			// native代码处理失败后，调用该方法来通知js
			WV_Private.onComplete(sid, data, 'failure');
		},

		getDeviceVersion: function () {
			return {
				device: (function () {
					if(isIOS){
						return 'ios';
					}
					if(isAndroid){
						return 'android';
					}
					return 'other';
				})(),
				version: wvVersion
			};
		}

	};

	var WV_Private = {
		params: {},
		chunks: {},
		calls: {},

		getSid: function () {
			return Math.floor(Math.random() * (1 << 50)) + '' + inc++;
		},

		buildParam: function (obj) {
			if (obj && typeof obj === 'object') {
				return JSON.stringify(obj);
			} else {
				return obj || '';
			}
		},

		getParam: function (sid) {
			// 因为ios下iframe协议，对于url长度有限制，所以增加一个参数的map。
			return this.params[PARAM_PREFIX + sid] || '';
		},

		setParam: function (sid, params) {
			this.params[PARAM_PREFIX + sid] = params;
		},

		parseData: function (str) {
			var rst;
			if (str && typeof str === 'string') {
				try {
					rst = base64.decode(str);
					rst = utils.utf8to16(rst);
					rst = JSON.parse(rst);
				} catch (e) {
					rst = {ret: ['WV_ERR::PARAM_PARSE_ERROR']};
				}
			} else {
				rst = str || {};
			}
			return rst;
		},

		setData: function () {
			// android下，回传函数会超长，通过分段set的方式来传递
			this.chunks[CHUNK_PREFIX + sid] = this.chunks[CHUNK_PREFIX + sid] || [];
			this.chunks[CHUNK_PREFIX + sid].push(chunk);
		},

		getData: function (sid) {
			if (this.chunks[CHUNK_PREFIX + sid]) {
				return this.chunks[CHUNK_PREFIX + sid].join('');
			} else {
				return '';
			}
		},

		registerCall: function (sid, success, failure, defer) {

			if (success) {
				this.calls[SUCCESS_PREFIX + sid] = success;
			}

			if (failure) {
				this.calls[FAILURE_PREFIX + sid] = failure;
			}

			if (defer) {
				this.calls[DEFERRED_PREFIX + sid] = defer;
			}
		},

		unregisterCall: function (sid) {
			var sucId = SUCCESS_PREFIX + sid;
			var failId = FAILURE_PREFIX + sid;
			var defId = DEFERRED_PREFIX + sid;
			var call = {};

			if (this.calls[sucId]) {
				call.success = this.calls[sucId];
				delete this.calls[sucId];
			}
			if (this.calls[failId]) {
				call.failure = this.calls[failId];
				delete this.calls[failId];
			}
			if (this.calls[defId]) {
				call.defer = this.calls[defId];
				delete this.calls[defId];
			}

			return call;
		},

		useIframe: function (sid, url) {
			var iframeid = IFRAME_PREFIX + sid;
			var iframe = iframePool.pop();

			if (!iframe) {
				iframe = doc.createElement('iframe');
				iframe.setAttribute('frameborder', '0');
				iframe.style.cssText = 'width:0;height:0;border:0;display:none;';
			}

			iframe.setAttribute('id', iframeid);
			iframe.setAttribute('src', url);

			if (!iframe.parentNode) {
				setTimeout(function () {
					doc.body.appendChild(iframe);
				}, 5);
			}
		},

		retrieveIframe: function (sid) {
			var iframeid = IFRAME_PREFIX + sid;
			var iframe = doc.querySelector('#' + iframeid);

			if (iframePool.length >= iframeLimit) {
				doc.body.removeChild(iframe);
			} else {
				iframePool.push(iframe);
			}
		},

		callMethod: function (obj, method, params, sid) {
			// hybrid://objectName:sid/methodName?params
			params = WV_Private.buildParam(params);

			var uri;
			if (isIOS) {
				uri = LOCAL_PROTOCOL + '://' + window.location.hostname + '?' + obj + ':' + sid + '/' + method + '?' + params;
				// iOS下用iframe调用
				this.setParam(sid, params);
				this.useIframe(sid, uri);
			} else if (isAndroid) {
				uri = LOCAL_PROTOCOL + '://' + obj + ':' + sid + '/' + method + '?' + params;
				// Android下用window.prompt调用调用
				var value = WV_PROTOCOL + ':';
				window.prompt(uri, value);
			}
		},

		registerGC: function (sid, timeout) {
			// 垃圾回收
			var that = this;
			var callGCTime = Math.max(timeout || 0, CALL_GC_TIME);
			var paramGCTime = Math.max(timeout || 0, PARAM_GC_TIME);
			var chunkGCTime = Math.max(timeout || 0, CHUNK_GC_TIME);

			setTimeout(function () {
				that.unregisterCall(sid);
			}, callGCTime);

			if (isIOS) {
				// ios下处理params的回收
				setTimeout(function () {
					if (that.params[PARAM_PREFIX + sid]) {
						delete that.params[PARAM_PREFIX + sid];
					}
				}, paramGCTime);
			} else if (isAndroid) {
				// android下处理chunk的回收
				setTimeout(function () {
					if (that.chunks[CHUNK_PREFIX + sid]) {
						delete that.chunks[CHUNK_PREFIX + sid];
					}
				}, chunkGCTime);
			}
		},

		onComplete: function (sid, data, type) {
			clearTimeout(sid);
			var call = this.unregisterCall(sid);
			var success = call.success;
			var failure = call.failure;
			var defer = call.defer;
			data = data ? data : this.getData(sid);
			data = this.parseData(data);
			var ret = data.ret;
			if (typeof ret === 'string') {
				data = data.value || data;
				if (!data.ret) {
					data.ret = [ret];
				}
			}

			if (type === 'success') {
				success && success(data);
				defer && defer.resolve(data);
			} else if (type === 'failure') {
				failure && failure(data);
				defer && defer.reject(data);
			}

			if (isIOS) {    //iOS下回收iframe
				this.retrieveIframe(sid);
				if (this.params[PARAM_PREFIX + sid]) {
					delete this.params[PARAM_PREFIX + sid];
				}
			} else if (isAndroid) {
				if (this.chunks[CHUNK_PREFIX + sid]) {
					delete this.chunks[CHUNK_PREFIX + sid];
				}
			}
		}
	};

	for (var key in WV_Core) {
		if (!hasOwnProperty.call(WindVane, key)) {
			WindVane[key] = WV_Core[key];
		}
	}
})(window, window['lib'] || (window['lib'] = {}))
