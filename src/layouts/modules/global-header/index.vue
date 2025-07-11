<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useRouteStore } from '@/stores/modules/route'
import { useRouterPush } from '@/hooks/common/router'

defineOptions({
  name: 'GlobalHeader',
})

const route = useRoute()
const routeStore = useRouteStore()
const { routerPushByKeyWithMetaQuery } = useRouterPush()

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
        <NTooltip trigger="hover">
          <template #trigger>
            <NButton quaternary circle class="!p-2">
              <icon-ion:expand-outline class="text-lg" />
            </NButton>
          </template>
          全屏
        </NTooltip>

        <!-- 主题切换 -->
        <NTooltip trigger="hover">
          <template #trigger>
            <NButton quaternary circle class="!p-2">
              <icon-ion:sunny-outline class="text-lg dark:hidden" />
              <icon-ion:moon class="text-lg hidden dark:block" />
            </NButton>
          </template>
          切换主题
        </NTooltip>

        <!-- 用户头像 -->
        <NDropdown
          trigger="hover"
          :options="[
            { label: '个人中心', key: 'profile' },
            { label: '系统设置', key: 'settings' },
            { type: 'divider', key: 'd1' },
            { label: '退出登录', key: 'logout' },
          ]"
        >
          <div class="flex items-center space-x-2 cursor-pointer pl-2">
            <NAvatar round size="small" src="/src/assets/logo.svg" />
            <span class="hidden md:inline">管理员</span>
          </div>
        </NDropdown>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped></style>
