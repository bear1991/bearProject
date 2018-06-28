import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

import Bear from '@/components/Bear'
import Index from '@/components/Index'
import Book from '@/components/Book'
import Movie from '@/components/Movie'
// import MovieList from '@/components/MovieList'
import MovieDetail from '@/components/MovieDetail'
import News from '@/components/News'
// import Resigter from '@/components/Resigter'
// import Login from '@/components/Login'
import RegLog from '@/components/RegLog'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/bear/index'
      // redirect: '/bear'
    },
    {
      path: '/bear',
      name: 'Bear',
      component: Bear,
      children: [{
        path: 'index',
        // path: '',
        name: 'Index',
        component: Index
      },
      {
        path: 'book',
        name: 'Book',
        component: Book
      },
      {
        path: 'movie',
        name: 'Movie',
        component: Movie
      },
      {
        path: 'news',
        name: 'News',
        component: News
      }]
    },
    {
      path: '/moviedetail',
      name: 'MovieDetail',
      component: MovieDetail
    },
    // {
    //   path: '/resigter',
    //   name: 'Resigter',
    //   component: Resigter
    // },
    // {
    //   path: '/login',
    //   name: 'Login',
    //   component: Login
    // },
    {
      path: '/reglog',
      name: 'RegLog',
      component: RegLog
    }
  ]
})
