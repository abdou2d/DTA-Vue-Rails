// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import { Store } from '@/store/Store';
import App from './App';
import router from './router';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },

  created() {
    axios.interceptors.request.use((config) => {
      config.headers.client = window.localStorage.getItem('client');
      config.headers['access-token'] = window.localStorage.getItem('access-token');
      config.headers.uid = window.localStorage.getItem('uid');
      config.headers['token-type'] = window.localStorage.getItem('token-type');

      return config;
    });

    axios.interceptors.response.use((response) => {
      // Set user headers only if they are not blank.
      // If DTA gets a lot of request quickly, it won't return headers for some requests
      // so you need a way to keep headers in localStorage to gettting set to undefined
      if (response.headers.client) {
        localStorage.setItem('access-token', response.headers['access-token']);
        localStorage.setItem('client', response.headers.client);
        localStorage.setItem('uid', response.headers.uid);
        localStorage.setItem('token-type', response.headers['token-type']);
      }
      // You have to return the response here or you won't have access to it
      // later
      return response;
    });
  },

  beforeMount() {
    const API_URL = 'http://localhost:3000/api/';
    const VALIDATE_URL = `${API_URL}auth/validate_token`;

    // check if the user has a valid token and populate user store info
    axios.get(VALIDATE_URL)
      .then((response) => {
        Store.login(response.data.data);
      })
  },
})
