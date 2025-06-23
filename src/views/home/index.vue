<script setup lang="ts">
import { $t } from '@/locales'

const open = () => {
  window.$loading?.open()
}
setTimeout(() => {
  window.$loading?.close()
}, 2000)
</script>

<template>
  <NSpace class="h-full w-full flex-center" vertical>
    <NButton type="primary" @click="open">{{ $t('system.title') }}</NButton>
  </NSpace>
</template>
