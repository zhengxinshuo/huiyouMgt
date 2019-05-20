import Layout from '@/views/layout'

export default {
    path: '/project-mgt',
    component: Layout,
    redirect: '/project-mgt/audit/list',
    name: 'ProjectMgt',
    meta: { title: '项目管理', icon: 'project-mgt' },
    children: [
        {
            path: 'audit/list',
            name: 'ProjectAuditList',
            component: () => import('@/views/project-mgt/audit/list'),
            meta: { title: '立项审批' },
        },
        {
            path: 'audit/detail',
            name: 'ProjectAuditDetail',
            hidden: true,
            component: () => import('@/views/project-mgt/audit/detail'), // Parent router-view
            meta: {
                title: '项目详情',
                insertRoute: {
                    name: 'ProjectAuditList',
                    path: '/project-mgt/audit/list',
                    meta: { title: '立项审批' }
                }
            }
        },
        {
            path: 'audit/add',
            name: 'ProjectAuditAdd',
            hidden: true,
            component: () => import('@/views/project-mgt/audit/add'), // Parent router-view
            meta: {
                insertRoute: {
                    name: 'ProjectAuditList',
                    path: '/project-mgt/audit/list',
                    meta: { title: '立项审批' }
                },
                title: '新建项目',
            }
        },
        {
            path: 'project/list',
            name: 'ProjectList',
            component: () => import('@/views/project-mgt/project/list'),
            meta: { title: '项目列表' }
        },
        {
            path: 'draft/list',
            name: 'ProjectDraftList',
            component: () => import('@/views/project-mgt/draft/list'),
            meta: { title: '草稿箱' }
        },
    ]
}
