<template>
  <div class="my-font">
    <div class="q-mt-lg items-center">
      <div class="select text-center" style="max-width: 500px; width: 80%; margin: 2em auto;">
        <p class="text-h5">בחר משתמש:</p>
        <q-select v-model="companyName" :options="options" label="משתמש" />
      </div>
    </div>
    <div>
      <DayCalendar v-if="companyName" :company="companyName"/>
    </div>
  </div>
</template>

<script>
import DayCalendar from "components/DayCalendar";
import {mapActions, mapState} from "vuex";

export default {
  name: "CalendarByDay",
  components: {
    DayCalendar
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
  },
}
</script>

<style scoped>

</style>
