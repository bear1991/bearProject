import Vue from 'vue'
import Router from 'vue-router'
// import Text from '@/components/Text'
// import Picture from '@/components/Picture'

import TextPicture from '@/components/TextPicture'

Vue.use(Router)

export default new Router({
  // mode: 'history',    // 将hash形式的地址变成普通形式的地址
  routes: [
    {
      path: '/',
      // component: Text
      redirect: to => {
        return {path: '/text'}
      }
    },
    /*
    {
      path: '/text',
      name: 'text',
      component: Text
    },
    {
      path: '/picture',
      name: 'picture',
      component: Picture
    }
    */
    {
      path: '/:id',
      component: TextPicture
    }
  ]
})
