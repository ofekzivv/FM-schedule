<template>
  <div class="my-font container">
    <div class="row justify-center items-center q-mb-sm">

      <div >
        <q-btn color="blue" push label="יום קודם" @click="calendarPrev" class="q-mr-xs"/>
        <q-btn color="blue" push label="יום הבא" @click="calendarNext"/>
      </div>

      <TasksFilter :company="companyName"/>

      <div>
        <q-btn push class="searchBtn q-mr-lg" label="חפש אירוע" color="primary" @click="onClickSearch()"/>
        <q-dialog v-model="searchBar">
          <SearchEvents/>
        </q-dialog>
      </div>

    </div>
    <q-separator/>
    <QCalendar
      style="width: 100%"
      ref="calendar"
      v-model="selectedDate"
      view="day"
      locale="he"
      animated
      short-weekday-label
      :interval-count="0"
      transition-prev="slide-right"
      transition-next="slide-left"
      no-scroll
      @click:date2="onClickDate2"
    >
      <template #day-header="{ timestamp }">
        <template v-for="(event, index) in eventsMap[timestamp.date]">
          <q-badge
            :key="index"
            style="cursor: pointer; margin-bottom: 2px; width: 100%; height: 15%"
            @click="testEvent(event)"
            class="q-mt-sm"
            :class="badgeClasses(event, 'header')"
            :style="badgeStyles(event, 'header')"
          >
            <div class="row items-center">
              <q-icon v-if="event.icon" :name="event.icon" class="q-mr-xs q-mb-sm" size="xs"></q-icon>
              <p class="title q-mt-xs">{{ event.title }} </p>
            </div>
          </q-badge>
        </template>
      </template>
    </QCalendar>

    <q-dialog v-if="this.test">
      <EventAdder :companyName="this.companyName"/>
    </q-dialog>

  </div>
</template>

<script>
import QCalendarTry from '@quasar/quasar-ui-qcalendar'
import {QCalendar} from '@quasar/quasar-ui-qcalendar'
import {mapActions, mapState, mapMutations} from "vuex";
import {Dialog, LocalStorage} from 'quasar'
import EventAdder from "components/EventAdder";
import EditEvent from "components/EditEvent";
import SearchEvents from "components/SearchEvents";
import TasksFilter from "components/TasksFilter";


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
      isAdmin: false,
      selectedDate: '',
      test: false,
      events: [],
      companyName: '',
      getDailyEvents: 0,
      searchBar: false,
    }
  },
  props: ['company'],
  components: {
    QCalendar,
    EventAdder,
    SearchEvents,
    TasksFilter
  },

  created() {
    this.isAdmin = LocalStorage.getItem('admin')
    console.log("company on created", this.company)
    this.$q.loading.show()
    this.companyName = this.company
    if (this.companyName !== 'כל המשתמשים') {
      this.getAllUserEvents(this.companyName).then((res) => {
        this.events = res
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
  methods: {
    ...mapActions('events', ['getAllUserEvents','getAllUsersEvents']),
    ...mapMutations('events',['setUserEvents']),
    calendarNext() {
      this.$refs.calendar.next()
    },
    calendarPrev() {
      this.$refs.calendar.prev()
    },
    onClickDate2(data) {
      if (!this.isAdmin) {
        return
      }
      this.$q.dialog({
        component: EventAdder,
        parent: this,
        companyName: this.company,
        eventDate: data.scope.timestamp.date

        // ...more.props...
      }).onOk(() => {
        this.getAllUserEvents(this.companyName).then((res) => {
          this.events = res
          console.log(res)
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

    badgeClasses(event, type) {
      const cssColor = this.isCssColor(event.bgcolor)
      const isHeader = type === 'header'
      return {
        [`text-white bg-${event.bgcolor}`]: !cssColor
      }
    },

    badgeStyles(event, type, timeStartPos, timeDurationHeight) {
      const s = {}
      if (this.isCssColor(event.bgcolor)) {
        s['background-color'] = event.bgcolor
        s.color = luminosity(event.bgcolor) > 0.5 ? 'black' : 'white'
      }
      if (timeStartPos) {
        s.top = timeStartPos(event.time) + 'px'
      }
      if (timeDurationHeight) {
        s.height = timeDurationHeight(event.duration) + 'px'
      }
      s['align-items'] = 'flex-start'
      return s
    },
    getEvents (dt) {
      const currentDate = QCalendarTry.parsed(dt)
      const events = []
      for (let i = 0; i < this.events.length; ++i) {
        let added = false
        const event = this.events[i]
        if (event.date === dt) {
          if (event.time) {
            if (events.length > 0) {
              // check for overlapping times
              const startTime = QCalendarTry.parsed(event.date + ' ' + event.time)
              const endTime = QCalendarTry.addToDate(startTime, { minute: event.duration })
              for (let j = 0; j < events.length; ++j) {
                if (events[j].time) {
                  const startTime2 = QCalendarTry.parsed(events[j].date + ' ' + events[j].time)
                  const endTime2 = QCalendarTry.addToDate(startTime2, { minute: events[j].duration })
                  if (QCalendarTry.isBetweenDates(startTime, startTime2, endTime2) || QCalendarTry.isBetweenDates(endTime, startTime2, endTime2)) {
                    events[j].side = 'left'
                    event.side = 'right'
                    events.push(event)
                    added = true
                    break
                  }
                }
              }
            }
          }
          if (!added) {
            event.side = undefined
            events.push(event)
          }
        }
        else if (event.days) {
          // check for overlapping dates
          const startDate = QCalendarTry.parsed(event.date)
          const endDate = QCalendarTry.addToDate(startDate, { day: event.days })
          if (QCalendarTry.isBetweenDates(currentDate, startDate, endDate)) {
            events.push(event)
            added = true
          }
        }
      }
      return events
    },

    testEvent(updateEvent) {
      console.log('edit event: ', updateEvent)
      this.$q.dialog({
        component: EditEvent,
        parent: this,
        event: updateEvent,
        companyName: this.company

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
    /*
   * This function is triggered when the user click on search button and will
   * pop up the search events window.
   */
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
  computed: {
    ...mapState('events',['userEvents']),
    // convert the events into a map of lists keyed by date
    eventsMap () {
      const map = {}
      this.userEvents.forEach((event) => (map[event.date] = map[event.date] || []).push(event))
      return map
    }
  },
  watch: {
    company(newValue) {
      this.$q.loading.show()
      console.log("company on watch", newValue)
      this.companyName = newValue
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

<style>
.q-calendar-daily__head {
  height: 80vh;
}

.q-calendar-daily__intervals-head {
  display: none;
}


.title {
  font-weight: bold;
  word-break: break-word;
}

.details {
  word-break: break-word;
}


@media screen and (max-width: 800px) {
  .title {
    font-weight: bold;
  }
}

@media screen and (max-width: 599px) {

  .title {
    font-weight: bold;
    font-size: 1em;
  }

  .details {
    font-size: 0.8em;
  }
}
</style>

