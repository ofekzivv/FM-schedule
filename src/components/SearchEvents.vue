<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section class="q-item">
         <strong>חיפוש אירוע</strong>
      </q-card-section>

      <!--Search Fields-->
      <q-card-section>
        <q-input rounded standout v-model="searchKeys.title" label="כותרת" />
        <q-input rounded standout v-model="searchKeys.details" label="פרטים" />
        <q-checkbox  v-model="searchKeys.type.post" label="פוסט" />
        <q-checkbox  v-model="searchKeys.type.image" label="תמונה" />
        <q-checkbox  v-model="searchKeys.type.video" label="סרטון" />

        <q-input filled v-model="searchKeys.startDate" label="סנן לפי תאריך התחלה">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date v-model="searchKeys.startDate" mask="YYYY-MM-DD">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat/>
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input filled v-model="searchKeys.endDate" label="סנן לפי תאריך סיום">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date v-model="searchKeys.endDate" mask="YYYY-MM-DD">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat/>
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-card-section>

      <!--Results Section-->
      <q-card-section>

      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" label="חיפוש" @click="onOKClick" />
        <q-btn color="primary" label="ביטול" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
//This component is a popup search window
//the user can search events by key like "Title"
import {mapState, mapGetters} from 'vuex'

export default {
  name: "SearchEvents",
  data() {
    return {
      results: [],
      searchKeys: {
        title:'',
        details: '',
        type:{
          post: false,
          image: false,
          video: false,
        },
        startDate:'',
        endDate:''
      }
    }
  },
  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show () {
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    onOKClick () {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok')
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },

    onCancelClick () {
      // we just need to hide dialog
      this.hide()
    }
  }
}
</script>

<style scoped>
</style>
