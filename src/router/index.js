import Router from 'vue-router';
import Vue from 'vue';

import HelloWorld from '@/components/HelloWorld';
import Authorize from '@/components/Authorize';
import User from '@/components/User';
import NotFound from '@/components/NotFound';

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/authorize',
            name: 'Authorize',
            component: Authorize
        },
        {
            path: '/user',
            name: 'User',
            component: User
        },
        {
            path: '*',
            name: 'NotFound',
            component: NotFound
        }
    ]
});