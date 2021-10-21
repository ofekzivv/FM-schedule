<template>
  <q-layout view="hHh Lpr hFf">
    <q-header class="my-font">
      <q-toolbar>

        <q-toolbar-title class="absolute-center english-font text-h5">
          FLASH MEDIA SCHEDULER
          <q-icon name="bolt" size="md"/>
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
      class="large-screen-only"
      :width="180"
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
import {mapActions, mapState} from "vuex";

const linksData = [
  {
    title: 'בית',
    label: 'בית',
    icon: 'home',
    link: '/'
  },
  {
    title: 'תצוגה יומית',
    label: 'לפי יום',
    icon: 'today',
    link: 'DayView'
  },
  {
    title: 'תצוגה שבועית',
    label: 'לפי שבוע',
    icon: 'date_range',
    link: 'WeekView'
  },
  {
    title: 'תצוגה חודשית',
    label: 'לפי חודש',
    icon: 'calendar_view_month',
    link: 'MonthView'
  }
];

export default {
  name: 'MainLayout',
  components: {EssentialLink, TasksFilter},
  data() {
    return {
      essentialLinks: linksData,
      tab: 'Home'
    }
  },
  computed:{
    ...mapState('auth', ['loggedIn']),
  },
  methods: {
    ...mapActions('auth', ['logoutUser']),
    logout() {
      this.logoutUser()
    }
  }
}
</script>

<style lang="scss">
</style>
