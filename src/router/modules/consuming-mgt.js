import Layout from '@/views/layout'

export default {
    path: '/consuming-mgt',
    component: Layout,
    redirect: '/consuming-mgt/in/list',
    name: 'ConsumingMgt',
    meta: {title: '耗材管理', icon: 'consuming-mgt'},
    children: [
        {
            path: 'in/list',
            name: 'ConsumingInList',
            component: () => import('@/views/consuming-mgt/in/list'),
            meta: {title: '入库管理'}
        },
        {
            path: 'in/add',
            name: 'ConsumingInAdd',
            hidden: true,
            component: () => import('@/views/consuming-mgt/in/add'),
            meta: {
                title: '入库登记',
                insertRoute: {
                    name: 'ConsumingInList',
                    path: '/consuming-mgt/in/list',
                    meta: { title: '入库管理' }
                }
            }
        },
        {
            path: 'in/detail',
            name: 'ConsumingInDetail',
            hidden: true,
            component: () => import('@/views/consuming-mgt/in/detail'),
            meta: {
                title: '入库详情',
                insertRoute: {
                    name: 'ConsumingInList',
                    path: '/consuming-mgt/in/list',
                    meta: { title: '入库管理' }
                }
            }
        },
        {
            path: 'out/list',
            name: 'ConsumingOutList',
            component: () => import('@/views/consuming-mgt/out/list'),
            meta: {title: '出库管理'}
        },
        {
            path: 'out/add',
            name: 'ConsumingOutAdd',
            hidden: true,
            component: () => import('@/views/consuming-mgt/out/add'),
            meta: {
                title: '出库登记',
                insertRoute: {
                    name: 'ConsumingOutList',
                    path: '/consuming-mgt/out/list',
                    meta: { title: '出库管理' }
                }
            }
        },
        {
            path: 'out/detail',
            name: 'ConsumingOutDetail',
            hidden: true,
            component: () => import('@/views/consuming-mgt/out/detail'),
            meta: {
                title: '出库详情',
                insertRoute: {
                    name: 'ConsumingOutList',
                    path: '/consuming-mgt/out/list',
                    meta: { title: '出库管理' }
                }
            }
        },

    ]
}
