<template>
    <div class="page-container">
        <el-tabs v-model="form.step" type="border-card">
            <el-form
                ref="form"
                :inline="true"
                :model="form"
                label-position="left"
                class="form"
                size="small"
                label-width="100px"
            >
                <el-form-item label="合同名称" prop="name">
                    <el-input v-model="form.name" placeholder="请输入合同名称关键字"></el-input>
                </el-form-item>
                <el-form-item label="乙方单位" prop="name">
                    <el-input v-model="form.name" placeholder="请输入乙方单位名称关键字"></el-input>
                </el-form-item>
                <el-form-item label="院方项目经理" prop="value">
                    <el-select v-model="form.value" filterable>
                        <el-option label="全部" value="全部"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="form.step==='1'" label="巡检状态" prop="value">
                    <el-select v-model="form.value" filterable>
                        <el-option label="全部" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
            </el-form>
            <el-row>
                <el-col :span="24">
                    <el-button type="primary" size="small">表格导出</el-button>
                </el-col>
            </el-row>
            <el-tab-pane name="1" label="全部">
                <el-table
                    v-loading="tableLoading"
                    :data="tableData"
                    style="width: 100%"
                    class="table"
                    border
                >
                    <el-table-column prop="projectId" label="巡检内容"></el-table-column>
                    <el-table-column prop="projectName" label="合同名称"></el-table-column>
                    <el-table-column prop="unitName" label="院方项目经理"></el-table-column>
                    <el-table-column prop="projectStep" label="乙方单位"></el-table-column>
                    <el-table-column prop="projectState" label="乙方项目经理"></el-table-column>
                    <el-table-column prop="projectClassify" width="150" sortable label="计划开始时间"></el-table-column>
                    <el-table-column prop="projectClassify" width="150" sortable label="计划结束时间"></el-table-column>
                    <el-table-column prop="projectClassify" sortable label="巡检状态"></el-table-column>
                    <el-table-column prop="action" label="操作" fixed="right" width="280" fix>
                        <template slot-scope="scope">
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
            </el-tab-pane>
            <el-tab-pane name="2" label="待执行">
                <el-table
                    v-loading="tableLoading"
                    :data="tableData"
                    style="width: 100%"
                    class="table"
                    border
                >
                    <el-table-column prop="projectId" label="巡检内容"></el-table-column>
                    <el-table-column prop="projectName" label="合同名称"></el-table-column>
                    <el-table-column prop="unitName" label="院方项目经理"></el-table-column>
                    <el-table-column prop="projectStep" label="乙方单位"></el-table-column>
                    <el-table-column prop="projectState" label="乙方项目经理"></el-table-column>
                    <el-table-column prop="projectClassify" width="150" sortable label="计划开始时间"></el-table-column>
                    <el-table-column prop="projectClassify" width="150" sortable label="计划结束时间"></el-table-column>
                    <el-table-column prop="action" label="操作" fixed="right" width="280" fix>
                        <template slot-scope="scope">
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
            </el-tab-pane>
            <el-tab-pane name="3" label="已延期">
            </el-tab-pane>
        </el-tabs>
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
            form: {
                step: '1',
                name: '',
                value: '',
                unitName: '',
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
        edit(id) {
            this.$router.push({
                name: 'AssetHardwareAdd',
                query: {
                    type: '1',
                    id: id
                }
            })
        },
        view(id) {
            this.$router.push({
                name: 'AssetHardwareDetail',
                query: {
                    id: id
                }
            })
        },
        add(id) {
            this.$router.push({
                name: 'AssetHardwareAdd',
                query: {
                    type: '0'
                }
            })
        },
        del(data) {
            this.$confirm('是否删除该资产？', {
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
        },
        init() {
            const me = this
            me.form.projectId = me.$route.params.id || ''
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
                        id: 123,
                        projectStep: '1',
                        projectName: '合同名称',
                        projectId: '123456',
                        projectClassify: '类型1',
                        projectState: '进行中',
                        time: '2018-01-21',
                        unitName: '乙方单位'
                    }
                ]
                me.page.totalCount = 100
            }, 500)

        },
        onSubmit() {
            this.getTableData()
        }

    },
}
</script>
<style lang="scss" scoped>
    @import "~@/styles/variables";
    @import "~@/styles/mixin";
    
    .tip {
        font-size: 14px;
        color: #666;
        margin-bottom: 20px;
        line-height: 1.5;
    }
    
    .el-icon-warning {
        margin-right: 10px;
        color: $c-danger;
    }
    
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
        }
    }
    
    .pagination {
        text-align: center;
        margin: 20px 0;
    }
</style>
