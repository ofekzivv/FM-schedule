<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-img
      :class="{'lot__images' : files.length > 2}"
      class="image__view"
      v-if="eventType === 'תמונה'"
      v-for="(file, index) in files" :key="index"
      :src="file.url"
      alt="image"
    >
      <q-btn icon="close" color="white" flat dense @click="onOKClick"/>
    </q-img>

    <q-video
      class="video__view"
      :class="{'lot__videos' : files.length > 2}"
      v-if="eventType === 'סרטון'"
      v-for="(video, index) of files"
      :key="index"
      :src="video.url"
    />
  </q-dialog>
</template>

<script>
export default {
  name: "ImageViewer",
  props: ['files', 'eventType'],
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


.video__view {
  overflow: hidden;
  aspect-ratio: 4/3;
  width: 500px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
}

.lot__videos {
  width: 400px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
}

.image__view {
  max-width: 500px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  aspect-ratio: 1;
}

.lot__images {
  max-width: 200px;
}

@media screen and (max-width: 599px) {
  .image__view {
    max-width: 300px;
    max-height: 500px;
  }

  .lot__images {
    max-width: 100px;
    max-height: 200px;
  }

  .video__view {
    width: 300px;
  }

  .lot__videos {
    width: 300px;
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  }
}
</style>
