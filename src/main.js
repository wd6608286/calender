import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'
import router from './router'
import './assets/bootstrap.css'
import './assets/jquery-ui.css'
import './assets/style.css'
import './assets/clndr.css'
import './assets/audio.css'
import './assets/easy-responsive-tabs.css'

const app = createApp(App)
app.use(i18n)
app.use(router)
app.mount('#app')