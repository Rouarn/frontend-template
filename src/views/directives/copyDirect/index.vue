<route lang="json5">
{
  meta: {
    title: '复制指令',
  },
}
</route>

<template>
  <div class="card content-box">
    <span class="text">复制指令 🍇🍇🍇🍓🍓🍓</span>
    <div class="box-content">
      <NInput v-model="data" placeholder="请输入内容" style="width: 500px">
        <template #suffix>
          <NButton v-copy="data"> 复制 </NButton>
        </template>
      </NInput>
    </div>
  </div>
</template>

<script setup lang="ts" name="copyDirect">
import { ref } from 'vue'

const data = ref<string>('我是被复制的内容 🍒 🍉 🍊')
</script>

<style scoped lang="scss">
@use '../index.scss' as *;
</style>
