<template>
  <q-layout view="hHh LpR fFf">
    <q-header class="my-font">
      <q-toolbar>

        <q-toolbar-title class="absolute-center english-font text-h5 text-white large-screen-only">
          FLASH MEDIA SCHEDULER
          <q-icon name="bolt" size="md"/>
        </q-toolbar-title>

        <q-toolbar-title class="absolute-center english-font text-h5 text-white small-screen-only">
          FMSCHEDULER
        </q-toolbar-title>

        <q-space/>

        <q-btn
          v-if="!loggedIn"
          icon="login"
          label="התחבר"
          to="/auth"
          flat
          size="12px" />
        <q-btn
          v-if="loggedIn"
          @click="logout()"
          icon="logout"
          label="התנתק"
          flat
          size="12px" />

      </q-toolbar>
    </q-header>

    <q-drawer
      bordered
      dark
      content-class="bg-grey-1"
      :breakpoint="598"
      show-if-above
      class="large-screen-only my-font"
      :width="150"
    >
      <q-tabs
        v-model="tab"
        vertical
        class="bg-secondary"
      >
        <q-route-tab
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          :to="link.link"
          :name="link.title"
          :icon="link.icon"
          :label="link.label"/>

          <TasksFilter/>
        <q-btn class="searchBtn q-ml-lg" label="חפש אירוע" color="primary" @click="onClickSearch()"/>
        <q-dialog v-model="searchBar">
          <SearchEvents/>
        </q-dialog>

      </q-tabs>

    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>

    <q-footer class="small-screen-only">
      <q-tabs
        v-model="tab"
        dense
      >
        <q-route-tab
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          :to="link.link"
          :name="link.title"
          :icon="link.icon"
          :label="link.label"/>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import TasksFilter from "components/TasksFilter";
import SearchEvents from "components/SearchEvents";
import {mapActions, mapState} from "vuex";

const linksData = [
  {
    title: 'בית',
    label: 'בית',
    icon: 'home',
    link: '/'
  },
  {
    title: 'לפי חודש',
    label: 'לפי חודש',
    icon: 'calendar_view_month',
    link: '/MonthView'
  },
  {
    title: 'לפי שבוע',
    label: 'לפי שבוע',
    icon: 'calendar_view_month',
    link: '/WeekView'
  },
  {
    title: 'לפי יום',
    label: 'לפי יום',
    icon: 'calendar_view_month',
    link: '/DayView'
  }
];

export default {
  name: 'MainLayout',
  components: {EssentialLink, TasksFilter, SearchEvents},
  data() {
    return {
      essentialLinks: linksData,
      tab: 'Home',
      searchBar: false,
    }
  },
  computed:{
    ...mapState('auth', ['loggedIn']),
  },
  methods: {
    ...mapActions('auth', ['logoutUser']),
    logout() {
      this.logoutUser()
    },
    onClickSearch(){
      this.$q.dialog({
        component: SearchEvents,

        // optional if you want to have access to
        // Router, Vuex store, and so on, in your
        // custom component:
        parent: this, // becomes child of this Vue node
                      // ("this" points to your Vue component)
                      // (prop was called "root" in < 1.1.0 and
                      // still works, but recommending to switch
                      // to the more appropriate "parent" name)

        // props forwarded to component
        // (everything except "component" and "parent" props above):
        text: 'something',
        // ...more.props...
      }).onOk(() => {
        console.log('OK')
      }).onCancel(() => {
        console.log('Cancel')
      }).onDismiss(() => {
        console.log('Called on OK or Cancel')
      })
    },
  },

}
</script>

<style lang="scss">
</style>
