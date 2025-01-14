var Media={
	_mediaObjSet:{},
	type:null,
	_mediaBaseSet:{},
	weightAdapterSet:{},
	init:function(param){
		var me = this;
		if(!me._mediaBaseSet[param.type]){ param.error();return this;}
		me.type = param.type;

		Util.initCookie();
        isViewport = Util.hasViewport();
        currentScreen = Util.getScreenSize();

        var mediaId = param.mediaId||'mediaId_'+(new Date().toString());
        param.mediaId = mediaId;
		me._mediaObjSet[mediaId] = me._mediaBaseSet[param.type]();
		me._mediaObjSet[mediaId].mediaId = mediaId;
		me._mediaObjSet[mediaId].ready = false;
		me._mediaObjSet[mediaId].init(param);
		return me._mediaObjSet[mediaId];
	},
	getMedia:function(mediaId){
		return this._mediaObjSet[mediaId];
	},
	install:function(type,media){
		this._mediaBaseSet[type] = media;
		return this;
	},
	weightAdapter:function(orgWeightArray){
		var me = this;
		var newWeightArray = [];
		for(var i=0;i<orgWeightArray.length;i++){
			var mediaType = orgWeightArray[i].name;
			if(me.weightAdapterSet[mediaType]){
				newWeightArray.push(
					me.weightAdapterSet[mediaType](orgWeightArray[i])
				);
			}
		}
		return newWeightArray;
	}

};