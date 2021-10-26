<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card
      class="my-card text-white"
      style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
    >
      <q-card-section v-for="dailyEvent in dailyEvents">
       {{dailyEvent}}
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "EventsCards",
  data(){
    return{
    dailyEvents : ''
    }
  },
  methods: {
    ...mapActions('events', ['getAllUsersEvents', 'getAllUserEvents']),
    async getDailyEvents() {
      this.dailyEvents = await this.getAllUsersEvents('daily')
    }
  },
  created() {
    this.getDailyEvents()
  }
}


</script>

<style scoped>


</style>
