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
                <el-row class="form-row">
                    <el-col :span="12">
                        <el-form-item prop="name" label="服务期限">
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-table
                        :data="tableData"
                        style="width: 100%"
                        class="table"
                        border
                    >
                        <el-table-column prop="contractName" label="系统名称"></el-table-column>
                        <el-table-column prop="contractClassify" label="设备类型"></el-table-column>
                        <el-table-column prop="contractState" label="功能模块"></el-table-column>
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
        }
    }

}
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
    @import "~@/styles/variables";
    @import "~@/styles/mixin";
</style>
