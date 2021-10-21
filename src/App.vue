<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
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
