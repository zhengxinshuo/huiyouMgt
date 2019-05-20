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
                <template slot="title">基本条款</template>
                <el-row class="form-row">
                    <el-col :span="24">
                        <el-form-item prop="name" label="合同名称">
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="24">
                        <el-form-item prop="id" label="合同编号">
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="12">
                        <el-form-item label="乙方单位">
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="丙方单位">
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="12">
                        <el-form-item label="合同类型">
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="合同金额">
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="12">
                        <el-form-item label="合同签订日期">
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="产品交付日期">
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="12">
                        <el-form-item label="安装调试完成日期">
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="系统上线日期">
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="12">
                        <el-form-item label="计划终验日期">
                        </el-form-item>
                    </el-col>
                </el-row>
            </form-box>
            <form-box detail>
                <template slot="title">服务条款</template>
                <el-row class="form-row">
                    <el-col :span="24">
                        <el-form-item label="合同主要条款">
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="12">
                        <el-form-item label="服务响应时间">
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="故障解决时间">
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="24">
                        <el-form-item label="是否有巡视">
                        
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="24">
                        <el-form-item label="是否有驻场">
                        
                        </el-form-item>
                    </el-col>
                </el-row>
            </form-box>
            <form-box detail>
                <template slot="title">其他</template>
                <el-row class="form-row">
                    <el-col :span="24">
                        <el-form-item label="是否立项">
                        
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="24">
                        <el-form-item label="院方项目经理">
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="24">
                        <el-form-item label="乙方项目经理">
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="24">
                        <el-form-item label="乙方其他联系人">
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
                        <el-form-item label="合同发票">
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="24">
                        <el-form-item label="合同附件">
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="12">
                        <el-form-item label="创建人">
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="创建时间">
                        </el-form-item>
                    </el-col>
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
            loading: false,
        }
    },
    computed: {
        ...mapState({
            form: state => state.contractMgt.step1Data
        }),
    },
    methods: {
        init() {
            const me = this
        }
    }


}
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
    .no-label {
        /deep/ {
            .el-radio__label {
                display: none;
            }
        }
    }
</style>
