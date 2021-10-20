
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'DayView', component: () => import('pages/CalendarByDay.vue') },
      { path: 'WeekView', component: () => import('pages/CalendarByWeek.vue') },
      { path: 'MonthView', component: () => import('pages/CalendarByMonth.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
