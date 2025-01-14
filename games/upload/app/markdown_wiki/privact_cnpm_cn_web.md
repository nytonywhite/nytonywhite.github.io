## 内网私有CNPM使用

### 访问地址：

访问的地址是：http://192.168.9.65:7002/ <br/>
镜像地址是：http://192.168.9.65:7001/ <br/>

### 一、设置镜像

1、设置npm的全局镜像地址为内网的镜像：<br/>
npm config set registry http://192.168.9.65:7001/

OR

指定单个安装包的镜像方式，把下载的镜像指向内网环境：<br/>
npm install -g cnpm --registry=http://192.168.9.65:7001/

2、镜像管理工具： nrm (推荐使用)

先安装[nrm](https://www.npmjs.com/package/nrm),详情使用点击看官网：<br/>
npm i nrm -g

3、CNPM 代替 npm （推荐使用）

安装cnpm:<br/>
npm i cnpm -g

设置全局镜像：<br/>
cnpm config set registry http://192.168.9.65:7001/

### 二、工具cnpm与npm区别
1、目前公司搭建的是内网私有cnpm，可以上传公司自己开发的工具包，外网不能访问，所以要把镜像全部指向内网镜像；

2、由于要把npm官网的所有包全部下载下来，成本太高，估计硬盘需要2T，而且服务器还要集群才能承受得起，而且我们用到的包只是NPM的官网的少量包，所以没有必要全部下载，目前使用的方式的是按需下载，当下载包时，发现私有cnpm上没有这样包，自动到淘宝的cnpm镜像下载当前包的所有版本，并且自动同步私有的cnpm上，后续私有的cnpm就会自动同步更新，想了解更多详细的机制可以上网找资料看一下;

3、npm是机制是到官网取包，如果找不到包就会返回错误信息，或者超时信息，所以用npm下载指向内网私有的cnpm时，如果发现找不到包，不会等待私有的cnpm同步，就会自动返回错误信息，一但私有cnpm同步完成，再用npm安装即可成功；

4、cnpm的机制是解决npm错误不等待的问题，当指向镜像指向私有cnpm时，下载过程如果发现私有cnpm没有这样的包就会等待上游(淘宝的cnpm镜像)返回的包，然后安装，但cnpm也有报错的时候，如果下载的包过大(例如首次cnpm install, package.json N多个包，而且每个包N多个版本)，或者找不到包也是会出现错误；

5、当私有的cnpm的包同步的包越来越多，用npm或者cnpm安装出现找不到包或者出错的机率就会大大减少；

### 三、私有包上传

帐号：admin <br/>
密码：admin <br/>
邮箱：jinliang.xuan@mobvista.com <br/>

1、上传的帐号统一，目的是每个人都有修改包的权限；

2、后续有时间会尝试开发工具，当git合并master或者develop时，自动同步私有包到私有cnpm，保持cnpm的私有包为最新版本，目前先手动上传。<br/>
例子：http://192.168.9.65:7002/package/mv-frontend

3、后续package.json的包下载不需要再写：<br/>
"mv-frontend": "git+ssh://git@gitlab.mobvista.com:frontend/mv-frontend.git#44e3780a86928273607b9b301f50fc95e5904478"

改成：<br/>
"mv-frontend": “^1.0.2”


