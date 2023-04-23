import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
import { checkToken } from "@/api/login/user";

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
        meta: {isLogin: true}
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/login/index.vue')
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

// 切换路由时进行一些鉴权操作
router.beforeEach(async (to, from) => {
    // 如果to过去的页面不需要登录则直接跳转
    if(!to.meta.isLogin) return

    const token = localStorage.getItem('token')
    const expireTime = localStorage.getItem('expireTime')
    // 当前时间
    const begin = new Date()
    // token 有效时间
    const end = new Date(expireTime)
    // 如果当前时间 在有效时间之前...
    if(begin <= end) {
        let failFlag = true
        // 必要要等待这个结束再去判断failFlag的值
         await checkToken({token}).then(res => {
            const { code, msg } = res
            // debugger
            if(code === 200 && msg === '验证成功') {
                failFlag = false
            }
        }, err => {
            console.log(err)
        })
        // 验证失败
        if(failFlag){
            return {
                path: '/login',
                query: {
                    'redirect': to.name
                }
            }
        }
    } else {
        // 不在有效期内，则重新登录
        return {
            path: '/login',
            query: {
                'redirect': to.name
            }
        }
    }
})


export default router