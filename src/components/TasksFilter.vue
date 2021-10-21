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
//temporary
const optionsGroups = [
  {label: 'סרטון', color: 'yellow', value: 'סרטון'},
  {label: 'פוסט', color: 'red', value: 'פוסט'},
  {label: 'תמונה', color: 'blue', value: 'תמונה'},
]

export default {
  name: "TasksFilter",
  props: ['items'],
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
