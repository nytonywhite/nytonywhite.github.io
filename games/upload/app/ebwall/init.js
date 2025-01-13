$(function (argument) {
	$.ajax({
			url:"tai.xml",
            type:"POST",
            dataType:"xml",
            timeout: 100000,
            error: function(xml){
                alert('Error loading XML document'+xml);
            },
            success: function(xml){
            	content = $("#content");
            	content.html('');
                var records = $(xml).find('record');
                for(var i=0;i<100;i++){
                	var record = $(records[i]);
                	insertProduct(record);
                	console.log(record.children('product_name').text());
                }
            }
        });
});
var content;
function insertProduct(record){
	var productString = 
	'<a href="'+record.children('URL').text()+'" target="_blank">'+
      '<div class="game clearfix">'+
      '  <div class="game-logo">'+
      '    <img src="'+record.children('picture_url').text()+'"></div>'+
      '  <div class="game-info">'+
      '    <section>'+
      '      <p class="title">'+record.children('product_name').text()+'</p>'+
      '      <p class="des">'+record.children('brand').text()+'</p>'+
      '    </section>'+
      '    <div class="clearfix btn-content">'+
      '      <div class="btn-play">BUY</div>'+
      '    </div>'+
      '  </div>'+
      '</div>'+
    '</a>';
    var product = $(productString);
    content = content?content : $("#content");
    content.append(product);
}