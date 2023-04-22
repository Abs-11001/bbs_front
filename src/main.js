import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// 评论相关组件级样式
import UndrawUi from 'undraw-ui'
import 'undraw-ui/dist/style.css'
//  自定义样式
import '@/assets/css/base.css'
import '@/assets/css/media_max_width_820px.less'

const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(UndrawUi)
app.use(pinia)
app.mount('#app')
