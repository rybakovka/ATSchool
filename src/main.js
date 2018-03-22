// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import App from './App';
import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';
import VueCookie from 'vue-cookie';

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
Vue.use(VueCookie);

export const store = new Vuex.Store({
    strict: true,
    state: {
        login: '',
        password: '',
        authorized: false,
        session: ''
    },
    getters: {
        userAuthorized: state => {
            return state.authorized;
        }
    },
    //Чтобы инициировать обработку мутации, необходимо вызвать store.commit, уточнив
    mutations: {
        loginAndPassword(state, lp) {
            state.login = lp.login;
            state.password = lp.password;
        },
        successfulAuthorization(state) {
            state.authorized = true;
        },
        ansuccessfulAuthorization(state) {
            state.authorized = false;
        }
    },
    //Действия запускаются методом store.dispatch:
    actions: {
        authFromRest({ commit }) {
            return new Promise((resolve, reject) => {
                Axios.post('http://localhost:8080/auth', { login: this.state.login, passMD5: this.state.password })
                    .then(Response => {
                        console.log('Ответ сервера: ' + Response.data);
                        if (Response.data.code == 201) {
                            this.$cookie.set('session', Response.data.sessionId, 7);
                            console.log('сделали куку');
                        } else {
                            console.log('код ответа: ' + Response.data.code);
                        }
                        resolve();
                    })
                    .catch(e => {
                        commit('ansuccessfulAuthorization');
                    });
            });
        },
        authFromCookie({ commit }) {

        },
        logIn({ dispatch, commit }) {
            return dispatch('authFromRest').then(() => {
                commit('successfulAuthorization');
                //this.$router.push({ name: 'User', params: { id: 123 } });
                console.log('выполнено');
            });
        },
    }
});

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
});