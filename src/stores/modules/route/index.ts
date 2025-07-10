import { getCacheRouteNames, getGlobalMenusByAuthRoutes } from './shared'
import { SetupStoreId } from '@/enum'
import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

export const useRouteStore = defineStore(SetupStoreId.Route, () => {
  /** Global menus */
  const menus = ref<App.Global.Menu[]>([])

  /** Initialize route */
  async function initRoute() {
    console.log('routes: ', routes)
    menus.value = getGlobalMenusByAuthRoutes(routes)
    console.log('menus.value: ', menus.value)
  }

  /** Cache routes */
  const cacheRoutes = reactive<string[]>([])

  const addCacheRoutes = (name: string) => {
    if (!cacheRoutes.includes(name)) {
      cacheRoutes.push(name)
    }
  }
  const removeCacheRoutes = (name: string) => {
    const index = cacheRoutes.indexOf(name)
    if (index > -1) {
      cacheRoutes.splice(index, 1)
    }
  }
  const resetCacheRoutes = () => {
    cacheRoutes.splice(0, cacheRoutes.length)
  }

  const setCacheRoutes = (routes: RouteRecordRaw[]) => {
    resetCacheRoutes()
    cacheRoutes.push(...getCacheRouteNames(routes))
  }

  initRoute()

  return {
    menus,
    cacheRoutes,
    addCacheRoutes,
    removeCacheRoutes,
    resetCacheRoutes,
    setCacheRoutes,
  }
})
