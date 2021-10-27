<template>
  <q-dialog ref="dialog" @hide="onDialogHide" class="text-center">
    <q-card class="q-dialog-plugin q-pt-lg q-pb-sm">
      <q-img :src="image" alt="image"/>


      <!-- buttons example -->
      <q-card-actions align="center">
        <q-btn color="primary"  label="סגור" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "ImageViewer",
  props: ['image'],
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
  }
}
</script>

<style scoped>

.q-img {
  max-width: 250px;
  max-height: 300px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  margin-bottom: 1em;
}
</style>
