import { Message, MessageBox } from 'element-ui'
export default {
    namespaced: true,
    state: {
        step1Data: {
            name: '',
            id: '',
            value: '',
            unitName: '',
            time: '',
            radio: ''
        },
        step2Data: {
            name: '',
            id: '',
            value: '',
            time: '',
            radio: ''
        },
        step: 1
    },

    mutations: {
        next: (state, val) => {
            state.step = val
        },
        addDone: (state) => {
            state.step = 1
        }
    },

    actions: {
        // 登录
        saveDraft({commit}) {
            Message({ message: '保存成功', type: 'success' })
        },
        // init
        clear({commit,state}){
            state.step=1
            state.step1Data = {
                name: '',
                id: '',
                value: '',
                unitName: '',
                time: '',
                radio: ''
            }
            state.step2Data = {
                name: '',
                id: '',
                value: '',
                unitName: '',
                time: '',
                radio: ''
            }
        }
    }
}
