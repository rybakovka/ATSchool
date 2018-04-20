<template>
  <div id="app">
<!--
    <img src="./assets/logo.png">
    <ul>
      <li><router-link to="/" exact>Home</router-link></li>
      <li><router-link to="/authorize">Authorize</router-link></li>
    </ul>
    -->
    <router-view/>

  </div>
</template>

<script>


  import { store } from './main.js'

  export default {
    name: 'App'
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>