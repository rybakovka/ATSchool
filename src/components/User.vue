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
            <div class="headline">{{ userInfo.Firstname }}</div>
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


          <div slot="header">{{ courceInfo.Name }} <br /> Начало {{ courceInfo.StartDate }} Конец {{ courceInfo.EndDate }} </div>
          <v-card>
            <v-card-text class="grey lighten-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
          </v-card>

          <v-card>
            <v-card-text class="grey lighten-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
          </v-card>

          <v-card>
            <v-card-text class="grey lighten-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
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
      courceInfo: {
        Name: 'Name'
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
          this.$data.userInfo.Firstname = store.state.userInfo.name;
          this.$data.userInfo.Lastname = store.state.userInfo.last_name;
          this.$data.userInfo.Middlename = store.state.userInfo.middle_name;
          this.$data.userInfo.State = (store.state.userInfo.co_worker) ? 'Coworker' :
                                                                (true) ? 'Student' : '';
        });

        store.dispatch('getCources').then(() => {
          this.$data.courceInfo.Name = store.state.cources.Name;
          this.$data.courceInfo.StartDate = store.state.cources.StartDate;
          this.$data.courceInfo.EndDate = store.state.cources.EndDate;
          console.log(store.state.cources); 
        });
    }
  }
</script>