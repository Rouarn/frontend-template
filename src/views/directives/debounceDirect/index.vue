<template>
  <div class="card content-box">
    <span class="text">防抖指令 🍇🍇🍇🍓🍓🍓</span>
    <NButton v-debounce="debounceClick" type="primary"> 防抖按钮 (0.5秒后执行) </NButton>
  </div>
</template>

<script setup lang="ts" name="debounceDirect">
const debounceClick = () => {
  window.$message?.success('我是防抖按钮触发的事件 🍍🍓🍌')
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
