import router from '@/router/index'
import type { RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/modules/auth'
import { GlobalConfig } from '@/enum'

// 引入 views 文件夹下所有 vue 文件
const modules = import.meta.glob('@/views/**/*.vue')

/**
 * @description 初始化动态路由
 */
export const initDynamicRouter = async () => {
  const authStore = useAuthStore()

  try {
    // 1.获取菜单列表 && 按钮权限列表
    await authStore.getAuthMenuList()

    // 2.判断当前用户有没有菜单权限
    if (!authStore.authMenuListGet.length) {
      window.$message?.error('当前账号无任何菜单权限，请联系系统管理员！')
      // authStore.setToken('')
      // return Promise.reject('No permission')
    }

    // 3.准备要添加的路由
    const routesToAdd: RouteRecordRaw[] = []
    const layoutChildren: RouteRecordRaw[] = []

    authStore.flatMenuListGet.forEach((item) => {
      // 克隆对象避免修改原始数据
      const route = { ...item } as unknown as RouteRecordRaw

      // 处理子路由
      if (item.children) {
        delete route.children
      }

      // 处理组件路径
      if (item.component) {
        route.component = modules['/src/views' + item.component + '.vue'] as () => Promise<unknown>
      }

      // 分类路由
      if (item.meta.isFull) {
        routesToAdd.push(route)
      } else {
        layoutChildren.push(route)
      }
    })

    // 4.添加全屏路由
    routesToAdd.forEach((route) => {
      router.addRoute(route)
    })

    // 5.添加布局路由的子路由
    if (layoutChildren.length > 0) {
      const layoutRoute = router.getRoutes().find((r) => r.name === 'layout')
      if (layoutRoute) {
        // 先移除原有布局路由
        router.removeRoute('layout')

        // 重新添加带有子路由的布局路由
        router.addRoute({
          ...layoutRoute,
          children: [...(layoutRoute.children || []), ...layoutChildren],
        } as RouteRecordRaw)
      }
    }

    console.log('更新后的路由表:', router.getRoutes())
  } catch (error) {
    authStore.setToken('')
    await router.replace(GlobalConfig.LOGIN_URL)
    return Promise.reject(error)
  }
}
