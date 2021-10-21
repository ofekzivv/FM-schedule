<template>
  <div class="text-center q-mt-lg">
    <div class="title-filter"><p class="text-subtitle1">סנן אירועים לפי:</p></div>
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
  {label: 'פוסטים', color: 'yellow', value: 'חגים'},
  {label: 'סרטונים', color: 'red', value: 'משפחה'},
  {label: 'תמונות', color: 'blue', value: 'חברים'},
  {label: 'מסיבות', color: 'green', value: 'מסיבות'},
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
