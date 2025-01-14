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
							getQueryString('appid')||'mobvistatest-23';
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
							getQueryString('appid')||'mobvistatest-23';

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
							getQueryString('appid')||'mobvistatest-23';
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
							getQueryString('appid')||'mobvistatest-23';
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