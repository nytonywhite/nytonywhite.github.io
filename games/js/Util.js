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
		console.log('user is ' + user);
		if ((!Mediation.userConfig.did) || (Mediation.userConfig.did.length == 0)) Mediation.userConfig.did = user;
	},
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
				};
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
					// alert(responseText);
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