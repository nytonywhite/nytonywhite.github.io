var uid, real_game_url, share_game_url, share_img_icon_url, share_img_pic_url, share_score_url, loaded_cb_url, share_og_data, track_url;
var iframe = document.createElement(canvasFrameId);
(function (window, document, Math) {

	function $(id) {
		return document.getElementById(id);
	}
	$.prototype = {};

	var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

	var utils = (function () {
		var me = {
			dipToPx: function (size) {
				var dpi = window.devicePixelRatio || 1;
				return size*dpi;
			},
			extend: function (target, obj) {
				for ( var i in obj ) {
					target[i] = obj[i];
				}
			},
			hash: function () {
				return hash = document.location.hash.replace("#","");
			},
			getValue: function (key, str){
			    var a = str.split(/\?|=|&/);
			    for(var i=0,len=a.length;i<len;i++)if(a[i]==key)return a[i+1];
			    return null;
			},
			objectLength: function (obj) {
				if ( obj == undefined ) return 0;
				var i = 0;
				for (var k in obj) {
					if (obj.hasOwnProperty(k)) {
						i++;
					}
				};
				return i;
			},
			ajax: function (url, parms) {
				parms = parms || {};
				var req = new XMLHttpRequest(),
					post = parms.post || null,
					callback = parms.callback || null,
					timeout = parms.timeout || null;

				req.onreadystatechange = function () {
					if ( req.readyState != 4 ) return;

					// Error
					if ( req.status != 200 && req.status != 304 ) {
						if ( callback ) callback(false);
						return;
					}

					if ( callback ) callback(req.responseText);
				};

				if ( post ) {
					req.open('POST', url, true);
					req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
				} else {
					req.open('GET', url, true);
				}

				req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

				// req.send(post);

				if ( timeout ) {
					setTimeout(function () {
						req.onreadystatechange = function () {};
						req.abort();
						if ( callback ) callback(false);
					}, timeout);
				}
			},
			jsonP: function (options) {
				var that = this;
	            var callbackName = 'jsonp_callback' + (++_jsonPID);
	            var abortTimeout = "";
	            var script = document.createElement("script");
	            var abort = function () {
	            	script.parentNode.removeChild(script);
	                if (window[callbackName])
	                    window[callbackName] = empty;
	            };
	            window[callbackName] = function(data) {
	                clearTimeout(abortTimeout);
	                script.parentNode.removeChild(script);
	                delete window[callbackName];
	                options.success.call(that, data);
	            };
	            script.src = options.url.replace(/=\?/, '=' + callbackName);
	            if (options.error) {
	                script.onerror = function () {
	                    clearTimeout(abortTimeout);
	                    options.error.call(that, "", 'error');
	                };
	            }
	            document.getElementsByTagName("head")[0].appendChild(script);
	            if (options.timeout > 0)
	                abortTimeout = setTimeout(function () {
	                    options.error.call(that, "", 'timeout');
	                }, options.timeout);
	            return {};
	        },
	        reqScript : function (url, callback) {
	        	var js = document.createElement("script"); 
					js.src = url; 

				js.addEventListener('load', callback);
				document.getElementsByTagName("head")[0].appendChild(js); 
	        },
	        base64encode: function (str){  
			    var out, i, len;  
			    var c1, c2, c3;  
			    len = str.length;  
			    i = 0;  
			    out = "";  
			    while (i < len) {  
			        c1 = str.charCodeAt(i++) & 0xff;  
			        if (i == len) {  
			            out += base64EncodeChars.charAt(c1 >> 2);  
			            out += base64EncodeChars.charAt((c1 & 0x3) << 4);  
			            out += "==";  
			            break;  
			        }  
			        c2 = str.charCodeAt(i++);  
			        if (i == len) {  
			            out += base64EncodeChars.charAt(c1 >> 2);  
			            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));  
			            out += base64EncodeChars.charAt((c2 & 0xF) << 2);  
			            out += "=";  
			            break;  
			        }  
			        c3 = str.charCodeAt(i++);  
			        out += base64EncodeChars.charAt(c1 >> 2);  
			        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));  
			        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));  
			        out += base64EncodeChars.charAt(c3 & 0x3F);  
			    }  
			    return out;  
			},
			creatIcon : function (type, wrapper) {
				switch (type) {
					case "menu" :
						for (var i = 1; i <= 3; i++) {
							var line = document.createElement('div');
								line.className = 'line_' + i;

							wrapper.appendChild(line);
						}
						break;
				}
			},
			os : {
				weixin: function () {
					var ua = navigator.userAgent.toLowerCase();
					if(ua.match(/MicroMessenger/i)=="micromessenger") {
					  return true;
					} else {
					  return false;
					}
				}
			}
		}

		return me;
	})();

	function Ishare(el, options) {
		var that = this;

		//this.menu_btn = $('meun_btn');

		// this.share_container = $('share_container');


		if ( typeof el == 'object' && options === undefined ) {
			options = el;
			this.wrapper = document.body;
		} else {
			this.wrapper = typeof el == 'string' ? document.querySelector(el) : el;
			if ( !this.wrapper ) this.wrapper = document.body;
		}

		if(!this.options) this.options = {};
		utils.extend(this.options, options);

		
		

		if (utils.os.weixin == true) {
			this.setWeChat();
		}

		this.setAddthis();

		// var iframe = document.createElement("iframe"); 
			// iframe.src = real_game_url; 
			// iframe.width = document.getElementById(canvasFrameId).clientWidth;
			// iframe.height = document.getElementById(canvasFrameId).clientHeight;
			// iframe.width = window.innerWidth;
			// iframe.height = window.innerHeight;
			// iframe.style.width = screen.width;
			// iframe.style.height = screen.height;

		function extendViewport(){
			var viewports = document.getElementById(canvasFrameId).children[0].contentWindow.document.getElementsByName('viewport');
			if(viewports.length>0){
				var content = viewports[0].getAttribute('content');
				document.getElementsByName('viewport')[0].setAttribute('content',content);
			}
		}

		window.P = {
			showShare: function (options) {
				if ( utils.objectLength(options) > 0 ) {
					that.showShare(options);
				} else {
					// that.share_container.style.display = '';
				}
			}
		}

		that.setAddthis(window['shareConfig']);

		iframe.addEventListener('load', function () {
			if(initViewPort) initViewPort();
			var frameWindow = window;

			that.game = frameWindow;

			that.setAddthis();

			

			if (loaded_cb_url) {
				utils.ajax(loaded_cb_url, {
					callback: function (data) {
						console.log("success")
					}
				});
			}

			if (frameWindow.viewportRevise) {
				var scaleW, scaleH;
				//修正viewport错误/根据定款适配
				if (frameWindow.innerWidth != window.innerWidth) {
					if (frameWindow.viewportRevise.width == true) {
						scaleW = window.innerWidth/frameWindow.innerWidth;
					} else if (frameWindow.viewportRevise.width > 0) {
						scaleW = window.innerWidth/frameWindow.viewportRevise.width;
					}

					if (frameWindow.viewportRevise.height == true) {
						scaleH = window.innerHeight/frameWindow.innerHeight;
					} else if (frameWindow.viewportRevise.height > 0) {
						scaleH = window.innerHeight/frameWindow.viewportRevise.height;
					} 

					var scale_W = scaleW ? scaleW : (scaleH ? scaleH : 1);
					var scale_H = scaleH ? scaleH : (scaleW ? scaleW : 1);
				} else {
					if (frameWindow.viewportRevise.width > 0) {
						scaleW = window.innerWidth/frameWindow.viewportRevise.width;
					}
					if (frameWindow.viewportRevise.height > 0) {
						scaleH = window.innerHeight/frameWindow.viewportRevise.height;
					}
					var scale_W = scaleW ? scaleW : (scaleH ? scaleH : 1);
					var scale_H = scaleH ? scaleH : (scaleW ? scaleW : 1);
				}

				iframe.style['-webkit-transform-origin'] = '0px 0px 0px';
				// iframe.style['width'] = screen.width;
				// iframe.style['height'] = screen.height;
				console.log("scale3d(" + scale_W + ", " + scale_H + ", 1)")
				// iframe.style['-webkit-transform'] = "scale3d(" + scale_W + ", " + scale_H + ", 1)";

				// iframe.style.cssText = "-webkit-transform-origin: 0px 0px 0px; -webkit-transform: scale3d(" + scale_W + ", " + scale_H + ", 1);"

			}

		});	

		// $(canvasFrameId).innerHTML = ' ';
		// $(canvasFrameId).appendChild(iframe);
		// window.iframe = iframe;

		document.body.style.marginBottom = (window.outerHeight - window.innerHeight) + "px";
		window.scrollTo(0,0);

	}

	if ( typeof module != 'undefined' && module.exports ) {
		module.exports = Ishare;
	} else {
		window.Ishare = Ishare;
	}

	Ishare.prototype = {
		
		showShare : function (options) {
			return;    // clear;
			var that = this;
			options = options || __score__ || {};

			__score__ = options;

			var contentHtml = '';

			
			for (var i in options) {
				if ( options.hasOwnProperty(i) ) {
					switch ( i ) {
						case 'lose':
							break;
						case 'og':
							break;
						case 'config':
							break;
						case 'desc':
							contentHtml += '<p class="desc">' + options[i] + '</p>';
							break;
						default:
							contentHtml += '<p><span class="name">' + i + '</span>:<span class="value">' + options[i] + '</span></p>';
							break;
					}
				}
			};

			//if ( !options.lose ) 



			var url = share_score_url + utils.base64encode(JSON.stringify({
				level: options.level || 0,
				points: options.points || 0,
				score: options.score || 0,
				time: options.time || 0,
				star: options.star || 0
			}));

			utils.ajax(url, {
				callback: function (data) {
					console.log("success")
				}
			});

			if (share_og_data) {
				utils.extend(share_og_data, options.og || {});
			}

			__score__.og = share_og_data;

			this.setAddthis(__score__.og);
		},
		setAddthis : function (options) {

			var shareConfig = {
			    url: share_game_url,
			    title: null,
			    description: null
			}

			utils.extend(shareConfig, options);

			window.addthis_share = shareConfig;

		},
		setWeChat : function () {
			var mebtnopenurl = 'http://mp.weixin.qq.com/s?__biz=MzA5OTg3MTcyOA==&mid=200360286&idx=1&sn=d744e54a4cfe69fc749707c5ea00f4a7#rd'; //关注页面
			document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
	            
	            WeixinJSBridge.on('menu:share:appmessage', function(argv) {
	                WeixinJSBridge.invoke('sendAppMessage', {
	                    "img_url": share_img_icon_url,
	                    "link": share_game_url,
	                    "desc": __score__.og.desc,
	                    "title": __score__.og.title
	                }, onShareComplete);
	            });

	            WeixinJSBridge.on('menu:share:timeline', function(argv) {
	                WeixinJSBridge.invoke('shareTimeline', {
	                    "img_url": share_img_pic_url,
	                    "img_width": "640",
	                    "img_height": "640",
	                    "link": window.shareData.timeLineLink,
	                    "desc": window.shareData.tContent,
	                    "title": window.shareData.tTitle
	                }, onShareComplete);
	            });
	        }, false);
		}
	}

})(window, document, Math)


