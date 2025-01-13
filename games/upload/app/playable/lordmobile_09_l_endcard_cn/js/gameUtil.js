function loadSignleImage(url,callback) {
	var img = document.createElement('img');
	if(callback) img.onload = callback;
	if(callback) img.onerror = callback;
	img.style.cssText = 'opacity:0.001;position:absolute;left:-1px;top:-1px;z-index:0';
	img.src = url;
	document.body.appendChild(img);
}

function makeNumberWidthSpace(numberSpace,number){
	var numberDiffLength = numberSpace - number.toString().length
	if(numberSpace>0&&numberDiffLength>0){
		var numberSpaceString = '';
		for(var i=0;i<numberDiffLength;i++){
			numberSpaceString += '0';
		}
		return numberSpaceString+number.toString();
	}else{
		return number.toString();
	}
}

function loadImages(param,callback){
	var urlHeader = param.urlHeader || '';
	var format = param.format || '.jpg';
	var start = parseInt(param.start);
	var end = parseInt(param.end);
	var numberSpace = param.numberSpace || 0;
	var imgArray = [];
	for(var i=start;i<=end;i++){
		(function(index){
			var imgUrl = urlHeader + makeNumberWidthSpace(numberSpace,index) + format;
			imgArray.push(imgUrl);
		})(i)
	}

	function loadAll(){
		var imgUrl = imgArray.pop();
		if(imgUrl){
			loadSignleImage(imgUrl,loadAll);
		}else{
			callback();
		}
	}
	loadAll();
}