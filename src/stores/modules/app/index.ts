import useBoolean from '@/utils/use-boolean'
import { SetupStoreId } from '@/enum'
import { setLocale } from '@/locales'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useAppStore = defineStore(SetupStoreId.App, () => {
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const { bool: reloadFlag, setBool: setReloadFlag } = useBoolean(true)
  const { bool: contentXScrollable, setBool: setContentXScrollable } = useBoolean()

  /** Is mobile layout */
  const isMobile = breakpoints.smaller('sm')

  const locale = ref<App.I18n.LangType>((window.localStorage.getItem('lang') || 'zh-CN') as App.I18n.LangType)

  const localeOptions: App.I18n.LangOption[] = [
    {
      label: '中文',
      key: 'zh-CN',
    },
    {
      label: 'English',
      key: 'en-US',
    },
  ]

  function changeLocale(lang: App.I18n.LangType) {
    locale.value = lang
    setLocale(lang)
    window.localStorage.setItem('lang', lang)
  }

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
    localeOptions,
    changeLocale,
    contentXScrollable,
    setContentXScrollable,
  }
})
