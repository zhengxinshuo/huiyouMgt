<template>
    <div class="in-add page-add">
        <div class="layout-box">
            <el-row>
                <el-col :span="12">
                    <h3 class="page-title">入库登记</h3>
                </el-col>
                <el-col :span="12" style="text-align: right">
                    <div class="btn-box">
                        <el-button size="small" @click="$router.go(-1)">返回</el-button>
                        <el-button
                            size="small"
                            type="primary"
                            @click="edit"
                        >
                            修改
                        </el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="layout-box">
            <el-form
                ref="form"
                :model="form"
                label-position="left"
                class="form"
                label-width="90px"
                size="small"
            >
                <form-box detail>
                    <el-row class="form-row">
                        <el-col :span="12">
                            <el-form-item prop="value" label="耗材类型">
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="name" label="耗材名称">
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="form-row">
                        <el-col :span="12">
                            <el-form-item prop="id" label="品牌">
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :rules="{required:true,message:'请输入规格型号'}" prop="name" label="规格型号">
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="form-row">
                        <el-col :span="12">
                            <el-form-item :rules="{required:true,message:'请输入数量'}" label="数量">
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="form-row">
                        <el-col :span="24">
                            <el-form-item label="备注">
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="form-row">
                        <el-col :span="24">
                            <el-form-item label="附件">
                            </el-form-item>
                        </el-col>
                    </el-row>
                </form-box>
            </el-form>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import Sticky from '@/components/sticky'
import FormBox from '@/components/form-box'

export default {
    name: 'EditActivity',
    components: {Sticky, FormBox},
    data() {
        return {
            loading: false,
        }
    },
    computed: {},
    watch: {},
    mounted() {
        const me = this
        me.init()
    },
    methods: {
        edit() {
            this.$router.push({
                name: 'ConsumingInAdd',
                query: {
                    type: 1,
                    id: 123
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
    
    .in-add {
        
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
            display: inline-block;
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
        .table {
            margin-top: 20px;
        }
    }
</style>
