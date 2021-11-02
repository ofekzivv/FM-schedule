<template>
  <div class="q-pa-md q-gutter-md my-font table">
    <h5 class="big__title">כל האירועים</h5>
    <q-table
      flat
      :pagination="initialPagination"
      :dense="$q.screen.lt.md"
      :data="events"
      :columns="columns"
      row-key="name"
      style="border: 1px solid #E6E6E6; border-radius: 30px"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            class="bg-primary text-white"
            :key="col.name"
            style="font-size: 1em; font-weight: bold"
            :props="props"
          >
            {{ col.label }}
          </q-th>
          <q-th class="bg-primary text-white" style="font-size: 1em; font-weight: bold">מדיה</q-th>
        </q-tr>
      </template>


      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td
            :style="{background : props.row.bgcolor}"
            :class="{ 'text-bold text-white' : col.label === 'שם חברה' , 'bg-white' : col.label !== 'שם חברה'}"
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            class="table__body"
            @click="openDialog(col)"
          >
            {{ col.value }}
          </q-td>
          <q-td class="media__td">
            <q-btn unelevated dense v-if="props.row.eventType !== 'פוסט'" color="grey-5" @click="mediaViewer(props.row.files, props.row.eventType)">לחץ למדיה</q-btn>
            <p v-else class="text-grey-5"> אין מדיה </p>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <p class="small__title"> *לחץ על תא מסוים על מנת לראות את הפרטים המלאים שלו </p>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import mediaViewer from "components/mediaViewer";

export default {
  computed: {
    ...mapState('events', ['userEvents', 'usersEvents'])
  },
  name: "AllView",
  props: ['company'],
  components: {
    mediaViewer
  },
  data() {
    return {
      openMore: false,
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        rowsPerPage: 20
      },
      columns: [
        {name: 'companyName', align: 'center', label: 'שם חברה', field: 'companyName', sortable: true},
        {name: 'date', align: 'center', label: 'תאריך', field: 'date', sortable: true},
        {name: 'title', required: true, label: 'אירוע', align: 'center', field: 'title', sortable: true},
        {name: 'platformType', align: 'center', label: 'פלטפורמה', field: 'platformType', sortable: true},
        {name: 'eventType', align: 'center', label: 'סוג אירוע', field: 'eventType', sortable: true},
        {name: 'details', align: 'center', label: 'פרטים', field: 'details', sortable: true},
      ],
      events: []
    }
  },
  methods: {
    ...mapActions('events', ['getAllUsersEvents', 'getAllUserEvents', 'getUserColor']),
    async getEvents() {
      if (!this.$route.params.companyName) {
        this.events = await this.getAllUsersEvents('')
      } else {
        this.events = await this.getAllUserEvents(this.$route.params.companyName)
      }
    },

    mediaViewer(files, eventType) {
      this.$q.dialog({
        component: mediaViewer,

        // optional if you want to have access to
        // Router, Vuex store, and so on, in your
        // custom component:
        parent: this,
        files,
        eventType
        // ...more.props...
      }).onOk(() => {
        console.log('OK')
      }).onCancel(() => {
        console.log('Cancel')
      }).onDismiss(() => {
        console.log('Called on OK or Cancel')
      })
    },

    openDialog(col) {
      this.$q.dialog({
        class: 'dialog my-font',
        title: `${col.label}`,
        message: `${col.value}`
      }).onOk(() => {
        // console.log('OK')
      }).onCancel(() => {
        // console.log('Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }
  },
  created() {
    this.getEvents()
    console.log(this.usersEvents)
  }
}
</script>

<style>

.table {
  max-width: 1000px;
  margin: 0 auto;
}

.big__title {
  font-weight: bold;
  text-align: center;
  color: var(--q-color-primary);
}


.table__body {
  max-width: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.company__color {
  max-width: 10px;
  margin: 0 auto;
}

.dialog {
  max-width: 700px;
  overflow: hidden;
  word-break: break-word;
}

.media__td {
  position: relative;
  justify-content: center;
  text-align: center;
}

.media__td p {
  font-size: 0.8em;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.media__td .q-btn {
  font-size: 0.8em;
  padding: 0 1em;
}

</style>
