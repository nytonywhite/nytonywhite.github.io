#Mobvista Markdown 语法

```comment

此处为注释块，不在页面中渲染

```
##文章语法
###标题

```markdown

# 一级标题

## 二级标题

### 三级标题

```

# 一级标题

## 二级标题

### 三级标题

***


###列表
```markdown

* a
* b
* c

- d
- e
- f

1. g
2. h
3. i

```

* a
* b
* c

- d
- e
- f

1. g
2. h
3. i

***

###引用

```markdown

> 例如这样

```

> 例如这样

***




### 粗体与斜体

```markdown
*包含一段文本就是斜体的语法。*

**包含一段加粗的语法。**

```
*包含一段文本就是斜体的语法。*
**包含一段加粗的语法。**

***

###表格

```markdown

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| **col 3 is**  | right-aligned | $1600 |
| col 2 is      | *centered*    |   $12 |
| zebra stripes | ~~are neat~~  |    $1 |

```


| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| **col 3 is**  | right-aligned | $1600 |
| col 2 is      | *centered*    |   $12 |
| zebra stripes | ~~are neat~~  |    $1 |



***

### check list

```markdown

- [x] This task is done
- [ ] This is still pending

```

- [x] This task is done
- [ ] This is still pending


### 分割线

```markdown

***

```

***

###图片与链接

```markdown

![baidu picture](https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_ca79a146.png)



```

![baidu picture](https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_ca79a146.png)


***

###数学公式

```markdown
```math
The integral $\int f(x) dx = 0$
 ```

```

```math
The integral $\int f(x) dx = 0$
```


***

##图表类

### 流程图
```markdown
```chart

graph TB
    sq[方形] --> ci((原形))

    subgraph 一张图表
        od>缺角矩形]-- 两行<br>注释 --> ro
        di{方形中 <br/> 换行} -.-> ro(圆角<br>矩形1)
        di==>ro2(圆角<br>矩形2)
    end

    

     classDef green fill:#9f6,stroke:#333,stroke-width:2px;
     classDef orange fill:#f96,stroke:#333,stroke-width:4px;
     class sq,e green
     class di orange

 ```

```

```chart

graph TB
    sq[方形] --> ci((圆形))

    subgraph 一张图表
        od>缺角矩形]-- 两行<br>注释 --> ro
        di{方形中 <br/> 换行} -.-> ro(圆角<br>矩形1)
        di==>ro2(圆角<br>矩形2)
    end

    

     classDef green fill:#9f6,stroke:#333,stroke-width:2px;
     classDef orange fill:#f96,stroke:#333,stroke-width:4px;
     class sq,e green
     class di orange

```

***

### 时序图


```markdown
```chart

sequenceDiagram

    项目调研 ->> 需求审定: 提出需求
    需求审定 ->> 项目调研 : 否决需求
    需求审定-->>项目开发: 需求落地
    需求审定--x 部署上线: 追加需求
    需求审定->> 项目开发: 追加需求
    Note right of 项目开发: 项目部署时需要<br/>完成压力测试

    需求审定-->部署上线: 验证效果
    部署上线->>项目开发: 性能反馈

 ```

```

```chart
sequenceDiagram

    项目调研 ->> 需求审定: 提出需求
    需求审定 ->> 项目调研 : 否决需求
    需求审定-->>项目开发: 需求落地
    需求审定--x 部署上线: 追加需求
    需求审定->> 项目开发: 追加需求
    Note right of 项目开发: 项目部署时需要<br/>完成压力测试

    需求审定-->部署上线: 验证效果
    部署上线->>项目开发: 性能反馈

```

***

###甘特图

```markdown
```chart

gantt
    title A Gantt Diagram

    section Section
    A task           :a1, 2014-01-01, 30d
    Another task     :after a1  , 20d
    section Another
    Task in sec      :2014-01-12  , 12d
    anther task      : 24d

 ```

```

```chart
gantt
    title 甘特图示例

    section Section
    A task           :a1, 2014-01-01, 30d
    Another task     :after a1  , 20d
    section Another
    Task in sec      :2014-01-12  , 12d
    anther task      : 24d
    
```

***

### 代码块

```markdown
```javascript

var myWords = 'hello world!';
console.log(myWords);

 ```

```

```javascript

var myWords = 'hello world!';
console.log(myWords);

```






















