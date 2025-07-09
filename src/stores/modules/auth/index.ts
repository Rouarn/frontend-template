import { useRoute, useRouter } from 'vue-router'
import { fetchLogin } from '@/service/api/login'
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

  const setToken = (value: string) => {
    token.value = value
    window.localStorage.setItem('token', value)
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
    login,
    setToken,
  }
})
