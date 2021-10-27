<template>
  <form @submit.prevent="submitForm()">
    <div class="row q-mb-md">
      <q-banner class="bg-grey-3 col">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary"/>
        </template>
        התחבר לחשבון שלך
      </q-banner>
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
      <q-input
        outlined
        ref="password"
        v-model="formData.password"
        class="col"
        type="password"
        label="סיסמא"
        lazy-rules
        :rules="[val => val.length >=6 || 'Please enter at least 6 characters.']"
      />
    </div>

    <div class="row q-mb-md">
      <q-space/>
      <q-btn
        class="q-ml-md"
        label="נקה"
        type="reset"
        flat
        color="primary"/>
      <q-btn
        label="התחבר"
        type="submit"
        color="primary"/>
    </div>
  </form>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {LocalStorage} from "quasar";
import {getCompanyNameByEmail} from 'src/middleware/firebase/database'

export default {
  data() {
    return {
      formData: {
        email: '',
        password: ''
      },
      email:''
    }
  },
  // computed:
  //   mapState('users', ['']),
  methods: {
    // ...mapActions('users', ['']),
    ...mapActions('auth', ['loginUser']),
    isValidEmailAddress(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
     submitForm() {
      this.$refs.email.validate()
      this.$refs.password.validate()
      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        this.loginUser({formData: this.formData})
          .then(async() => {
            //this.getUserInfo(userId)
            this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Logged in'
            })
            this.email = await getCompanyNameByEmail(this.formData.email)
            await this.$router.push(`/${this.email}`)
          }).catch(err => console.log(err))
      }
    },
    onReset() {
      this.formData.email = null
      this.formData.password = null
    },

  }
}
</script>

<style scoped>

</style>
