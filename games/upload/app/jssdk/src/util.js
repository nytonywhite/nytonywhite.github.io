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