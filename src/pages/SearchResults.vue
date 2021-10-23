<template>
<q-page-container>
  <events-cards v-for="event of results" :eventDetails="event"/>
</q-page-container>
</template>

<script>
import eventsCards from "components/eventsCards";
import {mapGetters} from 'vuex'

export default {
  name: "SearchResults",
  components:{eventsCards},
  data(){
    return{
      results: []
    }
  },
  methods:{
    ...mapGetters('events',['getEventsByKeys'])
  },
  created() {
    this.results = this.getEventsByKeys()
  }
}
</script>

<style scoped>

</style>
