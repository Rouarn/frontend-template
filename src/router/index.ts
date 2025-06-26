import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

import { initDynamicRouter } from '@/router/modules/dynamic-router'
import { errorRouter, staticRouter } from '@/router/modules/static-router'

import { GlobalConfig } from '@/enum'
import { useAuthStore } from '@/stores/modules/auth'

const mode = import.meta.env.VITE_ROUTER_MODE as 'hash' | 'history'

const routerMode = {
  hash: () => createWebHashHistory(),
  history: () => createWebHistory(),
}

/**
 * @description 📚 路由参数配置简介
 * @param path ==> 路由菜单访问路径
 * @param name ==> 路由 name (对应页面组件 name, 可用作 KeepAlive 缓存标识 && 按钮权限筛选)
 * @param redirect ==> 路由重定向地址
 * @param component ==> 视图文件路径
 * @param meta ==> 路由菜单元信息
 * @param meta.icon ==> 菜单和面包屑对应的图标
 * @param meta.title ==> 路由标题 (用作 document.title || 菜单的名称)
 * @param meta.activeMenu ==> 当前路由为详情页时，需要高亮的菜单
 * @param meta.isLink ==> 路由外链时填写的访问地址
 * @param meta.isHide ==> 是否在菜单中隐藏 (通常列表详情页需要隐藏)
 * @param meta.isFull ==> 菜单是否全屏 (示例：数据大屏页面)
 * @param meta.isAffix ==> 菜单是否固定在标签页中 (首页通常是固定项)
 * @param meta.isKeepAlive ==> 当前路由是否缓存
 * @param meta.isConstant ==> 常规路由 (不需要权限 直接放行)
 * */
const router = createRouter({
  history: routerMode[mode](),
  routes: [...staticRouter, ...errorRouter],
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

/**
 * @description 路由拦截 beforeEach
 * */
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // 1.NProgress 开始
  window.NProgress?.start?.()

  // 2.动态设置标题
  const title = import.meta.env.VITE_APP_TITLE
  document.title = to.meta.title ? `${to.meta.title} - ${title}` : title

  // 6.如果没有菜单列表，就重新请求菜单列表并添加动态路由
  await initDynamicRouter()

  // 3.判断访问页面是否是常规路由，如果是直接放行
  if (to.meta.isConstant) {
    return next()
  }

  // 4.判断是访问登陆页，有 Token 就在当前页面，没有 Token 重置路由到登陆页
  if (to.path.toLocaleLowerCase() === GlobalConfig.LOGIN_URL) {
    if (authStore.token) return next(from.fullPath)
    resetRouter()
    return next()
  }

  // 5.检查是否有token（只有非常规路由才会执行到这里）
  if (!authStore.token && from.path !== '/') {
    window.$message?.error('请先登录！')
    resetRouter()
    return next({ path: GlobalConfig.LOGIN_URL, query: { redirect: to.fullPath } })
  }

  // 7.正常访问页面
  next()
})

/**
 * @description 重置路由
 * */
export const resetRouter = () => {
  const authStore = useAuthStore()
  authStore.flatMenuListGet.forEach((route: { name: string }) => {
    const { name } = route
    if (name && router.hasRoute(name)) router.removeRoute(name)
  })
}

/**
 * @description 路由跳转错误
 * */
router.onError((error) => {
  window.NProgress?.done?.()
  console.warn('路由错误', error.message)
})

/**
 * @description 路由跳转结束
 * */
router.afterEach(() => {
  window.NProgress?.done?.()
})

export default router
