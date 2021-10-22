<template>
  <div class="my-font">
    <div class="q-mt-lg items-center">
      <div class="select text-center" style="max-width: 500px; width: 80%; margin: 2em auto;">
        <p class="text-h5">בחר משתמש:</p>
        <q-select v-model="companyName" :options="options" label="משתמש" :disable="companyName" />
        <q-btn v-if="companyName" color="dark" label="החלף משתמש" class="q-ma-sm" push @click="onClickDay2"/>
      </div>
    </div>
    <div>
    <MonthCalendar v-if="companyName" :company="companyName"/>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from "vuex";
import MonthCalendar from "components/MonthCalendar";

export default {
  components: {
    MonthCalendar
  },
  data() {
    return {
      companyName: null,
      options: []
    }
  },
  computed: mapState('users',['users']),
  methods:{
    ...mapActions('users',['getUsers'])
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
