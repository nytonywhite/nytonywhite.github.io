window.Vicodemaker = function(el){
	var tmpl = el.getAttribute('tmpl');
	var appid = el.getAttribute('appid');
	var sign = el.getAttribute('sign');
	var unitid = el.getAttribute('unitid');


	document.writeln(decodeURIComponent(tmpl));
	var script = document.createElement('script');
	script.setAttribute('type','text/javascript');
	script.setAttribute('src','//vijs.rayjump.com/bin/vijs.js');
	script.setAttribute('sign',sign);
	script.setAttribute('appid',appid);
	if(document&&document.body){
		document.body.appendChild(script);
	}else{
		document.head.appendChild(script);
	}


	script.onload = function(){
		if (window.Vijs) {
			Vijs.init(script);
		    var myAd45641 = Vijs.setAD({
		        unitid: unitid,
		        view: 285,
		        placeholderid: 'ad_placeholder_'+unitid,
		        loadedCallback: function() {
		            console.log('success')
		        }
		    });
		}
	}
}


