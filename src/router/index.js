//按需引入路由方法
import {createRouter, createWebHashHistory} from 'vue-router'

//定义路由规则
const routes = [
    {
        path: '/',
        component:()=>import('../views/Main.vue'),
        name: 'home1',
        redirect: 'home',
        children: [],
        /*children:[
            {
                path: '/home',
                name: 'home',
                component:()=>import('../views/home/Home.vue')
            },
            {
                path: '/user',
                name: 'user',
                component:()=>import('../views/user/User.vue')
            },
            {
                path: '/page1',
                name: 'page1',
                component:()=>import('../views/page/Page1.vue')
            },
            {
                path: '/page2',
                name: 'page2',
                component:()=>import('../views/page/Page2.vue')
            }
        ]*/
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue'),
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router