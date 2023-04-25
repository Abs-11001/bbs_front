import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import piniaPluginPersist   from 'pinia-plugin-persist'

// 评论相关组件级样式
import UndrawUi from 'undraw-ui'
import 'undraw-ui/dist/style.css'
//  自定义样式
import '@/assets/css/base.css'
import '@/assets/css/media_max_width_820px.less'

const app = createApp(App)
const pinia = createPinia()

// setup模式下没有store.$reset()方法，需要手动加上
pinia.use(({store})=>{
    const initialState = JSON.parse(JSON.stringify(store.$state));
    store.$reset = ()=>{
        store.$state = JSON.parse(JSON.stringify(initialState));
    }
})
// 使用持久化插件
pinia.use(piniaPluginPersist)

app.use(router)
app.use(UndrawUi)
app.use(pinia)
app.mount('#app')
