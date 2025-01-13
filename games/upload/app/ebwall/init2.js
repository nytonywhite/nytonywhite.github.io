var page = 1;
$(document).ready(function() {
	$.ajax({
			url:"feed.json",
            type:"POST",
            dataType:"xml",
            timeout: 100000,
            error: function(xml){
                alert('Error loading XML document'+xml);
            },
            success: function(xml){
            	content = $("#thumbs");
            	content.html('');
                var records = $(xml).find('record');
                for(var i=0;i<20;i++){
                	var record = $(records[i]);
                	insertProduct(record);
                };

              var $container = $('#thumbs');
              // 使用 imagesLoaded() 修复该插件在 chrome 下的问题
              $container.imagesLoaded(function(){
                $container.masonry({
                  // 每一列数据的宽度，若所有栏目块的宽度相同，可以不填这段
                  // .imgbox 为各个图片的容器
                  itemSelector : '.imgbox'
                });


                $container.infinitescroll({
                    navSelector: "#navigation", //导航的选择器，会被隐藏
                    nextSelector: "#navigation a", //包含下一页链接的选择器
                    itemSelector: ".imgbox", //你将要取回的选项(内容块)
                    path:function(){return 'page.htm?aaa='+(++page)+'';},
                    debug: true, //启用调试信息
                    animate: true, //当有新数据加载进来的时候，页面是否有动画效果，默认没有
                    extraScrollPx: 150, //滚动条距离底部多少像素的时候开始加载，默认150
                    bufferPx: 40, //载入信息的显示时间，时间越大，载入信息显示时间越短
                    errorCallback: function() {
                        alert('error');
                    }, //当出错的时候，比如404页面的时候执行的函数
                    localMode: true, //是否允许载入具有相同函数的页面，默认为false
                    dataType: 'html',//可以是json
    //                template: function(data) {
    //                    //data表示服务端返回的json格式数据，这里需要把data转换成瀑布流块的html格式，然后返回给回到函数
    //                    return '';
    //                },
                    loading: {
                        msgText: "loading...",
                        finishedMsg: '没有新数据了...',
                        selector: '.loading' // 显示loading信息的div
                    }
                }, function(newElems) {
                    //程序执行完的回调函数
                    var $newElems = $(newElems);
                    $container.masonry('appended', $newElems);
                    console.log(111);
                });

              });
            }
        });
});
var content;
function insertProduct(record){
	var productString = 
  '<a class="imgbox" href="'+record.children('URL').text()+'" target="_blank">'+
    '<img src="'+record.children('picture_url').text()+'" alt="">'+
    '<h2 class="productName">'+record.children('product_name').text()+'</h2>'+
    '<h3 class="price">'+record.children('price').text()+'</h3>'+
  '</a>';
	// '<a href="'+record.children('URL').text()+'" target="_blank">'+
 //      '<div class="game clearfix">'+
 //      '  <div class="game-logo">'+
 //      '    <img src="'+record.children('picture_url').text()+'"></div>'+
 //      '  <div class="game-info">'+
 //      '    <section>'+
 //      '      <p class="title">'+record.children('product_name').text()+'</p>'+
 //      '      <p class="des">'+record.children('brand').text()+'</p>'+
 //      '    </section>'+
 //      '    <div class="clearfix btn-content">'+
 //      '      <div class="btn-play">BUY</div>'+
 //      '    </div>'+
 //      '  </div>'+
 //      '</div>'+
 //    '</a>';
    var product = $(productString);
    content = content?content : $("#thumbs");
    content.append(product);
}