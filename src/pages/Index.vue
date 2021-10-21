<template>
  <q-page class="text-center my-font">
    <h5>שלום, לירן אלמליח</h5>
    <q-card style="max-width: 900px; margin: 0 auto">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="mails" label="משימות להיום" />
        <q-tab name="addNewUser" label="הוספת משתמש חדש" />
        <q-tab name="movies" label="מחיקת משתמש" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="mails">
          <div class="text-h6">Mails</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>

        <q-tab-panel name="addNewUser">
          <AddNewUser/>
        </q-tab-panel>

        <q-tab-panel name="movies">
          <div class="text-h6">Movies</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import AddNewUser from "components/AddNewUser";
import EventsCards from "components/eventsCards";
import EventAdder from "components/EventAdder";
export default {
  name: 'PageIndex',
  components: {
    EventAdder, EventsCards, AddNewUser
  },
  data () {
    return {
      tab: 'mails'
    }
  }
}
</script>

<style lang="scss" scoped>


</style>

