import router from '@/router/index'
import { useAuthStore } from '@/stores/modules/auth'
import { GlobalConfig } from '@/enum'
import type { RouteRecordRaw } from 'vue-router'

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
    }

    // 3.添加动态路由
    authStore.flatMenuListGet.forEach((item) => {
      if (item.children) {
        delete item.children
      }
      if (item.component && typeof item.component == 'string') {
        item.component = modules['/src/views' + item.component + '.vue']
      }
      if (item.meta.isFull) {
        router.addRoute(item as unknown as RouteRecordRaw)
      } else {
        router.addRoute('layout', item as unknown as RouteRecordRaw)
      }
    })

    console.log(router.getRoutes(), 'router.getRoutes()')
  } catch (error) {
    authStore.setToken('')
    await router.replace(GlobalConfig.LOGIN_URL)
    return Promise.reject(error)
  }
}
