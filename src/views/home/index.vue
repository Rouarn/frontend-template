<route lang="json5">
{
  meta: {
    layout: 'base-layout',
    title: '首页',
    order: 0,
    icon: 'material-symbols:home-app-logo',
    isKeepAlive: true,
    guard: true,
    guardName: 'home',
  },
}
</route>

<script setup lang="ts">
import { useThemeStore } from '@/stores/modules/theme'
import { useRouterPush } from '@/hooks/common/router'
import { $t } from '@/locales'

const themeStore = useThemeStore()
const { toLogin, routerPushByKey } = useRouterPush()

const open = () => {
  window.$loading?.open()

  setTimeout(() => {
    window.$loading?.close()
  }, 1000)
}
</script>

<template>
  <NSpace class="h-full w-full flex-center" vertical>
    <NButton type="primary" @click="open">{{ $t('system.title') }}</NButton>

    <!-- 切换暗色 -->
    <NButton @click="themeStore.toggleThemeScheme()"> 切换深色 </NButton>

    <icon-local-banner class="w-40 h-40" />

    <icon-mdi-arrow-down-thin class="operate-shadow operate-item" />

    <icon-uil-search class="text-15px text-#c2c2c2 max-2xl h-3" />

    <NButton @click="toLogin()">登录</NButton>

    <NButton @click="routerPushByKey('/about/')">关于</NButton>
  </NSpace>
</template>
