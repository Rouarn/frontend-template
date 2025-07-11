const local: App.I18n.Schema = {
  common: {
    backToHome: 'Back to home',
  },
  system: {
    title: 'XiaJI',
    updateTitle: 'System Version Update Notification',
    updateContent: 'A new version of the system has been detected. Do you want to refresh the page immediately?',
    updateConfirm: 'Refresh immediately',
    updateCancel: 'Later',
  },
  page: {
    about: {
      title: 'About',
      introduction: `FrontendTemplate is an elegant and powerful admin template, based on the latest front-end technology stack, including Vue3, Vite7, TypeScript, Pinia and UnoCSS. It has built-in rich theme configuration and components, strict code specifications, and an automated file routing system.`,
      projectInfo: {
        title: 'Project Info',
        version: 'Version',
        latestBuildTime: 'Latest Build Time',
        githubLink: 'Github Link',
        previewLink: 'Preview Link',
      },
      prdDep: 'Production Dependency',
      devDep: 'Development Dependency',
    },
  },
}

export default local
