<template>
  <div class="my-font container">
    <div class="row justify-center items-center q-mb-sm">
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
      :day-height="100"
      @click:day2="onClickDay2"
      hour24-format
    >
      <template #day="{ timestamp }">
        <template v-for="(event, index) in getEvents(timestamp.date)">
          <q-badge
            class="justify-center column"
            @click="testEvent()"
            :key="index"
            style="width: 80%; cursor: pointer; height: 100%;"
            :class="badgeClasses(event, 'day')"
            :style="badgeStyles(event, 'day')"
          >
            <span class="text-subtitle1 text-bold">{{ event.title }}</span>
            <span style="font-size: 1em;">{{ event.details }}</span>
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
import {mapActions, mapState} from "vuex";
import {Dialog} from 'quasar'
import EventAdder from "components/EventAdder";

const reRGBA = /^\s*rgb(a)?\s*\((\s*(\d+)\s*,\s*?){2}(\d+)\s*,?\s*([01]?\.?\d*?)?\s*\)\s*$/

function textToRgb (color) {
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

function hexToRgb (hex) {
  if (typeof hex !== 'string') {
    throw new TypeError('Expected a string')
  }

  hex = hex.replace(/^#/, '')

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  else if (hex.length === 4) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3]
  }

  const num = parseInt(hex, 16)

  return hex.length > 6
    ? { r: num >> 24 & 255, g: num >> 16 & 255, b: num >> 8 & 255, a: Math.round((num & 255) / 2.55) }
    : { r: num >> 16, g: num >> 8 & 255, b: num & 255 }
}

function luminosity (color) {
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
      companyName: ''
    }
  },
  props:['company'],
  components: {
    QCalendar,
    EventAdder
  },

  created() {
    console.log("company on created", this.company)
    this.companyName = this.company
    this.getAllUserEvents(this.companyName).then((res) => {
      this.events = res
    })
  },
  methods: {
    ...mapActions('events', ['getAllUserEvents']),
    onModelChanged (date) {
      this.events.unshift(`Model changed: ${date}`)
      console.log(date)
    },
    calendarNext() {
      this.$refs.calendar.next()
    },
    calendarPrev() {
      this.$refs.calendar.prev()
    },
    onClickDay2(data) {
      console.log(JSON.stringify(data))
      this.$q.dialog({
        component: EventAdder,
        parent: this,
        companyName: this.company,
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
    isCssColor (color) {
      return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/)
    },

    badgeClasses (event, type) {
      const cssColor = this.isCssColor(event.bgcolor)
      const isHeader = type === 'header'
      return {
        [`text-white bg-${event.bgcolor}`]: !cssColor,
        'full-width': !isHeader && (!event.side || event.side === 'full'),
        'left-side': !isHeader && event.side === 'left',
        'right-side': !isHeader && event.side === 'right'
      }
    },

    badgeStyles (event, type, timeStartPos, timeDurationHeight) {
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
      const currentDate = QCalendarTry.parseTimestamp(dt)
      const events = []
      for (let i = 0; i < this.events.length; ++i) {
        let added = false
        if (this.events[i].date === dt) {
          if (this.events[i].time) {
            if (events.length > 0) {
              // check for overlapping times
              const startTime = QCalendarTry.parseTimestamp(this.events[i].date + ' ' + this.events[i].time)
              const endTime = QCalendarTry.addToDate(startTime, { minute: this.events[i].duration })
              for (let j = 0; j < events.length; ++j) {
                if (events[j].time) {
                  const startTime2 = QCalendarTry.parseTimestamp(events[j].date + ' ' + events[j].time)
                  const endTime2 = QCalendarTry.addToDate(startTime2, { minute: events[j].duration })
                  if (QCalendarTry.isBetweenDates(startTime, startTime2, endTime2) || QCalendarTry.isBetweenDates(endTime, startTime2, endTime2)) {
                    events[j].side = 'left'
                    this.events[i].side = 'right'
                    events.push(this.events[i])
                    added = true
                    break
                  }
                }
              }
            }
          }
          if (!added) {
            this.events[i].side = undefined
            events.push(this.events[i])
          }
        }
        else if (this.events[i].days) {
          // check for overlapping dates
          const startDate = QCalendarTry.parseTimestamp(this.events[i].date)
          const endDate = QCalendarTry.addToDate(startDate, { day: this.events[i].days })
          if (QCalendarTry.isBetweenDates(currentDate, startDate, endDate)) {
            events.push(this.events[i])
            added = true
          }
        }
      }
      return events
    },
    testEvent() {
      console.log('event')
    }
  },
  watch: {
    company(newValue) {
      console.log("company on watch", newValue)
      this.companyName = newValue
      this.getAllUserEvents(this.companyName).then((res) => {
        this.events = res
      })
    }
  }
}

</script>

<style src="@quasar/quasar-ui-qcalendar/dist/index.css"></style>

