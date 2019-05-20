<template>
    <div class="in-add page-add">
        <div class="layout-box">
            <el-row>
                <el-col :span="12">
                    <h3 class="page-title">出库登记</h3>
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
                label-width="130px"
                size="small"
            >
                <form-box detail>
                    <el-row class="form-row">
                        <el-col :span="12">
                            <el-form-item :rules="{required:true,message:'请选择'}" prop="value" label="领用科室">
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :rules="{required:true,message:'请选择'}" prop="name" label="领用人">
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="form-row">
                        <el-col :span="24">
                            <el-form-item prop="id" label="选取耗材">
                                <el-table
                                    :data="tableData"
                                    style="width: 100%"
                                    class="table"
                                    border
                                    @selection-change="onTableSelectionChange"
                                >
                                    <el-table-column prop="name" label="耗材名称"></el-table-column>
                                    <el-table-column prop="name" label="规格型号"></el-table-column>
                                    <el-table-column prop="name" label="可领用数量"></el-table-column>
                                    <el-table-column prop="name" label="申请数量"></el-table-column>
                                </el-table>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="form-row">
                        <el-col :span="24">
                            <el-form-item label="领用原因">
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
                    <el-row class="form-row">
                        <el-col :span="24">
                            <el-form-item :rules="{required:true,message:'请输入'}" label="审批人">
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
            tableData: [],
            loading: false,
        }
    },
    computed: {
    
    },
    watch: {},
    mounted() {
        this.init()
    },
    methods:{
        edit() {
            this.$router.push({
                name: 'ConsumingOutAdd',
                query: {
                    type: 1,
                    id: 123
                }
            })
        },
        init() {
        }
    }
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
       
    }
</style>
