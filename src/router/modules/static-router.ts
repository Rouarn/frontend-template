import { GlobalConfig } from '@/enum'
import type { RouteRecordRaw } from 'vue-router'

/**
 * staticRouter (静态路由)
 */
export const staticRouter: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: GlobalConfig.HOME_URL,
  },
  {
    path: GlobalConfig.LOGIN_URL,
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      isConstant: true,
    },
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/layouts/blank-layout/index.vue'),
    redirect: GlobalConfig.HOME_URL,
    children: [
      {
        path: GlobalConfig.HOME_URL,
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          isConstant: true,
        },
      },
    ],
  },
]

/**
 * errorRouter (错误页面路由)
 */
export const errorRouter = [
  // {
  //   path: '/403',
  //   name: '403',
  //   component: () => import('@/components/ErrorMessage/403.vue'),
  //   meta: {
  //     title: '403页面',
  //     isConstant: true,
  //   },
  // },
  // {
  //   path: '/404',
  //   name: '404',
  //   component: () => import('@/components/ErrorMessage/404.vue'),
  //   meta: {
  //     title: '404页面',
  //     isConstant: true,
  //   },
  // },
  // {
  //   path: '/500',
  //   name: '500',
  //   component: () => import('@/components/ErrorMessage/500.vue'),
  //   meta: {
  //     title: '500页面',
  //     isConstant: true,
  //   },
  // },
  // // Resolve refresh page, route warnings
  // {
  //   path: '/:pathMatch(.*)*',
  //   component: () => import('@/components/ErrorMessage/404.vue'),
  //   meta: {
  //     title: '未知页面',
  //     isConstant: true,
  //   },
  // },
]
