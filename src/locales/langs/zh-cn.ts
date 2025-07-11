const local: App.I18n.Schema = {
  common: {
    backToHome: '返回首页',
  },
  system: {
    title: 'XiaJI',
    updateTitle: '系统版本更新通知',
    updateContent: '检测到系统有新版本发布，是否立即刷新页面？',
    updateConfirm: '立即刷新',
    updateCancel: '稍后再说',
  },
  page: {
    about: {
      title: '关于',
      introduction: `FrontendTemplate 是一个优雅且功能强大的后台管理模板，基于最新的前端技术栈，包括 Vue3, Vite7, TypeScript, Pinia 和 UnoCSS。它内置了丰富的主题配置和组件，代码规范严谨，实现了自动化的文件路由系统。为您提供了一站式的前台开发解决方案，无需额外配置，开箱即用。同样是一个快速学习前沿技术的最佳实践。`,
      projectInfo: {
        title: '项目信息',
        version: '版本',
        latestBuildTime: '最新构建时间',
        githubLink: 'Github 地址',
        previewLink: '预览地址',
      },
      prdDep: '生产依赖',
      devDep: '开发依赖',
    },
  },
}

export default local
