<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useRouteStore } from '@/stores/modules/route'

defineOptions({
  name: 'GlobalHeader',
})

const ruterStore = useRouteStore()
const route = useRoute()

const selectedKey = computed(() => {
  const { hideInMenu, activeMenu } = route.meta
  const name = route.name as string

  const routeName = (hideInMenu ? activeMenu : name) || name

  return routeName
})
console.log('selectedKey: ', selectedKey)
</script>

<template>
  <NMenu :value="selectedKey" mode="horizontal" :options="ruterStore.menus" responsive />
</template>

<style lang="scss" scoped></style>
