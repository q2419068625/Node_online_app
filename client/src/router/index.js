import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'index',
        component: () =>
            import ('../views/Index.vue'),
        redirect: '/chats',
        children: [{
                path: '/chats',
                name: 'chats',
                component: () =>
                    import ('../views/Chats.vue')
            },
            {
                path: '/contacts',
                name: 'contacts',
                component: () =>
                    import ('../views/Contacts.vue')
            },
            {
                path: '/discover',
                name: 'discover',
                component: () =>
                    import ('../views/Discover.vue')
            }, {
                path: '/me',
                name: 'me',
                component: () =>
                    import ('../views/Me.vue')
            }

        ]
    }, {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () =>
            import ('../views/Register.vue')
    },
    {
        path: '/moments',
        name: 'moments',
        component: () =>
            import ('../views/Moments.vue')
    },
    {
        path: '/publish',
        name: 'publish',
        component: () =>
            import ('../views/Publish.vue')
    },
    {
        path: '/information',
        name: 'information',
        component: () =>
            import ('../views/Information.vue')
    },
    {
        path: '/chat',
        name: 'chat',
        component: () =>
            import ('../views/ChatView.vue')
    }
]

const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
    const isLogin = localStorage.getItem("wxToken") ? true : false;
    if (to.path == '/login' || to.path == '/register') {
        next();
    } else {
        isLogin ? next() : next('/login')
    }
})

export default router