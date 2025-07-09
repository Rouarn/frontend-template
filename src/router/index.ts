import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { errorRouter, staticRouter } from '@/router/modules/static-router'
import { useTitle } from '@vueuse/core'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'

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
 * @param meta.isFull ==> 菜单是否全屏 (示例：数据大屏页面)
 * @param meta.isKeepAlive ==> 当前路由是否缓存
 * @param meta.isConstant ==> 常规路由 (不需要权限 直接放行)
 * */
const router = createRouter({
  history: routerMode[mode](),
  routes: [...routes, ...staticRouter, ...errorRouter],
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

// 热更新
if (import.meta.hot) {
  handleHotUpdate(router)
}

/**
 * @description 路由拦截 beforeEach
 * */
router.beforeEach(async (to, _from, next) => {
  // 1.NProgress 开始
  window.NProgress?.start?.()

  // 2.动态设置标题
  const title = import.meta.env.VITE_APP_TITLE
  useTitle(to.meta.title ? `${to.meta.title} - ${title}` : title)
  console.log(router.getRoutes(), 'router.getRoutes()')
  // 7.正常访问页面
  next()
})

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
