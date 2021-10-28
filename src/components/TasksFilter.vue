<template>
  <div class="q-pa-lg my-font container">
    <div class="filter-group">
      <q-option-group
        class="toggle"
        v-model="filteredGroup"
        :options="options"
        type="toggle"
        color="primary"
        @input="changeFilter()"
      />
    </div>
  </div>
</template>

<script>
import {mapActions, mapState, mapMutations} from "vuex";

const optionsGroups = [
  {label: 'סרטון', value: 'סרטון'},
  {label: 'פוסט', value: 'פוסט'},
  {label: 'תמונה', value: 'תמונה'},
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
        await this.getAllUserEvents(this.company)
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

.container {
  display: flex;
  flex-direction: column;
}

.toggle {
  display: flex;
}
</style>
