import { SetupStoreId } from '@/enum'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore(SetupStoreId.Auth, () => {
  const token = ref(window.localStorage.getItem('token'))

  const userInfo: Api.Auth.UserInfo = reactive({
    userId: '',
    userName: '',
    roles: [],
    buttons: [],
  })

  const isLogin = computed(() => Boolean(token.value))

  const menuList = ref<App.Global.Menu.MenuOptions[]>([])
  const authMenuListGet = computed(() => menuList.value)
  const flatMenuListGet = computed(() => menuList.value)

  const setToken = (value: string) => {
    token.value = value
  }

  const getAuthMenuList = () => {
    return []
  }

  return {
    token,
    userInfo,
    isLogin,
    authMenuListGet,
    flatMenuListGet,
    setToken,
    getAuthMenuList,
  }
})
