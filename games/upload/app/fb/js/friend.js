define(['mustache'],
function(Mustache) {

	return {
  		read : function(cb){ read(cb); },
  	};

  	function read(cb){ 
		$.get(API.user.friend.read,'',function(data){
			   var template = $('#j-friend-tpl').html();
               var html = Mustache.to_html(template, JSON.parse(data)).replace(/^\s*/mg, '');
               $('#j-friend').html(html);
               cb();
		});
	}

});