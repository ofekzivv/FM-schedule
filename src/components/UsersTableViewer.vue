<template>
  <div class="q-pa-md">
    <q-table
      flat
      :dense="$q.screen.lt.md"
      :data="data"
      :columns="columns"
      row-key="name"
      style="border: 1px solid #E6E6E6; border-radius: 30px"
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
          <q-th class="bg-primary text-white" style="font-size: 1em; font-weight: bold">לוגו</q-th>
          <q-th class="bg-primary text-white" style="font-size: 1em; font-weight: bold">צבע</q-th>
          <q-th class="bg-primary text-white" style="font-size: 1em; font-weight: bold">עריכה / מחיקה</q-th>
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
            <img :src="props.row.logo" alt="לוגו חברה" width="80px"/>
          </q-td>
          <q-td>
            <q-icon name="circle" :style="{color: props.row.color}" size="md">
              <q-tooltip>
                {{ props.row.color }}
              </q-tooltip>
            </q-icon>
          </q-td>
          <q-td>
            <q-btn @click="editUser(props.row.companyName, props.row.email, props.row.logo, props.row.color)" color="primary" icon="edit" dense push
                   class="q-ma-xs q-pa-xs"></q-btn>
            <q-btn @click="deleteUserButton(props.row.companyName)" color="red" icon="delete" dense
                   class="q-ma-xs q-pa-xs" push></q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-btn @click="addUser()" color="primary" icon="add" round dense push class="q-ma-lg q-pa-xs">
      <q-tooltip content-class="bg-grey-6" :offset="[10, 10]">
        הוסף משתמש חדש
      </q-tooltip>
    </q-btn>
    <q-btn @click="addAdmin()" color="blue" icon="add" round dense push class="q-ma-lg q-pa-xs">
      <q-tooltip content-class="bg-grey-6" :offset="[10, 10]">
        הוסף אדמין חדש
      </q-tooltip>
    </q-btn>
  </div>
</template>

<script>
import EditUser from "components/EditUser";
import AddNewUser from "components/AddNewUser";

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
          sortable: true,
          classes: 'bg-grey-2 ellipsis',
          style: 'max-width: 100px;',
          headerClasses: 'bg-primary text-white',
          headerStyle: 'font-size: 1em; font-weight: bold'
        },
        {
          name: 'email',
          align: 'center',
          label: 'אימייל',
          field: 'email',
          sortable: true,
          headerClasses: 'bg-primary text-white',
          headerStyle: 'font-size: 1em; font-weight: bold'
        },
        {
          name: 'password',
          align: 'center',
          label: 'סיסמא',
          field: 'password',
          sortable: true,
          headerClasses: 'bg-primary text-white',
          headerStyle: 'font-size: 1em; font-weight: bold'
        },
      ],
      data: []
    }
  },
  components: {
    EditUser, AddNewUser
  },
  computed: {
    ...mapState('users', ["users"])
  },
  methods: {
    ...mapActions('users', ['getUser', 'getUsers', 'deleteUser']),
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

    editUser(companyName, email, logo, color) {
      this.$q.dialog({
        component: EditUser,
        parent: this,
        companyName,
        email,
        logo,
        color


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
    },

    addUser() {
      this.$q.dialog({
        component: AddNewUser,
        parent: this,

        // ...more.props...
      }).onOk(() => {
        this.$q.loading.show()
        this.getUsers().then((users) => {
          this.data = users
          this.$q.loading.hide()
        }).catch(err => console.log(err))
      }).onCancel(() => {
        console.log('Cancel')
      }).onDismiss(() => {
        console.log('Called on OK or Cancel')
      })
    },
    addAdmin() {
      this.$q.dialog({
        component: AddNewAdmin,
        parent: this,

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
import AddNewAdmin from "components/AddNewAdmin";
</script>

<style scoped>

</style>
