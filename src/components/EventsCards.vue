<template>
  <div class="q-pa-md items-center q-gutter-sm constrain my-font">
    <q-card
      v-for="(dailyEvent,index) in dailyEvents"
      :key="index"
      :style="{background : dailyEvent.bgcolor}"
      class="text-white"
    >
      <q-card-section>
        <p class="text-h6 text-bold">{{dailyEvent.companyName}}</p>
      </q-card-section>
      <q-separator/>
      <q-card-section >
        <p class="text-subtitle1 text-bold">{{dailyEvent.title}}</p>
        <p>{{dailyEvent.details}}</p>
        <div class="image-flex">
        <q-img v-for="image of dailyEvent.files" v-show="dailyEvent.files" :src="image" max-width="250px" @click="showDialog(image)"/>
        </div>
      </q-card-section>


    </q-card>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "EventsCards",
  data(){
    return{
    dailyEvents : '',
    }
  },
  methods: {
    ...mapActions('events', ['getAllUsersEvents', 'getAllUserEvents']),
    async getDailyEvents() {
      this.dailyEvents = await this.getAllUsersEvents('daily')
      console.log('dailyEvents: ', this.dailyEvents)
    },

    showDialog(image) {
      console.log(image)
      this.$q.dialog({
        title: 'Alert',
        message: '<img :src=`image` alt="image">',
        html: true
      }).onOk(() => {
        // console.log('OK')
      }).onCancel(() => {
        // console.log('Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
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
  width: 960px;
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
