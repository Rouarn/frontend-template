import './plugins/assets'
import { createApp } from 'vue'
import App from './App.vue'
import { setupI18n } from './locales'
import { setupAppVersionNotification, setupDayjs, setupLoading, setupNProgress, setupIconifyOffline } from './plugins'
import router from './router'
import { setupStore } from './stores'

function setupApp() {
  setupLoading()

  setupNProgress()

  setupIconifyOffline()

  setupDayjs()

  const app = createApp(App)

  setupStore(app)

  setupI18n(app)

  app.use(router)

  setupAppVersionNotification()

  app.mount('#app')
}

setupApp()
