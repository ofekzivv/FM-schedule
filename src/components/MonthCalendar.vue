<template>
  <div class="my-font">
    <div class="row justify-center items-center">
      <q-btn flat label="הקודם" @click="calendarPrev" />
      <q-separator vertical />
      <q-btn flat label="הבא" @click="calendarNext" />
    </div>
    <q-separator />
    <QCalendar
      style="width: 100%"
      ref="calendar"
      v-model="selectedDate"
      view="month"
      locale="he"
      animated
      short-weekday-label
      short-month-label
      transition-prev="slide-right"
      transition-next="slide-left"
      no-scroll
      :day-height="100"
      hour24-format
    />
  </div>
</template>

<script>
import { QCalendar } from '@quasar/quasar-ui-qcalendar'

export default {
  data () {
    return {
      selectedDate: ''
    }
  },
  components: {
    QCalendar
  },
  methods: {
    calendarNext () {
      this.$refs.calendar.next()
    },
    calendarPrev () {
      this.$refs.calendar.prev()
    }
  }
}

</script>

<style src="@quasar/quasar-ui-qcalendar/dist/index.css"></style>

<style lang="sass" scoped>
</style>

