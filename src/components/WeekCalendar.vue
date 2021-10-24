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
      view="week"
      locale="he"
      animated
      short-weekday-label
      transition-prev="slide-right"
      transition-next="slide-left"
      no-scroll
      :interval-height="50"
      :interval-minutes="30"
      hour24-format
      :interval-start="16"
      :interval-count="30"
      @click:time2="onClickTime2"
    />
  </div>
</template>

<script>
import { QCalendar } from '@quasar/quasar-ui-qcalendar'
import EventAdder from "components/EventAdder";

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
    },
    onClickTime2(data) {
      this.$q.dialog({
        component: EventAdder,
        parent: this,
        eventDate: data.scope.timestamp.date,
        eventTime: data.scope.timestamp.time,
        // ...more.props...
      }).onOk(() => {
        console.log('OK')
      }).onCancel(() => {
        console.log('Cancel')
      }).onDismiss(() => {
        console.log('Called on OK or Cancel')
      })
    }
  }
}

</script>

<style src="@quasar/quasar-ui-qcalendar/dist/index.css"></style>

<style lang="scss">

.q-calendar-daily__day-interval:hover,
.q-calendar-daily__day-interval--section:hover{
  background-color: #918E8A;
  opacity: 0.1;
  cursor: pointer;
}

</style>

