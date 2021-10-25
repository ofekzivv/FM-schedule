<template>
     <div class="constrain my-font">
       <p class="text-center text-h5 q-mt-md">טבלת אירועים:</p>
    <div class="q-pa-md">
      <q-table
        :data="this.events"
        :columns="columns"
        row-key="name"
      />
    </div>
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
        { name: 'date', align: 'center', label: 'תאריך', field: 'date' , sortable: true, headerClasses: 'bg-primary text-white', headerStyle: 'font-size: 1em; font-weight: bold',classes: 'bg-grey-2 ellipsis',
          style: 'max-width: 100px;',},
        { name: 'title', required: true, label: 'שם אירוע', align: 'center', field: 'title' , sortable: true, headerClasses: 'bg-primary text-white', headerStyle: 'font-size: 1em; font-weight: bold'},
        { name: 'eventType', align: 'center', label: 'סוג אירוע', field: 'eventType', sortable: true, headerClasses: 'bg-primary text-white', headerStyle: 'font-size: 1em; font-weight: bold' },
        { name: 'details', label: 'פרטים', field: 'details',align: 'center', sortable: true, headerClasses: 'bg-primary text-white', headerStyle: 'font-size: 1em; font-weight: bold' },
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
