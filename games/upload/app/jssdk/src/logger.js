var Mvjssdk = Mvjssdk||{};
Mvjssdk.Logger = {
	debug:true,
	uploadLog:true,
	init: function(){

		this['debug'] = (Mvjssdk.Util.getQueryString(window.location.href,'mvLogDebug')=='true')?true:(Mvjssdk.Configer['isLogShow']||false);
		if(this.debug==false) console.log = function(){};
	},
	post: function(){
		if(this.uploadLog==true){
			//dopost
		}
	}
};