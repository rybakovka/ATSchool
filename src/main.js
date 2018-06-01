// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import App from './App';
import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';

import HelloWorld from '@/components/HelloWorld';
import Authorize from '@/components/Authorize';
import User from '@/components/User';
import NotFound from '@/components/NotFound';
import Axios from 'axios';
import VueCookie from 'vue-cookie';
import Vuetify from 'vuetify';

Vue.use(Vuex);
Vue.use(VueCookie);
Vue.use(Vuetify);


export const store = new Vuex.Store({

    strict: true,
    state: {
        lp: {},
        userInfo: {
            name: "Константин"
        },
        cources: {

        }
    },
    getters: {
        gerUserInfo: state => {
            return state.userInfo;
        }
    },
    //Чтобы инициировать обработку мутации, необходимо вызвать store.commit, уточнив
    mutations: {
        loginAndPassword(state, lp) {
            state.lp = lp;
        },
        setUserInfo(state, info) {
            state.userInfo = info;
        },
        setCources(state, cources) {
            state.cources = cources;
        },
        clear(state) {
            state = null;
        }
    },
    //Действия запускаются методом store.dispatch:
    actions: {
        authByPassword({ commit }) {
            return new Promise((resolve, reject) => {
                Axios.post('http://localhost:8080/auth', { login: this.state.lp.email, passMD5: this.state.lp.password })
                    .then(Response => {
                        console.log(Response.data);
                        if (Response.data.code === 201) {
                            Vue.cookie.set('session', Response.data.sessionID, { expires: 7 });
                        } else {
                            console.log('код ответа: ' + Response.data.code);
                        }
                        resolve();
                    })
                    .catch(e => {

                    });
            });
        },

        infoByCookie({ commit }) {
            return new Promise((resolve, reject) => {
                var session = Vue.cookie.get('session');
                if (session) {
                    Axios.get(`http://localhost:8080/user/session/${session}`).
                    then(Response => {
                        commit('setUserInfo', Response.data);
                        //router.push({ name: 'User', params: { id: 123 } });
                        resolve();
                    });
                } else {
                    console.log('нет куки');
                }
            });
        },


        logIn({ dispatch, commit }) {
            return dispatch('authByPassword').then(() => {});
        },

        logOut({ commit }) {
            var session = Vue.cookie.get('session');
            if (session) {
                Axios.delete(`http://localhost:8080/user/session/${session}`); //.
                //then(Response => {
                //    console.log(Response.data);
                //});
                Vue.cookie.delete('session');
            } else {
                console.log('нет куки');
            }
            commit('clear');
        },

        getCources({ commit }) {
            return new Promise((resolve, reject) => {
                var session = Vue.cookie.get('session');
                if (session) {
                    Axios.get(`http://localhost:8080/courses/session/${session}`).
                    then(Response => {
                        commit('setCources', Response.data);
                        resolve();
                    });
                } else {
                    console.log('нет куки');
                }
            });
        }
    }
});

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',

    created: function() {
        console.log('Created');
    }
});