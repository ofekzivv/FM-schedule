<template>
  <q-page class="text-center my-font">
    <h4>שלום, יובל שלום</h4>
    <p>המשימות שלך להיום הן:</p>
    <div>
      <EventsCards/>
    </div>
  </q-page>
</template>

<script>
import EventsCards from "components/eventsCards";
import EventAdder from "components/EventAdder";
export default {
  name: 'PageIndex',
  components: {
    EventAdder, EventsCards
  }
}
</script>

<style lang="scss" scoped>


</style>

