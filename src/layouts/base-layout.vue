<script setup lang="ts">
import GlobalContent from './modules/global-content/index.vue'
import GlobalFooter from './modules/global-footer/index.vue'
import GlobalHeader from './modules/global-header/index.vue'

defineOptions({
  name: 'BaseLayout',
})

const handleBackTop = (isTop: boolean) => {
  window.$message?.success(isTop ? '返回顶部' : '取消返回顶部')
}
</script>

<template>
  <NFlex vertical class="size-full" :size="0">
    <GlobalHeader />
    <GlobalContent />
    <GlobalFooter />
    <NBackTop :right="100" class="z-3" @update:show="handleBackTop" />
  </NFlex>
</template>

<style scoped></style>
