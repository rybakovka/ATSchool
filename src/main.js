// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import App from './App';
import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';

//import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap-vue/dist/bootstrap-vue.css'
//import navbar from 'vue-strap/src/Navbar'
//import dropdown from 'vue-strap/src/Dropdown'

import HelloWorld from '@/components/HelloWorld';
import Authorize from '@/components/Authorize';
import User from '@/components/User';
import NotFound from '@/components/NotFound';
import Axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
    strict: true,
    state: {
        lp: {}
    },
    getters: {

    },
    //Чтобы инициировать обработку мутации, необходимо вызвать store.commit, уточнив
    mutations: {
        loginAndPassword(state, lp) {
            state.lp = JSON.stringify(lp);
            console.log(state.lp);

            //console.log(JSON.stringify(lp));
            //state.login = JSON.stringify(lp).login;
            //state.password = JSON.stringify(lp).password;
            /* console.log(state.login);
             console.log(state.password);*/
        }
    },
    //Действия запускаются методом store.dispatch:
    actions: {
        auth({ commit }) {

            console.log(state.lp.login + ' +');
            console.log(state.lp.password);

            return new Promise((resolve) => {

                Axios.post('http://localhost:8080/auth', { login: state.lp.login, passMD5: state.lp.password })
                    .then(Response => {
                        console.log(Response.data);
                        resolve();
                    })
                    .catch(e => {
                        this.console.error('ошибка');
                    });
                console.log('get');

                /*
                setTimeout(() => {
                    console.log('начинаем');
                    commit('increment');
                    resolve();
                }, 1000);
                */

            });
        },
        actionB({ dispatch }) {
            return dispatch('actionA').then(() => {
                console.log('выполнено');
            });
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