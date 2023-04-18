import { createRouter, createWebHashHistory } from 'vue-router'
import  TheHome from '@/pages/home/TheHome.vue'
import Announcement from "@/pages/announcement/index.vue";

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
        component: Announcement,
        redirect: 'announcement/newAnnouncement',
        children: [
            {
                name: 'newAnnouncement',
                path: 'newAnnouncement',
                component: () => import('@/pages/announcement/newAnnouncement/index.vue')
            },
            {
                name: 'detailAnnouncement',
                path: 'detailAnnouncement',
                component: () => import('@/pages/announcement/detailAnnouncement/index.vue')
            }
        ]
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router