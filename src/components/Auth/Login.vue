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
import {mapActions, mapState, mapGetters} from "vuex";
import {getCompanyNameByEmail} from 'src/middleware/firebase/database'
import {LocalStorage} from "quasar";

export default {
  data() {
    return {
      formData: {
        email: '',
        password: ''
      },
      email:'',
      company: ''
    }
  },
  computed:{
    ...mapState('auth', ['admin']),

  },
  methods: {
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
            if (!window.user) {
              this.$q.dialog({
                title: 'פרטים שגויים',
                message: 'הפרטים שהזנת הינם שגויים, אנא נסה שוב.'
              }).onOk(() => {
                //
              }).onCancel(() => {
                // console.log('Cancel')
              }).onDismiss(() => {
                // console.log('I am triggered on both OK and Cancel')
              })
              return
            }
            this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Logged in'
            })
            if(!this.admin) {
              this.company = await getCompanyNameByEmail(this.formData.email)
              LocalStorage.set('companyName', this.company)
              await this.$router.push(`/${this.company}`)
              location.reload();
            }
            else if(this.admin){
              await this.$router.push('/admin')
              location.reload();
            }
          }).catch(err => console.log(err))
      }
      else {
        this.$q.dialog({
          title: 'פרטים לא תקינים',
          message: 'המייל או הסיסמא שלך לא תקינים, אנא נסה שוב.'
        }).onOk(() => {
          //
        }).onCancel(() => {
          // console.log('Cancel')
        }).onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        })
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
