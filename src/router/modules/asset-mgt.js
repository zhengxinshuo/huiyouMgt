import Layout from '@/views/layout'

export default {
    path: '/asset-mgt',
    component: Layout,
    redirect: '/asset-mgt/hardware/list',
    name: 'AssetMgt',
    meta: {title: '资产管理', icon: 'project-mgt'},
    children: [
        {
            path: 'hardware/list',
            name: 'AssetHardwareList',
            component: () => import('@/views/asset-mgt/hardware/list'),
            meta: {title: '硬件资产'}
        },
        {
            path: 'hardware/add',
            name: 'AssetHardwareAdd',
            hidden: true,
            component: () => import('@/views/asset-mgt/hardware/add'),
            meta: {
                title: '新增',
                insertRoute: {
                    path: '/asset-mgt/hardware/list',
                    component: () => import('@/views/asset-mgt/hardware/list'),
                    meta: {
                        title: '硬件资产'
                    }
                }
            }
        },
        {
            path: 'hardware/detail',
            name: 'AssetHardwareDetail',
            hidden: true,
            component: () => import('@/views/asset-mgt/hardware/detail'),
            meta: {
                title: '详情',
                insertRoute: {
                    path: '/asset-mgt/hardware/list',
                    component: () => import('@/views/asset-mgt/hardware/list'),
                    meta: {
                        title: '硬件资产'
                    }
                }
            }
        },
        {
            path: 'software/list',
            name: 'AssetSoftwareList',
            component: () => import('@/views/asset-mgt/software/list'),
            meta: {title: '软件资产',}
        },
        {
            path: 'software/add',
            name: 'AssetSoftwareAdd',
            hidden: true,
            component: () => import('@/views/asset-mgt/software/add'),
            meta: {
                title: '新增',
                insertRoute: {
                    path: '/asset-mgt/software/list',
                    component: () => import('@/views/asset-mgt/software/list'),
                    meta: {
                        title: '软件资产'
                    }
                }
            }
        },
        {
            path: 'software/detail',
            name: 'AssetSoftwareDetail',
            hidden: true,
            component: () => import('@/views/asset-mgt/software/detail'),
            meta: {
                title: '详情',
                insertRoute: {
                    path: '/asset-mgt/software/list',
                    component: () => import('@/views/asset-mgt/software/list'),
                    meta: {
                        title: '软件资产'
                    }
                }
            }
        },
        {
            path: 'bin/list',
            name: 'AssetBinList',
            component: () => import('@/views/asset-mgt/bin/list'),
            meta: {
                title: '回收站',
            }
        },
    ]
}
