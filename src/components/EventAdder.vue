<template>
  <q-dialog ref="dialog" @hide="onDialogHide" style="height: 100%">
    <q-card class="q-dialog-plugin my-font">
      <p v-if="!platformSelector" class="text-h5 text-center q-mt-md">בחר פלטפורמה:</p>
      <q-select v-if="!platformSelector" v-model="platformSelector" :options="platform" label="סוג פלטפורמה"/>
      <p v-if="platformSelector" class="text-h5 text-center q-mt-md">הוסף אירוע ב{{platformSelector}}:</p>
      <q-card-section class="q-gutter-lg">
        <q-input v-if="platformSelector" v-model="formData.title" label="נושא"/>

        <q-input v-if="platformSelector" v-model="formData.details"  type="textarea" label="פרטים"/>

        <q-select v-if="platformSelector" v-model="eventTypeSelector" :options="options" label="סוג אירוע" />

        <q-file
          v-if="platformSelector"
          v-show="eventTypeSelector && eventTypeSelector!=='פוסט'"
          color="primary"
          v-model="formData.files"
          label="הוסף קובץ"
          counter
          multiple
          use-chips
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>

        <q-input v-if="platformSelector" filled v-model="formData.date" mask="date" :rules="['date']">
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
        <q-btn v-if="platformSelector" color="primary" label="הוסף" @click="onOKClick"/>
        <q-btn v-if="platformSelector" color="primary" label="ביטול" @click="onCancelClick"/>
      </q-card-actions>

    </q-card>
  </q-dialog>
</template>

<script>
import {mapActions, mapState} from "vuex";
export default {
  name: "EventAdder",
  props: [ 'companyName', 'eventDate'],
  data() {
    return {
      eventTypeSelector: null,
      platformSelector: null,
      platform: ['אינסטגרם','פייסבוק'],
      options: this.platformSelector,
      formData: {
        platformType:'',
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
    ...mapActions('events', ['addNewEvent', 'getUserColor']),
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
      this.$q.loading.show()
      await this.getUser(this.companyName)
      let password = this.userData.password
      await this.getUserColor(this.companyName).then(res => {
        this.formData.bgcolor = res
      })
      this.formData.eventType = this.eventTypeSelector
      if (this.eventTypeSelector === 'סרטון') {
        this.formData.icon = 'movie'
      }
      else if (this.eventTypeSelector === 'תמונה') {
        this.formData.icon = 'image'
      }
      else {
        this.formData.icon = 'post_add'
      }
      await this.addNewEvent([this.formData.title, this.companyName,password, this.formData]).then(() => {
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
    }
  },
  watch: {
    platformSelector(){
      debugger
      if (this.platformSelector === 'facebook'){
        this.options =['פוסט', 'תמונה', 'סרטון']
      }
      else{
        this.options = ['סרטון','תמונה']
      }
    }
  }
}
</script>

<style scoped>

</style>
