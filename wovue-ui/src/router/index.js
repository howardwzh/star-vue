import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/Home'
import TClickTitleShowText from '@/pages/t-click-title-show-text'
import Ceil from '@/pages/ceil'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/t-click-title-show-text',
      name: 't-click-title-show-text',
      component: TClickTitleShowText,
      meta: {
        title: 't-click-title-show-text'
      }
    }, {
      path: '/ceil',
      name: 'ceil',
      component: Ceil,
      meta: {
        title: 'ceil'
      }
    }
  ]
})
