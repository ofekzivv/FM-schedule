<template>
  <q-page class="text-center my-font">
    <h5 class="text-bold">פאנל אדמין</h5>
    <q-card flat style="max-width: 900px; margin: 0 auto">
      <q-tabs
        v-model="tab"
        dense
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="todayEvents" label="משימות להיום"/>
        <q-tab name="allUsers" label="כל הלקוחות"/>
      </q-tabs>

      <q-separator/>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="todayEvents">
          <EventsCards/>
        </q-tab-panel>

        <q-tab-panel name="allUsers">
          <UsersTableViewer/>
        </q-tab-panel>

      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import AddNewUser from "components/AddNewUser";
import EventAdder from "components/EventAdder";
import EventsCards from "components/EventsCards";
import UsersTableViewer from "components/UsersTableViewer";
import AdminTableViewer from "components/AdminTableViewer"

export default {
  name: 'PageIndex',
  components: {EventAdder, EventsCards, AddNewUser,  UsersTableViewer,  AdminTableViewer},
  data() {
    return {
      tab: 'allUsers',
    }
  },
}
</script>

<style lang="scss" scoped>


</style>

