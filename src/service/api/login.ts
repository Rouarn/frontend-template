// import { PORT1 } from '@/service/request/servicePort'
import authMenuList from '@/assets/json/authMenuList.json'
// import http from '@/service/request'

/**
 * Login
 *
 * @param userName User name
 * @param password Password
 */
export function fetchLogin(userName: string, password: string) {
  return Promise.resolve({
    code: 200,
    data: {
      token: '123456',
      userName,
      password,
    },
  })
}

// 获取菜单列表
export const getAuthMenuListApi = () => {
  // return http.get<App.Menu.MenuOptions[]>(PORT1 + `/menu/list`, {}, { loading: false })
  return Promise.resolve(authMenuList)
}
