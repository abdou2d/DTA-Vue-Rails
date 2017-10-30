<template>
  <div class="column">
    <h1 class="title">Add a note</h1>
    <div class="field has-text-left">
      <input class="input" type="text" placeholder="Enter a note" v-model="newNote" >
    </div>
    <div class="field">
      <div class="control">
        <button class="button is-link" @click="submit">Submit</button>
      </div>
    </div>

    <div class="box" v-for="note in notes">
      <div class="article">
        {{ note.note }}
      </div>
      <div class="columns">
        <div class="column is-two-thirds"><!-- empty --></div>
        <div class="column">
          <button class="button is-danger is-small" @click="deleteNote(note)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {

  data () {
    return {
      notes: [],
      newNote: '',
    };
  },

  methods: {

    deleteNote(note) {

      let DELETE_URL = `http://localhost:3000/api/notes/${note.id}`

      axios.delete(DELETE_URL)
        .then((response) => {
          this.notes.splice(this.notes.findIndex(n => n.id === note.id), 1);
        })
    },

    submit() {

      const note = {
        note: this.newNote
      }

      const POST_URL = `http://localhost:3000/api/notes`
      
      axios.post(POST_URL, note)
        .then((response) => {
          this.notes.push(response.data)
          this.newNote = ''
        })
    }
  },

  created() {

    const API_URL = 'http://localhost:3000/api';
    const NOTES_URL = `${API_URL}/notes`;

    axios.get(NOTES_URL)
      .then((response) => {
          for(let note of response.data) {
           this.notes.push(note)
          }
      })
      .catch((error) => {
        console.log(error);
      })
  }
}
	
</script>