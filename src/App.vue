<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import 'vue-swatches/dist/vue-swatches.css'
import {mapActions, mapState} from "vuex";

export default {
  computed: {
    ...mapState('users', ['userData'])
  },
  methods: {
    ...mapActions('auth', ['handleAuthStateChange'])
  },

  mounted() {
    this.handleAuthStateChange()
  }
}
</script>
