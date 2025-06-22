import router from '@/router/index'
import { RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/modules/auth'

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
      authStore.setToken('')
      router.replace(import.meta.env.LOGIN_URL)
      return Promise.reject('No permission')
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
  } catch (error) {
    // 当按钮 || 菜单请求出错时，重定向到登陆页
    authStore.setToken('')
    router.replace(import.meta.env.LOGIN_URL)
    return Promise.reject(error)
  }
}
