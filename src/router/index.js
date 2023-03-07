import { createRouter, createWebHashHistory } from 'vue-router'
import  TheHome from '@/pages/home/TheHome.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: TheHome
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router