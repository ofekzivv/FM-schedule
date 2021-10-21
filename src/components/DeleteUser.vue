<template>
  <div>
    <p>בחר את המשתמש שברצונך למחוק: </p>
    <q-select v-model="companyName" outlined :options="options" label="משתמש" style="max-width: 400px; margin: 0 auto" />
    <q-btn
      :disable="!this.companyName"
      class="q-mt-md"
      label="מחק משתמש"
      @click="removeUser()"
      color="primary"/>
  </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from "vuex";

export default {
  data() {
    return {
      companyName: null,
      options: []
    }
  },
  computed: mapState('users',['users']),
  methods:{
    ...mapActions('users',['getUsers', 'deleteUser']),
    removeUser() {
      this.$q.loading.show()
      this.deleteUser(this.companyName).then(() => {
        this.$q.notify({
          type: 'negative',
          message: `המשתמש נמחק.`
        })
      }).catch(err => console.log(err))
      this.$q.loading.hide()
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
