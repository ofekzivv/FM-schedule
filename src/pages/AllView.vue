<template>

  <div class="q-pa-md row items-start q-gutter-md">
    <q-card
      v-for="(event,index) of events" :key="index"
      class="my-card text-black">
      <q-card-section class="section1">
        <q-item-label class="text-bold">שם חברה:</q-item-label>
        <div>{{ event.companyName }}</div>

        <q-item-label class="text-bold">תאריך:</q-item-label>
        <div>{{ event.date }}</div>
        <q-item-label class="text-bold">סוג אירוע:</q-item-label>
        <div class="card-content">{{ event.eventType }}</div>
        <!--      </q-card-section>-->

        <!--      <q-card-section>-->
        <q-item-label class="text-bold">שם אירוע:</q-item-label>
        <div class="card-content">{{ event.title }}</div>
        <q-item-label class="text-bold">פרטים:</q-item-label>
        <div class="card-content">{{ event.title }}</div>
        <q-item-label class="text-bold">פלטפורמה:</q-item-label>
        <div class="card-content">{{ event.platformType }}</div>

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

.my-card {
  display: inline-block;
  width: 500px;
  box-shadow: rgb(253, 170, 1) 5px 5px 10px 2px;
  font-size: 30px;
  border-radius: 10%;
}

@media (max-width: 500px) {
  .my-card {
    justify-content: center;
    max-width: 370px;
    font-size: 15px;
  }
}
</style>
