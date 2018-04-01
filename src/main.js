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
import VueCookie from 'vue-cookie';

Vue.use(Vuex);
Vue.use(VueCookie);

export const store = new Vuex.Store({
    strict: true,
    state: {
        lp: { },
        userInfo: { }
    },
    //Чтобы инициировать обработку мутации, необходимо вызвать store.commit, уточнив
    mutations: {
        loginAndPassword(state, lp) {
            state.lp = lp;
        },
        setUserInfo(state, info) {
            state.userInfo = info;
            console.log(state.userInfo);
        },
        clear(state) {
            state = null;
        }
    },
    //Действия запускаются методом store.dispatch:
    actions: {
        authByPassword({ commit }) {
            return new Promise((resolve, reject) => {
            Axios.post('http://localhost:8080/auth', { login: this.state.lp.login, passMD5: this.state.lp.password })
                .then(Response => {
                    console.log(Response.data);
                    if (Response.data.code === 201) {
                        Vue.cookie.set('session', Response.data.sessionID, 1);
                        console.log('сделали куку' + Response.data.sessionID);
                        router.push({ name: 'User', params: { id:123 }});
                    } else {
                        console.log('код ответа: ' + Response.data.code);
                    }
                    resolve();
                })
                .catch(e => {

                });
            });
        },

        authByCookie({ commit }) {
            var session = Vue.cookie.get('session');
            if(session) {
                console.log('Promise');
                Axios.get(`http://localhost:8080/user/session/${session}`).
                then(Response => {
                    console.log(Response.data);
                    commit('setUserInfo', Response.data);
                    router.push({ name: 'User', params: { id:123 }});

                });
            } else {
                console.log('нет куки')
            }
        },

        logIn({ dispatch, commit }) {

            return dispatch('authByPassword').then(() => {

                var session = Vue.cookie.get('session');
                if(session) {
                    Axios.get(`http://localhost:8080/user/session/${session}`).
                    then(Response => {
                        console.log(Response.data);
                        commit('setUserInfo', Response.data);
                    });
                } else {
                    console.log('нет куки')
                }

                //this.$router.push({ name: 'User', params: { id: 123 } });

            });
        },

        logOut({ commit }) {

            var session = Vue.cookie.get('session');
            if(session) {
                Axios.delete(`http://localhost:8080/user/session/${session}`).
                then(Response => {
                    console.log(Response.data);
                });
                Vue.cookie.delete('session');
            } else {
                console.log('нет куки')
            }
            commit('clear');
        }
    }
});

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',

    created: function () {
        console.log('Created');
    }
});

