<template>
  <q-dialog ref="dialog" @hide="onDialogHide" style="height: 100%">
    <q-card class="q-dialog-plugin my-font">
      <p class="text-h5 text-center q-mt-md">ערוך אדמין:</p>
      <q-card-section class="q-gutter-lg">

        <q-input v-model="companyNameInput" label="שם אדמין"/>

        <q-input v-model="emailInput" label="אימייל"/>

        <q-input v-model="passwordInput" label="סיסמא"/>
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
import VSwatches from 'vue-swatches'
export default {
  name: "EditAdmin",
  components: {
    VSwatches
  },
  data() {
    return {
      companyNameInput: this.companyName,
      emailInput: this.email,
      passwordInput: this.password
    }
  },

  props: ['email', 'companyName', 'password'],
  methods: {
    ...mapActions('admins', ['editExistingAdmin', 'getAdmin']),
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
      await this.getAdmin(this.companyName);
      await this.editExistingAdmin([this.companyName,this.companyNameInput,this.emailInput,this.passwordInput])
        .then(() => {
          this.$q.notify({
            message: ' ערכת את האדמין בהצלחה! ',
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
