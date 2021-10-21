<template>
  <q-page class="text-center my-font">
    <h5>שלום, לירן אלמליח</h5>
    <q-card style="max-width: 900px; margin: 0 auto">
      <q-tabs
        v-model="tab"
        dense
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="todayEvents" label="משימות להיום"/>
        <q-tab name="addNewUser" label="הוספת משתמש חדש"/>
        <q-tab name="deleteUser" label="מחיקת משתמש"/>
      </q-tabs>

      <q-separator/>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="todayEvents">
          <eventsCards/>
        </q-tab-panel>

        <q-tab-panel name="addNewUser">
          <AddNewUser/>
        </q-tab-panel>

        <q-tab-panel name="deleteUser">
          <DeleteUser/>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import AddNewUser from "components/AddNewUser";
import DeleteUser from "components/DeleteUser";
import EventsCards from "components/eventsCards";
import EventAdder from "components/EventAdder";
import eventsCards from "components/eventsCards";

export default {
  name: 'PageIndex',
  components: {
    DeleteUser,
    EventAdder, EventsCards, AddNewUser, eventsCards
  },
  data() {
    return {
      tab: 'todayEvents'
    }
  }
}
</script>

<style lang="scss" scoped>


</style>

