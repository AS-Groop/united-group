import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/drivers',
        name: 'Drivers',
        component: ()=>import('../views/drivers'),
        meta: {auth:true, layout: 'Main'},
    },
    {
        path: '/trucks',
        name: 'Trucks',
        component: ()=>import('../views/trucks'),
        meta: {auth:true, layout: 'Main'},
    },
    {
        path: '/ui',
        name: 'Ui',
        component: ()=>import('../views/ui'),
        meta: {auth:true, layout: 'Ui'},
    },
    {
        path: '/',
        name: 'Ui',
        component: ()=>import('../views/ui'),
        meta: {auth:true, layout: 'Ui'},
    },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
