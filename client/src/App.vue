<template>
  <div id="app">
    <nav class="navbar">
      <div class="navbar-end" v-show="Store.user.isAuth">
        <button class="button is-warning" @click="logout">Logout</button>
      </div> 
    </nav> 
    <div class="columns">
      <div class="column">
        <img src="./assets/logo.png">
      </div>
      <div class="column">
        <span class="mega-plus">+</span>
      </div>
      <div class="column">
        <img src="https://github.com/lynndylanhurley/devise_token_auth/raw/master/test/dummy/app/assets/images/logo.jpg" width="300px">
      </div>
    </div>

    <router-view/>
  
  </div>
</template>

<script>

import { Store } from '@/store/Store';
import router from './router';

export default {
  name: 'app',

  data () {
    return {
      Store
    }
  },

  methods: {
    logout() {
      Store.user.isAuth = false
      localStorage.removeItem('access-token');
      localStorage.removeItem('client');
      localStorage.removeItem('uid');
      localStorage.removeItem('token-type');
      router.push({ name: 'Home' });
    }
  }
}
</script>

<style lang="scss">

@import '../node_modules/bulma/bulma.sass';
@import '../node_modules/bulma/sass/utilities/initial-variables.sass';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
};

.columns {
  padding: 20px;
}

.mega-plus {
  font-size: 10em;
}
</style>
