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
                <el-form-item label="合同名称" prop="contractName">
                    <el-input v-model="form.contractName" placeholder="请输入名的关键字"></el-input>
                </el-form-item>
                <el-form-item label="合同编号" prop="contractId">
                    <el-input v-model="form.contractId" placeholder="请输入合同编号"></el-input>
                </el-form-item>
                <el-form-item label="乙方单位" prop="unitName">
                    <el-input v-model="form.unitName" placeholder="请输乙方单位名称关键字"></el-input>
                </el-form-item>
                <el-form-item label="合同状态" prop="contractState">
                    <el-select v-model="form.contractState" filterable>
                        <el-option label="全部" value="全部"></el-option>
                        <el-option label="未开始" value="1"></el-option>
                        <el-option label="进行中" value="2"></el-option>
                        <el-option label="暂停" value="3"></el-option>
                        <el-option label="结束" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="合同类型" prop="contractClassify">
                    <el-select v-model="form.contractClassify" filterable>
                        <el-option label="类型一" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="time" label="合同签订日期">
                    <el-date-picker
                        v-model="form.time"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
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
                <el-table-column prop="contractId" label="合同编号"></el-table-column>
                <el-table-column prop="contractName" label="合同名称"></el-table-column>
                <el-table-column prop="contractClassify" label="合同类型"></el-table-column>
                <el-table-column prop="unitName" label="乙方单位"></el-table-column>
                <el-table-column prop="time" label="合同签订日期"></el-table-column>
                <el-table-column prop="contractState" label="合同状态"></el-table-column>
                <el-table-column prop="action" label="操作" fixed="right" width="280" fix>
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="del(scope.row)">修改</el-button>
                        <el-button type="text" size="small" @click="del(scope.row)">查看</el-button>
                        <el-button type="text" size="small" @click="del(scope.row)">验收</el-button>
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
        add(){
        
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

            setTimeout(()=>{
                me.tableLoading = false
                me.tableData = [
                    {
                        contractName: '合同名称',
                        contractId: '编号1',
                        contractClassify: '类型1',
                        contractState: '进行中',
                        time: '2018-01-21',
                        unitName: '乙方单位'
                    }
                ]
                me.page.totalCount = 100
            },500)
            
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
        .table {
            .el-table__body-wrapper {
                @include scrollBar;
            }
        }
    }
    
    .pagination {
        text-align: center;
        margin: 20px 0;
    }
</style>
