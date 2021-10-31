<template>
  <q-dialog ref="dialog" @hide="onDialogHide" style="height: 100%">
    <q-card class="q-dialog-plugin my-font">
      <p class="text-h5 text-center q-mt-md">ערוך משתמש:</p>
      <q-card-section class="q-gutter-lg">

        <q-input v-model="newData.companyNameInput" label="שם חברה"/>

        <q-input v-model="newData.emailInput" label="אימייל"/>

        <q-img class="text-center" :src="logo" alt="logo" width="150px">
          <q-btn @click="changeLogo = true" icon="edit" class="bg-primary text-white absolute-bottom-right" dense label="שנה תמונה"/>
        </q-img>

        <q-file v-if="changeLogo" v-model="newData.logoInput" label="בחר לוגו חברה">
          <template v-slot:append>
            <q-icon name="attach_file"/>
          </template>
        </q-file>

        <div class="form__field">
          <p class="text-grey-8" style="font-size: 16px">בחר צבע לחברה: </p>
          <v-swatches
            v-model="newData.colorInput"
            popover-x="center"
            swatches="text-advanced"
            show-fallback
            fallback-input-type="color"
          ></v-swatches>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" label="ערוך" @click="onOKClick"/>
        <q-btn color="primary" label="ביטול" @click="onCancelClick"/>
      </q-card-actions>

    </q-card>
  </q-dialog>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";
import VSwatches from 'vue-swatches'


export default {
  name: "EditUser",
  components: {
    VSwatches
  },
  data() {
    return {
      changeLogo: false,
      newData: {
        companyNameInput: this.companyName,
        emailInput: this.email,
        colorInput: this.color,
        logoInput: this.logo
      }
    }
  },

  props: ['email', 'companyName', 'logo', 'color'],
  computed: mapState('users', ['userData']),
  methods: {
    ...mapMutations('users', ['setUser']),
    ...mapActions('users', ['editExistingUser', 'deleteUser', 'getUser']),
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
      this.$q.loading.show({
        message: 'עורך את המשתמש'
      })
      await this.getUser(this.companyName)
      let user = this.userData
      await this.editExistingUser({user, editedUser: this.newData})
        .then(() => {
          this.$q.loading.hide()
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
