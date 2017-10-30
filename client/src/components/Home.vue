<template>
  <div>
    <div v-if="Store.user.isAuth">
      <div class="columns">
        <Notes></Notes>
        <UpdateUser></UpdateUser>
      </div>
    </div>
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
