import Layout from '@/views/layout'

export default {
    path: '/home-mgt',
    component: Layout,
    redirect: '/home-mgt/index',
    name: 'HomeMgt',
    meta: { title: '主页', icon: 'home-mgt' },
    children: [
        {
            path: 'index',
            name: 'Home',
            component: () => import('@/views/home-mgt/home'),
            meta: { title: '主页' }
        },
        {
            path: 'search',
            name: 'Search',
            component: () => import('@/views/home-mgt/search'),
            meta: { title: '搜索' }
        }
    ]
}
