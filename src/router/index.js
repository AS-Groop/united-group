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
            {
                path: ':id',
                component: ()=>import('../views/trucksDetailPage'),
            },

        ]
    },
    {
        path: '/trailers',
        name: 'Trailers',
        component: ()=>import('../layaout/Main-Layaout'),
        children:[
            {
                path: '',
                component: ()=>import('../views/trailers'),
            },
            {
                path: ':id',
                component: ()=>import('../views/trailersDetailPage'),
            },

        ]
    },
    {
        path: '/cars',
        name: 'Cars',
        component: ()=>import('../layaout/Main-Layaout'),
        children:[
            {
                path: '',
                component: ()=>import('../views/cars'),
            }

        ]
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: ()=>import('../layaout/Main-Layaout'),
        children:[
            {
                path: '',
                component: ()=>import('../views/dashboard'),
            }

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
        name: 'asd',
        component: ()=>import('../views/login'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'asds',
        component: ()=>import('../layaout/Layout404'),
    },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
