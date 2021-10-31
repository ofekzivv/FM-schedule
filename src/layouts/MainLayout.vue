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
      v-if="isAdmin"
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
      </q-tabs>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>

    <q-footer class="small-screen-only" v-if="isAdmin">
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
import {LocalStorage} from "quasar";

const linksData = [
  {
    title: 'בית',
    label: 'בית',
    icon: 'home',
    link: '/admin'
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
    icon: 'calendar_view_week',
    link: '/WeekView'
  },
  {
    title: 'לפי יום',
    label: 'לפי יום',
    icon: 'calendar_view_day',
    link: '/DayView'
  }, {
    title: 'כל האירועים',
    label: 'כל האירועים',
    icon: 'task',
    link: '/AllView'
  }];

export default {
  name: 'MainLayout',
  components: {EssentialLink, TasksFilter, SearchEvents},
  data() {
    return {
      isAdmin: false,
      essentialLinks: linksData,
      tab: 'Home',
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
  },
  created() {
    this.isAdmin = LocalStorage.getItem('admin')
    console.log('is Admin', this.isAdmin)
  }
}
</script>

<style lang="scss">
</style>
