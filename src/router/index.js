//按需引入路由方法
import {createRouter, createWebHashHistory} from 'vue-router'

//定义路由规则
const routes = [
    {
        path: '/',
        component:()=>import('../views/Main.vue'),
        children:[
            {
                path: '/',
                name: 'home',
                component:()=>import('../views/home/Home.vue')
            }
        ]
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router