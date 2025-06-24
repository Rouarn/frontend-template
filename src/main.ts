import './plugins/assets'
import { createApp } from 'vue'
import { setupStore } from './stores'
import App from './App.vue'
import router from './router'
import { setupI18n } from './locales'
import { setupAppVersionNotification, setupDayjs, setupLoading, setupNProgress } from './plugins'

function setupApp() {
  setupLoading()

  setupNProgress()

  setupDayjs()

  const app = createApp(App)

  setupStore(app)

  setupI18n(app)

  app.use(router)

  setupAppVersionNotification()

  app.mount('#app')
}

setupApp()
