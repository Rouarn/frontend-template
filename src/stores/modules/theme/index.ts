import { computed, Ref, ref, toRefs, watch } from 'vue'
import { SetupStoreId } from '@/enum'
import { usePreferredColorScheme } from '@vueuse/core'
import { defineStore } from 'pinia'
import { getNaiveTheme, initThemeSettings } from './shared'

export const useThemeStore = defineStore(SetupStoreId.Theme, () => {
  const osTheme = usePreferredColorScheme()

  /** Theme settings */
  const settings: Ref<App.Theme.ThemeSetting> = ref(initThemeSettings())

  /** Dark mode */
  const darkMode = computed(() => {
    if (settings.value.themeScheme === 'auto') {
      return osTheme.value === 'dark'
    }
    return settings.value.themeScheme === 'dark'
  })

  /** Theme colors */
  const themeColors = computed(() => {
    const { themeColor, otherColor, isInfoFollowPrimary } = settings.value
    const colors: App.Theme.ThemeColor = {
      primary: themeColor,
      ...otherColor,
      info: isInfoFollowPrimary ? themeColor : otherColor.info,
    }
    return colors
  })

  /** Naive theme */
  const naiveTheme = computed(() => getNaiveTheme(themeColors.value))

  // themeColors change, update css vars and storage theme color
  watch(
    themeColors,
    (val) => {
      window.localStorage.setItem('themeColor', val.primary)
    },
    { immediate: true },
  )

  return {
    ...toRefs(settings.value),
    darkMode,
    themeColors,
    naiveTheme,
  }
})
