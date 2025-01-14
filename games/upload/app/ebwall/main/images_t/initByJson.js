var page = 1;
var pagesize = 10;
var data_url = 'http://api.mobvista.com/ecwall/advertisement/get';
var uuid = '10001';
var sign = '668d571bff3dc16a26ad81642c64504d';
var appid = '17019';
var country = 'VN';
// var data_url = "data/advertisement.json";
// var data_url = "data/page_1.json";

function getDataUrl(pageindex){
    return data_url+
        '?pagesize='+pagesize+
        '&page='+pageindex+
        '&uuid='+uuid+
        '&sign='+sign+
        '&appid='+appid+
        '&country='+country;
}
$(document).ready(function() {
	$.ajax({
			url:getDataUrl(page),
            type:"GET",
            dataType:"json",
            timeout: 100000,
            error: function(result){
                // alert('Error loading XML document'+xml);
            },
            success: function(result){
                console.log(result)
            	content = $("#thumbs");
            	content.html('');
                var records = result.advertisement;
                for(var i=0;i<records.length;i++){
                	var record = records[i];
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
                    path:function(){
                        return getDataUrl(++page);
                    },
                    debug: true, //启用调试信息
                    animate: true, //当有新数据加载进来的时候，页面是否有动画效果，默认没有
                    extraScrollPx: 150, //滚动条距离底部多少像素的时候开始加载，默认150
                    bufferPx: 40, //载入信息的显示时间，时间越大，载入信息显示时间越短
                    errorCallback: function() {
                        console.log('error');
                        $('#loadingText').html(' ')
                    }, //当出错的时候，比如404页面的时候执行的函数
                    localMode: true, //是否允许载入具有相同函数的页面，默认为false
                    dataType: 'json',//可以是json
                    template: function(result) {
                           //data表示服务端返回的json格式数据，这里需要把data转换成瀑布流块的html格式，然后返回给回到函数
                        console.log(record);
                        var productString ='';
                        for(var i=0;i<result.advertisement.length;i++){
                            var record = result.advertisement[i];
                            productString+=
                            '<a class="imgbox" href="'+record['URL']+'" target="_blank">'+
                            '<img src="'+record['picture_url']+'" alt="">'+
                            '<h2 class="productName">'+record['product_name']+'</h2>'+
                            '<h3 class="price">'+record['price']+'</h3>'+
                            '</a>';
                        }
                           
                           return productString;
                    },
                    loading: {
                        msgText: "loading...",
                        finishedMsg: 'no data...',
                        selector: '.loading' // 显示loading信息的div
                    }
                }, function(newElems) {
                    //程序执行完的回调函数
                    var $newElems = $(newElems);
                    $container.imagesLoaded(function(){
                        $container.masonry('appended', $newElems);
                    });
                    console.log(111);
                    
                });

              });
            }
        });
});
var content;
function insertProduct(record){
	var productString = 
  '<a class="imgbox" href="'+record['URL']+'" target="_blank">'+
    '<img src="'+record['picture_url']+'" alt="">'+
    '<h2 class="productName">'+record['product_name']+'</h2>'+
    '<h3 class="price">'+record['price']+'</h3>'+
  '</a>';
    var product = $(productString);
    content = content?content : $("#thumbs");
    content.append(product);
}