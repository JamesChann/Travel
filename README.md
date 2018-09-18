使用vue2.0全家桶实现旅游app（仿去哪儿网）
====

:sunny: 基于 Vue(2.5) + vuex + vue-router + vue-axios +better-scroll + ES6 等开发一款简单旅游 WebApp，flex 布局适配常见移动端

演示
===
:yum: 项目演示地址：[Travel](http://39.106.58.83/travel)，或者可以扫描二维码访问：

![github](https://github.com/James-Chann/preview/blob/master/Travel/travelUrl.png)

> :diamond_shape_with_a_dot_inside: 可以使用手机浏览器访问，最好使用谷歌浏览器，电脑请在 Chrome 调试模式开启手机模式下收听，如果不能滚动，刷新一下页面即可


预览
===

下面显示部分预览图，如果图片加载的慢，所以请耐心等待一下啦 :sweat_smile:。感觉不错的可以去上面 :point_up: 的地址体验一下呦~

<img width="280" height="473" src="https://github.com/James-Chann/preview/blob/master/Travel/pic01.png"/>&nbsp;&nbsp;&nbsp;<img  width="280" height="473" src="https://github.com/James-Chann/preview/blob/master/Travel/pic02.png"/>&nbsp;&nbsp;&nbsp;<img  width="280" height="473" src="https://github.com/James-Chann/preview/blob/master/Travel/pic03.png"/>

<img  width="280" height="473" src="https://github.com/James-Chann/preview/blob/master/Travel/pic04.png"/>&nbsp;&nbsp;&nbsp;<img  width="280" height="473" src="https://github.com/James-Chann/preview/blob/master/Travel/pic05.png"/>&nbsp;&nbsp;&nbsp;<img  width="280" height="473" src="https://github.com/James-Chann/preview/blob/master/Travel/pic06.png"/>

技术栈
===

<Strong></Strong>前端<Strong></Strong>

* ``` vue ``` 用于构建用户界面的 MVVM 框架。它的核心是响应的数据绑定和组系统件

* ``` vue-router ``` 为单页面应用提供的路由系统

* ``` vuex ``` Vue 集中状态管理，在多个组件共享某些状态时非常便捷

* ``` better-scroll ``` iscroll 的优化版，使移动端滑动体验更加流畅

* ``` ES6 ``` ECMAScript 新一代语法，模块化、解构赋值、Promise、Class 等方法非常好用

* ``` eslint ``` 使用eslint进行语法规则和代码风格的检查,保证写出语法正确、风格统一的代码

后端

* ``` Node.js ``` 利用 Express 搭建的本地测试服务器

* ``` vue-axios ``` 用来请求后端 API 旅游数据

最后
====

来过的帅哥美女们记得给个 star :star: 鼓励一下吧~

Build Setup
====

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

