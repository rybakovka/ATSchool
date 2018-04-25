<template>
  <form>
    <v-text-field
      label="E-mail"
      v-model="email"
      :error-messages="emailErrors"
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
      required
    ></v-text-field>
    <v-text-field
      label="Password"
      v-model="password"
      :error-messages="passwordErrors"
      :counter="20"
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
      required
    ></v-text-field>
    <v-checkbox
      label="Чужой компьютер"
      v-model="checkbox"
      required
    ></v-checkbox>
    <v-btn @click="submit">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, minLength, email, password } from 'vuelidate/lib/validators'

  import { store } from '../main.js'

  export default {
    mixins: [validationMixin],

    validations: {
      email: { required, email },
      password: { required, minLength: minLength(8), maxLength: maxLength(15) }
    },

    data: () => ({
      email: '',
      password: '',
      select: null,
      checkbox: false
    }),

    computed: {
      checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.required && errors.push('You must agree to continue!')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.maxLength && errors.push('Password must be at max 15 characters long')
        !this.$v.password.minLength && errors.push('Password must be at min 8 characters long')
        !this.$v.password.required && errors.push('Password is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      }
    },

    methods: {
      submit () {
        this.$v.$touch();
        store.commit('loginAndPassword', this.$data  );
        store.dispatch('logIn');
      },
      clear () {
        this.$v.$reset()
        this.email = ''
        this.password = ''
        this.checkbox = false
      }
    }
  }
</script>



<!--



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
      <button class="btn btn-primary" v-on:click="authFromCookie">Авторизация по Куки</button>

  </section>
</template> 



<script>

import { store } from '../main.js'


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
      store.commit('loginAndPassword', this.$data );
      store.dispatch('logIn');
    },
    logOut: function() {
      store.dispatch('logOut');
    },
    authFromCookie: function () {
      store.dispatch('authByCookie');
    }
  }
}

</script>




-->