<template>
  <q-dialog ref="dialog" @hide="onDialogHide" style="height: 100%">
    <q-card class="q-dialog-plugin my-font">
      <p class="text-h5 text-center q-mt-md">הוסף משתמש:</p>
      <q-card-section class="q-gutter-lg">

        <q-input
          outlined
          v-model="formData.companyName"
          class="col"
          label="שם החברה"
          lazy-rules
          :rules="[val => val.length >=2 || 'Please enter at least 2 characters.']"
        />

        <q-input
          outlined
          v-model="formData.email"
          ref="email"
          class="col"
          label="מייל"
          lazy-rules
          :rules="[val => isValidEmailAddress(val) || 'Please enter a valid email address.']"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" label="הוסף משתמש" @click="onOKClick"/>
        <q-btn color="primary" label="ביטול" @click="onCancelClick"/>
      </q-card-actions>

    </q-card>
  </q-dialog>
</template>

<script>
import firebaseInstance from 'src/middleware/firebase/database'

export default {
  name: "AddNewUser",
  data() {
    return {
      formData: {
        email: '',
        companyName: '',
        generatedPassword: '',
      }
    }
  },
  methods: {
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
      this.$refs.email.validate()
      this.formData.generatedPassword = this.generatePassword()
      firebaseInstance.addUser({companyName: this.formData.companyName, email: this.formData.email, password: this.formData.generatedPassword}).then(() => {
        this.$q.notify({
          message: 'הוספת את המשתמש בהצלחה! ',
          icon: 'person_add',
          type: 'positive',
        })
        this.formData.companyName = ''
        this.formData.email = ''
        this.formData.generatedPassword = ''
        this.formData.id = ''
      })
      this.$q.loading.hide()
      this.$emit('ok')
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },

    onCancelClick() {
      // we just need to hide dialog
      this.hide()
    },

    isValidEmailAddress(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    generatePassword() {
      let pw = ""
      let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
      for (let i = 0; i < 10; i++) {
        pw += characters.charAt(Math.floor(Math.random() * characters.length))
      }
      return pw;
    }
  }
}
</script>

<style scoped>

</style>
