<template>
  <div class="q-pa-lg my-font">
    <p class="text-center text-bold">סנן אירועים: </p>
    <div class="filter-group">
      <q-option-group
        v-model="filteredGroup"
        :options="options"
        color="options.color"
        type="toggle"
        @input="changeFilter()"
      />
    </div>
  </div>
</template>

<script>
import {mapActions, mapState, mapMutations} from "vuex";

const optionsGroups = [
  {label: 'סרטון', color: 'orange', value: 'סרטון'},
  {label: 'פוסט', color: 'blue', value: 'פוסט'},
  {label: 'תמונה', color: 'green', value: 'תמונה'},
]

export default {
  name: "TasksFilter",
  props: ['company'],
  computed: mapState('events', ['toggleFilter', 'userEvents', 'companyName']),
  methods: {

    ...mapMutations('events', ['setToggleFilter']),

    ...mapActions('events', ['getAllUserEvents', 'FilterByToggle']),

    changeFilter() {
      console.log(this.companyName)
      console.log(this.userEvents)
      this.setToggleFilter(this.filteredGroup)
      this.FilterByToggle()
      console.log(this.userEvents)
    },
  },
  data() {
    return {
      //will be in the state
      options: optionsGroups,
      filteredGroup: [],
      company: this.companyName,
    }
  },
  created() {
  },
  watch: {
    company(newValue){
      console.log(newValue)
    }
  }
}
</script>

<style scoped>
</style>
