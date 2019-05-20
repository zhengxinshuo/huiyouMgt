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
            <form-box>
                <template slot="title">需求内容</template>
                <el-row class="form-row">
                    <el-col :span="12">
                        <el-form-item prop="name" label="合同名称">
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="radio" label="紧急程度">
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="12">
                        <el-form-item prop="value" label="需求类别">
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="radio" label="需求工作量">
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="12">
                        <el-form-item prop="value" label="改造系统">
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="radio" label="相关系统">
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="24">
                        <el-form-item label="需求描述">
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="24">
                        <el-form-item label="需求目的">
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="24">
                        <el-form-item label="需求来源">
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
                        <el-form-item label="附件"></el-form-item>
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
            fileList: [],
            form:{}
        }
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
