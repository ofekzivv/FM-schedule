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
            <q-btn @click="editAdmin(props.row.companyName, props.row.email, props.row.password)" color="primary" icon="edit" dense push
                   class="q-ma-xs q-pa-xs"></q-btn>
            <q-btn @click="deleteAdminButton(props.row.companyName)" color="red" icon="delete" dense
                   class="q-ma-xs q-pa-xs" push></q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import EditAdmin from "components/EditAdmin";
import AddNewAdmin from "components/AddNewAdmin";
import {mapActions, mapState} from "vuex";

export default {
  data() {
    return {
      columns: [
        {
          name: 'companyName',
          required: true,
          label: 'שם אדמין',
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
    EditAdmin, AddNewAdmin
  },
  computed: {
    ...mapState('auth', ["admins"])
  },
  methods: {
    ...mapActions('auth', ['getAdmins', 'getAdmin', 'deleteAdmin']),
    deleteAdminButton(companyName) {
      this.$q.loading.show()
      this.deleteAdmin(companyName).then(() => {
        this.$q.notify({
          type: 'negative',
          message: `המשתמש נמחק.`
        })
        this.getAdmins().then(() =>
          this.data = this.admins
        ).catch(err => console.log(err))
      }).catch(err => console.log(err))
      this.$q.loading.hide()
    },

    editAdmin(companyName, email, password) {
      this.$q.dialog({
        component: EditAdmin,
        parent: this,
        companyName,
        email,
        password


        // ...more.props...
      }).onOk(() => {
        this.$q.loading.show()
        this.getAdmins().then(() => {
          this.data = this.admins
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
        this.getAdmins().then(() => {
          this.data = this.admins
          this.$q.loading.hide()
        }).catch(err => console.log(err))
      }).onCancel(() => {
        console.log('Cancel')
      }).onDismiss(() => {
        console.log('Called on OK or Cancel')
      })
    },
  },
  created() {
    this.$q.loading.show()
    this.getAdmins().then(() => {
      this.data = this.admins
      this.$q.loading.hide()
    }).catch(err => console.log(err))
  }
}

</script>

<style scoped>

</style>
