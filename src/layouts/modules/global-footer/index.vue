<script setup lang="ts">
import { NDivider, NIcon, NSpace, NText } from 'naive-ui'

defineOptions({
  name: 'GlobalFooter',
})

const LogoGithub = {
  render() {
    return h(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        width: '20',
        height: '20',
        fill: 'currentColor',
      },
      [
        h('path', {
          d: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
        }),
      ],
    )
  },
}

const LogoTwitter = {
  render() {
    return h(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        width: '20',
        height: '20',
        fill: 'currentColor',
      },
      [
        h('path', {
          d: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z',
        }),
      ],
    )
  },
}

const LogoDiscord = {
  render() {
    return h(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        width: '20',
        height: '20',
        fill: 'currentColor',
      },
      [
        h('path', {
          d: 'M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z',
        }),
      ],
    )
  },
}

const currentYear = new Date().getFullYear()

const footerLinks = [
  {
    title: '产品',
    links: [
      { label: '功能特性', url: '#' },
      { label: '价格方案', url: '#' },
      { label: '使用文档', url: '#' },
    ],
  },
  {
    title: '公司',
    links: [
      { label: '关于我们', url: '#' },
      { label: '加入我们', url: '#' },
      { label: '联系我们', url: '#' },
    ],
  },
  {
    title: '资源',
    links: [
      { label: '博客文章', url: '#' },
      { label: '帮助中心', url: '#' },
      { label: '教程指南', url: '#' },
    ],
  },
  {
    title: '法律',
    links: [
      { label: '隐私政策', url: '#' },
      { label: '服务条款', url: '#' },
      { label: 'Cookie政策', url: '#' },
    ],
  },
]

const socialLinks = [
  {
    name: 'GitHub',
    icon: LogoGithub,
    url: 'https://github.com/your-repo',
  },
  {
    name: 'Twitter',
    icon: LogoTwitter,
    url: 'https://twitter.com/your-account',
  },
  {
    name: 'Discord',
    icon: LogoDiscord,
    url: 'https://discord.gg/your-invite',
  },
]
</script>

<template>
  <footer class="w-full bg-white dark:bg-#18181c border-t border-gray-200 dark:border-gray-700 py-8">
    <div class="max-w-screen-xl mx-auto px-4">
      <!-- 主要内容区域 -->
      <div class="flex flex-col md:flex-row justify-between items-start gap-8">
        <!-- 网站信息 -->
        <div class="flex flex-col items-start space-y-3">
          <div class="flex items-center space-x-2">
            <NImage src="/src/assets/logo.svg" alt="logo" width="28" height="28" />
            <NText class="text-lg font-semibold">前端模板</NText>
          </div>
          <NText depth="3" class="text-sm max-w-xs"> 一个基于Vue 3和Naive UI的现代化前端模板，助力快速开发。 </NText>
          <NText depth="3" class="text-sm"> © {{ currentYear }} 前端模板 版权所有 </NText>
        </div>

        <!-- 链接区域 -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="(group, index) in footerLinks" :key="index" class="min-w-[120px]">
            <NText class="font-medium mb-3 block text-base">{{ group.title }}</NText>
            <NSpace vertical size="small">
              <NText
                v-for="(link, linkIndex) in group.links"
                :key="linkIndex"
                tag="a"
                :href="link.url"
                class="text-sm hover:text-primary cursor-pointer transition-colors"
                depth="3"
              >
                {{ link.label }}
              </NText>
            </NSpace>
          </div>
        </div>

        <!-- 社交链接 -->
        <div class="flex flex-col items-start">
          <NText class="font-medium mb-3 text-base">关注我们</NText>
          <NSpace size="small">
            <NButton
              v-for="(social, index) in socialLinks"
              :key="index"
              text
              tag="a"
              :href="social.url"
              target="_blank"
              class="!p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <NIcon :component="social.icon" size="20" />
            </NButton>
          </NSpace>
        </div>
      </div>

      <!-- 分割线 -->
      <NDivider class="!my-8" />

      <!-- 底部信息 -->
      <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        <NText depth="3" class="text-center md:text-left"> 由我们的团队用 ❤️ 打造 </NText>

        <NSpace size="small" :wrap="true">
          <NText tag="a" href="#" depth="3" class="hover:text-primary cursor-pointer transition-colors"> 隐私政策 </NText>
          <NText tag="a" href="#" depth="3" class="hover:text-primary cursor-pointer transition-colors"> 服务条款 </NText>
          <NText tag="a" href="#" depth="3" class="hover:text-primary cursor-pointer transition-colors"> Cookie政策 </NText>
        </NSpace>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  transition:
    background-color 0.3s,
    border-color 0.3s;
}

// 响应式调整
@media (max-width: 768px) {
  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
