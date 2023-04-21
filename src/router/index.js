import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes = [

    {
        path: '/',
        redirect: 'home',
        component: Layout,
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('@/pages/home/TheHome.vue')
            },
            {
                path: 'announcement',
                name: 'announcement',
                component: () => import('@/pages/announcement/index.vue'),
                redirect: {name: 'newAnnouncement'},
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
                path: 'informationSharing',
                name: 'informationSharing',
                component: () => import('@/pages/informationSharing/index.vue')
            },
        ]
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