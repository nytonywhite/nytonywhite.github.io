(function(){
	var currentScreenSize = Util.getScreenSize();

	var styleContainer = document.createElement('style');
	document.body.appendChild(styleContainer);
	var styleString = '';

	var bodyHeight = currentScreenSize.height;
	var headBlock = document.getElementById('headBlock');
	var headBlockWidth = currentScreenSize.width;
	var headBlockHeight = Math.floor(headBlockWidth*133/640);
	headBlock.style['height'] = headBlockHeight+'px';

	var outerRound = document.getElementById('outerRound');
	var outerRoundWidth = Math.floor(headBlockWidth*1199/640);
	var outerRoundHeight = Math.floor(headBlockWidth*999/640);
	outerRound.style['width'] = outerRoundWidth+'px';
	outerRound.style['height'] = outerRoundHeight+'px';
	outerRound.style['top'] = Math.floor(43*headBlockWidth/640)+'px';
	var halfOuterRoundWidth = Math.floor(outerRoundWidth/2);
	outerRound.style['marginLeft'] = -1*halfOuterRoundWidth+'px';
	// outerRound.style['borderRadius'] = halfOuterRoundWidth+'px';

	var innerRound = document.getElementById('innerRound');
	var innerRoundWidth = Math.floor(headBlockWidth*1175/640);
	var innerRoundHeight = Math.floor(headBlockWidth*978/640);
	innerRound.style['width'] = innerRoundWidth+'px';
	innerRound.style['height'] = innerRoundHeight+'px';
	var halfInnerRoundWidth = Math.ceil(innerRoundWidth/2);
	innerRound.style['top'] = Math.floor(43*headBlockWidth/640)+(halfOuterRoundWidth-halfInnerRoundWidth)+'px';
	innerRound.style['marginLeft'] = -1*halfInnerRoundWidth+'px';
	// innerRound.style['borderRadius'] = halfInnerRoundWidth+'px';

	var face = document.getElementById('face');
	var faceWidth = Math.floor(85*headBlockHeight/133);
	face.style['width'] = faceWidth+'px';
	face.style['height'] = faceWidth+'px';
	var halfFaceWidth = Math.floor(faceWidth/2);
	face.style['borderRadius'] = halfFaceWidth+'px';
	face.style['marginLeft'] = -1*halfFaceWidth+'px';
	face.style['marginTop'] = (-1*halfFaceWidth+4)+'px';

	var slogan = document.getElementById('slogan');

	slogan.style['fontSize'] = Math.floor(headBlockWidth*27/640)+'px';
	slogan.style['lineHeight'] = Math.floor(headBlockWidth*34/640)+'px';


	var mainContentHeight = bodyHeight - headBlockHeight - slogan.clientHeight;
	var borderPadding = Math.floor(20*headBlockWidth/640);
	var contentPadding = Math.floor(35*headBlockWidth/640);
	var iconPadding = Math.floor(38*headBlockWidth/640);
	var bottomBlock = document.getElementById('bottomBlock');
	bottomBlock.style['paddingLeft'] = borderPadding +'px';
	bottomBlock.style['paddingRight'] = borderPadding +'px';



	var middleSectionHeight = Math.floor(mainContentHeight*232/904);
	var adsenseOrginWidth = 336;
	var adsenseBlockWidth = Math.floor(adsenseOrginWidth*headBlockWidth/640); 
	var adsenseBlockHeight = Math.floor(adsenseBlockWidth*280/336);
	// while((mainContentHeight-adsenseBlockHeight-borderPadding*2)<(mainContentHeight*300/904)){
	// 	adsenseOrginWidth-=5;
	// 	adsenseBlockWidth = Math.floor(adsenseOrginWidth*headBlockWidth/640); 
	// 	adsenseBlockHeight = Math.floor(adsenseBlockWidth*280/336);
	// 	console.log(adsenseOrginWidth)
	// }

// alert(mainContentHeight)


	var middleBlock = document.getElementById('middleBlock');
	var middleBlockHeight = (middleSectionHeight-borderPadding);
	// middleBlock.style['height'] =  middleBlockHeight+'px';
	middleBlock.style['paddingBottom'] =  borderPadding+'px';

	var iconContainerWidth = headBlockWidth - (contentPadding+borderPadding)*2;
	var middleIconWidth = Math.floor(middleBlockHeight*104/232);
	var minIconPadding = Math.floor(headBlockWidth*15/640);
	var adCount = Math.floor((iconContainerWidth+minIconPadding)/(middleIconWidth+minIconPadding));
	var adContainer = document.getElementById('appsContainer');
	Util.insertApps(adCount,adContainer);

	styleString+='#middleBlock .icon{width:'+middleIconWidth+'px;display:block;} '
			+'.adSection .content{'
				+'padding-left:'+contentPadding+'px;'
				+'padding-right:'+contentPadding+'px;'
				+'padding-top:'+borderPadding+'px;'
				+'padding-bottom:'+borderPadding+'px;'
				+'margin-left:'+borderPadding+'px;'
				+'border-radius:'+Math.floor(headBlockWidth*20/640)+'px;'
				+'margin:'+borderPadding+'px;}'
			+'.adSection .title{margin-left:'+borderPadding+'px;font-size:'+Math.floor(headBlockWidth*27/640)+'px;line-height:'+Math.floor(headBlockWidth*34/640)+'px;}'
			+'.adSection .btn{margin-right:'+borderPadding+'px;padding:'+Math.floor(borderPadding/2)+'px '+borderPadding+'px;font-size:'+Math.floor(headBlockWidth*18/640)+'px;border-radius:'+Math.floor(headBlockWidth*10/640)+'px;}'
			+'.adSection .content .icon{border-radius:'+Math.floor(headBlockWidth*15/640)+'px;}'
			+'.adSection .content .name{margin-top:'+Math.floor(borderPadding*0.6)+'px;font-size:'+Math.floor(headBlockWidth*18/640)+'px;width:'+middleIconWidth+'px;height:'+Math.floor(headBlockWidth*24/640)+'px;}';

	var star = document.getElementById('star');
	var starWdith = star.clientWidth-middleIconWidth;
	styleString+='#topInfo #star{'
					+'height:'+ Math.floor(headBlockWidth*20/640)+'px;'
					+'margin-top:'+ Math.floor(headBlockWidth*10/640)+'px;'
				+'} ';
	styleContainer.innerHTML = styleString;
	
	styleString+='#topBlock .content .name{'
					+'width:'+(starWdith-contentPadding)+'px;'
					+'height:'+ Math.floor(headBlockWidth*24/640)+'px;'
				+'} '
	styleContainer.innerHTML = styleString;

	var gameEntry = document.getElementById('gameEntry');
	var gameEntryWidth = Math.floor(250*headBlockWidth/640);
	var gameEntryHeight = Math.floor(gameEntryWidth*280/250);
	gameEntry.style['width'] = gameEntryWidth+'px';
	gameEntry.style['height'] = gameEntryHeight +'px';
	gameEntry.style['borderRadius'] = Math.floor(20*headBlockWidth/640) +'px';
	gameEntry.children[0].setAttribute('cellspacing',Math.floor(contentPadding/3));


	var adsenseBlock = document.getElementById('adsenseBlock');
	adsenseBlock.style['width'] = adsenseBlockWidth+'px';
	adsenseBlock.style['height'] = adsenseBlockHeight +'px';
	adsenseBlock.style['position'] = 'absolute';
	adsenseBlock.style['bottom'] = '0px';
	adsenseBlock.style['right'] = borderPadding +'px';

	var adUnit = document.getElementById('adUnit');
	var adUnitWidthScale = adsenseBlockWidth/336;
	var adUnitHeightScale = adsenseBlockHeight/280;
	var adUnitScale = adUnitWidthScale>adUnitHeightScale? adUnitWidthScale:adUnitHeightScale;
	adUnit.style['-webkit-transform'] = 'scale('+adUnitScale+')';
	adUnit.style['-moz-transform'] = 'scale('+adUnitScale+')';
	adUnit.style['-ms-transform'] = 'scale('+adUnitScale+')';
	adUnit.style['-o-transform'] = 'scale('+adUnitScale+')';
	adUnit.style['transform'] = 'scale('+adUnitScale+')';


	styleContainer.innerHTML = styleString;

	
	var topBlock = document.getElementById('topBlock');
	var topBlockHeight = bodyHeight - headBlockHeight 
		- slogan.clientHeight - middleBlock.clientHeight 
		- bottomBlock.clientHeight - borderPadding*2;
		console.log(bodyHeight+'--'+headBlockHeight+'--'+slogan.clientHeight+'--'+middleBlock.clientHeight+'--'+bottomBlock.clientHeight+'--'+borderPadding*2)
	var topIconHeight = 0||topBlockHeight - contentPadding*4;
	// topBlock.style['height'] = topBlockHeight;
	
	styleString+='#topBlock .icon{width:'+topIconHeight+'px;display:inline-block;border-radius:'+Math.floor(topIconHeight/middleIconWidth*headBlockWidth*15/640)+'px;} '
				+'#topBlock{margin-top:'+borderPadding+'px;} '
				+'#topBlock .name{display:inline-block;} ';
	var contentWarp = document.getElementById('contentWarp');
	var contentWarpWidth = contentWarp.parentNode.clientWidth - contentPadding*2;
	contentWarp.style['top'] = borderPadding+'px';
	contentWarp.style['width'] = contentWarpWidth+'px';
	contentWarp.style['bottom'] = borderPadding+'px';
	styleContainer.innerHTML = styleString;


	var descHeight = topInfo.clientHeight-(Math.floor(borderPadding*0.6)+Math.floor(headBlockWidth*18/640)+Math.floor(headBlockWidth*20/640)+Math.floor(headBlockWidth*10/640)+Math.floor(headBlockWidth*35/640)+Math.floor(headBlockWidth*18/640));
	styleString+='#topBlock .content #desc{margin-top:'+Math.floor(headBlockWidth*20/640)+'px;'
				+'font-size:'+Math.floor(headBlockWidth*15/640)+'px;'
				+'height:'+(descHeight-5)+'px} ';

	var downloadPaddingTop = Math.floor(headBlockWidth*10/640);
	var downloadPaddingLeft = Math.floor(headBlockWidth*34/640);
	var downloadFontSize = Math.floor(headBlockWidth*15/640);
	var download = document.getElementById('download');
	// download.style['padding'] = downloadPaddingTop+'px '+downloadPaddingLeft+'px';
	// download.style['fontSize'] =  downloadFontSize+'px';
	// download.style['borderRadius'] =  Math.floor(headBlockWidth*10/640)+'px';
	styleString+='#topInfo #download{'
					+'padding:'+ downloadPaddingTop+'px '+downloadPaddingLeft+'px;'
					+'font-size:'+ downloadFontSize+'px;'
					+'border-radius:'+ Math.floor(headBlockWidth*10/640)+'px;'
				+'} ';



	styleContainer.innerHTML = styleString;

	var topBanner = document.getElementById('topBanner');
	var arrowWidth = Math.floor(topBanner.clientHeight/4);
	styleString+='#bottomBlock #gameEntry>table td.top{'
					+'font-size: '+arrowWidth+'px;'
					+'line-height: '+arrowWidth*3+'px;'
					+'height: '+topBanner.clientHeight+'px;'
					+'border-top-left-radius:'+Math.floor(15*headBlockWidth/640) +'px;'
					+'border-top-right-radius:'+Math.floor(15*headBlockWidth/640) +'px;'
				+'}'
				+'#bottomBlock #gameEntry>table td#bottomBanner{'
					+'border-bottom-left-radius:'+Math.floor(15*headBlockWidth/640) +'px;'
					+'border-bottom-right-radius:'+Math.floor(15*headBlockWidth/640) +'px;'
				+'}'
				+'#bottomBlock #gameEntry>table td.top:after{'
					+'content: " ";'
					+'display: block;'
					+'position: absolute;'
					+'width:0px;'
					+'height: 0px;'
					+'border: '+arrowWidth+'px solid transparent;'
					+'border-top: '+arrowWidth+'px solid white;'
					+'left: 50%;'
					+'margin-left: -'+arrowWidth+'px;'
					+'bottom:-'+Math.ceil(arrowWidth/2)+'px;'
				+'} '
	styleContainer.innerHTML = styleString;
})();