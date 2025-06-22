import { SetupStoreId } from '@/enum'
import { defineStore } from 'pinia'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

export const useAppStore = defineStore(SetupStoreId.App, () => {
  const breakpoints = useBreakpoints(breakpointsTailwind)
  /** Is mobile layout */
  const isMobile = breakpoints.smaller('sm')

  const locale = ref<App.I18n.LangType>(
    (window.localStorage.getItem('lang') || 'zh-CN') as App.I18n.LangType,
  )

  return {
    isMobile,
    locale,
  }
})
