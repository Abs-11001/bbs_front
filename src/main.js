import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@/assets/css/base.css'
import '@/assets/css/media_max_width_820px.less'

const app = createApp(App)
app.use(router)
app.mount('#app')
