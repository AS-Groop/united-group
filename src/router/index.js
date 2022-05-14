import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/drivers',
        name: 'Drivers',
        component: ()=>import('../layaout/Main-Layaout'),
        children:[
            {
                path: '',
                component: ()=>import('../views/drivers'),
            },
            {
                path: ':id',
                component: ()=>import('../views/driversDetail'),
            },

        ]
    },
    {
        path: '/trucks',
        name: 'Trucks',
        component: ()=>import('../layaout/Main-Layaout'),
        children:[
            {
                path: '',
                component: ()=>import('../views/trucks'),
            },

        ]
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
        component: ()=>import('../layaout/Main-Layaout'),
    },
    {
        path: '/*',
        name: 'Ui',
        component: ()=>import('../layaout/Main-Layaout'),
    },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
