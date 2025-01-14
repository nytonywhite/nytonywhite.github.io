# Mobvista必要事项

### 接入SDK必要事项
* 1.导入必要jar到项目libs中

``` javascript

mobvista_common.jar
mobvista_download.jar(非必须)

```

* 2.配置sdk所需相关权限，如下： Under the main manifest tag, add the following permissions

``` javascript
<uses-permission android:name="com.android.launcher.permission.INSTALL_SHORTCUT" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

<!-- These permissions are strongly recommended and will result in higher performance -->
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />

```
* 3.配置sdk服务service，如下： And in application tag, add the following service:'
``` javascript
<!-- MobvistaSDK *begin* -->
<service android:name="com.mobvista.msdk.shell.MVService" >
        <intent-filter>
            <action android:name="com.mobvista.msdk.download.action" />
        </intent-filter>
</service>
<!-- MobvistaSDK *end* -->
```

* 4.建议开发者在Application中初始化sdk，即调用
``` javascript
MobVistaSDK sdk = MobVistaSDKFactory.getMobVistaSDK();
Map<String,String> map = sdk.getMVConfigurationMap(String appId,String appKey)
//如果是gradle打包，修改了applicationId,请在PACKAGE_NAME_MANIFEST中输入AndroidManifest.xml中的package的值
map.put(MobVistaConstans.PACKAGE_NAME_MANIFEST, "com.mobvista.mobvistademo");
sdk.init(map, Application application);

```

* Entity Detail: Campaign(广告数据结构)
``` javascript
private String id;

private String appName;       //app name of this Campaign

private String appDesc;       //app description

private String iconUrl;       //icon url

private String imageUrl;      //image url

public String adCall;        //the string to show in the clickbutton
```  

### 混淆sdk
* 建议开发者在混淆代码的时候添加如下代码到混淆规则中：
``` javascript
-keepattributes Signature 
-keepattributes *Annotation*
-keep class com.mobvista.** {*; } 
-keep interface com.mobvista.** {*; } 
-keep class android.support.v4.** { *; }
-dontwarn com.mobvista.**
-keep class **.R$* {
    public static final int mobvista*;
}
```  
