<template>
<q-page-container>
  <events-cards v-for="event of userEvents" :eventDetails="event"/>
</q-page-container>
</template>

<script>
import eventsCards from "components/eventsCards";
import {mapState, mapGetters} from 'vuex'

export default {
  name: "SearchResults",
  components:{eventsCards},
  computed:mapState('events', ['userEvents'])
}
</script>

<style scoped>

</style>
