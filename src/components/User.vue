<template>
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      v-model="drawerRight"
      right
      clipped
      app
    >
        <!-- --> 

        
    </v-navigation-drawer>
    <v-toolbar
      color="blue-grey"
      dark
      fixed
      app
      clipped-right
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Toolbar</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.stop="drawerRight = !drawerRight"></v-toolbar-side-icon>
    </v-toolbar>
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
    >

      <v-card>
        <v-card-media
          src="https://vuetifyjs.com/static/doc-images/cards/sunshine.jpg"
          height="200px"
        >
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <div class="headline">{{ userInfo.name }}</div>
            <div class="headline">{{ userInfo.Lastname }}</div>
            <div class="headline">{{ userInfo.Middlename }}</div>
            <span class="grey--text">{{userInfo.State}}</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat>Редактировать</v-btn>
        </v-card-actions>
      </v-card>

<!-- --> 

    </v-navigation-drawer>
    <v-navigation-drawer
      temporary
      v-model="left"
      fixed
    ></v-navigation-drawer>

    <v-content>

      <v-expansion-panel expand>
        <v-expansion-panel-content>
          <div slot="header">Item</div>
          <v-card>
            <v-card-text class="grey lighten-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
          </v-card>

          <v-card>
            <v-card-text class="grey lighten-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
          </v-card>

          <v-card>
            <v-card-text class="grey lighten-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>


      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex shrink>



          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-navigation-drawer
      right
      temporary
      v-model="right"
      fixed
    >
    
    </v-navigation-drawer>
    <v-footer color="blue-grey" class="white--text" app>
      <span>Vuetify</span>
      <v-spacer></v-spacer>
      <span>&copy; 2008-2018 Перфоманс Лаб</span>
    </v-footer>
  </v-app>
</template>

<script>

  import { store } from '../main.js'


  export default {



    data: () => ({
      userInfo: {
        Firstname: '!',
        Lastname: '@',
        Middlename: '#',
        State: 'Student'
      },
      drawer: true,
      drawerRight: true,
      right: null,
      left: null
    }),
    props: {
      source: String
    },
    created: function () {
        store.dispatch('infoByCookie').then(() => {
          console.log('успех');
        });
        //console.log(this.userInfo);
        //store.dispatch('getCources');
        //this.$data.userInfo.Firstname = store.getters.getUserInfo.name; 
        //console.log(store.getters.getUserInfo);
        /*store.dispatch('infoByCookie').then(() => {
          console.log('данные загружены');
        })*/

    }
  }
</script>

<!--


<template>

<div>
    <button class="btn btn-primary" v-on:click="showCource">Получить курс</button>
</div>

</template>


<script>

import { store } from '../main.js'

export default {
  name: 'User',
  data () {
    return {}
  },
  methods: {
    showCource: function() {
      store.dispatch('getCource');
    }
  }
}

</script>

-->



<!--
<template>
    <div>
        <h2>
            User {{$route.params.id }}
            Перенести страницу пользователя
        </h2>
    </div>
</template>

<script>

    import { store } from '../main.js'



    export default {

        name: 'User',
        methods: {

        }

    }

</script> -->