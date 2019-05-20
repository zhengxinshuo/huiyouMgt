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
                <p class="tip"><span class="el-icon-warning"></span>提示：本页面所填写内容为合同中所购买的硬件设备清单</p>
                <el-row class="form-row">
                    <el-col :span="12">
                        <el-form-item prop="name" label="保质期限">
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-table
                        :data="tableData"
                        class="table"
                        border
                    >
                        <el-table-column prop="contractName" label="设备名称"></el-table-column>
                        <el-table-column prop="contractClassify" label="设备类型"></el-table-column>
                        <el-table-column prop="unitName" label="设备型号"></el-table-column>
                        <el-table-column prop="time" label="数量"></el-table-column>
                        <el-table-column prop="contractState" label="品牌"></el-table-column>
                        <el-table-column prop="contractState" label="配置和主要性能"></el-table-column>
                        <el-table-column prop="contractState" label="质保期限（月）"></el-table-column>
                    </el-table>
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
            ],
            loading: false,
        }
    },
    methods: {
        init() {
        }
    }

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
