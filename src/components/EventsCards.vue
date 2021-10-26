<template>
  <div class="q-pa-md items-center q-gutter-md">
    <q-card
      v-for="dailyEvent in dailyEvents"
      :style="{background : dailyEvent.bgcolor}"
      class="text-white bg-blue"
      style="max-width: 500px; "
    >
      <q-card-section>
        {{dailyEvent.bgcolor}}
        <p class="text-subtitle1 text-bold">שם חברה:</p>
        {{dailyEvent.companyName}}
      </q-card-section>
      <q-separator/>
      <q-card-section >
        <p class="text-subtitle1 text-bold">{{dailyEvent.title}}</p>
        <p>{{dailyEvent.details}}</p>
        <q-img v-show="dailyEvent.files" :src="dailyEvent.files" width="150px"/>
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
    dailyEvents : '',
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
