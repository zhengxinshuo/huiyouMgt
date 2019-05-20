<template>
    <div class="page-container">
        <div class="layout-box">
            <el-form
                ref="form"
                :inline="true"
                :model="form"
                label-position="left"
                class="form"
                size="small"
                label-width="100px"
            >
                <el-form-item label="需求名称" prop="name">
                    <el-input placeholder="请输入需求名称"></el-input>
                </el-form-item>
                <el-form-item label="改进系统" prop="value">
                    <el-select v-model="form.value" placeholder="请选择" clearable>
                        <el-option label="全部" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="紧急程度" prop="value">
                    <el-select v-model="form.value" placeholder="请选择" clearable>
                        <el-option label="全部" value="1"></el-option>
                        <el-option label="一般" value="2"></el-option>
                        <el-option label="加急" value="3"></el-option>
                        <el-option label="紧急" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="需求工作量" prop="value">
                    <el-select v-model="form.value" placeholder="请选择" clearable>
                        <el-option label="全部" value="1"></el-option>
                        <el-option label="小" value="2"></el-option>
                        <el-option label="中" value="3"></el-option>
                        <el-option label="大" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
            </el-form>
            <el-button
                :disabled="!tableSelection.length"
                icon="el-icon-delete"
                type="default"
                size="small"
                @click="del">
                批量删除
            </el-button>
            <el-table
                v-loading="tableLoading"
                :data="tableData"
                style="width: 100%"
                class="table"
                border
                @selection-change="onTableSelectionChange"
            >
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="contractId" label="改造系统"></el-table-column>
                <el-table-column prop="contractName" label="紧急程度"></el-table-column>
                <el-table-column prop="contractClassify" label="提交科室"></el-table-column>
                <el-table-column prop="unitName" label="使用科室"></el-table-column>
                <el-table-column prop="unitName" sortable label="提交时间"></el-table-column>
                <el-table-column prop="time" label="需求状态"></el-table-column>
                <el-table-column prop="action" label="操作" fixed="right" width="280" fix>
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="edit(scope.row)">修改</el-button>
                        <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <div class="pagination">
                <el-pagination
                    :current-page.sync="page.pageNo"
                    :page-sizes.sync="page.sizes"
                    :page-size.sync="page.pageSize"
                    :total.sync="page.totalCount"
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="onSizeChange"
                    @current-change="onCurrentChange"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import tableMixin from '@/mixin/table'

export default {
    name: 'Activity',
    components: {},
    mixins: [tableMixin],
    data() {
        return {
            tableSelection: [],
            form: {
                name: '',
                value: ''
            },
            tableData: [],
        }
    },
    watch: {},

    created() {
        const me = this
        me.init()
    },
    methods: {
        test() {
            alert(1)
        },
        edit(id) {
            this.$router.push({
                name: 'WorkOrderDemandAllAdd',
                query: {
                    type: '1',
                    id: '123'
                }
            })
        },
        add(id) {
            this.$router.push({
                name: 'WorkOrderDemandAllAdd',
                query: {
                    type: '0',
                    id: '123'
                }
            })
        },
        view(id) {
            this.$router.push({
                name: 'WorkOrderDemandAllDetail',
                query: {
                    id: '123'
                }
            })
        },
        batchImport() {
            this.$message({
                type: 'info',
                message: '功能未开放'
            })
        },
        del(data) {
            this.$confirm('是否删除该记录？', {
                confirmButtonText: '删除',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
                this.getTableData()

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
            if (formName === 'form') {
                this.validTime = []
            }
        },
        init() {
            const me = this
            me.getTableData()

        },
        getTableData() {
            const me = this
            me.tableLoading = true
            let postData = {
                ...me.form,
                pageNo: me.page.pageNo,
                pageSize: me.page.pageSize
            }

            setTimeout(() => {
                me.tableLoading = false
                me.tableData = [
                    {
                        id: '123',
                        contractName: '合同名称',
                        contractId: '123456',
                        contractClassify: '类型1',
                        contractState: '进行中',
                        time: '2018-01-21',
                        unitName: '乙方单位'
                    }
                ]
                me.page.totalCount = 100
            }, 500)

        },
        onSubmit() {
            console.log(this.form)
            this.getTableData()
        }

    },
}
</script>
<style lang="scss" scoped>
    @import "~@/styles/variables";
    @import "~@/styles/mixin";
    
    .table {
        margin-top: 20px;
    }
    
    /deep/ {
        .form {
            .el-select > .el-input {
                display: block;
            }
            .el-input {
                width: 170px;
            }
            .el-form-item__content {
                width: 170px;
            }
        }
    }
</style>
