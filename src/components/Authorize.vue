<template>
  <section>
    <h2>Авторизация</h2>
    <form class="col-md-6" v-on:submit.prevent="logIn"> 
        <br>
        <label>Логин &nbsp;&nbsp;&nbsp;&nbsp;  </label>
        <input type="text" v-model="login" placeholder="Введите логин"/><br>
        <label>Пароль &nbsp; </label>
        <input type="password" v-model="password" placeholder="Введите пароль"/><br>
        <button class="btn btn-primary" type="submit">Вход</button>
    </form>
    <button class="btn btn-primary" v-on:click="logOut">Выход</button>
  </section>
</template> 



<script>

import { store } from '../main.js'

  /**
   * Любой компонент можно использовать несколько раз в виде тега https://ru.vuejs.org/v2/guide/components.html
   *
   * Коммуникация между несвязангными компонентами 
   * https://ru.vuejs.org/v2/guide/components.html#%D0%9A%D0%BE%D0%BC%D0%BC%D1%83%D0%BD%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8F-%D0%BC%D0%B5%D0%B6%D0%B4%D1%83-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D0%B0%D0%BC%D0%B8-%D0%BD%D0%B5-%D1%81%D0%B2%D1%8F%D0%B7%D0%B0%D0%BD%D0%BD%D1%8B%D0%BC%D0%B8-%D0%B8%D0%B5%D1%80%D0%B0%D1%80%D1%85%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8
   */

export default {
  name: 'Authorize',
  data () {
    return {
      login: '',
      password: ''
    }
  },
  methods: {
    logIn: function() {
      this.$cookie.set('1','1',1);
      //JSON.stringify(this.$data)
      store.commit('loginAndPassword', this.$data );
      store.dispatch('logIn');
      console.log(store.getters.userAuthorized);
      //this.$router.push({ name: 'User', params: { id:123 }}); 
    },
    logOut: function() {
      console.log('logOut');
    }
    
  }
}

</script>