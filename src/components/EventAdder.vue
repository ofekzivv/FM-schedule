<template>
  <q-dialog ref="dialog" @hide="onDialogHide" style="height: 100%">
    <div class="container">
      <q-card v-if="!editEvent" class="q-dialog-plugin my-font">
        <q-card-section>
          <p class="text-h5 text-bold text-center">הוספת אירוע:</p>
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

          <q-card-section class="row items-center">
            <q-select v-model="formData.platformType" :options="platform" label="פלטפורמה" @input="select()"
                      style="width: 100%">
              <template v-slot:before>
                <q-icon name="info"/>
              </template>
            </q-select>
          </q-card-section>

          <q-card-section class="row items-center" v-if="formData.platformType">
            <q-select v-model="eventTypeSelector" :options="options" label="סוג אירוע" style="width: 100%">
              <template v-slot:before>
                <q-icon name="info"/>
              </template>
            </q-select>
          </q-card-section>

          <q-card-section class="row items-center" v-if="eventTypeSelector && eventTypeSelector !== 'פוסט'">
            <q-file
              color="primary"
              v-model="formData.files"
              label="הוסף קובץ"
              counter
              multiple
              use-chips
              style="width: 100%"
            >
              <template v-slot:before>
                <q-icon name="attach_file"/>
              </template>
            </q-file>
          </q-card-section>

          <q-card-section class="row items-center">
            <q-input v-model="formData.date" mask="date" :rules="['date']" style="width: 100%">
              <template v-slot:before>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="formData.date">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat/>
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </q-card-section>
          <q-card-actions align="center">
            <q-btn color="primary" label="הוסף" @click="onOKClick" style="padding: 0 1em"/>
          </q-card-actions>
        </q-card-section>
      </q-card>
    </div>
  </q-dialog>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "EventAdder",
  props: ['companyName', 'eventDate'],
  data() {
    return {
      eventTypeSelector: null,
      platformSelector: null,
      platform: ['אינסטגרם', 'פייסבוק'],
      options: [],
      formData: {
        platformType: '',
        eventType: '',
        title: '',
        details: '',
        date: this.eventDate,
        files: null,
        bgcolor: '',
        eventKey: Date.now(),
        icon: ''
      },
    }
  },

  computed: {
    ...mapState('users', ['userData'])
  },

  methods: {
    ...mapActions('events', ['addNewEvent', 'getUserColor', 'getAllUserEvents']),
    ...mapActions('users', ['getUser']),
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
      this.$q.loading.show({
        message: "מוסיף אירוע, אנא המתן"
      })
      await this.getUser(this.companyName)
      let password = this.userData.password
      await this.getUserColor(this.companyName).then(res => {
        this.formData.bgcolor = res
      })
      this.formData.eventType = this.eventTypeSelector
      if (this.eventTypeSelector === 'סרטון') {
        this.formData.icon = 'movie'
      } else if (this.eventTypeSelector === 'תמונה') {
        this.formData.icon = 'image'
      } else {
        this.formData.icon = 'post_add'
      }
      debugger
      await this.addNewEvent({companyName: this.companyName, password, newEvent: this.formData}).then(async () => {
        await this.getAllUserEvents(this.companyName)
        this.$q.loading.hide()
        this.$q.notify({
          message: 'הוספת את האירוע בהצלחה! ',
          icon: 'event_available',
          type: 'positive',
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
    select() {
      if (this.formData.platformType === 'פייסבוק') {
        this.options = ['פוסט', 'תמונה', 'סרטון']
      } else {
        this.options = ['סרטון', 'תמונה']
      }
    }
  },
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

}

@media screen and (max-width: 599px) {
  .q-card {
    max-width: 300px;
  }

}

</style>
