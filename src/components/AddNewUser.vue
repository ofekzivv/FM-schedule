<template>
  <div>
    <p>הוסף משתמש חדש:</p>
    <form @submit.prevent="submitForm()">
      <div class="row q-mb-md">
        <q-input
          outlined
          v-model="formData.companyName"
          class="col"
          label="שם החברה"
          lazy-rules
          :rules="[val => val.length >=2 || 'Please enter at least 2 characters.']"
        />
      </div>
      <div class="row q-mb-md">
        <q-input
          outlined
          v-model="formData.email"
          ref="email"
          class="col"
          label="מייל"
          lazy-rules
          :rules="[val => isValidEmailAddress(val) || 'Please enter a valid email address.']"
        />
      </div>
      <div class="row q-mb-md">
        <q-space/>
        <q-btn
          :disable="!formData.email || !formData.companyName"
          label="הוסף משתמש"
          type="submit"
          color="primary"/>
      </div>
    </form>
  </div>
</template>

<script>
import {addUser} from "src/middleware/firebase/database";

export default {
  name: "AddNewUser",
  data() {
    return {
      formData: {
        email: '',
        companyName: ''
      }
    }
  },
  methods: {
    isValidEmailAddress(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    submitForm() {
      this.$refs.email.validate()
      console.log('Submit')
      addUser({companyName: this.formData.companyName, email: this.formData.email})
      this.$router.push('/MonthView')
    },
  }
}
</script>

<style scoped>

</style>
