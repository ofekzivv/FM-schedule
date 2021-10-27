<template>
  <q-dialog ref="dialog" @hide="onDialogHide" style="height: 100%">
    <q-card class="q-dialog-plugin my-font">
      <p class="text-h5 text-center q-mt-md">ערוך אירוע:</p>
      <q-card-section class="q-gutter-lg">
        <q-input v-model="formData.title" label="נושא"/>

        <q-input v-model="formData.details" label="פרטים"/>

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
import {mapActions, mapState} from "vuex";

export default {
  props: ['event', 'companyName'],
  data() {
    return {
      options: [
        'פוסט', 'תמונה', 'סרטון'
      ],
      formData: {
        title: this.event.title,
        details: this.event.details,
        date:  this.event.date,
        eventKey:  this.event.eventKey,
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
      this.editExistingEvent({newEvent: this.formData, company: this.companyName}).then(() => {
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
