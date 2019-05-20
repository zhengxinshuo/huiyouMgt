<template>
    <div class="page-container">
        <div style="height: 500px" class="layout-box">
            <el-form
                ref="form"
                :inline="true"
                :model="form"
                label-position="left"
                class="form"
                size="small"
            >
                <el-form-item prop="keyWord">
                    <el-input v-model="form.keyWord" size="large" class="search-input" placeholder="请输关键字">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="checkbox">
                    <el-checkbox-group
                        v-model="form.checkbox">
                        <el-checkbox v-for="(item,index) in list" :label="item" :key="index">{{ item }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form: {
                keyWord: '',
                checkbox: []
            },
            list: ['全部', '测试', '管理']
        }
    },
    methods: {
        resetForm(formName) {
            this.$refs[formName].resetFields()
        },
        onSubmit() {

        }
    }
}
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
    .form {
        width: 400px;
        margin: 80px auto;
        .search-input {
            /deep/ {
                .el-input__inner {
                    width: 300px;
                }
            }
        }
    }
</style>
