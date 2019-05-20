<template>
    <div class="hardware-add page-add">
        <div class="layout-box">
            <el-row>
                <el-col :span="20" class="tip">
                    <el-row>
                        <el-col :span="1" style="text-align: right">
                            <span class="el-icon-warning" style="margin-right:10px"></span>
                        </el-col>
                        <el-col :span="23">
                            本页面所录入的资产为通过捐赠调拨等方式获取的资产以及验收的合同/项目资产，
                            若需录入进行中的合同/项目资产，请到合同/项目-设备到货页录入。
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="4" style="text-align: right">
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
                label-position="left"
                class="form"
                label-width="100px"
                size="small"
            >
                <form-box detail>
                    <template slot="title">
                        基本信息
                    </template>
                    <el-row class="form-row">
                        <el-col :span="12">
                            <el-form-item prop="name" label="资产名称">
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="id" label="原院方编号">
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="form-row">
                        <el-col :span="12">
                            <el-form-item prop="value" label="资产类型">
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="name" label="品牌">
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="form-row">
                        <el-col :span="12">
                            <el-form-item prop="id" label="规格型号">
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="id" label="序列号">
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="form-row">
                        <el-col :span="12">
                            <el-form-item label="版本号">
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="ip地址">
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="form-row">
                        <el-col :span="20">
                            <el-form-item label="license">
                            </el-form-item>
                        </el-col>
                    </el-row>
                </form-box>
                <form-box detail>
                    <template slot="title">合同及供应商</template>
                    <el-row class="form-row">
                        <el-col :span="12">
                            <el-form-item label="取得方式">
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="合同名称">
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="form-row">
                        <el-col :span="12">
                            <el-form-item label="项目名称">
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="供应商名称">
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="form-row">
                        <el-col :span="12">
                            <el-form-item label="服务商名称">
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="到货签收时间">
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="form-row">
                        <el-col :span="12">
                            <el-form-item label="质保期限">
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="质保开始时间">
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="form-row">
                        <el-col :span="12">
                            <el-form-item label="质保结束时间">
                            </el-form-item>
                        </el-col>
                    </el-row>
                </form-box>
                <form-box detail>
                    <template slot="title">其他信息</template>
                    <el-row class="form-row">
                        <el-col :span="12">
                            <el-form-item label="资产状态" prop="value">
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="存放地点" prop="value">
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="form-row">
                        <el-col :span="12">
                            <el-form-item label="是否有配件">
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="主件">
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="form-row">
                        <el-col :span="20">
                            <el-form-item label="备注">
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="form-row">
                        <el-col :span="20">
                            <el-form-item label="合同附件">
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
        return {}
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
    methods: {
        init() {
        },
        edit() {
            this.$router.push({
                name: 'AssetHardwareAdd',
                query: {
                    type: '1',
                    id: 123
                }
            })
        }
    }
}
</script>
<style lang="scss">
    @import "../../../styles/variables";
    @import "../../../styles/mixin";
    
    .hardware-add {
        
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
        .tip {
            color: #666;
            font-size: 14px;
            line-height: 1.5;
        }
        .table {
            margin-top: 20px;
        }
    }
</style>
