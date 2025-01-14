(function(){

	window.canvasFrameId = document.getElementById('talentInit').getAttribute('fraimId');
	window.frameObj = canvasFrameId? document.getElementById(canvasFrameId):null;
	window.initDelay = document.getElementById('talentInit').getAttribute('initDelay')||0;
	window.basePath = '../../../'
	var isDirectLink = (window == window.parent)? true:false;
	var currentScreen;
	var switchGameIconWidth = 0;
	window.screenScale = 1;
	window.talentBannerId = 'bbb';
	window.talentGameCatalogs = [
									{'text':'Cards','key':'cards'},
									{'text':'Puzzle','key':'puzzle'},
									{'text':'Shooter','key':'shooter'},
									{'text':'Defense','key':'defense'},
									{'text':'Beauty','key':'beauty'},
									{'text':'Racing','key':'racing'},
									{'text':'Masochism','key':'masochism'},
									{'text':'Jump & Run','key':'jumprun'},
									{'text':'Sport','key':'sport'}
								];

	window.talentZIndex = {
		'loaderMaskInfo':'9999999',
		'loaderMaskEmpty':'999999',
		'loaderAdCover':'999',
		'loaderAdClose':'999',
		'headerObj':'9999',
		'catalogMask':'99999999'
	}

	window.adConfig = getADConfig();
	window.talentGA = getTalentGA();
	window.overlayFC = getOverlayFc();
	window.availableScreenSize = {};

	if(isDirectLink){
		talentGA.checkEnter();

		var x = document.getElementsByTagName('script')[0]; 
		var style = document.createElement('link');
		style.type = "text/css"; 
		style.rel = "stylesheet"; 
		style.href = window.basePath+'css/talent-common.css';
		x.parentNode.insertBefore(style, x);

		addListener(window,'orientationchange',function(){
			if(window.talentUnRotate!=true) window.location.reload();
		});
		addListener(window,'DOMContentLoaded',init);
		addListener(window,'load',function(){
			talentGA.checkGameLoaded();
			talentLoader.gameLoaded = true;
			talentLoader.checkAllLoaded();
			// talentLoader.hide();
		});
	}else{
		return;
	}

	function ajaxRequest(ajaxParam) {
		var me = this;
		var url = ajaxParam.url;


		if (ajaxParam.type == "get" || ajaxParam.type == "GET") {
			url += parseToUrl(ajaxParam.data);
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
	}

	function parseToUrl(data) {
		var result = '';
		for (var key in data) {
			result += key + '=' + data[key] + '&';
		}
		if (result.length > 0) {
			result = result.substring(0, result.length - 1);
		}
		return result;
	}

	function horizontalToHideBanner(currentScreen){
		if((currentScreen.width/currentScreen.height>1280/768)&&(!!navigator.userAgent.match(/AppleWebKit.*Mobile.*/)))
			window.adConfig.enableBannerAd = false;
	}

	function getOverlayFc(){
		return {
			fc:adConfig.overlayFc,
			toggle:true,
			counter:null,
			request:function(){
				if(this.toggle==false) return false;
				return this.startCounting();
			},
			startCounting:function(){
				var me = this;
				if(me.counter) window.clearTimeout(me.counter);
				me.toggle = false;
				me.counter = setTimeout(function(){
					me.toggle = true;
				},me.fc);
				return true;
			}
		};
	}

	function getADConfig(){
		var appId = getQueryString('appId')||
					getQueryString('appid')||'17019';
		var adRejectConfig = {
			loaderAd : ['17603'],
			bannerAd:['17280'],
			overlayAd:[],
			menuAd:[]
		};

		var adFcConfig = {
			'17603':120*1000
		};

		function checkIsEnable(adnType,appId){
			var adnArray = adRejectConfig[adnType];
			for(var i=0;i<adnArray.length;i++){
				if(adnArray[i] == appId.toString()) return false;
			}
			return true;
		}

		return {
			'enableLoaderAd':checkIsEnable('loaderAd',appId),
			'enableBannerAd':checkIsEnable('bannerAd',appId),
			'enableOverlayAd':checkIsEnable('overlayAd',appId),
			'enableMenuAd':checkIsEnable('menuAd',appId),
			'overlayFc':adFcConfig[appId]||60*1000
		};
	}

	function getTalentGA(){
		var startTime = (new Date()).valueOf();
		return {
			hasInit:false,
			checkEnable:true,
			GAId:'UA-62639739-1',
			homeKey:window.location.host,
			jumpKey:'jump',
			jumpType:{
				'home':'home',
                'home_banner':'home_banner',
                'traffic_lp':'traffic_lp',
                'traffic_lp_slot':'traffic_lp_slot',
				'game':'game',
				'share':'share'
			},
			startTime:startTime,
			_loadGA:function(callback){
				var me = this;
				(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

			    ga('create', me.GAId, 'auto');
			    ga('send','pageview');
			    me.hasInit = true;
			    if(callback) callback();
			},
			checkEnter:function(){
				var me = this;
				if(me.hasInit==true){
					me._checkEnter();
				}else{
					me._loadGA(function(){
						me._checkEnter();
					});
				}
			},
			_checkEnter:function(){
				var me = this;
				var appId = getQueryString('appId')||
							getQueryString('appid')||'17019';
	    		ga('send', 'event', 'load', 'directLink', appId);

				var jumpType = getQueryString(me.jumpKey);
				if(!jumpType||jumpType.length==0||document.referrer.indexOf(me.homeKey)<0){
					ga('send', 'event', 'load', 'firstEnter', appId);
				}else if(jumpType==me.jumpType['home']){
					ga('send', 'event', 'load', 'fromHome', appId);
				}else if(jumpType==me.jumpType['home_banner']){
					ga('send', 'event', 'load', 'fromHomeBanner', appId);
				}else if(jumpType==me.jumpType['game']){
					ga('send', 'event', 'load', 'fromGame', appId);
				}else if(jumpType==me.jumpType['share']){
					ga('send', 'event', 'load', 'fromShare', appId);
				}else if(jumpType==me.jumpType['traffic_lp']){
					ga('send', 'event', 'load', 'fromTrafficLp', appId);
				}else if(jumpType==me.jumpType['traffic_lp_slot']){
					ga('send', 'event', 'load', 'fromTrafficLpSlot', appId);
				}
			},
			shareGame:function(shareType){
				var me = this;

				(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

			    ga('create', me.GAId, 'auto');
			    me._shareGame(shareType);
			},
			_shareGame:function(shareType){
				var me = this;
				
				var url = window.location.href
				var sections = url.split('/');
				var gameId = sections[sections.length-2];
				var appId = getQueryString('appId')||
							getQueryString('appid')||'17019';

	    		ga('send', 'event', 'share-'+shareType, gameId, appId);
			},
			cdnTestFile:[{
				'key':'hw-nx',
				'size':'lite',
				'url':'http://cds.m8b8t2g3.hwcdn.net/cdn-adn/portal/17/02/10/14/12/589d59db9e22d.png'
			},{
				'key':'hw-nx',
				'size':'large',
				'url':'http://cds.m8b8t2g3.hwcdn.net/cdn-adn/offersync/17/02/04/05/05/5894f086bcd9c.jpg'
			},{
				'key':'cachemoment',
				'size':'lite',
				'url':' http://cdn-adn-rayjump-com.netinfi.net/cdn-adn/portal/17/02/10/14/12/589d59db9e22d.png'
			},{
				'key':'cachemoment',
				'size':'large',
				'url':'http://cdn-adn-rayjump-com.netinfi.net/cdn-adn/offersync/17/02/04/05/05/5894f086bcd9c.jpg'
			},{
				'key':'cloudfront',
				'size':'lite',
				'url':'http://d3e8xvf8dyclkj.cloudfront.net/cdn-adn/portal/17/02/10/14/12/589d59db9e22d.png'
			},{
				'key':'cloudfront',
				'size':'large',
				'url':'http://d3e8xvf8dyclkj.cloudfront.net/cdn-adn/offersync/17/02/04/05/05/5894f086bcd9c.jpg'
			},{
				'key':'akamai',
				'size':'lite',
				'url':'http://cdn-test.akamai.rayjump.com/cdn-adn/portal/17/02/10/14/12/589d59db9e22d.png'
			},{
				'key':'akamai',
				'size':'large',
				'url':'http://cdn-test.akamai.rayjump.com/cdn-adn/offersync/17/02/04/05/05/5894f086bcd9c.jpg'
			},{
				'key':'baidu',
				'size':'lite',
				'url':'http://cdn-test.baidu.rayjump.com/cdn-adn/portal/17/02/10/14/12/589d59db9e22d.png'
			},{
				'key':'baidu',
				'size':'large',
				'url':'http://cdn-test.baidu.rayjump.com/cdn-adn/offersync/17/02/04/05/05/5894f086bcd9c.jpg'
			}],
			cdnTestObj:{},
			cdnTester:function(){
				var me = this;
				if(me.cdnTestTimer) clearTimeout(me.cdnTestTimer);
				me.cdnTestTimer = setTimeout(function(){
					for(var i=0,iMax=me.cdnTestFile.length;i<iMax;i++){
						var testFile = me.cdnTestFile[i];
						(function(cdnFile){
							me.cdnTestObj[cdnFile['key']+'-'+cdnFile['size']] = {
								'startTime':(new Date()).valueOf()
							};
							var cdnTestImg = document.createElement('img');
							cdnTestImg.onload = function(){
								var loadTime = (new Date()).valueOf() - me.cdnTestObj[cdnFile['key']+'-'+cdnFile['size']]['startTime'];
								loadTime = Math.floor(loadTime/1)/1000;
								var timeKey = cdnFile['key']+'-'+cdnFile['size'];
								var timeLabel = '';
								if(loadTime<=0.2){
									timeLabel = '[0,0.2]';
								}else if(loadTime>0.2&&loadTime<=0.5){
									timeLabel = '(0.2,0.5]';
								}else if(loadTime>0.5&&loadTime<=0.8){
									timeLabel = '(0.5,0.8]';
								}else if(loadTime>0.8&&loadTime<=1.5){
									timeLabel = '(0.8,1.5]';
								}else if(loadTime>1.5&&loadTime<=3){
									timeLabel = '(1.5,3]';
								}else if(loadTime>3&&loadTime<=5){
									timeLabel = '(3,5]';
								}else if(loadTime>5&&loadTime<=10){
									timeLabel = '(5,10]';
								}else{
									timeLabel = '(10,+∞)';
								}
								ga('send', 'event', 'CDN_Test', timeKey, timeLabel,loadTime*1000);
							}
							cdnTestImg.src = cdnFile['url']+'?ts='+me.cdnTestObj[cdnFile['key']+'-'+cdnFile['size']]['startTime'];
						})(testFile);
						
					};
				},500);
			},
			cdnTestTimer:null,
			clickPlayGame:function(){
				var me = this;
				if(me.checkEnable==false) return;
				if(me.hasInit==true){
					me._clickPlayGame();
				}else{
					me._loadGA(function(){
						me._clickPlayGame();
					});
				}
				me.cdnTester();
			},
			_clickPlayGame:function(){
				var me = this;
				
				var url = window.location.href
				var sections = url.split('/');
				var gameId = sections[sections.length-2];
				var appId = getQueryString('appId')||
							getQueryString('appid')||'17019';

	    		ga('send', 'event', 'clickPlay', gameId, appId);
			},
			tagAD:function(adnType,adnKey){
				var me = this;
				if(me.checkEnable==false) return;
				if(me.hasInit==true){
					me._tagAD(adnType,adnKey);
				}else{
					me._loadGA(function(){
						me._tagAD(adnType,adnKey);
					});
				}
			},
			_tagAD:function(adnType,adnKey){
				var me = this;
				var appId = getQueryString('appId')||
							getQueryString('appid')||'17019';
				var adnString = adnType + '-' + adnKey;
	    		ga('send', 'event', 'adImpression', appId, adnString);
			},
			tagSpecAD:function(adnType,adnKey){
				var me = this;
				if(me.checkEnable==false) return;
				if(me.hasInit==true){
					me._tagSpecAD(adnType,adnKey);
				}else{
					me._loadGA(function(){
						me._tagSpecAD(adnType,adnKey);
					});
				}
			},
			_tagSpecAD:function(adnType,adnKey){
				var me = this;
				var appId = getQueryString('appId')||
							getQueryString('appid')||'17019';
				var adnString = adnType + '-' + adnKey;
	    		ga('send', 'event', 'specialAD',adnString, appId);
			},
			checkGameLoaded:function(){
				var me = this;
				if(me.hasInit==true){
					me._checkGameLoaded();
				}else{
					me._loadGA(function(){
						me._checkGameLoaded();
					});
				}
			},
			_checkGameLoaded:function(){
				var me = this;
				var url = window.location.href
				var sections = url.split('/');
				var gameId = sections[sections.length-2];
				var loadTime = (new Date()).valueOf() - me.startTime;
				loadTime = Math.floor(loadTime/1)/1000;
				var timeLabel = '';
				if(loadTime<=2){
					timeLabel = '[0,2]';
				}else if(loadTime>2&&loadTime<=2.5){
					timeLabel = '(2,2.5]';
				}else if(loadTime>2.5&&loadTime<=3){
					timeLabel = '(2.5,3]';
				}else if(loadTime>3&&loadTime<=5){
					timeLabel = '(3,5]';
				}else if(loadTime>5&&loadTime<=10){
					timeLabel = '(5,10]';
				}else{
					timeLabel = '(10,+∞)';
				}
				ga('send', 'event', 'gameLoaded', gameId, timeLabel,loadTime*1000);
			}
		};
	}

	var talentLoader = {
		loaderMask:null,
		gameLoaded:false,
		adCounted:false,
		adCount:5,
		adCountTimer:null,
		show:function(container){
			if(window.talentGameInfo){
				console.log('yes');
				this.infoShow(container,window.talentGameInfo);
			}else{
				console.log('no');
				this.emptyShow(container);
			}
			
		},
		infoShow:function(container,talentGameInfo){
			var me = this;
			var currentScreen = getScreenSize();
			horizontalToHideBanner(currentScreen);
			var menuConfig = getQueryString('hmenu')||''
			

			var bestScreenSize = {
				width:480,
				height:720
			};
			window.availableScreenSize = {
				width:480,
				height:720
			};
			if(currentScreen.width/currentScreen.height>bestScreenSize.width/bestScreenSize.height){
				availableScreenSize.height = currentScreen.height;
				availableScreenSize.width = bestScreenSize.width*availableScreenSize.height/bestScreenSize.height;
			}else{
				availableScreenSize.width = currentScreen.width;
				availableScreenSize.height = bestScreenSize.height*availableScreenSize.width/bestScreenSize.width;
			}

			var menuADScale = (availableScreenSize.height>availableScreenSize.width)?
				Math.floor(availableScreenSize.width/720*100)/100:
				Math.floor(availableScreenSize.height/720*100)/100
			;


			var loaderMask = document.createElement('div');
			loaderMask.id = 'loaderMask';
			loaderMask.style['position'] = 'fixed';
			loaderMask.style['zIndex'] = window.talentZIndex['loaderMaskInfo'];
			loaderMask.style['left'] = '0px';
			loaderMask.style['right'] = '0px';
			loaderMask.style['top'] = '0px';
			loaderMask.style['bottom'] = '0px';
			loaderMask.style['backgroundColor'] = 'rgb(240,240,240)';
			container.appendChild(loaderMask);

			var loaderHeaderHeight = Math.floor(95*menuADScale)+'px';
			var loaderHeader = document.createElement('div');
			loaderHeader.style['display'] = 'table';
			loaderHeader.style['width'] = '100%';
			loaderHeader.style['height'] = loaderHeaderHeight;
			loaderHeader.style['backgroundColor'] = 'white';
			loaderHeader.style['borderBottom'] = '2px solid orange';
			loaderMask.appendChild(loaderHeader);

			var loaderHeaderLeftMenu = document.createElement('div');
			loaderHeaderLeftMenu.style['display'] = 'table-cell';
			loaderHeaderLeftMenu.style['width'] = loaderHeaderHeight;
			loaderHeaderLeftMenu.style['height'] = loaderHeaderHeight;
			loaderHeaderLeftMenu.style['verticalAlign'] = 'middle';
			loaderHeaderLeftMenu.style['textAlign'] = 'center';
			loaderHeader.appendChild(loaderHeaderLeftMenu);
			

			var loaderHeaderLeftMenuObj = document.createElement('div');
			loaderHeaderLeftMenuObj.style['display'] = 'inline-block';
			loaderHeaderLeftMenuObj.style['width'] = '50%';
			loaderHeaderLeftMenuObj.style['height'] = '40%';
			loaderHeaderLeftMenuObj.style['backgroundSize'] = '100%';
			loaderHeaderLeftMenuObj.style['backgroundPosition'] = 'center';
			loaderHeaderLeftMenuObj.style['backgroundRepeat'] = 'no-repeat';
			loaderHeaderLeftMenuObj.style['backgroundImage'] = 'url("'+window.basePath+'images/showMenu.png")';
			loaderHeaderLeftMenuObj.style['cursor'] = 'pointer';
			if(menuConfig.indexOf('home')<0&&menuConfig.indexOf('hb')<0) loaderHeaderLeftMenu.appendChild(loaderHeaderLeftMenuObj);
			loaderHeaderLeftMenuObj.onclick = function(e){ if(window.gameListData&&window.gameListData['forceBackAction']&&window.gameListData['forceBackAction'][window.talentAppId]==true){window.history.back();}else{catalogMask.show();cancelBubble(e);}};
			loaderHeaderLeftMenuObj.ontouchstart = function(e){ if(window.gameListData&&window.gameListData['forceBackAction']&&window.gameListData['forceBackAction'][window.talentAppId]==true){window.history.back();}else{catalogMask.show();cancelBubble(e);}};

			var loaderHeaderMiddleMenu = document.createElement('div');
			loaderHeaderMiddleMenu.style['display'] = 'table-cell';
			loaderHeaderMiddleMenu.style['width'] = 'auto';
			loaderHeaderMiddleMenu.style['height'] = loaderHeaderHeight;
			loaderHeaderMiddleMenu.style['verticalAlign'] = 'middle';
			loaderHeaderMiddleMenu.style['textAlign'] = 'center';
			loaderHeader.appendChild(loaderHeaderMiddleMenu);

			var loaderHeaderMiddleMenuObj = document.createElement('div');
			loaderHeaderMiddleMenuObj.style['display'] = 'inline-block';
			loaderHeaderMiddleMenuObj.style['width'] = '70%';
			loaderHeaderMiddleMenuObj.style['height'] = '50%';
			loaderHeaderMiddleMenuObj.style['backgroundSize'] = 'contain';
			loaderHeaderMiddleMenuObj.style['backgroundPosition'] = 'center';
			loaderHeaderMiddleMenuObj.style['backgroundRepeat'] = 'no-repeat';
			loaderHeaderMiddleMenuObj.style['backgroundImage'] = 'url("'+window.basePath+'images/slogan_d.png")';
			loaderHeaderMiddleMenuObj.style['textAlign'] = 'center';
			loaderHeaderMiddleMenu.appendChild(loaderHeaderMiddleMenuObj);

			var loaderHeaderRightMenu = document.createElement('div');
			loaderHeaderRightMenu.style['display'] = 'table-cell';
			loaderHeaderRightMenu.style['width'] = loaderHeaderHeight;
			loaderHeaderRightMenu.style['height'] = loaderHeaderHeight;
			loaderHeaderRightMenu.style['verticalAlign'] = 'middle';
			loaderHeaderRightMenu.style['textAlign'] = 'center';
			loaderHeader.appendChild(loaderHeaderRightMenu);
			

			var loaderHeaderRightMenuObj = document.createElement('div');
			loaderHeaderRightMenuObj.style['display'] = 'inline-block';
			loaderHeaderRightMenuObj.style['width'] = '50%';
			loaderHeaderRightMenuObj.style['height'] = '50%';
			loaderHeaderRightMenuObj.style['backgroundSize'] = '100%';
			loaderHeaderRightMenuObj.style['backgroundPosition'] = 'center';
			loaderHeaderRightMenuObj.style['backgroundRepeat'] = 'no-repeat';
			loaderHeaderRightMenuObj.style['backgroundImage'] = 'url("'+window.basePath+'images/ExtMenu.png")';
			loaderHeaderRightMenuObj.style['cursor'] = 'pointer';
			if(menuConfig.indexOf('share')<0&&menuConfig.indexOf('hb')<0) loaderHeaderRightMenu.appendChild(loaderHeaderRightMenuObj);
			loaderHeaderRightMenuObj.onclick = function(e){toggleMaskMenu(true);cancelBubble(e);}
			loaderHeaderRightMenuObj.ontouchstart = function(e){toggleMaskMenu(true);cancelBubble(e);};

			var loaderHeaderBanner = document.createElement('div');
			loaderHeaderBanner.style['display'] = 'block';
			loaderHeaderBanner.style['width'] = '100%';
			loaderHeaderBanner.style['backgroundSize'] = 'cover';
			loaderHeaderBanner.style['backgroundPosition'] = 'center';
			loaderHeaderBanner.style['backgroundRepeat'] = 'no-repeat';
			loaderHeaderBanner.style['height'] = Math.floor(availableScreenSize.width/720*250)+'px';
			loaderHeaderBanner.style['backgroundImage'] = 'url("'+talentGameInfo['banner']+'")';
			loaderMask.appendChild(loaderHeaderBanner);

			var loaderTitle = document.createElement('div');
			loaderTitle.style['display'] = 'table';
			loaderTitle.style['width'] = '100%';
			loaderTitle.style['height'] = Math.floor(menuADScale*85)+'px';
			loaderTitle.style['fontFamily'] = 'Myriad_Pro_Regular';
			loaderTitle.style['color'] = '#303030';
			loaderMask.appendChild(loaderTitle);

			var loaderTitleName = document.createElement('div');
			loaderTitleName.style['display'] = 'table-cell';
			loaderTitleName.style['width'] = 'auto';
			loaderTitleName.style['height'] = '100%';
			loaderTitleName.style['verticalAlign'] = 'middle';
			loaderTitleName.style['textAlign'] = 'left';
			loaderTitleName.style['fontSize'] = Math.floor(availableScreenSize.width*40/720)+'px';
			loaderTitleName.style['paddingLeft'] = Math.floor(availableScreenSize.width*28/720)+'px';
			loaderTitleName.innerHTML = document.title;
			loaderTitle.appendChild(loaderTitleName);

			var loaderTitleButton = document.createElement('div');
			loaderTitleButton.style['display'] = 'table-cell';
			loaderTitleButton.style['width'] = 'auto';
			loaderTitleButton.style['height'] = '100%';
			loaderTitleButton.style['verticalAlign'] = 'middle';
			loaderTitleButton.style['textAlign'] = 'right';
			loaderTitleButton.style['fontSize'] = Math.floor(availableScreenSize.width*28/720)+'px';
			loaderTitleButton.style['paddingRight'] = Math.floor(availableScreenSize.width*28/720)+'px';
			loaderTitle.appendChild(loaderTitleButton);
			var talentTextLoaderStyleString = '<style>'+
												'#talentContainer .loaderTextContainer>.lo{'+
													'color:white;'+
													'font-family:"Myriad_Pro_LightSemiExt";'+
												'}'+
												'#talentContainer .loaderTextContainer>.lo{'+
													'animation-name:talentLoadScale;'+
													'animation-direction: alternate;'+
													'animation-iteration-count:infinite;'+
													'animation-duration:1s;'+
													'animation-timing-function:linear;'+
												'}'+

												'#talentContainer .loaderTextContainer>.l1{'+
												'animation-delay:0.0s}'+
												'#talentContainer .loaderTextContainer>.l2{'+
												'animation-delay:0.2s}'+
												'#talentContainer .loaderTextContainer>.l3{'+
												'animation-delay:0.4s}'+
												'#talentContainer .loaderTextContainer>.l4{'+
												'animation-delay:0.6s}'+
												'#talentContainer .loaderTextContainer>.l5{'+
												'animation-delay:0.8s}'+
												'#talentContainer .loaderTextContainer>.l6{'+
												'animation-delay:1.0s}'+
												'#talentContainer .loaderTextContainer>.l7{'+
												'animation-delay:1.2s}'+
												'#talentContainer .loaderTextContainer>.l8{'+
												'animation-delay:1.4s}'+
												'#talentContainer .loaderTextContainer>.l9{'+
												'animation-delay:1.6s}'+
												'#talentContainer .loaderTextContainer>.l10{'+
												'animation-delay:1.8s} '+

												'@keyframes "talentLoadScale" {'+
													'0%{transform:scale(1);} '+
													'10%{transform:scale(1.3);} '+
													'20%{transform:scale(1);} '+
													'100%{transform:scale(1);} '+
												'}'+

												'#talentContainer .loaderTextContainer>.lo{'+
													'-webkit-animation-name:talentLoadScale;'+
													'-webkit-animation-direction: alternate;'+
													'-webkit-animation-iteration-count:infinite;'+
													'-webkit-animation-duration:1s;'+
													'-webkit-animation-timing-function:linear;'+
												'}'+

												'#talentContainer .loaderTextContainer>.l1{'+
												'-webkit-animation-delay:0.0s}'+
												'#talentContainer .loaderTextContainer>.l2{'+
												'-webkit-animation-delay:0.2s}'+
												'#talentContainer .loaderTextContainer>.l3{'+
												'-webkit-animation-delay:0.4s}'+
												'#talentContainer .loaderTextContainer>.l4{'+
												'-webkit-animation-delay:0.6s}'+
												'#talentContainer .loaderTextContainer>.l5{'+
												'-webkit-animation-delay:0.8s}'+
												'#talentContainer .loaderTextContainer>.l6{'+
												'-webkit-animation-delay:1.0s}'+
												'#talentContainer .loaderTextContainer>.l7{'+
												'-webkit-animation-delay:1.2s}'+
												'#talentContainer .loaderTextContainer>.l8{'+
												'-webkit-animation-delay:1.4s}'+
												'#talentContainer .loaderTextContainer>.l9{'+
												'-webkit-animation-delay:1.6s}'+
												'#talentContainer .loaderTextContainer>.l10{'+
												'-webkit-animation-delay:1.8s} '+

												'@-webkit-keyframes "talentLoadScale" {'+
													'0%{-webkit-transform:scale(1);} '+
													'10%{-webkit-transform:scale(1.3);} '+
													'20%{-webkit-transform:scale(1);} '+
													'100%{-webkit-transform:scale(1);} '+
												'}'+

												'#talentContainer .loaderTextContainer>.lo{'+
													'-moz-animation-name:talentLoadScale;'+
													'-moz-animation-direction: alternate;'+
													'-moz-animation-iteration-count:infinite;'+
													'-moz-animation-duration:1s;'+
													'-moz-animation-timing-function:linear;'+
												'}'+

												'#talentContainer .loaderTextContainer>.l1{'+
												'-moz-animation-delay:0.0s}'+
												'#talentContainer .loaderTextContainer>.l2{'+
												'-moz-animation-delay:0.2s}'+
												'#talentContainer .loaderTextContainer>.l3{'+
												'-moz-animation-delay:0.4s}'+
												'#talentContainer .loaderTextContainer>.l4{'+
												'-moz-animation-delay:0.6s}'+
												'#talentContainer .loaderTextContainer>.l5{'+
												'-moz-animation-delay:0.8s}'+
												'#talentContainer .loaderTextContainer>.l6{'+
												'-moz-animation-delay:1.0s}'+
												'#talentContainer .loaderTextContainer>.l7{'+
												'-moz-animation-delay:1.2s}'+
												'#talentContainer .loaderTextContainer>.l8{'+
												'-moz-animation-delay:1.4s}'+
												'#talentContainer .loaderTextContainer>.l9{'+
												'-moz-animation-delay:1.6s}'+
												'#talentContainer .loaderTextContainer>.l10{'+
												'-moz-animation-delay:1.8s} '+

												'@-moz-keyframes "talentLoadScale" {'+
													'0%{-moz-transform:scale(1);} '+
													'10%{-moz-transform:scale(1.3);} '+
													'20%{-moz-transform:scale(1);} '+
													'100%{-moz-transform:scale(1);} '+
												'}'+

												'#talentContainer .loaderTextContainer>.lo{'+
													'-ms-animation-name:talentLoadScale;'+
													'-ms-animation-direction: alternate;'+
													'-ms-animation-iteration-count:infinite;'+
													'-ms-animation-duration:1s;'+
													'-ms-animation-timing-function:linear;'+
												'}'+

												'#talentContainer .loaderTextContainer>.l1{'+
												'-ms-animation-delay:0.0s}'+
												'#talentContainer .loaderTextContainer>.l2{'+
												'-ms-animation-delay:0.2s}'+
												'#talentContainer .loaderTextContainer>.l3{'+
												'-ms-animation-delay:0.4s}'+
												'#talentContainer .loaderTextContainer>.l4{'+
												'-ms-animation-delay:0.6s}'+
												'#talentContainer .loaderTextContainer>.l5{'+
												'-ms-animation-delay:0.8s}'+
												'#talentContainer .loaderTextContainer>.l6{'+
												'-ms-animation-delay:1.0s}'+
												'#talentContainer .loaderTextContainer>.l7{'+
												'-ms-animation-delay:1.2s}'+
												'#talentContainer .loaderTextContainer>.l8{'+
												'-ms-animation-delay:1.4s}'+
												'#talentContainer .loaderTextContainer>.l9{'+
												'-ms-animation-delay:1.6s}'+
												'#talentContainer .loaderTextContainer>.l10{'+
												'-ms-animation-delay:1.8s} '+

												'@-ms-keyframes "talentLoadScale" {'+
													'0%{-ms-transform:scale(1);} '+
													'10%{-ms-transform:scale(1.3);} '+
													'20%{-ms-transform:scale(1);} '+
													'100%{-ms-transform:scale(1);} '+
												'}'+

												'#talentContainer .loaderTextContainer>.lo{'+
													'-o-animation-name:talentLoadScale;'+
													'-o-animation-direction: alternate;'+
													'-o-animation-iteration-count:infinite;'+
													'-o-animation-duration:1s;'+
													'-o-animation-timing-function:linear;'+
												'}'+

												'#talentContainer .loaderTextContainer>.l1{'+
												'-o-animation-delay:0.0s}'+
												'#talentContainer .loaderTextContainer>.l2{'+
												'-o-animation-delay:0.2s}'+
												'#talentContainer .loaderTextContainer>.l3{'+
												'-o-animation-delay:0.4s}'+
												'#talentContainer .loaderTextContainer>.l4{'+
												'-o-animation-delay:0.6s}'+
												'#talentContainer .loaderTextContainer>.l5{'+
												'-o-animation-delay:0.8s}'+
												'#talentContainer .loaderTextContainer>.l6{'+
												'-o-animation-delay:1.0s}'+
												'#talentContainer .loaderTextContainer>.l7{'+
												'-o-animation-delay:1.2s}'+
												'#talentContainer .loaderTextContainer>.l8{'+
												'-o-animation-delay:1.4s}'+
												'#talentContainer .loaderTextContainer>.l9{'+
												'-o-animation-delay:1.6s}'+
												'#talentContainer .loaderTextContainer>.l10{'+
												'-o-animation-delay:1.8s} '+

												'@-o-keyframes "talentLoadScale" {'+
													'0%{-o-transform:scale(1);} '+
													'10%{-o-transform:scale(1.3);} '+
													'20%{-o-transform:scale(1);} '+
													'100%{-o-transform:scale(1);} '+
												'}'+
											'</style>';
			loaderTitleButton.innerHTML = talentTextLoaderStyleString;

			var loaderTitleButtonObjHeight = Math.floor(menuADScale*50);
			var loaderTitleButtonObj = document.createElement('div');
			loaderTitleButtonObj.style['display'] = 'inline-block';
			loaderTitleButtonObj.style['height'] = loaderTitleButtonObjHeight+'px';
			loaderTitleButtonObj.style['lineHeight'] = loaderTitleButtonObjHeight+'px';
			loaderTitleButtonObj.style['borderRadius'] = Math.ceil(loaderTitleButtonObjHeight/2)+'px';
			loaderTitleButtonObj.style['textAlign'] = 'center';
			loaderTitleButtonObj.style['padding'] = '0px 10px';
			loaderTitleButtonObj.style['cursor'] = 'pointer';
			loaderTitleButtonObj.style['color'] = 'white';
			loaderTitleButtonObj.style['fontFamily'] = 'Myriad_Pro_LightSemiExt';
			loaderTitleButtonObj.style['backgroundColor'] = '#83bf10';
			loaderTitleButtonObj.innerHTML = 'PLAY NOW!'
			// loaderTitleButton.appendChild(loaderTitleButtonObj);
			loaderTitleButtonObj.ontouchstart = function(e){
				me.hide(); 
				cancelBubble(e);
			};
			loaderTitleButtonObj.onclick = function(e){
				me.hide(); 
				cancelBubble(e);
			};

			
			var loaderTitleLoadButtonObj = document.createElement('div');
			loaderTitleLoadButtonObj.className = 'loaderTextContainer';
			loaderTitleLoadButtonObj.style['display'] = 'inline-block';
			loaderTitleLoadButtonObj.style['height'] = loaderTitleButtonObjHeight+'px';
			loaderTitleLoadButtonObj.style['lineHeight'] = loaderTitleButtonObjHeight+'px';
			loaderTitleLoadButtonObj.style['borderRadius'] = Math.ceil(loaderTitleButtonObjHeight/2)+'px';
			loaderTitleLoadButtonObj.style['textAlign'] = 'center';
			loaderTitleLoadButtonObj.style['padding'] = '0px 10px';
			loaderTitleLoadButtonObj.style['cursor'] = 'pointer';
			loaderTitleLoadButtonObj.style['color'] = 'white';
			loaderTitleLoadButtonObj.style['fontFamily'] = 'Myriad_Pro_LightSemiExt';
			loaderTitleLoadButtonObj.style['backgroundColor'] = '#83bf10';
			loaderTitleLoadButtonObj.innerHTML = '<span class="lo l1">L</span>'+
												 '<span class="lo l2">O</span>'+
												 '<span class="lo l3">A</span>'+
												 '<span class="lo l4">D</span>'+
												 '<span class="lo l5">I</span>'+
												 '<span class="lo l6">N</span>'+
												 '<span class="lo l7">G</span>'+
												 '<span class="lo l8">.</span>'+
												 '<span class="lo l9">.</span>'+
												 '<span class="lo l10">.</span>';
			loaderTitleButton.appendChild(loaderTitleLoadButtonObj);

			var loaderInfo = document.createElement('div');
			loaderInfo.id = 'loaderInfo';
			loaderInfo.style['display'] = 'block';
			loaderInfo.style['width'] = 'auto';
			loaderInfo.style['position'] = 'relative';
			loaderMask.appendChild(loaderInfo);

			var loaderInfoWidthPadding = Math.floor(availableScreenSize.width*56/720)+'px';
			var loaderInfoWarp = document.createElement('div');
			loaderInfoWarp.style['display'] = 'block';
			loaderInfoWarp.style['textIndent'] = '20px';
			loaderInfoWarp.style['width'] = 'auto';
			loaderInfoWarp.style['color'] = '#303030';
			loaderInfoWarp.style['fontFamily'] = 'Myriad_Pro_LightSemiExt';
			loaderInfoWarp.style['fontSize'] = Math.floor(availableScreenSize.width*26/720)+'px';
			loaderInfoWarp.style['padding'] = '0px '+loaderInfoWidthPadding + ' 10px '+loaderInfoWidthPadding;
			loaderInfoWarp.innerHTML = talentGameInfo.description;
			loaderInfo.appendChild(loaderInfoWarp);



			var adScale = (currentScreen.height>currentScreen.width)?
				Math.floor(currentScreen.width/480*100)/100:
				Math.floor(currentScreen.height/720*100)/100
			;

			var loaderAdHeight = Math.floor(330*adScale);
			var loaderInfoTop = loaderInfo.offsetTop;
			var loaderBorderCount = 5;
			var loaderBottomPlayHeight = Math.floor(100*menuADScale);
			var moreInfoHeight = Math.floor(50*menuADScale);
			var moreInfoBtn;
			var loaderAdCover;
			if(currentScreen.height > loaderInfoTop+loaderBottomPlayHeight+moreInfoHeight+loaderAdHeight){
				loaderInfo.style['height'] = (currentScreen.height - (loaderInfoTop+loaderBottomPlayHeight+loaderAdHeight+loaderBorderCount))+'px';
				loaderInfo.style['overflowY'] = 'hidden';
				
				if(loaderInfo.clientHeight<(loaderInfoWarp.clientHeight+moreInfoHeight)){
					moreInfoBtn = document.createElement('div');
					moreInfoBtn.style['position'] = 'absolute';
					moreInfoBtn.style['bottom'] = '0px';
					moreInfoBtn.style['width'] = '100%';
					moreInfoBtn.style['height'] = moreInfoHeight+'px';
					moreInfoBtn.style['lineHeight'] = moreInfoHeight+'px';
					moreInfoBtn.style['textAlign'] = 'center';
					moreInfoBtn.style['display'] = 'block';
					moreInfoBtn.style['backgroundColor'] = 'rgb(250,250,250)';
					moreInfoBtn.style['color'] = 'black';
					moreInfoBtn.style['cursor'] = 'pointer';
					moreInfoBtn.style['borderTop'] = '1px dashed rgb(195, 195, 195)';
					moreInfoBtn.innerHTML = 'MORE';
					loaderInfo.onclick = toggleMaskInfo;
					loaderInfo.ontouchstart = toggleMaskInfo;
					window.loaderInfoTrigger = true;
					function toggleMaskInfo(e){
						if(window.loaderInfoTrigger!=true) return;
						window.loaderInfoTrigger = false;
						if(loaderAdCover) loaderAdCover.style['display'] = 'block';
						if(loaderMask.className.length>0){
							loaderMask.className = '';
							moreInfoBtn.style['display'] = 'block';
						}else{
							loaderMask.className = 'expand';
							moreInfoBtn.style['display'] = 'none';
						}
						cancelBubble(e);
						window.setTimeout(function(){
							window.loaderInfoTrigger=true;
							if(loaderAdCover) loaderAdCover.style['display'] = 'none';
						},500);
					}
					loaderInfo.appendChild(moreInfoBtn);
				}
				
			}
			var loaderAdContainer = document.createElement('div');
			loaderAdContainer.id = 'loaderAdBlock';
			loaderAdContainer.style['position'] = 'relative';
			loaderAdContainer.style['backgroundColor'] = 'white';
			loaderAdContainer.style['display'] = 'block';
			loaderAdContainer.style['width'] = '100%';
			loaderAdContainer.style['height'] = loaderAdHeight+'px';
			loaderAdContainer.style['borderTop'] = '1px solid rgb(195, 195, 195)';
			loaderAdContainer.style['borderBottom'] = '1px solid rgb(195, 195, 195)';
			// loaderAdContainer.style['backgroundColor'] = 'yellow';
			loaderAdContainer.innerHTML+='<style>#talentContainer #loaderMask{overflow-y:scroll;} #talentContainer #loaderMask.expand{overflow-y:scroll !important;} #talentContainer #loaderMask.expand #loaderInfo{height:auto !important;} #talentContainer #loaderAdBlock>ins,#loaderAdBlock>.insobj{  border: 1px solid #ddd;position: absolute;top: 50%;margin-top: -140px;left: 50%;  margin-left: -168px;}</style>';
			loaderMask.appendChild(loaderAdContainer);

			loaderAdCover = document.createElement('div');
			loaderAdCover.style['position'] = 'absolute';
			loaderAdCover.style['width'] = '100%';
			loaderAdCover.style['height'] = '100%';
			loaderAdCover.style['display'] = 'none';
			// loaderAdCover.style['backgroundColor'] = 'green';
			loaderAdCover.style['zIndex'] = window.talentZIndex['loaderAdCover'];
			loaderAdContainer.appendChild(loaderAdCover);

			if(!adConfig.enableLoaderAd) window.addLoaderAD = true;

			addListener(window,'loaderAdLoaded',function(e){
		    	var adnKey = e.data[0]+'_'+e.data[1];
		    	talentGA.tagAD('loaderAD',adnKey);
			});

			var loaderBottomPlayContainer = document.createElement('div');
			loaderBottomPlayContainer.style['display'] = 'block';
			loaderBottomPlayContainer.style['width'] = '100%';
			loaderBottomPlayContainer.style['textAlign'] = 'center';
			loaderBottomPlayContainer.style['height'] = loaderBottomPlayHeight+'px';
			loaderMask.appendChild(loaderBottomPlayContainer);

			ajaxRequest({
			    url:'http://ip-api.com/json',
			    type:'get',
			    dataType:'json',
			    contentType:'json',
			    success:function(data){
			    	var country = data.countryCode.toUpperCase();
			    	if(country=='IN'){
			    		loaderBottomPlay.style['display'] = 'none';
			    		loaderBottomLoadPlay.style['display'] = 'none';

			    		var appId = getQueryString('appId')||getQueryString('appid')||'17019';
			    		var myAd = document.createElement('a');
			    		myAd.style['width'] = '100%';
			    		myAd.style['height'] = '100%';
			    		myAd.style['display'] = 'block';
			    		myAd.style['backgroundSize'] = 'contain';
			    		myAd.style['backgroundPosition'] = 'center';
			    		myAd.style['backgroundRepeat'] = 'no-repeat';
			    		myAd.style['backgroundImage'] = 'url("http://d11kdtiohse1a9.cloudfront.net/common/2015/06/03/14333199328336.jpg")';
			    		myAd.innerHTML = ' ';
			    		myAd.target = '_blank';
			    		myAd.href = 'https://paytm.com/shop/h/women?utm_medium=affiliate&utm_source=mobvista&utm_campaign=cpv-fashion&utm_term='+appId;
			    		myAd.onclick = function(e){adClick(e);}
			    		myAd.ontouchstart = function(e){adClick(e);}
			    		function adClick(evt){
			    			if(window.adClickTimer) clearTimeout(adClickTimer);
			    			window.adClickTimer = setTimeout(function(){
			    				talentGA.tagSpecAD('PayTM','click_in_'+country);
								cancelBubble(evt);
			    			},500);
			    		}
			    		talentGA.tagSpecAD('PayTM','show_in_'+country);
			    		loaderBottomPlayContainer.appendChild(myAd);
			    	}else{
			    		loaderBottomPlay.style['display'] = 'inline-block';
			    		loaderBottomLoadPlay.style['display'] = 'inline-block';
			    	}
			    	// if(callbackParam&&callbackParam.success) callbackParam.success();
			    },
			    error:function(data){
			    	console.log(data);
			    	// if(callbackParam&&callbackParam.error) callbackParam.error();
			    }
			});
			var loaderBottomBtnHeight = Math.floor(loaderBottomPlayHeight*0.6);
			var loaderBottomBtnTop = Math.floor(loaderBottomPlayHeight*0.2);
			var loaderBottomBtnFontSize = Math.floor(loaderBottomPlayHeight*0.2);
			var loaderBottomPlay = document.createElement('div');
			loaderBottomPlay.style['display'] = 'none';
			loaderBottomPlay.style['width'] = '80%';
			loaderBottomPlay.style['height'] = loaderBottomBtnHeight+'px';
			loaderBottomPlay.style['lineHeight'] = loaderBottomBtnHeight+'px';
			loaderBottomPlay.style['max-width'] = '420px';
			loaderBottomPlay.style['marginTop'] = loaderBottomBtnTop+'px';
			loaderBottomPlay.style['textAlign'] = 'center';
			loaderBottomPlay.style['backgroundColor'] = '#83bf10';
			loaderBottomPlay.style['cursor'] = 'pointer';
			loaderBottomPlay.style['color'] = 'white';
			loaderBottomPlay.style['fontSize'] = Math.floor(availableScreenSize.width*40/720)+'px';
			loaderBottomPlay.style['fontFamily'] = 'Myriad_Pro_LightSemiExt';
			loaderBottomPlay.style['borderRadius'] = Math.floor(loaderBottomBtnHeight/2)+'px';
			loaderBottomPlay.innerHTML = 'PLAY NOW!';
			// loaderBottomPlayContainer.appendChild(loaderBottomPlay);
			loaderBottomPlay.ontouchstart = function(e){
				me.hide(); 
				cancelBubble(e);
			};
			loaderBottomPlay.onclick = function(e){
				me.hide(); 
				cancelBubble(e);
			};



			var loaderBottomLoadPlay = document.createElement('div');
			loaderBottomLoadPlay.className = 'loaderTextContainer';
			loaderBottomLoadPlay.style['display'] = 'none';
			loaderBottomLoadPlay.style['width'] = '80%';
			loaderBottomLoadPlay.style['height'] = loaderBottomBtnHeight+'px';
			loaderBottomLoadPlay.style['lineHeight'] = loaderBottomBtnHeight+'px';
			loaderBottomLoadPlay.style['max-width'] = '420px';
			loaderBottomLoadPlay.style['marginTop'] = loaderBottomBtnTop+'px';
			loaderBottomLoadPlay.style['textAlign'] = 'center';
			loaderBottomLoadPlay.style['backgroundColor'] = '#83bf10';
			loaderBottomLoadPlay.style['cursor'] = 'pointer';
			loaderBottomLoadPlay.style['color'] = 'white';
			loaderBottomLoadPlay.style['fontSize'] = Math.floor(availableScreenSize.width*40/720)+'px';
			loaderBottomLoadPlay.style['fontFamily'] = 'Myriad_Pro_LightSemiExt';
			loaderBottomLoadPlay.style['borderRadius'] = Math.floor(loaderBottomBtnHeight/2)+'px';
			loaderBottomLoadPlay.innerHTML = '<span class="lo l1">L</span>'+
												 '<span class="lo l2">O</span>'+
												 '<span class="lo l3">A</span>'+
												 '<span class="lo l4">D</span>'+
												 '<span class="lo l5">I</span>'+
												 '<span class="lo l6">N</span>'+
												 '<span class="lo l7">G</span>'+
												 '<span class="lo l8">.</span>'+
												 '<span class="lo l9">.</span>'+
												 '<span class="lo l10">.</span>';
			loaderBottomPlayContainer.appendChild(loaderBottomLoadPlay);

			var loaderText = document.createElement('div');
			me.startCounting(loaderText,function(){

				loaderTitleButton.removeChild(loaderTitleLoadButtonObj);
				loaderTitleButton.appendChild(loaderTitleButtonObj);

				loaderBottomPlayContainer.removeChild(loaderBottomLoadPlay);
				loaderBottomPlayContainer.appendChild(loaderBottomPlay);
			});

			me.loaderMask = loaderMask;
			return loaderMask;

			

			
		},
		emptyShow:function(container){
			var currentScreen = getScreenSize();
			horizontalToHideBanner(currentScreen);
			var menuADScale = (currentScreen.height>currentScreen.width)?
				Math.floor(currentScreen.width/480*100)/100:
				Math.floor(currentScreen.height/720*100)/100
			;
			var styleContainer = document.createElement('div');
			styleContainer.style.display = 'none';
			var styleString = 
				'<style>'
					+'#talentContainer .flashFont01{'
						+'text-shadow:0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 40px #000DFF, 0 0 70px #0077FF;'
						+'-webkit-animation: twinkling 2.4s infinite linear 0s;'
						+'-moz-animation: twinkling 2.4s infinite linear 0s;'
						+'-ms-animation: twinkling 2.4s infinite linear 0s;'
						+'-o-animation: twinkling 2.4s infinite linear 0s;'
						+'animation: twinkling 2.4s infinite linear 0s;'
					+'}'
					+'#talentContainer .flashFont02{'
						+'text-shadow:0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 40px #000DFF, 0 0 70px #0077FF;'
						+'-webkit-animation: twinkling 2.4s infinite linear 1.2s;'
						+'-moz-animation: twinkling 2.4s infinite linear 1.2s;'
						+'-ms-animation: twinkling 2.4s infinite linear 1.2s;'
						+'-o-animation: twinkling 2.4s infinite linear 1.2s;'
						+'animation: twinkling 2.4s infinite linear 1.2s;'
						+'opacity: 0;'
					+'}'
					+'@-webkit-keyframes twinkling{'
						+'0%{opacity:0;}'  
						+'25%{opacity:1;}'
						+'50%{opacity: 0;}'
						+'100%{opacity: 0;}'
					+'}'
					+'@-moz-keyframes twinkling{'
						+'0%{opacity:0;}'  
						+'25%{opacity:1;}'
						+'50%{opacity: 0;}'
						+'100%{opacity: 0;}'
					+'}'
					+'@-ms-keyframes twinkling{'
						+'0%{opacity:0;}'  
						+'25%{opacity:1;}'
						+'50%{opacity: 0;}'
						+'100%{opacity: 0;}'
					+'}'
					+'@-o-keyframes twinkling{'
						+'0%{opacity:0;}'  
						+'25%{opacity:1;}'
						+'50%{opacity: 0;}'
						+'100%{opacity: 0;}'
					+'}'
					+'@keyframes twinkling{'
						+'0%{opacity:0;}'  
						+'25%{opacity:1;}'
						+'50%{opacity: 0;}'
						+'100%{opacity: 0;}'
					+'}'
				+'</style>';
			styleContainer.innerHTML = styleString;
			talentContainer.appendChild(styleContainer);


			var loaderMask = document.createElement('div');
			loaderMask.style['position'] = 'fixed';
			loaderMask.style['zIndex'] = window.talentZIndex['loaderMaskEmpty'];
			loaderMask.style['left'] = '0px';
			loaderMask.style['right'] = '0px';
			loaderMask.style['top'] = '0px';
			loaderMask.style['bottom'] = '0px';
			loaderMask.style['backgroundColor'] = 'rgba(0, 0, 0, 0.3)';
			container.appendChild(loaderMask);

			loaderMask.style['-webkit-box-orient'] = 'horizontal';
			loaderMask.style['-moz-box-orient'] = 'horizontal';
			loaderMask.style['-ms-box-orient'] = 'horizontal';
			loaderMask.style['-o-box-orient'] = 'horizontal';
			loaderMask.style['box-orient'] = 'horizontal';

			loaderMask.style['-webkit-box-pack'] = 'center';
			loaderMask.style['-moz-box-pack'] = 'center';
			loaderMask.style['-ms-box-pack'] = 'center';
			loaderMask.style['-o-box-pack'] = 'center';
			loaderMask.style['box-pack'] = 'center';

			loaderMask.style['-webkit-box-align'] = 'center';
			loaderMask.style['-moz-box-align'] = 'center';
			loaderMask.style['-ms-box-align'] = 'center';
			loaderMask.style['-o-box-align'] = 'center';
			loaderMask.style['box-align'] = 'center';

			loaderMask.style['display'] = '-webkit-box';
			loaderMask.style['display'] = '-moz-box';
			loaderMask.style['display'] = '-ms-box';
			loaderMask.style['display'] = '-o-box';
			loaderMask.style['display'] = 'box';

			var loaderAdMask = document.createElement('div');
			// loaderAdMask.style['backgroundColor']='red';
			loaderAdMask.style['width']='336px';
			loaderAdMask.style['height']='280px';
			loaderAdMask.style['position'] = 'relative';
			loaderAdMask.style['display']='block';
			loaderMask.appendChild(loaderAdMask);

			var loaderContentWidth = loaderMask.clientWidth;
			var loaderContentHeight = Math.floor(loaderContentWidth/720*842);
			var loaderContent = document.createElement('div');
			loaderContent.style['position'] = 'relative';
			loaderContent.style['width'] = loaderContentWidth+'px';
			loaderContent.style['height'] = loaderContentHeight+'px';
			loaderContent.style['backgroundSize'] = 'contain';
			loaderContent.style['backgroundPosition'] = 'center';
			//To hide this background image for show more detail in loading page
			// loaderContent.style['backgroundImage'] = 'url("'+window.basePath+'images/loading_bg.jpg")';
			// loaderMask.appendChild(loaderContent);

			var loaderTextTop = Math.floor(loaderContentWidth/718*473);
			// var loaderTextSize = Math.floor(loaderContentWidth/618*24);
			var loaderTextSize = Math.floor(loaderContentWidth/618*24*2);
			var loaderText01 = document.createElement('div');
			loaderText01.className = 'flashFont01';
			loaderText01.innerHTML = 'TALENT GAME BOX';
			loaderText01.style['width'] = '100%';
			loaderText01.style['color'] = 'white';
			loaderText01.style['textAlign'] = 'center';
			loaderText01.style['position'] = 'absolute';
			loaderText01.style['bottom'] = (-2*loaderTextSize-(menuADScale-1)*140)+'px';
			loaderText01.style['textAlign'] = 'center';
			loaderText01.style['width'] = loaderContentWidth+'px';
			loaderText01.style['left'] = '50%';
			loaderText01.style['marginLeft'] = Math.floor(loaderContentWidth/-2)+'px';
			loaderText01.style['fontSize'] = loaderTextSize+'px';
			loaderText01.style['fontFamily'] = 'talent_font';
			loaderAdMask.appendChild(loaderText01);

			var loaderText02 = document.createElement('div');
			loaderText02.className = 'flashFont02';
			loaderText02.innerHTML = 'LOADING DATA...';
			loaderText02.style['width'] = '100%';
			loaderText02.style['color'] = 'white';
			loaderText02.style['textAlign'] = 'center';
			loaderText02.style['position'] = 'absolute';
			loaderText02.style['bottom'] = (-2*loaderTextSize-(menuADScale-1)*140)+'px';
			loaderText02.style['textAlign'] = 'center';
			loaderText02.style['width'] = loaderContentWidth+'px';
			loaderText02.style['left'] = '50%';
			loaderText02.style['marginLeft'] = Math.floor(loaderContentWidth/-2)+'px';
			loaderText02.style['fontSize'] = loaderTextSize+'px';
			loaderText02.style['fontFamily'] = 'talent_font';
			loaderAdMask.appendChild(loaderText02);

			var loaderText03 = document.createElement('div');
			var loaderText03Top = -1*Math.floor(1.2*loaderTextSize/2.5+(menuADScale-1)*140);
			var loaderText03Size = Math.floor(loaderTextSize/2.5);
			loaderText03.style['width'] = '100%';
			loaderText03.style['color'] = 'white';
			loaderText03.style['textAlign'] = 'center';
			loaderText03.style['position'] = 'absolute';
			loaderText03.style['top'] = loaderText03Top+'px';
			loaderText03.style['textAlign'] = 'center';
			loaderText03.style['width'] = loaderContentWidth+'px';
			loaderText03.style['left'] = '50%';
			loaderText03.style['textShadow'] = '1px 1px 1px gray';
			loaderText03.style['marginLeft'] = Math.floor(loaderContentWidth/-2)+'px';
			loaderText03.style['fontSize'] = loaderText03Size+'px';
			loaderText03.style['fontFamily'] = 'talent_font';
			loaderAdMask.appendChild(loaderText03);

			var loaderAdBlock = document.createElement('div');
			loaderAdBlock.id = 'loaderAdBlock';
			loaderAdBlock.style['width'] = '100%';
			loaderAdBlock.style['height'] = '100%';
			loaderAdBlock.style['left'] = '0px';
			loaderAdBlock.style['top'] = '0px';
			// loaderAdBlock.style['backgroundColor'] = 'blue';
			loaderAdBlock.style['position'] = 'absolute';
			loaderAdMask.appendChild(loaderAdBlock);


			var loaderAdCloseWidth = Math.floor(loaderAdMask.clientWidth*0.08*menuADScale);

			// alert(-1*Math.floor(1.8*loaderTextSize/2.5))
			var loaderAdClose = document.createElement('div');
			loaderAdClose.style['width'] = loaderAdCloseWidth+'px';
			loaderAdClose.style['height'] = loaderAdCloseWidth+'px';
			loaderAdClose.style['lineHeight'] = loaderAdCloseWidth+'px';
			loaderAdClose.style['textAlign'] = 'center';
			loaderAdClose.style['position'] = 'absolute';
			loaderAdClose.style['color'] = 'white';
			loaderAdClose.style['left'] = '50%';
			loaderAdClose.style['marginLeft'] = -1*Math.floor(loaderAdCloseWidth/2)+'px';
			loaderAdClose.style['top'] = (loaderText03Top+loaderText03Size)+'px';
			loaderAdClose.style['fontSize'] = loaderAdCloseWidth+'px';
			loaderAdClose.style['borderRadius'] = '50%';
			loaderAdClose.style['backgroundColor'] = 'red';
			loaderAdClose.style['cursor'] = 'pointer';
			loaderAdClose.style['zIndex'] = window.talentZIndex['loaderAdClose'];
			// loaderAdClose.innerHTML = 'x';
			var me = this;
			loaderAdClose.ontouchstart = function(e){
				me.hide(); 
				cancelBubble(e);
			};
			loaderAdClose.onclick = function(e){
				me.hide(); 
				cancelBubble(e);
			};
			loaderAdMask.appendChild(loaderAdClose);

			var closeBlock01 = document.createElement('div');
			closeBlock01.style['position']='absolute';
			closeBlock01.style['top']='40%';
			closeBlock01.style['left']='20%';
			closeBlock01.style['width']='60%';
			closeBlock01.style['height']=Math.floor(loaderAdCloseWidth/5)+'px';
			closeBlock01.style['background']='rgba(255,255,255,1)';
			closeBlock01.style['-webkit-border-radius']=Math.floor(loaderAdCloseWidth/2)+'px';
			closeBlock01.style['-moz-border-radius']=Math.floor(loaderAdCloseWidth/2)+'px';
			closeBlock01.style['borderRadius']=Math.floor(loaderAdCloseWidth/2)+'px';
			closeBlock01.style['-webkit-transform']='rotate(-40deg)';
			closeBlock01.style['-moz-transform']='rotate(-40deg)';
			closeBlock01.style['-ms-transform']='rotate(-40deg)';
			closeBlock01.style['-o-transform']='rotate(-40deg)';
			closeBlock01.style['transform']='rotate(-40deg)';
			loaderAdClose.appendChild(closeBlock01);

			var closeBlock02 = document.createElement('div');
			closeBlock02.style['position']='absolute';
			closeBlock02.style['top']='40%';
			closeBlock02.style['left']='20%';
			closeBlock02.style['width']='60%';
			closeBlock02.style['height']=Math.floor(loaderAdCloseWidth/5)+'px';
			closeBlock02.style['background']='rgba(255,255,255,1)';
			closeBlock02.style['-webkit-border-radius']=Math.floor(loaderAdCloseWidth/2)+'px';
			closeBlock02.style['-moz-border-radius']=Math.floor(loaderAdCloseWidth/2)+'px';
			closeBlock02.style['borderRadius']=Math.floor(loaderAdCloseWidth/2)+'px';
			closeBlock02.style['-webkit-transform']='rotate(40deg)';
			closeBlock02.style['-moz-transform']='rotate(40deg)';
			closeBlock02.style['-ms-transform']='rotate(40deg)';
			closeBlock02.style['-o-transform']='rotate(40deg)';
			closeBlock02.style['transform']='rotate(40deg)';
			loaderAdClose.appendChild(closeBlock02);

			if(!adConfig.enableLoaderAd) window.addLoaderAD = true;

			addListener(window,'loaderAdLoaded',function(e){
		    	var adnKey = e.data[0]+'_'+e.data[1];
		    	talentGA.tagAD('loaderAD',adnKey);

			})

			
			// triggerEvent(window,'loaderShow',[loaderAdBlock])
			var me = this;
			this.startCounting(loaderText03,function(){
				me.checkAllLoaded();
			});
			this.loaderMask = loaderMask;
			return loaderMask;
		},
		startCounting:function(countEl,callback){
			var me = this;
			// console.log(me.adCount);
			countEl.innerHTML = 'The game will start in '+this.adCount+'s';
			if(me.adCount==0){
				countEl.style['display'] = 'none';
				if(!window.talentGameInfo) me.adCounted = true;
				if(callback) callback();
				
			}else{
				me.adCount--;
				me.adCountTimer = setTimeout(function(){
					me.startCounting(countEl,callback);
				},1000);
			}
		},
		hide:function(){
			if(this.loaderMask) this.loaderMask.parentElement.removeChild(this.loaderMask);
			if(this.adCountTimer) clearTimeout(this.adCountTimer);
			triggerEvent(window, 'loadEnd');
			talentGA.clickPlayGame();
			return this.loaderMask;
		},
		checkAllLoaded:function(){
			if(this.gameLoaded==true&&this.adCounted==true){
				this.hide();
			}
		}
	}

	var catalogMask = {
		catalogs:window.talentGameCatalogs,
		isInit:false,
		mask:null,
		catalogListContainer:null,
		catalogMaskTimer:null,
		catalogMaskLocker:false,
		show:function(talentContainer){
			var me = this;
			if(me.isInit!=true||me.mask==null){
				if(!talentContainer) talentContainer=document.body;
				me.init(talentContainer)
			}
			me.catalogMaskLocker = true;
			me.mask.className = 'show';
			if(me.catalogMaskTimer) clearTimeout(me.catalogMaskTimer);
			me.catalogMaskTimer = setTimeout(function(){
				me.catalogListContainer.className = 'catalogListContainer show';
				setTimeout(function(){me.catalogMaskLocker = false;},300);
			},300);

		},
		hide:function(){
			var me = this;
			if(me.isInit){
				me.mask.className = '';
				if(me.catalogMaskTimer) clearTimeout(me.catalogMaskTimer);
				me.catalogListContainer.className = 'catalogListContainer';
			}
		},
		init:function(talentContainer){
			var me = this;
			var appId = getQueryString('appId')||
					getQueryString('appid')||'17019';
			window.talentAppId = appId;
			var sign = getQueryString('s')||'668d571bff3dc16a26ad81642c64504d';
			var menuConfig = getQueryString('hmenu')||'';
			menuConfig = menuConfig.length>0?'&hmenu='+menuConfig:'';
			var jump ='share';
			var urlParam = '?appId='+appId+'&s='+sign+'&jump='+jump+menuConfig;
			var mask = document.createElement('div');
			mask.id='talentCatalogContainer';
			// mask.style['display'] = 'block';
			mask.style['position'] = 'fixed';
			mask.style['left'] = '0px';
			mask.style['right'] = '0px';
			mask.style['top'] = '0px';
			mask.style['bottom'] = '0px';
			mask.style['backgroundColor'] = 'rgba(0,0,0,0.7)';
			mask.style['zIndex'] = window.talentZIndex['catalogMask'];
			talentContainer.appendChild(mask);
			me.mask = mask;
			mask.onclick = function(e){
				if(me.catalogMaskLocker==true) return;
				if(e.srcElement.id=='talentCatalogContainer'){me.hide();};cancelBubble(e);
			};
			mask.ontouchstart = function(e){
				if(me.catalogMaskLocker==true) return;
				if(e.srcElement.id=='talentCatalogContainer'){me.hide();};cancelBubble(e);
			};


			var itemFontSize = Math.floor(availableScreenSize.height*18/1280);
			var itemHeight = Math.floor(availableScreenSize.height*62/1280);
			var itemHeightHalf = Math.ceil(itemHeight/2);
			var itemHeightQuao = Math.ceil(itemHeight/2.5);
			var itemIndent = Math.floor(availableScreenSize.width*70/720);
			var listContainerWidth = Math.floor(availableScreenSize.width*352/720);

			var listContainer = document.createElement('div');
			me.catalogListContainer = listContainer;
			listContainer.className = 'catalogListContainer'
			listContainer.style['width'] = listContainerWidth+'px';
			listContainer.style['height'] = '100%';
			listContainer.style['backgroundColor'] = 'white';
			listContainer.style['position'] = 'fixed';
			listContainer.style['left'] = '0px';
			listContainer.style['top'] = '0px';
			listContainer.innerHTML = '<style>'
									+'#talentContainer #talentCatalogContainer{display:none;}'
									+'#talentContainer #talentCatalogContainer.show{display:block;}'
									+'#talentContainer .catalogListContainer{-webkit-transition:all 0.3s ease-in;-moz-transition:all 0.3s ease-in;-ms-transition:all 0.3s ease-in;-o-transition:all 0.3s ease-in;transition:all 0.3s ease-in;-webkit-transform:translateX(-'+(listContainerWidth+itemHeightHalf)+'px);-moz-transform:translateX(-'+(listContainerWidth+itemHeightHalf)+'px);-ms-transform:translateX(-'+(listContainerWidth+itemHeightHalf)+'px);-o-transform:translateX(-'+(listContainerWidth+itemHeightHalf)+'px);transform:translateX(-'+(listContainerWidth+itemHeightHalf)+'px);}'
									+'#talentContainer #talentCatalogContainer.show .catalogListContainer.show{-webkit-transform:translateX(0px);-moz-transform:translateX(0px);-ms-transform:translateX(0px);-o-transform:translateX(0px);transform:translateX(0px);}'
									+'#talentContainer .catalogListContainer{font-family:"Myriad_Pro_Regular";color:#303030;font-size:'+itemFontSize+'px;}'
									+'#talentContainer .catalogListContainer .home{background-color:#f36f21;color:white;position:relative;}'
									+'#talentContainer .catalogListContainer .home:after{content:" ";display:block;position:absolute;right:-'+(itemHeightQuao*2)+'px;top:0px;'
											+'width:0px;height:0px;border:'+itemHeightHalf+'px solid transparent;border-left:'+itemHeightQuao+'px solid #f36f21;border-right:'+itemHeightQuao+'px solid transparent;}'
									+'#talentContainer .catalogListContainer>a{text-decoration:none;color:#303030;}'
									+'#talentContainer .catalogListContainer>.focus{color:#f36f21;}'
									+'</style>'
			mask.appendChild(listContainer);


			var catalogHeader = document.createElement('div');
			catalogHeader.style['borderBottom'] = '1px solid #eeeeee';
			catalogHeader.style['display'] = 'block';
			catalogHeader.style['height'] = itemHeight+'px';
			catalogHeader.style['lineHeight'] = itemHeight+'px';
			catalogHeader.style['backgroundPosition'] = 'center';
			catalogHeader.style['backgroundSize'] = '80% auto';
			catalogHeader.style['backgroundRepeat'] = 'no-repeat';
			catalogHeader.style['backgroundImage'] = 'url("'+window.basePath+'/images/slogan_d.png")';
			listContainer.appendChild(catalogHeader);

			var catalogHomeItem = document.createElement('a');
			// catalogHomeItem.className = 'home';
			catalogHomeItem.href = window.basePath+'index.html'+urlParam;
			catalogHomeItem.style['borderBottom'] = '1px solid #eeeeee';
			catalogHomeItem.style['display'] = 'block';
			catalogHomeItem.style['height'] = itemHeight+'px';
			catalogHomeItem.style['lineHeight'] = itemHeight+'px';
			catalogHomeItem.innerHTML = 'Home';
			catalogHomeItem.style['textIndent'] = Math.ceil(itemIndent/2)+'px';
			listContainer.appendChild(catalogHomeItem);

			var catalogAllGamesItem = document.createElement('a');
			catalogAllGamesItem.href = window.basePath+'index_all.html'+urlParam;
			catalogAllGamesItem.style['borderBottom'] = '1px solid #eeeeee';
			catalogAllGamesItem.style['display'] = 'block';
			catalogAllGamesItem.style['height'] = itemHeight+'px';
			catalogAllGamesItem.style['lineHeight'] = itemHeight+'px';
			catalogAllGamesItem.innerHTML = 'All Games';
			catalogAllGamesItem.style['textIndent'] = Math.ceil(itemIndent/2)+'px';
			listContainer.appendChild(catalogAllGamesItem);

			for(var i=0;i<me.catalogs.length;i++){
				var catalogItem = document.createElement('a');
				if(window.talentGameInfo.catalog == me.catalogs[i].text){
					catalogItem.className = 'focus';	
				}
				catalogItem.style['borderBottom'] = '1px solid #eeeeee';
				catalogItem.style['display'] = 'block';
				catalogItem.style['height'] = itemHeight+'px';
				catalogItem.style['lineHeight'] = itemHeight+'px';
				catalogItem.style['textIndent'] = itemIndent+'px';
				catalogItem.href = window.basePath+'index_'+me.catalogs[i].key+'.html'+urlParam;
				catalogItem.innerHTML = me.catalogs[i].text;
				listContainer.appendChild(catalogItem);
			}
			me.isInit = true;
		}
	}

	function addListener(element, e, fn) {
		if (element.addEventListener) {
			element.addEventListener(e, fn, false);
		} else {
			element.attachEvent("on" + e, fn);
		}
	}

	function triggerEvent(element, e, data) {
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

	}

	function cancelBubble(evt){
		var e=(evt)?evt:window.event;  
		if (window.event) {  
			e.cancelBubble=true;  
		} else {  
			//e.preventDefault();  
			e.stopPropagation();  
		}  
	}

	function getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]); return null;
    }

    function getScreenSize() {
		var testWidthEl = domHelper('div')
			.attr('style', 'display:block;position:fixed;left:0px;right:0px;top:0px;bottom:0px;visibility:hidden;z-index:99999;')
			.insertTo(window.document.body);
		var screenWidth = testWidthEl.el.clientWidth;
		var screenHeight = testWidthEl.el.clientHeight;
		testWidthEl.remove();
		return {
			width: screenWidth,
			height: screenHeight
		};
	}


    function domHelper(domPath) {
		var me = this;
		var innerCss = cssHelper();
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
	};

	function cssHelper(cssPath) {
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
	}

	

	function init(){
		window.talentContainer = document.createElement('div');
		talentContainer.setAttribute('id','talentContainer');
		document.body.appendChild(talentContainer);

		talentLoader.show(talentContainer);
		if(window.talentGameInfo) catalogMask.init(talentContainer);


		var x = document.getElementsByTagName('script')[0]; 
		var addThisScript = document.createElement('script'); 
		addThisScript.type = 'text/javascript'; 
		addThisScript.async = true; 
		addThisScript.src = window.basePath+'js/init_ishare.js?v=3'; 
		addThisScript.onload = initIShare;
		x.parentNode.insertBefore(addThisScript, x);

		currentScreen = getScreenSize();
		screenScale = (currentScreen.height>currentScreen.width)?
			Math.floor(currentScreen.width/480*100)/100:
			Math.floor(currentScreen.height/720*100)/100
			;
		var bannerHeight = (window.adConfig.enableBannerAd==false)? 0 : Math.floor(screenScale*67);
		var bodyStyleString = document.body.getAttribute('style');
		document.body.setAttribute('style', bodyStyleString+';bottom:'+bannerHeight +'px !important;height:'+Math.floor(currentScreen.height - bannerHeight)+' !important;');
		document.body.style.height = Math.floor(currentScreen.height - bannerHeight)+'px';
		// alert('height:'+Math.floor(currentScreen.height - bannerHeight)+' !important;')
		window.frameObj = canvasFrameId? document.getElementById(canvasFrameId):null;
		if(frameObj){
			var heightScale = Math.floor(((currentScreen.height - bannerHeight)/currentScreen.height)*100)/100;
			// frameObj.style['-webkit-transform-origin'] = '50% top';
			// frameObj.style['-moz-transform-origin'] = '50% top';
			// frameObj.style['-ms-transform-origin'] = '50% top';
			// frameObj.style['-o-transform-origin'] = '50% top';
			// frameObj.style['transform-origin'] = '50% top';

			// frameObj.style['-webkit-transform'] = 'scaleY('+heightScale+')';
			// frameObj.style['-moz-transform'] = 'scaleY('+heightScale+')';
			// frameObj.style['-ms-transform'] = 'scaleY('+heightScale+')';
			// frameObj.style['-o-transform'] = 'scaleY('+heightScale+')';
			// frameObj.style['transform'] = 'scaleY('+heightScale+')';

			// frameObj.style['height'] = Math.floor(currentScreen.height - bannerHeight)+'px';
			setTimeout(function(){
				var frameHeight =  Math.floor(currentScreen.height - bannerHeight)+'px';
				frameObj.style['height'] = frameHeight;
				var styleContainer = document.createElement('div');
				styleContainer.style.display = 'none';
				styleContainer.innerHTML = '<style>.talentForceSize{height:'+frameHeight+' !important;}<style>';
				talentContainer.appendChild(styleContainer);
				frameObj.className +=' talentForceSize';
				frameObj.setAttribute('bannerHeight',bannerHeight);

			},initDelay);
			// frameObj.style['position'] = 'relative';
			// frameObj.style['top'] = -1*bannerHeight+'px'
		} 
		// alert(heightScale)

		var bannerWarp = domHelper('div').attr({
			'id':'view'
		}).insertTo(window.talentContainer);
		var bannerContainer = domHelper('div').attr({
			'id':'adnView'
		}).insertTo(bannerWarp);
		var menuBanner = domHelper('mobvistaADN').attr({
			'id':window.talentBannerId,
			'adnType':'banner',
			'slide':'true',
			'animate':'true'
		}).insertTo(bannerContainer);

		var gameIconObj = domHelper('meta').attr({
			'id':'gameIcon',
			'property':'og:image',
			'content':'http://www.rayjump.com/images/talent_logo.png'
		}).insertTo(document.head);

		var backMenuObj = domHelper('div').attr({
			'id':'backMenu',
			'onclick':'backToGameList()'
		}).css({
			'display':'none',
			'width': Math.floor(screenScale*45)+'px',
			'height': Math.floor(screenScale*45)+'px',
			'left': Math.floor(screenScale*10)+'px',
			'top': Math.floor(screenScale*10)+'px',
			'padding':'0px'
		});
		backMenuObj.el.ontouchstart = function(e){backToGameList(); cancelBubble(e);};
		var line_A = domHelper('div').attr('class','line_A').css({
			'height':Math.floor(screenScale*4)+'px',
		}).insertTo(backMenuObj);
		var line_B = domHelper('div').attr('class','line_B').css({
			'height':Math.floor(screenScale*4)+'px',
		}).insertTo(backMenuObj);
		backMenuObj.insertTo(window.talentContainer);

		var meun_btnObj = domHelper('div').attr({
			'id':'meun_btn',
			'class':'meun',
			'onclick':'toggleMaskMenu(true)',
			'style':'display:none;right:10px;left: inherit'
		}).css({
			'display':'none',
			'width': Math.floor(screenScale*45)+'px',
			'height': Math.floor(screenScale*45)+'px',
			'right': Math.floor(screenScale*10)+'px',
			'top': Math.floor(screenScale*10)+'px',
			'padding':'0px'
		})
		meun_btnObj.el.ontouchstart = function(e){toggleMaskMenu(true); cancelBubble(e);};
		var lineATop = screenScale>1? Math.ceil(screenScale*45/4):Math.floor(screenScale*45/4);
		var lineHeight = screenScale>1? Math.ceil((screenScale*45)/10):Math.floor((screenScale*45)/10);
		var lineMargin =  lineHeight;
		// alert(lineATop+'-'+lineHeight+'-'+lineMargin)
		var line_1 = domHelper('div').attr('class','line_1').css({
			'position':'absolute',
			'left':'50%',
			'margin-top':'0px',
			'margin-left':'-35%',
			'height':lineHeight+'px',
			'top':lineATop+'px'
		}).insertTo(meun_btnObj);
		var line_2 = domHelper('div').attr('class','line_2').css({
			'position':'absolute',
			'left':'50%',
			'margin-top':'0px',
			'margin-left':'-35%',
			'height':lineHeight+'px',
			'top':(lineATop+lineHeight+lineMargin)+'px'
		}).insertTo(meun_btnObj);
		var line_3 = domHelper('div').attr('class','line_3').css({
			'position':'absolute',
			'left':'50%',
			'margin-top':'0px',
			'margin-left':'-35%',
			'height':lineHeight+'px',
			'top':(lineATop+(lineHeight+lineMargin)*2)+'px'
		}).insertTo(meun_btnObj);
		meun_btnObj.insertTo(window.talentContainer);

		var headerObj = domHelper('div').attr('id','header').css({
			'height':Math.floor(screenScale*70)+'px',
			'width':'100%',
			'background-color':'#efeff0',
			'position':'fixed',
			'top':'0px',
			'left':'0px',
			'z-index':window.talentZIndex['headerObj']
		});
		var backHomeMenu = domHelper('img').attr({
			'id':'backHome',
			'src':window.basePath+'images/backHome.png',
			'onclick':'backToGameList();'
		}).css({
			'position': 'absolute',
			'left': Math.floor(screenScale*15)+'px',
			'top': Math.floor(screenScale*15)+'px',
			'width': Math.floor(screenScale*48)+'px',
			'height': Math.floor(screenScale*40)+'px'
		}).insertTo(headerObj);
		backHomeMenu.el.ontouchstart = function(e){backToGameList(); cancelBubble(e);};
		var extBtnMenu = domHelper('img').attr({
			'id':'extBtn',
			'src':window.basePath+'images/showMenu.png',
			'onclick':'toggleMaskMenu(true);'
		}).css({
			'position': 'absolute',
			'right': Math.floor(screenScale*15)+'px',
			'top': Math.floor(screenScale*20)+'px',
			'width': Math.floor(screenScale*42)+'px',
			'height': Math.floor(screenScale*31)+'px'
		}).insertTo(headerObj);
		extBtnMenu.el.ontouchstart = function(e){toggleMaskMenu(true); cancelBubble(e);};
		headerObj.insertTo(window.talentContainer);


		var maskMenuObj = domHelper('div').attr({
			'id':'maskMenu',
			'class':'mask'
		});
		var maskContainerObj = domHelper('div').attr({
			'id':'maskContainer',
			'class':'maskContainer',
			'onclick':'closeMaskContainer',
			'style':'display:fixed'
		}).insertTo(maskMenuObj);
		var maskContentObj = domHelper('div').attr({
			'id':'maskContent',
			'class':'maskContent'
		}).insertTo(maskContainerObj);
		var randomGameObj = domHelper('div').attr({
			'id':'randomGame',
			'class':'addthis_sharing_toolbox share-custom row'
		}).insertTo(maskContentObj);

		switchGameIconWidth = Math.floor(screenScale*64);
		var game01 = domHelper('a').attr('class','game').attr('style',
			'width:'+switchGameIconWidth+'px !important;'+
			'height:'+switchGameIconWidth+'px !important;'+
			'margin:'+Math.floor(screenScale*10)+'px !important;'
		).insertTo(randomGameObj);
		var game02 = domHelper('a').attr('class','game').attr('style',
			'width:'+switchGameIconWidth+'px !important;'+
			'height:'+switchGameIconWidth+'px !important;'+
			'margin:'+Math.floor(screenScale*10)+'px !important;'
		).insertTo(randomGameObj);
		var game03 = domHelper('a').attr('class','game').attr('style',
			'width:'+switchGameIconWidth+'px !important;'+
			'height:'+switchGameIconWidth+'px !important;'+
			'margin:'+Math.floor(screenScale*10)+'px !important;'
		).insertTo(randomGameObj);
		var game04 = domHelper('a').attr('class','game').attr('style',
			'width:'+switchGameIconWidth+'px !important;'+
			'height:'+switchGameIconWidth+'px !important;'+
			'margin:'+Math.floor(screenScale*10)+'px !important;'
		).insertTo(randomGameObj);
		var game05 = domHelper('a').attr('class','game').attr('style',
			'width:'+switchGameIconWidth+'px !important;'+
			'height:'+switchGameIconWidth+'px !important;'+
			'margin:'+Math.floor(screenScale*10)+'px !important;'
		).insertTo(randomGameObj);
		var spliterObj = domHelper('div').attr('class','spliter').insertTo(maskContentObj);
		var h3Obj = domHelper('h3').html('SHARE WITH YOUR FRIENDS').css({
			'font-size':screenScale*18.7+'px',
			'padding':Math.floor(screenScale*15)+'px 0px'
		}).insertTo(maskContentObj)
		var feedObj = domHelper('div').attr({
			'class':'addthis_sharing_toolbox share-custom row feed'
		}).insertTo(maskContentObj);
		var addthis_button01 = domHelper('a').attr({
			'id':'tgs_facebook_btn',
			'class':'addthis_button_facebook facebook',
			'onclick':'shareGame("facebook")'
		}).attr('style',
			'width:'+switchGameIconWidth+'px !important;'+
			'height:'+switchGameIconWidth+'px !important;'+
			'margin:'+Math.floor(screenScale*15)+'px !important;'
		).insertTo(feedObj);
		addthis_button01.el.ontouchstart = function(e) { shareGame("facebook"); cancelBubble(e); };
		var addthis_button02 = domHelper('a').attr({
			'id':'tgs_twitter_btn',
			'class':'addthis_button_twitter twitter',
			'onclick':'shareGame("twitter")'
		}).attr('style',
			'width:'+switchGameIconWidth+'px !important;'+
			'height:'+switchGameIconWidth+'px !important;'+
			'margin:'+Math.floor(screenScale*15)+'px !important;'
		).insertTo(feedObj);
		addthis_button02.el.ontouchstart = function(e) { shareGame("twitter"); cancelBubble(e); };
		var addthis_button03 = domHelper('a').attr({
			'id':'tgs_googleplus_btn',
			'class':'addthis_button_google_plusone_share googleplus',
			'onclick':'shareGame("googleplus")'
		}).attr('style',
			'width:'+switchGameIconWidth+'px !important;'+
			'height:'+switchGameIconWidth+'px !important;'+
			'margin:'+Math.floor(screenScale*15)+'px !important;'
		).insertTo(feedObj);
		addthis_button03.el.ontouchstart = function(e) { shareGame("googleplus"); cancelBubble(e); };
		var cancel_share_btnObj = domHelper('div').attr({
			'id':'cancel_share_btn',
			'class':'cancel btn',
			'onclick':'toggleMaskMenu(false)'
		}).css({
			'font-size':screenScale*20.8+'px',
			'padding':Math.floor(screenScale*18)+'px 0px'
		}).html('Cancel').insertTo(maskContentObj);
		cancel_share_btnObj.el.ontouchstart = function(e){toggleMaskMenu(false); cancelBubble(e);}
		maskMenuObj.insertTo(window.talentContainer);

		addListener(window,'shareByFacebook',function(){
			triggerEvent(addthis_button01.el,'click');
		});
		addListener(window,'shareByTwitter',function(){
			triggerEvent(addthis_button02.el,'click');
		});
		addListener(window,'shareByGoogleplus',function(){
			triggerEvent(addthis_button03.el,'click');
		});



	    var viewportContent = getQueryString('viewportContent');
	    while(viewportContent&&viewportContent.indexOf('@')>-1){
	        viewportContent = viewportContent.replace('@','=');
	    }
	    var initViewPort;
	    if(viewportContent){
	        switch(viewportContent){
	            case 'extendViewport':
	                initViewPort = function(){
	                    window['extendViewport']();
	                };
	                break;
	            default:
	                initViewPort = function(){};
	                var viewport = document.getElementById('viewport');
	                if(viewport) viewport.setAttribute('content',viewportContent);
	        } 
	    };

	    window.menuConfig = getQueryString('hmenu')||'';
	    window.menuString = menuConfig.length>0 ? '&hmenu='+ menuConfig : '';
	    window.hideMenus = menuConfig.length>0? menuConfig.split(','):[];
	    window.hideMenuConfig = {};
	    for(var mi=0;mi<hideMenus.length;mi++){
	        var hideObject = hideMenus[mi];
	        hideMenuConfig[hideObject] = true;
	    }
	    if(hideMenuConfig['hb']||true){//hide headbar in default
	        document.getElementById('header').style.display = 'none';
	        if(frameObj) frameObj.style.top = '0px';
	        document.getElementById('backMenu').style.display = 'block';
	        document.getElementById('meun_btn').style.display = 'block';
	    }else{
	        document.getElementById('header').style.display = 'block';
	    }

	    if(hideMenuConfig['home']){
	        document.getElementById('backHome').style.display = 'none';
	        document.getElementById('backMenu').style.display = 'none';
	    }

	    if(hideMenuConfig['share']){
	        document.getElementById('extBtn').style.display = 'none';
	        document.getElementById('meun_btn').style.display = 'none';
	    }

	    window.getWeight = function (){
	        var weightString = getQueryString('weight');
	        var weightArray = [];
	        try{
	            weightArray = JSON.parse(weightString);
	        }catch(e){
	            weightArray =[];
	        }
	        return weightArray?weightArray:[];
	    }
	    
	   
	    var weightArray = getWeight();
	    // document.getElementById('meun_btn').onclick = function(){
	    //     document.getElementById('share_container').style.display = '';
	    // };

	    

	    

	    


	    

	    document.getElementById('maskContainer').onclick = function(e){
	        if(e.toElement.className=='maskContainer'){
	            toggleMaskMenu(false);
	        }
	    }
	     document.getElementById('maskContainer').ontouchstart = function(e){
	        if(e.srcElement.className=='menuADMask'||e.srcElement.className=='maskContainer'){
	            toggleMaskMenu(false);
	        }
	        cancelBubble(e);
	    }



	    window.shareGameLocker = false;
	    window.shareGame = function (shareType){
	    	if(shareGameLocker) return;
	    	setTimeout(function(){
	    		shareGameLocker = false;
	    	}, 500);


	   		talentGA.shareGame(shareType);
	        var seo = document.getElementById('seoFrame');
	        seo.contentWindow.shareGame(shareType);
	        shareGameLocker = true;
	    }

		var s = document.createElement('script'); 
		s.type = 'text/javascript'; 
		s.async = true; 
		s.src = window.basePath+'js/core.js?v=20160827a'; 
		var x = document.getElementsByTagName('script')[0]; 
		s.onload = initMediation;
		x.parentNode.insertBefore(s, x);
	}

	function initMediation(){
		addListener(window,'loadEnd',function(){
			if(adConfig.enableBannerAd){
				Mediation.init({
		            'adnType':'banner',
		            'isAutoShow':true,
		            'initByTag':true,
		            callback:function(){
		            	var currentMedia = Mediation.currentMedia;
				    	var adnKey = currentMedia['data-ad-client']+'_'+currentMedia['data-ad-banner-slot'];
				    	talentGA.tagAD('banner',adnKey);
		            }
		         });
			}
			
		});

		Mediation.init({
			'mediaId':'123',
			'adnType':'overlay',
			'isAutoShow':false
		});

		
		

		var appId = Util.getQueryString(window.location.href, 'appId')||
					Util.getQueryString(window.location.href, 'appid')||'17019';
	    var sign = Util.getQueryString(window.location.href, 's')
	        ||'668d571bff3dc16a26ad81642c64504d';


	    window.backToGameList = function (){
	    	if(window.gameListData&&window.gameListData['forceBackAction']&&window.gameListData['forceBackAction'][window.talentAppId]==true){
	    		window.history.back();
	    		return;
	    	}
	        window.location.href 
	        // = "http://www.rayjump.com/?s="+sign+"&appId="+appId+menuString;
	        = window.basePath+'index.html?s='+sign+'&appId='+appId+menuString+'&'+talentGA.jumpKey+'='+talentGA.jumpType.game;
	    }

	   
	    var maskContentTimer;
	    window.toggleMaskMenuLocker = false;
	    window.toggleMaskMenu = function (switcher){
	    	if(toggleMaskMenuLocker) return;
	    	setTimeout(function(){
	    		window.toggleMaskMenuLocker = false;
	    	}, 500);
	        if(maskContentTimer) clearTimeout(maskContentTimer);
	        var mask = document.getElementById('maskMenu');
	        var maskContent = document.getElementById('maskContent');
	        if(switcher){
	            mask.className = 'mask show';

	            if(adConfig.enableMenuAd){
	            	document.getElementById(window.talentBannerId).style['display'] = 'none';
	            	Util.triggerEvent(window, "menushow");
		            var currentMedia = Mediation.currentMedia;
			    	var adnKey = currentMedia['data-ad-client']+'_'+currentMedia['data-ad-fullscreen-slot'];
			    	talentGA.tagAD('menuAd',adnKey);
	            }
	            

	            maskContentTimer = setTimeout(function(){
	                maskContent.className = 'maskContent show';
	            },100);

	            var randomGame = document.getElementById('randomGame');
            	var adSlotIndex = Math.floor(Math.random()*randomGame.children.length);
            	var iconHolder = randomGame.children[adSlotIndex];

            	//Stop using icon ad to rise the effective;
            	// if(!window.switchIcon) Util.triggerEvent(window, "switchIcon",[switchGameIconWidth,iconHolder]);
            	window.switchIcon = true;

	        }else{
	            mask.className = 'mask';
	            Util.triggerEvent(window, "menuhide");
	            maskContentTimer = setTimeout(function(){
	                maskContent.className = 'maskContent';
	                setTimeout(function(){
	            		document.getElementById(window.talentBannerId).style['display'] = 'block';
	                },400);
	            },100);
	        }
	        window.toggleMaskMenuLocker = true;
	    }


	    window.requestData = function () {
	        Util.mobvistaAjax({
	            url:window.basePath+'game_list.json',
	            type: 'get',
	            timeout: '1000',
	            contentType: 'JSON',
	            timestamp: true,
	            dataType: 'json',
	            success: function (data) {
	            	window.gameListData = data.data;
	                var gamesIcon = document.getElementById('randomGame').querySelectorAll('a');
	                var gameRows = data.data['gameList'].rows;
	                var gameFilter = data.data.gameFilter[appId]||'';
                    gameFilter = gameFilter.split(',');
                    var filterObj = {};
                    for(var n=0;n<gameFilter.length;n++){
                        filterObj[gameFilter[n]] = true;
                    }
	                var randomCheck={},gameLength = gameRows.length;
	                for(var i=0;i<gamesIcon.length;i++){
	                    var randomIndex = Math.floor(Math.random()*gameLength);
	                    while(randomCheck[randomIndex]||filterObj[gameRows[randomIndex]['gameId']]==true){
	                        randomIndex = Math.floor(Math.random()*gameLength);
	                    }
	                    randomCheck[randomIndex] = true;
	                    var game = gameRows[randomIndex];
	                    var gameIconUrl = game.icon.substring(game.icon.indexOf('upload/gamelist/')+16,game.icon.length);
	                    var targetUrl = window.basePath+game.openLink+'?appId='+appId+'&s='+sign+menuString+'&'+talentGA.jumpKey+'='+talentGA.jumpType.share;

	                    Util.domHelper(gamesIcon[i]).attr({
	                        'href':targetUrl
	                    }).css({
	                        'background-image':'url(../'+gameIconUrl+')'
	                    });
	                    gamesIcon[i].ontouchstart = function(e){
	                    	window.location.href = targetUrl;
	                    	cancelBubble(e);
	                    }
	                }

	            }
	        });
	    }
	    requestData();

	    window.real_game_url = window.location.href;
	    // window.real_game_url = window.location.href; // 游戏真实url；
	    window.share_game_url = window.location.href;//"http://h5.4joys.com/game/view/id/53ce26742d26bae70b8b46fd/u/54c1ff3b4bed2462458b4e82"; // 游戏要分享的url；
	    window.share_score_url = "http://www.rayjyump.com"; // 游戏图片请求地址，这个地址后面会自动跟三个参数，分别是游戏关卡，游戏得分，游戏星星
	  	window.track_url = "http://h5.4joys.com/game/click/id/3/u/54c1ff3b4bed2462458b4e82/flag/95113d1aa9e6bd19653cfa6703bc3164/btn/";
	    window.loaded_cb_url = "http://www.rayjyump.com";
	    window.httpReferer = "http://www.rayjyump.com";
	    window.addthis_config = {
	        ui_use_css: false,
	        ui_508_compliant: true
	    }


	    window.parentPath = real_game_url.substr(0,real_game_url.lastIndexOf('/')+1);
	    window.urlHead =  window.location.href.substr(0,window.location.href.indexOf(parentPath)+1);
	        urlHead = urlHead.substr(0,urlHead.lastIndexOf('/')+1);
	    window.openLink = urlHead+parentPath+'seo_index.html?s='+sign+'&appId='+appId+menuString+'&forShare=true';
	    // document.getElementById('seoFrame').src = openLink;
	    addListener(window,'load',function(){
		    Util.domHelper('iframe').attr({
		    	'id':'seoFrame',
		    	'src':openLink,

		    }).insertTo(window.talentContainer);

	    });
	}

	function initIShare(){
		var menu = new Ishare({

	    });

	    window.P.showShare=showOverlay;

	    function showOverlay(){
	    	if(!adConfig.enableOverlayAd) return false;
	    	if(window.overlayFC.request() == false) return false;
	    	var currentMedia = Mediation.currentMedia;
	    	var adnKey = currentMedia['data-ad-client']+'_'+currentMedia['data-ad-fullscreen-slot'];
	    	talentGA.tagAD('overlay',adnKey);
	      	if(Media.getMedia('123')) Media.getMedia('123').showCampaign();
	      	return true;
	    }
	}

})();
