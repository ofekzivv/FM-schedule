<template>
    <div class="q-pa-md">
      <q-table
        title="events"
        :data="this.events"
        :columns="columns"
        row-key="name"
      />
    </div>
</template>

<script>
import {mapState,mapActions} from "vuex";
export default {
  computed:{
    ...mapState('events',['usersEvents'])
  },
  name: "AllView",
  props: ['eventsList'],
  data () {
    return {
      columns: [
        { name: 'date', align: 'center', label: 'תאריך', field: 'date' , sortable: true },
        { name: 'title', required: true, label: 'אירוע', align: 'center', field: 'title' , sortable: true},
        { name: 'eventType', align: 'center', label: 'סוג אירוע', field: 'eventType', sortable: true },
        { name: 'details', label: 'פרטים', field: 'details', sortable: true },
      ],
      events : []
    }
  },
  methods:{
    ...mapActions('events',['getAllUsersEvents']),
    async getEvents(){
      this.events = await this.getAllUsersEvents()
      debugger
    }
  },
  created() {
    this.getEvents()
  }
}

</script>

<style scoped>

</style>
