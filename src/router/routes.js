
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/:companyName', component: () => import('pages/CalendarByMonth.vue') },
      { path: '/auth', component: () => import('pages/Auth.vue') },
      { path: '/searchEvents', component: ()=> import('pages/SearchResults.vue')},
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
