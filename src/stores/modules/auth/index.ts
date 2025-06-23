import { SetupStoreId } from '@/enum'
import { fetchLogin, getAuthMenuListApi } from '@/service/api/login'
import { defineStore } from 'pinia'
import { useRoute, useRouter } from 'vue-router'

export const useAuthStore = defineStore(SetupStoreId.Auth, () => {
  const router = useRouter()
  const route = useRoute()

  const token = ref(window.localStorage.getItem('token'))

  const userInfo: Api.Auth.UserInfo = reactive({
    userId: '',
    userName: '',
  })

  const isLogin = computed(() => Boolean(token.value))

  const menuList = ref<App.Global.Menu.MenuOptions[]>([])
  const authMenuListGet = computed(() => menuList.value)
  const flatMenuListGet = computed(() => menuList.value)

  const setToken = (value: string) => {
    token.value = value
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
