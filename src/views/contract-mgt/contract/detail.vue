<template>
    <div class="contract-add page-add">
        <div class="layout-box">
            <el-row>
                <el-col :span="18">
                    <el-tabs v-model="tabActive">
                        <el-tab-pane label="基本信息" name="1"></el-tab-pane>
                        <el-tab-pane label="硬件设备" name="2"></el-tab-pane>
                        <el-tab-pane label="软件系统" name="3"></el-tab-pane>
                        <el-tab-pane label="维保清单" name="4"></el-tab-pane>
                        <el-tab-pane label="技术服务" name="5"></el-tab-pane>
                    </el-tabs>
                </el-col>
                <el-col :span="6" style="text-align: right">
                    <div class="btn-box">
                        <el-button size="small" @click="$router.go(-1)">返回</el-button>
                        <el-button
                            size="small"
                            type="primary"
                            @click="edit">
                            修改
                        </el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="layout-box">
            <detail-step-1 v-show="tabActive==='1'" ref="step1" :data="{}"></detail-step-1>
            <detail-step-2 v-show="tabActive==='2'" ref="step2" :data="{}"></detail-step-2>
            <detail-step-3 v-show="tabActive==='3'" ref="step3" :data="{}"></detail-step-3>
            <detail-step-4 v-show="tabActive==='4'" ref="step4" :data="{}"></detail-step-4>
            <detail-step-5 v-show="tabActive==='5'" ref="step5" :data="{}"></detail-step-5>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import DetailStep1 from '../components/detail-step-1'
import DetailStep2 from '../components/detail-step-2'
import DetailStep3 from '../components/detail-step-3'
import DetailStep4 from '../components/detail-step-4'
import DetailStep5 from '../components/detail-step-5'

export default {
    name: 'EditActivity',
    components: {DetailStep1, DetailStep2, DetailStep3, DetailStep4, DetailStep5},
    data() {
        return {
            tabActive: '1',
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
        const me = this
        me.init()
    },
    beforeDestroy() {
    },
    methods: {
        edit() {
            this.$router.push({
                name: 'ContractAdd',
                query: {
                    type: 1,
                    id: 2
                }
            })
        },
        init() {
        }
    },
}
</script>
<style lang="scss">
    @import "../../../styles/variables";
    @import "../../../styles/mixin";
    
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
    }
</style>
