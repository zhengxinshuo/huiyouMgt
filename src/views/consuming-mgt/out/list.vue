<template>
    <div class="page-container">
        <el-tabs v-model="form.step" type="border-card">
            <el-tab-pane name="1" label="审批中"></el-tab-pane>
            <el-tab-pane name="2" label="已通过"></el-tab-pane>
            <el-tab-pane name="3" label="已拒绝"></el-tab-pane>
            <el-form
                ref="form"
                :inline="true"
                :model="form"
                label-position="left"
                class="form"
                size="small"
                label-width="100px"
            >
                <el-form-item label="领用科室" prop="projectName">
                    <el-select v-model="form.projectState" filterable>
                        <el-option label="全部" value="全部"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="领用人" prop="unitName">
                    <el-select v-model="form.projectState" filterable>
                        <el-option label="全部" value="全部"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
            </el-form>
            <el-button type="primary" size="small" @click="add">申请</el-button>
            <el-table
                v-loading="tableLoading"
                :data="tableData"
                style="width: 100%"
                class="table"
                border
                @selection-change="onTableSelectionChange"
            >
                <el-table-column prop="contractId" label="领用科室"></el-table-column>
                <el-table-column prop="contractName" label="领用人"></el-table-column>
                <el-table-column prop="contractClassify" label="领用原因"></el-table-column>
                <el-table-column prop="unitName" sortable label="申请时间"></el-table-column>
                <el-table-column prop="action" label="操作" fixed="right" width="280" fix>
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="edit(scope.row.id)">修改</el-button>
                        <el-button type="text" size="small" @click="view(scope.row.contractId)">查看</el-button>
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
        </el-tabs>
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
                searchWord: '',
                type: '',
                step: '1'
            },

            tableData: [],
        }
    },
    watch: {
        'form.step'(val) {
            this.getTableData()
        }
    },

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
                name: 'ConsumingOutAdd',
                query: {
                    type: '1',
                    id: id
                }
            })
        },
        batchImport() {
            this.$message({
                type: 'info',
                message: '功能未开放'
            })
        },
        view(id) {
            this.$router.push({
                name: 'ConsumingOutDetail',
                query: {
                    id: id
                }
            })
        },
        add() {
            this.$router.push({
                name: 'ConsumingOutAdd',
                query: {
                    type: '0'
                }
            })
        },
        del(data) {
            this.$confirm('是否删除该合同？', {
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
    @import "../../../styles/variables.scss";
    @import "../../../styles/mixin.scss";
    
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
