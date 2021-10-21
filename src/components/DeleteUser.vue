<template>
  <div>
    <p>בחר את המשתמש שברצונך למחוק: </p>
    <q-select v-model="model" outlined :options="options" label="משתמש" style="max-width: 400px; margin: 0 auto" />
    <q-btn
      :disable="!this.model"
      class="q-mt-md"
      label="מחק משתמש"
      @click="deleteUser()"
      color="primary"/>
  </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from "vuex";

export default {
  data() {
    return {
      model: null,
      options: []
    }
  },
  computed: mapState('users',['users']),
  methods:{
    ...mapActions('users',['getUsers']),
    deleteUser() {
      console.log(this.model)
    }
  },
  async created() {
    await this.getUsers()
    for (let i = 0; i < this.users.length; i++) {
      this.options.push(this.users[i].companyName)
    }
  }
}
</script>

<style scoped>

</style>
