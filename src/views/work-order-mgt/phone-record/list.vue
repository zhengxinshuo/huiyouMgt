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
                <el-form-item label="科室" prop="value">
                    <el-select v-model="form.value" placeholder="请选择" clearable>
                        <el-option label="全部" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="处理结果" prop="value">
                    <el-select v-model="form.value" clearable>
                        <el-option label="全部" value="1"></el-option>
                        <el-option label="建单" value="2"></el-option>
                        <el-option label="催单" value="3"></el-option>
                        <el-option label="取消工单" value="4"></el-option>
                        <el-option label="未处理" value="5"></el-option>
                        <el-option label="电话已解决" value="6"></el-option>
                        <el-option label="无效电话" value="7"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="来电时间" prop="time">
                    <el-select v-model="form.time" clearable>
                        <el-date-picker
                            v-model="form.time"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
            </el-form>
            <el-table
                v-loading="tableLoading"
                :data="tableData"
                style="width: 100%"
                class="table"
                border
            >
                <el-table-column prop="contractId" label="来电电话"></el-table-column>
                <el-table-column prop="contractName" label="是否接通"></el-table-column>
                <el-table-column prop="contractClassify" label="处理结果"></el-table-column>
                <el-table-column prop="unitName" label="录音或留言">
                </el-table-column>
                <el-table-column prop="time" srotable label="来电时间"></el-table-column>
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
                name: 'WorkOrderRepairAllAdd',
                query: {
                    type: '1',
                    id: '123'
                }
            })
        },
        view(id) {
            this.$router.push({
                name: 'WorkOrderRepairAllDetail',
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
