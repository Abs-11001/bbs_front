import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 评论相关组件级样式
import UndrawUi from 'undraw-ui'
import 'undraw-ui/dist/style.css'


import '@/assets/css/base.css'
import '@/assets/css/media_max_width_820px.less'

const app = createApp(App)
app.use(router)
app.use(UndrawUi)
app.mount('#app')
