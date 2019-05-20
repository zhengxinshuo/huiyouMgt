<template>
    <div class="contract-add page-add">
        <div class="layout-box">
            <el-row>
                <el-col :span="18">
                    <step :data="stepList" :step="step"></step>
                </el-col>
                <el-col :span="6" style="text-align: right">
                    <div class="btn-box">
                        <el-button v-show="step===1" size="small" @click="$router.go(-1)">返回</el-button>
                        <el-button v-show="step>1" size="small" @click="back">上一步</el-button>
                        <el-button
                            size="small"
                            type="primary"
                            @click="$store.dispatch('workOrderMgt/saveDraft')"
                        >
                            存草稿
                        </el-button>
                        <el-button
                            v-show="step<2"
                            size="small"
                            type="primary"
                            @click="next()"
                        >
                            下一步
                        </el-button>
                        <el-button
                            v-show="step===2"
                            size="small"
                            type="primary"
                            @click="done()"
                        >
                            完成
                        </el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="layout-box">
            <step-1 v-show="step===1" ref="step1"></step-1>
            <step-2 v-show="step===2" ref="step2"></step-2>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import Sticky from '@/components/sticky'

import Step1 from '../../components/step-1'
import Step2 from '../../components/step-2'
import Step from '@/components/step'

export default {
    name: 'EditActivity',
    components: {Step,Step1, Step2},
    data() {
        return {
            stepList: ['基本信息', '审批意见'],
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
            step: state => state.contractMgt.step
        }),
    },
    watch: {},
    mounted() {
        this.init()
    },
    beforeDestroy() {
        this.$store.dispatch('contractMgt/clear')
    },
    methods: {
        next() {
            const me = this
            const step = me.step
            this.$refs[`step${step}`].next()
        },
        back() {
            const me = this
            const step = me.step
            this.$refs[`step${step}`].back()
        },
        done() {
            const me = this
            const step = me.step
            this.$refs[`step2`].done()
        },
        init() {
            if (this.$route.query.type === '0') {
                this.$route.meta.title = '新增需求'
            } else {
                this.$route.meta.title = '修改需求'
            }

        },
    },
}
</script>
<style lang="scss">
    @import "../../../../styles/variables";
    @import "../../../../styles/mixin";
    
    .contract-add {
        
        .el-input {
            width: 170px;
        }
        .el-textarea__inner {
            height: 100px;
        }
        .flex-w {
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
            margin-left: 20px;
        }
        
        .step-list {
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
        
        .table {
            margin-top: 20px;
        }
    }
</style>
