import Layout from '@/views/layout'

export default {
    path: '/project-mgt',
    component: Layout,
    redirect: '/project-mgt/project-audit-list',
    name: 'ProjectMgt',
    meta: { title: '项目管理', icon: 'activity-mgt' },
    children: [
        {
            path: 'project-audit-list',
            name: 'ProjectAuditList',
            component: () => import('@/views/project-mgt/project-audit-list'),
            meta: { title: '立项审批' }
        },
        {
            path: 'project-list',
            name: 'ProjectList',
            component: () => import('@/views/project-mgt/project-list'),
            meta: { title: '项目列表' }
        },
        {
            path: 'project-detail',
            name: 'ProjectDetail',
            hidden: true,
            component: () => import('@/views/project-mgt/project-detail'),
            meta: {
                title: '项目详情',
                insertRoute: {
                    name: 'ProjectList',
                    path: '/project-mgt/project-list',
                    meta: {title: '所有项目'}
                }
            }
        },
        {
            path: 'project-add',
            name: 'ProjectAdd',
            component: () => import('@/views/project-mgt/project-add'),
            hidden: true,
            meta: {
                title: '新建项目',
                insertRoute: {
                    name: 'ProjectList',
                    path: '/project-mgt/project-list',
                    meta: {title: '所有项目'}
                }
            }
        },
        {
            path: 'project-draft-list',
            name: 'ProjectDraftList',
            component: () => import('@/views/project-mgt/project-draft-list'),
            meta: { title: '草稿箱' }
        },
    ]
}
