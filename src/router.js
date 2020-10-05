import VueRouter from 'vue-router';

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'login',
            component: () => import('@/views/Login.vue'),
        },
        {
            path: '/main',
            name: 'main',
            component: () => import('./views/Main.vue'),
            children: [
                {
                    path: '/markets',
                    name: 'markets',
                    component: () => import('./views/Dashboard.vue'),
                    meta: {
                        // title: 'Рынки',
                    }
                },
                {
                    path: '/users',
                    name: 'users',
                    component: () => import('./views/Users.vue'),
                    meta: {
                        title: 'Пользователи',
                    }
                },
                {
                    path: '/user/:id',
                    name: 'user',
                    component: () => import('./views/User.vue'),
                    props: true,
                },
                {
                    path: '/users/edit/:id',
                    name: 'edit-user',
                    component: () => import('./views/EditUser.vue'),
                    props: true,
                    meta: {
                        title: 'Редактирование',
                    }
                },
                {
                    path: '/organizations',
                    name: 'organizations',
                    component: () => import('./views/Organizations.vue'),
                    meta: {
                        title: 'Организации',
                    }
                },
                {
                    path: '/organizations/:id',
                    name: 'organization',
                    component: () => import('./views/Organization.vue'),
                    props: true,
                },
                {
                    path: '/organizations/edit/:id',
                    name: 'edit-organization',
                    component: () => import('./views/EditOrganization.vue'),
                    props: true,
                    meta: {
                        title: 'Редактирование',
                    }
                },
            ],
        },
    ],
});
