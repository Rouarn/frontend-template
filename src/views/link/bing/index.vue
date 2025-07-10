<template>
  <div class="card content-box">
    <IframePage url="http://www.shixian.xyz"></IframePage>
  </div>
</template>

<script setup lang="ts" name="bing">
import IframePage from '@/views/_builtin/iframe-page/[url].vue'

definePage({
  meta: {
    title: 'Bing',
    isKeepAlive: true,
  },
})
</script>

<style scoped lang="scss"></style>
