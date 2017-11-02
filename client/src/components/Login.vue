<template>
  <div>
    <!-- Main container for both login and registration -->
    <div class="columns is-centered">
      <div class="column is-half">

        <!-- Tab navigation between login and register -->
        <div class="tabs">
          <ul>
            <li :class="{ 'is-active' : loginTab }"><a @click="loginTab = true">Login</a></li>
            <li :class="{ 'is-active' : !loginTab }"><a @click="loginTab = false">Signup</a></li>
          </ul>
        </div>
        <!-- End of tab display -->

        <!-- Login tab, conditionally displayed-->
        <div v-if="loginTab">
          <h1 class="title is-2">Login</h1>

          <!-- Error display for login errors -->
          <div v-if="error" v-for="error in errors">
            <p class="help is-danger">{{ error }}</p>
          </div>
          <!-- Success display, only shows on register success -->
          <div v-if="registerSuccess">
            <p class="help is-success">You have been registered</p>
          </div>

          <!-- Login fields -->
          <div class="field has-text-left">
            <label class="label">Email</label>
            <input class="input" type="text" placeholder="Enter your email" v-model="credentials.email" >
          </div>
          <div class="field has-text-left">
            <label class="label">Password</label>
            <input class="input" type="password" placeholder="Enter your password"v-model="credentials.password" >
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-link" @click="login">Login</button>
            </div>
          </div>
        </div>
        <!-- End of login tab content -->

        <!-- Register tab, conditionally displayed -->
        <div v-else>
          <h1 class="title is-2">Signup</h1>

          <!-- Error display for registration errors -->
          <div v-if="error" v-for="error in errors">
            <p class="help is-danger">{{ error }}</p>
          </div>

          <!-- Registration fields -->
          <div class="field has-text-left">
            <label class="label">Email</label>
            <input class="input" type="text" placeholder="Enter your email" v-model="credentials.email" >
          </div>
          <div class="field has-text-left">
            <label class="label">Password</label>
            <input class="input" type="text" placeholder="Enter a password" v-model="credentials.password" >
          </div>
          <div class="field has-text-left">
            <label class="label">Password confirmation</label>
            <input class="input" type="text" placeholder="Confirm your password" v-model="credentials.password_confirmation" >
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-link" @click="register">Register</button>
            </div>
          </div>
        </div>
        <!-- End of Registration tab content -->

      </div>
    </div>
    <!-- End of main container for login and registration -->
	</div>
</template>

<script>

  import { Store } from '@/store/Store';
  import axios from 'axios';
  import router from '../router';

  const API_URL = 'http://localhost:3000/api';
  const LOGIN_URL = `${API_URL}/auth/sign_in`;
  const REGISTER_URL = `${API_URL}/auth`

	export default {

    data() {
      return {
        credentials: {
          email: '',
          password: '',
          password_confirmation: '',
        },
        errors: [],
        loginTab: true,
        registerSuccess: false,
      };
    },

    methods: {
      login() {
        // Submit user login
        axios.post(LOGIN_URL, {
          email: this.credentials.email,
          password: this.credentials.password,
        })
        // Update Store with user info on success
        .then((response) => {
          Store.login(response.data.data);
          router.push({ name: 'Home' });
        })
        // If error(s), log to user
        .catch((error) => {
          error.response.data.errors.full_messages.forEach((errorText) => {
            this.errors.push(errorText);
          });
        });
      },

      register() {
        // Submit user info
        axios.post(REGISTER_URL, {
          email: this.credentials.email,
          password: this.credentials.password,
          password_confirmation: this.credentials.password_confirmation,
        })
        // display success message
        .then(() => {
          this.registerSuccess = true;
          this.loginTab = true;
          // Clear password, but leave username
          this.credentials.password = '';
          this.credentials.password_confirmation = '';
        })
        // If error(s), log to user
        .catch((error) => {
          error.response.data.errors.full_messages.forEach((errorText) => {
            this.errors.push(errorText);
          });
        });
      },

    },
  };
</script>

<style>
	
</style>