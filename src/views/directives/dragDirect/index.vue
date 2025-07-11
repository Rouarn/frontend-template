<template>
  <div class="card content-box">
    <span class="text">拖拽指令 🍇🍇🍇🍓🍓🍓</span>
    <div v-draggable class="drag-box flex-center">我可以拖拽哦~</div>
  </div>
</template>

<script setup lang="ts" name="dragDirect"></script>

<style scoped lang="scss">
@use '../index.scss' as *;
.content-box {
  position: relative;
  .drag-box {
    position: absolute;
    top: 110px;
    width: 300px;
    height: 300px;
    font-size: 23px;
    font-weight: bold;
    color: rgb(var(--primary-300-color));
    background: rgb(var(--info-700-color));
    border-radius: 50%;
  }
}
</style>
