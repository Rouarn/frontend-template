import { klona as jsonClone } from 'klona'

/**
 * @description 使用递归扁平化菜单，方便添加动态路由
 * @param {Array} menuList 菜单列表
 * @returns {Array}
 */
export function getFlatMenuList(menuList: App.Global.Menu.MenuOptions[]): App.Global.Menu.MenuOptions[] {
  const newMenuList: App.Global.Menu.MenuOptions[] = jsonClone(menuList)
  return newMenuList.flatMap((item) => [item, ...(item.children ? getFlatMenuList(item.children) : [])])
}

/**
 * @description 使用递归过滤出需要渲染在左侧菜单的列表 (需剔除 isHide == true 的菜单)
 * @param {Array} menuList 菜单列表
 * @returns {Array}
 * */
export function getShowMenuList(menuList: App.Global.Menu.MenuOptions[]) {
  const newMenuList: App.Global.Menu.MenuOptions[] = jsonClone(menuList)
  return newMenuList.filter((item) => {
    if (item.children?.length) {
      item.children = getShowMenuList(item.children)
    }
    return !item.meta?.isHide
  })
}
