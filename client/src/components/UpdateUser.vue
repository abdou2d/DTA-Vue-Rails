<template>
	<div class="column">
    <h1 class="title">Update user info</h1>
    <div class="field">
      <label class="label">Current password</label>
      <input class="input" v-model="Store.user.email">
    </div>
    <div class="field">
      <label class="label">Current username</label>
      <input class="input" v-model="Store.user.user_name">
    </div>
    <div>
      <button class="button is-info" @click="submit">Submit</button>
    </div>

    <div><hr /></div>

    <div class="field">
      <label class="label" v-show="message"></label>
      <label class="label">Current password</label>
      <input class="input" v-model="password.current_password" type="password">
    </div>
    <div class="field">
      <label class="label">New password</label>
      <input class="input" v-model="password.password" type="password">
    </div>
    <div class="field">
      <label class="label">Confirm new password</label>
      <input type="password" class="input" v-model="password.password_confirmation">
    </div>
    <div>
      <button class="button is-info" @click="changePassword">Submit</button>
    </div>
  </div>
</template>

<script>

  import axios from 'axios';
  import { Store } from '@/store/Store';

  export default {

    data () {
      return {
        Store,
        password: {
          password: '',
          password_confirmation: '',
          current_password: '',
        },
        message: null,
      }
    },

    methods: {

      submit() {

        const USER_UPDATE_URL = 'http://localhost:3000/api/auth';

        axios.patch(USER_UPDATE_URL, {
          email: this.Store.user.email,
          user_name: this.Store.user.user_name,
        })
          .then((response) => {
            this.Store.user.email = response.data.data.email;
            this.Store.user.user_name = response.data.data.user_name;
            console.log(response.message);
            //this.messsage = response.message;
          })
      },

      changePassword() {

        const PASSWORD_UPDATE_URL = 'http://localhost:3000/api/auth/password';

        axios.patch(PASSWORD_UPDATE_URL, {
          password: this.password.password,
          password_confirmation: this.password.password_confirmation,
          current_password: this.password.current_password,
        })
          .then((response) => {
            this.password.password = '';
            this.password.password_confirmation = '';
            this.password.current_password = '';
          })
          .catch((response) => {
            console.log(response.errors);
          })
      }
    },
  };
	
</script>