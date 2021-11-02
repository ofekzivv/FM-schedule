<template>
  <div class="q-pa-md items-center q-gutter-sm constrain my-font">
    <h4 class="title">משימות לתאריך {{dailyEvents[0].date}}</h4>
    <div class="cards">
      <q-card
        v-for="(dailyEvent,index) in dailyEvents"
        :key="index"
        class="column"
      >
        <q-card-section class="col-2">
          <p class="text-h6 text-bold"><q-icon name="person" color="grey-7" class="q-mr-sm"/>{{ dailyEvent.companyName }}</p>
        </q-card-section>
        <q-separator/>
        <q-card-section class="col">
          <p class="text-subtitle1 text-bold"><q-icon name="title" color="grey-7" class="q-mr-sm"/>{{ dailyEvent.title }}</p>
          <p style="word-wrap: break-word;"><q-icon name="description" color="grey-7" class="q-mr-sm"/>{{ dailyEvent.details }}</p>
          <p><q-icon name="language" color="grey-7" class="q-mr-sm"/>{{ dailyEvent.platformType }}</p>
          <p><q-icon name="photo_camera" color="grey-7" class="q-mr-sm"/>{{ dailyEvent.eventType }}</p>
          <div class="image-flex" v-if="dailyEvent.eventType !== 'פוסט'">
            <q-video
              v-if="dailyEvent.eventType === 'סרטון'"
              v-for="(video, index) of dailyEvent.files"
              :key="index"
              :src="video.url"
            />
            <q-img
              v-if="dailyEvent.eventType === 'תמונה'"
              v-for="(image, index) of dailyEvent.files"
              :key="index" v-show="dailyEvent.files"
              :src="image.url"
              @click="showDialog(image.url)"
              alt="index"
            >
              <q-tooltip>
                לחץ על תמונה על מנת להגדיל
              </q-tooltip>
            </q-img>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import ImageViewer from "components/ImageViewer";

export default {
  name: "EventsCards",
  data() {
    return {
      dailyEvents: '',
    }
  },
  components: {
    ImageViewer
  },
  methods: {
    ...mapActions('events', ['getAllUsersEvents', 'getAllUserEvents']),
    async getDailyEvents() {
      this.dailyEvents = await this.getAllUsersEvents('daily')
      console.log('dailyEvents: ', this.dailyEvents)
    },

    showDialog(image) {
      this.$q.dialog({
        component: ImageViewer,

        // optional if you want to have access to
        // Router, Vuex store, and so on, in your
        // custom component:
        parent: this,
        image
        // ...more.props...
      }).onOk(() => {
        console.log('OK')
      }).onCancel(() => {
        console.log('Cancel')
      }).onDismiss(() => {
        console.log('Called on OK or Cancel')
      })
    }
  },
  created() {
    this.getDailyEvents()
  }
}


</script>

<style scoped>

.constrain {
  height: auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
}

.cards {
  justify-content: center;
  width: 960px;
  display: flex;
  flex-wrap: wrap;
  gap: 2em;
}

.q-card {
  overflow: hidden;
  min-height: 520px;
  width: 240px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.image-flex {
  cursor: pointer;
  aspect-ratio: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}

@media screen and (max-width: 769px) {
  .cards {
    justify-content: center;
    width: 500px;
    display: flex;
    gap: 2em;
  }
}

</style>
