import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import contractMgt from './modules/contract-mgt'
import workOrderMgt from './modules/work-order-mgt'
import projectMgt from './modules/project-mgt'
import inspectMgt from './modules/inspect-mgt'
import permission from './modules/permission'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        inspectMgt,
        projectMgt,
        contractMgt,
        workOrderMgt,
        app,
        user,
        permission
    },
    getters
})

export default store
