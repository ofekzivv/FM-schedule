<template>
  <div class="q-pa-md">
    <q-table
        title="רשימת משתמשים"
        :dense="$q.screen.lt.md"
        :data="data"
        :columns="columns"
        row-key="name"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
          >
            {{ col.label }}
          </q-th>
          <q-th>עריכה / מחיקה</q-th>
        </q-tr>
      </template>


      <template v-slot:body="props">
        <q-tr :props="props">

          <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
          >
            {{ col.value }}
          </q-td>
          <q-td>
            <q-btn @click="editUser(props.row.companyName, props.row.email)" color="primary" icon="edit" dense class="q-ma-xs">ערוך משתמש</q-btn>
            <q-btn @click="deleteUserButton(props.row.companyName)" color="red" icon="delete" dense class="q-ma-xs">מחק משתמש</q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import EditUser from "components/EditUser";
export default {
  data() {
    return {
      columns: [
        {
          name: 'companyName',
          required: true,
          label: 'שם חברה',
          align: 'center',
          field: row => row.companyName,
          format: val => `${val}`,
          sortable: true
        },
        {name: 'email', align: 'center', label: 'אימייל', field: 'email', sortable: true},
      ],
      data: []
    }
  },
  components: {
    EditUser
  },
  computed: {
    ...mapState('users', ["users"])
  },
  methods: {
    ...mapActions('users', ['getUsers', 'deleteUser']),
    deleteUserButton(companyName) {
      this.$q.loading.show()
      this.deleteUser(companyName).then(() => {
        this.$q.notify({
          type: 'negative',
          message: `המשתמש נמחק.`
        })
        this.getUsers().then(() =>
            this.data = this.users
        ).catch(err => console.log(err))
      }).catch(err => console.log(err))
      this.$q.loading.hide()
    },

    editUser(companyName, email) {
      this.$q.dialog({
        component: EditUser,
        parent: this,
        companyName: companyName,
        email: email

        // ...more.props...
      }).onOk(() => {
        this.$q.loading.show()
        this.getUsers().then(() => {
          this.data = this.users
          this.$q.loading.hide()
        }).catch(err => console.log(err))
      }).onCancel(() => {
        console.log('Cancel')
      }).onDismiss(() => {
        console.log('Called on OK or Cancel')
      })
    }
  },
  created() {
    this.$q.loading.show()
    this.getUsers().then(() => {
      this.data = this.users
      this.$q.loading.hide()
    }).catch(err => console.log(err))
  }
}

import {mapActions, mapState} from "vuex";
import EventAdder from "components/EventAdder";
</script>

<style scoped>

</style>
