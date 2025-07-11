import useBoolean from '@/utils/use-boolean'
import { getCacheRouteNames, getGlobalMenusByAuthRoutes } from './shared'
import { SetupStoreId } from '@/enum'
import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'

export const useRouteStore = defineStore(SetupStoreId.Route, () => {
  const { bool: isInitConstantRoute, setBool: setIsInitConstantRoute } = useBoolean()

  /** Global menus */
  const menus = ref<App.Global.Menu[]>([])

  /** Initialize route */
  async function initRoute(routes: RouteRecordRaw[]) {
    if (isInitConstantRoute.value) return

    menus.value = getGlobalMenusByAuthRoutes(routes)

    getCacheRoutes(routes)

    setIsInitConstantRoute(true)
  }

  /** Cache routes */
  const cacheRoutes = ref<App.Global.RouteKey[]>([])

  /**
   * Get cache routes
   *
   * @param routes Vue routes
   */
  function getCacheRoutes(routes: RouteRecordRaw[]) {
    cacheRoutes.value = getCacheRouteNames(routes)
  }

  return {
    menus,
    cacheRoutes,
    isInitConstantRoute,
    initRoute,
  }
})
