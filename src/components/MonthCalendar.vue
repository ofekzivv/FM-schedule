<template>
  <div class="my-font container" id="capture" style="position: relative">

      <TasksFilter :company="companyName"/>
    <div class="row justify-center items-center q-mb-sm">
      <q-btn push class="searchBtn q-mr-lg" label="חפש אירוע" color="primary" @click="onClickSearch()"/>
      <q-dialog v-model="searchBar">
        <SearchEvents/>
      </q-dialog>

      <q-btn color="blue" push label="חודש קודם" @click="calendarPrev" class="q-mr-xs"/>
      <q-btn color="blue" push label="חודש הבא" @click="calendarNext"/>
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
      :day-height="150"
      @click:date2="onClickDate2"
      hour24-format
    >
      <template #day="{ timestamp }">
        <template v-for="(event, index) in getEvents(timestamp.date)">
          <q-badge
            :key="index"
            style="cursor: pointer; margin-bottom: 2px; width: 100%"
            @click="testEvent(event)"
            :class="badgeClasses(event, 'day')"
            :style="styles(event, 'day')"
          >
            <q-icon v-if="event.icon" :name="event.icon" class="q-mr-xs" size="xs"></q-icon>
            <div class="column">
              <span class="text-subtitle1 text-bold">{{ event.title }} </span>
              <span style="font-size: 1em;">{{ event.details }}</span>
            </div>
          </q-badge>
        </template>
      </template>
    </QCalendar>

    <q-dialog v-if="this.test">
      <EventAdder/>
    </q-dialog>

  </div>
</template>

<script>
import QCalendarTry from '@quasar/quasar-ui-qcalendar'
import {QCalendar} from '@quasar/quasar-ui-qcalendar'
import {mapActions, mapState, mapMutations} from "vuex";
import EventAdder from "components/EventAdder";
import EditEvent from "components/EditEvent";
import TasksFilter from "components/TasksFilter";
import SearchEvents from "components/SearchEvents";

const reRGBA = /^\s*rgb(a)?\s*\((\s*(\d+)\s*,\s*?){2}(\d+)\s*,?\s*([01]?\.?\d*?)?\s*\)\s*$/

function textToRgb(color) {
  if (typeof color !== 'string') {
    throw new TypeError('Expected a string')
  }

  const m = reRGBA.exec(color)
  if (m) {
    const rgb = {
      r: Math.min(255, parseInt(m[2], 10)),
      g: Math.min(255, parseInt(m[3], 10)),
      b: Math.min(255, parseInt(m[4], 10))
    }
    if (m[1]) {
      rgb.a = Math.min(1, parseFloat(m[5]))
    }
    return rgb
  }
  return hexToRgb(color)
}

function hexToRgb(hex) {
  if (typeof hex !== 'string') {
    throw new TypeError('Expected a string')
  }

  hex = hex.replace(/^#/, '')

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  } else if (hex.length === 4) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3]
  }

  const num = parseInt(hex, 16)

  return hex.length > 6
    ? {r: num >> 24 & 255, g: num >> 16 & 255, b: num >> 8 & 255, a: Math.round((num & 255) / 2.55)}
    : {r: num >> 16, g: num >> 8 & 255, b: num & 255}
}

function luminosity(color) {
  if (typeof color !== 'string' && (!color || color.r === undefined)) {
    throw new TypeError('Expected a string or a {r, g, b} object as color')
  }

  const
    rgb = typeof color === 'string' ? textToRgb(color) : color,
    r = rgb.r / 255,
    g = rgb.g / 255,
    b = rgb.b / 255,
    R = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4),
    G = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4),
    B = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4)
  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}

export default {
  data() {
    return {
      selectedDate: '',
      test: false,
      events: [],
      companyName: '',
      getDailyEvents: 0,
      output: null,
      searchBar: false,
    }
  },
  props: ['company'],
  components: {
    QCalendar,
    EventAdder,TasksFilter, SearchEvents
  },

  created() {
    console.log(this.companyName)
    if (this.companyName !== 'כל המשתמשים') {
      this.setCompanyName(this.companyName)
      if (this.$route.params.companyName) {
        this.companyName = this.$route.params.companyName
      } else {
        this.companyName = this.company
      }
      this.$q.loading.show()
      this.getAllUserEvents(this.companyName).then(() => {
        this.events = this.userEvents
        this.$q.loading.hide()
      })
    }
    else {
      this.getAllUsersEvents('').then(()=>{
        this.events = this.usersEvents
        this.$q.loading.hide()
      })
    }
  },
  computed:{
    ...mapState('events',['toggleFilter','companyName','userEvents','usersEvents']),
  },
  methods: {
    ...mapMutations('events',['setCompanyName','setUserEvents']),

    ...mapActions('events', ['getAllUserEvents','getAllUsersEvents']),

    calendarNext() {
      this.$refs.calendar.next()
    },
    calendarPrev() {
      this.$refs.calendar.prev()
    },
    onClickDate2(data) {
      console.log(JSON.stringify(data))
      this.$q.dialog({
        component: EventAdder,
        parent: this,
        companyName: this.companyName,
        eventDate: data.scope.timestamp.date

        // ...more.props...
      }).onOk(() => {
        this.getAllUserEvents(this.companyName).then((res) => {
          this.events = res
        })
      }).onCancel(() => {
        console.log('Cancel')
      }).onDismiss(() => {
        console.log('Called on OK or Cancel')
      })
    },
    isCssColor(color) {
      return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/)
    },
    badgeClasses(event) {
      const cssColor = this.isCssColor(event.bgcolor)
      return {
        [`text-white bg-${event.bgcolor}`]: !cssColor
      }
    },
    styles(event) {
      const s = {}
      if (this.isCssColor(event.bgcolor)) {
        s['background-color'] = event.bgcolor
        s.color = luminosity(event.bgcolor) > 0.5 ? 'black' : 'white'
      }

      if(this.events.filter(e => e.date === event.date).length<3){
        s.height = (100/ (this.events.filter(e => e.date === event.date).length)) + '%'
      }
      else {
        s.height = (100 / (this.events.filter(e => e.date === event.date).length + 2)) + '%'
      }
      s['align-items'] = 'flex-start'
      return s
    },
    getEvents(dt){
      const currentDate = QCalendarTry.parseTimestamp(dt)
      const events = []
      for (let i = 0; i < this.userEvents.length; ++i) {
        let added = false
        if (this.userEvents[i].date === dt) {
          if (this.userEvents[i].time) {
            if (events.length > 0) {
              // check for overlapping times
              const startTime = QCalendarTry.parseTimestamp(this.userEvents[i].date + ' ' + this.userEvents[i].time)
              const endTime = QCalendarTry.addToDate(startTime, {minute: this.userEvents[i].duration})
              for (let j = 0; j < events.length; ++j) {
                if (events[j].time) {
                  const startTime2 = QCalendarTry.parseTimestamp(events[j].date + ' ' + events[j].time)
                  const endTime2 = QCalendarTry.addToDate(startTime2, {minute: events[j].duration})
                  if (QCalendarTry.isBetweenDates(startTime, startTime2, endTime2) || QCalendarTry.isBetweenDates(endTime, startTime2, endTime2)) {
                    events.push(this.userEvents[i])
                    added = true
                    break
                  }
                }
              }
            }
          }
          if (!added) {
            events.push(this.userEvents[i])
          }
        } else if (this.userEvents[i].days) {
          // check for overlapping dates
          const startDate = QCalendarTry.parseTimestamp(this.userEvents[i].date)
          const endDate = QCalendarTry.addToDate(startDate, {day: this.userEvents[i].days})
          if (QCalendarTry.isBetweenDates(currentDate, startDate, endDate)) {
            events.push(this.userEvents[i])
            added = true
          }
        }
      }
      return events
    },

    testEvent(updateEvent) {
      console.log(updateEvent)
      this.$q.dialog({
        component: EditEvent,
        parent: this,
        event: updateEvent,
        companyName: this.companyName

        // ...more.props...
      }).onOk(() => {
        this.getAllUserEvents(this.companyName).then((res) => {
          this.events = res
        })
      }).onCancel(() => {
        console.log('Cancel')
      }).onDismiss(() => {
        console.log('Called on OK or Cancel')
      })
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
  watch: {
    company(newValue) {
      this.$q.loading.show()
      console.log("company on watch", newValue)
      this.companyName = newValue
      debugger
      if (newValue !== 'כל המשתמשים') {
        this.getAllUserEvents(this.companyName).then(() => {
            this.events = this.userEvents
            this.$q.loading.hide()
          })
      }
      else{
        this.getAllUsersEvents('').then(()=> {
          this.events = this.usersEvents
          this.$q.loading.hide()
        })
      }
    }
  }
}

</script>

<style src="@quasar/quasar-ui-qcalendar/dist/index.css"></style>

