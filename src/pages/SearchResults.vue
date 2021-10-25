<template>
<q-page-container>
  <events-cards v-for="(event,index) of results" :eventDetails="event" :key="index"/>

  <div class="text-center" v-if="isNoResults">No Results</div>

</q-page-container>
</template>

<script>
import eventsCards from "components/eventsCards";
import {mapGetters, mapState, mapActions} from 'vuex'

export default {
  name: "SearchResults",
  components:{eventsCards},
  computed: mapState('events',['userEvents','companyName']),
  data(){
    return{
      results: []
    }
  },
  methods:{
    ...mapActions('events',['getAllUserEvents']),
    ...mapGetters('events',['getEventsByKeys']),
    isNoResults(){
      return this.results.length === 0
    }
  },
  created() {
    this.getAllUserEvents(this.companyName).then((userEvents) =>{
      debugger;
      console.log(userEvents)
      this.results = this.getEventsByKeys(userEvents)
      console.log(this.results)
    })

  }
}
</script>

<style scoped>

</style>
