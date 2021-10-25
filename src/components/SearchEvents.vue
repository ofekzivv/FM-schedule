<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin my-font">
      <q-card-section class="q-item text-center">
        <p class="text-h5">חיפוש אירוע: </p>
      </q-card-section>

      <q-card-section>
        <div class="select text-center q-gutter-sm" style="max-width: 500px; width: 80%; margin: 1em auto;">
        <q-select v-model="companyName" :options="options" label="שם חברה"/>
        <q-input  v-model="searchKeys.title" label="כותרת"/>
        <q-input  v-model="searchKeys.details" label="פרטים"/>
        <q-checkbox v-model="searchKeys.eventType.post" label="פוסט"/>
        <q-checkbox v-model="searchKeys.eventType.image" label="תמונה"/>
        <q-checkbox v-model="searchKeys.eventType.video" label="סרטון"/>

        <q-input   v-model="searchKeys.date" label="סנן לפי תאריך">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date v-model="searchKeys.date" mask="YYYY-MM-DD">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat/>
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        </div>
      </q-card-section>

      <!--Results Section-->
      <q-card-section v-if="results">
        <q-card dark bordered class="bg-grey-9 my-card" v-for="(event,index) of results">
          <q-card-section>
            <div class="text-h6">{{ event.title }}</div>
            <div class="text-subtitle2">{{ event.date }}</div>
          </q-card-section>

          <q-separator dark inset />

          <q-card-section>
            {{event.details}}
          </q-card-section>
        </q-card>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" label="חיפוש" @click="onOKClick"/>
        <q-btn color="primary" label="ביטול" @click="onCancelClick"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
//This component is a popup search window
//the user can search events by key like "Title"
import eventsCards from "components/eventsCards";
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'

export default {
  name: "SearchEvents",
  components: {eventsCards},
  data() {
    return {
      results: [],
      options: [],
      companyName: null,
      searchKeys: {
        title: '',
        details: '',
        eventType: {
          post: false,
          image: false,
          video: false,
        },
        date: '',
      },
    }
  },
  computed: {
    ...mapState('events', ['userEvents']),
    ...mapState('users', ['users']),
  },
  methods: {
    ...mapActions('users',['getUsers']),
    ...mapActions('events', ['getAllUserEvents','getFilteredEvents']),
    ...mapMutations('events', ['setSearchKeys','getEventsByKeys']),
    //...mapGetters('events', ['getEventsByKeys']),
    // following method is REQUIRED
    // (don't change its name --> "show")
    show() {
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide() {
      this.$refs.dialog.hide()
    },

    onDialogHide() {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    async onOKClick() {
      this.setEventType()
      this.setSearchKeys(this.searchKeys)
      const userEvents = await this.getAllUserEvents(this.companyName)

      let res = await this.getFilteredEvents(userEvents)
      debugger
      console.log(res)
      this.results = res
      console.log(` this.results = ${this.results}`)

      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      //this.$emit('ok')
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      //this.hide()

      //move to Search Results page:
      //this.$router.push('/searchEvents')
    },

    onCancelClick() {
      // we just need to hide dialog
      this.hide()
    },

    setEventType() {
      let wantedTypes = []
      if (this.searchKeys.eventType.post)
        wantedTypes.push('פוסט')
      if (this.searchKeys.eventType.image)
        wantedTypes.push('תמונה')
      if (this.searchKeys.eventType.video)
        wantedTypes.push('סרטון')
      this.searchKeys.eventType = wantedTypes
    }
  },
  created() {
    this.getUsers()
    for (let i = 0; i < this.users.length; i++) {
      this.options.push(this.users[i].companyName)
    }
  }
}
</script>

<style scoped>
</style>
