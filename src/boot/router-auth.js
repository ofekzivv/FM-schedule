
import {LocalStorage} from "quasar";


export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    debugger
    let loggedIn = LocalStorage.getItem('loggedIn')
    let admin = LocalStorage.getItem('admin')
    if (!loggedIn && to.path !== '/auth') {
      return next('/auth');
    }
if (!admin && (to.path ===(''|| '/MonthView' || '/searchEvents' || '/DayView' || '/WeekView' || '/AllView'))) {
  to.path = from.path
  next();
}
    next();
  });

}
