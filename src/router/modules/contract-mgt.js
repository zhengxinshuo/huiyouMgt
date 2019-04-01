import Layout from '@/views/layout'

export default {
    path: '/contract-mgt',
    component: Layout,
    redirect: '/contract-mgt/contract-list',
    name: 'ContractMgt',
    meta: { title: '合同管理', icon: 'activity-mgt' },
    children: [
        {
            path: 'contract-list',
            name: 'ContractList',
            component: () => import('@/views/contract-mgt/contract-list'),
            meta: { title: '所有合同' }
        },
    ]
}
