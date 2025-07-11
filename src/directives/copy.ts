/**
 * v-copy
 * 复制某个值至剪贴板
 * 接收参数：string类型/Ref<string>类型/Reactive<string>类型
 */

import type { Directive, DirectiveBinding } from 'vue'

interface ElType extends HTMLElement {
  copyData: string | number
}
const copy: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    el.copyData = binding.value
    el.addEventListener('click', handleClick)
  },
  updated(el: ElType, binding: DirectiveBinding) {
    el.copyData = binding.value
  },
  beforeUnmount(el: ElType) {
    el.removeEventListener('click', handleClick)
  },
}

async function handleClick(this: ElType) {
  try {
    await navigator.clipboard.writeText(String(this.copyData))
    window.$message?.success('复制成功')
  } catch (err) {
    console.error('复制操作不被支持或失败: ', err)
  }
}

export default copy
