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
                <el-form-item label="关键字" prop="name">
                    <el-input v-model="form.projectName" placeholder="请输入项目名称"></el-input>
                </el-form-item>
                <el-form-item label="资产类型" prop="value">
                    <el-select v-model="form.value" filterable>
                        <el-option label="全部" value="全部"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="资产状态" prop="value">
                    <el-select v-model="form.value" filterable>
                        <el-option label="待入库" value="1"></el-option>
                        <el-option label="在库" value="2"></el-option>
                        <el-option label="在用" value="3"></el-option>
                        <el-option label="已借出" value="4"></el-option>
                        <el-option label="维修中" value="5"></el-option>
                        <el-option label="已报废" value="6"></el-option>
                        <el-option label="已退货" value="7"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
            </el-form>
            <el-tab-pane name="1" label="所有">
                <el-button type="primary" icon="el-icon-plus" size="small" @click="add">新增</el-button>
                <el-button type="primary" size="small">批量导入</el-button>
                <el-button :disabled="!tableSelection.length" type="default" size="small">表格导出</el-button>
                <el-button type="primary" size="small">表格导出</el-button>
                <el-button
                    :disabled="!tableSelection.length"
                    icon="el-icon-delete"
                    type="default"
                    size="small"
                    @click="del">批量删除
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
                    <el-table-column prop="projectId" label="资产名称"></el-table-column>
                    <el-table-column prop="projectName" label="资产类型"></el-table-column>
                    <el-table-column prop="unitName" label="版本号"></el-table-column>
                    <el-table-column prop="projectState" width="150" sortable label="服务结束时间"></el-table-column>
                    <el-table-column prop="projectClassify" label="资产状态"></el-table-column>
                    <el-table-column prop="action" label="操作" fixed="right" width="280" fix>
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="view(scope.row.id)">查看</el-button>
                            <el-button type="text" size="small" @click="edit(scope.row.id)">编辑</el-button>
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
            <el-tab-pane name="2" label="未验收">
                <el-row :gutter="10" class="tip">
                    <el-col :span="1" style="text-align: right">
                        <span class="el-icon-warning"></span>
                    </el-col>
                    <el-col :span="23">
                        <p>
                            1.该页面展示的内容是“进行中”的合同及项目下的资产，若需新增请到“合同详情-软件系统”或“项目概况-设备到货”页进行录入。
                        </p>
                        <p>
                            2.当合同或项目验收成功后，软件信息将更新至“所有软件”列表页。
                        </p>
                    </el-col>
                </el-row>
                <el-button type="primary" size="small">表格导出</el-button>
                <el-table
                    v-loading="tableLoading"
                    :data="tableData"
                    style="width: 100%"
                    class="table"
                    border
                    @selection-change="onTableSelectionChange"
                >
                    <el-table-column type="selection"></el-table-column>
                    <el-table-column prop="projectId" label="合同名称"></el-table-column>
                    <el-table-column prop="projectId" label="项目名称"></el-table-column>
                    <el-table-column prop="projectId" label="资产名称"></el-table-column>
                    <el-table-column prop="projectName" label="资产类型"></el-table-column>
                    <el-table-column prop="unitName" label="版本号"></el-table-column>
                    <el-table-column prop="projectState" width="150" sortable label="到货签收时间"></el-table-column>
                    <el-table-column prop="projectClassify" label="验收状态"></el-table-column>
                    <el-table-column prop="action" label="操作" fixed="right" width="280" fix>
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="view(scope.row.id)">查看</el-button>
                            <el-button type="text" size="small" @click="edit(scope.row.id)">编辑</el-button>
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
                projectName: ''
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
                name: 'AssetSoftwareAdd',
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
