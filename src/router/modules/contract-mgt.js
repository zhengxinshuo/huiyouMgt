import Layout from '@/views/layout'

export default {
    path: '/contract-mgt',
    component: Layout,
    redirect: '/contract-mgt/contract/list',
    name: 'ContractMgt',
    meta: { title: '合同管理', icon: 'contract-mgt' },
    children: [
        {
            path: 'contract/list',
            component: () => import('@/views/contract-mgt/contract/list'), // Parent router-view
            name: 'ContractList',
            meta: { title: '所有合同',}
        },
        {
            path: 'contract/detail',
            name: 'ContractDetail',
            hidden: true,
            component: () => import('@/views/contract-mgt/contract/detail'),
            meta: {
                title: '合同详情',
                insertRoute: {
                    name: 'ContractList',
                    path: '/contract-mgt/contract/list',
                    meta: { title: '所有合同' }
                }
            }
        },
        {
            path: 'contract/add',
            name: 'ContractAdd',
            component: () => import('@/views/contract-mgt/contract/add'),
            hidden: true,
            meta: {
                title: '新建合同',
                insertRoute: {
                    name: 'ContractList',
                    path: '/contract-mgt/contract/list',
                    meta: { title: '所有合同' }
                }
            }
        },



        {
            path: 'draft/list',
            name: 'ContractDraftList',
            component: () => import('@/views/contract-mgt/draft/list'),
            meta: { title: '草稿箱' }
        },
        {
            path: 'audit/list',
            name: 'ContractAuditList',
            component: () => import('@/views/contract-mgt/audit/list'),
            meta: { title: '待审核' }
        },
    ]
}
