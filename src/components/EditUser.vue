<template>
  <q-dialog ref="dialog" @hide="onDialogHide" style="height: 100%">
    <q-card class="q-dialog-plugin my-font">
      <p class="text-h5 text-center q-mt-md">ערוך משתמש:</p>
      <q-card-section class="q-gutter-lg">

        <q-input v-model="companyNameInput" label="שם חברה"/>

        <q-input v-model="emailInput" label="אימייל"/>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" label="ערוך" @click="onOKClick"/>
        <q-btn color="primary" label="ביטול" @click="onCancelClick"/>
      </q-card-actions>

    </q-card>
  </q-dialog>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "EditUser",

  data() {
    return {
      companyNameInput: this.companyName,
      emailInput: this.email,
    }
  },

  props: ['email', 'companyName', 'userId'],

  methods: {
    ...mapActions('users', ['editExistingUser']),
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

      this.editExistingUser({companyName: this.companyNameInput, email: this.emailInput, userId: this.userId})
        .then(() => {
          this.$q.notify({
            message: ' ערכת את המשתמש בהצלחה! ',
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
