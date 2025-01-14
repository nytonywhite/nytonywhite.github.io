#前端测试题 JavaScript方向

####1.正则表达式构造函数var reg=new RegExp(“xxx”)与正则表达字面量var reg=//有什么不同？请写一个用来匹配邮箱的正则表达式？
- [x]考察点1：对正则表达的应用，对于SDK中的内容搜索有提升效率的效果

答案：
```
当使用RegExp()构造函数的时候，不仅需要转义引号（即\”表示”），
并且还需要双反斜杠（即\\表示一个\）。使用正则表达字面量的效率更高。 
```

```javascript
var regMail = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;

/*

验证方式：
regMail.test('leemissen.feng@mobvista.com');  //输出true
regMail.test('#$333@qq.com'); //false

*/

```

---

####2.请按照年龄排序具有对象的数组：
- [x]考察点：算法或者api
```javascript
var team = [{
	name:'xiaoming',
	age:10,
	gender:'male'
},{
	name:'xiaohong',
	age:12,
	gender:'female'
},{
	name:'laochen',
	age:50,
	gender:'male'
},{
	name:'zhangdama',
	age:55,
	gender:'female'
},{
	name:'dingdang',
	age:5,
	gender:'female'
}];

```

```javascript
\\方法一： 证明懂冒泡排序
var max = 0;
for (var i = 0; i < team.length; i++){
	for (var j = 0; j < team.length - i-1; j++){
	console.log(j+'--'+i)
		if (team[j].age > team[j + 1].age){
			max = team[j + 1];
			team[j + 1] = team[j];
			team[j] = max;
		}
	}
}


\\方法二：  这个证明懂js api
team.sort(function(objA,objB){
	return objA.age - objB.age;
});

```
---
####3.定义一个log方法，让它可以代理console.log的方法
- [x]考察点：对方法的继承的应用

```javascript
\\一般做法
function log(msg)　{
    console.log(msg);
}


\\基于继承概念的做法，能够兼容对方所传的多函数
function log(){
    console.log.apply(console, arguments);
};

```

---

####4.实现一个函数clone，可以对JavaScript中的5种主要的数据类型（包括Number、String、Object、Array、Boolean）进行值复制
- [x]考察点1：对于基本数据类型和引用数据类型在内存中存放的是值还是指针这一区别是否清楚
- [x]考察点2：是否知道如何判断一个变量是什么类型的
- [x]考察点3：递归算法的设计

```javascript
// 方法一：
Object.prototype.clone = function(){
    var o = this.constructor === Array ? [] : {};
    for(var e in this){
            o[e] = typeof this[e] === "object" ? this[e].clone() : this[e];
    }
    return o;
}

//方法二：
function clone(Obj) {   
    var buf;   
    if (Obj instanceof Array) {   
        buf = [];                    //创建一个空的数组 
        var i = Obj.length;   
        while (i--) {   
            buf[i] = clone(Obj[i]);   
        }   
        return buf;    
    }else if (Obj instanceof Object){   
        buf = {};                   //创建一个空对象 
        for (var k in Obj) {           //为这个对象添加新的属性 
            buf[k] = clone(Obj[k]);   
        }   
        return buf;   
    }else{                         //普通变量直接赋值
        return Obj;   
    }   
}

```

---

####5.请评价以下代码并给出改进意见
- [x]考察点：对代码的阅读优化能力

```javascript
if(window.addEventListener){
    var addListener = function(el,type,listener,useCapture){
        el.addEventListener(type,listener,useCapture);
  };
}
else if(document.all){
    addListener = function(el,type,listener){
        el.attachEvent("on"+type,function(){
          listener.apply(el);
      });
   }  
}

```

```
评价：

　不应该在if和else语句中声明addListener函数，应该先声明；
　不需要使用window.addEventListener或document.all来进行检测浏览器，应该使用能力检测；
　由于attachEvent在IE中有this指向问题，所以调用它时需要处理一下
```

可以改为：
```javascript

function addEvent(elem, type, handler){
　　if(elem.addEventListener){
　　　　elem.addEventListener(type, handler, false);
　　}else if(elem.attachEvent){
　　　　elem['temp' + type + handler] = handler;
　　　　elem[type + handler] = function(){
　　　　elem['temp' + type + handler].apply(elem);
　　};
　　elem.attachEvent('on' + type, elem[type + handler]);　
  }else{
　　elem['on' + type] = handler;
　　}
}

```
