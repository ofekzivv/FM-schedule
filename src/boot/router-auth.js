import {LocalStorage} from "quasar";


export default ({router}) => {
  router.beforeEach((to, from, next) => {
    debugger
    let companyName = LocalStorage.getItem('companyName')
    let loggedIn = LocalStorage.getItem('loggedIn')
    let admin = LocalStorage.getItem('admin')
    if (!loggedIn && to.path !== '/auth') {
      return next('/auth');
    }
    if (!admin && loggedIn && (to.path === '/admin' || to.path === '/MonthView' || to.path === '/searchEvents' || to.path === '/DayView' || to.path === '/WeekView' || to.path === '/AllView')) {
      return next(`/${companyName}`);
    }

    if (admin && loggedIn && to.path === '/')
    {
      return next('/admin');
    }
    next();
  });
}
