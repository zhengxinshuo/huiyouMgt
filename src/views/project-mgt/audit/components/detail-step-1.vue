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
                    <el-col :span="12">
                        <el-form-item prop="name" label="项目名称">
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="id" label="项目代号">
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="12">
                        <el-form-item label="关联合同">
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="乙方单位">
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="12">
                        <el-form-item label="项目阶段">
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="项目类型">
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="24">
                        <el-form-item label="紧急程度">
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="24">
                        <el-form-item label="项目简介">
                        </el-form-item>
                    </el-col>
                </el-row>
            </form-box>
            <form-box detail>
                <template slot="title">其他</template>
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
                        <el-form-item label="附件">
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
            submitLoading: false,
        }
    },
    computed: {},
    methods: {
        init() {
            const me = this
        },
    }


}
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
</style>
