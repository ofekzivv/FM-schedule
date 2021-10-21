<template>
  <div class="my-font">
    <div class="q-ma-lg">
      <q-btn color="primary" label="הוסף משתמש" />
    </div>
    <div class="q-mt-lg items-center">
      <div class="select text-center" style="width: 500px; margin: 2em auto;">
        <p class="text-h5">בחר משתמש:</p>
        <q-select v-model="model" :options="options" label="משתמש" />
      </div>
    </div>
    <div>
    <MonthCalendar v-if="model" :user="user"/>
    </div>
  </div>
</template>

<script>
import MonthCalendar from "components/MonthCalendar";

export default {
  components: {
    MonthCalendar
  },
  data() {
    return {
      model: null,
      options: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ]
    }
  }
}
</script>

<style scoped>

</style>
