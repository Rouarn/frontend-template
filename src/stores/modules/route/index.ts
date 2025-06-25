import { SetupStoreId } from '@/enum'
import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { getCacheRouteNames } from './shared'

export const useRouteStore = defineStore(SetupStoreId.Route, () => {
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

  return {
    cacheRoutes,
    addCacheRoutes,
    removeCacheRoutes,
    resetCacheRoutes,
    setCacheRoutes,
  }
})
