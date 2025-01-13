var Mvjssdk = Mvjssdk || {};

Mvjssdk.Util.addListener(document,'DOMContentLoaded',function(){
	Mvjssdk.Logger.init();
	if(Mvjssdk.Configer.init()){
		Mvjssdk.Offer.init();
	}
});