<template>
  <div class="q-pa-lg my-font ">
    <p class="text-bold">סנן אירועים: </p>
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
  {label: 'סרטון', color: 'black', value: 'סרטון'},
  {label: 'פוסט', color: 'black', value: 'פוסט'},
  {label: 'תמונה', color: 'black', value: 'תמונה'},
]

export default {
  name: "TasksFilter",
  props: ['company'],
  computed: mapState('events', ['toggleFilter', 'userEvents']),
  data() {
    return {
      //will be in the state
      options: optionsGroups,
      filteredGroup: ['סרטון','תמונה' ,'פוסט'],
    }
  },
  methods: {

    ...mapMutations('events', ['setToggleFilter','setUserEvents']),
    ...mapActions('events', ['getAllUserEvents', 'FilterByToggle','getAllUsersEvents']),

    async changeFilter() {
      if (this.company !== "כל המשתמשים") {
        await this.setToggleFilter(this.filteredGroup)
        console.log(this.company)
        await this.getAllUserEvents(this.company)
        console.log(this.userEvents)
        await this.FilterByToggle('')
      }
      else {
        await this.setToggleFilter(this.filteredGroup)
        await this.getAllUsersEvents('')
        await this.FilterByToggle('all')
      }
    },
  },
  created() {
    this.changeFilter()
  }
}
</script>

<style scoped>
</style>
