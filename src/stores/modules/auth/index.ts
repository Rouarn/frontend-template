import { useRoute } from 'vue-router'
import { fetchLogin } from '@/service/api/login'
import { SetupStoreId } from '@/enum'
import { useRouterPush } from '@/hooks/common/router'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore(SetupStoreId.Auth, () => {
  const route = useRoute()
  const authStore = useAuthStore()
  const { toLogin, redirectFromLogin } = useRouterPush(false)

  // token
  const token = ref(window.localStorage.getItem('token'))

  // 用户信息
  const userInfo: Api.Auth.UserInfo = reactive({
    userId: '',
    userName: '夏季',
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
   * @param [redirect=true]登录后是否重定向。默认为“true”
   */
  async function login(userName: string, password: string, redirect = true) {
    const { data } = await fetchLogin(userName, password)
    setToken(data.token)

    await redirectFromLogin(redirect)

    window.$notification?.success({
      title: '登录成功',
      content: '欢迎回来：' + userInfo.userName,
      duration: 4500,
    })
  }

  /** Reset auth store */
  async function resetStore() {
    recordUserId()

    window.localStorage.removeItem('token')

    authStore.$reset()

    if (route.meta.isAuth) {
      await toLogin()
    }
  }
  /** Record the user ID of the previous login session Used to compare with the current user ID on next login */
  function recordUserId() {
    if (!userInfo.userId) {
      return
    }

    // Store current user ID locally for next login comparison
    window.localStorage.setItem('lastLoginUserId', userInfo.userId)
  }
  return {
    token,
    userInfo,
    isLogin,
    login,
    setToken,
    resetStore,
  }
})
