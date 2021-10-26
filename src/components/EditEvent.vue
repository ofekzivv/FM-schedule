<template>
  <q-dialog ref="dialog" @hide="onDialogHide" style="height: 100%">
    <q-card class="q-dialog-plugin my-font">
      <p class="text-h5 text-center q-mt-md">ערוך אירוע:</p>
      <q-card-section class="q-gutter-lg">
        <q-input v-model="event.title" label="נושא"/>

        <q-input v-model="event.details" label="פרטים"/>

        <q-select v-model="event.eventType" :options="options" label="סוג אירוע"/>

        <q-input filled v-model="event.date" mask="date" :rules="['date']">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date v-model="event.date">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat/>
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="red" label="מחק אירוע" @click="deleteEvent(event, companyName)"/>
        <q-btn color="primary" label="ערוך" @click="onOKClick"/>
        <q-btn color="primary" label="ביטול" @click="onCancelClick"/>
      </q-card-actions>

    </q-card>
  </q-dialog>
</template>

<script>
import {mapActions} from "vuex";

export default {
  props: ['event', 'companyName'],
  data() {
    return {
      options: [
        'פוסט', 'תמונה', 'סרטון'
      ],
    }
  },

  methods: {
    ...mapActions('events', ['editExistingEvent', 'deleteExistingEvent']),

    deleteEvent(event, companyName) {
      this.$q.dialog({
        title: 'מחיקת אירוע',
        message: 'אתה בטוח שברצונך למחוק את האירוע?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.deleteExistingEvent([event, companyName]).then(() => {
          this.$q.notify({
            message: 'האירוע נמחק בהצלחה',
            color: 'red'
          })
          this.$emit('ok')
          this.$refs.dialog.hide()
        }).catch(err => {
          console.log(err)
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
    // (don't change its name --> "hide")
    hide() {
      this.$refs.dialog.hide()
    },

    onDialogHide() {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    onOKClick() {
      if (this.event.eventType === 'סרטון') {
        this.event.icon = 'movie'
        this.event.bgcolor = 'green'
      } else if (this.event.eventType === 'תמונה') {
        this.event.icon = 'image'
        this.event.bgcolor = 'orange'
      } else {
        this.event.icon = 'post_add'
        this.event.bgcolor = 'blue'
      }
      this.editExistingEvent([this.event.title, this.companyName, this.event]).then(() => {
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

</style>
