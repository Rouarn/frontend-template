<script setup lang="ts">
import GlobalHeader from '../modules/global-header/index.vue'
import GlobalContent from '../modules/global-content/index.vue'
import GlobalFooter from '../modules/global-footer/index.vue'

defineOptions({
  name: 'BlankLayout',
})

const handleBackTop = (item: boolean) => {
  window.$message?.success(item ? '返回顶部' : '取消返回顶部')
}
</script>

<template>
  <div>
    <GlobalHeader />
    <GlobalContent />
    <GlobalFooter />
    <NBackTop :right="100" class="z-3" @update:show="handleBackTop" />
  </div>
</template>

<style scoped></style>
