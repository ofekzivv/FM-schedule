<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-img class="image" :src="image" alt="image">
      <q-btn icon="close" color="white" flat dense @click="onOKClick"/>
    </q-img>
  </q-dialog>
</template>

<script>
export default {
  name: "ImageViewer",
  props: ['image'],
  methods: {
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

.image {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

@media screen and (max-width: 599px) {
  .image {
    max-width: 350px;
    max-height: 400px;
  }
}
</style>
