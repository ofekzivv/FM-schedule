<template>
<div class="q-pa-lg">
  <div class="title-filter"><h6><strong>סנן אירועים:</strong></h6></div>
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
const optionsGroups = [
  {label:'חגים', color: 'yellow', value: 'חגים'},
  {label:'משפחה', color: 'red', value: 'משפחה'},
  {label:'חברים', color: 'blue', value: 'חברים'},
  {label:'מסיבות', color: 'green', value: 'מסיבות'},
]

export default {
  name: "TasksFilter",
  props: ['items'],
  data(){
    return{
      //will be in the state
      options: optionsGroups,
      filteredGroup: [],
    }
  }
}
</script>

<style scoped>
.title-filter{
  margin-right: 7px;
}
.filter-group{
  justify-content: start;
}
</style>
