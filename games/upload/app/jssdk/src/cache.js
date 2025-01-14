var Mvjssdk = Mvjssdk || {};
Mvjssdk.Cache = {
	setLocalStorage: function(key, value) {
		if(!localStorage) return;
		try{
			var objString = JSON.stringify(value);
			localStorage[key] = objString;
		}catch(e){};
	},
	getLocalStorage: function(key) {
		if(!localStorage) return null;
		var obj = localStorage[key];
		if (obj != null) {
			return JSON.parse(obj);
		} else {
			return null;
		}
	},
	mobvistaCookie: {
		init: function() {
			var user;
			var isNew = this.getCookie('mobvistaUUID');
			if (isNew != null && isNew.length > 0) {
				user = isNew
			} else {

				this.setCookie('mobvistaUUID', this.createUUID(), this.getHowManyYear(2));
				user = this.getCookie('mobvistaUUID');
				console.log("it's new");
			};
			console.log(user);
			return user;
		},
		getCookie: function(c_name) {
			if (document.cookie.length > 0) { //先查询cookie是否为空，为空就return ""
				c_start = document.cookie.indexOf(c_name + "=") //通过String对象的indexOf()来检查这个cookie是否存在，不存在就为 -1
				if (c_start != -1) {
					c_start = c_start + c_name.length + 1 //最后这个+1其实就是表示"="号啦，这样就获取到了cookie值的开始位置
					c_end = document.cookie.indexOf(";", c_start) //其实我刚看见indexOf()第二个参数的时候猛然有点晕，后来想起来表示指定的开始索引的位置...这句是为了得到值的结束位置。因为需要考虑是否是最后一项，所以通过";"号是否存在来判断
					if (c_end == -1) c_end = document.cookie.length;
					return unescape(document.cookie.substring(c_start, c_end)) //通过substring()得到了值。想了解unescape()得先知道escape()是做什么的，都是很重要的基础，想了解的可以搜索下，在文章结尾处也会进行讲解cookie编码细节	　　　　　　
				}
			}
			return "";
		},
		setCookie: function(c_name, value, expiredays, domain, path) {
			//使用方法：setCookie('username','Darren',30)　
			var cookieString = '';
			var exdate = new Date();
			exdate.setDate(exdate.getDate() + expiredays);
			cookieString = c_name + "=" + escape(value);
			cookieString += (expiredays == null) ? "" : ";expires=" + expiredays.toGMTString();
			cookieString += (domain == null) ? "" : ";domain=" + domain;
			cookieString += (path == null) ? "" : ";path=" + path;
			document.cookie = cookieString;
			console.log(document.cookie);
		},
		getHowManyYear: function(count) {
			var _date = new Date();
			console.log(_date.getDate() + (365 * count))
			_date.setDate(_date.getDate() + (365 * count));
			console.log(_date.toGMTString())
			return _date;
		},
		createUUID: (function(uuidRegEx, uuidReplacer) {
			return function() {
				return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(uuidRegEx, uuidReplacer).toUpperCase();
			};
		})(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0,
				v = c == "x" ? r : (r & 3 | 8);
			return v.toString(16);
		})

	},
	initCookie: function() {
		var user = this.mobvistaCookie.init();
		console.log('user is ' + user);
		if ((!Mediation.userConfig.did) || (Mediation.userConfig.did.length == 0)) Mediation.userConfig.did = user;
	},
}