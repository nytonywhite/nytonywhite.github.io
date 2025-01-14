var Mvjssdk = Mvjssdk || {};
Mvjssdk.Util = {
	domHelper: function(domPath) {
		var me = this;
		var innerCss = me.cssHelper();
		var dom;
		if ((typeof domPath) == 'string') {
			dom = document.createElement(domPath);
		} else if (domPath.el) {
			dom = domPath.el;
		} else if (Mvjssdk.Util.isDom(domPath)) {
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
			parent:function() {
				if (this.el.parentElement) {
					return Mvjssdk.Util.domHelper(this.el.parentElement);
				}else{
					return null;
				}
			},
			remove: function() {
				if (this.el.parentElement) {
					this.el.parentElement.removeChild(this.el);
				} else {
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
			transformCssKey: function(key) {
				var newKey = '';
				var keyWordArray = key.split('-');
				for (var i = 0, iMax = keyWordArray.length; i < iMax; i++) {
					if (i == 0) {
						newKey += keyWordArray[i];
					} else {
						newKey += keyWordArray[i].charAt(0).toUpperCase() + keyWordArray[i].slice(1);
					}
				}
				// console.log(newKey);
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
	cancelBubble: function(evt) {
		var e = (evt) ? evt : window.event;
		if (window.event) {
			e.cancelBubble = true;
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
	dateDiff: function(dateOne, dateTwo, diffType) {
		var diff = 0;
		var isNegative = (dateTwo - dateOne>0)? 1:-1;
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
		return isNegative*Math.abs(diff);
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

			var url = param.url + Mvjssdk.Util.parseToUrl(param.data) + '&campaignids=' + Mediation.campaignArray.getData().filterByFCA().toIdString(); //.filterByTime(0,'minute').toIdString();
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
					if (param.error) param.error();
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
				};
				script.onerror = function() {
					if (error) error();
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
			url += ('?'+Mvjssdk.Util.parseToUrl(ajaxParam.data));
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
					// alert(responseText);
					if (ajaxParam.success) {
						if (ajaxParam.contentType == 'json' || ajaxParam.contentType == 'JSON') {
							try {
								ajaxParam.success(JSON.parse(responseText));
							} catch (e) {
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
	checkIP: function(callbackParam) {
		this.mobvistaAjax({
			url: 'http://ip-api.com/json',
			type: 'get',
			dataType: 'json',
			contentType: 'json',
			success: function(data) {
				console.log(data);
				if (callbackParam && callbackParam.success) callbackParam.success();
			},
			error: function(data) {
				console.log(data);
				if (callbackParam && callbackParam.error) callbackParam.error();
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
	},
	recalc: function(){
		var docEl = document.documentElement;
		var clientWidth = docEl.clientWidth;
		var clientHeight = docEl.clientHeight;
		if (!clientWidth || !clientHeight) return;
		var bb = 100 * (clientWidth / 720) < 100 ? 100 * (clientWidth / 720) : 100;
		var cc = 100 * (clientHeight / 700) < 100 ? 100 * (clientHeight / 700) : 100;
		var dd = cc < bb ? cc : bb;
		docEl.style.fontSize = dd + 'px';

		if (window.resizeBannerSection) resizeBannerSection();
	},
	md5: (function() {
		/*
		 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
		 * Digest Algorithm, as defined in RFC 1321.
		 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
		 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
		 * Distributed under the BSD License
		 * See http://pajhome.org.uk/crypt/md5 for more info.
		 */

		/*
		 * Configurable variables. You may need to tweak these to be compatible with
		 * the server-side, but the defaults work in most cases.
		 */
		var hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase        */
		var b64pad = ""; /* base-64 pad character. "=" for strict RFC compliance   */
		var chrsz = 8; /* bits per input character. 8 - ASCII; 16 - Unicode      */

		/*
		 * These are the functions you'll usually want to call
		 * They take string arguments and return either hex or base-64 encoded strings
		 */


		/*
		 * Calculate the MD5 of an array of little-endian words, and a bit length
		 */
		function core_md5(x, len) {
			/* append padding */
			x[len >> 5] |= 0x80 << ((len) % 32);
			x[(((len + 64) >>> 9) << 4) + 14] = len;

			var a = 1732584193;
			var b = -271733879;
			var c = -1732584194;
			var d = 271733878;

			for (var i = 0; i < x.length; i += 16) {
				var olda = a;
				var oldb = b;
				var oldc = c;
				var oldd = d;

				a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
				d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
				c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
				b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
				a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
				d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
				c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
				b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
				a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
				d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
				c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
				b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
				a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
				d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
				c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
				b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

				a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
				d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
				c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
				b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
				a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
				d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
				c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
				b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
				a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
				d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
				c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
				b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
				a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
				d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
				c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
				b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

				a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
				d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
				c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
				b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
				a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
				d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
				c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
				b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
				a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
				d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
				c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
				b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
				a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
				d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
				c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
				b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

				a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
				d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
				c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
				b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
				a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
				d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
				c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
				b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
				a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
				d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
				c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
				b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
				a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
				d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
				c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
				b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

				a = safe_add(a, olda);
				b = safe_add(b, oldb);
				c = safe_add(c, oldc);
				d = safe_add(d, oldd);
			}
			return Array(a, b, c, d);

		}

		/*
		 * These functions implement the four basic operations the algorithm uses.
		 */
		function md5_cmn(q, a, b, x, s, t) {
			return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
		}

		function md5_ff(a, b, c, d, x, s, t) {
			return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
		}

		function md5_gg(a, b, c, d, x, s, t) {
			return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
		}

		function md5_hh(a, b, c, d, x, s, t) {
			return md5_cmn(b ^ c ^ d, a, b, x, s, t);
		}

		function md5_ii(a, b, c, d, x, s, t) {
			return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
		}

		/*
		 * Calculate the HMAC-MD5, of a key and some data
		 */
		function core_hmac_md5(key, data) {
			var bkey = str2binl(key);
			if (bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

			var ipad = Array(16),
				opad = Array(16);
			for (var i = 0; i < 16; i++) {
				ipad[i] = bkey[i] ^ 0x36363636;
				opad[i] = bkey[i] ^ 0x5C5C5C5C;
			}

			var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
			return core_md5(opad.concat(hash), 512 + 128);
		}

		/*
		 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
		 * to work around bugs in some JS interpreters.
		 */
		function safe_add(x, y) {
			var lsw = (x & 0xFFFF) + (y & 0xFFFF);
			var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
			return (msw << 16) | (lsw & 0xFFFF);
		}

		/*
		 * Bitwise rotate a 32-bit number to the left.
		 */
		function bit_rol(num, cnt) {
			return (num << cnt) | (num >>> (32 - cnt));
		}

		/*
		 * Convert a string to an array of little-endian words
		 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
		 */
		function str2binl(str) {
			var bin = Array();
			var mask = (1 << chrsz) - 1;
			for (var i = 0; i < str.length * chrsz; i += chrsz)
				bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
			return bin;
		}

		/*
		 * Convert an array of little-endian words to a string
		 */
		function binl2str(bin) {
			var str = "";
			var mask = (1 << chrsz) - 1;
			for (var i = 0; i < bin.length * 32; i += chrsz)
				str += String.fromCharCode((bin[i >> 5] >>> (i % 32)) & mask);
			return str;
		}

		/*
		 * Convert an array of little-endian words to a hex string.
		 */
		function binl2hex(binarray) {
			var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
			var str = "";
			for (var i = 0; i < binarray.length * 4; i++) {
				str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
					hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
			}
			return str;
		}

		/*
		 * Convert an array of little-endian words to a base-64 string
		 */
		function binl2b64(binarray) {
			var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
			var str = "";
			for (var i = 0; i < binarray.length * 4; i += 3) {
				var triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16) | (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8) | ((binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
				for (var j = 0; j < 4; j++) {
					if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;
					else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
				}
			}
			return str;
		}

		return {
			hex_md5: function(s) {
				return binl2hex(core_md5(str2binl(s), s.length * chrsz));
			},
			b64_md5: function(s) {
				return binl2b64(core_md5(str2binl(s), s.length * chrsz));
			},
			str_md5: function(s) {
				return binl2str(core_md5(str2binl(s), s.length * chrsz));
			},
			hex_hmac_md5: function(key, data) {
				return binl2hex(core_hmac_md5(key, data));
			},
			b64_hmac_md5: function(key, data) {
				return binl2b64(core_hmac_md5(key, data));
			},
			str_hmac_md5: function(key, data) {
				return binl2str(core_hmac_md5(key, data));
			}
		};
	})()
};

var Mvjssdk = Mvjssdk || {};
Mvjssdk.Cache = {
	setLocalStorage: function(key, value) {
		if(!localStorage) return;
		try{
			var objString = JSON.stringify(value);
			localStorage[key] = objString;
		}catch(e){};
	},
	getLocalStorage: function(key) {
		if(!localStorage) return null;
		var obj = localStorage[key];
		if (obj != null) {
			return JSON.parse(obj);
		} else {
			return null;
		}
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
				console.log("it's new");
			};
			console.log(user);
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
			console.log(document.cookie);
		},
		getHowManyYear: function(count) {
			var _date = new Date();
			console.log(_date.getDate() + (365 * count))
			_date.setDate(_date.getDate() + (365 * count));
			console.log(_date.toGMTString())
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
	initCookie: function() {
		var user = this.mobvistaCookie.init();
		console.log('user is ' + user);
		if ((!Mediation.userConfig.did) || (Mediation.userConfig.did.length == 0)) Mediation.userConfig.did = user;
	},
}

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
	'isDevTemplate':false,
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

var Mvjssdk = Mvjssdk || {};
Mvjssdk.Render = {
	'renderMode':'template_receive_data',
	'viewType':{
		'4':{
			'name':'banner',
			'size':{
				'width':320,
				'height':50,
				'dimension':'pixel',
				'sizeType':4
			},
			'viewBackgroundColor':'transparent',
			'url':'http://www.rayjump.com/upload/app/jssdk/template/banner.html',
			'devUrl':'template/banner.dev.html',
			initFrame:function(adUnit,adUnitData){
				var me = this;

				var dataString = JSON.stringify(adUnitData);
				var dataUrlString = '?data='+escape(encodeURIComponent(dataString));

				var closeable = adUnit.el.attr('closeable')||'false';
				var viewStyle = adUnit.el.attr('style');
				var position = adUnit.el.attr('position')||'bottom';
				var frameWarpper = Mvjssdk.Util.domHelper('div');
				var frame = Mvjssdk.Util.domHelper('iframe');

				var frameWidth = Mvjssdk.Configer['currentScreen']['width'];
				var frameHeight = Math.floor(frameWidth*me['size']['height']/me['size']['width']);
				if(viewStyle&&viewStyle.length>0){
					frameWarpper.attr('style',viewStyle);
				}else{
					var frameWarpCss;
					switch(position){
						case 'bottom':
							frameWarpCss = {
								'display':'block',
								'position':'fixed',
								'z-index':'99990',
								'bottom':'0px',
								'left':'0px'
							};
						break;
						case 'top':
							frameWarpCss = {
								'display':'block',
								'position':'fixed',
								'z-index':'99990',
								'top':'0px',
								'left':'0px',
								'background-color':me['viewBackgroundColor']
							};
						break;
						default:
							var parent = adUnit.el.parent();
							if(parent!=null){
								var parentSize = parent.el.getBoundingClientRect();
								frameWidth = parentSize['width'];
								frameHeight = Math.floor(frameWidth*me['size']['height']/me['size']['width']);
							}else{
								frameWidth = me['size']['width'];
								frameHeight = me['size']['height'];
							}
						
							frameWarpCss = {
								'display':'inline-block',
								'position':'relative',
								'background-color':me['viewBackgroundColor']
							}

					}
					frameWarpCss['width'] = frameWidth+'px';
					frameWarpCss['height'] = frameHeight+'px';
					frameWarpCss['margin'] = '0';
					frameWarpCss['padding'] = '0';
					frameWarpCss['border'] = 'none';
					frameWarpper.css(frameWarpCss);
					Mvjssdk.Util.replaceEach(frameWarpper.el,adUnit['el'].el);
				}
				var templateUrl = Mvjssdk.Configer['isDevTemplate']?me['devUrl']:me['url'];
				frame.css({
					'width':'100%',
					'height':'100%',
					'margin':'0',
					'padding':'0',
					'border':'none'
				}).insertTo(frameWarpper).attr('src',templateUrl+dataUrlString);



				if(closeable=='true'){
					var frameWarpperSize = frameWarpper.size();
					var closeWidth = Math.floor(frameWarpperSize['height']/4);
					Mvjssdk.Render.addCloseButton(frameWarpper,closeWidth);
				}
			}
		},
		'5':{
			'name':'fullscreen',
			'size':{
				'width':100,
				'height':100,
				'dimension':'scale',
				'sizeType':5
			},
			'viewBackgroundColor':'transparent',
			'url':'http://www.rayjump.com/upload/app/jssdk/template/full_screen.html',
			'devUrl':'template/full_screen.dev.html',
			initFrame:function(adUnit,adUnitData){
				var me = this;

				var dataString = JSON.stringify(adUnitData);
				var dataUrlString = '?data='+escape(encodeURIComponent(dataString));

				var closeable = adUnit.el.attr('closeable')||'false';
				var viewStyle = adUnit.el.attr('style');
				var position = adUnit.el.attr('position')||'bottom';
				var frameWarpper = Mvjssdk.Util.domHelper('div');
				var frame = Mvjssdk.Util.domHelper('iframe');

				frameWarpper.css({
					'position':'fixed',
					'z-index':99999,
					'top':'0px',
					'left':'0px',
					'right':'0px',
					'bottom':'0px'
				});
				var frameWidth = Mvjssdk.Configer['currentScreen']['width'];
				var frameHeight = Mvjssdk.Configer['currentScreen']['height'];
				var templateUrl = Mvjssdk.Configer['isDevTemplate']?me['devUrl']:me['url'];
				frame.css({
					'width':'100%',
					'height':'100%',
					'margin':'0',
					'padding':'0',
					'border':'none'
				}).insertTo(frameWarpper).attr('src',templateUrl+dataUrlString);
				Mvjssdk.Util.replaceEach(frameWarpper.el,adUnit['el'].el);


				if(true){//fullscreen must have close button
					var frameWarpperSize = frameWarpper.size();
					var closeWidth = Math.floor(frameWarpperSize['width']/15);
					Mvjssdk.Render.addCloseButton(frameWarpper,closeWidth);
				}
			}
				
		},
		'6':{
			'name':'listblock',
			'size':{
				'width':985,
				'height':345,
				'dimension':'pixel',
				'sizeType':6
			},
			'viewBackgroundColor':'transparent',
			'url':'http://www.rayjump.com/upload/app/jssdk/template/listblock.html',
			'devUrl':'template/listblock.dev.html',
			initFrame:function(adUnit,adUnitData){
				var me = this;

				var dataString = JSON.stringify(adUnitData);
				var dataUrlString = '?data='+escape(encodeURIComponent(dataString));

				var closeable = adUnit.el.attr('closeable')||'false';
				var viewStyle = adUnit.el.attr('style');
				var position = adUnit.el.attr('position')||'bottom';
				var frameWarpper = Mvjssdk.Util.domHelper('div');
				var frame = Mvjssdk.Util.domHelper('iframe');

				var frameWidth = Mvjssdk.Configer['currentScreen']['width'];
				var frameHeight = Math.floor(frameWidth*me['size']['height']/me['size']['width']);
				if(viewStyle&&viewStyle.length>0){
					frameWarpper.attr('style',viewStyle);
				}else{
					var frameWarpCss;
					switch(position){
						case 'bottom':
							frameWarpCss = {
								'display':'block',
								'position':'fixed',
								'z-index':'99991',
								'bottom':'0px',
								'left':'0px'
							};
						break;
						case 'top':
							frameWarpCss = {
								'display':'block',
								'position':'fixed',
								'z-index':'99991',
								'top':'0px',
								'left':'0px',
								'background-color':me['viewBackgroundColor']
							};
						break;
						default:
							var parent = adUnit.el.parent();
							if(parent!=null){
								var parentSize = parent.el.getBoundingClientRect();
								frameWidth = parentSize['width'];
								frameHeight = Math.floor(frameWidth*me['size']['height']/me['size']['width']);
							}else{
								frameWidth = me['size']['width'];
								frameHeight = me['size']['height'];
							}
						
							frameWarpCss = {
								'display':'inline-block',
								'position':'relative',
								'background-color':me['viewBackgroundColor']
							}

					}
					frameWarpCss['width'] = frameWidth+'px';
					frameWarpCss['height'] = frameHeight+'px';
					frameWarpCss['margin'] = '0';
					frameWarpCss['padding'] = '0';
					frameWarpCss['border'] = 'none';
					frameWarpper.css(frameWarpCss);
					Mvjssdk.Util.replaceEach(frameWarpper.el,adUnit['el'].el);
				}
				var templateUrl = Mvjssdk.Configer['isDevTemplate']?me['devUrl']:me['url'];
				frame.css({
					'width':'100%',
					'height':'100%',
					'margin':'0',
					'padding':'0',
					'border':'none'
				}).insertTo(frameWarpper).attr('src',templateUrl+dataUrlString);



				if(closeable=='true'){
					var frameWarpperSize = frameWarpper.size();
					var closeWidth = Math.floor(frameWarpperSize['height']/8);
					Mvjssdk.Render.addCloseButton(frameWarpper,closeWidth,'lefttop');
				}
			}
		},
		'7':{
			'name':'pageblock',
			'size':{
				'width':1080,
				'height':755,
				'dimension':'pixel',
				'sizeType':7
			},
			'viewBackgroundColor':'transparent',
			'url':'http://www.rayjump.com/upload/app/jssdk/template/pageblock.html',
			'devUrl':'template/pageblock.dev.html',
			initFrame:function(adUnit,adUnitData){
				var me = this;

				var dataString = JSON.stringify(adUnitData);
				var dataUrlString = '?data='+escape(encodeURIComponent(dataString));

				var closeable = adUnit.el.attr('closeable')||'false';
				var viewStyle = adUnit.el.attr('style');
				var position = adUnit.el.attr('position')||'bottom';
				var frameWarpper = Mvjssdk.Util.domHelper('div');
				var frame = Mvjssdk.Util.domHelper('iframe');

				var frameWidth = Mvjssdk.Configer['currentScreen']['width'];
				var frameHeight = Math.floor(frameWidth*me['size']['height']/me['size']['width']);
				if(viewStyle&&viewStyle.length>0){
					frameWarpper.attr('style',viewStyle);
				}else{
					var frameWarpCss;
					switch(position){
						case 'bottom':
							frameWarpCss = {
								'display':'block',
								'position':'fixed',
								'z-index':'99992',
								'bottom':'0px',
								'left':'0px'
							};
						break;
						case 'top':
							frameWarpCss = {
								'display':'block',
								'position':'fixed',
								'z-index':'99992',
								'top':'0px',
								'left':'0px',
								'background-color':me['viewBackgroundColor']
							};
						break;
						default:
							var parent = adUnit.el.parent();
							if(parent!=null){
								var parentSize = parent.el.getBoundingClientRect();
								frameWidth = parentSize['width'];
								frameHeight = Math.floor(frameWidth*me['size']['height']/me['size']['width']);
							}else{
								frameWidth = me['size']['width'];
								frameHeight = me['size']['height'];
							}
						
							frameWarpCss = {
								'display':'inline-block',
								'position':'relative',
								'background-color':me['viewBackgroundColor']
							}

					}
					frameWarpCss['width'] = frameWidth+'px';
					frameWarpCss['height'] = frameHeight+'px';
					frameWarpCss['margin'] = '0';
					frameWarpCss['padding'] = '0';
					frameWarpCss['border'] = 'none';
					frameWarpper.css(frameWarpCss);
					Mvjssdk.Util.replaceEach(frameWarpper.el,adUnit['el'].el);
				}
				var templateUrl = Mvjssdk.Configer['isDevTemplate']?me['devUrl']:me['url'];
				frame.css({
					'width':'100%',
					'height':'100%',
					'margin':'0',
					'padding':'0',
					'border':'none'
				}).insertTo(frameWarpper).attr('src',templateUrl+dataUrlString);



				if(closeable=='true'){
					var frameWarpperSize = frameWarpper.size();
					var closeWidth = Math.floor(frameWarpperSize['height']/15);
					Mvjssdk.Render.addCloseButton(frameWarpper,closeWidth);
				}
			}
		}
	},
	addCloseButton:function(frameWarpper,closeWidth,position){
		var closeButtonBgColor = 'rgba(255,255,255,0.3)';
		var closeButtonBorderColor = 'rgba(255,255,255,0.3)';
		var closeButtonCrossColor = 'rgba(255,255,255,1)';
		var position = position||'righttop';
		var topPosition = position.indexOf('top')>=0?'top':'bottom';
		var leftPosition = position.indexOf('left')>=0?'left':'right';
		var closeHalfWidth = Math.floor(closeWidth/2);
		var closeMargin = Math.floor(closeWidth/3);
		var closeEl = Mvjssdk.Util.domHelper('div').css({
			'display':'block',
			'width':closeWidth+'px',
			'height':closeWidth+'px',
			'border':'3px solid '+closeButtonBorderColor,
			'border-radius':closeHalfWidth+'px',
			'position':'absolute',
			'z-index':10,
			'-webkit-transform':'rotate(-45deg)',
			'-moz-transform':'rotate(-45deg)',
			'-ms-transform':'rotate(-45deg)',
			'-o-transform':'rotate(-45deg)',
			'transform':'rotate(-45deg)',
			'background-color':closeButtonBgColor
		}).css(topPosition,(closeMargin+'px'))
		.css(leftPosition,(closeMargin+'px')).insertTo(frameWarpper).bind('click',function(e){
			Mvjssdk.Util.domHelper(this.parentNode).remove();
		}).bind('touchend',function(e){
			Mvjssdk.Util.domHelper(this.parentNode).remove();
		});
		var closeElBrickThick = Math.ceil(closeWidth/10);
		var closeElBrickHalfThick = Math.ceil(closeElBrickThick/2);
		var closeElVb = Mvjssdk.Util.domHelper('div').css({
			'display':'block',
			'width':closeElBrickThick+'px',
			'height':closeWidth+'px',
			'border-radius':closeElBrickHalfThick+'px',
			'position':'absolute',
			'left':'50%',
			'margin-left':'-'+closeElBrickHalfThick+'px',
			'top':'0px',
			'background-color':closeButtonCrossColor
		}).insertTo(closeEl);

		var closeElLb = Mvjssdk.Util.domHelper('div').css({
			'display':'block',
			'width':closeWidth+'px',
			'height':closeElBrickThick+'px',
			'border-radius':closeElBrickHalfThick+'px',
			'position':'absolute',
			'top':'50%',
			'margin-top':'-'+closeElBrickHalfThick+'px',
			'left':'0px',
			'background-color':closeButtonCrossColor
		}).insertTo(closeEl);
	},
	'template':{
		init:function (resultData,renderAction) {
			switch(Mvjssdk.Render['renderMode']){
				case 'template_receive_data':
					var dataString = Mvjssdk.Util.getQueryString(window.location.href,'data');
                  	var resultData = JSON.parse(decodeURIComponent(dataString));
                  	renderAction(resultData);
				break;
				case 'template_request_data':

				break;
				case 'template_within_data':
					renderAction(resultData);
					Mvjssdk.Offer.preClickOffer(resultData);
					Mvjssdk.Offer.setNoticeImpression(resultData);
				break;
				case 'local_request_data':

				break;
			}
		}
	},
	'renderAction':{
		template:function(adUnitData,adUnit,callback){
			//to do

			if(callback) callback();
		},
		local:function(adUnitData,adUnit,callback){}
	},
	renderOffer:function(adUnitData,adUnit,callback){
		console.log(adUnit.el.el);
		var me = this;
		var renderMode = me['renderMode'];
		// console.log(adUnitData);
		var viewType = adUnit['viewType'];
		me['viewType'][viewType].initFrame(adUnit,adUnitData);
		if(callback) callback();
	}
};


var Mvjssdk = Mvjssdk||{};
Mvjssdk.Logger = {
	debug:true,
	uploadLog:true,
	init: function(){

		this['debug'] = (Mvjssdk.Util.getQueryString(window.location.href,'mvLogDebug')=='true')?true:(Mvjssdk.Configer['isLogShow']||false);
		if(this.debug==false) console.log = function(){};
	},
	post: function(){
		if(this.uploadLog==true){
			//dopost
		}
	}
};

var Mvjssdk = Mvjssdk || {};

Mvjssdk.Util.addListener(document,'DOMContentLoaded',function(){
	Mvjssdk.Logger.init();
	if(Mvjssdk.Configer.init()){
		Mvjssdk.Offer.init();
	}
});