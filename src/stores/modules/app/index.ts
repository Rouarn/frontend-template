import { SetupStoreId } from '@/enum'
import { defineStore } from 'pinia'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { useBoolean } from '@/utils'

export const useAppStore = defineStore(SetupStoreId.App, () => {
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const { bool: reloadFlag, setBool: setReloadFlag } = useBoolean(true)
  const { bool: contentXScrollable, setBool: setContentXScrollable } = useBoolean()

  /** Is mobile layout */
  const isMobile = breakpoints.smaller('sm')

  const locale = ref<App.I18n.LangType>(
    (window.localStorage.getItem('lang') || 'zh-CN') as App.I18n.LangType,
  )

  /**
   * Reload page
   *
   * @param duration Duration time
   */
  async function reloadPage(duration = 300) {
    setReloadFlag(false)

    await new Promise((resolve) => {
      setTimeout(resolve, duration)
    })

    setReloadFlag(true)
  }

  return {
    isMobile,
    reloadFlag,
    reloadPage,
    locale,
    contentXScrollable,
    setContentXScrollable,
  }
})
