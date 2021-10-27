<template>
  <div class="q-pa-md items-center q-gutter-sm constrain my-font">
    <q-card
      v-for="(dailyEvent,index) in dailyEvents"
      :key="index"
      :style="{background : dailyEvent.bgcolor}"
      class="text-white"
    >
      <q-card-section>
        <p class="text-h6 text-bold">{{ dailyEvent.companyName }}</p>
      </q-card-section>
      <q-separator/>
      <q-card-section>
        <p class="text-subtitle1 text-bold">{{ dailyEvent.title }}</p>
        <p>{{ dailyEvent.details }}</p>
        <div class="image-flex">
          <q-img v-for="(image, index) of dailyEvent.files" :key="index" v-show="dailyEvent.files" :src="image" @click="showDialog(image)" alt="index"/>
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
}

.q-card {
  cursor: pointer;
  height: auto;
  width: 270px;

}

.image-flex {
  aspect-ratio: 1;
  display: flex;
  flex-wrap: nowrap;
}

</style>
