define(['mustache'],
function(Mustache) {

	return {
		create : function(pars,callback){ create(pars,callback); },
  		read : function(){ read(); },
  		updatePoint : function(pars,callback){ updatePoint(pars,callback); }  	
  	};

  	function create(pars,callback){ 
  		console.log(API.user.user.create)
  		console.log(pars)
		$.post(API.user.user.create,pars,function(data){

  		console.log(callback)
			callback(JSON.parse(data));
		});
	}

  	function read(){ 
		$.get(API.user.user.read,'',function(data){
  		console.log(typeof data)
			  var template = $('#j-user-tpl').html();
              var html = Mustache.to_html(template, JSON.parse(data)).replace(/^\s*/mg, '');
               $('#j-user').html(html);
		});
	}

	function updatePoint(pars,callback){ 
		$.post(API.user.user.updatePoint,'',function(data){
			callback();
		});
	}

});