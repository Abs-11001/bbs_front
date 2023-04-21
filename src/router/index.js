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
                name: 'allAnnouncement',
                path: 'allAnnouncement',
                component: () => import('@/pages/announcement/allAnnouncement/index.vue')
            },
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
    },
    {
        path: '/informationSharing',
        name: 'informationSharing',
        component: () => import('@/pages/informationSharing/index.vue')
    },
    {
        path: '/editor',
        name: 'editor',
        component: () => import('@/pages/EditArtical/EditArtical.vue'),
        meta: {fullScreen: true}
    },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})


export default router