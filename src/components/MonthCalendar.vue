<template>
  <div class="my-font container">
    <div class="row justify-center items-center">
      <q-btn flat label="הקודם" @click="calendarPrev"/>
      <q-separator vertical/>
      <q-btn flat label="הבא" @click="calendarNext"/>
    </div>
    <q-separator/>
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
      @click:date2="onClickDate2"
      @click:day2="onClickDay2"
    />

    <q-dialog v-if="this.test">
      <EventAdder/>
    </q-dialog>


  </div>
</template>

<script>
import {QCalendar} from '@quasar/quasar-ui-qcalendar'
import {Dialog} from 'quasar'
import EventAdder from "components/EventAdder";

export default {
  data() {
    return {
      selectedDate: '',
      test: false
    }
  },
  components: {
    QCalendar,
    EventAdder
  },
  methods: {
    calendarNext() {
      this.$refs.calendar.next()
    },
    calendarPrev() {
      this.$refs.calendar.prev()
    },
    onClickDate2(data) {
      console.log(JSON.stringify(data))
    },
    onClickDay2(data) {
      this.$q.dialog({
        component: EventAdder,
        parent: this,// becomes child of this Vue node
        // ("this" points to your Vue component)
        // (prop was called "root" in < 1.1.0 and
        // still works, but recommending to switch
        // to the more appropriate "parent" name)

        // props forwarded to component
        // (everything except "component" and "parent" props above):
        eventDate: data.scope.timestamp.date,
        eventTime: '00:00',

        // ...more.props...
      }).onOk(() => {
        console.log('OK')
      }).onCancel(() => {
        console.log('Cancel')
      }).onDismiss(() => {
        console.log('Called on OK or Cancel')
      })
    },
  }
}

</script>

<style src="@quasar/quasar-ui-qcalendar/dist/index.css"></style>

<style lang="sass" scoped>
</style>

<style lang="scss">
.q-calendar-weekly__day:hover {
  background-color: #918E8A;
  opacity: 0.07;
  cursor: pointer;
}

.ellipsis {
  color: var(--q-color-primary);
}


</style>

