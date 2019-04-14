const user = {
    state: {
        step1Data:{
            name: '',
            id: '',
            value: '',
            unitName:'',
            time: '',
            radio: ''
        },
        step2Data:{
            name: '',
            id: '',
            value: '',
            time: '',
            radio: ''
        },
        step3Data:{},
        step4Date:{},
        step5Date:{},
        step:1
    },

    mutations: {
        CONTRACT_ADD_NEXT_STEP:(state,val)=>{
            state.step = val
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        CONTRACT_ADD_DONE:(state)=>{
            state.step = 1
        }

    },

    actions: {
        // 登录
        Login({commit}, userInfo) {
        },
        // 下一步

    }
}

export default user
