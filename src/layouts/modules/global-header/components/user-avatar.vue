<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/modules/auth'
import { useSvgIcon } from '@/hooks/common/icon'
import { useRouterPush } from '@/hooks/common/router'
import { $t } from '@/locales'
import type { VNode } from 'vue'

defineOptions({
  name: 'UserAvatar',
})

const authStore = useAuthStore()
const { routerPushByKey, toLogin } = useRouterPush()
const { SvgIconVNode } = useSvgIcon()

function loginOrRegister() {
  toLogin()
}

type DropdownKey = '/user-center/' | 'logout'

type DropdownOption =
  | {
      key: DropdownKey
      label: string
      icon?: () => VNode
    }
  | {
      type: 'divider'
      key: string
    }

const options = computed(() => {
  const opts: DropdownOption[] = [
    {
      label: $t('common.userCenter'),
      key: '/user-center/',
      icon: SvgIconVNode({ icon: 'ph:user-circle', fontSize: 18 }),
    },
    {
      type: 'divider',
      key: 'divider',
    },
    {
      label: $t('common.logout'),
      key: 'logout',
      icon: SvgIconVNode({ icon: 'ph:sign-out', fontSize: 18 }),
    },
  ]

  return opts
})

function logout() {
  window.$dialog?.info({
    title: $t('common.tip'),
    content: $t('common.logoutConfirm'),
    positiveText: $t('common.confirm'),
    negativeText: $t('common.cancel'),
    onPositiveClick: () => {
      authStore.resetStore()
    },
  })
}

function handleDropdown(key: DropdownKey) {
  if (key === 'logout') {
    logout()
  } else {
    // If your other options are jumps from other routes, they will be directly supported here
    routerPushByKey(key)
  }
}
</script>

<template>
  <NButton v-if="!authStore.isLogin" quaternary @click="loginOrRegister">
    {{ $t('page.login.common.loginOrRegister') }}
  </NButton>
  <NDropdown v-else placement="bottom" trigger="click" :options="options" @select="handleDropdown">
    <div>
      <ButtonIcon>
        <SvgIcon icon="ph:user-circle" class="text-lg" />
        <span class="text-16px font-medium">{{ authStore.userInfo.userName }}</span>
      </ButtonIcon>
    </div>
  </NDropdown>
</template>

<style scoped></style>
