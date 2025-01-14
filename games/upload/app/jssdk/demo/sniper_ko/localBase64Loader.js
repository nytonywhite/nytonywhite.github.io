var win = window;
while(win.location.href=='about:blank'){
	win = window.parent.window;
	console.log(win.location.href);
}
var urlSplitArray = win.location.href.split('/');
urlSplitArray.pop();
var baseUrlFolder = '/'+urlSplitArray[urlSplitArray.length-1];
var baseUrl = urlSplitArray.join('/');
if(baseUrl.indexOf('file:///')==0){ baseUrl=baseUrl.substr(8,baseUrl.length-1); }
var localBase64Loader = {
	chenckResource:function(url,callback){
		var relativeUrl = './'
		var starIndex = url.indexOf(baseUrl);
		if(starIndex>=0){
			relativeUrl = relativeUrl+url.substr(starIndex+baseUrl.length+1,url.length-1);
		}else{
			console.log("load error: "+ relativeUrl);
			return false;
		}

		if(gameData[relativeUrl]){
			console.log("load success: "+ relativeUrl);
			if(callback){
				callback(gameData[relativeUrl]);
			}else{
				return gameData[relativeUrl];
			}
		}else{
			console.log("load error: "+ relativeUrl);
			return false;
		}
	},
	getResourceToByteArray:function(url,callback){
		var relativeUrl = './'
		var starIndex = url.indexOf(baseUrl);
		if(starIndex>=0){
			relativeUrl = relativeUrl+url.substr(starIndex+baseUrl.length+1,url.length-1);
		}
		var fileData;
        if((!gameData[relativeUrl])&&(url.indexOf('data:')!=0)){console.log("no such file as "+relativeUrl+'---'+url);return false;}
        if(url.indexOf('data:')==0){
        	fileData = url.split(",")[1];
        }else{
        	fileData = gameData[relativeUrl].split(",")[1];
        }
        
        var response = base64js.toByteArray(fileData);
        console.log("load success: "+ relativeUrl);
        if(callback){
        	callback(response);
        }else{
        	return response;
        }
	},
	base64DataToByteArray:function(base64Data){
		return base64js.toByteArray(base64Data.split(",")[1]).buffer;
	}
}