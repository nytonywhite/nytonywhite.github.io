# Mobvista 离线API
##1 Home


Version 2.0

概述

本文将介绍Mobvista离线API(以下简称API),开发者可以通过调用离线API获得用于显示的广告。API是基于HTTP协议,使用GET / POST方法获取响应内容。

**注意：**调用我们的API之前,您必须先注册成为开发者,添加一个用于广告显示的应用程序或Wap网站。令牌参数(apikey和appid)在所有请求中用到,请保管好您的apikey和appid。

基本原理：

* 请求：App从客户端或者服务器发送请求到API。
* 比较：API实时地比较不同广告来源的广告。
* 分析：API通过机器学习的方法分析用户的行为，请求的流量越大，则分析的精度越高。
* 展示：API选择预估变现效果最好的广告展示在用户的移动设备上。
一般来说，请求API，首先要注册成为Mobvista的开发者，并添加App/移动网站。注意：apikey和appid是请求广告的时候必带的参数，请保证这两个参数的值只有您自己知道。

如有任何问题，请联系我们的客服邮箱：publisher@mobvista.com .


####怎样获取APIKEY和APPID？
1. 登陆dashboard, 在DASHBOARD首页的正中间可以找到APIKEY的值。
2. 添加了App/移动网站之后，可以看到APPID。

##2 请求URL
请求API的地址 :  http://agentapi.rayjump.com/agentapi/ad

基于 : HTTP 协议

方式	:	GET

**注意:** API会有IP访问限制,需要我们将请求的IP加入Mobvista IP白名单后方可使用。

##3 基本参数

参数 | 类型 | 必传 | 描述
---|---|---|---
apikey | string | Yes | 这是开发者的唯一地标识,是一个32位加密字符串。apikey需要在我们审批通过后才可用于请求接口。例如:apikey=8b74bgdf992e13e1ef0f70d72a35c6d2
appid | int | No | 应用程序或网站整合后的唯一标识。ID会在开发者添加一个应用程序或wapsite后生成。例如:appid=123
restype | string | No | 返回的文本格式,它仅限于以下值,<br/> json:json文本格式<br/> xml:xml文本格式 <br/>默认格式：json<br/>Example:restype=json


***注意***: <br/>
API的参数是大小写敏感的,而且是小写的。使用大写字符在任何的参数名称将导致我们广告服务器完全忽略这个参数。

###URL 实例: 
```
http://agentapi.rayjump.com/agentapi/ad?appid=1&apikey=8a44b3df992e13e1ef0f70d72a35c6d2&restype=json

```

##4 返回
返回有两种文本格式：json和xml，开发者根据自己的程序获取合适的文本格式，这里需要传参数的restype，默认返回json格式。

**注意:**
返回的广告数可能会改变，因为可能会有一些广告可能会被人为停止。

返回的内容包括以下参数：

字段 | 说明 | 例子
---|---|---
status | 状态码 | 1
msg | 状态的说明 | success
data | 广告数据，这里是个数组 | &nbsp;

###4.1 状态码
状态码是用来区分服务器的返回，API的状态码如下：

状态码 | 说明 | 详情
---|---|---
1000 | 成功 | 请求正常，成功返回广告数据
1001 | appid错误 | appid参数是不正确的,必须是整数
1002 | 签名错误 | apikey参数验证没有通过,它必须app的信息对应
1003 | apikey错误 | 在得到我们的批准后，apikey才可用于请求这个接口。
1004 | 成功 | IP 不被允许
1005 | 成功 | App或移动网站的状态不正常，只有激活的APP/移动网站才能得到广告。
1100 | 成功 | 该地区没有广告填充



###4.2 数据返回：
字段 | 说明 
---|---
status | 状态码 
describe | 状态描述 
impression_url | 广告被展示时请求这个URL 
trackurl | 广告点击链接 
campaign_id | offer唯一ID 
trace\_app\_id | 渠道ID 
preview_url | 预览链接（不能用于广告跳转）
payout | offer的价格 
begintime | 广告有效期的开始时间戳 
endtime | 广告有效期的结束时间戳 
icon_url | 广告图标的URL 
allow_country	 | 广告允许投放的国家 
allow_device | 广告允许投放的设备 
cap | 广告的总cap 
video_urls | 视频素材的URL 
ads_details | 广告的图片(URL)或文字素材 
title | App 名称 
appdesc | App 描述 
appsize | App 大小 
startrate | App 评分 
category | App 类别	
appinstall | 在google play或app store的安装量 
link_type | app的链接类型 


重要提示: 当用户点击时，你需要在trackUrl上追加设备参数（gaid或idfa）然后跳转到对应的url:<br/>

**举例**: <br/>
**如果用户的操作系统是安卓**:<br/>
```
http://agentapi.rayjump.com/agentapi/click?cid=112&aid=33921&did=24c939215bb67c43&gaid=38400000-8cf0-11bd-b23e-10b96e40000d&sub_id=1057
```
<br/>**如果用户的操作系统时IOS**:<br/>
```
http://agentapi.rayjump.com/agentapi/click?cid=112&aid=33921&sub_id=1057&idfa=77B8659E-BF7C-44DC-9559-D425AAD23391
```

**注意:**
如果androidId、gaid或idfa是错误的，安装时没有办法匹配的。

###4.3 JSON格式举例：
```
{
	"status": 1000,
	"describe": "success",
	"campaigns": {
		"campaign_133": {
			"campaign_id": "133",
			"trace_app_id": "com.tap4fun.spartanwar",
			"preview_url": "https://play.google.com/store/apps/details?id=com.tap4fun.spartanwar",
			"trackurl": "http://net.mobvista.com/click?p=eyJja......lmIn0%3D",
			"payout": ".6",
			"begintime": "1396022400",
			"endtime": "1427644799",
			"icon_url": "http://d11kdtiohse1a9.cloudfront.net/common/201403/201403291044087458_128X128.png",
			"title": "FarmVille-US",
			"appdesc": "More addictive than Clash of Clans, Join now!",
			"appsize": "48",
			"startrate": "4.3",
			"category": "Game",
			"appinstall": "1000-2000",
			"allow_country": "GB",
			"allow_device": "android",
			"cap": "1000000",
			"video_urls": {
				"video_2004": "http://cdn-adn.rayjump.com/cdn-adn/16/08/31/18/42/57c6b49fed962.mp4",
				"video_2007": "http://cdn-adn.rayjump.com/cdn-adn/16/08/31/57c6a41b4921d.mp4"
			},
			"ads_details": {
				"image_0": "http://d11kdtiohse1a9.cloudfront.net/common/201403/201403291044459009_320X50.jpg"
			}
		}
	}
}
```
###4.4 XML格式举例：
```
<response>    
<status>1000</status>    
<describe>success</describe>    
<campaigns>    
<campaign_150>    
<campaign_id>150</campaign_id>   
<trace_app_id>com.boyaa.androidmarkettaiyu</trace_app_id>    
<preview_url>    
https://play.google.com/store/apps/details?id=com.boyaa.androidmarkettaiyu    
</preview_url>    
<trackurl>    
http://agentapi.rayjump.com/agentapi/click?cid=112&aid=33921    
</trackurl>    
<payout>.8</payout>    
<begintime>1390233600</begintime>    
<endtime>1422719999</endtime>    
<icon_url>    
http://d11kdtiohse1a9.cloudfront.net/common/201401/201401211548317728_128X128.jpg    
</icon_url>    
<title>Texas Poker Th</title>    
<appdesc>app describtion</appdesc>    
<appsize>12</appsize>    
<startrate>4.1</startrate>    
<category>Game</category>    
<appinstall>1</appinstall>    
<allow_country>TH</allow_country>    
<allow_device>android</allow_device>    
<cap>1000000</cap>
<video_urls>    
<video_2004>http://cdn-adn.rayjump.com/cdn-adn/16/08/31/18/42/57c6b49fed962.mp4</video_2004>    
<video_2007>http://cdn-adn.rayjump.com/cdn-adn/16/08/31/57c6a41b4921d.mp4</video_2007>
</video_urls>  
<ads_details>    
<image_49>http://d11kdtiohse1a9.cloudfront.net/04021156272247_320X50.jpg</image_49>    
<image_50>http://d11kdtiohse1a9.cloudfront.net/04021156561312_320X480.jpg</image_50>    
<image_51>http://d11kdtiohse1a9.cloudfront.net/04021158468154_480X320.png</image_51>    
<image_52>http://d11kdtiohse1a9.cloudfront.net/04021200067834_400X300.png</image_52>    
</ads_details>     
</campaign_150>    
</campaigns>    
</response> 
```
 
<a name="Postback" id="Postback" ></a>
##5 Postback 设置
我们提供两种设置postback的方式，一种是在trackUrl上追加postback参数，另外一种是在后台设置postbackUrl，trackUrl上根据业务参数协议传递参数。
###5.1 trackUrl追加postback参数
Mobvista 为开发者提供postback支持. 为了使其生效, 需要:

基础的trackUrl：[http://agentapi.rayjump.com/agentapi/click?cid=112&aid=33921]()

设置postback时，我们需要在trackUrl上追加参数postback

追加完之后，会是这样子的：[http://agentapi.rayjump.com/agentapi/click?cid=112&aid=33921&postback=***]()

此时postback还没有设置好，需要以下的设置：
___

假设你的postbackURL是：[http://postback.abc.com/postback/mobvista?token=123&info=456]()

那么需要对这个URL进行base64处理，然后转化成：<font color=#011ff size=3>aHR0cDovL3Bvc3RiYWNrLmFiYy5jb20vcG9zdGJhY2svbW9idmlzdGE/dG9rZW49MTIzJmluZm89NDU2</font>

最终trackURL是这样的：[http://agentapi.rayjump.com/agentapi/click?cid=112&aid=33921&postback=aHR0cDovL3Bvc3RiYWNrLmFiYy5jb20vcG9zdGJhY2svbW9idmlzdGE/dG9rZW49MTIzJmluZm89NDU2]()

当收到安装通知时，Mobvista会回调这个postback地址通知你。我们会将你传给我们的参数全部回传给你们。

###5.2 后台设置postback
开发者需要在跟我们沟通确认后，将postback的Url设置在后台，然后按我们的接口规范传递参数。 
<br/>
<br/>
例如，你的postbackUrl是：http://www.base_url.com?<font color=red size=3>appid</font>={appid}&<font color=red size=3>client_ip</font>={clientip}&<font color=red size=3>ext_param</font>={ext1}...... 
     
- 开发者可以自定义回传的参数名，即等号前的英文，如上述url的appid、click_ip、ext\_param
- 大括号包裹的部分，标示需要替换的参数的占位符，后续会根据把这些占位符替换成对应的真实的值，如上述的{appid}、{client_ip}
- 替换符必须包含大括号
- 替换符需按照下面的列表且必须为全部小写

支持动态回传的字段列表

Parameter | Description | 替换符 | 开发者传递
---|---|---|---
appid | Internal App Identification number | {appid} | 否
offerid | Internal Offer Identification number | {offerid}| 否
bidrate | Payout for this conversion. Currency: USD | {bidrate}| 否
clientip | IP address of the user’s device | {clientip}| 否
devicemodel | device model, Example: GT-9505 | {devicemodel}| 否
osversion | This is the OsVersion as reported by the device. For example, "7.0.0" or "6.0.2". | {osversion} | 否
unitid | Internal unit identification number | {unitid} | 否
countrycode | The two character abbreviation for the country. Ex. "US" for United States. | {countrycode} | 否
idfa | iOS Advertising Identifier | {idfa} | <font color=red size=3>是</font>
gaid | Google's Advertising Identifier | {gaid} | <font color=red size=3>是</font>
ext1 | Defined by publisher at offer click. API-only | {ext1} | <font color= red size=3>是</font>
ext2 | Defined by publisher at offer click. API-only | {ext2} | <font color= red size=3>是</font>
ext3 | Defined by publisher at offer click. API-only | {ext3} | <font color= red size=3>是</font>
… | Defined by publisher at offer click. API-only | {……) | <font color= red size=3>是</font>
ext10 | Defined by publisher at offer click. API-only | {ext10} | <font color= red size=3>是</font>
- 如该替换符无法获取到实际的值，会以空字符串填充
- ext（1～10）开头的为扩展字段，即我们系统外的字段，通常是开发者再trackUrl上传给我们的
- 如开发者需要在回传安装的时候，回传特定的参数。则开发者需要在trackURL后追加  <font color=red size=2>“&ext1=ghost&ext2=30511&ext3=matrix”</font>

离线API示例：
```
http://net.rayjump.com/agentapi/click?cid=109915753&aid=18684&ext1=ghost&ext2=30511&ext3=matrix
```

##6 Q&A
1. IP验证，地区校验问题？  
	请求广告时，服务端根据IP判断所属的地区，返回该地区的广告  
	点击跳转时，服务端根据IP做地区验证，所属地区与广告投放的地区不一致返回异常提示

2. 为什么素材响应的速度慢？（CDN）  
	素材存放在国外的服务器，所以大陆地区请求素材延迟较高

3. 后台数据如何拉取？  
	M系统可提供后台报表数据的拉取，具体实现方式请联系技术人员

4. 什么是base64Encode？<br/>
	请参阅http://php.net/manual/en/function.base64-encode.php，不同的语言会有对应的方法，请自行翻阅资料。



