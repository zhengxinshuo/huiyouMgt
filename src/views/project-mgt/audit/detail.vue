<template>
    <div class="contract-add page-add">
        <div class="layout-box">
            <el-row>
                <el-col :span="18">
                    <el-tabs v-model="tabActive">
                        <el-tab-pane label="基本信息" name="1"></el-tab-pane>
                        <el-tab-pane label="项目范围" name="2"></el-tab-pane>
                        <el-tab-pane label="项目计划" name="3"></el-tab-pane>
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
            <step-1 v-show="tabActive==='1'" ref="step1" :data="{}"></step-1>
            <step-2 v-show="tabActive==='2'" ref="step2" :data="{}"></step-2>
            <step-3 v-show="tabActive==='3'" ref="step3" :data="{}"></step-3>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import Sticky from '@/components/sticky'
import FormBox from '@/components/form-box'
import Step1 from './components/detail-step-1'
import Step2 from './components/detail-step-2'
import Step3 from './components/detail-step-3'
import Step from '@/components/step'


export default {
    name: 'EditActivity',
    components: {Step, Sticky, FormBox, Step1, Step2, Step3},
    data() {
        return {
            tabActive:'1',
            stepList: ['基本信息', '项目范围', '项目计划'],
            loading: false,
        }
    },
    computed: {
        ...mapState({
            step: state => state.projectMgt.step
        }),
    },
    watch: {},
    mounted() {
        const me = this
        me.init()
    },
    beforeDestroy() {
        this.$store.dispatch('projectMgt/clear')
    },
    methods: {
        edit() {
            this.$router.push({
                name: 'ProjectAuditAdd',
                query: {
                    type: 1,
                    id: 2
                }
            })
        },
        init() {}

    },
}
</script>
<style lang="scss">
    @import "~@/styles/variables";
    @import "~@/styles/mixin";
    
    .project-add {
        
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
