<template>
  <div>
    <div class="columns is-centered">
      <div class="column is-half">
        <h1 class="title is-2">Login</h1>
        <div v-if="error" v-for="error in errors">
          <p class="help is-danger">{{ error }}</p>
        </div>
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
            <button class="button is-link" @click="submit">Submit</button>
          </div>
        </div>
      </div>
    </div>
	</div>
</template>

<script>

  import { Store } from '@/store/Store';
  import axios from 'axios';
  import router from '../router';

  const API_URL = 'http://localhost:3000/api';
  const LOGIN_URL = `${API_URL}/auth/sign_in`;

	export default {

    data() {
      return {
        credentials: {
          email: '',
          password: '',
        },
        errors: [],
      };
    },

    methods: {
      submit() {

        const credentials = {
          email: this.credentials.email,
          password: this.credentials.password,
        };

        axios.post(LOGIN_URL, credentials)
        .then((response) => {
          Store.login(response.data.data);
          router.push({ name: 'Home' });
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
      },
    },
  };
</script>

<style>
	
</style>