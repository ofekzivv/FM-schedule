const routes = [
  {
    path: '/', component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', component: () => import('pages/Index.vue')},
      {path: '/MonthView', component: () => import('pages/CalendarByMonth.vue')},
      {path: '/auth', component: () => import('pages/Auth.vue')},
      {path: '/searchEvents', component: () => import('pages/SearchResults.vue')},
      {path: '/DayView', component: () => import('pages/CalendarByDay.vue')},
      {path: '/WeekView', component: () => import('pages/CalendarByWeek.vue')},
      {path: '/AllView', component: () => import('pages/AllView.vue')},
      {
        path: '/:companyName', component: () => import('pages/UserCalendarView.vue'),
        children: [
          {path: '/MonthView', component: () => import('../components/MonthCalendar.vue')},
          {path: '/searchEvents', component: () => import('pages/SearchResults.vue')},
          {path: '/DayView', component: () => import('../components/DayCalendar.vue')},
          {path: '/WeekView', component: () => import('../components/WeekCalendar')},
          {path: '/AllView', component: () => import('pages/AllView.vue')},
        ]
      },

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
