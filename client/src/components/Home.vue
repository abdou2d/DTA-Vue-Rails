<template>
  <div>

    <!-- Show if validate token returns user info on page load or user is logged in -->
    <div v-if="Store.user.isAuth">
      <!-- Define columns here and apply "column" class to both components -->
      <div class="columns">

        <!-- Content components -->
        <Notes></Notes>
        <UpdateUser></UpdateUser>

      </div>
    </div>

    <!-- Show if validate token returns 401 or user is not logged in -->
    <div v-else>
        <Login></Login>
    </div>
    
  </div>
</template>

<script>

import { Store } from '@/store/Store';
import Login from '@/components/Login';
import Notes from '@/components/Notes';
import UpdateUser from '@/components/UpdateUser';

export default {
  name: 'Root',
  components: {
    'Login': Login,
    'Notes': Notes,
    'UpdateUser': UpdateUser,
  },
  data () {
    return {
      Store
    }
  }
}
</script>

<style>

</style>
