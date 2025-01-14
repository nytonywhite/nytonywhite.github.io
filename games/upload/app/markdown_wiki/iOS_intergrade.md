##集成过程
###Mobvista SDk M

###V1.3.0

The "M" version of MobvistaSDK.
    
## SDK功能简介
* 1.Native接入形式，即通过sdk的接口获取数据并且由开发者自行选择如何显示广告
* 2.Appwall接入形式，开发者不用关心如何展示广告，只需要提供appwall的入口，点击之后直接进入广告墙的展示
* 3.聚合FaceBook的native广告
* 4.聚合Applovin视频广告，NativeX视频广告
* 5.RewardVideo接入形式,提供激励性的视频展示，会全屏展示视频广告，在播放结束后通知开发者奖励的内容
* **6.sdk最低支持iOS 7**
* 7.经测试，植入我们SDK包大概增加1MB左右的大小。同时植入FBAudienceNetwork SDK和我们SDK，包大概增加1.7MB左右的大小。
* 8.经测试，植入Applovin SDK和我们SDK，包大概增加1.4MB左右的大小,同时植入NativeX SDK和我们SDK，包大概增加1.4MB左右的大小。


## 接入前的准备
* 1.导入MVSDK.framework到项目工程中
* 2.添加依赖的系统库，如下：
* CoreGraphics.framework
* Foundation.framework
* UIKit.framework
* libsqlite3.tbd (在Xccode7以下是libsqlite3.dylib)
* libz.tbd (在Xcode7以下是libz.dylib)
* AdSupport.framwork
* StoreKit.framewrok
* QuartzCore.framework
* CoreLocation.framework
* CoreTelephony.framework
* MobileCoreServices.framework
* Accelerate.framework
* SystemConfiguration.framework
**FaceBook需要特殊添加的**
* FBAudienceNetwork.framework （如果不需要展示Facebook广告可不添加）
* CoreMotion.framework（如果不需要展示Facebook广告可不添加）
* AVFoundation.framework（如果不需要展示Facebook广告可不添加）
* CoreMedia.framework（如果不需要展示Facebook广告可不添加）
**NataiveX需要特殊添加的**
* MediaPlayer.framework（如果不需要展示NativeX广告可不添加）
* MessageUI.framework（如果不需要展示NativeX广告可不添加）
* CoreMedia.framework（如果不需要展示NativeX广告可不添加）
**Applovin需要特殊添加的**

**注：Facebook广告集成教程：https://developers.facebook.com/docs/audience-network/getting-started?locale=zh_CN**

* 3.在工程的Build Settings中，找到Other Linker Flags，增加一个flag：-ObjC，注意大小写。

* 4.由于iOS9的App Transport Security，还需要修改工程的info.plist文件，使其允许http连接。方法如下：
* 在info.plist文件里增加一个NSAPPTransportSecurity的Dictionary，并给这个Dictionary添加一个key为NSAllowArbitraryLoads的布尔值，设置为YES。
    
    
## FaceBook聚合功能特殊说明
**FaceBook 也需要 ios版本在 7以上**

## SDK的初始化
* 1.在AppDelegate里的`- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions`方法中调用初始化方法,例如：
* `[[MVSDK sharedInstance] setAppID:@"appID” ApiKey:@“apiKey”];`传入在后台得到的AppID和ApiKey即可。
* 初始化时，SDK会从服务器拉取配置信息。


## Native数据接口接入方法  
* 集成流程

```flow
st=>start: 初始化MVSDK
e=>end: 结束
addFile=>operation: 添加相应头文件
initNative=>operation: 初始化native
preloadAds=>operation: 预加载广告
loadAds=>operation: 加载广告
registerAds=>operation: 注册（绑定）
unregisterAds=>operation: 解除绑定

st->addFile->initNative->preloadAds->registerAds->unregisterAds->e
```



* 1.确保SDK已经初始化。
* 2.`#import <MVSDK/MVNativeAdManager.h>`  
    `#import <MVSDK/MVNativeScrollView.h>`(如果不需要轮播广告可不添加)  
    `#import <MVSDK/MVTemplate.h>`(如果不需要多模板可不添加)
* 3.通过MVNativeAdManager的<br/>
通过MVNativeAdManager的 <br/>
第一种方式：`- (nonnull instancetype)initWithUnitID:(nonnull NSString *)unitId
                         fbPlacementId:(nullable NSString *)fbPlacementId
                    forNumAdsRequested:(NSUInteger)numAdsRequested
              presentingViewController:(nullable UIViewController *)viewController;`<br/>
第二种方式：`- (nonnull instancetype)initWithUnitID:(nonnull NSString *)unitId
                         fbPlacementId:(nullable NSString *)fbPlacementId
                    supportedTemplates:(nullable NSArray *)templates
                        autoCacheImage:(BOOL)autoCacheImage
                            adCategory:(MVAdCategory)adCategory
              presentingViewController:(nullable UIViewController *)viewController
;
;`<br/>
第三种方式：`- (nonnull instancetype)initWithUnitID:(nonnull NSString *)unitId
                         fbPlacementId:(nullable NSString *)fbPlacementId
                              frameNum:(NSUInteger)frameNum
                    supportedTemplates:(nullable NSArray *)templates
                        autoCacheImage:(BOOL)autoCacheImage
                            adCategory:(MVAdCategory)adCategory
              presentingViewController:(nullable UIViewController *)viewController;`<br/>
这三个方式中的其中一个方式初始化，使用第二种和第三种时应增加头文件`#import <MVSDK/MVTemplate.h>`，用类方法创建模板，如果创建多个，可以把所有的模板放在一个数组中，把数组放进对应的参数里面，并设置MVNativeAdManager的delegate,然后通过`- (void)loadAds`加载数据，最后由delegate的回调来得到结果，具体使用请看下面的Sample。
* 4.
通过MVSDK的 <br/>
第一种方式：`- (void)preloadNativeAdsWithUnitId:(nonnull NSString *)unitId fbPlacementId:(nullable NSString *)fbPlacementId forNumAdsRequested:(NSUInteger)numAdsRequested;`<br/>
第二种方式：`- (void)preloadNativeAdsWithUnitId:(nonnull NSString *)unitId
                     fbPlacementId:(nullable NSString *)fbPlacementId
                supportedTemplates:(nullable NSArray *)templates
                    autoCacheImage:(BOOL)autoCacheImage
                        adCategory:(MVAdCategory)adCategory;`<br/>
第三种方式：`- (void)preloadNativeFramesWithUnitId:(nonnull NSString *)unitId
                        fbPlacementId:(nullable NSString *)fbPlacementId
              supportedFrameTemplates:(nullable NSArray *)templates
                       autoCacheImage:(BOOL)autoCacheImage
                           adCategory:(MVAdCategory)adCategory
                             frameNum:(NSUInteger)frameNum;`<br/>
这三个方式中的其中一个方式预加载数据，使用第二种和第三种时应增加头文件`#import <MVSDK/MVTemplate.h>`，用类方法创建模板，如果创建多个，可以把所有的模板放在一个数组中，并把数组放进对应的参数里面，具体使用请看下面的Sample。
* 5.得到广告后，通过`- (void)registerViewForInteraction:(nonnull UIView *)view withCampaign:(nonnull MVCampaign )campaign`方法来注册广告显示的view到SDK，后续用户在点击这个view的时候会直接跳转广告展示。也可以通过`- (void)registerViewForInteraction:(nonnull UIView *)view withClickableViews:(nonnull NSArray *)clickableViews withCampaign:(nonnull MVCampaign *)campaign`绑定多个可点击的view。
* 6.如果需要将view解除和广告的绑定，则调用`- (void)unregisterView:(nonnull UIView *)view`方法
* 7.如果引入了FBAudienceNetwork.framework，SDK将会根据开发者后台配置决定是否请求Facebook广告，如果请求，SDK将会把数据转化成统一的数据结构MVCampaign返回。如果没有引入FBAudienceNetwork.framework，无论后台配置如何，都不会请求Facebook广告。
    
* **Sample：**

```//初始化MVNativeAdManager方法1    基础用法
MVNativeAdManager *adManager = [[MVNativeAdManager alloc] initWithUnitID:unit_native fbPlacementId:fb_id forNumAdsRequested:num presentingViewController:self];
adManager.delegate = self;

//初始化MVNativeAdManager方法2    在基础用法基础上增加了多模板和是否自动缓存图片的功能
MVTemplate *template1 = [MVTemplate templateWithType:MVAD_TEMPLATE_BIG_IMAGE adsNum:1];
MVTemplate *template2 = [MVTemplate templateWithType:MVAD_TEMPLATE_ONLY_ICON adsNum:10];
NSArray *temArr = @[template1, template2];
MVNativeAdManager *adManager = [[MVNativeAdManager alloc] initWithUnitID:unit_native fbPlacementId:fb_id supportedTemplates:temArr autoCacheImage:YES adCategory:0 presentingViewController:self];
adManager.delegate = self;

//初始化MVNativeAdManager方法3    轮播
MVTemplate *template1 = [MVTemplate templateWithType:MVAD_TEMPLATE_BIG_IMAGE adsNum:1];
MVTemplate *template2 = [MVTemplate templateWithType:MVAD_TEMPLATE_ONLY_ICON adsNum:10];
NSArray *temArr = @[template1, template2];
MVNativeAdManager *adManager = [[MVNativeAdManager alloc] initWithUnitID:unit_native fbPlacementId:fb_id frameNum:2 supportedTemplates:temArr autoCacheImage:YES adCategory:0 presentingViewController:self];
adManager.delegate = self;

//预加载广告方法1    基础用法
[[MVSDK sharedInstance] preloadNativeAdsWithUnitId:unit_native fbPlacementId:fb_id forNumAdsRequested:num];

//预加载广告方法2    在基础用法基础上增加了多模板和是否自动缓存图片的功能
MVTemplate *template1 = [MVTemplate templateWithType:MVAD_TEMPLATE_BIG_IMAGE adsNum:1];
MVTemplate *template2 = [MVTemplate templateWithType:MVAD_TEMPLATE_ONLY_ICON adsNum:10];
NSArray *temArr = @[template1, template2];
[[MVSDK sharedInstance] preloadNativeAdsWithUnitId:unit_native fbPlacementId:fb_id supportedTemplates:temArr autoCacheImage:YES adCategory:0];

//预加载广告方法3    轮播
MVTemplate *template1 = [MVTemplate templateWithType:MVAD_TEMPLATE_BIG_IMAGE adsNum:1];
MVTemplate *template2 = [MVTemplate templateWithType:MVAD_TEMPLATE_ONLY_ICON adsNum:10];
NSArray *temArr = @[template1, template2];
[[MVSDK sharedInstance] preloadNativeFramesWithUnitId:unit_native fbPlacementId:fb_id supportedFrameTemplates:temArr autoCacheImage:YES adCategory:0 frameNum:10];
注意：轮播广告必须实现的代理
1）Native load Frame 成功回调后需要调用setDataList方法(把数据加载到MVNativeScrollView)：
- (void)nativeFramesLoaded:(NSArray *)nativeFrames
{
    [self.nativeScrollView setDataList:nativeFrames];
}
- (void)nativeFramesFailedToLoadWithError:(NSError *)error
{
    [self log:[NSString stringWithFormat:@"Failed to load frame ads, error:%@", error.domain]];
}

2）MVNativeFrameScrollView的delegate(显示轮播广告)：
- (void)customFrameViewWithSuperView:(nonnull UIView *)superView nativeFrame:(nonnull MVFrame *)nativeFrame atIndex:(NSUInteger)index
{
    //将每一帧数据展示在轮播控件上
}


//加载广告
[adManager loadAds];

//将广告注册到View上
[adManager registerViewForInteraction:self.nativeDemoView withCampaign:self.currentAd];

//将广告和View解除注册
[adManager unregisterView:self.nativeDemoView];
```

## AppWall接入方法

* 集成流程

```flow
st=>start: 初始化MVSDK
e=>end: 结束
addFile=>operation: 添加相应头文件
initNative=>operation: 初始化AppWall
preloadAds=>operation: 预加载广告
loadAds=>operation: 加载广告
entrance=>operation: 设置AppWall入口
custom=>operation: 定制AppWall

st->addFile->initNative->preloadAds->entrance->custom->e
```

* 1.确保SDK已经初始化。
* 2.`#import <MVSDK/MVWallAdManager.h>`
* 3.初始化MVWallAdManager
* 4.可以通过MVSDK的`- (void)preloadAppWallAdsWithUnitId:(nonnull NSString *)unitId`方法来预加载数据，提高数据显示速度。
* 5.通过MVWallAdManager的`- (void)loadWallIconToView:(nonnull UIView *)view withIconImage:(nonnull UIImage *)image`的方法设置广告墙的入口。传过来的view可以是一个空view，由SDK来添加入口图片和小红点。开发者也可以将传过来的view其中的subview指定tag，从而让SDK替换其图片和控制小红点。例如：将view其中一个子subview的tag设置为TAG_IMAGEVIEW，SDK将认为此view为入口图片的view，将在程序运行时替换其图片，如果将view其中另外一个子subview的tag设置为TAG_REDVIEW，SDK将认为此view为小红点的view，将在程序运行时依据小红点的规则控制其显隐。第一种方法较为简单方便，第二种方法更加灵活。
* 6.广告墙的样式可通过一系列API进行一定程度上的定制。
* 7.如果MVWallAdManager在程序中作为临时变量创建，当墙的入口加载到view中之后，当前MVWallAdManager占用的内存将随着view的销毁而销毁。如果MVWallAdManager是作为全局变量创建，墙的入口加载到view中之后，MVWallAdManager的retain count加1，则view销毁后，MVWallAdManager的retain count减1。

* **Sample：**

```//初始化MVNativeAdManager (用modal的方式展示)
MVWallAdManager *adManager = [[MVWallAdManager alloc] initWithUnitID:unitid_wall presentingViewController:self];

//初始化MVNativeAdManager (用push的方式展示)
MVWallAdManager *adManager = [[MVWallAdManager alloc] initWithUnitID:unitid_wall withNavigationController:self];

//预加载广告
[[MVSDK sharedInstance] preloadAppWallAdsWithUnitId:unitid_wall];

//将view设置为App Wall入口
[adManager loadWallIconToView:self.appWallView withDefaultIconImage:[UIImage imageNamed:@"appwall-icon.jpg"]];

//定制化App Wall界面
[adManager setAppWallTitle:@"YOYOYO" titleColor:customWhiteColor];
[adManager setAppWallNavBarTintColor:ColorFromRGB(121, 112, 206)];
```

**## 返回的数据格式 MVCampaign**
* @property (nonatomic, copy  ) NSString       *adId;//广告id
* @property (nonatomic, copy  ) NSString       *packageName;//软件appstore的appid
* @property (nonatomic, copy  ) NSString       *appName;//app的名字
* @property (nonatomic, copy  ) NSString       *appDesc;//app的描述
* @property (nonatomic, copy  ) NSString       *appSize;//app的大小
* @property (nonatomic, copy  ) NSString       *iconUrl;//广告app的logo地址
* @property (nonatomic, copy  ) NSString       *imageUrl;//广告的大图地址
* @property (nonatomic, copy  ) NSString       *adCall;//广告点击按钮的描述文字
* @property (nonatomic, assign) MVAdSourceType type;//广告来源
* @property (nonatomic, assign) double      timestamp;//时间戳
* @property (nonatomic,assign) MVAdTemplateType dataTemplate;//广告的模板信息

## RewardVideo接入方法

* 集成流程

```flow
st=>start: 初始化MVSDK
e=>end: 结束
addFile=>operation: 添加相应头文件
loadAds=>operation: 请求视频广告
showAds=>operation: 展示视频广告
reward=>operation: 奖励用户
readyToPlay=>condition: 下载成功

st->addFile->loadAds->readyToPlay->showAds->reward->e
readyToPlay(yes)->showAds
readyToPlay(no)->loadAds
```

* 1.确保SDK已经初始化。
* 2.`#import <MVSDK/MVRewardAdManager.h> #import <MVSDK/MVRewardAdInfo.h>`
* 3.初始化MVRewardAdManager,使用`+ (nonnull instancetype)sharedInstance`
* 4.可以通过MVRewardAdManager的`- (void)loadVideo:(nonnull NSString *)unitId delegate:(nullable id <MVRewardAdLoadDelegate>)delegate;`方法来请求视频广告。
* 5.通过MVRewardAdManager的`- (BOOL)isVideoReadyToPlay:(nonnull NSString *)unitId;`的方法去判断视频广告是否已经下载成功，如果返回成功，请使用`- (void)showVideo:(nonnull NSString *)unitId withRewardId:(nonnull NSString *)rewardId delegate:(nullable id <MVRewardAdShowDelegate>)delegate viewController:(nonnull UIViewController*)viewController;`展示视频广告，如果返回失败，就放弃这次视频展示机会。
* 6.可以通过MVRewardAdShowDelegate来得到激励信息（MVRewardAdInfo），可以通过`- (void)onVideoAdDismissed:(nullable NSString *)unitId withConverted:(BOOL)converted withRewardInfo:(nullable MVRewardAdInfo *)rewardInfo;`中的MVRewardAdInfo来奖励用户

* **Sample：**

```//Load Video
- (IBAction)loadVideoButtonAction:(id)sender
{
    [self log:@"Reward video is loading"];

    [[MVRewardAdManager sharedInstance] loadVideo:KRewardUnitID delegate:self];
}

//Check isReady before you show a reward video
    if ([[MVRewardAdManager sharedInstance] isVideoReadyToPlay:KRewardUnitID]) {
        [self log:@"Show reward video ad"];

//Show Video
        [[MVRewardAdManager sharedInstance] showVideo:KRewardUnitID withRewardId:KRewardID delegate:self viewController:self];
    }
    else {
        //We will help you to load automatically when isReady is NO

        [self log:[NSString stringWithFormat:@"No ad to show"]];
    }
```

##API
###初始化MVSDK
* `- (void)setAppID:(nonnull NSString *)appID ApiKey:(nonnull NSString *)apiKey;`	设置AppID和AppKey，此方法必须被设置。

 
###广告源数据相关    

####MVTemplate	开发者想要一次展示的广告数
*  属性
	* *templateType*	template类型，MVAD_TEMPLATE_ONLY_ICON为图标，如果此时不需要image，则只需选择MVAD_TEMPLATE_ONLY_ICON便可；如果需要image，则需选择MVAD_TEMPLATE_BIG_IMAGE，此时既包含图标，也包含image
	* *adsNum*	template中返回的广告数量

* 方法
`+ (MVTemplate *)templateWithType:(MVAdTemplateType)templateType adsNum:(NSUInteger)adsNum;`	开发者想要返回的template类型及数量
  
####MVCampaign	广告源信息       
* 枚举    

	* *MVAdSourceType* 		枚举，广告源类型
	* *MVAdTemplateType* 	枚举，数据模型

* 属性

	* *adId*					广告的ID
	* *packageName*		包名
	* *appName*				app的名字
	* *appDesc*				app的描述信息
	* *appSize*				app的尺寸大小
	* *iconUrl*				app的icon
	* *imageUrl*			app的image
	* *adCall*				点击按钮
	* *type*					广告源类型
	* *timestamp*			时间戳
	* *dataTemplate*		template类型

* 方法
	* `- (void)loadIconUrlAsyncWithBlock:(void (^)(UIImage *image))block;`	从网络中加载或从缓存中返回icon
	* `- (void)loadImageUrlAsyncWithBlock:(void (^)(UIImage *image))block;`	从网络中加载或从缓存中返回image

####MVFrame	数据模板，用来承载帧数据
* 属性
	* *templateType*	template类型
	* *sourceType*	帧广告的数据源类型
	* *timestamp*		时间戳
	* *frameId*		ID
	* *nativeAds*		包含帧广告的native广告数组

###native类型广告
####MVNativeAdManager
* 预加载

	* `- (void)preloadNativeAdsWithUnitId:(nonnull NSString *)unitId
                     fbPlacementId:(nullable NSString *)fbPlacementId
                forNumAdsRequested:(NSUInteger)numAdsRequested;`	预加载native类型的广告数据，老版本中的方法，已不再使用。
	* `- (void)preloadNativeAdsWithUnitId:(nonnull NSString *)unitId
                     fbPlacementId:(nullable NSString *)fbPlacementId
                supportedTemplates:(nullable NSArray *)templates
                    autoCacheImage:(BOOL)autoCacheImage
                        adCategory:(MVAdCategory)adCategory;`	预加载native类型的广告数据，非轮播方式，一般较常用
	* `- (void)preloadNativeFramesWithUnitId:(nonnull NSString *)unitId
                        fbPlacementId:(nullable NSString *)fbPlacementId
              supportedFrameTemplates:(nullable NSArray *)templates
                       autoCacheImage:(BOOL)autoCacheImage
                           adCategory:(MVAdCategory)adCategory
                             frameNum:(NSUInteger)frameNum;`	预加载native类型的广告，轮播方式

* 可调用的方法
	* `- (nonnull instancetype)initWithUnitID:(nonnull NSString *)unitId
                         fbPlacementId:(nullable NSString *)fbPlacementId
                    forNumAdsRequested:(NSUInteger)numAdsRequested
              presentingViewController:(nullable UIViewController *)viewController;`	初始化native类型的广告信息，目前已不再使用
  	* `- (nonnull instancetype)initWithUnitID:(nonnull NSString *)unitId
                         fbPlacementId:(nullable NSString *)fbPlacementId
                    supportedTemplates:(nullable NSArray *)templates
                        autoCacheImage:(BOOL)autoCacheImage
                            adCategory:(MVAdCategory)adCategory
              presentingViewController:(nullable UIViewController *)viewController;`	初始化native类型的广告信息
   * `- (void)loadAds;`	加载native类型的广告
   * `- (nonnull instancetype)initWithUnitID:(nonnull NSString *)unitId
                         fbPlacementId:(nullable NSString *)fbPlacementId
                              frameNum:(NSUInteger)frameNum
                    supportedTemplates:(nullable NSArray *)templates
                        autoCacheImage:(BOOL)autoCacheImage
                            adCategory:(MVAdCategory)adCategory
              presentingViewController:(nullable UIViewController *)viewController;`	初始化native类型中的轮播广告信息
  	* `- (void)loadFrames;`	加载native类型的轮播广告
  	* `- (void)registerViewForInteraction:(nonnull UIView *)view
                      withCampaign:(nonnull MVCampaign *)campaign;`	注册，将campaign和展示campaign的UIView关联起来
   * `- (void)unregisterView:(nonnull UIView *)view;`	解除关联
   * `- (void)registerViewForInteraction:(nonnull UIView *)view
                withClickableViews:(nonnull NSArray *)clickableViews
                      withCampaign:(nonnull MVCampaign *)campaign;`	注册，将campaign和展示campaign的UIView关联起来，并且设置点击范围
   * `- (void)unregisterView:(nonnull UIView *)view clickableViews:(nonnull NSArray *)clickableViews;`	解除关联
* 回调信息（回调信息均可选）
	* `- (void)nativeAdsLoaded:(nullable NSArray *)nativeAds;`	广告加载成功
	* `- (void)nativeAdsFailedToLoadWithError:(nonnull NSError *)error;`	广告加载失败
	* `- (void)nativeFramesLoaded:(nullable NSArray *)nativeFrames;`	轮播广告加载成功
	* `- (void)nativeFramesFailedToLoadWithError:(nonnull NSError *)error;`	轮播广告加载失败
	* `- (void)nativeAdDidClick:(nonnull MVCampaign *)nativeAd;`	广告被点击
	* `- (void)nativeAdClickUrlWillStartToJump:(nonnull NSURL *)clickUrl;`	广告开始解析
	* `- (void)nativeAdClickUrlDidJumpToUrl:(nonnull NSURL *)jumpUrl;`	广告跳到一个新的网址
	* `- (void)nativeAdClickUrlDidEndJump:(nullable NSURL *)finalUrl
                             error:(nullable NSError *)error;`	最终的网址
                             
####MVNativeScrollView
* 方法
	* `- (nonnull MVNativeScrollView *)initWithFrame:(CGRect)frame unitId:(nonnull NSString *)unitId;`	初始化
	* `- (void)setDataList:(nonnull NSArray *)nativeFrames;`	包含帧数据的数组
* 回调
	`- (void)customFrameViewWithSuperView:(nonnull UIView *)superView nativeFrame:(nonnull MVFrame *)nativeFrame atIndex:(NSUInteger)index;`	每有一个view加入父视图是会被调用
                             
###AppWall类型的广告
* 预加载

	* `- (void)preloadAppWallAdsWithUnitId:(nonnull NSString *)unitId;`	预加载墙类型的广告数据 

* 属性
	* *fbPlacementId*	Facebook的PlacementID，用来请求Facebook的广告。
* 方法
	* `- (nonnull instancetype)initWithUnitID:(nonnull NSString *)unitId
              presentingViewController:(nullable UIViewController *)viewController;`	通过ViewController初始化
	* `- (nonnull instancetype)initWithUnitID:(nonnull NSString *)unitId
              withNavigationController:(nullable UINavigationController *)navController;`		通过NavigationController初始化
	* `- (void)showAppWall;`	展示墙
	* `- (void)loadWallIconToView:(nonnull UIView *)view withDefaultIconImage:(nonnull UIImage *)image;`	加载墙入口图片
	* `- (void)setAppWallNavBarTintColor:(nonnull UIColor *)color;`	设置导航栏的背景色
	* `- (void)setAppWallNavBarBackgroundImage:(nonnull UIImage *)image;`	设置导航栏的背景图
	* `- (void)setAppWallTitle:(nonnull NSString *)title
             titleColor:(nonnull UIColor *)color;`	设置墙的标题以及标题颜色
	* `- (void)setAppWallTitleImage:(nonnull UIImage *)image;`	墙的导航栏标题处的图片
	* `- (void)setAppWallCloseButtonImage:(nonnull UIImage *)image
                  highlightedImage:(nullable UIImage *)highlightedImage;`	设置墙的关闭按钮的图片，以及关闭按钮的状态    
                  
###MVRewardAdManager类型的广告
* 方法
	* `- (void)loadVideo:(nonnull NSString *)unitId delegate:(nullable id <MVRewardAdLoadDelegate>)delegate;`	加载video
	* `- (void)showVideo:(nonnull NSString *)unitId withRewardId:(nonnull NSString *)rewardId delegate:(nullable id <MVRewardAdShowDelegate>)delegate viewController:(nonnull UIViewController*)viewController;`	展示video
	* `- (BOOL)isVideoReadyToPlay:(nonnull NSString *)unitId;`	判断是否广告已加载好并且可以被展示
* Load的回调
	* `- (void)onVideoAdLoadSucceed:(nullable NSString *)unitId;`	视频广告加载成功
	* `- (void)onVideoAdLoadFailed:(nullable NSString *)unitId error:(nonnull NSError *)error;`	视频广告加载失败
* Show的回调   
	* `- (void)onVideoAdShowSucess:(nullable NSString *)unitId;`	视频广告展示成功
	* `- (void)onVideoAdShowFaild:(nullable NSString *)unitId withError:(nonnull NSError *)error;`	视频广告展示失败
	* `- (void)onVideoAdDismissed:(nullable NSString *)unitId withConverted:(BOOL)converted withRewardInfo:(nullable MVRewardAdInfo *)rewardInfo;`	视频广告展示完成后的奖励相关信息
* MVRewardAdInfo
	* *rewardId*		奖励的ID
	* *rewardName*		奖励名称
	* *rewardAmount*	奖励数量                      
              
##changeLog

版本号 | changeLog | 发布时间
------|-----------|------
1.0.0 |  提供native和墙的广告展现形式 | 1月5日
1.0.1 | 为c360新增registview去重逻辑 | 1月14日
1.0.2 | 增加墙的push方式，迁移数据库，ios6兼容 | 1月22日
1.0.3 | 增加msg字段为空时崩溃兼容，多并发adsource偶发崩溃兼容 | 1月28日
1.1.0 | 1.增加setting接口传deviceinfo	2.增加点击优化中webview解析		3.增加缓存时间有服务端控制			4.预点击时机由服务端控制				5.墙中增加fb轮播						6.墙中改为用onlyimpression统计pv	7.增加多模板的概念 | 2月29日
1.1.1 | 修复c360反馈的崩溃问题，apimanager中并发处理时的偶发崩溃 | 3月2日
1.2.0 | 1.增加轮播控件并聚合fb	2.增加服务端控制cta字段	3.墙大卡位置点击按钮闪动控制	4.增加图片自动缓存功能	5.轮播统计日志上传广告位展示pv	6.preload的api和fb请求数量分开受服务端控制 | 3月7日
1.2.2 | 1.增加对Facebook&Instagram的URLScheme判断（SDK只针对iOS7、8生效，iOS9由于系统本身机制原因无法判断）	2.registerview新增API，支持同时注册多个view	3.广告源请求耗时上报 | 3月9日
1.2.3 | 1.统一了请求API广告和第三方广告的数量相关的对外的接口 | 3月16日
1.2.4 | 1.修复了传viewController为nil时可能会造成崩溃的bug | 3月21日
1.2.5 | 1.修复了多线程偶发的请求崩溃，包括setting，preclick和nativeadrequest中的隐患 | 3月31日
1.2.6 | 1.API和第三方广告并行请求 2.缓存逻辑优化 | 4月6日
1.3.0 | 1.聚合了NativeX和AppLovin的激励性视频广告 2.请求广告时区分了preload和load | 5月11日
1.3.1 | 1.预点击去重 2.AppWall入口是否隐藏可由服务端控制 3.Landing Type为3时的处理 | 5月23日


##Q&A List

* 集成类
	* preload时机问题
		* answer：建议每次热启动时preload，不同（- (void)applicationDidBecomeActive:(UIApplication *)application ）
	* 为何要做preload
		* answer：preload预加载数据，提升load加载数据的效率，提升用户体验
	* 关于app wall是否隐藏的问题
		* 建议做app wall审核时隐藏的控制，避免因为app wall的原因审核被拒
	* 跳转appstore很慢的问题
		* answer：由于跳转中间要跳好多次，所以第一次会比较慢，第二次有了点击缓存，会快很多
	* demo中的facebook、admob、applovin、nativex
		* answer：均是广告的sdk，其中applovin和nativex是视频类广告，这些广告，如果开发者不想集成，可以不考虑

* 广告类
	* 拉取不到广告
		* AppID、ApiKey、unitID、placementID信息不匹配，后台单子没有放
	* 广告源下发数量问题
		* answer：某个地区的广告源数量为各个广告主想要投放此地区广告的数量总和，当请求的广告数超出此数量时，下发的广告数量以此地区广告数量总数为准
	* offer中出现两种语言
		* answer：由于根据ip等信息判断区域，所以offer中会出现英文和对应区域的语言
	* app下载不下来
		* answer：appstore网络问题或者apple账号可能不是vpn去的国家
	* 墙中的install now按钮的展示语言问题
		* 只支持英文
	* 有关的一些错误信息
		* *kMVErrorCodeNoAds*	获取不到广告，请查看AppID、ApiKey、unitID、placementID等信息是否填写正确，并且查看后台单子是否已经发放
		* *kMVErrorCodeConnectionLost*	网络连接问题，请检查网络
		* *kMVErrorCodeURLisEmpty*	网址为空，单子错误

![Alt text](data:image/gif;base64,R0lGODlhNgH6APcAAElJSXd3d/n5+aqMe+3t7fnj2LNyZvHx8eLi4RdzAkWTMHplWbWWhD49Petrp/GawbvIqqxcUuxyq/vt5JKFfPX19c3NzZucclhYWOW8pexcnfCTvdvb2+rq6m6JWLFnXOza2MLCwuxtqdPT05OTk6wBAa2treJLk21XTuxjpPPLtIarbxgXFu6DtNqzqfGHt85NTSknJ7ulk5+og8ilkdCmm8I2OUsnLfnS5L6+vpycnJkCAvz8/GxsbL6CecIkK+PIxMamoV2WSKJDPoNtWPz08ezCq2qiVNu9ubOzs6SkpIGBgSh7FZgyLJR4a/vx6+2LuGFiYfOoy+WvnYo1XYqKipS0fcaPh3SXXU9COva51dOrpsOKge18sLMXHPCOu7wkKPfby+zl1Tp5IsNYVvbVwuVamwcGBpVRSdBYVjOCIpVrY6xCdOKOiex3rtvKx0uKOcF8cpR9cyF4DawUFb8xNN9IkNKWhEp7Mbq6uvB6sMmXkfTOue1TnfXRvC6BG9talf7+/ot0Zv36+NSwm8I+QO5aodRmZL91beRQlrQDAvvayrcdIbdZhf349WB6TTuELcCzn8RRhvTo45kYFe1WnuNVmf3t9dZpnZ+DdOjSz/Di4KVJQ3pSLl1MRIqFdcJISEKQLXguUf78/NSGgfTFt6UrJ8NqZehWmaoyLu6It8lCRMRCQ9vcxJ0JCTAsKDV3Hz+JKsAtMcNHgstRUB0cGz2NKKG8iqNTS+bm5nqhYzmKJD9JM/GWv/CCtOhfn+91rvrUxag/OcCfjSIhIOdlo7yzndRxbdx6d1eHQOzAuP78+vTSyzWHIfOfxvDHrz4zLfjf0PbYxuV2qlOaPdygkjIVIupXnPXs65sPDpZJbUGFMPjA2udRmL6um/75/Pvi7hIREQ0MDCIOFzaEKK+ukf/+/u5/sk5ZQP7z+NtuoacOD7QODDIyMtNeXX2DaMfHx+lnpOHY18tHSMC0oJ4iHz19Jmt5QIVuYZuPdNBJidFWjvPJsejo6AAAAP///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQxQzdEMkFDNkQ5OTExRTI4RDcwRTU3RDdCN0Q2MDBFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQxQzdEMkFENkQ5OTExRTI4RDcwRTU3RDdCN0Q2MDBFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RkI2OTJFRkY2RDk3MTFFMjhENzBFNTdEN0I3RDYwMEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RkI2OTJGMDA2RDk3MTFFMjhENzBFNTdEN0I3RDYwMEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMi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)
