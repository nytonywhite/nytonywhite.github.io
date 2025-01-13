var page = 1;
var pagesize = 10;
// var data_url = 'http://52.74.240.202/ecwall/get';// old host
// var data_url = 'http://52.76.122.249/ecwall/advertisement/get';// old host
var data_url = 'http://52.76.156.3/ecwall/advertisement/get';// new host
var uuid = '10001';
var sign = '668d571bff3dc16a26ad81642c64504d';
var appid = 'mobvistatest-23';
var countrySet = {
    'ALL':'',
    'VN':'VN',
    'SG':'SG',
    'TH':'TH',
    'ID':'ID',
    'PH':'PH',
    'MY':'MY',
    'BR':'BR',
    'CA':'CA',
    'CN':'CN',
    'DE':'DE',
    'ES':'ES',
    'FR':'FR',
    'IN':'IN',
    'IT':'IT',
    'JP':'JP',
    'MX':'MX',
    'UK':'UK',
    'US':'US'
};
var country = '';
var platformSet = {
    'all':'',
    'amazon':'amazon',
    'lazada':'lazada'
};
var platform = '';
var currencySet = {
    'USD':'$',
    'YAN':'¥',
    'VND':'₫'
};

function getDataUrl(pageindex){
    // var data_url = "data/advertisement_";
    // return data_url+pageindex+'.json?'+
    //     'pagesize='+pagesize+
    //     '&uuid='+uuid+
    //     '&sign='+sign+
    //     '&appid='+appid+
    //     '&country='+country;
    return data_url+
        '?pagesize='+pagesize+
        '&page='+pageindex+
        '&uuid='+uuid+
        '&sign='+sign+
        '&appid='+appid+
        '&country='+country+
        '&fr='+platform;
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
$(document).ready(function() {
    window.appid = getQueryString('appid')||window.appid;
    window.country = window.countrySet[(getQueryString('country')||'').toUpperCase()] || window.country;
    window.platform = window.platformSet[(getQueryString('platform')||'').toLowerCase()]||window.platform;
	$.ajax({
			url:getDataUrl(page),
            type:"GET",
            dataType:"json",
            timeout: 100000,
            error: function(result){
                // alert('Error loading XML document'+xml);
            },
            success: function(result){
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

                $('.imgloading').removeClass('imgloading');

                // return;

                $container.infinitescroll({
                    navSelector: "#navigation", //导航的选择器，会被隐藏
                    nextSelector: "#navigation a", //包含下一页链接的选择器
                    itemSelector: ".imgbox", //你将要取回的选项(内容块)
                    path:function(){
                        $('.loadingwarp').addClass('show');
                        return getDataUrl(++page);
                    },
                    debug: false, //启用调试信息
                    animate: true, //当有新数据加载进来的时候，页面是否有动画效果，默认没有
                    extraScrollPx: 150, //滚动条距离底部多少像素的时候开始加载，默认150
                    bufferPx: 40, //载入信息的显示时间，时间越大，载入信息显示时间越短
                    errorCallback: function() {
                        console.log('error');
                        $('.loading img').remove();
                        $('#loadingText').html('NO MORE GOODS');
                    }, //当出错的时候，比如404页面的时候执行的函数
                    localMode: true, //是否允许载入具有相同函数的页面，默认为false
                    dataType: 'json',//可以是json
                    template: function(result) {
                        $('.loadingwarp').removeClass('show');
                           //data表示服务端返回的json格式数据，这里需要把data转换成瀑布流块的html格式，然后返回给回到函数
                        var productString ='';
                        if(!result.advertisement) return 'aaa';
                        for(var i=0;i<result.advertisement.length;i++){
                            var record = result.advertisement[i];
                            productString += insertProduct(record,isReturnString=true);
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
                        $newElems.removeClass('imgloading');
                    });
                    
                });

              });
            }
        });
    $(document).bind('scroll',function(e){
        if(document.body.scrollTop==0){
            $('header').removeClass('small');
        }else if(document.body.scrollTop>80){
            $('header').addClass('small');
        }
    });

});
var content;
function insertProduct(record,isReturnString){
    var orgPrice = parseFloat(record['price']);
    var disPrice = parseFloat(record['discount']);
    var dissOff = Math.floor(100*(orgPrice - disPrice)/orgPrice);
	var productString = 
      '<a class="imgbox imgloading" href="'+record['url']+'" target="_blank">'+
        '<img src="'+record['picture_url']+'" alt=""><span class="sponser '+record['fr']+'">'+record['fr']+'</span>'+
        '<div class="warp">'+
            '<h2 class="productName">'+record['product_name']+'</h2>'+
            '<div class="priceWarp">'+
                '<h3 class="price">'+(currencySet[record['currency']]||'$')+' '+record['discount']+'</h3>'+
                (dissOff>0 ? ('<h3 class="strike">'+(currencySet[record['currency']]||'$')+' '+record['price']+'</h3>'): '') +
            '</div>'+    
            '<button class="shop">SHOP NOW</button>'+
        '</div>'+
        (dissOff>20? '<div class="discountFlat">'+dissOff+'%<br/>OFF</div>':'')+
      '</a>';
    if(isReturnString==true) return productString;
    var product = $(productString);
    content = content?content : $("#thumbs");
    content.append(product);
    return product;
}