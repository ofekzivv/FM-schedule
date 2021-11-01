<template>

  <div class="q-pa-md row items-start q-gutter-md">
    <q-card v-for="(event,index) of events" :key="index"
      class="my-card text-black">
      <q-card-section>
        <q-item-label>שם חברה</q-item-label>
        <div class="text-bold text-h5">{{event.companyName}}</div>

        <q-item-label>תאריך</q-item-label>
        <div >{{event.date}}</div>
      </q-card-section>
      <q-separator/>
      <q-card-section class="card-content">
        <q-item-label class="text-bold">שם אירוע</q-item-label>
        <div class="card-content">{{event.title}}</div>
        <q-item-label class="text-bold">פרטים</q-item-label>
        <div class="card-content">{{event.title}}</div>
        <q-item-label class="text-bold">פלטפורמה</q-item-label>
        <div class="card-content">{{event.platformType}}</div>
        <q-item-label class="text-bold">סוג אירוע</q-item-label>
        <div class="card-content">{{event.eventType}}</div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";

export default {
  computed: {
    ...mapState('events', ['userEvents', 'usersEvents'])
  },
  name: "AllView",
  props: ['company'],
  data() {
    return {
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        rowsPerPage: 10
      },
      columns: [
        {name: 'companyName', align: 'center', label: 'שם חברה', field: 'companyName', sortable: true},
        {name: 'date', align: 'center', label: 'תאריך', field: 'date', sortable: true},
        {name: 'title', required: true, label: 'אירוע', align: 'center', field: 'title', sortable: true},
        {name: 'platformType', align: 'center', label: 'פלטפורמה', field: 'platformType', sortable: true},
        {name: 'eventType', align: 'center', label: 'סוג אירוע', field: 'eventType', sortable: true},
        {name: 'details', align: 'center', label: 'פרטים', field: 'details', sortable: true},
      ],
      events: []
    }
  },
  methods: {
    ...mapActions('events', ['getAllUsersEvents', 'getAllUserEvents', 'getUserColor']),
    async getEvents() {
      if (!this.$route.params.companyName) {
        this.events = await this.getAllUsersEvents('')
      } else {
        this.events = await this.getAllUserEvents(this.$route.params.companyName)
      }
    },
    async getColor(userName) {
      let color = await this.getUserColor(userName);
      return color
    }
  },
  created() {
    this.getEvents()
  }
}
</script>

<style>
.q-pa-md{
  justify-content: center;
}
.my-card{
  width: 500px;
  display: flex;
  box-shadow: rgba(95, 21, 19, 0.5) 2px 2px 10px 2px;
  font-size: 30px;
}
.card-content{

}
.events-table  *{
  font-size: 20px;
}
@media (max-width: 500px){
  .my-card{
    max-width: 370px;
    font-size: 15px;
  }
}
</style>
