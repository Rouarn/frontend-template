<script setup lang="ts">
import type { PopoverPlacement } from 'naive-ui'

defineOptions({
  name: 'ButtonIcon',
  inheritAttrs: false,
})

interface Props {
  /** Button class */
  class?: string
  /** Iconify icon name */
  icon?: string
  /** Tooltip content */
  tooltipContent?: string
  /** Tooltip placement */
  tooltipPlacement?: PopoverPlacement
  zIndex?: number
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
  icon: '',
  tooltipContent: '',
  tooltipPlacement: 'bottom',
  zIndex: 98,
})
</script>

<template>
  <NTooltip :placement="tooltipPlacement" :z-index="zIndex" :disabled="!tooltipContent">
    <template #trigger>
      <NButton quaternary :class="`h-[36px] text-icon, ${props.class}`" v-bind="$attrs">
        <div class="flex-center gap-8px">
          <slot>
            <SvgIcon :icon="icon" />
          </slot>
        </div>
      </NButton>
    </template>
    {{ tooltipContent }}
  </NTooltip>
</template>

<style scoped></style>
