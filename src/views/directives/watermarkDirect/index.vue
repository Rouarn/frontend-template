<route lang="json5">
{
  meta: {
    title: '水印指令',
  },
}
</route>

<template>
  <div v-waterMarker="{ text: 'Frontend Template ', textColor: 'rgba(180, 180, 180, 0.6)' }" class="card content-box">
    <span class="text">水印指令 🍇🍇🍇🍓🍓🍓</span>
  </div>
</template>

<script setup lang="ts" name="watermarkDirect"></script>

<style scoped lang="scss">
@use '../index.scss' as *;
</style>
