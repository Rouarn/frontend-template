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
      introduction: `FrontendTemplate is an elegant and powerful back-end management template based on the latest front-end technology stack, including Vue3, Vite7, TypeScript, Pinia and UnoCSS. It is equipped with a rich set of theme configurations and components, and its code is standardized and rigorous, achieving an automated file routing system. We offer you a one-stop front-end development solution that requires no additional configuration and is ready to use out of the box. It is also a best practice for quickly learning cutting-edge technologies.`,
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
