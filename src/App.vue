<script setup lang="ts">
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { darkTheme } from 'naive-ui'

import { naiveDateLocales, naiveLocales } from './locales/naive'
import { useAppStore } from './stores/modules/app'
import { useThemeStore } from './stores/modules/theme'

defineOptions({
  name: 'App',
})

const themeStore = useThemeStore()
const appStore = useAppStore()

const naiveDarkTheme = computed(() => (themeStore.darkMode ? darkTheme : undefined))

const naiveLocale = computed(() => {
  return naiveLocales[appStore.locale]
})

const naiveDateLocale = computed(() => {
  return naiveDateLocales[appStore.locale]
})
</script>

<template>
  <NConfigProvider :theme="naiveDarkTheme" :theme-overrides="themeStore.naiveTheme" :locale="naiveLocale" :date-locale="naiveDateLocale">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </NConfigProvider>
</template>

<style scoped></style>
