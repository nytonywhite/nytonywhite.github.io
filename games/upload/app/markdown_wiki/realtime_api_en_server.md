# Mobvista Realtime API
##1 Home


Version 2.0

Introduction
The Mobvista Realtime API (hereinafter referred to as API) is a simple GET HTTP API that provides you the access to obtain ads from Mobvista and display them in your mobile application in real time.

How does it work?

* Request. App sends request to API, directly from client or from server.
* Compare. API compares offers from various ad sources in real time.
* Analyze. API tracks user interests and behavior with machine learning, the more traffic you send to us, the smarter it will be.
* Display. The most profitable and suitable ad for your traffic is displayed.

Notably, to call our API, you must register as a publisher; add an APP or Wap Site for ads display. The token parameter (apikey and appid) is required in all requests, please keep your apikey and appid confidential.
If you have any questions, contact us via publisher@mobvista.com .


####How to get API KEY AND APP ID?
1. login in **dashboard**, an APIKEY will be displayed in the middle of DASHBOARD main frame.
2. After adding your app/wapsite, you can see your APP ID.

##2 Basic Request URL
The address of API request : http://net.rayjump.com/openapi/ads

Base on : HTTP protocol 

Method	:	GET

##3 General Parameters

Parameter | Type	| Mandatory| Description
---|---|---|---
sign | string | Yes | Mandatory. Uniquely identifies the publisher, which is a 32-bit encryption string.md5(appId+apiKey)</br>Example: </br> appId:123</br> apiKey:<font color=#00ff size=3>**7af60d70fdcdb6207a4c1cdef69c7294**</font></br> appId+apiKey:123<font color=#00ff size=3>**7af60d70fdcdb6207a4c1cdef69c7294**</font></br> sign=md5('123<font color=#00ff size=3>**7af60d70fdcdb6207a4c1cdef69c7294**</font>')
app_id | int | Yes | Mandatory. Uniquely identifies which app/site is integrated. ID generated after publisher add an app or site.</br>Example: appId=123
unit_id | int | Yes | Mandatory. Ad unit id, unique identifier of ad placement. </br>Example: unit_id=12345
client_ip | string | Yes | The IP address of the device requesting the ad. </br>The parameter is not necessary, but if you pass on it, it must be the public IP, and not a LAN IP. </br>If your execution context is a server, you Should use X_FORWARD_FOR (if present) or REMOTE_ADDR header values you got from the client request.</br>Example: clientIp=69.41.253.50
platform | Int | Yes | 1-Android, 2-Ios
os_version | String | Yes | System version, Example: 4.4.2
package_name | String | No | package name
app_version_code | Int | No | app version code
model | String | No | device model, Example: GT-9505
screen_size | String | No | screen size , Example: 1920x1080
orientation | Int | No | 1-Vertical，2-Horizontal
mnc | String | No | Mobile Network Code, Example: 00
mcc | String | No | Mobile Country Code, Example: 460
network_type | Int | No | network_type：</br>2 = 2G;</br>3 = 3G;</br>4 = 4G;</br>9 = WIFI & lan
language | String | No | system language, Example: zh-TW
timezone | String | No | timezone
image_size | Int | No | image size list, which is limited to the following values:</br>2: 320x50(banner) </br>3: 300x250 </br>4: 480x320(horizontal cover) </br>5: 320x480(vertical cover) </br>6: 300x300(big Icon) </br>7: 1200x627 </br>Example: image_size=4
useragent | string | No | The browser's user agent of the device, valid URL-encoded String, highly recommended.Example: ua=Mozilla/5.0%20(Linux;%20U;%20Android%204.2.2;%20zh-tw;%20Nexus%207%20Build/JDQ39)%20AppleWebKit/534.30%20(KHTML,%20like%20Gecko)%20Version/4.0%20Safari/534.30
category | int | No | Category of the ads: </br>1: Game app </br>2: Utility app If null, then ads can be game app or utility app </br>Example: category=1
imei | String | No | imei
mac | String | No | mac
price_floor | String | 否 | The lowest price, Example: 0.4
ad_num | int | No | Number of ads: </br>Max: 20 </br>Min: 1 </br>Example: ad_num=1
**android_id** | String | No | android id(If your osversion is android,send if you have)
**gaid** | String | Yes | Google Advertising ID (If your osversion is android)
**idfa** | String | Yes | identifierForIdentifier (If your osversion is IOS)

###Example: 
```
http://net.rayjump.com/openapi/ads?app_id=25369&unit_id=1200&sign=2a70fa6f90abab0e990a780fef7555ab&ad_num=2&ping_mode=1&offset=0&ad_type=3&ad_source_id=1&platform=1&os_version=4.4.2&package_name=com.mobvista.test&app_version_name=3.7.5&app_version_code=2204&orientation=1&model=IM-A890S&brand=VEGA&gaid=1424c1b9-c4f4-4a80-963c-836828e4a641&mnc=05&mcc=450&network_type=4&language=ko&timezone=GMT%2B09%3A00&useragent=Mozilla%2F5.0%20%28Linux%3B%20Android%204.4.2%3B%20IM-A890S%20Build%2FKVT49L%29%20AppleWebKit%2F535.19%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F18.0.1025.133%20Mobile%20Safari%2F535.19&screen_size=1080x1920
```


<a name="Postback" id="Postback" ></a>

##4 Response
Two returned text format: json and xml, developers can obtain the appropriate format based on the needs of their own programs, developers need to pass parameters restype, json is default format returned.
Returned content includes following parameters:


Field | Description | Example
---|---|---
status | Status code | 1
msg | The description of the status | success
data | The ads data, it is an array |  &nbsp;

###4.1 Status
The Status code is used to identify the server response, code of API is as following:

Status | Describe | Detail
---|---|---
1 | success | Request normal, successful return advertising messages
-4 | appid is incorrect | The appid parameter is not correct, which must be an integer
-10 | sign is incorrect | The sign parameter validation does not pass, which must be corresponding to the appid parameter
-6 | The status of the app is abnormal | The state of App or Site is abnormal, only app/site in running or pending state can obtain advertisement
-1 | no ads | No ads in this area



###4.2 A node of the data:

Field | Description
---|---
id | unique id of data
title | title of the app
desc | desccription of the app
package_name | package name of the app
icon_url | icon of the app
image_url | advertising image of the app**(If There is no suitable material ,return empty)**
click_url | URL that have to be requested when the ad is clicked(Normally, it returns 302). Note: The expiration time for click_url is 1 hour. | &nbsp;
impression_url | URL that have to be requested when the ad is displayed.  | Note: The expiration time for impression_url is 1 hour. | &nbsp;
notice_url | URL that have to be requested to notice us the ad is clicked. Note: The server needs to receive notification http code of 2xx or 3xx, which is considered successful, otherwise retry until successful notified. | 

###4.3 JSON Response Example
```
{
  "status": 1,
  "msg": "success",
  "data": {
    "ads": [
      {
        "id": 3990056,
        "title": "Game of Dice",
        "desc": "Takeover cities, collect tolls and out-wealth other players around the world!!\nPlay as various characters in the world of Game of Dice, ranging from telekinetic master to contract killer!\nYou can also use skill cards such as counter-attack, ambush, high j",
        "package_name": "com.joycity.god",
        "icon_url": "http://res.rayjump.com/common/2015/12/22/03/01/d41d8cd98f00b204e9800998ecf8427e_201512220300091450724409833_128X128.png",
        "image_url": "",
        "impression_url": "http://de.rayjump.com/impression?k=57cfe42e54914b91143ce1b1&p=fHx8fHwwfG9wZW5hcGl8b3BlbmFwaXx8fGFuZHJvaWR8NC40LjJ8fE1JIDJ8fDJ8fHpofHdpZml8NDYwMDd8fHxEZWZhdWx0Rm9yTVJhbmtlcl9vbGRfMS4xLjAuMHxmOGRmYTgxYy1hMTA5LTU3ZWQtODdlYy0wMTMwNDhlNDg3Y2R8fHwxfHx8fHwzOS4xMDkuMTI0LjY3fDg2NDM5NDAyMDYwNTcxNXw2MDU3MThDQkU5MTN8NjA1NzE4Q0JFOTEzMDAwMHx8fHx8YWU2NmQwODUtY2M1ZC00MTE3LTkyNzctNWQxNWYxMDgyYmQ1fHx8fDE3Mi4zMS4xOC4xOTR8NTdjZmU0MmU1NDkxNGI5MTE0OTNjZTE5fDU3Y2ZlNDJlNTQ5MTRiOTExNDkzY2UxYXx8fHx8fDB8fHx8&q=fGRlMDEucmF5anVtcC5jb218NTdjZmU0MmU1NDkxNGI5MTE0M2NlMWMxfDg2OTd8MjUzNjB8MHx8MTB8SEt8NTdjZmU0MmU1NDkxNGI5MTE0M2NlMWIxfDU2OXwzOTkwMDU2fHwxfHxhZF9zZXJ2ZXJ8NC4wNXw0LjA1fC0xfDF8MjUzNjA%3D&x=0",
        "click_url": "http://clk.taptica.com/aff_c?tt_ls=b&offer_id=29876&aff_id=1476816&tt_appid=com.joycity.god&tt_bannerid=&tt_aff_clickid=fGRlMDEucmF5anVtcC5jb218NTdjZmU0MmU1NDkxNGI5MTE0M2NlMWMxfDg2OTd8MjUzNjB8MHx8MTB8SEt8NTdjZmU0MmU1NDkxNGI5MTE0M2NlMWIxfDU2OXwzOTkwMDU2fHwxfHxhZF9zZXJ2ZXJ8NC4wNXw0LjA1fC0xfDF8MjUzNjA%3D&tt_idfa=&tt_advertising_id=ae66d085-cc5d-4117-9277-5d15f1082bd5&tt_sub_aff=25360",
        "notice_url": "http://de01.rayjump.com/click?k=57cfe42e54914b91143ce1b1&p=fHx8fHwwfG9wZW5hcGl8b3BlbmFwaXx8fGFuZHJvaWR8NC40LjJ8fE1JIDJ8fDJ8fHpofHdpZml8NDYwMDd8fHxEZWZhdWx0Rm9yTVJhbmtlcl9vbGRfMS4xLjAuMHxmOGRmYTgxYy1hMTA5LTU3ZWQtODdlYy0wMTMwNDhlNDg3Y2R8fHwxfHx8fHwzOS4xMDkuMTI0LjY3fDg2NDM5NDAyMDYwNTcxNXw2MDU3MThDQkU5MTN8NjA1NzE4Q0JFOTEzMDAwMHx8fHx8YWU2NmQwODUtY2M1ZC00MTE3LTkyNzctNWQxNWYxMDgyYmQ1fHx8fDE3Mi4zMS4xOC4xOTR8NTdjZmU0MmU1NDkxNGI5MTE0OTNjZTE5fDU3Y2ZlNDJlNTQ5MTRiOTExNDkzY2UxYXx8fHx8fDB8fHx8&q=fGRlMDEucmF5anVtcC5jb218NTdjZmU0MmU1NDkxNGI5MTE0M2NlMWMxfDg2OTd8MjUzNjB8MHx8MTB8SEt8NTdjZmU0MmU1NDkxNGI5MTE0M2NlMWIxfDU2OXwzOTkwMDU2fHwxfHxhZF9zZXJ2ZXJ8NC4wNXw0LjA1fC0xfDF8MjUzNjA%3D&notice=1"
      }
    ]
  }
}
```

##5 Postback
Mobvista support postback for publishers. To make it work, you need:

Campaign clickURL (provided by Mobvista)
Your postbackURL
postback=base64(postbackURL) Final URL: trackurl&postback=base64(postbackURL)

Example:

clickURL=[http://de01.rayjump.com/click?token=54f6a22273a9f6580a000981& sign=aAavDASV4a06225f&timestamp=1425449503&cid=2138&aid=1]()

postbackURL= [http://postback.pb.com/postback/mobvista?token=123&info=456]()

base64(***postbackURL***)=<font color=#011ff size=3>aHR0cDovL3Bvc3RiYWNrLnBiLmNvbS9wb3N0YmFjay9tb2J2aXN0YT90b2tlbj0xMjMmaW5mbz00NTY=</font>


Final URL： [http://de01.rayjump.com/click?token=54f6a22273a9f6580a000981&sign=aAav DASV4a06225f&timestamp=1425449503&cid=2138&aid=1&postback=<font color=#011ff size=3>aHR0cDovL3Bvc3RiYWNrLnBiLmNvbS9wb3N0YmFjay9tb2J2aXN0YT90b2tlbj0xMjMmaW5mbz00NTY=</font>]()

Mobvista will call this URL and notify you when you get installs. All the parameters you sent to us will be post back to you.



##6 Q&A
1. What 's IP verification and area validation ?  

	When requesting ads，according to regional IP, server returned  advertisings of  that region.
When we click the url of advertising，server will return error if the client IP does not belong to the targeting regions/countries (based on the server-side IP veriation)

2. What kind of business data will not be repeated ？  
Data of click and install

3. How to set up postback url？  
	There are two ways:
	Additional parameter "postback" to the clickUrl，Details can be found in <a href="#Postback">**this**</a></br>.
	Asked Operation Specialist to set the url in the background .

4. Why the material response slow?（CDN）  
	Material stored in overseas machine.therefore,request material in the mainland need to consume more time.

5. What are the method of payment?  
	CPI、CPC、CPM

6. How to get the report-data from Mobvista?
	Server provided API for developer to pull report-data, contact the technical staff to get more infomation.

7. Whether to allow provide price?  
Temporarily only supports to query in the background.

