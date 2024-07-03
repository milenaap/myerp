import { createRouter, createWebHistory } from 'vue-router';
import { useAuthenticationStore } from '@/stores/auth/authentication';
import { storeToRefs } from 'pinia';



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



  /** Rutas protegidas */
  {
    path: '/',
    name: 'main',
    component: () => import('@/components/template/private/Main.vue'),
    redirect: '/dashboard',
    //meta: { requiresAuth: true },
    beforeEnter: requireAuth,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/modules/auth/views/dashboard/Dashboard.vue'),
        meta: { breadcrumb: 'Inicio' }
      },
      {
        path: '/ims-invoice-headers',
        name: 'ims-invoice-headers',
        component: () => import('@/modules/invoices/views/ims_invoice_headers/ImsInvoiceHeaderList.vue'),
        meta: { breadcrumb: 'Inicio' }
      },
      {
        path: '/customer-devices',
        name: 'customer-devices',
        component: () => import('@/modules/invoices/views/customer_devices/CustomerDeviceList.vue'),
        meta: { breadcrumb: 'Inicio' }
      },
      {
        path: '/invoices',
        name: 'invoices',
        component: () => import('@/modules/invoices/views/invoice_headers/InvoiceHeaderList.vue'),
        meta: { breadcrumb: 'Facturas' }
      },

      {
        path: '/settings',
        name: 'settings',
        component: () => import('@/modules/invoices/views/settings/Main.vue'),
        meta: { breadcrumb: 'Configuracion' },
        children:[
          {
            path: '/settings/companies',
            name: 'settings/companies',
            component: () => import('@/modules/invoices/views/companies/CompanyList.vue'),
            meta: { breadcrumb: 'Cliente' }
          },
          {
            path: '/settings/products',
            name: 'settings/products',
            component: () => import('@/modules/invoices/views/products/ProductList.vue'),
            meta: { breadcrumb: 'Productos' }
          },
          {
            path: '/settings/invoice-counters',
            name: 'settings/invoice-counters',
            component: () => import('@/modules/invoices/views/invoice_counters/InvoiceCounterList.vue'),
            meta: { breadcrumb: 'Contador' }
          },
          {
            path: '/settings/providers',
            name: 'settings/providers',
            component: () => import('@/modules/invoices/views/providers/ProviderList.vue'),
            meta: { breadcrumb: 'Proveedores' }
          },
          {
            path: '/settings/services',
            name: 'settings/services',
            component: () => import('@/modules/invoices/views/services/ServiceList.vue'),
            meta: { breadcrumb: 'Servicios' }
          },
          
        ]
      },


      
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
