import type { RouteRecordRaw } from 'vue-router'

export const getCacheRouteNames = (routes: RouteRecordRaw[]) => {
  const cacheRouteNames: string[] = []

  routes.forEach((route: RouteRecordRaw) => {
    if (route.meta?.isKeepAlive) {
      cacheRouteNames.push(<string>route.name)
    }

    if (route.children) {
      cacheRouteNames.push(...getCacheRouteNames(route.children))
    }
  })

  return cacheRouteNames
}
