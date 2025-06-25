import { SetupStoreId } from '@/enum'
import { toggleHtmlClass } from '@/utils/common'
import { usePreferredColorScheme } from '@vueuse/core'
import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import { computed, effectScope, onScopeDispose, ref, toRefs, watch } from 'vue'
import { getNaiveTheme, initThemeSettings } from './shared'

export const useThemeStore = defineStore(SetupStoreId.Theme, () => {
  const scope = effectScope()
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

  /**
   * Set theme scheme
   *
   * @param themeScheme
   */
  function setThemeScheme(themeScheme: UnionKey.ThemeScheme) {
    settings.value.themeScheme = themeScheme
  }

  /** Toggle theme scheme */
  function toggleThemeScheme() {
    const themeSchemes: UnionKey.ThemeScheme[] = ['light', 'dark', 'auto']

    const index = themeSchemes.findIndex((item) => item === settings.value.themeScheme)

    const nextIndex = index === themeSchemes.length - 1 ? 0 : index + 1

    const nextThemeScheme = themeSchemes[nextIndex]

    setThemeScheme(nextThemeScheme)
  }

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

  /**
   * Toggle css dark mode
   *
   * @param darkMode Is dark mode
   */
  function toggleCssDarkMode(darkMode = false) {
    const { add, remove } = toggleHtmlClass('dark')

    if (darkMode) {
      add()
    } else {
      remove()
    }
  }

  // watch store
  scope.run(() => {
    // watch dark mode
    watch(
      darkMode,
      (val) => {
        toggleCssDarkMode(val)
        window.localStorage.setItem('darkMode', String(val))
      },
      { immediate: true },
    )

    // themeColors change, update css vars and storage theme color
    watch(
      themeColors,
      (val) => {
        window.localStorage.setItem('themeColor', val.primary)
      },
      { immediate: true },
    )
  })

  /** On scope dispose */
  onScopeDispose(() => {
    scope.stop()
  })

  return {
    ...toRefs(settings.value),
    darkMode,
    themeColors,
    naiveTheme,
    setThemeScheme,
    toggleThemeScheme,
  }
})
