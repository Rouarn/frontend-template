<script setup lang="ts">
import { $t } from '@/locales'
import { useThemeStore } from '@/stores/modules/theme'

const themeStore = useThemeStore()
const open = () => {
  window.$loading?.open()
}
setTimeout(() => {
  window.$loading?.close()
}, 2000)
</script>

<template>
  <NSpace class="h-full w-full flex-center" vertical>
    <NButton type="primary" @click="open">{{ $t('system.title') }}</NButton>

    <!-- 切换暗色 -->
    <NButton @click="themeStore.toggleThemeScheme()"> 切换深色 </NButton>

    <IconLocalBanner class="w-40 h-40" />

    <IconMdiArrowDownThin class="operate-shadow operate-item" />

    <IconUilSearch class="text-15px text-#c2c2c2 max-2xl h-3" />
  </NSpace>
</template>
