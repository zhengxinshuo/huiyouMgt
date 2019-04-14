<template>
    <div class="page-container">
        <div class="top">
            <el-form
                ref="form"
                :inline="true"
                :model="form"
                label-position="left"
                class="form"
                size="small"
                label-width="100px"
            >
                <el-form-item label="项目名称" prop="contractName">
                    <el-input v-model="form.contractName" placeholder="请输入项目名称"></el-input>
                </el-form-item>
                <el-form-item label="乙方单位" prop="unitName">
                    <el-select v-model="form.contractState" filterable>
                        <el-option label="全部" value="全部"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-button type="primary" size="small" @click="add">新增</el-button>
            <el-table
                v-loading="tableLoading"
                :data="tableData"
                style="width: 100%"
                class="table"
                border
            >
                <el-table-column prop="contractId" label="项目名称"></el-table-column>
                <el-table-column prop="contractName" label="乙方单位"></el-table-column>
                <el-table-column prop="contractClassify" label="院内项目经理"></el-table-column>
                <el-table-column prop="unitName" label="审批状态"></el-table-column>
                <el-table-column prop="time" sortable label="创建时间"></el-table-column>
                <el-table-column prop="action" label="操作" fixed="right" width="280" fix>
                    <template slot-scope="scope">
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
        </div>
    </div>
</template>
<script>
import tableMixin from '@/mixin/table'

export default {
    name: 'ProjectAuditList',
    components: {},
    mixins: [tableMixin],
    data() {
        return {
            validTime: [],
            form: {
                contractClassify: '',
                unitName: '',
                activityClassify: '',
                contractName: '',
                contractId: '',
                contractState: '',
                time: ''
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
        view(id) {
            this.$router.push({
                name: 'ContractDetail',
                query: {
                    id: id
                }
            })
        },
        add() {
            this.$router.push({
                name: 'ProjectAdd'
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
            me.form.contractId = me.$route.params.id || ''
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
    @import "../../styles/variables.scss";
    @import "../../styles/mixin.scss";
    
    .table {
        margin-top: 20px;
    }
    
    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
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
            .date-wrapper {
                .el-form-item__content {
                    width: 475px;
                }
            }
        }
    }
    
    .pagination {
        text-align: center;
        margin: 20px 0;
    }
</style>
