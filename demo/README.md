# 全栈开发实战：用Vue2+Koa1开发完整的前后端项目

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 学习笔记

#### 简介

本文从一名新手的角度（默认对Vue有了解，对Koa或者Express有了解）出发，从0开始构建一个数据通过Koa提供API的形式获取，页面通过Vue渲染的完整的前端项目。可以了解到Vue构建单页面的一些知识以及前端路由的使用、Koa如何提供API接口，如何进行访问过滤（路由）、验证（JSON-WEB-TOKEN）以及Sequelize操作MySQL数据库的一些知识和技巧，希望能够作为一篇入门全栈开发的文章吧


#### Sequelize

在用Sequelize连接数据库之前我们需要把数据库的表结构用sequelize-auto导出来。

由此我们需要分别安装这几个依赖：`yarn global add sequelize-auto && yarn add sequelize mysql`。

进入server的目录，执行如下语句`sequelize-auto -o "./schema" -d todolist -h 127.0.0.1 -u root -p 3306 -x XXXXX -e mysql`，（其中 -o 参数后面的是输出的文件夹目录， -d 参数后面的是数据库名， -h 参数后面是数据库地址， -u 参数后面是数据库用户名， -p 参数后面是端口号， -x 参数后面是数据库密码，这个要根据自己的数据库密码来！ -e 参数后面指定数据库为mysql）

#### JSON-WEB-TOKEN

基于cookie或者session的登录验证已经屡见不鲜，前段时间JSON-WEB-TOKEN出来后很是风光了一把。引入了它之后，能够实现真正无状态的请求，而不是基于session和cookie的存储式的有状态验证。

> Tips：JSON-WEB-TOKEN分三部分，头部信息+主体信息+密钥信息，其中主体传递的信息
> （是我们存放我们需要的信息的部分）是用BASE64编码的，所以很容易被解码，一定不
> 能存放明文密码这种关键信息！替代地可以存放一些不是特别关键的信息，比如用户名
> 这样能够做区分的信息。

简单来说，运用了JSON-WEB-TOKEN的登录系统应该是这样的：

1. 用户在登录页输入账号密码，将账号密码（密码进行md5加密）发送请求给后端
2. 后端验证一下用户的账号和密码的信息，如果符合，就下发一个TOKEN返回给客户端。如果不符合就不发送TOKEN回去，返回验证错误信息。
3. 如果登录成功，客户端将TOKEN用某种方式存下来（SessionStorage、LocalStorage）,之后要请求其他资源的时候，在请求头（Header）里带上这个TOKEN进行请求。
4. 后端收到请求信息，先验证一下TOKEN是否有效，有效则下发请求的资源，无效则返回验证错误。

通过这个TOKEN的方式，客户端和服务端之间的访问，是无状态的：也就是服务端不知道你这个用户到底还在不在线，只要你发送的请求头里的TOKEN是正确的我就给你返回你想要的资源。这样能够不占用服务端宝贵的空间资源，而且如果涉及到服务器集群，如果服务器进行维护或者迁移或者需要CDN节点的分配的话，无状态的设计显然维护成本更低。


#### 引入Axios

之前在学Vue的时候一直用的是vue-resource，不过后来Vue2出来之后，Vue官方不再默认推荐它为官方的ajax网络请求库了。替代地推荐了一些其他的库，比如就有我们今天要用的axios。我之前也没有用过它，不过看完它的star和简要介绍Promise based HTTP client for the browser and node.js，能够同时支持node和浏览器端的ajax请求工具（还是基于Promised的！），我想就有必要用一用啦。

```js
import Axios from 'axios'

Vue.prototype.$http = Axios // 类似于vue-resource的调用方法，之后可以在实例里直接用this.$http.get()等
```


#### 密码md5加密

同时，前端向后端发送的密码应当进行md5加密。

所以我们需要安装一下md5的库： `yarn add md5`

```js
import md5 from 'md5'

export default {
  data () {
    return {
      account: '',
      password: ''
    };
  },
  methods: {
    loginToDo() {
      let obj = {
        name: this.account,
        password: md5(this.password) // md5加密
      }
      ...
    }
    ...
  }
}
```

因为我们数据库里还是存着明文的123作为密码，现在要先将它md5化，32位md5加密后变为：202cb962ac59075b964b07152d234b70，将其替换掉数据库里的123。不做这步我们将无法登录。


因为我们的界面跑在8080端口，但是Koa提供的API跑在8889端口，所以如果直接通过/auth/user这个url去post是请求不到的。就算写成localhost:8889/auth/user也会因为跨域问题导致请求失败。

这个时候有两种最方便的解决办法：

如果是跨域，服务端只要在请求头上加上CORS，客户端即可跨域发送请求。
变成同域，即可解决跨域请求问题。
第一种也很方便，采用kcors即可解决。
不过为了之后部署方便，我们采用第二种，变成同域请求。

打开根目录下的config/index.js，找到dev下的proxyTable，利用这个proxyTable我们能够将外部的请求通过webpack转发给本地，也就能够将跨域请求变成同域请求了。

将proxyTable改写如下:
```js
proxyTable: {
  '/auth':{
    target: 'http://localhost:8889',
    changeOrigin: true
  },
  '/api':{
    target: 'http://localhost:8889',
    changeOrigin: true
  }
}
```
上面的意思是，我们在组件里请求的地址如果是/api/xxxx实际上请求的是http://localhost:8889/api/xxxx，但是由于webpack帮我们代理了localhost的8889端口的服务，所以我们可以把实际是跨域的请求当做是同域下的接口来调用。

#### 跳转拦截

虽然我们现在能够成功登录系统了，但是还是存在一个问题：我在地址栏手动将地址改为localhost:8080/todolist我还是能够成功跳转到登录后的界面啊。于是这就需要一个跳转拦截，当没有登录的时候，不管地址栏输入什么地址，最终都重新定向回登录页。

这个时候，从后端给我们传回来的token就派上大用处。有token就说明我们的身份是经过验证的，否则就是非法的。

vue-router提供了页面跳转的钩子，我们可以在router跳转前进行验证，如果token存在就跳转，如果不存在就返回登录页。

```js
const router = new VueRouter({....}) // 省略

router.beforeEach((to,from,next) =>{
  const token = sessionStorage.getItem('demo-token');
  if(to.path == '/'){ // 如果是跳转到登录页的
    if(token != 'null' && token != null){
      next('/todolist') // 如果有token就转向todolist不返回登录页
    }
    next(); // 否则跳转回登录页
  }else{
    if(token != 'null' && token != null){
      next() // 如果有token就正常转向
    }else{
      next('/') // 否则跳转回登录页
    }
  }
})

const app = new Vue({...}) // 省略
```

> 注意：一定要确保要调用 next() 方法，否则钩子就不会被 resolved。
> 如果纯粹调用next(path)这样的方法最终还是会回到.beforeEach()
> 这个钩子里面来，如果没有写对条件就有可能出现死循环，栈溢出的情况。


解析token

注意到我们在签发token的时候，写过这样几句话：

```js
// ...
const userToken = {
  name: userInfo.user_name,
  id: userInfo.id
}
const secret = 'vue-koa-demo'; // 指定密钥，这是之后用来判断token合法性的标志
const token = jwt.sign(userToken,secret); // 签发token
// ...
```

我们将用户名和id打包进JWT的主体部分，同时我们解密的密钥是vue-koa-demo。所以我们可以通过这个信息，来进行登录后的用户名显示，以及用来区别这个用户是谁，这个用户有哪些Todolist。

接下来在Todolist页面进行token解析，从而让用户名显示为登录用户名。

```js
import jwt from 'jsonwebtoken' // 我们安装koa-jwt的时候会自动下载这个依赖

export default {
    ...
    methods: {
        getUserInfo(){ // 获取用户信息
            const token = sessionStorage.getItem('demo-token');
            if(token != null && token != 'null'){
                let decode = jwt.verify(token,'vue-koa-demo'); // 解析token
                return decode // decode解析出来实际上就是{name: XXX,id: XXX}
            }else {
                return null
            }
        }
    }
    ...
}
```

#### Koa serve静态资源

yarn add koa-static

打开app.js，引入两个新依赖，其中path是nodejs原生自带。

```js
// app.js

// ....
const path =require('path')
    , serve = require('koa-static');
// ....

// 静态文件serve在koa-router的其他规则之上 
app.use(serve(path.resolve('dist'))); // 将webpack打包好的项目目录作为Koa静态文件服务的目录

// 下面这些是之前就有的。。。为了方便找位置故标示出来
koa.use('/auth', auth.routes());
koa.use("/api",jwt({secret: 'vue-koa-demo'}),api.routes()) 

// ...
```

然后重新运行一遍node app.js，看到输出Koa is listening in 8889后，你可以打开浏览器localhost:8889

#### router模式history

用了HTML5 的History模式，如果没有做其他任何配置的话，刷新页面，那么浏览器将会去服务端访问这个页面地址，因为服务端并没有配置这个地址的路由，所以自然就返回404 Not Found了。

该怎么解决？其实也很简单，多加一个中间件：koa-history-api-fallback即可.

`yarn add koa-history-api-fallback`

```js
//... 省略

const historyApiFallback = require('koa-history-api-fallback'); // 引入依赖

app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());
app.use(historyApiFallback()); // 在这个地方加入。一定要加在静态文件的serve之前，否则会失效。

// ...
```

#### API Test

本来写到上面基本本文已经算是结束了。但是由于我在开发的过程中遇到了一些问题，所以还需要做一些微调。

我们知道koa的use方法是有顺序只差的。


```js
const app = require('koa');
app.use(A);
app.use(B);


const app = require('koa');
app.use(B);
app.use(A);
```

这二者是有区别的，谁先被use，谁的规则就放到前面先执行。

因此如果我们将静态文件的serve以及historyApiFallback放在了api的请求之前，那么用postman测试api的时候总会先返回完整的页面

#### Nginx配置

真正部署到服务器的时候，我们肯定不会让大家输入域名:8889这样的方式让大家访问。所以需要用Nginx监听80端口，把访问我们指定域名的请求引导转发给Koa服务端。

大致的nginx.conf如下：

```conf
http {

  # ....
  upstream koa.server{
    server 127.0.0.1:8889;
  }

  server {
    listen   80;
    server_name xxx.xxx.com;

    location / {
      proxy_pass http://koa.server;
      proxy_redirect off;
    }

    #....
  }
  #....
}
```

如果有精力还可以配置一下Nginx的Gzip，能让请求的JS\CSS\HTML等静态文件更小，响应速度更快些。


#### 写在最后

至此，我们已经完成了一个从前端到后端，从本地到服务器的完整项目。虽然它真的是个很简单的小东西，被大家也已经用其他的方式写烂了（比如用localStorage做存储）。但是它作为一个完整的前后端的DEMO，我觉得让大家入门也相对更容易一些，能够体会到全栈开发也不是想象中的“那么难”（入门的难度还是可以接受的嘛）。有了Nodejs之后我们能够做的事真的好多！

当然，由于篇幅有限，本文能够讲述东西毕竟不够多，而且讲的东西也不可能面面俱到，很多东西都是点到即止，让大家能够自己发挥。其实还想讲讲Event Bus的简单使用，还有分页的基本实现等等，东西太多了，一时间大家消化不了。

实际上我在做前段时间的项目的时候，也是完全不知道怎么把Vue和Koa结合起来开发。我甚至不知道怎么用Koa来提供API，我只会用Koa来做服务端渲染，比如那些JADE\EJS等模板引擎渲染的页面。所以之前那个项目做完让我自己学到良多东西，故而也分享给大家。