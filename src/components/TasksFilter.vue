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
      options: optionsGroups,
      filteredGroup: ['סרטון', 'תמונה', 'פוסט'],
    }
  },
  methods: {

    ...mapMutations('events', ['setToggleFilter', 'setUserEvents']),
    ...mapActions('events', ['getAllUserEvents', 'FilterByToggle', 'getAllUsersEvents']),

    /*
    * This function take the current toggle filter and set it in the state.
    * Bring all the user/users events from the DB.
    * Filter the events by the toggle filtered we set on the state.
    * there is two options of filter: filter single user events or
    * filter all the events of all the users.
    * */
    async changeFilter() {
      await this.setToggleFilter(this.filteredGroup)
      if (this.company !== "כל המשתמשים") {
        await this.getAllUserEvents(this.company)
        await this.FilterByToggle('')
      } else {
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
  flex-direction: row;
}

.toggle {
  display: flex;
}
</style>
