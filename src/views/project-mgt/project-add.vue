<template>
    <div class="project-add">
        <div class="page-add">
            <sticky>
                <step :data="stepList" :step="step"></step>
            </sticky>
            <step-1 v-show="step===1"></step-1>
            <step-2 v-show="step===2"></step-2>
            <step-3 v-show="step===3"></step-3>
            <step-4 v-show="step===4"></step-4>
            <step-5 v-show="step===5"></step-5>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import Sticky from '@/components/sticky'
import FormBox from './components/form-box'
import Step1 from './components/step-1'
import Step2 from './components/step-2'
import Step3 from './components/step-3'
import Step4 from './components/step-4'
import Step5 from './components/step-5'
import Step from '@/components/step'

export default {
    name: 'EditActivity',
    components: {Step, Sticky, FormBox, Step1, Step2, Step3, Step4, Step5},
    data() {
        return {
            stepList: ['基本信息', '项目范围', '项目计划'],
            pageType: '1',
            activityId: '',
            loading: false,
            submitLoading: false,
            form: {
                name: '',
                id: '',
                value: '',
                time: '',
                radio: ''
            },
            fileList: [],
            dialogImageUrl: '',
            dialogVisible: false,
            dialogPicturePreview: false
        }
    },
    computed: {
        ...mapState({
            step: state => state.projectMgt.step
        }),
    },
    watch: {
        'validTime'(val) {
            if (val) {
                this.form.startTime = val[0] ? val[0].toJSON() : ''
                this.form.endTime = val[1] ? val[1].toJSON() : ''
            } else {
                this.form.startTime = ''
                this.form.endTime = ''
            }
            this.$refs.form.validateField('startTime')
        }
    },
    mounted() {
        const me = this
        const pageType = this.pageType = this.$route.params.type
        this.activityId = this.$route.params.id || ''
        if (pageType === '1') {
            //新增
            //this.$route.meta.title = '创建活动'
        } else {
            //编辑
            //this.$route.meta.title = '编辑活动'
        }
        me.init()
    },
    methods: {
        init() {
        }
    },
}
</script>
<style lang="scss">
    @import "../../styles/variables";
    @import "../../styles/mixin";
    
    .project-add {
        
        .el-input {
            width: 170px;
        }
        .el-textarea__inner {
            height: 100px;
        }
        .short {
            width: 100%;
            .el-input {
                width: 100%;
            }
            .el-input__inner {
                width: 100%;
            }
        }
        .form-tip {
            color: #999;
            margin-left: 10px;
        }
        
        .step-list {
            padding: 20px 0;
            @include flex(flex-start, center);
            .step {
                position: relative;
                width: 108px;
                padding-left: 15px;
                height: 35px;
                border-radius: 3px;
                @include flex(center, center);
                background: #ECEFF4;
                color: #999;
                font-size: 14px;
                & + .step {
                    margin-left: 20px;
                }
                &:after {
                    transform: translateY(-50%);
                    width: 0;
                    height: 0;
                    border-left: 17.5px solid #ECEFF4;
                    border-top: 17.5px solid transparent;
                    border-bottom: 17.5px solid transparent;
                    display: block;
                    content: '';
                    position: absolute;
                    top: 50%;
                    right: -16.5px;
                    z-index: 2;
                }
                &:nth-child(n+2) {
                    &:before {
                        transform: translateY(-50%);
                        width: 0;
                        height: 0;
                        border-left: 17.5px solid white;
                        border-top: 17.5px solid transparent;
                        border-bottom: 17.5px solid transparent;
                        display: block;
                        content: '';
                        position: absolute;
                        top: 50%;
                        left: 0;
                        z-index: 1;
                    }
                }
                &.active {
                    background: linear-gradient(to right, #64CCFF, $c-primary);
                    color: white;
                    &:after {
                        border-left: 17.5px solid $c-primary;
                    }
                }
                
            }
        }
        
        .btn-box {
            margin: 30px 0;
            text-align: center;
        }
        
        .table {
            margin-top: 20px;
        }
    }
</style>
