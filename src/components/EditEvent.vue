<template>
  <q-dialog ref="dialog" @hide="onDialogHide" style="height: 100%; max-width: 400px; margin: 0 auto">
    <div>
      <q-card v-if="!editEvent" class="q-dialog-plugin my-font">
        <q-card-section class="q-gutter-xs">
          <p class="text-h5 text-center text-bold q-mt-lg">פרטי האירוע:</p>

          <p class="text-subtitle2 text-grey-6">נושא: </p>
          <p class="text-subtitle1 text-black">{{ formData.title }}</p>

          <p class="text-subtitle2 text-grey-6">פרטים: </p>
          <p style="overflow: hidden; word-wrap: break-word;" class="text-subtitle1 text-black">{{ formData.details }}</p>

          <p class="text-subtitle2 text-grey-6">תאריך: </p>
          <p class="text-subtitle1 text-black">{{ formData.date }}</p>

          <div v-if="formData.images">
            <p class="text-subtitle2 text-grey-6">תמונות: </p>
            <q-carousel
              style="width: 80%; margin: 0 auto"
              swipeable
              ref="carousel"
              animated
              v-model="slide"
              navigation
              infinite
            >
              <q-carousel-slide v-if="formData.eventType === 'סרטון'" v-for="(movie, index) of formData.images" :key="index" :name="index">
                <q-video
                  class="absolute-full"
                  :src="movie.url"
                />
              </q-carousel-slide>
              <q-carousel-slide v-if="formData.eventType === 'תמונה'" v-for="(image, index) of formData.images" :key="index" :name="index"
                                :img-src="image.url"/>
              <template v-slot:control>
                <q-carousel-control
                  position="top-left"
                  :offset="[18, 18]"
                  class="q-gutter-xs"
                >
                  <q-btn
                    push round dense color="primary" text-color="white" icon="arrow_right"
                    @click="$refs.carousel.previous()"
                  />
                  <q-btn
                    push round dense color="primary" text-color="white" icon="arrow_left"
                    @click="$refs.carousel.next()"
                  />
                </q-carousel-control>
              </template>
            </q-carousel>
          </div>

        </q-card-section>
        <q-card-actions align="center">
          <q-btn color="primary" class="" label="ערוך" @click="editEvent = true"/>
        </q-card-actions>
      </q-card>

      <q-card v-if="editEvent" class="q-dialog-plugin my-font q-pa-md">
        <p class="text-h5 text-center q-mt-md">ערוך אירוע:</p>
        <q-card-section class="q-gutter-lg">
          <q-input v-model="formData.title" label="נושא"/>

          <q-input
            v-model="formData.details"
            label="פרטים"
            type="textarea"
          />

        </q-card-section>

        <q-card-actions align="right">
          <q-btn color="red" label="מחק אירוע" @click="deleteEvent(event, companyName)"/>
          <q-btn color="primary" label="ערוך" @click="onOKClick"/>
          <q-btn color="primary" label="ביטול" @click="onCancelClick"/>
        </q-card-actions>

      </q-card>
    </div>
  </q-dialog>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  props: ['event', 'companyName'],
  data() {
    return {
      slide: 0,
      editEvent: false,
      options: [
        'פוסט', 'תמונה', 'סרטון'
      ],
      formData: {
        title: this.event.title,
        details: this.event.details,
        date: this.event.date,
        eventType: this.event.eventType,
        eventKey: this.event.eventKey,
        images: this.event.files
      }
    }
  },

  computed: {
    ...mapState('users', ['userData'])
  },

  methods: {
    ...mapActions('events', ['editExistingEvent', 'deleteExistingEvent']),
    ...mapActions('users', ['getUser']),

    deleteEvent(event, companyName) {
      this.$q.dialog({
        title: 'מחיקת אירוע',
        message: 'אתה בטוח שברצונך למחוק את האירוע?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.getUser(companyName).then(() => {
          let password = this.userData.password
          this.deleteExistingEvent({password, companyName, event}).then(() => {
            this.$q.notify({
              message: 'האירוע נמחק בהצלחה',
              color: 'red'
            })
            this.$emit('ok')
            this.$refs.dialog.hide()
          }).catch(err => {
            console.log(err)
          })
        })

      }).onOk(() => {
        // console.log('>>>> second OK catcher')
        this.$refs.dialog.hide()
      }).onCancel(() => {
        // console.log('>>>> Cancel')
        this.$refs.dialog.hide()
      })
    },
    // following method is REQUIRED
    // (don't change its name --> "show")
    show() {
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't chshowange its name --> "hide")
    hide() {
      this.$refs.dialog.hide()
    },

    onDialogHide() {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    onOKClick() {
      this.$q.loading.show()
      this.editExistingEvent({newEvent: this.formData, company: this.companyName}).then(() => {
        this.$q.loading.hide()
        this.$q.notify({
          message: ' ערכת את האירוע בהצלחה! ',
          icon: 'event_available',
          type: 'warning',
        })
      })
      this.$emit('ok')
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },

    onCancelClick() {
      // we just need to hide dialog
      this.hide()
    }
  }
}
</script>

<style scoped>

@media  screen and (max-width: 599px) {
  .q-card {
    max-width: 300px;
  }
}

</style>
