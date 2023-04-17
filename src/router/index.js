import { createRouter, createWebHashHistory } from 'vue-router'
import  TheHome from '@/pages/home/TheHome.vue'
import Announcement from "@/pages/announcement/Announcement.vue";

const routes = [
    {
      path: '/',
      redirect: '/home',
    },
    {
        path: '/home',
        name: 'home',
        component: TheHome
    },
    {
        path: '/announcement',
        name: 'announcement',
        component: Announcement
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router