import { useRoute, useRouter } from 'vue-router'
import { fetchLogin, getAuthMenuListApi } from '@/service/api/login'
import { getFlatMenuList, getShowMenuList } from './shared'
import { SetupStoreId } from '@/enum'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore(SetupStoreId.Auth, () => {
  const router = useRouter()
  const route = useRoute()

  // token
  const token = ref(window.localStorage.getItem('token'))

  // 用户信息
  const userInfo: Api.Auth.UserInfo = reactive({
    userId: '',
    userName: '',
  })

  // 是否已登录
  const isLogin = computed(() => Boolean(token.value))

  // 菜单权限列表
  const menuList = ref<App.Global.Menu.MenuOptions[]>([])
  // 菜单权限列表 ==> 左侧菜单栏渲染，需要剔除 isHide == true
  const authMenuListGet = computed(() => getShowMenuList(menuList.value))
  // 菜单权限列表 ==> 扁平化之后的一维数组菜单，主要用来添加动态路由
  const flatMenuListGet = computed(() => getFlatMenuList(menuList.value))

  const setToken = (value: string) => {
    token.value = value
    window.localStorage.setItem('token', value)
  }

  const getAuthMenuList = async () => {
    const { data } = await getAuthMenuListApi()
    menuList.value = data
  }

  /**
   * Login
   *
   * @param userName User name
   * @param password Password
   * @param [redirect=true] Whether to redirect after login. Default is `true`
   */
  async function login(userName: string, password: string, redirect = true) {
    const { data } = await fetchLogin(userName, password)
    setToken(data.token)
    const needRedirect = route.query?.redirect as string

    if (needRedirect && redirect) {
      await router.push(needRedirect)
    } else {
      await router.push('/')
    }

    window.$notification?.success({
      title: '登录成功',
      content: '欢迎回来：' + userInfo.userName,
      duration: 4500,
    })
  }

  return {
    token,
    userInfo,
    isLogin,
    authMenuListGet,
    flatMenuListGet,
    login,
    setToken,
    getAuthMenuList,
  }
})
