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
        step3Data: {},
        step4Date: {},
        step5Date: {},
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
            state.step3Data = {
                name: '',
                id: '',
                value: '',
                unitName: '',
                time: '',
                radio: ''
            }
            state.step4Data = {
                name: '',
                id: '',
                value: '',
                unitName: '',
                time: '',
                radio: ''
            }
            state.step5Data = {
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
