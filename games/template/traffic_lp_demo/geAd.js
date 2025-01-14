var Util = {
	insertApps: function(adCount, container) {
		var me = this;
		param.init();
		adCount++;
		var url = me.getUrl(param, adCount);

		me.mobvistaAjax({
			url: url,
			type: 'get',
			dataType: 'json',
			contentType: 'json',
			success: function(result) {
				var data = [];
				if (result.status == 1&&result.data.length>0) {
					data = result.data;
				}

				var mainApp = data.pop();
				if(mainApp==null) mainApp = me.getBackupApps(1)[0];
				me.initMainApp(mainApp);
				container.innerHTML = '';
				var restSlotCount = adCount-1-data.length;
				if(restSlotCount>0) data = data.concat(me.getBackupApps(restSlotCount));
				me.initMiddleApps(data,container);
				me.renderTalentEntry();

			},
			error: function(result) {
				console.log(result);
			}

		});
	},
	initMainApp:function(app){
		var me = this;
		var clickUrl = app['type']=='rayjump' ? app['click_url']:me.updateClickUrl(app);
		var container = document.getElementById('contentWarp');
		container.innerHTML = '';
		var icon = document.createElement('img');
		icon.id = 'leftIcon';
		icon.className = 'icon';
		icon.src = app['icon_url'];
		container.appendChild(icon);

		var topInfo = document.createElement('div');
		topInfo.id = 'topInfo';
		container.appendChild(topInfo);

		var name = document.createElement('span');
		name.className = 'name';
		name.innerHTML = app['title'];
		topInfo.appendChild(name);

		var star = document.createElement('div');
		star.id = 'star';
		topInfo.appendChild(star);	

		var desc = document.createElement('div');
		desc.id = 'desc';
		desc.innerHTML = app['desc'];
		topInfo.appendChild(desc);	

		var download = document.createElement('div');
		download.id = 'download';
		download.innerHTML = '<span>Download For Free</span>';
		topInfo.appendChild(download);	
		container.appendChild(topInfo);

		container.onclick = function(){
			if(app['type']!='rayjump'){
				var notice = document.createElement('iframe');
				notice.className = 'noticeframe';
				notice.src = app['notice_url'];
				document.body.appendChild(notice);
			}

			var targetUrl = document.createElement('a');
			targetUrl.className = 'noticeframe';
			targetUrl.href = clickUrl;
			document.body.appendChild(targetUrl);

			window.setTimeout(function(){
				me.triggerEvent(targetUrl,'click');
			},300)
		}
	},
	initMiddleApps:function(data,container){
		var me = this;
		for (var i = 0, iMax = data.length; i < iMax; i++) {
			var tempapp = data[i];
			(function(app){
				var clickUrl = app['type']=='rayjump' ? app['click_url'] : me.updateClickUrl(app);
				var appEl = document.createElement('div');
				appEl.className = 'app';
				appEl.setAttribute('clickUrl',clickUrl);

				var img = document.createElement('img');
				img.className = 'icon';
				img.src = app['icon_url'];
				appEl.appendChild(img);

				var name = document.createElement('span');
				name.className = 'name';
				name.innerHTML = app['title'];
				appEl.appendChild(name);
				container.appendChild(appEl);

				appEl.onclick = function(){
					if(app['type']!='rayjump'){
						var notice = document.createElement('iframe');
						notice.className = 'noticeframe';
						notice.src = app['notice_url'];
						document.body.appendChild(notice);
					}
					var targetUrl = document.createElement('a');
					targetUrl.className = 'noticeframe';
					targetUrl.href = clickUrl;
					document.body.appendChild(targetUrl);

					window.setTimeout(function(){
						me.triggerEvent(targetUrl,'click');
					},300)
				}
			})(tempapp);
		};
	},
	updateClickUrl: function(app) {

		console.log(app['intall_token']);
		var clickUrl = 'http://tracking.lenzmx.com/click?mb_pl=only_android_phone&mb_nt=cb'+param['channel_id']+'&mb_campid='+app['offer_name']+'&mb_qp=1&mb_aff_sub='+app['install_token'];
		console.log(clickUrl)
		return clickUrl;
	},
	backupApps:[
		{
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
			"gameId": 500013,
            "title": "Angry Necromancer",
            "desc": "The necromancer needs your help!<br/>Zombies want to destroy him and his tower. Defend the tower against the zombies with your destroying spells. Pay attention to your health and mana.<br/>Use drinks to re-fill your energy. Thrilling levels waiting for you!"
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
        },{
			"gameId": 500001,
            "title": "DUET",
            "banner":"brick.jpg",
            "desc": "Enter a mesmerising trance of co-dependence in Duet. The rules are simple: control two vessels in sync, survive against all odds and keep calm. Available to you many levels. You go around all the obstacles and go to the end faster friends!"
        }

	],
	getBackupApps:function(adCount){
		var apps = [];
		for(var i=0;i<adCount;i++){
			var randomIndex = Math.floor(Math.random()*this.backupApps.length);
			var tempApp = this.backupApps.splice(randomIndex,1)[0];
			var icon_url = 'http://www.rayjump.com/upload/gamelist/'+tempApp['gameId']+'/icon.jpg';
			var click_url = 'http://www.rayjump.com/upload/gamelist/'+tempApp['gameId']+'/index.html'+'?appId=18571&s=4802a1deb1fb7836b86f1f18da81b1a1';
			var app = {
					"id": 38498,
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
	renderTalentEntry:function(){
		var talEls = document.getElementsByClassName('tal');
		for(var i=0;i<talEls.length;i++){
			var talEl = talEls[i];
			var randomIndex = Math.floor(Math.random()*this.backupApps.length);
			var tempApp = this.backupApps.splice(randomIndex,1)[0];
			var bannerUrl = tempApp['banner']||'banner_t.jpg';
			var img_url = 'http://www.rayjump.com/upload/gamelist/'+tempApp['gameId']+'/'+bannerUrl;

			talEl.style['background-image'] = 'url("'+img_url+'")';
		}
	},
	getScreenSize: function() {
		var testWidthEl = document.createElement('div');
		testWidthEl.setAttribute('style', 'display:block;position:fixed;left:0px;right:0px;top:0px;bottom:0px;visibility:hidden;z-index:99999;')
		document.body.appendChild(testWidthEl);
		var screenWidth = testWidthEl.clientWidth;
		var screenHeight = testWidthEl.clientHeight;
		testWidthEl.remove();
		return {
			width: screenWidth,
			height: screenHeight
		};
	},
	getQueryString: function(key) {
		var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	},
	getUrl: function(param, adCount) {
		var url = 'http://net.rayjump.com/openapi/ad/v2?app_id=' + param['app_id'] + '&platform=' + param['platform'] + '&orientation=1&ad_num=' + adCount + '&os_version=' + param['os_version'] + '&sign=' + param['signMD5'] + '&android_id=' + param['android_id'] + '&imei=' + param['imei'] + '&gaid=' + param['gaid'] + '&ping_mode=1&network=1';
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
	'err':'',
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
		this['err'] = Util.getQueryString('err') || 'Your download link has expired';
		this['os_version'] = Util.getQueryString('os_version') || Util.getOSVersion()||'4.2.1';
		var pl = Util.getQueryString('pl') || navigator.userAgent;
		this['platform'] = (pl.indexOf('Android') >= 0 || pl.indexOf('android') >= 0)? 1 : 2;
		
		document.getElementById('errMsg').innerHTML = this['err'];
	}
}