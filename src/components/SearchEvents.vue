<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin my-font">
      <q-card-section>
        <p class="text-h5 text-center q-mt-md">חיפוש אירוע:</p>
      </q-card-section>
      <!--Search Fields-->
      <q-card-section>
        <q-input v-model="searchKeys.title" label="כותרת" class="q-mb-sm"/>
        <q-input v-model="searchKeys.details" label="פרטים" class="q-mb-sm"/>
        <q-checkbox v-model="searchKeys.type.post" label="פוסט" class="q-mb-sm"/>
        <q-checkbox v-model="searchKeys.type.image" label="תמונה" class="q-mb-sm"/>
        <q-checkbox v-model="searchKeys.type.video" label="סרטון" class="q-mb-sm"/>

        <q-input v-model="searchKeys.date" label="סנן לפי תאריך">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date v-model="searchKeys.date" mask="YYYY-MM-DD">
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
        <q-btn color="primary" label="חיפוש" @click="onOKClick"/>
        <q-btn color="primary" label="ביטול" @click="onCancelClick"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
//This component is a popup search window
//the user can search events by key like "Title"
import {mapState, mapMutations} from 'vuex'

export default {
  name: "SearchEvents",
  data() {
    return {
      results: [],
      searchKeys: {
        title: '',
        details: '',
        type: {
          post: false,
          image: false,
          video: false,
        },
        date: '',
      }
    }
  },
  computed: mapState('events', ['userEvents']),
  methods: {
    ...mapMutations('events', ['setSearchKeys']),
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
      this.setSearchKeys(this.searchKeys)

      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok')
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()

      //move to Search Results page:
      this.$router.push('/searchEvents')
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
