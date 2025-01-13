var editorAppsLength = 6;
var awesomeAppsLength = 4;
var likeAppsLength = 5;
var holdAppsLength = editorAppsLength+awesomeAppsLength+likeAppsLength;
var Util = {
	insertSense:function(){
		var sensePubIdKey = 'mvSensePubIdKey';
		var sensePubId = this.getLocalStorage[sensePubIdKey];

		var senseUnitIdKey = 'mvSenseUnitIdKey';
		var senseUnitId = this.getLocalStorage[senseUnitIdKey];


		function initSense(pubId,unitId){

			var bannerContainer = document.getElementById('innerSense');
			var bannerContainerWidth = bannerContainer.clientWidth;
			var bannerScale = bannerContainerWidth/336;

            var sen = document.getElementById('sen');
            sen.setAttribute('data-ad-client',pubId);
            sen.setAttribute('data-ad-slot',unitId);
            sen.className = 'adsbygoogle show';
            sen.style.webkitTransform = 'scale('+bannerScale+')';
            sen.style.mozTransform = 'scale('+bannerScale+')';
            sen.style.msTransform = 'scale('+bannerScale+')';
            sen.style.oTransform = 'scale('+bannerScale+')';
            sen.style.transform = 'scale('+bannerScale+')';


			(adsbygoogle = window.adsbygoogle || []).push({});
		}

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
	insertApps: function(adCount, container) {
		var me = this;
		param.init();
		var url = me.getUrl(param, adCount);

		me.mobvistaAjax({
			url: url,
			type: 'get',
			dataType: 'json',
			contentType: 'json',
			success: function(result) {
				var data = [];
				if (result.status == 1&&result.data.length>0&&param.platform==1) {
					data = result.data;
				}

				var allAppsLength = data.length;
				var realEditorAppsLength = Math.floor(editorAppsLength/holdAppsLength*allAppsLength);
				var realAwesomeAppsLength = Math.floor(awesomeAppsLength/holdAppsLength*allAppsLength);
				var realLikeAppsLength = Math.floor(likeAppsLength/holdAppsLength*allAppsLength);

				console.log(realEditorAppsLength);
				console.log(realAwesomeAppsLength);
				console.log(realLikeAppsLength);

				var likeAppsArray = data.slice(0,0+realLikeAppsLength);
				var awesomeAppsArray = data.slice(realLikeAppsLength,realLikeAppsLength+realAwesomeAppsLength);
				var editorAppsArray = data.slice(realLikeAppsLength+realAwesomeAppsLength, allAppsLength);

				if(editorAppsArray.length<editorAppsLength) editorAppsArray = editorAppsArray.concat(me.getBackupApps(editorAppsLength - editorAppsArray.length));
				if(awesomeAppsArray.length<awesomeAppsLength) awesomeAppsArray = awesomeAppsArray.concat(me.getBackupApps(awesomeAppsLength - awesomeAppsArray.length));
				if(likeAppsArray.length<likeAppsLength) likeAppsArray = likeAppsArray.concat(me.getBackupApps(likeAppsLength - likeAppsArray.length));

				console.log(editorAppsArray);
				console.log(awesomeAppsArray);
				console.log(likeAppsArray);

				me.initEditorApps(editorAppsArray);
				me.initAwesomeApps(awesomeAppsArray);
				me.initLikeApps(likeAppsArray)

				return;

				var editorApps = data.pop();
				if(new Date().getTimezoneOffset()/60!=-8&&navigator.language!='zh-CN'&&Math.floor(Math.random()*10)>7) {editorApps = me.getBackupApps(1,0)[0];}
				if(editorApps==null) editorApps = me.getBackupApps(1)[0];
				me.initEditorApps(editorApps);
				container.innerHTML = '';
				var restSlotCount = adCount-1-data.length;
				if(restSlotCount>0) data = data.concat(me.getBackupApps(restSlotCount));
				me.initMiddleApps(data,container);

			},
			error: function(result) {
				console.log(result);
			}

		});
	},
	initEditorApps:function(apps){
		var me = this;
		

		var editAppList = document.getElementById('editAppList');
            editAppList.innerHTML = '';
        for(var i=0,iMax=apps.length;i<iMax;i++){
            var app = apps[i];
			var clickUrl = app['type']=='rayjump' ? app['click_url']:me.updateClickUrl(app);
            me.insertEditor({
                'name':app.title,
                'icon':app.icon_url,
                'href':clickUrl
            });
        };
		
		

		
	},
	insertEditor:function(app){
        var editAppList = document.getElementById('editAppList');
        var aTag = document.createElement('a');
            aTag.target = '_blank';
            aTag.href = app.href;
        var iconTag = document.createElement('span');
            iconTag.className = 'icon';
            iconTag.style.backgroundImage = 'url("'+app.icon+'")';
            aTag.appendChild(iconTag);
        var starTag = document.createElement('img');
            starTag.className = 'star';
            starTag.src = 'star.jpg';
            aTag.appendChild(starTag);
        var nameTag = document.createElement('span');
            nameTag.className = 'name';
            nameTag.innerHTML = app.name;
            aTag.appendChild(nameTag);
        var btnTag = document.createElement('span');
            btnTag.className = 'btn';
            btnTag.innerHTML = 'Play Now';
            aTag.appendChild(btnTag);
        editAppList.appendChild(aTag);


        aTag.onclick = function(){
			if(app['type']!='rayjump'){
				var notice = document.createElement('iframe');
				notice.className = 'noticeframe';
				notice.src = app['notice_url'];
				document.body.appendChild(notice);
				ga('send', 'event', 'ad_traffic', 'traffic_lp', 'adn_click_'+app['id']);
			}else{
				ga('send', 'event', 'ad_traffic', 'traffic_lp', 'game_click_'+app['id']);
			}
			var targetUrl = document.createElement('a');
			targetUrl.className = 'noticeframe';
			targetUrl.target = '_blank';
			targetUrl.href = clickUrl;
			document.body.appendChild(targetUrl);

			window.setTimeout(function(){
				me.triggerEvent(targetUrl,'click');
			},300)
		}

    },
	initAwesomeApps:function(apps){
		var me = this;
		
		var awesomeAppList = document.getElementById('awesomeAppList');
            awesomeAppList.innerHTML = '';
        for(var j=0,jMax=apps.length;j<jMax;j++){
            var app = apps[j];
			var clickUrl = app['type']=='rayjump' ? app['click_url']:me.updateClickUrl(app);
            insertAwesome({
                'name':app.title,
                'icon':app.icon_url,
                'href':clickUrl
            });
        };
	},

	insertAwesome: function(app){
        var awesomeAppList = document.getElementById('awesomeAppList');
        var aTag = document.createElement('a');
            aTag.target = '_blank';
            aTag.href = app.href;
        var iconTag = document.createElement('span');
            iconTag.className = 'icon';
            iconTag.style.backgroundImage = 'url("'+app.icon+'")';
            aTag.appendChild(iconTag);
        var nameTag = document.createElement('span');
            nameTag.className = 'name';
            nameTag.innerHTML = app.name;
            aTag.appendChild(nameTag);
        var starTag = document.createElement('img');
            starTag.className = 'star';
            starTag.src = 'star.jpg';
            aTag.appendChild(starTag);
        var btnTag = document.createElement('span');
            btnTag.className = 'btn';
            btnTag.innerHTML = ' ';
            aTag.appendChild(btnTag);
        awesomeAppList.appendChild(aTag);

        aTag.onclick = function(){
			if(app['type']!='rayjump'){
				var notice = document.createElement('iframe');
				notice.className = 'noticeframe';
				notice.src = app['notice_url'];
				document.body.appendChild(notice);
				ga('send', 'event', 'ad_traffic', 'traffic_lp', 'adn_click_'+app['id']);
			}else{
				ga('send', 'event', 'ad_traffic', 'traffic_lp', 'game_click_'+app['id']);
			}
			var targetUrl = document.createElement('a');
			targetUrl.className = 'noticeframe';
			targetUrl.target = '_blank';
			targetUrl.href = clickUrl;
			document.body.appendChild(targetUrl);

			window.setTimeout(function(){
				me.triggerEvent(targetUrl,'click');
			},300)
		}
    },
    initLikeApps:function(apps){
		var me = this;
		
		var likeAppList = document.getElementById('likeAppList');
            likeAppList.innerHTML = '';
       for(var k=0,kMax=apps.length;k<kMax;k++){
            var app = apps[k];
			var clickUrl = app['type']=='rayjump' ? app['click_url']:me.updateClickUrl(app);
            insertLike({
                'name':app.title,
                'icon':app.icon_url,
                'href':clickUrl
            });
        };
	},

	insertLike: function(app){
        var likeAppList = document.getElementById('likeAppList');
        var aTag = document.createElement('a');
            aTag.target = '_blank';
            aTag.href = app.href;
        var iconTag = document.createElement('span');
            iconTag.className = 'icon';
            iconTag.style.backgroundImage = 'url("'+app.icon+'")';
            aTag.appendChild(iconTag);
        var contTag = document.createElement('div');
            contTag.className = 'cont';
        var nameTag = document.createElement('span');
            nameTag.className = 'name';
            nameTag.innerHTML = app.name;
            contTag.appendChild(nameTag);
        var starTag = document.createElement('img');
            starTag.className = 'star';
            starTag.src = 'star.jpg';
            contTag.appendChild(starTag);
        var descTag = document.createElement('span');
            descTag.className = 'desc';
            descTag.innerHTML = app.desc;
            contTag.appendChild(descTag);
        aTag.appendChild(contTag);
        var btnContTag = document.createElement('div');
            btnContTag.className = 'btnCont';
        var btnTag = document.createElement('span');
            btnTag.className = 'btn';
            btnTag.innerHTML = 'Play Now';
            btnContTag.appendChild(btnTag);
        aTag.appendChild(btnContTag);
        likeAppList.appendChild(aTag);

        aTag.onclick = function(){
			if(app['type']!='rayjump'){
				var notice = document.createElement('iframe');
				notice.className = 'noticeframe';
				notice.src = app['notice_url'];
				document.body.appendChild(notice);
				ga('send', 'event', 'ad_traffic', 'traffic_lp', 'adn_click_'+app['id']);
			}else{
				ga('send', 'event', 'ad_traffic', 'traffic_lp', 'game_click_'+app['id']);
			}
			var targetUrl = document.createElement('a');
			targetUrl.className = 'noticeframe';
			targetUrl.target = '_blank';
			targetUrl.href = clickUrl;
			document.body.appendChild(targetUrl);

			window.setTimeout(function(){
				me.triggerEvent(targetUrl,'click');
			},300)
		}
    },
	updateClickUrl: function(app) {

		var install_token = app['install_token']||app['intall_token'];
		var impression = document.createElement('iframe');
		impression.className = 'noticeframe';
		impression.src = app['impression_url'];
		document.body.appendChild(impression);
		var clickUrl = 'http://tracking.lenzmx.com/click?mb_pl=only_android_phone&mb_nt=cb'+param['channel_id']+'&mb_campid='+app['offer_name']+'&mb_qp=1&mb_aff_sub='+install_token;
		console.log(clickUrl)
		return clickUrl;
	},
	backupApps:[{
            "gameId": 600016,
            "title": "Modern NFL",
            "desc": "Up until the 1960s, the NFL was the dominant professional football league and faced little competition. Rival leagues included three separate American Football Leagues and the All-America Football Conference (AAFC), none of which lasted for more than four seasons, although several teams from the AAFC joined the NFL after the league dissolved in 1949."
        },{
            "gameId": 600015,
            "title": "Kirby",
            "desc": "Kirby appears white in Kirby's Dream Land due to the grayscale palette of the Game Boy system. Sakurai intended the character to be pink, though Miyamoto originally wanted the character to be yellow. Kirby appears white in the game's North American promotional materials and artwork to reflect the character's in-game appearance."
        },{
            "gameId": 600014,
            "title": "Soul Falchion",
            "desc": "Soul Falchion is a weapons based fighting game using Takara's engine from their Game Boy King of Fighters games."
        },{
            "gameId": 600013,
            "title": "Sonic",
            "desc": "Sonic the Hedgehog is a 2D, side-scrolling platformer, whose gameplay centers around Sonic's ability to run at high speed through levels incorporating springs, slopes, high falls, and loop-the-loops."
        },{
            "gameId": 600012,
            "title": "Turok",
            "desc": "At the end of the game, when you fight Kane as a boss, he steals your knife, and you must quickly hammer on the randomly chosen button and finally kill him at the 4th or 5th set of buttons."
        },{
            "gameId": 600011,
            "title": "Bubble Bobble",
            "desc": "\"Baron Von Blubba\" has kidnapped the brothers Bubby and Bobby's girlfriends and turned the brothers into Bubble Dragons, Bub and Bob. Bub and Bob have to finish 100 levels in the Cave of Monsters in order to rescue them."
        },{
            "gameId": 600010,
            "title": "Terminator Genisys",
            "desc": "In 2029, Human Resistance leader John Connor launches a massive final offensive against Skynet, an artificial general intelligence system seeking to eliminate the human race. Before the Resistance wins the offensive, Skynet activates a time machine and sends back a T-800 Terminator to 1984 to kill John's mother, Sarah Connor"
        },{
            "gameId": 600009,
            "title": "Metroid",
            "desc": "The twelve games in the Metroid series focus on the adventures of Samus Aran and her assignments to wipe out threats to the Galactic Federation presented by the Space Pirates and their attempts to harness various biological weapons such as the Metroids and Phazon."
        },{
            "gameId": 600008,
            "title": "Finding Kepler",
            "desc": "Kepler-452b is an exoplanet orbiting the G-class star Kepler-452. It was identified by the Kepler space telescope and its discovery was publicly announced by NASA on 23 July 2015."
        },{
            "gameId": 600007,
            "title": "Balloon Fight",
            "desc": "Thank you Iwata, to bring me the [Balloon Fight] to our childhood. Balloon Fight is the first game form Mr Iwata. Let's memorize our best time in childhood!"
        },{
            "gameId": 600006,
            "title": "Star Wars",
            "desc": "Star Wars is an American epic space opera franchise centered on a film series created by George Lucas."
        },{
            "gameId": 600005,
            "title": "Jurassic Park",
            "desc": "Jurassic Park is an American film series which is also consisting of novels, comics, and video games centering on a disastrous attempt to create a theme park of cloned dinosaurs. It began in 1990 when Universal Studios bought the rights to the novel by Michael Crichton before it was even published."
        },{
            "gameId": 600004,
            "title": "Spider Man",
            "desc": "After the death of Peter's Uncle Ben, which he could have prevented, Spider man learned that \"with great power, comes great responsibility\""
        },{
            "gameId": 600002,
            "title": "Super Mario Bros",
            "desc": "Super Mario Bros. Deluxe was released in 1999 in North America and Europe and in 2000 in Japan. You can find your childhood here!"
        }

	],
	testAppId:{
		'600002':true,
		'600004':true,
		'600005':true,
		'600006':true,
		'600007':true,
		'600008':true,
		'600009':true,
		'600010':true,
		'600011':true,
		'600012':true,
		'600013':true,
		'600014':true,
		'600015':true,
		'600016':true
	},
	getBackupApps:function(adCount,index){
		var apps = [];
		for(var i=0;i<adCount;i++){
			var randomIndex = Math.floor(Math.random()*this.backupApps.length);
			if(index>=0) randomIndex = index;
			var tempApp = this.backupApps.splice(randomIndex,1)[0];
			var icon_url = 'http://www.rayjump.com/upload/gamelist/'+tempApp['gameId']+'/icon.jpg';
			var click_url = 'http://www.rayjump.com/upload/gamelist/'+tempApp['gameId']+'/index.html'+'?appId=18571&s=4802a1deb1fb7836b86f1f18da81b1a1&jump=traffic_lp_slot';
			var app = {
					"id": tempApp['gameId'],
					"type":'rayjump',
					"title": tempApp['title'],
					"desc": tempApp['desc'],
					"icon_url": icon_url,
					"click_url": click_url,
					"notice_url": "#"
				};
			apps.push(app);
		};
		return apps;
	},
	getScreenSize: function() {
		var testWidthEl = document.createElement('div');
		testWidthEl.setAttribute('style', 'display:block;position:fixed;left:0px;right:0px;top:0px;bottom:0px;visibility:hidden;z-index:99999;')
		document.body.appendChild(testWidthEl);

		var screenWidth = testWidthEl.clientWidth;
		var screenHeight = testWidthEl.clientHeight;

		testWidthEl.parentElement.removeChild(testWidthEl);
		return {
			width: screenWidth,
			height: screenHeight
		};
	},
	getQueryString: function(key) {
		try{
			var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return unescape(r[2]);
		}catch(e){
			return null;
		}
		return null;
	},
	getUrl: function(param, adCount) {
		var url = 'http://net.rayjump.com/openapi/ad/v2?app_id=' + param['app_id'] + '&platform=' + param['platform'] + '&orientation=1&ad_num=' + adCount + '&os_version=' + param['os_version'] + '&sign=' + param['signMD5'] + '&android_id=' + param['android_id'] + '&imei=' + param['imei'] + '&gaid=' + param['gaid'] + '&ping_mode=1&network=1';
		// url += '&client_ip=54.12.1.13';
		window.setTimeout(function(){
			var GAId = 'UA-62639739-1';
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
				    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
				    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
				    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

		    ga('create', GAId, 'auto');
		    ga('send', 'event', 'ad_traffic', 'traffic_lp_adRequest', adCount);
		},300);
		
		return url;
	},
	triggerEvent: function(element, e, data) {
		if (document.fireEvent) {
			var event = document.createEventObject();
			event.eventType = 'message';
			event.data = data; 
			document.fireEvent('on' + e, event);
		} else if (document.createEvent) {
			var event = document.createEvent('HTMLEvents');
			event.initEvent(e, false, true);
			event.eventType = 'message';
			event.data = data;
			element.dispatchEvent(event);
		}

	},
	addListener: function(element, e, fn) {
		if (element.addEventListener) {
			element.addEventListener(e, fn, false);
		} else {
			element.attachEvent("on" + e, fn);
		}
	},
	mobvistaJSONPAjax: function(win) {
        var me = this;
        var isIE = !1,
            doc = win.document,
            head = doc.getElementsByTagName('head')[0];

        function request(param) {

            var url = param.url + parseToUrl(param.data); //.filterByTime(0,'minute').toIdString();
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
			xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
		} else if (window.XMLHttpRequest) {
			xmlHttpRequest = new XMLHttpRequest();
		}
		if (null != xmlHttpRequest) {
			xmlHttpRequest.open(ajaxParam.type, url, true);
			xmlHttpRequest.onreadystatechange = ajaxCallback;
			if (ajaxParam.type == "get" || ajaxParam.type == "GET") {
				xmlHttpRequest.send(null);
			} else {
				xmlHttpRequest.send(ajaxParam.data);
			}
		}

		function ajaxCallback() {
			if (xmlHttpRequest.readyState == 4) {
				if (xmlHttpRequest.status == 200 || xmlHttpRequest.status == 0) {
					var responseText = xmlHttpRequest.responseText;
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
	}
};

var param = {
	'channel_id': '',
	'android_id': '',
	'imei': '',
	'mac': '',
	'gaid': '',
	'title':'',
	'os_version': '',
	'platform': 1,
	'sign': '8a74b3df992e13e1ef0f70d72a35c6d2',
	'signMD5': '4802a1deb1fb7836b86f1f18da81b1a1',
	'app_id': '18571',
	init: function() {
		this['channel_id'] = Util.getQueryString('channel_id') || '18571';
		this['android_id'] = Util.getQueryString('android_id') || '12345';
		this['imei'] = Util.getQueryString('imei') || '12345';
		this['mac'] = Util.getQueryString('mac') || '192.168.1.1';
		this['gaid'] = Util.getQueryString('gaid') || '12345';
		this['title'] = Util.getQueryString('title') || 'Your download link has expired';
		this['os_version'] = Util.getQueryString('os_version') || Util.getOSVersion()||'4.2.1';
		var pl = Util.getQueryString('pl') || navigator.userAgent;
		this['platform'] = (pl.indexOf('Android') >= 0 || pl.indexOf('android') >= 0)? 1 : 2;
		
		if(document.getElementById('titleMsg')) document.getElementById('titleMsg').innerHTML = this['title'];
	}
}

Util.insertApps(15,null);
Util.insertSense();