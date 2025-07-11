<template>
  <div class="card content-box">
    <span class="text">长按指令 🍇🍇🍇🍓🍓🍓</span>
    <NButton v-longpress="longpress" type="primary"> 长按2秒触发事件 </NButton>
  </div>
</template>

<script setup lang="ts" name="longpressDirect">
const longpress = () => {
  window.$message?.success('长按事件触发成功 🎉🎉🎉')
}
</script>

<style scoped lang="scss">
@use '../index.scss' as *;
</style>
