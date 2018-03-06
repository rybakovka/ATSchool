// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import App from './App'
import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

//import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap-vue/dist/bootstrap-vue.css'
//import navbar from 'vue-strap/src/Navbar'
//import dropdown from 'vue-strap/src/Dropdown'

import HelloWorld from '@/components/HelloWorld';
import Authorize from '@/components/Authorize';
import User from '@/components/User';
import NotFound from '@/components/NotFound';

Vue.use(Vuex);

export const store = new Vuex.Store({
    strict: true,
    state: {
        count: 0
    },
    //Чтобы инициировать обработку мутации, необходимо вызвать store.commit, уточнив
    mutations: {
        increment (state) {
        state.count++
        }
    },
    //Действия запускаются методом store.dispatch:
    actions: {
        incrementAsync ({ commit }) {
            setTimeout(() => {
                commit('increment');
                console.log('increment');
            }, 2000)
        }
    }
});

/*
export var bus = new Vue({

});


bus.$on('id-selected', function(id) {
    console.log('11');
});

*/

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
});