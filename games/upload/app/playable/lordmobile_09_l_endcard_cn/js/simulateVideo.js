function playVideo(url,callback) {
	var video = document.createElement('video');
	video.id = 'gv';
	video.style.display = 'block';
	video.style.position = 'absolute';
	video.style.width = '100%';
	video.style.height = '100%';
	video.style.zIndex = '9999';
	video.style.left = '0';
	video.style.top = '0';
	video.src = url;
	document.body.appendChild(video);

	video.onclick = function(){
    	video.play();
	}
    video.onended = function(){
        video.style.display = 'none';
        if(callback) callback();
    }
	return video;
}

var video = null;

if(getQueryString(window.location.href,'video')=='preview'){
	video = playVideo('video.mp4',function(){
	    window.setTimeout(function(){startBoom(28);},0);
	});
}



function getQueryString(url, name) {
	var spliter = '?';
	if (url.indexOf(spliter) < 0) return null;
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = url.split(spliter)[1].match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}