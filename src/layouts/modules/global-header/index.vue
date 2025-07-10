<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useRouteStore } from '@/stores/modules/route'
import { useRouterPush } from '@/hooks/common/router'

defineOptions({
  name: 'GlobalHeader',
})

const route = useRoute()
const ruterStore = useRouteStore()
const { routerPushByKeyWithMetaQuery } = useRouterPush()

const selectedKey = computed(() => {
  const { hideInMenu, activeMenu } = route.meta
  const name = route.name as string

  const routeName = (hideInMenu ? activeMenu : name) || name

  return routeName
})
</script>

<template>
  <NMenu :value="selectedKey" mode="horizontal" :options="ruterStore.menus" responsive @update:value="routerPushByKeyWithMetaQuery" />
</template>

<style lang="scss" scoped></style>
