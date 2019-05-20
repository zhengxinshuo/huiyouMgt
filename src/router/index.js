import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/index'
import ContractMgt from './modules/contract-mgt'
import HomeMgt from './modules/home-mgt'
import ProjectMgt from './modules/project-mgt'
import ConsumingMgt from './modules/consuming-mgt'
import SupplierMgt from './modules/supplier-mgt'
import WorkOrderMgt from './modules/work-order-mgt'
import AssetMgt from './modules/asset-mgt'
import InspectMgt from './modules/inspect-mgt'


// 同步路由，无需权限
export const constantRouterMap = [
    { path: '/login', component: () => import('@/views/login/index'), hidden: true },
    { path: '/404', component: () => import('@/views/404'), hidden: true },

    {
        path: '/',
        hidden:true,
        redirect: '/home-mgt/index',
    }
]

// 异步路由，需要权限
export const asyncRouterMap = [
    HomeMgt,
    ContractMgt,
    ProjectMgt,
    WorkOrderMgt,
    InspectMgt,
    ConsumingMgt,
    SupplierMgt,
    AssetMgt,
    { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})
