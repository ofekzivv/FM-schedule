<template>
  <q-dialog ref="dialog" @hide="onDialogHide" style="height: 100%">
    <q-card class="q-dialog-plugin my-font">
      <p class="text-h5 text-center q-mt-md">הוסף אירוע:</p>
      <q-card-section class="q-gutter-lg">
        <q-input v-model="formData.title" label="נושא"/>

        <q-input v-model="formData.details" label="פרטים"/>

        <q-select v-model="eventTypeSelector" :options="options" label="סוג אירוע" />

        <q-input filled v-model="formData.date" mask="date" :rules="['date']">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date v-model="formData.date">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="onOKClick"/>
        <q-btn color="primary" label="Cancel" @click="onCancelClick"/>
      </q-card-actions>

    </q-card>
  </q-dialog>
</template>

<script>
import {addEvent} from 'src/middleware/firebase/database'
export default {
  name: "EventAdder",
  props: ['eventDate', 'eventMonth', 'companyName', 'eventYear'],
  data() {
    return {
      eventTypeSelector: null,
      options: [
        'פוסט', 'תמונה', 'סרטון'
      ],
      formData: {
        eventType: '',
        title: '',
        details: '',
        date:`${this.eventDate}`
      },
    }
  },
  mounted() {
    console.log(this.data['date'])
  },

  methods: {
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
      this.formData.eventType = this.eventTypeSelector
      debugger
      addEvent({name: this.formData.title,companyName: this.companyName,month: this.eventMonth,year: this.eventYear , event: this.formData }).then(() => {
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
    }
  }
}
</script>

<style scoped>

</style>
