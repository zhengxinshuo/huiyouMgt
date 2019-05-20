import Layout from '@/views/layout'

export default {
    path: '/word-order-mgt',
    component: Layout,
    redirect: '/work-order-mgt/repair',
    name: 'WorkOrderMgt',
    meta: {title: '工单管理', icon: 'work-order-mgt'},
    children: [
        {
            path: 'repair',
            component: () => import('@/views/work-order-mgt/repair'),
            name: 'WorkOrderRepair',
            redirect: 'all/list',
            meta: {title: '保修工单'},
            children: [
                {
                    path: 'all/list',
                    component: () => import('@/views/work-order-mgt/repair/all/list'),
                    name: 'WorkOrderRepairAllList',
                    meta: {title: '所有工单'},
                },
                {
                    path: 'draft/list',
                    component: () => import('@/views/work-order-mgt/repair/draft/list'),
                    name: 'WorkOrderRepairDraftList',
                    meta: {title: '草稿箱'},
                },
                {
                    path: 'all/add',
                    name: 'WorkOrderRepairAllAdd',
                    hidden: true,
                    component: () => import('@/views/work-order-mgt/repair/all/add'),
                    meta: {
                        title: '新增工单',
                        insertRoute: {
                            name: 'WorkOrderRepairAllList',
                            path: '/word-order-mgt/repair/all/list',
                            meta: {title: '所有工单'}
                        }
                    }
                },
                {
                    path: 'all/detail',
                    name: 'WorkOrderRepairAllDetail',
                    hidden: true,
                    component: () => import('@/views/work-order-mgt/repair/all/detail'),
                    meta: {
                        title: '工单详情',
                        insertRoute: {
                            name: 'WorkOrderRepairAllList',
                            path: '/word-order-mgt/repair/all/list',
                            meta: {title: '所有工单'}
                        }
                    }
                }

            ]
        },
        {
            path: 'phone-record/list',
            component: () => import('@/views/work-order-mgt/phone-record/list'),
            name: 'WorkOrderPhoneRecordList',
            meta: {title: '来电记录'},
        },

        {
            path: 'demand',
            component: () => import('@/views/work-order-mgt/demand'),
            name: 'WorkOrderDemand',
            redirect: 'all/list',
            meta: {title: '软件新需求'},
            children: [
                {
                    path: 'all/list',
                    component: () => import('@/views/work-order-mgt/demand/all/list'),
                    name: 'WorkOrderDemandAllList',
                    meta: {title: '需求列表'},
                },
                {
                    path: 'draft/list',
                    component: () => import('@/views/work-order-mgt/demand/draft/list'),
                    name: 'WorkOrderDemandDraftList',
                    meta: {title: '草稿箱'},
                },
                {
                    path: 'all/add',
                    name: 'WorkOrderDemandAllAdd',
                    hidden: true,
                    component: () => import('@/views/work-order-mgt/demand/all/add'),
                    meta: {
                        title: '新增',
                        insertRoute: {
                            name: 'WorkOrderDemandAllList',
                            path: '/word-order-mgt/demand/all/list',
                            meta: {title: '需求列表'}
                        }
                    }
                },
                {
                    path: 'all/detail',
                    name: 'WorkOrderDemandAllDetail',
                    hidden: true,
                    component: () => import('@/views/work-order-mgt/demand/all/detail'),
                    meta: {
                        title: '需求详情',
                        insertRoute: {
                            name: 'WorkOrderDemandAllList',
                            path: '/word-order-mgt/demand/all/list',
                            meta: {title: '需求列表'}
                        }
                    }
                }

            ]
        }
    ]
}
