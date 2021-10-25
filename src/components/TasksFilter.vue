<template>
  <div class="q-pa-lg my-font">
    <p class="text-center text-bold">סנן אירועים: </p>
    <div class="filter-group">
      <q-option-group
        v-model="filteredGroup"
        :options="options"
        color="options.color"
        type="toggle"
      />
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
const optionsGroups = [
  {label: 'סרטון', color: 'orange', value: 'סרטון'},
  {label: 'פוסט', color: 'blue', value: 'פוסט'},
  {label: 'תמונה', color: 'green', value: 'תמונה'},
]

export default {
  name: "TasksFilter",
  computed: mapState('events', ['']),
  data() {
    return {
      //will be in the state
      options: optionsGroups,
      filteredGroup: [],
    }
  }
}
</script>

<style scoped>
</style>
