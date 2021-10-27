<template>
  <div class="q-pa-md items-center q-gutter-sm constrain my-font">
    <q-card
      v-for="(dailyEvent,index) in dailyEvents"
      :key="index"
      :style="{background : dailyEvent.bgcolor}"
      class="text-white"
    >
      <q-card-section class="col">
        <p class="text-h6 text-bold">{{ dailyEvent.companyName }}</p>
      </q-card-section>
      <q-separator/>
      <q-card-section>
        <p class="text-subtitle1 text-bold">{{ dailyEvent.title }}</p>
        <p style="overflow: hidden; word-wrap: break-word;">{{ dailyEvent.details }}</p>
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
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}

.q-card {
  mix-height: 500px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 270px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  margin: 0 auto 1em auto;
}

.image-flex {
  cursor: pointer;
  aspect-ratio: 1;
  display: flex;
  flex-wrap: nowrap;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}

</style>
