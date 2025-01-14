document.addEventListener('DOMContentLoaded', function(){
	eventInit();
}, false)

var campaignMap = {}
function eventInit(){
	//alert("初始化");
	console.log("初始化")

	utils.hybirdEvent({
		sClass: 'RewardJs',
		hybirdFn: 'getEndScreenInfo',
		params: {
			pageNo: 1,
			exclude_ids: []
		},
		succ: function (res) {
			//alert("初始化成功");
			if (res.campaignList && res.campaignList.length)
			{
				if (location.protocol === 'https:') {
					util.http2https(res);
				}
				var campaign = res.campaignList[0];
				campaignMap[campaign['id']] = campaign;
				document.body.setAttribute('campaignId', campaign.id)
			} else {
				// me.noData()
			}
		},
		err: function (err) {
			// me.noData()
		}
	})

	// document.addEventListener('webviewshow', function () {
		// console.log("30秒后关闭按钮出现")
	setTimeout(function () {
		toggleCloseBtn()
	}, 3000)
	// }, false)
}

function install()
{
	console.log("安装软件")
	var campaignId = document.body.getAttribute('campaignId')
	utils.hybirdEvent({
		sClass: 'RewardJs',
		hybirdFn: 'install',
		params: campaignMap[campaignId], // offerId
		succ: function (res) {
			console.log(res)

		},
		err: function () {
			// util.tips('Sorry, network error...');
		}
	})
}
	
function toggleCloseBtn()
{
	console.log("出现关闭按钮")
	utils.hybirdEvent({
		sClass: 'RewardJs',
		hybirdFn: 'toggleCloseBtn',
		params: {
			"state": 1 // 出现
		},
		succ: function (res) {

		},
		err: function () {
			// util.tips('Sorry, network error...');
		}
	})	
}
