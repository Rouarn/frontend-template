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
]

/**
 * errorRouter (错误页面路由)
 */
export const errorRouter = [
  // Resolve refresh page, route warnings
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/_builtin/404/index.vue'),
    meta: {
      title: '未知页面',
    },
  },
]
