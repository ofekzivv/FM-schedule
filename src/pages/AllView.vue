<template>
    <div class="q-pa-md my-font">
      <q-table
        grid
        title="All Events"
        :data="this.events"
        :columns="columns"
        row-key="name"
        color="orange"
        title-class="text-bold text-orange-9"
        card-header-class="text-bold text-orange-9"
        card-class="text-bold"
        card-style="border-radius: 5px;"
        :pagination="initialPagination"
        dense
        bordered
        flat
      />
    </div>
</template>

<script>
import {mapState,mapActions} from "vuex";
export default {
  computed:{
    ...mapState('events',['userEvents','usersEvents'])
  },
  name: "AllView",
  props: ['company'],
  data () {
    return {
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        rowsPerPage: 10
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        { name: 'date', align: 'center', label: 'תאריך', field: 'date' , sortable: true },
        { name: 'title', required: true, label: 'אירוע', align: 'center', field: 'title' , sortable: true},
        { name: 'eventType', align: 'center', label: 'סוג אירוע', field: 'eventType', sortable: true },
        { name: 'details',align:'center', label: 'פרטים', field: 'details', sortable: true },
        { name: 'companyName',align:'center', label: 'שם חברה', field: 'companyName', sortable: true },
      ],
      events : []
    }
  },
  methods:{
    ...mapActions('events',['getAllUsersEvents','getAllUserEvents']),
    async getEvents(){
      if (!this.$route.params.companyName) {
        this.events = await this.getAllUsersEvents('')
      }
      else{
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
