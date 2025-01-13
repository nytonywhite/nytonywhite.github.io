(function(){
	var currentScreenSize = Util.getScreenSize();

	var bodyHeight = currentScreenSize.height;
	var bodyWidth = currentScreenSize.width;
	var headerHeight = Math.floor(bodyHeight/10);
	var contentPadding = Math.floor(bodyHeight*24/595);
	var innerContentPadding = Math.floor(contentPadding*2/3);
	var leftWdith = Math.floor(bodyHeight*355/595);
	document.getElementById('contentContainer').style['display'] = 'block';
	document.getElementById('contentContainer').style['height'] = bodyHeight-headerHeight+'px';
	
	var topBlock = document.getElementById('topBlock');
	topBlock.style['display'] = 'inline-block';
	topBlock.style['padding'] = contentPadding+'px';
	topBlock.style['width'] = (leftWdith-contentPadding*2)+'px';
	topBlock.style['height'] = (bodyHeight-headerHeight-contentPadding*2)+'px';

	var secondSection = document.getElementById('secondSection');
	var secondSectionHeight = (bodyHeight-headerHeight-contentPadding*2);
	var secondSectionWidth = (bodyWidth-leftWdith-contentPadding);
	secondSection.style['display'] = 'inline-block';
	secondSection.style['position'] = 'absolute';
	secondSection.style['right'] = '0px';
	secondSection.style['top'] = '0px';
	secondSection.style['padding'] = contentPadding+'px';
	secondSection.style['paddingLeft'] = '0px';
	secondSection.style['width'] = secondSectionWidth+'px';
	secondSection.style['height'] = secondSectionHeight+'px';

	document.getElementById('sloganBr').style['display'] = 'none';
	document.getElementById('outerRound').style['display'] = 'none';
	document.getElementById('innerRound').style['display'] = 'none';
	document.getElementById('face').style['display'] = 'none';
	document.getElementById('clearBlock').style['display'] = 'none';
	document.getElementById('headBlock').style['height'] = headerHeight+'px';
	var slogan = document.getElementById('slogan');
	slogan.style['position'] = 'absolute';
	slogan.style['top'] = '0px';
	slogan.style['color'] = 'white';
	slogan.style['lineHeight'] = headerHeight+'px';
	slogan.style['fontSize'] = Math.floor(headerHeight/3)+'px';

	var titleSize = Math.floor(bodyHeight*23/595);
	var nameSize = Math.floor(titleSize*4/5);
	var middleNameSize = Math.floor(titleSize*3/5);
	var titleSizeMarginBottom = Math.floor(bodyHeight*16/595);
	var leftIconWidth = Math.floor((leftWdith-contentPadding*2)*206/332);
	var topInfoHeight = (bodyHeight-headerHeight-contentPadding*2-innerContentPadding-titleSizeMarginBottom-titleSize) 
						- leftIconWidth - innerContentPadding*2;
	var downloadHeight = nameSize*2;
	var downloadPadding = Math.floor(nameSize/2);
	var descHeight = topInfoHeight - nameSize*6-innerContentPadding; 
	var middleBlockHeight = Math.floor(bodyHeight*195/595);
	var middleContentHeight = middleBlockHeight - titleSize - titleSizeMarginBottom;
	var middleContentIconWidth = Math.floor(middleContentHeight*90/155);
	var middleContentWidth = secondSectionWidth - innerContentPadding*2;
	var minIconPadding = Math.floor(innerContentPadding*3);
	var adCount = Math.floor((middleContentWidth+minIconPadding)/(middleContentIconWidth+minIconPadding));
	var adContainer = document.getElementById('appsContainer');
	Util.insertApps(adCount,adContainer);

	var bottomBlockHeight = secondSectionHeight- middleBlockHeight - innerContentPadding;
	var adsenseWidth = Math.floor(bottomBlockHeight*336/280);
	var adsenseScale = adsenseWidth/336;

	var entryWidth = secondSectionWidth - adsenseWidth - innerContentPadding;
	var gameEntry = document.getElementById('gameEntry');
	gameEntry.children[0].setAttribute('cellspacing',Math.floor(innerContentPadding/3));

	var styleContainer = document.createElement('style');
	document.body.appendChild(styleContainer);
	var styleString = '';
	styleString += 	'#bottomBlock #gameEntry{'
						+'position:absolute;'
						+'left:0px;'
						+'top:0px;'
						+'height:'+bottomBlockHeight+'px;'
						+'width:'+entryWidth+'px;'
						+'border-radius:'+Math.floor(nameSize/2)+'px;'
					+'}'
					+'#adUnit{'
						+'-webkit-transform:scale('+adsenseScale+');'
						+'-moz-transform:scale('+adsenseScale+');'
						+'-ms-transform:scale('+adsenseScale+');'
						+'-o-transform:scale('+adsenseScale+');'
						+'transform:scale('+adsenseScale+');'
					+'}'
					+'#adsenseBlock{'
						+'position:absolute;'
						+'right:0px;'
						+'bottom:0px;'
						+'width:'+adsenseWidth+'px;'
						+'height:'+bottomBlockHeight+'px;'
					+'}'
					+'#bottomBlock{'
						+'position:relative;'
						+'margin-top:'+innerContentPadding+'px;'
						+'height:'+bottomBlockHeight+'px;'
					+'}'
					+'#middleBlock .content{'
						+'height:'+middleContentHeight+'px;'
						+'padding: 0px '+innerContentPadding*4+'px;'
						+'border-radius:'+Math.floor(nameSize/2)+'px;'
					+'}'
					+'#middleBlock .content .app{'
						+'overflow:hidden;'
						+'margin-top:'+innerContentPadding*1.5+'px;'
						+'width:'+middleContentIconWidth+'px;'
						+'border-radius:'+Math.floor(middleContentIconWidth/8)+'px;'

					+'}'
					+'#middleBlock .content .app .icon{'
						+'height:'+middleContentIconWidth+'px;'
						+'width:'+middleContentIconWidth+'px;'
						+'border-radius:'+Math.floor(middleContentIconWidth/8)+'px;'

					+'}'
					+'#middleBlock .content .name{'
						+'overflow:hidden;'
						+'margin-top:'+Math.floor(innerContentPadding/2)+'px;'
						+'font-size:'+middleNameSize+'px;'
						+'width:'+middleContentIconWidth+'px;'
						+'height:'+ middleNameSize*1.5+'px;'
						+'width:100%;'
					+'}'
					+'.adSection .title{'
						+'font-size:'+titleSize+'px;'
						+'height:'+titleSize+'px;'
						+'line-height:'+titleSize+'px;'
						+'margin-bottom:'+titleSizeMarginBottom+'px;'
					+'}'
					+'#topBlock .content{'
						+'border-radius:'+Math.floor(nameSize/2)+'px;'
						+'padding:'+innerContentPadding+'px;'
						+'width:'+(leftWdith-contentPadding*2-innerContentPadding*2)+'px;'
						+'height:'+(bodyHeight-headerHeight-contentPadding*2-innerContentPadding*2-titleSizeMarginBottom-titleSize)+'px;'
					+'}'
					+'#topBlock #contentWarp #leftIcon{'
						+'display:block;'
						+'margin-left: '+innerContentPadding+'px;'
						+'margin-bottom: '+innerContentPadding+'px;'
						+'width:'+leftIconWidth+'px;'
						+'height:'+leftIconWidth+'px;'
					+'}'
					+'#topBlock #contentWarp #topInfo{'
						+'display:block;'
						+'height:'+(topInfoHeight-innerContentPadding)+'px;'
						+'padding:'+innerContentPadding+'px;'
					+'}'
					+'#topBlock #contentWarp #topInfo .name{'
						+'font-size:'+nameSize+'px;'
						+'width:'+(leftWdith-contentPadding*2-innerContentPadding*2 - innerContentPadding*2)+'px;'
						+'height:'+nameSize+'px;'
						+'line-height:'+nameSize+'px;'
						+'text-align: left;'
						+'display:block;'
					+'}'
					+'#topBlock .content #star{'
						+'height:'+nameSize+'px;'
						+'margin-top:'+nameSize+'px;'
						+'display:block;'
					+'}'
					+'#topBlock .content #desc{'
						+'width:'+(leftWdith-contentPadding*2-innerContentPadding*2 - innerContentPadding*2)+'px;'
						+'height:'+(descHeight-5)+'px;'
						+'margin-top:'+nameSize+'px;'
						+'font-size:'+nameSize+'px;'
						+'display:block;'
					+'}'
					+'#topBlock #contentWarp{'
						+'display:block;'
						+'height:100%;'
						+'position:relative;'
					+'}'
					+'#topBlock .content #download{'
						+'display:block;'
						+'width:80%;'
						+'position:absolute;'
						+'font-size:'+nameSize+'px;'
						+'bottom:'+innerContentPadding+'px;'
						+'left:'+innerContentPadding+'px;'
						+'height:'+nameSize+'px;'
						+'line-height:'+nameSize+'px;'
						+'padding:'+downloadPadding+'px;'
						+'text-align:center;'
						+'border-radius:'+Math.floor(nameSize/2)+'px;'
					+'}'
					+'#middleBlock{'
						+'height:'+middleBlockHeight+'px;'
					+'}';
	styleContainer.innerHTML = styleString;

	var topBanner = document.getElementById('topBanner');
	var arrowWidth = Math.floor(topBanner.clientHeight/4);
	styleString+='#bottomBlock #gameEntry>table td.top{'
					+'font-size: '+arrowWidth+'px;'
					+'padding-top: '+Math.floor(arrowWidth*1)+'px;'
					+'line-height: '+arrowWidth+'px;'
					+'height: '+topBanner.clientHeight+'px;'
					+'border-top-left-radius:'+Math.floor(nameSize/2) +'px;'
					+'border-top-right-radius:'+Math.floor(nameSize/2) +'px;'
				+'}'
				+'#bottomBlock #gameEntry>table td#bottomBanner{'
					+'border-bottom-left-radius:'+Math.floor(nameSize/2) +'px;'
					+'border-bottom-right-radius:'+Math.floor(nameSize/2) +'px;'
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