<script setup lang="ts">
import { useRoute } from 'vue-router'
import UserAvatar from './components/user-avatar.vue'
import ThemeSchemaSwitch from '@/components/common/theme-schema-switch.vue'
import { useAppStore } from '@/stores/modules/app'
import { useRouteStore } from '@/stores/modules/route'
import { useThemeStore } from '@/stores/modules/theme'
import { useRouterPush } from '@/hooks/common/router'
import { useFullscreen } from '@vueuse/core'

defineOptions({
  name: 'GlobalHeader',
})

const route = useRoute()
const appStore = useAppStore()
const routeStore = useRouteStore()
const themeStore = useThemeStore()
const { routerPushByKeyWithMetaQuery } = useRouterPush()
const { isFullscreen, toggle } = useFullscreen()

const selectedKey = computed(() => {
  const { hideInMenu, activeMenu } = route.meta
  const name = route.name as string
  return (hideInMenu ? activeMenu : name) || name
})
</script>

<template>
  <header class="w-full bg-white dark:bg-#18181c border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
    <div class="max-w-screen-xl mx-auto px-4 h-16 flex items-center justify-between">
      <!-- 左侧：Logo和系统名称 -->
      <div class="flex items-center space-x-3">
        <NImage src="/src/assets/logo.svg" alt="logo" width="32" height="32" />
        <NText class="text-xl font-bold hidden sm:block" tag="h1"> Frontend Template </NText>
      </div>

      <!-- 中间：导航菜单 -->
      <NMenu
        :value="selectedKey"
        mode="horizontal"
        :options="routeStore.menus"
        responsive
        @update:value="routerPushByKeyWithMetaQuery"
        class="flex-1 mx-6"
      />

      <!-- 右侧：操作区 -->
      <div class="flex items-center space-x-2">
        <!-- 搜索按钮 -->
        <NButton quaternary circle class="!p-2">
          <icon-ion:search class="text-lg" />
        </NButton>

        <!-- 消息通知 -->
        <NBadge :value="8" :max="99">
          <NButton quaternary circle class="!p-2">
            <icon-ion:notifications-outline class="text-lg" />
          </NButton>
        </NBadge>

        <!-- 全屏切换 -->
        <FullScreen v-if="!appStore.isMobile" :full="isFullscreen" @click="toggle" />
        <!-- 语言切换 -->
        <LangSwitch :lang="appStore.locale" :lang-options="appStore.localeOptions" @change-lang="appStore.changeLocale" />

        <!-- 主题切换 -->
        <ThemeSchemaSwitch :theme-schema="themeStore.themeScheme" :is-dark="themeStore.darkMode" @switch="themeStore.toggleThemeScheme" />

        <!-- 用户头像 -->
        <UserAvatar />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped></style>
