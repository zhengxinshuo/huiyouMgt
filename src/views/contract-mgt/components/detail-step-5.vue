<template>
    <div>
        <el-form
            ref="form"
            :model="form"
            label-position="left"
            class="form"
            label-width="130px"
            size="small"
        >
            <form-box detail>
                <template slot="title">技术服务</template>
                <el-row class="form-row">
                    <el-col :span="12">
                        <el-form-item prop="name" label="保质期限">
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="name" label="服务开始时间">
                            123
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="技术服务">
                                22
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-row>
            </form-box>
        </el-form>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import FormBox from '@/components/form-box'

export default {
    components: {
        FormBox
    },
    data() {
        return {
            tableData: [
                {
                    contractName: '合同名称',
                    contractId: '编号1',
                    contractClassify: '类型1',
                    contractState: '进行中',
                    time: '2018-01-21',
                    unitName: '乙方单位'
                }
            ]
        }
    },
    computed: {
        ...mapState({
            form: state => state.contractMgt.step3Data
        }),
    },


}
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
    @import "~@/styles/variables";
    @import "~@/styles/mixin";
    
    .tip {
        font-size: 14px;
        color: #666;
        margin-bottom: 20px;
    }
    
    .el-icon-warning {
        margin-right: 10px;
        color: $c-danger;
    }
</style>
