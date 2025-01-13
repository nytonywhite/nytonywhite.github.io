var page = 1;
var pagesize = 10;
// var data_url = 'http://52.74.240.202/ecwall/get';// old host
// var data_url = 'http://52.76.122.249/ecwall/advertisement/get';// old host
var data_url = 'http://ecwall-api.rayjump.com/ecwall/advertisement/get'; // new host
var uuid = '10001';
var sign = '668d571bff3dc16a26ad81642c64504d';
var appid = 'mobvistatest-23';
var countrySet = {
    'ALL': '',
    'VN': 'VN',
    'SG': 'SG',
    'TH': 'TH',
    'ID': 'ID',
    'PH': 'PH',
    'MY': 'MY',
    'BR': 'BR',
    'CA': 'CA',
    'CN': 'CN',
    'DE': 'DE',
    'ES': 'ES',
    'FR': 'FR',
    'IN': 'IN',
    'IT': 'IT',
    'JP': 'JP',
    'MX': 'MX',
    'UK': 'UK',
    'US': 'US'
};
var country = '';
var platformSet = {
    'all': '',
    'amazon': 'amazon',
    'lazada': 'lazada'
};
var platform = '';
var currencySet = {
    'USD': '$',
    'YAN': '¥',
    'VND': '₫'
};

function getDataUrl(pageindex) {
    // var data_url = "data/advertisement_";
    // return data_url+pageindex+'.json?'+
    //     'pagesize='+pagesize+
    //     '&uuid='+uuid+
    //     '&sign='+sign+
    //     '&appid='+appid+
    //     '&country='+country;
    return data_url +
        '?pagesize=' + pagesize +
        '&page=' + pageindex +
        '&uuid=' + uuid +
        '&sign=' + sign +
        '&appid=' + appid +
        '&country=' + country +
        '&fr=' + platform;
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
$(document).ready(function() {
    window.appid = getQueryString('appid') || window.appid;
    window.country = window.countrySet[(getQueryString('country') || '').toUpperCase()] || window.country;
    window.platform = window.platformSet[(getQueryString('platform') || '').toLowerCase()] || window.platform;
    $.ajax({
        url: getDataUrl(page),
        type: "GET",
        dataType: "json",
        timeout: 100000,
        error: function(result) {
            // alert('Error loading XML document'+xml);
        },
        success: function(result) {
            content = $("#thumbs");
            content.html('');
            var records = result.advertisement;

            initImagesByList(records,3,function(){

                var $container = $('#thumbs');
                $container.infinitescroll({
                    navSelector: "#navigation", //导航的选择器，会被隐藏
                    nextSelector: "#navigation a", //包含下一页链接的选择器
                    itemSelector: ".imgbox", //你将要取回的选项(内容块)
                    path: function() {
                        toggleInfinitescroll(false);//停止无限滚动
                        $('.loadingwarp').addClass('show');
                        return getDataUrl(++page);
                    },
                    debug: false, //启用调试信息
                    animate: true, //当有新数据加载进来的时候，页面是否有动画效果，默认没有
                    extraScrollPx: 250, //滚动条距离底部多少像素的时候开始加载，默认150
                    bufferPx: 40, //载入信息的显示时间，时间越大，载入信息显示时间越短
                    errorCallback: function() {
                        console.log('error');
                        $('.loading img').remove();
                        $('#loadingText').html('NO MORE GOODS');
                    }, //当出错的时候，比如404页面的时候执行的函数
                    localMode: true, //是否允许载入具有相同函数的页面，默认为false
                    dataType: 'json', //可以是json
                    template: function(result) {
                        $('.loadingwarp').removeClass('show');
                        //data表示服务端返回的json格式数据，这里需要把data转换成瀑布流块的html格式，然后返回给回到函数
                        var productString = '';
                        if (!result.advertisement) return 'aaa';
                        for (var i = 0; i < result.advertisement.length; i++) {
                            var record = result.advertisement[i];
                            productString += insertProduct(record, isReturnString = true);
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
                    initImagesByEl(newElems,3,function(){
                        toggleInfinitescroll(true);//重启无限滚动
                    });

                });
            });

        }
    });
    $(document).bind('scroll', function(e) {
        if (document.body.scrollTop == 0) {
            $('header').removeClass('small');
            $('#goTop').hide(300);
        } else if (document.body.scrollTop > 80) {
            $('header').addClass('small');
        }

        if(document.body.scrollTop > screen.height*1.5){
            $('#goTop').show(300);
        }
    });
    $('#goTop').bind('click',function(){
        $(document.body).animate({scrollTop: '0px'}, 800);
    });

    $('footer nav').bind('click',function(e){
        var el = e.target;
        var fr = $(el).attr('platform')||window.platform;
        var paramString = 'appid='+window.appid+'&country='+window.country+'&platform='+fr;
        // window.location.href = 
        var paramIndex = location.href.indexOf('?');
        if(paramIndex>0){
            window.location.href = location.href.substr(0,paramIndex)+'?'+paramString;
        }else{
            window.location.href = window.location.href+'?'+paramString;
        }

    });
});

var infiniteTriggerTimer = null;
function toggleInfinitescroll(toggle){
    // return;
    if(toggle==true){
        $container.infinitescroll('resume');
    }else{
        $container.infinitescroll('pause');
        //防止锁死
        if(infiniteTriggerTimer) clearTimeout(infiniteTriggerTimer);
        infiniteTriggerTimer = setTimeout(function(){
            $container.infinitescroll('resume');
        },10000);
    }
}


var content;
var $container;
function initImagesByEl(elList,imageCount,callback){
    var recordEls = [];
    for (var i = 0,iMax=elList.length; i<iMax&&i<imageCount; i++) {
        recordEls.push(elList.shift(0,1));
    }
    var newImgEls = $(recordEls);
    var newImgs = newImgEls.find('img');
    newImgs.each(function(index){
        var imgEl = $(newImgs[index]);
        var src = imgEl.attr('pre_src');
        imgEl.attr('src',src);
    });

    $container.imagesLoaded(function(){
        $container.masonry('appended', newImgEls);
        newImgEls.removeClass('imgloading');
        newImgs.each(function(index){
            var imgEl = $(newImgs[index]);
            var zoom_url = imgEl.attr('zoom_url');
            var sponser = imgEl.attr('sponser');
            if(zoom_url&&zoom_url!='null'&&zoom_url.length>0&&sponser=='amazon') imgEl.attr('src',zoom_url);
        });

        if(elList.length==0){
            if(callback) callback();
        }else{
            initImagesByEl(elList,imageCount,callback); 
        }
    });

    
}
function initImagesByList(imageList,imageCount,callback){
    for (var i = 0,iMax=imageList.length; i<iMax&&i<imageCount; i++) {
        var record = imageList.shift(0,1);
        insertProduct(record,isReturnString = false);
    }

    var hasLoad = $container? true:false;
    $container = $container? $container:$('#thumbs');
    var loadingImg = $('.imgloading');
    loadingImg.imagesLoaded(function() {
        if(hasLoad){
            $container.masonry('appended',loadingImg);
        }else{
            $container.masonry({
                itemSelector: '.imgbox'
            });
        }

        var newImgs = $('.imgloading img');
        newImgs.each(function(index){
            var imgEl = $(newImgs[index]);
            var zoom_url = imgEl.attr('zoom_url');
            var sponser = imgEl.attr('sponser');
            if(zoom_url&&zoom_url!='null'&&zoom_url.length>0&&sponser=='amazon') imgEl.attr('src',zoom_url);
        });

        $('.imgloading').removeClass('imgloading');
        if(imageList.length==0){
            if(callback) callback();
        }else{
            initImagesByList(imageList,imageCount,callback);   
        }

    });
}

function insertProduct(record, isReturnString) {
    var orgPrice = parseFloat(record['price']);
    var disPrice = parseFloat(record['discount']);
    var dissOff = Math.floor(100 * (orgPrice - disPrice) / orgPrice);
    var imgSrcString = !isReturnString? 'src':'pre_src';
    var productString =
        '<a class="imgbox imgloading" href="' + record['url'] + '" target="_blank">' +
        '<img '+imgSrcString+'="' + record['picture_url'] + '" zoom_url="'+record['zoom_picture_url']+'" sponser="'+record['fr']+'" alt=""><span class="sponser ' + record['fr'] + '">' + record['fr'] + '</span>' +
        '<div class="warp">' +
        '<h2 class="productName">' + record['product_name'] + '</h2>' +
        '<div class="priceWarp">' +
        '<h3 class="price">' + (currencySet[record['currency']] || '$') + ' ' + record['discount'] + '</h3>' +
        (dissOff > 0 ? ('<h3 class="strike">' + (currencySet[record['currency']] || '$') + ' ' + record['price'] + '</h3>') : '') +
        '</div>' +
        '<button class="shop">SHOP NOW</button>' +
        '</div>' +
        (dissOff > 20 ? '<div class="discountFlat">' + dissOff + '%<br/>OFF</div>' : '') +
        '</a>';
    if (isReturnString == true) return productString;
    var product = $(productString);
    content = content ? content : $("#thumbs");
    content.append(product);
    return product;
}