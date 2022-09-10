import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/drivers',
        name: 'Drivers',
        component: ()=>import('../layaout/Main-Layaout'),
        meta:{auth:true},
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
        meta:{auth:true},
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
        meta:{auth:true},
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
        meta:{auth:true},
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
        meta:{auth:true},
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
                        component: () => import('../components/views/drivers/DriversDetailPage'),
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
        path: '/',
        name: 'Dashboard',
        component: ()=>import('../layaout/Main-Layaout'),
        meta:{auth:true},
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
        meta:{auth:true},
        children:[
            {
                path: '',
                redirect: '/users',
            },
            {
                path: '/users',
                component: ()=>import('../views/settings/users'),
            },
            {
                path: '/tasks',
                component: ()=>import('../views/settings/tasks'),
            },
            {
                path: '/company',
                component: ()=>import('../views/settings/company'),
            }

        ]
    },
    {
        path: '/ui',
        name: 'Ui',
        component: ()=>import('../views/ui'),
        // meta:{auth:true}
        meta: {auth:false, layout: 'Ui'},
    },
    {
        path: '/login',
        name: 'Login',
        component: ()=>import('../views/login'),
        meta:{auth:false}
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NoPage',
        component: ()=>import('../layaout/Layout404'),
        meta:{auth:false}
    },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next)=>{
    const token = !!localStorage.getItem('access_token') ;
    const auth = !!to.matched.some(record => record.meta.auth);
    if (!token && auth && (to.path !== '/login') ) {
        return next('/login')
    }
    return  next()
})

export default router
