import Layout from '@/views/layout'

export default {
    path: '/supplier-mgt',
    component: Layout,
    redirect: '/supplier-mgt/supplier/list',
    name: 'SupplierMgt',
    meta: {title: '供应商管理', icon: 'supplier-mgt'},
    children: [
        {
            path: 'supplier/list',
            component: () => import('@/views/supplier-mgt/supplier/list'),
            name: 'SupplierList',
            meta: { title: '供应商管理' },
        },
        {
            path: 'supplier/add',
            name: 'SupplierAdd',
            hidden: true,
            component: () => import('@/views/supplier-mgt/supplier/add'),
            meta: {
                title: '新增供应商',
                insertRoute: {
                    name: 'SupplierList',
                    path: '/supplier-mgt/supplier/list',
                    meta: { title: '供应商管理' }
                }
            }
        },
        {
            path: 'supplier/detail',
            name: 'SupplierDetail',
            hidden: true,
            component: () => import('@/views/supplier-mgt/supplier/detail'),
            meta: {
                title: '供应商详情',
                insertRoute: {
                    name: 'SupplierList',
                    path: '/supplier-mgt/supplier/list',
                    meta: { title: '供应商管理' }
                }
            }
        }
    ]
}
