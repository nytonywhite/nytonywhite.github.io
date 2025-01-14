function getQueryString(url, name) {
	var spliter = '?';
	if (url.indexOf(spliter) < 0) return null;
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = url.split(spliter)[1].match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}
function triggerEvent(element,e,data){
    if(document.fireEvent){
        var event = document.createEventObject();  
        event.eventType = 'message'; 
        event.data = data; 
        //触发document上绑定的自定义事件ondataavailable  
        document.fireEvent('on'+e, event);
    }else if (document.createEvent) { 
        //调用document对象的 createEvent 方法得到一个event的对象实例。
        var event = document.createEvent('HTMLEvents'); 
        // initEvent接受3个参数：  
        // 事件类型，是否冒泡，是否阻止浏览器的默认行为  
        event.initEvent(e, true, true); 
        event.eventType = 'message';  
        event.data = data;
        element.dispatchEvent(event); 
    } 

};
function shareGame(shareType){
	var toolbox = document.getElementById('adtb');
	var toolboxContainer = toolbox;
	if(toolbox.children[0].tagName.toLowerCase()=='div'){
		toolboxContainer = toolbox.children[0];
	}

	var shareElSet = {};
	for(var i=0;i<toolboxContainer.children.length;i++){
		if(toolboxContainer.children[i].className.indexOf('facebook')>=0){
			shareElSet['facebook'] = toolboxContainer.children[i];
			continue;
		}

		if(toolboxContainer.children[i].className.indexOf('twitter')>=0){
			shareElSet['twitter'] = toolboxContainer.children[i];
			continue;
		}

		if(toolboxContainer.children[i].className.indexOf('gmail')>=0){
			shareElSet['google'] = toolboxContainer.children[i];
			continue;
		}
	}

	switch(shareType){
		case 'facebook':
			triggerEvent(shareElSet['facebook'],'click');
			break;
		case 'twitter':
			triggerEvent(shareElSet['twitter'],'click');
			break;
		case 'googleplus':
			triggerEvent(shareElSet['google'],'click');
			break;
	}
}

var s = getQueryString(window.location.href,'s')||'668d571bff3dc16a26ad81642c64504d';;
var appId = getQueryString(window.location.href,'appId')||'17019';
var title = document.getElementById('title');

var pagePath = window.location.host + window.location.pathname;
var parentPath = pagePath.substr(0,pagePath.lastIndexOf('/')+1);
var urlHead =  window.location.href.substr(0,window.location.href.indexOf(parentPath));
var openLink = urlHead+parentPath+'index.html';
var gameIcon = urlHead+parentPath+'icon.png';
var targetUrl = '../../../view.html?s='+s+'&appId='
				+appId+'&openLink='+openLink
				+'&shareLink='+openLink+'&gameIcon='
				+gameIcon+'&title='+title;

var isSharePage = getQueryString(window.location.href,'forShare')||'';
if(isSharePage=='true'&&this.parent!=this&&this.parent&&this.parent.location.host==location.host){
	document.writeln('<script src="../../../js/init_clear_api.js"></script>');
	var real_game_url = 'http://www.rayjump.com';
    // var real_game_url = window.location.href; // 游戏真实url；
    var share_game_url = window.location.href;//"http://h5.4joys.com/game/view/id/53ce26742d26bae70b8b46fd/u/54c1ff3b4bed2462458b4e82"; // 游戏要分享的url；
    var share_score_url = "http://www.rayjyump.com"; // 游戏图片请求地址，这个地址后面会自动跟三个参数，分别是游戏关卡，游戏得分，游戏星星
  	var track_url = "http://h5.4joys.com/game/click/id/3/u/54c1ff3b4bed2462458b4e82/flag/95113d1aa9e6bd19653cfa6703bc3164/btn/";
    var loaded_cb_url = "http://www.rayjyump.com";
    var httpReferer = "http://www.rayjyump.com";
    var addthis_config = {
        ui_use_css: false,
        ui_508_compliant: true
    };

    document.writeln('<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-53ca3e66454ec43f"></script>');
    window.onload = function(){
	    document.body.style['backgroundColor'] = 'white';
	    document.body.innerHTML = 
	    				"<div id='adtb' class='addthis_sharing_toolbox share-custom row feed'>"+
	    				// "<a class='addthis_button_facebook facebook' id='share_facebook'>facebook</a><br/>"+
	    				// "<a class='addthis_button_twitter twitter' id='share_twitter'>twitter</a><br/>"+
	    				// "<a class='addthis_button_google_plusone_share googleplus' id='share_googleplus'>googleplus</a>"+
	    				"</div>";

    }


}else{
	window.location.replace(targetUrl);
}			

