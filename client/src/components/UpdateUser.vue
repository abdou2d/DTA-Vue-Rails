<template>
  <!-- column for user content, contained inside "columns" class on main page -->
  <div class="column">
    <h1 class="title">Update user info</h1>

    <!-- If errors, log to user -->
    <div class="box" v-show="errors.userUpdate.length > 0">
      <ul v-for="error in errors.userUpdate">
        <li class="help has-text-danger"> {{ error }}</li>
      </ul>
    </div>

    <!-- If success, log to user -->
    <div class="box" v-show="success.userSuccessMessage.length > 0">
      <p class="has-text-success"> {{ success.userSuccessMessage }}</p>
    </div>

    <!-- Update user input fields -->
    <div class="field has-text-left">
      <label class="label">New Email</label>
      <input class="input" :placeholder="Store.user.email" v-model="userInfo.email">
    </div>
    <div class="field has-text-left">
      <label class="label">New username</label>
      <input class="input" :placeholder="Store.user.user_name" v-model="userInfo.user_name">
    </div>
    <div class="field">
      <div class="control">
        <button class="button is-info" @click="submit">Submit</button>
      </div>
    </div>

    <div><hr /></div>

    <!-- If errors, log to user -->
    <div class="box" v-show="errors.password.length > 0">
      <ul v-for="error in errors.password">
        <li class="help has-text-danger"> {{ error }}</li>
      </ul>
    </div>

    <!-- If success, log to user -->
    <div class="box" v-show="success.passwordSuccessMessage.length > 0">
      <p class="has-text-success"> {{ success.passwordSuccessMessage }}</p>
    </div>

    <!-- Update user password fields -->
    <div class="field has-text-left">
      <label class="label">Current password</label>
      <input class="input" v-model="password.current_password" type="password">
    </div>
    <div class="field has-text-left">
      <label class="label">New password</label>
      <input class="input" v-model="password.password" type="password">
    </div>
    <div class="field has-text-left">
      <label class="label">Confirm new password</label>
      <input type="password" class="input" v-model="password.password_confirmation">
    </div>
    <div class="field">
      <div class="control">
        <button class="button is-info" @click="changePassword">Submit</button>
      </div>
    </div>

  <!-- end of content container -->
  </div>
</template>

<script>

  import axios from 'axios';
  import { Store } from '@/store/Store';

  const USER_UPDATE_URL = 'http://localhost:3000/api/auth';
  const PASSWORD_UPDATE_URL = 'http://localhost:3000/api/auth/password';

  export default {

    data () {
      return {
        Store,
        password: {
          password: '',
          password_confirmation: '',
          current_password: '',
        },
        userInfo: {
          user_name: '',
          email: '',
        },
        errors: {
          userUpdate: [],
          password: [],
        },
        success: {
          userSuccessMessage: '',
          passwordSuccessMessage: '',  
        },
      }
    },

    methods: {

      submit() {
        // Clear old messages, if any
        Object.keys(this.errors).forEach(value => this.errors[value] = []);
        Object.keys(this.success).forEach(value => this.success[value] = '');

        // Pick up info from form
        const userUpdate = {
          email: this.userInfo.email,
          user_name: this.userInfo.user_name,
        };

        // Strip out any blanks from form so they do not overwrite current values
        Object.keys(userUpdate)
          .forEach(k => (!userUpdate[k] && userUpdate[k] !== undefined) && delete userUpdate[k]);

        // Send user update info
        axios.patch(USER_UPDATE_URL, userUpdate)
          .then((response) => {
            // Update user store
            this.Store.user.email = response.data.data.email;
            this.Store.user.user_name = response.data.data.user_name;

            // Clear form data
            this.userInfo.user_name = '';
            this.userInfo.email = '';

            // Show success
            this.success.userSuccessMessage = 'Your user info has been updated';
          })
          .catch((error) => {
            error.response.data.errors.full_messages.forEach((errorText) => {
              this.errors.userUpdate.push(errorText);
            });
        });
      },

      changePassword() {
        // Clear old messages, if any
        Object.keys(this.errors).forEach(value => this.errors[value] = []);
        Object.keys(this.success).forEach(value => this.success[value] = '');

        // No need to strip blanks, will be picked up by catch
        axios.patch(PASSWORD_UPDATE_URL, {
          password: this.password.password,
          password_confirmation: this.password.password_confirmation,
          current_password: this.password.current_password,
        })
        .then((response) => {
          // Reset form values
          this.password.password = '';
          this.password.password_confirmation = '';
          this.password.current_password = '';

          // Display success message to user
          this.success.passwordSuccessMessage = 'Your password has been successfully changed'
        })
        .catch((error) => {
          error.response.data.errors.full_messages.forEach((errorText) => {
            this.errors.password.push(errorText);
          });
        })
      },
    },
  };
	
</script>