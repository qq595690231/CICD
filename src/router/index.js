import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
// import Login from '@/views/login/index'
// import Layout from '@/views/layout/index.vue'
// import Home from '@/views/home/index.vue'
// import Role from '@/views/role/index.vue'
// import Menu from '@/views/menu/index.vue'
// import Resource from '@/views/resource/index.vue'
// import Course from '@/views/course/index.vue'
// import User from '@/views/user/index.vue'
// import Advert from '@/views/advert/index.vue'
// import AdvertSpace from '@/views/advert-space/index.vue'
// import ErrorPage from '@/views/error-page/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */'@/views/login/index')
  },
  {
    path: '/',
    component: () => import(/* webpackChunkName: 'layout' */'@/views/layout/index'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */'@/views/home/index')
      },
      {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName: 'role' */'@/views/role/index')
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: 'menu' */'@/views/menu/index')
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import(/* webpackChunkName: 'resource' */'@/views/resource/index')
      },
      {
        path: 'course',
        name: '/course',
        component: () => import(/* webpackChunkName: 'course' */'@/views/course/index')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: 'user' */'@/views/user/index')
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpackChunkName: 'advert' */'@/views/advert/index')
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import(/* webpackChunkName: 'advert-space' */'@/views/advert-space/index')
      },
      {
        path: '/menu/create',
        name: 'menu-create',
        component: () => import(/* webpackChunkName: 'menu-create' */'@/views/menu/create')
      },
      {
        path: '/menu/:id/edit',
        name: 'menu-edit',
        component: () => import(/* webpackChunkName: 'menu-edit' */'@/views/menu/edit')
      }
    ]
  },
  {
    path: '*',
    name: 'error-page',
    component: () => import(/* webpackChunkName: 'error-page' */'@/views/error-page/index')
  }
]

const router = new VueRouter({
  routes
})

// some数组操作方法遍历数组
// 对所有界面进行访问权限验证
router.beforeEach((to, from, next) => {
  // console.log(to) // 下有fullPath（包括后面的id等数值）path则直接是/路径
  // 验证to路由是否需要进行身份验证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.user) {
      return next({
        name: 'login',
        query: {
          // 将本次路由的fullPath传递给login页面
          redirect: to.fullPath
        }
      })
    }
    next()
  } else {
    next()
}
})

export default router
