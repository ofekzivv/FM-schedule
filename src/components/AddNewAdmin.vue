<template>
  <q-dialog ref="dialog" @hide="onDialogHide" style="height: 100%">
    <q-card class="q-dialog-plugin my-font">
      <p class="text-h5 text-center q-mt-md">הוסף אדמין:</p>
      <q-card-section class="q-gutter-lg">

        <q-input
          v-model="formData.companyName"
          class="col"
          label="שם"
          lazy-rules
          :rules="[val => val.length >=2 || 'Please enter at least 2 characters.']"
        />

        <q-input
          v-model="formData.email"
          ref="email"
          class="col"
          label="מייל"
          lazy-rules
          :rules="[val => isValidEmailAddress(val) || 'Please enter a valid email address.']"
        />
        <q-input
          v-model="formData.password"
          class="col"
          label="סיסמא"
          lazy-rules
          :rules="[val => val.length >=6 || 'Please enter at least 6 characters.']"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" label="הוסף אדמין" @click="onOKClick"/>
        <q-btn color="primary" label="ביטול" @click="onCancelClick"/>
      </q-card-actions>

    </q-card>
  </q-dialog>
</template>

<script>
import firebaseInstance from 'src/middleware/firebase/database'
import firebaseIndex from "src/middleware/firebase";

export default {
  name: "AddNewAdmin",
  data() {
    return {
      formData: {
        email: '',
        companyName: '',
        password: ''
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
      debugger
      this.$q.loading.show()
      this.$refs.email.validate()
     await firebaseIndex.firebase.auth().createUserWithEmailAndPassword(this.formData.email, this.formData.password).then(user => {
        window.user = user;
        window.user.uid = this.formData.generatedPassword;
        console.log('Signed in')
      })
      await firebaseInstance.addAdmin({companyName: this.formData.companyName, email: this.formData.email, password: this.formData.password}).then(() => {
        this.$q.notify({
          message: 'הוספת את האדמין בהצלחה! ',
          icon: 'person_add',
          type: 'positive',
        })
        this.formData.companyName = ''
        this.formData.email = ''
        this.formData.password = ''
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
      const re = /^\S+@\S+\.\S+$/;
      return re.test(String(email).toLowerCase());
    },
  }
}
</script>

<style scoped>

</style>
