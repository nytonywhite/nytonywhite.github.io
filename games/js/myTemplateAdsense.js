(function(){
	var insArray = document.getElementsByTagName('ins');
	for(var i=0;i<insArray.length;i++){
		var insObj = insArray[i];
		var data = {
			'id':insObj.id,
			'clientid':insObj.getAttribute('data-ad-client'),
			'slotid':insObj.getAttribute('data-ad-slot'),
			'width':insObj.style.width,
			'height':insObj.style.height
		};
		var dataString = JSON.stringify(data);
		var dataUrlString = '../../../template/tp4sdk/block/page.html?data='+escape(encodeURIComponent(dataString));
		var frame = document.createElement('iframe');
		frame.id = data.id;
		frame.style.width = insObj.style.width;
		frame.style.height = insObj.style.height;
		frame.style.padding = 0;
		frame.src = dataUrlString;


		var warp = document.createElement('div');
		warp.setAttribute('style',insObj.getAttribute('style'));
		warp.style.overflow = 'hidden';
		warp.className = 'insobj';
		warp.appendChild(frame);
		insObj.parentNode.replaceChild(warp,insObj);




	}

})();