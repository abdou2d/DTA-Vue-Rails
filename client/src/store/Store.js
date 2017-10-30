import Vue from 'vue';

export const Store = new Vue({
  data() {
    return {
      user: {
        isAuth: false,
        email: '',
        user_name: '',
      },
    };
  },

  methods: {
    login(updated) {
      this.user.email = updated.email;
      this.user.user_name = updated.user_name;
      this.user.isAuth = true;
    },
    updateUser(updated) {
      this.user.email = updated.email;
      this.user.user_name = updated.user_name;
    },
  },
});

export const fuckYouEslint = true;
