import { createRouter, createWebHistory } from 'vue-router';
import { useAuthenticationStore } from '@/stores/auth/authentication';
import { storeToRefs } from 'pinia';

// Invoices
import InvoiceRoutes from '../modules/invoices/router';



/**
 * Required Auth 
 */
const requireAuth = async(to, from, next) => {

  document.title = `${to.name} - ${import.meta.env.VITE_APP_TITLE}`;
  if(!localStorage.getItem('locale')){
    localStorage.setItem('locale', 'ES');
  }

  const authStore = useAuthenticationStore();
  const { currentUser } = authStore;
  const { user } = storeToRefs(authStore); 

  await currentUser();

  if(!user.value){
    next({name: "login" });
  }else{
    next();
  }

}






const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/modules/auth/views/login/Login.vue')
  },
  {
    path: '/prueba',
    name: 'prueba',
    component: () => import('@/views/Prueba.vue')
  },
  {
    path: '/prueba2',
    name: 'prueba2',
    component: () => import('@/views/Prueba2.vue')
  },



  /** Rutas protegidas */
  {
    path: '/',
    name: 'main',
    component: () => import('@/components/template/private/Main.vue'),
    redirect: '/dashboard',
    //meta: { requiresAuth: true },
    beforeEnter: requireAuth,
    children: [
      ...InvoiceRoutes,
    ]
  },

  // Not found
  { 
    path: '/:path(.*)', 
    name: "NotFound",
    component: () => import('@/modules/auth/views/sessions/404.vue'), 
  },
];



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
