import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './quasar'

import firebaseInstance from './middleware/firebase'

Vue.config.productionTip = false

firebaseInstance.firebase.auth().onAuthStateChanged((user) => {
  window.user = user;
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
