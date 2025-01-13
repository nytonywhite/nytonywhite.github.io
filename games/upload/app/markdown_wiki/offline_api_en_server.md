# Mobvista Offline API
##1 Home

Version 1.3.2

Introduction

This document will introduce Mobvista Offline API (hereinafter referred to as API), developers can obtain ads on display by calling API. API is built on the HTTP protocol, using GET / POST way to obtain the response content.

Notably, to call our API, you must register as a publisher; add an APP or Wap Site for ads display. The token parameter (apikey and appid) is required in all requests, please keep your apikey and appid confidential.


####How to get API KEY AND APP ID?
1. login in **dashboard**, an APIKEY will be displayed in the middle of DASHBOARD main frame.
2. After adding your app/wapsite, you can see your APP ID.

##2 Basic Request URL
The address of API request: http://agentapi.rayjump.com/agentapi/ad

Base on : HTTP protocol 

Method	:	GET

Note: The API has IP access restriction, testing and official use of the API needs to ask us to include the request IP in Mobvista IP whitelist


##3 General Parameters

Parameter | Type	| Mandatory| Description
---|---|---|---
apikey | string | Yes | Mandatory.Uniquely identifies the publisher, which is a 32-bit encryption string.apikey can be used to request interface only after our approval.Example:apikey=8b74bgdf992e13e1ef0f70d72a35c6d2
appid | int | No | Mandatory. Uniquely identifies which app/site is integrated. ID generated after publishers add an app or wapsite.Example:appid=123
restype | string | No | The returned Text format, which is limited to the following values,<br/>json:json text format<br/>xml: xml text format<br/>default: json<br/>**Example**:restype=json

***IMPORTANT***: <br/>API parameters are case sensitive, and in lower case. The use of upper case characters in any of the parameters name will cause our ad-server to ignore that parameter completely.

###Example: 
```
http://agentapi.rayjump.com/agentapi/ad?appid=1&apikey=8a44b3df992e13e1ef0f70d72a35c6d2&restype=json

```

##4 Response
Two returned text format: json and xml, developers can obtain the appropriate format based on the needs of their own programs, developers need to pass parameters restype, json is default format returned.

Note:

1. The returned ad list contains ad validity.
2. The click url is only valid in a day, that is to say, clicks after the day you request will not be received.
3. The returned number of ads may change, because there may be some ads between two requests is manually stopped.


Field | Description | Example
---|---|---
status | Status code | 1
describe | The description of the status | success
data | The ads data, it is an array |  &nbsp;

###4.1 Status
The Status code is used to identify the server response, code of API is as following:

Status | Describe | Detail
---|---|---
1000 | success | Request normal, successful return advertising messages
1001 | appid is incorrect | The appid parameter is not correct, which must be integer
1002 | apikey is incorrect | The apikey parameter validation does not pass, which must be corresponding to the appid parameter
1003 | apikey is not allow | apikey can be used to request this interface only after our approval.
1004 | success | agent ip is not allowed
1005 | success | The state of APP or WapSite which appid parameter corresponding to is abnormal, only app/wapsite in running or pending state can obtain advertisement
1100 | success | No ads in this area



###4.2 Return data:

Returned content includes following parameters:

Field | Description | Example
---|---|---
status | Status code | 100
describe | The description of the status | success
impression_url | notify this URL when impression happens | http://agentapi.rayjump.com/agent_impression.php?campagin_id=1&....
trackurl | Ad click link, notice that this url is within an hour of effective | http://agentapi.rayjump.com/agentapi/click?cid=112&aid=33921
campaign_id | Campaign ID | 127
trace\_app\_id | App ID | trace_app_id=com.tap4fun.spartanwar
preview_url | Preview link	 | preview_url=https://play.google.com/store/apps/details?id=com.zplay.android.mm
payout | Campaign payout | $0.30
begintime | Beginning time stamp of ad validity period | 1389628800
endtime | Ending time stamp of ad validity period | 1389628800
icon_url | Url of ad icon | http://d11kdtiohse1a9.cloudfront.net/common/201403/399739_128X128.png
allow_country	 | Allowed countries of campaigns | AF,AX,AL,AS,AD ALL: means all country
allow_device | Allowed devices of campaigns | android, ios
cap | Total cap of the campaign | 1000000
video_urls | Video of campaigns | http://cdn-adn.rayjump.com/cdn-adn/16/08/31/18/42/57c6b49fed962.mp4
ads_details | Image and text of campaigns | http://d11kdtiohse1a9.cloudfront.net/common/201403/201403281430377774_400X300.png
title | App name | Wechat
appdesc | App description | Free texting, voice messages, and video calls in your pocket
appsize | App size | 8.2
startrate | App scores in Google Play | 4.5
category | App category	 | Application
appinstall | Number of app installation in Google Play | 500,000,000 – 1,000,000,000
link_type | the link type of app | googleplay/apk/other


Important: Add device Information in the trackurl:<br/>
When user click the trackurl, you need add Device Id with the real value of the user device, sub id(sub channel id), and jump to the url.<br/>
**Example**: <br/>
**if user's operating system is android**:<br/>
```
http://agentapi.rayjump.com/agentapi/click?cid=112&aid=33921&did=24c939215bb67c43&gaid=38400000-8cf0-11bd-b23e-10b96e40000d&sub_id=1057
```
<br/><br/>**or it's IOS**:<br/>
```
http://agentapi.rayjump.com/agentapi/click?cid=112&aid=33921&sub_id=1057&idfa=77B8659E-BF7C-44DC-9559-D425AAD23391
```

**Note:**

1. What is Google Advertising ID?
2. The conversion figure can not be matched if the androidId ,gaid or idfa is wrong.


###4.3 JSON Response Example
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


###4.4 XML Response Example
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
##5 Postback
Mobvista support postback for publishers. To make it work, you need:

Campaign clickURL (provided by Mobvista)
Your postbackURL
postback=base64(postbackURL) Final URL: trackurl&postback=base64(postbackURL)

**Example:**

This is the basis Track URL : [http://agentapi.rayjump.com/agentapi/click?cid=112&aid=33921]()
<br/>If you want to set postback, you need add the parameter "postback" to track url ,like below:<br/>
[http://agentapi.rayjump.com/agentapi/click?cid=112&aid=33921&postback=***]()

But it isn't the final track url, you have to make a change like below:<br/>
___
Assume that this is your postback url:[http://postback.abc.com/postback/mobvista?token=123&info=456]()
<br/>
You need to encode this url by base64 , and then the postback become likethis: <font color=#011ff size=3>aHR0cDovL3Bvc3RiYWNrLmFiYy5jb20vcG9zdGJhY2svbW9idmlzdGE/dG9rZW49MTIzJmluZm89NDU2</font>
<br/>
( Take it easy, following will introduce what is base64 and how to base64.)
<br/>
So the final track url is : [http://agentapi.rayjump.com/agentapi/click?cid=112&aid=33921&postback=aHR0cDovL3Bvc3RiYWNrLmFiYy5jb20vcG9zdGJhY2svbW9idmlzdGE/dG9rZW49MTIzJmluZm89NDU2]()

When our system receive conversion from advertiser , Mobvista will call postback to inform your system . At the same time, Mobvista will send you all of the parameter .


##6 Q&A
1. What 's IP verification and area validation ?  

	When requesting ads，according to regional IP, server returned  advertisings of  that region.
When we click the url of advertising，server will return error if the client IP does not belong to the targeting regions/countries (based on the server-side IP veriation)


2. Why the material response slow?（CDN）  
	Material stored in overseas machine.therefore,request material in the mainland need to consume more time.

3. How to get the report-data from Mobvista?
	Server provided API for developer to pull report-data, contact the technical staff to get more infomation.

4. What is base64 encode? How to encode?  	base64_encode — Encodes data with MIME base64  	This link has the detailed intruduce for base64: **http://php.net/manual/en/function.base64-encode.php**

