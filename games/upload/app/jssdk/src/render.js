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
