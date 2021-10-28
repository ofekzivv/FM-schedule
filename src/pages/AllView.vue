<template>
  <div class="q-pa-md my-font">
    <q-table
      grid
      title="כל האירועים"
      :data="this.events"
      :columns="columns"
      row-key="name"
      title-class="text-h5 text-bold text-orange-9"
      card-class="text-bold"
      :pagination="initialPagination"
      card-style="border-radius: 2em; box-shadow: rgba(255, 168, 19, 0.50) 0px 1px 2px 0px; border:none; padding: 2em"
      bordered
      flat
    />
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
    ...mapActions('events', ['getAllUsersEvents', 'getAllUserEvents']),
    async getEvents() {
      if (!this.$route.params.companyName) {
        this.events = await this.getAllUsersEvents('')
      } else {
        this.events = await this.getAllUserEvents(this.$route.params.companyName)
      }
    }
  },
  created() {
    this.getEvents()
  }
}

</script>

<style scoped>

</style>
