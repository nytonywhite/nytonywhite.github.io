var dice = Math.random();
var ts = Math.floor(new Date().getTime()/60000);
var targetPath = 'http://www.rayjump.com/template/tp4sdk/banner/page_b_01.html?v='+ts;
if(dice>=0&&dice<0.5){
	targetPath = 'http://www.rayjump.com/template/tp4sdk/banner/page_b_01.html?v='+ts;
}else{
	targetPath = 'http://www.rayjump.com/template/tp4sdk/banner/page_b_02.html?v='+ts;
}

var bannerFrame = document.getElementById('bannerFrame');
if(bannerFrame) bannerFrame.src = targetPath;