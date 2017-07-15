# 学习资料
- [官方教程](https://cn.vuejs.org/v2/guide/)
- [Vue 2.0 构建单页应用最佳实战](https://gold.xitu.io/post/583d1fe00ce463006baca2fa)
- [推荐五个Vue2的免费教程](https://gold.xitu.io/post/584cc93b8e450a006ac2196d)
- [Element](http://element.eleme.io/1.2/#/zh-CN)

## [vux](https://vuex.vuejs.org/zh-cn/getting-started.html)

## [vue-router](https://router.vuejs.org/zh-cn/)

### 多个视图

如果 router-view 没有设置名字，那么默认为 default。

```html
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```

一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 components 配置（带上 s）

```js
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
```
