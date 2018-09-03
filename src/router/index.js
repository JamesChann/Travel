import Vue from 'vue'
import Router from 'vue-router'
import Home from 'pages/home/home'
import City from 'pages/city/city'
import Topic from 'pages/topic/topic'
import Scenic from 'pages/scenic/scenic'
import Commit from 'pages/scenic-info/commit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/city',
          component: City
        }
      ]
    },
    {
      path: '/topic',
      component: Topic
    },
    {
      path: '/scenic/:id',
      component: Scenic
    },
    {
      path: '/scenic/:id/commit',
      component: Commit
    }
  ]
})
