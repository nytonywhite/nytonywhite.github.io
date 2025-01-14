# Mobvista 实时API
##1 Home


Version 2.0

概述
Mobvista实时API（以下简称API）是一个简单的广告请求接口，旨在帮助您最优地获取广告展示在用户的移动设备上。

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
请求API的地址 :  http://net.rayjump.com/openapi/ads

基于 : HTTP 协议

方式	:	GET

##3 基本参数

参数 | 类型 | 必传 | 描述
---|---|---|---
sign | string | 是 | 必传参数。 开发者的唯一标识，是一个32位的加密字符串。</br> md5(appId+apiKey)</br>举例:</br> appId:123</br> apiKey:<font color=#00ff size=3>**7af60d70fdcdb6207a4c1cdef69c7294**</font></br> appId+apiKey:123<font color=#00ff size=3>**7af60d70fdcdb6207a4c1cdef69c7294**</font></br> sign=md5('123<font color=#00ff size=3>**7af60d70fdcdb6207a4c1cdef69c7294**</font>')
app_id | int | 是 | 必传参数。 APP/移动网站的唯一标识，在开发者添加APP/移动网站后自动生成。</br> 举例:appId=123
unit_id | int | 是 | 必传参数。 广告单元id, 每一个显示广告的广告位称为一个广告单元。</br> 举例:unit_id=12345
client_ip | string | 是 | 请求广告的设备的IP地址。</br> 如果是服务器请求API，则必须通过client_ip参数传递真实的客户端ip信息，</br> 如果是客户端请求API，此参数可不传。</br> 举例: clientIp=69.41.253.50
platform | Int | 是 | 1-Android, 2-iOS
os_version | String | 是 | 系统版本号, 举例: 4.4.2
package_name | String | 否 | 包名
app_version_name | Int | 否 | app版本名称
app_version_code | Int | 否 | app版本号
imei | String | 否 | imei码
mac | String | 否 | mac地址
brand | String | 否 | 设备品牌, 举例: sumsang 
model | String | 否 | 设备型号, 举例: GT-9505
screen_size | String | 否 | 屏幕大小 , 举例: 1920x1080
orientation | Int | 否 | 1-竖向，2-横向
mnc | String | 否 | 移动网络码, 举例:00
mcc | String | 否 | 移动国家码, 举例: 460
network_type | Int | 否 | 网络类型:</br>2 = 2G;</br>3 = 3G;</br>4 = 4G;</br>9 = WIFI & lan
language | String | 否 | 系统语言, 举例: zh-TW
timezone | String | 否 | 时区
image_size | Int | 否 | 图片尺寸大小，仅限于以下值：</br> 2: 320x50(banner) </br> 3: 300x250 </br> 4: 480x320(horizontal cover) </br> 5: 320x480(vertical cover) </br> 6: 300x300 </br> 7: 1200x627 </br> 举例:imgSize=4
useragent | string | 否 | 设备浏览器的USER-AGENT，需要进行urlencode。</br> 举例:ua=Mozilla/5.0%20(Linux;%20U;%20Android%204.2.2;%20zh-tw;%20Nexus%207%20Build/JDQ39)%20AppleWebKit/534.30%20(KHTML,%20like%20Gecko)%20Version/4.0%20Safari/534.30
category | int | 否 | 广告的分类</br>  1: 游戏app </br> 2: 应用app 如果值为空，默认是应用app。</br> 举例:category=1
price_floor | String | 否 | 最低价格, 举例: 0.4
ad_num | int | 否 | 广告的数量：</br> 最大值: 20，</br> 最小值: 1。</br> 举例:ad_num=1
**android_id** | String | 否 | android id （如果操作系统是android，有就传）
**gaid** | String | 是 | Google Advertising ID （如果操作系统是android）
**idfa** | String | 是 | identifierForIdentifier （如果操作系统是IOS）

###URL 实例: 
http://net.rayjump.com/openapi/ads?app_id=25369&unit_id=1200&sign=2a70fa6f90abab0e990a780fef7555ab&ad_num=2&ping_mode=1&offset=0&ad_type=3&ad_source_id=1&platform=1&os_version=4.4.2&package_name=com.mobvista.test&app_version_name=3.7.5&app_version_code=2204&orientation=1&model=IM-A890S&brand=VEGA&gaid=1424c1b9-c4f4-4a80-963c-836828e4a641&mnc=05&mcc=450&network_type=4&language=ko&timezone=GMT%2B09%3A00&useragent=Mozilla%2F5.0%20%28Linux%3B%20Android%204.4.2%3B%20IM-A890S%20Build%2FKVT49L%29%20AppleWebKit%2F535.19%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F18.0.1025.133%20Mobile%20Safari%2F535.19&screen_size=1080x1920

<a name="Postback" id="Postback" ></a>




##4 返回
返回有两种文本格式：json和xml，开发者根据自己的程序获取合适的文本格式，这里需要传参数的restype，默认返回json格式。

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
1 | 成功 | 正常请求，成功返回广告信息。
-4 | appid错误 | appid参数不正确，appid必须是个整数。
-10 | 签名错误 | 签名没有通过验证，签名必须和appid参数相对应。
-6 | app的状态不正常 | App/移动网站的状态不正常，只有激活的APP/移动网站才能得到广告。
-1 | 没有广告填充 | 该地区没有广告填充



###4.2 一个data的节点包括：
字段 | 说明
---|---
id | data的唯一ID
title | app的名字
desc | app的描述
package_name | app的包名
icon_url | app的icon
image_url | app的素材图片url
click_url | 广告被点击的时候请求的URL（一般来说，返回302）。</br>注意：click_url的过期时间为1个小时。
impression_url | 广告被展示的时候请求的URL。</br>注意：impression_url的过期时间为1个小时。
notice_url | 广告被点击的时候用来通知Mobvista服务器的URL。</br>注意：通知服务器的时候需要收到http code为2xx或者3xx则视为成功，否则请进行重试直到通知成功。
###4.3 JSON格式举例：
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

<br/>
实时API示例：
```
http://tracking.lenzmx.com/click？mb_pl=android&mb_nt=cb441&mb_campid=37wan_yhjy_my_sg&aff_sub=Mi4wfHNnMDEucmF5anVtcC5jb218NTg3NGNiZDllOTYyOTRhYzJkYjQ1ZDY2fDU4NzRjYmQ5ZTk2Mjk0YWMyZGI0NWM3Nnw1NzMxfDIyMTA4fDE0Nnw0NTd8MTEwMTc0NjQ4fDR8NHxhZF9zZXJ2ZXJ8N3xTR3wtMXw1fDF8MjIxMDh8MjIyMnwyLjYuMnxvcGVuYXBpfDJ8fC0%3D&mb_subid=22108&mb_devid=6a60ab97fb4778bf&mb_gaid=5731b4c8-7cc1-4a09-bb77-24f237d93a65&ext1=ghost&ext2=30511&ext3=matrix
```

##6 Q&A
1. IP验证，地区校验问题？  
	请求广告时，服务端根据IP判断所属的地区，返回该地区的广告  
	点击跳转时，服务端根据IP做地区验证，所属地区与广告投放的地区不一致返回异常提示

2. 哪些业务数据服务端会进行去重处理？  
	click、install 会做去重处理，重复点击、安装不会产生额外数据  
	impression 没有去重

3. 如何设置postback 地址？  
	提供两种方式：  
		3.1 在clickUrl上附加postback参数，详细说明见于 <a href="#Postback">这里</a></br>
		3.2 运营在在后台针对app进行配置，填入postback的地址

4. 为什么素材响应的速度慢？（CDN）  
	素材存放在国外的服务器，所以大陆地区请求素材延迟较高

5. 广告的结算方式有哪些？  
	有三种方式：CPI、CPC、CPM，具体offer的结算方式请咨询运营人员

6. 后台数据如何拉取？  
	M系统可提供后台报表数据的拉取，具体实现方式请联系技术人员

7. 价格能否提供？
暂时只支持在M系统后台查询



