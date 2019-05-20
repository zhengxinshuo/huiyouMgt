import Layout from '@/views/layout'

export default {
    path: '/inspect-mgt',
    component: Layout,
    redirect: '/inspect-mgt/project/list',
    name: 'InspectMgt',
    meta: {title: '巡检管理', icon: 'project-mgt'},
    children: [
        {
            path: 'project/list',
            name: 'InspectProjectList',
            component: () => import('@/views/inspect-mgt/project/list'),
            meta: {title: '项目巡检'}
        },
        {
            path: 'inside',
            component: () => import('@/views/inspect-mgt/inside'),
            name: 'InspectInside',
            redirect: 'all/list',
            meta: {title: '内部巡检'},
            children: [
                {
                    path: 'all/list',
                    component: () => import('@/views/inspect-mgt/inside/all/list'),
                    name: 'InspectInsideAllList',
                    meta: {title: '所有巡检'},
                },
                {
                    path: 'draft/list',
                    component: () => import('@/views/inspect-mgt/inside/draft/list'),
                    name: 'InspectInsideDraftList',
                    meta: {title: '草稿箱'},
                },
                {
                    path: 'all/add',
                    name: 'InspectInsideAllAdd',
                    hidden: true,
                    component: () => import('@/views/inspect-mgt/inside/all/add'),
                    meta: {
                        title: '新增',
                        insertRoute: {
                            name: 'InspectInsideAllList',
                            path: '/inspect-mgt/inside/all/list',
                            meta: {title: '所有巡检'}
                        }
                    }
                },
                {
                    path: 'all/detail',
                    name: 'InspectInsideAllDetail',
                    hidden: true,
                    component: () => import('@/views/inspect-mgt/inside/all/detail'),
                    meta: {
                        title: '详情',
                        insertRoute: {
                            name: 'InspectInsideAllList',
                            path: '/inspect-mgt/inside/all/list',
                            meta: {title: '所有巡检'}
                        }
                    }
                }

            ]
        }



    ]
}
