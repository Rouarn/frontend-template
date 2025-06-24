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
  </NSpace>
</template>
