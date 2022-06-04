import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/drivers',
        name: 'Drivers',
        component: ()=>import('../layaout/Main-Layaout'),
        children:[
            {
                path: '',
                component: ()=>import('../views/driver/drivers'),
            },
            {
                path: ':id',
                component: ()=>import('../views/driver/driversDetail'),
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
                component: ()=>import('../views/truck/trucks'),
            },
            {
                path: ':id',
                component: ()=>import('../views/truck/trucksDetailPage'),
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
                component: ()=>import('../views/trailer/trailers'),
            },
            {
                path: ':id',
                component: ()=>import('../views/trailer/trailersDetailPage'),
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
                component: ()=>import('../views/car/cars'),
            }

        ]
    },
    {
        path: '/reports',
        name: 'Reports',
        component: ()=>import('../layaout/Main-Layaout'),
        children:[
            {
                path: '',
                name: 'ReportsDetail',
                component: ()=>import('../views/reports/reports'),
                children:[
                    {
                        path: '',
                        component: () => import('../components/views/reports/ReportsMainPage'),
                    },
                    {
                        path: ':id/drivers',
                        component: () => import('../components/views/reports/drivers/ReportsDetailPage'),
                    },
                    {
                        path: ':id/trucks',
                        component: () => import('../components/views/reports/trukc/ReportsDetailPage'),
                    },
                    {
                        path: ':id/trailers',
                        component: () => import('../components/views/reports/trailer/ReportsDetailPage'),
                    }

                ]
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
        path: '/settings',
        name: 'Settings',
        component: ()=>import('../layaout/Main-Layaout'),
        children:[
            {
                path: '',
                component: ()=>import('../views/settings/settings'),
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
