import { useSvgIcon } from '@/hooks/common/icon'
import { $t } from '@/locales'
import type { _RouteRecordBase, RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router'

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

/**
 * Get global menu by route
 *
 * @param route
 */
function getGlobalMenuByBaseRoute(route: RouteLocationNormalizedLoaded | RouteRecordRaw) {
  const { SvgIconVNode } = useSvgIcon()

  const { name, path } = route
  const { title, i18nKey, icon = import.meta.env.VITE_MENU_ICON, localIcon, iconFontSize, order } = route.meta ?? {}

  const label = i18nKey ? $t(i18nKey) : title!

  const menu: App.Global.Menu = {
    key: name as string,
    label,
    i18nKey,
    order: order ?? -1,
    routeKey: name as App.Global.RouteKey,
    routePath: path as App.Global.RouteKey,
    icon: SvgIconVNode({ icon, localIcon, fontSize: iconFontSize || 20 }),
  }

  return menu
}

/**
 * Get global menus by auth routes
 *
 * @param routes Auth routes
 */
export function getGlobalMenusByAuthRoutes(routes: RouteRecordRaw[]) {
  const calcMenu = (routes: RouteRecordRaw[]) => {
    const menus: App.Global.Menu[] = []

    function flattenRoutes(routes: RouteRecordRaw[], result: RouteRecordRaw[] = []) {
      for (const route of routes) {
        if (!route.meta?.hideInMenu) {
          result.push(route)
        }

        if (Array.isArray(route.children)) {
          flattenRoutes(route.children, result)
        }
      }

      return result
    }

    function filterEmptyMenu(menu: App.Global.Menu): boolean {
      // 检查是否有必要的字段
      const hasRequiredFields = menu.key && menu.label && menu.routeKey
      // 如果有子菜单，递归检查
      const hasValidChildren = menu.children ? menu.children.some(filterEmptyMenu) : true

      return Boolean(hasRequiredFields && hasValidChildren)
    }

    const cache: RouteRecordRaw[] = flattenRoutes(routes)

    cache.forEach((route) => {
      if (!route.meta?.hideInMenu) {
        const menu = getGlobalMenuByBaseRoute(route)

        if (route.children?.some((child) => !child.meta?.hideInMenu)) {
          menu.children = getGlobalMenusByAuthRoutes(route.children)
          // 过滤掉无效的子菜单
          if (menu.children) {
            menu.children = menu.children.filter(filterEmptyMenu)
          }
        }

        // 只有满足条件的菜单才加入
        if (filterEmptyMenu(menu)) {
          menus.push(menu)
        }
      }
    })

    return menus.filter(filterEmptyMenu)
  }

  const menus = calcMenu(routes).sort((a, b) => {
    const orderA = a.order ?? -1
    const orderB = b.order ?? -1

    // 将 order 为 -1 的项排在最后
    if (orderA === -1 && orderB !== -1) return 1
    if (orderA !== -1 && orderB === -1) return -1

    return orderA - orderB // 正常按升序排序
  })

  return menus
}
