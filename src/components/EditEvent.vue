<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <div class="container">
      <q-card v-if="!editEvent" class="q-dialog-plugin my-font">
        <q-card-section class="q-gutter-sm">
          <q-btn v-if="isAdmin" class="edit" icon="edit" round flat color="primary" size="14px" @click="editEvent = true"
                 style="position: absolute; left: 5px; top: 5px"/>

          <q-card-section class="row items-center" style="width: 90%">
            <q-icon name="bolt" size="sm" class="q-mr-md" color="grey-8"/>
            <span class="title text-black">{{ formData.title }}</span>
          </q-card-section>

          <q-card-section class="row items-center">
            <q-icon name="info" size="sm" class="q-mr-md" color="grey-8"/>
            <span class="details text-black">{{ formData.details }}</span>
          </q-card-section>

          <q-card-section class="row items-center">
            <q-icon name="event" size="sm" class="q-mr-md" color="grey-8"/>
            <span class="details text-black">{{ formData.date }}</span>
          </q-card-section>

          <q-card-section v-if="formData.files" class="row items-center">
            <q-icon name="image" size="sm" class="q-mr-md" color="grey-8"/>
            <span class="details text-black">מדיה</span>
          </q-card-section>

          <div v-if="formData.files">
            <q-carousel
              class="q-mt-lg"
              style="width: 80%; margin: 0 auto"
              swipeable
              ref="carousel"
              animated
              v-model="slide"
              navigation
              infinite
            >
              <q-carousel-slide v-if="formData.eventType === 'סרטון'" v-for="(movie, index) of formData.files"
                                :key="index" :name="index">
                <q-video
                  class="absolute-full"
                  :src="movie.url"
                />
              </q-carousel-slide>
              <q-carousel-slide v-if="formData.eventType === 'תמונה'" v-for="(image, index) of formData.files"
                                :key="index" :name="index"
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
      </q-card>
      <q-card v-if="editEvent" class="q-dialog-plugin my-font q-pa-md ">
        <p class="text-h5 text-bold text-center">עריכת אירוע:</p>
        <q-card-section class="q-gutter-lg">

          <q-card-section class="row items-center">
            <q-input v-model="formData.title" label="נושא" style="width: 100%">
              <template v-slot:before>
                <q-icon name="bolt"/>
              </template>
            </q-input>
          </q-card-section>

          <q-card-section class="row items-center">
            <q-input v-model="formData.details" label="פרטים" type="textarea" style="width: 100%">
              <template v-slot:before>
                <q-icon name="info"/>
              </template>
            </q-input>
          </q-card-section>

          <q-card-section class="row items-center" v-if="formData.eventType !== 'פוסט'">
            <q-file
              color="primary"
              v-model="newFiles"
              label="הוסף קבצים"
              counter
              multiple
              use-chips
              style="width: 100%"
            >
              <template v-slot:before>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </q-card-section>

          <q-card-section v-if="formData.files">
            <div class="media">
              <q-img class="col edit-images" v-if="formData.eventType === 'תמונה'"
                     v-for="(image, index) of editedFilesArr"
                     :key="index" :src="image.url">
                <q-btn class="delete-file-btn" icon="close" flat color="primary" @click="deleteFile(image, editedFilesArr)"/>
              </q-img>
              <q-card v-if="formData.eventType === 'סרטון'"
                      v-for="(movie, index) of editedFilesArr"
                      :key="index"
                      class="video">
                <q-video :src="movie.url"/>
                <q-btn class="delete-file-btn" icon="close" flat color="primary" @click="deleteFile(movie, editedFilesArr)"/>
              </q-card>
            </div>
          </q-card-section>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn color="red" label="מחק אירוע" @click="deleteEvent(event, companyName)"/>
          <q-btn color="primary" label="ערוך" @click="onOKClick(companyName)"/>
          <q-btn color="primary" label="ביטול" @click="onCancelClick"/>
        </q-card-actions>

      </q-card>
    </div>
  </q-dialog>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {LocalStorage} from "quasar";

export default {
  props: ['event', 'companyName'],
  data() {
    return {
      isAdmin: false,
      slide: 0,
      newFiles: null,
      editEvent: false,
      options: [
        'פוסט', 'תמונה', 'סרטון'
      ],
      editedFilesArr:[],
      formData: {
        title: this.event.title,
        details: this.event.details,
        date: this.event.date,
        eventType: this.event.eventType,
        eventKey: this.event.eventKey,
        files: this.event.files,
        platform: this.event.platformType
      }
    }
  },

  computed: {
    ...mapState('users', ['userData']),
  },

  methods: {
    ...mapActions('events', ['editExistingEvent', 'deleteExistingEvent', 'editFiles', 'getAllUserEvents']),
    ...mapActions('users', ['getUser']),

    deleteEvent(event, companyName) {
      this.$q.dialog({
        title: 'מחיקת אירוע',
        message: 'אתה בטוח שברצונך למחוק את האירוע?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$q.loading.show({
          message: "מוחק אירוע, אנא המתן"
        })
        this.getUser(companyName).then(() => {
          let password = this.userData.password
          this.deleteExistingEvent({password, companyName, event}).then(() => {
            this.getAllUserEvents(companyName)
            this.$q.notify({
              message: 'האירוע נמחק בהצלחה',
              color: 'red'
            })
            this.$q.loading.hide()
            this.$emit('ok')
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

    async onOKClick(companyName) {
      this.$q.loading.show({
        message: "מעדכן אירוע, אנא המתן"
      })
      await this.getUser(companyName)
      let password = this.userData.password
      debugger
      await this.editFiles({newFiles: this.editedFilesArr, password: this.userData.password, oldFiles: this.formData.files})
      this.formData.files = this.editedFilesArr
      this.editExistingEvent({newEvent: this.formData, company: this.companyName, newFiles: this.newFiles, password}).then(() => {
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
    },
    deleteFile(file, fileArr) {
      for (let i=0; i<fileArr.length; i++){
        if (fileArr[i] === file) {
          fileArr.splice(i, 1);
        }
      }
      console.log('imageArr = ', fileArr)
      console.log('realImages = ', this.formData.files)
    }
  },
  created() {
    this.isAdmin = LocalStorage.getItem('admin')
    console.log('is admin edit user: ', this.isAdmin)
    for (let i=0;i<this.event.files.length; i++) {
      this.editedFilesArr.push(this.event.files[i])
    }
    this.isAdmin = LocalStorage.getItem('admin')

  }
}
</script>

<style scoped>

.q-dialog-plugin {
  max-height: 800px;
  overflow: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.container {
  width: 1400px;
  overflow: visible;
}

.q-card {
  width: 1400px;
  display: flex;
  flex-direction: column;
}

.title {
  font-weight: bold;
  font-size: 2em;
  word-break: break-word;
}

.details {
  font-size: 1.2em;
  word-break: break-word;
}


.media {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 80%;
  max-height: 350px;
}

.media .q-img:hover,
.media .q-video:hover {
  cursor: pointer;
}

.media .delete-file-btn {
  width: 100%;
  background-color: rgba(240, 240, 240, 0.2);
  position: absolute;
  top: 0;
  z-index: 1;
}

.media .delete-file-btn:hover {
  background: var(--q-color-secondary);
}

.video {
  width: 60%;
}

.q-video {
  width: 100%;
}

@media screen and (max-width: 1025px) {
  .q-dialog-plugin {
    max-height: 700px;
  }

  .container {
    width: 800px;
    overflow: visible;
  }

  .q-card {
    width: 800px;
  }
}

@media screen and (max-width: 800px) {
  .q-dialog-plugin {
    max-height: 600px;
  }

  .container {
    width: 500px;
    overflow: visible;
  }

  .q-card {
    width: 500px;
  }

  .title {
    font-weight: bold;
    font-size: 1.8em;
  }

  .details {
    font-size: 1em;
  }

}

@media screen and (max-width: 599px) {
  .q-card {
    max-width: 300px;
  }

  .title {
    font-weight: bold;
    font-size: 1em;
  }

  .details {
    font-size: 0.8em;
  }

  .q-carousel {
    max-height: 300px;
  }
}

</style>
