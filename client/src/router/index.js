import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Notes from '@/components/Notes'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/notes',
      name: 'Notes',
      component: Notes
    },
  ]
})
