var editorAppsLength = 6;
var awesomeAppsLength = 4;
var likeAppsLength = 5;
var holdAppsLength = editorAppsLength+awesomeAppsLength+likeAppsLength;
var Util = {
	insertSense:function(){
		var me = this;
		var defaultPubId = 'ca-pub-2956695492730274';
		var defaultUnitId = '3843995349';
		var senseScript = document.createElement('script');
		senseScript.setAttribute('async',false);
		senseScript.src = 'http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
		console.log(senseScript);
		senseScript.onload = function(){
			document.getElementById('senseContaienr').style.display = 'block';
			var sensePubId = defaultPubId;
			var senseUnitId = defaultUnitId;

			if(sensePubId!=null&&senseUnitId!=null){
				initSense(sensePubId,senseUnitId);
			}else{
				var mediationHost = 'http://net.rayjump.com/site/profile';
				var timescape = Date.parse(new Date()).toString();
				var callbackKey = timescape + Math.random().toString().split('.')[1];

				me.mobvistaJSONPAjax.load({
					url: mediationHost+'?',
					type: 'get',
					timeout: '1000',
					contentType: 'JSON',
					timestamp: true,
					dataType: 'jsonp',
					data:{
						app_id:param['app_id'],
						sign:param['sign'],
						jsonp: "jsonp" + callbackKey
					},
					success: function(result) {
						if(result.status==1){
							var medias = result['data'];
							for(var i=0;i<medias.length;i++){
								var media = medias[i];
								if(media['name']=='adsense'){
									sensePubId = media['pubID'];
									senseUnitId = media['weight']['overlay']['unitID'];
									initSense(sensePubId,senseUnitId);
									me.setLocalStorage(sensePubIdKey,sensePubId);
									me.setLocalStorage(senseUnitIdKey,senseUnitId);
								}
							}
						}

						if(sensePubId==null||senseUnitId==null){
							sensePubId = defaultPubId;
							senseUnitId = defaultUnitId;
							initSense(sensePubId,senseUnitId);
						}

						
					},
					error:function(){
						console.log('error');
						sensePubId = defaultPubId;
						senseUnitId = defaultUnitId;
						initSense(sensePubId,senseUnitId);
					}
				});
			}
		}
		document.body.appendChild(senseScript);


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


			// window.setTimeout(function(){
			// 	var GAId = 'UA-62639739-1';
			// 	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			// 		    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			// 		    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			// 		    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

			//     ga('create', GAId, 'auto');
			//     ga('send', 'event', 'ad_traffic', 'h5wall_adRequest', 'load');
			// },300);
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
		
		var url = me.getUrl(param, adCount);

		me.mobvistaAjax({
			url: url,
			type: 'get',
			dataType: 'json',
			contentType: 'json',
			success: function(result) {
				console.log(22)
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
		// console.log(clickUrl)
		return clickUrl;
	},
	backupApps:[{
			"gameId": 500020,
            "title": "Speed Pool King",
            "desc": "How many balls can you pot before the time runs out!"
        },{
			"gameId": 500019,
            "title": "Biolab Disaster",
            "desc": "Fight your way through an infected Biolab in this Jump'n'Run. Use your Plasma Gun to shoot everything that moves! There are 3 levels to explore and 6 types of enemies to fight."
        },{
			"gameId": 500018,
            "title": "HexGL by BKcore",
            "desc": "HexGL, the HTML5 futuristic racing game."
        },{
			"gameId": 500017,
            "title": "Master Tournament",
            "desc": "How about a round of eight-ball pool billiard? In Master Tournament you can play tournaments against the best of the best players in some the most illustrious cities around the world. Through your career you travel to Paris, London, New York and Moscow. In each tournament you have to play three rounds and if you finally manage to win, you can invest your gains in a more luxurious cue, that will make each and every opponent envy you.<br/>Play Master Tournament now online and for free and show the world that you have what it takes to be the next..."
        },{
			"gameId": 500016,
            "title": "Spider Solitaire",
            "desc": "Solitaire, the classic card game! Play this addicting version of the popular casual game where you have to sort all cards on the field."
        },{
			"gameId": 500015,
            "title": "Temple Crossing",
            "desc": "Guide the explorer into the temples. Build the bridge, and help him cross safely to the other side. Use your timing to build the perfect bridge. How many bridges can you cross?"
        },{
			"gameId": 500014,
            "title": "Xibalba",
            "desc": "Fight your way through the Mayan Underworld in this retro First Person Shooter. The path leads you through lush jungles, eerie catacombs and high tech bases filled with dangerous creatures, traps, vital powerups and weapons."
        },{
			"gameId": 500012,
            "title": "Zombie Fighter",
            "desc": "Oh no! The Zombie Apocalypse has started and those evil creatures like nothing more than eating your...stockings! Defend yourself and your favorite socks against hordes of the undead. Pick up cool weapons, tend to your wounds with health kits and collect gold to upgrade your stats. Fight against powerful zombie bosses and score as many points as possible! Are you ready for the ultimate battle for survival?"
        },{
			"gameId": 500011,
            "title": "Burnin' Rubber",
            "desc": "Burnin Rubber is a new racing game full of action and adrenaline! What makes it special are the racing cars equipped with machine guns. On four tracks you can, besides dodging the cars and obstacles in front of you, shoot them and make extra points that will enable you to pick better cars and weapons. Those, and the power-ups you can gather on the road, will help you to improve your highscore that will be made up by the distance you cover."
        },{
			"gameId": 500010,
            "title": "Super Karts",
            "desc": "Are you a real petrol head? Do you love to take your car out for a spin at the weekend? Do you like to race around the track or do you prefer flooring your car on the famous Autobahn? No matter what, every trip you take will come to it's inevitable end with you having to park your car. And of course, doing a bad job at parking is one of the most embarrassing things ."
        },{
			"gameId": 500009,
            "title": "CRUSADER DEFENSE",
            "desc": "You’ll be able to choose which units you want to place where around the castle. Pick from a range of unit types including the knight, the archer, and the pikeman. Each inflicts different levels of damage and has a different radius of attack, so you’ll need to choose carefully if you want to cut your enemy out of the game!"
        },{
			"gameId": 500008,
            "title": "Baymax Home",
            "desc": "Pave the way to the warm hug of Baymax."
        },{
			"gameId": 500007,
            "title": "HyperGunner",
            "desc": "You want to get back to earth but to do that you need to shoot your way through hordes of enemies! Be quick and agile to dodge, shoot and to collect a lot of loot and other bonuses like power ups to be victorious! So prepare yourself for battle for this exciting and challenging game!"
        },{
			"gameId": 500006,
            "title": "Comic Puzzle",
            "desc": "Seek the secrets of the comic beauty and conquer them all."
        },{
			"gameId": 500005,
            "title": "Lady Puzzle",
            "desc": "Burnin Rubber is a new racing game full of action and adrenaline! What makes it special are the racing cars equipped with machine guns. On four tracks you can, besides dodging the cars and obstacles in front of you, shoot them and make extra points that will enable you to pick better cars and weapons. Those, and the power-ups you can gather on the road, will help you to improve your highscore that will be made up by the distance you cover."
        },{
			"gameId": 500004,
            "title": "Texas Poker",
            "banner":"brick.jpg",
            "desc": "The HeadsUp Casino invites you to come play some No Limit Texas Hold'em Poker. It won't cost you a penny but we guarantee you will have a blast! A smart poker engine that's fun to play against. And best of all, all of the poker chips are FREE. If you happen to lose your chips, we will refill your chip stack free of charge!"
        },{
			"gameId": 500003,
            "title": "Furious Tap",
            "desc": "Furious Tap is the free, online skill game that is all about lightning reflexes and perfect timing. While you zig-zag your way down the path, you can change the direction of your vehicle with one simple tap or click. Be careful not to fall off the edges as your journey is getting faster and faster."
        },{
			"gameId": 500002,
            "title": "Candy Candy",
            "banner":"brick.jpg",
            "desc": "Everyone likes candies,don't we? Now here is Candy Candy,that is all sweets but no calories!In this beautiful and challenging match-three video game it is your task to combine at least three of the delicious sweets to make them disappear. If you play smart and manage to make more candy vanish with one move or even trigger combos that make different sorts of candy vanish,you can get tons of extra points and useful boosters,that make it much easier to achieve the levels goals. Always have an eye on the scores though,as you only have a limited amount of moves to reach win the level play the wonderful Candy Candy now online and for free! "
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
			if(tempApp==null) continue;
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
		var url = 'http://net.rayjump.com/openapi/ad/v2?app_id=' + param['app_id'] + '&platform=' + param['platform'] + '&orientation=1&ad_num=' + adCount + '&os_version=' + param['os_version'] + '&sign=' + param['sign'] + '&android_id=' + param['android_id'] + '&imei=' + param['imei'] + '&gaid=' + param['gaid'] + '&ping_mode=1&network=1';
		// url += '&client_ip=54.12.1.13';
		
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

            var url = param.url + Util.parseToUrl(param.data); //.filterByTime(0,'minute').toIdString();
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
								console.log(e)
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
	'sign': '668d571bff3dc16a26ad81642c64504d',
	'signMD5': '4802a1deb1fb7836b86f1f18da81b1a1',
	'app_id': '17019',
	init: function() {
		this['channel_id'] = Util.getQueryString('channel_id') || '18571';
		this['android_id'] = Util.getQueryString('android_id') || '12345';
		this['app_id'] = Util.getQueryString('appId') || '17019';
		this['sign'] = Util.getQueryString('s') || '668d571bff3dc16a26ad81642c64504d';
		this['imei'] = Util.getQueryString('imei') || '12345';
		this['mac'] = Util.getQueryString('mac') || '192.168.1.1';
		this['gaid'] = Util.getQueryString('gaid') || '12345';
		this['title'] = Util.getQueryString('title') || 'Your download link has expired';
		this['os_version'] = Util.getQueryString('os_version') || Util.getOSVersion()||'4.2.1';
		var pl = Util.getQueryString('pl') || navigator.userAgent;
		this['platform'] = (pl.indexOf('Android') >= 0 || pl.indexOf('android') >= 0)? 1 : 2;
		
		if(document.getElementById('titleMsg')) document.getElementById('titleMsg').innerHTML = this['title'];
	}
};

param.init();
Util.insertApps(15,null);
Util.insertSense();