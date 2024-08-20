export default [
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
        children: [
            {
                path: '/settings/companies',
                name: 'settings/companies',
                component: () => import('@/modules/invoices/views/companies/CompanyList.vue'),
                meta: { breadcrumb: 'Cliente' }
            },
            {
                path: '/settings/customer-invoices',
                name: 'settings/customer-invoices',
                component: () => import('@/modules/invoices/views/customer_invoices/CustomerInvoiceList.vue'),
                meta: { breadcrumb: 'Cliente' }
            },
            {
                path: '/settings/companies/create',
                name: 'settings/companies/create',
                component: () => import('@/modules/invoices/components/companies/CompanyCreate.vue'),
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
                path: '/settings/remittance-types',
                name: 'settings/remittance-types',
                component: () => import('@/modules/invoices/views/remittance_types/RemittanceTypeList.vue'),
                meta: { breadcrumb: 'Tipos de Remesas' }
            },
            {
                path: '/settings/services',
                name: 'settings/services',
                component: () => import('@/modules/invoices/views/services/ServiceList.vue'),
                meta: { breadcrumb: 'Servicios' }
            },

        ]
    },
];