window.mv_tracking = window.mv_tracking ? window.mv_tracking : {
	hasScroll:false,
	parentCount:0,
	check:function(gaid,checkType){
		var iframeStyle = 'border:0;margin:0;padding:0;position:absolute;z-index:0;left:-1px;top:-1px;width:1px;height:1px;opacity:0.01;';
		var trackingIframe = document.createElement('iframe');
		trackingIframe.setAttribute('style',iframeStyle);
		
		var parentWindow1 = window;
		var parentWindow2 = window.parent;
		while(parentWindow1!=parentWindow2&&parentWindow2.mv_tracking){
			this.parentCount++;
			var tempParentWindow = parentWindow2;
			parentWindow1 = parentWindow2;
			parentWindow2 = tempParentWindow.parent;
			console.log(this.parentCount);
		}

		var refer =  location.href;
		var param = {
			refer:refer,
			parentCount:this.parentCount
		};


		if(checkType == 'pageview'){
			trackingIframe.src = 'http://www.rayjump.com/upload/app/dsp/tracking.html?gaid='+gaid+'&event=pageview&action='+encodeURIComponent(JSON.stringify(param));
			
			document.addEventListener('DOMContentLoaded', function(){ document.body.appendChild(trackingIframe); }, false);
		}


		if(checkType == 'scrollonce'){
			function onScroll(){
				window.mv_tracking.hasScroll = true;
				document.removeEventListener('scroll', onScroll, false);

				trackingIframe.src = 'http://www.rayjump.com/upload/app/dsp/tracking.html?gaid='+gaid+'&event=scrollonce&action='+encodeURIComponent(JSON.stringify(param));
				document.body.appendChild(trackingIframe);

			}

			if(window.mv_tracking.hasScroll == false){
				document.addEventListener('scroll', onScroll, false);
			}else{
				document.removeEventListener('scroll', onScroll, false);
			}
		}
	}
};