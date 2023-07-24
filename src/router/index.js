import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/LogIn',

    component: () => import('@/views/LogIn.vue'),
  },
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (![ '/', '/LogIn'].includes(to.path)) {
    next('/');
  }
  else if (!token && to.path !== '/LogIn') {
    next('/LogIn');
  } 
  else if (token && to.path === '/LogIn') {
    next('/');
  } 
  else {
    next();
  }
});

export default router
