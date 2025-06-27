<script setup lang="ts">
import { useRouter } from 'vue-router'

import { useThemeStore } from '@/stores/modules/theme'

import { $t } from '@/locales'

const themeStore = useThemeStore()

const router = useRouter()
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

    <icon-local-banner class="w-40 h-40" />

    <icon-mdi-arrow-down-thin class="operate-shadow operate-item" />

    <icon-uil-search class="text-15px text-#c2c2c2 max-2xl h-3" />

    <NButton @click="router.push('/login')">登录</NButton>
  </NSpace>
</template>
